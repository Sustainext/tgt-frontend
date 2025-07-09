"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../../people/tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setReclamationRecyclingProcess } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const Section13 = ({ section12_2_3Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.2.3':'12.2.2',
  sectionTitle = 'Reclaimed Products and Their Packaging Materials',
  sectionOrder = 12,
 }) => {
  const content = useSelector(
    (state) => state.screen12Slice.reclamation_recycling_process
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setReclamationRecyclingProcess(
        `We actively promote the reclamation and recycling of our products and packaging materials. Our take-back programs and recycling initiatives help to ensure that materials are reused and diverted from landfills.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setReclamationRecyclingProcess(e.target.value));
  };

  const col = [
    "Type of Product",
    "Product Code",
    "Product Name",
    "Percentage of reclaimed products and their packaging materials (%)",
  ];

  const Tabledata = data["material_analyse"]
    ? data["material_analyse"]["reclaimed_materials"].length > 0
      ? data["material_analyse"]["reclaimed_materials"].map((val, index) => {
          return {
            "Type of Product": val.type_of_product,
            "Product Code": val.product_code,
            "Product Name": val.product_name,
            "Percentage of reclaimed products and their packaging materials (%)":
              val.total_quantity + "%",
          };
        })
      : [
          {
            "Type of Product": "No data available",
            "Product Code": "No data available",
            "Product Name": "No data available",
            "Percentage of reclaimed products and their packaging materials (%)":
              "No data available",
          },
        ]
    : [
        {
          "Type of Product": "No data available",
          "Product Code": "No data available",
          "Product Name": "No data available",
          "Percentage of reclaimed products and their packaging materials (%)":
            "No data available",
        },
      ];

  return (
    <>
      <div id="section12_2_3" ref={section12_2_3Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
       {sectionNumber} {sectionTitle}
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s reclamation and recycling process
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
            Non-Renewable materials used
        </p> */}
        <div className="shadow-md rounded-md mb-4">
          <LeaveTable columns={col} data={Tabledata} />
        </div>
        <p className="text-[15px]  mb-2 font-semibold">
        Packaging material 
        </p>
        <p className="text-sm mb-4">
  {
    data['301_3a_3b'] 
      ? data['301_3a_3b']?.length > 0 
        ? data['301_3a_3b'].map(val => val.Datacollectionmethod).join(', ')
        : 'No data available'
      : 'No data available'
  }
</p>
      </div>
    </>
  );
};

export default Section13;
