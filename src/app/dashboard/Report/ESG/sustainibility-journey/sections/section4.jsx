"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSupplyChainSustainability } from "../../../../../../lib/redux/features/ESGSlice/screen10Slice";

const Section4 = ({ section10_3Ref,data }) => {
  const approach_to_supply_chain_sustainability = useSelector(
    (state) => state.screen10Slice.approach_to_supply_chain_sustainability
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setSupplyChainSustainability(
        `Our approach to supply chain sustainability focuses on ensuring that our suppliers adhere to high environmental and social standards. We engage with our suppliers through regular assessments, audits, and capacity-building programs to help them improve their sustainability performance.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setSupplyChainSustainability(e.target.value));
  };

  const col=[
    "Organisation/Corporation",
    "Percentage of new suppliers that were screened using environmental criteria"
  ]
  return (
    <>
      <div ref={section10_3Ref} id="section10_3">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          10.3 Supply Chain Sustainability
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s approach to supply chain
            sustainability
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
          value={approach_to_supply_chain_sustainability}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
       <p className="text-[15px] text-[#344054] mb-4 font-semibold">
       Percentage of new suppliers that were screened using environmental criteria:
        </p>
        <div
       style={{
        display: "block",
        overflowX: "auto",
        maxWidth: "100%",
        minWidth: "100%",
        width: "40vw",
        maxHeight:"450px"
      }}
      className="rounded-md table-scrollbar shadow-md mb-4">
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        <thead className="gradient-background">
            <tr>
                {col.map((item, idx) => (
                    <th
                        key={idx}
                        style={{ minWidth: "120px", textAlign: "left" }}
                        className={`text-[12px] border-r px-4 py-4 ${
                            idx === 0 ? 'rounded-tl-md' : '' // Top-left corner
                        } ${
                            idx === col.length - 1 ? 'rounded-tr-md' : '' // Top-right corner
                        } text-gray-500`}
                    >
                        <div className="flex ">
                            <p className="flex ">
                                {item}
                            </p>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
      {data['gri_308_1a'] && data['gri_308_1a']?.length > 0 ? (
        // Find the maximum length between the two arrays to determine how many rows we need
        Array.from(data['gri_308_1a']).map((val, index) => (
          <tr key={index} className="text-[13px]">
            <td className="border-t border-r border-gray-200 p-4 text-left">
              {val.org_or_corp}
            </td>
            <td className="border border-gray-200 p-4 text-left">
              {val.percentage}
            </td>
          </tr>
        ))
      ) : (
        <tr className="text-[13px]">
          <td className="border-t border-r border-gray-200 p-4 text-left">No data available</td>
          <td className="border border-gray-200 p-4 text-left">No data available</td>
        </tr>
      )}
    </tbody>
    </table>
</div>

      </div>
    </>
  );
};

export default Section4;
