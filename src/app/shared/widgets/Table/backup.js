import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const MultiselectTableWidget = ({
  id,
  options,
  value,
  required,
  onChange,
  schema,
  formContext,
}) => {
  const [localErrors, setLocalErrors] = useState(
    formContext.validationErrors || []
  );
  const [localValue, setLocalValue] = useState(value || []);
  const [othersInputs, setOthersInputs] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    setLocalErrors(formContext.validationErrors || []);
  }, [formContext.validationErrors]);

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

  const validateField = (rowIndex, key, value) => {
    let error = null;

    // Validate required fields
    if (required && (!value || value.length === 0)) {
      error = "This field is required.";
    }

    // Validate "Others (please specify)" input
    if (Array.isArray(value) && value.includes("Others (please specify)")) {
      const othersValue = localValue[rowIndex]?.[`${key}_others`];
      if (!othersValue || othersValue.trim() === "") {
        error = null; // Clear main field error
        const updatedErrors = [...localErrors];
        if (!updatedErrors[rowIndex]) {
          updatedErrors[rowIndex] = {};
        }
        updatedErrors[rowIndex][`${key}_others`] =
          "This field is required.";
        setLocalErrors(updatedErrors);
        return; // Stop further validation
      } else {
        const updatedErrors = [...localErrors];
        if (!updatedErrors[rowIndex]) {
          updatedErrors[rowIndex] = {};
        }
        delete updatedErrors[rowIndex][`${key}_others`]; // Clear "Others" error if valid
        setLocalErrors(updatedErrors);
      }
    }

    const updatedErrors = [...localErrors];
    if (!updatedErrors[rowIndex]) {
      updatedErrors[rowIndex] = {};
    }
    updatedErrors[rowIndex][key] = error;
    setLocalErrors(updatedErrors);
  };

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

    validateField(rowIndex, key, updatedValues[rowIndex][key]);
    setLocalValue(updatedValues);
  };

  const handleOtherInputChange = (rowIndex, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][`${key}_others`] = newValue;

    // Validate "Others" input
    validateField(rowIndex, key, updatedValues[rowIndex][key]);
    setLocalValue(updatedValues);
  };

  const handleSelectChange = (rowIndex, key, selectedValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][key] = selectedValue;

    const updatedOthersInputs = [...othersInputs];
    if (!updatedOthersInputs[rowIndex]) {
      updatedOthersInputs[rowIndex] = {};
    }
    updatedOthersInputs[rowIndex][key] =
      selectedValue === "Others (please specify)";
    setOthersInputs(updatedOthersInputs);

    validateField(rowIndex, key, selectedValue);
    setLocalValue(updatedValues);
  };

  const handleInputChange = (rowIndex, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][key] = newValue;
    validateField(rowIndex, key, newValue);
    setLocalValue(updatedValues);
  };

  const handleAddRow = () => {
    const newRow = {};
    Object.keys(schema.items.properties).forEach((key) => {
      if (Array.isArray(schema.items.properties[key].enum)) {
        newRow[key] = [];
      } else {
        newRow[key] = "";
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

    const updatedErrors = [...localErrors];
    updatedErrors.splice(rowIndex, 1);
    setLocalErrors(updatedErrors);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

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
        className="table-fixed border border-gray-300 w-full rounded-md"
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
                } text-[12px] p-3 text-center border-gray-300 px-2 py-2 relative w-[25vw]`}
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
            <th className="text-[12px] p-3 text-center border-gray-300 px-2 py-2 w-[3vw]"></th>
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
                const layoutType = uiSchemaField?.layouttype || "select";
                const error =
                  localErrors[rowIndex]?.[key] ||
                  localErrors[rowIndex]?.[`${key}_others`];
                return (
                  <td
                    key={cellIndex}
                    className={`${
                      cellIndex === 0 ? "" : " border-l"
                    } border-t p-3 text-center border-gray-300`}
                  >
                    {layoutType === "multiselect" && propertySchema.enum ? (
                      <div className="relative">
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
                            className="top-full left-0 bg-white border-b rounded-md shadow-lg z-[999]"
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
                               {error && (
                          <div className="text-red-500 text-[12px] mt-1 text-left">
                            {error}
                          </div>
                        )}
                          </div>
                        )}
                        {othersInputs[rowIndex]?.[key] && (
                          <div>
                            <input
                              type="text"
                              required={required}
                              value={
                                localValue[rowIndex][`${key}_others`] || ""
                              }
                              onChange={(e) =>
                                handleOtherInputChange(
                                  rowIndex,
                                  key,
                                  e.target.value
                                )
                              }
                              className={`text-[12px] pl-2 py-2 w-full mt-2 ${
                                localErrors[rowIndex]?.[`${key}_others`]
                                  ? "border-red-500"
                                  : ""
                              }`}
                              placeholder="Please specify"
                            />
                            {/* {localErrors[rowIndex]?.[`${key}_others`] && (
                              <div className="text-red-500 text-[12px] mt-1 text-left">
                                {localErrors[rowIndex][`${key}_others`]}
                              </div>
                            )} */}
                               {error && (
                          <div className="text-red-500 text-[12px] mt-1 text-left">
                            {error}
                          </div>
                        )}
                          </div>
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
                          className="text-[12px] pl-2 py-2 w-full border-b"
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
                            value={
                              localValue[rowIndex][`${key}_others`] || ""
                            }
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
                        {error && (
                          <div className="text-red-500 text-[12px] mt-1 text-left">
                            {error}
                          </div>
                        )}
                      </>
                    ) : layoutType === "input" ? (
                      <>
                        <input
                          type="text"
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={(e) =>
                            handleInputChange(rowIndex, key, e.target.value)
                          }
                          className="text-[12px] pl-2 py-2 w-full border rounded-md"
                          placeholder="Enter"
                        />
                        {error && (
                          <div className="text-red-500 text-[12px] mt-1 text-left">
                            {error}
                          </div>
                        )}
                      </>
                    ) : null}
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

export default MultiselectTableWidget;
