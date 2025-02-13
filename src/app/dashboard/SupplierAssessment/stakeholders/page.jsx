"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NoDataAvailable from "../components/noDataAvailable";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import StakeHolderListTable from '../tables/stakeholderListTable'
import DeleteModal from './modals/deleteStakeholder'
import { AiOutlineUpload } from "react-icons/ai";
import UploadFileModal from './modals/uploadModal'
import CreateStakeholder from './modals/createNewStakeholder'

const StakeholderPage = ({setStakeholderList,showStakeholderList,setActiveTab}) => {
  const router =useRouter()
  const totalItems = 50; 
      const rowsPerPageOptions = [7, 10, 15]; // Rows-per-page options
      const [currentPage, setCurrentPage] = useState(1);
      const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
      const [deleteDisabled,setDeleteDisabled] = useState(true)
      const [selectedRows, setSelectedRows] = useState([]);
    
      const data = Array(totalItems)
        .fill(null)
        .map((_, idx) => ({
          sno: idx + 1,
          stakeholderName: "Himanshu",
          email: "CB@unitedfeaturesyndicate.com",
          location: "Delhi",
          spoc: "Bruce Wayne",
          created_last_editedBy:"Homer Simpson",
          created_last_editedOn:"27/01/2023",
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
          { key: "stakeholderName", label: "Stakeholder Name" },
          { key: "email", label: "Email Address" },
          { key: "location", label: "Location" },
          { key: "spoc", label: "SPOC" },
          { key: "created_last_editedBy", label: "Created / Last Edited By" },
          { key: "created_last_editedOn", label: "Created / Last Edited on" },
          { key: "actions", label: "Actions" },
        ];
  return (
    <>
      <div>
        <div className="flex flex-col justify-start overflow-x-hidden ">
          <div className="flex justify-between items-center border-b border-gray-200 mb-2 w-full">
            <div className="w-full">
              <div className=" flex justify-between text-left mb-2 ml-2 pt-1">
                <div className="flex">
                  <div>
                    <p className="gradient-text text-[22px] font-bold pt-4  ml-2">
                     Engine Group
                    </p>
                    <p className="mt-2 text-[#667085] text-[13px] ml-2">
                      Organization / Corporate: Org A / Corp A
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStakeholderList(false)
                    setActiveTab("tab3")
                    // router.push('/dashboard/SupplierAssessment');
                  }}
                  className="bg-transparent text-[#344054] text-[13px] font-medium px-3 h-12 mt-2.5  rounded-md border border-gray-400"
                >
                  {"<"} Back to Stakeholders group
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 min-h-screen">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-[20px] font-semibold text-[#101828]">
              Stakeholders List
            </h1>
            <div className="relative flex gap-4">
              <button
              onClick={()=>{setIsUploadModalOpen(true)}}
                type="button"
                className="bg-transparent flex gap-2 font-medium text-[#344054] text-[14px] px-4 py-2 rounded-md border border-gray-300"
              >
                Import <AiOutlineUpload className="mt-0.5 w-4 h-4"/>
              </button>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="bg-[#007EEF] flex gap-1 text-white px-4 py-2 text-[14px] rounded-md hover:bg-blue-600"
              >
                <MdAdd className="mt-0.5 w-4 h-4"/> Add New Stakeholder
              </button>
            </div>
          </div>
          <p className="text-[14px] text-[#667085] mb-6">
            List of stakeholders in this group. Add individual stakeholders from
            + Add New Stakeholder group or import to add in bulk.
          </p>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={()=>{setIsDeleteModalOpen(true)}}
              disabled={deleteDisabled}
              className={`bg-transparent ${deleteDisabled?'opacity-30':'cursor-pointer'} font-medium text-[#344054] text-[14px] px-4 py-2 rounded-md border border-gray-500`}
            >
              Delete Selected items
            </button>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 min-w-[25vw] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                // value={searchQuery}
                // onChange={handleSearch}
              />
            </div>
          </div>

          {currentData.length>0?(
    <div className="mt-5">
     <StakeHolderListTable columns={columns} currentData={currentData}  totalItems={totalItems} selectedRows={selectedRows} setSelectedRows={setSelectedRows}
        rowsPerPageOptions={rowsPerPageOptions} setDeleteDisabled={setDeleteDisabled} deleteDisabled={deleteDisabled}
        onPageChange={handlePageChange} />
    </div>
):(
  <div className="mt-3">
    <NoDataAvailable title="No Stakeholders Present" para="This stakeholder group is empty. Add new stakeholders by clicking on Add new stakeholders or Bulk import from CSV or Excel file." buttonText="Add New Stakeholder" image="stakeholder" 
    
    isStakeholderOpen={isModalOpen} setIsStakeholderOpen={setIsModalOpen}
    />
    <div className="flex justify-center align-center">
      <button className="text-[16px] text-[#007EEF] font-semibold flex">
        Import Frome a List <MdAdd className=" mt-0.5 ml-1 w-5 h-5"/>
      </button>
    </div>
  </div>
    
)}
        </div>
      </div>

      <DeleteModal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} selectedRows={selectedRows.length} />
      <UploadFileModal isModalOpen={isUploadModalOpen} setIsModalOpen={setIsUploadModalOpen} />
      <CreateStakeholder isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default StakeholderPage;
