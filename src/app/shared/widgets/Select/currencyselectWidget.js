import React from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Currency } from "../../data/currency";

// Map currency data to options for select
const currencyOptions = Currency.map(({ currency, country }) => ({
  value: currency,
  label: `${currency}`
}));

const CurrencyselectWidget = (props) => {
    const { onChange, value = "", uiSchema = {} } = props;

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <>
        <div className="mb-6">
        <div className="relative">
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
        <select
          className={uiSchema["ui:widgtclass"]}
          onChange={handleChange}
          value={value}
        >
          <option value="" disabled={!!value}>Select Currency</option>
          {currencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      </div>
      </>
    );
};

export default CurrencyselectWidget;
