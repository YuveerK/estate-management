import React, { useEffect, useRef } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";

const ColumnVisibilityDropdown = ({
  isOpen,
  toggleMenu,
  visibleColumns,
  toggleColumn,
  allColumns,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleMenu]);

  return (
    <div>
      <div
        onClick={() => toggleMenu((prev) => !prev)}
        className="flex relative items-center gap-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-[#f2f5fa] hover:cursor-pointer transition-all"
      >
        <p className="mr-2 font-medium text-sm text-gray-700">View</p>
        <LuSlidersHorizontal size={16} className="text-gray-600" />
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-12 right-0 z-50 bg-white shadow-lg rounded-md py-2 w-48 border border-gray-200"
        >
          {allColumns.map((col) => (
            <div
              key={col}
              onClick={(e) => {
                e.stopPropagation();
                toggleColumn(col);
              }}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <FaCheck
                size={12}
                className={`mr-2 ${
                  visibleColumns.includes(col) ? "opacity-100" : "opacity-0"
                } transition-opacity`}
              />
              <span className="text-sm text-gray-800">{col}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColumnVisibilityDropdown;
