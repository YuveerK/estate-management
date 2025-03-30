import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/userStore"; // adjust path if needed

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
