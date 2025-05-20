"use client";
import { useState, useRef, useEffect } from "react";

const Section13 = ({ section13_4Ref, section13_4_1Ref, data,reportType }) => {
  const [content, setContent] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
  );

  return (
    <>
      <div id="section13_4" ref={section13_4Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          13.4 Diversity, Inclusion
        </h3>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Significant Locations of Operation
        </p>
        <p className="text-sm mb-4">
          {data["405-2b-significant_locations"]
            ? data["405-2b-significant_locations"].data
              ? data["405-2b-significant_locations"].data.length > 0
                ? data["405-2b-significant_locations"].data[0].Q1
                  ? data["405-2b-significant_locations"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
      </div>
      {reportType=='GRI Report: In accordance With'?(
            <div id="section13_4_1" ref={section13_4_1Ref}>
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
              13.4.1 Management of material topic
            </h3>
    
            {data["3-3cde_13-4-1"] && data["3-3cde_13-4-1"].length > 0 ? (
              data["3-3cde_13-4-1"].map((val, index) => (
                <div key={index}>
                  <p className="text-sm mb-2">
                    {val.GRI33cd ? val.GRI33cd : "No data available"}
                  </p>
                  <p className="text-sm mb-4">
                    {val.GRI33e ? val.GRI33e : "No data available"}
                  </p>
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

export default Section13;
