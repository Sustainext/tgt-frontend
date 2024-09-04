import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Select from 'react-select';
import "react-tooltip/dist/react-tooltip.css";
import { Currency } from "../../data/currency";

// Map currency data to options for react-select
const currencyOptions = Currency.map(({ currency, country,currency_name }) => ({
  value: currency,
  label: `${currency} - ${currency_name}`
}));

// Custom styles for react-select
const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    padding: 0, // Ensure no padding that might cause a gap
    margin: 0, // Remove any margin
    minHeight: 'auto',

  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#000', // Optional: Change the dropdown icon color
    padding: 0, // Ensure no padding for the icon
  }),
  indicatorSeparator: () => ({
    display: 'none', // Remove the separator
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px', // Adjust padding for the value container
  }),
  input: (provided) => ({
    ...provided,
    margin: 0, // Ensure no margin for the input
    padding: 0, // Ensure no padding for the input
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0, // Remove any gap between the select box and dropdown menu
  }),
};

const CurrencyselectWidget = (props) => {
    const { onChange, value = "", uiSchema = {} } = props;

    const handleChange = (selectedOption) => {
        onChange(selectedOption ? selectedOption.value : "");
    };

    return (
        <>
        <div className="mb-6">
        <div className="relative mb-2">
        <p className="text-sm text-gray-700 flex">
          {uiSchema["ui:title"]}
          <MdInfoOutline
            data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
              /\s+/g,
              "-"
            )}`}
            data-tooltip-html={uiSchema["ui:tooltip"]}
            className="mt-1 ml-2 w-[30px] text-[14px]"
            style={{ display: uiSchema["ui:tooltipdisplay"] }}
          />
          {/* Tooltip */}
          <ReactTooltip
            id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
            place="top"
            effect="solid"
            style={{
              width: "300px",
              backgroundColor: "#000",
              color: "white",
              fontSize: "12px",
              boxShadow: 3,
              borderRadius: "8px",
            }}
          ></ReactTooltip>
        </p>
      </div>
      <div>
        <Select
          styles={customStyles} // Apply custom styles
          className={uiSchema["ui:widgtclass"]} // Include your widget class
          onChange={handleChange}
          value={currencyOptions.find(option => option.value === value)}
          options={currencyOptions}
          isClearable
          placeholder="Select Currency"
        />
      </div>
      </div>
      </>
    );
};

export default CurrencyselectWidget;
