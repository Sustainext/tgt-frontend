"use client";
import React, { useState } from "react";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
// import axiosInstance from "../../../utils/axiosMiddleware";
import {  toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "../../../../shared/components/ImageUpload";
import { IoMdDownload } from "react-icons/io";

const UploadFileModal = ({ setRefresh,refresh,isModalOpen, setIsModalOpen,deleteData,selectedRows }) => {

    const handleFileUpload=()=>{

    }
   
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="modal-content-custom relative">
            <div className="flex justify-between items-center mb-2">
    
    <h2 className="text-black text-[18px] font-bold">
    Import Stakeholders list
        </h2>

      <button
        className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
        onClick={()=>{setIsModalOpen(false)}}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <p className="text-[#667085] text-[14px] mb-4">Import Stakeholders to the table from Excel or CSV file</p>

<div>
<p className="text-[#667085] text-[14px] mb-1">Upload Document</p>
    <ImageUpload format={'CSV, Excel'} onFileSelect={handleFileUpload} />
     <button className="text-[14px] text-[#007EEF] font-meduim flex justify-start w-full mt-1">
            <IoMdDownload className=" mt-0.5 mr-1 w-4 h-4"/> Download Template 
          </button>
</div>
<div className="flex justify-end mt-6">
                        <button
                          type="button"
                        //   onClick={()=>{ 
                        //     setGroupCreated(true)
    
                        //   }}
                          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        >
                        Continue
                        </button>
                      </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadFileModal;
