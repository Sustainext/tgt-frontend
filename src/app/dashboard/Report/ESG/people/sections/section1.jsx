'use client'
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setEmployeePoliciesStatement} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice"

const Section1=()=>{
    const content = useSelector(state => state.screen13Slice.employee_policies_statement);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setEmployeePoliciesStatement(
        `Our employees are our most valuable asset, and we are committed to creating a safe, inclusive, and supportive work environment. We aim to attract, develop, and retain top talent while fostering a culture of respect, diversity, and inclusion. This section outlines our management of people-related material topics, including employee welfare, labor management, diversity and inclusion, training and education, occupational health and safety, and collective bargaining.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setEmployeePoliciesStatement(e.target.value))
    }
    return (
        <>
        <div>
        <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s employees and their policies</p>
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
        </div>
        </>
    )
}

export default Section1