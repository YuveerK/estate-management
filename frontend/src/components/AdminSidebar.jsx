import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import useUserStore from "../stores/userStore";
const AdminSidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/home", icon: <FaHome /> },
    { name: "Maintenance", path: "/admin/maintenance", icon: <FaGear /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
  ];
  const clearUser = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    clearUser(); // clear user from global state
    navigate("/"); // redirect to login page
  };

  console.log(user);
  return (
    <aside className="w-64 h-full bg-[#121729] text-white p-4 border-r">
      <div className="w-full flex items-center justify-center">
        <img
          src={`http://localhost:4001/user-profile-pictures/${user.profile_picture}`}
          alt=""
          className="w-[100px] h-[100px] rounded-full"
          style={{ objectFit: "cover" }}
        />
      </div>
      <h2 className="text-xl font-bold mb-6 text-center mt-4">
        Welcome, {user.name}
      </h2>
      <div className="w-full bg-gray-50 h-[0.5px] mb-4"></div>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `p-2 rounded hover:bg-[#202839] ${
                isActive ? "bg-[#202839] font-semibold" : ""
              }`
            }
          >
            <div className="flex items-center">
              <div className="mr-2">{link.icon}</div>
              <div>{link.name}</div>
            </div>
          </NavLink>
        ))}
        <NavLink
          className="p-2 rounded hover:bg-[#202839]"
          onClick={() => handleLogout()}
        >
          <div className="flex items-center">
            <div className="mr-2">
              <CiLogout />
            </div>
            <div>Logout</div>
          </div>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
