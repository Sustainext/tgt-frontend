'use client';
import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  MdOutlineFileDownload,
  MdClose,
  MdNavigateBefore,
  MdNavigateNext,
} from 'react-icons/md';
import { LuListFilter } from 'react-icons/lu';
import { Oval } from 'react-loader-spinner';
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from '../../../lib/redux/features/topheaderSlice';
import { useDispatch } from 'react-redux';
import axiosInstance from '@/app/utils/axiosMiddleware';
import Moment from 'react-moment';
import { MaskedEmail } from '../../shared/components/MaskedPIIField';
const AuditLogs = () => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([{}]);
  useEffect(() => {
    dispatch(setHeadertext2('Audit logs'));
    dispatch(setHeaderdisplay('none'));
    dispatch(setMiddlename('List'));
  }, [dispatch]);
  const [loopen, setLoOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(false);

  const handleOpenModal = (log) => {
    setSelectedLog(log);
    setIsOpen4(true);
  };
  const handleCloseModal = () => {
    setIsOpen4(false);
  };
  const [statusFilter, setStatusFilter] = useState({});
  const [statusFilter2, setStatusFilter2] = useState({});
  const [statusFilter3, setStatusFilter3] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filter-dropdown')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutside2 = (event) => {
      if (!event.target.closest('.filter-dropdown2')) {
        setIsOpen2(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside2);
    return () => document.removeEventListener('mousedown', handleClickOutside2);
  }, [isOpen2]);
  useEffect(() => {
    const handleClickOutside3 = (event) => {
      if (!event.target.closest('.filter-dropdown3')) {
        setIsOpen3(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside3);
    return () => document.removeEventListener('mousedown', handleClickOutside3);
  }, [isOpen3]);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filteredLogs = logs.filter((log) => {
    const eventTypeFilterActive = Object.values(statusFilter).some(
      (value) => value
    );
    const eventDetailsFilterActive = Object.values(statusFilter2).some(
      (value) => value
    );
    const userRoleFilterActive = Object.values(statusFilter3).some(
      (value) => value
    );

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
      (log.UserEmail || '').toLowerCase().includes(searchValue) ||
      (log.UserRole || '').toLowerCase().includes(searchValue) ||
      (log.Action || '').toLowerCase().includes(searchValue) ||
      (log.EventType || '').toLowerCase().includes(searchValue) ||
      (log.EventDetails || '').toLowerCase().includes(searchValue);

    // Return combined filter conditions
    return eventTypeMatch && eventDetailsMatch && userRoleMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

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
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;
    return `${formattedDate} ${formattedTime}`;
  };
  const handleFileDownload = () => {
    // Use filteredLogs for download
    if (filteredLogs.length > 0) {
      const formattedLogs = filteredLogs.map((log) => ({
        'Event Type': log.EventType,
        'Event Details': log.EventDetails,
        Action: log.Action,
        Status: log.Status,
        'User Email': log.UserEmail,
        'User Role': log.UserRole,
        'Date & Time': formatDate(log.TimeGenerated),
        'IP Address': log.IPAddress,
        Logs: JSON.stringify(log.Logs || {}),
      }));
      const currentDate = new Date().toISOString().split('T')[0];
      const worksheet = XLSX.utils.json_to_sheet(formattedLogs);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Audit_Log');
      XLSX.writeFile(workbook, `Audit_Log_${currentDate}.csv`);
    } else {
      alert('No data available for download.');
    }
  };

  const loadFormData = async () => {
    LoaderOpen();

    const url = `${process.env.BACKEND_API_URL}/sustainapp/get_org_logs/`;
    const params = { from_date: fromDate, to_date: toDate }; // Add date parameters

    try {
      const response = await axiosInstance.get(url, { params }); // Pass params in API call
      console.log('API called successfully:', response.data.results);
      setLogs(response.data.results || []); // Ensure it's an array
      setData(true); // Set data availability
    } catch (error) {
      console.error('Error fetching logs:', error);
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
    <div className='xl:p-6 lg:p-6 2xl:p-6 4k:p-6 2k:p-6 md:p-6 min-h-screen'>
      <div className='flex justify-between items-center mb-6 border-b h-[66px]'>
        <h1
          className='gradient-text text-[22px] h-[22px]'
          style={{ lineHeight: '14px', marginTop: '10px' }}
        >
          Audit Logs
        </h1>
        <div className='flex items-center space-x-3 rounded-md'>
          <div className='relative w-[208px] xl:w-[308px] md:w-[308px] lg:w-[308px] 4k:w-[308px] 2k:w-[308px] 2xl:w-[308px] rounded-md'>
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border border-gray-300  px-3 py-1 w-full pr-10 rounded-md'
            />
            <AiOutlineSearch className='absolute top-2.5 right-3 text-gray-500' />
          </div>
        </div>
      </div>

      <div className='xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex'>
        <div className='xl:flex lg:flex md:flex 2xl:flex 2k:flex 4k:flex items-center  mb-4 xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] w-full'>
          <div className='items-center space-x-2 mb-2 xl:mb-0 lg:mb-0 4k:mb-0 2k:mb-0 md:mb-0 '>
            <label className='block text-sm font-medium text-gray-600 mb-2 ml-1'>
              From
            </label>
            <input
              type='date'
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className='border border-gray-300 rounded px-3 py-1 xl:w-[365px]  lg:w-[365px] md:w-[365px] 4k:w-[365px] 2k:w-[365px] w-[98%] text-[13px]'
            />
          </div>
          <div className='xl:ml-2 lg:ml-2 md:ml-2 4k:ml-2 2k:ml-2'>
            <label className='block text-sm font-medium text-gray-600 mb-2 ml-1'>
              To
            </label>
            <input
              type='date'
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className='border border-gray-300 rounded px-3 py-1 xl:w-[365px]  lg:w-[365px] md:w-[365px] 4k:w-[365px] 2k:w-[365px] w-[98%] text-[13px] ml-2'
            />
          </div>
        </div>
        <div className=' xl:w-[20%] lg:w-[20%] md:w-[20%] 4k:w-[20%] 2k:w-[20%] w-full mb-2'>
          <div className='float-right mt-4'>
            <button
              className='bg-[#007EEF] text-white px-4 py-2 rounded flex items-center text-[13px] gap-2'
              onClick={handleFileDownload}
            >
              <MdOutlineFileDownload className='w-[18px] h-[18px]' />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      <div className='bg-white shadow-md rounded-lg overflow-x-auto custom-scrollbar mt-[95px] xl:mt-0 lg:mt-0 4k:mt-0 2k:mt-0 md:mt-0'>
        <table className='min-w-full w-full divide-y divide-gray-200'>
          <colgroup>
            <col className='w-[12%] min-w-[120px]' />
            <col className='w-[16%] min-w-[160px]' />
            <col className='w-[12%] min-w-[120px]' />
            <col className='w-[10%] min-w-[100px]' />
            <col className='w-[16%] min-w-[180px]' />
            <col className='w-[12%] min-w-[120px]' />
            <col className='w-[22%] min-w-[200px]' />
          </colgroup>
          <thead className='bg-[#ECF9FE]'>
            <tr>
              <th className='px-3 md:px-6 py-3 text-left text-[12px] md:text-[14px] text-gray-500 font-[500] normal-case'>
                <div className='flex items-center'>
                  <span className='truncate'>Event Type</span>
                  <LuListFilter
                    className='text-[18px] md:text-[22px] ml-2 md:ml-4 cursor-pointer flex-shrink-0'
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </div>
                {isOpen && (
                  <div className='filter-dropdown absolute  w-[200px] bg-white shadow-xl border border-gray-200 rounded z-10 '>
                    {Object.keys(statusFilter).map((status) => (
                      <div className='px-3 py-2' key={status}>
                        <label className='flex items-center text-gray-600'>
                          <input
                            type='checkbox'
                            className='form-checkbox h-4 w-4 green-checkbox'
                            checked={statusFilter[status]}
                            onChange={() => handleCheckboxChange(status)}
                          />
                          <span className='ml-2 text-sm'>{status}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className='px-3 md:px-6 py-3 text-left text-[12px] md:text-[14px] text-gray-500 font-[500] normal-case'>
                <div className='flex items-center'>
                  <span className='truncate'>Event Details</span>
                  <LuListFilter
                    className='text-[18px] md:text-[22px] ml-2 md:ml-4 cursor-pointer flex-shrink-0'
                    onClick={() => setIsOpen2(!isOpen2)}
                  />
                </div>
                {isOpen2 && (
                  <div className='filter-dropdown2 absolute w-[290px] bg-white shadow-xl border border-gray-200 rounded z-10  overflow-auto h-[450px] custom-scrollbar'>
                    {Object.keys(statusFilter2).map((status) => (
                      <div className='px-3 py-2' key={status}>
                        <label className='flex items-center text-gray-600'>
                          <input
                            type='checkbox'
                            className='form-checkbox h-4 w-4 green-checkbox'
                            checked={statusFilter2[status]}
                            onChange={() => handleCheckboxChange2(status)}
                          />
                          <span className='ml-2 text-sm'>{status}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className='px-3 md:px-6 py-3 text-left text-[12px] md:text-[14px] text-gray-500 font-[500] normal-case'>
                <span className='truncate'>Action</span>
              </th>
              <th className='px-3 md:px-6 py-3 text-left text-[12px] md:text-[14px] text-gray-500 font-[500] normal-case'>
                <span className='truncate'>Status</span>
              </th>
              <th className='px-3 md:px-6 py-3 text-left text-[12px] md:text-[14px] text-gray-500 font-[500] normal-case'>
                <span className='truncate'>User Email</span>
              </th>
              <th className='px-3 md:px-6 py-3 text-left text-[12px] md:text-[14px] text-gray-500 font-[500] normal-case'>
                <div className='flex items-center'>
                  <span className='truncate'>User Role</span>
                  <LuListFilter
                    className='text-[18px] md:text-[22px] ml-2 md:ml-4 cursor-pointer flex-shrink-0'
                    onClick={() => setIsOpen3(!isOpen3)}
                  />
                </div>
                {isOpen3 && (
                  <div className='filter-dropdown3 absolute xl:right-[21.5rem] lg:right-[21.5rem] md:right-[16.5rem] 2k:right-[21.5rem] 4k:right-[21.5rem]  right-[13.5rem] mt-2 w-[200px] max-w-[90vw] bg-white shadow-xl border border-gray-200 rounded z-10 '>
                    {Object.keys(statusFilter3).map((status) => (
                      <div className='px-3 py-2' key={status}>
                        <label className='flex items-center text-gray-600'>
                          <input
                            type='checkbox'
                            className='form-checkbox h-4 w-4 green-checkbox'
                            checked={statusFilter3[status]}
                            onChange={() => handleCheckboxChange3(status)}
                          />
                          <span className='ml-2 text-sm'>{status}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className='px-3 md:px-6 py-3 text-left text-[12px] md:text-[14px] text-gray-500 font-[500] normal-case'>
                <span className='truncate'>Date & Time</span>
              </th>
              {/* <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-[14px] text-gray-500 font-[500] normal-case">
                Log Details
              </th> */}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data && paginatedLogs.length > 0 ? (
              paginatedLogs.map((log, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='px-3 md:px-6 py-4 text-[11px] md:text-[13px] border-r text-[#667085]'>
                    <div className='truncate' title={log.EventType}>
                      {log.EventType}
                    </div>
                  </td>
                  <td className='px-3 md:px-6 py-4 text-[11px] md:text-[13px] border-r text-[#667085]'>
                    <div className='truncate' title={log.EventDetails}>
                      {log.EventDetails}
                    </div>
                  </td>
                  <td className='px-3 md:px-6 py-4 text-[11px] md:text-[13px] border-r text-[#667085]'>
                    <div className='truncate' title={log.Action}>
                      {log.Action}
                    </div>
                  </td>
                  <td className='px-3 md:px-6 py-4 text-[11px] md:text-[13px] border-r text-[#667085]'>
                    <div className='truncate' title={log.Status}>
                      {log.Status}
                    </div>
                  </td>
                  <td className='px-3 md:px-6 py-4 text-[11px] md:text-[13px] border-r text-[#667085]'>
                    <MaskedEmail
                      email={log.UserEmail}
                      showToggle={true}
                      className='max-w-full'
                    />
                  </td>
                  <td className='px-3 md:px-6 py-4 text-[11px] md:text-[13px] border-r text-[#667085]'>
                    <div className='truncate' title={log.UserRole}>
                      {log.UserRole}
                    </div>
                  </td>
                  <td className='px-3 md:px-6 py-4 text-[11px] md:text-[13px] border-r text-[#667085]'>
                    <div className='flex flex-col sm:flex-row sm:items-center'>
                      <div className='truncate mr-2 mb-1 sm:mb-0'>
                        <Moment format='M/D/YYYY | h:mm:ss A'>
                          {log.TimeGenerated}
                        </Moment>
                      </div>
                      <button
                        className='text-[#007EEF] text-[10px] md:text-[12px] cursor-pointer hover:underline self-start sm:self-auto'
                        onClick={() => handleOpenModal(log)}
                      >
                        See Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className='px-6 py-4 text-center whitespace-nowrap text-[13px] text-[#667085]'
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center items-center mt-6 w-full  '>
        <div className='w-full max-w-full sm:max-w-[480px] min-w-[280px] flex flex-wrap justify-center items-center gap-2'>
          {/* Previous Button */}
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded ${
              currentPage === 1
                ? ' text-gray-400 cursor-not-allowed'
                : ' text-blue-500 shadow'
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
                  ? 'bg-white text-blue-500 shadow'
                  : 'bg-white text-gray-700'
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
                ? ' text-gray-400 cursor-not-allowed'
                : ' text-blue-500 shadow'
            }`}
          >
            <MdNavigateNext />
          </button>

          {/* Rows Per Page Selector */}
          <div className='flex items-center space-x-2'>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className='border border-gray-300 rounded-md px-4 py-1 text-[12px]'
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
        <div className='modal-overlay z-50'>
          <div className='modal-center'>
            <div className='modal-contentnew w-[95%] max-w-2xl xl:w-[30%] md:w-[70%] lg:w-[40%] max-h-[90vh] overflow-y-auto'>
              <div className='flex justify-between items-center mb-4 w-full'>
                <h2 className='text-black text-opacity-90 text-lg md:text-[22px] font-normal leading-relaxed'>
                  <span>Details</span>
                </h2>
                <MdClose
                  className='text-xl md:text-[25px] text-[#667085] cursor-pointer flex-shrink-0'
                  onClick={handleCloseModal}
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 md:gap-x-8'>
                <div>
                  <p className='text-[#344054] text-[16px] font-medium'>
                    Event Type
                  </p>
                </div>
                <div>
                  <p className='text-[#667085] text-[16px]'>
                    {selectedLog.EventType}
                  </p>
                </div>

                <div>
                  <p className='text-[#344054] text-[16px] font-medium'>
                    Event Details
                  </p>
                </div>
                <div>
                  <p className='text-[#667085] text-[16px]'>
                    {selectedLog.EventDetails}
                  </p>
                </div>

                <div>
                  <p className='text-[#344054] text-[16px] font-medium'>
                    Action
                  </p>
                </div>
                <div>
                  <p className='text-[#667085] text-[16px]'>
                    {selectedLog.Action}
                  </p>
                </div>

                <div>
                  <p className='text-[#344054] text-[16px] font-medium'>
                    Status
                  </p>
                </div>
                <div>
                  <p className='text-[#667085] text-[16px]'>
                    {selectedLog.Status}
                  </p>
                </div>

                <div>
                  <p className='text-[#344054] text-[16px] font-medium'>
                    User Email
                  </p>
                </div>
                <div>
                  <MaskedEmail
                    email={selectedLog.UserEmail}
                    showToggle={true}
                    className='text-[#667085] text-[16px] max-w-full'
                  />
                </div>

                <div>
                  <p className='text-[#344054] text-[16px] font-medium'>
                    User Role
                  </p>
                </div>
                <div>
                  <p className='text-[#667085] text-[16px]'>
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
                  <p className='text-[#344054] text-[16px] font-medium'>
                    Date & Time
                  </p>
                </div>
                <div>
                  <p className='text-[#667085] text-[16px]'>
                    <Moment format='M/D/YYYY | h:mm:ss A'>
                      {selectedLog.TimeGenerated}
                    </Moment>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loopen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]'>
          <Oval
            height={50}
            width={50}
            color='#00BFFF'
            secondaryColor='#f3f3f3'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
