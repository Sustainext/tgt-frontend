'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setScopeTwoEmission} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"
import ScopeTable from '../tables/scopeTable'

const Section5=({section12_1_3Ref,data})=>{
    
    const content = useSelector(state => state.screen12Slice.scope_two_emissions);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setScopeTwoEmission(
        `Scope 2 emissions are indirect GHG emissions from the consumption of purchased electricity, heat, or steam. We aim to reduce Scope 2 emissions by increasing our use of renewable energy and improving energy efficiency.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setScopeTwoEmission(e.target.value))
    }
    const col2=[
        "Category",
        "Sub Category",
        "Activity",
        "Value"
    ]
    return (
        <>
       
        <div id="section12_1_3" ref={section12_1_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.1.3 Scope 2 GHG Emissions
</h3>

<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s scope 2 emissions</p>
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
        <p className="text-[15px]  mb-2 font-semibold">
            Scope 2
            </p>
            <div className="shadow-md rounded-md mb-4">
<ScopeTable columns={col2} data={data["305_123_collect"]?data["305_123_collect"]["gri-environment-emissions-301-a-scope-2"]?data["305_123_collect"]["gri-environment-emissions-301-a-scope-2"]:"":""}/>
</div>
           
</div>
        </>
    )
}

export default Section5