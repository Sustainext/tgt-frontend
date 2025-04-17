"use client";
import { useState } from "react";
import MyGoals from "./MyGoals";
import MyTasks from "./TasksNew/MyTask";
import Preferences from "./Preferences/page";
import { ToastContainer } from "react-toastify";

const HomeDashboard = ({ setActiveTab }) => {
  const [mobileTab, setMobileTab] = useState("tasks"); // Default active tab

  return (
    <>
     

      {/* Mobile Tabs */}
      <div className="md:hidden block mb-4">
      <ToastContainer style={{ fontSize: "12px", zIndex: 1000 }} />
        <div className="flex justify-center space-x-2 p-2  rounded-full w-full max-w-md mx-auto">
          {["tasks", "goals", "preferences"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 text-sm py-2 px-3 rounded-md transition-all duration-200 ${
                mobileTab === tab
                  ? "bg-blue-500 text-white "
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4 px-2">
          {mobileTab === "tasks" && <MyTasks HomeActiveTab={setActiveTab} />}
          {mobileTab === "goals" && <MyGoals />}
          {mobileTab === "preferences" && <Preferences />}
        </div>
      </div>
      <ToastContainer style={{ fontSize: "12px", zIndex: 1000 }} />
      {/* Desktop Layout */}
      <div className="hidden md:flex xl:space-x-3 lg:space-x-3 2xl:space-x-3 md:space-x-3 xl:pe-4">
        <div className="xl:w-1/2 2xl:w-1/2 lg:w-1/2 md:w-1/2 space-y-4 mb-8">
          <MyTasks HomeActiveTab={setActiveTab} />
          <MyGoals />
        </div>
        <div className="rounded-lg shadow border h-[955px] border-gray-200 p-4 xl:w-3/5 lg:w-3/5 md:w-3/5 2xl:w-3/5 overflow-auto table-scrollbar">
          <Preferences />
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
