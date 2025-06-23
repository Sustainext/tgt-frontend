"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const Section5 = ({ section10_3_1Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'10.3.1':'',
  sectionTitle = 'Management of Material Topics',
  sectionOrder = 9,
 }) => {
  // const [content, setContent] = useState(
  //   `We integrate sustainability into our core business operations by setting ambitious goals, implementing robust management systems, and continuously monitoring our performance. Our approach is guided by global frameworks such as the Global Reporting Initiative (GRI) and the United Nations Sustainable Development Goals (SDGs).`
  // );
  const shouldRender = useSelector((state)=> state.reportCreation.includeMaterialTopics)
  return (
    <>
  
      {reportType=='GRI Report: In accordance With' || (shouldRender && reportType==='Custom ESG Report')?(
         <div id="section10_3_1" ref={section10_3_1Ref}>
         <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
         </h3>
 
         {data["3_c_d_e_in_material_topics"] && data["3_c_d_e_in_material_topics"].length > 0 ? (
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

export default Section5;
