"use client";
import { useState, useRef, useEffect } from "react";

const Section8 = ({ section11_3Ref, section11_3_1Ref,data,reportType }) => {
  const [content, setContent] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
  );

  return (
    <>
      <div id="section11_3" ref={section11_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          11.3. Climate-related Impacts, Risks, and Opportunities
        </h3>
      </div>
      {reportType=='GRI Report: In accordance With'?(
        <div id="section11_3_1" ref={section11_3_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.3.1 Management of Material Topics
        </h3>

        {data["3-3cde_11-3-1"] && data["3-3cde_11-3-1"].length > 0 ? (
    data["3-3cde_11-3-1"].map((val, index) => (
        <div key={index}>
            <p className="text-sm mb-2">{val.GRI33cd ? val.GRI33cd : 'No data available'}</p>
            <p className="text-sm mb-4">{val.GRI33e ? val.GRI33e : 'No data available'}</p>
        </div>
    ))
) : (
    <p className="text-sm mb-4">No data available</p>
)}
      </div>
      ):(
        <div></div>
      )}
      
    </>
  );
};

export default Section8;
