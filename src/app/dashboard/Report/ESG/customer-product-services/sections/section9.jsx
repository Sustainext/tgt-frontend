'use client'
import { useState, useRef, useEffect } from "react";


const Section9=({section15_3_1Ref})=>{
    const [content,setContent] = useState(
        
`Conclusion 
At [Company Name], our commitment to sustainability is unwavering. This report, prepared in accordance with the Global Reporting Initiative (GRI) standards, outlines our efforts, achievements, and future goals in fostering sustainable development across our operations. We recognize that our journey toward sustainability is continuous and requires persistent effort, innovation, and collaboration. 
Our Commitment to Continuous Improvement 
Sustainability is embedded in our corporate strategy, and we are dedicated to continuous improvement in all areas of our business. We have set ambitious targets and implemented robust systems to monitor our progress. Our commitment is reflected in the strides we have made in reducing our environmental footprint, enhancing our social contributions, and upholding strong governance practices. 
        `
    )
    return (
        <>
        <div id="setion15_3_1" ref={section15_3_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        15.3.1  Management of material topic
        </h3>
        <p className="text-[15px] mb-2 font-semibold">
        Description of organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.
            </p>
            <p className="text-sm mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem aliquid numquam laudantium itaque nihil animi obcaecati ab aliquam incidunt tempora, sapiente ratione. Eos voluptatibus sunt doloremque similique! Adipisci, quisquam qui!</p>
            <p className="text-[15px] mb-2 font-semibold">
            Process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process along with specific lessons learned and how these have been incoporated to organisation's operational policies and procedures.
            </p>
            <p className="text-sm mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem aliquid numquam laudantium itaque nihil animi obcaecati ab aliquam incidunt tempora, sapiente ratione. Eos voluptatibus sunt doloremque similique! Adipisci, quisquam qui!</p>
            <p className="text-[15px] text-[#344054] mb-2">
        Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={6}
        />
        </div>
        </>
    )
}

export default Section9