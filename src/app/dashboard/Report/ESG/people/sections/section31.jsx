'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section31=({section13_8Ref})=>{
    const [content,setContent] = useState(
        `We are committed to respecting the rights of indigenous people and addressing any incidents of violations promptly and effectively. Our policies and practices aim to foster a respectful and inclusive environment for all.`
    )
   
    const col1=[
        "Type of Incident  ",
       "Total number of Incidents of discrimination ",
        "Describe the incident ",
     
    ]

    const data1=[
        {
            "Type of Incident  ":"Race",
            "Total number of Incidents of discrimination ":"",
            "Describe the incident ":"",
        
        },
        {
            "Type of Incident  ":"Gender",
            "Total number of Incidents of discrimination ":"",
            "Describe the incident ":"",
        
        },

    ]
    
    return (
        <>
        <div id="section13_8" ref={section13_8Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
13.8 Incidents of Violation/Discrimination
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px]  mb-2 font-semibold">
        Incidents of discrimination 
            </p>
            <div className="shadow-md rounded-md mb-4">
               <LeaveTable columns={col1} data={data1}/>
            </div>
           
            

</div>
        </>
    )
}

export default Section31