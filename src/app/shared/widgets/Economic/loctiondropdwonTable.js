import React, { useState, useEffect, useRef } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { debounce } from "lodash";
const Row = ({ item, rowIndex, options, locationdata, updateField, onRemove, selectedLocations }) => {
  const [localValues, setLocalValues] = useState(item); 
  const [error, setError] = useState(""); 
  const inputRefs = useRef({}); 

  useEffect(() => {
    setLocalValues(item); 
  }, [item]);

  const updateFieldDebounced = useRef(debounce(updateField, 6000)).current;

  const handleChange = (key, value) => {
    // Prevent duplicate location selection
    const locationKey = Object.keys(localValues).find((k) =>
      options?.titles?.some((title) => title.widgettype === "select" && title.title === k)
    );

    if (key === locationKey && selectedLocations.includes(value)) {
      setError("This location is already selected. Please choose another location.");
      return;
    }

    setError("");
    // Update UI immediately
    setLocalValues((prev) => ({ ...prev, [key]: value }));

    // Efficiently update parent state with debounce
    updateFieldDebounced(rowIndex, key, value);
  };

  const handleKeyDown = (event) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <>
      <tr key={rowIndex}>
        {Object.keys(localValues).map((key, cellIndex) => (
          <td key={cellIndex} 
          className={` ${cellIndex == 0 ? "border-t" :"border-l border-t" } border-gray-300 px-2`}>
       
            {options?.titles?.[cellIndex]?.widgettype === "select" ? (
              <select
                value={localValues[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="text-[12px] pl-2 py-2 w-full"
              >
                <option value="">Select location</option>
                {locationdata?.length > 0 &&
                  locationdata.map((loc) => (
                    <option key={loc.location_name} value={loc.location_name}>
                      {loc.location_name}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                ref={(el) => (inputRefs.current[cellIndex] = el)} 
                type="number" 
                value={localValues[key] || ""} 
                onChange={(e) => handleChange(key, e.target.value)}
                onKeyDown={handleKeyDown} 
                style={{ width: "100%" }} 
                placeholder="Enter data" 
                className="text-[12px] pl-2 py-2" 
                min="0" 
              />
            )}
          </td>
        ))}
        {locationdata.length > 1 && (
          <td className="border border-gray-300 p-3 flex justify-center">
            <button onClick={() => onRemove(rowIndex)}>
              <MdOutlineDeleteOutline className="text-[20px] text-red-600" />
            </button>
          </td>
        )}
      </tr>
      {error && (
        <tr>
          <td colSpan={Object.keys(localValues).length + 1}>
            <p className="text-red-600 text-sm text-left mt-1">{error}</p> 
          </td>
        </tr>
      )}
    </>
  );
};

const LocationDropdownTable = ({ id, options, value = [], required, onChange, locationdata }) => {
  useEffect(() => {
    if (value.length === 0 && options?.titles) {
      const newRow = {};
      options.titles.forEach((title) => {
        newRow[title.title] = "";
      });
      onChange([newRow]);
    }
  }, [value, options?.titles, onChange]);

  const selectedLocations = value
    .map((item) => {
      const locationKey = Object.keys(item).find(
        (key) => options?.titles?.some((title) => title.widgettype === "select" && title.title === key)
      );
      return item[locationKey];
    })
    .filter(Boolean); 

  const updateField = (index, key, newValue) => {
    const newData = value.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: newValue };
      }
      return item;
    });
    onChange(newData); 
  };

  const addRow = () => {
    if (options?.titles) {
      const newRow = {};
      options.titles.forEach((title) => {
        newRow[title.title] = "";
      });
      onChange([...value, newRow]);
    }
  };


  const onRemove = (indexToRemove) => {
    const newData = value.filter((_, index) => index !== indexToRemove);
    onChange(newData);
  };

  if (!options?.titles) {
    return <p>Loading...</p>; 
  }

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
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ width: "17vw", textAlign: "left" }}
                className={` ${idx === 0 ? "" :"border-l" } text-[12px] px-2 py-2 text-center border-gray-300 `}
              
              >
                <div className="flex items-center relative justify-center">
                  <p>{item.title}</p>
                  {item.tooltipdisplay === "block" && (
                    <p>
                      <MdInfoOutline
                        data-tooltip-id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                        data-tooltip-content={item.tooltip}
                        className="ml-2 cursor-pointer"
                      />
                      <ReactTooltip
                        id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
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
            {locationdata.length > 1 && (
              <th className="w-[5vw] border border-gray-300 "></th>
            )}
          </tr>
        </thead>
        <tbody>
          {value.map((item, rowIndex) => (
            <Row
              key={rowIndex}
              rowIndex={rowIndex}
              item={item}
              options={options}
              locationdata={locationdata}
              updateField={updateField}
              onRemove={onRemove}
              selectedLocations={selectedLocations}
            />
          ))}
        </tbody>
      </table>
      {locationdata.length > 1 && (
        <div className="mt-2">
          <button
            type="button"
            onClick={addRow}
            className="text-blue-500 flex items-center text-[12px] ml-2"
          >
            Add Location <div className="ml-2 mt-1"><MdAdd /></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationDropdownTable;
