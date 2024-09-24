'use client'
import { useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from "./sections/section5";

const AboutTheReport=()=>{
    
    const [activeSection, setActiveSection] = useState('section8_1');

    const section8_1Ref = useRef(null);
  const section8_1_1Ref = useRef(null);
  const section8_1_2Ref = useRef(null);
  const section8_1_3Ref = useRef(null);
  const section8_1_4Ref = useRef(null);

 

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
                8. Materiality
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <Section1 section8_1Ref={section8_1Ref} />
            <Section2 section8_1_1Ref={section8_1_1Ref} />
            <Section3 section8_1_2Ref={section8_1_2Ref} />
            <Section4 section8_1_3Ref={section8_1_3Ref} />
            <Section5 section8_1_4Ref={section8_1_4Ref} />

       

        
        

       
            </div>
            {/* page sidebar */}
           

<div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">Materiality</p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section8_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section8_1Ref, 'section8_1')}
            >
              8.1. Materiality Assessment 
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section8_1_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section8_1_1Ref, 'section8_1_1')}
            >
              8.1.1. List of material topics 
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section8_1_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section8_1_2Ref, 'section8_1_2')}
            >
              8.1.2. Changes in the list of material topics 
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section8_1_3' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section8_1_3Ref, 'section8_1_3')}
            >
              8.1.3. Materiality assessment – Process 
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section8_1_4' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section8_1_4Ref, 'section8_1_4')}
            >
             8.1.4. Management of material topic
            </p>
          </div>
            
            </div>
           
           
        </div>
        </>
    )
}

export default AboutTheReport