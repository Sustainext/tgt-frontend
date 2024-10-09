'use client'
import { useState, useRef, useEffect } from "react";

const Section10=({section9_3_4Ref,data})=>{
    
    return (
        <>
        <div id="section9_3_4" ref={section9_3_4Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.4 Delegation of Responsibility for Managing Impacts
            </h3>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Description of  how the highest governance body delegates responsibility for managing 
            the organization's impacts on economy, environment and people:
            </p>
            <p className="text-sm mb-4">{data["2_13_a"]?data["2_13_a"].governance_body_responsibility_delegation:"No data available"}</p>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Senior executives with responsibility for the management of impacts:
            </p>
            <p className="text-sm mb-2">{data["2_13_a"]?data["2_13_a"].has_appointed_executive_for_impact_management:"No data available"}</p>
            <p className="text-sm mb-4">{data["2_13_a"]?data["2_13_a"].reason_for_has_appointed_executive_for_impact_management:""}</p>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Delegated responsibility for the management of impacts to other employees:
            </p>
            <p className="text-sm mb-2">{data["2_13_a"]?data["2_13_a"].has_delegated_impact_management_to_employees:"No data available"}</p>
            <p className="text-sm mb-4">{data["2_13_a"]?data["2_13_a"].reason_for_has_delegated_impact_management_to_employees:""}</p>
            <p className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            Description of  the process and frequency for senior executives or other employees to report back 
to the highest governance body on the management of the organization's impacts on the 
economy, environment and people:
            </p>
            <p className="text-sm mb-4">{data["2_13_b"]?data["2_13_b"]:"No data available"}</p>
        
        </div>
        </>
    )
}

export default Section10