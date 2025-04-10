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
import axiosInstance from "../utils/axiosMiddleware";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axiosInstance.get("/api/auth/get_user_roles/");
        
        if (response.status === 200) {
          const data = await response.data;
          console.log("Fetched user role:", data);
          setIsAdmin(data.admin);
        } else {
          console.error("Failed to fetch user role");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserRole();
  }, []);

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
        <div className="xl:ms-6">
          <div
            className="my-4 gradient-text text-opacity-20 text-[22px] font-semibold leading-relaxed"
            translate="no"
          >
            Sustainext HQ
          </div>

          <div className="flex flex-col">
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

              {/* Show "All Tasks" tab only if user is admin */}
              {!loading && isAdmin && (
                <button
                  className={`px-4 rounded-b-none text-sm font-bold leading-[15px] ${
                    activeTab === "tab3"
                      ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                      : "border-transparent text-neutral-500"
                  }`}
                  onClick={() => handleTabChange("tab3")}
                >
                  All Tasks
                </button>
              )}
            </div>

            <div className="flex-grow">
              {activeTab === "tab1" && <HomeDashboard setActiveTab={setActiveTab} />}
              {!loading && isAdmin && activeTab === "tab3" && <TasksPage />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
