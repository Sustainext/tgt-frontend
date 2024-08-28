import React from "react";
import { IoLanguage } from "react-icons/io5";

const Aside = ({ activeTab, handleTabClick }) => {
  return (
    <div className="m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-lg sticky top-[5rem] overflow-hidden">
      <div className="flex items-start py-4 min-w-[200px] min-h-[100vh] rounded-lg text-[0.875rem]">
        <div className="flex flex-col w-full font-medium">
          <div className="flex-col justify-end items-start gap-2 inline-flex mb-8">
            <div className="text-neutral-500 text-[15px] font-normal font-['Manrope'] uppercase leading-none tracking-wide ms-4">
              Settings
            </div>
          </div>
          {["Language Settings"].map((tab) => (
            <button
              key={tab}
              className={`flex items-center justify-start px-2 py-2 mb-2 focus:outline-none w-full transition-colors duration-200 ease-in-out ${
                activeTab === tab
                  ? "text-[#007EEF] border-l-4 border-[#007EEF] bg-blue-50"
                  : "bg-transparent text-[#727272] hover:bg-blue-100 hover:text-[#007EEF]"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "Language Settings" && <IoLanguage className="w-5 h-5 mr-2" />}
              {/* {tab === "Social" && <MdOutlineGroup className="w-5 h-5 mr-5" />}
              {tab === "Governance" && <MdOutlineDiversity1 className="w-5 h-5 mr-5" />} */}
              <span className="mr-7">{tab}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;