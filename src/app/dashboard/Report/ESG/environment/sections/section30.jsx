'use client'
import { useState, useRef, useEffect } from "react";

const Section30=({section12_6Ref})=>{
    const [content,setContent] = useState(
        `Company Name) organization is committed to preventing and managing significant spills that can negatively impact the environment, biodiversity, and local communities. As part of our sustainability strategy, we have implemented a`
    )

   
    return (
        <>
       
        <div id="section12_6" ref={section12_6Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
12.6 Biodiversity
</h3>

<p className="text-sm mb-4">We report on the quantity of waste disposed of through landfilling, incineration, or other methods. Our aim is to reduce the amount of waste sent to disposal by increasing recycling and reuse. </p>


</div>
        </>
    )
}

export default Section30