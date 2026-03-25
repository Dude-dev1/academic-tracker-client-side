import React from "react";
import { Search, Bell, Moon, User } from "react-feather";

const Header = () => {
  return (
    <header className="bg-white shadow-sm flex items-center justify-between p-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>
      <div className="flex items-center">
        <div className="relative mr-4">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Moon />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 ml-2">
          <Bell />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 ml-2">
          <User />
        </button>
      </div>
    </header>
  );
};

export default Header;
