'use client'
import { useState, useRef, useEffect } from "react";


const Section8=({section11_3Ref,section11_3_1Ref})=>{
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
    )
    
    return (
        <>
        <div id="section11_3" ref={section11_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        11.3. Climate-related Impacts, Risks, and Opportunities 
            </h3>
           
           
        </div>
        <div id="section11_3_1" ref={section11_3_1Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
11.3.1  Management of Material Topics
</h3>

<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Description of organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process along with specific lessons learned and how these have been incoporated to organisation's operational policies and procedures.
</p>
<p className="text-sm mb-4">{content}</p>

</div>
        </>
    )
}

export default Section8