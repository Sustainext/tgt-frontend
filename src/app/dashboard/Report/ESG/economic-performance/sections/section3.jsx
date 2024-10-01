'use client'
import { useState, useRef, useEffect } from "react";
import Table1 from '../tables/table1'

const Section3=({section11_1_2Ref})=>{
    const [content,setContent] = useState(
        `In [Year], [Company Name] generated substantial economic value through our operations, creating benefits for shareholders, employees, suppliers, and communities. Key highlights include`
    )
    const rowLabels = [
        "1) Direct Economic value generated (Revenues)",
        "2) Economic Value distributed",
        "   i) Operating costs",
        "   ii) Employee wages & benefits",
        "   iii) Payments to providers of capital",
        "   iv) Payments to governments by country",
        "      Country A",
        "      Country B",
        "   v) Community investments",
        "3) Direct economic value generated",
        "4) Economic value distributed"
    ];

    const values = [
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $", 
        "345 $"
    ];

    return (
        <>
        <div id="section11_1_2" ref={section11_1_2Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.1.2 Economic Value Creation
</h3>
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        <div className="shadow-md rounded-md mb-4">
            <Table1 rowLabels={rowLabels} values={values} />
        </div>
        </div>
        </>
    )
}

export default Section3