"use client";
import { useState, useRef, useEffect } from "react";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";


const Community = () => {
  const [activeSection, setActiveSection] = useState("section14_1");
  const section14_1Ref = useRef(null);
  const section14_1_1Ref = useRef(null);
  const section14_2Ref = useRef(null);


  const scrollToSection = (sectionRef, sectionId) => {
    setActiveSection(sectionId);

    const elementTop =
      sectionRef.current?.getBoundingClientRect().top + window.scrollY;

    // Scroll smoothly to the section, ensuring it scrolls up as well
    window.scrollTo({
      top: elementTop - 100, // Adjust 100 to the height of any sticky header
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mx-2 p-2">
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
        14. Community 
        </h3>
        <div className="flex gap-4">
          <div className="w-[80%]">
            <Section1 section14_1Ref={section14_1Ref}/>
            <Section2  section14_1_1Ref={section14_1_1Ref} />
            <Section3 section14_2Ref={section14_2Ref}/>
        
      
          </div>
          {/* page sidebar */}

          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky mt-2 w-[20%]">
            <p className="text-[11px] text-[#727272] mb-2 uppercase">
            14. Community
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section14_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section14_1Ref, "section14_1")}
            >
              14.1.  Management of material topics
            </p>
            <p
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
                activeSection === "section14_1_1" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section14_1_1Ref, "section14_1_1")}
            >
             14.1.1  Management of material topic
            </p>
            <p
              className={`text-[12px] mb-2 cursor-pointer ${
                activeSection === "section14_2" ? "text-blue-400" : ""
              }`}
              onClick={() => scrollToSection(section14_2Ref, "section14_2")}
            >
              14.2 CSR  
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
