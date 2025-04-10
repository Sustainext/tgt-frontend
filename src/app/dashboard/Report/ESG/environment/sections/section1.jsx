'use client'
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setEnvironmentStatement} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice"

const Section1=({orgName})=>{
    const content = useSelector(state => state.screen12Slice.environmental_responsibility_statement);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setEnvironmentStatement(
        `At ${orgName ? orgName : "[Company Name]"}, we recognize our responsibility to minimize the environmental impact of our operations and to contribute positively to the health of our planet. Our environmental strategy is focused on reducing emissions, managing materials responsibly, conserving water, optimizing energy use, reducing waste, protecting biodiversity, and improving air quality.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setEnvironmentStatement(e.target.value))
    }
    return (
        <>
        <div>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s responsibility to minimize the environmental impact</p>
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