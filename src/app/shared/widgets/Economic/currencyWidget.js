import React, { useState, useEffect } from 'react';
import { MdInfoOutline, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Select from 'react-select';
import { Currency } from "../../data/currency";

const currencyOptions = Currency.map(({ currency, country, currency_name }) => ({
  value: currency,
  label: `${currency} - ${currency_name}`
}));

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '45px',
    borderRadius: '0 0.375rem 0.375rem 0',
    borderColor: 'transparent', 
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'transparent',
    },
    width: '100%',
  }),
  input: (provided) => ({
    ...provided,
    fontSize: '15px',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '12px',
    color: '#6B7280',  
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '15px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }),
  indicatorSeparator: () => ({
    display: 'none', 
  }),
};

const CurrencyWidget = (props) => {
  const { onChange, value = "", uiSchema = {}, options, autofocus } = props;
  const [inputValue, setInputValue] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    const [amount, currency] = value.split(" ");
    setInputValue(amount || "");
    setSelectedCurrency(currency || "");
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    const validValue = val.match(/^\d*\.?\d{0,2}$/) ? val : inputValue;
    setInputValue(validValue);
    onChange(`${validValue} ${selectedCurrency}`);
  };

  const handleCurrencyChange = (selectedOption) => {
    const currency = selectedOption ? selectedOption.value : "";
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
              />
            </p>
          </div>
        </div>

        <div className="flex items-center border border-gray-300 rounded-md w-[100%] xl:w-[50%] lg:w-[50%] md:w-[50%] 2k:w-[50%] 4k:w-[50%] 2xl:w-[50%]">
          <input
            type={uiSchema["ui:inputfildtype"] || "text"}
            placeholder="Enter amount"
            className="py-4 text-[12px] text-neutral-900 pl-2 leading-tight border-r border-gray-300 focus:outline-none focus:bg-white cursor-pointer w-[50%]"
            value={inputValue}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
          <Select
            styles={customStyles}
            className="w-[50%] border-none text-[12px] text-neutral-900"
            placeholder="Select Currency"
            value={currencyOptions.find(option => option.value === selectedCurrency) || null}
            onChange={handleCurrencyChange}
            options={currencyOptions}
            isSearchable
            components={{ DropdownIndicator: () => <MdOutlineKeyboardArrowDown className="text-gray-600 " size={20}/> }}
            isClearable
            noOptionsMessage={() => "No currencies found"}
          />
        </div>
      </div>
    </>
  );
};

export default CurrencyWidget;
