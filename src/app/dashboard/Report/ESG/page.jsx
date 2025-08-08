"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import DownloadReportPopup from '../CustomESGReport/components/downloadReportPop';

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
import RefereceContentIndex from "./referenceContentIndex/page";

import ReportBuilderPage from "../CustomESGReport/page";

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
  nextReportPage,
  previousReportPage,
  setCurrentReportPage,
  selectSectionsForReportType,
  initializeForNonCustomReport,
  handleNext
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
   // Local state
   const [isOpenMobile, setIsOpenMobile] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isCreateReportModalOpen, setIsCreateReportModalOpen] = useState(false);
   const [isOmissionSubmitted, setIsOmissionSubmitted] = useState(true);
   const [IsValidationModalOpen, setIsValidationModalOpen] = useState(false);
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
   const [isDownloadReportModalOpen,setIsDownloadReportModalOpen]=useState(false)
    const [reportingPeriod,setReportingPeriod]=useState('')
    const [ispageNumberGenerated,setIspageNumberGenerated]=useState(false)


   
 
     // Redux state for navigation
   const allSections = useSelector(selectSections);
   const allSubsections = useSelector(selectSubsections);
   const selectedSubsections = useSelector(selectSelectedSubsections);
   const currentReportPage = useSelector(selectCurrentReportPage);
   const isContentIndexSelected = useSelector((state)=> state.reportCreation.includeContentIndex)

  // Default sections definition (move this up before it's used)
  // const defaultSections = [
  //   { id: 'message_ceo', title: 'Message From Our Leadership', mandatory: false, enabled: false, order: 1 },
  //   { id: 'about_company', title: 'About the Company & Operations', mandatory: false, enabled: false, order: 2 },
  //   { id: 'mission_vision', title: 'Mission, Vision, Value', mandatory: false, enabled: false, order: 3 },
  //   { id: 'sustainability', title: 'Sustainability Roadmap', mandatory: false, enabled: false, order: 4 },
  //   { id: 'awards', title: 'Awards & Alliances', mandatory: false, enabled: false, order: 5 },
  //   { id: 'stakeholder', title: 'Stakeholder Engagement', mandatory: false, enabled: false, order: 6 },
  //   { id: 'about_report', title: 'About the Report', mandatory: false, enabled: false, order: 7 },
  //   { id: 'materiality', title: 'Materiality', mandatory: false, enabled: false, order: 8 },
  //   { id: 'governance', title: 'Corporate Governance', mandatory: false, enabled: false, order: 9 },
  //   { id: 'journey', title: 'Sustainability Journey', mandatory: false, enabled: false, order: 10 },
  //   { id: 'economic', title: 'Economic Performance', mandatory: false, enabled: false, order: 11 },
  //   { id: 'environment', title: 'Environment', mandatory: false, enabled: false, order: 12 },
  //   { id: 'people', title: 'People', mandatory: false, enabled: false, order: 13 },
  //   { id: 'community', title: 'Community', mandatory: false, enabled: false, order: 14 },
  //   { id: 'customers', title: 'Customers, Products & Services', mandatory: false, enabled: false, order: 15 },
  // ];

  const defaultSections = [
    {
      id: 'message_ceo',
      title: 'Message From Our Leadership',
      subLabel:'Share any message from the leadership team.',
      mandatory: false,
      enabled: false,
      field:['message'],
      order: 1,
      screen: "screen_one"
    },
      {
      id: 'about_company',
      title: 'About the Company & Operations',
      subLabel:'An overview about the company like who we are, what we do, and how the operations are aligned with the sustainability goals.',
      mandatory: false,
      enabled: false,
      field:['about_the_company'],
      order: 2,
      screen: "screen_two"
    },
    {
      id: 'mission_vision',
      title: 'Mission, Vision, Value',
      subLabel:'Share the core principles that guide  company’s purpose and future aspirations.',
      mandatory: false,
      enabled: false,
      field:['mission'],
      order: 3,
      screen: "screen_three"
    },
    {
      id: 'sustainability',
      title: 'Sustainability Roadmap',
      subLabel:'Share companies step-by-step guide journey toward sustainability, outlining the goals, milestones, and the progress.',
      mandatory: false,
      enabled: false,
      field:['description'],
      order: 4,
      screen: "screen_four"
    },
    {
      id: 'awards',
      title: 'Awards & Alliances',
      subLabel:'Showcase  any recognitions or awards earned.',
      mandatory: false,
      enabled: false,
      field:['description'],
      order: 5,
      screen: "screen_five"
    },
    {
      id: 'stakeholder',
      title: 'Stakeholder Engagement',
      subLabel:'Overview of how company collaborates with key stakeholders.',
      mandatory: false,
      enabled: false,
      field:['description'],
      order: 6,
      screen: "screen_six"
    },
    {
      id: 'about_report',
      title: 'About the Report',
      subLabel:'A brief explanation of the purpose, scope, and methodology behind this report.',
      mandatory: false,
      enabled: false,
      field:['description'],
      order: 7,
      screen: "screen_seven"
    },
    {
      id: 'materiality',
      title: 'Materiality',
      subLabel:'A brief explanation of the most relevant topics for an organization to report on.',
      mandatory: false,
      enabled: false,
      order: 8,
      screen: "screen_eight"
    },
    {
      id: 'governance',
      title: 'Corporate Governance',
      subLabel:"A brief explanation on company's system of rules, practices, and processes that direct and manage its operations.",
      mandatory: false,
      enabled: false,
      field:['statement'],
      order: 9,
      screen: "screen_nine"
    },
    {
      id: 'journey',
      title: 'Sustainability Journey',
      subLabel:'A brief explanation of the ongoing path toward sustainability, highlighting key achievements and challenges',
      mandatory: false,
      enabled: false,
      field:['company_sustainability_statement'],
      order: 10,
      screen: "screen_ten"
    },
    {
      id: 'economic',
      title: 'Economic Performance',
      subLabel:"A brief explanation of the organization's economic performance like Economic value generated and distributed (EVG&D), Defined benefit plan obligations, Financial assistance from governments, and Financial implications of climate change.",
      mandatory: false,
      enabled: false,
      field:['company_economic_performance_statement'],
      order: 11,
      screen: "screen_eleven"
    },
    {
      id: 'environment',
      title: 'Environment',
      subLabel:"A brief explanation on the organization's environmental issues, such as emissions, effluents, waste, material use, energy, water, and biodiversity.",
      mandatory: false,
      enabled: false,
      field:['environmental_responsibility_statement'],
      order: 12,
      screen: "screen_twelve"
    },
    {
      id: 'people',
      title: 'People',
      subLabel:"A brief explanation on organizations employees, labour management and other benefits and training for the welfare of the people within the organization and community.",
      mandatory: false,
      enabled: false,
      field:['employee_policies_statement'],
      order: 13,
      screen: "screen_thirteen"
    },
    {
      id: 'community',
      title: 'Community',
      subLabel:'Details on how the organization engages and collaborates with the community to promote sustainability.',
      mandatory: false,
      enabled: false,
      order: 14,
      screen: "screen_fourteen"
    },
    {
      id: 'customers',
      title: 'Customers, Products & Services',
      subLabel:'A brief explanation of the quality and standard of the companies products and services.',
      mandatory: false,
      enabled: false,
      field:['conclusion'],
      order: 15,
      screen: "screen_fifteen"
    },
    {
      id: 'reference_management_of_material_topic',
      title: 'Management of Material Topic',
      mandatory: false,
      enabled: false,
      order: 16,
      screen: "screen_sixteen"
    }
  ];

 

  // Get sections based on report type - this ensures default order for non-custom reports
  const sectionsToUse = useSelector(selectSectionsForReportType(reportType || "", defaultSections));

  // Refs for form submission - mapped to section IDs
  const sectionRefs = {
    message_ceo: useRef(),
    about_company: useRef(),
    mission_vision: useRef(),
    sustainability: useRef(),
    awards: useRef(),
    stakeholder: useRef(),
    about_report: useRef(),
    materiality: useRef(),
    governance: useRef(),
    journey: useRef(),
    environment: useRef(),
    community: useRef(),
    economic: useRef(),
    people: useRef(),
    customers: useRef(),
    reference_management_of_material_topic:useRef()
  };

  // State to track if initialization has been done
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Redux state based on report type
  useEffect(() => {
    const initializeReportState = () => {
      if (reportType !== "Custom ESG Report" && reportType) {
        // For non-custom reports, always reset to default order and enable all sections
        dispatch(initializeForNonCustomReport(defaultSections));

        // Default subsection selections for all sections
        const defaultSubsections = {};
        Object.keys(allSubsections).forEach((sectionId) => {
          const sectionSubsections = allSubsections[sectionId] || [];
          const collectIds = (subs) =>
            subs.flatMap((s) => [
              s.id,
              ...(s.children ? collectIds(s.children) : []),
            ]);
          defaultSubsections[sectionId] = collectIds(sectionSubsections);
        });

        dispatch(setSelectedSubsections(defaultSubsections));
      }
      setIsInitialized(true);
    };

    if (reportType && !isInitialized) {
      initializeReportState();
    }
  }, [reportType, isInitialized, dispatch, allSubsections]);

  // Get current section based on Redux navigation
  const currentSection = useMemo(() => {
    return sectionsToUse[currentReportPage] || null;
  }, [sectionsToUse, currentReportPage]);

  // Navigation helpers
  const canGoToNext = reportType=='GRI Report: With Reference to'?currentReportPage < sectionsToUse.length - 1:currentReportPage < sectionsToUse.length - 2
  const canGoToPrevious = currentReportPage > 0;

  // Initialize component state
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("ESG Report"));
  }, [dispatch]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Check for invalid date
    if (isNaN(date)) {
      return "Invalid date";
    }
  
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCreatedOn(localStorage.getItem('reportCreatedOn') || '');
      setOrgName(localStorage.getItem('reportorgname') || '');
      setCorpName(localStorage.getItem('reportCorpName') || '');
      setUsername(localStorage.getItem('userName') || '');
      setuserEmail(localStorage.getItem('userEmail') || '');
      setfromDate(localStorage.getItem('reportstartdate') || '');
      settoDate(localStorage.getItem('reportenddate') || '');
      setReportid(localStorage.getItem('reportid') || '');
      setReportType(localStorage.getItem('reportType') || '');
      setReportName(localStorage.getItem('reportname') || '');
      setReportingPeriod(formatDate(localStorage.getItem('reportstartdate')) +" to "+ formatDate(localStorage.getItem('reportenddate')))
    }
  }, []);

  const loadMissingFields = async () => {
    const url = `${process.env.BACKEND_API_URL}/esg_report/get_field_validation/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.status == 200) {
        if (response.data.length > 0) {
          setMissingFields(response.data);
          setIsValidationModalOpen(true);
        } else {
           if (!isContentIndexSelected && reportType === "Custom ESG Report") {
             setIsDownloadReportModalOpen(true);
           } else {
             dispatch(handleNext());
           }
        }
      }
    } catch (error) {
      console.error("API call failed:", error);
      toast.error('Opps! Something went wrong')
    }
  };
  const hasChanges = (initial = {}, current = {}) => {
    const keys = new Set([...Object.keys(initial), ...Object.keys(current)]);
    for (const key of keys) {
      if ((initial[key] || "").trim() !== (current[key] || "").trim()) {
        return true;
      }
    }
    return false;
  };

  // Check if this is a custom report that should redirect to builder
  const shouldRedirectToBuilder = useMemo(() => {
    return reportType === "Custom ESG Report";
  }, [reportType]);

  

  // Original report navigation handlers updated for Redux
 

 
  const handleNextStep = async (type) => {
    const currentRef = sectionRefs[currentSection?.id]?.current;
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
      dispatch(nextReportPage());
      // if (isSubmitted) {
       
      // }
    } else if (type === "last") {
      const isSubmitted = await submitAndProceed();
      loadMissingFields();
      // if (isSubmitted) {
       
      // }
    } 
   else if(type === "back") {
      const isSubmitted = await submitAndProceed();
      if (isSubmitted) {
        showDraftSavedToast();
      }
      setTimeout(() => {
        router.push("/dashboard/Report");
      }, 1000);
    } 
    else {
      const isSubmitted = await submitAndProceed();
      if (isSubmitted) {
        showDraftSavedToast();
      }
    }
  };

  const handlePreviousStep = () => {
    dispatch(previousReportPage());
  };

 

  // Component mapping for sections
  const renderSectionComponent = () => {
    if (!currentSection) return null;

    const sectionOrder = currentReportPage + 1;
    const sectionSubsections = selectedSubsections[currentSection.id] || [];

    const commonProps = {
      subsections: sectionSubsections,
      sectionOrder,
      sectionId: currentSection.id,
      sectionTitle: currentSection.title,
      reportType,
      hasChanges
    };

    switch (currentSection.id) {
      case 'message_ceo':
        return <MessageFromCEO ref={sectionRefs.message_ceo} {...commonProps} />;
      case 'about_company':
        return <Companyoperations ref={sectionRefs.about_company} {...commonProps} />;
      case 'mission_vision':
        return <MissionVission ref={sectionRefs.mission_vision} {...commonProps} />;
      case 'sustainability':
        return <SustainibilityRoadmap ref={sectionRefs.sustainability} {...commonProps} />;
      case 'awards':
        return <AwardsRecognition ref={sectionRefs.awards} {...commonProps} />;
      case 'stakeholder':
        return <StakeholderEngagement ref={sectionRefs.stakeholder} {...commonProps} />;
      case 'about_report':
        return <AboutTheReport ref={sectionRefs.about_report} {...commonProps} />;
      case 'materiality':
        return reportType === "GRI Report: With Reference to" ? (
          <ReferenceMateriality ref={sectionRefs.materiality} {...commonProps} />
        ) : (
          <Materiality ref={sectionRefs.materiality} {...commonProps} />
        );
      case 'governance':
        return <CorporateGovernance ref={sectionRefs.governance} {...commonProps} />;
      case 'journey':
        return <SustainibilityJourney ref={sectionRefs.journey} {...commonProps} />;
      case 'economic':
        return <EconomicPerformance ref={sectionRefs.economic} {...commonProps} />;
      case 'environment':
        return <Environment ref={sectionRefs.environment} {...commonProps} />;
      case 'people':
        return <People ref={sectionRefs.people} {...commonProps} />;
      case 'community':
        return <Community ref={sectionRefs.community} {...commonProps} />;
      case 'customers':
        return <CustomerProductService ref={sectionRefs.customers} {...commonProps} />;  
      case 'reference_management_of_material_topic':
        return <ReferenceMaterialTopic ref={sectionRefs.reference_management_of_material_topic} {...commonProps}/>  
      default:
        return null;
    }
  };

  // Special handling for content index and other final steps
  const isInContentIndexPhase = (reportType=='GRI Report: With Reference to' || reportType==='Custom ESG Report')?(currentReportPage >= sectionsToUse.length) && sectionsToUse.length>0:(currentReportPage >= sectionsToUse.length-1) && sectionsToUse.length>0
  const shouldShowSidebar = !isInContentIndexPhase;

 
  
  // Render content index or section component
  const renderMainContent = () => {
    if (isInContentIndexPhase) {
     
      const contentIndexStep = currentReportPage - sectionsToUse.length + 16;
      
     if (reportType === "GRI Report: With Reference to" && contentIndexStep === 16) {
      
        return (
          <RefereceContentIndex
            reportName={reportName}
            setActiveStep={(step) => dispatch(setCurrentReportPage(step - 1))}
            isOmissionSubmitted={isOmissionSubmitted}
            isOmissionModalOpen={isModalOpen}
            setIsOmissionModalOpen={setIsModalOpen}
            isCreateReportModalOpen={isCreateReportModalOpen}
            setIsCreateReportModalOpen={setIsCreateReportModalOpen}
            setIsOmissionSubmitted={setIsOmissionSubmitted}
            reportType={reportType}
            ispageNumberGenerated={ispageNumberGenerated}
          />
        );
      } else {
        return (
          <ContentIndex
            reportName={reportName}
            setActiveStep={(step) => dispatch(setCurrentReportPage(step - 1))}
            isOmissionSubmitted={isOmissionSubmitted}
            isOmissionModalOpen={isModalOpen}
            setIsOmissionModalOpen={setIsModalOpen}
            isCreateReportModalOpen={isCreateReportModalOpen}
            setIsCreateReportModalOpen={setIsCreateReportModalOpen}
            setIsOmissionSubmitted={setIsOmissionSubmitted}
            reportType={reportType}
            ispageNumberGenerated={ispageNumberGenerated}
          />
        );
      }
    }

    return renderSectionComponent();
  };

  const handlePageGeneration= async()=>{
    try{
      const url = `${process.env.BACKEND_API_URL}/esg_report/extract_page_number/${reportid}/`;
      const response = await axiosInstance.get(url);
      if (response.status == 200) {
        setIspageNumberGenerated(true)
         toast.success(
        <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.4" }}>
          Page numbers generated successfully. You can now download the updated Content Index and Report.
        </p>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );

      }
    }
    catch(err){
      console.log(err,"error in page generation api")
    }
  }

  return (
    <>
     <ToastContainer />
    {
      shouldRedirectToBuilder && reportType==='Custom ESG Report'?(
        <div>
          {
            !isInContentIndexPhase?(
              <div>
                 <ReportBuilderPage loadMissingFields={loadMissingFields} hasChanges={hasChanges} />
              </div>
            ):(
              <div className="w-full mb-5">
              <div className="flex flex-col justify-start overflow-x-hidden">
                <div className="flex justify-between items-center border-b border-gray-200 mb-3 w-full">
                  <div className="w-[70%]">
                    <div className="text-left mb-3 ml-3 pt-3">
                      <div className="flex">
                        <div>
                          <button
                            onClick={() => {
                              if (isInContentIndexPhase) {
                                router.push("/dashboard/Report");
                              } else {
                                handleNextStep("back");
                              }
                            }}
                            className="text-[12px] text-[#667085] hover:text-[#007EEF] flex gap-2 ml-3"
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
                                  {reportName?reportName:''}
                                </p>
                                {/* <p className="mt-2 text-[#667085] text-[13px]">
                                  Organization{corpName ? " / Corporate" : ""}:{" "}
                                  {orgName} {corpName ? " / " : ""}
                                  {corpName}{" "}
                                </p> */}
                                 <div className='w-full flex gap-3'>
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Organization: {orgName}
                            </p>
                            {
                              corpName &&  <p className="mt-2 text-[#667085] text-[13px]">
                              Corporate: {corpName}
                            </p>
                            }
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Reporting Year: {reportingPeriod}
                            </p>
                            </div>
                              </div>
                            </div>
                          </div>
    
                          {/* Desktop section */}
                          <div className="hidden xl:block lg:block">
                            <p className="gradient-text text-[22px] font-bold pt-3 ml-3">
                            {reportName?reportName:''}
                            </p>
                            {/* <p className="mt-2 text-[#667085] text-[13px] ml-3">
                              Organization{corpName ? " / Corporate" : ""}:{" "}
                              {orgName} {corpName ? " / " : ""}
                              {corpName}{" "}
                            </p> */}
                             <div className='w-full flex gap-3 ml-3'>
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Organization: {orgName}
                            </p>
                            {
                              corpName &&  <p className="mt-2 text-[#667085] text-[13px]">
                              Corporate: {corpName}
                            </p>
                            }
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Reporting Year: {reportingPeriod}
                            </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  {/* Desktop navigation */}
                  <div className="hidden md:block lg:block xl:block">
                    <div className="float-right mr-2 flex items-center justify-center">
                      <div className="flex items-center justify-center">
                        {/* Show navigation for sections */}
                        {!isInContentIndexPhase && (
                          <>
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
                                onClick={() => {
                                  handlePageGeneration()
                                  handleNextStep("last")}}
                                className="flex w-[200px] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                              >
                                Save & Fill Content Index
                              </button>
                            )}
                          </>
                        )}
    
                        {/* Content index navigation */}
                        {isInContentIndexPhase && (
                          <div>
                            {reportType === "GRI Report: In accordance With" || reportType==='Custom ESG Report' ? (
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
                    {!isInContentIndexPhase && canGoToPrevious && (
                      <button
                        className="text-gray-500 px-3 py-1.5 rounded font-semibold"
                        onClick={handlePreviousStep}
                      >
                        &lt; Previous
                      </button>
                    )}
    
                    {!isInContentIndexPhase && canGoToNext ? (
                      <button
                        className="bg-blue-500 text-white px-3 py-1.5 rounded ml-2 font-semibold w-[100px]"
                        onClick={() => handleNextStep("next")}
                      >
                        Next &gt;
                      </button>
                    ) : !isInContentIndexPhase ? (
                      <button
                        onClick={() => {
                                  handlePageGeneration()
                                  handleNextStep("last")}}
                        className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                      >
                        Save & Fill Content Index
                      </button>
                    ) : null}
    
                    {isInContentIndexPhase && (
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
                    )}
                  </div>
                </div>
              </div>
    
              <div className="xl:mx-3 md:mx-3 lg:mx-3 4k:mx-3 2k:mx-3 2xl:mx-3 my-2">
                <div>
                <ContentIndex
                reportName={reportName}
                setActiveStep={(step) => dispatch(setCurrentReportPage(step - 1))}
                isOmissionSubmitted={isOmissionSubmitted}
                isOmissionModalOpen={isModalOpen}
                setIsOmissionModalOpen={setIsModalOpen}
                isCreateReportModalOpen={isCreateReportModalOpen}
                setIsCreateReportModalOpen={setIsCreateReportModalOpen}
                setIsOmissionSubmitted={setIsOmissionSubmitted}
                reportType={reportType}
                ispageNumberGenerated={ispageNumberGenerated}
              />
                </div>
              </div>
            </div>
             
            )
          }
  </div>
      ):(
        <div>
        <div className="flex">
          {shouldShowSidebar && (
            // <div className="m-3 ml-2 border border-r-2 border-b-2 rounded-lg h-full hidden xl:block lg:block">
            //   <div className="flex items-start py-4 h-full  rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
               
            //   </div>
            // </div>
            <UnifiedESGSidebar
            setIsOpenMobile={setIsOpenMobile}
            isOpenMobile={isOpenMobile}
            reportType={reportType}
            allSections={sectionsToUse}
            submitData={handleNextStep}
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
                            if (isInContentIndexPhase) {
                              router.push("/dashboard/Report");
                            } else {
                              handleNextStep("back");
                            }
                          }}
                          className="text-[12px] text-[#667085] hover:text-[#007EEF] flex gap-2 ml-3"
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
                                {reportName?reportName:''}
                              </p>
                              {/* <p className="mt-2 text-[#667085] text-[13px]">
                                Organization{corpName ? " / Corporate" : ""}:{" "}
                                {orgName} {corpName ? " / " : ""}
                                {corpName}{" "}
                              </p> */}
                               <div className='w-full flex gap-3'>
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Organization: {orgName}
                            </p>
                            {
                              corpName &&  <p className="mt-2 text-[#667085] text-[13px]">
                              Corporate: {corpName}
                            </p>
                            }
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Reporting Year: {reportingPeriod}
                            </p>
                            </div>
                            </div>
                          </div>
                        </div>
  
                        {/* Desktop section */}
                        <div className="hidden xl:block lg:block">
                          <p className="gradient-text text-[22px] font-bold pt-3 ml-3">
                          {reportName?reportName:''}
                          </p>
                          {/* <p className="mt-2 text-[#667085] text-[13px] ml-3">
                            Organization{corpName ? " / Corporate" : ""}:{" "}
                            {orgName} {corpName ? " / " : ""}
                            {corpName}{" "}
                          </p> */}
                           <div className='w-full flex gap-3 ml-3'>
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Organization: {orgName}
                            </p>
                            {
                              corpName &&  <p className="mt-2 text-[#667085] text-[13px]">
                              Corporate: {corpName}
                            </p>
                            }
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Reporting Year: {reportingPeriod}
                            </p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Desktop navigation */}
                <div className="hidden md:block lg:block xl:block">
                  <div className="float-right mr-2 flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      {/* Show navigation for sections */}
                      {!isInContentIndexPhase && (
                        <>
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
                               onClick={() => {
                                  handlePageGeneration()
                                  handleNextStep("last")}}
                              className="flex w-[200px] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                            >
                              Save & Fill Content Index
                            </button>
                          )}
                        </>
                      )}
  
                      {/* Content index navigation */}
                      {isInContentIndexPhase && (
                        <div>
                          {reportType === "GRI Report: In accordance With" || reportType==='Custom ESG Report' ? (
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
                  {!isInContentIndexPhase && canGoToPrevious && (
                    <button
                      className="text-gray-500 px-3 py-1.5 rounded font-semibold"
                      onClick={handlePreviousStep}
                    >
                      &lt; Previous
                    </button>
                  )}
  
                  {!isInContentIndexPhase && canGoToNext ? (
                    <button
                      className="bg-blue-500 text-white px-3 py-1.5 rounded ml-2 font-semibold w-[100px]"
                      onClick={() => handleNextStep("next")}
                    >
                      Next &gt;
                    </button>
                  ) : !isInContentIndexPhase ? (
                    <button
                       onClick={() => {
                                  handlePageGeneration()
                                  handleNextStep("last")}}
                      className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                    >
                      Save & Fill Content Index
                    </button>
                  ) : null}
  
                  {isInContentIndexPhase && (
                    <div>
                       {reportType === "GRI Report: In accordance With" || reportType==='Custom ESG Report'?(
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
                       ):(
                        <button
                        onClick={() => setIsCreateReportModalOpen(true)}
                        className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                      >
                        Save and Create Report {">"}
                      </button>
                       )}
                    </div>
                    
                  )}
                </div>
              </div>
            </div>
  
            <div className="xl:mx-3 md:mx-3 lg:mx-3 4k:mx-3 2k:mx-3 2xl:mx-3 my-2">
              <div>
                {renderMainContent()}
              </div>
            </div>
          </div>
        </div>
  
        {/* Mobile overlay for sidebar */}
        {/* {isOpenMobile && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setIsOpenMobile(false)}
            />
            <div
              className={`fixed top-[7rem] left-0 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 w-72`}
            >
              <div className="p-4">
                <UnifiedESGSidebar
                  setIsOpenMobile={setIsOpenMobile}
                  isOpenMobile={true}
                  reportType={reportType}
                  allSections={sectionsToUse}
                  submitData={handleNextStep}
                />
              </div>
            </div>
          </>
        )} */}
        </div>
      )
    }
  
     

      {/* Modals */}
      <MainValidationPopup
        isModalOpen={IsValidationModalOpen}
        setIsDownloadReportModalOpen={setIsDownloadReportModalOpen}
        setActiveStep={(step) => dispatch(setCurrentReportPage(step - 1))}
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
{
  !isContentIndexSelected && isDownloadReportModalOpen && <DownloadReportPopup isDownloadReportModalOpen={isDownloadReportModalOpen} reportName={reportName} />
}

    </>
  );
};

export default ESGReport;