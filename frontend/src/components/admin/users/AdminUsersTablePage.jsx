import React, { useEffect, useState } from "react";
import { URL } from "../../../constants/env.const";
import axios from "axios";

const AdminUsersTablePage = ({ onViewUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${URL}/get-all-residents`);
      setUsers(res.data); // set array of users
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  return (
    <div className="overflow-auto">
      <table className="w-full mt-8 text-sm">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Phone</th>
            <th className="p-3">ID Number</th>
            <th className="p-3">Pets</th>
            <th className="p-3">Occupants</th>
            <th className="p-3">Account Created</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.residentId}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="p-3 font-medium">
                {user.name} {user.surname}
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3">{user.phoneNumber}</td>
              <td className="p-3">{user.idNumber}</td>
              <td className="p-3">{user.pets}</td>
              <td className="p-3">{user.numberOfOccupants}</td>
              <td className="p-3">
                {user.accountCreated ? (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    Yes
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                    No
                  </span>
                )}
              </td>
              <td className="p-3 text-right">
                <button
                  onClick={() => onViewUser(user)} // 👈 trigger modal with selected user
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  View
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTablePage;
