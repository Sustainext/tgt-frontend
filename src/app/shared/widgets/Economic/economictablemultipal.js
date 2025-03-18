import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline, MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Select from "react-select";
const Economictablemultipal = ({ id, value, onChange }) => {
  const titles = [
    {
      id: 1,
      key: "TypeofOpportunities",
      title: "Type of Opportunities",
      tooltip:
        "Please choose the specific type of opportunities within the selected category",
      tooltipdisplay: "block",
      options: [
        "Renewable Energy Adoption",
        "Energy Efficiency",
        "Green Building Initiatives",
        "Sustainable Supply Chain",
        "Water Conservation",
        "Carbon Offsetting Programs",
        "Climate-Resilient Infrastructure",
        "Policy Advocacy",
        "Financial Incentives",
        "Technological Advancements",
        "Circular Economy Initiatives",
        "Eco-Friendly Packaging",
        "Renewable Energy Trading",
      ],
    },
    {
      id: 2,
      key: "PotentialImpact",
      title: "Potential Impact",
      tooltip:
        "Please identify all potential opportunities that the chosen opportunity might have on the organization.",
      tooltipdisplay: "block",
      options: [
        "Increased or decreased capital costs",
        "Increased or decreased operational costs",
        "Increased or decreased demand for products and services",
        "Increased or decreased capital availability and investment opportunities",
        "Increased or decreased investment opportunities",
        "Others (please specify)",
      ],
    },
    {
      id: 3,
      key: "MagnitudeofImpact",
      title: "Magnitude of Impact",
      tooltip:
        "Indicate the estimated magnitude of the impact of the chosen opportunities.",
      tooltipdisplay: "block",
      options: ["Low", "Moderate", "High", "Not Sure"],
    },
    {
      id: 4,
      key: "Likelihoodofimpact",
      title: "Likelihood of impact",
      tooltip:
        "Please specify the probability of the impact of the opportunities on the organization.",
      tooltipdisplay: "block",
      options: ["Low", "Moderate", "High", "Not Sure"],
    },
    {
      id: 5,
      key: "FinancialEffect",
      title: "Financial Effect",
      tooltip:
        "Indicate the estimated magnitude of the financial impact of the chosen opportunity.",
      tooltipdisplay: "block",
      options: ["Very High", "High", "Moderate", "Low", "Very Low"],
    },
    {
      id: 6,
      key: "FinancialImplications",
      title: "Financial Implications",
      tooltip:
        "Please describe the specific financial benefits that may result from the chosen opportunity.",
      tooltipdisplay: "block",
      options: [],
    },
    {
      id: 7,
      key: "ManagementMethods",
      title: "Management Methods",
      tooltip:
        "Select the strategies and actions the organization will implement to capitalize on the opportunity.",
      tooltipdisplay: "block",
      options: [],
    },
    {
      id: 8,
      key: "TimeFrame",
      title: "Time Frame",
      tooltip:
        "Please indicate the expected period for the selected opportunity to materialize.",
      tooltipdisplay: "block",
      options: [
        "Immediate-term (0-1 year)",
        "Short-term (1-3 years)",
        "Medium-term (3-5 years)",
        "Long-term (5+ years)",
      ],
    },
    {
      id: 9,
      key: "DirectorIndirectImpacts",
      title: "Direct or Indirect Impacts",
      tooltip:
        "Please specify whether the impacts of the selected opportunity on the organization are direct, indirect, or uncertain.",
      tooltipdisplay: "block",
      options: ["Indirect", "Direct", "Not Sure"],
    },
    {
      id: 10,
      key: "ImplementedMitigationStrategies",
      title: "Implemented Mitigation Strategies",
      tooltip:
        "Please indicate if strategies to enhance the chosen opportunity have already been implemented (Yes/No).",
      tooltipdisplay: "block",
      options: ["Yes", "No"],
    },
    {
      id: 11,
      key: "MitigationStrategies",
      title: "Mitigation Strategies",
      tooltip:
        "If yes, Please select the actions taken by the organization to enhance or maximize the chosen opportunity.",
      tooltipdisplay: "block",
      options: [],
    },
  ];

  const [localValue, setLocalValue] = useState(value);
  const [othersInputs, setOthersInputs] = useState([]);

  useEffect(() => {
    const initializeOthersInputs = () => {
      const newOthersInputs = value.map((row) => {
        let rowOthers = {};
        Object.keys(row).forEach((key) => {
          if (Array.isArray(row[key])) {
            rowOthers[key] = row[key].includes("Others (please specify)");
          } else {
            rowOthers[key] = row[key] === "Others (please specify)";
          }
        });
        return rowOthers;
      });
      setOthersInputs(newOthersInputs);
    };
    setLocalValue(value);
    initializeOthersInputs();
  }, [value]);

  const handleFieldChange = (index, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[index]) {
      updatedValues[index] = {};
    }
    if (key === "TypeofRisk") {
      updatedValues[index]["FinancialImplications"] = [];
      updatedValues[index]["ManagementMethods"] = [];
      updatedValues[index]["MitigationStrategies"] = []; // Clear selected ManagementMethods
    }
    updatedValues[index][key] = newValue;

    const updatedOthersInputs = [...othersInputs];
    if (!updatedOthersInputs[index]) {
      updatedOthersInputs[index] = {};
    }

    if (Array.isArray(newValue)) {
      updatedOthersInputs[index][key] = newValue.includes(
        "Others (please specify)"
      );
    } else {
      updatedOthersInputs[index][key] = newValue === "Others (please specify)";
    }

    setOthersInputs(updatedOthersInputs);
    setLocalValue(updatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  const addRow = () => {
    setLocalValue([...localValue, {}]);
    setOthersInputs([...othersInputs, {}]);
  };

  const removeRow = (index) => {
    if (localValue.length > 1) {
      const updatedValues = [...localValue];
      const updatedOthersInputs = [...othersInputs];
      updatedValues.splice(index, 1);
      updatedOthersInputs.splice(index, 1);
      setLocalValue(updatedValues);
      setOthersInputs(updatedOthersInputs);
    }
  };

  const getConditionalOptions = (rowIndex, key) => {
    const selectedOpportunity = localValue[rowIndex]?.TypeofOpportunities;

    const optionsMap = {
      FinancialImplications: {
        "Renewable Energy Adoption": [
          "Significant Cost Savings",
          "High Initial Investment",
          "Tax Incentives",
          "Ongoing Operational Savings",
          "Long-term Financial Gains",
          "Others (please specify)",
        ],
        "Energy Efficiency": [
          "Moderate Cost Savings",
          "Low Initial Investment",
          "Increased Operational Efficiency",
          "Reduced Maintenance Costs",
          "Others (please specify)",
        ],
        "Green Building Initiatives": [
          "Lower Utility Costs",
          "High Initial Construction Costs",
          "Increased Property Value",
          "Tax Credits and Incentives",
          "Long-term Operational Savings",
          "Others (please specify)",
        ],
        "Sustainable Supply Chain": [
          "Competitive Advantage", 
          "Cost Reduction through Efficiency",   
          "Increased Supplier Costs",
          "Improved Risk Management  Enhanced", 
          "Brand Reputation",
          "Others (please specify)",
        ],
        "Water Conservation": [
          "Reduced Water Costs",
          "Initial Infrastructure Investment",
          "Ongoing Maintenance Savings",
          "Enhanced Resource Efficiency",
          "Lowered Utility Bills",
          "Others (please specify)",
        ],
        "Carbon Offsetting Programs": [
          "Tax Benefits",
          "Purchase Costs",
          "Market Price Stability",
          "Long-term Financial Gains",
          "Reputation Enhancement",
          "Others (please specify)",
        ],
        "Climate-Resilient Infrastructure": [
          "High Initial Investment",
          "Long-term Savings",
          "Insurance Premium Reductions",
          "Enhanced Property Value",
          "Disaster Recovery Savings",
          "Others (please specify)",
        ],
        "Policy Advocacy": [
          "Lobbying Costs",
          "Potential Subsidies",
          "Enhanced Regulatory Environment",
          "Market Access",
          "Reputation Enhancement",
          "Others (please specify)",
        ],
        "Financial Incentives": [
          "Direct Subsidies",
          "Tax Breaks",
          "Grants",
          "Lower Loan Rates",
          "Investment Incentives",
          "Others (please specify)",
        ],
        "Technological Advancements": [
          "R&D Costs",
          "Increased Efficiency",
          "Market Differentiation",
          "Long-term Savings",
          "High Initial Investment",
          "Others (please specify)",
        ],
        "Circular Economy Initiatives": [
          "Reduced Material Costs",
          "Increased Revenue from Recycled Products",
          "Cost Savings from Waste Reduction",
          "New Revenue Streams",
          "Others (please specify)",
        ],
        "Eco-Friendly Packaging": [
          "Reduced packaging costs",
          "Increased sales from eco-friendly products",
          "Potential subsidies",
          "Reduced waste disposal costs",
          "Others (please specify)",
        ],
        "Renewable Energy Trading": [
          "Increased revenue from energy trading",
          "Reduced energy costs",
          "Capital investment in energy infrastructure",
          "Others (please specify)",
        ],
      },
      ManagementMethods: {
        "Renewable Energy Adoption": [
          "Renewable Energy Credits",
          "On-site Generation",
          "Power Purchase Agreements (PPAs)",
          "Grid Integration",
          "Energy Storage Solutions",
        ],
        "Energy Efficiency": [
          "Energy Audits",
          "Smart Metering",
          "Retrofitting Buildings",
          "Behavioral Programs",
          "Energy Management Systems",
        ],

        "Green Building Initiatives": [
          "Green Building Standards",
          "Sustainable Materials",
          "Energy-efficient HVAC Systems",
          "Water-saving Fixtures",
          "Building Automation Systems",
          "Others (please specify)",
        ],
        "Sustainable Supply Chain": [
          "Supplier Engagement",
          "Sustainable Procurement Policies",
          "Transparency and Reporting",
          "Collaboration with Suppliers",
          "Lifecycle Analysis",
        ],
        "Water Conservation": [
          "Efficient Irrigation",
          "Rainwater Harvesting",
          "Greywater Recycling",
          "Water-efficient Fixtures",
          "Water Usage Monitoring",
        ],
        "Carbon Offsetting Programs": [
          "Verified Carbon Standard (VCS)",
          "Gold Standard",
          "Carbon Credit Trading",
          "Afforestation Projects",
          "Carbon Capture and Storage",
        ],
        "Climate-Resilient Infrastructure": [
          "Resilient Building Materials",
          "Flood Defense Systems",
          "Elevated Structures",
          "Redundant Power Systems",
          "Early Warning Systems",
          "Others (please specify)",
        ],
        "Policy Advocacy": [
          "Engaging with Policymakers",
          "Public Campaigns",
          "Industry Coalition Building",
          "Research and Publication",
          "Stakeholder Engagement",
          "Others (please specify)",
        ],
        "Financial Incentives": [
          "Tax Planning",
          "Grant Applications",
          "Subsidy Management",
          "Financial Analysis",
          "Investor Relations",
          "Others (please specify)",
        ],
        "Technological Advancements": [
          "Innovation Programs",
          "Patenting",
          "Technology Partnerships",
          "Continuous Improvement",
          "Employee Training",
          "Others (please specify)",
        ],
        "Circular Economy Initiatives": [
          "Implementation of recycling programs",
          "Development of closed-loop systems",
          "Collaboration with suppliers and customers",
          "Investment in circular technologies",
          "Employee training on circular practices",
          "Others (please specify)",
        ],
        "Eco-Friendly Packaging": [
          "Development of sustainable packaging materials",
          "Collaboration with packaging suppliers",
          "Implementation of packaging recycling programs",
          "Customer education on packaging disposal",
          "Employee training",
          "Others (please specify)",
        ],
        "Renewable Energy Trading": [
          "Development of renewable energy projects",
          "Investment in energy storage systems",
          "Collaboration with energy traders",
          "Implementation of smart grid technologies",
          "Others (please specify)",
        ],
      },
      MitigationStrategies: {
        "Renewable Energy Adoption": [
          "Investment in R&D",
          "Policy Advocacy",
          "Partnership with Renewable Energy Providers",
          "Employee Training Programs",
          "Upgrading Energy Infrastructure",
          "Others (please specify)",
        ],
        "Energy Efficiency": [
          "Upgrade Infrastructure",
          "Implementing Smart Technologies",
          "Continuous Monitoring",
          "Employee Engagement",
          "Government Grants and Subsidies",
          "Others (please specify)",
        ],

        "Green Building Initiatives": [
          "LEED Certification ",
          "BREEAM Certification",
          "Regular Maintenance Programs",
          "Tenant Engagement Programs",
          "Green Lease Agreements",
          "Others (please specify)",
        ],
        "Sustainable Supply Chain": [
          "Diversify Suppliers",
          "Establish Long-term Contracts",
          "Invest in Supplier Capacity Building",
          "Third-Party Certifications",
          "Continuous Improvement Programs",
          "Others (please specify)",
        ],
        "Water Conservation": [
          "Rainwater Harvesting",
          "Drip Irrigation Systems",
          "Leak Detection Systems",
          "Public Awareness Campaigns",
          "Others (please specify)",
        ],
        "Carbon Offsetting Programs": [
          "Investment in Verified Projects",
          "Partnerships with NGOs",
          "Long-term Contracts",
          "Public Reporting",
          "Continuous Monitoring",
          "Others (please specify)",
        ],
        "Climate-Resilient Infrastructure": [
          "Comprehensive Risk Assessments",
          "Emergency Preparedness Plan",
          "Investment in Technology",
          "Government Grants",
          "Public-Private Partnerships",
          "Others (please specify)",
        ],

        "Policy Advocacy": [
          "Building Coalitions",
          "Strategic Partnerships",
          "Continuous Engagement",
          "Funding Research",
          "Public Relations Campaigns",
          "Others (please specify)",
        ],
        "Financial Incentives": [
          "Policy Monitoring",
          "Engaging Financial Advisors",
          "Applying for Incentives",
          "Financial Reporting",
          "Strategic Financial Planning",
          "Others (please specify)",
        ],
        "Technological Advancements": [
          "Investing in R&D",
          "Continuous Monitoring",
          "Technology Pilots",
          "Collaboration with Tech Firms",
          "Training Programs",
          "Others (please specify)",
        ],
        "Circular Economy Initiatives": [
          "Building Coalitions",
          "Strategic Partnerships",
          "Continuous Engagement",
          "Funding Research",
          "Public Relations Campaigns",
          "Others (please specify)",
        ],
        "Eco-Friendly Packaging": [
          "Use of Biodegradable Materials",
          "Packaging Redesign for Efficiency",
          "Recycling Programs",
          "Supplier Engagement",
          "Consumer Awareness Campaigns",
          "Others (please specify)",
        ],
        "Renewable Energy Trading": [
          "Development of Energy Trading Platforms",
          "Investment in Renewable Energy Infrastructure",
          "Implementation of Smart Grid Technologies",
          "Partnerships with Energy Providers",
          "Energy Storage Solutions",
          "Others (please specify)",
        ],
      },
    };

    // Safely access options based on selectedOpportunity and key
    if (optionsMap[key] && optionsMap[key][selectedOpportunity]) {
      return optionsMap[key][selectedOpportunity];
    } else {
      return []; // Return an empty array if no matching options are found
    }
  };

  const isMultiSelect = (key) => {
    return [
      "ManagementMethods",
      "FinancialImplications",
      "PotentialImpact",
    ].includes(key);
  };
  const CustomOption = ({ children, ...props }) => {
    const { isSelected, isFocused, innerProps } = props;
    return (
      <div
        {...innerProps}
        style={{
          backgroundColor: isSelected
            ? "#e0e0e0"
            : isFocused
            ? "#f0f0f0"
            : "white",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          style={{ marginRight: "8px" }}
        />
        {children}
      </div>
    );
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      padding: 0, // Ensure no padding that might cause a gap
      margin: 0, // Remove any margin
      minHeight: "auto",
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0, // Ensure no margin for the input
      padding: 0, // Ensure no padding for the input
    }),
    menu: (provided) => ({
      ...provided,
      position: "relative",
      bottom: "100%",
      top: 0,
      zIndex: 1000,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px", // Adjust this value as needed
    }),
  };
  const getColumnWidth = (key) => {
    if (
      [
        "ManagementMethods",
        "FinancialImplications",
        "PotentialImpact",
      ].includes(key)
    ) {
      return "desktop-wide";
    }
    return "desktop-narrow";
  };
  return (
    <>
      <div
        style={{
          maxHeight: "400px",
          display: "block",
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "80vw",
        }}
        className="mb-2 pb-2 table-scrollbar"
      >
        <table id={id} className="table-fixed border border-gray-300  w-full rounded-md" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
          <thead className="gradient-background">
            <tr className="h-[102px]">
              {titles.map((item, idx) => (
                <th
                  key={idx}
                  style={{ textAlign: "left" }}
                  className={` ${idx === 0 ? "" :"border-l" } text-[12px] px-4 py-3 relative border-gray-300 ${getColumnWidth(item.key)}`}

                >
                  <div
                    className={`flex items-center ${
                      item.textdriction === "start"
                        ? "justify-start"
                        : "justify-center"
                    }`}
                  >
                    <p className="text-[12px]">{item.title}</p>
                    {item.tooltipdisplay !== "none" && (
                      <p>
                        <MdInfoOutline
                          data-tooltip-id={`tooltip-${item.title.replace(
                            /\s+/g,
                            "-"
                          )}`}
                          data-tooltip-content={item.tooltip}
                          className="ml-2 cursor-pointer"
                        />
                        <ReactTooltip
                          id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                          place="top"
                          effect="solid"
                          style={{
                            width:"400px",
                            backgroundColor: "#000",
                            color: "white",
                            fontSize: "12px",
                            boxShadow: 3,
                            borderRadius: "8px",
                            zIndex:"1000",
                          }}
                        />
                      </p>
                    )}
                  </div>
                </th>
              ))}
              <th
              className="text-[12px] px-4 py-3 relative"
                style={{ width: "5vw" }}
              >
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {localValue.map((row, rowIndex) => (
              <tr key={rowIndex} 
              className="border-r border-gray-300">
                {titles.map((item, cellIndex) => {
                  const isEnum = Array.isArray(item.options);
                  const isMulti = isMultiSelect(item.key);

                  return (
                    <td
                      key={cellIndex}
                      className={` ${cellIndex === 0 ? "" :"border-l " }  border-t border-gray-300 text-center`}
                 
                    >
                      {isEnum ? (
                        isMulti ? (
                          <>
                            <Select
                              isMulti
                              value={
                                localValue[rowIndex][item.key]
                                  ? localValue[rowIndex][item.key].map(
                                      (val) => ({
                                        value: val,
                                        label: val,
                                      })
                                    )
                                  : []
                              }
                              onChange={(selectedOptions) =>
                                handleFieldChange(
                                  rowIndex,
                                  item.key,
                                  selectedOptions.map((option) => option.value)
                                )
                              }
                              options={(item.key === "FinancialImplications" ||
                              item.key === "ManagementMethods"
                                ? getConditionalOptions(rowIndex, item.key)
                                : item.options
                              ).map((option) => ({
                                value: option,
                                label: option,
                              }))}
                              className="text-[12px] w-full"
                              placeholder="Select options"
                              components={{ Option: CustomOption }}
                              closeMenuOnSelect={false}
                              hideSelectedOptions={false}
                              styles={customStyles}
                            />
                          </>
                        ) : (
                          <>
                            <select
                              value={localValue[rowIndex][item.key] || ""}
                              onChange={(e) =>
                                handleFieldChange(
                                  rowIndex,
                                  item.key,
                                  e.target.value
                                )
                              }
                              className="text-[12px] pl-2 py-2 w-full border-b"
                            >
                              <option value="">Select</option>
                              {(item.key === "MitigationStrategies"
                                ? getConditionalOptions(rowIndex, item.key)
                                : item.options
                              ).map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </>
                        )
                      ) : (
                        <input
                          type="text"
                          value={localValue[rowIndex][item.key] || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              rowIndex,
                              item.key,
                              e.target.value
                            )
                          }
                          className="text-[12px] pl-2 py-2 w-full"
                          placeholder="Enter value"
                        />
                      )}
                      {othersInputs[rowIndex] &&
                        othersInputs[rowIndex][item.key] && (
                          <input
                            type="text"
                            value={
                              localValue[rowIndex][`${item.key}_others`] || ""
                            }
                            onChange={(e) =>
                              handleFieldChange(
                                rowIndex,
                                `${item.key}_others`,
                                e.target.value
                              )
                            }
                            className="text-[12px] pl-2 py-2 w-full mt-2"
                            placeholder="Please specify"
                          />
                        )}
                    </td>
                  );
                })}
                <td className="  border-t border-gray-300  p-4 text-center w-[45%]">
                  <button
                    type="button"
                    onClick={() => removeRow(rowIndex)}
                    className="text-red-500"
                  >
                    <MdOutlineDeleteOutline size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <button
          type="button"
          onClick={addRow}
          className="text-blue-500 flex items-center"
        >
          <MdAdd /> Add Row
        </button>
      </div>
    </>
  );
};

export default Economictablemultipal;
