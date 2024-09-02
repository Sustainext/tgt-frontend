import React, { useState } from 'react';
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Currency } from "../../data/currency";

const currencyOptions = Currency.map(({ currency, country }) => ({
  value: currency,
  label: `${currency}`
}));

const CurrencyWidget = (props) => {
  const { onChange, value = "", uiSchema = {}, options, autofocus } = props;
  const [inputValue, setInputValue] = useState(value.split(" ")[0] || "");
  const [selectedCurrency, setSelectedCurrency] = useState(value.split(" ")[1] || "");

  const handleInputChange = (e) => {
    const val = e.target.value;
    const validValue = val.match(/^\d*\.?\d{0,2}$/) ? val : inputValue;
    setInputValue(validValue);
    onChange(`${validValue} ${selectedCurrency}`);
  };

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    onChange(`${inputValue} ${currency}`);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2">
          <div className="relative">
            <p className="text-sm text-gray-700 flex" style={{ display: uiSchema["ui:titledisplay"] }}>
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                data-tooltip-html={uiSchema["ui:tooltip"]}
                className="mt-1 ml-2 w-[14px] text-[14px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />
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
        </div>

        <div className="flex items-center">
          <input
            type={uiSchema["ui:inputfildtype"]}
            placeholder="Enter amount"
            className="py-4 border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-l-md leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-[20%]"
            value={inputValue}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
          <select
            className="py-4 border appearance-none text-xs bg-gray-50 border-gray-400 text-black pl-2 pr-2 rounded-r-md leading-tight focus:outline-none focus:bg-white  cursor-pointer"
            onChange={handleCurrencyChange}
            value={selectedCurrency}
          >
            <option value="" disabled={!!selectedCurrency}>Select Currency</option>
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

export default CurrencyWidget;
