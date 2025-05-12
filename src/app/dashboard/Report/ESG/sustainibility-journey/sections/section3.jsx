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

const Section3 = ({ section10_2Ref }) => {
  const sustainability_goals = useSelector(
    (state) => state.screen10Slice.sustainability_goals
  );
  const dispatch = useDispatch();
  // const loadContent = () => {
  //   dispatch(setSustainabilityGoals(
  //     `We integrate sustainability into our core business operations by setting ambitious goals, implementing robust management systems, and continuously monitoring our performance. Our approach is guided by global frameworks such as the Global Reporting Initiative (GRI) and the United Nations Sustainable Development Goals (SDGs).`))
  // }

  const handleEditorChange = (e) => {
    dispatch(setSustainabilityGoals(e.target.value));
  };
  return (
    <>
      <div ref={section10_2Ref} id="section10_2">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          10.2 Company’s Sustainability Goals
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s sustainability goals
          </p>
          {/* <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button> */}
        </div>
        <textarea
          placeholder="Enter Data"
          onChange={handleEditorChange}
          value={sustainability_goals}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
      </div>
    </>
  );
};

export default Section3;
