const Table1 = ({ data }) => {
  // Define table headers
  const columns = [
    {
      mainHeader: "Gender",
      subHeaders: ["Male", "Female", "Non-Binary"],
    },
    {
      mainHeader: "Age Group",
      subHeaders: ["< 30 years", "30-50 years", "> 50 years"],
    },
    {
      mainHeader: "Diversity Groups",
      subHeaders: ["Minority group", "Vulnerable Communities"],
    },
  ];

  console.log("Rendering Table with Data:", data);

  return (
    <div className="overflow-x-auto custom-scrollbar">
    <table
      className="min-w-[828px] w-full rounded-lg border border-gray-300 "
      style={{ borderCollapse: "separate", borderSpacing: 0 }}
    >
        <thead className=" md:table-header-group ">
          <tr className="md:table-row gradient-background">
            {/* Main headers */}
            {columns.map((header, index) => (
              <th
                key={index}
                colSpan={header.subHeaders.length}
                className={`px-2 py-3 text-[#727272]  md:table-cell text-center text-[12px]  ${
                  index === 0 ? "" : "border-l"
                }`}
              
              >
                {header.mainHeader}
              </th>
            ))}
          </tr>
          <tr className="border border-gray-300 md:table-row gradient-background">
            {/* Sub-headers */}
            {columns.flatMap((header) =>
              header.subHeaders.map((subHeader, index) => (
                <th
                  key={index}
                  className={`px-2 py-3 text-[#727272]  md:table-cell text-center text-[12px] border-t  border-l
                  `}
                
                >
                  {subHeader}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody className=" md:table-row-group">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className=" md:table-row">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`p-2  md:table-cell text-center font-normal text-slate-500 text-[12px] border-b border-t ${
                      cellIndex === 0 ? "" : "border-l"
                    }`}
                  >
                    {cell !== undefined ? cell : "N/A"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4 text-slate-500 text-[12px] border-b border-t border-gray-300 ">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table1;
