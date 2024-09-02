"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'


const CompletePopup = ({ isCompleteModalOpen, setIsCompleteModalOpen }) => {
    const router = useRouter()
  return (
    <>
      {isCompleteModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="modal-content-custom">
              <div className="flex justify-between items-center  pt-6 w-full">
                <div className="flex">
                  <h2 className="self-stretch text-black  text-[18px] font-bold">
                    <span>Changes Made</span>
                  </h2>
                </div>
              </div>
              <div>
              <p className="text-[14px] text-[#667085] font-[400] pt-4">
              Assessment details are updated in the Materiality Dashboard.
              The material topics can now be viewed and edited from the dashboard.
                </p>
              </div>
              <div className="flex justify-center items-center mt-5 mb-3">
                  <button className="w-auto h-full mr-2  py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                 onClick={()=>{
                    router.push('/dashboard/Materiality')
                 }}
                  >
                    Back to Dashboard
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompletePopup;
