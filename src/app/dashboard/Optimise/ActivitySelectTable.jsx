import React, { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiCheck,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { LuChevronsUpDown } from "react-icons/lu";
import { debounce } from "lodash";

const ActivitySelectTable = ({selectedActivities, setSelectedActivities}) => {
  // Main states
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
    
  // Sorting states
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScopes, setSelectedScopes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  // Filter dropdowns states
  const [isScopeFilterOpen, setIsScopeFilterOpen] = useState(false);
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isSubCategoryFilterOpen, setIsSubCategoryFilterOpen] = useState(false);
  const [isRegionFilterOpen, setIsRegionFilterOpen] = useState(false);

  // Refs for filter dropdowns
  const scopeFilterRef = useRef(null);
  const categoryFilterRef = useRef(null);
  const subCategoryFilterRef = useRef(null);
  const regionFilterRef = useRef(null);

  // Sample data
  const scopeOptions = ["Scope 1", "Scope 2", "Scope 3"];
  const categoryOptions = [
    "Mobile Combustion",
    "Stationary Combustion",
    "Refrigerants and Fugitive Gases",
  ];
  const subCategoryOptions = [
    "Fuel",
    "Rail Freight",
    "Refrigerants and Fugitive Gases",
  ];
  const regionOptions = ["US", "RU", "IN", "GB"];

  // Sample data for activities
  const sampleActivities = [
    {
      id: 1,
      scope: "Scope 1",
      category: "Mobile Combustion",
      subCategory: "Fuel",
      activity:
        "Agricultural byproducts - EPA - Energy - US - 2024 - biogenic_co2_combustion",
      region: "US",
    },
    {
      id: 2,
      scope: "Scope 1",
      category: "Mobile Combustion",
      subCategory: "Rail Freight",
      activity:
        "Rail freight - EPA - WeightOverDistance - GB - 2024 - fuel_combustion",
      region: "US",
    },
    {
      id: 3,
      scope: "Scope 1",
      category: "Mobile Combustion",
      subCategory: "Rail Freight",
      activity:
        "Rail freight - EPA - WeightOverDistance - GB - 2024 - fuel_combustion",
      region: "US",
    },
    {
      id: 4,
      scope: "Scope 1",
      category: "Refrigerants and Fugitive Gases",
      subCategory: "Refrigerants and Fugitive Gases",
      activity:
        "Agricultural byproducts - EPA - Energy - US - 2024 - biogenic_co2_combustion",
      region: "RU",
    },
    {
      id: 5,
      scope: "Scope 1",
      category: "Stationary Combustion",
      subCategory: "Fuel",
      activity:
        "Motor vehicles/trailers and semi-trailers - EXIOBASE - Money - RU - 2019 - unknown",
      region: "RU",
    },
    {
      id: 6,
      scope: "Scope 1",
      category: "Stationary Combustion",
      subCategory: "Fuel",
      activity:
        "Motor vehicles/trailers and semi-trailers - EXIOBASE - Money - RU - 2019 - unknown",
      region: "IN",
    },
    {
      id: 7,
      scope: "Scope 1",
      category: "Stationary Combustion",
      subCategory: "Fuel",
      activity:
        "Motor vehicles/trailers and semi-trailers - EXIOBASE - Money - RU - 2019 - unknown",
      region: "IN",
    },
  ];

  // Fetch activities
  const fetchActivities = () => {
    setIsLoading(true);
    try {
      // Simulate an API call with the sample data
      let filteredActivities = [...sampleActivities];

      // Apply search filter
      if (searchQuery) {
        filteredActivities = filteredActivities.filter((activity) =>
          activity.activity.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply scope filter
      if (selectedScopes.length > 0) {
        filteredActivities = filteredActivities.filter((activity) =>
          selectedScopes.includes(activity.scope)
        );
      }

      // Apply category filter
      if (selectedCategories.length > 0) {
        filteredActivities = filteredActivities.filter((activity) =>
          selectedCategories.includes(activity.category)
        );
      }

      // Apply subCategory filter
      if (selectedSubCategories.length > 0) {
        filteredActivities = filteredActivities.filter((activity) =>
          selectedSubCategories.includes(activity.subCategory)
        );
      }

      // Apply region filter
      if (selectedRegions.length > 0) {
        filteredActivities = filteredActivities.filter((activity) =>
          selectedRegions.includes(activity.region)
        );
      }
      
      // Apply sorting if a sort column is specified
      if (sortColumn) {
        filteredActivities.sort((a, b) => {
          let valueA = a[sortColumn];
          let valueB = b[sortColumn];
          
          // Handle string case-insensitive comparison
          if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
          }
          
          if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
          if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      setCount(filteredActivities.length);

      // Simulate pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedActivities = filteredActivities.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      setActivities(paginatedActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // COMPLETELY NEW SELECTION LOGIC
  // Toggle selection of an activity
  const toggleActivitySelection = (activity) => {
    setSelectedActivities(prevSelected => {
      // Check if activity is already selected
      const isSelected = prevSelected.some(item => item.id === activity.id);
      
      if (isSelected) {
        // Remove from selected list
        return prevSelected.filter(item => item.id !== activity.id);
      } else {
        // Add to selected list
        return [...prevSelected, activity];
      }
    });
  };

  // Check if an activity is selected
  const isSelected = (activityId) => {
    return selectedActivities.some(activity => activity.id === activityId);
  };

  // Initial fetch and refetch on filter/search/pagination changes
  useEffect(() => {
    fetchActivities();
  }, [
    selectedScopes,
    selectedCategories,
    selectedSubCategories,
    selectedRegions,
    currentPage,
    itemsPerPage,
    sortColumn,
    sortOrder,
  ]);

  // Debounced search
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchActivities();
    }, 400);

    if (searchQuery !== null) {
      debouncedFetch();
    }

    return () => debouncedFetch.cancel();
  }, [searchQuery]);

  // Add click outside handler for filters
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        scopeFilterRef.current &&
        !scopeFilterRef.current.contains(event.target)
      ) {
        setIsScopeFilterOpen(false);
      }
      if (
        categoryFilterRef.current &&
        !categoryFilterRef.current.contains(event.target)
      ) {
        setIsCategoryFilterOpen(false);
      }
      if (
        subCategoryFilterRef.current &&
        !subCategoryFilterRef.current.contains(event.target)
      ) {
        setIsSubCategoryFilterOpen(false);
      }
      if (
        regionFilterRef.current &&
        !regionFilterRef.current.contains(event.target)
      ) {
        setIsRegionFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle sort action when a column header is clicked
  const handleSort = (column) => {
    // If clicking the same column, toggle sort order
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new column, set it as sort column with ascending order
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Filter selection handlers
  const handleScopeSelection = (scope) => {
    setSelectedScopes((prev) => {
      if (prev.includes(scope)) {
        return prev.filter((item) => item !== scope);
      }
      return [...prev, scope];
    });
  };

  const handleCategorySelection = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }
      return [...prev, category];
    });
  };

  const handleSubCategorySelection = (subCategory) => {
    setSelectedSubCategories((prev) => {
      if (prev.includes(subCategory)) {
        return prev.filter((item) => item !== subCategory);
      }
      return [...prev, subCategory];
    });
  };

  const handleRegionSelection = (region) => {
    setSelectedRegions((prev) => {
      if (prev.includes(region)) {
        return prev.filter((item) => item !== region);
      }
      return [...prev, region];
    });
  };

  const handleClearFilter = (filterType) => {
    switch (filterType) {
      case "scope":
        setSelectedScopes([]);
        break;
      case "fuel":
        setSelectedSubCategories([]);
        break;
      default:
        break;
    }
  };

  const totalPages = Math.ceil(count / itemsPerPage);

  // Filter Modal component
  const FilterModal = ({
    title,
    items,
    selectedItems,
    handleSelection,
    onClose,
  }) => {
    return (
      <div className="absolute z-10 top-full mt-2 left-0 bg-white rounded-lg shadow-lg w-72 border border-gray-200">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <label
                key={typeof item === "object" ? item.id : item}
                className="flex items-center gap-3 py-2 px-1 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(
                    typeof item === "object" ? item.name || item.label : item
                  )}
                  onChange={() =>
                    handleSelection(
                      typeof item === "object" ? item.name || item.label : item
                    )
                  }
                  className="w-4 h-4 rounded border-gray-300 green-checkbox"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {typeof item === "object" ? item.name || item.label : item}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header with search and total counts */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex space-x-4">
          <div className="flex gap-2 items-center w-6">
            <span className="text-gray-500 text-sm">Total activities</span>
            <div className="text-xl font-semibold">{count}</div>
          </div>
          <div className="flex gap-2 items-center w-6">
            <span className="text-gray-500 text-sm">Selected activities</span>
            <div className="text-xl font-semibold text-green-500">
              {selectedActivities.length}
            </div>
          </div>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Scope, Category, Sub category or Activity"
            className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Active filters */}
      <div className="p-4 flex items-center gap-2">
        {selectedScopes.length > 0 && (
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-2">Scope 1</span>
            <button
              onClick={() => handleClearFilter("scope")}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        )}
        {selectedSubCategories.length > 0 && (
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
            <span className="mr-2">Fuel</span>
            <button
              onClick={() => handleClearFilter("fuel")}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Table headers */}
      <div className="grid grid-cols-11 gap-4 px-6 py-3 border-y border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
        {/* Include column - 1 unit */}
        <div className="col-span-1 flex items-center">
          <span>Include</span>
        </div>

        {/* Scope - with filter - 1 unit */}
        <div className="col-span-1 relative" ref={scopeFilterRef}>
          <div className="flex items-center gap-2">
            <span>Scope</span>
            <button
              onClick={() => setIsScopeFilterOpen(!isScopeFilterOpen)}
              className="hover:bg-gray-100 p-1 rounded"
            >
              <MdFilterList
                className={`w-4 h-4 ${
                  selectedScopes.length > 0 ? "text-blue-500" : "text-gray-400"
                } hover:text-blue-500`}
              />
            </button>
          </div>

          {isScopeFilterOpen && (
            <FilterModal
              title="Filter by Scope"
              items={scopeOptions}
              selectedItems={selectedScopes}
              handleSelection={handleScopeSelection}
              onClose={() => setIsScopeFilterOpen(false)}
            />
          )}
        </div>

        {/* Category - with filter - 2 units */}
        <div className="col-span-2 relative" ref={categoryFilterRef}>
          <div className="flex items-center gap-2">
            <span>Category</span>
            <button
              onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
              className="hover:bg-gray-100 p-1 rounded"
            >
              <MdFilterList
                className={`w-4 h-4 ${
                  selectedCategories.length > 0
                    ? "text-blue-500"
                    : "text-gray-400"
                } hover:text-blue-500`}
              />
            </button>
          </div>

          {isCategoryFilterOpen && (
            <FilterModal
              title="Filter by Category"
              items={categoryOptions}
              selectedItems={selectedCategories}
              handleSelection={handleCategorySelection}
              onClose={() => setIsCategoryFilterOpen(false)}
            />
          )}
        </div>

        {/* Sub Category - with filter - 2 units */}
        <div className="col-span-2 relative" ref={subCategoryFilterRef}>
          <div className="flex items-center gap-2">
            <span>Sub Category</span>
            <button
              onClick={() =>
                setIsSubCategoryFilterOpen(!isSubCategoryFilterOpen)
              }
              className="hover:bg-gray-100 p-1 rounded"
            >
              <MdFilterList
                className={`w-4 h-4 ${
                  selectedSubCategories.length > 0
                    ? "text-blue-500"
                    : "text-gray-400"
                } hover:text-blue-500`}
              />
            </button>
          </div>

          {isSubCategoryFilterOpen && (
            <FilterModal
              title="Filter by Sub Category"
              items={subCategoryOptions}
              selectedItems={selectedSubCategories}
              handleSelection={handleSubCategorySelection}
              onClose={() => setIsSubCategoryFilterOpen(false)}
            />
          )}
        </div>

        {/* Activity column - 4 units - Added Sorting */}
        <div className="col-span-4 flex items-center">
          <div 
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => handleSort("activity")}
          >
            <span>Activity</span>
            {sortColumn === "activity" ? (
              sortOrder === "asc" ? (
                <FiChevronUp className="h-4 w-4" />
              ) : (
                <FiChevronDown className="h-4 w-4" />
              )
            ) : (
              <LuChevronsUpDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>

        {/* Region column - 1 unit - Added Sorting */}
        <div className="col-span-1 relative" ref={regionFilterRef}>
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleSort("region")}
            >
              <span>Activity Region</span>
              {sortColumn === "region" ? (
                sortOrder === "asc" ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                )
              ) : (
                <LuChevronsUpDown className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table body */}
      <div className="max-h-[410px] overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className={`grid grid-cols-11 gap-4 px-6 py-4 hover:bg-gray-50 ${
                  isSelected(activity.id) ? "bg-blue-50" : ""
                }`}
                // onClick={() => toggleActivitySelection(activity)}
                style={{ cursor: "pointer" }}
              >
                {/* Include column - 1 unit */}
                <div className="col-span-1 flex items-center">
                  <div className="flex items-center justify-center h-5">
                    <input
                      type="checkbox"
                      checked={isSelected(activity.id)}
                      onChange={() => toggleActivitySelection(activity)} // onChange is handled by the row click
                      className="w-4 h-4 green-checkbox border-gray-300 rounded focus:ring-green-500"
                      onClick={(e) => e.stopPropagation()} // Prevent double triggering
                    />
                  </div>
                </div>

                {/* Scope - 1 unit */}
                <div className="col-span-1">{activity.scope}</div>

                {/* Category - 2 units */}
                <div className="col-span-2">{activity.category}</div>

                {/* Sub Category - 2 units */}
                <div className="col-span-2">{activity.subCategory}</div>

                {/* Activity - 4 units */}
                <div className="col-span-4 truncate">{activity.activity}</div>

                {/* Region - 1 unit */}
                <div className="col-span-1 text-gray-500 text-center">
                  {activity.region}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center p-4 border-t">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-200 disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>

          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            let pageNumber;

            if (totalPages <= 7) {
              pageNumber = i + 1;
            } else if (currentPage <= 4) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 3) {
              pageNumber = totalPages - 6 + i;
            } else {
              pageNumber = currentPage - 3 + i;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-8 h-8 rounded-md ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-200 disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitySelectTable;