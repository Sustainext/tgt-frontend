'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section24=({section13_6_7Ref})=>{
    const [content,setContent] = useState(
        `We conduct thorough hazard and risk assessments to identify potential workplace dangers and implement measures to mitigate them. At (company name) we conduct Routine Hazard Identification & Risk Assessment every month.`
    )
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
            "Incident Reporting Personnel ":"",
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
            "Reporting Processes ":"",
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
            "Personnel Competency Assurance":"",
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
            "Policy and Process":"",
            "Protection from Reprisals ":"Data",
        }
    ]
    
    return (
        <>
        <div id="section13_6_7" ref={section13_6_7Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.6.7 Hazard, Risk Identification and Investigation
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
            Process for hazard identification:
            </p>
            
            <p className="text-[15px]  mb-2 font-semibold">
            Routine hazard identification and risk assessment:
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Non-routine hazard identification and risk assessment: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Hierarchy of controls: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            List of Legal basis:  
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            List of standards/guidelines: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            List if Legal requirements: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Vulnerable Workers:   
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Process Quality Assurance:   
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Personal competency assurance: 
            </p>
            <p className="text-[15px]  mb-4 font-semibold">
            Results Utilization and Improvement:
            </p>
           

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
            Quality Assurance and system improvement 
            </p>

            <div className="rounded-md mb-4 shadow-md">
                <LeaveTable columns={col3} data={data3}/>
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