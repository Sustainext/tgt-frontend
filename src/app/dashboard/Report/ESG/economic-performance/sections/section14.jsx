import { useSelector } from "react-redux";

// Utility function to strip HTML tags
const stripHTML = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const Section14 = ({ section11_4_3Ref }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  return (
    <>
      <div id="section11_4_3" ref={section11_4_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.4.3. Tax Governance and Risk Management
        </h3>
        {data["207_2a"]?.map((item, index) => (
          <div key={`207_2a_${index}`} className="mb-4">
            <p className="text-[12px] mb-2">{item.Q1 || "No data available"}</p>
            <p className="text-[12px] mb-2">{item.Q2 || "No data available"}</p>
            <p className="text-[12px] mb-2">{item.Q4 || "No data available"}</p>
            <p className="text-[12px] mb-2">
              {stripHTML(item.Q3) || "No data available"}
            </p>
          </div>
        ))}

        {data["207_2b"]?.map((item, index) => (
          <div key={`207_2b_${index}`} className="mb-4">
            <p className="text-[12px] mb-2">{item.Q1 || "No data available"}</p>
          </div>
        ))}

        {data["207_2c"] && data["207_2c"].Q1 === "Yes" && (
          <div className="mb-4">
            <p className="text-[12px] mb-2">{data["207_2c"].Q1}</p>
            <p className="text-[12px] mb-2">
              {data["207_2c"].Q2 || "No data available"}
            </p>
            <p className="text-[12px] mb-2">
              {data["207_2c"].Q3?.text || "No data available"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Section14;
