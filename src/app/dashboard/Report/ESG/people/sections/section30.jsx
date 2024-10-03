'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section30=({section13_7_2Ref})=>{
    const [content,setContent] = useState(
        `We respect the rights of our employees to freedom of association and collective bargaining. We work to ensure that these rights are upheld across our operations and supply chain. At (company name)`
    )
   
    const col1=[
        "Operations in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ",
       "Type of Operation ",
        "Countries or Geographic Areas ",
     
    ]

    const data1=[
        {
            "Operations in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ":"Operation 1",
            "Type of Operation ":"",
            "Countries or Geographic Areas ":"",
        
        },

    ]

    const col2=[
        "Suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ",
       "Type of Supplier",
        "Countries or Geographic Areas ",
     
    ]

    const data2=[
        {
            "Suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ":"Supplier 1",
            "Type of Supplier":"",
            "Countries or Geographic Areas ":"",
        
        },

    ]
      
    
    return (
        <>
        <div id="section13_7_2" ref={section13_7_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.7.2 Operations and Suppliers in Which the Right to Freedom of Association and Collective Bargaining May Be at Risk
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px]  mb-2 font-semibold">
        Operations where workers' freedom of association or collective bargaining is at risk   
            </p>
            <div className="shadow-md rounded-md mb-4">
               <LeaveTable columns={col1} data={data1}/>
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Suppliers in which the right to freedom of association or collective bargaining may be at risk 
            </p>
            <div className="shadow-md rounded-md mb-4">
            <LeaveTable columns={col2} data={data2}/>
            </div>
            

</div>
        </>
    )
}

export default Section30