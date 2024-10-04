'use client'
import { useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from './sections/section5';
import Section6 from './sections/section6';
import Section7 from  './sections/section7'

const SustainibilityJourney=()=>{
    
    const [activeSection, setActiveSection] = useState('section10_1');

    const section10_1Ref = useRef(null);
  const section10_2Ref = useRef(null);
  const section10_3Ref = useRef(null);
  const section10_3_1Ref = useRef(null);
  const section10_3_2Ref = useRef(null);
  const section10_3_3Ref = useRef(null);

  

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
           10.  Sustainability Journey 
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <Section1/>
            <Section2 section10_1Ref={section10_1Ref} />
            <Section3 section10_2Ref={section10_2Ref} />
            <Section4 section10_3Ref={section10_3Ref} />
            <Section5 section10_3_1Ref={section10_3_1Ref} />
            <Section6 section10_3_2Ref={section10_3_2Ref} />
            <Section7 section10_3_3Ref={section10_3_3Ref} />

        
        

       
            </div>
            {/* page sidebar */}
           

<div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">Sustainability Journey </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section10_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section10_1Ref, 'section10_1')}
            >
              10.1.Management approach for sustainability/ESG topics
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section10_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section10_2Ref, 'section10_2')}
            >
             10.2. Company's Sustainability 
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section10_3' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section10_3Ref, 'section10_3')}
            >
             10.3 Supply Chain Sustainability
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section10_3_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section10_3_1Ref, 'section10_3_1')}
            >
             10.3.1. Management of material topic 
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section10_3_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section10_3_2Ref, 'section10_3_2')}
            >
             10.3.2. Local Suppliers
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section10_3_3' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section10_3_3Ref, 'section10_3_3')}
            >
             10.3.3. Negative environmental & social impacts in the supply chain
            </p>
          </div>
            
            </div>
           
           
        </div>
        </>
    )
}

export default SustainibilityJourney