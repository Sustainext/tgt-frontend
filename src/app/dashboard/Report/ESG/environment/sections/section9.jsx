'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



const Section9=({section12_1_6Ref})=>{
    const [content,setContent] = useState(
        `
        <p>
        We are committed to eliminating the use of ozone-depleting substances (ODS) in our operations. We track and report our use of ODS and have implemented measures to phase out their use in line with international agreements.  
(Data of ODS can be represented in graphical form e.g. bar graphs, pie charts etc.)  
        </p>
        `
    )

   
    
    const config = {
        style: {
          fontSize: '14px',
        },
        allowResizeY: false,
      };
    
    return (
        <>
       
        <div id="section12_1_6" ref={section12_1_6Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.7 Ozone Depleting Substances
</h3>

<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
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
           

</div>
        </>
    )
}

export default Section9