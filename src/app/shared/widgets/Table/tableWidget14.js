"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { MdOutlineDeleteOutline, MdAdd, MdInfoOutline } from "react-icons/md";
import { debounce } from "lodash";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CustomTableWidget14 = ({
  id,
  options,
  value,
  required,
  onChange,
  formContext,
}) => {
  // Debounced change handler, now depends on onChange
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Initialize the debounced function outside the component or in useEffect
  const debouncedChangeHandler = useCallback(
    debounce((newData) => {
      onChangeRef.current(newData);
    }, 200),
    [] // Dependencies array is empty to ensure it doesn't get recreated unnecessarily
  );

  const updateField = (index, key, newValue) => {
    const newData = [...value];
  
    // Ensure that numeric inputs are stored as strings
    newData[index][key] = String(newValue); 
  
    if (["male", "female", "nonBinary"].includes(key)) {
      const totalGender = ["male", "female", "nonBinary"].reduce(
        (sum, field) => sum + (Number(newData[index][field]) || 0),
        0
      );
      // Store totalGender as a string
      newData[index]["totalGender"] = String(totalGender);
    }
  
    if (["lessThan30", "between30and50", "moreThan50"].includes(key)) {
      const totalAge = ["lessThan30", "between30and50", "moreThan50"].reduce(
        (sum, field) => sum + (Number(newData[index][field]) || 0),
        0
      );
      // Store totalAge as a string
      newData[index]["totalAge"] = String(totalAge);
    }
  
    debouncedChangeHandler(newData);
  };
  

  // Function to handle adding a new row
  const handleAddRow = () => {
    const newRow = {
      category: "",
      male: "",
      female: "",
      nonBinary: "",
      totalGender: "",
      lessThan30: "",
      between30and50: "",
      moreThan50: "",
      totalAge: "",
      minorityGroup: "",
      vulnerableCommunities: "",
      isNew: true, // <-- Add this line
    };
    onChange([...value, newRow]);
  };

  // Function to handle row removal
  const handleRemoveRow = (index) => {
    const newData = [...value];
    newData.splice(index, 1); // Remove the row at the given index
    onChange(newData); // Update the table data
  };

  useEffect(() => {
    console.log("CustomTableWidget value:", value);
  }, [value]);

  return (
    <div style={{ overflowY: "auto", maxHeight: "400px" }}>
      <table
        id={id}
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={`header-${idx}`}
                className={`text-[12px] px-2 py-2 ${
                  idx === 0
                    ? "text-left border-r border-gray-300"
                    : "text-center border-r border-gray-300"
                }`}
                colSpan={item.colSpan}
              >
                <div className="relative">
                  <p
                    className={`${
                      idx === 0 || idx === 3 ? "text-left flex" : "text-center"
                    }`}
                  >
                    {item.title}
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-content={item.tooltip}
                      style={{ display: `${item.tooltipdispaly}` }}
                      className=" cursor-pointer mt-1 ml-1 text-[14px]"
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
                  </p>
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
                className="text-[12px] border-t border-r border-gray-300  px-2 py-2"
                colSpan={item.colSpan}
              >
                <div className="relative">
                  <p className="flex justify-center">
                    {item.title}{" "}
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-content={item.tooltip}
                      style={{ display: `${item.tooltipdispaly}` }}
                      className=" cursor-pointer mt-1 ml-1 text-[13px]"
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
                  </p>
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
        .filter((key) => key !== "isNew") // Exclude isNew from rendering
        .map((key, cellIndex) => {
          const inputType =
            options.subTitles.find(
              (sub) => sub.title2.trim().toLowerCase() === key.trim().toLowerCase()
            )?.type || "text";

          return (
            <td
              key={`cell-${rowIndex}-${cellIndex}`}
              className="border-r border-t border-gray-300 p-3"
            >
              <InputField
                type={inputType}
                required={required}
                value={item[key]}
                fieldName={key}
                isNew={item.isNew} // Pass the isNew flag here
                readOnly={key === "totalGender" || key === "totalAge"}
                onChange={(newValue) => updateField(rowIndex, key, newValue)}
              />
            </td>
          );
        })}
      <td className="p-3">
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

const InputField = ({ type, required, value, onChange, readOnly, fieldName, isNew }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    let newValue = e.target.value;

    if (type === "number") {
      newValue = newValue ? parseInt(newValue, 10) : "";
    } else {
      newValue = String(newValue);
    }

    setInputValue(newValue);
    onChange(newValue);
  };

  // Only make category read-only if it's not new and has a value
  const isReadOnly = fieldName === "category" && !isNew && value !== "";

  return (
    <input
      type={type === "number" ? "number" : "text"}
      required={required}
      readOnly={readOnly || isReadOnly}
      value={inputValue}
      onChange={handleInputChange}
      style={{ width: "100%" }}
      placeholder="Enter data"
      className="text-sm pl-2 py-2 text-center"
    />
  );
};





export default CustomTableWidget14;
