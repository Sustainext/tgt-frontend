'use client';

import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowLeft, MdOutlineEdit } from 'react-icons/md';

// Redux
import {
  selectEnabledSections,
  selectCurrentReportPage,
  setSectionEditorOpen,
  selectIsSectionEditorOpen,
  setCurrentReportPage
} from '../../../../../lib/redux/features/reportBuilderSlice';

import SectionEditorModal from './sectionEditorModal';

const ESGSidebarContent = ({
  closeMobile,
  onEditClick,
  reportType,
  allSections,
  submitData
}) => {
  const dispatch = useDispatch();
  const currentReportPage = useSelector(selectCurrentReportPage);
  const sectionsToShow = reportType !== 'Custom ESG Report'
    ? allSections
    : useSelector(selectEnabledSections);
  const showEditButton = reportType === 'Custom ESG Report';

  const filteredSections = useMemo(() => {
    if (reportType === 'GRI Report: In accordance With') {
      return sectionsToShow.filter(
        section => section.id !== 'reference_management_of_material_topic'
      );
    }
    return sectionsToShow;
  }, [reportType, sectionsToShow]);

  const handleSectionClick = (sectionIndex) => {
    submitData('toggle');
    dispatch(setCurrentReportPage(sectionIndex));
    if (closeMobile) closeMobile();
  };

  return (
    <div className="font-medium w-full">
      {/* Mobile Header */}
      <div className="xl:hidden lg:hidden">
        {showEditButton && (
          <div className="flex justify-between items-start">
            <button
              onClick={onEditClick}
              className="text-[12px] flex gap-2 mx-2 text-[#556A7D] px-1 mb-3 pb-3 w-[80%] text-left py-1 border-b-2 border-gray-200"
            >
              Edit Report Template <MdOutlineEdit className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-[16px] font-[600] text-[#727272] p-1">Report Module</span>
          <button onClick={closeMobile} className="text-gray-700">
              <MdKeyboardArrowLeft className="h-6 w-6" />
            </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden xl:block">
        {showEditButton && (
          <button
            onClick={onEditClick}
            className="text-[12px] flex gap-2 mx-5 text-[#556A7D] px-1 mb-1 pb-2 w-[80%] text-left py-1 border-b-2 border-gray-200"
          >
            Edit Report Template <MdOutlineEdit className="w-4 h-4" />
          </button>
        )}
        <div className="justify-between items-center px-4 py-2 text-[#727272] font-bold">
          <span className="text-[16px] font-[600] p-1">Report Module</span>
        </div>
      </div>

      {/* Section List */}
      <div className="flex flex-col w-full mb-3">
        {filteredSections.map((section, index) => {
          const isActive = currentReportPage === index;

          return (
            <div
  key={section.id}
  onClick={() => handleSectionClick(index)}
  className={`cursor-pointer transition-colors my-1 w-full px-5 py-2 text-[13px] text-[#727272] break-words ${
    isActive
      ? 'bg-[#007eef0d] border-r-2 border-blue-500'
      : 'hover:bg-gray-50'
  }`}
>
  {index + 1}. {section.title?.trim()}
</div>

          );
        })}
      </div>
    </div>
  );
};

const ESGSidebar = ({
  setIsOpenMobile = () => {},
  isOpenMobile = false,
  reportType = 'Custom ESG Report',
  allSections = [],
  submitData
}) => {
  const dispatch = useDispatch();
  const isSectionEditorOpen = useSelector(selectIsSectionEditorOpen);
  const showEditModal = reportType === 'Custom ESG Report';

  const handleEditClick = () => {
    if (showEditModal) {
      submitData('toggle');
      dispatch(setSectionEditorOpen(true));
      setIsOpenMobile(false);
    }
  };

  const handleCloseModal = () => {
    dispatch(setSectionEditorOpen(false));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="m-3 ml-2 border border-r-2 border-b-2 shadow-lg rounded-lg hidden xl:block lg:block">
        <div className="flex items-start py-4 min-h-screen rounded-lg overflow-x-hidden text-[0.875rem] w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
          <ESGSidebarContent
            onEditClick={handleEditClick}
            reportType={reportType}
            allSections={allSections}
            submitData={submitData}
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
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        } w-72`}
      >
        <div className="p-4">
          <ESGSidebarContent
            closeMobile={() => setIsOpenMobile(false)}
            onEditClick={handleEditClick}
            reportType={reportType}
            allSections={allSections}
            submitData={submitData}
          />
        </div>
      </div>

      {/* Modal */}
      {isSectionEditorOpen && showEditModal && (
        <SectionEditorModal onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ESGSidebar;
