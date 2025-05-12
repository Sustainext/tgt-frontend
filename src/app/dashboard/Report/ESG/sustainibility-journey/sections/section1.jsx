"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyStatement,
  setApproachSustainability,
  setSustainabilityGoals,
  setSupplyChainSustainability,
} from "../../../../../../lib/redux/features/ESGSlice/screen10Slice";

const Section1 = ({ orgName }) => {
  const statement = useSelector(
    (state) => state.screen10Slice.company_sustainability_statement
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setCompanyStatement(
        `At ${
          orgName ? orgName : "[Company Name]"
        }, sustainability is more than just a strategic priority; it is a fundamental component of our corporate identity. Our sustainability journey reflects our commitment to integrating environmental, social, and governance (ESG) principles into every aspect of our business, ensuring that we create long-term value for our stakeholders while positively impacting society and the environment.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setCompanyStatement(e.target.value));
  };
  return (
    <>
      <div>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s sustainability journey
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
          value={statement}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
      </div>
    </>
  );
};

export default Section1;
