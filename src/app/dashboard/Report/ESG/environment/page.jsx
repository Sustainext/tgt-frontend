'use client'
import { useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
// import Section4 from "./sections/section4";
// import Section5 from './sections/section5';
// import Section6 from './sections/section6';
// import Section7 from  './sections/section7';
// import Section8 from  './sections/section8';
// import Section9 from './sections/section9';
// import Section10 from './sections/section10'
// import Section11 from './sections/section11'
// import Section12 from './sections/section12'
// import Section13 from './sections/section13'
// import Section14 from './sections/section14'
// import Section15 from './sections/section15'
// import Section16 from './sections/section16'
// import Section17 from './sections/section17'
// import Section18 from './sections/section18'
// import Section19 from './sections/section19'
// import Section20 from './sections/section20'
// import Section21 from './sections/section21'
// import Section22 from './sections/section22'
// import Section23 from './sections/section23'
// import Section24 from './sections/section24'
// import Section25 from './sections/section25'
// import Section26 from './sections/section26'
// import Section27 from './sections/section27'
// import Section28 from './sections/section28'
// import Section29 from './sections/section29'
// import Section30 from './sections/section30'
// import Section31 from './sections/section31'
// import Section32 from './sections/section32'
// import Section33 from './sections/section33'

const Environment=()=>{
    
    const [activeSection, setActiveSection] = useState('section12_1');

    const section12_1Ref = useRef(null);
  const section12_2Ref = useRef(null);
  const section12_3Ref = useRef(null);
  const section12_4Ref = useRef(null);
  const section12_5Ref = useRef(null);
  const section12_6Ref = useRef(null);
  const section12_7Ref = useRef(null);
  const section12_8Ref = useRef(null);
  const section12_1_1Ref = useRef(null);
  const section12_1_2Ref = useRef(null);
  const section12_1_3Ref = useRef(null);
  const section12_1_4Ref = useRef(null);
  const section12_1_5Ref = useRef(null);
  const section12_1_6Ref = useRef(null);
  const section12_1_7Ref = useRef(null);
  const section12_2_1Ref = useRef(null);
  const section12_2_2Ref = useRef(null);
  const section12_2_3Ref = useRef(null);
  const section12_3_1Ref = useRef(null);
  const section12_3_2Ref = useRef(null);
  const section12_3_3Ref = useRef(null);
  const section12_3_4Ref = useRef(null);
  const section12_4_1Ref = useRef(null);
  const section12_4_2Ref = useRef(null);
  const section12_4_3Ref = useRef(null);
  const section12_4_4Ref = useRef(null);
  const section12_4_5Ref = useRef(null);
  const section12_5_1Ref = useRef(null);
  const section12_5_2Ref = useRef(null);
  const section12_5_3Ref = useRef(null);
  const section12_5_4Ref = useRef(null);
  const section12_5_5Ref = useRef(null);
  const section12_5_6Ref = useRef(null);
  const section12_6_1Ref = useRef(null);
  const section12_6_2Ref = useRef(null);
  const section12_7_1Ref = useRef(null);


const scrollToSection = (sectionRef, sectionId) => {
    setActiveSection(sectionId); 
  
    const elementTop = sectionRef.current?.getBoundingClientRect().top + window.scrollY;
  
    // Scroll smoothly to the section, ensuring it scrolls up as well
    window.scrollTo({
      top: elementTop - 100, // Adjust 100 to the height of any sticky header
      behavior: 'smooth',
    });
  };
  

    return (
        <>
        <div className="mx-2 p-2">
            <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
           12. Environment
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <Section1/>
            <Section2 section12_1Ref={{section12_1Ref}} />
            <Section3 section12_1_1Ref={section12_1_1Ref}/>
            
            </div>
            {/* page sidebar */}
           

            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-fit top-36 sticky mt-2 w-[20%]">
  <p className="text-[11px] text-[#727272] mb-2 uppercase">Environment</p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section12_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_1Ref, 'section12_1')} >
    12.1. Emissions
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_1_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_1_1Ref, 'section12_1_1')}>
    12.1.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_1_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_1_2Ref, 'section12_1_2')} >
  12.1.2. Scope 1 GHG Emissions
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_1_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_1_3Ref, 'section12_1_3')} >
  12.1.3. Scope 2 GHG Emissions
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_1_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_1_4Ref, 'section12_1_4')} >
  12.1.4. Scope 3 GHG Emissions
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_1_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_1_5Ref, 'section12_1_5')} >
  12.1.5. GHG emission intensity
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_1_6' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_1_6Ref, 'section12_1_6')} >
  12.1.6. Reduction in GHG emissions 
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_1_7' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_1_7Ref, 'section12_1_7')} >
  12.1.7. Ozone depleting substances
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section12_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_2Ref, 'section12_2')} >
    12.2. Materials
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_2_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_2_1Ref, 'section12_2_1')} >
    12.2.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_2_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_2_2Ref, 'section12_2_2')} >
  12.2.2. Recycled input materials used
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_2_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_2_3Ref, 'section12_2_3')} >
  12.2.3 Reclaimed products and their packaging materials
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section12_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_3Ref, 'section12_3')} >
    12.3. Water
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_3_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_3_1Ref, 'section12_3_1')} >
    12.3.1. Management of Material Topic
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_3_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_3_2Ref, 'section12_3_2')} >
  12.3.2. Water withdrawal
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_3_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_3_3Ref, 'section12_3_3')} >
  12.3.3. Water discharge & management of associated impact
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_3_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_3_4Ref, 'section12_3_4')} >
    12.3.4. Water Consumption
  </p>

  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section12_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_4Ref, 'section12_4')} >
    12.4. Energy
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_4_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_4_1Ref, 'section12_4_1')} >
    12.4.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_4_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_4_2Ref, 'section12_4_2')} >
  12.4.2 Energy consumption within the organisation
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_4_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_4_3Ref, 'section12_4_3')} >
  12.4.3 Energy consumption outside of the organisation
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_4_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_4_4Ref, 'section12_4_4')} >
  12.4.4. Energy intensity
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_4_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_4_5Ref, 'section12_4_5')} >
  12.4.5. Reduction in energy consumption 
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section12_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_5Ref, 'section12_5')} >
    12.5. Waste
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_5_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_5_1Ref, 'section12_5_1')} >
    12.5.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_5_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_5_2Ref, 'section12_5_2')} >
  12.5.2. Waste generation and impacts
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_5_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_5_3Ref, 'section12_5_3')} >
  12.5.3. Management of waste related impacts
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_5_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_5_4Ref, 'section12_5_4')} >
  12.5.4. Waste disposed
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_5_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_5_5Ref, 'section12_5_5')} >
  12.5.5. Waste diverted from disposal
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_5_6' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_5_6Ref, 'section12_5_6')} >
  12.5.6. Significant Spills
  </p>

  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section12_6' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_6Ref, 'section12_6')} >
    12.6. Biodiversity
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_6_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_6_1Ref, 'section12_6_1')} >
    12.6.1. Management of Material Topic
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_6_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_6_2Ref, 'section12_6_2')} >
  12.6.2. Habitat protected and restored
  </p>

  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section12_7' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_7Ref, 'section12_7')} >
    12.7. Air Quality 
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section12_7_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section12_7_1Ref, 'section12_7_1')} >
    12.7.1. Management of Material Topics
  </p>
  
</div>

            
            </div>
           
           
        </div>
        </>
    )
}

export default Environment