"use client";
import { useState, useRef, useEffect } from "react";
import Table1 from "../tables/table1";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setFinancialassistanc } from "../../../../../../lib/redux/features/ESGSlice/screen11Slice";

const Section4 = ({ section11_1_3Ref, orgName }) => {
  const content = useSelector(
    (state) => state.screen11Slice.financial_assistance_from_government
  );
  const data = useSelector((state) => state.screen11Slice.getdata);
  const dispatch = useDispatch();
  const loadContent3 = () => {
    dispatch(
      setFinancialassistanc(
        `In ${data.year}, ${orgName} total monetary value of financial assistance received by the organization from any government during the reporting period, including: `
      )
    );
  };
  const handleChange = (e) => {
    dispatch(setFinancialassistanc(e.target.value));
  };
  const economicData = data?.["201_4ab"];
  const tableData = economicData
    ? [
        {
          label: "Tax relief and tax credits",
          value: economicData.tax_relief_and_tax_credits,
        },
        { label: "Subsidies", value: economicData.subsidies },
        {
          label:
            "Provide details of investment grants, research and development grants, and other relevant types of grant",
          value:
            economicData.provide_details_of_investment_grants_research_and_development_grants_and_other_relevant_types_of_grant,
        },
        { label: "Awards", value: economicData.awards },
        { label: "Royalty holidays", value: economicData.royalty_holidays },
        {
          label: "Financial assistance from Export Credit Agencies (ECAs)",
          value: economicData.financial_assistance_from_export_credit_agencies,
        },
        {
          label: "Financial incentives",
          value: economicData.financial_incentives,
        },
        {
          label:
            "Other financial benefits received or receivable from any government for any operation",
          value:
            economicData.other_financial_benefits_received_or_receivable_from_any_government_for_any_operation,
        },
      ]
    : [];

  return (
    <>
      <div id="section11_1_3" ref={section11_1_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.1.3 Financial Assistance Received from Government
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add introduction about financial assistance received from government
          </p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent3}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
        <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
          onChange={handleChange}
        />
        <div className="shadow-md rounded-md mb-4">
          {/* Conditionally render the table if tableData is available */}
          {tableData.length > 0 && (
            <Table1 values={tableData} currency={economicData.currency} />
          )}
        </div>
        <p className="text-[15px] mb-2 text-[#344054] font-semibold">
        Government’s presence in the shareholding structure
        </p>
        <p className="text-sm mb-4">
          {
            data['201_4c_government']?data['201_4c_government']?.length>0?data['201_4c_government'][0]?.Q1=="No"?"No":data['201_4c_government'][0]?.Q2 || "No data available":'No data available':'No data available'
          }
        </p>
      </div>
    </>
  );
};

export default Section4;
