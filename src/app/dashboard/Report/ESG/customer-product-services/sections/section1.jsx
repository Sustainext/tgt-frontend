"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setCommitmentStatement } from "../../../../../../lib/redux/features/ESGSlice/screen15Slice";

const Section1 = ({ section15_1Ref,
  sectionNumber = "15.1",
  sectionTitle = 'Products and Services',
  sectionOrder = 15,
 }) => {
  const commitment_statement = useSelector(
    (state) => state.screen15Slice.commitment_statement
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setCommitmentStatement(
        `Our commitment to providing high-quality products and services is central to our business strategy. We adhere to the Global Reporting Initiative (GRI) standards to ensure that our offerings meet the highest levels of safety, sustainability, and customer satisfaction. This section outlines our approach to managing the health and safety impacts of our products, addressing incidents of non-compliance, and ensuring accurate product information and labelling.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setCommitmentStatement(e.target.value));
  };
  return (
    <>
      <div id="setion15_1" ref={section15_1Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s commitment to products and services
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
          value={commitment_statement}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
      </div>
    </>
  );
};

export default Section1;
