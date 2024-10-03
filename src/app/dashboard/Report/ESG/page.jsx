'use client'
import { useState, useRef, useEffect } from "react";
import Sidebar from "./sidebar";
import MissionVission from "./mission-vision/page";
import AwardsRecognition from "./awards-recognition/page";
import SustainibilityRoadmap from "./sustainibility-roadmap/page";
import Companyoperations from "./company-operations/page";
import StakeholderEngagement from "./stakeholder-engagement/page";
import AboutTheReport from "./about-report/page";
import Materiality from "./materilality/page";
import SustainibilityJourney from "./sustainibility-journey/page";
import CorporateGovernance from "./corporate-governance/page";
import Community from "./community/page";
import EconomicPerformance from "./economic-performance/page";
import CustomerProductService from "./customer-product-services/page";
import People from "./people/page";
import MessageFromCEO from "./message-from-ceo/page";
import Environment from "./environment/page";

const ESGReport = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [reportName,setReportName]=useState("Report")
  const messageFromCeoRef = useRef(); // Use useRef to store a reference to submitForm
  const aboutTheCompany=useRef();

  // Move to the next step when submission is successful
  const handleNextStep = async () => {
    if (activeStep === 1) {
      const isSubmitted = await messageFromCeoRef.current.submitForm(); // Call submitForm for step 1
      if (isSubmitted) {
        setActiveStep((prev) => prev + 1); // Only move to the next step if form is successfully submitted
      }
    } 
    else if (activeStep===2) {
      const isSubmitted = await aboutTheCompany.current.submitForm(); // Call submitForm for step 1
      if (isSubmitted) {
        setActiveStep((prev) => prev + 1); // Only move to the next step if form is successfully submitted
      }
    }
    else{
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  useEffect(()=>{
    if(localStorage.getItem("reportname")){
      setReportName(localStorage.getItem("reportname"))
    }
  },[])

  return (
    <>
      <div className="flex">
        <Sidebar activeStep={activeStep} setActiveStep={setActiveStep} />
        <div className="w-full mb-5">
          <div className="flex flex-col justify-start overflow-x-hidden">
            <div className="flex justify-between items-center border-b border-gray-200 mb-3 w-full">
              <div className="w-[70%]">
                <div className="text-left mb-3 ml-3 pt-3">
                  <div className="flex">
                    <div>
                      <p className="gradient-text text-[22px] font-bold pt-4 pb-4 ml-3">
                       {reportName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-right mr-2 flex items-center justify-center">
                <div className="flex items-center justify-center">
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

                  {activeStep < 15 ? (
                    <button
                      className={`${
                        activeStep === 15
                          ? "bg-gray-300"
                          : "bg-blue-500 text-white"
                      } px-3 py-1.5 rounded ml-2 font-semibold w-[100px]`}
                      onClick={handleNextStep}// Call the form submit and next step handler
                      disabled={activeStep === 15}
                    >
                      Next &gt;
                    </button>
                  ) : (
                    <button
                      className="flex w-[120px] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-3 my-2">
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
                    <MissionVission />
                  </div>
                </div>
              )}
              {activeStep === 4 && (
                <div>
                  <div className="mb-4">
                    <SustainibilityRoadmap />
                  </div>
                </div>
              )}
              {activeStep === 5 && (
                <div>
                  <div className="mb-4">
                    <AwardsRecognition />
                  </div>
                </div>
              )}
              {activeStep === 6 && (
                <div>
                  <div className="mb-4">
                    <StakeholderEngagement />
                  </div>
                </div>
              )}
              {activeStep === 7 && (
                <div>
                  <div className="mb-4">
                    <AboutTheReport />
                  </div>
                </div>
              )}
              {activeStep === 8 && (
                <div>
                  <div className="mb-4">
                    <Materiality />
                  </div>
                </div>
              )}
              {activeStep === 9 && (
                <div>
                  <div className="mb-4">
                    <CorporateGovernance />
                  </div>
                </div>
              )}
              {activeStep === 10 && (
                <div>
                  <div className="mb-4">
                    <SustainibilityJourney />
                  </div>
                </div>
              )}
              {activeStep === 11 && (
                <div>
                  <div className="mb-4">
                    <EconomicPerformance />
                  </div>
                </div>
              )}
              {activeStep === 12 && (
                <div>
                  <div className="mb-4">
                    <Environment />
                  </div>
                </div>
              )}
              {activeStep === 13 && (
                <div>
                  <div className="mb-4">
                    <People />
                  </div>
                </div>
              )}
              {activeStep === 14 && (
                <div>
                  <div className="mb-4">
                    <Community />
                  </div>
                </div>
              )}
              {activeStep === 15 && (
                <div>
                  <div className="mb-4">
                    <CustomerProductService />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ESGReport;
