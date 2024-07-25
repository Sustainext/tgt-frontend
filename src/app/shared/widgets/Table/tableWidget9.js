"use client";
import React, { useState, useCallback, useEffect } from "react";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const CustomTableWidget9 = ({
  id,
  options,
  value,
  required,
  onChange,
  formContext,
}) => {
  // Debounced input change handler
  const visibleKeys = [
    "category",
    "male",
    "female",
    "others",
    "totalEmployees",
    "male1",
    "female1",
    "others1",
    "totalTrainingHours",
  ];

  // Debounced input change handler
  const handleInputChange = useCallback(
    debounce((newData) => {
      onChange(newData);
    }, 200),
    []
  );

  // Update fields and automatically compute totals
  const updateField = (index, key, newValue) => {
    const newData = [...value];
    newData[index][key] = newValue;

    // Automatically compute totals if relevant fields are modified
    if (["male", "female", "others"].includes(key)) {
      newData[index]["totalEmployees"] = [
        newData[index]["male"],
        newData[index]["female"],
        newData[index]["others"],
      ].reduce((sum, value) => sum + (Number(value) || 0), 0);
    }
    if (["male1", "female1", "others1"].includes(key)) {
      newData[index]["totalTrainingHours"] = [
        newData[index]["male1"],
        newData[index]["female1"],
        newData[index]["others1"],
      ].reduce((sum, value) => sum + (Number(value) || 0), 0);
    }

    handleInputChange(newData);
  };

  // Function to add a new row in the table
  const handleAddRow = () => {
    const newRow = {
      category: "",
      male: "",
      female: "",
      others: "",
      totalEmployees: "",
      male1: "",
      female1: "",
      others1: "",
      totalTrainingHours: "",
    };
    const newData = [...value, newRow];
    onChange(newData);
  };

  // Log value changes for debugging
  useEffect(() => {
    console.log("CustomTableWidget value:", value);
  }, [value]);

  return (
    <>
      <div style={{ overflowY: "auto", maxHeight: "400px" }}>
        <table id={id} className="rounded-md border border-gray-300 w-full">
          <thead className="gradient-background">
            <tr>
              {options.titles.map((item, idx) => {
                // Check if the title is "Employee Category"
                if (item.title === "Employee Category") {
                  return (
                    // This header will span 2 rows if the condition is met
                    <th
                      key={`header-${idx}`}
                      className={`text-[12px] px-2 py-2 text-left`}
                      rowSpan={2} // Spanning two rows
                    >
                      <div className="flex items-center">
                        <p>{item.title}</p>
                        <MdInfoOutline
                          data-tooltip-id={`tooltip-${item.title.replace(
                            /\s+/g,
                            "-"
                          )}`}
                          data-tooltip-content={item.tooltip}
                          className="ml-2 cursor-pointer w-[20%]"
                        />
                        <ReactTooltip
                          id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                          place="top"
                          effect="solid"
                          className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                        />
                      </div>
                    </th>
                  );
                } else {
                  // Normal rendering for other headers
                  return (
                    <th
                      key={`header-${idx}`}
                      className={`text-[12px] px-2 py-2 ${
                        idx === 0
                          ? "text-left"
                          : "text-center border border-gray-300"
                      }`}
                      colSpan={item.colSpan}
                    >
                      <div className="flex items-center justify-center">
                        <p>{item.title}</p>
                        <MdInfoOutline
                          data-tooltip-id={`tooltip-${item.title.replace(
                            /\s+/g,
                            "-"
                          )}`}
                          data-tooltip-content={item.tooltip}
                          className="ml-2 cursor-pointer w-[20%]"
                        />
                        <ReactTooltip
                          id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                          place="top"
                          effect="solid"
                          className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                        />
                      </div>
                    </th>
                  );
                }
              })}
              <th></th>
            </tr>
            <tr>
              {options.tbtilte.map((item, idx) => (
                <th
                  key={`tbtitle-${idx}`}
                  style={{ textAlign: "center" }}
                  className="text-[12px] border border-gray-300 px-2 py-2"
                  colSpan={item.colSpan}
                >
                  <div className="">
                    <p>{item.title}</p>
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
            <tr>
              {options.subTitles.map((item, idx) => (
                <th
                  key={`sub-header-${idx}`}
                  style={{ textAlign: "center" }}
                  className="text-[12px] border border-gray-300 px-2 py-2"
                  colSpan={item.colSpan}
                >
                  <div className="">
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
                {Object.keys(item)
                  .filter((key) => visibleKeys.includes(key)) // Only display specified keys
                  .map((key, cellIndex) => (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className="border border-gray-300 p-3"
                    >
                      <InputField
                        type={
                          options.subTitles.find(
                            (sub) =>
                              sub.title2.toLowerCase() === key.toLowerCase()
                          )?.type || "text"
                        }
                        required={required}
                        readOnly={
                          key === "totalEmployees" ||
                          key === "totalTrainingHours"
                        }
                        value={item[key]}
                        onChange={(newValue) =>
                          updateField(rowIndex, key, newValue)
                        }
                      />
                    </td>
                  ))}
                <td className="border border-gray-300 p-3">
                  <button onClick={() => formContext.onRemove(rowIndex)}>
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
    </>
  );
};

const InputField = ({ type, required, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    if (type === 'number') {
      newValue = parseInt(newValue, 10) || 0; // Convert to integer, default to 0 if NaN
    }
    setInputValue(newValue);
    onChange(newValue); // Update with converted value
  };

  return (
    <input
      type={type === 'number' ? 'number' : 'text'}
      required={required}
      value={inputValue}
      onChange={handleInputChange}
      style={{ width: "100%" }}
      placeholder="Enter data"
      className="text-sm pl-2 py-2 text-center"
    />
  );
};

export default CustomTableWidget9;
