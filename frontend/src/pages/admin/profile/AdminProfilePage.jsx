import React, { useState } from "react";
import { Camera } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useUserStore from "../../../stores/userStore";
// ✅ Rename the import
import { URL as API_URL } from "../../../constants/env.const";
import defaultAvatar from "../../../assets/no-avatar.png";
const AdminProfilePage = () => {
  const { user, setUser } = useUserStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
    role: user?.role || "admin",
    password: "",
    profile_picture: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profile_picture: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      const { name, surname, email, role, password, profile_picture } =
        formData;

      data.append("name", name);
      data.append("surname", surname);
      data.append("email", email);
      data.append("role", role);
      if (password) data.append("password", password);
      if (profile_picture) data.append("profile_picture", profile_picture);

      const res = await axios.put(
        `${API_URL}/update-user/${user.userId}`,
        data
      );

      // ✅ Get the real filename returned by the backend
      const updatedProfilePic =
        res.data.profile_picture || user.profile_picture;

      setUser({
        ...user,
        name,
        surname,
        email,
        role,
        profile_picture: updatedProfilePic,
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const profileImageSrc = preview
    ? preview
    : user?.profile_picture
    ? `${API_URL}/user-profile-pictures/${user.profile_picture}`
    : defaultAvatar;

  return (
    <div className="w-full h-screen flex justify-center items-center p-10 bg-gray-50">
      <Toaster position="top-right" />

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Profile</h2>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative group w-24 h-24">
            <img
              src={profileImageSrc}
              alt="Profile"
              className="rounded-full w-full h-full object-cover border-4 border-white shadow-md"
            />
            <label
              htmlFor="profileUpload"
              className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition"
            >
              <Camera className="text-white w-5 h-5" />
            </label>
            <input
              id="profileUpload"
              type="file"
              name="profile_picture"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {user?.name} {user?.surname}
            </h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
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
            label="Role"
            name="role"
            value={formData.role}
            disabled
            onChange={handleChange}
          />

          <Input
            label="New Password (Optional)"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-md"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
    />
  </div>
);

export default AdminProfilePage;
