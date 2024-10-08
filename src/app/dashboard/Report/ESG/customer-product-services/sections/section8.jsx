'use client'
import { useState, useRef, useEffect } from "react";


const Section8=({section15_3Ref})=>{
    const [content,setContent] = useState(
        `Our commitment to providing high-quality products and services is central to our business strategy. We adhere to the Global Reporting Initiative (GRI) standards to ensure that our offerings meet the highest levels of safety, sustainability, and customer satisfaction. This section outlines our approach to managing the health and safety impacts of our products, addressing incidents of non-compliance, and ensuring accurate product information and labelling. `
    )
    const [content2,setContent2]=useState(
        `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
    )
    return (
        <>
        <div id="setion15_3" ref={section15_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        15.3 Customers
        </h3>
        <p className="text-[15px] mb-2 font-semibold">
        Number of substantiated complaints received concerning breaches of customer privacy
       </p>
            <p className="text-sm mb-4">100</p>
            <p className="text-[15px] mb-2 font-semibold">
            Complaints received from outside parties and substantiated by the organization
            </p>
            <p className="text-sm mb-4">100</p>

            <p className="text-[15px] mb-2 font-semibold">
            Complaints from regulatory bodies
       </p>
            <p className="text-sm mb-4">100</p>
            <p className="text-[15px] mb-2 font-semibold">
            Number of identified leaks, thefts, or losses of customer data: 
            </p>
            <p className="text-sm mb-4">100</p>
           
        </div>
        </>
    )
}

export default Section8