"use client";
import { useState,useEffect } from "react";
// import MyGoals from "./MyGoals";
// import MyTasks from "./TasksNew/MyTask";
// import Preferences from "./Preferences/page";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout"
const HomeDashboard = ({ setActiveTab }) => {
  const [mobileTab, setMobileTab] = useState("tasks"); // Default active tab
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assume mobile if the screen width is less than 768px
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
       {isMobile ? (
        // Mobile version of ToastContainer with specific styles
        <MobileLayout setActiveTab={setActiveTab}/>
      ) : (
        // Desktop version of ToastContainer with different styles
        <DesktopLayout setActiveTab={setActiveTab}/>
      )}

 
    </>
  );
};

export default HomeDashboard;
