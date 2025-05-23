"use client";
import { useState, useRef, useEffect } from "react";
import ComplaintTable from "../table2";
import { useDispatch, useSelector } from "react-redux";
import { setCustomers } from "../../../../../../lib/redux/features/ESGSlice/screen15Slice";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

const Section8 = ({ section15_3Ref, data }) => {
  const customers = useSelector(
    (state) => state.screen15Slice.customers
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setCustomers(
        `Our customers are at the heart of everything we do. We are dedicated to delivering exceptional value, ensuring customer satisfaction, and building long-term relationships based on trust and mutual benefit.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setCustomers(e.target.value));
  };
  const tableData = data["418_1a_analyse"]
    ? data["418_1a_analyse"].customer_privacy_data
      ? data["418_1a_analyse"].customer_privacy_data
      : []
    : [];
  return (
    <>
      <div id="setion15_3" ref={section15_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          15.3 Customers
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about customers
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
          value={customers}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        <p className="text-[15px] mb-2 font-semibold">
          Total number of substantiated complaints received concerning breaches
          of customer privacy
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <ComplaintTable data={tableData} />
        </div>
        <p className="text-[15px] mb-2 font-semibold">
        Statement of fact
        </p>
        <p className="text-sm mb-4">
          {data["418_1c"]
            ? data["418_1c"].length > 0
              ? data["418_1c"][0].Q1
                ? data["418_1c"][0].Q1
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px] mb-2 font-semibold">
          Number of identified leaks, thefts, or losses of customer data:
        </p>
        <p className="text-sm mb-4">
          {data["418_1b"]
            ? data["418_1b"].length > 0
              ? data["418_1b"][0].Q1
                ? data["418_1b"][0].Q1
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        
      </div>
    </>
  );
};

export default Section8;
