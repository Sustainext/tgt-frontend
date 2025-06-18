"use client";
import { useState, useEffect } from "react";
import { MdOutlineGroups2, MdKeyboardArrowDown, MdClose } from "react-icons/md";

const getMateriality = (materialityEnvData, key) =>
  materialityEnvData && materialityEnvData[key]?.is_material_topic;

const sectionKeyToTabList = {
  economic: [
    "Management of Material topic Economic Performance",
    "Direct economic value generated & distributed",
    "Financial assistance received from government",
  ],
  climate: [
    "Management of Material topic risks",
    "Financial Implications due to climate change",
    "Climate related Risks",
    "Climate Related Opportunities",
    "Tcfd-cs1",
    "Tcfd-cs2",
    "Tcfd-cs3",
    "Tcfd-cs4",
  ],
  governance: [
    "Management of Material topic Market",
    "Proportion of senior management hired from the local community",
  ],
  impacts: [
    "Management of Material topic Indirect Economic",
    "Infrastructure investments and services supported",
    "Significant indirect economic impacts",
  ],
  anti: [
    "Management of Material topic Anti",
    "Operations assessed for risks related to corruption",
    "Communication and training about anti-corruption policies and procedures",
    "Confirmed incidents of corruption and actions taken",
    "Public legal cases regarding corruption",
    "Anti Competitive Behavior",
  ],
  tax: [
    "Management of Material topic Tax",
    "Approach to tax",
    "Country-by-country reporting",
    "Tax governance, control, and risk management",
    "Stakeholder engagement and management of concerns related to tax",
  ],
  policy: [
    "Management of Material topic Political Influence",
    "Political Contribution",
  ],
};

