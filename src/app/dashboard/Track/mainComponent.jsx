"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
// import Aside from "./Aside";
// import EnvironmentTrack from "./Environment/page";
// import SocialTrack from "./Social/page";
// import GovernanceTrack from "./Governance/page";
// import GeneralTrack from "./General/page";
// import EconomicTrack from "./Economic/page";
// import { GlobalState } from "../../../Context/page";
// import axiosInstance from "../../utils/axiosMiddleware";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";

const Index = () => {
  const [activeModule, setActiveModule] = useState("Environment");
  // const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  // const [containerWidth, setContainerWidth] = useState("100%");
  // const [dashboardData, setDashboardData] = useState(null);
  // const open = GlobalState();
  const dispatch = useDispatch();
  // const handleTabClick = (module) => {
  //   setActiveModule(module);
  // };
  useEffect(() => {
    dispatch(setHeadertext1("Track"));
    dispatch(setHeaderdisplay(null));
    dispatch(setHeadertext2(null));
    dispatch(setMiddlename(null));
  }, [activeModule, dispatch]);
  // useLayoutEffect(() => {
  //   const updateSizes = () => {
  //     const mainSidebarWidth = open ? 230 : 80;
  //     const totalSidebarWidth = mainSidebarWidth;

  //     const screenWidth = window.innerWidth;
  //     const screenHeight = window.innerHeight;

  //     const contentWidth = screenWidth - totalSidebarWidth;
  //     const contentHeight = screenHeight;

  //     setContentSize({
  //       width: Math.max(contentWidth, 250), // Minimum width of 250px
  //       height: Math.max(contentHeight, 400), // Minimum height of 400px
  //     });

  //     if (screenWidth > 1600) {
  //       setContainerWidth("1600px");
  //     } else {
  //       setContainerWidth("100%");
  //     }
  //   };

  //   updateSizes();
  //   window.addEventListener("resize", updateSizes);
  //   return () => window.removeEventListener("resize", updateSizes);
  // }, [open]);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     const response = await axiosInstance("/sustainapp/track_dashboards/");
  //     console.log("response", response);

  //     const data = response.data;
  //     setDashboardData(data);
  //   };
  //   fetchDashboardData();
  // }, []);

  return (
    // <div className="flex justify-center overflow-x-auto">
    //   <div
    //     className="flex justify-start"
    //     style={{ width: containerWidth, minWidth: "100%" }}
    //   >
    //     <div className="w-[220px] min-h-[90vh] py-[11px] flex-shrink-0">
    //       <Aside activeTab={activeModule} handleTabClick={handleTabClick} />
    //     </div>
    //     <div className="flex-grow flex justify-center items-center">
    //       {activeModule === "Environment" && (
    //         <EnvironmentTrack
    //           contentSize={contentSize}
    //           dashboardData={dashboardData}
    //         />
    //       )}
    //       {activeModule === "Social" && (
    //         <SocialTrack
    //           contentSize={contentSize}
    //           dashboardData={dashboardData}
    //         />
    //       )}
    //       {activeModule === "Governance" && (
    //         <GovernanceTrack
    //           contentSize={contentSize}
    //           dashboardData={dashboardData}
    //         />
    //       )}
    //       {activeModule === "General" && (
    //         <GeneralTrack
    //           contentSize={contentSize}
    //           dashboardData={dashboardData}
    //         />
    //       )}
    //       {activeModule === "Economic" && (
    //         <EconomicTrack
    //           contentSize={contentSize}
    //           dashboardData={dashboardData}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </div>

    // track section under maintainance design
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-white">
    <img
      src="https://sustainextstorage1.blob.core.windows.net/static/ico%201.png" // <-- replace with correct path
      alt="maintenance icon"
      className="w-[40%] sm:w-[40%] md:w-[25%] lg:w-[20%] object-contain mb-6"
    />
    <h2 className="text-center text-2xl md:text-xl font-bold text-gray-700">
    This section is currently under maintenance and will be back soon
    </h2>
  </div>
  );
};

export default Index;
