"use client";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";
import QuickAddModal from "./QuickAddModal";
import axiosInstance from "@/app/utils/axiosMiddleware";
import Link from "next/link";
const OrgTreeMobile = ({ data }) => {
  const [expandedOrgId, setExpandedOrgId] = useState(null);
  const [expandedEntityId, setExpandedEntityId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [quickAddModal, setQuickAddModal] = useState({
    isOpen: false,
    type: null,
    parentNode: null,
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axiosInstance.get("/api/auth/get_user_roles/");
        if (response.status === 200) {
          setIsAdmin(response.data.admin);
        }
      } catch (err) {
        console.error("Failed to fetch user role", err);
      }
    };

    fetchUserRole();
  }, []);

  const handleOrgToggle = (orgId) => {
    setExpandedOrgId((prev) => (prev === orgId ? null : orgId));
    setExpandedEntityId(null);
  };

  const handleEntityToggle = (entityId) => {
    setExpandedEntityId((prev) => (prev === entityId ? null : entityId));
  };

  const handleQuickAdd = (type, parentNode) => {
    setQuickAddModal({
      isOpen: true,
      type,
      parentNode,
    });
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
    <div className="flex mt-8 mb-4 gap-2 justify-center">
    {isAdmin && (
      <>
        <div >
          <Link
            href="/dashboard/OrgStructure/forms/Organization"
            className="text-sky-600 text-xs font-bold leading-[15px] flex items-center justify-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all w-full rounded-md"
          >
            <FaPlus className="mr-2" size={12} />
            Add Organization
          </Link>
        </div>
        <div >
          <Link
            href="/dashboard/OrgStructure/forms/Entity"
            className="text-sky-600 text-xs font-bold leading-[15px] flex items-center justify-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all w-full rounded-md"
          >
            <FaPlus className="mr-2" size={12} />
            Add Corporate
          </Link>
        </div>
        <div >
          <Link
            href="/dashboard/OrgStructure/forms/Location"
            className="text-sky-600 text-xs font-bold leading-[15px] flex items-center justify-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all w-full rounded-md"
          >
            <FaPlus className="mr-2" size={12} />
            Add Location
          </Link>
        </div>
      </>
    )}
  </div>
    <div className="py-4 px-2">
      <div className="space-y-6">
        {paginatedData.map((org) => {
          const isExpanded = expandedOrgId === org.id;

          return (
            
            <div
              key={org.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
              {/* Org Header */}
              <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => handleOrgToggle(org.id)}
              >
                <div>
                  <div className="text-base font-semibold text-blue-600">
                    {org.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {org.sector}, {org.countryoperation}
                  </div>
                </div>
                <span className="text-blue-600 text-sm">
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {/* Show Add Org/Corp only when collapsed */}
              {!isExpanded && isAdmin && (
                <div className="px-4 pb-3 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      handleQuickAdd("corporate", { id: org.id, name: org.name })
                    }
                    className="text-sm text-blue-600 flex items-center hover:underline"
                  >
                    <FaPlus className="mr-1" /> Add Corporate
                  </button>
                  <button
                    onClick={() => handleQuickAdd("organization", null)}
                    className="text-sm text-blue-600 flex items-center hover:underline"
                  >
                    <FaPlus className="mr-1" /> Add Organization
                  </button>
                </div>
              )}

              {/* Corporates */}
              {isExpanded && isAdmin &&  (
                <div className="max-h-96 overflow-y-auto px-4 pb-4">
                  {org.corporatenetityorg?.length > 0 ? (
                    org.corporatenetityorg.map((entity) => {
                      const isEntityExpanded = expandedEntityId === entity.id;

                      return (
                        <div
                          key={entity.id}
                          className="bg-gray-50 my-2 p-4 rounded-lg shadow-sm border border-gray-200"
                        >
                          {/* Corporate Header */}
                          <div
                            className="flex justify-between items-start gap-x-2 cursor-pointer"
                            onClick={() => handleEntityToggle(entity.id)}
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium text-blue-500">
                                {entity.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {entity.sector}, {entity.Country}
                              </div>
                            </div>

                            {isAdmin && (
                              <div className="flex flex-row gap-2 items-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAdd("corporate", {
                                      id: org.id,
                                      name: org.name,
                                    });
                                  }}
                                  className="text-xs text-blue-600 flex items-center hover:underline"
                                >
                                  <FaPlus className="mr-1" /> Add Corporate
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAdd("location", {
                                      ...entity,
                                      organization: org.name,
                                    });
                                  }}
                                  className="text-xs text-blue-600 flex items-center hover:underline"
                                >
                                  <FaPlus className="mr-1" /> Add Location
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Locations */}
                          {isEntityExpanded ? (
                            entity.location?.length > 0 ? (
                              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto pr-2">
                                {entity.location.map((loc) => (
                                  <div
                                    key={loc.id}
                                    className="pl-4 border-l-4 border-blue-200 bg-white p-2 rounded"
                                  >
                                    <div className="text-sm font-medium text-blue-400">
                                      {loc.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {loc.typelocation || "Head Office"}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="mt-2 text-xs text-gray-400 italic text-center">
                                No locations available.
                              </div>
                            )
                          ) : null}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-sm text-gray-400 italic mt-2 text-center">
                      No corporate data available.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 px-2 text-sm text-gray-600">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isAdmin && (
        <QuickAddModal
          isOpen={quickAddModal.isOpen}
          onClose={() =>
            setQuickAddModal({ isOpen: false, type: null, parentNode: null })
          }
          type={quickAddModal.type}
          parentName={quickAddModal.parentNode}
        />
      )}
    </div>
    </>
  );
};

export default OrgTreeMobile;
