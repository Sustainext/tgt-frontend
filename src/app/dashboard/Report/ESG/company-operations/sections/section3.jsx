

"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section3=({section2_2Ref,orgName})=>{
  const [content,setContent]=useState()

const loadContent=()=>{
  setContent(
    `
    <p>Our supply chain is integral to our sustainability strategy. We work closely with our suppliers to ensure they meet our high standards for environmental and social responsibility. Key initiatives in our supply chain include</p>
    `
  )
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
  setContent(value)
}
    return (
        <>
        <div id="setion2_2" ref={section2_2Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                2.2 Supply Chain
              </h3>
            </div>
            <div className="flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">Edit Statement</p>
            <button className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
        onClick={loadContent}
        >
          <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/>
          Auto Fill
        </button>
            </div>
            <div className="mb-6">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div>
        </>
    )
}

export default Section3