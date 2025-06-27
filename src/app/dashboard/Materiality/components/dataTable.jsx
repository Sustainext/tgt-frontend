"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import DeletePopup from "../modals/deletePopup";
import { useRouter } from "next/navigation";
import DropdownList from "./dropdownlist";
const DataTable = ({ data, setRefresh, refresh }) => {
  const router = useRouter();
  const [loopen, setLoOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const toastShown = useRef(false);
  const Col = [
    "Organization",
    "Corporate",
    "Type",
    "Time Period",
    "Environment Topics",
    "Social Topics",
    "Governance Topics",
    "Status",
    "Action",
  ];
  const mobCol = [
    "Organization",
    "Corporate",
    "Type",
    "Time Period",
  "ESG Topics",
    "Status",
    "Action",
  ];
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  // const stickyColumns = ["Organization", "Corporate"];
  return (
    <>
      <div className="mb-2 h-auto overflow-x-auto custom-scrollbar hidden xl:block md:block lg:block 4k:block 2k:block">
        <table className="min-w-[1000px] w-full rounded-md ">
          <thead className="gradient-background">
            <tr>
              {Col.map((item, idx) => (
                <th
                  key={idx}
                  className="text-[12px] px-3 py-3 w-auto text-left"
                >
                  <div className="flex">
                    <p className=" text-gray-500 ">{item}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex >= data.length - 1 ? "" : "border-b"
                } text-[13px] align-top`}
              >
                <td className="p-3 text-left align-top">{item.organization}</td>
                <td className="p-3 text-left align-top">{item.corporate}</td>
                <td className="p-3 text-left align-top">{item.type}</td>
                <td className="p-3 text-left align-top">{item.timePeriod}</td>
                <td className="p-3 text-left align-top">
                  <div className="hidden md:block">
                    {item.enviromentTopics.length > 0
                      ? item.enviromentTopics.map((topic, index) => (
                          <div className="mb-2.5" key={index}>
                            {topic}
                          </div>
                        ))
                      : "Not Selected"}
                  </div>
          
                </td>
                <td className="p-3 text-left align-top">
                  <div className="hidden md:block">
                    {item.socialTopics.length > 0
                      ? item.socialTopics.map((topic, index) => (
                          <div className="mb-2.5" key={index}>
                            {topic}
                          </div>
                        ))
                      : "Not Selected"}
                  </div>
              
                </td>
                <td className="p-3 text-left align-top">
                  <div className="hidden md:block">
                    {item.governanceTopics.length > 0
                      ? item.governanceTopics.map((topic, index) => (
                          <div className="mb-2.5" key={index}>
                            {topic}
                          </div>
                        ))
                      : "Not Selected"}
                  </div>
              
                </td>
                <td className="p-3 text-left align-top">
                  <div className="flex items-start">
                    <span
                      className={`inline-block w-3 h-3 mr-2 rounded-full ${
                        item.status === "In_progress"
                          ? "bg-yellow-500"
                          : item.status === "Completed"
                          ? "bg-green-800"
                          : "bg-gray-300"
                      }`}
                    ></span>
                    <span className="leading-none self-start">
                      {item.status}
                    </span>
                  </div>
                </td>
                <td className="p-3 align-top">
                  <div className="flex gap-2 cursor-pointer">
                    {item.status == "Outdated" ? (
                      <div className="w-[20%]"></div>
                    ) : (
                      <div className="w-[20%]">
                        <MdOutlineEdit
                          className="text-[18px] text-gray-500"
                          onClick={() => {
                            if (item.type == "GRI: In accordance with") {
                              localStorage.setItem("id", item.id);
                              router.push("Materiality/accordance");
                            } else if (item.type == "GRI: With reference to") {
                              localStorage.setItem("id", item.id);
                              router.push("Materiality/reference");
                            }
                          }}
                        />
                      </div>
                    )}

                    <div className="w-[20%]">
                      <MdOutlineDeleteOutline
                        className="text-[18px] text-gray-500"
                        onClick={() => {
                          setDeleteData({
                            id: item.id,
                            organization: item.organization,
                            corporate: item.corporate,
                            type: item.type,
                            period: item.timePeriod,
                          });
                          setDeleteModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      
      </div>
      <div className="mb-2 h-auto overflow-x-auto custom-scrollbar block xl:hidden md:hidden lg:hidden 4k:hidden 2k:hidden">
        <table className="min-w-[1000px] w-full rounded-md">
          <thead className="gradient-background">
            <tr>
            {mobCol.map((item, idx) => (
  <th
    key={idx}
    className="text-[12px] px-3 py-3 w-auto text-center"
  >
    <div
      className={`flex  ${
        item === "ESG Topics" ? "justify-center mr-1" : ""
      }`}
    >
      <p className="text-gray-500">{item}</p>
    </div>
  </th>
))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex >= data.length - 1 ? "" : "border-b"
                } text-[13px] align-top`}
              >
                <td className="p-3 text-left align-top">{item.organization}</td>
                <td className="p-3 text-left align-top">{item.corporate}</td>
                <td className="p-3 text-left align-top">{item.type}</td>
                <td className="p-3 text-left align-top">{item.timePeriod}</td>
                <td className="p-3 text-center align-top">
                <DropdownList
                        title="Governance Topics"
                        item={item}
                        
                      />
                  </td>
             
                <td className="p-3 text-left align-top">
                  <div className="flex items-start">
                    <span
                      className={`inline-block w-3 h-3 mr-2 rounded-full ${
                        item.status === "In_progress"
                          ? "bg-yellow-500"
                          : item.status === "Completed"
                          ? "bg-green-800"
                          : "bg-gray-300"
                      }`}
                    ></span>
                    <span className="leading-none self-start">
                      {item.status}
                    </span>
                  </div>
                </td>
                <td className="p-3 align-top">
                  <div className="flex gap-2 cursor-pointer">
                    {item.status == "Outdated" ? (
                      <div className="w-[20%]"></div>
                    ) : (
                      <div className="w-[20%]">
                        <MdOutlineEdit
                          className="text-[18px] text-gray-500"
                          onClick={() => {
                            if (item.type == "GRI: In accordance with") {
                              localStorage.setItem("id", item.id);
                              router.push("Materiality/accordance");
                            } else if (item.type == "GRI: With reference to") {
                              localStorage.setItem("id", item.id);
                              router.push("Materiality/reference");
                            }
                          }}
                        />
                      </div>
                    )}

                    <div className="w-[20%]">
                      <MdOutlineDeleteOutline
                        className="text-[18px] text-gray-500"
                        onClick={() => {
                          setDeleteData({
                            id: item.id,
                            organization: item.organization,
                            corporate: item.corporate,
                            type: item.type,
                            period: item.timePeriod,
                          });
                          setDeleteModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      
      </div>
      <DeletePopup
        setRefresh={setRefresh}
        refresh={refresh}
        isModalOpen={deleteModalOpen}
        setIsModalOpen={setDeleteModalOpen}
        deleteData={deleteData}
      />
    </>
  );
};

export default DataTable;
