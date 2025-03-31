import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../constants/env.const";

const AdminMaintenanceRequestsTablePage = ({ refreshKey = 0, onView }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, [refreshKey]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${URL}/maintenance-requests`);
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch maintenance requests:", err);
    }
  };

  return (
    <div className="overflow-auto">
      <table className="w-full mt-8 text-sm">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-3">Title</th>
            <th className="p-3">Unit</th>
            <th className="p-3">Resident ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Status</th>
            <th className="p-3">Assigned To</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.requestId} className="border-b border-b-gray-300">
              <td className="p-3 font-medium">{req.title}</td>
              <td className="p-3">{req.unitId}</td>
              <td className="p-3">{req.residentId}</td>
              <td className="p-3">
                {new Date(req.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3">
                <div className="w-fit px-4 py-[4px] rounded-full bg-red-200 text-center">
                  <p className="text-red-800 text-sm font-medium">
                    {req.priority}
                  </p>
                </div>
              </td>
              <td className="p-3">
                <div className="w-fit px-4 py-[4px] rounded-full bg-green-200 text-center">
                  <p className="text-green-800 text-sm font-medium">
                    {req.status}
                  </p>
                </div>
              </td>
              <td className="p-3">{req.assignedTo || "-"}</td>
              <td className="p-3 flex justify-end">
                <div
                  className="w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer"
                  onClick={() => onView(req)} // 👈 Trigger modal with this request
                >
                  <p className="mr-2">View</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMaintenanceRequestsTablePage;
