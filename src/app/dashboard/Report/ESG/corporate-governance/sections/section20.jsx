'use client'
import { useState, useRef, useEffect } from "react";


const Section20=({section9_6Ref,section9_6_1Ref,data,
    sectionOrder = 9,
})=>{
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
    )
    
    return (
        <>
        <div id="section9_6" ref={section9_6Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        {sectionOrder}.6 Policy
            </h3>
           
           
        </div>
        <div id="section9_6_1" ref={section9_6_1Ref}>

{/* <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
9.6.1 Management of Material Topics 
</h3>

<p className="text-sm mb-4">No data available</p> */}

</div>
        </>
    )
}

export default Section20