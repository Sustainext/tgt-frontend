import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline, MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Select from "react-select";
import { components } from "react-select";

const CustomOptionnew = ({ children, ...props }) => {
  const { isSelected, isFocused, innerProps } = props;

  return (
    <div
      {...innerProps}
      style={{
        backgroundColor: isSelected ? "white" : isFocused ? "#f0f0f0" : "white",

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
        style={{ marginRight: "8px", accentColor: "#16a34a" }}
      />

      {children}
    </div>
  );
};

const CustomMultiValueContainer = ({ children, ...props }) => {
  const { data, selectProps } = props;
  const { value } = selectProps;

  // Find the index of this value in the selected values array
  const valueIndex = value.findIndex((val) => val.value === data.value);
  // console.log(valueIndex,"See")
  // Always show the first two values
  if (valueIndex < 2) {
    return (
      <components.MultiValueContainer {...props}>
        {children}
      </components.MultiValueContainer>
    );
  }

  // For the third position, show "+X more" if there are more than 2 values
  if (value.length > 2 && valueIndex == 2) {
    return (
      <components.MultiValueContainer {...props}>
        <div
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: "0.375rem",
            padding: "2px 5px",
            color: "#1e40af",
            fontWeight: "600",
            // fontSize: '0.875rem'
          }}
        >
          +{value.length - 2} more
        </div>
      </components.MultiValueContainer>
    );
  }

  // Hide any additional values
  return null;
};



