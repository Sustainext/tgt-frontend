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
import Section18 from './sections/section18'
import Section19 from './sections/section19'
import Section20 from './sections/section20'
import Section21 from './sections/section21'
import Section22 from './sections/section22'
import Section23 from './sections/section23'
import Section25 from './sections/section25'

const CorporateGovernance=()=>{
    
    const [activeSection, setActiveSection] = useState('section9_1');

    const section9_1Ref = useRef(null);
  const section9_2Ref = useRef(null);
  const section9_3Ref = useRef(null);
  const section9_4Ref = useRef(null);
  const section9_5Ref = useRef(null);
  const section9_6Ref = useRef(null);
  const section9_1_1Ref = useRef(null);
  const section9_2_1Ref = useRef(null);
  const section9_2_2Ref = useRef(null);
  const section9_2_3Ref = useRef(null);
  const section9_2_4Ref = useRef(null);
  const section9_3_1Ref = useRef(null);
  const section9_3_2Ref = useRef(null);
  const section9_3_3Ref = useRef(null);
  const section9_3_4Ref = useRef(null);
  const section9_3_5Ref = useRef(null);
  const section9_3_6Ref = useRef(null);
  const section9_3_7Ref = useRef(null);
  const section9_3_8Ref = useRef(null);
  const section9_4_1Ref = useRef(null);
  const section9_4_2Ref = useRef(null);
  const section9_5_1Ref = useRef(null);
  const section9_5_2Ref = useRef(null);
  const section9_5_3Ref = useRef(null);
  const section9_6_1Ref = useRef(null);
  const section9_6_2Ref = useRef(null);
  const section9_6_3Ref = useRef(null);
  const section9_6_4Ref = useRef(null);
  const section9_6_5Ref = useRef(null);
  const section9_7Ref = useRef(null);
  

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
           9.  Corporate Governance 
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <Section1/>
            <Section2 section9_1Ref={section9_1Ref} section9_1_1Ref={section9_1_1Ref}/>
            <Section3 section9_2Ref={section9_2Ref} section9_2_1Ref={section9_2_1Ref}/>
            <Section4 section9_2_2Ref={section9_2_2Ref} />
            <Section5  section9_2_3Ref={section9_2_3Ref} />
            <Section6  section9_2_4Ref={section9_2_4Ref} />
            <Section7  section9_3_1Ref={section9_3_1Ref} section9_3Ref={section9_3Ref} />
            <Section8  section9_3_2Ref={section9_3_2Ref} />
            <Section9  section9_3_3Ref={section9_3_3Ref} />
            <Section10  section9_3_4Ref={section9_3_4Ref} />
            <Section11  section9_3_5Ref={section9_3_5Ref} />
            <Section12  section9_3_6Ref={section9_3_6Ref} />
            <Section13  section9_3_7Ref={section9_3_7Ref} />
            <Section14  section9_3_8Ref={section9_3_8Ref} />
            <Section15  section9_4_1Ref={section9_4_1Ref} section9_4Ref={section9_4Ref} />
            <Section16  section9_4_2Ref={section9_4_2Ref} />
            <Section17  section9_5_1Ref={section9_5_1Ref} section9_5Ref={section9_5Ref} />
            <Section18  section9_5_2Ref={section9_5_2Ref} />
            <Section19  section9_5_3Ref={section9_5_3Ref} />
            <Section20  section9_6_1Ref={section9_6_1Ref} section9_6Ref={section9_6Ref}  />
            <Section21  section9_6_2Ref={section9_6_2Ref} />
            <Section22  section9_6_3Ref={section9_6_3Ref} />
            <Section23  section9_6_4Ref={section9_6_4Ref} />
            <Section25  section9_7Ref={section9_7Ref} />
       
            </div>
            {/* page sidebar */}
           

            <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-fit top-36 sticky mt-2 w-[20%]">
  <p className="text-[11px] text-[#727272] mb-2 uppercase">Corporate Governance</p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section9_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_1Ref, 'section9_1')}>
    9.1. Board of Directors
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_1_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_1_1Ref, 'section9_1_1')}>
    9.1.1 Governance structure and composition
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section9_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_2Ref, 'section9_2')}>
    9.2. General Governance
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_2_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_2_1Ref, 'section9_2_1')}>
    9.2.1 Nomination, selection of the highest governance body
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_2_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_2_2Ref, 'section9_2_2')}>
    9.2.2 Chair of the highest governance body
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_2_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_2_3Ref, 'section9_2_3')}>
  9.2.3 Senior management hired from local community
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_2_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_2_4Ref, 'section9_2_4')}>
   
    9.2.4 Management of material topic
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section9_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3Ref, 'section9_3')}>
    9.3 Responsibility, evaluation and remuneration of the Board
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_3_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3_1Ref, 'section9_3_1')}>
    9.3.1 Role of the highest governance body
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_3_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3_2Ref, 'section9_3_2')}>
    9.3.2 Collective knowledge of the highest governance body
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_3_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3_3Ref, 'section9_3_3')}>
    9.3.3 Role of the highest governance body in sustainability reporting
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_3_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3_4Ref, 'section9_3_4')}>
    9.3.4 Delegation of responsibility for managing impacts
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_3_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3_5Ref, 'section9_3_5')}>
    9.3.5 Communication of critical concerns
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_3_6' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3_6Ref, 'section9_3_6')}>
    9.3.6 Evaluation of the performance of the highest governance body
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_3_7' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3_7Ref, 'section9_3_7')}>
    9.3.7 Remuneration policies & Process to determine remuneration
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_3_8' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_3_8Ref, 'section9_3_8')}>
    9.3.8 Annual compensation ratio
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section9_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_4Ref, 'section9_4')}>
    9.4 Strategy
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_4_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_4_1Ref, 'section9_4_1')}>
    9.4.1 Statement on sustainable development strategy
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_4_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_4_2Ref, 'section9_4_2')}>
    9.4.2 Membership association
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section9_5' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_5Ref, 'section9_5')}>
    9.5 Risk Management
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_5_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_5_1Ref, 'section9_5_1')}>
    9.5.1 Remediation of negative impacts
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_5_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_5_2Ref, 'section9_5_2')}>
    9.5.2 Mechanism for seeking advice and raising concerns
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_5_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_5_3Ref, 'section9_5_3')}>
    9.5.3 Compliance
  </p>
  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section9_6' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_6Ref, 'section9_6')}>
    9.6 Policy
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_6_1' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_6_1Ref, 'section9_6_1')}>
    9.6.1 Management of material topic
   
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_6_2' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_6_2Ref, 'section9_6_2')}>
    9.6.2 Embedding policy Commitment
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_6_3' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_6_3Ref, 'section9_6_3')}>
    9.6.3 Anti-trust, anti-competitive behavior, monopoly practices
  </p>
  
  <p className={`text-[11px] mb-2 ml-2 cursor-pointer ${activeSection === 'section9_6_4' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_6_4Ref, 'section9_6_4')}>
    9.6.4 Defined benefit plan obligations and other retirement plans
  </p>

  
  <p className={`text-[12px] mb-2 cursor-pointer ${activeSection === 'section9_7' ? 'text-blue-400' : ''}`} onClick={() => scrollToSection(section9_7Ref, 'section9_7')}>
    9.7 Conflict of interest
  </p>
</div>

            
            </div>
           
           
        </div>
        </>
    )
}

export default CorporateGovernance