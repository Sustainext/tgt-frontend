import React from "react";
import { MdOutlineDiversity1, MdOutlineGroup, MdPublic } from "react-icons/md";

const Aside = ({ activeTab, handleTabClick }) => {
  return (
    <div className={`m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-lg sticky top-[5rem]`}>
      <div className="flex items-start py-4 min-w-[200px] min-h-[100vh] rounded-lg text-[0.875rem]">
        <div className="flex flex-col w-full font-medium">
          <div className="flex-col justify-end items-start gap-2 inline-flex mb-8">
            <div className="text-neutral-500 text-[15px] font-normal font-['Manrope'] uppercase leading-none tracking-wide ms-4">
              Track
            </div>
            {/* <div className="text-neutral-500 text-base font-semibold font-['Manrope'] leading-none">
              Track
            </div> */}
          </div>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-2 focus:outline-none w-full ${
              activeTab === "Environment"
                ? "text-[#007EEF] border-l-4 border-[#007EEF]"
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Environment")}
          >
            <MdPublic className="w-5 h-5 mr-5" />
            <span className="mr-7">Environment</span>
          </button>
          <div>
            <button
              className={`flex items-center justify-start px-2 py-2 mb-2 focus:outline-none w-full ${
                activeTab === "Social"
                  ? "text-[#007EEF] border-l-4 border-[#007EEF]"
                  : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
              }`}
              onClick={() => handleTabClick("Social")}
            >
              <MdOutlineGroup className="w-5 h-5 mr-5" />
              <span className="mr-12">Social</span>
              <div className="inset-y-0 -right-2 flex items-center pointer-events-none"></div>
            </button>
          </div>

          <button
            className={`flex items-center justify-start px-2 py-2 mb-2 focus:outline-none w-full ${
              activeTab === "Governance"
                ? "text-[#007EEF] border-l-4 border-[#007EEF]"
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Governance")}
          >
            <MdOutlineDiversity1 className="w-5 h-5 mr-5" />
            <span className="mr-12">Governance</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aside;
