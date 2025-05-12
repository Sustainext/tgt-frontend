"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setHazardRiskAssessment } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section24 = ({ section13_6_7Ref, data }) => {
  const content = useSelector(
    (state) => state.screen13Slice.hazard_risk_assessment
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setHazardRiskAssessment(
        `We conduct thorough hazard and risk assessments to identify potential workplace dangers and implement measures to mitigate them. At (company name) we conduct Routine Hazard Identification & Risk Assessment every month.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setHazardRiskAssessment(e.target.value));
  };
  const col1 = [
    "Description of Incident ",
    "Incident Reporting Personnel ",
    "Investigation team ",
    "Investigation Methods",
    "Hazard Identification & Risk Assessment",
    "Corrective Actions",
    "System Improvement",
  ];

  const data1 = [
    {
      "Description of Incident ": "Committee 1",
      "Incident Reporting Personnel ": "Data",
      "Investigation team ": "Data",
      "Investigation Methods": "Data",
      "Hazard Identification & Risk Assessment": "Data",
      "Corrective Actions": "Data",
      "System Improvement": "Data",
    },
  ];

  const Tabledata1 = data["403-2d"]
    ? data["403-2d"]["data"] && data["403-2d"]["data"].length > 0
      ? data["403-2d"]["data"].map((val) => ({
          "Description of Incident ":
            val.Descriptionincident || "No data available",
          "Incident Reporting Personnel ": val.Incidentreporting
            ? val.Incidentreporting.join(", ") +
              (val.Incidentreporting_others
                ? `, ${val.Incidentreporting_others}`
                : "")
            : "No data available",
          "Investigation team ": val.Investigationteam
            ? val.Investigationteam.join(", ") +
              (val.Investigationteam_others
                ? `, ${val.Investigationteam_others}`
                : "")
            : "No data available",
          "Investigation Methods": val.InvestigationMethods
            ? val.InvestigationMethods.join(", ") +
              (val.InvestigationMethods_others
                ? `, ${val.InvestigationMethods_others}`
                : "")
            : "No data available",
          "Hazard Identification & Risk Assessment":
            val.HazardIdentification || "No data available",
          "Corrective Actions": val.CorrectiveActions
            ? val.CorrectiveActions.join(", ") +
              (val.CorrectiveActions_others
                ? `, ${val.CorrectiveActions_others}`
                : "")
            : "No data available",
          "System Improvement": val.SystemImprovement || "No data available",
        }))
      : [
          {
            "Description of Incident ": "No data available",
            "Incident Reporting Personnel ": "No data available",
            "Investigation team ": "No data available",
            "Investigation Methods": "No data available",
            "Hazard Identification & Risk Assessment": "No data available",
            "Corrective Actions": "No data available",
            "System Improvement": "No data available",
          },
        ]
    : [
        {
          "Description of Incident ": "No data available",
          "Incident Reporting Personnel ": "No data available",
          "Investigation team ": "No data available",
          "Investigation Methods": "No data available",
          "Hazard Identification & Risk Assessment": "No data available",
          "Corrective Actions": "No data available",
          "System Improvement": "No data available",
        },
      ];

  const col2 = [
    "Reporting channels ",
    "Reporting Processes ",
    "Reporting encouragement ",
    "Reprisal Protection Measures ",
    "Feedback and Communication",
  ];

  const data2 = [
    {
      "Reporting channels ": "Committee 1",
      "Reporting Processes ": "Data",
      "Reporting encouragement ": "Data",
      "Reprisal Protection Measures ": "Data",
      "Feedback and Communication": "Data",
    },
  ];

  const Tabledata2 = data["403-2b-hazard_reporting"]
    ? data["403-2b-hazard_reporting"].length > 0
      ? data["403-2b-hazard_reporting"].map((val) => ({
          "Reporting channels ": val.Reportingchannels
            ? val.Reportingchannels.join(", ") +
              (val.Reportingchannels_others
                ? `, ${val.Reportingchannels_others}`
                : "")
            : "No data available",
          "Reporting Processes ": val.ReportingProcesses
            ? val.ReportingProcesses.join(", ") +
              (val.ReportingProcesses_others
                ? `, ${val.ReportingProcesses_others}`
                : "")
            : "No data available",
          "Reporting encouragement ": val.Reportingencouragement
            ? val.Reportingencouragement.join(", ") +
              (val.Reportingencouragement_others
                ? `, ${val.Reportingencouragement_others}`
                : "")
            : "No data available",
          "Reprisal Protection Measures ":
            val.ReprisalProtection || "No data available",
          "Feedback and Communication": val.FeedbackCommunication
            ? val.FeedbackCommunication.join(", ") +
              (val.FeedbackCommunication_others
                ? `, ${val.FeedbackCommunication_others}`
                : "")
            : "No data available",
        }))
      : [
          {
            "Reporting channels ": "No data available",
            "Reporting Processes ": "No data available",
            "Reporting encouragement ": "No data available",
            "Reprisal Protection Measures ": "No data available",
            "Feedback and Communication": "No data available",
          },
        ]
    : [
        {
          "Reporting channels ": "No data available",
          "Reporting Processes ": "No data available",
          "Reporting encouragement ": "No data available",
          "Reprisal Protection Measures ": "No data available",
          "Feedback and Communication": "No data available",
        },
      ];

  const col3 = [
    "Process Quality Assurance",
    "Personnel Competency Assurance",
    "Results Utilization and Improvement",
  ];

  const data3 = [
    {
      "Process Quality Assurance": "Data",
      "Personnel Competency Assurance": "Data",
      "Results Utilization and Improvement": "Data",
    },
  ];

  const Tabledata3 = data["403-2a-quality_assurance"]
    ? data["403-2a-quality_assurance"]["data"] &&
      data["403-2a-quality_assurance"]["data"].length > 0
      ? data["403-2a-quality_assurance"]["data"].map((val) => ({
          "Process Quality Assurance":
            val.Processquality || "No data available",
          "Personnel Competency Assurance":
            val.Personnelcompetency || "No data available",
          "Results Utilization and Improvement":
            val.Resultsutilization || "No data available",
        }))
      : [
          {
            "Process Quality Assurance": "No data available",
            "Personnel Competency Assurance": "No data available",
            "Results Utilization and Improvement": "No data available",
          },
        ]
    : [
        {
          "Process Quality Assurance": "No data available",
          "Personnel Competency Assurance": "No data available",
          "Results Utilization and Improvement": "No data available",
        },
      ];

  const col4 = [
    "Right to refuse unsafe work",
    "Policy and Process",
    "Protection from Reprisals ",
  ];

  const data4 = [
    {
      "Right to refuse unsafe work": "Committee 1",
      "Policy and Process": "Data",
      "Protection from Reprisals ": "Data",
    },
  ];

  const Tabledata4 = data["403-2c-worker_right"]
    ? data["403-2c-worker_right"]["data"] &&
      data["403-2c-worker_right"]["data"].length > 0
      ? data["403-2c-worker_right"]["data"].map((val) => ({
          "Right to refuse unsafe work": val.Rightrefuse || "No data available",
          "Policy and Process": val.PolicyProcess || "No data available",
          "Protection from Reprisals ": val.Protectionreprisals
            ? val.Protectionreprisals.join(", ") +
              (val.Protectionreprisals_others
                ? ` (${val.Protectionreprisals_others})`
                : "")
            : "No data available",
        }))
      : [
          {
            "Right to refuse unsafe work": "No data available",
            "Policy and Process": "No data available",
            "Protection from Reprisals ": "No data available",
          },
        ]
    : [
        {
          "Right to refuse unsafe work": "No data available",
          "Policy and Process": "No data available",
          "Protection from Reprisals ": "No data available",
        },
      ];

  const col5 = [
    "Routine Hazard Identification & Risk Assessment",
    "Non-Routine Hazard Identification & Risk Assessment",
    "Process for hazard identification",
    "Hierarchy of controls",
    "Legal or guideline basis",
    "List of legal requirements",
    "List of Standards/Guidelines",
    "Vulnerable Workers",
  ];

  const data5 = [
    {
      "Routine Hazard Identification & Risk Assessment": "Committee 1",
      "Non-Routine Hazard Identification & Risk Assessment": "Data",
      "Process for hazard identification": "Data",
      "Hierarchy of controls": "Data",
      "Legal or guideline basis": "Data",
      "List of legal requirements": "Data",
      "List of Standards/Guidelines": "Data",
      "Vulnerable Workers": "Data",
    },
  ];

  const Tabledata5 = data["403-2a-process_for_hazard"]
    ? data["403-2a-process_for_hazard"].length > 0
      ? data["403-2a-process_for_hazard"].map((val) => ({
          "Routine Hazard Identification & Risk Assessment": val.RoutineHazard
            ? `${val.RoutineHazard}${
                val.RoutineHazard_others ? ` (${val.RoutineHazard_others})` : ""
              }`
            : "No data available",
          "Non-Routine Hazard Identification & Risk Assessment":
            val.NonRoutineHazard
              ? val.NonRoutineHazard.join(", ") +
                (val.NonRoutineHazard_others
                  ? ` (${val.NonRoutineHazard_others})`
                  : "")
              : "No data available",
          "Process for hazard identification": val.Processforhazard
            ? val.Processforhazard.join(", ") +
              (val.Processforhazard_others
                ? `, ${val.Processforhazard_others}`
                : "")
            : "No data available",
          "Hierarchy of controls": val.Hierarchycontrols
            ? val.Hierarchycontrols.join(", ") +
              (val.Hierarchycontrols_others
                ? `, ${val.Hierarchycontrols_others}`
                : "")
            : "No data available",
          "Legal or guideline basis": val.Legalguideline || "No data available",
          "List of legal requirements": val.Listlegal || "No data available",
          "List of Standards/Guidelines":
            val.ListStandards || "No data available",
          "Vulnerable Workers": val.VulnerableWorkers
            ? val.VulnerableWorkers.join(", ") +
              (val.VulnerableWorkers_others
                ? `, ${val.VulnerableWorkers_others}`
                : "")
            : "No data available",
        }))
      : [
          {
            "Routine Hazard Identification & Risk Assessment":
              "No data available",
            "Non-Routine Hazard Identification & Risk Assessment":
              "No data available",
            "Process for hazard identification": "No data available",
            "Hierarchy of controls": "No data available",
            "Legal or guideline basis": "No data available",
            "List of legal requirements": "No data available",
            "List of Standards/Guidelines": "No data available",
            "Vulnerable Workers": "No data available",
          },
        ]
    : [
        {
          "Routine Hazard Identification & Risk Assessment":
            "No data available",
          "Non-Routine Hazard Identification & Risk Assessment":
            "No data available",
          "Process for hazard identification": "No data available",
          "Hierarchy of controls": "No data available",
          "Legal or guideline basis": "No data available",
          "List of legal requirements": "No data available",
          "List of Standards/Guidelines": "No data available",
          "Vulnerable Workers": "No data available",
        },
      ];

  return (
    <>
      <div id="section13_6_7" ref={section13_6_7Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          13.6.7 Hazard, Risk Identification and Investigation
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s process of Hazard and risk assessment
          </p>
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
          <LeaveTable columns={col5} data={Tabledata5} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Quality Assurance and system improvement 
        </p>

        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col3} data={Tabledata3} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Work related incident investigation:
        </p>

        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col1} data={Tabledata1} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Hazard reporting and workers protection
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col2} data={Tabledata2} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Worker right to refuse unsafe work
        </p>

        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col4} data={Tabledata4} />
        </div>
      </div>
    </>
  );
};

export default Section24;
