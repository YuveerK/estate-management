import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="w-fit flex items-center border border-gray-400 p-2 rounded-md">
      <IoIosSearch className="mr-2" />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="outline-none text-sm"
      />
    </div>
  );
};

export default SearchInput;
