'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section5=({section13_1_4Ref})=>{
    const [content,setContent] = useState(
        `We provide parental leave policies that support our employees in balancing their professional and personal lives. This includes paid leave for new parents and flexible return-to-work options`
    )
    const columns1 = ["Employee category", "Male", "Female", "Total"];
  const data1 = [
    {
      "Employee category": "Parental Leave Entitlement",
      Male: "data",
      Female: "data",
      Total: "data"
    },
    {
      "Employee category": "Taking Parental Leave",
      Male: "data",
      Female: "data",
      Total: "data"
    },
    {
      "Employee category": "Returning to Work Post-Leave",
      Male: "data",
      Female: "data",
      Total: "data"
    },
    {
      "Employee category": "Retained 12 Months After Leave",
      Male: "data",
      Female: "data",
      Total: "data"
    }
  ];

  const columns2 = ["Employee category", "Male", "Female"];
  const data2 = [
    {
      "Employee category": "Return to work rate",
      Male: "data",
      Female: "data"
    },
    {
      "Employee category": "Retention rate",
      Male: "data",
      Female: "data"
    }
  ];
    
    return (
        <>
        <div id="section13_1_4" ref={section13_1_4Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.1.4 Parental Leaves
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
                <LeaveTable columns={columns1} data={data1} />
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Return to work & retention rate of employees. 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={columns2} data={data2} />
            </div>
            

</div>
        </>
    )
}

export default Section5