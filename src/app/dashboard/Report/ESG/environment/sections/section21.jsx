"use client";
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEnergyConsumptionOutsideOrganization } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const Section21 = ({ section12_4_3Ref, data, reportType }) => {
  const content = useSelector(
    (state) => state.screen12Slice.energy_consumption_outside_organization
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setEnergyConsumptionOutsideOrganization(
        `We also consider energy consumption outside our direct operations, such as in our supply chain and product use. We work with suppliers and customers to promote energy efficiency throughout our value chain.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setEnergyConsumptionOutsideOrganization(e.target.value));
  };

  let energyConsumptionOutsideOrg = {
    total: "",
    unit: "",
  };

  const column1 = ["Energy type", "Purpose", "Energy Consumption", "Unit"];
  const Tabledata =
    data["energy_analyse"] &&
    data["energy_analyse"]["energy_consumption_outside_the_org"].length > 0
      ? data["energy_analyse"]["energy_consumption_outside_the_org"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              energyConsumptionOutsideOrg = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Energy type": val.Energy_type,
                Purpose: val.Purpose,
                "Energy Consumption": val.Quantity,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Energy type": "No data available",
            Purpose: "No data available",
            "Energy Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  return (
    <>
      <div id="section12_4_3" ref={section12_4_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {reportType=='GRI Report: In accordance With'?'12.4.3':'12.4.2'} Energy Consumption Outside of the Organization
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s energy consumption outside of the
            organisation
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

        <p className="text-[15px]  mb-2 font-semibold">
          Energy Consumption outside of the organization
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column1}
            data={Tabledata}
            consumption="Total Energy Consumption outside of the organization"
            unit={energyConsumptionOutsideOrg.unit}
            total={energyConsumptionOutsideOrg.total}
          />
        </div>
      </div>
    </>
  );
};

export default Section21;
