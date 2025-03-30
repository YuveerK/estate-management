import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants/env.const";
const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    idNumber: "",
    phoneNumber: "",
    emergencyContact: "",
    numberOfOccupants: "",
    pets: "No",
    plateNumber: "",
    make: "",
    model: "",
    color: "",
  });

  const user = useUserStore((state) => state.user);
  const userId = user?.userId;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Create resident
      await axios.post(`${URL}/create-resident`, {
        userId,
        unitId: 1, // Replace with dynamic unitId selection if needed
        idNumber: formData.idNumber,
        phoneNumber: formData.phoneNumber,
        emergencyContact: formData.emergencyContact,
        numberOfOccupants: formData.numberOfOccupants,
        pets: formData.pets,
        accountCreated: 1,
      });

      // 2. Save vehicle info (optional)
      if (formData.plateNumber) {
        await axios.post(`${URL}/create-vehicle`, {
          userId,
          plateNumber: formData.plateNumber,
          make: formData.make,
          model: formData.model,
          color: formData.color,
        });
      }

      toast.success("Account created!");
      navigate("/admin/home");
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 && "Step 1: Personal Details"}
          {step === 2 && "Step 2: Vehicle Details"}
          {step === 3 && "Step 3: Confirm & Finish"}
        </h2>

        {step === 1 && (
          <div className="space-y-4">
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
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Pets
              </label>
              <select
                name="pets"
                value={formData.pets}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
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
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <strong>ID:</strong> {formData.idNumber}
            </div>
            <div>
              <strong>Phone:</strong> {formData.phoneNumber}
            </div>
            <div>
              <strong>Emergency Contact:</strong> {formData.emergencyContact}
            </div>
            <div>
              <strong>Occupants:</strong> {formData.numberOfOccupants}
            </div>
            <div>
              <strong>Pets:</strong> {formData.pets}
            </div>
            {formData.plateNumber && (
              <>
                <div>
                  <strong>Plate:</strong> {formData.plateNumber}
                </div>
                <div>
                  <strong>Make:</strong> {formData.make}
                </div>
                <div>
                  <strong>Model:</strong> {formData.model}
                </div>
                <div>
                  <strong>Color:</strong> {formData.color}
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-600 text-sm"
            >
              ← Back
            </button>
          )}
          <div className="ml-auto">
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Next →
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-lg text-sm text-white ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } transition`}
              >
                {loading ? "Creating..." : "Finish"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔧 Reusable input
const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-lg text-sm"
    />
  </div>
);

export default CreateAccount;
