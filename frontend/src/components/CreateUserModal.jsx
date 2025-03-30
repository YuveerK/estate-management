import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../constants/env.const";
const CreateUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "owner",
    idNumber: "",
    phoneNumber: "",
    emergencyContact: "",
    numberOfOccupants: "",
    pets: "No",
    plateNumber: "",
    make: "",
    model: "",
    color: "",
    profile_picture: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture") {
      setFormData((prev) => ({ ...prev, profile_picture: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create user with image
      const userForm = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "plateNumber" &&
          key !== "make" &&
          key !== "model" &&
          key !== "color" &&
          key !== "idNumber" &&
          key !== "phoneNumber" &&
          key !== "emergencyContact" &&
          key !== "numberOfOccupants" &&
          key !== "pets"
        ) {
          userForm.append(key, value);
        }
      });

      const userRes = await axios.post(`${URL}/create-user`, userForm);
      const userId = userRes.data.user.userId; // userId from the response

      // Step 2: Create resident using the userId from the user creation response
      await axios.post(`${URL}/create-resident`, {
        userId,
        idNumber: formData.idNumber,
        phoneNumber: formData.phoneNumber,
        emergencyContact: formData.emergencyContact,
        numberOfOccupants: formData.numberOfOccupants,
        pets: formData.pets,
      });

      // Step 3: Create vehicle (if filled)
      if (formData.plateNumber.trim() !== "") {
        await axios.post(`${URL}/create-vehicle`, {
          userId,
          plateNumber: formData.plateNumber,
          make: formData.make,
          model: formData.model,
          color: formData.color,
        });
      }

      toast.success("User created successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-[700px] max-w-full p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-1">Create User</h2>
        <p className="text-sm text-gray-500 mb-6">
          Create a new resident with vehicle and profile details.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 text-sm"
        >
          {/* BASIC INFO */}
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={["owner", "tenant"]}
          />

          {/* PROFILE IMAGE */}
          <div className="col-span-2">
            <label className="font-medium block">Profile Picture</label>
            <input type="file" name="profile_picture" onChange={handleChange} />
          </div>

          {/* RESIDENT INFO */}
          <Input
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            label="Emergency Contact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
          <Input
            label="Number of Occupants"
            name="numberOfOccupants"
            value={formData.numberOfOccupants}
            onChange={handleChange}
          />
          <Select
            label="Pets"
            name="pets"
            value={formData.pets}
            onChange={handleChange}
            options={["Yes", "No"]}
          />

          {/* VEHICLE INFO */}
          <Input
            label="Plate Number"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
          />
          <Input
            label="Make"
            name="make"
            value={formData.make}
            onChange={handleChange}
          />
          <Input
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          <Input
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </form>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text", required }) => (
  <div className="flex flex-col">
    <label className="font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="border border-gray-300 px-3 py-2 rounded-md"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 px-3 py-2 rounded-md"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

export default CreateUserModal;
