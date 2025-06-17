"use client";
import React, { useState, useRef, useEffect } from "react";
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

const TcfdMetrics = ({ formData = [], onChange, formContext, uiSchema }) => {
  const tableSchema = uiSchema?.["ui:table"] || [];
  const riskdata = formContext?.riskdata || [];
  const [rowData, setRowData] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      if (Array.isArray(formData) && formData.length > 0) {
        setRowData(formData); // ✅ Expect Q1 directly as an array
      } else if (Array.isArray(riskdata) && riskdata.length > 0) {
        setRowData(
          riskdata.map((risk) => ({
            ClimateRelatedRisk:
              typeof risk === "string"
                ? risk
                : risk["Climate Related Risk"] || "",
            MetricCategory: [],
            KeyMetric: "",
            MetricValue: "",
            MetricUnit: "",
            Scope: [],
            HistoricalMetric: "",
            HistoricalPeriodCovered: "",
            MetricReported: "",
            TimeHorizon: "",
            MethodologyUsed: "",
          }))
        );
      }
      initialized.current = true;
    }
    console.log(formData, "set formData");
  }, [formData, riskdata]);

  const getKey = (col) => col.key || col.title;

  const handleFieldChange = (rowIndex, fieldKey, value) => {
    const updatedRows = [...rowData];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      [fieldKey]: value,
    };

    setRowData(updatedRows);
    onChange(updatedRows); // ✅ Q1 directly
  };

  const renderCell = (rowIndex, col) => {
    const updatedMultiSelectStyle = {
      control: (base) => ({
        ...base,
        border: "none",
        padding: "4px 10px", // Equivalent to py-3
        minHeight: "48px", // Ensure height matches your other elements
        // borderColor: '#d1d5db', // Matches Tailwind's gray-300 border
        // borderRadius: '0.375rem', // Matches Tailwind's rounded-md
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
    const key = getKey(col);
    const value = rowData?.[rowIndex]?.[key] || "";
    const row = rowData[rowIndex];

    const isHistoricalDisabled =
      key === "HistoricalPeriodCovered" && row?.HistoricalMetric !== "Yes";
    const isTimeHorizonDisabled =
      key === "TimeHorizon" && row?.MetricReported !== "Yes";
    const isDisabled = isHistoricalDisabled || isTimeHorizonDisabled;

    const isMultiselect = col.type === "multiselect";
    const isSelect = col.type === "select";
    const otherKey = `${key}_other`;
    const otherValue = row?.[otherKey] || "";

    const showOther =
      (isMultiselect &&
        Array.isArray(value) &&
        value.includes("Others (please specify)")) ||
      (isSelect && value === "Others (please specify)");

    if (key === "ClimateRelatedRisk") {
      return (
        <div className="text-[12px] font-medium min-w-[250px]">{value}</div>
      );
    }

    switch (col.type) {
      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
            className="border px-2 py-1 rounded w-full min-w-[250px] text-[12px]"
            disabled={isDisabled}
          />
        );

      case "select":
        return (
          <div className="flex flex-col gap-1 min-w-[250px]">
            <select
              value={value}
              onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
              className="border px-2 py-1 rounded w-full text-[12px]"
            >
              <option value="">Select</option>
              {col.option?.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {showOther && (
              <input
                type="text"
                placeholder="Please specify"
                className="border px-2 py-1 rounded w-full text-[12px]"
                value={otherValue}
                onChange={(e) =>
                  handleFieldChange(rowIndex, otherKey, e.target.value)
                }
              />
            )}
          </div>
        );

      case "multiselect":
        const mappedOptions =
          col.option?.map((opt) => ({ label: opt, value: opt })) || [];
        const selectedOptions = Array.isArray(value)
          ? mappedOptions.filter((opt) => value.includes(opt.value))
          : [];

        return (
          <div className="flex flex-col gap-1 min-w-[250px]">
            <Select
              isMulti
              options={mappedOptions}
              value={selectedOptions}
              onChange={(selected) => {
                const newValues = selected.map((s) => s.value);
                handleFieldChange(rowIndex, key, newValues);
              }}
              styles={updatedMultiSelectStyle}
              closeMenuOnSelect={false}
              components={{
                Option: CustomOption,
                MultiValueContainer: CustomMultiValueContainer,
              }}
            />
            {showOther && (
              <input
                type="text"
                placeholder="Please specify"
                className="border px-2 py-1 rounded w-full text-[12px]"
                value={otherValue}
                onChange={(e) =>
                  handleFieldChange(rowIndex, otherKey, e.target.value)
                }
              />
            )}
          </div>
        );

      case "input":
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(rowIndex, key, e.target.value)}
            className="border px-2 py-1 rounded w-full min-w-[250px] text-[12px]"
            disabled={isDisabled}
          />
        );
    }
  };

  return (
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
      <table
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="gradient-background">
          <tr>
            {tableSchema.map((col, index) => (
              <th
                key={index}
                className={` border font-semibold text-[12px] py-4 px-2 ${
                  index === 0 ? "text-left" : "text-center"
                }`}
              >
                <div
                  className={`flex items-center ${
                    index === 0 ? " justify-start" : "justify-center"
                  } gap-1`}
                >
                  {col.title}
                  {col.tooltip && (
                    <>
                      <MdInfoOutline
                        data-tooltip-id={`tooltip-${index}`}
                        className="text-[#727272] text-xs cursor-pointer"
                      />
                      <ReactTooltip
                        id={`tooltip-${index}`}
                        place="top"
                        effect="solid"
                        className="z-50"
                        content={col.tooltip}
                        style={{
                          width: "290px",
                          backgroundColor: "#000",
                          color: "white",
                          fontSize: "12px",
                          boxShadow: 3,
                          borderRadius: "8px",
                          textAlign: "left",
                        }}
                      />
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((_, rowIndex) => (
            <tr key={rowIndex} className="text-[12px]">
              {tableSchema.map((col, colIndex) => (
                <td key={colIndex} className="p-2 border">
                  {renderCell(rowIndex, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TcfdMetrics;
