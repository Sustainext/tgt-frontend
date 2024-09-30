'use client'
import { useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";

const AboutTheReport=()=>{
    
    const [activeSection, setActiveSection] = useState('section7_1');

    const section7_1Ref = useRef(null);
  const section7_1_1Ref = useRef(null);
  const section7_2Ref = useRef(null);
  const section7_3Ref = useRef(null);

  // Function to scroll to the section
//   const scrollToSection = (sectionRef,sectionId) => {
//     setActiveSection(sectionId); 
//     sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

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
                7. About the Report
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <Section1 section7_1Ref={section7_1Ref} />
            <Section2 section7_1_1Ref={section7_1_1Ref} />
            <Section3 section7_2Ref={section7_2Ref} />
            <Section4 section7_3Ref={section7_3Ref} />
       

       

        
        

       
            </div>
            {/* page sidebar */}
           

<div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">About The Report</p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section7_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section7_1Ref, 'section7_1')}
            >
              7.1 Reporting period, frequency and point of contact
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section7_1_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section7_1_1Ref, 'section7_1_1')}
            >
              7.1.1 Restatement of information
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section7_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section7_2Ref, 'section7_2')}
            >
              7.2 Frameworks
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section7_3' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section7_3Ref, 'section7_3')}
            >
              7.3 External Assurance
            </p>
          </div>
            
            </div>
           
           
        </div>
        </>
    )
}

export default AboutTheReport