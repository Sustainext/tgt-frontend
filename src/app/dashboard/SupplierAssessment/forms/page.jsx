"use client";
import React from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Table from "../tables/formTable";
import { useState } from "react";
import NoDataAvailable from "../components/noDataAvailable";
import CreateFormModal from './modals/createFormModal'

const Forms = () => {
    const totalItems = 50; 
    const rowsPerPageOptions = [5, 10, 15]; // Rows-per-page options
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
     const [isModalOpen, setIsModalOpen] = useState(false);
  
    const data = Array(totalItems)
      .fill(null)
      .map((_, idx) => ({
        sno: idx + 1,
        formName: "Form A",
        createdBy: "Homer Simpson",
        createdOn: "27/01/2023",
        usedIn:["Assessment 1","Assessment 2","Assessment 3","Assessment 4",],
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
        { key: "formName", label: "Form Name" },
        { key: "createdBy", label: "Created By" },
        { key: "createdOn", label: "Created On" },
        { key: "usedIn", label: "Used in" },
        { key: "actions", label: "Actions" },
      ];
  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-semibold text-[#101828]">
          Form
        </h1>
        <div className="relative flex gap-4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 min-w-[25vw] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // value={searchQuery}
            // onChange={handleSearch}
          />
          <button onClick={()=>{setIsModalOpen(true)}} className="bg-[#007EEF] text-white px-4 py-2 text-[13px] rounded-md hover:bg-blue-600">
            + Create New Form
          </button>
        </div>
      </div>
      <p className="text-[14px] text-[#667085] mb-6">
      Create forms here to send in an assessment.  Click + Create New Forms button to create forms.
      </p>
    
{currentData.length>0?(
    <div>
        {/* Table */}
     <Table columns={columns} currentData={currentData}  totalItems={totalItems}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={handlePageChange} />
    </div>
):(
    <NoDataAvailable title="No Forms Present" para="There are currently no forms available. Click on Create a New Form button to create forms." buttonText="Create a New Form" image="forms" />
)}

<CreateFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />
     
    </div>
  );
};

export default Forms;
