"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setExternalAssurance } from "../../../../../../lib/redux/features/ESGSlice/screen7Slice";

const Section4 = ({ section7_3Ref, data }) => {
  const externalAssurance = useSelector(
    (state) => state.screen7Slice.externalAssurance
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setExternalAssurance(
        `To ensure the credibility and reliability of our ESG disclosures, we have engaged an independent third-party assurance provider to verify selected information in this report.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setExternalAssurance(e.target.value));
  };

  return (
    <>
      <div>
        <div id="setion7_3" ref={section7_3Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            7.3 External Assurance
          </h3>
          <p className="text-sm mb-4">
            {data["2-5-a"]
              ? data["2-5-a"]["assurance-policy"]
                ? data["2-5-a"]["assurance-policy"].Q1
                  ? data["2-5-a"]["assurance-policy"].Q1
                  : ""
                : ""
              : ""}
          </p>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
              Add statement about external assurance
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
            value={externalAssurance}
            onChange={handleEditorChange}
            className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
            rows={4}
          />
          <p className="text-sm mb-4">
            {data["2-5-a"]
              ? data["2-5-a"]["assurance-highest"]
                ? data["2-5-a"]["assurance-highest"].Q1
                  ? data["2-5-a"]["assurance-highest"].Q1
                  : ""
                : ""
              : ""}
          </p>
          {/* <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            The scope of the assurance includes
          </p>
          <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Policy and practice for seeking external assurance:
          </p>
          <p className="text-sm mb-4">
            {data["2-5-a"]
              ? data["2-5-a"]["assurance-policy"]
                ? data["2-5-a"]["assurance-policy"].Q1
                  ? data["2-5-a"]["assurance-policy"].Q1
                  : "No data available"
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Involvement of highest governance body and senior executives in the
            process.
          </p>
          <p className="text-sm mb-4">
            {data["2-5-a"]
              ? data["2-5-a"]["assurance-highest"]
                ? data["2-5-a"]["assurance-highest"].Q1
                  ? data["2-5-a"]["assurance-highest"].Q1
                  : "No data available"
                : "No data available"
              : "No data available"}
          </p> */}
          {
            data["2-5-b"]
            ? data["2-5-b"].Q1
              ? data["2-5-b"].Q1 == "No"?'':(
                <div>
                  <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Link or reference to the external assurance reports or assurance
            statements:
          </p>
          <p className="text-sm mb-2">
            {data["2-5-b"]
              ? data["2-5-b"].Q1
                ? data["2-5-b"].Q1 == "No"
                  ? data["2-5-b"].Q1
                  : ""
                : "No data avaailable"
              : "No data available"}
          </p>
          <p className="text-sm mb-4">
            {data["2-5-b"]
              ? data["2-5-b"].Q2
                ? data["2-5-b"].Q2.text
                  ? data["2-5-b"].Q2.text
                  : ""
                : ""
              : ""}
          </p>
                </div>
              ):'':''
          }
          
          <p className="text-[15px] text-[#344054] mb-4 font-semibold">
          Basis of Assurance:
          </p>
          <p className="text-sm mb-2">
            {data["2-5-b"]
              ? data["2-5-b"].Q3
                ? data["2-5-b"].Q3
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Assurance Standard used:
          </p>
          <p className="text-sm mb-2">
            {data["2-5-b"]
              ? data["2-5-b"].Q4
                ? data["2-5-b"].Q4
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Level of Assurance obtained:
          </p>
          <p className="text-sm mb-2">
            {data["2-5-b"]
              ? data["2-5-b"].Q5
                ? data["2-5-b"].Q5
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Limitations of the assurance process:
          </p>
          <p className="text-sm mb-2">
            {data["2-5-b"]
              ? data["2-5-b"].Q6
                ? data["2-5-b"].Q6
                : "No data available"
              : "No data available"}
          </p>
          <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Relationship between the organization and the assurance provider:
          </p>
          <p className="text-sm mb-2">
            {data["2-5-b"]
              ? data["2-5-b"].Q7
                ? data["2-5-b"].Q7
                : "No data available"
              : "No data available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Section4;
