"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// Import components
import MissionVission from "./mission-vision/page";
import AwardsRecognition from "./awards-recognition/page";
import SustainibilityRoadmap from "./sustainibility-roadmap/page";
import Companyoperations from "./company-operations/page";
import StakeholderEngagement from "./stakeholder-engagement/page";
import AboutTheReport from "./about-report/page";
import Materiality from "./materilality/page";
import ReferenceMateriality from "./reference-materiality/page";
import SustainibilityJourney from "./sustainibility-journey/page";
import CorporateGovernance from "./corporate-governance/page";
import Community from "./community/page";
import EconomicPerformance from "./economic-performance/page";
import CustomerProductService from "./customer-product-services/page";
import People from "./people/page";
import MessageFromCEO from "./message-from-ceo/page";
import ContentIndex from "./content-index/page";
import Environment from "./environment/page";
import ReferenceMaterialTopic from "./referenceMaterialTopic/page";
import RefereceContentIndex from './referenceContentIndex/page';

// Import modals
import OmissionPopup from "./content-index/modals/omissionPopup";
import ReportCreatedPopup from "./content-index/modals/reportCreatedPopup";
import MainValidationPopup from "./validation-modals/mainModal";

// Import Redux actions and selectors
import {
  selectSections,
  selectSubsections,
  selectSelectedSubsections,
  setSections,
  setSelectedSubsections,
  selectCurrentReportPage,
  selectCurrentReportSection,
  selectCanGoToNextPage,
  selectCanGoToPreviousPage,
  nextReportPage,
  previousReportPage,
  setCurrentReportPage,
} from "../../../../lib/redux/features/reportBuilderSlice";

import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../../lib/redux/features/topheaderSlice";

import axiosInstance from "../../../utils/axiosMiddleware";

// Custom ESG Sidebar
import UnifiedESGSidebar from "../CustomESGReport/components/sidebar";

