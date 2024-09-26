'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section28=({section13_7Ref})=>{
    const [content,setContent] = useState(
        `We ensure that all workers, including contractors and temporary workers, are covered by our OHS management system. `
    )
    const col1=[
        "Collective bargaining agreements ",
       "Notice Period Specified ",
        "Consultation Provisions ",
        "Negotiation Provisions "
       
    ]

    const data1=[
        {
            "Collective bargaining agreements ":"A",
            "Notice Period Specified ":"",
            "Consultation Provisions ":"",
            "Negotiation Provisions ":""
        },
        {
            "Collective bargaining agreements ":"B",
            "Notice Period Specified ":"",
            "Consultation Provisions ":"",
            "Negotiation Provisions ":""
        }
    ]

    return (
        <>
        <div id="section13_7" ref={section13_7Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
13.7 Collective Bargaining
</h3>


      
            <p className="text-[15px]  mb-2 font-semibold">
            Total number of employees covered by collective bargaining agreements
            </p>
            <p className="text-sm mb-4">10</p>

            <p className="text-[15px]  mb-2 font-semibold">
            Total number of employees in the organisation (as reported under disclosure 2-7)
            </p>
            <p className="text-sm mb-4">10</p>

            <p className="text-[15px]  mb-2 font-semibold">
            for workers who are not employees but whose work and workplace is controlled by the organization 
            </p>
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col1} data={data1}/>
            </div>
            
            

</div>
        </>
    )
}

export default Section28