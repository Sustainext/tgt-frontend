"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineDeleteOutline, MdAdd, MdInfoOutline } from "react-icons/md";
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
  const [tableData, setTableData] = useState(value);

  useEffect(() => {
    setTableData(value);
  }, [value]);

  const visibleKeys = [
    "category",
    "male",
    "female",
    "others",
    "totalTrainingHours",
    "male1",
    "female1",
    "others1",
    "totalEmployees",
  ];

  // Update fields and automatically compute totals
  const updateField = (index, key, newValue) => {
    const newData = [...tableData];
    newData[index][key] = newValue;

    // Automatically compute totals if relevant fields are modified
    if (["male", "female", "others"].includes(key)) {
      newData[index]["totalTrainingHours"] = [
        newData[index]["male"],
        newData[index]["female"],
        newData[index]["others"],
      ]
        .reduce((sum, value) => sum + (Number(value) || 0), 0)
        .toString();
    }
    if (["male1", "female1", "others1"].includes(key)) {
      newData[index]["totalEmployees"] = [
        newData[index]["male1"],
        newData[index]["female1"],
        newData[index]["others1"],
      ]
        .reduce((sum, value) => sum + (Number(value) || 0), 0)
        .toString();
    }

    setTableData(newData);
    onChange(newData);
  };

  // Function to add a new row in the table
  const handleAddRow = () => {
    const newRow = {
      category: "",
      male: "",
      female: "",
      others: "",
      totalTrainingHours: "",
      male1: "",
      female1: "",
      others1: "",
      totalEmployees: "",
    };
    const newData = [...tableData, newRow];
    setTableData(newData);
    onChange(newData);
  };

  // Function to remove a row in the table
  const handleRemoveRow = (index) => {
    const newData = tableData.filter((_, rowIndex) => rowIndex !== index);
    setTableData(newData);
    onChange(newData);
  };

  return (
    <>
      <div style={{ overflowY: "auto", maxHeight: "400px" }} className="custom-scrollbar mb-5">
        <table
          id={id}
          className="rounded-md border border-gray-300 w-full"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead className="gradient-background">
            <tr>
              {options.titles.map((item, idx) => {
                // Check if the title is "Employee Category"
                if (item.title === "Employee Category") {
                  return (
                    // This header will span 2 rows if the condition is met
                    <th
                      key={`header-${idx}`}
                      className={`text-[12px] px-2 py-2 text-left  border-r  border-gray-300`}
                      rowSpan={2} // Spanning two rows
                      style={{ minWidth: "150px" }}
                    >
                      <div className="flex items-center relative">
                        <p>{item.title}</p>
                        <MdInfoOutline
                          data-tooltip-id={`tooltip-${item.title.replace(
                            /\s+/g,
                            "-"
                          )}`}
                          data-tooltip-content={item.tooltip}
                          className="ml-1 cursor-pointer w-[10%]"
                        />
                        <ReactTooltip
                          id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
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
                          ? "text-left "
                          : idx === 1
                          ? " text-center  border-r border-b border-gray-300"
                          : "text-center border-b"
                      }`}
                      colSpan={item.colSpan}
                    >
                      <div className="flex items-center justify-center relative">
                        <p>{item.title}</p>
                        <MdInfoOutline
                          data-tooltip-id={`tooltip-${item.title.replace(
                            /\s+/g,
                            "-"
                          )}`}
                          data-tooltip-content={item.tooltip}
                          className="ml-1 cursor-pointer w-[5%]"
                        />
                        <ReactTooltip
                          id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
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
                      </div>
                    </th>
                  );
                }
              })}
              <th className="border-b border-gray-30"></th>
            </tr>
            <tr>
              {options.tbtilte.map((item, idx) => (
                <th
                  key={`tbtitle-${idx}`}
                  style={{ textAlign: "center" }}
                  className={`${
                    idx === 1 ? "" : "border-r"
                  } text-[12px]  border-gray-300 px-2 py-2`}
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
                  className={`${
                    idx === 8
                      ? "border-t"
                      : idx === 0
                      ? "border-r border-gray-300"
                      : "border-r border-t border-gray-300  "
                  } px-2 py-2 text-[12px]`}
                  colSpan={item.colSpan}
                >
                  <div className="">
                    <p>{item.title}</p>
                  </div>
                </th>
              ))}
              <th className="border-t border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {Object.keys(item)
                  .filter((key) => visibleKeys.includes(key)) // Only display specified keys
                  .map((key, cellIndex) => (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className={`${
                        cellIndex == 8 ? "" : "border-r border-t"
                      } text-[12px]  border-gray-300 p-3`}
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
                          key === "totalTrainingHours" ||
                          key === "totalEmployees"
                        }
                        value={item[key]}
                        onChange={(newValue) =>
                          updateField(rowIndex, key, newValue)
                        }
                      />
                    </td>
                  ))}
                <td className=" p-3">
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
            Add category <MdAdd className="text-[14px] mt-1 text-[#007EEF]" />
          </button>
        </div>
      </div>
    </>
  );
};

const InputField = ({ type, required, value, onChange,readOnly }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    if (type === "number") {
      newValue = e.target.value.toString(); // Ensure newValue is a string
    }
    setInputValue(newValue);
    onChange(newValue); // Update with converted value
  };

  return (
    <input
      type={type === "number" ? "number" : "text"}
      required={required}
      value={inputValue}
      readOnly={readOnly}
      onChange={handleInputChange}
      style={{
        width: "100%",
        minWidth: "120px", // Increased minimum width for better mobile experience
       
      }}
      placeholder="Enter data"
      className="text-[12px] pl-2 py-2 text-center"
    />
  );
};

export default CustomTableWidget9;
