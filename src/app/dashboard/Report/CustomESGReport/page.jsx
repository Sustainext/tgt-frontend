'use client';

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";

// Redux selectors and actions
import {
  selectCurrentStep,
  selectSections,
  selectSelectedSubsections,
  selectEnabledSections,
  setCurrentStep,
  nextStep,
  previousStep,
  loadFromLocalStorage,
} from '../../../../lib/redux/features/reportBuilderSlice';

// Components
import SectionSelector from './components/SectionSelector';
import SubsectionSelector from './components/SubSectionSelector';
import ReportRenderer from './components/ReportRenderer';
import Sidebar from './components/sidebar';

export default function ReportBuilderPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const sectionSelectorRef = useRef();

  // Redux state
  const currentStep = useSelector(selectCurrentStep);
  const sections = useSelector(selectSections);
  const selectedSubsections = useSelector(selectSelectedSubsections);
  const enabledSections = useSelector(selectEnabledSections);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedSections = JSON.parse(localStorage.getItem('report_sections') || 'null');
      const savedSubsections = JSON.parse(localStorage.getItem('report_subsections') || '{}');
      const savedStep = JSON.parse(localStorage.getItem('report_step') || '0');

      if (savedSections || Object.keys(savedSubsections).length > 0 || savedStep !== 0) {
        dispatch(loadFromLocalStorage({
          sections: savedSections,
          selectedSubsections: savedSubsections,
          step: savedStep,
        }));
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  }, [dispatch]);

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handlePreviousStep = () => {
    dispatch(previousStep());
  };

  const handleConfirmAndProceed = () => {
    if (sectionSelectorRef.current?.handleSubmit) {
      sectionSelectorRef.current.handleSubmit();
    }
  };

  const renderStepIndicator = () => {
    const steps = [1, 2];
    
    return (
      <div className="relative flex px-6 items-center justify-between mt-5 mb-5 w-1/3">
        {steps.map((stepNumber, index) => (
          <React.Fragment key={index}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                ${
                  index < currentStep
                    ? "bg-blue-500 text-white border-blue-500"
                    : index === currentStep
                    ? "text-blue-500 border-blue-500"
                    : "bg-[#007eef26] text-white border-white"
                }
                transition-colors duration-300`}
            >
              {index < currentStep ? <MdOutlineDone /> : stepNumber}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 w-[180px] ${
                  index < currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
                style={{ height: "2px" }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderHeader = () => (
    <div className="flex flex-col justify-start overflow-x-hidden">
      <div className="flex justify-between items-center border-b border-gray-200 mb-3 w-full">
        <div className="w-[70%]">
          <div className="text-left mb-3 ml-3 pt-3">
            <div className="flex">
              <div>
                <button
                  onClick={() => router.push("/dashboard/Report")}
                  className="text-[12px] text-[#667085] flex gap-2 ml-3"
                >
                  <FaArrowLeftLong className="w-3 h-3 mt-1" />
                  Back to Reports
                </button>
                
                {/* Desktop section */}
                <div className="hidden xl:block lg:block">
                  <p className="gradient-text text-[22px] font-bold pt-3 ml-3">
                    Modular Report Name
                  </p>
                  <p className="mt-2 text-[#667085] text-[13px] ml-3">
                    Organization JairajOrg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop section */}
        <div className="hidden md:block lg:block xl:block">
          <div className="float-right mr-2 flex items-center justify-center">
            <div className="flex items-center justify-center">
              <button
                onClick={handleConfirmAndProceed}
                className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
              >
                Confirm Modules & proceed {' ->'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    const showStepInfo = [0, 1].includes(currentStep);
    
    return (
      <div className="max-w-auto mx-4">
        {showStepInfo && (
          <div className='px-6 pt-4'>
            <h2 className="text-2xl font-semibold mb-4">Report Contents Overview</h2>
            <p className="text-sm text-gray-600 mb-6">
              {currentStep === 0 
                ? 'Select and rearrange the sections that are required in the report.'
                : 'Select submodules for the selected topic.'
              }
            </p>
          </div>
        )}
        
        {showStepInfo && renderStepIndicator()}

        {currentStep === 0 && (
          <div className='p-6 pt-4'>
            <SectionSelector
              ref={sectionSelectorRef}
              onNext={handleNextStep}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className='p-6 pt-4'>
            <SubsectionSelector
              onBack={handlePreviousStep}
              onNext={handleNextStep}
            />
          </div>
        )}

        {currentStep === 2 && (
          <ReportRenderer
            onBack={handlePreviousStep}
          />
        )}
      </div>
    );
  };

  return (
    <div className={[0, 1].includes(currentStep) ? '' : 'flex'}>
      {/* Sidebar - only show on report step */}
      {![0, 1].includes(currentStep) && (
        <Sidebar />
      )}
      
      <div className='w-full mb-5'>
        {renderHeader()}
        {renderStepContent()}
      </div>
    </div>
  );
}