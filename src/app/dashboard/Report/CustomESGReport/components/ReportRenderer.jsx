'use client'
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux selectors
import {
  selectEnabledSections,
  selectSelectedSubsections,
  selectComponentMapping,
  selectCurrentReportPage,
  selectCurrentReportSection,
  selectCanGoToNextPage,
  selectCanGoToPreviousPage,
  nextReportPage,
  previousReportPage,
  initializeReportNavigation,
} from '../../../../../lib/redux/features/reportBuilderSlice';

// Import your section components
import AboutCompany from '../../ESG/company-operations/page';
// import Materiality from '../reportComponenet/materiality';
import MessageCEO from '../../ESG/message-from-ceo/page';
// import MissionVision from './sections/MissionVision';

// Component mapping - you'll need to update this with your actual components
const sectionComponents = {
  about_company: () => <AboutCompany/>, // Replace with actual AboutCompany component
  message_ceo: () => <MessageCEO/>, // Replace with actual MessageCEO component
  mission_vision: () => <div>Mission Vision Component</div>, // Replace with actual MissionVision component
  sustainability: () => <div>Sustainability Roadmap Component</div>,
  awards: () => <div>Awards Component</div>,
  stakeholder: () => <div>Stakeholder Engagement Component</div>,
  about_report: () => <div>About Report Component</div>,
  governance: () => <div>Corporate Governance Component</div>,
  journey: () => <div>Sustainability Journey Component</div>,
  economic: () => <div>Economic Performance Component</div>,
  environment: () => <div>Environment Component</div>,
  people: () => <div>People Component</div>,
  community: () => <div>Community Component</div>,
  customers: () => <div>Customers Component</div>,
  materiality: () => <div>Materiality Component</div>, // Replace with actual Materiality component
  // Add all other component mappings
};

const ReportRenderer = ({ onBack }) => {
  const dispatch = useDispatch();
  const enabledSections = useSelector(selectEnabledSections);
  const selectedSubsections = useSelector(selectSelectedSubsections);
  const componentMapping = useSelector(selectComponentMapping);
  const currentReportPage = useSelector(selectCurrentReportPage);
  const currentSection = useSelector(selectCurrentReportSection);
  const canGoToNext = useSelector(selectCanGoToNextPage);
  const canGoToPrevious = useSelector(selectCanGoToPreviousPage);

  // Initialize report navigation when component mounts
  // useEffect(() => {
  //   dispatch(initializeReportNavigation());
  // }, [dispatch, enabledSections]);

  const handleNextPage = () => {
    dispatch(nextReportPage());
  };

  const handlePreviousPage = () => {
    dispatch(previousReportPage());
  };

  console.log('Enabled Sections:', enabledSections);
  console.log('Selected Subsections:', selectedSubsections);

  const renderCurrentSection = () => {
    if (!currentSection) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No section available</p>
        </div>
      );
    }

    const SectionComponent = sectionComponents[currentSection.id];
    
    if (!SectionComponent) {
      return (
        <div className="p-4 border border-red-300 rounded mb-4">
          <h2 className="text-lg font-bold text-red-600">
            Component Missing: {currentSection.title}
          </h2>
          <p className="text-sm text-gray-600">
            Please add the component for "{currentSection.id}" to the sectionComponents mapping.
          </p>
        </div>
      );
    }

    const sectionSubsections = selectedSubsections[currentSection.id] || [];
    
    return (
      <div className="mb-8">
        <div className="border-b-2 border-gray-200 mb-6 pb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {currentReportPage + 1}. {currentSection.title}
          </h1>
          <div className="text-sm text-gray-500">
            Page {currentReportPage + 1} of {enabledSections.length}
          </div>
        </div>
        
        <div className="min-h-[400px]">
          <SectionComponent 
            subsections={sectionSubsections}
            sectionId={currentSection.id}
            sectionTitle={currentSection.title}
          />
        </div>
      </div>
    );
  };

  if (enabledSections.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <h2 className="text-xl font-bold text-gray-600 mb-4">
          No Sections Selected
        </h2>
        <p className="text-gray-500 mb-6">
          Please go back and select at least one section to generate the report.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Back to Section Selection
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none mx-auto p-6">
      {/* Report Header */}
      <div className="mb-8 text-center border-b-4 border-blue-600 pb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Sustainability Report
        </h1>
        <p className="text-lg text-gray-600">
          Generated Report - {new Date().getFullYear()}
        </p>
      </div>

      {/* Current Section Content */}
      <div className="min-h-[500px]">
        {renderCurrentSection()}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
        <button
          onClick={handlePreviousPage}
          disabled={!canGoToPrevious}
          className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
            canGoToPrevious 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">
            Section {currentReportPage + 1} of {enabledSections.length}
          </div>
          <div className="flex space-x-2">
            {enabledSections.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentReportPage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleNextPage}
          disabled={!canGoToNext}
          className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
            canGoToNext 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Report Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Report generated on {new Date().toLocaleDateString()} | 
          Contains {enabledSections.length} sections | 
          Current section: {currentSection?.title || 'N/A'}
        </p>
      </div>

      {/* Debug Information (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify({ 
              currentReportPage, 
              currentSection: currentSection?.id,
              totalSections: enabledSections.length,
              selectedSubsections: selectedSubsections[currentSection?.id || ''] || []
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ReportRenderer;