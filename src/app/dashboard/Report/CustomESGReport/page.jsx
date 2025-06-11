'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SectionSelector from './components/SectionSelector';
import SubsectionSelector from './components/SubSectionSelector';
import ReportRenderer from './components/ReportRenderer';
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Sidebar from './components/sidebar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux imports
import {
  selectEnabledSections,
  selectCurrentReportPage,
  selectCanGoToNextPage,
  selectCanGoToPreviousPage,
  nextReportPage,
  previousReportPage,
} from '../../../../lib/redux/features/reportBuilderSlice';

const defaultSections = [
  { id: 'about_company', title: 'About the Company & Operations', mandatory: true },
  { id: 'message_ceo', title: 'Message From Our Leadership', mandatory: true },
  { id: 'mission_vision', title: 'Mission, Vision, Value', mandatory: true },
  { id: 'sustainability', title: 'Sustainability Roadmap', mandatory: true },
  { id: 'awards', title: 'Awards & Alliances', mandatory: true },
  { id: 'stakeholder', title: 'Stakeholder Engagement', mandatory: true },
  { id: 'about_report', title: 'About the Report', mandatory: false },
  { id: 'governance', title: 'Corporate Governance', mandatory: false },
  { id: 'journey', title: 'Sustainability Journey', mandatory: false },
  { id: 'economic', title: 'Economic Performance', mandatory: false },
  { id: 'environment', title: 'Environment', mandatory: false },
  { id: 'people', title: 'People', mandatory: false },
  { id: 'community', title: 'Community', mandatory: false },
  { id: 'customers', title: 'Customers, Products & Services', mandatory: false },
  { id: 'materiality', title: 'Materiality', mandatory: false },
];

