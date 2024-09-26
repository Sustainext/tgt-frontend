'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



const Section33=({section12_7Ref})=>{
    const [content,setContent] = useState(
        `
        <p>
        We recognize the importance of maintaining air quality and work to minimize air emissions from our operations. This includes implementing measures to reduce pollutants, monitoring air quality, and complying with regulatory standards. 
        </p>
        `
    )

    const col1=[
        "Sr. No. ",
       "Air Pollutants",
        "Total Emissions",
        "Contribution %",
       "Source of emission factor"
    ]
    const data1=[
        {
            "Sr. No. ":"1",
        "Air Pollutants":"data",
        "Total Emissions":"data",
        "Contribution %":"data",
        "Source of emission factor":"data",
        }
    ]
    
    const config = {
        style: {
          fontSize: '14px',
        },
        allowResizeY: false,
      };
    
    return (
        <>
       
        <div id="section12_7" ref={section12_7Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
12.7 Air Quality
</h3>

<p className="text-[15px] text-[#344054] mb-2">
            Edit data
            </p>
            <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              // tabIndex={1}
              // onBlur={handleEditorChange}
              />
            </div>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Non-hazardous waste diverted form disposal
</p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={data1}/>
</div>

</div>
        </>
    )
}

export default Section33