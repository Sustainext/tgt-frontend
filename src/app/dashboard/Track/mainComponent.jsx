"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Aside from "./Aside";
import EnvironmentTrack from "./Environment/page";
import SocialTrack from "./Social/page";
import GovernanceTrack from "./Governance/page";
import GeneralTrack from "./General/page";
import EconomicTrack from "./Economic/page";
import { GlobalState } from "../../../Context/page";
import axiosInstance from "../../utils/axiosMiddleware";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";

const Index = () => {
  const [activeModule, setActiveModule] = useState("Environment");
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const [containerWidth, setContainerWidth] = useState("100%");
  const [dashboardData, setDashboardData] = useState(null);

  const open = GlobalState();
  const dispatch = useDispatch();
  const handleTabClick = (module) => {
    setActiveModule(module);
  };
  useEffect(() => {
    dispatch(setHeadertext1("Track"));
    dispatch(setHeaderdisplay(null));
    dispatch(setHeadertext2(activeModule));
    dispatch(setMiddlename(null));
  }, [activeModule, dispatch]);
  useLayoutEffect(() => {
    const updateSizes = () => {
      const mainSidebarWidth = open ? 230 : 80;
      const totalSidebarWidth = mainSidebarWidth;
  
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
  
      let contentWidth, contentHeight;
  
      if (screenWidth <= 768) {
        // Mobile devices
        contentWidth = 429; // slight padding
        contentHeight = screenHeight - 100; // adjust as per header/footer
      } else {
        // Desktop/tablet
        contentWidth = screenWidth - totalSidebarWidth;
        contentHeight = screenHeight;
      }
  
      setContentSize({
        width: Math.max(contentWidth, 250), // Minimum width
        height: Math.max(contentHeight, 400), // Minimum height
      });
  
      if (screenWidth > 1600) {
        setContainerWidth("1600px");
      } else {
        setContainerWidth("100%");
      }
    };
  
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [open]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await axiosInstance("/sustainapp/track_dashboards/");
      console.log("response", response);

      const data = response.data;
      setDashboardData(data);
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="xl:flex md:flex justify-center overflow-x-auto">
      <div
        className="xl:flex md:flex justify-start"
        style={{ width: containerWidth, minWidth: "100%" }}
      >
        <div className="xl:w-[220px] xl:min-h-[90vh] py-[11px] flex-shrink-0">
          <Aside activeTab={activeModule} handleTabClick={handleTabClick} />
        </div>

        <div className="xl:flex-grow xl:flex xl:justify-center xl:items-center">
          {activeModule === "Environment" && (
            <EnvironmentTrack
              contentSize={contentSize}
              dashboardData={dashboardData}
            />
          )}
          {activeModule === "Social" && (
            <SocialTrack
              contentSize={contentSize}
              dashboardData={dashboardData}
            />
          )}
          {activeModule === "Governance" && (
            <GovernanceTrack
              contentSize={contentSize}
              dashboardData={dashboardData}
            />
          )}
          {activeModule === "General" && (
            <GeneralTrack
              contentSize={contentSize}
              dashboardData={dashboardData}
            />
          )}
          {activeModule === "Economic" && (
            <EconomicTrack
              contentSize={contentSize}
              dashboardData={dashboardData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
