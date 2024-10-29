'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
   
    setSupplyChainSustainability} from "../../../../../../lib/redux/features/ESGSlice/screen10Slice"



const Section4=({section10_3Ref})=>{
    
    const approach_to_supply_chain_sustainability = useSelector(state => state.screen10Slice.approach_to_supply_chain_sustainability);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setSupplyChainSustainability(
        `Our approach to supply chain sustainability focuses on ensuring that our suppliers adhere to high environmental and social standards. We engage with our suppliers through regular assessments, audits, and capacity-building programs to help them improve their sustainability performance.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setSupplyChainSustainability(e.target.value))
    }
    return (
        <>
        <div ref={section10_3Ref} id="section10_3">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
        10.3 Supply Chain Sustainability
        </h3>   
        
            <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s approach to supply chain sustainability</p>
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
          value={approach_to_supply_chain_sustainability}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        
        </div>
        </>
    )
}

export default Section4