"use client";
import {React,useState} from "react";
import Pagination from "./pagination";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import DeleteModal from "../stakeholderGroup/modals/deleteStakeholderGroup";
import EditStakeholderGroup from '../stakeholderGroup/modals/editStakeholderGroup'

const StakeholderTable = ({
  columns,
  currentData,
  totalItems,
  rowsPerPageOptions,
  onPageChange,
}) => {
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [isEditModalOpen,setIsEditModalOpen]=useState(false)
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              {columns &&
                columns.map((val,i) => (
                  <th className={`px-6 py-3  text-sm font-semibold text-gray-600 ${(columns.length-1)==i?'text-center':'text-left'}`}>
                    {val.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.sno}
                  </td>
                  <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200">
                    {row.groupName}
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.createdBy}
                  </td>

                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.createdOn}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.type}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.organization}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.corporate}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 text-center">
                    {row.noOfStakeholder}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 cursor-pointer flex justify-center items-center">
                    <MdOutlineEdit onClick={()=>{setIsEditModalOpen(true)}} className="text-[20px] text-gray-500 mr-2 hover:bg-gray-100 hover:rounded-sm"/>
                    <MdOutlineDeleteOutline onClick={()=>{setIsModalOpen(true)}} className="text-[20px] text-gray-500 hover:text-red-500" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalItems}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={onPageChange}
      />

<DeleteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
<EditStakeholderGroup isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
    </>
  );
};

export default StakeholderTable;
