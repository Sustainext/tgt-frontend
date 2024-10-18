'use client'
import { useState, useRef, useEffect } from "react";
import DiversityTable from "../tables/diversityTable";
import EmployeeCategoryTable from "../tables/employeeCategoryTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setEmployeeDiversityPosition} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice"

const Section14=({section13_4_2Ref})=>{
  
    const content = useSelector(state => state.screen13Slice.employee_diversity_position);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setEmployeeDiversityPosition(
       `We believe in the power of diversity and strive to create an inclusive workplace. Our commitment to diversity is reflected in the composition of our governance bodies and workforce.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setEmployeeDiversityPosition(e.target.value))
    }
    const [columns] = useState([
        { header: "Gender", subHeaders: ["Male", "Female", "Non-Binary"] },
        { header: "Age Group", subHeaders: ["< 30 years", "30-50 years", ">50 years"] },
        { header: "Diversity groups", subHeaders: ["Minority group","Vulnerable Groups"] },
        // { header: "Vulnerable Groups", subHeaders: ["Type of vulnerable group - (Number of individuals)"] }
      ]);
    
      const [data] = useState([
        {
          Male: "Data",
          Female: "Data",
          "Non-Binary": "Data",
          "< 30 years": "Data",
          "30-50 years": "Data",
          ">50 years": "Data",
          "Minority group": "Data",
          "Vulnerable Groups":"Data"
        //   "Type of vulnerable group - (Number of individuals)": ""
        }
      ]);

      const [Categorycolumns] = useState([
        { header: "Type of Employees", subHeaders: [] }, // No sub-headers for this column
        { header: "Gender", subHeaders: ["Male", "Female", "Non-Binary"] },
        { header: "Age Group", subHeaders: ["<30 years", "30-50 years", ">50 years"] },
        { header: "Age Group", subHeaders: ["Minority group"] }
      ]);
    
      const [Categorydata] = useState([
        {
          "Type of Employees": "Category A",
          Male: "data",
          Female: "data",
          "Non-Binary": "data",
          "<30 years": "data",
          "30-50 years": "data",
          ">50 years": "data",
          "Minority group": "data",
        },
        {
          "Type of Employees": "Category B",
          Male: "data",
          Female: "data",
          "Non-Binary": "data",
          "<30 years": "data",
          "30-50 years": "data",
          ">50 years": "data",
          "Minority group": "data",
        }
      ]);
    
    return (
        <>
        <div id="section13_4_2" ref={section13_4_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.4.2 Diversity of Governance Bodies and Employees
</h3>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s position on diversity of employees</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <textarea
            onChange={handleEditorChange}
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />

<p className="text-[15px]  mb-2 font-semibold">Governance Bodies</p>
        <p className="text-[15px]  mb-2 font-semibold">
        Percentage of individuals within the organization’s governance bodies by diversity categories. 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <DiversityTable columns={columns} data={data} />
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Percentage of Employees per employee category 
            </p>

            <div className="shadow-md rounded-md mb-4">
                <EmployeeCategoryTable columns={Categorycolumns} data={Categorydata} />
            </div>
            

</div>
        </>
    )
}

export default Section14