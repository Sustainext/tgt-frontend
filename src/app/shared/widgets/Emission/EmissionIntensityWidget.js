import React, { useState, useEffect } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdInfoOutline, MdOutlineKeyboardArrowDown } from "react-icons/md";
import Select from "react-select";
import { Currency } from "../../data/currency";

const EmissionIntensityWidget = ({
  schema = {},
  id,
  uiSchema = {},
  value = {},
  onChange,
}) => {
  const [metricType, setMetricType] = useState(value.MetricType || "");
  const [customMetric, setCustomMetric] = useState(value.customMetric || "");
  const [units, setUnits] = useState(value.Units || "");
  const [intensityRatio, setIntensityRatio] = useState(
    value.intensityratio || []
  );
  const [selectedCurrency, setSelectedCurrency] = useState("");
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
  // Prepare currency options
  const currencyOptions = Currency.map(
    ({ currency, country, currency_name }) => ({
      value: currency,
      label: `${currency} - ${currency_name}`,
    })
  );

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "45px",
      borderRadius: "0 0.375rem 0.375rem 0",
      borderColor: "transparent",
      boxShadow: "none",
      "&:hover": {
        borderColor: "transparent",
      },
      width: "100%",
    }),
    input: (provided) => ({
      ...provided,
      fontSize: "15px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "12px",
      color: "#6B7280",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "15px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 0,
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const unitsByMetricType = {
    "Units of product sold": "number",
    "Number of employees": "number",
    "Unit of energy consumed": [
      "Joule (J)",
      "Megajoule (MJ)",
      "Gigajoule (GJ)",
      "Watt-hour (Wh)",
      "Kilowatt-hour (kWh)",
      "Gigawatt-hour (GWh)",
      "British Thermal Unit (BTU)",
      "Watt (W)",
      "Cubic Foot (ft³)",
      "Gallon (gal)",
      "Fluid Ounce (fl oz)",
      "Kilogram (kg)",
      "Kilowatt (kW)",
      "Megawatt (MW)",
      " Gigawatt (GW)",
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
      "Square Centimeter (cm²)",
      "Square Millimeter (mm²)",
      "Square Kilometer (km²)",
      "Hectare (ha)",
      "Square Inch (in²)",
      "Square Foot (ft²)",
      "Square Mile (mi²)",
      "Acre",
    ],
    "Monetary units (such as revenue or sales)": [],
  };

  const handleMetricTypeChange = (e) => {
    const newType = e.target.value;
    setMetricType(newType);
    setUnits("");
    onChange({ ...value, MetricType: newType, Units: "" });
  };

  const handleCustomMetricChange = (e) => {
    const newCustom = e.target.value;
    setCustomMetric(newCustom);
    onChange({ ...value, customMetric: newCustom });
  };

  const handleUnitsChange = (e) => {
    const newUnit = e.target.value;
    setUnits(newUnit);
    onChange({ ...value, Units: newUnit });
  };

  const handleIntensityRatioChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((opt) => opt.value);
    setIntensityRatio(selectedValues);
    onChange({ ...value, intensityratio: selectedValues });
  };

  const handleCurrencyChange = (selectedOption) => {
    const currency = selectedOption ? selectedOption.value : "";
    setSelectedCurrency(currency);
    onChange({ ...value, Units: currency });
  };

  useEffect(() => {
    if (typeof value === "string") {
      setSelectedCurrency(value);
    } else {
      setSelectedCurrency("");
    }
  }, [value]);

  const titlesConfig = uiSchema?.["ui:options"]?.titles || [];
  const getTitleConfig = (key) =>
    titlesConfig.find((item) => item.key === key) || {};

  return (
    <div className="mb-4 px-2 flex gap-4">
      {/* MetricType */}
      <div className=" relative">
        <label className="block text-[13px] font-medium text-gray-700 mb-2">
          {getTitleConfig("MetricType").title}
          <MdInfoOutline
            className="inline ml-1 text-gray-600"
            data-tooltip-id={`tooltip-MetricType-${id}`}
          />
        </label>
        <select
          className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 focus:outline-none"
          value={metricType}
          onChange={handleMetricTypeChange}
        >
          <option value="">Select Metric Type</option>
          {schema?.items?.properties?.MetricType?.enum?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {metricType === "Other (please specify)" && (
          <input
            type="text"
            className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 focus:outline-none"
            placeholder="Specify metric type"
            value={customMetric}
            onChange={handleCustomMetricChange}
          />
        )}
        <ReactTooltip
          id={`tooltip-MetricType-${id}`}
          place="top"
          effect="solid"
          content={getTitleConfig("MetricType").tooltiptext}
          style={{
            width: "290px",
            backgroundColor: "#000",
            color: "white",
            fontSize: "12px",
            boxShadow: 3,
            borderRadius: "8px",
            textAlign: "left",
            zIndex:"1000",
          }}
        />
      </div>
      {/* MetricName */}
      <div className=" relative">
        <label className="block text-[13px] font-medium text-gray-700 mb-2">
          {getTitleConfig("Metricname").title}
          <MdInfoOutline
            className="inline ml-1 text-gray-500"
            data-tooltip-id={`tooltip-Metricname-${id}`}
          />
        </label>
        <input
          type="text"
          className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 focus:outline-none"
          placeholder="Enter metric name"
          value={value.Metricname || ""}
          onChange={(e) => onChange({ ...value, Metricname: e.target.value })}
        />
        <ReactTooltip
          id={`tooltip-Metricname-${id}`}
          place="top"
          effect="solid"
          content={getTitleConfig("Metricname").tooltiptext}
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
      </div>

      {/* Quantity */}
      <div className=" relative">
        <label className="block text-[13px] font-medium text-gray-700 mb-2">
          {getTitleConfig("Quantity").title}
          <MdInfoOutline
            className="inline ml-1 text-gray-500"
            data-tooltip-id={`tooltip-Quantity-${id}`}
          />
        </label>
        <input
          type="number"
          min="0"
          className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 focus:outline-none"
          placeholder="Enter quantity"
          value={value.Quantity || ""}
          onChange={(e) => onChange({ ...value, Quantity: e.target.value })}
        />
        <ReactTooltip
          id={`tooltip-Quantity-${id}`}
          place="top"
          effect="solid"
          content={getTitleConfig("Quantity").tooltiptext}
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
      </div>
      {/* Units Input */}
      <div className=" relative">
        <label className="block text-[13px] font-medium text-gray-700 mb-2">
          {getTitleConfig("Units").title}
          <MdInfoOutline
            className="inline ml-1 text-gray-500"
            data-tooltip-id={`tooltip-Units-${id}`}
          />
        </label>

        {/* Show number input for specific metric types */}
        {["Units of product sold", "Number of employees"].includes(
          metricType
        ) ? (
          <input
            type="number"
            className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 focus:outline-none"
            placeholder="Enter number"
            value={units}
            onChange={handleUnitsChange}
          />
        ) : metricType === "Other (please specify)" ? (
          <input
            type="text"
            className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 focus:outline-none"
            placeholder="Specify unit"
            value={units}
            onChange={handleUnitsChange}
          />
        ) : metricType === "Monetary units (such as revenue or sales)" ? (
          <Select
            placeholder="Select Currency"
            value={
              currencyOptions.find(
                (option) => option.value === selectedCurrency
              ) || null
            }
            onChange={handleCurrencyChange}
            options={currencyOptions}
            styles={newcustomStyles}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isSearchable
            components={{
              DropdownIndicator: () => (
                <MdOutlineKeyboardArrowDown
                  className="text-gray-600"
                  size={20}
                />
              ),
            }}
            isClearable
            noOptionsMessage={() => "No currencies found"}
            className="block w-[20vw] mt-5 text-[12px] border-b-2 border-gray-300 focus:outline-none"
          />
        ) : (
          <select
            className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 focus:outline-none"
            value={units}
            onChange={handleUnitsChange}
            disabled={!unitsByMetricType[metricType]}
          >
            <option value="">Select Unit</option>
            {unitsByMetricType[metricType]?.map((unit) => (
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
          content={getTitleConfig("Units").tooltiptext}
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
      </div>
      {/* IntensityRatio Multi-Select */}
      <div className=" relative">
        <label className="block text-[13px] w-[25vw] font-medium text-gray-700 mb-2">
          {getTitleConfig("intensityratio").title}
          <MdInfoOutline
            className="inline ml-1 text-gray-500"
            data-tooltip-id={`tooltip-intensityratio-${id}`}
          />
        </label>
        <Select
          isMulti
          options={schema?.items?.properties?.intensityratio?.enum?.map(
            (option) => ({
              value: option,
              label: option,
            })
          )}
          value={intensityRatio.map((option) => ({
            value: option,
            label: option,
          }))}
          onChange={handleIntensityRatioChange}
          styles={newcustomStyles}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option: CustomOption }}
          placeholder="Select Intensity Ratios"
          className="block w-[25vw] text-[12px] border-b-2 border-gray-300 focus:outline-none"
        />
        <ReactTooltip
          id={`tooltip-intensityratio-${id}`}
          place="top"
          effect="solid"
          content={getTitleConfig("intensityratio").tooltiptext}
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
      </div>
    </div>
  );
};

export default EmissionIntensityWidget;
