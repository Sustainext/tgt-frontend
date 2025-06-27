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

const Section36 = ({
  section12_1_7Ref,
  data,
  reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.1.7':'12.1.6',
  sectionTitle = 'GHG Emission Intensity',
  sectionOrder = 12,
}) => {
 
  const content = useSelector(
    (state) => state.screen12Slice.ghg_emission_intensity_tracking
  );
 
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setGHGEmissionIntensityTracking(
        `We track GHG emission intensity to understand our emissions in relation to our business growth and efficiency improvements`
      )
    );
  };
 

  const handleEditorChange = (e) => {
    dispatch(setGHGEmissionIntensityTracking(e.target.value));
  };
  

  const columns = [
    { header: "S.No" },
    { header: "Organisation Metric" },
    { header: "Quantity" },
    { header: "Unit" },
    { header: "Type of GHGs" },
    { header: "GHG Emission Intensity" },
    { header: "Unit" },
    {
      header: "Gases included in the calculation",
      subHeaders: ["CO2", "N2O", "CH4", "HFCs", "PFCs", "SF6", "NF3"],
    },
  ];

  const formattedIntensity =
    data && data["305_123_analyse"]
      ? data["305_123_analyse"]["ghg_emission_intensity"]
        ? data["305_123_analyse"]["ghg_emission_intensity"].length > 0
          ? data["305_123_analyse"]["ghg_emission_intensity"].map(
              (s, index) => {
                return {
                  "S.No": String(index + 1),
                  "Organisation Metric": s.organization_metric,
                  Quantity: s.quantity,
                  Unit: s.unit,
                  "Type of GHGs":
                    s.type_of_ghg?.length > 0 ? s.type_of_ghg.join(", ") : "",
                  "GHG Emission Intensity": s.ghg_emission_intensity,
                  Unit: s.ghg_intensity_unit,
                  CO2: s.ch4 ? (
                    <TiTick className="text-green-400 w-5 h-5" />
                  ) : (
                    ""
                  ),
                  N2O: s.n2o ? (
                    <TiTick className="text-green-400 w-5 h-5" />
                  ) : (
                    ""
                  ),
                  CH4: s.co2 ? (
                    <TiTick className="text-green-400 w-5 h-5" />
                  ) : (
                    ""
                  ),
                  HFCs: s.HFCs ? (
                    <TiTick className="text-green-400 w-5 h-5" />
                  ) : (
                    ""
                  ),
                  PFCs: s.PFCs ? (
                    <TiTick className="text-green-400 w-5 h-5" />
                  ) : (
                    ""
                  ),
                  SF6: s.SF6 ? (
                    <TiTick className="text-green-400 w-5 h-5" />
                  ) : (
                    ""
                  ),
                  NF3: s.NF3 ? (
                    <TiTick className="text-green-400 w-5 h-5" />
                  ) : (
                    ""
                  ),
                };
              }
            )
          : [
              {
                "S.No": "No data available",
                "Organisation Metric": "No data available",
                Quantity: "No data available",
                Unit: "No data available",
                "Type of GHGs": "No data available",
                "GHG Emission Intensity": "No data available",
                Unit: "No data available",
                CO2: "No data available",
                N2O: "No data available",
                CH4: "No data available",
                HFCs: "No data available",
                PFCs: "No data available",
                SF6: "No data available",
                NF3: "No data available",
              },
            ]
        : [
            {
              "S.No": "No data available",
              "Organisation Metric": "No data available",
              Quantity: "No data available",
              Unit: "No data available",
              "Type of GHGs": "No data available",
              "GHG Emission Intensity": "No data available",
              Unit: "No data available",
              CO2: "No data available",
              N2O: "No data available",
              CH4: "No data available",
              HFCs: "No data available",
              PFCs: "No data available",
              SF6: "No data available",
              NF3: "No data available",
            },
          ]
      : [
          {
            "S.No": "No data available",
            "Organisation Metric": "No data available",
            Quantity: "No data available",
            Unit: "No data available",
            "Type of GHGs": "No data available",
            "GHG Emission Intensity": "No data available",
            Unit: "No data available",
            CO2: "No data available",
            N2O: "No data available",
            CH4: "No data available",
            HFCs: "No data available",
            PFCs: "No data available",
            SF6: "No data available",
            NF3: "No data available",
          },
        ];

 
  return (
    <>
      <div>
        <div id="section12_1_7" ref={section12_1_7Ref}>
          <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
          </h3>

          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
              Add statement about tracking of GHG emission intensity
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
            value={content}
            className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
            rows={4}
          />
          {/* <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div> */}
          {/* <p className="text-[14px] text-[#344054] mb-2 font-semibold">
            GHG Emission Intensity
          </p> */}
          <div className="shadow-md rounded-md mb-4">
            <EmissionTable columns={columns} data={formattedIntensity} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section36;