const ESGReport = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Redux state
  const allSections = useSelector(selectSections);
  const allSubsections = useSelector(selectSubsections);
  const selectedSubsections = useSelector(selectSelectedSubsections);
  const currentReportPage = useSelector(selectCurrentReportPage);
  const currentSection = useSelector(selectCurrentReportSection);
  const canGoToNext = useSelector(selectCanGoToNextPage);
  const canGoToPrevious = useSelector(selectCanGoToPreviousPage);

  // Local state
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateReportModalOpen, setIsCreateReportModalOpen] = useState(false);
  const [isOmissionSubmitted, setIsOmissionSubmitted] = useState(true);
  const [IsValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [reportName, setReportName] = useState("Report");
  const [userName, setUsername] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [reportid, setReportid] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportCreatedOn, setCreatedOn] = useState("");
  const [orgName, setOrgName] = useState("");
  const [corpName, setCorpName] = useState("");
  const [missing_fields, setMissingFields] = useState([]);

  // Refs for form submission
  const messageFromCeoRef = useRef();
  const aboutTheCompany = useRef();
  const missionVision = useRef();
  const sustainibilityRoadmap = useRef();
  const awardAlliances = useRef();
  const stakeholderEngagement = useRef();
  const aboutReport = useRef();
  const materiality = useRef();
  const corporateGovernance = useRef();
  const sustainabilityJourney = useRef();
  const environment = useRef();
  const community = useRef();
  const economicperformance = useRef();
  const people = useRef();
  const customers = useRef();

  const stepRefs = {
    1: messageFromCeoRef,
    2: aboutTheCompany,
    3: missionVision,
    4: sustainibilityRoadmap,
    5: awardAlliances,
    6: stakeholderEngagement,
    7: aboutReport,
    8: materiality,
    9: corporateGovernance,
    10: sustainabilityJourney,
    12: environment,
    14: community,
    11: economicperformance,
    13: people,
    15: customers,
  };

  // State to track if initialization has been done
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Redux state based on report type
  useEffect(() => {
    const initializeReportState = () => {
      if (reportType === 'Custom ESG Report') {
        // For custom reports, load from localStorage if available
        // const savedSections = JSON.parse(localStorage.getItem('report_sections') || '[]');
        // const savedSubsections = JSON.parse(localStorage.getItem('report_subsections') || '{}');
        const savedSections = [];
        const savedSubsections = [];
        
        if (savedSections.length > 0) {
          dispatch(setSections(savedSections));
        }
        if (Object.keys(savedSubsections).length > 0) {
          dispatch(setSelectedSubsections(savedSubsections));
        }
      } else {
        // For non-custom reports, enable all sections and select all subsections
        const enabledSections = allSections.map(section => ({
          ...section,
          enabled: true
        }));
        
        // Default subsection selections for all sections
        const defaultSubsections = {};
        Object.keys(allSubsections).forEach(sectionId => {
          const sectionSubsections = allSubsections[sectionId] || [];
          const collectIds = (subs) => 
            subs.flatMap((s) => [
              s.id,
              ...(s.children ? collectIds(s.children) : [])
            ]);
          defaultSubsections[sectionId] = collectIds(sectionSubsections);
        });
        
        dispatch(setSections(enabledSections));
        dispatch(setSelectedSubsections(defaultSubsections));
      }
      setIsInitialized(true);
    };

    if (reportType && !isInitialized) {
      initializeReportState();
    }
  }, [reportType, isInitialized, dispatch]);

  // Get sections and subsections to display based on report type
  const sectionsToDisplay = useMemo(() => {
    if (reportType === 'Custom ESG Report') {
      return allSections.filter(section => section.enabled);
    } else {
      return allSections;
    }
  }, [reportType, allSections]);

  const subsectionsToDisplay = useMemo(() => {
    if (reportType === 'Custom ESG Report') {
      return selectedSubsections;
    } else {
      // Return all subsections for non-custom reports
      const allSelectedSubsections = {};
      Object.keys(allSubsections).forEach(sectionId => {
        const sectionSubsections = allSubsections[sectionId] || [];
        const collectIds = (subs) => 
          subs.flatMap((s) => [
            s.id,
            ...(s.children ? collectIds(s.children) : [])
          ]);
        allSelectedSubsections[sectionId] = collectIds(sectionSubsections);
      });
      return allSelectedSubsections;
    }
  }, [reportType, selectedSubsections, allSubsections]);

  // Component mapping for custom reports
  const sectionComponents = {
    message_ceo: MessageFromCEO,
    about_company: Companyoperations,
    mission_vision: MissionVission,
    sustainability: SustainibilityRoadmap,
    awards: AwardsRecognition,
    stakeholder: StakeholderEngagement,
    about_report: AboutTheReport,
    governance: CorporateGovernance,
    journey: SustainibilityJourney,
    economic: EconomicPerformance,
    environment: Environment,
    people: People,
    community: Community,
    customers: CustomerProductService,
    materiality: Materiality,
  };

  // Initialize component state
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("ESG Report"));
  }, [dispatch]);

  useEffect(() => {
    setCreatedOn(localStorage.getItem("reportCreatedOn"));
    setOrgName(localStorage.getItem("reportorgname"));
    setCorpName(localStorage.getItem('reportCorpName'));
    setUsername(localStorage.getItem("userName"));
    setuserEmail(localStorage.getItem("userEmail"));
    setfromDate(localStorage.getItem("reportstartdate"));
    settoDate(localStorage.getItem("reportenddate"));
    setReportid(localStorage.getItem("reportid"));
    setReportType(localStorage.getItem("reportType") || "");
    if (localStorage.getItem("reportname")) {
      setReportName(localStorage.getItem("reportname"));
    }
  }, []);

  // Custom report navigation handlers
  const handleCustomNextStep = () => {
    if (canGoToNext) {
      dispatch(nextReportPage());
    }
  };

  const handleCustomPreviousStep = () => {
    if (canGoToPrevious) {
      dispatch(previousReportPage());
    }
  };

  // Original report navigation handlers
  const loadMissingFields = async () => {
    const url = `${process.env.BACKEND_API_URL}/esg_report/get_field_validation/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status == 200) {
        if (response.data.length > 0) {
          setMissingFields(response.data);
          setIsValidationModalOpen(true);
        } else {
          setActiveStep((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const handleNextStep = async (type) => {
    const currentRef = stepRefs[activeStep]?.current;

    const submitAndProceed = async () => {
      if (currentRef) {
        const isSubmitted = await currentRef.submitForm(type);
        return isSubmitted;
      }
      return true;
    };

    const showDraftSavedToast = () => {
      toast.success(
        <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.4" }}>
          The data filled in the report has been saved as draft and can be accessed from the report module
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
        setActiveStep((prev) => prev + 1);
      }
    } else if (type === "last") {
      const isSubmitted = await submitAndProceed();
      if (isSubmitted) {
        loadMissingFields();
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
    setActiveStep((prev) => prev - 1);
  };

  // Render custom report section
  const renderCustomReportSection = () => {
    if (!currentSection) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No section available</p>
        </div>
      );
    }

    const SectionComponent = sectionComponents[currentSection.id];
    
    if (!SectionComponent) {
      return (
        <div className="p-4 border border-red-300 rounded mb-4">
          <h2 className="text-lg font-bold text-red-600">
            Component Missing: {currentSection.title}
          </h2>
          <p className="text-sm text-gray-600">
            Please add the component for "{currentSection.id}" to the sectionComponents mapping.
          </p>
        </div>
      );
    }

    const sectionSubsections = subsectionsToDisplay[currentSection.id] || [];
    const sectionOrder = currentReportPage + 1;
    
    return (
      <div className="min-h-[400px]">
        <SectionComponent
          ref={stepRefs[sectionOrder]}
          subsections={sectionSubsections}
          sectionId={currentSection.id}
          sectionTitle={currentSection.title}
          sectionOrder={sectionOrder}
          onSubmitSuccess={(success) => {
            console.log('Section submitted:', success);
          }}
        />
      </div>
    );
  };

  // Render original report sections
  const renderOriginalReportSections = () => {
    return (
      <>
        {activeStep === 1 && <MessageFromCEO ref={messageFromCeoRef} />}
        {activeStep === 2 && <Companyoperations ref={aboutTheCompany} />}
        {activeStep === 3 && <MissionVission ref={missionVision} />}
        {activeStep === 4 && <SustainibilityRoadmap ref={sustainibilityRoadmap} />}
        {activeStep === 5 && <AwardsRecognition ref={awardAlliances} />}
        {activeStep === 6 && <StakeholderEngagement ref={stakeholderEngagement} />}
        {activeStep === 7 && <AboutTheReport ref={aboutReport} />}
        {activeStep === 8 && (
          reportType === 'GRI Report: With Reference to' ? 
            <ReferenceMateriality ref={materiality} /> : 
            <Materiality ref={materiality} />
        )}
        {activeStep === 9 && <CorporateGovernance ref={corporateGovernance} reportType={reportType} />}
        {activeStep === 10 && <SustainibilityJourney ref={sustainabilityJourney} reportType={reportType} />}
        {activeStep === 11 && <EconomicPerformance ref={economicperformance} reportType={reportType} />}
        {activeStep === 12 && <Environment ref={environment} reportType={reportType} />}
        {activeStep === 13 && <People ref={people} reportType={reportType} />}
        {activeStep === 14 && <Community ref={community} reportType={reportType} />}
        {activeStep === 15 && <CustomerProductService ref={customers} reportType={reportType} />}
        {activeStep >= 16 && (
          reportType === 'GRI Report: With Reference to' && activeStep === 16 ? 
            <ReferenceMaterialTopic /> : 
            (reportType === 'GRI Report: With Reference to' && activeStep === 17 ? 
              <RefereceContentIndex
                reportName={reportName}
                setActiveStep={setActiveStep}
                isOmissionSubmitted={isOmissionSubmitted}
                isOmissionModalOpen={isModalOpen}
                setIsOmissionModalOpen={setIsModalOpen}
                isCreateReportModalOpen={isCreateReportModalOpen}
                setIsCreateReportModalOpen={setIsCreateReportModalOpen}
                setIsOmissionSubmitted={setIsOmissionSubmitted}
              /> : 
              <ContentIndex
                reportName={reportName}
                setActiveStep={setActiveStep}
                isOmissionSubmitted={isOmissionSubmitted}
                isOmissionModalOpen={isModalOpen}
                setIsOmissionModalOpen={setIsModalOpen}
                isCreateReportModalOpen={isCreateReportModalOpen}
                setIsCreateReportModalOpen={setIsCreateReportModalOpen}
                setIsOmissionSubmitted={setIsOmissionSubmitted}
              />)
        )}
      </>
    );
  };

  const isCustomReport = reportType === 'Custom ESG Report';
  const shouldShowSidebar = !isCustomReport || (isCustomReport && activeStep < 17);

  return (
    <>
      <div className="flex">
        {shouldShowSidebar && (
          <UnifiedESGSidebar
            setIsOpenMobile={setIsOpenMobile}
            isOpenMobile={isOpenMobile}
            reportType={reportType}
            allSections={allSections}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        )}

        <div className="w-full mb-5">
          <div className="flex flex-col justify-start overflow-x-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 mb-3 w-full">
              <div className="w-[70%]">
                <div className="text-left mb-3 ml-3 pt-3">
                  <div className="flex">
                    <div>
                      <button
                        onClick={() => {
                          if (isCustomReport || activeStep > 15) {
                            router.push("/dashboard/Report");
                          } else {
                            handleNextStep("back");
                          }
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
                              {orgName}{" "}{corpName ? ' / ' : ''}{corpName}{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop section */}
                      <div className="hidden xl:block lg:block">
                        <p className="gradient-text text-[22px] font-bold pt-3 ml-3">
                          {reportName}
                        </p>
                        <p className="mt-2 text-[#667085] text-[13px] ml-3">
                          Organization{corpName ? " / Corporate" : ""}:{" "}
                          {orgName}{" "}{corpName ? ' / ' : ''}{corpName}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:block lg:block xl:block">
                <div className="float-right mr-2 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    {isCustomReport ? (
                      // Custom report navigation
                      <>
                        <button
                          onClick={handleCustomPreviousStep}
                          disabled={!canGoToPrevious}
                          className={`px-3 py-1.5 rounded font-semibold w-[120px] ${
                            canGoToPrevious ? "text-gray-500" : "text-gray-300"
                          }`}
                          style={{ display: !canGoToPrevious ? "none" : "inline-block" }}
                        >
                          &lt; Previous
                        </button>
                        <button
                          onClick={handleCustomNextStep}
                          disabled={!canGoToNext}
                          className={`px-3 py-1.5 rounded ml-2 font-semibold w-[100px] ${
                            canGoToNext ? "bg-blue-500 text-white" : "bg-gray-300"
                          }`}
                        >
                          Next &gt;
                        </button>
                      </>
                    ) : (
                      // Original report navigation
                      <>
                        {activeStep !== 17 && (
                          <button
                            style={{
                              display: (activeStep === 1) || (activeStep === 16 && reportType === 'GRI Report: In accordance With') ? "none" : "inline-block",
                            }}
                            className={`${activeStep === 1 ? "" : "text-gray-500"} px-3 py-1.5 rounded font-semibold w-[120px]`}
                            onClick={handlePreviousStep}
                            disabled={activeStep === 1}
                          >
                            &lt; Previous
                          </button>
                        )}

                        {(activeStep === 16 && reportType === 'GRI Report: In accordance With') || activeStep === 17 ? (
                          <div>
                            {reportType === 'GRI Report: In accordance With' ? (
                              <div>
                                {isOmissionSubmitted ? (
                                  <button
                                    onClick={() => setIsCreateReportModalOpen(true)}
                                    className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                                  >
                                    Save and Create Report {">"}
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                                  >
                                    Add Reasons for Omission {">"}
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div>
                                <button
                                  onClick={() => setIsCreateReportModalOpen(true)}
                                  className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                                >
                                  Save and Create Report {">"}
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            {activeStep < 15 ? (
                              <button
                                className={`${
                                  activeStep === 15 ? "bg-gray-300" : "bg-blue-500 text-white"
                                } px-3 py-1.5 rounded ml-2 font-semibold w-[100px]`}
                                onClick={() => handleNextStep("next")}
                                disabled={activeStep === 15}
                              >
                                Next &gt;
                              </button>
                            ) : (
                              <div>
                                {reportType === 'GRI Report: With Reference to' && activeStep === 15 ? (
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
                                    Save & Fill Content Index
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          {!isCustomReport && (
            <div className="block md:hidden lg:hidden xl:hidden mb-2 h-[43px]">
              <div className="float-right mr-2 flex items-center justify-center mb-2">
                <div className="flex items-center justify-center">
                  {activeStep !== 16 && (
                    <button
                      style={{ display: activeStep === 1 ? "none" : "inline-block" }}
                      className={`${activeStep === 1 ? "" : "text-gray-500"} px-3 py-1.5 rounded font-semibold`}
                      onClick={handlePreviousStep}
                      disabled={activeStep === 1}
                    >
                      &lt; Previous
                    </button>
                  )}

                  {activeStep === 16 ? (
                    <div>
                      {isOmissionSubmitted ? (
                        <button
                          onClick={() => setIsCreateReportModalOpen(true)}
                          className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                        >
                          Save and Create Report {">"}
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                        >
                          Add Reasons for Omission {">"}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {activeStep < 15 ? (
                        <button
                          className={`${
                            activeStep === 15 ? "bg-gray-300" : "bg-blue-500 text-white"
                          } px-3 py-1.5 rounded ml-2 font-semibold w-[100px]`}
                          onClick={() => handleNextStep("next")}
                          disabled={activeStep === 15}
                        >
                          Next &gt;
                        </button>
                      ) : (
                        <button
                          onClick={() => handleNextStep("last")}
                          className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                        >
                          Save & Fill Content Index
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="xl:mx-3 md:mx-3 lg:mx-3 4k:mx-3 2k:mx-3 2xl:mx-3 my-2">
            <div>
              {isCustomReport ? (
                // Render custom report sections
                renderCustomReportSection()
              ) : (
                // Render original report sections
                renderOriginalReportSections()
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay is handled by UnifiedESGSidebar */}

      {/* Modals */}
      <MainValidationPopup
        isModalOpen={IsValidationModalOpen}
        setActiveStep={setActiveStep}
        missing_fields={missing_fields}
        setIsModalOpen={setIsValidationModalOpen}
        reportName={reportName}
        email={userEmail}
        createdBy={userName}
        reportid={reportid}
        fromDate={fromDate}
        toDate={toDate}
        orgName={orgName}
        reportType={reportType}
        reportCreatedOn={reportCreatedOn}
      />

      <ToastContainer />
    </>
  );
};

export default ESGReport;