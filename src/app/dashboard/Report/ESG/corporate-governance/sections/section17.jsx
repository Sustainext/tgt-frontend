'use client'
import { useState, useRef, useEffect, } from "react";

const Section17=({section9_5Ref,section9_5_1Ref,data,
    sectionNumber = "9.5.1",
    sectionTitle = 'Remediation of Negative Impacts',
    sectionOrder = 9,
})=>{
    const [content,setContent] = useState(
        `We are committed to identifying, mitigating, and remediating any negative impacts associated with our operations. This includes:`
    )
    return (
        <>
        <div id="section9_5" ref={section9_5Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        {sectionOrder}.5. Risk Management
            </h3>
            
        
        </div>
        <div id="section9_5_1" ref={section9_5_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
           {sectionNumber} {sectionTitle}
            </h3>
            <p className="text-sm mb-4">{content}</p>

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Organisation's commitments to provide for or cooperate in the remediation of negative impacts that the organization identifies it has caused or contributed to:  
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_a"]?data["2_25_data"]["2_25_a"]:"No data available":"No data available"}</p>
        

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Organisation's approach to identify and address grievances: 
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_b"]?data["2_25_data"]["2_25_b"].Q1:"No data available":"No data available"}</p>
        

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Other processes by which the organization provides for or cooperates in the remediation of negative impacts: 
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_c"]?data["2_25_data"]["2_25_c"]:"No data available":"No data available"}</p>
        

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Stakeholders’ involvement in the design, review, operation, and improvement of grievance mechanisms: 
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_d"]?data["2_25_data"]["2_25_d"]:"No data available":"No data available"}</p>
        

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Process to track the effectiveness of the grievance mechanisms and other remediation processes: 
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_e"]?data["2_25_data"]["2_25_e"]:"No data available":"No data available"}</p>
        
        
        </div>
        </>
    )
}

export default Section17