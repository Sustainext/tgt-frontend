"use client";
import { useState, useRef, useEffect } from "react";
import WaterTable from "../tables/waterTable";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setWaterConsumptionGoals } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const Section18 = ({ section12_3_4Ref, data }) => {
  const content = useSelector(
    (state) => state.screen12Slice.water_consumption_goals
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setWaterConsumptionGoals(
        `Our goal is to reduce water consumption through efficient water use and recycling practices. We implement water-saving measures and invest in technologies that support sustainable water management`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setWaterConsumptionGoals(e.target.value));
  };

  let waterConsumedByStressArea = {
    total: "",
    unit: "",
  };
  let waterConsumedByBusinessOperation = {
    total: "",
    unit: "",
  };
  let waterConsumedByLocation = {
    total: "",
    unit: "",
  };
  let waterConsumedBySource = {
    total: "",
    unit: "",
  };

  const column2 = [
    "Business Operation",
    "Contribution %",
    "Total water Consumption",
    "Unit",
  ];

  const data2 =
    data["water_analyse"] &&
    data["water_analyse"]["total_water_consumption_by_business_operation"]
      .length > 0
      ? data["water_analyse"][
          "total_water_consumption_by_business_operation"
        ].reduce((acc, val) => {
          if (val.Total !== undefined) {
            waterConsumedByBusinessOperation = {
              total: val.Total,
              unit: val.Unit,
            };
          } else {
            acc.push({
              "Business Operation": val.business_operation,
              "Contribution %": val.contribution + "%",
              "Total water Consumption": val.consumption,
              Unit: val.Unit,
            });
          }
          return acc;
        }, [])
      : [
          {
            "Business Operation": "No data available",
            "Contribution %": "No data available",
            "Total water Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const column1 = [
    "Total water Consumption",
    "Water consumption from areas with water stress",
    "Unit",
  ];

  const data1 =
    data["water_analyse"] &&
    data["water_analyse"]["total_water_consumption"].length > 0
      ? data["water_analyse"]["total_water_consumption"].reduce((acc, val) => {
          if (val.Total !== undefined) {
          } else {
            acc.push({
              "Total water Consumption": val.water_consumption,
              "Water consumption from areas with water stress":
                val.water_consumption_water_stress,

              Unit: val.Unit,
            });
          }
          return acc;
        }, [])
      : [
          {
            "Total water Consumption": "No data available",
            "Water consumption from areas with water stress":
              "No data available",

            Unit: "No data available",
          },
        ];

  const column3 = [
    "Location/country",
    "Contribution %",
    "Total water consumption",
    "Unit",
  ];

  const data3 =
    data["water_analyse"] &&
    data["water_analyse"]["total_water_consumption_by_location"].length > 0
      ? data["water_analyse"]["total_water_consumption_by_location"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              waterConsumedByLocation = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Location/country": val.location,
                "Contribution %": val.contribution + "%",
                "Total water consumption": val.total_water_consumption,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Location/country": "No data available",
            "Contribution %": "No data available",
            "Total water consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const column4 = [
    "Source",
    "Water Type",
    "Contribution %",
    "Total Water Consumption",
    "Unit",
  ];

  const data4 =
    data["water_analyse"] &&
    data["water_analyse"]["total_water_consumption_by_source"].length > 0
      ? data["water_analyse"]["total_water_consumption_by_source"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              waterConsumedBySource = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                Source: val.source,
                "Water Type": val.watertype,
                "Contribution %": val.contribution + "%",
                "Total Water Consumption": val.consumption,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            Source: "No data available",
            "Water Type": "No data available",
            "Contribution %": "No data available",
            "Total Water Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const column5 = [
    "Name of Water Stress Area",
    "Contribution %",
    "Water Consumption",
    "Unit",
  ];

  const data5 =
    data["water_analyse"] &&
    data["water_analyse"][
      "total_water_consumption_in_water_stress_areas_by_area"
    ].length > 0
      ? data["water_analyse"][
          "total_water_consumption_in_water_stress_areas_by_area"
        ].reduce((acc, val) => {
          if (val.Total !== undefined) {
            waterConsumedByStressArea = {
              total: val.Total,
              unit: val.Unit,
            };
          } else {
            acc.push({
              "Name of Water Stress Area": val.water_stress_area,
              "Contribution %": val.contribution + "%",
              "Water Consumption": val.consumption,
              Unit: val.Unit,
            });
          }
          return acc;
        }, [])
      : [
          {
            "Name of Water Stress Area": "No data available",
            "Contribution %": "No data available",
            "Water Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const column6 = ["Unit", "Change in water storage"];

  const data6 =
    data["water_analyse"] &&
    data["water_analyse"]["change_in_water_storage"].length > 0
      ? data["water_analyse"]["change_in_water_storage"].reduce((acc, val) => {
          if (val.Total !== undefined) {
          } else {
            acc.push({
              Unit: val.Unit,
              "Change in water storage": val.change_in_water_storage,
            });
          }
          return acc;
        }, [])
      : [
          {
            Unit: "No data available",
            "Change in water storage": "No data available",
          },
        ];

  return (
    <>
      <div id="section12_3_4" ref={section12_3_4Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          12.3.4 Water Consumption 
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s water consumption goals
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
          Total Water Consumption
        </p>
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={column1} data={data1} />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Total Water Consumption in water stress areas
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column5}
            data={data5}
            consumption="Total Water Consumption"
            unit={waterConsumedByStressArea.unit}
            total={waterConsumedByStressArea.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Total Water Consumption by business operation
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column2}
            data={data2}
            consumption="Total Water Consumption"
            unit={waterConsumedByBusinessOperation.unit}
            total={waterConsumedByBusinessOperation.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Total Water Consumption by Location
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column3}
            data={data3}
            consumption="Total Water Consumption"
            unit={waterConsumedByLocation.unit}
            total={waterConsumedByLocation.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Total Water Consumption by source
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column4}
            data={data4}
            consumption="Total Water Consumption"
            unit={waterConsumedBySource.unit}
            total={waterConsumedBySource.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Change in water storage
        </p>
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={column6} data={data6} />
        </div>
      </div>
    </>
  );
};

export default Section18;
