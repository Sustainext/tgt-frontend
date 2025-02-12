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
  refresh,
  setRefresh
}) => {
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [isEditModalOpen,setIsEditModalOpen]=useState(false)
    const [deleteData,setDeleteData]=useState({})
    const [editData,setEditData]=useState({})
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
                    {row.corporate.length>0?row.corporate.join(", "):''}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 text-center">
                    {row.noOfStakeholder}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 cursor-pointer">
                    <div className="flex justify-center items-center">
                    <MdOutlineEdit onClick={()=>{
                       setEditData({
                        id:row.groupId,
                        groupName:row.groupName,
                        type:row.type,
                        selectBy:row.corporate.length>0?"Corporate":"Organization",
                        organization: row.organization,
                        organization_id:row.organization_id,
                        corporate_ids:row.corporate_ids,
                        corporate:row.corporate,
                        noOfStakeholder:row.noOfStakeholder
                      })
                      setIsEditModalOpen(true)
                      }} className="text-[20px] text-gray-500 mr-2 hover:bg-gray-100 hover:rounded-sm"/>
                    <MdOutlineDeleteOutline onClick={()=>{
                      setDeleteData({
                        id:row.groupId,
                        groupName:row.groupName,
                        createdBy:row.createdBy,
                        createdOn:row.createdOn,
                        type:row.type,
                        noOfStakeholder:row.noOfStakeholder
                      })
                      setIsModalOpen(true)

                    }} className="text-[20px] text-gray-500 hover:text-red-500" />
                    </div>
                    
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

<DeleteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} deleteData={deleteData} refresh={refresh} setRefresh={setRefresh} />
<EditStakeholderGroup isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} refresh={refresh} setRefresh={setRefresh} editData={editData} />

   </>
  );
};

export default StakeholderTable;
