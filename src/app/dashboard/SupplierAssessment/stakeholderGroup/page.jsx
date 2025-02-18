"use client";
import React, { useEffect, useState, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { FiSearch } from "react-icons/fi";
import Table from "../tables/stakeholderTable";
import NoDataAvailable from "../components/noDataAvailable";
import CreateStakeholderGroup from "./modals/createStakeholderGroup";
import { MdAdd } from "react-icons/md";
import axiosInstance from "../../../utils/axiosMiddleware";
import { debounce } from "lodash";

const StakeholderGroup = ({ setStakeholderList, showStakeholderList,groupId,setGroupId }) => {
    const [totalItems, setTotalItems] = useState(0);
    const rowsPerPageOptions = [7, 10, 15]; // Rows-per-page options
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stakeholderGroupData, setStakeholderGroupData] = useState([]);
    const [loopen, setLoOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setselectedUsers] = useState([]);

    const LoaderOpen = () => setLoOpen(true);
    const LoaderClose = () => setLoOpen(false);

    // Format date from ISO to DD/MM/YYYY
    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Fetch data from the backend with pagination parameters
    const getStakeholderGroup = async () => {
        LoaderOpen();
        try {
            const userFilter = selectedUsers.length > 0 ? selectedUsers.join(",") : "";
            const response = await axiosInstance.get(`/supplier_assessment/stakeholder-group/`, {
                params : {
                    page_size: rowsPerPage,
                    ...(userFilter ? { created_by__email_in: userFilter } : { page: currentPage })
                }
            });
            if (response.status === 200) {
                LoaderClose();
                setTotalItems(response.data.count);
                const data = response.data.results.map((val, idx) => ({
                    sno: (currentPage - 1) * rowsPerPage + idx + 1,
                    groupId: val.id,
                    groupName: val.name,
                    createdBy: val.created_by_email,
                    createdOn: formatDate(val.created_at),
                    type: val.group_type,
                    createdBy_name:val.created_by_name,
                    organization: val.organization_name,
                    organization_id: val.organization,
                    corporate_ids: val.corporate_entity,
                    corporate: val.corporate_names,
                    noOfStakeholder: val.stakeholder_count
                }));
                setStakeholderGroupData(data);
            }
        } catch (error) {
            LoaderClose();
            console.error("Error fetching stakeholder groups:", error);
        }
        finally{
            LoaderClose()
        }
    };

    // Trigger data fetch when page/rows/refresh changes
    useEffect(() => {
        if(searchQuery==""){
            getStakeholderGroup();
        }
    }, [currentPage, rowsPerPage, refresh,searchQuery,selectedUsers]);

    // Handle page change
    const handlePageChange = (page, rows) => {
        setCurrentPage(page);
        setRowsPerPage(rows);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value); 
        };
      
        useEffect(() => {
        const debouncedFetch = debounce(async () => {
          try {
            const response = await axiosInstance.get(`/supplier_assessment/stakeholder-group/`, {
                params: {
                    page: currentPage,
                    page_size: rowsPerPage,
                    search:searchQuery
                }
            })
            if (response.status === 200) {
                setTotalItems(response.data.count);
                const data = response.data.results.map((val, idx) => ({
                    sno: (currentPage - 1) * rowsPerPage + idx + 1,
                    groupId: val.id,
                    groupName: val.name,
                    createdBy: val.created_by_email,
                    createdOn: formatDate(val.created_at),
                    type: val.group_type,
                    createdBy_name:val.created_by_name,
                    organization: val.organization_name,
                    organization_id: val.organization,
                    corporate_ids: val.corporate_entity,
                    corporate: val.corporate_names,
                    noOfStakeholder: val.stakeholder_count
                }));
                setStakeholderGroupData(data);
            }
           
          } catch (error) {
            console.error("Error fetching tasks:", error);
          }
        }, 400);
    
        // Only for search, use debounce
        if (searchQuery) {
          debouncedFetch();
        }
         else {
          // For non-search triggers (tab change, pagination), fetch immediately
          debouncedFetch.flush();
        }
        // debouncedFetch();
    
        return () => debouncedFetch.cancel();
      }, [searchQuery, currentPage, rowsPerPage]);
    

    const columns = [
        { key: "sno", label: "Sno" },
        { key: "groupName", label: "Group Name" },
        { key: "createdBy", label: "Created / Last Edited By" },
        { key: "createdOn", label: "Created / Last Edited on" },
        { key: "type", label: "Type" },
        { key: "organization", label: "Organization" },
        { key: "corporate", label: "Corporate" },
        { key: "noOfStakeholder", label: "No of Stakeholder" },
        { key: "actions", label: "Actions" },
    ];

    return (
        <div className="p-4 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-[20px] font-semibold text-[#101828]">Stakeholder Groups</h1>
                <div className="relative flex gap-4">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 min-w-[25vw] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#007EEF] text-white px-4 py-2 text-[13px] rounded-md hover:bg-blue-600"
                    >
                        <div className="flex gap-1">
                            <MdAdd className="w-4 h-4 mt-0.5" /> Create New Stakeholder Group
                        </div>
                    </button>
                </div>
            </div>
            <p className="text-[14px] text-[#667085] mb-6">
                List of stakeholders in this group. Add individual stakeholders from + Add New Stakeholder group or import to add in bulk.
            </p>

            {stakeholderGroupData.length > 0 ? (
                <div>
                    <Table
                        columns={columns}
                        currentData={stakeholderGroupData}
                        totalItems={totalItems}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={rowsPerPageOptions}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        onPageChange={handlePageChange}
                        selectedUsers={selectedUsers}
                        setselectedUsers={setselectedUsers}
                        setStakeholderList={setStakeholderList}
                        groupId={groupId}
                        setGroupId={setGroupId}
                    />
                </div>
            ) : (
                <div>
                    {loopen ? (
                        <div></div>
                    ) : (
                        <NoDataAvailable
                            title="No Stakeholders Group Present"
                            para="This stakeholder group is empty. Add new stakeholders by clicking on Add new stakeholders or Bulk import from CSV or Excel file."
                            buttonText="Add Stakeholder Group"
                            image="stakeholder"
                            isStakeholderGroupOpen={isModalOpen}
                            setIsStakeholderGroupOpen={setIsModalOpen}
                        />
                    )}
                </div>
            )}

            <CreateStakeholderGroup
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setStakeholderList={setStakeholderList}
                showStakeholderList={showStakeholderList}
                refresh={refresh}
                setRefresh={setRefresh}
            />

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
