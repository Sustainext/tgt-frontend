"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdKeyboardArrowDown,
  MdOutlineInfo,
  MdOutlineCheck,
} from "react-icons/md";
import {
  HiArrowRight,
  HiArrowLeft,
  HiExclamationCircle,
} from "react-icons/hi2";
import { HiOutlineDownload } from "react-icons/hi";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";

import SocialBillS211Header from "../socialBillS211Header";
import { setReportTypes } from "../../../../lib/redux/features/Bills201";
import axiosInstance from "../../../utils/axiosMiddleware";

import Identifyinginformation from "./Identifying-information/page";
import Annualreport from "./annual-report/page";
import CircularProgressBar from "./CircularProgressBar";

const BILLs201 = ({ setMobileopen, handleTabClick }) => {
  const dispatch = useDispatch();

  const [year, setYear] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
  const [view, setView] = useState("home");
  
  const status = "complete";
  const isComplete = status === "complete";

  // New helpers
  const isSubmissionEnabled =  reportType === "Organization"
      ? selectedOrg && year
      : selectedOrg && selectedCorp && year;
  const isReportEnabled =
    reportType === "Organization"
      ? selectedOrg && year
      : selectedOrg && selectedCorp && year;

  useEffect(() => {
    dispatch(setReportTypes("Organization"));
  }, []);

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const fetchBillSone = async () => {
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/status-report/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );
      if (response.status === 200) {
        console.log(response, "data status check");
      } else {
        toast.error("Oops, something went wrong");
      }
    } catch (error) {
      LoaderClose();
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (reportType === "Organization") {
      if (selectedOrg && year) fetchBillSone();
    } else {
      if (selectedOrg && year && selectedCorp) fetchBillSone();
    }
  }, [selectedCorp, selectedOrg, year]);

  const toggleSidebar = () => setMobileopen(true);

  return (
    <>
      {view === "home" && (
        <>
          {/* Desktop Header */}
          <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block">
            <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
              <div className="w-full">
                <div className="text-left mb-2 ml-3 pt-5">
                  <p className="text-[11px]">Social</p>
                  <div className="flex">
                    <p className="gradient-text text-[22px] h-[52px] font-bold pt-1">
                      Bill S-211
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
            <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
              <div
                className="w-full py-4 rounded-md shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)]"
                onClick={toggleSidebar}
              >
                <div className="text-left mb-2 ml-3 pt-5">
                  <p className="text-[11px]">Social</p>
                  <div className="flex">
                    <p className="gradient-text text-[16px] md:text-[20px] h-[52px] font-bold pt-1">
                      Bill S-211
                    </p>
                    <MdKeyboardArrowDown className="text-2xl ms-2 md:-mt-[18px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="container mx-auto mt-5">
            <p className="font-400 text-[17px] mb-4 mx-4 text-[#101828]">
              Fighting Against Forced Labour and Child Labour in Supply Chains Act (Bill S-211)
            </p>
            <p className="text-[12px] mb-4 mx-4 text-[#6D6D6D]">
              Bill S-211 requires Canadian businesses to disclose efforts to prevent forced or child labor in their operations and supply chains. This module helps you collect and format mandatory annual reporting data.
            </p>
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

          {/* Info Banner */}
          <div className="bg-sky-100 mx-2 rounded-md mb-4">
            <div className="flex px-4 py-3">
              <MdOutlineInfo className="text-blue-500" />
              <p className="text-[12px] text-[#101828] ml-4">
                The submission information is mandatory and has to be completed before filling out the reporting for entities.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex mx-4 gap-10 mt-10">
            {/* Step 1 */}
            <div className="bils201box rounded-2xl p-4 w-[400px] shadow-lg">
              <div className="flex justify-between">
                <div className="border rounded-full w-5 h-5 text-center text-[11px]">
                  <p>1</p>
                </div>
                <CircularProgressBar percentage={75} />
              </div>
              <div>
                <p className="text-[14px] text-[#101828] font-medium ">Submission Information</p>
                <p className="text-[11px] text-[#101828] font-medium mb-2">
                  Please fill out the submission information.
                </p>
              </div>
              <div className="my-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    isComplete
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-[#F98845]"
                  }`}
                >
                  {isComplete ? (
                    <MdOutlineCheck className="w-4 h-4 mr-1 text-green-800" />
                  ) : (
                    <HiExclamationCircle className="w-4 h-4 mr-1 text-[#F98845]" />
                  )}
                  {isComplete ? "Completed" : "Incomplete"}
                </span>
              </div>
              <button
                onClick={() => setView("submission")}
                  disabled={!isSubmissionEnabled}
                     className={`w-[80%] inline-flex items-center px-4 py-2 border border-transparent text-[12px] font-medium rounded-md text-white ${
                  isSubmissionEnabled
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isComplete ? (
                  <>
                    Edit Submission Information
                    <HiArrowRight className="ml-2 w-4 h-4" />
                  </>
                ) : (
                  <>
                    <HiArrowLeft className="mr-2 w-4 h-4" />
                    Add Submission Information
                  </>
                )}
              </button>
            </div>

            {/* Step 2 */}
            <div className="bils201box rounded-2xl p-4 w-[400px] shadow-lg">
              <div className="flex justify-between">
                <div className="border rounded-full w-5 h-5 text-center text-[11px]">
                  <p>2</p>
                </div>
                <CircularProgressBar percentage={55} />
              </div>
              <div>
                <p className="text-[14px] text-[#101828] font-medium ">Reporting for Entities</p>
                <p className="text-[11px] text-[#101828] font-medium mb-2">
                  Please fill out the Reporting for Entities.
                </p>
              </div>
              <div className="my-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    isComplete
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-[#F98845]"
                  }`}
                >
                  {isComplete ? (
                    <MdOutlineCheck className="w-4 h-4 mr-1 text-green-800" />
                  ) : (
                    <HiExclamationCircle className="w-4 h-4 mr-1 text-[#F98845]" />
                  )}
                  {isComplete ? "Completed" : "Incomplete"}
                </span>
              </div>
              <button
                onClick={() => setView("report")}
                disabled={!isReportEnabled}
                className={`w-[80%] inline-flex items-center px-4 py-2 border border-transparent text-[12px] font-medium rounded-md text-white ${
                  isReportEnabled
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {isComplete ? (
                  <>
                    Edit Reporting for Entities
                    <HiArrowRight className="ml-2 w-4 h-4" />
                  </>
                ) : (
                  <>
                    <HiArrowLeft className="mr-2 w-4 h-4" />
                    Add Reporting for Entities
                  </>
                )}
              </button>
            </div>

            {/* Step 3 */}
            <div className="bils201box rounded-2xl p-4 w-[400px] shadow-lg">
              <div className="flex justify-between">
                <div className="border rounded-full w-5 h-5 text-center text-[11px]">
                  <p>3</p>
                </div>
              </div>
              <div>
                <p className="text-[14px] text-[#101828] font-medium ">Download Report</p>
                <p className="text-[11px] text-[#101828] font-medium mb-2">
                  Report is ready for download when first two steps are complete
                </p>
              </div>
              <button
                className="w-[80%] mt-10 inline-flex items-center px-4 py-2 border border-transparent text-[12px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <HiOutlineDownload className="mr-2 w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>
        </>
      )}

      {/* Forms */}
      {view === "submission" && (
        <div className="mt-6 mx-4">
          <Identifyinginformation handleTabClick={handleTabClick} setView={setView} />
        </div>
      )}

      {view === "report" && (
        <div className="mt-6 mx-4">
          <Annualreport handleTabClick={handleTabClick} setView={setView} />
        </div>
      )}

      {/* Toast + Loader */}
      <ToastContainer style={{ fontSize: "12px" }} />
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval height={50} width={50} color="#00BFFF" secondaryColor="#f3f3f3" strokeWidth={2} strokeWidthSecondary={2} />
        </div>
      )}
    </>
  );
};

export default BILLs201;