export default function ReportBuilderPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const sectionSelectorRef = useRef();
  
  const [step, setStep] = useState(0);
  const [sections, setSections] = useState(
    defaultSections.map((s, index) => ({
      ...s,
      order: index + 1,
    }))
  );
  const [selectedSubsections, setSelectedSubsections] = useState({});
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  
  // Redux selectors for navigation
  const enabledSections = useSelector(selectEnabledSections);
  const currentReportPage = useSelector(selectCurrentReportPage);
  const canGoToNext = useSelector(selectCanGoToNextPage);
  const canGoToPrevious = useSelector(selectCanGoToPreviousPage);
  
  // Add reportType state - you can get this from props, localStorage, or API
  const [reportType, setReportType] = useState('Custom ESG Report');
  const [reportName, setReportName] = useState('');
  const [orgName, setOrgName] = useState('');

  console.log(selectedSubsections, "look");

  // useEffect(() => {
  //   const savedSections = JSON.parse(localStorage.getItem('report_sections') || '[]');
  //   const savedSubsections = JSON.parse(localStorage.getItem('report_subsections') || '{}');
  //   const savedReportType = localStorage.getItem('reportType') || 'Custom ESG Report';
  //   const savedReportName = localStorage.getItem('reportname') || 'Modular Report Name';
  //   const savedOrgName = localStorage.getItem('reportorgname') || 'JairajOrg';

  //   if (savedSections.length > 0) setSections(savedSections);
  //   if (Object.keys(savedSubsections).length > 0) setSelectedSubsections(savedSubsections);
  //   setReportType(savedReportType);
  //   setReportName(savedReportName);
  //   setOrgName(savedOrgName);
  // }, []);

  const handleNextStep = (selectedSections) => {
    localStorage.setItem('report_sections', JSON.stringify(selectedSections));
    setStep(1);
  };

  // Import refs for form submission
  const sectionRefs = useRef({
    message_ceo: React.createRef(),
    about_company: React.createRef(),
    mission_vision: React.createRef(),
    sustainability: React.createRef(),
    awards: React.createRef(),
    stakeholder: React.createRef(),
    about_report: React.createRef(),
    materiality: React.createRef(),
    governance: React.createRef(),
    journey: React.createRef(),
    environment: React.createRef(),
    community: React.createRef(),
    economic: React.createRef(),
    people: React.createRef(),
    customers: React.createRef(),
  });

  // Navigation handlers for report renderer (step 2)
  const handleReportNext = async () => {
    const currentSectionId = enabledSections[currentReportPage]?.id;
    const currentRef = sectionRefs.current[currentSectionId]?.current;

    if (currentRef) {
      const isSubmitted = await currentRef.submitForm("next");
      if (isSubmitted) {
        dispatch(nextReportPage());
      }
    } else {
      dispatch(nextReportPage());
    }
  };

  const handleReportPrevious = async () => {
    const currentSectionId = enabledSections[currentReportPage]?.id;
    const currentRef = sectionRefs.current[currentSectionId]?.current;

    if (currentRef) {
      await currentRef.submitForm("back");
    }
    dispatch(previousReportPage());
  };

  const handleCompleteReport = async () => {
    const currentSectionId = enabledSections[currentReportPage]?.id;
    const currentRef = sectionRefs.current[currentSectionId]?.current;

    if (currentRef) {
      const isSubmitted = await currentRef.submitForm("last");
      if (isSubmitted) {
        // Show success toast similar to non-custom report
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
        
        // Navigate back to reports after delay
        setTimeout(() => {
          router.push("/dashboard/Report");
        }, 4000);
      }
    } else {
      console.log('Report completed');
    }
  };

  // For non-custom reports, prepare all sections with default subsections
  const getAllSectionsWithSubsections = () => {
    if (reportType === 'Custom ESG Report') {
      return { sections, selectedSubsections };
    }
    
    // For non-custom reports, enable all sections and select all subsections
    const allEnabledSections = defaultSections.map((s, index) => ({
      ...s,
      order: index + 1,
      enabled: true // Enable all sections for non-custom reports
    }));

    // Default subsection selections for all sections
    const defaultSubsections = {
      about_company: ['business_model', 'value_chain', 'excluded_entities', 'supply_chain'],
      materiality: ['list_of_materials', 'topic_changes', 'materiality_process', 'management_strategy'],
      community: ['community_management', 'violation_rights', 'csr'],
      customers: ['products_services', 'safety_impact', 'non_compliance', 'product_labeling', 'label_management'],
      // Add other sections as needed
    };

    return {
      sections: allEnabledSections,
      selectedSubsections: reportType !== 'Custom ESG Report' ? defaultSubsections : selectedSubsections
    };
  };

  const { sections: displaySections, selectedSubsections: displaySubsections } = getAllSectionsWithSubsections();

  // Helper function to render navigation buttons
  const renderNavigationButtons = () => {
    if (step === 0) {
      // Step 0: Section selection
      return (
        <button
          onClick={() => {
            console.log('clicked')
            sectionSelectorRef.current?.handleSubmit();
          }}
          className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
        >
          Confirm Modules & proceed {' ->'}
        </button>
      );
    } else if (step === 1) {
      // Step 1: Subsection selection - no navigation buttons in header
      return null;
    } else if (step === 2) {
      // Step 2: Report renderer - show navigation like regular ESG report
      return (
        <>
          <button
            style={{
              display: !canGoToPrevious ? "none" : "inline-block",
            }}
            className="text-gray-500 px-3 py-1.5 rounded font-semibold w-[120px]"
            onClick={handleReportPrevious}
            disabled={!canGoToPrevious}
          >
            &lt; Previous
          </button>

          {canGoToNext ? (
            <button
              className="bg-blue-500 text-white px-3 py-1.5 rounded ml-2 font-semibold w-[100px]"
              onClick={handleReportNext}
            >
              Next &gt;
            </button>
          ) : (
            <button
              onClick={handleCompleteReport}
              className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
            >
              Complete Report
            </button>
          )}
        </>
      );
    }

    return null;
  };

  // Helper function to render mobile navigation
  const renderMobileNavigation = () => {
    if (step === 2) {
      return (
        <div className="block md:hidden lg:hidden xl:hidden mb-2 h-[43px]">
          <div className="float-right mr-2 flex items-center justify-center mb-2">
            <div className="flex items-center justify-center">
              {canGoToPrevious && (
                <button
                  className="text-gray-500 px-3 py-1.5 rounded font-semibold"
                  onClick={handleReportPrevious}
                >
                  &lt; Previous
                </button>
              )}

              {canGoToNext ? (
                <button
                  className="bg-blue-500 text-white px-3 py-1.5 rounded ml-2 font-semibold w-[100px]"
                  onClick={handleReportNext}
                >
                  Next &gt;
                </button>
              ) : (
                <button
                  onClick={handleCompleteReport}
                  className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                >
                  Complete Report
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  console.log(sections, "llok");

  return (
    <>
      <div className={[0, 1].includes(step) ? '' : 'flex'}>
        {[0, 1].includes(step) ? (
          <div></div>
        ) : (
          <Sidebar
            sections={displaySections}
            setSections={setSections}
            selectedSubsections={displaySubsections}
            reportType={reportType} // Pass reportType
            allSections={defaultSections} // Pass all sections for non-custom reports
          />
        )}
        <div className='w-full mb-5'>
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
                          {step === 2 && (
                            <button
                              onClick={() => setIsOpenMobile(true)}
                              className="text-gray-700"
                            >
                              <MdKeyboardArrowRight className="h-6 w-6 text-black" />
                            </button>
                          )}
                          <div>
                            <p className="gradient-text text-[22px] font-bold pt-3">
                              {reportName}
                            </p>
                            <p className="mt-2 text-[#667085] text-[13px]">
                              Organization: {orgName}
                            </p>
                            {/* Display report type */}
                            <p className="mt-1 text-[#667085] text-[11px]">
                              Report Type: {reportType}
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
                          Organization: {orgName}
                        </p>
                        {/* Display report type */}
                        {/* <p className="mt-1 text-[#667085] text-[11px] ml-3">
                          Report Type: {reportType}
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desktop section */}
              <div className="hidden md:block lg:block xl:block">
                <div className="float-right mr-2 flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    {renderNavigationButtons()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {renderMobileNavigation()}

          <div className="max-w-auto mx-4">
            {/* Only show step indicators and selection for custom reports */}
            {reportType === 'Custom ESG Report' && [0, 1].includes(step) && (
              <div className='px-6 pt-4'>
                <h2 className="text-2xl font-semibold mb-4">Report Contents Overview</h2>
                <p className="text-sm text-gray-600 mb-6">
                  {step === 0 ? 'Select and rearrange the sections that are required in the report.' : 'Select submodules for the selected topic.'}
                </p>
              </div>
            )}

            {/* Step indicator - only for custom reports */}
            {reportType === 'Custom ESG Report' && [0, 1].includes(step) && (
              <div className="relative flex px-6 items-center justify-between mt-5 mb-5 w-1/3">
                {[1, 2].map((val, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                        ${index < step
                          ? "bg-blue-500 text-white border-blue-500"
                          : index === step
                            ? "text-blue-500 border-blue-500"
                            : "bg-[#007eef26] text-white border-white"
                        }
                        transition-colors duration-300`}
                    >
                      {index < step ? <MdOutlineDone /> : index + 1}
                    </div>
                    {index < 2 - 1 && (
                      <div
                        className={`flex-1 w-[180px] ${index < step ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        style={{ height: "2px" }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Section Selection - only for custom reports */}
            {reportType === 'Custom ESG Report' && step === 0 && (
              <div className='p-6 pt-4'>
                <SectionSelector
                  ref={sectionSelectorRef}
                  sections={sections}
                  setSections={setSections}
                  onNext={handleNextStep}
                />
              </div>
            )}

            {/* Subsection Selection - only for custom reports */}
            {reportType === 'Custom ESG Report' && step === 1 && (
              <div className='p-6 pt-4'>
                <SubsectionSelector
                  sections={sections}
                  onBack={() => setStep(0)}
                  onNext={(subsections) => {
                    setSelectedSubsections(subsections);
                    localStorage.setItem('report_subsections', JSON.stringify(subsections));
                    setStep(2);
                  }}
                />
              </div>
            )}

            {/* Report Renderer - always show for step 2, or immediately for non-custom reports */}
            {(step === 2 || reportType !== 'Custom ESG Report') && (
              <ReportRenderer
                sections={displaySections}
                selectedSubsections={displaySubsections}
                sectionRefs={sectionRefs.current}
                onBack={() => setStep(2)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay for sidebar - only show in step 2 */}
      {step === 2 && isOpenMobile && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setIsOpenMobile(false)}
          />
          <div
            className={`fixed top-[7rem] left-0 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 w-72`}
          >
            <div className="p-4">
              {/* Add mobile sidebar content here if needed */}
              <div className="font-medium">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[16px] font-[600] text-[#727272]">
                    Report Module
                  </span>
                  <button
                    onClick={() => setIsOpenMobile(false)}
                    className="text-gray-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
}