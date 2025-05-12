"use client";
import { React, useEffect, useState } from "react";
import Pagination from "./pagination";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import DeleteModal from "../stakeholderGroup/modals/deleteStakeholderGroup";
import EditStakeholderGroup from "../stakeholderGroup/modals/editStakeholderGroup";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { LuListFilter } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axiosInstance from "@/app/utils/axiosMiddleware";
import StakeholderPage from "../stakeholders/page";

const StakeholderTable = ({
  columns,
  currentData,
  totalItems,
  rowsPerPageOptions,
  onPageChange,
  refresh,
  setRefresh,
  selectedUsers,
  setselectedUsers,
  setStakeholderList,
  groupId,
  setGroupId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredRow2, setHoveredRow2] = useState(null);
  const [isFilterOpen,setIsFilterOpen]=useState(false)
  const [searchUser,setSearchUser]=useState("")
  const [uniqueUsers,setUniqueUsers]=useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); 
  };

  // Sorting function
  const sortedData = [...currentData].sort((a, b) => {
    if (!sortConfig.key) return 0; // No sorting applied initially

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "createdOn") {
      valA = parseDate(valA);
      valB = parseDate(valB);
    } else if (sortConfig.key === "noOfStakeholder") {
      valA = isNaN(Number(valA)) ? 0 : Number(valA);
      valB = isNaN(Number(valB)) ? 0 : Number(valB);
    }
    else if (sortConfig.key === "groupName") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Toggle sorting order
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <MdKeyboardArrowUp className="text-[14px]" />
      ) : (
        <MdKeyboardArrowDown className="text-[14px]" />
      );
    }
    return <FaSort className="text-gray-400 text-[14px]" />;
  };

  function capitalizeName(name) {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
}

const getUniqueUsers= async()=>{
  try {
    const response = await axiosInstance.get(`/supplier_assessment/stakeholder-group-unique-created-by/`);
    if (response.status === 200) {
      setUniqueUsers(response.data)
       
    }
} catch (error) {
    console.error("Error fetching stakeholder groups:", error);
}
}

const handleUserSelection = (userId) => {
  setselectedUsers(prev => {
    if (prev.includes(userId)) {
      return prev.filter(id => id !== userId);
    }
    return [...prev, userId];
  });
};

useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".filter-dropdown")) {
          setIsFilterOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


useEffect(()=>{
  getUniqueUsers()
},[refresh])



  return (
    <>
      <div className="overflow-x-auto table-scrollbar min-h-80">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              {columns &&
                columns.map((val, i) => (
                  <th
                    key={i}
                    className={`px-6 py-3 text-sm font-semibold text-gray-600 cursor-pointer 
                         ${i === 0 ? "min-w-[25px]" : "min-w-[132px]"} 
                      ${
                      columns.length - 1 === i ? "text-center" : "text-left"
                    }`}
                    onClick={() =>
                      val.key === "createdOn" || val.key === "noOfStakeholder" || val.key==="groupName"
                        ? requestSort(val.key)
                        : null
                    }
                  >
                    <div className="flex items-center">
                      {val.label}
                      {(val.key === "createdOn" || val.key==="groupName"||
                        val.key === "noOfStakeholder") && (
                        <span className="ml-1">{renderSortIcon(val.key)}</span>
                      )}
                      {
                        (
                          val.key ==="createdBy" && (
                            <LuListFilter
                                className="text-[15px] cursor-pointer mx-2"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                                          />
                          )
                        )
                      }
                      <div className="relative">
                      {isFilterOpen && val.key ==="createdBy" &&(
                              <div className="filter-dropdown absolute z-10 top-full  -left-20 mt-4 bg-white rounded-lg shadow-lg w-72 border border-gray-200">
                                <div className="p-4">
                                  <div className="flex gap-1">
                                    <CiFilter className="w-4 h-5 mt-0.5" />
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by User</h3>
                                  </div>
                                  
                                  
                                  {/* Search input */}
                                  <div className="relative mb-3">
                                    <input
                                      type="text"
                                      placeholder="Search users"
                                      className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md"
                                      value={searchUser}
                                      onChange={(e) => setSearchUser(e.target.value)}
                                    />
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                  </div>
                                  
                                  {/* user list */}
                                  <div className="space-y-2 max-h-30 overflow-y-auto table-scrollbar">
                                    {uniqueUsers
                                      .filter(user => 
                                        user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
                                        user.email.toLowerCase().includes(searchUser.toLowerCase())
                                      )
                                      .map((user,i) => (
                                        <label
                                          key={i}
                                          className="flex items-center gap-3 py-0.5 px-1 hover:bg-gray-50 rounded cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.email)}
                                            onChange={() => handleUserSelection(user.email)}
                                            className="w-4 h-4 text-blue-600 rounded border-gray-300"
                                          />
                                          <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold text-gray-900 truncate">
                                              {capitalizeName(user.name)}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate">
                                              {user.email}
                                            </div>
                                          </div>
                                        </label>
                                      ))
                                    }
                                  </div>
                                </div>
                              </div>
                            )}
                    
                      </div>
                      
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {sortedData &&
              sortedData.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.sno}
                  </td>
                  <td onClick={()=>{
                    setGroupId({
                      id:row.groupId,
                      name:row.groupName,
                      organization:row.organization,
                      corporate:row.corporate
                    })
                    setStakeholderList(true)
                  }} className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200 cursor-pointer">
                    {row.groupName}
                  </td>

                  {/* <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                  <p className="text-[#101828] font-semibold">{capitalizeName(row.createdBy_name)}</p>
                  {row.createdBy}
                  </td>

                   
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.createdOn}
                  </td> */}
                  <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200 cursor-pointer hover:underline">
                  <div className="relative">
                    <div
                      onMouseEnter={() => setHoveredRow2(idx)}
                      onMouseLeave={() => setHoveredRow2(null)}
                    >
                      <p className="font-semibold">
                      {capitalizeName(row.createdBy_name)}
                      </p>
                      {row.createdBy}

                      {hoveredRow2 === idx && (
                        <div className="absolute left-0 -top-16 bg-white shadow-md p-3 rounded-md border border-gray-300 z-10 whitespace-nowrap">
                          <p className="text-sm text-[#344054] font-semibold flex gap-2">
                            Created By:{" "}
                            <span className="font-normal">
                            {capitalizeName(row.createdBy_name)}
                            </span>
                          </p>
                          <p className="text-sm text-[#344054] font-semibold flex gap-2">
                            Last Edited By:{" "}
                            <span className="font-normal">
                            {capitalizeName(row.updateByName)}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                {/* Tooltip with unique state per row */}
                <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200 cursor-pointer hover:underline">
                  <div className="relative">
                    <div
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {row.createdOn}
                      {hoveredRow === idx && (
                        <div className="absolute left-0 -top-16 bg-white shadow-md p-3 rounded-md border border-gray-300 z-10 whitespace-nowrap">
                          <p className="text-sm text-[#344054] font-semibold flex gap-2">
                            Created On:{" "}
                            <span className="font-normal">
                            {row.createdOn}
                            </span>
                          </p>
                          <p className="text-sm text-[#344054] font-semibold flex gap-2">
                            Last Edited:{" "}
                            <span className="font-normal">
                            {row.updatedAt}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.type}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.organization}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {row.corporate.length > 0 ? row.corporate.join(", ") : ""}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 text-center">
                    {row.noOfStakeholder}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 cursor-pointer">
                    <div className="flex justify-center items-center">
                      <MdOutlineEdit
                        onClick={() => {
                          setEditData({
                            id: row.groupId,
                            groupName: row.groupName,
                            type: row.type,
                            selectBy:
                              row.corporate.length > 0
                                ? "Corporate"
                                : "Organization",
                            organization: row.organization,
                            organization_id: row.organization_id,
                            corporate_ids: row.corporate_ids,
                            corporate: row.corporate,
                            noOfStakeholder: row.noOfStakeholder,
                          });
                          setGroupId({
                            id:row.groupId,
                            name:row.groupName,
                            organization:row.organization,
                            corporate:row.corporate
                          })
                          setIsEditModalOpen(true);
                        }}
                        className="text-[20px] text-gray-500 mr-2 hover:bg-gray-100 hover:rounded-sm"
                      />
                      <MdOutlineDeleteOutline
                        onClick={() => {
                          setDeleteData({
                            id: row.groupId,
                            groupName: row.groupName,
                            createdBy: row.createdBy,
                            createdOn: row.createdOn,
                            type: row.type,
                            noOfStakeholder: row.noOfStakeholder,
                          });
                          setIsModalOpen(true);
                        }}
                        className="text-[20px] text-gray-500 hover:text-red-500"
                      />
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

      <DeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        deleteData={deleteData}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <EditStakeholderGroup
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        refresh={refresh}
        setRefresh={setRefresh}
        editData={editData}
        groupId={groupId}
        setStakeholderList={setStakeholderList}
      />

      
    </>
  );
};

export default StakeholderTable;
