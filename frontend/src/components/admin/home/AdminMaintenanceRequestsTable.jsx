import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const AdminMaintenanceRequestsTable = () => {
  return (
    <div className="w-[60%] h-[500px] bg-white rounded-md shadow-sm p-4 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium text-xl">Recent Maintenance Requests</h1>
          <p className="text-sm text-gray-400">
            Overview of the latest maintenance requests
          </p>
        </div>
        <div>
          <div className="flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer">
            <p className="mr-2">View All</p>
            <GoArrowUpRight size={20} />
          </div>
        </div>
      </div>
      <table className="w-full mt-8 overflow-auto">
        <thead>
          <tr className="text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Resident</th>
            <th className="p-2">Status</th>
            <th className="p-2">Assigned To</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-b-gray-300">
            <td className="p-2">Leaking faucet in bathroom </td>
            <td className="p-2">101 </td>
            <td className="p-2">John Smith </td>
            <td className="p-2">
              <div className="w-fit px-4 py-[4px] rounded-full bg-green-200 text-center">
                <p className="text-green-800 text-sm font-medium">New</p>
              </div>
            </td>
            <td className="p-2">Mike Technician </td>
            <td className="p-2 flex justify-end">
              <div className=" w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer">
                <p className="mr-2">View</p>
              </div>
            </td>
          </tr>
          <tr className="border-b border-b-gray-300">
            <td className="p-2">Leaking faucet in bathroom </td>
            <td className="p-2">101 </td>
            <td className="p-2">John Smith </td>
            <td className="p-2">
              <div className="w-fit px-4 py-[4px] rounded-full bg-green-200 text-center">
                <p className="text-green-800 text-sm font-medium">New</p>
              </div>
            </td>
            <td className="p-2">Mike Technician </td>
            <td className="p-2 flex justify-end">
              <div className=" w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer">
                <p className="mr-2">View</p>
              </div>
            </td>
          </tr>
          <tr className="border-b border-b-gray-300">
            <td className="p-2">Leaking faucet in bathroom </td>
            <td className="p-2">101 </td>
            <td className="p-2">John Smith </td>
            <td className="p-2">
              <div className="w-fit px-4 py-[4px] rounded-full bg-green-200 text-center">
                <p className="text-green-800 text-sm font-medium">New</p>
              </div>
            </td>
            <td className="p-2">Mike Technician </td>
            <td className="p-2 flex justify-end">
              <div className=" w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer">
                <p className="mr-2">View</p>
              </div>
            </td>
          </tr>
          <tr className="border-b border-b-gray-300">
            <td className="p-2">Leaking faucet in bathroom </td>
            <td className="p-2">101 </td>
            <td className="p-2">John Smith </td>
            <td className="p-2">
              <div className="w-fit px-4 py-[4px] rounded-full bg-green-200 text-center">
                <p className="text-green-800 text-sm font-medium">New</p>
              </div>
            </td>
            <td className="p-2">Mike Technician </td>
            <td className="p-2 flex justify-end">
              <div className=" w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer">
                <p className="mr-2">View</p>
              </div>
            </td>
          </tr>
          <tr className="border-b border-b-gray-300">
            <td className="p-2">Leaking faucet in bathroom </td>
            <td className="p-2">101 </td>
            <td className="p-2">John Smith </td>
            <td className="p-2">
              <div className="w-fit px-4 py-[4px] rounded-full bg-green-200 text-center">
                <p className="text-green-800 text-sm font-medium">New</p>
              </div>
            </td>
            <td className="p-2">Mike Technician </td>
            <td className="p-2 flex justify-end">
              <div className=" w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer">
                <p className="mr-2">View</p>
              </div>
            </td>
          </tr>
          <tr className="border-b border-b-gray-300">
            <td className="p-2">Leaking faucet in bathroom </td>
            <td className="p-2">101 </td>
            <td className="p-2">John Smith </td>
            <td className="p-2">
              <div className="w-fit px-4 py-[4px] rounded-full bg-green-200 text-center">
                <p className="text-green-800 text-sm font-medium">New</p>
              </div>
            </td>
            <td className="p-2">Mike Technician </td>
            <td className="p-2 flex justify-end">
              <div className=" w-fit flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer">
                <p className="mr-2">View</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminMaintenanceRequestsTable;
