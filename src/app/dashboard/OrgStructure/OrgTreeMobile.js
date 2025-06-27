"use client";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";
import QuickAddModal from "./QuickAddModal";
import NodeDetailModal from "./NodeDetailModal";
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

  // 🔹 Modal states
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

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

  // 🔹 Handle node click for details modal
  const handleNodeClick = (node, org = null, entity = null) => {
    let nodeData = {};

    if (node?.location) {
      // Clicked on full org or corp object (not location)
      nodeData = {
        ...node,
        type: node.location ? "corporate" : "organization",
        organization: { name: org?.name || node.name, id: org?.id || node.id },
        corporate: org ? node.name : null,
      };
    } else if (org && entity) {
      // Location clicked
      nodeData = {
        ...node,
        type: "location",
        organization: { name: org.name, id: org.id },
        corporate: entity.name,
      };
    } else {
      nodeData = {
        ...node,
        type: "organization",
        organization: { name: node.name, id: node.id },
        corporate: null,
      };
    }

    setSelectedNode(nodeData);
    setIsModalOpen(true);
    setActiveNode(node.id);
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // const totalOrganizations = data.length;
  // const corporateCount = org.corporatenetityorg?.length || 0;
  // const locationCount = org.corporatenetityorg?.reduce(
  //   (sum, corp) => sum + (corp.location?.length || 0),
  //   0
  // );
  return (
    <>
      {/* Top Add Buttons */}
      <div className="flex mt-8 mb-4 gap-2 justify-center">
        {isAdmin && (
          <>
            <Link
              href="/dashboard/OrgStructure/forms/Organization"
              className="text-sky-600 text-xs font-bold leading-[15px] flex items-center justify-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all rounded-md"
            >
              <FaPlus className="mr-2" size={12} />
              Add Organization
            </Link>
            <Link
              href="/dashboard/OrgStructure/forms/Entity"
              className="text-sky-600 text-xs font-bold leading-[15px] flex items-center justify-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all rounded-md"
            >
              <FaPlus className="mr-2" size={12} />
              Add Corporate
            </Link>
            <Link
              href="/dashboard/OrgStructure/forms/Location"
              className="text-sky-600 text-xs font-bold leading-[15px] flex items-center justify-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all rounded-md"
            >
              <FaPlus className="mr-2" size={12} />
              Add Location
            </Link>
          </>
        )}
      </div>

      <div className="py-4 px-2">
        <div className="space-y-6">
          {paginatedData.map((org) => {
            const isExpanded = expandedOrgId === org.id;
            const corporateCount = org.corporatenetityorg?.length || 0;
            const locationCount = org.corporatenetityorg?.reduce(
              (sum, corp) => sum + (corp.location?.length || 0),
              0
            );
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
                    <div
                      className="text-base font-semibold text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNodeClick(org);
                      }}
                    >
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

                {/* Add buttons if org not expanded */}
                {!isExpanded && isAdmin && (
                  <div className="px-4 pb-3 flex flex-wrap gap-3">
                    <p className="text-sm">
                      {" "}
                      Total Corporates: <strong>{corporateCount}</strong>
                    </p>{" "}
                    <p className="text-sm">
                      {" "}
                      Total Locations: <strong>{locationCount}</strong>
                    </p>
                    {/* Total Locations: <strong>{totalLocations}</strong> */}
                    {/* <button
                      onClick={() =>
                        handleQuickAdd("corporate", { id: org.id, name: org.name })
                      }
                      className="text-sm text-blue-600 flex items-center hover:underline"
                    >
                      <FaPlus className="mr-1" /> Add Corporate
                    </button> */}
                    {/* <button
                      onClick={() => handleQuickAdd("organization", null)}
                      className="text-sm text-blue-600 flex items-center hover:underline"
                    >
                      <FaPlus className="mr-1" /> Add Organization
                    </button> */}
                  </div>
                )}

                {/* Corporate cards */}
                {isExpanded && (
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
                              <div className="flex-1 ">
                                <div
                                  className="text-sm font-medium text-blue-500 w-[200px]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNodeClick(entity, org); // send corporate and org
                                  }}
                                >
                                  {entity.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {entity.sector}, {entity.Country}
                                </div>
                              </div>

                              {isAdmin && (
                                <div className="flex flex-row gap-2 items-end">
                                  {/* <button
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
                                  </button> */}
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
                                      className="pl-4 border-l-4 border-blue-200 bg-white p-2 rounded cursor-pointer"
                                      onClick={() =>
                                        handleNodeClick(loc, org, entity)
                                      }
                                    >
                                      <div
                                        className="text-sm font-medium text-blue-400"
                                        onClick={() =>
                                          handleNodeClick(loc, org, entity)
                                        }
                                      >
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

        {/* Modals */}
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

        <NodeDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          nodeData={selectedNode}
          nodeType={selectedNode?.type}
          rawData={data}
          setActiveNode={setActiveNode}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
};

export default OrgTreeMobile;
