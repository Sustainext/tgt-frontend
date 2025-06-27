"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaCheckCircle, FaFileAlt } from "react-icons/fa";
import {
  MdDownload,
  MdKeyboardArrowDown,
  MdClose,
  MdKeyboardArrowRight,
} from "react-icons/md";

const DownloadModal = ({
  isOpen = true,
  onClose = () => {},
  onExitToReports = () => {},
  onDownload = () => {},
  reportName = "Report A",
}) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const downloadOptions = [
    { id: "pdf", label: "Download as PDF", icon: FaFileAlt },
    // { id: 'word', label: 'Download as Word', icon: FaFileAlt }
  ];

  const handleDownloadOptionClick = (option) => {
    onDownload(option);
    setShowDownloadOptions(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <div className="flex justify-end p-4 pb-0">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <div className="flex justify-start items-center gap-12">
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {reportName} has been created.
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-gray-600 text-left ml-[6rem] mb-8 text-sm">
              To proceed, select an option from the below.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Exit to Report Module Button */}
              <button
                onClick={onExitToReports}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <FaFileAlt className="w-4 h-4" />
                Exit to Report Module
              </button>

              {/* Download Button with Dropdown */}
              <div className="flex-1 relative">
                <button
                  onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                >
                  <MdDownload className="w-4 h-4" />
                  Download Report
                  <MdKeyboardArrowDown
                    className={`w-4 h-4 transition-transform ${
                      showDownloadOptions ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showDownloadOptions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {downloadOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleDownloadOptionClick(option)}
                          className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                        >
                          <IconComponent className="w-4 h-4" />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Import components
import MessageFromCEO from "./message-from-ceo/page";
// TODO: Add other section imports as they are created
import AboutTheReport from "./about-the-report/page";
import AboutCompanyOperations from "./about-the-company/page";
import Governance from "./governance/page";
import Strategy from "./strategy/page";
import RiskManagement from "./risk-management/page";
import MetricsTargets from "./metrics_targets/page";
import TCFDContentIndex from "./content-index/page";
import Annexure from "./annexure/page";

// Import modals (similar to ESG report)
// import ValidationPopup from "./validation-modals/mainModal";

// Import Redux actions and selectors (you'll need to create TCFD-specific slice)
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../../lib/redux/features/topheaderSlice";

import axiosInstance from "../../../utils/axiosMiddleware";

// TCFD Sidebar
import TCFDSidebar from "./sidebar";

const TCFDReport = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // TCFD sections definition
  const tcfdSections = [
    {
      id: "message_ceo",
      title: "Message from CEO/MD/Chairman",
      mandatory: false,
      enabled: true,
      order: 1,
    },
    {
      id: "about_report",
      title: "About the Report",
      mandatory: false,
      enabled: true,
      order: 2,
    },
    {
      id: "about_company",
      title: "About the Company & Operations",
      mandatory: false,
      enabled: true,
      order: 3,
    },
    {
      id: "governance",
      title: "Governance",
      mandatory: false,
      enabled: true,
      order: 4,
    },
    {
      id: "strategy",
      title: "Strategy",
      mandatory: false,
      enabled: true,
      order: 5,
    },
    {
      id: "risk_management",
      title: "Risk Management",
      mandatory: false,
      enabled: true,
      order: 6,
    },
    {
      id: "metrics_targets",
      title: "Metrics and Targets",
      mandatory: false,
      enabled: true,
      order: 7,
    },
    {
      id: "tcfd_content_index",
      title: "TCFD Content Index",
      mandatory: false,
      enabled: true,
      order: 8,
    },
    {
      id: "annexure",
      title: "Annexure",
      mandatory: false,
      enabled: true,
      order: 9,
    },
  ];

  // Local state
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [reportName, setReportName] = useState("TCFD Report");
  const [userName, setUsername] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [reportid, setReportid] = useState("");
  const [reportType, setReportType] = useState("TCFD Report");
  const [reportCreatedOn, setCreatedOn] = useState("");
  const [orgName, setOrgName] = useState("");
  const [corpName, setCorpName] = useState("");
  const [missing_fields, setMissingFields] = useState([]);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Refs for form submission - mapped to section IDs
  const sectionRefs = {
    message_ceo: useRef(),
    about_report: useRef(),
    about_company: useRef(),
    governance: useRef(),
    strategy: useRef(),
    risk_management: useRef(),
    metrics_targets: useRef(),
    tcfd_content_index: useRef(),
    annexure: useRef(),
  };

  // Get current section
  const currentSection = useMemo(() => {
    return tcfdSections[currentPage] || null;
  }, [currentPage]);

  // Navigation helpers
  const canGoToNext = currentPage < tcfdSections.length - 1;
  const canGoToPrevious = currentPage > 0;

  // Initialize component state
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("TCFD Report"));
  }, [dispatch]);

  useEffect(() => {
    setCreatedOn(localStorage.getItem("reportCreatedOn"));
    setOrgName(localStorage.getItem("reportorgname"));
    setCorpName(localStorage.getItem("reportCorpName"));
    setUsername(localStorage.getItem("userName"));
    setuserEmail(localStorage.getItem("userEmail"));
    setfromDate(localStorage.getItem("reportstartdate"));
    settoDate(localStorage.getItem("reportenddate"));
    setReportid(localStorage.getItem("reportid"));
    if (localStorage.getItem("reportname")) {
      setReportName(localStorage.getItem("reportname"));
    }
  }, []);

  // Navigation handlers
  const handleNextStep = async (type) => {
    const currentRef = sectionRefs[currentSection?.id]?.current;

    const submitAndProceed = async () => {
      if (currentRef && currentRef.submitForm) {
        const isSubmitted = await currentRef.submitForm(type);
        return isSubmitted;
      }
      return true;
    };

    const showDraftSavedToast = () => {
      toast.success(
        <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.4" }}>
          The data filled in the report has been saved as draft and can be
          accessed from the report module
        </p>,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    };

    if (type === "next") {
      const isSubmitted = await submitAndProceed();
      if (isSubmitted) {
        setCurrentPage((prev) => prev + 1);
      }
    } else if (type === "last") {
      const isSubmitted = await submitAndProceed();
      if (isSubmitted) {
        // Handle final submission
        toast.success("Report completed successfully!");
        setIsDownloadModalOpen(true);
      }
    } else {
      const isSubmitted = await submitAndProceed();
      if (isSubmitted) {
        showDraftSavedToast();
        setTimeout(() => {
          router.push("/dashboard/Report");
        }, 4000);
      }
    }
  };

  const handlePreviousStep = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleSectionClick = (sectionIndex) => {
    setCurrentPage(sectionIndex);
    setIsOpenMobile(false);
  };

  const handleDownload = async (reportId) => {
    setIsDownloading(true);

    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/tcfd_framework/get-tcfd-report-pdf/${reportId}/?download=true`,
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token")?.replace(/"/g, ""),
          },
          responseType: "blob", // This is crucial for binary data
        }
      );

      // Create blob from response data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create and trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `tcfd_report_${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);

      // Show user-friendly error message
      toast.error("Failed to download the report. Please try again later.");

      // Log more details for debugging
      if (error.response) {
        console.error(
          "Response error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Add this computed value after your state declarations
  const reportingPeriod = useMemo(() => {
    if (fromDate && toDate) {
      return `${fromDate} to ${toDate}`;
    }
    return "";
  }, [fromDate, toDate]);

  // Component mapping for sections
  const renderSectionComponent = () => {
    if (!currentSection) return null;

    const sectionOrder = currentPage + 1;

    const commonProps = {
      sectionOrder,
      sectionId: currentSection.id,
      sectionTitle: currentSection.title,
      reportType,
    };

    switch (currentSection.id) {
      case "message_ceo":
        return (
          <MessageFromCEO ref={sectionRefs.message_ceo} {...commonProps} />
        );
      // TODO: Add other cases as components are created
      case "about_report":
        return (
          <AboutTheReport ref={sectionRefs.about_report} {...commonProps} />
        );
      case "about_company":
        return (
          <AboutCompanyOperations
            ref={sectionRefs.about_company}
            {...commonProps}
          />
        );
      case "governance":
        return <Governance ref={sectionRefs.governance} {...commonProps} />;
      case "strategy":
        return <Strategy ref={sectionRefs.strategy} {...commonProps} />;
      case "risk_management":
        return (
          <RiskManagement ref={sectionRefs.risk_management} {...commonProps} />
        );
      case "metrics_targets":
        return (
          <MetricsTargets ref={sectionRefs.metrics_targets} {...commonProps} />
        );
      case "tcfd_content_index":
        return (
          <TCFDContentIndex
            ref={sectionRefs.tcfd_content_index}
            {...commonProps}
          />
        );
      case "annexure":
        return <Annexure ref={sectionRefs.annexure} {...commonProps} />;
      default:
        return (
          <div className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">
              {currentSection.title}
            </h2>
            <p className="text-gray-500">
              This section is under development. Please check back later.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="m-3 ml-2 border border-r-2 border-b-2 shadow-lg rounded-lg h-full hidden xl:block lg:block">
          <div className="flex items-start py-4 min-h-[84vh] rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
            <TCFDSidebar
              setIsOpenMobile={setIsOpenMobile}
              isOpenMobile={isOpenMobile}
              allSections={tcfdSections}
              currentPage={currentPage}
              onSectionClick={handleSectionClick}
            />
          </div>
        </div>

        <div className="w-full mb-5">
          <div className="flex flex-col justify-start overflow-x-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 mb-3 w-full">
              <div className="w-[70%]">
                <div className="text-left mb-3 ml-3 pt-3">
                  <div className="flex">
                    <div>
                      <button
                        onClick={() => {
                          router.push("/dashboard/Report");
                        }}
                        className="text-[12px] text-[#667085] flex gap-2 ml-3"
                      >
                        <FaArrowLeftLong className="w-3 h-3 mt-1" />
                        Back to Reports
                      </button>

                      {/* Mobile section */}
                      <div className="xl:hidden lg:hidden">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsOpenMobile(true)}
                            className="text-gray-700"
                          >
                            <MdKeyboardArrowRight className="h-6 w-6 text-black" />
                          </button>
                          <div>
                            <p className="gradient-text text-[22px] font-bold pt-3">
                              {reportName}
                            </p>
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Organization{corpName ? " / Corporate" : ""}:{" "}
                              {orgName} {corpName ? " / " : ""}
                              {corpName}{" "}
                            </p>
                            <p className="text-[#667085] text-[13px]">
                              Reporting Period: {reportingPeriod}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop section */}
                      <div className="hidden xl:block lg:block">
                        <p className="gradient-text text-[22px] font-bold pt-3 ml-3">
                          {reportName}
                        </p>
                        <div className="flex items-center gap-4 mt-2 ml-3">
                          <p className="text-[#667085] text-[13px]">
                            Organization{corpName ? " / Corporate" : ""}:{" "}
                            {orgName} {corpName ? " / " : ""}
                            {corpName}
                          </p>
                          {reportingPeriod && (
                            <>
                              <span className="text-[#667085] text-[16px]">
                                |
                              </span>
                              <p className="text-[#667085] text-[13px]">
                                Reporting Period: {reportingPeriod}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:block lg:block xl:block">
                <div
                  className={`float-right ${
                    currentPage === 4 ? "mr-[10rem]" : "mr-2"
                  } flex items-center justify-center`}
                >
                  <div className="flex items-center justify-center">
                    <button
                      style={{
                        display: !canGoToPrevious ? "none" : "inline-block",
                      }}
                      className="text-gray-500 px-3 py-1.5 rounded font-semibold w-[120px]"
                      onClick={handlePreviousStep}
                      disabled={!canGoToPrevious}
                    >
                      &lt; Previous
                    </button>

                    {canGoToNext ? (
                      <button
                        className="bg-blue-500 text-white px-3 py-1.5 rounded ml-2 font-semibold w-[100px]"
                        onClick={() => handleNextStep("next")}
                      >
                        Next &gt;
                      </button>
                    ) : (
                      <button
                        onClick={() => handleNextStep("last")}
                        className="flex w-[200px] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                      >
                        Complete Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="block md:hidden lg:hidden xl:hidden mb-2 h-[43px]">
            <div className="float-right mr-2 flex items-center justify-center mb-2">
              <div className="flex items-center justify-center">
                {canGoToPrevious && (
                  <button
                    className="text-gray-500 px-3 py-1.5 rounded font-semibold"
                    onClick={handlePreviousStep}
                  >
                    &lt; Previous
                  </button>
                )}

                {canGoToNext ? (
                  <button
                    className="bg-blue-500 text-white px-3 py-1.5 rounded ml-2 font-semibold w-[100px]"
                    onClick={() => handleNextStep("next")}
                  >
                    Next &gt;
                  </button>
                ) : (
                  <button
                    onClick={() => handleNextStep("last")}
                    className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                  >
                    Complete Report
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="xl:mx-3 md:mx-3 lg:mx-3 4k:mx-3 2k:mx-3 2xl:mx-3 my-2">
            <div>{renderSectionComponent()}</div>
          </div>
        </div>
      </div>

      {/* Mobile overlay for sidebar */}
      {isOpenMobile && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setIsOpenMobile(false)}
          />
          <div
            className={`fixed top-[7rem] left-0 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 w-72`}
          >
            <div className="p-4">
              <TCFDSidebar
                setIsOpenMobile={setIsOpenMobile}
                isOpenMobile={true}
                allSections={tcfdSections}
                currentPage={currentPage}
                onSectionClick={handleSectionClick}
              />
            </div>
          </div>
        </>
      )}

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onExitToReports={() => {
          router.push("/dashboard/Report");
        }}
        onDownload={() => handleDownload(reportid)}
        reportName="TCFD Report"
      />

      <ToastContainer />
    </>
  );
};

export default TCFDReport;
