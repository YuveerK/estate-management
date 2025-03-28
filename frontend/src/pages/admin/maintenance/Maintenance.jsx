import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import AdminMaintenanceRequestsTablePage from "../../../components/AdminMaintenanceRequestsTablePage";

const tabs = ["All Requests", "New", "In Progress", "Completed"];

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState("All Requests");

  return (
    <div className="w-full h-screen p-8 bg-white rounded-md shadow-sm overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl text-gray-800">All Requests</h1>
          <p className="text-sm text-gray-500">
            View and manage all maintenance requests from residents
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all">
            <p className="mr-2 font-medium text-sm text-gray-700">
              Create Request
            </p>
            <GoArrowUpRight size={16} className="text-gray-600" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 cursor-pointer py-2 rounded-xl shadow-sm transition-all duration-200 font-medium text-sm 
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <AdminMaintenanceRequestsTablePage filter={activeTab} />
      </div>
    </div>
  );
};

export default Maintenance;
