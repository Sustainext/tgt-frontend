"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setMarketingPractices } from "../../../../../../lib/redux/features/ESGSlice/screen15Slice";

const Section7 = ({ section15_2_2Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With'?'15.2.2':'15.2.1',
  sectionTitle = 'Marketing',
  sectionOrder = 15,
 }) => {
  const marketing_practices = useSelector(
    (state) => state.screen15Slice.marketing_practices
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setMarketingPractices(
        "Our marketing practices reflect our commitment to ethical standards,transparency, and customer satisfaction. We strive to promote our products and services in a manner that is honest, accurate, and respectful of our customers needs and preferences. We have robust systems in place to monitor, report, and address any incidents of non-compliance."
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setMarketingPractices(e.target.value));
  };
  return (
    <>
      <div id="setion15_2_2" ref={section15_2_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s marketing practices
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
          value={marketing_practices}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        {/* <p className="text-sm mb-4">
          {data["417_3b"]
            ? data["417_3b"].length > 0
              ? data["417_3b"][0].Q1
                ? data["417_3b"][0].Q1
                : "No data available"
              : "No data available"
            : "No data available"}
        </p> */}

<p className="text-[15px] mb-2 text-[#344054]">
Incidents of non-compliance with regulations and/or voluntary codes concerning marketing communications
</p>
        <div className="text-sm mb-4">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Number of Incidents of non-compliance with regulations resulting
              in a fine or penalty: 
              <p className="mb-4 font-normal">
                {data["417_3a"]
                  ? data["417_3a"].data
                    ? data["417_3a"].data.length > 0
                      ? data["417_3a"].data[0].Q1
                        ? data["417_3a"].data[0].Q1
                        : "No data available"
                      : "No data available"
                    : "No data available"
                  : "No data available"}
              </p>
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Number of Incidents of non-compliance with regulations resulting
              in a warning: 
              <p className="mb-4 font-normal">
                {data["417_3a"]
                  ? data["417_3a"].data
                    ? data["417_3a"].data.length > 0
                      ? data["417_3a"].data[0].Q2
                        ? data["417_3a"].data[0].Q2
                        : "No data available"
                      : "No data available"
                    : "No data available"
                  : "No data available"}
              </p>
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Number of Incidents of non-compliance with voluntary codes: 
              <p className="mb-4 font-normal">
                {data["417_3a"]
                  ? data["417_3a"].data
                    ? data["417_3a"].data.length > 0
                      ? data["417_3a"].data[0].Q3
                        ? data["417_3a"].data[0].Q3
                        : "No data available"
                      : "No data available"
                    : "No data available"
                  : "No data available"}
              </p>
            </li>
          </ul>
        </div>
        <div className="text-sm mb-4">
          <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Ethical Marketing Practices 
          </p>
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 ">
              Truthful Advertising: We ensure that all marketing communications
              are truthful, not misleading, and substantiated by evidence. We
              adhere to industry standards and regulatory requirements for
              advertising. 
            </li>
            <li className="text-[15px] text-[#344054] mb-2 ">
              Respect for Privacy: We respect customer privacy and ensure that
              all marketing activities comply with data protection regulations.
              Personal information collected for marketing purposes is handled
              with the utmost care and confidentiality. 
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Section7;
