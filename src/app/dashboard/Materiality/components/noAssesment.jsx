"use client";
import React, { useState } from "react";
import materialImage from "../../../../../public/materiality.jpeg"
import Image from "next/image";
import NewMaterialityAssement from "../modals/newMaterialityAssesment";

const NoAssesment =({isModalOpen,setIsModalOpen})=>{

    return (
        <>
         <div className="flex justify-center items-center p-5">
                <div>
                  <div  className="flex justify-center items-center">
                  <Image
                src={materialImage}
                alt="img"
                width={221}
                height={221}
               
              />
                  </div>
               
                  <div className="mb-4">
                  <p className="text-[24px] font-bold mb-3 text-center">
                      No Assesments
                    </p>
                    <p className="text-[16px] text-[#2E0B34] mb-4 text-center">
                    No materiality assessments made. 
                    </p>
                    <button className="w-full h-full  py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer" onClick={()=>{setIsModalOpen(true)}}>
                    Add New Materiality Assessment +
                    </button>
                  </div>
                </div>
                  
              </div>

              <NewMaterialityAssement isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </>
    )
}

export default NoAssesment