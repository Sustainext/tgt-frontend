"use client";
import { useState, useEffect } from "react";
import { MdOutlineDiversity1, MdKeyboardArrowDown, MdClose } from "react-icons/md";

// Helper to conditionally show risk management section
function hasRiskDisclosures(frameworkId, disclosures) {
  if (frameworkId !== "6") return false;
  const d = disclosures?.["Risk Management"]?.disclosures || [];
  // Includes id: 6, 7, 8 selected
  return [6, 7, 8].some(
    (n) => !!d.find((row) => row.id === n && row.selected)
  );
}

// Helper for individual TCFD disclosure items
function isRiskDisclosureSelected(disclosures, id) {
  return disclosures?.["Risk Management"]?.disclosures?.some(
    (d) => d.id === id && d.selected === true
  );
}

// Each menu section and its tabs
const getMenuConfig = (frameworkId, disclosures,brsrFrameworkId) => [
  {
    key: "board",
    label: "Board Info",
    tabs: [
      { key: "Structure", label: "Structure" },
      { key: "Nomination and Selection", label: "Nomination and Selection" },
      { key: "Chair of Board", label: "Chair of Board" }
    ]
  },
  {
    key: "involvement",
    label: "Board Involvement in Sustainability",
    tabs: [
      // Conditionally add TCFD for frameworkId === "6" and disclosure 1
      ...(frameworkId === "6" && disclosures?.Governance?.disclosures?.some(
        (d) => d.id === 1 && d.selected === true
      )
        ? [
            {
              key: "Tcfd-s1",
              label: "Board's oversight of climate-related risks and opportunities"
            }
          ]
        : []),
      { key: "Management of Impact", label: "Management of Impact" },
      { key: "Delegation of Responsibility", label: "Delegation of Responsibility" },
      { key: "Sustainability Reporting", label: "Sustainability Reporting" }
    ]
  },
  {
    key: "governance",
    label: "Governance",
    tabs: [
      // Conditionally add TCFD for frameworkId === "6" and disclosure 2
      ...(frameworkId === "6" && disclosures?.Governance?.disclosures?.some(
        (d) => d.id === 2 && d.selected === true
      )
        ? [
            {
              key: "Tcfd-s2",
              label: "Management’s role in assessing and managing climate related risks and opportunities"
            }
          ]
        : []),
      { key: "Conflict of Interest", label: "Conflict of Interest" },
      { key: "Critical Concerns", label: "Critical Concerns" }
    ]
  },
  {
    key: "performance",
    label: "Performance and Remuneration",
    tabs: [
      { key: "Sustainability Knowledge", label: "Sustainability Knowledge" },
      { key: "Performance Evaluations", label: "Performance Evaluations" },
      { key: "Remuneration", label: "Remuneration" },
      { key: "Determine Remuneration", label: "Determine Remuneration" },
      { key: "Compensation Ratio", label: "Compensation Ratio" }
    ]
  },
  {
    key: "strategy",
    label: "Sustainability Strategy",
    tabs: [{ key: "Sustainability Strategy", label: "Sustainability Strategy" }]
  },
  // Risk Management - conditional rendering
  ...(hasRiskDisclosures(frameworkId, disclosures)
    ? [
        {
          key: "risk",
          label: "Risk Management",
          tabs: [
            ...(isRiskDisclosureSelected(disclosures, 6)
              ? [{ key: "Tcfd-s3", label: "Risk Identification & Assessment" }]
              : []),
            ...(isRiskDisclosureSelected(disclosures, 7)
              ? [{ key: "Tcfd-s4", label: "Climate Risk Management" }]
              : []),
            ...(isRiskDisclosureSelected(disclosures, 8)
              ? [{ key: "Tcfd-s5", label: "Climate Risk Integration" }]
              : [])
          ]
        }
      ]
    : []),
  {
    key: "policy",
    label: "Policy",
    tabs: [
     brsrFrameworkId==4 && { key: "Policy and Management Processes", label: "Policy and Management Processes" },
      { key: "Policy Commitments", label: "Policy Commitments" },
      { key: "Implementing Commitments", label: "Implementing Commitments" }
    ]
  },
  {
    key: "remediation",
    label: "Remediation",
    tabs: [{ key: "Process", label: "Process" }]
  },
  {
    key: "managingConcerns",
    label: "Managing Concerns",
    tabs: [{ key: "Advice & Concerns", label: "Advice & Concerns" }]
  }
];

