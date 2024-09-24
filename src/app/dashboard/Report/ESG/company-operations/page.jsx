"use client";
import { useState, useRef, useEffect } from "react";
import Section1 from './sections/section1'
import Section2 from  './sections/section2'
import Section3 from  './sections/section3'

const Companyoperations = () => {
    const [activeSection, setActiveSection] = useState('section2_1');
    const section2_1Ref = useRef(null);
    const section2_1_1Ref = useRef(null);
    const section2_1_2Ref = useRef(null);
    const section2_2Ref = useRef(null);
  
  const scrollToSection = (sectionRef, sectionId) => {
      setActiveSection(sectionId); 
    
      const elementTop = sectionRef.current?.getBoundingClientRect().top + window.scrollY;
    
      window.scrollTo({
        top: elementTop - 100,
        behavior: 'smooth',
      });
    };
    
  return (
    <>
      <div className="mx-2 p-2">
        <div className="flex gap-4">
          <div className="w-[80%]">
            <Section1/>
            <Section2 section2_1Ref={section2_1Ref} section2_1_1Ref={section2_1_1Ref} section2_1_2Ref={section2_1_2Ref} />
            <Section3 section2_2Ref={section2_2Ref}/>
          </div>
          {/* page sidebar */}
          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">About the company and operations</p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section2_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section2_1Ref, 'section2_1')}
            >
              2.1 Business Model and Impact 
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section2_1_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section2_1_1Ref, 'section2_1_1')}
            >
             2.1.1 Activities, Value Chain, and Other Business Relationships
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section2_1_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section2_1_2Ref, 'section2_1_2')}
            >
              2.1.2 Entities Included in the Organization's Sustainability Reporting
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section2_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section2_2Ref, 'section2_2')}
            >
              2.2 Supply Chain
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companyoperations;
