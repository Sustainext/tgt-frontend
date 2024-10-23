'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const Section5=({section10_3_1Ref,data})=>{
    const [content,setContent] = useState(
        `We integrate sustainability into our core business operations by setting ambitious goals, implementing robust management systems, and continuously monitoring our performance. Our approach is guided by global frameworks such as the Global Reporting Initiative (GRI) and the United Nations Sustainable Development Goals (SDGs).`
    )
    return (
        <>
        <div ref={section10_3_1Ref} id="section10_3_1">
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        10.3.1  Management of Material Topics
        </h3>   
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Description of organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.
            </p>
            <p className="text-sm mb-4">{data["3-3cde"]?data["3-3cde"].negative_impact_involvement_description?data["3-3cde"].negative_impact_involvement_description:"No data available":"No data available"}</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process along with specific lessons learned and how these have been incoporated to organisation's operational policies and procedures.
            </p>
            <p className="text-sm mb-4">{data["3-3cde"]?data["3-3cde"].stakeholder_engagement_effectiveness_description?data["3-3cde"].stakeholder_engagement_effectiveness_description:"No data available":"No data available"}</p>
        </div>
        </>
    )
}

export default Section5