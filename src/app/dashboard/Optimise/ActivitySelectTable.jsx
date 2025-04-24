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
import scenarioService from './service/scenarioService';

const ActivitySelectTable = ({ selectedActivities = [], setSelectedActivities, scenarioId }) => {
  // Main states
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

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

  // Filter options (will be populated from API responses)
  const [scopeOptions, setScopeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);

  // Refs for filter dropdowns
  const scopeFilterRef = useRef(null);
  const categoryFilterRef = useRef(null);
  const subCategoryFilterRef = useRef(null);
  const regionFilterRef = useRef(null);

  // Fetch activities with filters
  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Build API query parameters
      const filters = {
        page: currentPage,
        page_size: itemsPerPage,
        search: searchQuery || undefined,
      };
      
      // Add scope filters (assuming API expects 'scope' parameter)
      if (selectedScopes.length > 0) {
        filters.scope = selectedScopes.join(',');
      }
      
      // Add category filters
      if (selectedCategories.length > 0) {
        filters.category = selectedCategories.join(',');
      }
      
      // Add sub-category filters
      if (selectedSubCategories.length > 0) {
        filters.subcategory = selectedSubCategories.join(',');
      }
      
      // Add region filters
      if (selectedRegions.length > 0) {
        filters.region = selectedRegions.join(',');
      }
      
      // Add sorting
      if (sortColumn) {
        // Apply proper ordering format for API
        const ordering = sortOrder === 'asc' ? sortColumn === 'activity_name' ? 'activity' : sortColumn : `-${sortColumn === 'activity_name' ? 'activity' : sortColumn}`;
        filters.ordering = ordering;
      }
      
      // Call API to fetch emission data
      const response = await scenarioService.fetchEmissionData(scenarioId, filters);
      
      // Transform API response to match the expected format for activities
      const transformedActivities = response.results.map(item => ({
        id: item.activity_id, // Keep for compatibility
        activity_id: item.activity_id,
        uuid: item.uuid, // Ensure we have the uuid field
        scope: item.scope,
        category: item.category,
        subCategory: item.sub_category,
        sub_category: item.sub_category,
        activity: item.activity_name,
        activity_name: item.activity_name,
        region: item.region,
        // Add additional fields that might be needed
        quantity: item.quantity,
        unit: item.unit,
        co2e_total: item.co2e_total,
        unit_type: item.unit_type,
        factor_id: item.factor_id
      }));
      
      setActivities(transformedActivities);
      setCount(response.count || 0);
      
      // Extract unique values for filter options from the fetched data
      if (response.results && response.results.length > 0) {
        const uniqueScopes = [...new Set(response.results.map(item => item.scope))];
        const uniqueCategories = [...new Set(response.results.map(item => item.category))];
        const uniqueSubCategories = [...new Set(response.results.map(item => item.sub_category))];
        const uniqueRegions = [...new Set(response.results.map(item => item.region))];
        
        setScopeOptions(uniqueScopes);
        setCategoryOptions(uniqueCategories);
        setSubCategoryOptions(uniqueSubCategories);
        setRegionOptions(uniqueRegions);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Failed to load activities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle selection of an activity - only managed in local state, using uuid for identification
  const toggleActivitySelection = (activity) => {
    // Check if activity is already selected based on uuid
    const isAlreadySelected = selectedActivities.some(item => item.uuid === activity.uuid);
    
    if (isAlreadySelected) {
      // Remove from selected list
      const newSelectedActivities = selectedActivities.filter(item => item.uuid !== activity.uuid);
      setSelectedActivities(newSelectedActivities);
    } else {
      // Add to selected list
      const newSelectedActivities = [...selectedActivities, activity];
      setSelectedActivities(newSelectedActivities);
    }
  };

  // Check if an activity is selected using uuid
  const isSelected = (uuid) => {
    return selectedActivities.some(activity => activity.uuid === uuid);
  };

  // Initial fetch and refetch on filter/search/pagination/sort changes
  useEffect(() => {
    if (scenarioId) {
      fetchActivities();
    }
  }, [
    scenarioId,
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

    if (searchQuery !== null && scenarioId) {
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
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If clicking a new column, set it as sort column with ascending order
      setSortColumn(column);
      setSortOrder("asc");
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

  const handleClearFilter = (filterType, value) => {
    switch (filterType) {
      case "scope":
        if (value) {
          // Clear specific scope
          setSelectedScopes(prev => prev.filter(scope => scope !== value));
        } else {
          // Clear all scopes
          setSelectedScopes([]);
        }
        break;
      case "category":
        if (value) {
          // Clear specific category
          setSelectedCategories(prev => prev.filter(category => category !== value));
        } else {
          // Clear all categories
          setSelectedCategories([]);
        }
        break;
      case "subCategory":
        if (value) {
          // Clear specific subCategory
          setSelectedSubCategories(prev => prev.filter(subCategory => subCategory !== value));
        } else {
          // Clear all subCategories
          setSelectedSubCategories([]);
        }
        break;
      case "region":
        if (value) {
          // Clear specific region
          setSelectedRegions(prev => prev.filter(region => region !== value));
        } else {
          // Clear all regions
          setSelectedRegions([]);
        }
        break;
      case "all":
        // Clear all filters
        setSelectedScopes([]);
        setSelectedCategories([]);
        setSelectedSubCategories([]);
        setSelectedRegions([]);
        setSearchQuery("");
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
            <div className="flex items-center gap-1">
              <FiFilter className="w-4 h-4" />
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            </div>
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
          {selectedItems.length > 0 && (
            <div className="pt-2 mt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  // Clear all selections for this filter
                  if (title.includes("Scope")) {
                    handleClearFilter("scope");
                  } else if (title.includes("Category") && !title.includes("Sub")) {
                    handleClearFilter("category");
                  } else if (title.includes("Sub Category")) {
                    handleClearFilter("subCategory");
                  } else if (title.includes("Region")) {
                    handleClearFilter("region");
                  }
                  onClose();
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear selections
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedScopes.length > 0 ||
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedRegions.length > 0 ||
    searchQuery;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header with search and total counts */}
      <div className="relative w-full p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Scope, Category, Sub category or Activity"
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex justify-start items-center px-4 py-2">
        <div className="flex space-x-4 w-[18%] gap-6">
          <div className="flex items-center">
            <span className="text-gray-500 text-sm">Total activities</span>
            <div className="text-xl font-semibold ml-3">{count}</div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm">Selected activities</span>
            <div className="text-xl font-semibold text-green-500 ml-3">
              {selectedActivities.length}
            </div>
          </div>
        </div>
        
        {/* Active filters */}
        <div className="flex flex-wrap items-center gap-2 text-sky-700 font-semibold w-[82%]">
          {selectedScopes.map(scope => (
            <div key={`scope-${scope}`} className="flex items-center bg-sky-50 rounded-md px-3 py-1.5 text-sm">
              <span className="mr-2">{scope}</span>
              <button
                onClick={() => handleClearFilter("scope", scope)}
                className="text-sky-400 hover:text-sky-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {selectedCategories.map(category => (
            <div key={`category-${category}`} className="flex items-center bg-sky-50 rounded-md px-3 py-1.5 text-sm">
              <span className="mr-2">{category}</span>
              <button
                onClick={() => handleClearFilter("category", category)}
                className="text-sky-400 hover:text-sky-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {selectedSubCategories.map(subCategory => (
            <div key={`subcategory-${subCategory}`} className="flex items-center bg-sky-50 rounded-md px-3 py-1.5 text-sm">
              <span className="mr-2">{subCategory}</span>
              <button
                onClick={() => handleClearFilter("subCategory", subCategory)}
                className="text-sky-400 hover:text-sky-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {selectedRegions.map(region => (
            <div key={`region-${region}`} className="flex items-center bg-sky-50 rounded-md px-3 py-1.5 text-sm">
              <span className="mr-2">{region}</span>
              <button
                onClick={() => handleClearFilter("region", region)}
                className="text-sky-400 hover:text-sky-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {/* Show clear all button if there are any filters */}
          {hasActiveFilters && (
            <button 
              className="ml-2 px-3 py-1 text-sm bg-white border border-sky-200 rounded-md hover:bg-sky-50"
              onClick={() => handleClearFilter("all")}
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Table headers - fixed alignment */}
      <div className="grid grid-cols-11 gap-4 px-6 py-3 border-y border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
        {/* Include column - 1 unit */}
        <div className="col-span-1 flex items-center">
          <span>Include</span>
        </div>

        {/* Scope - with filter - 1 unit */}
        <div className="col-span-1 relative" ref={scopeFilterRef}>
          <div className="flex items-center">
            <span className="whitespace-nowrap">Scope</span>
            <button
              onClick={() => setIsScopeFilterOpen(!isScopeFilterOpen)}
              className="hover:bg-gray-100 p-1 rounded ml-1"
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
          <div className="flex items-center">
            <span className="whitespace-nowrap">Category</span>
            <button
              onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
              className="hover:bg-gray-100 p-1 rounded ml-1"
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
          <div className="flex items-center">
            <span className="whitespace-nowrap">Sub Category</span>
            <button
              onClick={() =>
                setIsSubCategoryFilterOpen(!isSubCategoryFilterOpen)
              }
              className="hover:bg-gray-100 p-1 rounded ml-1"
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
            onClick={() => handleSort("activity_name")}
          >
            <span>Activity</span>
            {sortColumn === "activity_name" ? (
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

        {/* Region column - 1 unit - Added Sorting and Filter */}
        <div className="col-span-1 relative" ref={regionFilterRef}>
          <div className="flex items-center">
            <span className="whitespace-nowrap">Activity Region</span>
            <div className="flex ml-1">
              <button
                onClick={() => handleSort("region")}
                className="hover:bg-gray-100 rounded"
              >
                {sortColumn === "region" ? (
                  sortOrder === "asc" ? (
                    <FiChevronUp className="h-4 w-4" />
                  ) : (
                    <FiChevronDown className="h-4 w-4" />
                  )
                ) : (
                  <LuChevronsUpDown className="h-4 w-4 text-gray-400" />
                )}
              </button>
              <button
                onClick={() => setIsRegionFilterOpen(!isRegionFilterOpen)}
                className="hover:bg-gray-100 p-1 rounded"
              >
                <MdFilterList
                  className={`w-4 h-4 ${
                    selectedRegions.length > 0 ? "text-blue-500" : "text-gray-400"
                  } hover:text-blue-500`}
                />
              </button>
            </div>
          </div>

          {isRegionFilterOpen && (
            <FilterModal
              title="Filter by Region"
              items={regionOptions}
              selectedItems={selectedRegions}
              handleSelection={handleRegionSelection}
              onClose={() => setIsRegionFilterOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Table body */}
      <div className="max-h-[410px] overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">
              <p>{error}</p>
              <button 
                onClick={fetchActivities}
                className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Try Again
              </button>
            </div>
          ) : activities.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>No activities found with the current filters.</p>
              {hasActiveFilters && (
                <button 
                  onClick={() => handleClearFilter("all")}
                  className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.uuid}
                className={`grid grid-cols-11 gap-4 px-6 py-4 hover:bg-gray-50 ${
                  isSelected(activity.uuid) ? "bg-blue-50" : ""
                }`}
                onClick={() => toggleActivitySelection(activity)}
                style={{ cursor: "pointer" }}
              >
                {/* Include column - 1 unit */}
                <div className="col-span-1 flex items-center">
                  <div className="flex items-center justify-center h-5">
                    <input
                      type="checkbox"
                      checked={isSelected(activity.uuid)}
                      onChange={() => {}} // onChange handled by parent div click
                      className="w-4 h-4 green-checkbox border-gray-300 rounded focus:ring-green-500"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent double triggering
                        toggleActivitySelection(activity);
                      }}
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
                <div className="col-span-4 truncate" title={activity.activity}>
                  {activity.activity}
                </div>

                {/* Region - 1 unit */}
                <div className="col-span-1 text-center">
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

        <div className="flex items-center ml-4">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-200 rounded-md px-3 py-1 text-sm"
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>

          <div className="text-sm text-gray-500 ml-4">
            Showing{" "}
            {activities.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, count)} of {count}{" "}
            activities
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySelectTable;