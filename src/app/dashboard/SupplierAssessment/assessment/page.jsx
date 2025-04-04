"use client";
import React from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Table from "../tables/table";
import { useState } from "react";
import CreateAssessmentModal from "./modals/createAssessmentModal";
import NoDataAvailable from "../components/noDataAvailable";
import { MdAdd } from "react-icons/md";

const Assessment = ({ setActiveTab }) => {
  const totalItems = 50;
  const rowsPerPageOptions = [5, 10, 20]; // Rows-per-page options
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = Array(totalItems)
    .fill(null)
    .map((_, idx) => ({
      sno: idx + 1,
      name: "Supplier Assessment 2023",
      form: "Evs Form 20",
      createdBy: "Homer Simpson",
      group: ["Group 1", "Group 2", "Group 3 Group 4", "Group 4"],
      createdOn: "27/01/2023",
      dueDate: "27/01/2023",
      completion: ((idx + 1) * 2) % 100,
    }));

  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
      <div className="xl:p-4 min-h-screen">
        <div className="xl:flex justify-between items-center mb-6">
          <h1 className="text-[20px] font-semibold text-[#101828] mb-4">
            Assessments
          </h1>
          <div className="relative xl:flex gap-4">
            <div className="w-full mb-4">
              <FiSearch className="absolute left-3 top-[1.25rem] xl:top-[1.30rem] transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 xl:min-w-[25vw] w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                // value={searchQuery}
                // onChange={handleSearch}
              />
            </div>
            <div className="w-full">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="bg-[#007EEF] text-white px-4 py-2 text-[14px] rounded-md hover:bg-blue-600 xl:w-full w-[50%]"
              >
                <div className="flex gap-1">
                  <MdAdd className="w-4 h-4 mt-0.5" /> Create New Assessment
                </div>
              </button>
            </div>
          </div>
        </div>
        <p className="text-[14px] text-[#667085] mb-6">
          Track all sent assessments here. Assessments contains forms that are
          sent to Stakeholders in a stakeholder group. Click + Create New
          Assessment to send a new assessment
        </p>

        {currentData.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 2k:grid-cols-4 4k:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-[14px] font-neutral text-[#71717A] uppercase">
                  Total Assessments Completed
                </h2>
                <p className="text-[21px] font-bold text-[#18181B] mt-2">24</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-[14px] font-neutral text-[#71717A] uppercase">
                  Open assessments
                </h2>
                <div className="flex justify-between">
                  <p className="text-[21px] font-bold text-[#18181B] mt-2">1</p>
                  {/* <p className="text-sm text-green-600 mt-4">36%</p> */}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-[14px] font-neutral text-[#71717A] uppercase">
                  Responses pending
                </h2>
                <div className="flex justify-between">
                  <p className="text-[21px] font-bold text-[#18181B] mt-2">
                    10
                  </p>
                  {/* <p className="text-sm text-green-600 mt-4">36%</p> */}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-[14px] font-neutral text-[#71717A] uppercase">
                  Responses overdue
                </h2>
                <div className="flex justify-between">
                  <p className="text-[21px] font-bold text-[#18181B] mt-2">
                    14
                  </p>
                  {/* <p className="text-sm text-red-600 mt-4">23%</p> */}
                </div>
              </div>
            </div>

            {/* Table */}
            <Table
              columns={columns}
              currentData={currentData}
              totalItems={totalItems}
              rowsPerPageOptions={rowsPerPageOptions}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <NoDataAvailable
            title="No Assessments"
            para="No Supplier assessments made."
            buttonText="Create the first Assessment"
            image="assessment"
            isAssessmentOpen={isModalOpen}
            setIsAssessmentOpen={setIsModalOpen}
          />
        )}
      </div>
      <CreateAssessmentModal
        isModalOpen={isModalOpen}
        setActiveTab={setActiveTab}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Assessment;
