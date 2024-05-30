
'use client'
import React, { useState, useCallback } from "react";
import { MdInfoOutline,MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { debounce } from "lodash";

const CustomTableWidget = ({
  id,
  options,
  value,
  required,
  onChange,
  formContext,
}) => {
  // Debounced function to update form's state
  const handleInputChange = useCallback(
    debounce((newData) => {
      onChange(newData);
    }, 200),
    []
  );

  // Updates the local input and calls the debounced onChange
  const updateField = (index, key, newValue) => {
    const newData = [...value];
    newData[index][key] = newValue;
    handleInputChange(newData);
  };

  const tableStyle = {
    width: "100%",
    maxWidth: "1010px",
    minWidth: "300px",
    overflowY: "auto",
    maxHeight: "400px",
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: "400px" }}>
      <table id={id} style={tableStyle} className="rounded-md border border-gray-300">
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ minWidth: "120px", textAlign: "left" }}
                className="text-[12px] border border-gray-300 px-2 py-2"
              >
                <div className="flex items-center">
                  <p>{item.title}
                    </p>
                    <p>
                    <MdInfoOutline
                   data-tooltip-id={`tooltip-${item.title.replace(/\s+/g, '-')}`}
                   data-tooltip-content={item.tooltip}
                   style={{display:`${item.display}`}}

                  className="ml-2 cursor-pointer" />
                  <ReactTooltip
                    id={`tooltip-${item.title.replace(/\s+/g, '-')}`}
                    place="top"
                    effect="solid"
                    className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                  />
                    </p>


                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {value.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(item).map((key, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 p-3">
                  <InputField
                    type="text"
                    required={required}
                    value={item[key]}
                    onChange={(newValue) => updateField(rowIndex, key, newValue)}
                  />
                </td>
              ))}
              <td className="border border-gray-300 p-3">
                <button onClick={() => formContext.onRemove(rowIndex)}>
                <MdOutlineDeleteOutline className='text-[23px] text-red-600' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Component to handle individual input fields
const InputField = ({ type, required, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type={type}
      required={required}
      value={inputValue}
      onChange={handleInputChange}
      style={{ width: "100%" }}
      placeholder="Enter data"
      className="text-sm pl-2 py-2" // Ensures input field uses the full width of its container
    />
  );
};

export default CustomTableWidget;
