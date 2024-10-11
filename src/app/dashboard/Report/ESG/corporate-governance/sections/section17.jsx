'use client'
import { useState, useRef, useEffect } from "react";

const Section17=({section9_5Ref,section9_5_1Ref,data})=>{
    const [content,setContent] = useState(
        `We are committed to identifying, mitigating, and remediating any negative impacts associated with our operations. This includes:`
    )
    return (
        <>
        <div id="section9_5" ref={section9_5Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        9.5. Risk Management
            </h3>
            
        
        </div>
        <div id="section9_5_1" ref={section9_5_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.5.1 Remediation of Negative Impacts
            </h3>
            <p className="text-sm mb-4">{content}</p>

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Organisation's commitments to provide for or cooperate in the remediation of negative impacts that the organization identifies it has caused or contributed to:
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_a"]?data["2_25_data"]["2_25_a"]:"No data available":"No data available"}</p>
        

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Description of organisation's approach to identify and address grievances, including the grievance mechanisms that the organization has established or participates in:
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_b"]?data["2_25_data"]["2_25_b"].Q1:"No data available":"No data available"}</p>
        

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Description of other processes by which the organization provides for or cooperates in the remediation of negative impacts that it identifies it has caused or contributed to:
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_c"]?data["2_25_data"]["2_25_c"]:"No data available":"No data available"}</p>
        

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Description of how stakeholders who are the intended users of the grievance mechanisms are involved in the design, review, operation, and improvement of these mechanisms:
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_d"]?data["2_25_data"]["2_25_d"]:"No data available":"No data available"}</p>
        

            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Description of how the organization tracks the effectiveness of the grievance mechanisms and other remediation processes are tracked, and report examples of their effectiveness, including stakeholder feedback.
            </p>
            <p className="text-sm mb-4">{data["2_25_data"]?data["2_25_data"]["2_25_e"]?data["2_25_data"]["2_25_e"]:"No data available":"No data available"}</p>
        
        
        </div>
        </>
    )
}

export default Section17