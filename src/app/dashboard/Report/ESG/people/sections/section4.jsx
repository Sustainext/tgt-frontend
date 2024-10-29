'use client'
import { useState, useRef, useEffect } from "react";
import BenefitsTable from "../tables/benifitsTable";
import LeaveTable from "../tables/leaveTable";

const Section4=({section13_1_3Ref,data})=>{
    const columns = [
        "Benefit",
        "Full-Time Employees",
        "Part-Time Employees",
        "Temporary Employees",
        "Significant Location"
        
      ];
    
    
      const Tabledata=data["401-2a-benefits_provided"]?data["401-2a-benefits_provided"]["data"]?data["401-2a-benefits_provided"]["data"].length>0?

      data["401-2a-benefits_provided"]["data"].map((val,index)=>{
          return (
              
            {
             "Benefit": val.benefits,
          "Full-Time Employees": val.fulltime?"Yes":"No",
          "Part-Time Employees": val.parttime?"Yes":"No",
          "Temporary Employees": val.temporary?"Yes":"No",
          "Significant Location":val.significantlocation
        
          
          }
              
          )
      })
  :[
    {
       "Benefit": "No data available",
          "Full-Time Employees": "No data available",
          "Part-Time Employees": "No data available",
          "Temporary Employees": "No data available",
          "Significant Location":"No data available"
       
  },
  ]:[
    {
     "Benefit": "No data available",
          "Full-Time Employees": "No data available",
          "Part-Time Employees": "No data available",
          "Temporary Employees": "No data available",
          "Significant Location":"No data available"
         
  },
  ]:[
    {
     "Benefit": "No data available",
          "Full-Time Employees": "No data available",
          "Part-Time Employees": "No data available",
          "Temporary Employees": "No data available",
          "Significant Location":"No data available"
         
  },
  ]
  
    return (
        <>
        <div id="section13_1_3" ref={section13_1_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.1.3 Employee Benefits and Health Services
</h3>
<p className="text-[15px]  mb-2 font-semibold">
Significant locations of operation
            </p>

<p className="text-sm mb-4">{data["401-2b-significant_loc"]?data["401-2b-significant_loc"].data?data["401-2b-significant_loc"].data.length>0?data["401-2b-significant_loc"].data[0].Q1?data["401-2b-significant_loc"].data[0].Q1:"No data available":"No data available":"No data available":"No data available"}</p>

<p className="text-[15px]  mb-2 font-semibold">
Minimum number of weeks’ notice
            </p>

<p className="text-sm mb-4">{data["402_1a_minimum_number_of_weeks"]?data["402_1a_minimum_number_of_weeks"].data?data["402_1a_minimum_number_of_weeks"].data.length>0?data["402_1a_minimum_number_of_weeks"].data[0].Q1?data["402_1a_minimum_number_of_weeks"].data[0].Q1:"No data available":"No data available":"No data available":"No data available"}</p>

        <p className="text-[15px]  mb-2 font-semibold">
        Benefits provided to employees
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={columns} data={Tabledata}/>
            </div>
            {/* <p className="text-[15px]  mb-2 font-semibold">
            Benefits provided to part-time employees by location 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <BenefitsTable/>
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Benefits provided to temporary employees by location 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <BenefitsTable/>
            </div> */}

</div>
        </>
    )
}

export default Section4