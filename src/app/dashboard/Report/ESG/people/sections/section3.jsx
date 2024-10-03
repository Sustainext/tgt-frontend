'use client'
import { useState, useRef, useEffect } from "react";
import EmployeeInfoTable from "../tables/employeeTable";

const Section3=({section13_1_2Ref})=>{
    const [content,setContent] = useState(
        `We strive to maintain a dynamic and engaged workforce by attracting and retaining talented individuals. Our hiring practices emphasize diversity and equal opportunity, while our retention strategies focus on employee satisfaction and career development. `
    )
    
    return (
        <>
        <div id="section13_1_2" ref={section13_1_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.1.2 Employee Hire, Turnover
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        New Employee Hires
            </p>
            <div className="shadow-md rounded-md mb-4">
                <EmployeeInfoTable/>
            </div>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            New Employee Turnover
            </p>
            <div className="shadow-md rounded-md mb-4">
                <EmployeeInfoTable/>
            </div>

</div>
        </>
    )
}

export default Section3