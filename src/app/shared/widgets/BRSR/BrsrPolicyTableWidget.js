import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const BrsrPolicyTableWidget = ({ options, value, onChange,formContext }) => {
  const [localValue, setLocalValue] = useState(value || []);
  const { titles, rowLabels, sectionTitles = [] } = options;
  useEffect(() => setLocalValue(value || []), [value]);

  // Section 2 (reason rows) - disable all columns unless main policy row[0][PX] is "No"
 const isCellDisabled = (rowIndex, columnKey) => {
  const tableName = formContext?.tableName;

  // 1. Policy & Reason Table: Section 2 (rows 8+) are disabled unless first row's value for the column is "No"
  if(tableName === "policyAndReasonTable") {
    if (rowIndex >= 8) {
      return localValue[0]?.[columnKey] !== "No";
    }
    return false;
  }

  // 2. Details & Review Table: 
  // row1 <-> row3, row2 <-> row4 enable when linked row is Yes
  if(tableName === "DeatailsAndReviewTable") {
    if (rowIndex === 2) { // 3rd row (row3)
      return localValue[0]?.[columnKey] !== "Yes";
    }
    if (rowIndex === 3) { // 4th row (row4)
      return localValue[1]?.[columnKey] !== "Yes";
    }
    return false;
  }

  // 3. Independent Assessment Table: row2 enabled only if row1 is Yes
  if(tableName === "independentAssessmentTable") {
    if(rowIndex === 1) { // row2
      return localValue[0]?.[columnKey] !== "Yes";
    }
    return false;
  }

  // Default: nothing disabled
  return false;
};

  // Whenever reasons become disabled, clear any values in them
  useEffect(() => {
  let changed = false;
  const updated = [...localValue];
  const tableName = formContext?.tableName;

  if (tableName === "policyAndReasonTable") {
    // Your Existing Logic for this table
    for (let col = 1; col <= 9; ++col) {
      const key = `P${col}`;
      if (localValue[0]?.[key] !== "No") {
        for (let row = 8; row <= 12; ++row) {
          if (updated[row]?.[key] && updated[row][key] !== "") {
            updated[row][key] = "";
            changed = true;
          }
        }
      }
    }
  }

  if (tableName === "DeatailsAndReviewTable") {
    // For row3: Clear if row1 !== 'Yes'
    if (localValue[0]) {
      for (let col = 0; col < options.titles.length; ++col) {
        const key = options.titles[col].key;
        if (localValue[0]?.[key] !== "Yes" && updated[2]?.[key]) {
          updated[2][key] = "";
          changed = true;
        }
      }
    }
    // For row4: Clear if row2 !== 'Yes'
    if (localValue[1]) {
      for (let col = 0; col < options.titles.length; ++col) {
        const key = options.titles[col].key;
        if (localValue[1]?.[key] !== "Yes" && updated[3]?.[key]) {
          updated[3][key] = "";
          changed = true;
        }
      }
    }
  }

  if (tableName === "independentAssessmentTable") {
    // For row2: Clear if row1 !== 'Yes'
    for (let col = 0; col < options.titles.length; ++col) {
      const key = options.titles[col].key;
      if (localValue[0]?.[key] !== "Yes" && updated[1]?.[key]) {
        updated[1][key] = "";
        changed = true;
      }
    }
  }

  if (changed) {
    setLocalValue(updated);
    onChange(updated);
  }
// eslint-disable-next-line
}, [
  localValue[0]?.P1,
  localValue[0]?.P2,
  localValue[0]?.P3,
  localValue[0]?.P4,
  localValue[0]?.P5,
  localValue[0]?.P6,
  localValue[0]?.P7,
  localValue[0]?.P8,
  localValue[0]?.P9,
]);
  const handleFieldChange = (rowIndex, columnKey, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};
    updatedValues[rowIndex][columnKey] = newValue;
    setLocalValue(updatedValues);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);
  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  // Render each section only once
  let lastSection = -1;

  return (
    <div>
      {rowLabels.map((row, rowIndex) => {
        let sectionHeadingRow = null;
        if (
          row.section !== undefined &&
          row.section !== lastSection &&
          sectionTitles[row.section]
        ) {
          sectionHeadingRow = (
            <React.Fragment key={`section-head-${row.section}`}>
             
              {/* Section Title, no icon */}
             <div className="flex justify-between">
               <div
                className={"mx-2 text-[15px] text-neutral-950 font-[500] mt-5 mb-4"}
              >
                {sectionTitles[row.section]}
              </div>
              {row.section==0 && formContext?.tableName !=='DeatailsAndReviewTable' && (
                <div className="float-end mt-4">
                <div className="text-[#18736B] bg-slate-200 justify-center items-center gap-2 inline-flex w-[70px] h-[26px] p-2  rounded-lg  text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  BRSR-B
                </div>
              </div>
              )} 
             </div>
              <div className="overflow-x-auto p-2 mb-2  table-scrollbar">
                <table className="min-w-[900px] w-full border-separate border-spacing-0">
                  <thead className="gradient-background">
                    <tr className="">
                      {/* FIRST COLUMN: wider */}
                      <th className="text-[12px] font-medium text-[#20282C] text-center px-2 py-3 rounded-tl-lg min-w-[260px] max-w-[320px] w-[270px] "></th>
                      {titles.map((item, idx) => {
                        // Test if for every row in this SECTION, any row has `theadtoltipshow: "none"`
                        // You only want to show the header tooltip if ALL the filtered rows do NOT have theadtooltipshow: "none"
                        const hasTheadTooltipNone = rowLabels
                          .filter((r) => r.section === row.section)
                          .some((r) => r.theadtoltipshow === "none");

                        return (
                          <th
                            key={idx}
                            className="text-[12px] font-medium text-[#20282C] px-2 py-3 min-w-[110px] max-w-[180px] w-[150px] "
                          >
                            <div className="flex items-center justify-center gap-[2px] relative">
                              <span>{item.title}</span>
                              {/* Only show icon if tooltip AND NO theadtoltipshow flag ("none") in this section */}
                              {item.tooltip && !hasTheadTooltipNone && (
                                <>
                                  <MdInfoOutline
                                    data-tooltip-id={`tooltip-header-${row.section}-${item.key}`}
                                    data-tooltip-content={item.tooltip}
                                    className="ml-1 "
                                    size={12}
                                  />
                                  <ReactTooltip
                                    id={`tooltip-header-${row.section}-${item.key}`}
                                    place="top"
                                    effect="solid"
                                    className="z-[99999]"
                                    style={{
                                      width: "260px",
                                      backgroundColor: "#222",
                                      color: "#fff",
                                      fontSize: "11px",
                                      borderRadius: "7px",
                                      textAlign: "left",
                                      zIndex: 99999,
                                    }}
                                  />
                                </>
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {rowLabels
                      .filter((r) => r.section === row.section)
                      .map((r, rrIdx) => {
                        const realRowIdx = rowLabels.findIndex(
                          (x) => x.key === r.key
                        );
                        return (
                          <tr key={r.key} className="border-b border-[#e5e9ed]">
                            {/* First column: show icon only if tooltip+not disabled */}
                            <td className="text-[12px] font-[500] text-[#23292C] text-left align-middle  px-2 py-3 min-w-[250px] max-w-[350px] w-[270px] rounded-l-lg ">
                              <div className="flex items-start gap-1">
                                <span>{r.title}</span>
                                {r.tooltip && r.tooltipshow !== "none" && (
                                  <MdInfoOutline
                                    title={r.tooltip}
                                    size={13}
                                    className="text-gray-400 mt-0.5"
                                  />
                                )}
                              </div>
                            </td>
                            {titles.map((col, colIdx) => {
                              const layoutType = r.layout || "input";
                              const cellValue =
                                localValue[realRowIdx]?.[col.key] || "";
                              return (
                                <td
                                  key={colIdx}
                                  className="p-2 text-[12px] w-[250px] text-center"
                                >
                                  {layoutType === "inputDropdown" && (
                                    <div className="relative w-[250px]">
                                      <select
                                        className="text-[12px] font-normal border-b border-gray-200 focus:border-[#62b0a6] text-gray-800 focus:outline-none transition-all w-full  bg-transparent pr-6 py-1 px-1 mx-2 disabled:bg-[#F5F5F5] disabled:text-gray-400 "
                                        value={cellValue}
                                        onChange={(e) =>
                                          handleFieldChange(
                                            realRowIdx,
                                            col.key,
                                            e.target.value
                                          )
                                        }
                                        disabled={isCellDisabled(
                                          realRowIdx,
                                          col.key
                                        )}
                                      >
                                        <option value="">Select</option>
                                        {r.options?.map((opt) => (
                                          <option key={opt} value={opt}>
                                            {opt}
                                          </option>
                                        ))}
                                      </select>
                                      {/* Custom chevron SVG */}
                                     
                                    </div>
                                  )}
                                  {layoutType === "input" && (
                                    <input
                                      type="text"
                                      value={cellValue}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          realRowIdx,
                                          col.key,
                                          e.target.value
                                        )
                                      }
                                      placeholder="Enter data"
                                      className="text-[12px] border-0 border-b border-gray-200 bg-transparent py-1 px-1 mx-2 w-full  focus:outline-none focus:border-[#62b0a6] disabled:bg-[#F5F5F5] disabled:text-gray-400"
                                      disabled={isCellDisabled(
                                        realRowIdx,
                                        col.key
                                      )}
                                    />
                                  )}
                                  {layoutType === "multiline" && (
                                    <textarea
                                      rows={2}
                                      value={cellValue}
                                      onChange={(e) =>
                                        handleFieldChange(
                                          realRowIdx,
                                          col.key,
                                          e.target.value
                                        )
                                      }
                                      placeholder="Enter data"
                                      className="text-[12px] border-0 border-b border-gray-200 bg-transparent py-1 px-1 mx-2 w-full focus:outline-none focus:border-[#62b0a6] disabled:bg-[#F5F5F5] disabled:text-gray-400 resize-none"
                                      disabled={isCellDisabled(
                                        realRowIdx,
                                        col.key
                                      )}
                                    />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          );
          lastSection = row.section;
        }
        // Only render per-section, NOT per individual row
        return sectionHeadingRow;
      })}
    </div>
  );
};

export default BrsrPolicyTableWidget;
