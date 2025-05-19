"use client";
import { useState, useRef, useEffect, use } from "react";
import Bills211Sidebar from "./sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axiosInstance, { patch } from "../../../utils/axiosMiddleware";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Aboutthereport from "./about-the-report/page";
import Organizationprofilestructure from "./organization-profile-structure/page";
import Businessactivities from "./business-activities/page"
import Supplychains from "./supply-chains/page"
import Policiesdiligence from "./policies-diligence-processes/page"
import Risksforcedchildlabour from "./risks-forced-child-labour/page"
const Bills211Report = () => {
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
  const [missing_fields, setMissingFields] = useState([]);
  const AbouttheReport = useRef();
  const OrgProfileStructureRef = useRef(); // Use useRef to store a reference to submitForm
  const BusinessActivities = useRef();
  const SupplyChains = useRef();
  const PoliciesDiligenceProcesses = useRef();
  const RisksofForced = useRef();
  const forcedlabourandchildlabour = useRef();
  const RemediationMeasures = useRef();
  const RemediationIncome = useRef();
  const Trainingforcedlabourandchildlabour = useRef();
  const AssessingEffectiveness = useRef();
  const Attestation = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("Bill S-211 Report"));
  }, [dispatch]);
  const stepRefs = {
    1: AbouttheReport,
    2: OrgProfileStructureRef,
    3: BusinessActivities,
    4: SupplyChains,
    5: PoliciesDiligenceProcesses,
    6: RisksofForced,
    7: forcedlabourandchildlabour,
    8: RemediationMeasures,
    9: RemediationIncome,
    10: Trainingforcedlabourandchildlabour,
    11: AssessingEffectiveness,
    12: Attestation,
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
        <Bills211Sidebar
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isOpenMobile={isOpenMobile}
          setIsOpenMobile={setIsOpenMobile}
        />

        <div className="w-full mb-5">
          <div className="flex flex-col justify-start overflow-x-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 mb-3 w-full">
              <div className="w-[70%]">
                <div className="text-left mb-3 ml-3 pt-3">
                  <div className="flex">
                    <div>
                      <button
                        onClick={() => {
                          if (activeStep > 10) {
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

                      <div className="xl:hidden lg:hidden">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsOpenMobile(true)}
                            className="text-gray-700"
                          >
                            <MdKeyboardArrowRight className="h-6 w-6 text-black" />
                          </button>

                          <p className="gradient-text text-[22px] font-bold pt-3 pb-3">
                            {/* {reportName}  */}
                            Report Name
                          </p>
                        </div>
                      </div>

                      <div className="hidden xl:block lg:block">
                        <p className="gradient-text text-[22px] font-bold pt-3 pb-3 ml-3">
                          {/* {reportName} */}
                          Report Name
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block lg:block xl:block">
                <div className="float-right mr-2 flex items-center justify-center">
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
                        } px-3 py-1.5 rounded font-semibold w-[120px]`}
                        onClick={handlePreviousStep}
                        disabled={activeStep === 1}
                      >
                        &lt; Previous
                      </button>
                    )}
                    {activeStep == 11 ? (
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
                    ) : (
                      <div>
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
                      </div>
                    )}
                    {/* {activeStep == 11 ? (
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
                          className="flex w-[200px] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                        >
                          Save & Fill Content Index
                        </button>
                      )}
                    </div>
                  )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="block md:hidden lg:hidden  xl:hidden mb-2 h-[43px]">
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
              </div> */}
          <div className="xl:mx-3 md:mx-3 lg:mx-3 4k:mx-3 2k:mx-3 2xl:mx-3 my-2">
            <div>
              {activeStep === 1 && (
                <div>
                  <Aboutthereport ref={AbouttheReport} />
                </div>
              )}
              {activeStep === 2 && (
                <div>
                  <Organizationprofilestructure ref={OrgProfileStructureRef} />
                </div>
              )}
                  {activeStep === 3 && (
                <div>
                  <Businessactivities ref={BusinessActivities} />
                </div>
              )}
                   {activeStep === 4 && (
                <div>
                  <Supplychains ref={Supplychains} />
                </div>
              )} 
                   {activeStep === 5 && (
                <div>
                  <Policiesdiligence ref={PoliciesDiligenceProcesses} />
                </div>
              )} 
                   {activeStep === 6 && (
                <div>
                  <Risksforcedchildlabour ref={RisksofForced} />
                </div>
              )}  
            </div> 
          </div>
        </div>
      </div>

      {/* <MainValidationPopup
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
      /> */}

      <ToastContainer />
    </>
  );
};

export default Bills211Report;
