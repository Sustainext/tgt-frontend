import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const generateShortKey = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-").slice(0, 10); // Adjust length as needed
};

const LocationDropdownTableGrid = ({
  id,
  options,
  value = [],
  required,
  onChange,
  locationdata,
  formContext,
}) => {
  const [localValue, setLocalValue] = useState({});
  const [shortKeyMap, setShortKeyMap] = useState({});

  // Initialize localValue and shortKeyMap
  useEffect(() => {
    const initializeValue = () => {
      const newData = {};
      const newShortKeyMap = {};
      options.titles.forEach((title) => {
        const shortKey = generateShortKey(title.title);
        newShortKeyMap[title.tittlekey] = shortKey;
      });

      locationdata.forEach((quarterData) => {
        Object.values(quarterData).forEach((locations) => {
          locations.forEach((location) => {
            const name = location["Location Name"];
            if (!newData[name]) {
              newData[name] = [];
            }
            // Add a default row if no rows exist for this location
            if (newData[name].length === 0) {
              const newRow = {};
              options.titles.forEach((title) => {
                newRow[title.tittlekey] = "";
              });
              newData[name].push(newRow);
            }
          });
        });
      });
      setLocalValue(newData);
      setShortKeyMap(newShortKeyMap);
      onChange(newData);
    };

    if (Object.keys(value).length === 0) {
      initializeValue();
    } else {
      setLocalValue(value);
      const newShortKeyMap = {};
      options.titles.forEach((title) => {
        newShortKeyMap[title.tittlekey] = generateShortKey(title.title);
      });
      setShortKeyMap(newShortKeyMap);
    }
  }, [value, locationdata, options.titles, onChange]);

  // Debounced onChange function
  const debouncedOnChange = useCallback(
    debounce((newData) => {
      onChange(newData);
    }, 500),
    [onChange]
  );

  // Update a field in the localValue state
  const updateField = (locationName, index, key, newValue) => {
    const newData = { ...localValue };
    if (!newData[locationName]) {
      newData[locationName] = [];
    }
    newData[locationName][index] = {
      ...newData[locationName][index],
      [key]: newValue,
    };
    setLocalValue(newData);
    debouncedOnChange(newData);
  };

  // Add a new row
  const addRow = (locationName) => {
    const newData = { ...localValue };
    const newRow = {};
    options.titles.forEach((title) => {
      newRow[title.tittlekey] = "";
    });
    if (!newData[locationName]) {
      newData[locationName] = [newRow];
    } else {
      newData[locationName].push(newRow);
    }
    setLocalValue(newData);
    debouncedOnChange(newData); // Trigger debounced update
  };
  const handleKeyDown = (event) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };
 
  const onRemove = (locationName, indexToRemove) => {
    const newData = { ...localValue };
    if (newData[locationName]) {
      newData[locationName] = newData[locationName].filter(
        (_, index) => index !== indexToRemove
      );
      if (newData[locationName].length === 0) {
        const newRow = {};
        options.titles.forEach((title) => {
          newRow[title.tittlekey] = "";
        });
        newData[locationName].push(newRow);
      }
      setLocalValue(newData);
      debouncedOnChange(newData); // Trigger debounced update
    }
  };

  // Create a map of locations for faster lookup
  const locationMap = locationdata.reduce((map, quarterData) => {
    Object.values(quarterData).forEach((locations) => {
      locations.forEach((location) => {
        const name = location["Location Name"];
        if (!map[name]) {
          map[name] = [];
        }
        map[name].push(location);
      });
    });
    return map;
  }, {});

  return (
    <div
      style={{
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "80vw",
      }}
      className="mb-2 pb-2"
    >
      <table id={id} className="table-fixed border-collapse w-full rounded-md border border-gray-300" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="gradient-background">
          <tr className="h-[102px]">
            <th
              style={{ width: "17vw", textAlign: "left" }}
              className="text-[12px]  px-2 py-2 text-center"
            >
              <div className="flex items-center relative justify-center">
                <p>Location Name</p>
                <p>
                  <MdInfoOutline
                    data-tooltip-id="223"
                    data-tooltip-content={formContext.locationtooltip}
                    className="ml-2 cursor-pointer"
                  />
                  <ReactTooltip
                    id="223"
                    place="top"
                    effect="solid"
                    style={{
                      width:"400px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      boxShadow: 3,
                      borderRadius: "8px",
                      zIndex:"1000",
                    }}
                  />
                </p>
              </div>
            </th>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ width: "17vw", textAlign: "left" }}
                className="text-[12px] border-l border-gray-300 px-2 py-2 text-center"
              >
                <div className="flex items-center relative justify-center">
                  <p>{item.title}</p>
                  {item.tooltipdisplay === "block" && (
                    <p>
                      <MdInfoOutline
                        data-tooltip-id={`tooltip-${shortKeyMap[item.tittlekey]}`}
                        data-tooltip-content={item.tooltip}
                        className="ml-2 cursor-pointer"
                      />
                      <ReactTooltip
                        id={`tooltip-${shortKeyMap[item.tittlekey]}`}
                        place="top"
                        effect="solid"
                        style={{
                          width:"400px",
                          backgroundColor: "#000",
                          color: "white",
                          fontSize: "12px",
                          boxShadow: 3,
                          borderRadius: "8px",
                          zIndex:"1000",
                        }}
                      />
                    </p>
                  )}
                </div>
              </th>
            ))}
            <th className="w-[5vw]"></th>
          </tr>
        </thead>
        <tbody className="">
          {Object.entries(locationMap).map(([locationName]) => {
            const rows = localValue[locationName] || [];
            const isEmpty = rows.length === 0;

            return (
              <React.Fragment key={locationName}>
                {isEmpty ? (
                  <tr key={0}>
                    <td className="p-2 border-t  border-gray-300 text-center text-[12px]">
                      {locationName}
                    </td>
                    {options.titles.map((title, colIndex) => (
                      <td key={colIndex} className="p-1 ">
                        <input
                          type={title.widgettype === "number" ? "number" : "text"}
                          className="w-full p-2 rounded text-[12px]"
                          placeholder="Enter Value"
                          value=""
                          onChange={(e) =>
                            updateField(locationName, 0, title.tittlekey, e.target.value)
                          }
                          onKeyDown={handleKeyDown} 
                        />
                      </td>
                    ))}
                    <td className="p-4 border-r  border-b border-gray-300 flex justify-center">
                      <button
                        type="button"
                        onClick={() => onRemove(locationName, 0)}
                        className="text-[20px] text-red-600"
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ) : (
                  rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {rowIndex === 0 && (
                        <td
                          rowSpan={rows.length}
                          className="p-2  border-t  border-gray-300 text-center text-[12px]"
                        >
                          {locationName}
                        </td>
                      )}
                      {options.titles.map((title, colIndex) => (
                        <td key={colIndex} className="p-1 border-l border-y border-gray-300">
                          <input
                            type={title.widgettype === "number" ? "number" : "text"}
                            className="w-full p-2 rounded text-[12px]"
                            placeholder="Enter Value"
                            value={row[title.tittlekey] || ""}
                            onChange={(e) =>
                              updateField(locationName, rowIndex, title.tittlekey, e.target.value)
                            }
                            onKeyDown={handleKeyDown} 
                          />
                        </td>
                      ))}
                      <td className="p-4   border-y border-gray-300 flex justify-center">
                        <button
                          type="button"
                          onClick={() => onRemove(locationName, rowIndex)}
                          className="text-[20px] text-red-600"
                        >
                          <MdOutlineDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  ))
                )}

                {/* Add new row button */}
                <tr>
                  <td
                    rowSpan={1}
                    className="p-2  text-center"
                  ></td>
                  <td
                    colSpan={3}
                    className="p-2 border-l border-gray-300  text-center"
                  >
                    <button
                      type="button"
                      onClick={() => addRow(locationName)}
                      className="text-blue-500 flex items-center text-[12px]"
                    >
                      Add Category
                      <MdAdd />
                    </button>
                  </td>
                  <td className="p-4   text-center"></td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LocationDropdownTableGrid;
