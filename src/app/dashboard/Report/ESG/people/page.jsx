'use client'
import { useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from './sections/section5';
import Section6 from './sections/section6';
import Section7 from  './sections/section7';
import Section8 from  './sections/section8';
import Section9 from './sections/section9';
import Section10 from './sections/section10'
import Section11 from './sections/section11'
import Section12 from './sections/section12'
import Section13 from './sections/section13'
import Section14 from './sections/section14'
import Section15 from './sections/section15'
import Section16 from './sections/section16'
import Section17 from './sections/section17'
// import Section18 from './sections/section18'
// import Section19 from './sections/section19'
// import Section20 from './sections/section20'
// import Section21 from './sections/section21'
// import Section22 from './sections/section22'
// import Section23 from './sections/section23'
// import Section25 from './sections/section25'

const People=()=>{
    
    const [activeSection, setActiveSection] = useState('section13_1');

    const section13_1Ref = useRef(null);
  const section13_2Ref = useRef(null);
  const section13_3Ref = useRef(null);
  const section13_4Ref = useRef(null);
  const section13_5Ref = useRef(null);
  const section13_6Ref = useRef(null);
  const section13_7Ref = useRef(null);
  const section13_8Ref = useRef(null);
  const section13_1_1Ref = useRef(null);
  const section13_1_2Ref = useRef(null);
  const section13_1_3Ref = useRef(null);
  const section13_1_4Ref = useRef(null);
  const section13_1_5Ref = useRef(null);
  const section13_1_6Ref = useRef(null);
  const section13_2_1Ref = useRef(null);
  const section13_2_2Ref = useRef(null);
  const section13_2_3Ref = useRef(null);
  const section13_3_1Ref = useRef(null);
  const section13_4_1Ref = useRef(null);
  const section13_4_2Ref = useRef(null);
  const section13_4_3Ref = useRef(null);
  const section13_5_1Ref = useRef(null);
  const section13_5_2Ref = useRef(null);
  const section13_6_1Ref = useRef(null);
  const section13_6_2Ref = useRef(null);
  const section13_6_3Ref = useRef(null);
  const section13_6_4Ref = useRef(null);
  const section13_6_5Ref = useRef(null);
  const section13_6_6Ref = useRef(null);
  const section13_6_7Ref = useRef(null);
  const section13_6_8Ref = useRef(null);
  const section13_6_9Ref = useRef(null);
  const section13_6_10Ref = useRef(null);
  const section13_7_1Ref = useRef(null);
  const section13_7_2Ref = useRef(null);
  const section13_8_1Ref = useRef(null);
  const section13_8_2Ref = useRef(null);

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
           13. People
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <Section1/>
            <Section2 section13_1Ref={section13_1Ref} section13_1_1Ref={section13_1_1Ref}/>
            <Section3 section13_1_2Ref={section13_1_2Ref}/>
            <Section4 section13_1_3Ref={section13_1_3Ref}/>
            <Section5 section13_1_4Ref={section13_1_4Ref}/>
            <Section6 section13_1_5Ref={section13_1_5Ref}/>
            <Section7 section13_1_6Ref={section13_1_6Ref}/>
            <Section8 section13_2_1Ref={section13_2_1Ref} section13_2Ref={section13_2Ref} />
            <Section9 section13_2_2Ref={section13_2_2Ref}/>
            <Section10 section13_2_3Ref={section13_2_3Ref}/>
            <Section11 section13_3Ref={section13_3Ref}/>
            <Section12 section13_3_1Ref={section13_3_1Ref}/>
            <Section13 section13_4Ref={section13_4Ref} section13_4_1Ref={section13_4_1Ref}/>
            <Section14 section13_4_2Ref={section13_4_2Ref}/>
            <Section15 section13_4_3Ref={section13_4_3Ref}/>
            <Section16 section13_5Ref={section13_5Ref} section13_5_1Ref={section13_5_1Ref}/>
            <Section17   section13_5_2Ref={section13_5_2Ref}/>
            </div>
            {/* page sidebar */}
           

            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-fit top-36 sticky mt-2 w-[20%]">
  <p className="text-[11px] text-[#727272] mb-2 uppercase">People</p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section13_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_1Ref, 'section13_1')} >
    13.1. Employees
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_1_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_1_1Ref, 'section13_1_1')}>
    13.1.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_1_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_1_2Ref, 'section13_1_2')} >
    13.1.2. Employee hire, turnover
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_1_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_1_3Ref, 'section13_1_3')} >
    13.1.3. Employee benefits and health services
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_1_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_1_4Ref, 'section13_1_4')} >
    13.1.4. Personal leaves
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_1_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_1_5Ref, 'section13_1_5')} >
    13.1.5. Standard wages
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_1_6' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_1_6Ref, 'section13_1_6')} >
    13.1.6. Performance and career development reviews of employees
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section13_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_2Ref, 'section13_2')} >
    13.2. Labour Management
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_2_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_2_1Ref, 'section13_2_1')} >
    13.2.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_2_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_2_2Ref, 'section13_2_2')} >
    13.2.2. Workers who are not employees
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_2_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_2_3Ref, 'section13_2_3')} >
    13.2.3. Forced or compulsory labour
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section13_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_3Ref, 'section13_3')} >
    13.3. Incidents of child labour
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_3_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_3_1Ref, 'section13_3_1')} >
    13.3.1. Management of Material Topic
  </p>

  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section13_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_4Ref, 'section13_4')} >
    13.4. Diversity, Inclusion
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_4_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_4_1Ref, 'section13_4_1')} >
    13.4.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_4_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_4_2Ref, 'section13_4_2')} >
    13.4.2. Diversity of governance bodies and employees
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_4_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_4_3Ref, 'section13_4_3')} >
    13.4.3. Remuneration
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section13_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_5Ref, 'section13_5')} >
    13.5. Training & education
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_5_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_5_1Ref, 'section13_5_1')} >
    13.5.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_5_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_5_2Ref, 'section13_5_2')} >
    13.5.2. Programs for upgrading employee skills and transition assistance programs
  </p>

  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section13_6' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6Ref, 'section13_6')} >
    13.6. Occupational Health and Safety
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_1Ref, 'section13_6_1')} >
    13.6.1. Management of Material Topic
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_2Ref, 'section13_6_2')} >
    13.6.2. OHS management system
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_3Ref, 'section13_6_3')} >
    13.6.3. Occupational health sevices
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_4Ref, 'section13_6_4')} >
    13.6.4. Worker participation, consultation, and communication on OHS
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_5Ref, 'section13_6_5')} >
    13.6.5. Promotion of worker health
  </p>

  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_6' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_6Ref, 'section13_6_6')} >
    13.6.6. Prevention and mitigation of OHS impacts
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_7' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_7Ref, 'section13_6_7')} >
    13.6.7. Hazard, risk identification and investigation
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_8' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_8Ref, 'section13_6_8')} >
    13.6.8. Worked related ill-health & injuries
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_9' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_9Ref, 'section13_6_9')} >
    13.6.9. Safety training
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_6_10' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_6_10Ref, 'section13_6_10')} >
    13.6.10. Workers covered by OHS management system
  </p>

  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section13_7' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_7Ref, 'section13_7')} >
    13.7. Collective Bargaining 
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_7_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_7_1Ref, 'section13_7_1')} >
    13.7.1. Management of Material Topics
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_7_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_7_2Ref, 'section13_7_2')} >
    13.7.2.  Operations and suppliers in which the right to freedom of association and collectie bargaining may be at risk 
  </p>

  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section13_8' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_8Ref, 'section13_8')} >
    13.8. Incidents of violation/discrimination
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_8_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_8_1Ref, 'section13_8_1')} >
    13.8.1. Management of material topic
  </p>
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section13_8_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section13_8_2Ref, 'section13_8_2')} >
  13.8.2. Incidents of violation of rights of indigenous people
  </p>
</div>

            
            </div>
           
           
        </div>
        </>
    )
}

export default People