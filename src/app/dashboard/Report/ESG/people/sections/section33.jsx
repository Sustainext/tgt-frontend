"use client";
import { useState, useRef, useEffect } from "react";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setIndigenousRightsPolicy } from "../../../../../../lib/redux/features/ESGSlice/screen13Slice";

const Section33 = ({ section13_8_2Ref, orgName, data }) => {
  const content = useSelector(
    (state) => state.screen13Slice.indigenous_rights_policy
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setIndigenousRightsPolicy(
        `At ${
          orgName ? orgName : "[Company name]"
        }, we are dedicated to supporting our people, ensuring their well-being, and promoting a positive and inclusive workplace culture. We believe that our commitment to our employees is key to our long-term success and sustainability.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setIndigenousRightsPolicy(e.target.value));
  };

  return (
    <>
      {/* <div id="section13_8_2" ref={section13_8_2Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          13.8.2 Incidents of Violation of Rights of Indigenous People
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s policy on violation of rights of
            indigenous people
          </p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
           
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
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Status of the incidents and actions taken
        </p>
        <p className="text-sm mb-2">
          {data["411_1b"]
            ? data["411_1b"].data
              ? data["411_1b"].data.length > 0
                ? data["411_1b"].data[0].Q1
                  ? data["411_1b"].data[0].Q1
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["411_1b"]
            ? data["411_1b"].data
              ? data["411_1b"].data.length > 0
                ? data["411_1b"].data[0].Q2
                  ? data["411_1b"].data[0].Q2
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-2">
          {data["411_1b"]
            ? data["411_1b"].data
              ? data["411_1b"].data.length > 0
                ? data["411_1b"].data[0].Q3
                  ? data["411_1b"].data[0].Q3
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-sm mb-4">
          {data["411_1b"]
            ? data["411_1b"].data
              ? data["411_1b"].data.length > 0
                ? data["411_1b"].data[0].Q4
                  ? data["411_1b"].data[0].Q4
                  : "No data available"
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Total number of incident violations involving the rights of indigenous
          peoples
        </p>
        {data["411_1a"] ? (
          data["411_1a"].data ? (
            data["411_1a"].data.length > 0 ? (
              data["411_1a"].data[0].Q1 ? (
                data["411_1a"].data[0].Q1 == "Yes" ? (
                  <div>
                    <p className="text-sm mb-4">
                      {data["411_1a"].data[0].Q2
                        ? data["411_1a"].data[0].Q2
                        : "No data available"}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )
              ) : (
                <p className="text-sm">No data available</p>
              )
            ) : (
              <p className="text-sm">No data available</p>
            )
          ) : (
            <p className="text-sm">No data available</p>
          )
        ) : (
          <p className="text-sm">No data available</p>
        )}
      </div> */}
    </>
  );
};

export default Section33;
