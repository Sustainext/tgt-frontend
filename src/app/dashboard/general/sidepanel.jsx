"use client";
import { useState, useEffect } from "react";
import { MdDiversity2, MdKeyboardArrowDown, MdClose } from "react-icons/md";
import Cookies from "js-cookie";

// Section keys
const sections = {
  TCFD: "TCFD",
  GRI: "GRI",
  ORG_DETAILS: "ORG_DETAILS",
  ORG_STRUCTURE: "ORG_STRUCTURE",
  COMPLIANCE: "COMPLIANCE",
  MEMBERSHIP: "MEMBERSHIP",
  STAKEHOLDER: "STAKEHOLDER",
  BARGAINING: "BARGAINING"
};

// Menu/Section configuration
const menuConfig = (frameworkId) => [
  frameworkId === "6" && {
    key: sections.TCFD,
    label: "TCFD reporting Information",
    icon: <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />,
    tabs: [
      { tab: "TCFD Disclosure Selection", label: "TCFD Disclosure Selection" }
    ]
  },
  {
    key: sections.GRI,
    label: "GRI Reporting info",
    icon: <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />,
    tabs: [
      { tab: "Org Details", label: "Org Details" },
      { tab: "Entities", label: "Entities" },
      { tab: "Report Details", label: "Report Details" },
      { tab: "Restatement", label: "Restatement" },
      { tab: "Assurance", label: "Assurance" }
    ]
  },
  {
    key: sections.ORG_DETAILS,
    label: "Organization Details",
    icon: <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />,
    tabs: [
      { tab: "Business Details", label: "Business Details" },
      { tab: "Workforce-Employees", label: "Workforce-Employees" },
      { tab: "Workforce-Other Workers", label: "Workforce-Other Workers" }
    ]
  },
  {
    key: sections.COMPLIANCE,
    label: "Compliance",
    icon: <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />,
    tabs: [
      { tab: "Laws and Regulation", label: "Laws and Regulation" },
      {tab:"Transparency and Disclosures Compliances", label:"Transparency and Disclosures Compliances"}
    ]
  },
  {
    key: sections.MEMBERSHIP,
    label: "Membership & Association",
    icon: <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />,
    tabs: [
      { tab: "Membership & Association", label: "Membership & Association" }
    ]
  },
  {
    key: sections.STAKEHOLDER,
    label: "Stakeholder Engagement",
    icon: <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />,
    tabs: [
      { tab: "Stakeholder Engagement", label: "Stakeholder Engagement" }
    ]
  },
  {
    key: sections.BARGAINING,
    label: "Collective Bargaining Agreements",
    icon: <MdDiversity2 className="w-[16px] h-[16px] mr-2 mt-0.5" />,
    tabs: [
      { tab: "Collective Bargaining Agreements", label: "Collective Bargaining Agreements" }
    ]
  }
].filter(Boolean); // Remove falsy (for frameworks!).

const tabToSectionMap = {
  "Org Details": sections.GRI,
  "Entities": sections.GRI,
  "Report Details": sections.GRI,
  "Restatement": sections.GRI,
  "Assurance": sections.GRI,
  "TCFD Disclosure Selection": sections.TCFD,
  "Business Details": sections.ORG_DETAILS,
  "Workforce-Employees": sections.ORG_DETAILS,
  "Workforce-Other Workers": sections.ORG_DETAILS,
  "Laws and Regulation": sections.COMPLIANCE,
  "Transparency and Disclosures Compliances":sections.COMPLIANCE,
  "Membership & Association": sections.MEMBERSHIP,
  "Stakeholder Engagement": sections.STAKEHOLDER,
  "Collective Bargaining Agreements": sections.BARGAINING
};

const Aside = ({ activeTab, handleTabClick, setMobileopen }) => {
  const frameworkId = Cookies.get("selected_framework_id");
  const [openSection, setOpenSection] = useState(null);

  // Sync openSection with activeTab
  useEffect(() => {
    setOpenSection(tabToSectionMap[activeTab] || null);
  }, [activeTab]);

  const toggleSection = (sectionKey) => {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  return (
    <div className="m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-md h-full">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[43%] lg:w-[200px] xl:w-[200px] 2xl:w-[200px] 3xl:w-[351px] scrollable-content">
        <div className="flex flex-col w-full font-medium">
          <button className="flex justify-between items-center px-4 py-2 -mt-4 mb-8 rounded-none focus:outline-none text-[#727272] font-bold">
            <div>
              <span className="text-[16px] font-extrabold">General</span>
            </div>
            <div className=" float-end block xl:hidden md:block lg:hidden 2xl:hidden 4k:hidden">
              <MdClose onClick={() => setMobileopen(false)} className="text-3xl" />
            </div>
          </button>
          {menuConfig(frameworkId).map((section) => (
            <div key={section.key}>
              <button
                className={`flex pl-2 py-2 mb-2 focus:outline-none w-full ${
                  section.tabs.some((t) => t.tab === activeTab)
                    ? "text-[#007EEF]"
                    : "bg-white text-[#727272]"
                }`}
                onClick={() => toggleSection(section.key)}
              >
                <div className="xl:w-[20%] lg:w-[20%] 2xl:w-[20%] 4k:w-[20%] 2k:w-[20%] md:w-[20%] w-[10%]">{section.icon}</div>
                <div className="w-[50%] text-left flex items-center">
                  <span className="indent-0 text-[13px]">{section.label}</span>
                </div>
                <div className="inset-y-0 flex items-center pointer-events-none w-[15%] justify-end">
                  <MdKeyboardArrowDown
                    className={`text-lg text-neutral-500 ${
                      openSection === section.key ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              {openSection === section.key && (
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px] ml-16 xl:ml-4 text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  {section.tabs.map((tabInfo) => (
                    <div key={tabInfo.tab}>
                      <p
                        className={`flex text-start ml-16 xl:ml-4 px-2 py-2 focus:outline-none w-full text-[12px] cursor-pointer ${
                          activeTab === tabInfo.tab
                            ? "text-blue-400"
                            : "bg-transparent text-[#727272]"
                        }`}
                        onClick={() => handleTabClick(tabInfo.tab)}
                      >
                        {tabInfo.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aside;