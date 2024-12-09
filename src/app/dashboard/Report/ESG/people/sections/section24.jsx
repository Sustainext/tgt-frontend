'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setHazardRiskAssessment} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice"

const Section24=({section13_6_7Ref,data})=>{
  
    const content = useSelector(state => state.screen13Slice.hazard_risk_assessment);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setHazardRiskAssessment(
       `We conduct thorough hazard and risk assessments to identify potential workplace dangers and implement measures to mitigate them. At (company name) we conduct Routine Hazard Identification & Risk Assessment every month.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setHazardRiskAssessment(e.target.value))
    }
    const col1=[
        "Description of Incident ",
        "Incident Reporting Personnel ",
        "Investigation team ",
        "Investigation Methods",
        "Hazard Identification & Risk Assessment",
        "Corrective Actions",
        "System Improvement"
    ]

    const data1=[
        {
            "Description of Incident ":"Committee 1",
            "Incident Reporting Personnel ":"Data",
            "Investigation team ":"Data",
            "Investigation Methods":"Data",
            "Hazard Identification & Risk Assessment":"Data",
            "Corrective Actions":"Data",
            "System Improvement":"Data"
        }
    ]

    const col2=[
        "Reporting channels ",
        "Reporting Processes ",
        "Reporting encouragement ",
        "Reprisal Protection Measures ",
        "Feedback and Communication",
    ]

    const data2=[
        {
            "Reporting channels ":"Committee 1",
            "Reporting Processes ":"Data",
            "Reporting encouragement ":"Data",
            "Reprisal Protection Measures ":"Data",
            "Feedback and Communication":"Data",
        }
    ]

    const col3=[
        "Process Quality Assurance",
        "Personnel Competency Assurance",
        "Results Utilization and Improvement",
    ]

    const data3=[
        {
            "Process Quality Assurance":"Data",
            "Personnel Competency Assurance":"Data",
            "Results Utilization and Improvement":"Data",
        }
    ]

    const col4=[
        "Right to refuse unsafe work",
        "Policy and Process",
        "Protection from Reprisals ",
    ]

    const data4=[
        {
            "Right to refuse unsafe work":"Committee 1",
            "Policy and Process":"Data",
            "Protection from Reprisals ":"Data",
        }
    ]

    const col5=[
        "Routine Hazard Identification & Risk Assessment",
        "Non-Routine Hazard Identification & Risk Assessment",
        "Process for hazard identification",
        "Hierarchy of controls",
        "Legal or guideline basis",
        "List of legal requirements",
        "List of Standards/Guidelines",
        "Vulnerable Workers"
    ]

    const data5=[
        {
            "Routine Hazard Identification & Risk Assessment":"Committee 1",
            "Non-Routine Hazard Identification & Risk Assessment":"Data",
            "Process for hazard identification":"Data",
            "Hierarchy of controls":"Data",
            "Legal or guideline basis":"Data",
            "List of legal requirements":"Data",
            "List of Standards/Guidelines":"Data",
            "Vulnerable Workers":"Data"
        }
    ]
    
    return (
        <>
        <div id="section13_6_7" ref={section13_6_7Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.6.7 Hazard, Risk Identification and Investigation
</h3>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s process of Hazard and risk assessment</p>
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

      
            {/* <p className="text-[15px]  mb-2 font-semibold">
            Process for hazard identification:
            </p>
            <p className="text-sm mb-4">{data["403-2a-process_for_hazard"]?data["403-2a-process_for_hazard"].Q3?data["403-2a-process_for_hazard"].Q3.selected?data["403-2a-process_for_hazard"].Q3.selected:data["403-2a-process_for_hazard"].Q3.otherValue:"No data available":"No data available"}</p>
            <p className="text-[15px]  mb-2 font-semibold">
            Routine hazard identification and risk assessment:
            </p>
            <p className="text-sm mb-4">{data["403-2a-process_for_hazard"]?data["403-2a-process_for_hazard"].Q1?data["403-2a-process_for_hazard"].Q1.selected?data["403-2a-process_for_hazard"].Q1.selected:data["403-2a-process_for_hazard"].Q1.otherValue:"No data available":"No data available"}</p>
            <p className="text-[15px]  mb-2 font-semibold">
            Non-routine hazard identification and risk assessment: 
            </p>
            <p className="text-sm mb-4">{data["403-2a-process_for_hazard"]?data["403-2a-process_for_hazard"].Q2?data["403-2a-process_for_hazard"].Q2.selected?data["403-2a-process_for_hazard"].Q2.selected:data["403-2a-process_for_hazard"].Q2.otherValue:"No data available":"No data available"}</p>
            
            <p className="text-[15px]  mb-2 font-semibold">
            Hierarchy of controls: 
            </p>
            <p className="text-sm mb-4">{data["403-2a-process_for_hazard"]?data["403-2a-process_for_hazard"].Q4?data["403-2a-process_for_hazard"].Q4.selected?data["403-2a-process_for_hazard"].Q4.selected:data["403-2a-process_for_hazard"].Q4.otherValue:"No data available":"No data available"}</p>
            
            <p className="text-[15px]  mb-2 font-semibold">
            Legal basis:  
            </p>
            <p className="text-sm mb-4">{data["403-2a-process_for_hazard"]?data["403-2a-process_for_hazard"].Q5?data["403-2a-process_for_hazard"].Q5.selected?data["403-2a-process_for_hazard"].Q5.selected:data["403-2a-process_for_hazard"].Q5:"No data available":"No data available"}</p>
            
            <p className="text-[15px]  mb-2 font-semibold">
            List of standards/guidelines: 
            </p>
            <p className="text-sm mb-4">No data available</p>
            <p className="text-[15px]  mb-2 font-semibold">
            List if Legal requirements: 
            </p>
            <p className="text-sm mb-4">{data["403-2a-process_for_hazard"]?data["403-2a-process_for_hazard"].Q6?data["403-2a-process_for_hazard"].Q6.selected?data["403-2a-process_for_hazard"].Q6.selected:data["403-2a-process_for_hazard"].Q6:"No data available":"No data available"}</p>
            
            <p className="text-[15px]  mb-2 font-semibold">
            Vulnerable Workers:   
            </p>
            <p className="text-sm mb-4">{data["403-2a-process_for_hazard"]?data["403-2a-process_for_hazard"].Q7?data["403-2a-process_for_hazard"].Q7.selected?data["403-2a-process_for_hazard"].Q7.selected:data["403-2a-process_for_hazard"].Q7.otherValue:"No data available":"No data available"}</p>
            
            <p className="text-[15px]  mb-2 font-semibold">
            Process Quality Assurance:   
            </p>
            <p className="text-sm mb-4">{data["403-2b-quality_assurance"]?data["403-2b-quality_assurance"].data?data["403-2b-quality_assurance"].data.length>0?data["403-2b-quality_assurance"].data[0].Q1?data["403-2b-quality_assurance"].data[0].Q1:"No data available":"No data available":"No data available":"No data available"}</p>
            <p className="text-[15px]  mb-2 font-semibold">
            Personal competency assurance: 
            </p>
            <p className="text-sm mb-4">{data["403-2b-quality_assurance"]?data["403-2b-quality_assurance"].data?data["403-2b-quality_assurance"].data.length>0?data["403-2b-quality_assurance"].data[0].Q2?data["403-2b-quality_assurance"].data[0].Q2:"No data available":"No data available":"No data available":"No data available"}</p>
           
            <p className="text-[15px]  mb-4 font-semibold">
            Results Utilization and Improvement:
            </p>
            <p className="text-sm mb-4">{data["403-2b-quality_assurance"]?data["403-2b-quality_assurance"].data?data["403-2b-quality_assurance"].data.length>0?data["403-2b-quality_assurance"].data[0].Q3?data["403-2b-quality_assurance"].data[0].Q3:"No data available":"No data available":"No data available":"No data available"}</p> */}
           
          
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col5} data={data5}/>
            </div>

            <p className="text-[15px]  mb-2 font-semibold">
            Quality Assurance and system improvement 
            </p>

            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col3} data={data3}/>
            </div>

            <p className="text-[15px]  mb-2 font-semibold">
            Work related incident investigation:  
            </p>
           
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col1} data={data1}/>
            </div>

            <p className="text-[15px]  mb-2 font-semibold">
            Hazard reporting and workers protection   
            </p>
            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col2} data={data2}/>
            </div>


            <p className="text-[15px]  mb-2 font-semibold">
            Worker right to refuse unsafe work 
            </p>

            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col4} data={data4}/>
            </div>

</div>
        </>
    )
}

export default Section24