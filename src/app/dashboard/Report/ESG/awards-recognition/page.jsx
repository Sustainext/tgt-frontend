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

const AwardsRecognition=()=>{
    return (
        <>
        <div className="mx-2 p-2">
            <h3 className="text-[22px] text-[#344054] mb-4 text-left">
                5. Awards & Recognition
            </h3>
            <div className="flex gap-10">
            <div className="w-[85%]">
            <p className="text-[15px] text-[#344054] mb-4">
            Enter data and images related to company awards and recognitions
            </p>
            <div>
              <JoditEditor
                // ref={editor}
                // value={content}
                // config={config}
                // tabIndex={1} 
                // onBlur={handleEditorChange}
              />
            </div>
            </div>
            {/* page sidebar */}
            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-full mt-2 w-[15%]">
                <p className="text-[11px] text-[#727272] mb-2 uppercase">
               Awards & Recognition
                </p>
                <p className="text-[12px] text-blue-400 mb-2">
               Awards & Recognition
                </p>
            </div>
            </div>
           
           
        </div>
        </>
    )
}

export default AwardsRecognition