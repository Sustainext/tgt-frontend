"use client";
import { useState, useRef, useEffect, use } from "react";
import Sidebar from "./sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import OmissionPopup from "./content-index/modals/omissionPopup";
import ReportCreatedPopup from "./content-index/modals/reportCreatedPopup";
import MainValidationPopup from "./validation-modals/mainModal";
import axiosInstance, { patch } from "../../../utils/axiosMiddleware";
import ReferenceMaterialTopic from "./referenceMaterialTopic/page";
import RefereceContentIndex from './referenceContentIndex/page'
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const ESGReport = () => {
  const router = useRouter();
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
  const [corpName,setCorpName]=useState("")
  const [missing_fields, setMissingFields] = useState([]);
  const messageFromCeoRef = useRef(); // Use useRef to store a reference to submitForm
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
  const referenceManagementOfMaterialTopic=useRef()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("ESG Report"));
  }, [dispatch]);
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
    16:referenceManagementOfMaterialTopic
  };

  // const  missing_fields=[
  //   {
  //     page: "screen_fourteen",
  //     label: "14.1 Community Engagement",
  //     subLabel: "Add statement about company’s community engagement",
  //     type:'textarea'
  //   },
  //   {
  //     page: "screen_fourteen",
  //     label: "14.2 Impact Assessment",
  //     subLabel: "",
  //     type:'richTextarea'
  //   },
  //   {
  //     page: "screen_fourteen",
  //     label: "14.3 CSR",
  //     subLabel:
  //       "Add statement about company’s Corporate Social Responsibility policies",
  //       type:'richTextarea'
  //   },
  //   {
  //     page: "screen_fifteen",
  //     label: "15.1 Environmental Impact",
  //     subLabel:
  //       "Add statement about company’s responsibility to minimize the environmental impact",
  //        type:'textarea'
  //   },
  //   {
  //     page: "screen_fifteen",
  //     label: "15.2 Emissions Strategy",
  //     subLabel: "Add statement about company’s strategy to reduce emission",
  //      type:'textarea'
  //   },
  //   {
  //     page: "screen_fifteen",
  //     label: "15.3 Scope 1 GHG Emissions",
  //     subLabel: "Add statement about company’s scope 1 emissions",
  //      type:'richTextarea'
  //   },
  // ]

  const loadMissingFields = async () => {
    // LoaderOpen();
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

      // LoaderClose();
    } catch (error) {
      console.error("API call failed:", error);
      // LoaderClose();
    }
  };

  const handleNextStep = async (type) => {
    const currentRef = stepRefs[activeStep]?.current;

    const submitAndProceed = async () => {
      if (currentRef) {
        const isSubmitted = await currentRef.submitForm(type);
        return isSubmitted;
      }
      return true; // Proceed to next step if no form reference exists
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
      // toast.success(
      //   <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      //     <IoCheckmarkDoneCircle style={{ marginRight: '10px', color: 'green',fontSize:'50px' }} />
      //     <div>
      //     <strong style={{ display: 'block', marginBottom: '4px', fontSize: '16px' }}> {/* Main heading */}
      //     Data Saved
      //  </strong>
      //  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}> {/* Paragraph aligned below heading */}
      //  The data filled in the report has been saved as draft and can be accessed from the report module
      //  </p>
      //   </div>
      //   </div>, {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     style: {
      //       borderRadius: '8px',
      //       border: '1px solid #E5E5E5',
      //       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      //       width:'320px',
      //     },
      //     icon: false,
      // });
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

  useEffect(() => {
    setCreatedOn(localStorage.getItem("reportCreatedOn"));
    setOrgName(localStorage.getItem("reportorgname"));
    setCorpName(localStorage.getItem('reportCorpName'))
    setUsername(localStorage.getItem("userName"));
    setuserEmail(localStorage.getItem("userEmail"));
    setfromDate(localStorage.getItem("reportstartdate"));
    settoDate(localStorage.getItem("reportenddate"));
    setReportid(localStorage.getItem("reportid"));
    setReportType(localStorage.getItem("reportType"));
    if (localStorage.getItem("reportname")) {
      setReportName(localStorage.getItem("reportname"));
    }
  }, []);


  return (
    <>
      <div className="flex">
        {activeStep == 17? (
          <></>
        ) : (
          <div>
            {
              activeStep===16 && reportType==='GRI Report: In accordance With'?(
                <></>
              ):(
                <Sidebar
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            isOpenMobile={isOpenMobile}
            setIsOpenMobile={setIsOpenMobile}
            reportType={reportType}
          />
              )
            }
          </div>
          
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
                          if (activeStep > 15) {
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
                        {/* mobile section */}
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
                      Organization
                       {corpName ? " / Corporate" : ""}:{" "}
                      {orgName}{" "}
                      {corpName?' / ':''}
                      {corpName}{" "}
                      {/* {groupId?.corporate?.length > 0
                        ? "/ " + groupId?.corporate.join(", ")
                        : ""} */}
                    </p>
                        </div>
                         
                        </div>
                      </div>
                         {/* desktop section */}
                      <div className="hidden xl:block lg:block">
                        <p className="gradient-text text-[22px] font-bold pt-3 ml-3">
                          {reportName}
                        </p>
                        <p className="mt-2 text-[#667085] text-[13px] ml-3">
                      Organization
                       {corpName ? " / Corporate" : ""}:{" "}
                      {orgName}{" "}
                      {corpName?' / ':''}
                      {corpName}{" "}
                      {/* {groupId?.corporate?.length > 0
                        ? "/ " + groupId?.corporate.join(", ")
                        : ""} */}
                    </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                   {/* desktop section */}
              <div className="hidden md:block lg:block xl:block">
              <div className="float-right mr-2 flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {activeStep == 17 ? (
                    <></>
                  ) : (
                    <button
                      style={{
                        display: (activeStep === 1) || (activeStep === 16 && reportType==='GRI Report: In accordance With') ? "none" : "inline-block",
                      }}
                      className={`${
                        activeStep === 1 ? "" : "text-gray-500"
                      } px-3 py-1.5 rounded font-semibold w-[120px]`}
                      onClick={handlePreviousStep}
                      disabled={activeStep === 1}
                    >
                      &lt; Previous
                    </button>
                  )}

                  {(activeStep == 16 && reportType==='GRI Report: In accordance With') || activeStep==17 ? (
                    <div>
                      {
                        reportType==='GRI Report: In accordance With'?(
                          <div>
                      {isOmissionSubmitted ? (
                        <button
                          onClick={() => {
                            setIsCreateReportModalOpen(true);
                          }}
                          className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                        >
                          Save and Create Report {">"}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsModalOpen(true);
                          }}
                          className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                        >
                          Add Reasons for Omission {">"}
                        </button>
                      )}
                    </div>
                        ):(
                          <div>
                         <button
                              onClick={() => {
                                setIsCreateReportModalOpen(true);
                              }}
                              className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                            >
                              Save and Create Report {">"}
                            </button>
                        </div>
                        )
                      }
                    </div>
                    
                  ) : (
                    <div>
                      {activeStep < 15 ? (
                        <button
                          className={`${
                            activeStep === 15
                              ? "bg-gray-300"
                              : "bg-blue-500 text-white"
                          } px-3 py-1.5 rounded ml-2 font-semibold w-[100px]`}
                          onClick={() => {
                            handleNextStep("next");
                          }} // Call the form submit and next step handler
                          disabled={activeStep === 15}
                        >
                          Next &gt;
                        </button>
                      ) : (
                        <div>
                          {reportType==='GRI Report: With Reference to' && activeStep===15 ?(
                            <button
                            className={`bg-blue-500 text-white px-3 py-1.5 rounded ml-2 font-semibold w-[100px]`}
                            onClick={() => {
                              handleNextStep("next");
                            }} // Call the form submit and next step handler
                            // disabled={activeStep === 15}
                          >
                            Next &gt;
                          </button>
                          ):(
                            <button
                            onClick={() => {
                              handleNextStep("last");
                            }}
                            className="flex w-[200px] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                          >
                            Save & Fill Content Index
                          </button>
                          )}
                         
                        </div>
                        
                      )}
                    </div>
                  )}
                </div>
              </div>
              </div>
             
            </div>
          </div>
              {/* mobile section */}
          <div className="block md:hidden lg:hidden  xl:hidden mb-2 h-[43px]">
              <div className="float-right mr-2 flex items-center justify-center mb-2">
                <div className="flex items-center justify-center">
                  {activeStep == 16 ? (
                    <></>
                  ) : (
                    <button
                      style={{
                        display: activeStep === 1 ? "none" : "inline-block",
                      }}
                      className={`${
                        activeStep === 1 ? "" : "text-gray-500"
                      } px-3 py-1.5 rounded font-semibold`}
                      onClick={handlePreviousStep}
                      disabled={activeStep === 1}
                    >
                      &lt; Previous
                    </button>
                  )}

                  {activeStep == 16 ? (
                    <div>
                      {isOmissionSubmitted ? (
                        <button
                          onClick={() => {
                            setIsCreateReportModalOpen(true);
                          }}
                          className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                        >
                          Save and Create Report {">"}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsModalOpen(true);
                          }}
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
                            activeStep === 15
                              ? "bg-gray-300"
                              : "bg-blue-500 text-white"
                          } px-3 py-1.5 rounded ml-2 font-semibold w-[100px]`}
                          onClick={() => {
                            handleNextStep("next");
                          }} // Call the form submit and next step handler
                          disabled={activeStep === 15}
                        >
                          Next &gt;
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleNextStep("last");
                          }}
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
          <div className="xl:mx-3 md:mx-3 lg:mx-3 4k:mx-3 2k:mx-3 2xl:mx-3 my-2">
            <div>
              {activeStep === 1 && (
                <div>
                  <MessageFromCEO ref={messageFromCeoRef} />
                </div>
              )}
              {activeStep === 2 && (
                <div>
                  <Companyoperations ref={aboutTheCompany} />
                </div>
              )}
              {activeStep === 3 && (
                <div>
                  <div className="mb-4">
                    <MissionVission ref={missionVision} />
                  </div>
                </div>
              )}
              {activeStep === 4 && (
                <div>
                  <div className="mb-4">
                    <SustainibilityRoadmap ref={sustainibilityRoadmap} />
                  </div>
                </div>
              )}
              {activeStep === 5 && (
                <div>
                  <div className="mb-4">
                    <AwardsRecognition ref={awardAlliances} />
                  </div>
                </div>
              )}
              {activeStep === 6 && (
                <div>
                  <div className="mb-4">
                    <StakeholderEngagement ref={stakeholderEngagement} />
                  </div>
                </div>
              )}
              {activeStep === 7 && (
                <div>
                  <div className="mb-4">
                    <AboutTheReport ref={aboutReport} />
                  </div>
                </div>
              )}
              {activeStep === 8 && (
                <div>
                  <div className="mb-4">
                    {reportType=='GRI Report: With Reference to'?(
                      <ReferenceMateriality ref={materiality} />
                    ):(
                      <Materiality ref={materiality} />
                    )}
                   
                    
                  </div>
                </div>
              )}
              {activeStep === 9 && (
                <div>
                  <div className="mb-4">
                    <CorporateGovernance ref={corporateGovernance} reportType={reportType} />
                  </div>
                </div>
              )}
              {activeStep === 10 && (
                <div>
                  <div className="mb-4">
                    <SustainibilityJourney ref={sustainabilityJourney} reportType={reportType} />
                  </div>
                </div>
              )}
              {activeStep === 11 && (
                <div>
                  <div className="mb-4">
                    <EconomicPerformance ref={economicperformance} reportType={reportType} />
                  </div>
                </div>
              )}
              {activeStep === 12 && (
                <div>
                  <div className="mb-4">
                    <Environment ref={environment} reportType={reportType} />
                  </div>
                </div>
              )}
              {activeStep === 13 && (
                <div>
                  <div className="mb-4">
                    <People ref={people} reportType={reportType} />
                  </div>
                </div>
              )}
              {activeStep === 14 && (
                <div>
                  <div className="mb-4">
                    <Community ref={community} reportType={reportType} />
                  </div>
                </div>
              )}
              {activeStep === 15 && (
                <div>
                  <div className="mb-4">
                    <CustomerProductService ref={customers} reportType={reportType} />
                  </div>
                </div>
              )}
              {activeStep >=16 && (
                <div>
                  {reportType=='GRI Report: With Reference to' && activeStep===16?(
                    <div>
                      <ReferenceMaterialTopic ref={referenceManagementOfMaterialTopic} />
                    </div>
                  ):(
                    <div className="mb-4">
                      {
                        reportType=='GRI Report: With Reference to' && activeStep===17?(
                          <RefereceContentIndex
                          reportName={reportName}
                          setActiveStep={setActiveStep}
                          isOmissionSubmitted={isOmissionSubmitted}
                          isOmissionModalOpen={isModalOpen}
                          setIsOmissionModalOpen={setIsModalOpen}
                          isCreateReportModalOpen={isCreateReportModalOpen}
                          setIsCreateReportModalOpen={setIsCreateReportModalOpen}
                          setIsOmissionSubmitted={setIsOmissionSubmitted}
                          
                          />
                        ):(
                          <ContentIndex
                          reportName={reportName}
                          setActiveStep={setActiveStep}
                          isOmissionSubmitted={isOmissionSubmitted}
                          isOmissionModalOpen={isModalOpen}
                          setIsOmissionModalOpen={setIsModalOpen}
                          isCreateReportModalOpen={isCreateReportModalOpen}
                          setIsCreateReportModalOpen={setIsCreateReportModalOpen}
                          setIsOmissionSubmitted={setIsOmissionSubmitted}
                        />
                        )
                      }
                   
                  </div>
                  )}
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
