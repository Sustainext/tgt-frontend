"use client";
import { useState, useRef, useEffect } from "react";


const Section2 = ({ section14_1_1Ref,data }) => {
  return (
    <>
      <div ref={section14_1_1Ref} id="section14_1_1">
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          14.1.1 Management of material topic
        </h3>
        {data["3_c_d_e_in_material_topics"] && data["3_c_d_e_in_material_topics"].length > 0 ? (
    data["3_c_d_e_in_material_topics"].map((val, index) => (
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

export default Section2;
