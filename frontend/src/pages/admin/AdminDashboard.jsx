import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const AdminDashboard = () => (
  <div className="w-full h-screen flex overflow-auto">
    <AdminSidebar />

    {/* This is where child routes like Home will render */}
    <Outlet />
  </div>
);

export default AdminDashboard;
