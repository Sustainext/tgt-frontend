"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Section12 = ({ section11_4Ref, section11_4_1Ref,data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'11.4.1':'',
  sectionTitle = 'Management of Material Topic',
  sectionOrder = 11,
 }) => {
  const shouldRender = useSelector((state)=> state.reportCreation.includeMaterialTopics)

  return (
    <>
     
     {reportType=='GRI Report: In accordance With' || (shouldRender && reportType==='Custom ESG Report')?(
         <div id="section11_4_1" ref={section11_4_1Ref}>
         <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
         </h3>
 
         {data["3-3cde_11-4-1"] && data["3-3cde_11-4-1"].length > 0 ? (
           data["3-3cde_11-4-1"].map((val, index) => (
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

export default Section12;
