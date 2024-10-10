'use client'
import { useState, useRef, useEffect } from "react";
import LegalActionTable2 from "../tables/legalActionTable2";
import LegalActionTable1 from "../tables/legalActionTable1";

const Section22=({section9_6_3Ref,data})=>{
    const tableData1=data["206_1a"]?Object.values(data["206_1a"].number_legal_actions_anti_competitive_behavior):""
    const tableData2=data["206_1b"]?data["206_1b"]:[]
    return (
        <>
        <div id="section9_6_3" ref={section9_6_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
9.6.3 Anti-trust, Anti-competitive Behavior, Monopoly Practices
</h3>
<p className="text-sm mb-4">{data["206_1a"]?data["206_1a"].legal_actions_anti_competitive_behavior:"No data available"}</p>

<div className="shadow-md rounded-md mb-4">
        <LegalActionTable1 tableData={tableData1} />
</div>
<div className="shadow-md rounded-md mb-4">
        <LegalActionTable2  tabledata={tableData2}/>
</div>

</div>
        </>
    )
}

export default Section22