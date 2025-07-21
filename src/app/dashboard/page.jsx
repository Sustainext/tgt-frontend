"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import HomeDashboard from "./Home/page";
import TasksPage from "./Home/Tasks";
import axiosInstance from "../utils/axiosMiddleware";

import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../lib/redux/features/topheaderSlice";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [latestDisclosures, setLatestDisclosures] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchLatestDisclosures();
  }, []);

  const fetchLatestDisclosures = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/tcfd_framework/get-latest-selected-disclosures/`
      );

      if (response.data?.data) {
        const { framework_data, selected_disclosures } = response.data.data;

        // Try to find TCFD framework
        let selectedFramework = framework_data.find((f) =>
          f.name.toLowerCase().includes("tcfd")
        );

        // If TCFD not found, use the first available framework
        if (!selectedFramework && framework_data.length > 0) {
          selectedFramework = framework_data[0];
          console.warn(
            "⚠️ TCFD not found. Defaulting to first framework:",
            selectedFramework.name
          );
        }

        // Set framework cookie
        if (selectedFramework?.id) {
          Cookies.set("selected_framework_id", selectedFramework.id, {
            expires: 7,
          });
          console.log(
            "✅ Selected framework set in cookie:",
            selectedFramework
          );
        }

        //Find BRSR framework and set cookie
      let brsrFramework = framework_data.find((f) =>
        f.name.toLowerCase().includes("brsr")
      );
       if (!brsrFramework && framework_data.length > 0) {
          brsrFramework = framework_data[0];
          console.warn(
            "⚠️ TCFD not found. Defaulting to first framework:",
            selectedFramework.name
          );
        }
      if (brsrFramework?.id) {
        Cookies.set("selected_brsr_framework_id", brsrFramework.id, {
          expires: 7,
        });
        console.log(
          "✅ BRSR framework set in cookie:",
          brsrFramework
        );
      }


        // Set disclosures cookie
        Cookies.set(
          "selected_disclosures",
          JSON.stringify(selected_disclosures),
          {
            expires: 7,
          }
        );
        Cookies.set(
          "tcfd_sector",
          JSON.stringify(response.data.data.tcfd_reporting_information_sector),
          {
            expires: 7,
          }
        );
            Cookies.set(
          "tcfd_sector_type",
          JSON.stringify(response.data.data.tcfd_reporting_information_sector_type),
          {
            expires: 7,
          }
        );
        setLatestDisclosures(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching latest disclosures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axiosInstance.get("/api/auth/get_user_roles/");

        if (response.status === 200) {
          const data = response.data;
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
    <div className="xl:ms-6 lg:ms-6">
      <div
        className="my-4 gradient-text text-opacity-20 text-[22px] font-semibold leading-relaxed"
        translate="no"
      >
        Sustainext HQ
      </div>

      <div className="flex flex-col">
        <div className="flex my-6 border-b">
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
          {activeTab === "tab1" && (
            <HomeDashboard setActiveTab={setActiveTab} />
          )}
          {!loading && isAdmin && activeTab === "tab3" && <TasksPage />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
