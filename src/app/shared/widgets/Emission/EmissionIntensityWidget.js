import React, { useState, useEffect } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  MdInfoOutline,
  MdOutlineKeyboardArrowDown,
  MdOutlineDeleteOutline,
  MdAdd,
} from "react-icons/md";
import Select from "react-select";
import { Currency } from "../../data/currency";

const EmissionIntensityWidget = ({
  schema = {},
  id,
  uiSchema = {},
  value = [],
  onChange,
}) => {
  const rows = Array.isArray(value) ? value : [];

  const handleAddRow = () => {
    const newRow = {
      MetricType: "",
      Metricname: "",
      Quantity: "",
      Units: "",
      intensityratio: [],
    };
    onChange([...rows, newRow]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    onChange(updatedRows);
  };

  const handleRowChange = (index, field, newValue) => {
    const updatedRows = [...rows];

    if (field === "MetricType") {
      if (newValue === "Other (please specify)") {
        updatedRows[index] = {
          ...updatedRows[index],
          MetricType: newValue,
          customMetricType: "",
          Units: "",
        };
      } else {
        updatedRows[index] = {
          ...updatedRows[index],
          MetricType: newValue,
          customMetricType: "",
          Units: "",
        };
      }
    } else if (field === "customMetricType") {
      updatedRows[index] = {
        ...updatedRows[index],
        customMetricType: newValue,
      };
    } else if (field === "Units") {
      updatedRows[index] = { ...updatedRows[index], Units: newValue };
    } else if (field === "customUnit") {
      updatedRows[index] = { ...updatedRows[index], customUnit: newValue };
    } else {
      updatedRows[index] = { ...updatedRows[index], [field]: newValue };
    }

    onChange(updatedRows);
  };

  const currencyOptions = Currency.map(({ currency, currency_name }) => ({
    value: currency,
    label: `${currency} - ${currency_name}`,
  }));
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

  const newcustomStyles = {
    control: (provided) => ({
      ...provided,

      border: "none",

      boxShadow: "none",

      padding: 0,

      margin: 0,

      minHeight: "auto",
    }),

    placeholder: (provided) => ({ ...provided, textAlign: "left" }),

    input: (provided) => ({ ...provided, margin: 0, padding: 0 }),

    menu: (provided) => ({
      ...provided,

      position: "relative",

      bottom: "100%",

      top: 0,

      zIndex: 1000,
    }),

    menuList: (provided) => ({ ...provided, maxHeight: "200px" }),
  };
  const unitsByMetricType = {
    "Units of product sold": "number",

    "Unit of energy consumed": [
      "Joule (J)",
      "Megajoule (MJ)",
      "Gigajoule (GJ)",
      "Watt-hour (Wh)",
      "Kilowatt-hour (kWh)",
      "Gigawatt-hour (GWh)",
      "British Thermal Unit (BTU)",
      "Watt (W)",
    ],
    "Production volume": [
      "Custom Unit (Please specify)",
      "Cubic Meter (m³)",
      "Cubic Centimeter (cm³)",
      "Liter (L)",
      "Milliliter (mL)",
      "Microliter (µL)",
      "Cubic Millimeter (mm³)",
      "Cubic Inch (in³)",
      "Cubic Foot (ft³)",
      "Gallon (gal)",
      "Fluid Ounce (fl oz)",
      "Kilogram (kg)",
      "Gram (g)",
      "Pound (lb)",
      "Metric Ton (t)",
      "US short ton (tn)",
    ],
    "Area (such as m2 floor space)": [
      "Square Meter (m²)",
      "Square Kilometer (km²)",
      "Hectare (ha)",
      "Square Foot (ft²)",
    ],
    "Monetary units (such as revenue or sales)": [],
    "Number of employees": "number",
    "Other (please specify)": [],
  };

  return (
    <>
      {rows.map((item, rowIndex) => (
        <div className="mb-4 px-2 flex gap-4" key={rowIndex}>
          <div className="relative">
            {rowIndex === 0 && (
              <label className="block text-[13px] 4k:text-[15px] font-medium text-gray-700 mb-2">
                Organization-specific metric type
                <MdInfoOutline
                  className="inline ml-1 text-gray-600"
                  data-tooltip-id={`tooltip-MetricType-${id}`}
                  data-tooltip-content="Please select organisation specific metric type for calculating GHG emission intensity."
                />
              </label>
            )}
            <select
              className="block w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 focus:outline-none"
              value={item.MetricType}
              onChange={(e) =>
                handleRowChange(rowIndex, "MetricType", e.target.value)
              }
            >
              <option value="">Select Metric Type</option>
              {Object.keys(unitsByMetricType).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {item.MetricType === "Other (please specify)" && (
              <input
                type="text"
                className="block w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 focus:outline-none mt-2"
                placeholder="Specify metric type"
                value={item.customMetricType}
                onChange={(e) =>
                  handleRowChange(rowIndex, "customMetricType", e.target.value)
                }
              />
            )}
            <ReactTooltip
              id={`tooltip-MetricType-${id}`}
              place="top"
              effect="solid"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                zIndex: "100",
              }}
            />
          </div>

          <div className="relative">
            {rowIndex === 0 && (
              <label className="block text-[13px] 4k:text-[15px] font-medium text-gray-700 mb-2">
                Metric Name{" "}
                <MdInfoOutline
                  className="inline ml-1 text-gray-600"
                  data-tooltip-id={`tooltip-Metricname-${id}`}
                  data-tooltip-content="Please mention the name of the metric."
                />
              </label>
            )}
            <input
              type="text"
              className="block w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 focus:outline-none"
              placeholder="Enter metric name"
              value={item.Metricname}
              onChange={(e) =>
                handleRowChange(rowIndex, "Metricname", e.target.value)
              }
            />
            <ReactTooltip
              id={`tooltip-Metricname-${id}`}
              place="top"
              effect="solid"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                zIndex: "100",
              }}
            />
          </div>

          <div className="relative">
            {rowIndex === 0 && (
              <label className="block text-[13px] 4k:text-[15px] font-medium text-gray-700 mb-2">
                Quantity
                <MdInfoOutline
                  className="inline ml-1 text-gray-600"
                  data-tooltip-id={`tooltip-Quantity-${id}`}
                  data-tooltip-html="<p>Please specify the quantity for the selected organization-specific metric.</p><p> Note: For the Number of full-time employees organization-specific metric type, please specify the number of employees in this column. Similarly, for the Unit of product sold organization-specific metric type, please specify the number of products sold in this column.</p>"
                />
              </label>
            )}
            <input
              type="number"
              min="0"
              className="block w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 focus:outline-none"
              placeholder="Enter quantity"
              value={item.Quantity}
              onChange={(e) =>
                handleRowChange(rowIndex, "Quantity", e.target.value)
              }
            />
            <ReactTooltip
              id={`tooltip-Quantity-${id}`}
              place="top"
              effect="solid"
              style={{
                width: "450px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                zIndex: "100",
              }}
            />
          </div>

          <div className="relative">
            {rowIndex === 0 && (
              <label className="block text-[13px] 4k:text-[15px] font-medium text-gray-700 mb-2">
                Units
                <MdInfoOutline
                  className="inline ml-1 text-gray-600"
                  data-tooltip-id={`tooltip-Units-${id}`}
                  data-tooltip-content="Please select the correct unit."
                />
              </label>
            )}
            {["Units of product sold", "Number of employees"].includes(
              item.MetricType
            ) ? (
              <input
                type="text"
                className="block w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 focus:outline-none"
                placeholder="Enter number"
                value={
                  item.MetricType === "Units of product sold"
                    ? "Unit of product sold"
                    : "No. of employees"
                }
                readOnly
                // onChange={(e) =>
                //   handleRowChange(rowIndex, "Units", e.target.value)
                // }
              />
            ) : item.MetricType === "Other (please specify)" ||
              item.Units === "Custom Unit (Please specify)" ? (
              <input
                type="text"
                className="block w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 focus:outline-none "
                placeholder="Specify unit"
                value={item.customUnit}
                onChange={(e) =>
                  handleRowChange(rowIndex, "customUnit", e.target.value)
                }
              />
            ) : item.MetricType ===
              "Monetary units (such as revenue or sales)" ? (
              <Select
                placeholder="Select Currency"
                value={
                  currencyOptions.find(
                    (option) => option.value === item.Units
                  ) || null
                }
                onChange={(selectedOption) =>
                  handleRowChange(
                    rowIndex,
                    "Units",
                    selectedOption?.value || ""
                  )
                }
                options={currencyOptions}
                isClearable
                isSearchablel
                styles={newcustomStyles}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                className="block w-[20vw] 4k:w-[10vw] text-[12px] border-b-2 border-gray-300 focus:outline-none"
              />
            ) : (
              <select
                className="block w-[20vw] 4k:w-[8vw] py-2 text-[12px] 4k:text-[14px] border-b-2 border-gray-300 focus:outline-none"
                value={item.Units}
                onChange={(e) =>
                  handleRowChange(rowIndex, "Units", e.target.value)
                }
              >
                <option value="">Select Unit</option>
                {unitsByMetricType[item.MetricType]?.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            )}
            <ReactTooltip
              id={`tooltip-Units-${id}`}
              place="top"
              effect="solid"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                zIndex: "100",
              }}
            />
          </div>

          <div className="relative">
            {rowIndex === 0 && (
              <label className="block text-[13px] 4k:text-[15px] font-medium text-gray-700 mb-2">
                Types of GHG emissions included in intensity ratio
                <MdInfoOutline
                  className="inline ml-1 text-gray-600"
                  data-tooltip-id={`tooltip-intensityratio-${id}`}
                  data-tooltip-content="Please select the types of GHG emissions included in the intensity ratio, whether direct (Scope 1), energy indirect (Scope 2), and/or other indirect (Scope 3)."
                />
              </label>
            )}
            <Select
              isMulti
              options={schema?.items?.properties?.intensityratio?.enum?.map(
                (option) => ({
                  value: option,
                  label: option,
                })
              )}
              // Ensure `item.intensityratio` is an array before calling `.map()`
              value={(item.intensityratio || []).map((option) => ({
                value: option,
                label: option,
              }))}
              onChange={(selectedOptions) =>
                handleRowChange(
                  rowIndex,
                  "intensityratio",
                  selectedOptions.map((opt) => opt.value)
                )
              }
              styles={newcustomStyles}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ Option: CustomOption }}
              className="block w-[25vw] 4k:w-[10vw] text-[12px] border-b-2 border-gray-300 focus:outline-none"
            />
            <ReactTooltip
              id={`tooltip-intensityratio-${id}`}
              place="top"
              effect="solid"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                zIndex: "100",
              }}
            />
          </div>

          <button onClick={() => handleRemoveRow(rowIndex)}>
            <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
          </button>
        </div>
      ))}

      <div className="flex right-1 mx-2">
        <button
          type="button"
          className="text-[#007EEF] text-[13px] 4k:text-[15px] flex cursor-pointer mt-2 mb-2"
          onClick={handleAddRow}
        >
          <MdAdd className="text-lg mt-0 4k:mt-0.5" /> Add new
        </button>
      </div>
    </>
  );
};

export default EmissionIntensityWidget;
