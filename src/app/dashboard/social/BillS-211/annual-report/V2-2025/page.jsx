"use client";
import React, { useState } from "react";
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
import SocialBillS211Header from "../../../socialBillS211Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportingforEntities = ({ setMobileopen,selectedCorp,selectedOrg,year,reportType }) => {
  const toggleSidebar = () => {
    setMobileopen(true);
  };
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const totalSteps = 8;
  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };



  return (
    <>
      <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-full">
            <div className="text-left mb-2 ml-3 pt-5">
              <p className="text-[11px]">Social</p>
              <div className="flex">
                <div className="h-[29px]">
                  <p className="gradient-text text-[22px] h-[52px] font-bold pt-1">
                    Bill S-211 - Fighting Against Forced Labour and Child Labour
                    in Supply Chains Act (Bill S-211)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div
            className="w-full  py-4  rounded-md  shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)]"
            onClick={toggleSidebar}
          >
            <div className="text-left mb-2 ml-3 pt-5">
              <p className="text-[11px]">Social</p>
              <div className="flex">
                <div className="h-[50px]">
                  <p className="gradient-text text-[16px] md:text-[20px] h-[52px] font-bold pt-1">
                    Bill S-211 - Fighting Against Forced Labour and Child Labour
                    in Supply Chains Act (Bill S-211)
                  </p>
                </div>
                <div className="flex items-center me-5">
                  <MdKeyboardArrowDown
                    className={`text-2xl float-end md:-mt-[18px] `}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-5">
        <div className="flex">
          <div className="w-[72%]">
            <p className="font-semibold text-[17px] mb-4 mx-4">
              {" "}
              Reporting for Entities
            </p>
          </div>
        </div>
      </div>


      <div className="xl:h-[670px] lg:h-[670px] md:h-[670px] 2k:h-[670px] 4k:h-[670px] h-auto overflow-y-auto scrollable-content">
        {currentStep === 1 && (
          <Screenone
            nextStep={nextStep}
            selectedCorp={selectedCorp}
            selectedOrg={selectedOrg}
            year={year}
            reportType={reportType}
            // handleChange={handleChange}
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
          />
        )}
      </div>
      <div className="w-full mb-5">
        <div className="flex justify-center space-x-4 mt-[15px] w-full">
          {/* Previous Button */}
          <button
            className={`px-2  h-[27px] rounded-md text-dark ${
              currentStep === 1 ? "text-gray-300" : ""
            }`}
            disabled={currentStep === 1}
            onClick={() => prevStep()}
            // style={{ display: currentStep === 1 ? "none" : "inline-block" }}
          >
            <MdOutlineNavigateBefore />
          </button>

          {/* Number Buttons */}
          {[...Array(totalSteps)].map((_, i) => (
            <button
              key={i}
              className={`px-2 h-[27px] text-[0.9rem] rounded-md ${
                currentStep === i + 1
                  ? "bg-white shadow-md text-blue-600"
                  : "text-dark hover:bg-gray-300"
              }`}
              onClick={() => goToStep(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            className={`px-2  h-[27px] rounded-md text-dark ${
              currentStep === 8 ? "text-gray-300" : ""
            }`}
            disabled={currentStep === totalSteps}
            onClick={() => nextStep()}
            // style={{ display: currentStep === 7 ? "none" : "inline-block" }}
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
      <ToastContainer style={{ fontSize: "12px" }} />
    </>
  );
};

export default ReportingforEntities;
