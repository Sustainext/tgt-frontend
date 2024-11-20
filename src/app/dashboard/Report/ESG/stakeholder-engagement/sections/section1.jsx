'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import StakeholderTable from "../table";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { setdescription } from "../../../../../../lib/redux/features/ESGSlice/screen6Slice";


const Section1 =({orgName,data})=>{
    const description = useSelector(state => state.screen6Slice.description);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setdescription(
        `Effective stakeholder engagement is vital to ${orgName ? orgName : "[Company Name]'s"} sustainability strategy and overall business success. We recognize that our actions impact a wide range of stakeholders, including employees, customers, suppliers, investors, local communities, and regulatory bodies`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setdescription(e.target.value))
    }


    return (

        <>
        <div>
            <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about stakeholder engagement</p>
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
          value={description}
          onChange={handleEditorChange}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                6.1 Approach to Stakeholder Engagement
        </h3>

        <div className="text-sm mb-6">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Identification and Prioritization 
            </li>
           <p className="mb-4">{data["Stakeholdersidentified"]?data["Stakeholdersidentified"]:"No data available"}</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Stakeholder Categories 
            </li>
            <p className="mb-2">{data["Organisationengages"]?data["Organisationengages"]:"No data available"}</p>
            </ul>  
        
        </div>

        <div className="mb-6">
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Approach to Stakeholder engagement.
        </p>
        <div className="shadow-md rounded-md">
        <StakeholderTable tableData={data.approach_to_stakeholder_engagement?data.approach_to_stakeholder_engagement:[]}/>
        </div>
       
        </div>

        <div className="text-sm mb-4">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            We employ a variety of engagement methods tailored to the needs and preferences of different stakeholder groups.
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold ml-4">
            Engagement with stakeholders
            </li>
           <p className="mb-4 ml-4">{data["Stakeholderengagement"]?data["Stakeholderengagement"]:"No data available"}</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold ml-4">
            Stakeholder’s Feedback
            </li>
            <p className="mb-2 ml-4">{data["stakeholder_feedback"]?data["stakeholder_feedback"]:"No data available"}</p>
            </ul>  
        
        </div>
        </div>
        </>
    )
}

export default Section1