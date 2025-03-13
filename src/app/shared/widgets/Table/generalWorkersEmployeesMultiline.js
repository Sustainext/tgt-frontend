import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";

const GeneralWorkersEmployees = ({
  id,
  options,
  value,
  required,
  onChange,
  schema,
  formContext = {},
}) => {
  const [localValue, setLocalValue] = useState(value || []);
  const [othersInputs, setOthersInputs] = useState([]);
  const [localErrors, setLocalErrors] = useState(formContext.validationErrors || []);
  const [isValueEmpty, setIsValueEmpty] = useState(localValue.length === 0);

  useEffect(() => {
    setLocalErrors(formContext.validationErrors || []);
  }, [formContext.validationErrors]);

  useEffect(() => {
    const initializeOthersInputs = () => {
      const newOthersInputs = localValue.map((row) => {
        let rowOthers = {};
        Object.keys(row).forEach((key) => {
          if (row[key] === "Others (please specify)" || row[key + "_others"]) {
            rowOthers[key] = true;
          }
        });
        return rowOthers;
      });
      setOthersInputs(newOthersInputs);
    };
    initializeOthersInputs();
    setIsValueEmpty(localValue.length === 0);
  }, [localValue]);

  const handleFieldChange = (index, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[index]) {
      updatedValues[index] = {};
    }
    updatedValues[index][key] = newValue;

    if (newValue === "Others (please specify)") {
      const updatedOthersInputs = [...othersInputs];
      if (!updatedOthersInputs[index]) {
        updatedOthersInputs[index] = {};
      }
      updatedOthersInputs[index][key] = true;
      setOthersInputs(updatedOthersInputs);
    } else {
      const updatedOthersInputs = [...othersInputs];
      if (updatedOthersInputs[index]) {
        updatedOthersInputs[index][key] = false;
      }
      setOthersInputs(updatedOthersInputs);
    }

    // Clear error for this specific field
    const updatedErrors = [...localErrors];
    if (updatedErrors[index]) {
      delete updatedErrors[index][key];
      if (Object.keys(updatedErrors[index]).length === 0) {
        updatedErrors.splice(index, 1); // Remove the entire row if no errors are left
      }
    }

    setLocalErrors(updatedErrors);
    setLocalValue(updatedValues);

    // Hide the error if there is at least one valid row
    const hasValidRow = updatedValues.some((row) =>
      Object.values(row).some((val) => val.trim() !== "")
    );
    setIsValueEmpty(!hasValidRow);
  };

  const handleAddRow = () => {
    const newRow = {};
    Object.keys(schema.items.properties).forEach((key) => {
      newRow[key] = ""; // Set default value for each property
    });
    setLocalValue([...localValue, newRow]);
    setOthersInputs([...othersInputs, {}]); // Add an empty object for the new row in othersInputs
    setIsValueEmpty(false); // New row added, no longer empty
  };

  const handleDeleteRow = (index) => {
    const updatedValues = [...localValue];
    updatedValues.splice(index, 1); // Remove the row at the specified index
    setLocalValue(updatedValues);

    const updatedOthersInputs = [...othersInputs];
    updatedOthersInputs.splice(index, 1); // Remove the corresponding entry in othersInputs
    setOthersInputs(updatedOthersInputs);

    // Check if the table is now empty
    setIsValueEmpty(updatedValues.length === 0);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  return (
    <div style={{ maxHeight: "400px" }} className="mb-2 overflow-y-scroll">
      {isValueEmpty && (
        <div className="text-red-500 text-[12px] mb-2">
          Please add at least one row with valid data.
        </div>
      )}
      <table
        id={id}
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ minWidth: "120px", textAlign: "left" }}
                className={` ${
                  idx === 0 ? "" : " border-l"
                } text-[12px] p-3 text-center border-gray-300 px-2 py-2 relative`}
              >
                <div className="flex items-center ">
                  <p>{item.title}</p>
                  <p>
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-html={item.tooltip}
                      style={{ display: `${item.display}` }}
                      className="ml-2 cursor-pointer"
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
            <th className="text-[12px] p-3 text-center border-gray-300 px-2 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {localValue.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(schema.items.properties).map((key, cellIndex) => {
                const propertySchema = schema.items.properties[key];
                const isEnum =
                  propertySchema && propertySchema.hasOwnProperty("enum");
                const error = localErrors[rowIndex]?.[key];
                return (
                  <td
                    key={cellIndex}
                    className={` ${
                      cellIndex === 0 ? "" : " border-l"
                    } border-t p-3 text-center border-gray-300`}
                  >
                    {isEnum ? (
                      <>
                        <select
                          value={localValue[rowIndex][key]}
                          onChange={(e) =>
                            handleFieldChange(rowIndex, key, e.target.value)
                          }
                          className={`text-[12px] pl-2 py-2 w-full ${
                            error ? "border-red-500 " : "border-gray-300"
                          } border-b`}
                          required={required}
                        >
                          <option value="">Select</option>
                          {propertySchema.enum.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {othersInputs[rowIndex] &&
                          othersInputs[rowIndex][key] && (
                            <input
                              type="text"
                              required={required}
                              value={
                                localValue[rowIndex][`${key}_others`] || ""
                              }
                              onChange={(e) =>
                                handleFieldChange(
                                  rowIndex,
                                  `${key}_others`,
                                  e.target.value
                                )
                              }
                              className="text-[12px] pl-2 py-2 w-full mt-2"
                              placeholder="Please specify"
                            />
                          )}
                      </>
                    ) : (
                      <textarea
                        type={propertySchema.texttype}
                        required={required}
                        value={localValue[rowIndex][key] || ""}
                        onChange={(e) =>
                          handleFieldChange(rowIndex, key, e.target.value)
                        }
                        className={`text-[12px] pl-2 py-2 w-full ${
                          error ? "border-red-500 " : "border-gray-300"
                        } border-b`}
                        placeholder="Enter"
                      />
                    )}
                    {error && (
                      <div className="text-red-500 text-[12px] mt-1 text-left">
                        {error}
                      </div>
                    )}
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
        className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
        onClick={handleAddRow}
      >
        Add Row <MdAdd className="text-lg" />
      </button>
    </div>
  );
};

export default GeneralWorkersEmployees;
