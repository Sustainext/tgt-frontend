'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setHabitatProtectionRestorationCommitment} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section32=({section12_6_2Ref})=>{
    
    const content = useSelector(state => state.screen12Slice.habitat_protection_restoration_commitment);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setHabitatProtectionRestorationCommitment(
        `<p>We work to protect and restore habitats affected by our operations. This includes creating conservation areas, rehabilitating disturbed lands, and supporting biodiversity projects.</p>`))
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
      dispatch(setHabitatProtectionRestorationCommitment(value))
    }

    return (
        <>
       
        <div id="section12_6_2" ref={section12_6_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.6.2 Habitat Protected and Restored 
</h3>

<p className="text-sm mb-4">We work to protect and restore habitats affected by our operations. This includes creating conservation areas, rehabilitating disturbed lands, and supporting biodiversity projects</p>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s commitment to protect and restore habitats</p>
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

export default Section32