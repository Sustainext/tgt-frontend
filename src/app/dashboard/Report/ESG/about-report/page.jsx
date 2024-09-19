'use client'
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import dynamic from 'next/dynamic';
import { MdDownload, MdDelete, MdKeyboardArrowDown, MdFileDownload } from "react-icons/md";
import axiosInstance,{patch} from "../../../../utils/axiosMiddleware";
import Link from 'next/link'
import { GlobalState } from "@/Context/page";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const AboutTheReport=()=>{
    const [content,setContent] = useState(
        `This ESG report, prepared in accordance with the Global Reporting Initiative (GRI) standards, provides a comprehensive overview of [Company Name]'s environmental, social, and governance (ESG) performance for the reporting period [Year]. It reflects our commitment to transparency, accountability, and continuous improvement in our sustainability practices. `
    )
    const [content2,setContent2]=useState(
        `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
    )
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
            <p className="text-[15px] text-[#344054] mb-4">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        <div id="setion7_1" ref={section7_1Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                7.1 Reporting Period, Frequency, and Point of Contact
        </h3>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Reporting Period and Frequency: 
            </p>
            <p className="mb-4 text-sm">{content2}</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Point of Contact: 
            </p>
            <p className="mb-4 text-sm">{content2}</p>
        </div>

        <div id="setion7_1_1" ref={section7_1_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
                7.1.1 Restatement of Information
        </h3>
       
        </div>

        <div id="setion7_2" ref={section7_2Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                7.2 Frameworks
        </h3>
        <p className="text-[15px] text-[#344054] mb-4">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}/>
        </div>

        <div id="setion7_3" ref={section7_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                7.3 External Assurance
        </h3>
        <p className="text-[15px] text-[#344054] mb-4">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}/>
          <p className="text-[15px] text-[#344054] mb-4">
          The scope of the assurance includes 
            </p>
            <p className="mb-2 text-sm">{content}</p>
        </div>
        

        {/* <div className="text-sm mb-6">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Identification and Prioritization 
            </li>
           <p className="mb-4">{content}</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Stakeholder Categories 
            </li>
            <p className="mb-2">{content}</p>
            </ul>  
        
        </div>

        <div className="mb-6">
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Approach to Stakeholder engagement.
        </p>
        <div className="shadow-md rounded-md">
        <StakeholderTable/>
        </div>
       
        </div>

        <div className="text-sm mb-4">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            We employ a variety of engagement methods tailored to the needs and preferences of different stakeholder groups.
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold ml-4">
            Engagement with stakeholders
            </li>
           <p className="mb-4 ml-4">{content}</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold ml-4">
            Stakeholder’s Feedback
            </li>
            <p className="mb-2 ml-4">{content}</p>
            </ul>  
        
        </div> */}
        

            </div>
            {/* page sidebar */}
           

<div className="p-4 border border-r-2 border-b-2 shadow-lg rounded-lg h-[550px] top-36 sticky mt-2 w-[20%]">
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