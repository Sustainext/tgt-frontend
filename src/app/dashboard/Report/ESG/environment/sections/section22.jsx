"use client";
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEnergyIntensityTracking } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const Section22 = ({ section12_4_4Ref, data }) => {
  const content = useSelector(
    (state) => state.screen12Slice.energy_intensity_tracking
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setEnergyIntensityTracking(
        `Energy intensity measures our energy consumption relative to our production output. By tracking this metric, we can assess our energy efficiency and identify opportunities for improvement.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setEnergyIntensityTracking(e.target.value));
  };

  const column1 = [
    "Energy Quantity",
    "Organisation Metric",
    "Energy Intensity 1",
    "Unit 1",
    "Energy Intensity 2",
    "Unit 2",
  ];
  const Tabledata = data["energy_analyse"]
    ? data["energy_analyse"]["energy_intensity"].length > 0
      ? data["energy_analyse"]["energy_intensity"].map((val, index) => {
          return {
            "Energy Quantity": val.Energy_quantity,
            "Organisation Metric": val.Organization_metric,
            "Energy Intensity 1": val.Energy_intensity1,
            "Unit 1": val.Unit1,
            "Energy Intensity 2": val.Energy_intensity2,
            "Unit 2": val.Unit2,
          };
        })
      : [
          {
            "Energy Quantity": "No data available",
            "Organisation Metric": "No data available",
            "Energy Intensity 1": "No data available",
            "Unit 1": "No data available",
            "Energy Intensity 2": "No data available",
            "Unit 2": "No data available",
          },
        ]
    : [
        {
          "Energy Quantity": "No data available",
          "Organisation Metric": "No data available",
          "Energy Intensity 1": "No data available",
            "Unit 1": "No data available",
            "Energy Intensity 2": "No data available",
            "Unit 2": "No data available",
        },
      ];

  return (
    <>
      <div id="section12_4_4" ref={section12_4_4Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          12.4.4 Energy Intensity
        </h3>

        <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about tracking the Energy Intensity
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

        <p className="text-[15px]  mb-2 font-semibold">Energy Intensity</p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable columns={column1} data={Tabledata} />
        </div>
      </div>
    </>
  );
};

export default Section22;
