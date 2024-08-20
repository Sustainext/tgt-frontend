"use client";
import React, { useState, useEffect } from "react";
import materialImage from "../../../../../../../public/materiality.jpg"
import Image from "next/image";

const Step2=({data,setCurrentStep})=>{
    return(
        <>
        {data?(
            <div className="mt-3 mb-3">
            <p className="text-[#344054] text-[17px] font-bold pt-4 pb-2 ml-6">
              Selecting ESG Topics
            </p>
            <p className="text-[#2E0B34] text-[14px]  pt-2 pb-2 ml-6">
            Select the check box in the headings of the ESG topics if that particular topic is a material topic. 
            </p>
          </div>
        ):(
          <div className="border mt-4 mx-5 rounded-md">
             <div className="flex justify-center items-center p-3">
                <div>
                  <div  className="flex justify-center items-center my-2 mt-5">
                  <Image
                src={materialImage}
                alt="img"
                width={250}
                height={250}
               
              />
                  </div>
               
                  <div className="mb-4">
                  <p className="text-[24px] font-bold mb-3 text-center">
                  No ESG Topics Selected
                    </p>
                    <p className="text-[16px] text-[#2E0B34] mb-4 text-center">
                    Select ESG Topics from the previous screen to select the GRI disclosures here
                    </p>
                    <button className="w-full h-full  py-2 px-3 text-[#007EEF]  cursor-pointer"
                    onClick={()=>{
                      setCurrentStep(0)
                    }}
                    >
                   {"<"} Back to Select ESG Topics 
                    </button>
                  </div>
                </div>
                  
              </div>
          </div>
        )}
        
        </>
    )
}

export default Step2