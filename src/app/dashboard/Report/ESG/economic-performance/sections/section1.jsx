"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyeconomic } from "../../../../../../lib/redux/features/ESGSlice/screen11Slice";

const Section1 = () => {
  const content = useSelector(state => state.screen11Slice.company_economic_performance_statement);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(setCompanyeconomic(
      `Our economic performance is a testament to [Company Name]'s resilience, innovation, and commitment to creating value for our stakeholders. Through strategic investments, prudent financial management, and robust risk mitigation, we aim to sustain long-term economic growth while addressing social and environmental challenges.`
    ))
  }
  const handleChange=(e)=>{
    dispatch(setCompanyeconomic(e.target.value))
  }
  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s economic performance
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
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Section1;
