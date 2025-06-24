"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setViolationOfRights } from "../../../../../../lib/redux/features/ESGSlice/screen14Slice";


const Section2 = ({ section14_1_1Ref,section14_1_2Ref, data,orgName,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'14.1.1':'',
  sectionTitle = 'Management of material topics',
  sectionOrder = 14,
 }) => {
const shouldRender = useSelector((state)=> state.reportCreation.includeMaterialTopics)
  
 
  return (
    <>
    {reportType=='GRI Report: In accordance With' || (reportType==='Custom ESG Report' && shouldRender)?(
       <div ref={section14_1_1Ref} id="section14_1_1">
       <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
       </h3>
       {data["3_c_d_e_in_material_topics"] &&
       data["3_c_d_e_in_material_topics"].length > 0 ? (
         data["3_c_d_e_in_material_topics"].map((val, index) => (
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

export default Section2;
