'use client'
import { useState, useRef, useEffect } from "react";


const Section11=({section12_2_1Ref,data})=>{
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
    )
    
    return (
        <>
       
        <div id="section12_2_1" ref={section12_2_1Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.2.1 Management of material topic
</h3>

<p className="text-[15px] text-[#344054] mb-2 text-left font-semibold">
Material use and efficiency
</p>

{data["3-3cde_12-2-1_materials"] && data["3-3cde_12-2-1_materials"].length > 0 ? (
    data["3-3cde_12-2-1_materials"].map((val, index) => (
        <div key={index}>
            <p className="text-sm mb-2">{val.GRI33cd ? val.GRI33cd : 'No data available'}</p>
            <p className="text-sm mb-4">{val.GRI33e ? val.GRI33e : 'No data available'}</p>
        </div>
    ))
) : (
    <p className="text-sm mb-4">No data available</p>
)}

<p className="text-[15px] text-[#344054] mb-2 text-left font-semibold">
Packaging material 
</p>

{data["3-3cde_12-2-1_packaging"] && data["3-3cde_12-2-1_packaging"].length > 0 ? (
    data["3-3cde_12-2-1_packaging"].map((val, index) => (
        <div key={index}>
            <p className="text-sm mb-2">{val.GRI33cd ? val.GRI33cd : 'No data available'}</p>
            <p className="text-sm mb-4">{val.GRI33e ? val.GRI33e : 'No data available'}</p>
        </div>
    ))
) : (
    <p className="text-sm mb-4">No data available</p>
)}
</div>
        </>
    )
}

export default Section11