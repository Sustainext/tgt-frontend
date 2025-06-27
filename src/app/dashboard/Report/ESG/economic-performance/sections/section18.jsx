"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Section18 = ({ section11_5_3Ref,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'11.5.3':'11.5.2',
  sectionTitle = 'Incidents of Anti-Corruption',
  sectionOrder = 11,
 }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);
  return (
    <>
      <div id="section11_5_3" ref={section11_5_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
        </h3>
        <p className="text-[15px] text-[#344054] font-semibold mb-2">
                Confirmed incidents of corruption
              </p>
        {data["205_3a_anti_corruption"]?.length > 0 ? (
          data["205_3a_anti_corruption"].map((item, index) => (
            <div key={`205_3a_anti_corruption${index}`} className="mb-4">
             
              <p className="text-[12px] mb-4">
                {item.Q1 || "No data available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm mb-2">No data available</p>
        )}
         <p className="text-[15px] text-[#344054] font-semibold mb-2">
                Nature of confirmed incidents of corruption
              </p>
              {data["205_3a_anti_corruption"]?.length > 0 ? (
          data["205_3a_anti_corruption"].map((item, index) => (
            <div key={`205_3a_anti_corruption${index}`} className="mb-4">
             
              <p className="text-[12px] mb-4">
                {item.Q2 || "No data available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm mb-2">No data available</p>
        )}
        <p className="text-[15px] text-[#344054] font-semibold mb-2">
                Confirmed incidents in which employees were dismissed or
                disciplined for corruption
              </p>
        {data["205_3b_anti_corruption"]?.length > 0 ? (
          data["205_3b_anti_corruption"].map((item, index) => (
            <div key={`205_3b_anti_corruption${index}`} className="mb-4">
              
              <p className="text-[12px] mb-2">
                {item.Q1 || "No data available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm mb-2">No data available</p>
        )}

<p className="text-[15px] text-[#344054] font-semibold mb-2">
                Confirmed incidents when contracts with business partners were
                terminated or not renewed due to violations related to
                corruption
              </p>
        {data["205_3c_anti_corruption"]?.length > 0 ? (
          data["205_3c_anti_corruption"].map((item, index) => (
            <div key={`205_3c_anti_corruption${index}`} className="mb-4">
              
              <p className="text-[12px] mb-2">
                {item.Q1 || "No data available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm mb-2">No data available</p>
        )}
      </div>
    </>
  );
};

export default Section18;
