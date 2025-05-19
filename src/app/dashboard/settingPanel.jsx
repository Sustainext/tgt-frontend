"use client";
import React, { useState, useRef, useEffect } from "react";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import ProfileSettings from "../shared/components/profileSetting";
import AccountSettings from "../shared/components/accountSetting";
import { FaArrowLeft } from "react-icons/fa";
// import { toast,ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";


export default function SettingsPanel({
  activeTab,
  setActiveTab,
  setProfileVisible,
  userProfileData,
  email,
  setRefresh
}) {
    const [loading, setLoading] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(true); // true = menu, false = section


    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

      const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (isMobileView) {
          setIsMobileSettingsOpen(false); // Switch to full screen view
        }
      };
    
      const backToMenu = () => {
        setIsMobileSettingsOpen(true);
      };
  

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings userProfileData={userProfileData}
        email={email} backToMenu={backToMenu}
        setRefresh={setRefresh} setProfileVisible={setProfileVisible} setLoading={setLoading} />;
      case "account":
        return <AccountSettings setProfileVisible={setProfileVisible} backToMenu={backToMenu} setLoading={setLoading} />;
      case "notifications":
        return (
          <div className="p-6 text-gray-500">
            Notification settings content goes here.
          </div>
        );
      default:
        return null;
    }
  };


  return (
    // <div className="min-h-screen flex items-center justify-center px-6 py-6 mt-12">
    //   <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row w-[900px] h-[700px] table-scrollbar">
    //     {/* Sidebar */}
    //     <div className="hidden md:block md:w-[280px] border-b md:border-b-0 md:border-r p-6">
    //       <h2 className="text-[18px] text-[#252C32] font-semibold mb-4">
    //         Settings
    //       </h2>
    //       <div className="space-y-2 flex md:flex-col justify-between md:justify-start">
    //         <button
    //           className={`w-full flex text-left px-3 py-2 rounded-lg text-[14px] ${
    //             activeTab === "profile"
    //               ? "bg-blue-50 text-[#344054] font-medium"
    //               : "text-gray-900"
    //           }`}
    //           onClick={() => setActiveTab("profile")}
    //         >
    //           <RiUserSettingsLine className="w-4 mt-0.5 h-4 mr-2" />
    //           Profile Settings
    //         </button>
    //         <button
    //           className={`w-full flex text-left px-3 py-2 rounded-lg text-[14px] ${
    //             activeTab === "account"
    //               ? "bg-blue-50 text-[#344054] font-medium"
    //               : "text-gray-900"
    //           }`}
    //           onClick={() => setActiveTab("account")}
    //         >
    //           <IoSettingsOutline className="w-4 mt-0.5 h-4 mr-2" />
    //           Account Settings
    //         </button>
    //         <button
    //           disabled={true}
    //           className={`w-full flex text-left px-3 py-2 rounded-lg text-[14px] cursor-not-allowed opacity-25 ${
    //             activeTab === "notifications"
    //               ? "bg-blue-50 text-[#344054] font-medium"
    //               : "text-gray-900"
    //           }`}
    //           //   onClick={() => setActiveTab('notifications')}
    //         >
    //           <IoMdNotificationsOutline className="w-4 mt-0.5 h-4 mr-2" />
    //           Notification Settings
    //         </button>
    //       </div>
    //     </div>

    //     {/* Content Area */}
    //     <div className="flex-1 w-full overflow-y-auto">{renderContent()}</div>
    //   </div>
    //   {loading && (
    //           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
    //             <Oval
    //               height={50}
    //               width={50}
    //               color="#00BFFF"
    //               secondaryColor="#f3f3f3"
    //               strokeWidth={2}
    //               strokeWidthSecondary={2}
    //             />
    //           </div>
    //         )}
    // </div>

    <div className="min-h-screen h-full md:flex md:justify-center md:items-center md:px-6 md:py-6 md:mt-12">
    <div className="bg-white h-full rounded-md shadow-md w-full md:w-[900px]  xl:h-[100dvh] lg:h-[100dvh] md:h-[100dvh] flex flex-col md:flex-row my-4">
      {/* Desktop Sidebar */}
      {!isMobileView && (
        <div className="md:w-[280px] border-r p-6">
          <h2 className="text-[18px] text-[#252C32] font-semibold mb-4">Settings</h2>
          <div className="space-y-2">
            <button
              className={`w-full flex text-left px-3 py-2 rounded-lg text-[14px] ${
                activeTab === "profile"
                  ? "bg-blue-50 text-[#344054] font-medium"
                  : "text-gray-900"
              }`}
              onClick={() => handleTabClick("profile")}
            >
              <RiUserSettingsLine className="w-4 mt-0.5 h-4 mr-2" />
              Profile Settings
            </button>
            <button
              className={`w-full flex text-left px-3 py-2 rounded-lg text-[14px] ${
                activeTab === "account"
                  ? "bg-blue-50 text-[#344054] font-medium"
                  : "text-gray-900"
              }`}
              onClick={() => handleTabClick("account")}
            >
              <IoSettingsOutline className="w-4 mt-0.5 h-4 mr-2" />
              Account Settings
            </button>
            <button
              disabled
              className="w-full flex text-left px-3 py-2 rounded-lg text-[14px] cursor-not-allowed opacity-25"
            >
              <IoMdNotificationsOutline className="w-4 mt-0.5 h-4 mr-2" />
              Notification Settings
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar or Content Fullscreen */}
      {isMobileView && isMobileSettingsOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
          <div className="flex drop-shadow-lg mb-4">
          <h2 className="text-[18px] text-[#101828] font-semibold mb-1">
            Settings
          </h2>
          <button
            className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => {
              setProfileVisible(false);
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
          <div className="space-y-2">
            <button
              className="w-full mb-5 flex text-left px-3 shadow-md py-2 rounded-lg text-[16px] text-gray-900"
              onClick={() => handleTabClick("profile")}
            >
              <RiUserSettingsLine className="w-5 mt-0.5 h-5 mr-2" />
              Profile Settings
            </button>
            <button
              className="w-full mb-5 flex text-left px-3 shadow-md py-2 rounded-lg text-[16px] text-gray-900"
              onClick={() => handleTabClick("account")}
            >
              <IoSettingsOutline className="w-5 mt-0.5 h-5 mr-2" />
              Account Settings
            </button>
            <button
              disabled
              className="w-full mb-5 flex text-left px-3 shadow-md py-2 rounded-lg text-[16px] cursor-not-allowed opacity-25"
            >
              <IoMdNotificationsOutline className="w-5 mt-0.5 h-5 mr-2" />
              Notification Settings
            </button>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 w-full overflow-y-auto relative">
        {/* {isMobileView && !isMobileSettingsOpen && (
          <div className="flex items-center px-4 py-2 border-b sticky top-0 bg-white z-10">
            <button onClick={backToMenu} className="mr-2 text-xl font-bold">
              ←
            </button>
            <h3 className="text-lg font-semibold capitalize">{activeTab} Settings</h3>
          </div>
        )} */}
        {(!isMobileView || !isMobileSettingsOpen) && renderContent()}
      </div>
    </div>

    {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      {/* <ToastContainer /> */}
  </div>



    
  );
}
