import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Book,
  Users,
  Briefcase,
  FileText,
  Settings,
  LogOut,
} from "react-feather";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">EDUMIN</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <Home className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/courses"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <Book className="mr-3" />
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <Users className="mr-3" />
              Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/professors"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <Briefcase className="mr-3" />
              Professors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/assignments"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <FileText className="mr-3" />
              Assignments
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <ul>
          <li>
            <NavLink
              to="/settings"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              <Settings className="mr-3" />
              Settings
            </NavLink>
          </li>
          <li>
            <button className="flex items-center p-2 rounded-lg hover:bg-gray-700 w-full text-left">
              <LogOut className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
