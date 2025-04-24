"use client";
import { useState } from "react";
import MyGoals from "./MyGoals";
import MyTasks from "./TasksNew/MyTask";
import Preferences from "./Preferences/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MobileLayout = ({ setActiveTab }) => {
  const [mobileTab, setMobileTab] = useState("tasks"); // Default active tab

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      {/* Mobile Tabs */}

      <div className="md:hidden xl:hidden lg:hidden 4k:hidden 2k:hidden 2xl:hidden  block mb-4">
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
    </>
  );
};

export default MobileLayout;
