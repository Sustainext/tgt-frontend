import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
const MultiselectTableWidgetBioDiversity = ({
  id,
  options,
  value,
  required,
  onChange,
  schema,
  formContext,
  locationData
}) => {

  const [localValue, setLocalValue] = useState(value || []);
  const [othersInputs, setOthersInputs] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef([]);
  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      setLocalValue(value);
    }
  }, [value]);
  useEffect(() => {
    const initializeOthersInputs = () => {
      const newOthersInputs = localValue.map((row) => {
        const rowOthers = {};
        Object.keys(row || {}).forEach((key) => {
          if (
            Array.isArray(row[key]) &&
            (row[key].includes("Others (please specify)") ||
              row[`${key}_others`])
          ) {
            rowOthers[key] = true;
          } else if (
            row[key] === "Others (please specify)" ||
            row[`${key}_others`]
          ) {
            rowOthers[key] = true;
          }
        });
        return rowOthers;
      });
      setOthersInputs(newOthersInputs);
    };
    initializeOthersInputs();
  }, [localValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown !== null) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const handleCheckboxChange = (rowIndex, key, option) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    const currentValues = updatedValues[rowIndex][key] || [];

    if (currentValues.includes(option)) {
      updatedValues[rowIndex][key] = currentValues.filter(
        (item) => item !== option
      );
    } else {
      updatedValues[rowIndex][key] = [...currentValues, option];
    }

    const updatedOthersInputs = [...othersInputs];
    if (!updatedOthersInputs[rowIndex]) {
      updatedOthersInputs[rowIndex] = {};
    }
    updatedOthersInputs[rowIndex][key] = updatedValues[rowIndex][key]?.includes(
      "Others (please specify)"
    );
    setOthersInputs(updatedOthersInputs);

    setLocalValue(updatedValues);
  };

  const handleOtherInputChange = (rowIndex, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][`${key}_others`] = newValue;
    setLocalValue(updatedValues);
  };

  const handleSelectChange = (rowIndex, key, selectedValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][key] = selectedValue;

    options.titles.forEach((fieldConfig) => {
      if (fieldConfig.enableOn && fieldConfig.enableOn.field === key) {
        const { equals } = fieldConfig.enableOn;
        const targetField = fieldConfig.key;
  
        // If the condition is no longer satisfied, clear the dependent field
        if (selectedValue !== equals) {
          console.log("inside")
          updatedValues[rowIndex][targetField]='';
        } 
      }
    });
    const updatedOthersInputs = [...othersInputs];
    if (!updatedOthersInputs[rowIndex]) {
      updatedOthersInputs[rowIndex] = {};
    }
    updatedOthersInputs[rowIndex][key] =
      selectedValue === "Others (please specify)";
    setOthersInputs(updatedOthersInputs);

    setLocalValue(updatedValues);
  };

  const handleAddRow = () => {
    const newRow = {};
    Object.keys(schema.items.properties).forEach((key) => {
      // Initialize default values based on the schema type
      if (Array.isArray(schema.items.properties[key].enum)) {
        newRow[key] = []; // Multiselect default
      } else {
        newRow[key] = ""; // Input or select default
      }
    });
    setLocalValue([...localValue, newRow]);
    setOthersInputs([...othersInputs, {}]);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedValues = [...localValue];
    updatedValues.splice(rowIndex, 1);
    setLocalValue(updatedValues);

    const updatedOthersInputs = [...othersInputs];
    updatedOthersInputs.splice(rowIndex, 1);
    setOthersInputs(updatedOthersInputs);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 500), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  const handleInputChange = (rowIndex, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][key] = newValue; // Directly update the value for the input field
    setLocalValue(updatedValues);
  };
  return (
    <div
      style={{
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "80vw",
      }}
      className="mb-2 pb-2 table-scrollbar"
    >
      <table
        className="table-fixed border border-gray-300  w-full rounded-md"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ textAlign: "left" }}
                className={`${
                  idx === 0 ? "" : " border-l"
                } text-[12px] p-3 text-center border-gray-300 px-2 py-2 relative w-[45vw] xl:w-[25vw] lg:w-[25vw] md:w-[25vw] 2xl:w-[25vw] 4k:w-[25vw] 2k:w-[25vw]`}
              >
                <div className="flex items-center relative">
                  <p className="w-[80%]">{item.title}</p>
                  <MdInfoOutline
                    data-tooltip-id={`tooltip-${item.title.replace(
                      /\s+/g,
                      "-"
                    )}`}
                    data-tooltip-content={item.tooltip}
                    className="cursor-pointer ml-1 w-[20%]"
                    style={{display:item.display?item.display:'block'}}
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
            ))}
           

            <th className="text-[12px] p-3 text-center border-gray-300 px-2 py-2 w-[25vw] xl:w-[3vw] lg:w-[3vw] md:w-[3vw] 2xl:w-[3vw] 4k:w-[3vw] 2k:w-[3vw]"></th>
          </tr>
        </thead>
        <tbody>
          {localValue.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(schema.items.properties).map((key, cellIndex) => {
                const propertySchema = schema.items.properties[key];
                const uiSchemaField = options.titles.find(
                  (title) => title.key === key
                );
// Handle dynamic disable logic
                  let isDisabled = false;
                  if (uiSchemaField?.enableOn) {
                    const { field, equals } = uiSchemaField.enableOn;
                    const conditionValue = row[field];
                    isDisabled = conditionValue !== equals;
                  }
                const layoutType = uiSchemaField?.layouttype || "select";
                const inputType =uiSchemaField?.inputType || 'text'
                

                return (
                  <td
                    key={cellIndex}
                    className={`${
                      cellIndex === 0 ? "" : " border-l"
                    } border-t p-3 text-center border-gray-300`}
                  >
                    {layoutType === "multiselect" && propertySchema.enum ? (
                      <div className="relative ">
                        <div
                          className="border-b rounded-md w-full px-3 py-2 text-left text-[12px] cursor-pointer z-[999]"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === `${rowIndex}-${key}`
                                ? null
                                : `${rowIndex}-${key}`
                            )
                          }
                        >
                          {localValue[rowIndex][key]?.length > 0
                            ? localValue[rowIndex][key].join(", ")
                            : "Select options"}
                        </div>
                        {openDropdown === `${rowIndex}-${key}` && (
                          <div
                            ref={(el) =>
                              (dropdownRefs.current[`${rowIndex}-${key}`] = el)
                            }
                            className=" top-full left-0 bg-white border-b rounded-md shadow-lg z-[999] "
                          >
                            {propertySchema.enum.map((option) => (
                              <label
                                key={option}
                                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  value={option}
                                  checked={
                                    localValue[rowIndex][key]?.includes(
                                      option
                                    ) || false
                                  }
                                  onChange={() =>
                                    handleCheckboxChange(rowIndex, key, option)
                                  }
                                  className="mr-2"
                                />
                                <span className="text-[12px]">{option}</span>
                              </label>
                            ))}
                          </div>
                        )}
                        {othersInputs[rowIndex]?.[key] && (
                          <input
                            type="text"
                            required={required}
                            value={localValue[rowIndex][`${key}_others`] || ""}
                            onChange={(e) =>
                              handleOtherInputChange(
                                rowIndex,
                                key,
                                e.target.value
                              )
                            }
                            className="text-[12px] pl-2 py-2 w-full mt-2"
                            placeholder="Please specify"
                          />
                        )}
                      </div>
                    ) : layoutType === "select" && propertySchema.enum ? (
                      <>
                        <select
                          value={
                            typeof localValue[rowIndex][key] === "string" &&
                            localValue[rowIndex][key].startsWith("Others")
                              ? "Others (please specify)"
                              : localValue[rowIndex][key] || ""
                          }
                          onChange={(e) =>
                            handleSelectChange(rowIndex, key, e.target.value)
                          }
                          className="text-[12px] pl-2 py-2 w-full border-b "
                        >
                          <option value="">Select an option</option>
                          {propertySchema.enum.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {othersInputs[rowIndex]?.[key] && (
                          <input
                            type="text"
                            required={required}
                            value={localValue[rowIndex][`${key}_others`] || ""}
                            onChange={(e) =>
                              handleOtherInputChange(
                                rowIndex,
                                key,
                                e.target.value
                              )
                            }
                            className="text-[12px] pl-2 py-2 w-full mt-2"
                            placeholder="Please specify"
                          />
                        )}
                      </>
                    ) : layoutType === "input" ? (
                      <input
                        type={inputType}
                        required={required}
                        value={localValue[rowIndex][key] || ""}
                        onChange={
                          (e) =>{
                            const value = e.target.value;
                            if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
                              handleInputChange(rowIndex, key, value);
                            }
                          }
                        }
                        className="text-[12px] pl-2 py-2 w-full border-b rounded-md"
                        placeholder="Enter"
                      />
                    ) : layoutType === "locationSelect"?(
                      <select
                        value={row[key] || ""}
                        onChange={(e) => handleSelectChange(rowIndex, key, e.target.value)}
                        className="text-[12px] pl-2 py-2 w-full border-b"
                      >
                        <option value="">Select location</option>
                        {locationData && locationData.map((option) => (
                          <option key={option.location_id} value={option.location_name}>
                            {option.location_name}
                          </option>
                        ))}
                      </select>
                    ):layoutType=='textarea'?(
                      <textarea
                      type="text"
                      required={required}
                      disabled={isDisabled}
                      value={localValue[rowIndex][key] || ""}
                      onChange={
                        (e) =>
                          handleInputChange(rowIndex, key, e.target.value) // Use the new handler here
                      }
                      className={`text-[12px] pl-2 py-2 w-full border-b rounded-md ${
                        isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      placeholder="Enter description"
                    />
                    ):null}
                  </td>
                );
              })}
              <td className="border-t p-3 text-center border-gray-300">
                <button
                  type="button"
                  onClick={() => handleDeleteRow(rowIndex)}
                  title="Remove row"
                  className="text-center mx-auto"
                >
                  <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5 ml-3"
        onClick={handleAddRow}
      >
        Add Row <MdAdd className="text-lg" />
      </button>
    </div>
  );
};

export default MultiselectTableWidgetBioDiversity;