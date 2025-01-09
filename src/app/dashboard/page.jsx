"use client";

import HomeDashboard from "./Home/page";
import { useState, useEffect } from "react";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import TasksPage from "./Home/Tasks";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const dispatch = useDispatch();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    dispatch(setHeadertext1("Sustainext HQ"));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("Dashboard"));
  }, [activeTab, dispatch]);

  return (
    <>
      <div>
        <div className="ms-6">
          <div
            className="my-4 gradient-text text-opacity-20 text-[22px] font-semibold leading-relaxed "
            translate="no"
          >
            Sustainext HQ
          </div>

          <div className="flex flex-col h-screen">
            <div className={`flex my-6 border-b`}>
              <button
                className={`pr-4 py-1 rounded-b-none text-sm font-bold leading-[15px] sustainext-hq ${
                  activeTab === "tab1"
                    ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                    : "border-transparent text-neutral-500"
                }`}
                onClick={() => handleTabChange("tab1")}
              >
                Dashboard
              </button>
              {/* <button
                className={`px-4 py-1 rounded-b-none text-sm font-bold leading-[15px] ${
                  activeTab === "tab2"
                    ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                    : "border-transparent text-neutral-500"
                }`}
                onClick={() => handleTabChange("tab2")}
              >
                ESG Performance
              </button> */}
              <button
                className={`px-4 py-1 rounded-b-none text-sm font-bold leading-[15px] ${
                  activeTab === "tab3"
                    ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                    : "border-transparent text-neutral-500"
                }`}
                onClick={() => handleTabChange("tab3")}
              >
                All Tasks
              </button>
              {/* <div className="ml-auto mb-2">
                <div>
                  <button className="right-10 top-18 ms-2 bg-gradient-to-r from-[#364161] to-[#06081f] hover:bg-gray-600 text-white font-bold py-2 mr-4 px-2 rounded text-xs take-a-tour">
                    Take a tour
                  </button>
                </div>
              </div> */}
            </div>

            <div className="flex-grow">
              <div className="flex-grow">
                {activeTab === "tab1" && <HomeDashboard />}

                {activeTab === "tab3" && <TasksPage />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
