"use client";
import React, { useState } from "react";
import GRISVG from "../../../../../../../public/gri.svg";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdOutlineClear, MdInfoOutline,MdChevronRight } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import {setCurrentReportPage} from '../../../../../../lib/redux/features/reportBuilderSlice'
import { useSelector,useDispatch } from "react-redux";

const StatementPopup = ({reportid, statement,setStatement,handleChange,isModalOpen, setIsModalOpen,setActiveStep,orgName,fromDate,toDate }) => {
    const dispatch=useDispatch()
    const handleSubmit = async () => {
        const data={
            "statement_of_use": statement
           }
       
        const url = `${process.env.BACKEND_API_URL}/esg_report/statement_of_use/${reportid}/`;
        try {
            const response = await axiosInstance.put(url,data);
            if(response.status==200){
                toast.success("Statement saved successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setIsModalOpen(false);
                
            }
            else{
                toast.error("Oops, something went wrong 1", {
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
            
        
        } catch (error) {
            console.error('API call failed:', error);
            toast.error("Oops, something went wrong 2", {
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
    };
  
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="bg-white p-5 rounded-lg shadow-md xl:w-auto w-[95%]">
              <div className="flex justify-between items-center pt-6 w-full">
                <div className="flex gap-2">
                  <Image src={GRISVG} className="w-7 h-7 mr-2" alt="gri-logo" />
                  <div className="relative">
                  <h2 className="self-stretch text-black  text-[18px] font-bold">
                    <span className=" flex mb-1">GRI Statement of Use
                    <MdInfoOutline
                  data-tooltip-id={`tooltip-env`}
                  data-tooltip-html={`<p>To state that the organization has reported in accordance with the GRI Standards, the organization must have
complied with all nine requirements in this section.</p><p>The organization is required to insert the name of the organization and the start and end dates of its reporting
 period in the statement, for example:</p><p>The organization shall include the following statement in its GRI content index: [Name of organization] 
has reported in accordance with the GRI Standards for the period [reporting period start and end dates].</p>`}
                  className="ml-3 mt-[3px] w-[15px] flex-shrink-0"
                />
                {/* Tooltip */}
                <ReactTooltip
                  id={`tooltip-env`}
                  place="left"
                  effect="solid"
                  style={{
                    width: "300px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                  }}
                ></ReactTooltip>
                </span>
                    <p className="text-[14px] text-[#667085] font-normal">Below is the statement of use for the report that will be generated. Edit for any changes required</p>
                  </h2>
                  <div>
              <p className="text-[12px] text-[#4F4F4F] font-[500] pt-4 mb-2">
              Preview
                </p>
                <textarea
            onChange={handleChange}
          value={statement}
          className={` shadow-none border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-2`}
          rows={4}
        />
              </div>
              <div className="flex justify-end mt-3 mb-3">
              <button className="w-auto h-full mr-3  py-2 px-4 bg-transparent text-[#4F4F4F] rounded-[8px] shadow cursor-pointer border border-gray-200"
                  onClick={() => {
                    dispatch(setCurrentReportPage(0))
                  }}
                  >
                    Back to Report
                  </button>
                  <button className="w-auto h-full   py-2 px-4 bg-[#007EEF] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={() => {
                    handleSubmit()
                  }}
                  >
                    Save & Continue
                  </button>
                </div>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    
  );
};

export default StatementPopup;
