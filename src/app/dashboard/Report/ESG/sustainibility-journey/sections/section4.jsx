'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';


const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section4=({section10_3Ref})=>{
    const [content,setContent] = useState(
        `We integrate sustainability into our core business operations by setting ambitious goals, implementing robust management systems, and continuously monitoring our performance. Our approach is guided by global frameworks such as the Global Reporting Initiative (GRI) and the United Nations Sustainable Development Goals (SDGs).`
    )
    return (
        <>
        <div ref={section10_3Ref} id="section10_3">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        10.3  Management of Material Topics
        </h3>   
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Description of organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, totam quis excepturi nisi harum dolore, magnam nostrum, facere expedita fugiat nemo. Ut suscipit repellendus voluptate, mollitia rem nostrum quo iste.</p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process along with specific lessons learned and how these have been incoporated to organisation's operational policies and procedures.
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, totam quis excepturi nisi harum dolore, magnam nostrum, facere expedita fugiat nemo. Ut suscipit repellendus voluptate, mollitia rem nostrum quo iste.</p>
        </div>
        </>
    )
}

export default Section4