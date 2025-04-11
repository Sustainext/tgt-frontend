"use client";
import { useState, useRef, useEffect } from "react";

const Section12 = ({ section13_3_1Ref, data }) => {
  const [content, setContent] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
  );

  return (
    <>
      <div id="section13_3_1" ref={section13_3_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          13.3.1 Management of material topic
        </h3>

        {data["3-3cde_13-3-1"] && data["3-3cde_13-3-1"].length > 0 ? (
          data["3-3cde_13-3-1"].map((val, index) => (
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
    </>
  );
};

export default Section12;
