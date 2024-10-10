"use client";
import { useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";
const Section7 = ({ section11_2_2Ref }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  return (
    <>
      <div id="section11_2_2" ref={section11_2_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.2.2 Indirect Economic impacts
        </h3>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-[500]">
          Examples of significant identified indirect economic impacts of the
          organization:
        </h3>
        <p className="text-sm mb-4">{data?.["203_2a"]}</p>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-[500]">
          Significance of the indirect economic impacts in the context of
          external benchmarks and stakeholder priorities:
        </h3>
        <p className="text-sm mb-4">{data?.["203_2b"]}</p>
      </div>
    </>
  );
};

export default Section7;
