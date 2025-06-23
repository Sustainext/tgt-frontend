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

const Section35 = ({
  
  section12_1_6Ref,
 
  data,
  reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.1.6':'12.1.5',
  sectionTitle = 'Consolidation Approach',
  sectionOrder = 12,
}) => {
  const consolidation =
    data && data["emission_collect"]
      ? data["emission_collect"]["consolidation_approach_for_emission"].length >
        0
        ? data["emission_collect"]["consolidation_approach_for_emission"][0].Q1
          ? data["emission_collect"]["consolidation_approach_for_emission"][0]
              .Q1
          : ""
        : ""
      : "";
 
  const content2 = useSelector((state) => state.screen12Slice.consolidation);
 
  const dispatch = useDispatch();
 
  const loadContent2 = () => {
    dispatch(
      setConsolidation(
        `To ensure consistency and transparency in GHG reporting, the organization adheres to the ${consolidation} method for consolidation. This approach aligns with international best practices and reflects the organization’s direct and indirect emission sources effectively.`
      )
    );
  };

  
  const handleEditorChange2 = (e) => {
    dispatch(setConsolidation(e.target.value));
  };

  
  return (
    <>
      <div>
       

        <div id="section12_1_6" ref={section12_1_6Ref}>
          <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
          </h3>

          <div className="flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
              Add statement about tracking of Consolidation Approach
            </p>
            {consolidation && (
              <button
                className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
                onClick={loadContent2}
              >
                {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
                <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
                Auto Fill
              </button>
            )}
          </div>
          <textarea
            onChange={handleEditorChange2}
            value={content2}
            className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
            rows={4}
          />
        </div>

        
      </div>
    </>
  );
};

export default Section35;
