import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const DropdownList = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Environment");

  const tabs = [
    { label: "Environment", key: "enviromentTopics" },
    { label: "Social", key: "socialTopics" },
    { label: "Governance", key: "governanceTopics" },
  ];

  const getTopics = () => {
    const key = tabs.find((t) => t.label.startsWith(activeTab))?.key;
    const topics = item[key] || [];
    return topics.length > 0
      ? topics.map((topic, index) => (
          <div className="mb-1" key={index}>
            {index + 1}. {topic}
          </div>
        ))
      : "Not Selected";
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 focus:outline-none"
      >
        <p className="flex text-[#007EEF] ">
          View All <MdKeyboardArrowDown className="text-[18px]" />
        </p>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800">List of Materiality </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-gray-700 text-sm"
              >
                Close
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label.split(" ")[0])}
                  className={`px-3 py-1 text-xs border rounded-md ${
                    activeTab === tab.label.split(" ")[0]
                      ? "bg-[#007EEF] text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Topics List */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar text-sm text-black text-left">
              {getTopics()}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DropdownList;
