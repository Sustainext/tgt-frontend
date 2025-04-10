"use client";
import { useState, useRef, useEffect } from "react";

const Section8 = ({ section9_3_2Ref, data }) => {
  const [content, setContent] = useState(
    `Our Board of Directors comprises a diverse group of experienced professionals who bring a broad range of expertise and perspectives. The Board is structured to provide balanced oversight and strategic guidance, with committees dedicated to specific areas such as audit, risk management, and sustainability. `
  );
  return (
    <>
      <div id="section9_3_2" ref={section9_3_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          9.3.2 Collective knowledge of the highest governance body
        </h3>
        <p className="text-sm mb-4">
          {data["2_17_a"] ? data["2_17_a"] : "No data available"}
        </p>
      </div>
    </>
  );
};

export default Section8;
