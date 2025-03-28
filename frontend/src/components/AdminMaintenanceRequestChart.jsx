import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminMaintenanceRequestChart = () => {
  const data = [
    {
      name: "January",
      requests: 2400,
      amt: 2400,
    },
    {
      name: "February",
      requests: 1398,
      amt: 2210,
    },
    {
      name: "March",
      requests: 9800,
      amt: 2290,
    },
    {
      name: "April",
      requests: 3908,
      amt: 2000,
    },
    {
      name: "May",
      requests: 4800,
      amt: 2181,
    },
    {
      name: "June",
      requests: 3800,
      amt: 2500,
    },
    {
      name: "July",
      requests: 4300,
      amt: 2100,
    },
  ];
  return (
    <ResponsiveContainer
      width="60%"
      height="100%"
      className="  rounded-md bg-white shadow-sm mt-8"
    >
      <div className="p-4">
        <h1 className="font-medium text-xl">Recent Maintenance Requests</h1>
        <p className="text-sm text-gray-400">
          Overview of the latest maintenance requests
        </p>
      </div>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 60,
          right: 30,
          left: 20,
          bottom: 90,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="requests"
          fill="orange"
          activeBar={<Rectangle fill="darkorange" stroke="darkorange" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AdminMaintenanceRequestChart;
