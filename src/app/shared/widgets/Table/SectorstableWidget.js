import React, { useState, useEffect } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const SectorstableWidget = ({ value = [], onChange, uiSchema = {} }) => {
  const [sectorInputs, setSectorInputs] = useState([]);
  const tabledata = uiSchema["ui:options"]?.tabledata || [];

  useEffect(() => {
    console.log("Table data:", tabledata); // Check if tabledata is received correctly
    // Initialize sectorInputs only with new input boxes, not the existing table data
    setSectorInputs([]);
  }, [tabledata]);

  const handleSectorChange = (id, newValue) => {
    const updatedInputs = sectorInputs.map((input) =>
      input.id === id ? { ...input, sector: newValue } : input
    );
    setSectorInputs(updatedInputs);

    // Update the value array with the correct structure
    const updatedValue = [
      ...tabledata, // Keep existing table data
      ...updatedInputs.map((input) => ({
        Sector: input.sector,
        Sub_industry: "", // Always pass an empty string for Sub_industry
      })),
    ];
    onChange(updatedValue);
  };

  const addInputBox = () => {
    setSectorInputs([...sectorInputs, { id: Date.now(), sector: "" }]);
  };

  const removeInputBox = (id) => {
    const updatedInputs = sectorInputs.filter((input) => input.id !== id);
    setSectorInputs(updatedInputs);

    // Update the value array after removing an input box
    const updatedValue = [
      ...tabledata, // Keep existing table data
      ...updatedInputs.map((input) => ({
        Sector: input.sector,
        Sub_industry: "",
      })),
    ];
    onChange(updatedValue);
  };

  return (
    <div className="mb-6">
      <div className="flex mb-2">
        <div className="relative">
          <p className="text-sm text-gray-700 flex">
            {uiSchema["ui:title"]}
            <MdInfoOutline
              data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(
                /\s+/g,
                "-"
              )}`}
              data-tooltip-html={uiSchema["ui:tooltip"]}
              className="mt-1 ml-2 w-[30px] text-[14px]"
              style={{ display: uiSchema["ui:tooltipdisplay"] }}
            />
            <ReactTooltip
              id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
              place="top"
              effect="solid"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
              }}
            />
          </p>
        </div>
      </div>

      {/* Displaying the table */}
      <div className="bg-white rounded-md w-full mb-4">
        <table className="w-full text-left">
          <thead className="gradient-background">
            <tr className="text-center">
              <th className="py-2 px-4 font-medium">Sector</th>
              <th className="py-2 px-4 font-medium">Sub Industry</th>
            </tr>
          </thead>
          <tbody>
            {tabledata && tabledata.length > 0 ? (
              tabledata
                .filter((row) => row.Sector && row.Sector !== "Default") // Filter out rows with null or "Default" Sector
                .map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 text-center"
                  >
                    <td className="py-2 px-4">{row.Sector}</td>
                    <td className="py-2 px-4">{row.Sub_industry || "N/A"}</td>{" "}
                    {/* Show empty string if Sub_industry is null */}
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={2} className="py-2 px-4 text-center">
                  No data available
                </td>
              </tr>
            )}
            {sectorInputs.map((input) => (
              <tr
                key={input.id}
                className="border-b border-gray-200 text-center"
              >
                <td colSpan={2} className="py-2 px-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={input.sector}
                      onChange={(e) =>
                        handleSectorChange(input.id, e.target.value)
                      }
                      placeholder="Enter Sector/Industry"
                      className="w-full border-b border-gray-300 p-2 focus:outline-none"
                    />
                    <button
                      type="button"
                      className="text-red-500 ml-2"
                      onClick={() => removeInputBox(input.id)}
                    >
                      <MdOutlineDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to add more input boxes */}
      <button
        type="button"
        className="text-blue-500 mt-4 flex items-center"
        onClick={addInputBox}
      >
        Add another sector <span className="ml-2 text-xl">+</span>
      </button>
    </div>
  );
};

export default SectorstableWidget;
