'use client'
import { useState, useRef, useEffect } from "react";
import LegalActionTable2 from "../tables/legalActionTable2";
import LegalActionTable1 from "../tables/legalActionTable1";

const Section22=({section9_6_3Ref,data,
        sectionNumber = "9.6.2",
        sectionTitle = 'Anti-trust, Anti-competitive Behavior, Monopoly Practices',
        sectionOrder = 9,
})=>{
    const tableData1=data["206_1a"]?Object.values(data["206_1a"].number_legal_actions_anti_competitive_behavior):""
    const tableData2=data["206_1b"]?data["206_1b"]:[]
    return (
        <>
        <div id="section9_6_3" ref={section9_6_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
{sectionNumber} {sectionTitle}
</h3>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Any public legal cases regarding corruption brought against the organization or its employees during the reporting period
</p>
<p className="text-sm mb-4">
{
        data['205_3d']?data['205_3d']?.Q1=="No"?'No':data['205_3d']?.Q2 || 'No data available' :'No data available'
}
</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Outcome of public legal cases regarding corruption brought against the organization or its employees during the reporting period.
</p>
<p className="text-sm mb-4">
{
        data['205_3d']?data['205_3d']?.Q3?data['205_3d']?.Q3 || 'No data available' :'No data available':'No data available'
}
</p>
<p className="text-sm mb-4">{data["206_1a"]?data["206_1a"]?.legal_actions_anti_competitive_behavior=="No"?data["206_1a"].legal_actions_anti_competitive_behavior:'':"No data available"}</p>

{
        data["206_1a"]?data["206_1a"]?.legal_actions_anti_competitive_behavior=="No"?(<div></div>):(
                <div className="shadow-md rounded-md mb-4">
        <LegalActionTable1 tableData={tableData1} />
</div>
        ):''
}

<div className="shadow-md rounded-md mb-4">
        <LegalActionTable2  tabledata={tableData2}/>
</div>

</div>
        </>
    )
}

export default Section22