const menuConfig = (materialityEnvData, frameworkId, disclosures) => [
  {
    key: "economic",
    label: "Economic Performance",
    icon: <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />,
    materialKey: "GovEconomicPerformance",
    tabs: [
      materialityEnvData?.GovEconomicPerformance?.is_material_topic && {
        key: "Management of Material topic Economic Performance",
        label: "Management of Material topic",
        isMandatory: true,
      },
      {
        key: "Direct economic value generated & distributed",
        label: "Direct Economic Value Generated",
      },
      {
        key: "Financial assistance received from government",
        label: "Government Assistance",
      },
    ].filter(Boolean),
  },
  {
    key: "climate",
    label: "Climate Risks and Opportunities",
    icon: <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />,
    materialKey: "ClimateRisksAndOpportunities",
    tabs: [
      materialityEnvData?.ClimateRisksAndOpportunities?.is_material_topic && {
        key: "Management of Material topic risks",
        label: "Management of Material topic",
        isMandatory: true,
      },
      {
        key: "Financial Implications due to climate change",
        label: "Financial Implications due to Climate Change",
      },
      { key: "Climate related Risks", label: "Climate Related Risks" },
      { key: "Climate Related Opportunities", label: "Climate Related Opportunities" },
      ...(frameworkId === "6" &&
      disclosures?.Strategy?.disclosures?.some((d) => d.id === 4 && d.selected)
        ? [
            {
              key: "Tcfd-cs1",
              label: "Impact of Climate Related Issues on Business",
            },
          ]
        : []),
      ...(frameworkId === "6" &&
      disclosures?.Strategy?.disclosures?.some((d) => d.id === 5 && d.selected)
        ? [
            {
              key: "Tcfd-cs2",
              label: "Resilience of the Organisation's Strategy",
            },
          ]
        : []),
      ...(frameworkId === "6" &&
      disclosures?.["Metrics & Targets"]?.disclosures?.some(
        (d) => d.id === 9 && d.selected
      )
        ? [
            {
              key: "Tcfd-cs3",
              label: "Climate Related Metrics",
            },
          ]
        : []),
      ...(frameworkId === "6" &&
      disclosures?.["Metrics & Targets"]?.disclosures?.some(
        (d) => d.id === 11 && d.selected
      )
        ? [
            {
              key: "Tcfd-cs4",
              label: "Climate Related Targets",
            },
          ]
        : []),
    ].filter(Boolean),
  },
  {
    key: "governance",
    label: "Economic Governance",
    icon: <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />,
    materialKey: "GovGovernance",
    tabs: [
      materialityEnvData?.GovGovernance?.is_material_topic && {
        key: "Management of Material topic Market",
        label: "Management of Material topic",
        isMandatory: true,
      },
      {
        key: "Proportion of senior management hired from the local community",
        label: "Senior Management Hired from Local Community",
      },
    ].filter(Boolean),
  },
  {
    key: "impacts",
    label: "Economic Impacts",
    icon: <MdOutlineGroups2 className="w-5 h-5 mr-2" />,
    materialKey: "GovEconomicImpact",
    tabs: [
      materialityEnvData?.GovEconomicImpact?.is_material_topic && {
        key: "Management of Material topic Indirect Economic",
        label: "Management of Material topic",
        isMandatory: true,
      },
      {
        key: "Infrastructure investments and services supported",
        label: "Infrastructure Investments and Services Supported",
      },
      {
        key: "Significant indirect economic impacts",
        label: "Indirect Economic Impacts",
      },
    ].filter(Boolean),
  },
  {
    key: "anti",
    label: "Anti Corruption",
    icon: <MdOutlineGroups2 className="w-5 h-5 mr-2" />,
    materialKey: "GovCorruption",
    tabs: [
      materialityEnvData?.GovCorruption?.is_material_topic && {
        key: "Management of Material topic Anti",
        label: "Management of Material topic",
        isMandatory: true,
      },
      {
        key: "Operations assessed for risks related to corruption",
        label: "Risks related to Corruption",
      },
      {
        key: "Communication and training about anti-corruption policies and procedures",
        label: "Anit-corruption Policies and Procedures",
      },
      {
        key: "Confirmed incidents of corruption and actions taken",
        label: "Incidents of Corruption",
      },
      {
        key: "Public legal cases regarding corruption",
        label: "Public legal cases regarding corruption",
      },
      {
        key: "Anti Competitive Behavior",
        label: "Legal Actions",
      },
    ].filter(Boolean),
  },
  {
    key: "tax",
    label: "Tax Transparency",
    icon: <MdOutlineGroups2 className="w-5 h-5 mr-2" />,
    materialKey: "GovTaxTransparency",
    tabs: [
      materialityEnvData?.GovTaxTransparency?.is_material_topic && {
        key: "Management of Material topic Tax",
        label: "Management of Material topic",
        isMandatory: true,
      },
      {
        key: "Approach to tax",
        label: "Approach to tax",
      },
      {
        key: "Tax governance, control, and risk management",
        label: "Tax Governance & Risk Management",
      },
      {
        key: "Stakeholder engagement and management of concerns related to tax",
        label: "Stakeholder Engagement",
      },
      {
        key: "Country-by-country reporting",
        label: "Country-by-Country Reporting",
      },
    ].filter(Boolean),
  },
  {
    key: "policy",
    label: "Lobbying and Political Influence",
    icon: <MdOutlineGroups2 className="w-5 h-5 mr-2 mt-1" />,
    materialKey: "GovPolicy",
    tabs: [
      materialityEnvData?.GovPolicy?.is_material_topic && {
        key: "Management of Material topic Political Influence",
        label: "Management of Material topic",
        isMandatory: true,
      },
      {
        key: "Political Contribution",
        label: "Political Contribution",
      },
    ].filter(Boolean),
  },
];

const tabToSectionKey = Object.entries(sectionKeyToTabList).reduce(
  (acc, [sKey, tabKeys]) => {
    tabKeys.forEach((tab) => (acc[tab] = sKey));
    return acc;
  },
  {}
);