const Economictable = ({
  id,
  options,
  value,
  required,
  onChange,
  schema,
  formContext,
}) => {
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

    // Reset ManagementMethods if the TypeofRisk has changed
    if (key === "TypeofRisk") {
      updatedValues[index]["ManagementMethods"] = [];
      updatedValues[index]["MitigationStrategies"] = [];  // Clear selected ManagementMethods
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
    const selectedOpportunity = localValue[rowIndex]?.TypeofRisk;

    const optionsMap = {
      ManagementMethods: {
        "Extreme weather events": [
          "Business continuity planning",
          "Diversification of supply chain",
          "Infrastructure improvements",
          "Insurance coverage",
          "Emergency response planning",
          "Others (please specify)",
        ],
        "Temperature changes": [
          "Energy efficiency measures",
          "Climate control technologies",
          "Adjusting operational schedules",
          "Implementing sustainable practices",
          "Monitoring and reporting",
          "Others (please specify)",
        ],

        "Sea level rise": [
          "Coastal defenses",
          "Land use planning",
          "Elevating infrastructure",
          "Managed retreat",
          "Flood barriers",
          "Others (please specify)",
        ],
        "Water scarcity": [
          "Water-efficient technologies",
          "Water recycling and reuse",
          "Drought-resistant landscaping",
          "Water conservation policies",
          "Supply chain management",
          "Others (please specify)",
        ],
        "Changes in precipitation patterns": [
          "Flood management",
          "Drainage improvements",
          "Agricultural adaptations",
          "Water storage systems",
          "Weather forecasting enhancements",
          "Others (please specify)",
        ],
        "Natural disasters": [
          "Disaster preparedness planning",
          "Structural reinforcements",
          "Emergency response training",
          "Community evacuation plans",
          "Risk assessments",
          "Others (please specify)",
        ],
        "Air Quality Degradation": [
          "Air quality monitoring",
          "Implementation of air filtration systems",
          "Compliance with environmental regulations",
          "Employee health programs",
          "Switching to cleaner fuels",
          "Reducing emissions",
          "Ventilation improvements",
          "Others (please specify)",
        ],
        "Heatwaves": [
          "Investment in cooling technologies",
          "Adjusting work schedules",
          "Health and safety programs",
          "Infrastructure upgrades",
          "Employee training",
          "Others (please specify)",
        ],
        "Regulatory changes": [
          "Compliance with new regulations",
          "Policy advocacy",
          "Investment in sustainable technologies",
          "Training and development",
          "Strategic partnerships",
          "Others (please specify)",
        ],
        "Market shifts": [
          "Market research",
          "Diversification",
          "Strategic planning",
          "Innovation and R&D",
          "Customer engagement",
          "Others (please specify)",
        ],
        "Technology changes": [
          "Technology scouting",
          "Investment in R&D",
          "Strategic partnerships",
          "Employee training",
          "Change management",
          "Others (please specify)",
        ],
        "Reputational risks": [
          "Public relations strategies",
          "Crisis management",
          "Corporate social responsibility (CSR) initiatives",
          "Stakeholder engagement",
          "Transparency and communication",
          "Others (please specify)",
        ],
        "Legal risks": [
          "Legal compliance",
          "Risk management frameworks",
          "Regular audits",
          "Legal training",
          "Insurance policies",
          "Others (please specify)",
        ],
        "Energy transition": [
          "Renewable energy investments",
          "Energy efficiency measures",
          "Sustainable practices",
          "Carbon footprint reduction",
          "Energy audits",
          "Others (please specify)",
        ],
        "Investor Pressure": [
          "Enhanced ESG reporti",
          "Investor engagement progra",
          "Compliance with investor requiremen",
          "Transparent communication",
          "Integration of ESG factors into business strategy",
          "Regular updates to investors",
          "Others (please specify)",
        ],
        "Consumer Preference Changes": [
          "Market research",
          "Sustainable product development",
          "Consumer engagement programs",
          "Adoption of sustainable practices",
          "Customer feedback integration",
          "Branding and marketing adjustments",
          "Others (please specify)",
        ],
        "Supply chain disruptions": [
          "Diversification of suppliers",
          "Supply chain risk assessments",
          "Investment in supply chain resilience",
          "Supplier relationship management",
          "Inventory management Just-in-time (JIT) inventory systems",
          "Others (please specify)",
        ],
        "Corporate governance changes": [
          "Governance policy updates",
          "Board training programs",
          "Compliance with governance regulations",
          "Stakeholder engagement",
          "Ethical business practices",
          "Transparency initiatives",
          "Regular governance reviews",
          "Others (please specify)",
        ],
      },
      MitigationStrategies: {
        "Extreme weather events": [
          "Installation of early warning systems",
          "Community engagement and education",
          "Investment in resilient infrastructure",
          "Enhanced weather monitoring",
          "Flood defenses",
          "Improved drainage systems",
          "Structural reinforcements",
          "Emergency preparedness programs",
          "Backup power systems",
          "Others (please specify)",
        ],
        "Temperature changes": [
          "Energy-efficient technologies",
          "Employee training on energy conservation",
          "Real-time temperature monitoring",
          "Insulation upgrades",
          "High-efficiency HVAC systems",
          "Shade structures",
          "Green roofs",
          "Energy management systems",
          "Others (please specify)",
        ],

        "Sea level rise": [
          "Development of flood-resistant buildings",
          "Community relocation programs",
          "Continuous risk assessment and adaptation",
          "Raised buildings",
          "Wetland restoration",
          "Coastal zoning regulations",
          "Others (please specify)",
        ],
        "Water scarcity": [
          "Installation of water-efficient fixtures",
          "Development of drought-resistant crops",
          "Implementation of water rationing",
          "Community water-saving programs",
          "Rainwater harvesting",
          "Greywater systems",
          "Desalination plants",
          "Xeriscaping",
          "Water-efficient irrigation systems",
          "Others (please specify)",
        ],
        "Changes in precipitation patterns": [
          "Implementation of adaptive farming techniques",
          "Enhanced water storage infrastructure",
          "Real-time precipitation monitoring",
          "Community risk awareness",
          "Floodplain zoning",
          "Improved stormwater systems",
          "Agricultural diversification",
          "Advanced forecasting models",
          "Rainwater capture systems",
          "Others (please specify)",
        ],
        "Natural disasters": [
          "Investment in disaster-resilient infrastructure",
          "Continuous community education and drills",
          "Real-time disaster monitoring systems",
          "Robust communication systems",
          "Earthquake-resistant structures",
          "Firebreaks",
          "Flood barriers",
          "Emergency shelters",
          "Real-time alert systems",
          "Others (please specify)",
        ],
        "Air Quality Degradation": [
          "Implementation of air filtration systems",
          "Upgrading to cleaner fuel sources",
          "Adoption of renewable energy sources",
          "Installation of advanced ventilation systems",
          "Urban greening and tree planting",
          "Use of low-emission industrial processes",
          "Indoor air quality monitoring and improvement",
          "Others (please specify)",
        ],

        "Heatwaves": [
          "Installation of air conditioning systems",
          "Shading and ventilation improvements",
          "Employee wellness programs",
          "Real-time temperature monitoring",
          "Community engagement",
          "Others (please specify)",
        ],
        "Regulatory changes": [
          "Regular compliance audits",
          "Stakeholder engagement",
          "Adoption of best practices",
          "Continuous improvement programs",
          "Others (please specify)",
        ],
        "Market shifts": [
          "Market diversification",
          "Product innovation",
          "Customer feedback mechanisms",
          "Market trend analysis",
          "Others (please specify)",
        ],
        "Technology changes": [
          "Adoption of new technologies",
          "Continuous training programs",
          "Strategic innovation initiatives",
          "Real-time monitoring",
          "Others (please specify)",
        ],
        "Reputational risks": [
          "Crisis communication plans CSR activities",
          "Regular stakeholder updates",
          "Others (please specify)",
        ],
        "Legal risks": [
          "Regular legal audits",
          "Risk mitigation strategies",
          "Legal awareness training",
          "Effective dispute resolution",
          "Others (please specify)",
        ],
        "Energy transition": [
          "Adoption of renewable energy",
          "Implementation of energy-saving technologies",
          "Sustainability reporting",
          "Carbon offset programs",
          "Others (please specify)",
        ],
        "Investor Pressure": [
          "Conduct ESG risk assessments",
          "Implement sustainability initiatives",
          "Develop comprehensive ESG policies",
          "Engage with shareholders on ESG issues",
          "Provide ESG training for management",
          "Improve disclosure practices",
          "Others (please specify)",
        ],
        "Consumer Preference Changes": [
          "Launch eco-friendly product lines",
          "Implement sustainable supply chain practices",
          "Enhance product transparency",
          "Develop recycling programs",
          "Increase investment in R&D for sustainable innovations",
          "Create loyalty programs for green products",
          "Others (please specify)",
        ],
        "Supply chain disruptions": [
          "Develop contingency plans for supply chain interruptions",
          "Establish alternative sourcing strategies",
          "Enhance logistics and distribution networks",
          "Implement supplier audits and compliance checks",
          "Strengthen partnerships with key suppliers",
          "Use technology for supply chain visibility",
          "Others (please specify)",
        ],
        "Corporate governance changes": [
          "Implement governance risk assessments",
          "Enhance internal controls and audit processes",
          "Improve board diversity and independence",
          "Establish clear governance structures",
          "Develop whistleblower programs",
          "Strengthen oversight and accountability mechanisms",
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
  const updatedMultiSelectStyle = {
    control: (base) => ({
      ...base,
      padding: '4px 10px', // Equivalent to py-3
      minHeight: '48px', // Ensure height matches your other elements
      borderColor: '#d1d5db', // Matches Tailwind's gray-300 border
      borderRadius: '0.375rem', // Matches Tailwind's rounded-md
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0', // Reset inner padding to fit the custom height
    }),
    menu: (provided) => ({
      ...provided,

      position: "relative",

      bottom: "100%",

      top: 0,

      zIndex: 1000,
    }),

    menuList: (provided) => ({ ...provided, maxHeight: "200px" }),
      multiValue: (base) => ({
        ...base,
        backgroundColor: '#dbeafe', // Light blue background (Tailwind's blue-100)
        borderRadius: '0.375rem', // Rounded corners
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: '#1e40af', // Blue text (Tailwind's blue-800)
        fontWeight: '600',
      }),
      multiValueRemove: (base) => ({
        ...base,
        color: '#6A6E70'
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
              {formContext.view === 1 && (
                <th
                  className="text-[12px] border-b border-gray-300 px-4 py-3 relative w-[30vw] xl:w-[17vw] lg:w-[17vw] md:w-[17vw] 2xl:w-[17vw] 4k:w-[17vw] 2k:w-[17vw]"
                
                >
                  {formContext.colhadding}
                </th>
              )}
              {options.titles.map((item, idx) => (
                <th
                  key={idx}
                  style={{  textAlign: "left" }}
                  className={`text-[12px] border-l border-gray-300 px-2 py-3 relative ${getColumnWidth(item.key)}`}
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
          <tbody className="border-b border-gray-300">
            {localValue.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-r  border-gray-300">
                {formContext.view === 1 && rowIndex === 0 && (
                  <td
                    rowSpan={localValue.length}
                    className="p-2 text-center text-[15px] text-[#727272] "
                  >
                    <p className="text-[12px]"> {formContext.colname}</p>
                  </td>
                )}
                {Object.keys(schema.items.properties).map((key, cellIndex) => {
                  const propertySchema = schema.items.properties[key];
                  const isEnum =
                    propertySchema && propertySchema.hasOwnProperty("enum");
                  const isMulti = isMultiSelect(key); // Correctly place the isMulti check for each key

                  return (
                    <td
                      key={cellIndex}
                      className="border-l border-y border-gray-300 text-center"
                    >
                      {isEnum ? (
                        isMulti ? (
                          <>
                            <Select
                              isMulti
                              value={
                                localValue[rowIndex][key]
                                  ? localValue[rowIndex][key].map((val) => ({
                                      value: val,
                                      label: val,
                                    }))
                                  : []
                              }
                              onChange={(selectedOptions) =>
                                handleFieldChange(
                                  rowIndex,
                                  key,
                                  selectedOptions.map((option) => option.value)
                                )
                              }
                              options={(key === "ManagementMethods"
                                ? getConditionalOptions(rowIndex, key)
                                : propertySchema.enum
                              ).map((option) => ({
                                value: option,
                                label: option,
                              }))}
                              className="text-[12px] w-full"
                              placeholder="Select options"
                              components={{
                                Option: CustomOptionnew,
                                MultiValueContainer:CustomMultiValueContainer
                              }}
                              closeMenuOnSelect={false}
                              hideSelectedOptions={false}
                              styles={updatedMultiSelectStyle}
                            />
                          </>
                        ) : (
                          <>
                            <select
                              value={localValue[rowIndex][key] || ""}
                              onChange={(e) =>
                                handleFieldChange(rowIndex, key, e.target.value)
                              }
                              className="text-[12px] pl-2 py-2 w-full border-b"
                            >
                              <option value="">Select</option>
                              {(key === "MitigationStrategies"
                                ? getConditionalOptions(rowIndex, key)
                                : propertySchema.enum
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
                          value={localValue[rowIndex][key] || ""}
                          onChange={(e) =>
                            handleFieldChange(rowIndex, key, e.target.value)
                          }
                          className="text-[12px] pl-2 py-2 w-full"
                          placeholder="Enter value"
                        />
                      )}
                      {othersInputs[rowIndex] &&
                        othersInputs[rowIndex][key] &&
                        localValue[rowIndex][key]?.includes(
                          "Others (please specify)"
                        ) && (
                          <input
                            type="text"
                            value={localValue[rowIndex][`${key}_others`] || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                rowIndex,
                                `${key}_others`,
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
                <td className="border-y border-gray-300 p-4 text-center w-[45%]">
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
            <tr>
              <td
                rowSpan={1}
                className="p-2 border-l border-gray-300   text-center"
              ></td>
              <td
                colSpan={11}
                className="p-2 border-l border-gray-300  text-center"
              >
                <button
                  type="button"
                  onClick={addRow}
                  className="text-blue-500 flex items-center"
                >
                  <MdAdd /> Add Row
                </button>
              </td>
              <td className=" border-gray-300 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Economictable;
