"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setForcedLaborPosition } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section10 = ({ section13_2_3Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'13.2.3':'13.1.2',
  sectionTitle = "Forced or Compulsory Labour", 
  sectionOrder = 13
 }) => {
  const content = useSelector(
    (state) => state.screen13Slice.forced_labor_position
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setForcedLaborPosition(
        `We are committed to eradicating forced or compulsory labor from our operations and supply chain. We conduct regular audits and assessments to ensure compliance with our labor standards.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setForcedLaborPosition(e.target.value));
  };
  const [operationTableColumns] = useState([
    "Operations considered to have significant risk for incidents of forced or compulsory labor",
    "Type of Operation",
    "Countries or Geographic Areas",
  ]);

  const operationTableData = data["409_1a_analyse"]
    ? data["409_1a_analyse"][
        "operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor"
      ].length > 0
      ? data["409_1a_analyse"][
          "operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor"
        ].map((val, index) => {
          return {
            "Operations considered to have significant risk for incidents of forced or compulsory labor":
              val.childlabor,
            "Type of Operation": val.TypeofOperation,
            "Countries or Geographic Areas": val.geographicareas,
          };
        })
      : [
          {
            "Operations considered to have significant risk for incidents of forced or compulsory labor":
              "No data available",
            "Type of Operation": "No data available",
            "Countries or Geographic Areas": "No data available",
          },
        ]
    : [
        {
          "Operations considered to have significant risk for incidents of forced or compulsory labor":
            "No data available",
          "Type of Operation": "No data available",
          "Countries or Geographic Areas": "No data available",
        },
      ];

  const [supplierTableColumns] = useState([
    "Suppliers considered to have significant risk for incidents of forced or compulsory labor",
    "Type of Supplier",
    "Countries or Geographic Areas",
  ]);

  const supplierTableData = data["409_1a_analyse"]
    ? data["409_1a_analyse"][
        "suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor"
      ].length > 0
      ? data["409_1a_analyse"][
          "suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor"
        ].map((val, index) => {
          return {
            "Suppliers considered to have significant risk for incidents of forced or compulsory labor":
              val.compulsorylabor,
            "Type of Supplier": val.TypeofOperation,
            "Countries or Geographic Areas": val.geographicareas,
          };
        })
      : [
          {
            "Suppliers considered to have significant risk for incidents of forced or compulsory labor":
              "No data available",
            "Type of Supplier": "No data available",
            "Countries or Geographic Areas": "No data available",
          },
        ]
    : [
        {
          "Suppliers considered to have significant risk for incidents of forced or compulsory labor":
            "No data available",
          "Type of Supplier": "No data available",
          "Countries or Geographic Areas": "No data available",
        },
      ];

  return (
    <>
      <div id="section13_2_3" ref={section13_2_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {sectionNumber} {sectionTitle}
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s position on forced / compulsory labor
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

        {/* <p className="text-[15px]  mb-2 font-semibold">
          Measures taken by the organization
        </p>
        <p className="text-sm mb-4">
          {data["409-1b"]
            ? data["409-1b"].data
              ? data["409-1b"].data.length > 0
                ? data["409-1b"].data[0].Q1
                  ? data["409-1b"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p> */}

        <p className="text-[15px]  mb-2 font-semibold">
          Operations considered to have significant risk for incidents of forced
          or compulsary labor  
        </p>
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable
            columns={operationTableColumns}
            data={operationTableData}
          />
        </div>
        <p className="text-[15px]  mb-2 font-semibold">
          Suppliers at significant risk for incidents of forced or compulsory
          labor 
        </p>
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={supplierTableColumns} data={supplierTableData} />
        </div>
      </div>
    </>
  );
};

export default Section10;
