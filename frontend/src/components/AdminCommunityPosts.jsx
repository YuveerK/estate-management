import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const posts = [
  {
    title: "Birthday Party 🎈🥳",
    description: "Join us at the clubhouse for cake, games, and fun!",
    timestamp: "2 hours ago",
  },
  {
    title: "Water Outage Notice 🚱",
    description: "Maintenance scheduled for 28 March from 10AM - 3PM.",
    timestamp: "5 hours ago",
  },
  {
    title: "Community Clean-Up 🌱",
    description: "Bring gloves and bags! Let's beautify our space together.",
    timestamp: "Yesterday",
  },
  {
    title: "Security Meeting 🛡️",
    description: "Discussion on recent incidents and upcoming improvements.",
    timestamp: "2 days ago",
  },
];

const PostCard = ({ title, description, timestamp }) => (
  <div className="mb-4 p-4 border border-gray-100 hover:shadow-md rounded-lg transition-all duration-200 bg-[#f9fafb]">
    <h2 className="text-lg font-semibold mb-1">{title}</h2>
    <p className="text-sm text-gray-600 mb-2">{description}</p>
    <p className="text-xs text-gray-400">{timestamp}</p>
  </div>
);

const AdminCommunityPosts = () => {
  return (
    <div className="w-[40%] h-[500px] bg-white rounded-2xl shadow-md p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold text-xl">Community Posts</h1>
          <p className="text-sm text-gray-400">
            Stay up to date with what’s happening
          </p>
        </div>
        <div className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-[#f2f5fa] cursor-pointer transition-all duration-150">
          <p className="mr-2 text-sm">View All</p>
          <GoArrowUpRight size={18} />
        </div>
      </div>

      {/* Posts List */}
      <div className="overflow-y-auto space-y-2 pr-1">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default AdminCommunityPosts;
