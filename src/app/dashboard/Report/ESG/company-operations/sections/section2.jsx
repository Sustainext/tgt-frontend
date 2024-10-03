

"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MdOutlinePlaylistAdd } from "react-icons/md";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2=({section2_1_1Ref,section2_1_2Ref,section2_1Ref,orgName})=>{
    const [content,setContent]=useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut at ipsum molestias dicta blanditiis harum laborum saepe expedita')
    const [content2,setContent2]=useState("")
    const [content3,setContent3]=useState("")
    const loadContent=()=>{
      setContent2(
       `<p>This report includes sustainability performance data from all entities under ${orgName?orgName:"[Company Name]"} operational control.</p>`
      )
    }

    const loadContent2=()=>{
      setContent3(
        `
        <p>
        ${orgName?orgName:"[Company Name]"} is a leading manufacturer of [Products], serving a diverse range of industries including [Industries]. Our business model is built on innovation, quality, and sustainability. From raw material sourcing to product delivery, we aim to minimize our environmental footprint and maximize social value. In the current reporting period, we observed the following significant changes in these categories
        </p>
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
      setContent2(value)
    }
    const handleChange=(value)=>{
      setContent3(value)
    }
    return (
        <>
        <div className="mb-2" id="setion2_1" ref={section2_1Ref}>
              <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                2.1 Business Model and Impact 
              </h3>
              
              
            </div>
            <div className="mb-2" id="setion2_1_1" ref={section2_1_1Ref}>
              <p className="text-[15px] text-[#344054] mb-2 font-semibold">
                2.1.1 Activities, Value Chain, and Other Business Relationships
              </p>
              <div className="flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">Edit Statement</p>
            <button className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
        onClick={loadContent2}
        >
          <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/>
          Auto Fill
        </button>
            </div>
            {/* <textarea
            onChange={handleChange}
          value={content3}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        /> */}
         <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content3}
              config={config}
              tabIndex={1}
              onBlur={handleChange}
              />
            </div>
        <div className="text-sm mb-4">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            We are active in the following sectors:</li>
           <p className="mb-4">{content}</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Our value chain encompasses several key stages: 
            <ul className="list-disc ml-4">
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Activities:
                <p className="mb-4 font-normal">{content}</p>
                </li>
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Product:
                <p className="mb-4 font-normal">{content}</p>
                </li>
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Services:
                <p className="mb-4 font-normal">{content}</p>
                </li>
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Market served: 
                <p className="mb-4 font-normal">{content}</p>
                </li>
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Supply chain:
                <p className="mb-4 font-normal">{content}</p>
                </li>
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Entities downstream from the organisation & their activities:
                <p className="mb-4 font-normal">{content}</p>
                </li>
                <li className="text-[15px] text-[#344054] mb-2 font-semibold">
                Other relevant business relationships:
                <p className="mb-4 font-normal">{content}</p>
                </li>
            </ul>
            </li>
            
            </ul>  
        
        </div>

              </div>
              <div className="mb-2" id="setion2_1_2" ref={section2_1_2Ref}>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        2.1.2 Entities Included in the Organization's Sustainability Reporting
        </p>
        <p className="mb-4 font-normal text-sm">{content}</p>
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
              value={content2}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div>
            <p className="text-[15px] text-[#344054] mb-2">
            Each entity adheres to our comprehensive sustainability framework, ensuring consistent ESG practices across our entire organization. 
            </p>
        </div>
              
        </>
    )
}

export default Section2