import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const CreateRequestButton = ({ onClick, title }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all"
    >
      <p className="mr-2 font-medium text-sm text-gray-700">{title}</p>
      <GoArrowUpRight size={16} className="text-gray-600" />
    </div>
  );
};

export default CreateRequestButton;
