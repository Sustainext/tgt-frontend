'use client';

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowLeft } from "react-icons/md";

// Redux selectors and actions
import {
  selectEnabledSections,
  selectSubsections,
  selectSelectedSubsections,
  selectCurrentReportPage,
  setSectionEditorOpen,
  selectIsSectionEditorOpen,
  setCurrentReportPage,
  selectSectionsToShow,
  setCurrentReportPageForReportType,
} from '../../../../../lib/redux/features/reportBuilderSlice';

import SectionEditorModal from './sectionEditorModal';

const ESGSidebarContent = ({
  closeMobile,
  onEditClick,
  reportType,
  allSections // Pass all sections for non-custom reports
}) => {
  const dispatch = useDispatch();
  const currentReportPage = useSelector(selectCurrentReportPage);
  
  // Use the new selector to get sections to show
  const sectionsToShow = reportType !== 'Custom ESG Report' ? allSections : useSelector(selectEnabledSections);
  const showEditButton = reportType === 'Custom ESG Report';

  const handleSectionClick = (sectionIndex) => {
    dispatch(setCurrentReportPage(sectionIndex));
    if (closeMobile) closeMobile();
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
        <span className="text-[16px] font-[600] p-2">Report Module</span>
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
        {sectionsToShow.map((section, index) => {
          const isActive = currentReportPage === index;
          
          return (
            <p
              key={section.id}
              className={`text-[13px] text-[#727272] cursor-pointer my-1 transition-colors ${
                isActive
                  ? "bg-[#007eef0d] p-2 px-5 border-r-2 border-blue-500"
                  : "bg-transparent p-2 px-5 hover:bg-gray-50"
              }`}
              onClick={() => handleSectionClick(index)}
            >
              {index + 1}. {section.title}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const ESGSidebar = ({
  setIsOpenMobile = () => {},
  isOpenMobile = false,
  reportType = 'Custom ESG Report', // Add reportType prop
  allSections = [] // Add allSections prop for non-custom reports
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
      <div className="m-3 ml-2 border border-r-2 border-b-2 shadow-lg rounded-lg hidden xl:block lg:block">
        <div className="flex items-start py-4 min-h-screen rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
        <ESGSidebarContent
            onEditClick={handleEditClick}
            reportType={reportType}
            allSections={allSections}
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
          />
        </div>
      </div>

      {/* Modal for editing section/subsection - only show for custom reports */}
      {isSectionEditorOpen && showEditModal && (
        <SectionEditorModal
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ESGSidebar;