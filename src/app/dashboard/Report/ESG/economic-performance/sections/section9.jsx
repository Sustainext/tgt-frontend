"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Section9 = ({ section11_3_2Ref }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  return (
    <>
      <div id="section11_3_2" ref={section11_3_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.3.2. Climate-related Financial Implications
        </h3>

        {/* Map through financial_implications-201-2a */}
        {data["financial_implications-201-2a"]?.map((item, index) => (
          <div key={`financial_implications_${index}`} className="mb-4">
            {/* <p className="text-sm">{item.Q1?item.Q1=="No"?item.Q1:'': "No data available"}</p> */}
            
            {/* Only show Q2 if Q1 is not 'Yes' and Q2 has a value */}
            {item.Q1 !== "Yes" && item.Q2 && <p className="text-sm">{item.Q2}</p>}
          </div>
        ))}

        {/* Fallback if no data is available */}
        {(!data["financial_implications-201-2a"] || data["financial_implications-201-2a"].length === 0) && (
          <p className="text-sm mb-4">No data available</p>
        )}
      </div>
    </>
  );
};

export default Section9;
