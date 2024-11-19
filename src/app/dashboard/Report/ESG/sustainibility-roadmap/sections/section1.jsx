'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { setdescription } from "../../../../../../lib/redux/features/ESGSlice/screen4Slice";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Section1 =()=>{
  const description = useSelector(state => state.screen4Slice.description);
  const dispatch = useDispatch();

   
    const config = {
      enablePasteHTMLFilter: false, 
    askBeforePasteHTML: false, 
    askBeforePasteFromWord: false,
      style: {
        fontSize: "14px",
        color:"#667085"
      },
      height:500,
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
      dispatch(setdescription(value))
    }
    
    return (
        <>
        <div>
        {/* <p className="text-[15px] text-[#344054] mb-4">
        Enter data and images related to sustainability roadmap  of the company
            </p> */}
            <div>
              <JoditEditor
                // ref={editor}
                // className="whitespace-pre-wrap"
                value={description}
                config={config}
                tabIndex={1} 
                onBlur={handleEditorChange}
              />
            </div>
        </div>
        </>
    )
}

export default Section1