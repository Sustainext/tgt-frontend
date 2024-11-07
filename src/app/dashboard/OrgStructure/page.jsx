"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  FaAngleRight,
  FaAngleDown,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import axiosInstance from "../../utils/axiosMiddleware";

const OrganizationNameBox = React.forwardRef(
  ({ name, subtitle, type, quickAdd, className = "" }, ref) => {
    const nameRef = useRef(null);

    return (
      <div ref={ref} className={`relative flex flex-col ${className}`}>
        <div className="flex items-center gap-2">
          <span ref={nameRef} className="text-[14px] font-medium relative">
            {name}
            {/* Debug dot to show text end */}
            <span className="absolute w-2 h-2 bg-red-500 rounded-full -right-5 top-1/2 transform -translate-y-1/2" />
          </span>
          {quickAdd && (
            <button className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
              +
            </button>
          )}
        </div>
        <span className="text-[12px] text-gray-500">{subtitle}</span>
      </div>
    );
  }
);

OrganizationNameBox.displayName = "OrganizationNameBox";

const CorporateBox = React.forwardRef(
  ({ name, subtitle, className = "" }, ref) => {
    const nameRef = useRef(null);

    return (
      <div ref={ref} className={`relative flex flex-col ${className}`}>
        <div className="flex items-center gap-2">
          <span ref={nameRef} className="text-[14px] font-medium relative">
            {/* Start dot */}
            <span className="absolute w-2 h-2 bg-green-500 rounded-full -left-5 top-1/2 transform -translate-y-1/2" />
            {name}
            {/* End dot */}
            <span className="absolute w-2 h-2 bg-red-500 rounded-full -right-5 top-1/2 transform -translate-y-1/2" />
          </span>
        </div>
        <span className="text-[12px] text-gray-500">{subtitle}</span>
      </div>
    );
  }
);

const LocationsList = ({ locations, className = "", expanded, onToggle }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle?.();
  };

  return (
    <div className={`text-sm ${className}`}>
      {!expanded ? (
        <div
          className="border-2 border-dotted border-blue-200 rounded p-4 cursor-pointer min-h-[60px] flex flex-col justify-center"
          onClick={handleClick}
        >
          <div className="flex flex-col">
            <span className="text-blue-500">
              No of locations: {locations.length}
            </span>
            <div className="flex items-center gap-1 text-gray-400">
              <FaAngleRight size={12} />
              <span className="text-xs">Click to view all</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1 relative mb-4"
            >
              <div className="flex items-center">
                <span className="absolute w-2 h-2 bg-green-500 rounded-full -left-5 top-1/2 transform -translate-y-1/2" />
                <span className="text-blue-500">Location</span>
                <span className="ml-2 text-gray-600">{location.name}</span>
              </div>
              <div className="flex gap-1 text-gray-400">
                <FaEye className="cursor-pointer hover:text-gray-600" />
                <FaEdit className="cursor-pointer hover:text-gray-600" />
                <FaTrashAlt className="cursor-pointer hover:text-gray-600" />
              </div>
            </div>
          ))}
          <div
            className="text-gray-400 text-xs cursor-pointer flex items-center gap-1 mt-2"
            onClick={handleClick}
          >
            <FaAngleDown size={12} />
            Collapse
          </div>
        </div>
      )}
    </div>
  );
};

const Structure = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const [isNewRole, setIsNewRole] = useState(false);
  const [linePositions, setLinePositions] = useState([]);
  const [expandedLocations, setExpandedLocations] = useState(new Set());
  const containerRef = useRef(null);
  const orgRefs = useRef(new Map());
  const corpRefs = useRef(new Map());

  useLayoutEffect(() => {
    const calculateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines = [];

      organizationData.forEach((org) => {
        const orgRef = orgRefs.current.get(org.id);
        if (!orgRef?.current) return;

        const orgRect = orgRef.current.getBoundingClientRect();
        const startX = orgRect.right - containerRect.left + 30;
        const startY = orgRect.top + orgRect.height / 2 - containerRect.top;

        org.corporatenetityorg?.forEach((corp) => {
          const corpRef = corpRefs.current.get(corp.id);
          if (!corpRef?.current) return;

          const corpRect = corpRef.current.getBoundingClientRect();
          const endX = corpRect.left - containerRect.left;
          const endY = corpRect.top + corpRect.height / 2 - containerRect.top;

          newLines.push({
            id: `${org.id}-${corp.id}`,
            startX,
            startY,
            endX,
            endY,
          });
        });
      });

      setLinePositions(newLines);
    };

    // Calculate after mount and data load
    setTimeout(calculateLines, 0);

    window.addEventListener("resize", calculateLines);
    return () => window.removeEventListener("resize", calculateLines);
  }, [organizationData]);

  useEffect(() => {
    fetchHierarchy();
    const storedRole = localStorage.getItem("custom_role");
    setIsNewRole(storedRole === "true");
  }, []);

  const fetchHierarchy = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/structure`
      );
      setOrganizationData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const toggleLocation = (corpId) => {
    setExpandedLocations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(corpId)) {
        newSet.delete(corpId);
      } else {
        newSet.add(corpId);
      }
      return newSet;
    });
  };

  const getShiftAmount = (org, currentIndex) => {
    let totalShift = 0;
    return totalShift;
  };

  return (
    <div className="p-8">
      <div ref={containerRef} className="relative min-h-screen">
        {organizationData.map((org) => (
          <div key={org.id} className="mb-16">
            <div className="grid grid-cols-[300px_300px_1fr] gap-6">
              {/* Organization Column */}
              <div className="relative">
                <OrganizationNameBox
                  ref={(el) => orgRefs.current.set(org.id, el)}
                  name={org.name}
                  subtitle={`${org.subindustry}, ${org.countryoperation}`}
                  quickAdd={true}
                />
              </div>

              {/* Corporate and Locations Columns Container */}
              <div className="col-span-2">
                {org.corporatenetityorg?.map((corp, index) => (
                  <div
                    key={corp.id}
                    className="relative grid grid-cols-2 gap-6"
                    style={{
                      marginTop: index === 0 ? "0" : "20px",
                      marginBottom: expandedLocations.has(corp.id)
                        ? `10px`
                        : "0",
                      transform: `translateY(${getShiftAmount(org, index)}px)`,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    {/* Corporate Box */}
                    <div>
                      <CorporateBox
                        ref={(el) => corpRefs.current.set(corp.id, el)}
                        name={corp.name}
                        subtitle={`${corp.subindustry}, ${corp.Country}`}
                      />
                    </div>

                    {/* Locations List */}
                    <div>
                      <LocationsList
                        locations={corp.location || []}
                        expanded={expandedLocations.has(corp.id)}
                        onToggle={() => toggleLocation(corp.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* SVG for lines */}
        {linePositions.length > 0 && (
          <svg
            className="absolute top-0 left-0 w-full h-full"
            style={{
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {linePositions.map((line) => (
              <g key={line.id}>
                <circle cx={line.startX} cy={line.startY} r="4" fill="red" />
                <circle cx={line.endX} cy={line.endY} r="4" fill="green" />
                <path
                  d={`M ${line.startX} ${line.startY} 
                      C ${(line.startX + line.endX) / 2} ${line.startY},
                        ${(line.startX + line.endX) / 2} ${line.endY},
                        ${line.endX} ${line.endY}`}
                  stroke="blue"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
};

export default Structure;
