"use client";
import React, { useEffect, useState } from "react";
import GRISVG from "../../../../../../../public/gri.svg";
import CorrectSVG from "../../../../../../../public/correct.svg";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { GoDownload } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineClear, MdInfoOutline, MdChevronRight } from "react-icons/md";
import { MdExitToApp, MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotifyGRI = ({
  isNotifyModalOpen,
  showSuccessMessage,
  setShowSuccessMessage,
  setIsModalOpen,
  setActiveStep,
  orgName,
  statement,
  fromDate,
  toDate,
  reportName,
  setIsCreateReportModalOpen,
  setIsNotifyModalOpen,
  userName,
  pdfLink,
  contentIndexLink,
  userEmail,
}) => {
  
  const [loopen, setLoOpen] = useState(false); 
   const LoaderOpen = () => {
     setLoOpen(true);
   };
 
   const LoaderClose = () => {
     setLoOpen(false);
   };
  const [mailStatement, setStatement] = useState(
  <div>
    <p>Subject: Notification of GRI Standards Use in Sustainability Reporting</p><br />
    <p>Dear GRI Team</p><br />
    <p>
      Sustainext is sending this email on behalf of our client to notify GRI of their use of the GRI Standards in their sustainability reporting. Please find the details of the organization and their report below:
    </p>
    <br /><br />
    <p>Legal Name of the Organization: {orgName}</p>
    <p className="mt-0.5">
      Link to the GRI Content Index:{" "}
      <a
        href={contentIndexLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#2563eb", textDecoration: "underline" }}
      >
        Link
      </a>
    </p>
    <p className="mt-0.5">
      Link to the Report:{" "}
      <a
        href={pdfLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#2563eb", textDecoration: "underline" }}
      >
        Link
      </a>
    </p>
    <p className="mt-0.5">Statement of Use: {statement}</p>
    <p className="mt-0.5">Contact Person: {userName}</p>
    <p className="mt-0.5">Contact Details: {userEmail}</p>
    <br /><br />
    <p>Best regards,</p>
    <p>Team Sustainext</p>
    <br />
  </div>
);

 const reportid =
  typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const notifyGRICount=
typeof window !== "undefined" ? localStorage.getItem("notifyGRICount") : "";
  const [notified, setNotified] = useState(notifyGRICount?true:false);

  const handleNotify=async()=>{
    LoaderOpen()
    try{
      const response = await axiosInstance.post(
        `/esg_report/send-gri-notification/`,
        {
          report_id:reportid
        }
      );
      if(response.status==200){
        setShowSuccessMessage(true);
        window.localStorage.setItem("notifyGRICount", response.data.email_count);
        LoaderClose()
        toast.success("GRI Notification Email sent successfully")
        
      }
      else{
        LoaderClose()
        console.log(response)
        toast.error("Opps! Something went wrong")
      }
    }
    catch(error){
      LoaderClose()
      console.log(error)
      toast.error("Opps! Something went wrong")
    }
  }

  return (
    <>
      {isNotifyModalOpen && (
        <div className="modal-overlay z-50 mt-5">
          <div className="modal-center">
            <div className="bg-white rounded-lg shadow-md xl:w-[45%] h-fit mx-2">
              <div className="w-full shadow-md px-5 py-3">
                <div>
                  <button
                    onClick={() => {
                      setIsNotifyModalOpen(false);
                      setIsCreateReportModalOpen(true);
                    }}
                    className="text-[12px] text-[#667085] flex gap-2 ml-1"
                  >
                    <FaArrowLeftLong className="w-3 h-3 mt-1" />
                    Back to Main Modal
                  </button>
                </div>
                <div className="flex justify-between items-center pt-2 w-full">
                  <div className="flex gap-2">
                    <Image
                      src={GRISVG}
                      className="w-7 h-7 mr-2"
                      alt="gri-logo"
                    />
                    <div className="relative">
                      <h2 className="self-stretch text-black  text-[18px] font-bold">
                        <span className=" flex mb-1"> Notify GRI</span>
                      </h2>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  showSuccessMessage
                    ? "max-h-[550px] overflow-y-auto table-scrollbar"
                    : ""
                }`}
              >
                {showSuccessMessage ? (
                  <div className="mt-3 mb-4 px-5 rounded-md py-2 bg-[#54b0541a] mx-4">
                    <div className="flex gap-2">
                      <Image
                        src={CorrectSVG}
                        className="w-7 h-7 mr-2"
                        alt="gri-logo"
                      />
                      <div className="relative">
                        <h2 className="self-stretch text-black  text-[16px] font-bold">
                          <span className=" flex mb-1">
                            GRI has been Notified
                          </span>
                        </h2>
                        <p className="text-[14px] text-[#051833] font-normal mt-1">
                          Mail has been sent to{" "}
                          <b>reportregistration@globalreporting.org</b> to
                          notify GRI that GRI Standards have been used in this
                          sustainability reporting.
                        </p>
                        <div></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="mt-6 mb-2 px-5">
                  <p className="text-[14px] text-[#667085] font-normal">
                    This action will notify GRI of the use of the GRI Standards
                    in accordance with GRI requirements and the statement of use
                    by sending an email to
                    reportregistration@globalreporting.org.
                  </p>
                </div>
                <div className="mb-2 px-5">
                  <p className="text-[12px] text-[#4F4F4F] font-[500] pt-4 mb-2 ml-1">
                    Preview
                  </p>
                  {/* <textarea
                    value={mailStatement}
                    readOnly
                    className={` shadow-none border appearance-none text-sm border-gray-400 text-[#667085] px-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-2 resize-none`}
                    rows={17}
                  /> */}
                 <div
  className="shadow-none border appearance-none text-sm border-gray-400 text-[#667085] px-2 rounded-md py-2 leading-tight cursor-default w-full mb-2 resize-none bg-white overflow-y-auto"
  style={{ whiteSpace: 'pre-wrap', minHeight: '272px', maxHeight: '100%' }} // 16px * 17 rows ~= 272px
>
  {mailStatement}
</div>
                </div>
                <div className="flex justify-end px-5 mb-4">
                  <button
                    className={`w-auto h-full  py-2 px-4 bg-[#007EEF] text-white rounded-[8px] shadow flex gap-2 
                     
                      `}
                    onClick={handleNotify}
                    
                  >
                    {/* <GoDownload className="w-4.5 h-4.5 text-[#fff] mt-1"/> */}
                    Notify GRI
                    {/* <MdKeyboardArrowDown className="w-5 h-5 text-[#fff] mt-[3px]"/> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loopen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <Oval
                  height={50}
                  width={50}
                  color="#00BFFF"
                  secondaryColor="#f3f3f3"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            )}
    </>
  );
};

export default NotifyGRI;
