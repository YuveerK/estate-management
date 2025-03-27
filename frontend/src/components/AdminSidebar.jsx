import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const links = [
    { name: "Dashboard", path: "/home" },
    { name: "Maintenance", path: "/maintenance" },
  ];

  return (
    <aside className="w-64 h-full bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `p-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-gray-300 font-semibold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
