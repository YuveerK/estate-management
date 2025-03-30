import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="font-semibold text-2xl text-gray-800">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
