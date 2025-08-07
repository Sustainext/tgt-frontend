const Table2 = ({ data, columns }) => {
  const columnKeyMap = {
    "Security Personnel (in organisation)": "sp_in_org",
    "Security Personnel (from third-party organisation)": "sp_3rd_org",
  };

  const isEmptyData = data.length === 0 || data.every(row => !Object.values(row).some(value => value));

  console.log("Data passed to Table2:", data);

  return (
    <div className='overflow-x-auto custom-scrollbar w-full'>
        <table className="rounded-md border border-gray-300 w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr className="gradient-background">
            {columns.map((column, index) => (
              <th key={index} className="px-2 py-3 text-center text-[#727272] text-[12px] border-b border-gray-300">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isEmptyData ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-2 text-[12px] font-normal text-slate-500 border-b border-gray-300">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-300">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-2 py-2 text-center text-[12px] font-normal text-slate-500 border-b border-gray-300">
                    {row[columnKeyMap[column]] !== undefined && row[columnKeyMap[column]] !== null 
                      ? `${row[columnKeyMap[column]]}%`
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


export default Table2;



