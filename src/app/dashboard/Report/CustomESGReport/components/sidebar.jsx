"use client";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowLeft } from "react-icons/md";

// Redux selectors and actions
import {
  selectEnabledSections,
  selectCurrentReportPage,
  setSectionEditorOpen,
  selectIsSectionEditorOpen,
  setCurrentReportPage,
} from '../../../../../lib/redux/features/reportBuilderSlice';

import SectionEditorModal from './sectionEditorModal';

// Sidebar content component
const ESGSidebarContent = ({
  closeMobile,
  onEditClick,
  reportType,
  allSections = [],
  activeStep,
  setActiveStep
}) => {
  const dispatch = useDispatch();
  const enabledSections = useSelector(selectEnabledSections);
  const currentReportPage = useSelector(selectCurrentReportPage);
  
  // Determine sections to show based on report type
  const sectionsToShow = reportType === 'Custom ESG Report' ? enabledSections : allSections;
  const showEditButton = reportType === 'Custom ESG Report';
  const isCustomReport = reportType === 'Custom ESG Report';

  // Get the original section names with proper titles
  const getOriginalSections = () => {
    const baseNames = [
      "Message from Our Leadership",
      "About the Company & Operations",
      "Mission, Vision, Value", 
      "Sustainability Roadmap",
      "Awards & Alliances",
      "Stakeholder Engagement",
      "About the Report",
      "Materiality",
      "Corporate Governance",
      "Sustainability Journey",
      "Economic Performance",
      "Environment",
      "People",
      "Community",
      "Customers, products & services"
    ];

    if (reportType === 'GRI Report: With Reference to') {
      baseNames.push('Management of Material Topic');
    }

    return baseNames.filter(Boolean);
  };

  const originalSectionNames = getOriginalSections();

  const handleSectionClick = (sectionIndex) => {
    if (isCustomReport) {
      dispatch(setCurrentReportPage(sectionIndex));
    } else {
      setActiveStep(sectionIndex + 1);
    }
    if (closeMobile) closeMobile();
  };

  const getCurrentActiveIndex = () => {
    if (isCustomReport) {
      return currentReportPage;
    } else {
      return activeStep - 1;
    }
  };

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
        {showEditButton && (
          <button
            onClick={onEditClick}
            className="text-[12px] px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
          >
            Edit
          </button>
        )}
      </div>

      {/* Section List */}
      <div className="mb-3">
        {isCustomReport ? (
          // Custom report sections
          sectionsToShow.map((section, index) => (
            <p
              key={section.id}
              className={`text-[13px] text-[#727272] cursor-pointer my-1 transition-colors ${
                getCurrentActiveIndex() === index
                  ? "bg-[#007eef0d] p-2 px-5 border-r-2 border-blue-500"
                  : "bg-transparent p-2 px-5 hover:bg-gray-50"
              }`}
              onClick={() => handleSectionClick(index)}
            >
              {index + 1}. {section.title}
            </p>
          ))
        ) : (
          // Original report sections
          originalSectionNames.map((sectionName, index) => (
            <p
              key={index}
              className={`text-[13px] text-[#727272] cursor-pointer my-1 ${
                getCurrentActiveIndex() === index
                  ? "bg-[#007eef0d] p-2 px-5"
                  : "bg-transparent p-2 px-5"
              }`}
              onClick={() => handleSectionClick(index)}
            >
              {sectionName}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

// Main Sidebar Component
const UnifiedESGSidebar = ({
  setIsOpenMobile = () => {},
  isOpenMobile = false,
  reportType = 'Custom ESG Report',
  allSections = [],
  activeStep,
  setActiveStep
}) => {
  const dispatch = useDispatch();
  const isSectionEditorOpen = useSelector(selectIsSectionEditorOpen);
  const showEditModal = reportType === 'Custom ESG Report';

  const handleEditClick = () => {
    if (showEditModal) {
      dispatch(setSectionEditorOpen(true));
    }
  };

  const handleCloseModal = () => {
    dispatch(setSectionEditorOpen(false));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="m-3 ml-2 border border-r-2 border-b-2 shadow-lg rounded-lg h-full hidden xl:block lg:block">
        <div className="flex items-start py-4 h-screen rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
          <ESGSidebarContent
            onEditClick={handleEditClick}
            reportType={reportType}
            allSections={allSections}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
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
            closeMobile={() => setIsOpenMobile(false)}
            onEditClick={handleEditClick}
            reportType={reportType}
            allSections={allSections}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
      </div>

      {/* Modal for editing section/subsection - only show for custom reports */}
      {isSectionEditorOpen && showEditModal && (
        <SectionEditorModal onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UnifiedESGSidebar;