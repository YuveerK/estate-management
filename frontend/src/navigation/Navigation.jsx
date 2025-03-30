import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Home from "../pages/admin/home/Home";
import Maintenance from "../pages/admin/maintenance/Maintenance";
import SignUpForm from "../pages/auth/SignUpForm";
import LoginForm from "../pages/auth/LoginForm";
import ProtectedRoute from "./ProtectedRoute";

const Navigation = () => (
  <Routes>
    <Route path="/sign-up" element={<SignUpForm />} />
    <Route path="/" element={<LoginForm />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>
    </Route>
  </Routes>
);

export default Navigation;
