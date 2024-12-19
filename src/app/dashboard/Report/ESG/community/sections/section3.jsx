"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setCSRStatement} from "../../../../../../lib/redux/features/ESGSlice/screen14Slice"

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section3 = ({ section14_2Ref }) => {
 

    const csr_statement = useSelector(state => state.screen14Slice.csr_statement);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setCSRStatement(
        `<p>Corporate Social Responsibility (CSR) is a cornerstone of our community engagement strategy. Our CSR efforts are guided by the principles of ethical business practices, sustainability, and social equity. We are committed to making a positive impact through strategic investments and partnerships that address critical social and environmental challenges. 
<br/>
        CSR Framework 
<br/>
       Our CSR framework is built on three pillars: People, Planet, and Prosperity. This holistic approach ensures that our initiatives are inclusive, environmentally sustainable, and economically beneficial. <br/>
        Partnerships and Collaborations  
<br/>
        Climate Change<br/>
       Collaboration with stakeholders is key to the success of our CSR initiatives. We partner with local governments, NGOs, and other organizations to leverage resources, expertise, and networks. These partnerships enable us to scale our impact and ensure that our CSR activities are aligned with community needs and priorities. 
<br/></p>`))
    }
  const config = {
    enter: "BR", // Or customize behavior on Enter key
  cleanHTML: true,
    enablePasteHTMLFilter: false, 
    askBeforePasteHTML: false, 
    askBeforePasteFromWord: false,
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
    dispatch(setCSRStatement(value))
  }

  return (
    <>
      <div ref={section14_2Ref} id="section14_2">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          14.2 CSR
        </h3>

        <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s Corporate Social Responsibility policies</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
          
        <div>
          <JoditEditor
            // ref={editor}
            // className="whitespace-pre-wrap"
            value={csr_statement}
            config={config}
            tabIndex={1}
            onBlur={handleEditorChange}
          />
        </div>
      </div>
    </>
  );
};

export default Section3;
