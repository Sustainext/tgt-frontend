"use client";
import { useState, useRef, useEffect } from "react";
import EmissionTable from "../tables/emissionTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setGHGEmissionIntensityTracking,
  setBaseYear,
  setConsolidation,
} from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";
import dynamic from "next/dynamic";
import { TiTick } from "react-icons/ti";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section7 = ({
  section12_1_5Ref,
  section12_1_6Ref,
  section12_1_7Ref,
  data,
  reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.1.5':'12.1.4',
  sectionTitle = 'Base Year',
  sectionOrder = 12,
}) => {
 
 
  const content3 = useSelector((state) => state.screen12Slice.base_year);
  const dispatch = useDispatch();
 

  const loadContent3 = () => {
    dispatch(
      setBaseYear(
        `The total emissions for the base year amount to ${emisisonBaseYear} tCO2e, calculated using robust methodologies aligned with international standards. `
      )
    );
  };

 

  const handleEditorChange3 = (e) => {
    dispatch(setBaseYear(e.target.value));
  };

 

  const baseYear =
    data && data["emission_collect"]
      ? data["emission_collect"]["base_year"].length > 0
        ? data["emission_collect"]["base_year"][0].Q1
          ? data["emission_collect"]["base_year"][0].Q1.startDate +
            " to " +
            data["emission_collect"]["base_year"][0].Q1.endDate
          : ""
        : ""
      : "";
  const rationale =
    data && data["emission_collect"]
      ? data["emission_collect"]["base_year"].length > 0
        ? data["emission_collect"]["base_year"][0].Q2
          ? data["emission_collect"]["base_year"][0].Q2
          : ""
        : ""
      : "";
  const emisisonBaseYear =
    data && data["emission_collect"]
      ? data["emission_collect"]["base_year"].length > 0
        ? data["emission_collect"]["base_year"][0].Q3
          ? data["emission_collect"]["base_year"][0].Q3
          : ""
        : ""
      : "";
  const recalculatedYear =
    data && data["emission_collect"]
      ? data["emission_collect"]["base_year"].length > 0
        ? data["emission_collect"]["base_year"][0].Q5
          ? data["emission_collect"]["base_year"][0].Q5
          : ""
        : ""
      : "";
  const specificChanges =
    data && data["emission_collect"]
      ? data["emission_collect"]["base_year"].length > 0
        ? data["emission_collect"]["base_year"][0].Q6
          ? data["emission_collect"]["base_year"][0].Q6
          : ""
        : ""
      : "";
  const context =
    data && data["emission_collect"]
      ? data["emission_collect"]["base_year"].length > 0
        ? data["emission_collect"]["base_year"][0].Q7
          ? data["emission_collect"]["base_year"][0].Q7
          : ""
        : ""
      : "";
  return (
    <>
      <div>
        <div id="section12_1_5" ref={section12_1_5Ref}>
          <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
          </h3>
          <p className="text-sm mb-4">
            {baseYear && rationale ? (
              <>
                The organization has selected {baseYear} for calculating
                greenhouse gas (GHG) emissions. {rationale}
                <br />
              </>
            ) : (
              "No data available"
            )}
          </p>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
              Add statement
            </p>
            {emisisonBaseYear && (
              <button
                className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
                onClick={loadContent3}
              >
                {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
                <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
                Auto Fill
              </button>
            )}
          </div>
          <textarea
            onChange={handleEditorChange3}
            value={content3}
            className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
            rows={4}
          />

          <p className="text-sm mb-4">
            {recalculatedYear && specificChanges ? (
              <>
                The base year emissions have been recalculated in{" "}
                {recalculatedYear} due to significant changes such as:<br/><br/>
                {specificChanges}
                <br />
                {/* <br /> */}
                {context}
              </>
            ) : (
              "No data available"
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Section7;
