"use client";
import { useState, useRef, useEffect } from "react";
import Section1 from './sections/section1'
import Section2 from  './sections/section2'
import Section3 from  './sections/section3'

const Companyoperations = () => {
  const orgName= typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
    const [activeSection, setActiveSection] = useState('section2_1');
    const [isScrolling, setIsScrolling] = useState(false); 
    const section2_1Ref = useRef(null);
    const section2_1_1Ref = useRef(null);
    const section2_1_2Ref = useRef(null);
    const section2_2Ref = useRef(null);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //         const sections = [
  //             { id: 'section2_1', ref: section2_1Ref },
  //             { id: 'section2_1_1', ref: section2_1_1Ref },
  //             { id: 'section2_1_2', ref: section2_1_2Ref },
  //             { id: 'section2_2', ref: section2_2Ref }
  //         ];

  //         const threshold = 150;

  //         for (const section of sections) {
  //             const element = section.ref.current;
  //             if (element) {
  //                 const rect = element.getBoundingClientRect();
  //                 if (rect.top >= -threshold && rect.top <= window.innerHeight - threshold) {
  //                     setActiveSection(section.id);
  //                     break;
  //                 }
  //             }
  //         }
  //     };

  //     window.addEventListener("scroll", handleScroll, { passive: true });

  //     return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  
  const scrollToSection = (sectionRef, sectionId) => {
      setActiveSection(sectionId); 
    
      const elementTop = sectionRef.current?.getBoundingClientRect().top + window.scrollY;
    
      window.scrollTo({
        top: elementTop - 100,
        behavior: 'smooth',
      });
    };
    

//   useEffect(() => {
//     const handleScroll = () => {
//         if (isScrolling) return; // Prevent running if smooth scroll is in progress

//         const sections = [
//             { id: 'section2_1', ref: section2_1Ref },
//             { id: 'section2_1_1', ref: section2_1_1Ref },
//             { id: 'section2_1_2', ref: section2_1_2Ref },
//             { id: 'section2_2', ref: section2_2Ref }
//         ];

//         const threshold = 150;

//         for (const section of sections) {
//             const element = section.ref.current;
//             if (element) {
//                 const rect = element.getBoundingClientRect();
//                 if (rect.top >= -threshold && rect.top <= window.innerHeight - threshold) {
//                     setActiveSection(section.id);
//                     break;
//                 }
//             }
//         }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => window.removeEventListener("scroll", handleScroll);
// }, [isScrolling]); // Add isScrolling to dependencies

// // Smooth scrolling to the section when clicking a sidebar link
// const scrollToSection = (sectionRef, sectionId) => {
//     setIsScrolling(true); // Disable scroll listener

//     setActiveSection(sectionId);
//     const elementTop = sectionRef.current?.getBoundingClientRect().top + window.scrollY;

//     window.scrollTo({
//         top: elementTop - 100, // Adjust this offset based on your header size
//         behavior: 'smooth',
//     });

//     // Re-enable the scroll listener after smooth scrolling is done
//     setTimeout(() => {
//         setIsScrolling(false); // Re-enable scroll listener
//     }, 0); // Adjust the timeout based on the smooth scroll duration
// };
  return (
    <>
      <div className="mx-2 p-2">
      <div>
              <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
                2. About the company and operations
              </h3>
            </div>
        <div className="flex gap-4">
          <div className="w-[80%]">
            <Section1 orgName={orgName}/>
            <Section2 orgName={orgName} section2_1Ref={section2_1Ref} section2_1_1Ref={section2_1_1Ref} section2_1_2Ref={section2_1_2Ref} />
            <Section3 orgName={orgName} section2_2Ref={section2_2Ref}/>
          </div>
          {/* page sidebar */}
          <div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[500px] top-36 sticky mt-2 w-[20%]">
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
              className={`text-[11px] mb-2 ml-2 cursor-pointer ${
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
