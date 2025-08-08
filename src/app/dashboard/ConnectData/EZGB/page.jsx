"use client";
import React from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Table from "../tables/table";
import { useState } from "react";
import NoDataAvailable from "../components/noDataAvailable";
import { MdAdd } from "react-icons/md";
import { ImPowerCord } from "react-icons/im";
import { useRouter } from 'next/navigation';
import { IoChevronBackOutline } from "react-icons/io5";

const EZGB = ({ setActiveTab }) => {
    const totalItems = 50;
    const rowsPerPageOptions = [5, 10, 20]; // Rows-per-page options
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()

    //   const data = Array(totalItems)
    //     .fill(null)
    //     .map((_, idx) => ({
    //       sno: idx + 1,
    //       name: "Supplier Assessment 2023",
    //       form: "Evs Form 20",
    //       createdBy: "Homer Simpson",
    //       group: ["Group 1", "Group 2", "Group 3 Group 4", "Group 4"],
    //       createdOn: "27/01/2023",
    //       dueDate: "27/01/2023",
    //       completion: ((idx + 1) * 2) % 100,
    //     }));

    //   const currentData = data.slice(
    //     (currentPage - 1) * rowsPerPage,
    //     currentPage * rowsPerPage
    //   );
    const currentData = []

    const handlePageChange = (page, rows) => {
        setCurrentPage(page);
        setRowsPerPage(rows);
    };
    const columns = [
        { key: "sno", label: "Sno" },
        { key: "assessmentName", label: "Assessment Name" },
        { key: "formSelected", label: "Form Selected" },
        { key: "createdBy", label: "Created By" },
        { key: "stakeholderGroups", label: "Stakeholder Groups" },
        { key: "createdOn", label: "Created On" },
        { key: "dueDate", label: "Due Date" },
        { key: "completion", label: "Response Received" },
    ];
    return (
        <>
            <div>
                <div className="">
                    <div className="flex flex-col justify-start overflow-x-hidden scrollable-content ">
                        <div className="flex justify-between items-center border-b border-gray-200 mb-2 w-full">
                            <div className="w-full">
                                <div className="text-left mb-4 ml-3 pt-1">
                                    <div className="block md:flex justify-between">
                                        <div>
                                            <p className="gradient-text text-[22px] font-bold pt-2 pb-2 ml-3">
                                               EZGB (Easy Green Button) connector 
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                             onClick={() => router.push('/dashboard/ConnectData')}
                                            className="mt-2 lg:mt-0 flex items-center gap-2 border border-gray-300 text-gray-500 text-sm px-4 py-2 rounded-md hover:shadow-sm bg-white"
                                        >
                                           <IoChevronBackOutline className="w-4 h-4" />
                                            Back to Connect My Data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col h-screen mx-6 mt-5">
                        <div className="xl:flex lg:flex 2xl:flex 4k:flex justify-between items-center mb-6">
                           <div className="mb-3 lg:mb-0">
                             <h1 className="text-[20px] font-semibold text-[#101828] mb-4">
                                EZGB Utility Connections
                            </h1>
                             <p className="text-[14px] text-[#667085] w-[90%]">
                            View and manage your connected utility accounts. Use EZGB to securely link your energy provider and keep your data in sync.
                        </p>
                           </div>
                            <div className="relative xl:flex lg:flex 2xl:flex 4k:flex gap-4">
                                <div className="w-full mb-4">
                                    <FiSearch className="absolute left-3 top-[1.25rem] xl:top-[1.30rem] lg:top-[1.2rem] transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="pl-10 pr-4 py-1.5 xl:min-w-[25vw] lg:min-w-[25vw] 2xl:min-w-[25vw] 4k:min-w-[25vw] w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    // value={searchQuery}
                                    // onChange={handleSearch}
                                    />
                                </div>

                                <div className="w-full">
                                    <button
                                        onClick={() => window.open('/EZGB', '_blank')}
                                        className="bg-[#007EEF] text-white px-2 py-2 text-[14px] rounded-md hover:bg-blue-600  w-auto"
                                    >
                                        <div className="flex gap-1">
                                            <ImPowerCord className="w-4 h-4 mt-1 mr-1" /> Connect via EZGB
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 2k:grid-cols-4 4k:grid-cols-4 gap-6 mb-6">
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                    <h2 className="text-[14px] font-neutral text-[#71717A] uppercase">
                                        Total utility providers
                                    </h2>
                                    <p className="text-[15px] font-normal text-[#18181B] mt-2">Coming Soon</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                    <h2 className="text-[14px] font-neutral text-[#71717A] uppercase">
                                        Total Locations
                                    </h2>
                                    <div className="flex justify-between">
                                        <p className="text-[15px] font-normal text-[#18181B] mt-2">Coming Soon</p>
                                        {/* <p className="text-sm text-green-600 mt-4">-</p> */}
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                    <h2 className="text-[14px] font-neutral text-[#71717A] uppercase">
                                        Total Meters
                                    </h2>
                                    <div className="flex justify-between">
                                        <p className="text-[15px] font-normal text-[#18181B] mt-2">
                                           Coming Soon
                                        </p>
                                        {/* <p className="text-sm text-green-600 mt-4">36%</p> */}
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            {/* <Table
              columns={columns}
              currentData={currentData}
              totalItems={totalItems}
              rowsPerPageOptions={rowsPerPageOptions}
              onPageChange={handlePageChange}
            /> */}
                        </div>

                        {currentData.length > 0 ? (
          <div></div>
        ) : (
           
          <NoDataAvailable
           
          />
        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default EZGB;
