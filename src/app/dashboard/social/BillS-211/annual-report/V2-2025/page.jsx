"use client";
import React, { useState, useEffect } from "react";
import Screenone from "./screen1";
import Screentwo from "./screen2";
import Screenthree from "./screen3";
import Screenfour from "./screen4";
import Screenfive from "./screen5";
import Screensix from "./screen6";
import Screenseven from "./screen7";
import Screenend from "./screen8";
import {
  MdOutlineNavigateNext,
  MdOutlineNavigateBefore,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { FaCheck } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { MdOutlineArrowRight, MdClose } from "react-icons/md";
const ReportingforEntities = ({
  setMobileopen,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
  handleTabClick,
  setView,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const goToStep = (step) => {
    setCurrentStep(step);
    setIsOpenMobile(false); // Close mobile drawer on selection
  };

  const nextStep = () => {
    fetchBillSstap();
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const fetchBillSstap = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/status-report/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );
      if (response.status === 200) {
        setStatus(response.data.reporting_for_entities);
        console.log("Fetched status:", response.data.reporting_for_entities);
      } else {
        toast.error("Oops, something went wrong");
      }
    } catch (error) {
      console.log("Error fetching status:", error);
    }
  };

  useEffect(() => {
    if (
      (reportType === "Organization" && selectedOrg && year) ||
      (reportType !== "Organization" && selectedOrg && selectedCorp && year)
    ) {
      fetchBillSstap();
    }
  }, [selectedCorp, selectedOrg, year]);
  const renderStatusSteps = () => {
    return (
      <ol className="relative">
        {status &&
          status.map((step, index) => {
            let circleColor = "";
            let lineColor = "";
            let textColor = "";
            let bordercolor = "";

            const normalizedStatus = step.status?.toLowerCase();

            if (normalizedStatus === "completed") {
              circleColor = "bg-[#007EEF]";
              lineColor = "bg-[#007EEF]";
              textColor = "text-green-600";
              bordercolor = "border-blue-500";
            } else if (normalizedStatus === "in_progress") {
              circleColor = "bg-white";
              lineColor = "bg-[#007EEF]";
              textColor = "text-[#007EEF]";
              bordercolor = "border-blue-500";
            } else {
              circleColor = "bg-blue-100";
              lineColor = "bg-gray-200";
              textColor = "text-gray-500";
              bordercolor = "border-gray-100";
            }

            return (
              <li
                key={index}
                className="mb-10 ml-4 relative flex items-start cursor-pointer"
                onClick={() => goToStep(index + 1)}
              >
                {index < status.length - 1 && (
                  <div
                    className={`absolute top-14 left-3 transform -translate-y-1/2 w-px h-[60px] ${lineColor}`}
                  />
                )}
                <div
                  className={`w-6 h-6 ${circleColor} rounded-full flex items-center justify-center border-2 transition-all border-b ${bordercolor}`}
                >
                  {normalizedStatus === "completed" ? (
                    <FaCheck className="w-3 h-3 text-white" />
                  ) : normalizedStatus === "in_progress" ? (
                    <TbPointFilled className="w-5 h-5 text-[#007EEF]" />
                  ) : (
                    <div className="w-2 h-2 bg-blue-100 rounded-full"></div>
                  )}
                </div>
                <div className="ml-8 pl-4">
                  <h3 className="font-semibold text-sm text-gray-500">
                    Page {step.screen}
                  </h3>
                  <p className={`text-sm capitalize ${textColor}`}>
                    {step.status
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </p>
                </div>
              </li>
            );
          })}
      </ol>
    );
  };
  return (
    <>
      <button
       className=" xl:hidden lg:hidden md:hidden  bg-transparent text-gray-900 text-[13px]   border border-gray-300  rounded-md flex w-[100px] me-2 py-2 gap-1 px-2 text-center items-center justify-center mb-2 "
        
        onClick={() => setIsOpenMobile(true)}
      >
        Pages <MdOutlineArrowRight className="text-2xl mr-1" />
      </button>

      <div
        className={`fixed -mt-[45px]  left-0 h-full z-10 bg-white shadow-lg transform transition-transform duration-300 ease-in-out w-72 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpenMobile(false)}
            className="text-gray-600 hover:text-black"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>
        <div className="w-[285px] mt-6 mb-4 px-4 block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hideen">
          {renderStatusSteps()}
        </div>
      </div>

      {/* === Main Content Layout === */}
      <div className="h-[42rem] overflow-y-auto scrollable-content  xl:flex lg:flex md:flex 4k:flex 2xl:flex gap-6">
        {/* === Desktop Sidebar === */}
        <div className="w-[285px] mt-4 shadow-lg mb-4 hidden xl:block  lg:block md:block 2xl:block 4k:block">
          {renderStatusSteps()}
        </div>

        {/* Screen Content */}
        <div className="w-full">
          {currentStep === 1 && (
            <Screenone
              nextStep={nextStep}
              selectedCorp={selectedCorp}
              selectedOrg={selectedOrg}
              year={year}
              reportType={reportType}
              status={status}
            />
          )}
          {currentStep === 2 && (
            <Screentwo
              nextStep={nextStep}
              prevStep={prevStep}
              selectedCorp={selectedCorp}
              selectedOrg={selectedOrg}
              year={year}
              reportType={reportType}
              status={status}
            />
          )}
          {currentStep === 3 && (
            <Screenthree
              nextStep={nextStep}
              prevStep={prevStep}
              selectedCorp={selectedCorp}
              selectedOrg={selectedOrg}
              year={year}
              reportType={reportType}
              status={status}
            />
          )}
          {currentStep === 4 && (
            <Screenfour
              nextStep={nextStep}
              prevStep={prevStep}
              selectedCorp={selectedCorp}
              selectedOrg={selectedOrg}
              year={year}
              reportType={reportType}
              status={status}
            />
          )}
          {currentStep === 5 && (
            <Screenfive
              nextStep={nextStep}
              prevStep={prevStep}
              selectedCorp={selectedCorp}
              selectedOrg={selectedOrg}
              year={year}
              reportType={reportType}
              status={status}
            />
          )}
          {currentStep === 6 && (
            <Screensix
              nextStep={nextStep}
              prevStep={prevStep}
              selectedCorp={selectedCorp}
              selectedOrg={selectedOrg}
              year={year}
              reportType={reportType}
              status={status}
            />
          )}
          {currentStep === 7 && (
            <Screenseven
              nextStep={nextStep}
              prevStep={prevStep}
              selectedCorp={selectedCorp}
              selectedOrg={selectedOrg}
              year={year}
              reportType={reportType}
              status={status}
            />
          )}
          {currentStep === 8 && (
            <Screenend
              prevStep={prevStep}
              selectedCorp={selectedCorp}
              selectedOrg={selectedOrg}
              year={year}
              reportType={reportType}
              handleTabClick={handleTabClick}
              setView={setView}
            />
          )}
        </div>
      </div>

      <ToastContainer style={{ fontSize: "12px" }} />
    </>
  );
};

export default ReportingforEntities;
