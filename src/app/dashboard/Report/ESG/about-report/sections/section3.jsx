"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setFramework } from "../../../../../../lib/redux/features/ESGSlice/screen7Slice";

const Section3 = ({ section7_2Ref,
  sectionNumber = "7.2",
  sectionTitle = 'Frameworks',
  sectionOrder = 7,
 }) => {
  const framework = useSelector((state) => state.screen7Slice.framework);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setFramework(
        `This report has been prepared in accordance with the GRI Standards, the leading global framework for sustainability reporting. We also align our reporting with other relevant frameworks and guidelines, including: 
United Nations Sustainable Development Goals (SDGs): Our initiatives and performance metrics are mapped to specific SDGs to demonstrate our contribution to global sustainability targets`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setFramework(e.target.value));
  };
  return (
    <>
      <div>
        <div id="setion7_2" ref={section7_2Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            {sectionNumber} {sectionTitle}
          </h3>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
              Add statement about framework used in report
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
            value={framework}
            onChange={handleEditorChange}
            className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
            rows={4}
          />
        </div>
      </div>
    </>
  );
};

export default Section3;
