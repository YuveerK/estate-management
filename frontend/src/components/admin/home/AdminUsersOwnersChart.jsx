import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const AdminMaintenanceRequestChart = () => {
  const data = [
    { name: "Owners", value: 100 },
    { name: "Tenants", value: 300 },
  ];
  const COLORS = ["#6366f1", "#10b981"]; // Purple & Green (Tailwind palette vibes)

  return (
    <ResponsiveContainer
      width="40%"
      height="100%"
      className="  rounded-md bg-white shadow-sm mt-8"
    >
      <div className="p-4">
        <h1 className="font-medium text-xl">Recent Maintenance Requests</h1>
        <p className="text-sm text-gray-400">
          Overview of the latest maintenance requests
        </p>
      </div>
      <PieChart
        margin={{
          top: 60,
          right: 30,
          left: 20,
          bottom: 200,
        }}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={110}
          paddingAngle={3}
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />

        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: "14px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AdminMaintenanceRequestChart;
