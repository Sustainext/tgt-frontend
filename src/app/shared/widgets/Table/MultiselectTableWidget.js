import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Select from "react-select";
import { components } from "react-select";

const CustomOptionnew = ({ children, ...props }) => {
  const { isSelected, isFocused, innerProps } = props;

  return (
    <div
      {...innerProps}
      style={{
        backgroundColor: isSelected ? "white" : isFocused ? "#f0f0f0" : "white",

        padding: "8px",

        display: "flex",

        alignItems: "center",

        textAlign: "left",
        cursor:'pointer'
      }}
    >
      <input
        type="checkbox"
        className="green-checkbox"
        checked={isSelected}
        readOnly
        style={{flexShrink:0,marginRight:'8px'}}
      />

      {children}
    </div>
  );
};

const CustomMultiValueContainer = ({ children, ...props }) => {
  const { data, selectProps } = props;
  const { value } = selectProps;

  // Find the index of this value in the selected values array
  const valueIndex = value.findIndex((val) => val.value === data.value);
  // console.log(valueIndex,"See")
  // Always show the first two values
  if (valueIndex < 2) {
    return (
      <components.MultiValueContainer {...props}>
        {children}
      </components.MultiValueContainer>
    );
  }

  // For the third position, show "+X more" if there are more than 2 values
  if (value.length > 2 && valueIndex == 2) {
    return (
      <components.MultiValueContainer {...props}>
        <div
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: "0.375rem",
            padding: "2px 5px",
            color: "#1e40af",
            fontWeight: "600",
            // fontSize: '0.875rem'
          }}
        >
          +{value.length - 2} more
        </div>
      </components.MultiValueContainer>
    );
  }

  // Hide any additional values
  return null;
};

const MultiselectTableWidget = ({
  id,
  options,
  value,
  required,
  onChange,
  schema,
  formContext,
}) => {
  const [localValue, setLocalValue] = useState(value || []);
  const [othersInputs, setOthersInputs] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  const updatedMultiSelectStyle = {
    control: (base) => ({
      ...base,
      border:'none',
      padding: '4px 10px', // Equivalent to py-3
      minHeight: '48px', // Ensure height matches your other elements
      // borderColor: '#d1d5db', // Matches Tailwind's gray-300 border
      // borderRadius: '0.375rem', // Matches Tailwind's rounded-md
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0', // Reset inner padding to fit the custom height
    }),
    menu: (provided) => ({
      ...provided,

      position: "relative",

      bottom: "100%",

      top: 0,

      zIndex: 1000,
    }),

    menuList: (provided) => ({ ...provided, maxHeight: "200px" }),
      multiValue: (base) => ({
        ...base,
        backgroundColor: '#dbeafe', // Light blue background (Tailwind's blue-100)
        borderRadius: '0.375rem', // Rounded corners
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: '#1e40af', // Blue text (Tailwind's blue-800)
        fontWeight: '600',
      }),
      multiValueRemove: (base) => ({
        ...base,
        color: '#6A6E70'
      }),
  };

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

  // const handleCheckboxChange = (rowIndex, key, option) => {
  //   const updatedValues = [...localValue];
  //   if (!updatedValues[rowIndex]) {
  //     updatedValues[rowIndex] = {};
  //   }
  //   const currentValues = updatedValues[rowIndex][key] || [];

  //   if (currentValues.includes(option)) {
  //     updatedValues[rowIndex][key] = currentValues.filter(
  //       (item) => item !== option
  //     );
  //   } else {
  //     updatedValues[rowIndex][key] = [...currentValues, option];
  //   }

  //   const updatedOthersInputs = [...othersInputs];
  //   if (!updatedOthersInputs[rowIndex]) {
  //     updatedOthersInputs[rowIndex] = {};
  //   }
  //   updatedOthersInputs[rowIndex][key] = updatedValues[rowIndex][key]?.includes(
  //     "Others (please specify)"
  //   );
  //   setOthersInputs(updatedOthersInputs);

  //   setLocalValue(updatedValues);
  // };

  const handleCheckboxChange = (rowIndex, key, values) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
  
    updatedValues[rowIndex][key] = values;
  
    const updatedOthersInputs = [...othersInputs];
    if (!updatedOthersInputs[rowIndex]) {
      updatedOthersInputs[rowIndex] = {};
    }
  
    updatedOthersInputs[rowIndex][key] = values?.includes("Others (please specify)");
  
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

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

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
            <th className="text-[12px] p-3 text-center border-gray-300 px-2 py-2 w-[25vw] xl:w-[3vw] lg:w-[3vw] md:w-[10vw] 2xl:w-[3vw] 4k:w-[3vw] 2k:w-[3vw]"></th>
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

                return (
                  <td
                    key={cellIndex}
                    className={`${
                      cellIndex === 0 ? "" : " border-l"
                    } border-t p-3 text-center border-gray-300`}
                  >
                    {layoutType === "multiselect" && propertySchema.enum ? (
                      <div className="relative ">
                           <Select
                isMulti
                options={propertySchema?.enum?.map(
                  (option) => ({
                    value: option,
                    label: option,
                  })
                )}
                // Ensure `item.intensityratio` is an array before calling `.map()`
                value={(localValue[rowIndex][key] || []).map((option) => ({
                  value: option,
                  label: option,
                }))}
                onChange={(selectedOptions) =>
                  handleCheckboxChange(
                    rowIndex,
                    key,
                    selectedOptions.map((opt) => opt.value)
                  )
                }
                styles={updatedMultiSelectStyle}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option: CustomOptionnew,
                  MultiValueContainer:CustomMultiValueContainer
                }}
                className="block xl:w-[22vw] md:w-[22vw] lg:w-[22vw] 2xl:w-[22vw] 2k:w-[22vw]  4k:w-[10vw] text-[12px] border-b border-gray-300 focus:outline-none"
              />
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
                        type="text"
                        required={required}
                        value={localValue[rowIndex][key] || ""}
                        onChange={
                          (e) =>
                            handleInputChange(rowIndex, key, e.target.value) // Use the new handler here
                        }
                        className="text-[12px] pl-2 py-2 w-full border-b rounded-md"
                        placeholder="Enter"
                      />
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