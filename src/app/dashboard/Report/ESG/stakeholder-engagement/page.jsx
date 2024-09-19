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
import StakeholderTable from "./table";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const StakeholderEngagement=()=>{
    const [content,setContent] = useState(
        `Effective stakeholder engagement is vital to [Company Name]'s sustainability strategy and overall business success. We recognize that our actions impact a wide range of stakeholders, including employees, customers, suppliers, investors, local communities, and regulatory bodies`
    )
    return (
        <>
        <div className="mx-2 p-2">
            <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
                6. Stakeholder Engagement 
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <p className="text-[15px] text-[#344054] mb-4">
            Edit Stakeholder Engagement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                6.1 Approach to Stakeholder Engagement
        </h3>

        <div className="text-sm mb-6">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Identification and Prioritization 
            </li>
           <p className="mb-4">{content}</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Stakeholder Categories 
            </li>
            <p className="mb-2">{content}</p>
            </ul>  
        
        </div>

        <div className="mb-6">
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Approach to Stakeholder engagement.
        </p>
        <div className="shadow-md rounded-md">
        <StakeholderTable/>
        </div>
       
        </div>

        <div className="text-sm mb-4">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            We employ a variety of engagement methods tailored to the needs and preferences of different stakeholder groups.
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold ml-4">
            Engagement with stakeholders
            </li>
           <p className="mb-4 ml-4">{content}</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold ml-4">
            Stakeholder’s Feedback
            </li>
            <p className="mb-2 ml-4">{content}</p>
            </ul>  
        
        </div>
        

            </div>
            {/* page sidebar */}
            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky mt-2 w-[20%]">
                <p className="text-[11px] text-[#727272] mb-2 uppercase">
                Stakeholder Engagement 
                </p>
                <p className="text-[12px] text-blue-400 mb-2">
                6.1 Approach to stakeholder engagement. 
                </p>
            </div>
            </div>
           
           
        </div>
        </>
    )
}

export default StakeholderEngagement