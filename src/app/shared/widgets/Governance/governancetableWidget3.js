import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const GovernancetableWidget3 = ({
  id,
  options,
  value,
  required,
  onChange,
  schema,
  formContext,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleFieldChange = (index, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[index]) {
      updatedValues[index] = {};
    }
    updatedValues[index][key] = newValue;

    setLocalValue(updatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  return (
    <div
      style={{ maxHeight: "400px" }}
      className="mb-2 custom-scrollbar overflow-auto"
    >
      <table
        id={id}
        className="rounded-md border border-gray-300 w-full"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <tbody>
          {options.rowLabels.map((label, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border-r border-t border-gray-300 p-3 text-left xl:w-2/5 lg:w-2/5 md:w-2/5  2xl:w-2/5  2k:w-2/5  4k:w-2/5  ">
                <div className="flex relative w-[260px] xl:w-full lg:w-full md:w-full 2k:w-full 4k:w-full 2xl:w-full ">
                  <span className="text-[12px]">{label.title}</span>
                  <>
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${label.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-content={label.tooltip}
                      className="ml-1 cursor-pointer w-[15%]"
                      style={{ display: label.display, fontSize: "14px" }}
                    />
                    <ReactTooltip
                      id={`tooltip-${label.title.replace(/\s+/g, "-")}`}
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
                </div>
              </td>
              {Object.keys(localValue[rowIndex] || {}).map((key, cellIndex) => {
                const propertySchema = schema.items.properties[key];
                const isEnum =
                  propertySchema && propertySchema.hasOwnProperty("enum");

                return (
                  <td
                    key={cellIndex}
                    className="border-t border-gray-300 p-3 text-center"
                  >
                    {isEnum ? (
                      <select
                        value={localValue[rowIndex][key]}
                        onChange={(e) =>
                          handleFieldChange(rowIndex, key, e.target.value)
                        }
                        className="text-sm pl-2 py-2 xl:w-full lg:w-full md:w-full 2k:w-full 4k:w-full 2xl:w-full w-[160px] border-b"
                        required={required}
                      >
                        <option value="">Select</option>
                        {propertySchema.enum.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        required={required}
                        value={localValue[rowIndex][key] || ""}
                        onChange={(e) =>
                          handleFieldChange(rowIndex, key, e.target.value)
                        }
                        className="text-sm pl-2 py-2 xl:w-full lg:w-full md:w-full 2k:w-full 4k:w-full 2xl:w-full w-[160px]"
                        placeholder="Enter data"
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GovernancetableWidget3;
