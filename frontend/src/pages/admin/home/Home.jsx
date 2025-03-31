import React from "react";
import { TiSpanner } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa6";
import { FaRegBuilding, FaArrowUp } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import AdminStatCard from "../../../components/admin/home/AdminStatCard.jsx";
import AdminMaintenanceRequestsTable from "../../../components/admin/home/AdminMaintenanceRequestsTable.jsx";
import AdminCommunityPosts from "../../../components/admin/home/AdminCommunityPosts.jsx";
import AdminMaintenanceRequestChart from "../../../components/admin/home/AdminMaintenanceRequestChart.jsx";
import AdminUsersOwnersChart from "../../../components/admin/home/AdminUsersOwnersChart.jsx";
const Home = () => {
  return (
    <div className="p-8 w-full h-screen overflow-auto bg-[#fbfdfe]">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <AdminStatCard
          title={"Open Requests"}
          icon_top={<TiSpanner className="text-blue-500" />}
          number={"12"}
          icon_bottom={<FaArrowDown className="text-red-500 mr-[5px]" />}
          percentage={"53%"}
          text={"2 new since yesterday"}
          bg_colour={"bg-blue-200"}
          text_colour={"text-red-500"}
        />
        <AdminStatCard
          title={"Total Units"}
          icon_top={<FaRegBuilding className="text-purple-500" />}
          number={"48"}
          icon_bottom={<FaArrowUp className="text-green-500 mr-[5px]" />}
          percentage={"92%"}
          text={"Occupancy"}
          bg_colour={"bg-purple-200"}
          text_colour={"text-green-500"}
        />
        <AdminStatCard
          title={"Total Units"}
          icon_top={<CiCreditCard1 className="text-green-500" />}
          number={"48"}
          icon_bottom={<FaArrowUp className="text-green-500 mr-[5px]" />}
          percentage={"12%"}
          text={"4 overdue invoices"}
          bg_colour={"bg-green-200"}
          text_colour={"text-green-500"}
        />
        <AdminStatCard
          title={"Total Units"}
          icon_top={<FaRegBuilding className="text-purple-500" />}
          number={"48"}
          icon_bottom={<FaArrowUp className="text-green-500 mr-[5px]" />}
          percentage={"92%"}
          text={"Occupancy"}
          bg_colour={"bg-purple-200"}
          text_colour={"text-green-500"}
        />
      </div>
      <div className="w-full flex items-center mt-8 gap-4">
        <AdminMaintenanceRequestsTable />
        <AdminCommunityPosts />
      </div>
      <div className="h-[600px] flex gap-8">
        <AdminMaintenanceRequestChart />
        <AdminUsersOwnersChart />
      </div>
    </div>
  );
};

export default Home;
