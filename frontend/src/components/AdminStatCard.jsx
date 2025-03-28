import React from "react";

const AdminStatCard = ({
  title,
  icon_top,
  number,
  icon_bottom,
  percentage,
  text,
  bg_colour,
  text_colour,
}) => {
  return (
    <div className="w-[20%] h-fit bg-white shadow-sm p-4 border border-gray-50 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-xl ">{title}</h1>
        <div className={`${bg_colour} p-2 rounded-full`}>{icon_top}</div>
      </div>
      <h1 className="text-2xl mt-4">{number}</h1>

      <div className="flex items-center mt-4 text-sm">
        {icon_bottom}
        <p>
          <span className={`${text_colour}`}>{percentage}</span> {text}
        </p>
      </div>
    </div>
  );
};

export default AdminStatCard;
