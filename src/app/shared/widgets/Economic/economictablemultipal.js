import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline, MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
      options: ["Very High", "High", "Moderate", "Low","Very Low"],
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
          if (row[key] === "Others (please specify)" || row[key + "_others"]) {
            rowOthers[key] = true;
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
    updatedValues[index][key] = newValue;

    if (newValue === "Others (please specify)") {
      const updatedOthersInputs = [...othersInputs];
      if (!updatedOthersInputs[index]) {
        updatedOthersInputs[index] = {};
      }
      updatedOthersInputs[index][key] = true;
      setOthersInputs(updatedOthersInputs);
    } else {
      const updatedOthersInputs = [...othersInputs];
      if (updatedOthersInputs[index]) {
        updatedOthersInputs[index][key] = false;
      }
      setOthersInputs(updatedOthersInputs);
    }

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
            "Improved Risk Management",
            "Enhanced Brand Reputation",
            "Others (please specify)"
          ],
          "Water Conservation": [
            "Reduced Water Costs",
            "Initial Infrastructure Investment",
            "Ongoing Maintenance Savings",
            "Enhanced Resource Efficiency",
            "Lowered Utility Bills",
            "Others (please specify)"
          ],
          "Carbon Offsetting Programs": [
            "Tax Benefits",
            "Purchase Costs",
            "Market Price Stability",
            "Long-term Financial Gains",
            "Reputation Enhancement",
            "Others (please specify)"
          ],
          "Climate-Resilient Infrastructure": [
            "High Initial Investment",
            "Long-term Savings",
            "Insurance Premium Reductions",
            "Enhanced Property Value",
            "Disaster Recovery Savings",
            "Others (please specify)"
          ],
          "Policy Advocacy": [
            "Lobbying Costs",
            "Potential Subsidies",
            "Enhanced Regulatory Environment",
            "Market Access",
            "Reputation Enhancement",
            "Others (please specify)"
          ],
          "Financial Incentives": [
            "Direct Subsidies",
            "Tax Breaks",
            "Grants",
            "Lower Loan Rates",
            "Investment Incentives",
            "Others (please specify)"
          ],
          "Technological Advancements": [
            "R&D Costs",
            "Increased Efficiency",
            "Market Differentiation",
            "Long-term Savings",
            "High Initial Investment",
            "Others (please specify)"
          ],
          "Circular Economy Initiatives": [
            "Reduced Material Costs",
            "Increased Revenue from Recycled Products",
            "Cost Savings from Waste Reduction",
            "New Revenue Streams",
            "Others (please specify)"
          ],
          "Eco-Friendly Packaging": [
            "Reduced Packaging Costs",
            "Increased Revenue",
            "Enhanced Brand Value",
            "Cost Savings",
            "Others (please specify)"
          ],
          "Renewable Energy Trading": [
            "Development of Energy Trading Platforms",
            "Investment in Renewable Energy Infrastructure",
            "Implementation of Smart Grid Technologies",
            "Partnerships with Energy Providers",
            "Energy Storage Solutions",
            "Others (please specify)"
          ]
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
            "Supplier Audits",
            "Sustainable Procurement Policies",
            "Supplier Training Programs",
            "Supplier Engagement",
            "Continuous Improvement Programs",
            "Others (please specify)"
          ],
          "Water Conservation": [
            "Water-efficient Technologies",
            "Rainwater Harvesting",
            "Leak Detection Systems",
            "Public Awareness Campaigns",
            "Others (please specify)"
          ],
          "Carbon Offsetting Programs": [
            "Carbon Offset Purchases",
            "Reforestation Projects",
            "Investment in Verified Projects",
            "Partnerships with NGOs",
            "Others (please specify)"
          ],
          "Climate-Resilient Infrastructure": [
            "Comprehensive Risk Assessments",
            "Emergency Preparedness Plans",
            "Investment in Technology",
            "Government Grants",
            "Public-Private Partnerships",
            "Others (please specify)"
          ],
          "Policy Advocacy": [
            "Building Coalitions",
            "Strategic Partnerships",
            "Continuous Engagement",
            "Funding Research",
            "Public Relations Campaigns",
            "Others (please specify)"
          ],
          "Financial Incentives": [
            "Policy Monitoring",
            "Engaging Financial Advisors",
            "Applying for Incentives",
            "Financial Reporting",
            "Strategic Financial Planning",
            "Others (please specify)"
          ],
          "Technological Advancements": [
            "Investing in R&D",
            "Continuous Monitoring",
            "Technology Pilots",
            "Collaboration with Tech Firms",
            "Training Programs",
            "Others (please specify)"
          ],
          "Circular Economy Initiatives": [
            "Recycling Programs",
            "Resource Recovery",
            "Waste Minimization",
            "Supplier Engagement",
            "Consumer Awareness Campaigns",
            "Others (please specify)"
          ],
          "Eco-Friendly Packaging": [
            "Use of Biodegradable Materials",
            "Packaging Redesign for Efficiency",
            "Recycling Programs",
            "Supplier Engagement",
            "Consumer Awareness Campaigns",
            "Others (please specify)"
          ],
          "Renewable Energy Trading": [
            "Development of Energy Trading Platforms",
            "Investment in Renewable Energy Infrastructure",
            "Implementation of Smart Grid Technologies",
            "Partnerships with Energy Providers",
            "Energy Storage Solutions",
            "Others (please specify)"
          ]
      },
      MitigationStrategies: {
        "Renewable Energy Adoption": [
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
          "Others (please specify)"
        ],
        "Water Conservation": [
          "Rainwater Harvesting",
          "Drip Irrigation Systems",
          "Leak Detection Systems",
          "Public Awareness Campaigns",
          "Others (please specify)"
        ],
        "Carbon Offsetting Programs": [
          "Investment in Verified Projects",
          "Partnerships with NGOs",
          "Long-term Contracts",
          "Public Reporting",
          "Continuous Monitoring",
          "Others (please specify)"
        ],
        "Climate-Resilient Infrastructure": [
          "Comprehensive Risk Assessments",
          "Emergency Preparedness Plan",
          "Investment in Technology",
          "Government Grants",
          "Public-Private Partnerships",
          "Others (please specify)"
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
          "Direct Subsidies",
          "Tax Breaks",
          "Grants",
          "Lower Loan Rates",
          "Investment Incentives",
          "Others (please specify)"
        ],
        "Technological Advancements": [
          "Investing in R&D",
          "Continuous Monitoring",
          "Technology Pilots",
          "Collaboration with Tech Firms",
          "Training Programs",
          "Others (please specify)"
        ],
        "Circular Economy Initiatives": [
          "Recycling Programs",
          "Resource Recovery",
          "Waste Minimization",
          "Supplier Engagement",
          "Consumer Awareness Campaigns",
          "Others (please specify)"
        ],
        "Eco-Friendly Packaging": [
          "Use of Biodegradable Materials",
          "Packaging Redesign for Efficiency",
          "Recycling Programs",
          "Supplier Engagement",
          "Consumer Awareness Campaigns",
          "Others (please specify)"
        ],
        "Renewable Energy Trading": [
          "Development of Energy Trading Platforms",
          "Investment in Renewable Energy Infrastructure",
          "Implementation of Smart Grid Technologies",
          "Partnerships with Energy Providers",
          "Energy Storage Solutions",
          "Others (please specify)"
        ]
      },
    };

    // Safely access options based on selectedOpportunity and key
    if (optionsMap[key] && optionsMap[key][selectedOpportunity]) {
      return optionsMap[key][selectedOpportunity];
    } else {
      return []; // Return an empty array if no matching options are found
    }
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
        className="mb-2 pb-2"
      >
        <table id={id} className="table-fixed border-collapse w-full">
          <thead className="gradient-background">
            <tr className="h-[102px]">
              {titles.map((item, idx) => (
                <th
                  key={idx}
                  style={{ width: "17vw", textAlign: "left" }}
                  className="text-[13px] border border-gray-300 px-2 py-3 relative"
                >
                  <div
                    className={`flex items-center ${
                      item.textdriction === "start"
                        ? "justify-start"
                        : "justify-center"
                    }`}
                  >
                    <p>{item.title}</p>
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
                          className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                        />
                      </p>
                    )}
                  </div>
                </th>
              ))}
              <th
                className="text-[12px] border border-gray-300 px-4 py-3 relative"
                style={{ width: "5vw" }}
              >
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {localValue.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-300">
                {titles.map((item, cellIndex) => {
                  const isEnum = Array.isArray(item.options);

                  return (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 text-center"
                    >
                      {isEnum ? (
                        <select
                          value={localValue[rowIndex][item.key] || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              rowIndex,
                              item.key,
                              e.target.value
                            )
                          }
                          className="text-sm pl-2 py-2 w-full border-b"
                        >
                          <option value="">Select</option>
                          {(item.key === "FinancialImplications" ||
                          item.key === "ManagementMethods" ||
                          item.key === "MitigationStrategies"
                            ? getConditionalOptions(rowIndex, item.key)
                            : item.options
                          ).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
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
                          className="text-sm pl-2 py-2 w-full"
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
                            className="text-sm pl-2 py-2 w-full mt-2"
                            placeholder="Please specify"
                          />
                        )}
                    </td>
                  );
                })}
                <td className="border border-gray-300 p-4 text-center w-[45%]">
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
