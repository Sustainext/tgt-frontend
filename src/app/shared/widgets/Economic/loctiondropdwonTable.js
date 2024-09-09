import React, { useEffect } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Row component to handle each row
const Row = ({ item, rowIndex, options, locationdata, updateField, onRemove }) => {
  return (
    <tr key={rowIndex}>
      {Object.keys(item).map((key, cellIndex) => (
        <td key={cellIndex} className="border border-gray-300 px-2">
          {/* Handle Location dropdown */}
          {options.titles[cellIndex].widgettype === "select"  ? (
            <select
              value={item[key]}
              onChange={(e) => updateField(rowIndex, key, e.target.value)}
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
              type={options.titles[cellIndex].type || "number"} // Default to text input if no type is defined
              value={item[key] || ""} // Ensure the value is either the item value or an empty string
              onChange={(e) => {
               
                updateField(rowIndex, key, e.target.value);
              }}
              style={{ width: "100%" }} // Set full width for the input
              placeholder="Enter data" // Placeholder text
              className="text-sm pl-2 py-2" // Styling
            />
          )}
        </td>
      ))}
      <td className="border border-gray-300 p-3">
        <button onClick={() => onRemove(rowIndex)}>
          <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
        </button>
      </td>
    </tr>
  );
};

const LoctiondropdwonTable = ({
  id,
  options,
  value = [],
  required,
  onChange,
  locationdata, 
}) => {
  // Ensure the first row is always displayed if value is empty
  useEffect(() => {
    if (value.length === 0) {
      const newRow = {};
      options.titles.forEach((title) => {
        newRow[title.title] = "";
      });
      onChange([newRow]);
    }
  }, [value, options.titles, onChange]);

  // Function to update a field in a row
  const updateField = (index, key, newValue) => {
    const newData = [...value]; // Make a shallow copy of the value array
    newData[index] = { ...newData[index], [key]: newValue }; // Update the specific key in the row
    onChange(newData); // Pass the updated array to onChange
  };

  // Function to add a new row
  const addRow = () => {
    const newRow = {};
    options.titles.forEach((title) => {
      newRow[title.title] = "";
    });
    onChange([...value, newRow]);
  };

  // Function to remove a row by index
  const onRemove = (indexToRemove) => {
    const newData = value.filter((_, index) => index !== indexToRemove);
    onChange(newData);
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
                        data-tooltip-id={`tooltip-${item.title.replace(
                          /\s+/g,
                          "-"
                        )}`}
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
            <th className="w-[5vw] border border-gray-300 "></th>
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
            />
          ))}
        </tbody>
      </table>
      <div className="mt-2">
        <button
          type="button"
          onClick={addRow}
          className="text-blue-500 flex items-center text-[15px]"
        >
      Add Location <div className="ml-2 mt-1"><MdAdd /></div>
        </button>
      </div>
    </div>
  );
};

export default LoctiondropdwonTable;
