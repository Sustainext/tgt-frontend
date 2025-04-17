"use client";
import { useState } from "react";
import MyGoals from "./MyGoals";
import MyTasks from "./TasksNew/MyTask";
import Preferences from "./Preferences/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DesktopLayout = ({ setActiveTab }) => {
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />

      {/* Desktop Layout */}

      <div className="hidden md:flex xl:flex lg:flex 4k:flex 2k:flex 2xl:flex xl:space-x-3 lg:space-x-3 2xl:space-x-3 md:space-x-3 xl:pe-4">
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

export default DesktopLayout;
