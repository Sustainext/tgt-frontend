'use client'
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import { MdDownload, MdDelete, MdKeyboardArrowDown, MdFileDownload } from "react-icons/md";
import axiosInstance,{patch} from "../../../../utils/axiosMiddleware";
import Link from 'next/link'
import { GlobalState } from "@/Context/page";

import Screen1 from './sections/section1'

const SustainibilityRoadmap=()=>{
    return (
        <>
        <div className="mx-2 p-2">
            <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
                4. Sustainability Roadmap
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
                <Screen1/>
            </div>
            {/* page sidebar */}
            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky  w-[20%]">
                <p className="text-[11px] text-[#727272] mb-2 uppercase">
               Sustainability Roadmap  
                </p>
                <p className="text-[12px] text-blue-400 mb-2">
               Sustainability Roadmap  
                </p>
            </div>
            </div>
           
           
        </div>
        </>
    )
}

export default SustainibilityRoadmap