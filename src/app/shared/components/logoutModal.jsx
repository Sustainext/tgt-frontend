"use client";
import React, { useState } from "react";
// import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
// import axiosInstance from "../../../utils/axiosMiddleware";
// import {  toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
// import "react-toastify/dist/ReactToastify.css";

const LogoutPopup = ({ isModalOpen, setIsModalOpen,handleLogout }) => {
   
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay z-50">
          <div className="flex justify-center items-end md:items-center w-full h-full md:h-auto">
            <div className="bg-white p-4 rounded-md shadow-md w-full md:w-[30%]">
              <div className="flex justify-between items-center drop-shadow-lg pt-6 w-full px-3">
                <div className="flex">
                  <MdOutlineLogout className="w-7 h-7 mr-2 text-red-400" />
                  <h2 className="self-stretch text-black text-[18px] font-bold">
                    <span>Logout</span>
                  </h2>
                </div>

              </div>

              <div className="p-4">
                  <p className="text-[14px] text-[#667085] font-[400]">
                       
                  </p>
                  <div className="block md:flex md:gap-2 justify-between mt-5">
                  <button
                  className="w-full mb-4 mt-2 md:mb-0 md:mt-0 h-full mr-2 py-2 px-3 bg-[#EF5350] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={()=>{handleLogout()}}
                >
                  Yes, Logout
                </button>
                  <button
                  className="w-full h-full mr-2 py-2 px-3 border border-gray-200 text-gray-500 rounded-[8px] shadow cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
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

export default LogoutPopup;
