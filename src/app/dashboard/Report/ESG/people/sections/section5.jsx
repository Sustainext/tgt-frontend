'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section5=({section13_1_4Ref})=>{
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
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

        <p className="text-[15px]  mb-2 font-semibold">
        We offer comprehensive benefits and health services to support the well-being of our employees, including medical insurance, wellness programs, and mental health resources. 
            </p>
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