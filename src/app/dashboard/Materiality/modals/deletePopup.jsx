"use client";
import React, { useState } from "react";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import axiosInstance from "../../../utils/axiosMiddleware";
import {  toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const DeletePopup = ({ setRefresh,refresh,isModalOpen, setIsModalOpen,deleteData }) => {

  const handleDelete= async(id)=>{
    const url = `${process.env.BACKEND_API_URL}/materiality_dashboard/materiality-assessments/${id}/`;
    try {
      const response = await axiosInstance.delete(url);
      if(response.status===204){
        toast.success("Deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setRefresh((prevRefresh) => !prevRefresh);
        setIsModalOpen(false);
        
      }
      else{
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      
    }
    catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
   
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="modal-content-custom">
              <div className="flex justify-between items-center drop-shadow-lg pt-6 w-full px-3">
                <div className="flex">
                  <MdOutlineDeleteOutline className="w-7 h-7 mr-2 text-red-400" />
                  <h2 className="self-stretch text-black text-[18px] font-bold">
                    <span>Delete Materiality Assessment</span>
                  </h2>
                </div>

              </div>

              <div className="mb-2 p-4">
                <p className="text-[14px] text-[#667085] font-[400]">
                  <span className="text-[14px] text-[#C62828] mr-1">Warning!</span>
                  This process will delete the entire materiality assessment for
                  the given year. This may affect how the data is collected and
                  reported on the Sustainext platform.
                </p>
                <div>
                  <a
                    className="text-[14px] text-[#2196F3] pt-5 inline-flex"
                    //   href="https://sdgs.un.org/goals/goal7"
                    //   target="_blank"
                  >
                    Learn more
                  </a>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 p-4 mb-4">
                <div className="p-1 mb-2">
                    <span className="text-black text-[14px] font-bold">
                        Organization:
                    </span>
                    <span className="text-[#667085] text-[14px] ml-3">
                        {deleteData.organization}
                    </span>
                </div>
                <div className="p-1 mb-2">
                    <span className="text-black text-[14px] font-bold">
                        Corporate:
                    </span>
                    <span className="text-[#667085] text-[14px] ml-3">
                       {deleteData.corporate}
                    </span>
                </div>
                <div className="p-1 mb-2">
                    <span className="text-black text-[14px] font-bold">
                        Type:
                    </span>
                    <span className="text-[#667085] text-[14px] ml-3">
                    {deleteData.type}
                    </span>
                </div>
                <div className="p-1 mb-2">
                    <span className="text-black text-[14px] font-bold">
                        Period:
                    </span>
                    <span className="text-[#667085] text-[14px] ml-3">
                    {deleteData.period}
                    </span>
                </div>
              </div>
              <div className="p-4">
                  <p className="text-[14px] text-[#667085] font-[400]">
                  Are you sure you want to delete this Materiality Assessment?
                  </p>
                  <div className="flex justify-between mt-5">
                  <button
                  className="w-full h-full mr-2 py-2 px-3 border border-gray-200 text-gray-500 rounded-[8px] shadow cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="w-full h-full mr-2 py-2 px-3 bg-[#EF5350] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={()=>{handleDelete(deleteData.id)}}
                >
                  Yes, Delete
                </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePopup;
