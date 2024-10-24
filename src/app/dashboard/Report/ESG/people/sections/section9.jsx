'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section9=({section13_2_2Ref,data})=>{
    const [columns] = useState([
        "Type of Employees", 
        "Total number of Workers", 
        "Contractual relationship", 
        "Work performed", 
        "Engagement approach", 
        "Third party (if applicable)"
      ]);
    

      const Tabledata=data["2_8_a"]?data["2_8_a"].length>0?

    data["2_8_a"].map((val,index)=>{
        return (
            
          {
            "Type of Employees": val.TypeofWorker,
            "Total number of Workers": val.TotalnumberofWorkers,
            "Contractual relationship": val.Contractualrelationship,
            "Work performed": val.Workperformed,
            "Engagement approach": val.Engagementapproach,
            "Third party (if applicable)": val.Thirdparty,
        }
            
        )
    })
:[
  {
     "Type of Employees": "No data available",
          "Total number of Workers": "No data available",
          "Contractual relationship": "No data available",
          "Work performed": "No data available",
          "Engagement approach": "No data available",
          "Third party (if applicable)": "No data available",
},
]:[
  {
   "Type of Employees": "No data available",
          "Total number of Workers": "No data available",
          "Contractual relationship": "No data available",
          "Work performed": "No data available",
          "Engagement approach": "No data available",
          "Third party (if applicable)": "No data available",
},
]
    
    
    return (
        <>
        <div id="section13_2_2" ref={section13_2_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.2.2 Workers Who Are Not Employees
</h3>   
<p className="text-[15px]  mb-2 font-semibold">Methodologies and Assumptions used</p>
            <p className="text-sm mb-4">{data["2_8_b"]?data["2_8_b"].length>0?data["2_8_b"][0].Q1?data["2_8_b"][0].Q1:"No data available":"No data available":"No data available"}</p>
            <p className="text-[15px]  mb-2 font-semibold">Worker Fluctuations</p>
            <p className="text-sm mb-4">{data["2_8_c"]?data["2_8_c"].length>0?data["2_8_c"][0].Q1?data["2_8_c"][0].Q1:"No data available":"No data available":"No data available"}</p>

<p className="text-[15px]  mb-2 font-semibold">Workers who are not Employees</p>
<div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={columns} data={Tabledata} />
            </div>
</div>
        </>
    )
}

export default Section9