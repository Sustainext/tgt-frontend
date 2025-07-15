"use client";
import React, { useState, useEffect, useRef } from "react";
import GRISVG from "../../../../../../../public/gri.svg";
import CorrectSVG from "../../../../../../../public/correct.svg";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { GoDownload } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineClear, MdInfoOutline, MdChevronRight } from "react-icons/md";
import { MdExitToApp, MdKeyboardArrowDown } from "react-icons/md";
import NotifyGRI from "./notifyGRIPopup";
import { loadFromLocalStorage } from "../../../../../utils/storage";
import { useRouter } from "next/navigation";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImFileExcel } from "react-icons/im";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const ReportCreatedPopup = ({
  reportname,
  reportid,
  isCreateReportModalOpen,
  setIsCreateReportModalOpen,
  setActiveStep,
  orgName,
  fromDate,
  toDate,
  reportName,
  statement,
  userName,
  userEmail,
  reportType
}) => {
  
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCIDownloading, setIsCIDownloading] = useState(false);
  const [isCIXLDownloading, setIsCIXLDownloading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    if (isHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHovered]);
  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const handleDownloadpdf = async (id, name, contentIndex) => {
    if (contentIndex) {
      setIsCIDownloading(true);
    } else {
      setIsDownloading(true);
    }

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/esg_report/esg_report_pdf/${id}/?content_index=${contentIndex}&download=true`,
        axiosConfig
      );

      if (!response.ok) {
        if (contentIndex) {
          setIsCIDownloading(false);
        } else {
          setIsDownloading(false);
        }
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `${name} ${contentIndex ? " Content Index" : ""}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (contentIndex) {
        setIsCIDownloading(false);
      } else {
        setIsDownloading(false);
        router.push("/dashboard/Report");
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("Error downloading the file", {
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
  const handleDownloadExcel = async (id, name) => {
    let url;
    if(reportType && reportType=='GRI Report: With Reference to'){
       url=`${process.env.BACKEND_API_URL}/esg_report/content_index_reference_excel/${id}/?download=true`
    }
    else{
       url=`${process.env.BACKEND_API_URL}/esg_report/content_index_excel/${id}/?download=true`
    }
   
    setIsCIXLDownloading(true);

    try {
      const response = await fetch(
        url,
        axiosConfig
      );

      if (!response.ok) {
        setIsCIXLDownloading(false);
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${name} Content Index.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsCIXLDownloading(false);
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("Error downloading the file", {
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
      {isCreateReportModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="bg-white p-5 rounded-lg shadow-md xl:w-[45%]">
              {/* <div className="flex justify-between items-center pt-2 w-full">
                <div className="flex justify-between">
                <div className="flex gap-2">
                  <Image
                    src={CorrectSVG}
                    className="w-7 h-7 mr-2"
                    alt="gri-logo"
                  />
                  <div className="relative">
                    <h2 className="self-stretch text-black  text-[18px] font-bold">
                      <span className=" flex mb-1">
                        {" "}
                        {reportName} has been created
                      </span>
                      <p className="text-[14px] text-[#667085] font-normal">
                        To proceed, select an option from the below.
                      </p>
                    </h2>
                    <div></div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <IoMdClose className="w-5 h-5 cursor-pointer" onClick={()=>{setIsCreateReportModalOpen(false)}} />
                </div>
                </div>
                
              </div> */}
              <div className="flex justify-between items-start pt-2 w-full">
  {/* Left side: content */}
  <div className="flex gap-2">
    <Image
      src={CorrectSVG}
      className="w-7 h-7 mr-2"
      alt="gri-logo"
    />
    <div>
      <h2 className="text-black text-[18px] font-bold mb-1">
        {reportName} has been created
      </h2>
      <p className="text-[14px] text-[#667085] font-normal">
        To proceed, select an option from the below.
      </p>
    </div>
  </div>

  {/* Right side: Close icon */}
  <IoMdClose
    className="w-5 h-5 cursor-pointer"
    onClick={() => setIsCreateReportModalOpen(false)}
  />
</div>

              <div className="mt-6 mb-2">
                <div className="relative" ref={dropdownRef}>
                  <button
                    className={`p-4 border w-full border-gray-200 text-[16px] text-[#343A40] flex justify-between ${
                      isHovered ? "" : "mb-3"
                    } rounded-md hover:text-blue-500 hover:border-blue-500 group`}
                    onClick={() => setIsHovered(!isHovered)}
                  >
                    <span className="w-4.5 h-4.5 text-[#667085] mt-1 group-hover:text-blue-500 flex gap-2">
                      <GoDownload className="mt-0.5" />
                      Download Content Index
                    </span>

                    <IoIosArrowDown className="mt-1" />
                  </button>
                  {isHovered && (
                    <div className="absolute z-50 bg-white border border-gray-200 rounded-md shadow-md  w-full">
                      <div
                        className="p-3 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          handleDownloadpdf(reportid, reportname, true);
                        }}
                      >
                        {isCIDownloading ? (
                          <div className="mt-0.5">
                            <Oval
                              height={20}
                              width={20}
                              color="#3b82f6d9"
                              secondaryColor="#f3f3f3"
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          </div>
                        ) : (
                          <BsFileEarmarkPdf className="text-[#667085]" />
                        )}
                        Download PDF
                      </div>
                      <div
                        className="p-3 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          handleDownloadExcel(reportid, reportname);
                        }}
                      >
                        {isCIXLDownloading ? (
                          <div className="mt-0.5">
                            <Oval
                              height={20}
                              width={20}
                              color="#3b82f6d9"
                              secondaryColor="#f3f3f3"
                              strokeWidth={2}
                              strokeWidthSecondary={2}
                            />
                          </div>
                        ) : (
                          <ImFileExcel className="text-[#667085]" />
                        )}
                        Download Excel
                      </div>
                    </div>
                  )}
                </div>
                  {
                    reportType=='GRI Report: In accordance With' && (
                       <button
                  onClick={() => {
                    setIsCreateReportModalOpen(false);
                    setIsNotifyModalOpen(true);
                  }}
                  className="p-4 border w-full border-gray-200 text-[16px] text-[#343A40] rounded-md flex gap-2  hover:text-blue-500 hover:border-blue-500 group"
                >
                  <span className="w-4.5 h-4.5 text-[#667085] mt-1 group-hover:text-blue-500">
                    <IoMailOutline />
                  </span>
                  Notify GRI
                  {showSuccessMessage ? (
                    <IoIosCheckmarkCircle className="w-5 h-5 text-[#54B054] mt-[2px]" />
                  ) : (
                    <></>
                  )}
                </button>
                    )
                  }
               
              </div>

              <div className="flex justify-end mt-5 mb-3">
                <button
                  className="w-auto h-full mr-3  py-2 px-3 bg-transparent text-[#4F4F4F] rounded-[8px] shadow cursor-pointer border border-gray-200 flex gap-2"
                  onClick={() => {
                    router.push("/dashboard/Report");
                  }}
                >
                  <MdExitToApp className="w-4.5 h-4.5 text-[#667085] mt-1" />
                  Exit to Report Module
                </button>
                <button
                  className="w-auto h-full py-2 px-3 bg-[#007EEF] text-white rounded-[8px] shadow  flex gap-2"
                  onClick={() => {
                    handleDownloadpdf(reportid, reportname, false);
                  }}
                >
                  {isDownloading ? (
                    <div className="mt-0.5">
                      <Oval
                        height={20}
                        width={20}
                        color="#FFF"
                        secondaryColor="#f3f3f3"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  ) : (
                    <GoDownload className="w-4.5 h-4.5 text-[#fff] mt-1" />
                  )}
                  Download Report
                  {/* <MdKeyboardArrowDown className="w-5 h-5 text-[#fff] mt-[3px]"/> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <NotifyGRI
        userName={userName}
        userEmail={userEmail}
        orgName={orgName}
        statement={statement}
        showSuccessMessage={showSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
        isNotifyModalOpen={isNotifyModalOpen}
        setIsNotifyModalOpen={setIsNotifyModalOpen}
        setIsCreateReportModalOpen={setIsCreateReportModalOpen}
      />
    </>
  );
};

export default ReportCreatedPopup;
