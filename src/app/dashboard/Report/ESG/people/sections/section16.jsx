'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import { useDispatch, useSelector } from "react-redux";
import {setSecurityPersonnelInternalTraining,
  setSecurityPersonnelExternalTraining} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice"

const Section16=({section13_5Ref,section13_5_1Ref,data})=>{
    const dispatch=useDispatch()
    const trainingIntheOrg=useSelector(state => state.screen13Slice.security_personnel_internal_training);
    const trainingOutsidetheOrg=useSelector(state => state.screen13Slice.security_personnel_external_training);
    const handleChangetrainingIntheOrg=(e)=>{
        dispatch(setSecurityPersonnelInternalTraining(e.target.value))
    }
    const handleChangetrainingOutsidetheOrg=(e)=>{
      dispatch(setSecurityPersonnelExternalTraining(e.target.value))
    }
    const col=[
        "Categories",
        "Average training hours per employee category",
        "Average training hours of male employee in category",
        "Average training hours of female employee in category",
        "Average training hours of non-binary employee in category"
    ]

    const Tabledata=data["404_social_analyse"]?data["404_social_analyse"]["average_training_hours_per_employee_category"].length>0?

    data["404_social_analyse"]["average_training_hours_per_employee_category"].map((val,index)=>{
        return (
            
          {
            "Categories":val.category,
        "Average training hours per employee category":val.average_training_hours_per_employee,
        "Average training hours of male employee in category":val.average_training_hours_per_male_employee,
        "Average training hours of female employee in category":val.average_training_hours_per_male_employee,
        "Average training hours of non-binary employee in category":val.average_training_hours_per_non_binary_employee
        
        }
            
        )
    })
:[
  {
    "Categories":"No data available",
    "Average training hours per employee category":"No data available",
    "Average training hours of male employee in category":"No data available",
    "Average training hours of female employee in category":"No data available",
    "Average training hours of non-binary employee in category":"No data available"
},
]:[
  {
    "Categories":"No data available",
    "Average training hours per employee category":"No data available",
    "Average training hours of male employee in category":"No data available",
    "Average training hours of female employee in category":"No data available",
    "Average training hours of non-binary employee in category":"No data available"
},
]
    
    
    return (
        <>
        <div id="section13_5" ref={section13_5Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        13.5 Training & Education
            </h3>
            <p className="text-[15px]  mb-2 font-semibold">
            Training requirements apply to third party organisations
            </p>
            <p className="text-sm mb-4">{data["410-1b-training_requirements"]?data["410-1b-training_requirements"].data?data["410-1b-training_requirements"].data.length>0?data["410-1b-training_requirements"].data[0].Q1?data["410-1b-training_requirements"].data[0].Q1:"No data available":"No data available":"No data available":"No data available"}</p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours per employee:
            </p>
            <p className="text-sm mb-4">{data["404_1a_analyse"]?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"]?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"].length>0?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"].map((val)=>(
              val.average_training_hours_per_employee.toFixed(2)
            )):"No data available":"No data available":"No data available"}</p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours per female employee: 
            </p>
            <p className="text-sm mb-4">{data["404_1a_analyse"]?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"]?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"].length>0?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"].map((val)=>(
              val.average_training_hours_per_female_employee.toFixed(2)
            )):"No data available":"No data available":"No data available"}</p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours per male employee:
            </p>
            <p className="text-sm mb-4">{data["404_1a_analyse"]?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"]?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"].length>0?data["404_1a_analyse"]["average_hours_of_training_provided_to_employees"].map((val)=>(
              val.average_training_hours_per_male_employee.toFixed(2)
            )):"No data available":"No data available":"No data available"}</p>
             <p className="text-[15px]  mb-2 font-semibold">
            Percentage of security personnel who have received formal training in the organisation: 
            </p>
            {/* <p className="text-sm mb-4">No data available</p> */}
            <textarea
            placeholder="Enter the data"
            onChange={handleChangetrainingIntheOrg}
          value={trainingIntheOrg}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
            <p className="text-[15px]  mb-2 font-semibold">
            Percentage of security personnel who have received formal training from third-party organisation: 
            </p>
            {/* <p className="text-sm mb-4">No data available</p> */}
            <textarea
            placeholder="Enter the data"
            onChange={handleChangetrainingOutsidetheOrg}
          value={trainingOutsidetheOrg}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
            <p className="text-[15px]  mb-2 font-semibold">
            Average hours of training provided to employees
            </p>
            <div className="shadow-md mb-4 rounded-md">
                <LeaveTable columns={col} data={Tabledata}/>
            </div>
        </div>
        <div id="section13_5_1" ref={section13_5_1Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.5.1 Management of material topic
</h3>

{/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
Description of organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.
</p> */}
<p className="text-sm mb-2">No data available</p>
{/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
Process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process along with specific lessons learned and how these have been incoporated to organisation's operational policies and procedures.
</p> */}
<p className="text-sm mb-4">No data available</p>

</div>
        </>
    )
}

export default Section16