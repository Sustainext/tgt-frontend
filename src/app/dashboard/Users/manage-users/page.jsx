"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MdOutlineAddCircleOutline,
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
  MdFiberManualRecord,
  MdPerson,
  MdRemoveCircleOutline,
  MdOutlineVisibility,
  MdKeyboardArrowDown,
  MdSearch,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import UserProfile from "../common/UserProfile";
import { useRouter } from "next/navigation";
import {
  deleteUser,
  updateUserStatus,
  setCurrentUser,
} from "../../../../lib/redux/features/userSlice";
import ConfirmationModal from "../common/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../../lib/redux/features/topheaderSlice";

const ManageUsers = () => {
  const allUsers = useSelector((state) => state.users.users);
  const [searchFocus, setSearchFocus] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToModify, setUserToModify] = useState(null);
  const currentUser = useSelector((state) => state.users.currentUser);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeadertext1("Users"));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("Manage Users"));
  }, [dispatch]);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.personalDetails.firstName
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase()) ||
      user.personalDetails.lastName
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase()) ||
      user.personalDetails.email
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  const handleViewProfile = (user) => {
    setSelectedUser(user);
  };

  const handleCloseProfile = () => {
    setSelectedUser(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesPerPageChange = (value) => {
    setEntriesPerPage(Number(value));
    setCurrentPage(1);
    setShowEntriesDropdown(false);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleEditUser = (user) => {
    dispatch(setCurrentUser(user));
    router.push(`/dashboard/Users/create-new-users/?edit=true`);
  };

  const handleToggleUserStatus = (user) => {
    if (user.personalDetails?.status === "Active") {
      setUserToModify(user);
      setIsDeactivateModalOpen(true);
    } else {
      const newStatus = "Active";
      dispatch(
        updateUserStatus({
          userId: user.personalDetails.id,
          status: newStatus,
        })
      );
      toast.success(
        `User details for ${user.personalDetails.firstName} ${user.personalDetails.lastName} have been activated`
      );
    }
  };

  const confirmDeactivateUser = () => {
    const newStatus = "Inactive";
    dispatch(
      updateUserStatus({
        userId: userToModify.personalDetails.id,
        status: newStatus,
      })
    );
    setIsDeactivateModalOpen(false);
    toast.warn(
      `User details for ${userToModify.personalDetails.firstName} ${userToModify.personalDetails.lastName} have been deactivated`
    );
    setUserToModify(null);
  };

  const handleDeleteUser = (user) => {
    setUserToModify(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    dispatch(deleteUser(userToModify.personalDetails.id));
    setIsDeleteModalOpen(false);
    toast.error(
      `User account "${userToModify.personalDetails.firstName} ${userToModify.personalDetails.lastName}" has been deleted`
    );
    setUserToModify(null);
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full px-6 py-2 border-b border-[#edeae9] flex justify-between items-center">
        <h2 className="text-[22px] font-medium font-['Manrope'] py-2">Users</h2>
      </div>
      <div className="flex justify-between items-start mt-8 mb-4">
        <div
          className={`rounded-lg mx-8 transition-all ${
            selectedUser ? "w-full" : "w-full"
          } h-full`}
        >
          <div className="container  p-4">
            <div className="overflow-x-auto border-x border-y border-[#edeae9] rounded-lg px-20 py-10">
              <div className="py-4">
                <div className="flex justify-between ">
                  <div className="flex">
                    <div className="px-4">
                      <h3 className="text-[18px] font-medium font-['Manrope']">
                        Users
                      </h3>
                      <p className="text-[14px] font-normal font-['Manrope'] text-[#667084]">
                        List of users in the organization
                      </p>
                    </div>
                  </div>
                  <div className="relative w-[320px] pr-4">
                    <input
                      type="text"
                      placeholder="Search"
                      className="pr-3 pl-6 py-2 border rounded-md w-full focus:outline-none placeholder:pl-8 text-[12px]"
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() => setSearchFocus(false)}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      value={searchTerm}
                      style={{
                        transition: "padding-left 300ms",
                        paddingLeft: searchFocus ? "1rem" : "0.625rem",
                      }}
                    />
                    <MdSearch
                      className="absolute left-0 top-1/2 -translate-y-1/2"
                      style={{
                        transition: "left 300ms",
                        left: searchFocus || searchTerm ? "17rem" : "0.625rem",
                        top: "1.3rem",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="max-h-[80vh] overflow-y-auto ">
                <table className="min-w-full table-auto relative">
                  {/* Table Head */}
                  <thead className="bg-white sticky  top-0">
                    {" "}
                    {/* z-index higher value */}
                    <tr className="gradient-background">
                      <th className="px-5 py-3 text-left text-[14px] font-semibold tracking-wider w-[40%] ">
                        User List
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold tracking-wider text-center w-[15%]">
                        Role
                      </th>
                      <th className="px-5 py-3 text-center text-[14px] font-semibold tracking-wider w-[15%]">
                        Status
                      </th>
                      <th className="px-5 py-3 text-center text-[14px] font-semibold tracking-wider w-[20%]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody  >
                    {currentUsers.map((user, index) => (
                      <tr key={index} className="border-b h-[80px]">
                        <td className="px-5 bg-white text-[14px] w-[40%]">
                          <div className="flex items-center">
                            <MdPerson className="text-gray-500 text-[18px]" />
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap font-[500]">
                                {user.personalDetails.firstName}{" "}
                                {user.personalDetails.lastName}
                              </p>
                              <p className="text-gray-600 whitespace-no-wrap">
                                {user.personalDetails.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 bg-white text-[14px] text-center text-gray-500">
                          {user.personalDetails.roleType}
                        </td>
                        <td className="px-5 bg-white text-[14px]  ">
                          <div className="flex justify-center items-center">
                          <div
                            className={`w-[90px] flex py-1 px-1 font-semibold justify-center items-center ${
                              user.personalDetails.status === "Active"
                                ? "text-green-700 bg-green-100"
                                : "text-gray-700 bg-gray-200"
                            } rounded-full`}
                          >
                            <MdFiberManualRecord
                              className={`text-[10px] mt-1 ${
                                user.personalDetails.status === "Active"
                                  ? "me-3"
                                  : "me-2"
                              }`}
                            />
                            {user.personalDetails.status}
                          </div>
                          </div>
                        
                        </td>
                        <td className="px-5 bg-white text-[14px] ">
                          <div className="flex justify-center ">
                          <div className="flex justify-center w-[60%]">
                            <button
                              className="text-gray-600 hover:text-gray-800 w-[25%] flex justify-center"
                              onClick={() => handleViewProfile(user)}
                            >
                              <MdOutlineVisibility className="text-[18px]" />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-800 w-[25%] flex justify-center"
                              onClick={() => handleEditUser(user)}
                            >
                              <MdOutlineModeEdit className="text-[18px]" />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-800 w-[25%] flex justify-center"
                              onClick={() => handleToggleUserStatus(user)}
                            >
                              {user.personalDetails.status === "Active" ? (
                                <MdRemoveCircleOutline className="text-[18px]" />
                              ) : (
                                <MdOutlineAddCircleOutline className="text-[18px]" />
                              )}
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-800 w-[25%] flex justify-center"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <MdOutlineDeleteOutline className="text-[18px]" />
                            </button>
                          </div>
                          </div>
                        
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Table Footer */}
                  <tfoot className="bg-white sticky bottom-0 z-50">
                    {" "}
                    {/* Higher z-index for footer */}
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="px-4 text-[14px] flex justify-center w-full py-3">
                          <div>
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-white"
                            >
                              <MdChevronLeft fontSize="small" />
                            </button>
                            {renderPageNumbers()}
                            <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="p-1 rounded-full text-gray-600 hover:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-white"
                            >
                              <MdChevronRight fontSize="small" />
                            </button>
                          </div>
                          <div className="relative">
                            <button
                              className="border rounded-md px-3 py-1 flex items-center justify-between min-w-[120px] text-[12px]"
                              onClick={() =>
                                setShowEntriesDropdown(!showEntriesDropdown)
                              }
                            >
                              <span>{entriesPerPage} per page</span>
                              <MdKeyboardArrowDown fontSize="small" />
                            </button>
                            {showEntriesDropdown && (
                              <div className="absolute bottom-[100%] right-0 bg-white border rounded mb-1 shadow-sm w-full text-[12px] z-[100]">
                                {[5, 10, 15, 20].map((value) => (
                                  <button
                                    key={value}
                                    className="block w-full text-left px-3 py-1.5 hover:bg-gray-100"
                                    onClick={() =>
                                      handleEntriesPerPageChange(value)
                                    }
                                  >
                                    {value} per page
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {selectedUser && (
          <div className="w-[35%] max-h-[95vh] min-h-[95vh] rounded-lg shadow-lg max-w-md">
            <UserProfile user={selectedUser} onClose={handleCloseProfile} />
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={confirmDeactivateUser}
        message="Are you sure you want to deactivate this user"
        userName={
          userToModify
            ? `${userToModify.personalDetails.firstName} ${userToModify.personalDetails.lastName}`
            : ""
        }
        confirmText="Deactivate User"
        confirmColor="text-yellow-500"
        confirmHoverColor="text-yellow-500"
        buttoncolor="bg-yellow-500"
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteUser}
        message="Are you sure you want to delete this user? This action is irreversible."
        userName={
          userToModify
            ? `${userToModify.personalDetails.firstName} ${userToModify.personalDetails.lastName}`
            : ""
        }
        confirmText="Delete"
        confirmColor="text-red-600"
        confirmHoverColor="text-red-700"
        buttoncolor="bg-red-600"
      />
    </>
  );
};

export default ManageUsers;
