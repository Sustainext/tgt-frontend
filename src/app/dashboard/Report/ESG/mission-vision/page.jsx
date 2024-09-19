'use client'
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import dynamic from 'next/dynamic';
import { MdDownload, MdDelete, MdKeyboardArrowDown, MdFileDownload } from "react-icons/md";
import axiosInstance,{patch} from "../../../../utils/axiosMiddleware";
import Link from 'next/link'
import { GlobalState } from "@/Context/page";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const MissionVission=()=>{
    const [content, setContent] = useState(`
        Mission<br/>
        At [Company Name], our mission is to innovate and manufacture high-quality products that meet the evolving needs of our customers while promoting sustainability and ethical practices. We are dedicated to creating value for our stakeholders through responsible operations, minimizing our environmental footprint, and fostering a positive social impact.<br/>
        Vision<br/>
        Our vision is to be a global leader in the manufacturing industry, recognized for our commitment to sustainability, innovation, and excellence. We aspire to set new benchmarks in environmental stewardship, social responsibility, and governance, driving progress towards a more sustainable and equitable future for all.<br/>
        Value<br/>
        3.1 Position Statement<br/>
        Climate Change<br/>
        [Company Name] recognizes the urgent need to address climate change and is committed to--<br/>
        Nature<br/>
        Protecting biodiversity and natural resources is a priority for us.
    `);

    // const [content, setContent] = useState(`Mission
    // At [Company Name], our mission is to innovate and manufacture high-quality products that meet the evolving needs of our customers while promoting sustainability and ethical practices. We are dedicated to creating value for our stakeholders through responsible operations, minimizing our environmental footprint, and fostering a positive social impact. 
    // Vision
    // Our vision is to be a global leader in the manufacturing industry, recognized for our commitment to sustainability, innovation, and excellence. We aspire to set new benchmarks in environmental stewardship, social responsibility, and governance, driving progress towards a more sustainable and equitable future for all.
    // Value
    // 3.1 Position Statement
    // Climate Change
    // [Company Name] recognizes the urgent need to address climate change and is committed to
    // Nature
    // Protecting biodiversity and natural resources is a priority for us.`);
    
    
    
    return (
        <>
        <div className="mx-2 p-2">
            <h3 className="text-[22px] text-[#344054] mb-4 text-left">
                3. Mission, Vision, and Values
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <p className="text-[15px] text-[#344054] mb-4">
            Enter data and images related to company awards and recognitions
            </p>
            <div>
              <JoditEditor
                // ref={editor}
                // className="whitespace-pre-wrap"
                value={content}
                // config={config}
                // tabIndex={1} 
                // onBlur={handleEditorChange}
              />
            </div>
            </div>
            {/* page sidebar */}
            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky mt-2 w-[20%]">
                <p className="text-[11px] text-[#727272] mb-2">
                MISSION, VISION, AND VALUES
                </p>
                <p className="text-[12px] text-blue-400 mb-2">
                Mission, Vision, and Values
                </p>
            </div>
            </div>
           
           
        </div>
        </>
    )
}

export default MissionVission