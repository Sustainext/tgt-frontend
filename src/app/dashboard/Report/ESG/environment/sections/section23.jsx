"use client";
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/reductionTable";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEnergyConsumptionReductionCommitment } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const Section23 = ({ section12_4_5Ref, data }) => {
  const content = useSelector(
    (state) => state.screen12Slice.energy_consumption_reduction_commitment
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setEnergyConsumptionReductionCommitment(
        `We set targets for reducing energy consumption and implement various initiatives, such as upgrading equipment, improving insulation, and optimizing processes to achieve these goals.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setEnergyConsumptionReductionCommitment(e.target.value));
  };

  let reductionOfEnergyConsumption = {
    total1: "",
    unit1: "",
    total2: "",
    unit2: "",
  };
  let reductionOfEnergyService = {
    total1: "",
    unit1: "",
    total2: "",
    unit2: "",
  };

  const column1 = [
    "Type of Intervention",
    "Energy Type",
    "Energy reduction",
    "Base year",
    "Methodology",
    "Quantity 1",
    "Unit 1",
    "Quantity 2",
    "Unit 2",
  ];
  const Tabledata =
    data["energy_analyse"] &&
    data["energy_analyse"]["reduction_of_ene_consump"].length > 0
      ? data["energy_analyse"]["reduction_of_ene_consump"].reduce(
          (acc, val) => {
            if (val.Total1 !== undefined) {
              reductionOfEnergyConsumption = {
                total1: val.Total1,
                unit1: val.Unit1,
                total2: val.Total2,
                unit2: val.Unit2,
              };
            } else {
              acc.push({
                "Type of Intervention": val.Type_of_intervention,
                "Energy Type": val.Energy_type,
                "Energy reduction": val.Energy_reduction,
                "Base year": val.Base_year,
                Methodology: val.Methodology,
                "Quantity 1": val.Quantity1,
                "Unit 1": val.Unit1,
                "Quantity 2": val.Quantity2,
                "Unit 2": val.Unit2,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Type of Intervention": "No data available",
            "Energy Type": "No data available",
            "Energy reduction": "No data available",
            "Base year": "No data available",
            Methodology: "No data available",
            "Quantity 1": "No data available",
            "Unit 1": "No data available",
            "Quantity 2": "No data available",
            "Unit 2": "No data available",
          },
        ];

  const column2 = [
    "Name of Product/ Service",
    "Reduction in Energy Consumption 1",
    "Unit 1",
    "Reduction in Energy Consumption 2",
    "Unit 2",
  ];
  const Tabledata2 =
    data["energy_analyse"] &&
    data["energy_analyse"]["reduction_of_ene_prod_and_services"].length > 0
      ? data["energy_analyse"]["reduction_of_ene_prod_and_services"].reduce(
          (acc, val) => {
            if (val.Total1 !== undefined) {
              reductionOfEnergyService = {
                total1: val.Total1,
                unit1: val.Unit1,
                total2: val.Total2,
                unit2: val.Unit2,
              };
            } else {
              acc.push({
                "Name of Product/ Service": val.Product,
                "Reduction in Energy Consumption 1": val.Quantity1,
                "Unit 1": val.Unit1,
                "Reduction in Energy Consumption 2": val.Quantity2,
                "Unit 2": val.Unit2,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Name of Product/ Service": "No data available",
            "Reduction in Energy Consumption 1": "No data available",
            "Unit 1": "No data available",
            "Reduction in Energy Consumption 2": "No data available",
            "Unit 2": "No data available",
          },
        ];

  return (
    <>
      <div id="section12_4_5" ref={section12_4_5Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          12.4.5 Reduction in Energy consumption
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s commitment to reduce energy
            consumption
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
          Reduction of energy consumption
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column1}
            data={Tabledata}
            consumption="Reduction in energy consumption total"
            unit1={reductionOfEnergyConsumption.unit1}
            total1={reductionOfEnergyConsumption.total1}
            unit2={reductionOfEnergyConsumption.unit2}
            total2={reductionOfEnergyConsumption.total2}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Reductions in energy requirements of products and services
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column2}
            data={Tabledata2}
            consumption="Total reduction in energy requirements of products and services"
            unit1={reductionOfEnergyService.unit1}
            total1={reductionOfEnergyService.total1}
            unit2={reductionOfEnergyService.unit2}
            total2={reductionOfEnergyService.total2}
          />
        </div>
      </div>
    </>
  );
};

export default Section23;
