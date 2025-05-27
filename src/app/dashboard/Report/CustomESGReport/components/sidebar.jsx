'use client';

import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
// import SectionSelectorModal from "./SectionSelectorModal";
import SectionSelector from "./SectionSelector"; 
import SectionEditorModal from './sectionEditorModal'


const ESGSidebarContent = ({
  activeStep,
  setActiveStep,
  closeMobile,
  sections,
  onEditClick
}) => {
  const enabledSections = sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="font-medium">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2 xl:hidden lg:hidden">
        <span className="text-[16px] font-[600] text-[#727272]">Report Module</span>
        <button onClick={closeMobile} className="text-gray-700">
          <MdKeyboardArrowLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop Header with Edit */}
      <div className="hidden xl:flex justify-between items-center px-4 py-2 text-[#727272] font-bold">
        <span className="text-[16px] font-[600]">Report Module</span>
        <button
          onClick={onEditClick}
          className="text-[12px] px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Edit
        </button>
      </div>

      {/* Section List */}
      <div className="mb-3">
        {enabledSections.map((section, index) => {
          const step = index + 1;
          return (
            <p
              key={section.id}
              className={`text-[13px] text-[#727272] cursor-pointer my-1 ${
                activeStep === step
                  ? "bg-[#007eef0d] p-2 px-5"
                  : "bg-transparent p-2 px-5"
              }`}
              onClick={() => {
                setActiveStep(step);
                if (closeMobile) closeMobile();
              }}
            >
              {section.title}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const ESGSidebar = ({
  activeStep,
  setActiveStep,
  setIsOpenMobile,
  isOpenMobile,
  sections,
  selectedSubsections,
  setSections,
  onSectionUpdate, // callback to update main config
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="m-3 ml-2 border border-r-2 border-b-2 shadow-lg rounded-lg h-full hidden xl:block lg:block">
        <div className="flex items-start py-4 h-screen rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
          <ESGSidebarContent
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            sections={sections}
            onEditClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-[7rem] left-0 h-full z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        } w-72`}
      >
        <div className="p-4">
          <ESGSidebarContent
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            closeMobile={() => setIsOpenMobile(false)}
            sections={sections}
            onEditClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal for editing section/subsection */}
      {isModalOpen && (
        // <SectionSelectorModal
        //   initialSections={sections}
        //   onClose={() => setIsModalOpen(false)}
        //   onSave={(updated) => {
        //     onSectionUpdate(updated);
        //     setIsModalOpen(false);
        //   }}
        // />
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl">
           
            <div className="flex justify-between items-center drop-shadow-lg w-full">
              <div className="flex">
                <h2 className="text-black text-[18px] font-bold">
                Edit Section Selection
                </h2>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
               onClick={()=>{setIsModalOpen(false)}}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto table-scrollbar max-h-[500px] w-full mt-5">
           {/* <SectionSelector
        //   ref={sectionSelectorRef}
          sections={sections}
          setSections={setSections}
            // onNext={(selected) => {
            //   setSections(selected);
            //   console.log(selected,"look at it")
            //   localStorage.setItem('report_sections', JSON.stringify(selected));
            // }}
            // onNext={handleNextStep}
          /> */}
          <SectionEditorModal
    allSections={sections}
    subsectionOptions={selectedSubsections}
    setSections={setSections}
    onClose={() => setIsModalOpen(false)}
  />
           </div>
            </div>
            </div>
       
      )}
    </>
  );
};

export default ESGSidebar;
