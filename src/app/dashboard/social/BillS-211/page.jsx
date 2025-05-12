"use client";
import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdKeyboardArrowDown, MdOutlineInfo } from "react-icons/md";
import SocialBillS211Header from "../socialBillS211Header";
import { setReportTypes } from "../../../../lib/redux/features/Bills201";
import { useDispatch, useSelector } from "react-redux";
import Identifyinginformation from "./Identifying-information/page";
import CircularProgressBar from "./CircularProgressBar"
const BILLs201 = ({ setMobileopen, handleTabClick, setActiveTab }) => {
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setMobileopen(true);
  };
  const [year, setYear] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [reportType, setReportType] = useState("Organization");
  useEffect(() => {
    dispatch(setReportTypes("Organization"));
  }, []);

  // State to keep track of selected options

  // Handler for checkbox change

  return (
    <>
      {selectedOrg && year ? (
        // Show only Identifyinginformation when both are selected
        <Identifyinginformation
          handleTabClick={handleTabClick}
          setSelectedOrgnew={setSelectedOrg}
          setSelectedCorpnew={setSelectedCorp}
          setYearnew={setYear}
          setActiveTab={setActiveTab}
        />
      ) : (
        // Show the rest of the UI when selection is not complete
        <>
          <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block">
            <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
              <div className="w-full">
                <div className="text-left mb-2 ml-3 pt-5">
                  <p className="text-[11px]">Social</p>
                  <div className="flex">
                    <div className="h-[29px]">
                      <p className="gradient-text text-[22px] h-[52px] font-bold pt-1">
                        Bill S-211
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
            <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
              <div
                className="w-full py-4 rounded-md shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)]"
                onClick={toggleSidebar}
              >
                <div className="text-left mb-2 ml-3 pt-5">
                  <p className="text-[11px]">Social</p>
                  <div className="flex">
                    <div className="h-[50px]">
                      <p className="gradient-text text-[16px] md:text-[20px] h-[52px] font-bold pt-1">
                        Bill S-211
                      </p>
                    </div>
                    <div className="flex items-center me-5">
                      <MdKeyboardArrowDown className="text-2xl float-end md:-mt-[18px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-5">
            <div className="flex">
              <div className="">
                <p className="font-400 text-[17px] mb-4 mx-4 text-[#101828]">
                  {" "}
                  Fighting Against Forced Labour and Child Labour in Supply
                  Chains Act (Bill S-211)
                </p>
                <p className="text-[12px] mb-4 mx-4 text-[#6D6D6D]">
                  {" "}
                  Bill S-211 (Fighting Against Forced Labour and Child Labour in
                  Supply Chains Act) requires Canadian businesses to disclose
                  efforts to prevent forced or child labor in their operations
                  and supply chains. This module helps you collect and format
                  mandatory annual reporting data
                </p>
              </div>
            </div>
          </div>
          <SocialBillS211Header
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
            selectedCorp={selectedCorp}
            setSelectedCorp={setSelectedCorp}
            year={year}
            setYear={setYear}
            reportType={reportType}
            setReportType={setReportType}
          />
        </>
      )}
      <div className=" bg-sky-100 mx-2 rounded-md mb-4">
        <div className="flex px-4 py-3">
          <MdOutlineInfo className=" text-blue-500 " />
          <p className="text-[12px] text-[#101828] ml-4">
            The submission information is mandatory and has to be completed
            before filling out the reporting for entities.
          </p>
        </div>
      </div>
<div>
  <div className="flex justify-between">
<div className=" shadow-md rounded-md">
  <div className="flex justify-between">
<div className="border rounded-full w-5 h-5 text-center">
  <p className=" ">1</p>
</div>
<div>
   <CircularProgressBar percentage={75} />
</div>
  </div>

</div> 
<div className=" shadow-md rounded-md">
  <div className="flex justify-between">
<div>
  <p className=" border rounded">1</p>
</div>
<div>
   <CircularProgressBar percentage={75} />
</div>
  </div>

</div>
<div className=" shadow-md rounded-md">
  <div className="flex justify-between">
<div>
  <p className=" border rounded">1</p>
</div>
<div>
   <CircularProgressBar percentage={75} />
</div>
  </div>

</div>
  </div>
</div>
      <ToastContainer style={{ fontSize: "12px" }} />
    </>
  );
};

export default BILLs201;
