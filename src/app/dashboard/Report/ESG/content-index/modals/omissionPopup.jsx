"use client";
import React, { useState } from "react";
import { GlobalState } from "../../../../../../Context/page";
import GRISVG from "../../../../../../../public/gri.svg";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdOutlineClear, MdInfoOutline,MdChevronRight } from "react-icons/md";
import OmissionTable from "../tables/omissionTable";

const OmissionPopup = ({ onSave,reportid, data,isModalOpen, setIsModalOpen,setActiveStep,orgName,fromDate,toDate,isOmissionSubmitted,setIsOmissionSubmitted }) => {
    const { open } = GlobalState();
  return (
    <>
      {isModalOpen && (
        <div className={`modal-overlay z-50 ${open?'ml-[120px]':'mx-auto'} `}>
          <div className="modal-center">
            <div className="bg-white p-5 rounded-lg shadow-md w-auto mt-14">
              <div className="flex justify-between items-center drop-shadow-lg  w-full">
                <div className="flex gap-2">
                  {/* <Image src={GRISVG} className="w-7 h-7 mr-2" alt="gri-logo" /> */}
                  <div>
                  <h2 className="self-stretch text-black  text-[18px] font-bold">
                    <span className=" flex mb-1">GRI Report: In Accordance - Reasons for Omission
                </span>
                   
                  </h2>
                  </div>
                  

                </div>
                <button
                  className="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
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
              <div className="mt-5 w-full">
                <OmissionTable reportid={reportid} onSave={onSave} data={data?data:[]} setIsModalOpen={setIsModalOpen} setIsOmissionSubmitted={setIsOmissionSubmitted} isOmissionSubmitted={isOmissionSubmitted} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OmissionPopup;
