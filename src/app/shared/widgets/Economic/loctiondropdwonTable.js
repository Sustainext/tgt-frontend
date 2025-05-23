import React, { useEffect, useState, useCallback } from "react";
import { MdOutlineDeleteOutline, MdAdd, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { debounce } from "lodash";

const LocationDropdownTable = ({
  id,
  options,
  value = [],
  required,
  onChange,
  schema,
  formContext,
  locationdata,
}) => {
  const [localValue, setLocalValue] = useState(value || []);
  const [error, setError] = useState("");

  useEffect(() => {
    if (Array.isArray(value)) {
      setLocalValue(value);
    }
  }, [value]);

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  useEffect(() => {
    if ((!value || value.length === 0) && options?.titles?.length) {
      const initialRow = {};
      options.titles.forEach((title) => {
        initialRow[title.title] = "";
      });
      setLocalValue([initialRow]);
      debouncedUpdate([initialRow]); // immediately sync with RJSF
    }
  }, [value, options?.titles, debouncedUpdate]);

  const selectedLocations = localValue
    .map((row) => {
      const locationField = options?.titles.find((t) => t.widgettype === "select")?.title;
      return row[locationField];
    })
    .filter(Boolean);

  const handleInputChange = (rowIndex, key, newValue) => {
    setError("");
    const updated = [...localValue];
    if (!updated[rowIndex]) updated[rowIndex] = {};
    updated[rowIndex][key] = newValue;
    setLocalValue(updated);
  };

  const handleSelectChange = (rowIndex, key, selectedValue) => {
    const locationKey = options?.titles.find((t) => t.widgettype === "select")?.title;

    // Prevent duplicate locations
    if (key === locationKey && selectedLocations.includes(selectedValue)) {
      setError("This location is already selected. Please choose another location.");
      return;
    }

    setError("");
    const updated = [...localValue];
    if (!updated[rowIndex]) updated[rowIndex] = {};
    updated[rowIndex][key] = selectedValue;
    setLocalValue(updated);
  };

  const handleAddRow = () => {
    const newRow = {};
    options.titles.forEach((title) => {
      newRow[title.title] = "";
    });
    setLocalValue([...localValue, newRow]);
  };

  const handleDeleteRow = (rowIndex) => {
    const updated = localValue.filter((_, idx) => idx !== rowIndex);
    setLocalValue(updated);
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
        className="table-fixed border border-gray-300 w-full rounded-md"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                className={`text-[12px] p-3 text-center border-gray-300 ${
                  idx !== 0 ? "border-l" : ""
                }`}
              >
                <div className="flex items-center justify-center">
                  <p>{item.title}</p>
                  {item.tooltipdisplay === "block" && (
                    <>
                      <MdInfoOutline
                        data-tooltip-id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                        data-tooltip-content={item.tooltip}
                        className="ml-1 cursor-pointer"
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
                    </>
                  )}
                </div>
              </th>
            ))}
            <th className="text-[12px] p-3 text-center border-gray-300 w-[5vw] border-l" />
          </tr>
        </thead>
        <tbody>
          {localValue.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {options.titles.map((field, cellIndex) => {
                const isSelect = field.widgettype === "select";
                return (
                  <td
                    key={cellIndex}
                    className={`border-t p-3 text-center border-gray-300 ${
                      cellIndex !== 0 ? "border-l" : ""
                    }`}
                  >
                    {isSelect ? (
                      <select
                        value={row[field.title] || ""}
                        onChange={(e) =>
                          handleSelectChange(rowIndex, field.title, e.target.value)
                        }
                        className="text-[12px] pl-2 py-2 w-full border-b"
                      >
                        <option value="">Select location</option>
                        {locationdata.map((loc) => (
                          <option key={loc.location_id} value={loc.location_name}>
                            {loc.location_name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={row[field.title] || ""}
                        onChange={(e) =>
                          handleInputChange(rowIndex, field.title, e.target.value)
                        }
                        className="text-[12px] pl-2 py-2 w-full border-b"
                        placeholder="Enter value"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    )}
                  </td>
                );
              })}
              <td className="border-t p-3 text-center border-gray-300">
                <button onClick={() => handleDeleteRow(rowIndex)} title="Remove row">
                  <MdOutlineDeleteOutline className="text-[20px] text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && (
        <p className="text-red-600 text-sm text-left mt-1 ml-1">{error}</p>
      )}

      <button
        type="button"
        className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5 ml-3"
        onClick={handleAddRow}
      >
        Add Location <MdAdd className="text-lg" />
      </button>
    </div>
  );
};

export default LocationDropdownTable;
