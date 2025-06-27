const ManagementOfMaterialTopicTable = ({ data, col }) => {
    return (
      <div style={{ maxHeight: "500px", overflowY: "auto" }} className="mb-2">
        <table className="w-full border border-gray-200 rounded-md overflow-hidden">
          <thead className="gradient-background">
            <tr>
              {col.map((item, idx) => (
                <th
                  key={idx}
                  style={{ textAlign: "left" }}
                  className={`text-[12px] border-r px-4 py-4 ${
                    idx === 0 ? "rounded-tl-md" : ""
                  } ${idx === col.length - 1 ? "rounded-tr-md" : ""} text-gray-500`}
                >
                  <div className="flex">
                    <p className="flex">{item}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((val, index) => (
                <tr key={index} className="text-[13px]">
                  <td className="border border-gray-200 p-4 text-left">
                    {val.topic_name || "No data available"}
                  </td>
                  <td className="border border-gray-200 p-4 text-left">
                    {val.GRI33cd || "No data available"}
                  </td>
                  <td className="border border-gray-200 p-4 text-left">
                    {val.GRI33e || "No data available"}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-[13px]">
                <td className="border border-gray-200 p-4 text-center" colSpan={3}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ManagementOfMaterialTopicTable;
  