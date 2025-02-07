"use client";
import React, { useState } from "react";
import Image from "next/image";
import FormImage from '../../../../../public/forms.png'
import AssessmentImage from '../../../../../public/assessment.png'
import StakeholderImage from '../../../../../public/stakeholder.png'
import { MdAdd } from "react-icons/md";

const NoDataAvailable =({isModalOpen,setIsModalOpen,title,para,buttonText,image})=>{

    return (
        <>
         <div className="flex justify-center items-center p-5">
                <div>
                  <div  className="flex justify-center items-center my-2 mt-5">
                  <Image
                src={image=="assessment"?AssessmentImage:image=="forms"?FormImage:StakeholderImage}
                alt="img"
                width={200}
                height={200}
               
              />
                  </div>
               
                  <div className="mb-4 mt-2">
                  <p className="text-[24px] font-bold mb-3 text-center">
                     {title}
                    </p>
                    <p className="text-[16px] text-[#2E0B34] mb-4 text-center">
                   {para}
                    </p>
                    <div className="flex justify-center align-center">
                    <button className="w-fit h-full  py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer flex">
                    {buttonText} <span className="text-[#fff] text-[21px] font-bold ml-1 text-center mt-0.5">
                        <MdAdd/>
                      </span>
                    
                    </button>
                    </div>
                    
                    
                  </div>
                </div>
                  
              </div>

        </>
    )
}

export default NoDataAvailable