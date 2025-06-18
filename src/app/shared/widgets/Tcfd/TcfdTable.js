"use client";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const CustomOption = ({ children, ...props }) => {
  const { isSelected, isFocused, innerProps } = props;

  return (
    <div
      {...innerProps}
      style={{
        backgroundColor: isSelected ? "white" : isFocused ? "#f0f0f0" : "white",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        style={{ marginRight: "8px" }}
          className='green-checkbox-small'
      />
      {children}
    </div>
  );
};

const CustomMultiValueContainer = ({ children, ...props }) => {
  const { data, selectProps } = props;
  const index = selectProps.value.findIndex((val) => val.value === data.value);

  if (index < 2) {
    return (
      <components.MultiValueContainer {...props}>
        {children}
      </components.MultiValueContainer>
    );
  }

  if (index === 2) {
    return (
      <components.MultiValueContainer {...props}>
        <div
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: "0.375rem",
            padding: "2px 5px",
            color: "#1e40af",
            fontWeight: "600",
          }}
        >
          +{selectProps.value.length - 2} more
        </div>
      </components.MultiValueContainer>
    );
  }

  return null;
};


const TcfdTable = ({
  formData = [],
  onChange,
  riskdata = {},
  BusinessAffected = [],
}) => {
  const [tableData, setTableData] = useState([]);

  const selectOptions = BusinessAffected.map((option) => ({
    label: option,
    value: option,
  }));

  useEffect(() => {
    const allRiskItems = [
      ...(riskdata?.climate_data || []),
      ...(riskdata?.opportunities_data || []),
    ];

    const existingData = Array.isArray(formData) ? formData : [];

    const matchedData = allRiskItems.map((label) => {
      const existing = existingData.find((item) => item.label === label);
      return {
        label,
        selectedOptions: existing?.selectedOptions || [],
        otherText: existing?.otherText || "",
        impact: existing?.impact || "",
      };
    });

    const extraFromFormData = existingData.filter(
      (item) => item.label && !allRiskItems.includes(item.label)
    );

    const merged = [...matchedData, ...extraFromFormData];

    setTableData(merged);
    onChange(merged);
  }, [riskdata]);

  const updateFormData = (data) => {
    setTableData(data);
    onChange(data);
  };

  const handleMultiChange = (i, selected) => {
    const updated = [...tableData];
    updated[i].selectedOptions = selected.map((item) => item.value);
    updateFormData(updated);
  };

  const handleOtherTextChange = (i, value) => {
    const updated = [...tableData];
    updated[i].otherText = value;
    updateFormData(updated);
  };

  const handleImpactChange = (i, value) => {
    const updated = [...tableData];
    updated[i].impact = value;
    updateFormData(updated);
  };
const updatedMultiSelectStyle = {
  control: (base) => ({
    ...base,
    padding: "4px 10px", // Equivalent to py-3
    minHeight: "48px", // Ensure height matches your other elements
    borderColor: "#d1d5db", // Matches Tailwind's gray-300 border
    borderRadius: "0.375rem", // Matches Tailwind's rounded-md
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0", // Reset inner padding to fit the custom height
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
    backgroundColor: "#dbeafe", // Light blue background (Tailwind's blue-100)
    borderRadius: "0.375rem", // Rounded corners
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#1e40af", // Blue text (Tailwind's blue-800)
    fontWeight: "600",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#6A6E70",
  }),
};
  return (
     <div
      style={{
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "90vw",
      }}
      className="mb-2 pb-2 table-scrollbar"
    >
        <table
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
      <thead>
        <tr className="text-[12px] text-gray-800">
          <th className="p-2 border w-[30vw] font-medium relative text-left py-4">
            Climate-related risks/opportunities
            <MdInfoOutline
              data-tooltip-id="tooltip-risks"
              data-tooltip-content="Climate-related issue(s) impacting the business areas of the organisation. This may include physical risks, transition risks, or climate-related opportunities."
              className="inline ml-1 text-[14px] cursor-pointer align-middle"
            />
            <ReactTooltip
              id="tooltip-risks"
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
                zIndex:"100"
              }}
            />
          </th>
          <th className="p-2 border w-[30vw] font-medium relative py-4 text-left">
            Business Areas Affected
            <MdInfoOutline
              data-tooltip-id="tooltip-areas"
              data-tooltip-content="Select the business function, process, or area (e.g., products, operations, supply chain, R&D, finance) affected by climate-related risks or opportunities. "
              className="inline ml-1 text-[14px] cursor-pointer align-middle"
            />
            <ReactTooltip
              id="tooltip-areas"
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
                zIndex:"100"
              }}
            />
          </th>
          <th className="p-2 border w-[30vw] font-medium relative py-4 text-left">
            Impact
            <MdInfoOutline
              data-tooltip-id="tooltip-impact"
              data-tooltip-content="Explain how the identified climate issue has influenced the strategy, planning, or operations of the selected business area. "
              className="inline ml-1 text-[14px] cursor-pointer align-middle"
            />
            <ReactTooltip
              id="tooltip-impact"
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
                zIndex:"100"
              }}
            />
          </th>
        </tr>
      </thead>

      <tbody>
        {tableData.map((row, i) => (
          <tr key={i}>
            <td className="border py-2 text-[12px] pl-4">{row.label}</td>
            <td className="border p-2 text-[12px]">
              <div className=" pb-1">
                <Select
                  isMulti
                  options={selectOptions}
                  value={(row.selectedOptions || []).map((val) => ({
                    value: val,
                    label: val,
                  }))}
                  onChange={(selected) => handleMultiChange(i, selected)}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  className="text-[12px]"
                      styles={updatedMultiSelectStyle}
                      placeholder="Select options"
                  components={{
                    Option: CustomOption,
                    MultiValueContainer: CustomMultiValueContainer,
                  }}
                />
              </div>
              {row.selectedOptions?.includes("Others (please specify)") && (
                <input
                  type="text"
                  className="mt-2 w-full p-1 border-b text-[12px]"
                  value={row.otherText}
                  onChange={(e) => handleOtherTextChange(i, e.target.value)}
                  placeholder="Please specify"
                />
              )}
            </td>
            <td className="border p-2 text-[12px]">
              <input
                type="text"
                className=" p-1 border-b rounded text-[12px] w-[30vw] focus:outline-none"
                value={row.impact}
                onChange={(e) => handleImpactChange(i, e.target.value)}
                placeholder="Enter impact"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TcfdTable;