// Map tabs to section keys for opening
const tabToSectionKey = {
  Structure: "board",
  "Nomination and Selection": "board",
  "Chair of Board": "board",
  "Tcfd-s1": "involvement",
  "Management of Impact": "involvement",
  "Delegation of Responsibility": "involvement",
  "Sustainability Reporting": "involvement",
  "Tcfd-s2": "governance",
  "Conflict of Interest": "governance",
  "Critical Concerns": "governance",
  "Sustainability Knowledge": "performance",
  "Performance Evaluations": "performance",
  Remuneration: "performance",
  "Determine Remuneration": "performance",
  "Compensation Ratio": "performance",
  "Sustainability Strategy": "strategy",
  "Tcfd-s3": "risk",
  "Tcfd-s4": "risk",
  "Tcfd-s5": "risk",
  "Policy and Management Processes":"policy",
  "Policy Commitments": "policy",
  "Implementing Commitments": "policy",
  Process: "remediation",
  "Advice & Concerns": "managingConcerns"
};

const Aside = ({
  activeTab,
  handleTabClick,
  apiData,
  setMobileopen,
  frameworkId,
  brsrFrameworkId,
  disclosures
}) => {
  const [openSection, setOpenSection] = useState(null);

  // Sync openSection when activeTab changes
  useEffect(() => {
    setOpenSection(tabToSectionKey[activeTab] || null);
  }, [activeTab]);

  const menuConfig = getMenuConfig(frameworkId, disclosures,brsrFrameworkId);

  return (
    <div className="m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-md h-full">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[43%] lg:w-[200px] xl:w-[200px] 2xl:w-[200px] 3xl:w-[351px] scrollable-content">
        <div className="flex flex-col w-full font-medium">
          <button className="flex justify-between items-center px-4 py-2 -mt-4 mb-8 rounded-none focus:outline-none text-[#727272] font-bold">
            <span className="text-[16px] font-extrabold">Governance</span>
            <span className=" float-end block xl:hidden md:block lg:hidden 2xl:hidden 4k:hidden">
              <MdClose onClick={() => setMobileopen(false)} className="text-3xl" />
            </span>
          </button>
          {menuConfig.map((section) => (
            <div key={section.key}>
              <button
                className={`flex pl-2 py-2 mb-2 focus:outline-none w-full ${
                  section.tabs.some((t) => t.key === activeTab)
                    ? "text-[#007EEF]"
                    : "bg-white text-[#727272]"
                }`}
                onClick={() =>
                  setOpenSection((prev) => (prev === section.key ? null : section.key))
                }
              >
                <div className="xl:w-[20%] lg:w-[20%] 2xl:w-[20%] 4k:w-[20%] 2k:w-[20%] md:w-[20%] w-[10%]">
                  <MdOutlineDiversity1 className="w-[16px] h-[16px] mr-2 mt-0.5" />
                </div>
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
              {/* Section content */}
              {openSection === section.key && (
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  <div>
                    <p className="text-[12px] ml-4 text-gray-400">
                      Topic disclosure
                    </p>
                  </div>
                  {section.tabs.map((tab) => (
                    <div key={tab.key}>
                      <p
                        className={`flex text-start ml-4 px-2 py-2 focus:outline-none w-full text-[12px] cursor-pointer ${
                          activeTab === tab.key
                            ? "text-blue-400"
                            : "bg-transparent text-[#727272]"
                        }`}
                        onClick={() => handleTabClick(tab.key)}
                      >
                        {tab.label}
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