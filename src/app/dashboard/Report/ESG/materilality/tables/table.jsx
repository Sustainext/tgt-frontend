'use client';
import React from 'react';

const MaterialityTable = ({ col, value }) => {
  const groupedData = [];

  if (value && value.length > 0) {
    value.forEach((row) => {
      const { "ESG Pillar": esgPillar, "Material Topic": materialTopic, ...rest } = row;

      const existingGroup = groupedData.find(
        (group) => group.esgPillar === esgPillar && group.materialTopic === materialTopic
      );

      if (existingGroup) {
        existingGroup.rows.push(rest);
      } else {
        groupedData.push({
          esgPillar,
          materialTopic,
          rows: [rest],
        });
      }
    });
  }

  return (
    <div
      style={{
        maxHeight: "500px",
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "50vw",
      }}
      className="table-scrollbar"
    >
      <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        <thead className="gradient-background">
          <tr>
            {col.map((item, idx) => (
              <th
                key={idx}
                style={{ minWidth: "120px", textAlign: "left" }}
                className={`text-[12px] border-r px-4 py-4 ${
                  idx === 0 ? "rounded-tl-md" : ""
                } ${
                  idx === col.length - 1 ? "rounded-tr-md" : ""
                } text-gray-500`}
              >
                <div className="flex">
                  <p className="flex">{item}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groupedData.length > 0 ? (
            groupedData.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {group.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="text-[13px]">
                    {rowIdx === 0 && (
                      <td
                        rowSpan={group.rows.length}
                        className="border-t border-r border-gray-200 p-4 text-left"
                        style={{ verticalAlign: "middle" }}
                      >
                        {group.esgPillar}
                      </td>
                    )}
                    {rowIdx === 0 && (
                      <td
                        rowSpan={group.rows.length}
                        className="border-t border-r border-gray-200 p-4 text-left"
                        style={{ verticalAlign: "middle" }}
                      >
                        {group.materialTopic}
                      </td>
                    )}
                    <td className="border-t border-r border-gray-200 p-4 text-left">
                      {row["GRI disclosure number"]}
                    </td>
                    <td className="border-t border-r border-gray-200 p-4 text-left">
                      {Array.isArray(row["Linked UN SDG"]) ? (
                        row["Linked UN SDG"].map((sdg, sdgIdx) => (
                          <span
                            key={sdgIdx}
                            style={{
                              backgroundColor: sdg.bg_color,
                              color: sdg.text_color,
                              padding: "3px 12px",
                              fontSize: "12px",
                              borderRadius: "8px",
                              marginRight: "4px",
                              display: "inline-block",
                              marginBottom: "10px",
                              width: "70px",
                              textAlign: "center",
                            }}
                          >
                            {sdg.name}
                          </span>
                        ))
                      ) : (
                        row["Linked UN SDG"]
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr className="text-[13px]">
              <td className="border-t border-r border-gray-200 p-4 text-left">
                No Data available
              </td>
              <td className="border-t border-r border-gray-200 p-4 text-left">
                No Data available
              </td>
              <td className="border-t border-r border-gray-200 p-4 text-left">
                No Data available
              </td>
              <td className="border-t border-r border-gray-200 p-4 text-left">
                No Data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialityTable;
