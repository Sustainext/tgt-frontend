"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setApproachSustainability,
  setSustainabilityGoals,
  setSupplyChainSustainability,
} from "../../../../../../lib/redux/features/ESGSlice/screen10Slice";

const Section2 = ({ section10_1Ref }) => {
  const approach_for_sustainability = useSelector(
    (state) => state.screen10Slice.approach_for_sustainability
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setApproachSustainability(
        `We integrate sustainability into our core business operations by setting ambitious goals, implementing robust management systems, and continuously monitoring our performance. Our approach is guided by global frameworks such as the Global Reporting Initiative (GRI) and the United Nations Sustainable Development Goals (SDGs).`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setApproachSustainability(e.target.value));
  };
  return (
    <>
      <div ref={section10_1Ref} id="section10_1">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          10.1 Management approach for sustainability/ESG topics  
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s approach for sustainability
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
          onChange={handleEditorChange}
          value={approach_for_sustainability}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
      </div>
    </>
  );
};

export default Section2;
