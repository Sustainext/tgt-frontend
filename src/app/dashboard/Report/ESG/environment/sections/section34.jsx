'use client'
import { useState, useRef, useEffect } from "react";


const Section34=({section12_7_1Ref,data})=>{
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
    )
    
    return (
        <>
       
        <div id="section12_7_1" ref={section12_7_1Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.7.1 Management of material topic
</h3>

{/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
Description of organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.
</p> */}
<p className="text-sm mb-2">No data available</p>
{/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
Process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process along with specific lessons learned and how these have been incoporated to organisation's operational policies and procedures.
</p> */}
{/* <p className="text-sm mb-4">No data available</p> */}

</div>
        </>
    )
}

export default Section34