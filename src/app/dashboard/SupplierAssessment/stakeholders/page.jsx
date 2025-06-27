"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NoDataAvailable from "../components/noDataAvailable";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import StakeHolderListTable from "../tables/stakeholderListTable";
import DeleteModal from "./modals/deleteStakeholder";
import { AiOutlineUpload } from "react-icons/ai";
import UploadFileModal from "./modals/uploadModal";
import CreateStakeholder from "./modals/createNewStakeholder";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../utils/axiosMiddleware";
import { debounce } from "lodash";

const StakeholderPage = ({
  setStakeholderList,
  showStakeholderList,
  setActiveTab,
  groupId,
}) => {
  const router = useRouter();
  const [totalItems, setTotalItems] = useState(0);
  const rowsPerPageOptions = [7, 10, 15]; // Rows-per-page options
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loopen, setLoOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setselectedUsers] = useState([]);
  const [stakeholderListData, setStakeholderListData] = useState([]);

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);


  // Format date from ISO to DD/MM/YYYY
  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Fetch data from the backend with pagination parameters
  const getStakeholderList = async () => {
    LoaderOpen();
    try {
      const userFilter = selectedUsers.length > 0 ? selectedUsers.join(",") : "";
      const response = await axiosInstance.get(
        `/supplier_assessment/stakeholder/`,
        {
          params: {
            page_size: rowsPerPage,
            group_id:groupId.id,
            ...(userFilter ? { oldest_email: userFilter } : { page: currentPage })
          },
        }
      );
      if (response.status === 200) {
        LoaderClose();
        setTotalItems(response.data.count);
        const data = response.data.results.map((val, idx) => ({
            sno: (currentPage - 1) * rowsPerPage + idx + 1,
            stakeholderName: val.name,
            email: val.email,
            id:BigInt(val.id),
            location: val.city,
            spoc: val.poc,
            created_last_editedBy:[{email:val.oldest_email,name:val.oldest_name},{email:val.latest_email,name:val.latest_name}],
            created_last_editedOn:[formatDate(val.created_at),formatDate(val.updated_at)],
        }));
        setStakeholderListData(data);
      }
    } catch (error) {
      LoaderClose();
      console.error("Error fetching stakeholder groups:", error);
    } finally {
      LoaderClose();
    }
  };

  // Trigger data fetch when page/rows/refresh changes
  useEffect(() => {
    if (searchQuery == "") {
      getStakeholderList();
    }
  }, [currentPage, rowsPerPage, refresh, searchQuery, selectedUsers]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  
    useEffect(() => {
    const debouncedFetch = debounce(async () => {
      try {
        const response = await axiosInstance.get(`/supplier_assessment/stakeholder/`, {
            params: {
                page: currentPage,
                page_size: rowsPerPage,
                search:searchQuery,
                group_id:groupId.id,
            }
        })
        if (response.status === 200) {
          setTotalItems(response.data.count);
          const data = response.data.results.map((val, idx) => ({
              sno: (currentPage - 1) * rowsPerPage + idx + 1,
              stakeholderName: val.name,
              email: val.email,
              id:BigInt(val.id),
              location: val.city,
              spoc: val.poc,
              created_last_editedBy:[{email:val.oldest_email,name:val.oldest_name},{email:val.latest_email,name:val.latest_name}],
              created_last_editedOn:[formatDate(val.created_at),formatDate(val.updated_at)],
          }));
          setStakeholderListData(data);
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

  
  const handlePageChange = (page, rows) => {
    setCurrentPage(page);
    setRowsPerPage(rows);
  };
  const columns = [
    { key: "sno", label: "Sno" },
    { key: "stakeholderName", label: "Stakeholder Name" },
    { key: "email", label: "Email Address" },
    { key: "location", label: "Stakeholder Location" },
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
              <div className="xl:flex lg:flex 2xl:flex 4k:flex justify-between text-left mb-2 ml-2 pt-1">
                <div className="xl:flex lg:flex 2xl:flex 4k:flex">
                  <div>
                    <p className="gradient-text text-[22px] font-bold pt-4  ml-2">
                      {groupId?.name}
                    </p>
                    <p className="mt-2 text-[#667085] text-[13px] ml-2">
                      Organization {groupId?.corporate ? "/ Corporate" : ""}:{" "}
                      {groupId?.organization}{" "}
                      {groupId?.corporate?.length > 0
                        ? "/ " + groupId?.corporate.join(", ")
                        : ""}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStakeholderList(false);
                    setActiveTab("tab3");
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
          <div className="xl:flex lg:flex 2xl:flex 4k:flex justify-between items-center mb-2">
            <h1 className="text-[20px] font-semibold text-[#101828]">
              Stakeholders List
            </h1>
            <div className="relative flex gap-4">
              <button
                onClick={() => {
                  setIsUploadModalOpen(true);
                }}
                type="button"
                className="bg-transparent flex gap-2 font-medium text-[#344054] text-[14px] px-4 py-2 rounded-md border border-gray-300 xl:w-[100px] w-[170px] justify-center"
              >
                Import <AiOutlineUpload className="mt-0.5 w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="bg-[#007EEF] flex gap-1 text-white px-4 py-2 text-[14px] rounded-md hover:bg-blue-600"
              >
                <MdAdd className="mt-0.5 w-4 h-4" /> Add New Stakeholder
              </button>
            </div>
          </div>
          <p className="text-[14px] text-[#667085] mb-6">
            List of stakeholders in this group. Add individual stakeholders from
            + Add New Stakeholder or import to add in bulk.
          </p>
          <div className="xl:flex lg:flex 2xl:flex 4k:flex justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
              disabled={deleteDisabled}
              className={`bg-transparent ${
                deleteDisabled ? "opacity-30" : "cursor-pointer"
              } font-medium text-[#344054] text-[14px] px-4 py-2 rounded-md border border-gray-500 mb-2 xl:mb-0`}
            >
              Delete Selected items
            </button>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 xl:min-w-[25vw] min-w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {stakeholderListData.length > 0 ? (
            <div className="mt-5">
              <StakeHolderListTable
                columns={columns}
                currentData={stakeholderListData}
                totalItems={totalItems}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                rowsPerPageOptions={rowsPerPageOptions}
                setDeleteDisabled={setDeleteDisabled}
                deleteDisabled={deleteDisabled}
                setRefresh={setRefresh}
                refresh={refresh}
                onPageChange={handlePageChange}
                selectedUsers={selectedUsers}
                setselectedUsers={setselectedUsers}
                groupId={groupId}
              />
            </div>
          ) : (
            <div>
              {loopen?(
                <div></div>
              ):(
                <div className="mt-3">
              <NoDataAvailable
                title="No Stakeholders Present"
                para="This stakeholder group is empty. Add new stakeholders by clicking on Add new stakeholders or Bulk import from CSV or Excel file."
                buttonText="Add New Stakeholder"
                image="stakeholder"
                isStakeholderOpen={isModalOpen}
                setIsStakeholderOpen={setIsModalOpen}
              />
              <div className="flex justify-center align-center">
                <button onClick={() => {
                  setIsUploadModalOpen(true);
                }} className="text-[16px] text-[#007EEF] font-semibold flex">
                  Import From a List <MdAdd className=" mt-0.5 ml-1 w-5 h-5" />
                </button>
              </div>
            </div>
              )}
            </div>
            
          )}
        </div>
      </div>

      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        selectedRows={selectedRows.length}
        setRefresh={setRefresh}
        setDeleteDisabled={setDeleteDisabled}
        bulkDelete={selectedRows}
      />
      <UploadFileModal
        isModalOpen={isUploadModalOpen}
        setIsModalOpen={setIsUploadModalOpen}
        setRefresh={setRefresh}
        groupId={groupId}
      />
      <CreateStakeholder
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        groupId={groupId}
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
    </>
  );
};

export default StakeholderPage;
