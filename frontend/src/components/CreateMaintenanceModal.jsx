import React from "react";
import { X } from "lucide-react";

const CreateMaintenanceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-[700px] max-w-full p-6 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-1">
          Create Maintenance Request
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Create a new maintenance request for a resident. Fill out the form
          below with all the necessary details.
        </p>

        <form className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col">
            <label className="font-medium">
              Request Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Brief description of the issue"
              className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all"
              required
            />
          </div>

          <div className="flex flex-col col-span-1">
            <label className="font-medium">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Please describe the issue in detail..."
              className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">
              Unit <span className="text-red-500">*</span>
            </label>
            <select className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all">
              <option>Select unit</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">
              Resident <span className="text-red-500">*</span>
            </label>
            <select className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all">
              <option>Select unit first</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all">
              <option>Select category</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">
              Priority <span className="text-red-500">*</span>
            </label>
            <select className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all">
              <option>Select priority</option>
            </select>
          </div>

          <div className="flex flex-col col-span-2">
            <label className="font-medium">Upload Images (Optional)</label>
            <div className="border-dashed border-2 border-gray-300 p-6 rounded-md text-center text-gray-500 cursor-pointer hover:bg-gray-50 mt-1">
              <p className="text-sm font-medium">Click to upload</p>
              <p className="text-xs mt-1">PNG, JPG or JPEG (MAX. 5MB)</p>
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMaintenanceModal;
