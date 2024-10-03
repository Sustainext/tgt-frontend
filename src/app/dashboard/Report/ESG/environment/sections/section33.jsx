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
        fontSize: "14px",
        color:"#667085"
      },
      allowResizeY: false,
      defaultActionOnPaste: 'insert_clear_html',
      toolbarSticky: false,
      toolbar: true,
      buttons: [
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'align',
          'outdent',
          'indent',
          'ul',
          'ol',
          'paragraph',
          'link',
          'table',
          'undo',
          'redo',
          'hr',
          'fontsize',
          'selectall'
      ],
      // Remove buttons from the extra buttons list
      removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode','paintFormat','image','brush','font'],
    };
    
    
    const handleEditorChange=(value)=>{
      setContent(value)
    }
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
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Air Emissions by Pollutants
</p>
<div className="shadow-md rounded-md mb-4">
<LeaveTable columns={col1} data={data1}/>
</div>

</div>
        </>
    )
}

export default Section33