const Aside = ({
  activeTab,
  handleTabClick,
  apiData,
  setMobileopen,
  frameworkId,
  disclosures,
  setActiveTab,
}) => {
  const materialityEnvData =
    apiData && apiData.governance ? apiData.governance : {};

  const [openSection, setOpenSection] = useState(null);
  useEffect(() => {
    setOpenSection(tabToSectionKey[activeTab] || null);
  }, [activeTab]);

  const menu = menuConfig(materialityEnvData, frameworkId, disclosures);

  return (
    <div className="m-3 ml-2 p-2 border border-r-2 border-b-2 shadow-lg rounded-md h-full">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[43%] lg:w-[200px] xl:w-[200px] 2xl:w-[200px] 3xl:w-[351px] scrollable-content">
        <div className="flex flex-col w-full font-medium">
          <button className="flex justify-between items-center px-4 py-2 -mt-4 mb-8 rounded-none focus:outline-none text-[#727272] font-bold">
            <span className="text-[16px] font-extrabold">Economic</span>
            <span className="float-end block xl:hidden md:block lg:hidden 2xl:hidden 4k:hidden">
              <MdClose onClick={() => setMobileopen(false)} className="text-3xl" />
            </span>
          </button>
          {menu.map((section) => (
            <div key={section.key}>
              <button
                className={`flex pl-2 py-2 mb-2 focus:outline-none w-full ${
                  section.tabs.some((t) => t.key === activeTab)
                    ? "text-[#007EEF]"
                    : "bg-white text-[#727272]"
                }`}
                onClick={() => setOpenSection((prev) => (prev === section.key ? null : section.key))}
              >
                <div className="xl:w-[20%] lg:w-[20%] 2xl:w-[20%] 4k:w-[20%] 2k:w-[20%] md:w-[20%] w-[10%]">{section.icon}</div>
                <div className="w-[50%] text-left">
                  <span className="indent-0 text-[13px]">{section.label}</span>
                </div>
                {section.materialKey && getMateriality(materialityEnvData, section.materialKey) ? (
                  <div className="w-[15%] ml-5">
                    <span className="text-[#007EEF] text-[10px] bg-[#0057a51a] py-[4px] px-[6px] rounded-md">M</span>
                  </div>
                ) : (
                  <span className="w-[15%] ml-5"></span>
                )}
                <div className="inset-y-0 flex items-center pointer-events-none w-[15%] justify-end">
                  <MdKeyboardArrowDown
                    className={`text-lg text-neutral-500 ${
                      openSection === section.key ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              {/* Dropdown section */}
              {openSection === section.key && (
                <div className="bg-white px-2 ml-4 3xl:ml-8 mt-2 border-l-2 border-gray-300">
                  {section.tabs.some((t) => t.isMandatory) && (
                    <>
                      <p className="text-[12px] ml-4 text-gray-400">
                        Mandatory Management Disclosure
                      </p>
                    </>
                  )}
                  <p className="text-[12px] ml-4 text-gray-400">Topic disclosure</p>
                  {section.tabs.map((tab) =>
                    tab.isMandatory ? (
                      <p
                        key={tab.key}
                        className={`flex text-start ml-4 px-2 py-2 focus:outline-none w-full text-[12px] cursor-pointer ${
                          activeTab === tab.key
                            ? "text-blue-400"
                            : "bg-transparent text-[#727272]"
                        }`}
                        onClick={() => handleTabClick(tab.key)}
                      >
                        {tab.label}
                      </p>
                    ) : (
                      <p
                        key={tab.key}
                        className={`flex text-start ml-4 px-2 py-2 focus:outline-none w-full text-[12px] cursor-pointer ${
                          activeTab === tab.key
                            ? "text-blue-400"
                            : "bg-transparent text-[#727272]"
                        }`}
                        onClick={() => handleTabClick(tab.key)}
                      >
                        {tab.label}
                      </p>
                    )
                  )}
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