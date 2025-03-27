import React from "react";
import { MdClose } from "react-icons/md";
const Aside = ({ activeTab, handleTabClick,setMobileopen }) => {
  const toggleSidebar = () => {
    setMobileopen(false);
  };
  return (
    <div className={`m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-lg sticky top-[5rem]`}>
      <div className="flex items-start py-4 min-w-[200px] min-h-[100vh] rounded-lg text-[0.875rem]">
        <div className="flex flex-col w-full font-medium">
        <div className="flex  items-start gap-2 mb-8 w-full">
          <div className="w-full">
            <div className="text-neutral-500 text-[10px] font-normal font-['Manrope'] uppercase leading-none tracking-wide">
              Analyse
            </div>
            <div className="text-neutral-500 text-base font-semibold font-['Manrope'] leading-none">
            Governance
            </div>
            </div>
            <div className="float-end block xl:hidden md:hidden lg:hidden 2xl:hidden 4k:hidden">
                          <MdClose onClick={toggleSidebar} className="text-3xl" />
                        </div>
          </div>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab1"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab1")}
          >
            {/* <IoBusinessOutline className="w-5 h-5 mr-5" /> */}
            <span className="mr-7 text-left">Annual total compensation ratio</span>
          </button>


        </div>
      </div>
    </div>
  );
};

export default Aside;
