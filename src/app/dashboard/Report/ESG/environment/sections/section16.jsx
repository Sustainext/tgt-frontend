"use client";
import { useState, useRef, useEffect } from "react";
import WaterTable from "../tables/waterTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setWaterWithdrawalTracking } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const Section16 = ({ section12_3_2Ref, data }) => {
  const content = useSelector(
    (state) => state.screen12Slice.water_withdrawal_tracking
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setWaterWithdrawalTracking(
        `We track and report our water withdrawal to ensure sustainable use of water resources. Our initiatives aim to reduce water withdrawal through process improvements and water-saving technologies.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setWaterWithdrawalTracking(e.target.value));
  };
  let waterWithdrawlByBusinessOperation = {
    total: "",
    unit: "",
  };
  let waterWithdrawlBySource = {
    total: "",
    unit: "",
  };

  let waterWithdrawlByLocation = {
    total: "",
    unit: "",
  };

  let waterWithdrawlByWaterType = {
    total: "",
    unit: "",
  };
  let waterWithdrawlByThirdParties = {
    total: "",
    unit: "",
  };

  const column2 = [
    "Source",
    "Name of Water Stress Area",
    "Water Type",
    "Contribution %",
    "Total Water Consumption",
    "Unit",
  ];

  const data2 =
    data["water_analyse"] &&
    data["water_analyse"]["total_fresh_water_withdrawal_by_source"].length > 0
      ? data["water_analyse"]["total_fresh_water_withdrawal_by_source"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              waterWithdrawlBySource = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                Source: val.source,
                "Name of Water Stress Area": val.water_stress,
                "Water Type": val.water_type,
                "Contribution %": val.contribution + "%",
                "Total Water Consumption": val.total_withdrawal,
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
            "Name of Water Stress Area": "No data available",
            "Water Type": "No data available",
            "Contribution %": "No data available",
            "Total Water Consumption": "No data available",
            Unit: "No data available",
          },
        ];

  const column1 = [
    "Business Operation",
    "Contribution %",
    "Total water withdrawal",
    "Unit",
  ];

  const data1 =
    data["water_analyse"] &&
    data["water_analyse"]["total_fresh_water_withdrawal_by_business_operation"]
      .length > 0
      ? data["water_analyse"][
          "total_fresh_water_withdrawal_by_business_operation"
        ].reduce((acc, val) => {
          if (val.Total !== undefined) {
            waterWithdrawlByBusinessOperation = {
              total: val.Total,
              unit: val.Units,
            };
          } else {
            acc.push({
              "Business Operation": val.business_operation,
              "Contribution %": val.contribution + "%",
              "Total water withdrawal": val.withdrawal,
              Unit: val.Unit,
            });
          }
          return acc;
        }, [])
      : [
          {
            "Business Operation": "No data available",
            "Contribution %": "No data available",
            "Total water withdrawal": "No data available",
            Unit: "No data available",
          },
        ];

  const column3 = [
    "Location/country",
    "Contribution %",
    "Total water withdrawal",
    "Unit",
  ];

  const data3 =
    data["water_analyse"] &&
    data["water_analyse"][
      "get_total_fresh_water_withdrawal_by_location_country"
    ].length > 0
      ? data["water_analyse"][
          "get_total_fresh_water_withdrawal_by_location_country"
        ].reduce((acc, val) => {
          if (val.Total !== undefined) {
            waterWithdrawlByLocation = {
              total: val.Total,
              unit: val.Unit,
            };
          } else {
            acc.push({
              "Location/country": val.location,
              "Contribution %": val.contribution + "%",
              "Total water withdrawal": val.total_water_withdrawal,
              Unit: val.Unit,
            });
          }
          return acc;
        }, [])
      : [
          {
            "Location/country": "No data available",
            "Contribution %": "No data available",
            "Total water withdrawal": "No data available",
            Unit: "No data available",
          },
        ];

  const column4 = [
    "Water type",
    "Source",
    "Contribution %",
    "Total water withdrawal",
    "Unit",
  ];

  const data4 =
    data["water_analyse"] &&
    data["water_analyse"]["total_water_withdrawal_by_water_type"].length > 0
      ? data["water_analyse"]["total_water_withdrawal_by_water_type"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              waterWithdrawlByWaterType = {
                total: val.Total,
                unit: val.Unit,
              };
            } else {
              acc.push({
                "Water type": val.water_type,
                Source: val.source,
                "Contribution %": val.contribution + "%",
                "Total water withdrawal": val.total_water_withdrawal,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Water type": "No data available",
            Source: "No data available",
            "Contribution %": "No data available",
            "Total water withdrawal": "No data available",
            Unit: "No data available",
          },
        ];

  const column5 = [
    "Source of Water withdrawal from third party",
    "Contribution %",
    "Water Withdrawal",
    "Unit",
  ];

  const data5 =
    data["water_analyse"] &&
    data["water_analyse"]["water_withdrawal_from_third_parties"].length > 0
      ? data["water_analyse"]["water_withdrawal_from_third_parties"].reduce(
          (acc, val) => {
            if (val.Total !== undefined) {
              waterWithdrawlByThirdParties = {
                total: val.Total,
                unit: val.Units,
              };
            } else {
              acc.push({
                "Source of Water withdrawal from third party": val.source,
                "Contribution %": val.contribution + "%",
                "Water Withdrawal": val.quantity,
                Unit: val.Unit,
              });
            }
            return acc;
          },
          []
        )
      : [
          {
            "Source of Water withdrawal from third party": "No data available",
            "Contribution %": "No data available",
            "Water Withdrawal": "No data available",
            Unit: "No data available",
          },
        ];

  return (
    <>
      <div id="section12_3_2" ref={section12_3_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          12.3.2 Water Withdrawal
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s tracking of water withdrawal
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
          Total Fresh Water withdrawal by business operation
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column1}
            data={data1}
            consumption="Total water withdrawal"
            unit={waterWithdrawlByBusinessOperation.unit}
            total={waterWithdrawlByBusinessOperation.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Total Fresh Water withdrawal by source (from water stress area)
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column2}
            data={data2}
            consumption="Total water withdrawal from areas with Water stress"
            unit={waterWithdrawlBySource.unit}
            total={waterWithdrawlBySource.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Total Fresh Water withdrawal by Location/Country
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column3}
            data={data3}
            consumption="Total water withdrawal"
            unit={waterWithdrawlBySource.unit}
            total={waterWithdrawlBySource.total}
          />
        </div>

        {/* <p className="text-[15px]  mb-2 font-semibold">
Water withdrawal by water type 

        </p> */}
        <p className="text-[15px]  mb-2 font-semibold">
          Total Water withdrawal by Water type
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column4}
            data={data4}
            consumption="Total water withdrawal"
            unit={waterWithdrawlByWaterType.unit}
            total={waterWithdrawlByWaterType.total}
          />
        </div>

        <p className="text-[15px]  mb-2 font-semibold">
          Water withdrawal from third-parties
        </p>
        <div className="shadow-md rounded-md mb-4">
          <WaterTable
            columns={column5}
            data={data5}
            // consumption=""
            // unit={waterWithdrawlByThirdParties.unit}
            // total={waterWithdrawlByThirdParties.total}
          />
        </div>
      </div>
    </>
  );
};

export default Section16;
