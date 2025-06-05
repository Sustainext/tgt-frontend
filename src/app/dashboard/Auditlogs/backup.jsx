"use client";
import * as XLSX from "xlsx";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  MdOutlineFileDownload,
  MdClose,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { LuListFilter } from "react-icons/lu";
import { Oval } from "react-loader-spinner";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "@/app/utils/axiosMiddleware";
import Moment from "react-moment";
const AuditLogsbackup = () => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([{}]);
  useEffect(() => {
    // Update header with step-related information
    dispatch(setHeadertext2("Audit logs"));
    dispatch(setHeaderdisplay("none"));
    dispatch(setMiddlename("List"));
  }, [dispatch]);
  const [loopen, setLoOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(false);

  const handleOpenModal = (log) => {
    setSelectedLog(log); // Set the selected log
    setIsOpen4(true);
  };
  const handleCloseModal = () => {
    setIsOpen4(false);
  };
  const [statusFilter, setStatusFilter] = useState({

  });
  const [statusFilter2, setStatusFilter2] = useState({

  });
  const [statusFilter3, setStatusFilter3] = useState({
  
  });
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutside2 = (event) => {
      if (!event.target.closest(".filter-dropdown2")) {
        setIsOpen2(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside2);
    return () => document.removeEventListener("mousedown", handleClickOutside2);
  }, [isOpen2]);
  useEffect(() => {
    const handleClickOutside3 = (event) => {
      if (!event.target.closest(".filter-dropdown3")) {
        setIsOpen3(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside3);
    return () => document.removeEventListener("mousedown", handleClickOutside3);
  }, [isOpen3]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const totalPages = Math.ceil(logs.length / rowsPerPage);

  const filteredLogs = logs.filter((log) => {
    // Filter by EventType if any filter is active
    const eventTypeFilterActive = Object.values(statusFilter).some((value) => value);
    const eventDetailsFilterActive = Object.values(statusFilter2).some((value) => value);
    const userRoleFilterActive = Object.values(statusFilter3).some((value) => value);
  
    const eventTypeMatch = eventTypeFilterActive
      ? statusFilter[log.EventType] || false
      : true;
  
    const eventDetailsMatch = eventDetailsFilterActive
      ? statusFilter2[log.EventDetails] || false
      : true;
  
    const userRoleMatch = userRoleFilterActive
      ? statusFilter3[log.UserRole] || false
      : true;
  
    // Search Filter with fallback for undefined/null values
    const searchValue = searchQuery.toLowerCase();
    const searchMatch =
      (log.UserEmail || "").toLowerCase().includes(searchValue) ||
      (log.UserRole || "").toLowerCase().includes(searchValue) ||
      (log.Action || "").toLowerCase().includes(searchValue) ||
      (log.EventType || "").toLowerCase().includes(searchValue) ||
      (log.EventDetails || "").toLowerCase().includes(searchValue);
  
    // Return combined filter conditions
    return eventTypeMatch && eventDetailsMatch && userRoleMatch && searchMatch;
  });
  
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  
  

  const handlePageChange = (page) => setCurrentPage(page);

  const handleCheckboxChange = (status) => {
    setStatusFilter((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };
  const handleCheckboxChange2 = (status) => {
    setStatusFilter2((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };
  const handleCheckboxChange3 = (status) => {
    setStatusFilter3((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  useEffect(() => {
    if (fromDate && toDate) {
      setLoOpen(true); // Show loader
      setData(false); // Ensure no stale data is shown
      loadFormData();
    }
  }, [fromDate, toDate]);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
  };
  const handleFileDownload = () => {
    if (logs.length > 0) {
      const formattedLogs = logs.map((log) => ({
        "Event Type": log.EventType,
        "Event Details": log.EventDetails,
        "Action": log.Action,
        "Status": log.Status,
        "User Email": log.UserEmail,
        "User Role": log.UserRole,
        "Date & Time": formatDate(log.TimeGenerated),
        "IP Address": log.IPAddress,
        "Logs": JSON.stringify(log.Logs || {}),
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedLogs);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Logs");
      XLSX.writeFile(workbook, "AuditLogs.csv");
    } else {
      alert("No data available for download.");
    }
  };
  const loadFormData = async () => {
    LoaderOpen();
  
    const url = `${process.env.BACKEND_API_URL}/sustainapp/get_org_logs/`;
    const params = { from_date: fromDate, to_date: toDate }; // Add date parameters
  
    try {
      const response = await axiosInstance.get(url, { params }); // Pass params in API call
      console.log("API called successfully:", response.data.results);
      setLogs(response.data.results || []); // Ensure it's an array
      setData(true); // Set data availability

    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]); // Reset to an empty array on error
      setData(false); // Set data as unavailable
    } finally {
      LoaderClose();
    }
  };
useEffect(() => {
  if (logs.length > 0) {
    // Extract unique values and filter out undefined/null
    const uniqueEventTypes = [
      ...new Set(logs.map((log) => log.EventType).filter(Boolean)),
    ];
    const uniqueEventDetails = [
      ...new Set(logs.map((log) => log.EventDetails).filter(Boolean)),
    ];
    const uniqueUserRoles = [
      ...new Set(logs.map((log) => log.UserRole).filter(Boolean)),
    ];

    // Initialize filter states
    const eventTypeFilter = uniqueEventTypes.reduce((acc, value) => {
      acc[value] = false;
      return acc;
    }, {});

    const eventDetailsFilter = uniqueEventDetails.reduce((acc, value) => {
      acc[value] = false;
      return acc;
    }, {});

    const userRoleFilter = uniqueUserRoles.reduce((acc, value) => {
      acc[value] = false;
      return acc;
    }, {});

    setStatusFilter(eventTypeFilter);
    setStatusFilter2(eventDetailsFilter);
    setStatusFilter3(userRoleFilter);
  } else {
    // Reset filters if logs are empty
    setStatusFilter({});
    setStatusFilter2({});
    setStatusFilter3({});
  }
}, [logs]);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b h-[66px]">
        <h1
          className="gradient-text text-[22px] h-[22px]"
          style={{ lineHeight: "14px",marginTop:"10px" }}
        >
          Audit Logs
        </h1>
        <div className="flex items-center space-x-3 rounded-md">
          <div className="relative w-[308px] rounded-md">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300  px-3 py-1 w-full pr-10 rounded-md"
            />
            <AiOutlineSearch className="absolute top-2.5 right-3 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex items-center space-x-4 mb-4 w-[80%]">
          <div className="items-center space-x-2">
            <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">
              From
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-[365px] text-[13px]"
            />
          </div>
          <div className=" items-center space-x-2">
            <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">
              To
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-[365px] text-[13px]"
            />
          </div>
        </div>
        <div className="w-[20%]">
          <div className="float-right mt-4">
            <button
              className="bg-[#007EEF] text-white px-4 py-2 rounded flex items-center text-[13px] gap-2"
              onClick={handleFileDownload}
            >
              <MdOutlineFileDownload className="w-[18px] h-[18px]" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#ECF9FE]">
            <tr>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                <div className="flex items-center">
                  Event Type{" "}
                  <LuListFilter
                    className="text-[22px] ml-4 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </div>
                {isOpen && (
                  <div className="filter-dropdown absolute  w-[200px] bg-white shadow-xl border border-gray-200 rounded z-10 ">
                    {Object.keys(statusFilter).map((status) => (
                      <div className="px-3 py-2" key={status}>
                        <label className="flex items-center text-gray-600">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 green-checkbox"
                            checked={statusFilter[status]}
                            onChange={() => handleCheckboxChange(status)}
                          />
                          <span className="ml-2 text-sm">{status}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                <div className="flex items-center">
                  Event Details{" "}
                  <LuListFilter
                    className="text-[22px] ml-4 cursor-pointer"
                    onClick={() => setIsOpen2(!isOpen2)}
                  />
                </div>
                {isOpen2 && (
                  <div className="filter-dropdown2 absolute  w-[200px] bg-white shadow-xl border border-gray-200 rounded z-10">
                    {Object.keys(statusFilter2).map((status) => (
                      <div className="px-3 py-2" key={status}>
                        <label className="flex items-center text-gray-600">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 green-checkbox"
                            checked={statusFilter2[status]}
                            onChange={() => handleCheckboxChange2(status)}
                          />
                          <span className="ml-2 text-sm">{status}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                Action
              </th>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                Status
              </th>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                User Email
              </th>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                <div className="flex items-center">
                  User Role{" "}
                  <LuListFilter
                    className="text-[22px] ml-4 cursor-pointer"
                    onClick={() => setIsOpen3(!isOpen3)}
                  />
                </div>
                {isOpen3 && (
                  <div className="filter-dropdown3 absolute  w-[200px] bg-white shadow-xl border border-gray-200 rounded z-10">
                    {Object.keys(statusFilter3).map((status) => (
                      <div className="px-3 py-2" key={status}>
                        <label className="flex items-center text-gray-600">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 green-checkbox"
                            checked={statusFilter3[status]}
                            onChange={() => handleCheckboxChange3(status)}
                          />
                          <span className="ml-2 text-sm">{status}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                Date & Time
              </th>
              {/* <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                Log Details
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {data && paginatedLogs.length > 0 ? (
    paginatedLogs.map((log, index) => (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap text-[13px] border-r text-[#667085]">
          {log.EventType}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-[13px] border-r text-[#667085]">
          {log.EventDetails}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-[13px] border-r text-[#667085]">
          {log.Action}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-[13px] border-r text-[#667085]">
          {log.Status}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-[13px] border-r text-[#667085]">
          {log.UserEmail}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-[13px] border-r text-[#667085]">
          {log.UserRole}
        </td>
       <td className="px-6 py-4 whitespace-nowrap text-[13px] border-r text-[#667085] ">
                    <div className="flex">
                    <Moment format="M/D/YYYY | h:mm:ss A">{log.TimeGenerated}</Moment>
                      <p
                        className="text-[#007EEF] text-[12px] ml-2 cursor-pointer"
                        onClick={() => handleOpenModal(log)}
                      >
                        See Details
                      </p>
                    </div>
                  </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={7}
        className="px-6 py-4 text-center whitespace-nowrap text-[13px] text-[#667085]"
      >
        No data available
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      <div className="flex justify-center items-center mt-6">
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded ${
              currentPage === 1
                ? " text-gray-400 cursor-not-allowed"
                : " text-blue-500 shadow"
            }`}
          >
            <MdNavigateBefore />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 rounded text-[12px] ${
                currentPage === index + 1
                  ? "bg-white text-blue-500 shadow"
                  : "bg-white text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`p-2 rounded ${
              currentPage === totalPages
                ? " text-gray-400 cursor-not-allowed"
                : " text-blue-500 shadow"
            }`}
          >
            <MdNavigateNext />
          </button>

          {/* Rows Per Page Selector */}
          <div className="flex items-center space-x-2">
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-4 py-1 text-[12px]"
            >
              {[5, 10, 20].map((num) => (
                <option key={num} value={num}>
                  {num} per page
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {isOpen4 && selectedLog && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="modal-contentnew">
              <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="self-stretch text-black text-opacity-90 text-[22px] font-normal leading-relaxed flex space-x-8 items-center">
                  <span>Details</span>
                </h2>
                <MdClose
                  className="text-[25px] text-[#667085] cursor-pointer"
                  onClick={handleCloseModal}
                />
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    Event Type
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                    {selectedLog.EventType}
                  </p>
                </div>

                <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    Event Details
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                    {selectedLog.EventDetails}
                  </p>
                </div>

                <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    Action
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                    {selectedLog.Action}
                  </p>
                </div>

                <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    Status
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                    {selectedLog.Status}
                  </p>
                </div>

                <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    User Email
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                    {selectedLog.UserEmail}
                  </p>
                </div>

                <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    User Role
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                    {selectedLog.UserRole}
                  </p>
                </div>

                {/* <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    Log Details
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                    {selectedLog.Logs}
                  </p>
                </div> */}

                {/* <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    IP Address
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                    {selectedLog.IPAddress}
                  </p>
                </div> */}

                <div>
                  <p className="text-[#344054] text-[16px] font-medium">
                    Date & Time
                  </p>
                </div>
                <div>
                  <p className="text-[#667085] text-[16px]">
                  <Moment format="M/D/YYYY | h:mm:ss A">{selectedLog.TimeGenerated}</Moment>
               
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
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
    </div>
  );
};

export default AuditLogsbackup;