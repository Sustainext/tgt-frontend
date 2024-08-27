import React from "react";

const Aside = ({ activeTab, handleTabClick }) => {
  return (
    <div className={`m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-lg sticky top-[5rem]`}>
      <div className="flex items-start py-4 min-w-[200px] min-h-[100vh] rounded-lg text-[0.875rem]">
        <div className="flex flex-col w-full font-medium">
          <div className="flex-col justify-end items-start gap-2 inline-flex mb-8">
            <div className="text-neutral-500 text-[10px] font-normal font-['Manrope'] uppercase leading-none tracking-wide">
              Analyse
            </div>
            <div className="text-neutral-500 text-base font-semibold font-['Manrope'] leading-none">
              General
            </div>
          </div>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Employees"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Employees")}
          >
            {/* <IoBusinessOutline className="w-5 h-5 mr-5" /> */}
            <span className="mr-7 text-left">Employees</span>
          </button>
          <div>
            <button
              className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
                activeTab === "Strategy, policies and practices"
                  ? "text-[#007EEF] "
                  : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
              }`}
              onClick={() => handleTabClick("Strategy, policies and practices")}
            >
              {/* <IoBulbOutline className="w-5 h-5 mr-5" /> */}
              <span className="mr-12 text-left">Strategy, policies and practices</span>
              <div className="inset-y-0 -right-2 flex items-center pointer-events-none"></div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Aside;
