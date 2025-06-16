"use client";
import { useState, useRef, useEffect } from "react";
import CustomerTable from "../table";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setProductInfo } from "../../../../../../lib/redux/features/ESGSlice/screen15Slice";

const Section5 = ({ section15_2Ref, data,
  sectionNumber = 15.2,
  sectionTitle = 'Product and Service Information and Labelling',
  sectionOrder = 15,
 }) => {
  const product_info_labelling = useSelector(
    (state) => state.screen15Slice.product_info_labelling
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setProductInfo(
        `Providing accurate and comprehensive information about our products is essential for informed customer decision-making. We adhere to stringent standards for product labelling and information disclosure.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setProductInfo(e.target.value));
  };
  const tableData = data["417_1b_analysis"]
    ? data["417_1b_analysis"].marketing_labeling
      ? data["417_1b_analysis"].marketing_labeling
      : []
    : [];
  return (
    <>
      <div id="setion15_2" ref={section15_2Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
         {sectionNumber} {sectionTitle}
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s product and service information and
            labelling
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
          value={product_info_labelling}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        <p className="text-[15px] mb-2 font-semibold">
          Product and Service Information and labeling
        </p>
        {data["417_1a"] ? (
          data["417_1a"].data ? (
            data["417_1a"].data.length > 0 ? (
              data["417_1a"].data[0].Q1 ? (
                data["417_1a"].data[0].Q1 == "No" ? (
                  <p className="text-sm mb-4">No</p>
                ) : (
                  <div>
                    <p className="text-[15px] mb-2 font-semibold">
                      Source of Components
                    </p>
                    <p className="text-sm mb-2">
                      {data["417_1a"].data[0].Q2
                        ? data["417_1a"].data[0].Q2
                        : "No data available"}
                    </p>
                    <p className="text-[15px] mb-2 font-semibold">
                      Substances that might produce an environmental or social
                      impact
                    </p>
                    <p className="text-sm mb-2">
                      {data["417_1a"].data[0].Q3
                        ? data["417_1a"].data[0].Q3
                        : "No data available"}
                    </p>
                    <p className="text-[15px] mb-2 font-semibold">
                      Safe use of the product or service
                    </p>
                    <p className="text-sm mb-2">
                      {data["417_1a"].data[0].Q4
                        ? data["417_1a"].data[0].Q4
                        : "No data available"}
                    </p>
                    <p className="text-[15px] mb-2 font-semibold">
                      Disposal of the product
                    </p>
                    <p className="text-sm mb-4">
                      {data["417_1a"].data[0].Q5
                        ? data["417_1a"].data[0].Q5
                        : "No data available"}
                    </p>
                  </div>
                )
              ) : (
                "No data available"
              )
            ) : (
              "No data available"
            )
          ) : (
            "No data available"
          )
        ) : (
          "No data available"
        )}

        <div className="mb-4 rounded-md shadow-md">
          <CustomerTable data={tableData} />
        </div>
      </div>
    </>
  );
};

export default Section5;
