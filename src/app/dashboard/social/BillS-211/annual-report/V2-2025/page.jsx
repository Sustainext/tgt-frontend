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
  const goToStep = (step) => {
    setCurrentStep(step);
  };
  const nextStep = () => {
    fetchBillSstap(); // Fetch updated status when moving forward
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

  return (
    <>
      <div className="h-[43rem] overflow-y-auto scrollable-content flex gap-6">
        {/* Sidebar */}
        <div className="w-[285px] mt-10 shadow-lg mb-4">
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
                  circleColor = " bg-white";
                  lineColor = "bg-[#007EEF]";
                  textColor = "text-[#007EEF]";
                  bordercolor = "border-blue-500";
                } else {
                  circleColor = "bg-gray-300";
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
                    {/* Vertical Line */}
                    {index < status.length - 1 && (
                      <div
                        className={`absolute top-14 left-3 transform -translate-y-1/2 w-px h-[60px] ${lineColor}`}
                      />
                    )}

                    {/* Status Circle */}
                    <div
                      className={`w-6 h-6 ${circleColor} rounded-full flex items-center justify-center border-2 transition-all border-b ${bordercolor}`}
                    >
                      {normalizedStatus === "completed" ? (
                        <FaCheck className="w-3 h-3 text-white" />
                      ) : normalizedStatus === "in_progress" ? (
                        <TbPointFilled className="w-14 h-14  text-[#007EEF]" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="ml-8 pl-4">
                      <h3 className={`font-semibold text-sm text-gray-500 `}>
                        Page {step.screen}
                      </h3>
                      <p className={` text-sm ${textColor}`}>{step.status}</p>
                    </div>
                  </li>
                );
              })}
          </ol>
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
