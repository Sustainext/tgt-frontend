

"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2=({section2_1_1Ref,section2_1_2Ref,section2_1Ref})=>{
    const [content,setContent]=useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut at ipsum molestias dicta blanditiis harum laborum saepe expedita')
    
    return (
        <>
        <div className="mb-4">
              <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                2.1 Business Model and Impact 
              </h3>
              <div className="mb-2" id="setion2_1_1" ref={section2_1_1Ref}>
              <p className="text-[15px] text-[#344054] mb-2 font-semibold">
                2.1.1 Activities, Value Chain, and Other Business Relationships
              </p>
              <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
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
              
              <div id="setion2_1_2" ref={section2_1_2Ref}>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        2.1.2 Entities Included in the Organization's Sustainability Reporting
        </p>
        <p className="mb-4 font-normal text-sm">{content}</p>
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <div className="mb-4">
              <JoditEditor
              // ref={editor}
              // value={content}
              // config={config}
              // tabIndex={1}
              // onBlur={handleEditorChange}
              />
            </div>
            <p className="text-[15px] text-[#344054] mb-2">
            Each entity adheres to our comprehensive sustainability framework, ensuring consistent ESG practices across our entire organization. 
            </p>
        </div>
            </div>
        </>
    )
}

export default Section2