'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section6=({section13_1_5Ref})=>{
    const [content,setContent] = useState(
        `We are committed to providing fair and competitive wages that meet or exceed industry standards. Our compensation packages are designed to reflect the skills, experience, and performance of our employees. `
    )
    const [table1Columns] = useState([
        "Employee category", 
        "Location 1"
      ]);
    
      const [table1Data] = useState([
        { "Employee category": "Male", "Location 1": "data" },
        { "Employee category": "Female", "Location 1": "data" },
        { "Employee category": "Non-Binary", "Location 1": "data" },
      ]);
    
      const [table2Columns] = useState([
        "Significant location of operations", 
        "Gender", 
        "Minimum Wage"
      ]);
    
      const [table2Data] = useState([
        { "Significant location of operations": "Location 1", "Gender": "Male", "Minimum Wage": "data" },
        { "Significant location of operations": "Location 1", "Gender": "Female", "Minimum Wage": "data" },
        { "Significant location of operations": "Location 1", "Gender": "Non Binary", "Minimum Wage": "data" },
      ]);
    return (
        <>
        <div id="section13_1_5" ref={section13_1_5Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.1.5 Standard Wage
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px]  mb-2 font-semibold">
        Ratio of the entry-level wage by gender at significant locations of operation to the minimum wage 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={table1Columns} data={table1Data} />
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Local minimum wage is absent or variable at significant locations of operation, by gender: 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={table2Columns} data={table2Data} />
            </div>
            

</div>
        </>
    )
}

export default Section6