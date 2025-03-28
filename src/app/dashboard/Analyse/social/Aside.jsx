import React from "react";
import { MdOutlineGroups2, MdKeyboardArrowDown, MdClose } from "react-icons/md";
const Aside = ({ activeTab, handleTabClick, setMobileopen }) => {
  const toggleSidebar = () => {
    setMobileopen(false);
  };
  return (
    <div
    className={`m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-lg fixed  `}
    >
       <div className="flex items-start py-4 w-[199px] xl:min-w-[200px] lg:min-w-[200px] md:min-w-[200px] 4k:min-w-[200px] 2k:min-w-[200px] 2xl:min-w-[200px] min-w-[422px] min-h-[100vh] rounded-lg text-[0.875rem]">
        <div className="flex flex-col w-full font-medium">
          <div className="flex  items-start gap-2 mb-8 w-full">
            <div className="w-full">
              <div className="text-neutral-500 text-base font-semibold font-['Manrope'] leading-none">
                Social
              </div>
            </div>
            <div className="float-end block xl:hidden md:hidden lg:hidden 2xl:hidden 4k:hidden">
              <MdClose onClick={toggleSidebar} className="text-3xl" />
            </div>
          </div>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab1"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab1")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Occupational health and safety
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab2"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab2")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Human Rights and Community Impact
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab3"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab3")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">Labor Management</span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab4"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab4")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Child and Forced Labour
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab5"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab5")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">Employment</span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab6"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab6")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Training and Development
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab7"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab7")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Customer Privacy & Data Security
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab8"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab8")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Product Safety & Quality
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab9"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab9")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Marketing and Labeling
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab10"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab10")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Supply Chain Labor Standards
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab11"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab11")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">
                Diversity & Equal Oppportunity
              </span>
            </div>
          </button>
          <button
            className={`flex  justify-start px-2 py-2 mb-1 focus:outline-none w-full ${
              activeTab === "Tab12"
                ? "text-[#007EEF] "
                : "bg-transparent text-[#727272] hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleTabClick("Tab12")}
          >
            <div className="w-[20%]">
              <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />
            </div>
            <div className="w-[67%] text-left ">
              <span className="indent-0 text-[13px]">Non-discrimination</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aside;
