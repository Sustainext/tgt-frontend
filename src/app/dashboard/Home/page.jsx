"use client";
import MyGoals from "./MyGoals";
import MyTasks from "./TasksNew/MyTask";
import Preferences from "./Preferences/page";
import { ToastContainer } from "react-toastify";
import NivoYearlyGrowth from "@/app/shared/components/NivoYearlyGrowth";

const HomeDashboard = ({setActiveTab}) => {
  return (
    <>
    <ToastContainer style={{ fontSize: "12px", zIndex: 1000 }} />
      <div className="xl:flex 2xl:flex lg:flex md:flex xl:space-x-3 lg:space-x-3 2xl:space-x-3 md:space-x-3 pe-4 ">
        <div className="xl:w-1/2 2xl:w-1/2 lg:w-1/2 md:w-1/2 space-y-4 mb-8">
          <div>
            <MyTasks HomeActiveTab={setActiveTab} />
          </div>
          <div>
            <MyGoals />
          </div>
        </div>
        <div className="row-span-2 col-start-2 row-start-1 rounded-lg shadow border border-gray-200 p-4 h-[660px] xl:w-3/5 lg:w-3/5 md:w-3/5 2xl:w-3/5 overflow-auto table-scrollbar">
          <Preferences />
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
