'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from 'next/dynamic';
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

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

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s commitment to protect and maintain air quality</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            // onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
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