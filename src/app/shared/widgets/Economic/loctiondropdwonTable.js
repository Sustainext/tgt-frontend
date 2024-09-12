import React, { useState, useEffect, useRef } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { debounce } from "lodash";

// Row component to handle each row
const Row = ({ item, rowIndex, options, locationdata, updateField, onRemove, selectedLocations }) => {
  const [localValues, setLocalValues] = useState(item); // Local state to store input values
  const [error, setError] = useState(""); // State to store error message
  const inputRefs = useRef({}); // Store references to input elements

  useEffect(() => {
    setLocalValues(item); // Sync the local state with the passed item prop
  }, [item]);

  // Debounce function for updating the state after a small delay
  const debouncedUpdate = debounce((key, value) => {
    updateField(rowIndex, key, value);
  }, 400);

  const handleChange = (key, value) => {
    // Check if the selected location already exists in other rows
    const locationKey = Object.keys(localValues).find(
      (k) => options?.titles?.some((title) => title.widgettype === "select" && title.title === k)
    );

    if (key === locationKey && selectedLocations.includes(value)) {
      setError("This location is already selected. Please choose another location.");
      return; // Do not update the local state if the location is a duplicate
    }

    setError(""); // Clear any previous errors
    setLocalValues((prevValues) => ({ ...prevValues, [key]: value })); // Update local input values immediately

    // Use debounce for updating the parent state to avoid focus loss
    debouncedUpdate(key, value);
  };

  return (
    <>
      <tr key={rowIndex}>
        {Object.keys(localValues).map((key, cellIndex) => (
          <td key={cellIndex} className="border border-gray-300 px-2">
            {/* Handle Location dropdown */}
            {options?.titles?.[cellIndex]?.widgettype === "select" ? (
              <select
                value={localValues[key]}
                onChange={(e) => handleChange(key, e.target.value)} // Trigger validation and update onChange
                className="text-sm pl-2 py-2 w-full"
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
                ref={(el) => (inputRefs.current[cellIndex] = el)} // Store input reference
                type="number" // Default to number input if no type is defined
                value={localValues[key] || ""} // Ensure the value is either the item value or an empty string
                onChange={(e) => handleChange(key, e.target.value)} // Trigger update when input loses focus
                style={{ width: "100%" }} // Set full width for the input
                placeholder="Enter data" // Placeholder text
                className="text-sm pl-2 py-2" // Styling
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
            <p className="text-red-600 text-sm text-left mt-1">{error}</p> {/* Error message display */}
          </td>
        </tr>
      )}
    </>
  );
};

const LocationDropdownTable = ({ id, options, value = [], required, onChange, locationdata }) => {
  // Ensure the first row is always displayed if value is empty
  useEffect(() => {
    if (value.length === 0 && options?.titles) {
      const newRow = {};
      options.titles.forEach((title) => {
        newRow[title.title] = "";
      });
      onChange([newRow]);
    }
  }, [value, options?.titles, onChange]);

  // Get all selected locations to avoid duplicates
  const selectedLocations = value
    .map((item) => {
      const locationKey = Object.keys(item).find(
        (key) => options?.titles?.some((title) => title.widgettype === "select" && title.title === key)
      );
      return item[locationKey];
    })
    .filter(Boolean); // Filter out any falsy values

  // Function to update a field in a row
  const updateField = (index, key, newValue) => {
    const newData = value.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: newValue };
      }
      return item;
    });
    onChange(newData); // Notify parent of changes
  };

  // Function to add a new row
  const addRow = () => {
    if (options?.titles) {
      const newRow = {};
      options.titles.forEach((title) => {
        newRow[title.title] = "";
      });
      onChange([...value, newRow]);
    }
  };

  // Function to remove a row by index
  const onRemove = (indexToRemove) => {
    const newData = value.filter((_, index) => index !== indexToRemove);
    onChange(newData);
  };

  if (!options?.titles) {
    return <p>Loading...</p>; // Return a loading message if options or titles are not yet available
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
      <table id={id} className="table-fixed border-collapse w-full">
        <thead className="gradient-background">
          <tr className="h-[102px]">
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                style={{ width: "17vw", textAlign: "left" }}
                className="text-[12px] border border-gray-300 px-2 py-2 text-center"
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
                        className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
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
              selectedLocations={selectedLocations} // Pass selected locations to Row
            />
          ))}
        </tbody>
      </table>
      {locationdata.length > 1 && (
        <div className="mt-2">
          <button
            type="button"
            onClick={addRow}
            className="text-blue-500 flex items-center text-[15px]"
          >
            Add Location <div className="ml-2 mt-1"><MdAdd /></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationDropdownTable;
