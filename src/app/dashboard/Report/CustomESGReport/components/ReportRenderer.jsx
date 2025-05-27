'use-client'
import React from 'react';
import AboutCompany from '../../ESG/company-operations/page';
import Materiality from '../reportComponenet/materiality';
import Sidebar from '../components/sidebar'
// import MessageCEO from './sections/MessageCEO';
// import MissionVision from './sections/MissionVision';
// ...import all other section components

const sectionComponents = {
//   message_ceo: MessageCEO,
  about_company: AboutCompany,
//   mission_vision: MissionVision,
  materiality: Materiality,
  // ...add all other mappings
};

const ReportRenderer = ({ selectedSubsections,sections }) => {

    console.log(selectedSubsections,"sub")
    console.log(sections,"main")
  return (
//     <div className='flex'>
//         <div>
//         <Sidebar
// //   activeStep={activeStep}
// //   setActiveStep={setActiveStep}
// //   isOpenMobile={isOpenMobile}
// //   setIsOpenMobile={setIsOpenMobile}
//   sections={sections} // from your config
// />
//         </div>
//         <
//     </div>
<div className="w-full">
      {Object.entries(selectedSubsections).map(([sectionKey, subs]) => {
        if (!subs || subs.length === 0) return null; // Skip empty sections
        console.log(subs,"have a look")

        const SectionComponent = sectionComponents[sectionKey];
        if (!SectionComponent) return null; // Fallback for undefined components

        return (
          <div key={sectionKey}>
            <SectionComponent subsections={subs} />
          </div>
        );
      })}
    </div>
   
  );
};

export default ReportRenderer;
