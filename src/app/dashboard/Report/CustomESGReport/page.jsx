'use client';

import React, { useState, useEffect,useRef } from 'react';
import SectionSelector from './components/SectionSelector';
import SubsectionSelector from './components/SubSectionSelector';
import ReportRenderer from './components/ReportRenderer';
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import Sidebar from './components/sidebar'

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
const sectionSelectorRef = useRef();
  const [step, setStep] = useState(0);
  const [sections, setSections] = useState(
        defaultSections.map((s, index) => ({
          ...s,
          order: index + 1,
        }))
      );
  const [selectedSubsections, setSelectedSubsections] = useState({});

  console.log(selectedSubsections,"look")

  useEffect(() => {
    const savedSections = JSON.parse(localStorage.getItem('report_sections') || '[]');
    const savedSubsections = JSON.parse(localStorage.getItem('report_subsections') || '{}');

    if (savedSections.length > 0) setSections(savedSections);
    if (Object.keys(savedSubsections).length > 0) setSelectedSubsections(savedSubsections);
  }, []);

  const handleNextStep = (selectedSections) => {
    localStorage.setItem('report_sections', JSON.stringify(selectedSections));
    setStep(1);
  };

  console.log(sections,"llok")

  return (


   <>
   <div className={[0,1].includes(step)?'':'flex'}>
   {
    [0,1].includes(step)?(
        <div></div>
    ):(
        <Sidebar
        sections={sections}
        setSections={setSections}
        selectedSubsections={selectedSubsections}
        />
    )
   }
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
                        //   if (activeStep > 15) {
                        //     router.push("/dashboard/Report");
                        //   } else {
                        //     handleNextStep("back");
                        //   }
                        }}
                        className="text-[12px] text-[#667085] flex gap-2 ml-3"
                      >
                        <FaArrowLeftLong className="w-3 h-3 mt-1" />
                        Back to Reports
                      </button>
                         {/* desktop section */}
                      <div className="hidden xl:block lg:block">
                        <p className="gradient-text text-[22px] font-bold pt-3 ml-3">
                          {/* {reportName} */}
                          Modular Report Name
                        </p>
                        <p className="mt-2 text-[#667085] text-[13px] ml-3">
                      Organization{' '}
                      JairajOrg
                       {/* {corpName ? " / Corporate" : ""}:{" "}
                      {orgName}{" "}
                      {corpName?' / ':''}
                      {corpName}{" "} */}
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
                <button
                            onClick={() => {
                                console.log('clicked')
                              sectionSelectorRef.current?.handleSubmit();
                            }}
                            className="flex w-[auto] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                          >
                           Confirm Modules & proceed {' ->'}
                          </button>
                </div>
              </div>
              </div>
             
            </div>
          </div>
          <div className="max-w-auto mx-4">
            {[0,1].includes(step)?(
                 <div className='px-6 pt-4'>
                 <h2 className="text-2xl font-semibold mb-4">Report Contents Overview</h2>
                      <p className="text-sm text-gray-600 mb-6">
                        {step==0?'Select and rearrange the sections that are required in the report.':'Select submodules for the selected topic.'}
                      </p>
            </div>
            ):(
                <div></div>
            )}
           
          {[0,1].includes(step)?(
            <div className="relative flex px-6 items-center justify-between mt-5 mb-5 w-1/3">
            {[1, 2].map((val, index) => (
    <React.Fragment key={index}>
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2
          ${
            index < step
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
          className={`flex-1 w-[180px] ${
            index < step ? "bg-blue-500" : "bg-gray-300"
          }`}
          style={{ height: "2px" }}
        />
      )}
    </React.Fragment>
  ))}
  
                </div>
          ):(
            <div></div>
          )}

{step === 0 && (
  <div className='p-6 pt-4'>
    <SectionSelector
  ref={sectionSelectorRef}
  sections={sections}
  setSections={setSections}
    // onNext={(selected) => {
    //   setSections(selected);
    //   console.log(selected,"look at it")
    //   localStorage.setItem('report_sections', JSON.stringify(selected));
    // }}
    onNext={handleNextStep}
  />
  </div>
  
)}

{step === 1 && (
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

{step === 2 && (
  <ReportRenderer
    sections={sections}
    selectedSubsections={selectedSubsections}
    onBack={() => setStep(2)}
  />
)}
</div>
    </div>
    
   </div>
   
   </>
  
  );
}
