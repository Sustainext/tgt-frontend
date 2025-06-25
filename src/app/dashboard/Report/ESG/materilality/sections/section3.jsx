'use client'
import { useState, useRef, useEffect } from "react";




const Section3=({section8_1_2Ref,data,
    sectionNumber = "8.1.2",
  sectionTitle = 'Changes in the list of material topics',
  sectionOrder = 8,
})=>{
    const [content,setContent] = useState(
        `In line with our commitment to transparency and continuous improvement, we regularly review and update our list of material topics to reflect the evolving landscape of our business and the broader external environment. As a result of our materiality assessment, we have made several changes to our list of material topics to better reflect the current priorities and challenges. The following key changes have been made `
    )
    return (
        <>
        <div id="section8_1_2" ref={section8_1_2Ref}>
        <p className="text-[17px] text-[#344054] mb-4 font-semibold">
       {sectionNumber} {sectionTitle}
            </p>

            <p className="text-sm mb-4">{data["3-2b"]?data["3-2b"]:"No data available"}</p>
            
        </div>
        </>
    )
}

export default Section3