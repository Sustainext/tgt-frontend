"use client";
import React, { useEffect,useRef } from "react";
import { Oval } from "react-loader-spinner";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Table from "../tables/stakeholderTable";
import { useState } from "react";
import NoDataAvailable from "../components/noDataAvailable";
import CreateStakeholderGroup from "./modals/createStakeholderGroup";
import { MdAdd } from "react-icons/md";
import axiosInstance from "../../../utils/axiosMiddleware";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StakeholderGroup = ({setStakeholderList,showStakeholderList}) => {
    const [totalItems,setTotalItems] = useState(0); 
    const rowsPerPageOptions = [7, 10, 15]; // Rows-per-page options
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stakeholderGroupData,setStakeholderGroupData]=useState([])
    const [loopen, setLoOpen] = useState(false);
    const prevIsModalOpen = useRef(null);
    const [refresh,setRefresh]=useState(false)

    const LoaderOpen = () => {
        setLoOpen(true);
      };
    
      const LoaderClose = () => {
        setLoOpen(false);
      };
  
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
      function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0'); // Ensures two-digit day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    }

      const getStakeholderGroup= async()=>{
        LoaderOpen()
        try{
            const response = await axiosInstance.get(`/supplier_assessment/stakeholder-group/`);
            if(response.status==200){
                LoaderClose()
                setTotalItems(response.data.results.length)
                const data =response.data.results
                .map((val, idx) => ({
                  sno: idx + 1,
                  groupId:val.id,
                  groupName: val.name ,
                  createdBy: val.created_by_name,
                  createdOn: formatDate(val.created_at),
                  type: val.group_type,
                  organization: val.organization_name,
                  organization_id:val.organization,
                  corporate_ids:val.corporate_entity,
                  corporate: val.corporate_names,
                  noOfStakeholder:val.stakeholder_count
                }));
            
              const currentData = data.slice(
                (currentPage - 1) * rowsPerPage,
                currentPage * rowsPerPage
              );
              setStakeholderGroupData(currentData)
            }
        }
        catch(e){
            LoaderClose()
            console.error(e)
        }
      }

    //   useEffect(() => {
    //     if (prevIsModalOpen.current === null || (prevIsModalOpen.current === true && isModalOpen === false)) {
    //         getStakeholderGroup();
    //     }
    
    //     prevIsModalOpen.current = isModalOpen;
    // }, [isModalOpen]);

    useEffect(()=>{
        getStakeholderGroup();
    },[refresh])
  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-semibold text-[#101828]">
        Stakeholder Groups
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
    
{stakeholderGroupData.length>0?(
<div>
    {/* Table */}
    <Table columns={columns} currentData={stakeholderGroupData}  totalItems={totalItems}
        rowsPerPageOptions={rowsPerPageOptions} refresh={refresh} setRefresh={setRefresh}
        onPageChange={handlePageChange} />
</div>
):(
    <div>
        {loopen?(
        <div></div>
    ):(
        <NoDataAvailable title="No Stakeholders Group Present" para="This stakeholder group is empty. Add new stakeholders by clicking on Add new stakeholders or Bulk import from CSV or Excel file." buttonText="Add Stakeholder Group" image="stakeholder"
    isStakeholderGroupOpen={isModalOpen} setIsStakeholderGroupOpen={setIsModalOpen}
    />
    
    )}
    </div>
    
    
)}
     <CreateStakeholderGroup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setStakeholderList={setStakeholderList} showStakeholderList={showStakeholderList} refresh={refresh} setRefresh={setRefresh} />

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
    </div>
  );
};

export default StakeholderGroup;
