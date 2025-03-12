//new code
"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { FaPlus } from "react-icons/fa";
import QuickAddModal from "./QuickAddModal";
import NodeDetailModal from "./NodeDetailModal";
import Link from "next/link";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";

const OrgTree = ({ data }) => {
  const nodeWidth = 180;
  const nodeHeight = 60;
  const levelGap = 200;
  const siblingGap = 80;
  const [expandedLocations, setExpandedLocations] = useState(new Set());
  // Add new state for modal
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axiosInstance.get("/api/auth/get_user_roles/");
        
        if (response.status === 200) {
          const data = await response.data;
          console.log("Fetched user role:", data);
          setIsAdmin(data.admin);
        } else {
          console.error("Failed to fetch user role");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserRole();
  }, []);

  // Add handleNodeClick function
  const handleNodeClick = (node) => {
    const nodeData = {
      ...node,
      organization: findOrganization(node),
      corporate: node.type === "location" ? findCorporate(node) : null,
    };
    setSelectedNode(nodeData);
    setIsModalOpen(true);
    setActiveNode(node.id); // Set active node when clicked
  };

  // Helper functions to find parent nodes
  const findOrganization = (node) => {
    if (node.type === "organization") return node.name;
    const org = transformedData.find((org) =>
      org.children?.some(
        (child) =>
          child.name === node.name ||
          child.children?.some((loc) => loc.name === node.name)
      )
    );
    return org?.name;
  };

  const findCorporate = (node) => {
    if (node.type === "corporate") return node.name;
    const org = transformedData.find((org) =>
      org.children?.some((corp) =>
        corp.children?.some((loc) => loc.name === node.name)
      )
    );
    const corp = org?.children?.find((corp) =>
      corp.children?.some((loc) => loc.name === node.name)
    );
    return corp?.name;
  };

  const transformData = (apiData) => {
    if (!apiData || apiData.length === 0) return null;

    const organizations = apiData.map((org) => ({
      id: org.id,
      name: org.name,
      type: "organization",
      info: `${org.sector || ""}, ${org.countryoperation || ""}`,
      children: org.corporatenetityorg?.filter(Boolean).map((entity) => ({
        id: entity.id,
        name: entity.name,
        type: "corporate",
        info: `${entity.sector || ""}, ${entity.Country || ""}`,
        locationCount: entity.location?.length || 0,
        children: entity.location?.filter(Boolean).map((loc) => ({
          id: loc.id,
          name: loc.name,
          type: "location",
          info: `${loc.typelocation || "Head office"}`,
        })),
      })),
    }));

    return organizations;
  };

  const calculateLayout = (nodes, level = 0, startY = 0) => {
    if (!nodes || !Array.isArray(nodes) || nodes.length === 0) return [];

    let results = [];
    let currentY = startY;

    nodes.forEach((node, index) => {
      if (!node) return;

      if (index > 0) {
        currentY += siblingGap;
      }

      const x = level * (nodeWidth + levelGap);
      const y = currentY;

      results.push({
        ...node,
        x,
        y,
        width: nodeWidth,
        height: nodeHeight,
      });

      if (node.type !== "location" && node.children?.length > 0) {
        if (node.type === "corporate") {
          results.push({
            id: `${node.id}-locations`,
            name: `${node.locationCount} Locations`,
            type: "location-header",
            parentId: node.id,
            x: x + nodeWidth + levelGap,
            y: y + nodeHeight / 2 - 15,
            locationCount: node.locationCount,
            children: node.children,
          });

          if (expandedLocations.has(node.id)) {
            const childrenResult = calculateLayout(
              node.children.filter(Boolean),
              level + 1,
              y
            );
            results = results.concat(childrenResult);

            // Add location column headers after each location node
            childrenResult.forEach((locationNode) => {
              if (locationNode.type === "location") {
                results.push({
                  id: `${locationNode.id}-spacer`,
                  name: "",
                  type: "location-spacer",
                  parentId: node.id,
                  x: locationNode.x + nodeWidth + levelGap,
                  y: locationNode.y + nodeHeight / 2 - 15,
                });
              }
            });

            if (childrenResult.length > 0) {
              const lastChild = childrenResult[childrenResult.length - 1];
              currentY = lastChild.y;
            }
          }
        } else {
          const childrenResult = calculateLayout(
            node.children.filter(Boolean),
            level + 1,
            y
          );
          results = results.concat(childrenResult);

          if (childrenResult.length > 0) {
            const lastChild = childrenResult[childrenResult.length - 1];
            currentY = lastChild.y;
          }
        }
      }

      currentY += nodeHeight;
    });

    return results;
  };

  const renderCurvedLine = (startX, startY, endX, endY) => {
    const midX = (startX + endX) / 2;
    return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
  };

  const renderStraightLine = (startX, startY, endX, endY) => {
    return {
      d: `M ${startX} ${startY} L ${endX} ${endY}`,
      strokeDasharray: "4,4",
    };
  };

  const getNodeStyle = (type) => {
    switch (type) {
      case "organization":
        return {
          rect: "fill-white stroke-transparent hover:fill-white hover:drop-shadow-lg",
          text: "text-[#007eef]",
          group: "cursor-pointer",
        };
      case "corporate":
        return {
          rect: "fill-white stroke-transparent hover:fill-white hover:drop-shadow-lg",
          text: "text-[#007eef]",
          group: "cursor-pointer",
        };
      case "location":
        return {
          rect: "fill-white stroke-transparent hover:fill-white hover:drop-shadow-lg",
          text: "text-[#007eef]",
          group: "cursor-pointer",
        };
      case "location-header":
        return {
          // rect: "fill-white stroke-transparent hover:stroke-purple-600/60 stroke-[1.5]",
          text: "text-[#007eef]",
          group: "cursor-pointer",
        };
      case "location-spacer":
        return {
          rect: "fill-none stroke-none",
          text: "text-purple-600",
          group: "",
        };
      default:
        return {
          rect: "fill-white stroke-transparent hover:stroke-gray-600 stroke-[1.5] fill-gray-600/60",
          text: "[color:#007eef]",
          group: "cursor-pointer",
        };
    }
  };

  const toggleLocations = (corporateId, event) => {
    event.stopPropagation();
    setExpandedLocations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(corporateId)) {
        newSet.delete(corporateId);
      } else {
        newSet.add(corporateId);
      }
      return newSet;
    });
  };

  const transformedData = transformData(data);
  const layoutNodes = transformedData ? calculateLayout(transformedData) : [];

  const maxWidth =
    layoutNodes.length > 0
      ? Math.max(...layoutNodes.map((node) => node.x)) + nodeWidth + 100
      : 300;
  const maxHeight =
    layoutNodes.length > 0
      ? Math.max(...layoutNodes.map((node) => node.y)) + nodeHeight + 100
      : 200;

  // Quick add
  const [hoveredNode, setHoveredNode] = useState(null);
  const [quickAddModal, setQuickAddModal] = useState({
    isOpen: false,
    type: null,
    parentNode: null,
  });

  // Update handleQuickAdd function
  const handleQuickAdd = (e, type, node, isSibling = false) => {
    e.stopPropagation();

    if (type === "corporate") {
      // For adding corporate entities, find and set organization as parent
      const organizationName = findOrganization(node);
      setQuickAddModal({
        isOpen: true,
        type,
        parentNode: {
          // ...node,
          name: organizationName,
        },
      });
    } else if (type === "location") {
      // For adding locations, use findCorporate to get the corporate entity parent
      const corporateEntity = transformedData
        .find((org) =>
          org.children?.some((corp) => corp.name === findCorporate(node))
        )
        ?.children?.find((corp) => corp.name === findCorporate(node));

      const organizationName = findOrganization(node);

      setQuickAddModal({
        isOpen: true,
        type,
        parentNode: {
          ...corporateEntity, // Use corporate entity as parent
          organization: organizationName,
        },
      });
    } else {
      setQuickAddModal({
        isOpen: true,
        type,
        parentNode: node,
      });
    }
  };

  // Add buttons for navigation aligned with hierarchy
  const AddButtons = () => (
    <div className="flex mt-8 mb-4" style={{ marginLeft: "50px" }}>
      {isAdmin && (
        <>
          <div style={{ width: nodeWidth, marginRight: levelGap }}>
            <Link
              href="/dashboard/OrgStructure/forms/Organization"
              className="text-sky-600 text-xs font-bold leading-[15px] flex items-center justify-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all w-full rounded-md"
            >
              <FaPlus className="mr-2" size={12} />
              Add Organization
            </Link>
          </div>
          <div style={{ width: nodeWidth, marginRight: levelGap }}>
            <Link
              href="/dashboard/OrgStructure/forms/Entity"
              className="text-sky-600 text-xs font-bold leading-[15px] flex items-center justify-center border border-sky-600 py-2 px-4 hover:text-white hover:bg-sky-600 transition-all w-full rounded-md"
            >
              <FaPlus className="mr-2" size={12} />
              Add Corporate
            </Link>
          </div>
          <div style={{ width: nodeWidth }}>
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
  );

  const MAX_NODE_TEXT_LENGTH = 20;
  const MAX_INFO_TEXT_LENGTH = 25;

  const TruncatedNodeContent = ({
    name,
    info,
    nodeWidth,
    nodeHeight,
    activeNodeId,
    nodeId,
  }) => {
    const isNameTruncated = name.length > MAX_NODE_TEXT_LENGTH;
    const isInfoTruncated = info.length > MAX_INFO_TEXT_LENGTH;
    const shouldShowTooltip = isNameTruncated || isInfoTruncated;

    const truncatedName = isNameTruncated
      ? `${name.substring(0, MAX_NODE_TEXT_LENGTH)}...`
      : name;
    const truncatedInfo = isInfoTruncated
      ? `${info.substring(0, MAX_INFO_TEXT_LENGTH)}...`
      : info;

    return (
      <g pointerEvents="none">
        {/* Base text that's always visible - Left aligned */}
        <text
          x={10}
          y={nodeHeight / 2 - 8}
          className={`
            text-sm 
            font-medium 
            fill-[#007eef]
            ${activeNodeId === nodeId ? "fill-[#0056a3]" : ""}
          `}
          dominantBaseline="middle"
        >
          {truncatedName}
        </text>
        <text
          x={10}
          y={nodeHeight / 2 + 12}
          className={`
            text-xs 
            fill-gray-500
            ${activeNodeId === nodeId ? "fill-gray-700" : ""}
          `}
          dominantBaseline="middle"
        >
          {truncatedInfo}
        </text>
        {/* Tooltip - Positioned on top */}
        {shouldShowTooltip && (
          <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Background rectangle */}
            <rect
              x={nodeWidth / 2 - Math.max(name.length, info.length) * 4} // Center horizontally
              y={-55} // Position above the node
              width={Math.max(name.length, info.length) * 8}
              height="50"
              rx="4"
              className="fill-white drop-shadow-lg border border-gray-300"
            />
            {/* Full name text */}
            <text
              x={nodeWidth / 2} // Center horizontally
              y={-35} // Position in top part of tooltip
              className="text-xs fill-gray-700 font-medium"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {name}
            </text>
            {/* Full info text */}
            <text
              x={nodeWidth / 2} // Center horizontally
              y={-15} // Position below name in tooltip
              className="text-xs fill-gray-500"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {info}
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="w-full overflow-auto">
      <AddButtons />
      <svg width={maxWidth} height={maxHeight} className="ml-0 pt-2">
        <g transform={`translate(50, 50)`}>
          {/* Connection lines */}
          {layoutNodes.map((node) => {
            if (node.type === "location-header") {
              const parentNode = layoutNodes.find(
                (n) => n.id === node.parentId && n.type === "corporate"
              );
              if (parentNode) {
                const linePath = renderStraightLine(
                  parentNode.x + nodeWidth,
                  parentNode.y + nodeHeight / 2,
                  node.x,
                  node.y + 15
                );
                return (
                  <path
                    key={`${parentNode.id}-${node.id}`}
                    d={linePath.d}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    strokeDasharray={linePath.strokeDasharray}
                  />
                );
              }
            }

            if (node.children) {
              if (node.type === "corporate") {
                if (expandedLocations.has(node.id)) {
                  return node.children.map((child, index) => {
                    const childNode = layoutNodes.find(
                      (n) =>
                        n.name === child.name && n.type !== "location-header"
                    );
                    if (childNode) {
                      return (
                        <path
                          key={`${node.name}-${child.name}-${index}`}
                          d={renderCurvedLine(
                            node.x + nodeWidth,
                            node.y + nodeHeight / 2,
                            childNode.x,
                            childNode.y + nodeHeight / 2
                          )}
                          fill="none"
                          stroke="#CBD5E1"
                          strokeWidth="1.5"
                        />
                      );
                    }
                    return null;
                  });
                }
              } else if (node.type === "organization") {
                return node.children.map((child, index) => {
                  const childNode = layoutNodes.find(
                    (n) => n.name === child.name && n.type !== "location-header"
                  );
                  if (childNode) {
                    return (
                      <path
                        key={`${node.name}-${child.name}-${index}`}
                        d={renderCurvedLine(
                          node.x + nodeWidth,
                          node.y + nodeHeight / 2,
                          childNode.x,
                          childNode.y + nodeHeight / 2
                        )}
                        fill="none"
                        stroke="#CBD5E1"
                        strokeWidth="1.5"
                      />
                    );
                  }
                  return null;
                });
              }
            }
            return null;
          })}

          {/* Nodes */}
          {layoutNodes.map((node) => {
            const style = getNodeStyle(node.type);
            const isLocationHeader = node.type === "location-header";
            const isLocationSpacer = node.type === "location-spacer";
            const isExpanded = expandedLocations.has(node.parentId);

            if (isLocationHeader || isLocationSpacer) {
              if (isLocationHeader) {
                const displayText = `${node.locationCount} Location${
                  node.locationCount !== 1 ? "s" : " "
                }`;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x + 55},${node.y + 12})`}
                    className="cursor-pointer"
                    onClick={(e) => toggleLocations(node.parentId, e)}
                  >
                    <g className="flex items-center ml-2">
                      <text
                        className={`text-sm font-medium ${style.text}`}
                        dominantBaseline="middle"
                        fill="#007eef"
                      >
                        {displayText}
                      </text>
                      <g
                        transform={`translate(${
                          displayText.length * 12 + 10
                        }, 0)`}
                      >
                        {isExpanded ? (
                          <g transform="translate(0, 0)">
                            <circle r="8" fill="#F3F4F6" />
                            {/* Use SVG path instead of FA icon for better control */}
                            <path
                              d="M4 8 L8 4 L12 8"
                              stroke="#6B7280"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              transform="translate(-8, -8)"
                            />
                          </g>
                        ) : (
                          <g transform="translate(0, 0)">
                            <circle r="8" fill="#F3F4F6" />
                            {/* Use SVG path instead of FA icon for better control */}
                            <path
                              d="M4 4 L8 8 L12 4"
                              stroke="#6B7280"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              transform="translate(-8, -8)"
                            />
                          </g>
                        )}
                      </g>
                    </g>
                  </g>
                );
              } else {
                return "";
              }
            }

            return (
              <g
                key={`${node.name}-${node.type}`}
                transform={`translate(${node.x},${node.y})`}
                className={`transition-all duration-200 ${style.group} group cursor-pointer`}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Shadow effect rect */}
                <rect
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="4"
                  className={`
                  fill-transparent 
                  transition-opacity 
                  duration-200
                  ${
                    activeNode === node.id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }
                `}
                  filter="drop-shadow(0 10px 15px rgb(0 0 0 / 0.1)) drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))"
                />

                {/* Background rect with active state */}
                <rect
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="4"
                  className={`
                  ${style.rect} 
                  stroke-[1.5] 
                  transition-all
                  duration-200
                  ${
                    activeNode === node.id
                      ? "stroke-[#007eef] !stroke-2"
                      : "stroke-transparent"
                  }
                  ${activeNode === node.id ? "drop-shadow-lg" : ""}
                `}
                />

                {/* Node Content */}
                <TruncatedNodeContent
                  name={node.name}
                  info={node.info}
                  nodeWidth={nodeWidth}
                  nodeHeight={nodeHeight}
                  activeNodeId={activeNode}
                  nodeId={node.id}
                />
                {/* Quick Add Buttons - Outside the node */}
                {isAdmin && hoveredNode === node.id && (
                  <>
                    {/* Right Quick Add Button (for children) */}
                    {(node.type === "organization" ||
                      node.type === "corporate") && (
                      <g
                        transform={`translate(${nodeWidth + 10}, ${
                          nodeHeight / 2
                        })`}
                        className="cursor-pointer"
                        onClick={(e) =>
                          handleQuickAdd(
                            e,
                            node.type === "organization"
                              ? "corporate"
                              : "location",
                            node,
                            false
                          )
                        }
                      >
                        <g className="group/add-right">
                          {" "}
                          <g className="opacity-0 group-hover/add-right:opacity-100 transition-opacity duration-200">
                            <rect
                              x="-65"
                              y="-45"
                              width="130"
                              height="28"
                              rx="4"
                              className="fill-white"
                              filter="drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))"
                            />
                            <text
                              x="0"
                              y="-31"
                              fontSize="11"
                              fill="#4B5563"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="font-medium"
                            >
                              Quick Add{" "}
                              {node.type === "organization"
                                ? "Corporate"
                                : "Location"}
                            </text>
                          </g>
                          {/* Button Circle with Hover Effect */}
                          <circle
                            r="10"
                            className="transition-all duration-200 fill-white stroke-[#007eef] group-hover/add-right:fill-[#007eef]"
                            strokeWidth="1"
                            filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))"
                          />
                          {/* Plus Icon with Hover Effect */}
                          <line
                            x1="-4"
                            y1="0"
                            x2="4"
                            y2="0"
                            className="transition-all duration-200 stroke-[#007eef] group-hover/add-right:stroke-white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="0"
                            y1="-4"
                            x2="0"
                            y2="4"
                            className="transition-all duration-200 stroke-[#007eef] group-hover/add-right:stroke-white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </g>
                      </g>
                    )}

                    {/* Bottom Quick Add Button (for siblings) */}
                    <g
                      transform={`translate(${nodeWidth / 2}, ${
                        nodeHeight + 10
                      })`}
                      className="cursor-pointer"
                      onClick={(e) => handleQuickAdd(e, node.type, node, true)}
                    >
                      <g className="group/add-bottom">
                        {" "}
                        ={" "}
                        <g className="opacity-0 group-hover/add-bottom:opacity-100 transition-opacity duration-200">
                          <rect
                            x="10"
                            y="-14"
                            width="130"
                            height="28"
                            rx="4"
                            className="fill-white"
                            filter="drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))"
                          />
                          <text
                            x="75"
                            y="0"
                            fontSize="11"
                            fill="#4B5563"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="font-medium"
                          >
                            Quick Add{" "}
                            {node.type.charAt(0).toUpperCase() +
                              node.type.slice(1)}
                          </text>
                        </g>
                        {/* Button Circle with Hover Effect */}
                        <circle
                          r="10"
                          className="transition-all duration-200 fill-white stroke-[#007eef] group-hover/add-bottom:fill-[#007eef]"
                          strokeWidth="1"
                          filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))"
                        />
                        {/* Plus Icon with Hover Effect */}
                        <line
                          x1="-4"
                          y1="0"
                          x2="4"
                          y2="0"
                          className="transition-all duration-200 stroke-[#007eef] group-hover/add-bottom:stroke-white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="0"
                          y1="-4"
                          x2="0"
                          y2="4"
                          className="transition-all duration-200 stroke-[#007eef] group-hover/add-bottom:stroke-white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </g>
                    </g>
                  </>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      <NodeDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nodeData={selectedNode}
        nodeType={selectedNode?.type}
        rawData={data}
        setActiveNode={setActiveNode}
        isAdmin={isAdmin}
      />
      {isAdmin && (
        <QuickAddModal
          isOpen={quickAddModal.isOpen}
          onClose={() =>
            setQuickAddModal({ isOpen: false, type: null, parentNode: null })
          }
          type={quickAddModal.type}
          parentNode={quickAddModal.parentNode}
        />
      )}
    </div>
  );
};

const OrganizationTreePage = () => {
  const [orgData, setOrgData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.BACKEND_API_URL}/structure`
        );
        setOrgData(response.data);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeadertext1("Organization Structure"));
    dispatch(setHeaderdisplay(null));
    dispatch(setHeadertext2(null));
    dispatch(setMiddlename(null));
  }, [dispatch]);

  if (!orgData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading organization structure...</div>
      </div>
    );
  }

  return (
    <div className="w-full p-8 rounded-lg">
      <div className="text-[22px] font-medium font-['Manrope'] leading-relaxed gradient-text pb-6">
        Organization Structure
      </div>
      <hr className="mb-4" />
      <div className="mb-8">
        <div className="mb-2">
          <h1 className="text-xl">Organization Hierarchy</h1>
        </div>
        <div className="text-gray-600">
          Click on any Organization, Corporate or Location to view the details
          about them.
        </div>
      </div>
      <OrgTree data={orgData} />
    </div>
  );
};

export default OrganizationTreePage;