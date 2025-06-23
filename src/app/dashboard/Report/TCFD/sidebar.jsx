'use client';

import { MdKeyboardArrowLeft } from "react-icons/md";

const TCFDSidebarContent = ({
  closeMobile,
  allSections,
  currentPage,
  onSectionClick
}) => {
  const handleSectionClick = (sectionIndex) => {
    onSectionClick(sectionIndex);
    if (closeMobile) closeMobile();
  };

  return (
    <div className="font-medium">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2 xl:hidden lg:hidden">
        <span className="text-[16px] font-[600] text-[#727272]">Report Content</span>
        <button onClick={closeMobile} className="text-gray-700">
          <MdKeyboardArrowLeft className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden xl:flex justify-between items-center px-4 py-2 text-[#727272] font-bold">
        <span className="text-[16px] font-[600]">Report Content</span>
      </div>

      {/* Section List */}
      <div className="mb-3">
        {allSections.map((section, index) => {
          const isActive = currentPage === index;
          
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

const TCFDSidebar = ({
  setIsOpenMobile = () => {},
  isOpenMobile = false,
  allSections = [],
  currentPage = 0,
  onSectionClick = () => {}
}) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="h-full hidden xl:block lg:block">
        <div className="flex items-start py-4 h-screen rounded-lg text-[0.875rem] overflow-x-hidden sm:w-[200px] md:w-[200px] lg:w-[240px] xl:w-[240px] 2xl:w-[240px] 3xl:w-[351px] scrollable-content">
          <TCFDSidebarContent
            allSections={allSections}
            currentPage={currentPage}
            onSectionClick={onSectionClick}
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
          <TCFDSidebarContent
            closeMobile={() => setIsOpenMobile(false)}
            allSections={allSections}
            currentPage={currentPage}
            onSectionClick={onSectionClick}
          />
        </div>
      </div>
    </>
  );
};

export default TCFDSidebar;