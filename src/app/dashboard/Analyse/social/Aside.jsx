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
              Social
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
            <span className="mr-7 text-left">Employment</span>
          </button>
          <div>
            <button
              className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
                activeTab === "Tab2"
                  ? "text-[#007EEF] "
                  : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
              }`}
              onClick={() => handleTabClick("Tab2")}
            >
              {/* <IoBulbOutline className="w-5 h-5 mr-5" /> */}
              <span className="mr-12 text-left">Occupational health and safety</span>
              <div className="inset-y-0 -right-2 flex items-center pointer-events-none"></div>
            </button>
          </div>

          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab3"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab3")}
          >
            {/* <IoTrashOutline className="w-5 h-5 mr-5" /> */}
            <span className="mr-12 text-left">Child Labour</span>
          </button>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab4"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab4")}
          >

            <span className="mr-8 text-left">Forced or Compulsory Labour</span>
          </button>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab5"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab5")}
          >

            <span className="mr-8 text-left">Diversity & Inclusion</span>
          </button>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab6"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab6")}
          >
            <span className="mr-8 text-left">Supplier Social assessment</span>
          </button>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab7"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab7")}
          >

            <span className="mr-8 text-left">Training</span>
          </button>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab12"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab12")}
          >
            <span className="mr-8 text-left">Customer Health and Safety</span>
          </button>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab13"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab13")}
          >
            <span className="mr-8 text-left">Marketing and Labeling</span>
          </button>
          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab8"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab8")}
          >

            <span className="mr-8 text-left">Non-Discrimination</span>
          </button>

          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab9"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab9")}
          >

            <span className="mr-8 text-left">Collective Bargaining</span>
          </button>

          <button
            className={`flex items-center justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab10"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab10")}
          >

            <span className="mr-8 text-left">Community Development</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Aside;
