"use client";
import React, { useState , useEffect } from "react";
import AccordancePopup from "../modals/accordancePopup";

const Accordance=()=>{

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(()=>{
    setIsModalOpen(true)
  },[])
    return (
        <>
        <div className="flex flex-col justify-start overflow-x-hidden ">
          <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
            <div className="w-full">
              <div className="text-left mb-4 ml-3 pt-5">
                <div className="flex">
                  <div>
                    <p className="gradient-text text-[22px] font-bold pt-4 pb-4 ml-3">
                   Select Materiality Topic
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AccordancePopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />
        </>
    )
}
export default Accordance