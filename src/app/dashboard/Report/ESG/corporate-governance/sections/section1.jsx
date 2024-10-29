'use client'
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setStatement} from "../../../../../../lib/redux/features/ESGSlice/screen9Slice"



const Section1=({orgName})=>{
   
    const statement = useSelector(state => state.screen9Slice.statement);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setStatement(
        `At ${orgName ? orgName : "[Company Name]"}, strong corporate governance is the foundation of our business integrity, accountability, and sustainability. Our governance framework is designed to ensure transparent, ethical, and effective management, aligning with the best practices and standards to drive long-term value for our stakeholders.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setStatement(e.target.value))
    }
    return (
        <>
        <div>
        <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s corporate governance</p>
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
          value={statement}
          onChange={handleEditorChange}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        </div>
        </>
    )
}

export default Section1