'use client';

import React, { useState, useEffect, useRef,useMemo } from 'react';
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
import { Oval } from "react-loader-spinner";




// Redux imports
import {
  selectEnabledSections,
  selectSections,
  selectCurrentReportPage,
  selectCanGoToNextPage,
  selectCanGoToPreviousPage,
  nextReportPage,
  previousReportPage,
  selectSectionsForReportType,
  fetchReportBuilderData,
  selectSkipSelectionPage,
  updateReportBuilderData
} from '../../../../lib/redux/features/reportBuilderSlice';

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
  }
];

export default function ReportBuilderPage({loadMissingFields,hasChanges}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const sectionSelectorRef = useRef();
  const subsectionSelectorRef = useRef();
  

  
  const [step, setStep] = useState(0);
  // const [sections, setSections] = useState(
  //   defaultSections.map((s, index) => ({
  //     ...s,
  //     order: index + 1,
  //   }))
  // );
  const reportid =
  typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
    const sections = useSelector(selectSections);
  const [selectedSubsections, setSelectedSubsections] = useState({});
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const skipSelectionPage=useSelector(selectSkipSelectionPage)
  const [loopen, setLoOpen] = useState(false);
 

  // console.log(skipSelectionPage,step,'see page skip')

  useEffect(() => {
    if (reportid) {
      dispatch(fetchReportBuilderData(reportid));
      if(skipSelectionPage){
        setStep(2)
      }
    }
  }, [dispatch, reportid,skipSelectionPage]); 

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  
  // Redux selectors for navigation
  const enabledSections = useSelector(selectEnabledSections);
  const currentReportPage = useSelector(selectCurrentReportPage);
  const canGoToNext = useSelector(selectCanGoToNextPage);
  const canGoToPrevious = useSelector(selectCanGoToPreviousPage);
  
  // Add reportType state - you can get this from props, localStorage, or API
  const [reportType, setReportType] = useState('Custom ESG Report');
  const [reportName, setReportName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [corpName, setCorpName] = useState('');
  const [reportingPeriod,setReportingPeriod]=useState('')

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
    // const savedSections = JSON.parse(localStorage.getItem('report_sections') || '[]');
    // const savedSubsections = JSON.parse(localStorage.getItem('report_subsections') || '{}');
    const savedReportType = localStorage.getItem('reportType') || 'Custom ESG Report';
    const savedReportName = localStorage.getItem('reportname') || 'Modular Report Name';
    const savedOrgName = localStorage.getItem('reportorgname') || '';

    // if (savedSections.length > 0) setSections(savedSections);
    // if (Object.keys(savedSubsections).length > 0) setSelectedSubsections(savedSubsections);
    setReportType(savedReportType);
    setReportName(savedReportName);
    setOrgName(savedOrgName);
    setCorpName(localStorage.getItem('reportCorpName') || '')
    setReportingPeriod(formatDate(localStorage.getItem('reportstartdate')) +" to "+ formatDate(localStorage.getItem('reportenddate')))
  }, []);

  const handleNextStep = () => {
    localStorage.setItem('report_sections', JSON.stringify(sections));
    setStep(1);
  };

   // Get sections based on report type - this ensures default order for non-custom reports
   const sectionsToUse = useSelector(selectSectionsForReportType(reportType || "", defaultSections)); 
  // Import refs for form submission
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
  };
  const currentSection = useMemo(() => {
      return sectionsToUse[currentReportPage] || null;
    }, [sectionsToUse, currentReportPage]);
 
  

  // Navigation handlers for report renderer (step 2)
  const handleReportNext = async (type) => {
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
      loadMissingFields()
      // if (isSubmitted) {
      //   // loadMissingFields();
      //   return
      // }
    }else if(type === "back") {
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

    // if (currentRef) {
    //   const isSubmitted = await currentRef.submitForm("next");
    //   if (isSubmitted) {
    //     dispatch(nextReportPage());
    //   }
    // } else {
    //   dispatch(nextReportPage());
    // }
  };

  const handleReportPrevious = async () => {
    // const currentRef = sectionRefs[currentSection?.id]?.current;
    // if (currentRef) {
    //   await currentRef.submitForm("back");
    // }
    dispatch(previousReportPage());
  };

  const handleCompleteReport = async () => {
    const currentRef = sectionRefs[currentSection?.id]?.current;
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
            sectionSelectorRef.current?.handleSubmit();
          }}
          className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
        >
          Confirm Modules & proceed {' ->'}
        </button>
      );
    } else if (step === 1) {
      // Step 1: Subsection selection - no navigation buttons in header
      return (
        <div className='flex'>
           <button
       
        className="text-gray-500 px-3 py-1.5 rounded cursor-pointer font-semibold w-[100px]"
        onClick={()=>{setStep(0)}}
      >
        &lt; Back
      </button>
      <button
  className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
  onClick={() => {
    subsectionSelectorRef.current?.handleProceed();
  }}
>
  Proceed to Report {' ->'}
</button>
        </div>
       
      );
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
              onClick={()=>{handleReportNext('next')}}
            >
              Next &gt;
            </button>
          ) : (
            <button
              onClick={()=>{handleReportNext('last')}}
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
    return (
      <div className="block md:hidden lg:hidden xl:hidden mb-4 px-4">
        <div className="flex items-center gap-2">
          {step === 0 && (
            <div className="flex justify-end px-4 w-full">
            <button
              onClick={() => {
                sectionSelectorRef.current?.handleSubmit();
              }}
              className="w-auto rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Confirm Modules & Proceed →
            </button>
          </div>
          )}
  
          {step === 1 && (
            <div className="flex justify-end px-4 w-full">
              <button
                onClick={() => setStep(0)}
                className="text-gray-500 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
              >
                {"<"} Back
              </button>
              <button
                onClick={() => subsectionSelectorRef.current?.handleProceed()}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Proceed to Report →
              </button>
            </div>
          )}
  
          {step === 2 && (
            <div className='flex justify-end px-4 w-full'>
              {canGoToPrevious && (
                <button
                  className="text-gray-500 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
                  onClick={handleReportPrevious}
                >
                  {"<"} Previous
                </button>
              )}
              {canGoToNext ? (
                <button
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => handleReportNext("next")}
                >
                  Next {">"}
                </button>
              ) : (
                <button
                  onClick={() => handleReportNext("last")}
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Complete Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  


  return (
    <>
      <div className={[0, 1].includes(step) ? '' : 'flex'}>
        {[0, 1].includes(step) ? (
          <div></div>
        ) : (
          <Sidebar
            sections={displaySections}
            // setSections={setSections}
            selectedSubsections={displaySubsections}
            reportType={reportType} // Pass reportType
            allSections={defaultSections} // Pass all sections for non-custom reports
            submitData={handleReportNext}
            setIsOpenMobile={setIsOpenMobile}
            isOpenMobile={isOpenMobile}
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
                          handleReportNext('back')
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
                            
                            {/* Display report type */}
                            {/* <p className="mt-1 text-[#667085] text-[11px]">
                              Report Type: {reportType}
                            </p> */}
                          </div>
                        </div>
                      </div>
                      
                      {/* Desktop section */}
                      <div className="hidden xl:block lg:block">
                        <p className="gradient-text text-[22px] font-bold pt-3 ml-3">
                          {reportName}
                        </p>
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

          <div className="max-w-auto mx-2 lg:mx-4">
            {/* Only show step indicators and selection for custom reports */}
            {reportType === 'Custom ESG Report' && [0, 1].includes(step) && (
              <div className='px-6 pt-4'>
                <h2 className="text-2xl font-semibold mb-4">{step === 0?'Customize Report':'Select Sub-sections'}</h2>
                <p className="text-sm text-gray-600 mb-6">
                  {step === 0 ? 'The following shows the contents of the report. Select the sections that you would like to include in the report and rearrange them in the desired order. To proceed to next step, select at least one section.' : 'For each of the selected sections, choose the sub-sections which should appear in the report. Relevant data from the Collect module will be included.'}
                </p>
              </div>
            )}

            {/* Step indicator - only for custom reports */}
            {reportType === 'Custom ESG Report' && [0, 1].includes(step) && (
              <div className="relative flex px-6 items-center justify-between mt-5 mb-5 w-[70%] lg:w-1/3">
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
                  // sections={sections}
                  // setSections={setSections}
                  onNext={handleNextStep}
                />
              </div>
            )}

            {/* Subsection Selection - only for custom reports */}
            {reportType === 'Custom ESG Report' && step === 1 && (
              <div className='p-6 pt-4'>
                {/* <SubsectionSelector
                  sections={sections}
                  onBack={() => setStep(0)}
                  onNext={(subsections) => {
                    setSelectedSubsections(subsections);
                    localStorage.setItem('report_subsections', JSON.stringify(subsections));
                    setStep(2);
                  }}
                /> */}
                <SubsectionSelector
  ref={subsectionSelectorRef}
  sections={sections}
  onBack={() => setStep(0)}
  onNext={(subsections) => {
    LoaderOpen()
    setSelectedSubsections(subsections);
    dispatch(updateReportBuilderData(reportid))
  .unwrap()
  .then(() => {
    LoaderClose()
    toast.success('Report Created Successfully!');
    setStep(2);
  })
  .catch(err => {
    LoaderClose()
    toast.error(`Failed to update report`);
  });

  }}
/>
              </div>
            )}

            {/* Report Renderer - always show for step 2, or immediately for non-custom reports */}
            {(step === 2) && (
              <ReportRenderer
                sections={displaySections}
                selectedSubsections={displaySubsections}
                sectionRefs={sectionRefs}
                onBack={() => setStep(2)}
                hasChanges={hasChanges}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay for sidebar - only show in step 2 */}

{/* {isOpenMobile && step === 2 && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setIsOpenMobile(false)}
            />
            <div
              className={`fixed top-[7rem] left-0 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 w-72`}
            >
              <div className="p-4">
              <Sidebar
         sections={displaySections}
         // setSections={setSections}
         selectedSubsections={displaySubsections}
         reportType={reportType} // Pass reportType
         allSections={defaultSections} // Pass all sections for non-custom reports
         submitData={handleReportNext}
        onClose={() => setIsOpenMobile(false)} // Optional close handler
      />
              </div>
            </div>
          </>
        )} */}


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

      {/* <ToastContainer /> */}
    </>
  );
}