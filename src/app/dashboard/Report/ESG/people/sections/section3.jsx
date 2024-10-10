'use client'
import { useState, useRef, useEffect } from "react";
import EmployeeInfoTable from "../tables/employeeTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

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
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s workforce hire and retention</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            // onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
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