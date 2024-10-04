'use client'
import { useState, useRef, useEffect } from "react";
import PerformanceReviewTable from "../tables/performanceTable";

const Section7=({section13_1_6Ref})=>{
    const [content,setContent] = useState(
        `Regular performance reviews and career development planning are integral to our employee management approach. We provide ongoing feedback, set clear goals, and offer opportunities for professional growth and advancement. `
    )
    const [columns] = useState([
        "Type of Employees", 
        { header: "Employee Category", subHeaders: ["A", "B"] },
        { header: "Gender", subHeaders: ["Male", "Female", "Non-Binary"] }
      ]);
    
      const [data] = useState([
        {
          "Type of Employees": "Percentage of employees who received regular performance review",
          A: "data",
          B: "data",
          Male: "data",
          Female: "data",
          "Non-Binary": "data",
        },
        {
          "Type of Employees": "Percentage of employees who received regular career development review",
          A: "data",
          B: "data",
          Male: "data",
          Female: "data",
          "Non-Binary": "data",
        }
      ]);
    
    return (
        <>
        <div id="section13_1_6" ref={section13_1_6Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.1.6. Performance and Career Development Reviews of Employees
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px]  mb-2 font-semibold">
        Percentage of employees receiving regular performance and career development reviews 
        </p>
        <div className="shadow-md rounded-md mb-4">
                <PerformanceReviewTable columns={columns} data={data} />
        </div>
            
            

</div>
        </>
    )
}

export default Section7