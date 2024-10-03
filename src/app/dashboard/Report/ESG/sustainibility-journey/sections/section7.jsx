'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import SustainabilityJourneyTable from "../table";


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section7=({section10_3_3Ref})=>{
    const [content,setContent] = useState(
        `Our approach to supply chain sustainability focuses on ensuring that our suppliers adhere to high environmental and social standards. We engage with our suppliers through regular assessments, audits, and capacity-building programs to help them improve their sustainability performance.`
    )
    return (
        <>
        <div ref={section10_3_3Ref} id="section10_3_3">
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        10.3.3 Negative Environmental & Social Impacts in the Supply Chain
        </h3>   
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        We recognize that our supply chain can have negative environmental and social impacts, and we are committed to mitigating these risks. Our approach includes:
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ducimus repellendus voluptatem laudantium quaerat adipisci repudiandae. Odit commodi officia voluptatum accusamus. Pariatur, voluptate officiis nemo harum ut eos placeat porro?</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Percentage of suppliers identified as having significant actual and potential negative environmental impacts with which improvements were agreed upon as a result of assessment: 
            </p>
            <p className="text-sm mb-4">40%</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Percentage of Suppliers identified as having significant actual and potential negative environmental impacts with terminated Relationship:
            </p>
            <p className="text-sm mb-4">50%</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Number of suppliers screened using social criteria:
            </p>
            <p className="text-sm mb-4">200</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Percentage of suppliers screened using social criteria: 
            </p>
            <p className="text-sm mb-4">20%</p>
            <p className="text-[15px] text-[#344054] mb-4 font-semibold">
Number of suppliers identified having significant actual and potential negative social impacts. 
            </p>
            <div className="shadow-md rounded-md">
        <SustainabilityJourneyTable/>
        </div>
        </div>
        </>
    )
}

export default Section7