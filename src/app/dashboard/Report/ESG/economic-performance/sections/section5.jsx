"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { setInfrastructureInvestment } from "../../../../../../lib/redux/features/ESGSlice/screen11Slice";

const Section5 = ({ section11_2Ref }) => {
    const data = useSelector(state => state.screen11Slice.getdata);
    const content =useSelector(state => state.screen11Slice.infrastructure_investement);
    const dispatch = useDispatch();
    const text=data['203_1c']?data['203_1c'].map((val)=>val.Q1):''
  const loadContent = () => {
    dispatch(setInfrastructureInvestment(
      `These investments and services are provided through ${text}`
    ))
  }
  const handleChange=(e)=>{
    dispatch(setInfrastructureInvestment(e.target.value))
  }
    return (
        <>
            <div id="section11_2" ref={section11_2Ref}>
                <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                    11.2 Infrastructure Investment and Services Supported
                </h3>

                {/* Iterate over the array data in case there are multiple entries */}
                {data['203_1a']?.map((item, index) => (
                    <p key={`203_1a_${index}`} className="text-sm mb-4">
                        {item.Q1 || "No data available"}
                    </p>
                ))}

                {data['203_1b']?.map((item, index) => (
                    <p key={`203_1b_${index}`} className="text-sm mb-4">
                        {item.Q1 || "No data available"}
                    </p>
                ))}

                 <div className="flex justify-between">
                          <p className="text-[15px] text-[#344054] mb-2 mt-3">
                          Add statement for infrastructure investment and services provided
                          </p>
                          {text?(
                            <button
                            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
                            onClick={loadContent}
                          >
                            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
                            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
                            Auto Fill
                          </button>
                          ):(
                            <div></div>
                          )}
                          
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

export default Section5;
