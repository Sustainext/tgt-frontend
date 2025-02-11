"use client";
import React from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Table from "../tables/stakeholderTable";
import { useState } from "react";
import NoDataAvailable from "../components/noDataAvailable";
import CreateStakeholderGroup from "./modals/createStakeholderGroup";
import { MdAdd } from "react-icons/md";

const StakeholderGroup = ({setStakeholderList,showStakeholderList}) => {
    const totalItems = 50; 
    const rowsPerPageOptions = [7, 10, 15]; // Rows-per-page options
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const data = Array(totalItems)
      .fill(null)
      .map((_, idx) => ({
        sno: idx + 1,
        groupName: "Supplier Assessment 2023",
        createdBy: "Homer Simpson",
        createdOn: "27/01/2023",
        type: "Type",
        organization:"ABC",
        corporate:"XYZ",
        noOfStakeholder:5
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
        { key: "groupName", label: "Group Name" },
        { key: "createdBy", label: "Created By" },
        { key: "createdOn", label: "Created On" },
        { key: "type", label: "Type" },
        { key: "organization", label: "Organization" },
        { key: "corporate", label: "Corporate" },
        { key: "noOfStakeholder", label: "No of Stakeholder" },
        { key: "actions", label: "Actions" },
      ];
  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-semibold text-[#101828]">
        Stakeholders Group
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
            <div className="flex gap-1">
                                 <MdAdd  className="w-4 h-4 mt-0.5" /> Create New Stakeholder Group
                                 </div>
          </button>
        </div>
      </div>
      <p className="text-[14px] text-[#667085] mb-6">
      List of stakeholders in this group. Add individual stakeholders from + Add New Stakeholder group  or import to add in bulk.
      </p>
    
{currentData.length>0?(
<div>
    {/* Table */}
    <Table columns={columns} currentData={currentData}  totalItems={totalItems}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={handlePageChange} />
</div>
):(
    <NoDataAvailable title="No Stakeholders Group Present" para="This stakeholder group is empty. Add new stakeholders by clicking on Add new stakeholders or Bulk import from CSV or Excel file." buttonText="Add Stakeholder Group" image="stakeholder"
    isStakeholderGroupOpen={isModalOpen} setIsStakeholderGroupOpen={setIsModalOpen}
    />
    // <div></div>
)}
     <CreateStakeholderGroup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setStakeholderList={setStakeholderList} showStakeholderList={showStakeholderList} />
    </div>
  );
};

export default StakeholderGroup;
