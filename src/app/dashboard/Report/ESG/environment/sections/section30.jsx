"use client";
import { useState, useRef, useEffect } from "react";

const Section30 = ({ section12_6Ref,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.6':'12.6',
  sectionTitle = 'Biodiversity',
  sectionOrder = 12,
 }) => {
  const [content, setContent] = useState(
    `Company Name) organization is committed to preventing and managing significant spills that can negatively impact the environment, biodiversity, and local communities. As part of our sustainability strategy, we have implemented a`
  );

  return (
    <>
      <div id="section12_6" ref={section12_6Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
        </h3>

        {/* <p className="text-sm mb-4">
          We are committed to protecting and enhancing biodiversity in the areas
          where we operate. Our biodiversity management includes assessing
          potential impacts, implementing mitigation measures, and promoting
          conservation efforts.
        </p> */}
      </div>
    </>
  );
};

export default Section30;
