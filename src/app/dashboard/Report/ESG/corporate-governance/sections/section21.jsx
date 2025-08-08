'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import ComplianceTable from "../tables/complianceTable";
import {setPolicyPublic} from "../../../../../../lib/redux/features/ESGSlice/screen9Slice"


const Section21=({section9_6_2Ref,orgName,data,
    sectionNumber = "9.6.1",
    sectionTitle = 'Embedding Policy Commitment',
    sectionOrder = 9,
})=>{
    const policy_not_public_reason = useSelector(state => state.screen9Slice.policy_not_public_reason);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setPolicyPublic(
        `Our commitment to sustainability is embedded in our corporate policies and practices. These policies are regularly reviewed and updated to reflect evolving best practices and stakeholder expectations.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setPolicyPublic(e.target.value))
    }

    const rowLabels=[
        "Overall",
        "Authoritative governmental instruments that the commitments reference",
        "Whether the commitments stipulate conducting due diligence",
        "Whether the commitments stipulate applying the precautionary principle",
        "Whether the commitments stipulate respecting human rights"
    ]

    const rowLabels2=[
        "The internationally recognized human rights that the commitment covers",
        "The categories of stakeholders, including at-risk or vulnerable groups, that the organization gives particular attention to in the commitment",
    ]

    const transformedObject = {
        col1: data["2_23_a"]?.[0]?.column1 === "Yes" ? data["2_23_a"]?.[0]?.column2 : data["2_23_a"]?.[0]?.column1 ?? "No data available",
        col2: data["2_23_a"]?.[1]?.column1 === "Yes" ? data["2_23_a"]?.[1]?.column2 : data["2_23_a"]?.[1]?.column1 ?? "No data available",
        col3: data["2_23_a"]?.[2]?.column1 === "Yes" ? data["2_23_a"]?.[2]?.column2 : data["2_23_a"]?.[2]?.column1 ?? "No data available",
         col4: data["2_23_a"]?.[2]?.column1 === "Yes" ? data["2_23_a"]?.[3]?.column2 : data["2_23_a"]?.[3]?.column1 ?? "No data available",
          col5: data["2_23_a"]?.[2]?.column1 === "Yes" ? data["2_23_a"]?.[4]?.column2 : data["2_23_a"]?.[4]?.column1 ?? "No data available"
      };
     const tableDatanew=data["2_23_a"]?Object.values(transformedObject):""

     const transformedObject2 = {
        col1: data["2_23_b"]?data["2_23_b"].the_internationally_recognized_human_rights_that_the_commitment_covers || "No data available":"No data available",
        col2: data["2_23_b"]?data["2_23_b"].the_categories_of_stakeholders_including_at_risk_or_vulnerable_groups_that_the_organization_gives_particular_attention_to_in_the_commitment || "No data available":"No data available"
       
      };
     const tableDatanew2=data["2_23_b"]?Object.values(transformedObject2):""
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
    )
    const col=[
        "Policy Commitment",
        "Level at which the policy commitments was approved within the organization ",
        "Whether this is the most senior level",
        "If yes, specify senior level"
    ]
    const tableData=data["2_23_d"]?data["2_23_d"]:[]
    return (
        <>
       
        <div id="section9_6_2" ref={section9_6_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
{sectionNumber} {sectionTitle}
</h3>
{/* <p className="text-[15px] text-[#344054] mb-2">
{orgName ? orgName : "[Company Name]"} is committed to integrating sustainable development into our core business strategy. Our approach focuses on reducing environmental impact, enhancing social value, and maintaining strong governance. We aim to create long-term value for our stakeholders while contributing to a more sustainable future. 
            </p> */}
            <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
                      <p className="text-[15px] text-[#344054] mb-2 mt-3">
                        Add statement about embedding policy commitment
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
                      value={policy_not_public_reason}
                      onChange={handleEditorChange}
                      className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
                      rows={4}
                    />


            {/* <div>
         <p className="text-[15px] text-[#344054] mb-2 font-semibold">
         Organization's policy commitments for "responsible business conduct", including:    
        </p>       
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Overall organization's policy commitments for "responsible business conduct"
        </p>
        <p className="text-sm mb-4">
            {data["2_23_a"]?data["2_23_a"][0].column1:"No data available"}
        </p>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Authoritative governmental instruments that the commitments reference
        </p>
        <p className="text-sm mb-4">
        {data["2_23_a"]?data["2_23_a"][1].column1:"No data available"}
        </p>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            The commitments that stipulate conducting due diligence
        </p>
        <p className="text-sm mb-4">
        {data["2_23_a"]?data["2_23_a"][2].column1=="No"?data["2_23_a"][2].column1:'':"No data available"}
        </p>
        {data["2_23_a"]?data["2_23_a"][2].column1_details && (
            <p className="text-sm mb-4">
                {data["2_23_a"][2].column1_details}
            </p>
        ):""}

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            The commitments that stipulate applying the precautionary principle
        </p>
        <p className="text-sm mb-4">
        {data["2_23_a"]?data["2_23_a"][3].column1=="No"?data["2_23_a"][3].column1:'':"No data available"}
        </p>
        {data["2_23_a"]?data["2_23_a"][3].column1_details && (
            <p className="text-sm mb-4">
                {data["2_23_a"][3].column1_details}
            </p>
        ):""}

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            The commitments that stipulate respecting human rights
        </p>
        <p className="text-sm mb-4">
        {data["2_23_a"]?data["2_23_a"][4].column1=="No"?data["2_23_a"][4].column1:'':"No data available"}
        </p>
        {data["2_23_a"]?data["2_23_a"][4].column1_details && (
            <p className="text-sm mb-4">
                {data["2_23_a"][4].column1_details}
            </p>
        ):""}
    </div> */}






<p className="text-[15px] text-[#344054] mb-2 font-semibold">
         Organization's policy commitments for "responsible business conduct", including:    
        </p>

     <div className="shadow-md rounded-md mb-4">
                    <ComplianceTable rowLabels={rowLabels} tableData={tableDatanew} />
                </div>


                <p className="text-[15px] text-[#344054] mb-2 font-semibold">
                Specific policy commitment to "respect human rights", including:
        </p>

     <div className="shadow-md rounded-md mb-4">
                    <ComplianceTable rowLabels={rowLabels2} tableData={tableDatanew2} />
                </div>






{/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
The internationally recognized human rights that the commitment covers
</p>
<p className="text-sm mb-4">{data["2_23_b"]?data["2_23_b"].the_internationally_recognized_human_rights_that_the_commitment_covers:"No data available"}</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The categories of stakeholders, including at-risk or vulnerable groups, that the organization gives 
particular attention to in the commitment
</p>
<p className="text-sm mb-4">{data["2_23_b"]?data["2_23_b"].the_categories_of_stakeholders_including_at_risk_or_vulnerable_groups_that_the_organization_gives_particular_attention_to_in_the_commitment:"No data available"}</p> */}



{/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
Links to policy commitments
</p> */}
<p className="text-sm mb-4">{data["2_23_c"]?data["2_23_c"]?.are_the_organizations_policy_commitments_publicly_available=='Yes'?data["2_23_c"]?.please_provide_links_to_the_policy_commitments?.Q1 ||"No data available":'No':"No data available"}</p>
{/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
Reason why policy is not publicly available
</p> */}
<p className="text-sm mb-4">{data["2_23_c"]?data["2_23_c"]['policy_commitments_are_not_publicly_available'] || "No data available":"No data available"}</p>
{/* <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s sustainability policies</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
           
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <textarea
          value={policy_not_public_reason}
          onChange={handleEditorChange}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        /> */}

<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Level of approval: Policy commitments
</p>
<div className="shadow-md rounded-md mb-4">
        <LeaveTable col={col} tableData={tableData}/>
</div>
<p className="text-sm mb-4">{data["2_23_e"]?data["2_23_e"] || "No data available":"No data available"}</p>
<p className="text-sm mb-4">{data["2_23_f"]?data["2_23_f"] || "No data available":"No data available"}</p>
</div>
        </>
    )
}

export default Section21