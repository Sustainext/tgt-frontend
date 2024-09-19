'use client'
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import { MdDownload, MdDelete, MdKeyboardArrowDown, MdFileDownload } from "react-icons/md";
import axiosInstance,{patch} from "../../../utils/axiosMiddleware";
import Link from 'next/link'
import { GlobalState } from "@/Context/page";

const ESGSidebar=({activeStep})=>{
    return (
        <>
         <div className="m-3 ml-2  border border-r-2 border-b-2 shadow-lg rounded-lg h-auto">
      <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
        <div className="w-full font-medium">
          <div className="flex items-center px-2 py-2 -mt-4  rounded-none focus:outline-none text-[#727272] font-bold">
            <span className="text-[16px] font-[600] p-2">Report Module</span>
          </div>
          <div>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==1?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
          Message from Our Leadership
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==2?"bg-[#007eef0d] p-2 px-5":"bg-transparent  p-2 px-5"}`}
       
          >
          About the Company & Operations 
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==3?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
          Mission, Vision, Value 
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==4?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
          Sustainability Roadmap
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==5?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
          Awards & Alliances 
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==6?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
          Stakeholder Engagement 
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==7?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
         About the Report 
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==8?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
         Materiality
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==9?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
         Corporate Governance 
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==10?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
         Sustainability Journey
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==11?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
        Economic Performance
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==12?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
        Environment
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==13?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
        People
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==14?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
       Community
          </p>
          <p className={`text-[13px] text-[#727272]  my-1 ${activeStep==15?"bg-[#007eef0d] p-2 px-5":"bg-transparent p-2 px-5"}`}
       
          >
        Customers, products & services
          </p>
        </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default ESGSidebar
