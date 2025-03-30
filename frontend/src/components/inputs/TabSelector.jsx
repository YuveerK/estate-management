import React from "react";

const TabSelector = ({ tabs, activeTab, setActiveTab }) => {
  return (
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
  );
};

export default TabSelector;
