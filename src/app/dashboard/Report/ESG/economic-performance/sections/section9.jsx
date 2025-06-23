"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Section9 = ({ section11_3_2Ref,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'11.3.2':'11.3.1',
  sectionTitle = 'Climate-related Financial Implications',
  sectionOrder = 11,
 }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  return (
    <>
      <div id="section11_3_2" ref={section11_3_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
      {sectionNumber} {sectionTitle} 
        </h3>

       <p className="text-sm mb-4">
        {
          data['financial_implications-201-2a']?
          data['financial_implications-201-2a']?.length>0?
          data['financial_implications-201-2a'][0]?.Q1=="No"?data['financial_implications-201-2a'][0]?.Q2:'Yes':'No data available':'No data available'
        }

       </p>
      </div>
    </>
  );
};

export default Section9;
