import { useSelector } from "react-redux";

// Utility function to strip HTML tags
const stripHTML = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const Section14 = ({ section11_4_3Ref,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'11.4.3':'11.4.2',
  sectionTitle = 'Tax Governance and Risk Management',
  sectionOrder = 11,
 }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  return (
    <>
      <div id="section11_4_3" ref={section11_4_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
       {sectionNumber} {sectionTitle}
        </h3>

        <p className="text-[15px] mb-2 font-semibold">
        Governance body or executive-level position within the organization accountable for compliance with the tax strategy
        </p>

        {data["207_2a"]?.length>0?data["207_2a"].map((item, index) => (
          <div key={`207_2a_${index}`} className="mb-4">
            <p className="text-sm mb-2">{item.Q1 || "No data available"}</p>
            <p className="text-sm mb-2">{item.Q2 || "No data available"}</p>
            <p className="text-sm mb-2">{item.Q4 || "No data available"}</p>
            <p className="text-sm mb-2">
              {stripHTML(item.Q3) || "No data available"}
            </p>
          </div>
        ))
      :(
        <p className="text-sm mb-2">No data available</p>
      )
      }

<p className="text-[15px] mb-2 font-semibold">
Mechanisms to raise concerns about the organization’s business conduct and the organization’s integrity in relation to tax.
        </p>

        {data["207_2b"]?.length>0?data["207_2b"].map((item, index) => (
          <div key={`207_2b_${index}`} className="mb-4">
            <p className="text-sm mb-2">{item.Q1 || "No data available"}</p>
          </div>
        )):(
          <p className="text-sm mb-2">No data available</p>
        )
      }

<p className="text-[15px] mb-2 font-semibold">
Assurance process for disclosures on tax 
        </p>
        {data["207_2c"] && data["207_2c"][0]?.Q1 === "Yes" ? (
          <div className="mb-4">
            
            <p className="text-sm mb-2">
              {data["207_2c"][0]?.Q2 || "No data available"}
            </p>
            <p className="text-sm mb-2">
              {data["207_2c"][0]?.Q3?.text || "No data available"}
            </p>
          </div>
        ):<p className="text-sm mb-2">{data["207_2c"] && data["207_2c"][0]?.Q1?data["207_2c"][0]?.Q1:'No data available'}</p>}
      </div>
    </>
  );
};

export default Section14;
