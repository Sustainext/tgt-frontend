import { useState, useRef, useEffect } from "react";
import Table1 from "../tables/table1";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setIntroductionto } from "../../../../../../lib/redux/features/ESGSlice/screen11Slice";

const Section3 = ({ section11_1_2Ref, orgName,reportType }) => {
  const content = useSelector(
    (state) => state.screen11Slice.introduction_to_economic_value_creation
  );
  const data = useSelector((state) => state.screen11Slice.getdata);
  const dispatch = useDispatch();

  const loadContents = () => {
    dispatch(
      setIntroductionto(
        `In ${data.year}, ${orgName} generated substantial economic value through our operations, creating benefits for shareholders, employees, suppliers, and communities. Key highlights include`
      )
    );
  };

  const handleChange = (e) => {
    dispatch(setIntroductionto(e.target.value));
  };

  // Safely accessing the nested data from "201_1ab"
  const economicData = data?.["201_1ab"]; // Optional chaining to prevent errors

  const tableData = economicData
    ? [
        {
          label: "1) Direct Economic value generated (Revenues)",
          value: economicData.revenues ? economicData.revenues : "",
        },
        {
          label: "2) Economic Value distributed",
          value: economicData.economic_value_distributed_1
            ? economicData.economic_value_distributed_1
            : "",
        },
        {
          label: "i) Operating costs",
          value: economicData.operating_costs
            ? economicData.operating_costs
            : "",
        },
        {
          label: "ii) Employee wages & benefits",
          value: economicData.employee_wages_benefits
            ? economicData.employee_wages_benefits
            : "",
        },
        {
          label: "iii) Payments to providers of capital",
          value: economicData.payments_to_providers_of_capital
            ? economicData.payments_to_providers_of_capital
            : "",
        },
        {
          label: "iv) Payments to governments by country",
          value: Array.isArray(economicData.payments_to_governments_by_country)
            ? ""
            : economicData.payments_to_governments_by_country || "",
        },
        ...(Array.isArray(economicData.payments_to_governments_by_country)
          ? [
              {
                label: "Country Name",
                value: "Payments to governments by country",
              },
              ...economicData.payments_to_governments_by_country.map(
                (country) => ({
                  label: `      ${country.country}`,
                  value: country.paymentCode,
                })
              ),
            ]
          : []),
        {
          label: "v) Community investments",
          value: economicData.countries_and_payments
            ? Array.isArray(economicData.countries_and_payments)
              ? ""
              : economicData.countries_and_payments
            : "",
        },
        {
          label: "3) Economic value retained",
          value: economicData.community_investments
            ? economicData.community_investments
            : "",
        },
      ]
    : [];

  return (
    <>
      <div id="section11_1_2" ref={section11_1_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        {reportType=='GRI Report: In accordance With'?'11.1.2':'11.1.1'}  Economic Value Creation
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add introduction for company’s economic value creation
          </p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContents}
          >
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
        <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4`}
          rows={4}
          onChange={handleChange}
        />
        <div className="shadow-md rounded-md mb-4">
          {/* Conditionally render the table if tableData is available */}
          {tableData.length > 0 && (
            <Table1 values={tableData} currency={economicData.currency} />
          )}
        </div>

        <p className="text-sm mb-4">
          {
            data['201_1a_data']?data['201_1a_data']?.length>0?data['201_1a_data'][0]?.Q1 || "No data available":'No data available':'No data available'
          }
        </p>
      </div>
    </>
  );
};

export default Section3;
