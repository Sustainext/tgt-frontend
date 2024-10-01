'use client'
import { useState, useRef, useEffect } from "react";
import RatioTable from "../tables/ratioTable";

const Section21=({section9_6_2Ref})=>{
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
    )
    const col=[
        "Policy Commitment",
        "Level at which the policy commitments was approved within the organization ",
        "Whether this is the most senior level",
        "If yes, specify senior level"
    ]
    const values=[
        "Data",
        "Data",
        "Data",
        "Data"
    ]
    return (
        <>
       
        <div id="section9_6_2" ref={section9_6_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
9.6.2 Embedding Policy Commitment
</h3>
<p className="text-[15px] text-[#344054] mb-2">
[Company Name] is committed to integrating sustainable development into our core business strategy. Our approach focuses on reducing environmental impact, enhancing social value, and maintaining strong governance. We aim to create long-term value for our stakeholders while contributing to a more sustainable future. 
            </p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Overall organization's policy commitments for "responsible business conduct"
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Authoritative governmental instruments that the commitments reference
</p>
<p className="text-sm mb-4">{content}</p>

<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The commitments that stipulate conducting due diligence
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The commitments that stipulate applying the precautionary principle
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The commitments that stipulate respecting human rights
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The internationally recognized human rights that the commitment covers
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The categories of stakeholders, including at-risk or vulnerable groups, that the organization gives 
particular attention to in the commitment
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Links to policy commitments
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Reason why policy is not publicly available
</p>
<p className="text-sm mb-4">{content}</p>
<p className="text-[15px] text-[#344054] mb-2">
Edit Statement
            </p>
            <textarea
          value={'Our commitment to sustainability is embedded in our corporate policies and practices. These policies are regularly reviewed and updated to reflect evolving best practices and stakeholder expectations. [Can include policy document]'}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Level of approval: Policy commitments
</p>
<div className="shadow-md rounded-md mb-4">
        <RatioTable col={col} values={values}/>
</div>
</div>
        </>
    )
}

export default Section21