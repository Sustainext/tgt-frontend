'use client'
import { useState, useRef, useEffect } from "react";


const Section5=({section11_2Ref})=>{
    const [content,setContent] = useState(
        `In [Year], we invested [Amount] in infrastructure projects and services, including [Specific Projects or Services]. These investments enhance our operational efficiency, support local economic development, and contribute to the well-being of the communities where we operate`
    )
   

    return (
        <>
        <div id="section11_2" ref={section11_2Ref} >
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        11.2 Infrastructure Investment and Services Supported
</h3>
       <p className="text-sm mb-4">{content}</p>
        </div>
        </>
    )
}

export default Section5