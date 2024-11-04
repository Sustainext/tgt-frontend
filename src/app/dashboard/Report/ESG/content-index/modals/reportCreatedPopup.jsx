"use client";
import React, { useState,useEffect } from "react";
import GRISVG from "../../../../../../../public/gri.svg";
import CorrectSVG from '../../../../../../../public/correct.svg'
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { GoDownload } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import { MdExitToApp,MdKeyboardArrowDown } from "react-icons/md";
import NotifyGRI from "./notifyGRIPopup";
import { loadFromLocalStorage } from "../../../../../utils/storage";
import { useRouter } from "next/navigation";
import { IoIosCheckmarkCircle } from "react-icons/io";

const ReportCreatedPopup = ({ isCreateReportModalOpen, setIsCreateReportModalOpen,setActiveStep,orgName,fromDate,toDate ,reportName,statement,userName,userEmail}) => {
    const [isNotifyModalOpen,setIsNotifyModalOpen]=useState(false)
    const [showSuccessMessage,setShowSuccessMessage]=useState(false)
    const router=useRouter()
    
  return (
    <>
      {isCreateReportModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="bg-white p-5 rounded-lg shadow-md w-[45%]">
              <div className="flex justify-between items-center pt-2 w-full">
                <div className="flex gap-2">
                  <Image src={CorrectSVG} className="w-7 h-7 mr-2" alt="gri-logo" />
                  <div className="relative">
                  <h2 className="self-stretch text-black  text-[18px] font-bold">
                    <span className=" flex mb-1"> {reportName} has been created
                    
                </span>
                    <p className="text-[14px] text-[#667085] font-normal">To proceed, select an option from the below.</p>
                  </h2>
                  <div>
              </div>
    
                  </div>
                  

                </div>
              </div>
              <div className="mt-6 mb-2">
  <button disabled={true} className="opacity-30 p-4 border w-full border-gray-200 text-[16px] text-[#343A40] mb-3 rounded-md flex gap-2 cursor-not-allowed">
    <span className="w-4.5 h-4.5 text-[#667085] mt-1">
      <GoDownload />
    </span>
    Download Content Index
  </button>
  
  <button 
   
    onClick={() => { 
      setIsCreateReportModalOpen(false);
      setIsNotifyModalOpen(true);
    }} 
    className="p-4 border w-full border-gray-200 text-[16px] text-[#343A40] rounded-md flex gap-2  hover:text-blue-500 hover:border-blue-500 group"
  >
    <span className="w-4.5 h-4.5 text-[#667085] mt-1 group-hover:text-blue-500">
      <IoMailOutline />
    </span>
    Notify GRI
    {
        showSuccessMessage?(
            <IoIosCheckmarkCircle className="w-5 h-5 text-[#54B054] mt-[2px]" />
        ):(
            <></>
        )
    }
   
  </button>
</div>

              <div className="flex justify-end mt-5 mb-3">
              <button className="w-auto h-full mr-3  py-2 px-3 bg-transparent text-[#4F4F4F] rounded-[8px] shadow cursor-pointer border border-gray-200 flex gap-2"
                  onClick={() => {
                   router.push('/dashboard/Report')
                  }}
                  >
                    <MdExitToApp className="w-4.5 h-4.5 text-[#667085] mt-1" />
                    Exit to Report Module
                  </button>
                  <button disabled={true} className="opacity-30 w-auto h-full cursor-not-allowed   py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow  flex gap-2"
                //   onClick={() => {
                //     setIsModalOpen(false);
                //   }}
                  >
                    <GoDownload className="w-4.5 h-4.5 text-[#fff] mt-1"/>
                    Download Report
                    <MdKeyboardArrowDown className="w-5 h-5 text-[#fff] mt-[3px]"/>
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
      <NotifyGRI userName={userName} userEmail={userEmail} orgName={orgName} statement={statement} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} isNotifyModalOpen={isNotifyModalOpen} setIsNotifyModalOpen={setIsNotifyModalOpen} setIsCreateReportModalOpen={setIsCreateReportModalOpen} />
    </>
  );
};
    
export default ReportCreatedPopup;
