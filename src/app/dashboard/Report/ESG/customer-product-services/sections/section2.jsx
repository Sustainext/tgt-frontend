'use client'
import { useState, useRef, useEffect } from "react";


const Section2=({section15_1_1Ref})=>{
    
    return (
        <>
        <div id="setion15_1_1" ref={section15_1_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        15.1.1  Management of material topic
        </h3>
        {/* <p className="text-[15px] mb-2 font-semibold">
        Description of organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.
            </p> */}
            <p className="text-sm mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem aliquid numquam laudantium itaque nihil animi obcaecati ab aliquam incidunt tempora, sapiente ratione. Eos voluptatibus sunt doloremque similique! Adipisci, quisquam qui!</p>
            {/* <p className="text-[15px] mb-2 font-semibold">
            Process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process along with specific lessons learned and how these have been incoporated to organisation's operational policies and procedures.
            </p> */}
            <p className="text-sm mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem aliquid numquam laudantium itaque nihil animi obcaecati ab aliquam incidunt tempora, sapiente ratione. Eos voluptatibus sunt doloremque similique! Adipisci, quisquam qui!</p>
        
        </div>
        </>
    )
}

export default Section2