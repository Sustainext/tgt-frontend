'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import dynamic from 'next/dynamic';
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setOzoneDepletingSubstanceElimination} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



const Section9=({section12_1_7Ref})=>{
    

    const content = useSelector(state => state.screen12Slice.ozone_depleting_substance_elimination);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setOzoneDepletingSubstanceElimination(
      `<p>
        We are committed to eliminating the use of ozone-depleting substances (ODS) in our operations. We track and report our use of ODS and have implemented measures to phase out their use in line with international agreements.  
(Data of ODS can be represented in graphical form e.g. bar graphs, pie charts etc.)  
        </p>`
      ))
    }
   
    
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
      dispatch(setOzoneDepletingSubstanceElimination(value))
    }
    
    return (
        <>
       
        <div id="section12_1_7" ref={section12_1_7Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.7 Ozone Depleting Substances
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s commitment to eliminate use of ozone depleting substance</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
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
           

</div>
        </>
    )
}

export default Section9