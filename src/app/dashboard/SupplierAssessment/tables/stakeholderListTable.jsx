"use client";
import { React, useEffect, useState } from "react";
import Pagination from "./pagination";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdOutlineEdit,
  MdOutlineDeleteOutline,
  MdCheck,
  MdClose,
  MdOutlineSave,
} from "react-icons/md";
import DeleteModal from "../stakeholders/modals/deleteStakeholder";
import { IoMdDownload } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { LuListFilter } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axiosInstance from "../../../utils/axiosMiddleware";
 

const StakeholderListTable = ({
  columns,
  currentData,
  totalItems,
  rowsPerPageOptions,
  onPageChange,
  setDeleteDisabled,
  deleteDisabled,
  selectedRows,
  setSelectedRows,
  setRefresh,
  selectedUsers,
  setselectedUsers,
  refresh,
  groupId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [deleteData, setdeleteData] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredRow2, setHoveredRow2] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [loopen, setLoOpen] = useState(false);

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  // Sorting function
  const sortedData = [...currentData].sort((a, b) => {
    if (!sortConfig.key) return 0; // No sorting applied initially

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "created_last_editedOn") {
      valA = parseDate(valA[0]);
      valB = parseDate(valB[0]);
    } else if (sortConfig.key === "stakeholderName") {
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

  const getUniqueUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/supplier_assessment/stakeholder/historical-users/`
      );
      if (response.status === 200) {
        setUniqueUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching stakeholder groups:", error);
    }
  };

  const handleUserSelection = (userId) => {
    setselectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
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

  useEffect(() => {
    getUniqueUsers();
  }, [refresh]);

  // Select/Deselect all checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(sortedData.map((row) => row.sno));
    } else {
      setSelectedRows([]);
    }
  };

  // Select/Deselect individual checkbox
  const handleSelectRow = (sno) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(sno)
        ? prevSelected.filter((id) => id !== sno)
        : [...prevSelected, sno]
    );
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      setDeleteDisabled(false);
    } else {
      setDeleteDisabled(true);
    }
  }, [selectedRows]);

  // Handle Edit button click
  const handleEdit = (row) => {
    setEditRow(row.sno);
    setEditedData(row);
  };


  // Handle Cancel editing
  const handleCancel = () => {
    setEditRow(null);
  };

  const handleSubmit = async () => {
    LoaderOpen();
    try {
      const data = {
        name:editedData.stakeholderName,
        email:editedData.email,
        city:editedData.location,
        poc:editedData.spoc,
        group:groupId.id
      };
      const url = `${process.env.BACKEND_API_URL}/supplier_assessment/stakeholder/${editedData.id}/`;
      if (editedData.id) {
        const response = await axiosInstance.patch(url, data);
        if (response.status === 200) {
          LoaderClose();
          toast.success(
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div className="mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M10 0.364746C15.5228 0.364746 20 4.8419 20 10.3647C20 15.8876 15.5228 20.3647 10 20.3647C4.47715 20.3647 0 15.8876 0 10.3647C0 4.8419 4.47715 0.364746 10 0.364746ZM14.198 7.4228C13.9811 7.20585 13.6443 7.18174 13.4007 7.35048L13.3141 7.4228L8.75 11.9872L6.69194 9.92889L6.60538 9.85657C6.3618 9.68783 6.02502 9.71193 5.80806 9.92889C5.5911 10.1458 5.56699 10.4826 5.73574 10.7262L5.80806 10.8128L8.30806 13.3128L8.39462 13.3851C8.60775 13.5327 8.89225 13.5327 9.10538 13.3851L9.19194 13.3128L14.198 8.30669L14.2703 8.22013C14.4391 7.97654 14.415 7.63976 14.198 7.4228Z"
                    fill="#54B054"
                  />
                </svg>
              </div>
              <div style={{marginLeft:"15px"}}>
                <strong
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "16px",
                  }}
                >
                  {" "}
                  {/* Main heading */}
                  Changes saved
                </strong>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
                  {" "}
                  {/* Paragraph aligned below heading */}
                  {`Changes made to the stakeholder "${editedData.stakeholderName}" has been saved`}
                </p>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: {
                borderRadius: "8px",
                border: "1px solid #E5E5E5",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                width: "371px",
              },
              icon: false,
            }
          );

          setRefresh((prevRefresh) => !prevRefresh);
          setEditRow(null);
        } else {
          toast.error("Oops, something went wrong", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          LoaderClose();
        }
      } else {
        toast.error("Oops, something went wrong while updating stakeholder", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      LoaderClose();
      console.error(e);
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="overflow-x-auto table-scrollbar min-h-80">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === sortedData.length}
                  className="cursor-pointer accent-green-600"
                />
              </th>
              {columns.map((val, i) => (
                <th
                  key={i}
                  className={`px-6 py-3 text-sm font-semibold text-gray-600 cursor-pointer ${
                    columns.length - 1 === i ? "text-center" : "text-left"
                  }`}
                  onClick={() =>
                    val.key === "stakeholderName" ||
                    val.key === "created_last_editedOn"
                      ? requestSort(val.key)
                      : null
                  }
                >
                  <div className="flex items-center">
                    {val.label}
                    {(val.key === "stakeholderName" ||
                      val.key === "created_last_editedOn") && (
                      <span className="ml-1">{renderSortIcon(val.key)}</span>
                    )}
                    {val.key === "created_last_editedBy" && (
                      <LuListFilter
                        className="text-[15px] cursor-pointer mx-2"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                      />
                    )}
                    <div className="relative">
                      {isFilterOpen && val.key === "created_last_editedBy" && (
                        <div className="filter-dropdown absolute z-10 top-full  -left-20 mt-4 bg-white rounded-lg shadow-lg w-72 border border-gray-200">
                          <div className="p-4">
                            <div className="flex gap-1">
                              <CiFilter className="w-4 h-5 mt-0.5" />
                              <h3 className="text-sm font-medium text-gray-900 mb-3">
                                Filter by User
                              </h3>
                            </div>

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

                            <div className="space-y-2 max-h-30 overflow-y-auto table-scrollbar">
                              {uniqueUsers
                                .filter(
                                  (user) =>
                                    user.full_name
                                      .toLowerCase()
                                      .includes(searchUser.toLowerCase()) ||
                                    user.email
                                      .toLowerCase()
                                      .includes(searchUser.toLowerCase())
                                )
                                .map((user, i) => (
                                  <label
                                    key={i}
                                    className="flex items-center gap-3 py-0.5 px-1 hover:bg-gray-50 rounded cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedUsers.includes(
                                        user.email
                                      )}
                                      onChange={() =>
                                        handleUserSelection(user.email)
                                      }
                                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm font-semibold text-gray-900 truncate">
                                        {capitalizeName(user.full_name)}
                                      </div>
                                      <div className="text-sm text-gray-500 truncate">
                                        {user.email}
                                      </div>
                                    </div>
                                  </label>
                                ))}
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
            {sortedData.map((row, idx) => (
              <tr key={idx} className="bg-white">
                <td className="px-4 py-3 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
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
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          stakeholderName: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setEditedData({ ...editedData, email: e.target.value })
                      }
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
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          location: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setEditedData({ ...editedData, spoc: e.target.value })
                      }
                      className="border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none px-2 py-1 w-full"
                    />
                  ) : (
                    row.spoc
                  )}
                </td>
                <td className="px-6 py-3 text-sm text-[#007EEF] border-b border-gray-200 cursor-pointer hover:underline">
                  <div className="relative">
                    <div
                      onMouseEnter={() => setHoveredRow2(idx)}
                      onMouseLeave={() => setHoveredRow2(null)}
                    >
                      <p className="font-semibold">
                        {row.created_last_editedBy.length > 0
                          ? capitalizeName(row.created_last_editedBy[0].name)
                          : ""}
                      </p>
                      {row.created_last_editedBy.length > 0
                        ? row.created_last_editedBy[0].email
                        : ""}

                      {hoveredRow2 === idx && (
                        <div className="absolute left-0 -top-16 bg-white shadow-md p-3 rounded-md border border-gray-300 z-10 whitespace-nowrap">
                          <p className="text-sm text-[#344054] font-semibold flex gap-2">
                            Created By:{" "}
                            <span className="font-normal">
                              {capitalizeName(row.created_last_editedBy[0].name)}
                            </span>
                          </p>
                          <p className="text-sm text-[#344054] font-semibold flex gap-2">
                            Last Edited By:{" "}
                            <span className="font-normal">
                              {capitalizeName(row.created_last_editedBy[1].name)}
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
                      {row.created_last_editedOn.length > 0
                        ? row.created_last_editedOn[0]
                        : ""}
                      {hoveredRow === idx && (
                        <div className="absolute left-0 -top-16 bg-white shadow-md p-3 rounded-md border border-gray-300 z-10 whitespace-nowrap">
                          <p className="text-sm text-[#344054] font-semibold flex gap-2">
                            Created On:{" "}
                            <span className="font-normal">
                              {row.created_last_editedOn[0]}
                            </span>
                          </p>
                          <p className="text-sm text-[#344054] font-semibold flex gap-2">
                            Last Edited:{" "}
                            <span className="font-normal">
                              {row.created_last_editedOn[1]}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-600 border-b border-gray-200 cursor-pointer">
                  <div className="flex justify-center items-center">
                    {editRow === row.sno ? (
                      <>
                        <MdOutlineSave
                          onClick={handleSubmit}
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
                            onClick={() => {
                              setIsModalOpen(true);
                              setdeleteData({
                                id: row.id,
                                name: row.stakeholderName,
                              });
                            }}
                            className={`text-[20px] text-gray-500 ${
                              !deleteDisabled
                                ? "opacity-30 cursor-not-allowed"
                                : "cursor-pointer hover:text-red-500"
                            }`}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isModalOpen={isModalOpen}
        setRefresh={setRefresh}
        setIsModalOpen={setIsModalOpen}
        selectedRows={
          selectedRows.length > 0 ? selectedRows.length : deleteData
        }
        deleteData={deleteData}
      />

      <Pagination
        totalItems={totalItems}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={onPageChange}
      />
      <button className="text-[15px] text-[#007EEF] font-semibold flex justify-end w-full">
        Export List <IoMdDownload className=" mt-0.5 ml-1 w-5 h-5" />
      </button>


       {loopen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                      <Oval
                        height={50}
                        width={50}
                        color="#00BFFF"
                        secondaryColor="#f3f3f3"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  )}
    </>
  );
};

export default StakeholderListTable;
