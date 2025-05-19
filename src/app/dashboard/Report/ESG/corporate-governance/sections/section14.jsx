'use client'
import { useState, useRef, useEffect } from "react";
import RatioTable2 from "../tables/ratioTable2";

const Section14=({section9_3_8Ref,data})=>{
    const col=[
        "Ratio of annual total compensation",
        "Ratio of percentage  increase in annual total compensation",
        
    ]
    const values=data["2_21_a_analyse_governance"]?data["2_21_a_analyse_governance"]:[]
    return (
        <>
        <div id="section9_3_8" ref={section9_3_8Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.8 Annual Compensation Ratio
            </h3>
            <p className="text-sm mb-4">
                {
                    data['2_21_c']?data['2_21_c']:'No data available'
                }
            </p>
            {/* <p className="text-sm mb-4">We disclose the ratio of the annual total compensation of our CEO to the median annual total compensation of all other employees. This metric provides transparency and helps stakeholders understand our compensation practices. </p> */}
            {/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Annual total compensation for the organization's highest paid-individual:
            </p>
            <p className="text-sm mb-4">{data["2_21_a"]?data["2_21_a"].Q1?data["2_21_a"].Q1:"No data available":"No data available"}</p>
           
           
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Median annual total compensation for all of the organization's employees excluding the highest-paid individual:
            </p>
            <p className="text-sm mb-4">{data["2_21_a"]?data["2_21_a"].Q2?data["2_21_a"].Q2:"No data available":"No data available"}</p>



            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Percentage increase in annual total compensation for the organization's highest-paid individual:
            </p>
            <p className="text-sm mb-4">{data["2_21_b"]?data["2_21_b"].Q1?data["2_21_b"].Q1:"No data available":"No data available"}</p>



            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Median percentage increase in annual total compensation for all of the organization's employees excluding the highest-paid individual:
            </p>
            <p className="text-sm mb-4">{data["2_21_b"]?data["2_21_b"].Q2?data["2_21_b"].Q2:"No data available":"No data available"}</p>


            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Contextual information to understand data compilation:
            </p>
            <p className="text-sm mb-4">{data["2_21_a"]?data["2_21_c"]:"No data available"}</p> */}

           
           
           
           
           
           
           
           
           
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Ratio of annual total compensation & ratio of percentage increase in annual total compensation 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <RatioTable2 col={col} values={values}/>
            </div>
            
        
        </div>
        </>
    )
}

export default Section14