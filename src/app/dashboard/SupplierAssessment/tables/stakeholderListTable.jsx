"use client";
import { React, useEffect, useState } from "react";
import Pagination from "./pagination";
import { MdOutlineEdit, MdOutlineDeleteOutline, MdCheck, MdClose,MdOutlineSave } from "react-icons/md";
import DeleteModal from "../stakeholders/modals/deleteStakeholder";
import { IoMdDownload } from "react-icons/io";

const StakeholderListTable = ({
  columns,
  currentData,
  totalItems,
  rowsPerPageOptions,
  onPageChange,
  setDeleteDisabled,
  deleteDisabled,
  selectedRows,
  setSelectedRows
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  // Select/Deselect all checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentData.map((row) => row.sno));
    } else {
      setSelectedRows([]);
    }
  };

  // Select/Deselect individual checkbox
  const handleSelectRow = (sno) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(sno) ? prevSelected.filter((id) => id !== sno) : [...prevSelected, sno]
    );
  };

  useEffect(()=>{
    if(selectedRows.length>0){
        setDeleteDisabled(false)
    }
    else{
        setDeleteDisabled(true)
    }
  },[selectedRows])

  // Handle Edit button click
  const handleEdit = (row) => {
    setEditRow(row.sno);
    setEditedData(row);
  };

  // Handle Save after editing
  const handleSave = () => {
    // Here you would typically send `editedData` to your backend or update state
    setEditRow(null);
  };

  // Handle Cancel editing
  const handleCancel = () => {
    setEditRow(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === currentData.length}
                  className="cursor-pointer accent-green-600"
                />
              </th>
              {columns.map((col, i) => (
                <th key={i} className={`px-6 py-3 text-sm font-semibold text-gray-600 ${i === columns.length - 1 ? "text-center" : "text-left"}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
                <>
                    <tr key={idx} className="bg-white">
                <td className="px-4 py-3 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.sno)}
                    onChange={() => handleSelectRow(row.sno)}
                    className="cursor-pointer accent-green-600"
                  />
                </td>
                <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {row.sno}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {editRow === row.sno ? (
                    <input
                      type="text"
                      value={editedData.stakeholderName}
                      onChange={(e) => setEditedData({ ...editedData, stakeholderName: e.target.value })}
                     className="border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none px-2 py-1 w-full"
                    />
                  ) : (
                    row.stakeholderName
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {editRow === row.sno ? (
                    <input
                      type="text"
                      value={editedData.email}
                      onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                       className="border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none px-2 py-1 w-full"
                    />
                  ) : (
                    row.email
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {editRow === row.sno ? (
                    <input
                      type="text"
                      value={editedData.location}
                      onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                      className="border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none px-2 py-1 w-full"
                    />
                  ) : (
                    row.location
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                  {editRow === row.sno ? (
                    <input
                      type="text"
                      value={editedData.spoc}
                      onChange={(e) => setEditedData({ ...editedData, spoc: e.target.value })}
                       className="border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none px-2 py-1 w-full"
                    />
                  ) : (
                    row.spoc
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200">
                  {row.created_last_editedBy}
                </td>
                <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200">
                  {row.created_last_editedOn}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 cursor-pointer">
                    <div className="flex justify-center items-center">
                    {editRow === row.sno ? (
                    <>
                      <MdOutlineSave
                        onClick={handleSave}
                        className="text-[20px] text-gray-500 mr-2 cursor-pointer hover:text-blue-400 hover:rounded-sm"
                      />
                      <MdClose
                        onClick={handleCancel}
                        className="text-[20px] text-gray-500 cursor-pointer hover:bg-gray-100 hover:rounded-sm"
                      />
                    </>
                  ) : (
                    <>
                      <MdOutlineEdit
                        onClick={() => handleEdit(row)}
                        className="text-[20px] text-gray-500 mr-2 cursor-pointer hover:bg-gray-100 hover:rounded-sm"
                      />
                      <button disabled={!deleteDisabled}>
                      <MdOutlineDeleteOutline
                      
                        onClick={() => setIsModalOpen(true)}
                        className={`text-[20px] text-gray-500 ${
                            !deleteDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:text-red-500"
                        }`}
                      />
                      </button>
                     
                    </>
                  )}
                    </div>
                  
                </td>
              </tr>
              <DeleteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedRows={selectedRows.length>0?selectedRows.length:row.stakeholderName} />
              
                </>
              
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalItems}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={onPageChange}
      />
 <button className="text-[15px] text-[#007EEF] font-semibold flex justify-end w-full">
        Export List <IoMdDownload className=" mt-0.5 ml-1 w-5 h-5"/>
      </button>
     

      
    </>
  );
};

export default StakeholderListTable;
