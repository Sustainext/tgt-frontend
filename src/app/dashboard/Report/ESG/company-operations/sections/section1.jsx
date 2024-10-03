

"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1=({orgName})=>{
    const [content,setContent]=useState("")

    const loadContent=()=>{
      setContent(
        `
        <p>Effective stakeholder engagement is vital to ${orgName?orgName:"[Company Name]"}'s sustainability strategy and overall business success. We recognize that our actions impact a wide range of stakeholders, including employees, customers, suppliers, investors, local communities, and regulatory bodies.</p>
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
            <div className="flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">Edit Statement</p>
            <button className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
        onClick={loadContent}
        >
          <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/>
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
            <ul className="list-disc ml-6">
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Nature of ownership and legal form:
                {/* <p className="mb-4 font-normal">{content}</p> */}
                </li>
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Countries of operation:
                {/* <p className="mb-4 font-normal">{content}</p> */}
                </li>
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Headquarters:
                {/* <p className="mb-4 font-normal">{content}</p> */}
                </li>
            </ul>
        </>
    )
}

export default Section1