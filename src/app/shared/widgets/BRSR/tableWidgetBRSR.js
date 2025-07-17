
'use client'
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const CustomTableWidget5 = ({
  id,
  options,
  value,
  required,
  formContext,
  onChange,
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

    // Compute total whenever any value changes
    updatedValues[index].total = computeRowTotal(index, updatedValues);

    setLocalValue(updatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  const computeRowTotal = (rowIndex, values) => {
    const rowValues = values[rowIndex];
    return options.titles.reduce((acc, column) => {
      const value =
        rowValues && rowValues[column.key]
          ? parseInt(rowValues[column.key], 10)
          : 0;
      return acc + value;
    }, 0);
  };


  return (
     <div style={{position:'relative'}}>
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
      <table id={id} className="table-fixed   w-full rounded-md"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead className="gradient-background h-[60px]">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                                key={idx}
                                style={{ textAlign: "left" }}
                                className={`${
                                  item.key === "AssignTo" || item.key === "FileUpload"
                                    ? "text-[13px]  text-neutral-950 font-[400] border-none text-center  px-2 py-2 relative w-[45vw] xl:w-[10vw] lg:w-[10vw] md:w-[10vw] 2xl:w-[10vw] 4k:w-[10vw] 2k:w-[10vw]"
                                    : "text-[13px]  text-neutral-950 font-[400] border-none text-center  px-2 py-2 relative w-[45vw] xl:w-[28vw] lg:w-[25vw] md:w-[25vw] 2xl:w-[25vw] 4k:w-[25vw] 2k:w-[25vw] "
                                } `}
                              >
                                <div className="flex">
                                  <p className="pl-1">{item.title}</p>
                                  <MdInfoOutline
                                    data-tooltip-id={`tooltip-${item.title.replace(
                                      /\s+/g,
                                      "-"
                                    )}`}
                                    data-tooltip-html={item.tooltip}
                                    style={{ display: item.tooltipdispaly }}
                                    className="cursor-pointer ml-2  float-end mt-1 w-10"
                                  />
                                  
                                </div>
                              </th>
            ))}
          </tr>
        </thead>
      <tbody>
  {options.rowLabels.map((rowLabel, rowIndex) => (
    <tr key={rowIndex}>
      {options.titles.map((column, columnIndex) => (
        <td key={columnIndex} className="border-b border-gray-300 text-left p-2 text-[12px]">
          {columnIndex === 0 ? (
            // First column: always show row label
           <div className="relative">
             <p className="flex gap-1">
                { rowLabel.title}
                <MdInfoOutline
                                    data-tooltip-id={`tooltip-${rowLabel.title.replace(
                                      /\s+/g,
                                      "-"
                                    )}`}
                                    data-tooltip-html={rowLabel.tooltip}
                                    style={{ display: rowLabel.tooltipdispaly }}
                                    className="cursor-pointer ml-2  float-end mt-1 w-10"
                                  />
                                  <ReactTooltip
                                    id={`tooltip-${rowLabel.title.replace(
                                      /\s+/g,
                                      "-"
                                    )}`}
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
            </p>
           </div>
           
          ) : column.layout === "readonly" ? (
            // Readonly field (skip first column)
             <input
             readOnly={true}
              value={localValue[rowIndex]?.[column.key] || ""}
              className="text-[12px] pl-2 py-2 w-full text-left"
              placeholder="Auto Calculated"
            />
          ) : (
            // Input field
            <div>
              {
                column.layout === "inputDecimal" && (
                   <input
    type="text"
    inputMode="decimal"
    pattern="^[0-9]*[.]?[0-9]*$"
    required={required}
   value={localValue[rowIndex]?.[column.key] || ""}
    onChange={(e) => {
      const input = e.target.value;

      // Allow only numbers and one decimal point
      const cleaned = input
        .replace(/[^0-9.]/g, "")              // Remove non-numeric/non-dot
        .replace(/(\..*)\./g, "$1");          // Allow only one dot

      handleFieldChange(rowIndex, column.key, cleaned);
    }}
    className="text-[12px] pl-2 py-2 w-full text-left"
              placeholder="Enter data"
  />
                )
              }

              {column.layout ==='inputNumber' && (
                <input
              type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required={required}
              value={localValue[rowIndex]?.[column.key] || ""}
              onChange={e => handleFieldChange(rowIndex, column.key, e.target.value.replace(/[^0-9]/g, ""))}
              className="text-[12px] pl-2 py-2 w-full text-left"
              placeholder="Enter data"
            />
              )}
              
           
            
             </div>
          )}
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
    </div>
    {
      options.titles.map((item)=>(
        <ReactTooltip
                                    id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                                    place="top"
                                    effect="solid"
                                    style={{
                                      width: "500px",
                                      height: "auto",
              
                                      backgroundColor: "#000",
                                      color: "white",
                                      fontSize: "11px",
                                     
                                      borderRadius: "8px",
                                      zIndex: 1000,
                                    }}
                                  />
      ))
    }
    </div>
  );
};

export default CustomTableWidget5;
