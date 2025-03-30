import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useUserStore from "../../stores/userStore";
import { URL } from "../../constants/env.const";
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${URL}/login`, formData);
      const user = res.data.user;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      const redirected = await getUserDetailsOrRedirect(user); // 🔁 returns true if redirected

      if (redirected) return; // ⛔ skip navigating to /admin/home

      toast.success("Login successful");
      navigate("/admin/home");
    } catch (err) {
      const msg = err.response?.data?.error || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Helper function now RETURNS a boolean
  const getUserDetailsOrRedirect = async (user) => {
    const userId = user.userId;
    const role = user.role.toLowerCase();

    if (role !== "owner" && role !== "tenant") {
      return false; // admin or manager
    }

    try {
      const res = await axios.get(`${URL}/get-resident/${userId}`);
      const resident = res.data;
      console.log(resident);
      if (!resident.accountCreated) {
        navigate("/users/create-account");
        return true; // redirect to wizard
      }

      return false; // continue to /admin/home
    } catch (err) {
      if (err.response?.status === 404) {
        navigate("/users/create-account");
        return true;
      }
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md "
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white text-sm font-medium py-2.5 rounded-lg shadow transition duration-200`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
