import React, { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Settings
            </h1>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Account Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
                    Name
                  </label>
                  <p className="mt-1 text-gray-900 ">
                    {user?.name || user?.username || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900 ">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 ">
                    Role
                  </label>
                  <p className="mt-1 text-gray-900 capitalize">
                    {user?.role || "Student"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Preferences
              </h2>

              <div className="space-y-6">
                {/* Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-800 font-medium">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-500 ">
                      Receive email updates about assignments and courses.
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
