"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setdescription } from "../../../../../../lib/redux/features/ESGSlice/screen8Slice";

const Section1 = ({ orgName }) => {
  const description = useSelector((state) => state.screen8Slice.description);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setdescription(
        `Understanding the issues that matter most to our stakeholders and our business is fundamental to ${
          orgName ? orgName : "[Company Name]'s"
        } approach to sustainability. Our materiality assessment identifies and prioritizes the environmental, social, and governance (ESG) issues that are most significant to our stakeholders and our ability to create long-term value`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setdescription(e.target.value));
  };
  return (
    <>
      <div>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s materiality assessment
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
          value={description}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
      </div>
    </>
  );
};

export default Section1;
