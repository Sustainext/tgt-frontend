"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { debounce } from "lodash";

const CustomTableWidget7 = ({
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
    newData[index][key] = newValue;

    if (["male", "female", "nonBinary"].includes(key)) {
      const totalGender = ["male", "female", "nonBinary"].reduce(
        (sum, field) => sum + (Number(newData[index][field]) || 0),
        0
      );
      newData[index]["totalGender"] = totalGender;
    }

    if (["lessThan30", "between30and50", "moreThan50"].includes(key)) {
      const totalAge = ["lessThan30", "between30and50", "moreThan50"].reduce(
        (sum, field) => sum + (Number(newData[index][field]) || 0),
        0
      );
      newData[index]["totalAge"] = totalAge;
    }

    debouncedChangeHandler(newData);
  };

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
    };
    onChange([...value, newRow]);
  };

  useEffect(() => {
    console.log("CustomTableWidget value:", value);
  }, [value]);

  return (
    <div style={{ overflowY: "auto", maxHeight: "400px" }}>
      <table id={id} className="rounded-md border border-gray-300 w-full">
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={`header-${idx}`}
                className={`text-[12px] px-2 py-2 ${
                  idx === 0 ? "text-left" : "text-center border border-gray-300"
                }`}
                colSpan={item.colSpan}
              >
                <div className="">
                  <p className={`${idx === 0 ? "text-left" : "text-center"}`}>
                    {item.title}
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
              {Object.keys(item).map((key, cellIndex) => {
                const inputType =
                  options.subTitles.find(
                    (sub) =>
                      sub.title2.trim().toLowerCase() ===
                      key.trim().toLowerCase()
                  )?.type || "text";

                console.log(`Key: ${key}, InputType: ${inputType}`); // Debugging output

                return (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className="border border-gray-300 p-3"
                  >
                    <InputField
                      type={inputType}
                      required={required}
                      value={item[key]}
                      readOnly={key === "totalGender" || key === "totalAge"}
                      onChange={(newValue) =>
                        updateField(rowIndex, key, newValue)
                      }
                    />
                  </td>
                );
              })}
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
  );
};

const InputField = ({ type, required, value, onChange,readOnly }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value); // Make sure to update the local state when the value prop changes
  }, [value]);

  const handleInputChange = (e) => {
    let newValue = e.target.value;
    if (type === 'number') {
      newValue = newValue ? parseInt(newValue, 10) : ""; // Parse integers; fallback to empty string if NaN
    }
    setInputValue(newValue); // Update local state
    onChange(newValue); // Propagate changes up
  };

  return (
    <input
      type={type === 'number' ? 'number' : 'text'}
      required={required}
      readOnly={readOnly}
      value={inputValue}
      onChange={handleInputChange}
      style={{ width: "100%" }}
      placeholder="Enter data"
      className="text-sm pl-2 py-2 text-center"
    />
  );
};


export default CustomTableWidget7;
