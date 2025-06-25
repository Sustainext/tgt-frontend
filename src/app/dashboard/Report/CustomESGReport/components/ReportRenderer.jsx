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
import Companyoperations from '../../ESG/company-operations/page';
import MissionVision from '../../ESG/mission-vision/page';
import Sustainability from '../../ESG/sustainibility-roadmap/page'
import Awards from '../../ESG/awards-recognition/page'
import StakeHolder from '../../ESG/stakeholder-engagement/page'
import AboutReport from '../../ESG/about-report/page'
import Governance from '../../ESG/corporate-governance/page'
import Journey from '../../ESG/sustainibility-journey/page'
import Economic from '../../ESG/economic-performance/page'
import Environment from '../../ESG/environment/page'
import People from '../../ESG/people/page'
import Community from '../../ESG/community/page'
import Customers from '../../ESG/customer-product-services/page'
import Materiality from '../../ESG/materilality/page'

// import Materiality from '../reportComponenet/materiality';
import MessageCEO from '../../ESG/message-from-ceo/page';
// import MissionVision from './sections/MissionVision';

// Component mapping - Updated to properly handle props
// const sectionComponents = {
//   about_company: (props) => <Companyoperations {...props} />,
//   message_ceo: (props) => <MessageCEO {...props} />,
//   mission_vision: (props) => <MissionVision {...props} />,
//   sustainability: (props) => <Sustainability {...props} />,
//   awards: (props) => <Awards {...props} />,
//   stakeholder: (props) => <StakeHolder {...props} />,
//   about_report: (props) => <AboutReport {...props} />,
//   governance: (props) => <Governance {...props} />,
//   journey: (props) => <Journey {...props} />,
//   economic: (props) => <Economic {...props} />,
//   environment: (props) => <Environment {...props} />,
//   people: (props) => <People {...props} />,
//   community: (props) => <Community {...props} />,
//   customers: (props) => <Customers {...props} />,
//   materiality: (props) => <Materiality {...props} />,
//   // Add all other component mappings
// };
const sectionComponents = {
  about_company: Companyoperations,
  message_ceo: MessageCEO,
  mission_vision: MissionVision,
  sustainability: Sustainability,
  awards: Awards,
  stakeholder: StakeHolder,
  about_report: AboutReport,
  governance: Governance,
  journey: Journey,
  economic: Economic,
  environment: Environment,
  people: People,
  community: Community,
  customers: Customers,
  materiality: Materiality,
  // Add all other component mappings
};


const ReportRenderer = ({ onBack,sectionRefs,hasChanges }) => {
  // console.log(sectionRefs,"see all the section ref")
  const dispatch = useDispatch();
  const enabledSections = useSelector(selectEnabledSections);
  const selectedSubsections = useSelector(selectSelectedSubsections);
  const componentMapping = useSelector(selectComponentMapping);
  const currentReportPage = useSelector(selectCurrentReportPage);
  const currentSection = useSelector(selectCurrentReportSection);

  // console.log('Enabled Sections:', enabledSections);
  // console.log('Selected Subsections:', selectedSubsections);

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
    
    // Calculate section order based on position in enabled sections
    const sectionOrder = currentReportPage + 1;
    
    return (
      <div className="mb-8">
        <div className="min-h-[400px]">
          {/* {SectionComponent({
            subsections: sectionSubsections,
            sectionId: currentSection.id,
            sectionTitle: currentSection.title,
            sectionOrder: sectionOrder,
            onSubmitSuccess: (success) => {
              console.log('Section submitted:', success);
              // Handle submission success if needed
            }
          })} */}
           <SectionComponent
      ref={sectionRefs[currentSection?.id]}
      subsections={sectionSubsections}
      sectionId={currentSection?.id}
      sectionTitle={currentSection?.title}
      sectionOrder={sectionOrder}
      onSubmitSuccess={(success) => {
        console.log('Section submitted:', success);
      }}
      hasChanges={hasChanges}
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
    <div className="w-full max-w-none mx-auto">
          {/* Navigation Controls */}
      {/* <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
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
      </div> */}

      {/* Current Section Content */}
      <div className="min-h-[500px]">
        {renderCurrentSection()}
      </div>

      {/* Report Footer
      <div className="mt-8 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Report generated on {new Date().toLocaleDateString()} | 
          Contains {enabledSections.length} sections | 
          Current section: {currentSection?.title || 'N/A'}
        </p>
      </div> */}

      {/* Debug Information (remove in production) */}
      {/* {process.env.NODE_ENV === 'development' && (
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
      )} */}
    </div>
  );
};

export default ReportRenderer;