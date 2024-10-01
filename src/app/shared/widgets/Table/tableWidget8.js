'use client'
import React, { useState, useCallback, useEffect } from "react";
import { MdOutlineDeleteOutline, MdAdd, MdInfoOutline } from "react-icons/md";
import { debounce } from "lodash";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CustomTableWidget8 = ({
  id,
  options,
  value = [], // Ensure the value defaults to an empty array if not passed
  required,
  onChange,
  formContext,
}) => {
  const handleInputChange = useCallback(
    debounce((newData) => {
      onChange(newData);
    }, 200),
    []
  );

  const updateField = (index, key, newValue) => {
    const newData = [...value];
    newData[index][key] = newValue;
    handleInputChange(newData);
  };

  const handleAddRow = () => {
    const newRow = {
      category: "",
      male: 0,
      female: 0,
      nonBinary: 0,
      locationandoperation: "",
    };
    const newData = [...value, newRow];
    onChange(newData);
  };

  const handleRemoveRow = (index) => {
    const newData = value.filter((_, i) => i !== index);
    onChange(newData);
  };

  useEffect(() => {
    console.log("CustomTableWidget value:", value);
  }, [value]);

  return (
    <div style={{ overflowY: "auto", maxHeight: "400px" }}>
      <table
        id={id}
        className="rounded-md w-full border border-gray-300"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => {
              const uniqueId = Math.floor(Math.random() * 1000000); // Generate a random unique number
              return (
                <th
                  key={`header-${idx}`}
                  className={`text-[12px] px-2 py-2 ${
                    idx === 0 ? "text-center" : "text-center border-l border-gray-300"
                  }`}
                  colSpan={item.colSpan}
                >
                  <div className="relative">
                    <p className={`flex justify-center`}>
                      {item.title}
                      {(idx === 0 || idx === 2) && (
                        <>
                          <MdInfoOutline
                            data-tooltip-id={`tooltip-${uniqueId}`}
                            data-tooltip-content={item.tooltip}
                            className="cursor-pointer ml-2 mt-1"
                          />
                          <ReactTooltip
                            id={`tooltip-${uniqueId}`}
                            place="top"
                            effect="solid"
                            style={{
                              width: "400px",
                              backgroundColor: "#000",
                              color: "white",
                              fontSize: "12px",
                              boxShadow: 3,
                              borderRadius: "8px",
                              zIndex: "1000",
                            }}
                          />
                        </>
                      )}
                    </p>
                  </div>
                </th>
              );
            })}
            <th></th>
          </tr>
          <tr>
            {options.subTitles.map((item, idx) => (
              <th
                key={`sub-header-${idx}`}
                style={{ textAlign: "center" }}
                className={`text-[12px] px-2 py-2 ${
                  idx === 0 ? "" : idx === 4 ? "border-l " : "border-l border-t"
                } border-gray-300`}
                colSpan={item.colSpan}
              >
                <div>
                  <p>{item.title}</p>
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {value.map((item, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {Object.keys(item).map((key, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={`${
                    cellIndex === 4 ? "border-t" : "border-r border-t"
                  } border-gray-300 p-3`}
                >
                  <InputField
                    type={
                      options.subTitles.find(
                        (sub) => sub.title2.toLowerCase() === key.toLowerCase()
                      )?.type || "text"
                    }
                    required={required}
                    value={item[key]}
                    onChange={(newValue) => updateField(rowIndex, key, newValue)}
                  />
                </td>
              ))}
              <td className="border-t border-gray-300 p-3">
                <button onClick={() => handleRemoveRow(rowIndex)}>
                  <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex right-1 mx-2">
        <button
          type="button"
          className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
          onClick={handleAddRow}
        >
          Add category <MdAdd className="text-lg" />
        </button>
      </div>
    </div>
  );
};

const InputField = ({ type, required, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    if (type === "number") {
      newValue = parseInt(newValue, 10)  ; // Convert to integer, default to 0 if NaN
    }
    setInputValue(newValue);
    onChange(newValue); // Update with converted value
  };

  return (
    <input
      type={type === "number" ? "number" : "text"}
      required={required}
      value={inputValue}
      onChange={handleInputChange}
      style={{ width: "100%" }}
      placeholder="Enter data"
      className="text-sm pl-2 py-2 text-center"
    />
  );
};

export default CustomTableWidget8;
