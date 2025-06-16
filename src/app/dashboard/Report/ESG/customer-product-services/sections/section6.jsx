"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
const Section6 = ({ section15_2_1Ref, data,reportType,
  sectionNumber = '15.2.1',
  sectionTitle = 'Product and Service Information and Labelling',
  sectionOrder = 15,
 }) => {
  const shouldRender = useSelector((state)=> state.reportCreation.includeMaterialTopics)
  return (
    <>
      {reportType=='GRI Report: In accordance With' || (reportType==='Custom ESG Report' && shouldRender)?(
       <div ref={section15_2_1Ref} id="setion15_2_1">
       <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
       </h3>
       {data["3-3cde_15-2-1"] &&
       data["3-3cde_15-2-1"].length > 0 ? (
         data["3-3cde_15-2-1"].map((val, index) => (
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

export default Section6;
