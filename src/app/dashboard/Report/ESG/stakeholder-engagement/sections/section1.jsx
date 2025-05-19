"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import StakeholderTable from "../table";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setdescription } from "../../../../../../lib/redux/features/ESGSlice/screen6Slice";

const Section1 = ({ orgName, data }) => {
  const description = useSelector((state) => state.screen6Slice.description);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setdescription(
        `Effective stakeholder engagement is vital to ${
          orgName ? orgName : "[Company Name]'s"
        } sustainability strategy and overall business success. We recognize that our actions impact a wide range of stakeholders, including employees, customers, suppliers, investors, local communities, and regulatory bodies`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setdescription(e.target.value));
  };

  const IdCol=[
    "What are the categories of stakeholders organisation engages with",
    "How the stakeholders are identified"
  ]
  const EngCol=[
    "What are the categories of stakeholders organisation engages with",
    "Describe the purpose of stakeholder engagement"
  ]

  return (
    <>
      <div>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about stakeholder engagement
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
          value={description}
          onChange={handleEditorChange}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          6.1 Approach to Stakeholder Engagement
        </h3>

        <div className="text-sm mb-6">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Identification and Prioritization 
            </li>
            {/* <p className="mb-4">
              {data["Stakeholdersidentified"]
                ? data["Stakeholdersidentified"]
                : "No data available"}
            </p> */}
            {/* table */}
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
                {IdCol.map((item, idx) => (
                    <th
                        key={idx}
                        style={{ minWidth: "120px", textAlign: "left" }}
                        className={`text-[12px] border-r px-4 py-4 ${
                            idx === 0 ? 'rounded-tl-md' : '' // Top-left corner
                        } ${
                            idx === IdCol.length - 1 ? 'rounded-tr-md' : '' // Top-right corner
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
      {data?.Organisationengages?.length > 0 || data?.Stakeholdersidentified?.length > 0 ? (
        // Find the maximum length between the two arrays to determine how many rows we need
        Array.from({ 
          length: Math.max(
            data.Organisationengages?.length || 0, 
            data.Stakeholdersidentified?.length || 0
          ) 
        }).map((_, index) => (
          <tr key={index} className="text-[13px]">
            <td className="border-t border-r border-gray-200 p-4 text-left">
              {data.Organisationengages?.[index] || '-'}
            </td>
            <td className="border border-gray-200 p-4 text-left">
              {data.Stakeholdersidentified?.[index] || '-'}
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
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Stakeholder Categories 
            </li>
            <p className="mb-2">
              {data["Organisationengages"]
                ? data["Organisationengages"].length>0?data["Organisationengages"].join(", ")
                : "No data available":"No data available"}
            </p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Engagement with stakeholders
            </li>
            {/* <p className="mb-4">
              {data["Stakeholderengagement"]
                ? data["Stakeholderengagement"]
                : "No data available"}
            </p> */}
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
                {EngCol.map((item, idx) => (
                    <th
                        key={idx}
                        style={{ minWidth: "120px", textAlign: "left" }}
                        className={`text-[12px] border-r px-4 py-4 ${
                            idx === 0 ? 'rounded-tl-md' : '' // Top-left corner
                        } ${
                            idx === IdCol.length - 1 ? 'rounded-tr-md' : '' // Top-right corner
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
      {data?.Organisationengages?.length > 0 || data?.Stakeholderengagement?.length > 0 ? (
        // Find the maximum length between the two arrays to determine how many rows we need
        Array.from({ 
          length: Math.max(
            data.Organisationengages?.length || 0, 
            data.Stakeholderengagement?.length || 0
          ) 
        }).map((_, index) => (
          <tr key={index} className="text-[13px]">
            <td className="border-t border-r border-gray-200 p-4 text-left">
              {data.Organisationengages?.[index] || '-'}
            </td>
            <td className="border border-gray-200 p-4 text-left">
              {data.Stakeholderengagement?.[index] || '-'}
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
<li className="text-[15px] text-[#344054] mb-2 font-semibold">
Approach to Stakeholder engagement.
            </li>

          <div className="shadow-md rounded-md">
            <StakeholderTable
              tableData={
                data.approach_to_stakeholder_engagement
                  ? data.approach_to_stakeholder_engagement
                  : []
              }
            />
          </div>
          </ul>
        </div>

        

        <div className="text-sm mb-4">
          <ul className="list-disc ml-4">
            {/* <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              We employ a variety of engagement methods tailored to the needs
              and preferences of different stakeholder groups.
            </li> */}
           
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Stakeholder’s Feedback
            </li>
            <p className="mb-2">
              {data["stakeholder_feedback"]
                ? data["stakeholder_feedback"]
                : "No data available"}
            </p>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Section1;
