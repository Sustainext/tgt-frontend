import React, { useState, useEffect } from "react";
import { MdInfoOutline, MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaSave } from "react-icons/fa";

const SectorstableWidget = ({ value = [], onChange, uiSchema = {} }) => {
  const tabledata = uiSchema["ui:options"]?.tabledata || [];
  const [allRows, setAllRows] = useState([]);

  useEffect(() => {
    // Combine initial tabledata with editing state
    const combinedRows = tabledata.map((row, index) => ({
      id: Date.now() + index, // unique ID
      Sector: row.Sector,
      Sub_industry: row.Sub_industry,
      isEditing: false,
    }));
    setAllRows(combinedRows);
  }, [tabledata]);

  const updateFinalValue = (rows) => {
    const cleaned = rows.map(({ id, isEditing, ...rest }) => rest);
    onChange(cleaned);
  };

  const handleRowChange = (id, field, newValue) => {
    const updatedRows = allRows.map((row) =>
      row.id === id ? { ...row, [field]: newValue } : row
    );
    setAllRows(updatedRows);
    updateFinalValue(updatedRows);
  };

  const toggleEdit = (id) => {
    const updatedRows = allRows.map((row) =>
      row.id === id ? { ...row, isEditing: !row.isEditing } : row
    );
    setAllRows(updatedRows);
  };

  const removeRow = (id) => {
    const updatedRows = allRows.filter((row) => row.id !== id);
    setAllRows(updatedRows);
    updateFinalValue(updatedRows);
  };

  const addInputBox = () => {
    const newRow = {
      id: Date.now(),
      Sector: "",
      Sub_industry: "",
      isEditing: true,
    };
    const updatedRows = [...allRows, newRow];
    setAllRows(updatedRows);
  };

  return (
    <div className="mb-6">
      {/* Tooltip & Title */}
      <div className="flex mb-2">
        <div className="relative">
          <p className="text-[12px] text-gray-700 font-[500] flex">
            {uiSchema["ui:title"]}
            <MdInfoOutline
              data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
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

      {/* Editable Table */}
      <div className="bg-white rounded-md w-full mb-4">
        <table className="w-full text-left">
          <thead className="gradient-background">
            <tr className="text-center">
              <th className="py-2 px-4 font-[500] text-[12px]">Sector</th>
              <th className="py-2 px-4 font-[500] text-[12px]">Sub Industry</th>
              <th className="py-2 px-4 font-[500] text-[12px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRows.length > 0 ? (
              allRows.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 text-center">
                  {row.isEditing ? (
                    <>
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          value={row.Sector}
                          onChange={(e) =>
                            handleRowChange(row.id, "Sector", e.target.value)
                          }
                          placeholder="Enter Sector"
                          className="w-full border-b border-gray-300 p-2 focus:outline-none text-[12px]"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          value={row.Sub_industry}
                          onChange={(e) =>
                            handleRowChange(row.id, "Sub_industry", e.target.value)
                          }
                          placeholder="Enter Sub Industry"
                          className="w-full border-b border-gray-300 p-2 focus:outline-none text-[12px]"
                        />
                      </td>
                      <td className="py-2 px-4 flex justify-center items-center gap-2">
                        <button
                          type="button"
                          className="text-blue-500"
                          onClick={() => toggleEdit(row.id)}
                        >
                          <FaSave size={16} />
                        </button>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => removeRow(row.id)}
                        >
                          <MdOutlineDeleteOutline size={18} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 text-[12px]">{row.Sector}</td>
                      <td className="py-2 px-4 text-[12px]">
                        {row.Sub_industry || "-"}
                      </td>
                      <td className="py-2 px-4 flex justify-center items-center gap-2">
                        <button
                          type="button"
                          className="text-gray-500"
                          onClick={() => toggleEdit(row.id)}
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => removeRow(row.id)}
                        >
                          <MdOutlineDeleteOutline size={18} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-center text-[12px]">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Row */}
      <button
        type="button"
        className="text-blue-500 mt-4 flex items-center text-[12px]"
        onClick={addInputBox}
      >
        Add another sector <span className="ml-2 text-[14px]">+</span>
      </button>
    </div>
  );
};

export default SectorstableWidget;
