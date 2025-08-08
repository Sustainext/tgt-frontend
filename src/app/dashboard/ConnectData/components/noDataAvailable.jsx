"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdAdd } from "react-icons/md";


const NoDataAvailable =({})=>{


    return (
        <>
         <div className="flex justify-center items-center p-5">
                <div>
                  <div  className="flex justify-center items-center my-2 mt-5">
                  <img
                src='https://sustainextstorage1.blob.core.windows.net/sustainext-frontend-assets/ezgb_nodata.png'
                alt="img"
                width={200}
                height={200}
               
              />
                  </div>
               
                  <div className="mb-4 mt-3">
                  <p className="text-[22px] text-[#2E0B34] font-semibold mb-3 text-center">
                   Coming Soon
                    </p>
                    <p className="text-[14px] text-[#2E0B34] mb-2 text-center">
                  Link your utility accounts through EZGB  to securely import your energy usage data.
                    </p>
                    <div className="flex justify-center align-center">
                    <span>
  <a 
    href="/EZGB"
    target="blank"
    className="text-[#007EEF] underline hover:no-underline font-medium"
  >
    Create a new connection
  </a>
  <span className="text-gray-700 ml-1">to get started</span>
</span>
                    </div>
                    
                    
                  </div>
                </div>
                  
              </div>


              {/* <CreateAssessmentModal  isModalOpen={isAssessmentOpen}
        setIsModalOpen={setIsAssessmentOpen}/>
        <CreateFormModal isModalOpen={isFormOpen} setIsModalOpen={setIsFormOpen}  /> */}
        {/* <CreateStakeholderGroup isModalOpen={isStakeholderGroupOpen} setIsModalOpen={setIsStakeholderGroupOpen} />

        <CreateStakeholder  isModalOpen={isStakeholderOpen} setIsModalOpen={setIsStakeholderOpen} /> */}
    

        </>
    )
}

export default NoDataAvailable
