'use client'
import { useState, useRef, useEffect } from "react";
import Table2 from "../tables/table2";

const Section13=({section11_4_2Ref})=>{
    const col=[
        "Tax Jurisdiction ",
        "Names of resident entities",
        "Primary activities of the organization",
        "Number of employees and the basis of calculation of this number",
        "Revenues from third party sales",
        "Revenues from intra-group transactions with other tax jurisdictions",
        "Profit/Loss before tax",
        "Tangible assets other than cash and cash equivalents",
        "Corporate income tax paid on a cash basis",
        "Corporate income tax accrued on profit/loss",
        "Reasons for the difference between corporate income tax accrued on profit/loss and the tax due if the statutory tax rate is applied to profit/loss before tax."
    ]
  const values=[
    
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
    "Data",
        
  ]
    return (
        <>
        <div id="section11_4_2" ref={section11_4_2Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.4.2 Approach to Tax
</h3>
<p className="text-[15px] text-[#344054] mb-2">
Our tax strategy is designed to support our business objectives while ensuring we meet our legal and ethical obligations. For xyz tax jurisdiction:
            </p>
            <p className="text-[15px] text-[#344054] mb-2">
            All tax jurisdictions where the entities included in the organization’s audited consolidated financial statements, or in the financial information filed on public record, are resident for tax purposes.
            </p>

<div className="rounded-md shadow-md mb-4">
<Table2 col={col} values={values} />
</div>
       
        </div>
        </>
    )
}

export default Section13