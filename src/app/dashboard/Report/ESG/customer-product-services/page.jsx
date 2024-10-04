'use client'
import { useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import Section4 from "./sections/section4";
import Section5 from "./sections/section5";
import Section6 from "./sections/section6";
import Section7 from "./sections/section7";
import Section8 from "./sections/section8";
import Section9 from "./sections/section9";

const CustomerProductService=()=>{
    
    const [activeSection, setActiveSection] = useState('section15_1');

    const section15_1Ref = useRef(null);
  const section15_1_1Ref = useRef(null);
  const section15_1_2Ref = useRef(null);
  const section15_1_3Ref = useRef(null);
  const section15_2Ref = useRef(null);
  const section15_2_1Ref = useRef(null);
  const section15_2_2Ref = useRef(null);
  const section15_3Ref = useRef(null);
  const section15_3_1Ref = useRef(null);

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
                15. Customers, Products & Services 
            </h3>
            <div className="flex gap-4">
            <div className="w-[80%]">
            <Section1 section15_1Ref={section15_1Ref} />
            <Section2 section15_1_1Ref={section15_1_1Ref} />
            <Section3 section15_1_2Ref={section15_1_2Ref} />
            <Section4 section15_1_3Ref={section15_1_3Ref} />
            <Section5 section15_2Ref={section15_2Ref} />
            <Section6 section15_2_1Ref={section15_2_1Ref} />
            <Section7 section15_2_2Ref={section15_2_2Ref} />
            <Section8 section15_3Ref={section15_3Ref} />
            <Section9 section15_3_1Ref={section15_3_1Ref} />
        
        

       
            </div>
            {/* page sidebar */}
           

<div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">Customers, products & services </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section15_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_1Ref, 'section15_1')}
            >
              15.1. Products and services 
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section15_1_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_1_1Ref, 'section15_1_1')}
            >
              15.1.1. Management of material topic
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section15_1_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_1_2Ref, 'section15_1_2')}
            >
              15.1.2. Health and safety impacts of product and service categories
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section15_1_3' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_1_3Ref, 'section15_1_3')}
            >
              15.1.3. Incidents of non-compliance
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section15_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_2Ref, 'section15_2')}
            >
              15.2. Product and service information and labelling
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section15_2_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_2_1Ref, 'section15_2_1')}
            >
              15.2.1. Management of material topic
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section15_2_2' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_2_2Ref, 'section15_2_2')}
            >
              15.2.2. Marketing
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === 'section15_3' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_3Ref, 'section15_3')}
            >
              15.3. Customers 
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === 'section15_3_1' ? 'text-blue-400' : ''
              }`}
              onClick={() => scrollToSection(section15_3_1Ref, 'section15_3_1')}
            >
             15.3.1. Management of material topic
            </p>
          </div>
            
            </div>
           
           
        </div>
        </>
    )
}

export default CustomerProductService