"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const OrgTree = ({ data }) => {
  const nodeWidth = 180;
  const nodeHeight = 60;
  const levelGap = 200;
  const siblingGap = 80;
  const [expandedLocations, setExpandedLocations] = useState(new Set());

  const transformData = (apiData) => {
    if (!apiData || apiData.length === 0) return null;

    const organizations = apiData.map((org) => ({
      id: org.name,
      name: org.name,
      type: "organization",
      info: `${org.sector || ""}, ${org.countryoperation || ""}`,
      children: org.corporatenetityorg?.filter(Boolean).map((entity) => ({
        id: entity.name,
        name: entity.name,
        type: "corporate",
        info: `${entity.sector || ""}, ${entity.Country || ""}`,
        locationCount: entity.location?.length || 0,
        children: entity.location?.filter(Boolean).map((loc) => ({
          id: loc.name,
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

          // if (expandedLocations.has(node.id)) {
          //   const childrenResult = calculateLayout(
          //     node.children.filter(Boolean),
          //     level + 1,
          //     y
          //   );
          //   results = results.concat(childrenResult);

          //   // Add location column headers after each location node
          //   childrenResult.forEach((locationNode) => {
          //     if (locationNode.type === "location") {
          //       results.push({
          //         id: `${locationNode.id}-spacer`,
          //         name: "",
          //         type: "location-spacer",
          //         parentId: node.id,
          //         x: locationNode.x + nodeWidth + levelGap,
          //         y: locationNode.y + nodeHeight / 2 - 15,
          //       });
          //     }
          //   });

          //   if (childrenResult.length > 0) {
          //     const lastChild = childrenResult[childrenResult.length - 1];
          //     currentY = lastChild.y;
          //   }
          // }
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
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  };

  const getNodeStyle = (type) => {
    switch (type) {
      case "organization":
        return {
          rect: "fill-white stroke-transparent hover:stroke-blue-600/60 stroke-[1.5] cursor-pointer",
          text: "text-[#007eef]",
        };
      case "corporate":
        return {
          rect: "fill-white stroke-transparent hover:stroke-green-600/60 stroke-[1.5] cursor-pointer",
          text: "text-[#007eef]",
        };
      case "location":
        return {
          rect: "fill-white stroke-transparent hover:stroke-purple-600/60 stroke-[1.5] cursor-pointer",
          text: "text-[#007eef]",
        };
      case "location-header":
      case "location-spacer":
        return {
          rect: "fill-none stroke-none",
          text: "text-purple-600",
        };
      default:
        return {
          rect: "fill-white stroke-transparent hover:stroke-gray-600 stroke-[1.5] fill-gray-600/60",
          text: "[color:#007eef]",
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

  return (
    <div className="w-full overflow-auto">
      <svg width={maxWidth} height={maxHeight} className="mx-auto">
        <g transform={`translate(50, 50)`}>
          {/* Connection lines */}
          {layoutNodes.map((node) => {
            if (node.type === "location-header") {
              const parentNode = layoutNodes.find(
                (n) => n.id === node.parentId
              );
              if (parentNode) {
                return (
                  <path
                    key={`${parentNode.id}-${node.id}`}
                    d={renderStraightLine(
                      parentNode.x + nodeWidth,
                      parentNode.y + nodeHeight / 2,
                      node.x - 10,
                      node.y + 15
                    )}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
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
                  node.locationCount !== 1 ? "s" : ""
                }`;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x},${node.y})`}
                    className="cursor-pointer"
                    onClick={(e) => toggleLocations(node.parentId, e)}
                  >
                    <g className="flex items-center">
                      <text
                        className={`text-sm font-medium ${style.text}`}
                        dominantBaseline="middle"
                      >
                        {displayText}
                      </text>
                      <g
                        transform={`translate(${
                          displayText.length * 7 + 10
                        }, -2)`}
                      >
                        {isExpanded ? (
                          <g>
                            <circle r="8" fill="#F3F4F6" />
                            <FaAngleUp className="w-4 h-4 text-purple-600" />
                          </g>
                        ) : (
                          <g>
                            <circle r="8" fill="#F3F4F6" />
                            <FaAngleDown className="w-4 h-4 text-purple-600" />
                          </g>
                        )}
                      </g>
                    </g>
                  </g>
                );
              } else {
                // Location spacer with collapse icon
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x},${node.y})`}
                    className="cursor-pointer"
                    onClick={(e) => toggleLocations(node.parentId, e)}
                  >
                    <g transform="translate(0, -2)">
                      <circle r="8" fill="#F3F4F6" />
                      <FaAngleUp className="w-4 h-4 text-purple-600" />
                    </g>
                  </g>
                );
              }
            }

            return (
              <g
                key={`${node.name}-${node.type}`}
                transform={`translate(${node.x},${node.y})`}
                className="transition-all duration-200"
              >
                <rect
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="4"
                  className={`${style.rect} stroke-[1.5] shadow-sm`}
                />
                <text
                  x={nodeWidth / 2}
                  y={nodeHeight / 2 - 8}
                  className={`text-sm font-medium ${style.text}`}
                  textAnchor="middle"
                  fill="#007eef"
                >
                  {node.name}
                </text>
                <text
                  x={nodeWidth / 2}
                  y={nodeHeight / 2 + 12}
                  className="text-xs text-gray-500"
                  textAnchor="middle"
                >
                  {node.info}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
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

  if (!orgData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading organization structure...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 p-8 rounded-lg">
      <OrgTree data={orgData} />
    </div>
  );
};

export default OrganizationTreePage;
