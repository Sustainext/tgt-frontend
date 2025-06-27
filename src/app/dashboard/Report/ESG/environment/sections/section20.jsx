"use client";
import { useState, useRef, useEffect } from "react";
import EnergyTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setEnergyConsumptionWithinOrganization } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const Section20 = ({ section12_4_2Ref, data, reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.4.2':'12.4.1',
  sectionTitle = 'Energy Consumption within the Organization',
  sectionOrder = 12,
 }) => {
  const content = useSelector(
    (state) => state.screen12Slice.energy_consumption_within_organization
  );
  const dispatch = useDispatch();
  // const [fuelConsumptionRenewable,setfuelConsumptionRenewable]=useState({total:"",unit:""})
  let fuelConsumptionRenewable = {
    total: "",
    unit: "",
  };
  let fuelConsumptionNonRenewable = {
    total: "",
    unit: "",
  };
  let energyConsumptionWithinOrg = {
    total: "",
    unit: "",
  };
  let directPurchasedFromRenewable = {
    total: "",
    unit: "",
  };
  let directPurchasedFromNonRenewable = {
    total: "",
    unit: "",
  };

  let selfGeneratedForNonRenewable = {
    total: "",
    unit: "",
  };
  let selfGeneratedForRenewable = {
    total: "",
    unit: "",
  };
  let energySoldRenewable = {
    total: "",
    unit: "",
  };
  let energySoldNonRenewable = {
    total: "",
    unit: "",
  };

  const loadContent = () => {
    dispatch(
      setEnergyConsumptionWithinOrganization(
        `We monitor and report our energy consumption within our operations, implementing energy-saving measures and optimizing our processes to reduce usage.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setEnergyConsumptionWithinOrganization(e.target.value));
  };

  const column2 = ["Types of energy consumption", "Consumption", "Unit"];

  const column1 = ["Energy type", "Source", "Energy Consumption", "Unit"];

  const Tabledata1 =
    data["energy_analyse"] &&
    data["energy_analyse"]["fuel_consumption_from_renewable"].length > 0
      ? data["energy_analyse"]["fuel_consumption_from_renewable"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              fuelConsumptionRenewable = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Energy type": val.Energy_type,
                Source: val.Source,
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
            Source: "No data available",
            "Energy Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const Tabledata2 =
    data["energy_analyse"] &&
    data["energy_analyse"]["fuel_consumption_from_non_renewable"].length > 0
      ? data["energy_analyse"]["fuel_consumption_from_non_renewable"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              fuelConsumptionNonRenewable = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Energy type": val.Energy_type,
                Source: val.Source,
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
            Source: "No data available",
            "Energy Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const Tabledata3 =
    data["energy_analyse"] &&
    data["energy_analyse"]["energy_consumption_within_the_org"].length > 0
      ? data["energy_analyse"]["energy_consumption_within_the_org"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              energyConsumptionWithinOrg = {
                total: val.Total,
                unit: val.unit,
              };
            } else {
              acc.push({
                "Types of energy consumption": val.type_of_energy_consumed,
                Consumption: val.consumption,
                Unit: val.unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Types of energy consumption": "No data available",
            Consumption: "No data available",
            Unit: "No data available",
          },
        ];

  const Tabledata4 =
    data["energy_analyse"] &&
    data["energy_analyse"]["direct_purchased_from_renewable"].length > 0
      ? data["energy_analyse"]["direct_purchased_from_renewable"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              directPurchasedFromRenewable = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Energy Type": val.Energy_type,
                Source: val.Source,
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
            "Energy Type": "No data available",
            Source: "No data available",
            Purpose: "No data available",
            "Energy Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const Tabledata5 =
    data["energy_analyse"] &&
    data["energy_analyse"]["direct_purchased_from_non_renewable"].length > 0
      ? data["energy_analyse"]["direct_purchased_from_non_renewable"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              directPurchasedFromNonRenewable = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Energy Type": val.Energy_type,
                Source: val.Source,
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
            "Energy Type": "No data available",
            Source: "No data available",
            Purpose: "No data available",
            "Energy Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const Tabledata6 =
    data["energy_analyse"] &&
    data["energy_analyse"]["self_generated_from_renewable"].length > 0
      ? data["energy_analyse"]["self_generated_from_renewable"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              selfGeneratedForRenewable = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Types of self generated Energy": val.Energy_type,
                Source: val.Source,
                Consumption: val.Quantity,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Types of self generated Energy": "No data available",
            Source: "No data available",
            Consumption: "No data available",
            Unit: "No data available",
          },
        ];

  const Tabledata7 =
    data["energy_analyse"] &&
    data["energy_analyse"]["self_generated_from_non_renewable"].length > 0
      ? data["energy_analyse"]["self_generated_from_non_renewable"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              selfGeneratedForNonRenewable = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Types of self generated Energy": val.Energy_type,
                Source: val.Source,
                Consumption: val.Quantity,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Types of self generated Energy": "No data available",
            Source: "No data available",
            Consumption: "No data available",
            Unit: "No data available",
          },
        ];

  const Tabledata8 =
    data["energy_analyse"] &&
    data["energy_analyse"]["energy_sold_from_renewable"].length > 0
      ? data["energy_analyse"]["energy_sold_from_renewable"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              energySoldRenewable = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Energy Type": val.Energy_type,
                Source: val.Source,
                "Type of entity": val.Entity_type,
                "Name of Entity": val.Entity_name,
                Consumption: val.Quantity,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Energy Type": "No data available",
            Source: "No data available",
            "Type of entity": "No data available",
            "Name of Entity": "No data available",
            Consumption: "No data available",
            Unit: "No data available",
          },
        ];

  const Tabledata9 =
    data["energy_analyse"] &&
    data["energy_analyse"]["energy_sold_from_non_renewable"].length > 0
      ? data["energy_analyse"]["energy_sold_from_non_renewable"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              energySoldNonRenewable = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Energy Type": val.Energy_type,
                Source: val.Source,
                "Type of entity": val.Entity_type,
                "Name of Entity": val.Entity_name,
                Consumption: val.Quantity,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Energy Type": "No data available",
            Source: "No data available",
            "Type of entity": "No data available",
            "Name of Entity": "No data available",
            Consumption: "No data available",
            Unit: "No data available",
          },
        ];

  const column3 = [
    "Energy Type",
    "Source",
    "Purpose",
    "Energy Consumption",
    "Unit",
  ];

  const column4 = [
    "Types of self generated Energy",
    "Source",
    "Consumption",
    "Unit",
  ];

  const column5 = [
    "Energy Type",
    "Source",
    "Type of entity",
    "Name of Entity",
    "Consumption",
    "Unit",
  ];

  return (
    <>
      <div id="section12_4_2" ref={section12_4_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s energy consumption within organisation
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
          Fuel Consumption within the organisation from Renewable sources
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column1}
            data={Tabledata1}
            consumption="Total Energy Consumption"
            unit={fuelConsumptionRenewable.unit}
            total={fuelConsumptionRenewable.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Fuel Consumption within the organisation from Non-renewable sources
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column1}
            data={Tabledata2}
            consumption="Total Non-renewable Energy consumption"
            unit={fuelConsumptionNonRenewable.unit}
            total={fuelConsumptionNonRenewable.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Energy Consumption Within the organisation
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column2}
            data={Tabledata3}
            consumption="Total Energy Consumption Within the organization"
            unit={energyConsumptionWithinOrg.unit}
            total={energyConsumptionWithinOrg.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Direct Purchased Heating, Cooling, Electricity and Steam from
          renewable sources
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column3}
            data={Tabledata4}
            consumption="Total Energy Consumption Within the organization"
            unit={directPurchasedFromRenewable.unit}
            total={directPurchasedFromRenewable.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Direct Purchased Heating, Cooling, Electricity and Steam from
          non-renewable sources
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column3}
            data={Tabledata5}
            consumption="Total Energy Consumption Within the organization"
            unit={directPurchasedFromNonRenewable.unit}
            total={directPurchasedFromNonRenewable.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Self Generated Energy - not consumed or sold (Renewable Energy){" "}
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column4}
            data={Tabledata6}
            consumption="Total Self Generated Electricity (not consumed or sold)"
            unit={selfGeneratedForRenewable.unit}
            total={selfGeneratedForRenewable.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Self Generated Energy - not consumed or sold (non-renewable Energy)
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column4}
            data={Tabledata7}
            consumption="Total Self Generated Electricity (not consumed or sold)"
            unit={selfGeneratedForNonRenewable.unit}
            total={selfGeneratedForNonRenewable.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Energy Sold (Renewable energy)
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column5}
            data={Tabledata8}
            consumption="Total Energy Sold"
            unit={energySoldRenewable.unit}
            total={energySoldRenewable.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Energy Sold (non-renewable energy)
        </p>
        <div className="shadow-md rounded-md mb-4">
          <EnergyTable
            columns={column5}
            data={Tabledata9}
            consumption="Total Energy Sold"
            unit={energySoldNonRenewable.unit}
            total={energySoldNonRenewable.total}
          />
        </div>
      </div>
    </>
  );
};

export default Section20;
