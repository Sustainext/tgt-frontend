"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import DeletePopup from "../modals/deletePopup";
import { useRouter } from 'next/navigation'

const DataTable = ({ data }) => {
  const router = useRouter()
  const [loopen, setLoOpen] = useState(false);
  const [deleteModalOpen,setDeleteModalOpen]=useState(false)
  const [deleteData,setDeleteData]=useState({})
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
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };


  return (
    <>
      <div className="mb-2 h-auto">
        <table className="rounded-md  w-full">
          <thead className="gradient-background">
            <tr>
              {Col.map((item, idx) => (
                <th
                  key={idx}
                  className="text-[12px] px-3 py-3 w-auto text-left"
                >
                  <div className="flex">
                    <p className="w-[80%] text-gray-500 ">{item}</p>
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
                } text-[13px]`}
              >
                <td className="p-3 text-left">{item.organization}</td>
                <td className="p-3 text-left">{item.corporate}</td>
                <td className="p-3 text-left">{item.type}</td>
                <td className="p-3 text-center">
                  <div>{item.timePeriod.split(" to ")[0]}</div>
                  <div className="text-gray-600">to</div>
                  <div>{item.timePeriod.split(" to ")[1]}</div>
                </td>
                <td className="p-3 text-left">
                  {item.enviromentTopics.length > 0
                    ? item.enviromentTopics.map((topic, index) => (
                        <div className="mb-2" key={index}>
                          {topic}
                        </div>
                      ))
                    : "Not Selected"}
                </td>
                <td className="p-3 text-left">
                  {item.socialTopics.length > 0
                    ? item.socialTopics.map((topic, index) => (
                        <div className="mb-2" key={index}>
                          {topic}
                        </div>
                      ))
                    : "Not Selected"}
                </td>
                <td className="p-3 text-left">
                  {item.governanceTopics.length > 0
                    ? item.governanceTopics.map((topic, index) => (
                        <div className="mb-2" key={index}>
                          {topic}
                        </div>
                      ))
                    : "Not Selected"}
                </td>
                <td className="p-3 text-left">
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-3 h-3 mr-2 rounded-full ${
                        item.status === "InProgress"
                          ? "bg-yellow-500"
                          : item.status === "Completed"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    ></span>
                    {item.status}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 cursor-pointer">
                    {
                        item.status=="Outdated"?(
                            <div className="w-[20%]"></div>
                        ):(
                            <MdOutlineEdit className="text-[18px] text-gray-500" onClick={()=>{
                                if(item.type=="GRI: In Accordance to"){
                                    router.push('Materiality/accordance')
                                }
                                else if ((item.type=="GRI: with Reference to")){
                                    router.push('Materiality/reference')
                                }
                            }} />
                        )   
                    }
                    
                    <MdOutlineDeleteOutline className="text-[18px] text-gray-500" onClick={()=>{
                        setDeleteData({
                            organization:item.organization,
                            corporate:item.corporate,
                            type:item.type,
                            period:item.timePeriod
                        })
                        setDeleteModalOpen(true)
                    }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeletePopup isModalOpen={deleteModalOpen} setIsModalOpen={setDeleteModalOpen} deleteData={deleteData} />
    </>
  );
};

export default DataTable;
