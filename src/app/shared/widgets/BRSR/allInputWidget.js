import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { MdOutlineDeleteOutline, MdAdd, MdOutlineFileUpload, MdFilePresent, MdClose, MdDelete, MdInfoOutline } from "react-icons/md";
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
        alignItems: "left",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        className="green-checkbox"
        checked={isSelected}
        readOnly
        style={{ flexShrink: 0, marginRight: "8px" }}
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

  // Always show the first two values
  if (valueIndex < 2) {
    return (
      <components.MultiValueContainer {...props}>
        {children}
      </components.MultiValueContainer>
    );
  }

  // For "+X more" if values exceed 2
  if (value.length > 2 && valueIndex === 2) {
    return (
      <components.MultiValueContainer {...props}>
        <div
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: "0.375rem",
            padding: "2px 5px",
            color: "#1e40af",
            fontWeight: "600",
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

const AllInputWidget = ({ id, options, value, required, onChange, schema, formContext }) => {
  const [localValue, setLocalValue] = useState(value || []);
  const [othersInputs, setOthersInputs] = useState([]);

  const handleInputChange = (rowIndex, key, newValue) => {
    if (newValue.length > 21) return; // Enforce 21-character limit
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};
    updatedValues[rowIndex][key] = newValue;
    setLocalValue(updatedValues);
  };

  const handleAddRow = () => {
    const newRow = {};
    Object.keys(schema.items.properties).forEach((key) => {
      // Initialize default values
      if (Array.isArray(schema.items.properties[key].enum)) {
        newRow[key] = []; // Multiselect default
      } else {
        newRow[key] = ""; // Input or select default
      }
    });
    setLocalValue([...localValue, newRow]);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedValues = [...localValue];
    updatedValues.splice(rowIndex, 1);
    setLocalValue(updatedValues);
  };

   const updatedMultiSelectStyle = {
  control: (base) => ({
    ...base,
    border: "1px solid #d1d5db", // Optional: Add a border (Tailwind gray-300)
    padding: "4px 10px", // Equivalent to py-3
    minHeight: "38px", // Ensure height matches your other elements
    borderRadius: "0.375rem", // Add border radius (Tailwind's rounded-md style)
    boxShadow: "none", // Remove any additional shadow
    ":hover": {
      borderColor: "#0369a1", // Optional: Add hover effect for border color (blue-600 Tailwind equivalent)
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0", // Reset inner padding to fit the custom height
  }),
  menu: (provided) => ({
    ...provided,
    position: "relative",
    bottom: "100%",
    top: 0,
    zIndex: 1000,
    borderRadius: "0.375rem", // Add border radius to the dropdown menu as well
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.12)", // Optional: Add a subtle shadow
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "200px",
    borderRadius: "0.375rem", // Add border radius to the dropdown list items
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#dbeafe", // Light blue background (Tailwind's blue-100)
    borderRadius: "0.375rem", // Rounded corners (border radius)
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#1e40af", // Blue text (Tailwind's blue-800)
    fontWeight: "600",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#6A6E70",
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)", // Optional: Add a hover effect for remove button
      color: "black", // Change the 'x' icon color on hover
    },
  }),
};

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      setLocalValue(value);
    }
  }, [value]);

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {localValue.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-col w-full sm:flex-row sm:items-center sm:gap-4"
          >
            {Object.keys(schema.items.properties).map((key, cellIndex) => {
              const propertySchema = schema.items.properties[key];
              const uiSchemaField = options.titles.find(
                (title) => title.key === key
              );
              const layoutType = uiSchemaField?.layouttype || "input";

              return (
                <div key={cellIndex} className="flex flex-col flex-grow mb-4">
                  {/* Render Field Title */}
                  <label className="text-[14px] font-regular mb-3 flex">
                    {uiSchemaField?.title}
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${uiSchemaField?.title?.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-html={uiSchemaField?.tooltip}
                      style={{ display: uiSchemaField?.tooltipdispaly }}
                      className="cursor-pointer ml-2  float-end mt-1 w-10"
                    />
                  </label>
                  
                    <ReactTooltip
                      id={`tooltip-${uiSchemaField?.title?.replace(/\s+/g, "-")}`}
                      place="top"
                      effect="solid"
                      style={{
                        width: "auto",
                        height: "auto",

                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "11px",
                        borderRadius: "8px",
                        zIndex: 1000,
                      }}
                    />

                  {/* Render Input Field */}
                  {layoutType === "input" && (
                    <input
                      type="text"
                      required={required}
                      value={row[key] || ""}
                      onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
                      className="border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                      placeholder={`Enter Data`}
                    />
                  )}

                  {layoutType === "multiselect" && propertySchema.enum && (
                    <Select
                      isMulti
                      options={propertySchema.enum.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      value={(row[key] || []).map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      onChange={(selectedOptions) =>
                        handleInputChange(
                          rowIndex,
                          key,
                          selectedOptions.map((opt) => opt.value)
                        )
                      }
                       closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                      components={{
                        Option: CustomOptionnew,
                        MultiValueContainer: CustomMultiValueContainer,
                      }}
                       styles={updatedMultiSelectStyle}
                       className="block w-1/2 text-[12px]   focus:outline-none"
                    />
                  )}

                  {/* Numeric Field - Limit characters to 21 */}
                  {layoutType === "inputonlynumber" && (
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="21" // Ensure browser client validation
                      required={required}
                      value={row[key] || ""}
                      onChange={(e) => {
                        // Allow only numbers and enforce 21-character length
                        const input = e.target.value.replace(/[^0-9]/g, "");
                        if (input.length > 21) return;
                        handleInputChange(rowIndex, key, input);
                      }}
                      className="border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                      placeholder={`Enter ${uiSchemaField?.title}`}
                    />
                  )}

                  {/* Alphanumeric Field - Limit characters to 21 */}
                  {layoutType === "alphaNum" && (
                    <input
                      type="text"
                      inputMode="text"
                      pattern="[A-Za-z0-9]*"
                      maxLength="21" // Optional max length at an HTML level
                      required={required}
                      value={row[key] || ""}
                      onChange={(e) => {
                        // Enforce alphanumeric and 21-digit length
                        const input = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                        if (input.length > 21) return;
                        handleInputChange(rowIndex, key, input);
                      }}
                      className="border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                      placeholder={`Enter Data`}
                    />
                  )}

                  {/* Decimal Field - Limit characters to 21 */}
                  {layoutType === "inputDecimal" && (
                    <input
                      type="text"
                      inputMode="decimal"
                      pattern="^[0-9]*[.]?[0-9]*$"
                      maxLength="21" // Optional safety check at HTML level
                      required={required}
                      value={row[key] || ""}
                      onChange={(e) => {
                        // Allow only valid decimal (numbers & single dot) and enforce 21-digit length
                        const input = e.target.value
                          .replace(/[^0-9.]/g, "") // Remove invalid characters
                          .replace(/(\..*)\./g, "$1"); // Allow only one dot
                        if (input.length > 21) return;
                        handleInputChange(rowIndex, key, input);
                      }}
                      className="border rounded p-2 text-sm focus:outline-none"
                      placeholder={`Enter ${uiSchemaField?.title}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default AllInputWidget;