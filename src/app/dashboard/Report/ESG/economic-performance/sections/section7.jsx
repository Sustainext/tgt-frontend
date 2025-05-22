"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Section7 = ({ section11_2_2Ref,reportType}) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  return (
    <>
      <div id="section11_2_2" ref={section11_2_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
         {reportType=='GRI Report: In accordance With'?'11.2.2':'11.2.1'}  Indirect Economic Impacts
        </h3>

        {/* Mapping over 203_2a */}
        {data["203_2a"]?.length>0?data["203_2a"].map((item, index) => (
          <p key={`203_2a_${index}`} className="text-sm mb-4">
            {item.Q1 || "No data available"}
          </p>
        )):(
          <p className="text-sm mb-4">
            No data available
          </p>
        )
      }

        {/* Mapping over 203_2b */}
        {data["203_2b"]?.length>0?data["203_2b"].map((item, index) => (
          <p key={`203_2b_${index}`} className="text-sm mb-4">
            {item.Q1 || "No data available"}
          </p>
        ))
        :(
          <p className="text-sm mb-4">
            No data available
          </p>
        )
        
        }
      </div>
    </>
  );
};

export default Section7;
