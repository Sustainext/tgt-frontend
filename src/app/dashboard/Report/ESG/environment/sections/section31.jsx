"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Section31 = ({ section12_6_1Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.6.1':'',
  sectionTitle = 'Management of material topics',
  sectionOrder = 12,
 }) => {
  const shouldRender = useSelector((state)=> state.reportCreation.includeMaterialTopics)

  return (
    <>
      {reportType=='GRI Report: In accordance With' || (shouldRender && reportType==='Custom ESG Report')?(
        <div id="section12_6_1" ref={section12_6_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
        </h3>

        {/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
Description of organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.
</p> */}
        <p className="text-sm mb-2">No data available</p>
        {/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
Process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process along with specific lessons learned and how these have been incoporated to organisation's operational policies and procedures.
</p> */}
        {/* <p className="text-sm mb-4">No data available</p> */}
      </div>
      ):(
        <div></div>
      )}
    </>
  );
};

export default Section31;
