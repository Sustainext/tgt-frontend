"use client";
import { useSelector } from "react-redux";

const Section20 = ({ section11_6Ref, section11_6_1Ref }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  return (
    <>
      <div id="section11_6" ref={section11_6Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          11.6. Political Contributions
        </h3>

        {data['415_1a'] && data['415_1a'].length>0?data['415_1a'].map((val)=>(
          val.Q1=="Yes"? (
            <div>
              <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        The total monetary value of financial and in-kind political contributions, both direct and indirect, is reported by country and recipient/beneficiary. The monetary value of in-kind contributions is:
        </p>
            <p className="text-sm mb-4">
                {val.Q2 || "No data available"}
              </p>
            </div>
            
          ): <p className="text-sm mb-4">{val.Q1}</p>

        )):<p className="text-sm mb-4">No data available</p>
}

        
      </div>

      <div id="section11_6_1" ref={section11_6_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.6.1 Management of Material Topic
        </h3>

        {data["3-3cde_11-6-1"] && data["3-3cde_11-6-1"].length > 0 ? (
    data["3-3cde_11-6-1"].map((val, index) => (
        <div key={index}>
            <p className="text-sm mb-2">{val.GRI33cd ? val.GRI33cd : 'No data available'}</p>
            <p className="text-sm mb-4">{val.GRI33e ? val.GRI33e : 'No data available'}</p>
        </div>
    ))
) : (
    <p className="text-sm mb-4">No data available</p>
)}
      </div>
    </>
  );
};

export default Section20;
