import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Home from "../pages/admin/home/Home";
import Maintenance from "../pages/admin/maintenance/Maintenance";

const Navigation = () => (
  <Routes>
    <Route path="/" element={<AdminDashboard />}>
      <Route index element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="maintenance" element={<Maintenance />} />
    </Route>
  </Routes>
);

export default Navigation;
