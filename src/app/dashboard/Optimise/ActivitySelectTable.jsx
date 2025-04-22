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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmissionData,
  setEmissionDataFilter,
  setEmissionDataSorting,
  setEmissionDataPagination,
  clearEmissionDataFilters,
  addActivitiesToScenario,
  removeActivityFromScenario
} from "../../../lib/redux/features/optimiseSlice";

const ActivitySelectTable = ({ selectedActivities, setSelectedActivities, scenarioId }) => {
  const dispatch = useDispatch();
  
  // Get emission data state from Redux
  const emissionData = useSelector(state => state.optimise.emissionData || {});
  const { activities = [], count = 0, filters = {}, sorting = {}, pagination = {} } = emissionData;
  
  const loading = useSelector(state => state.optimise.loading.emissionData);
  const error = useSelector(state => state.optimise.error.emissionData);

  // Filter dropdowns states
  const [isScopeFilterOpen, setIsScopeFilterOpen] = useState(false);
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [isSubCategoryFilterOpen, setIsSubCategoryFilterOpen] = useState(false);
  const [isRegionFilterOpen, setIsRegionFilterOpen] = useState(false);

  // Local state for search input
  const [searchInput, setSearchInput] = useState("");

  // Refs for filter dropdowns
  const scopeFilterRef = useRef(null);
  const categoryFilterRef = useRef(null);
  const subCategoryFilterRef = useRef(null);
  const regionFilterRef = useRef(null);

  // Initial fetch when component mounts
  useEffect(() => {
    if (scenarioId) {
      // Fetch activities on component mount with default filters
      dispatch(fetchEmissionData({ 
        scenarioId,
        filters: {
          page: 1,
          page_size: 10
        } 
      }));
    }
  }, [dispatch, scenarioId]);

  // Debounced search function
  const debouncedSearch = useRef(
    debounce((searchValue) => {
      dispatch(setEmissionDataFilter({
        filterType: 'search',
        value: searchValue
      }));
    }, 400)
  ).current;

  // Handle search input change
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Toggle selection of an activity
  const toggleActivitySelection = (activity) => {
    // Check if activity is already selected
    const isAlreadySelected = selectedActivities.some(item => item.id === activity.id);
    
    if (isAlreadySelected) {
      // Remove from selected list
      if (scenarioId) {
        // If scenario ID exists, use API to remove activity
        dispatch(removeActivityFromScenario({
          scenarioId,
          activityId: activity.id
        }));
      } else {
        // Otherwise just update local state
        setSelectedActivities(prevSelected => 
          prevSelected.filter(item => item.id !== activity.id)
        );
      }
    } else {
      // Add to selected list
      if (scenarioId) {
        // If scenario ID exists, use API to add activity
        dispatch(addActivitiesToScenario({
          scenarioId,
          activityIds: [activity.id]
        }));
      } else {
        // Otherwise just update local state
        setSelectedActivities(prevSelected => [...prevSelected, activity]);
      }
    }
  };

  // Check if an activity is selected
  const isSelected = (activityId) => {
    return selectedActivities.some(activity => activity.id === activityId);
  };

  // Handle sort action when a column header is clicked
  const handleSort = (column) => {
    // If clicking the same column, toggle sort order
    if (sorting.column === column) {
      dispatch(setEmissionDataSorting({
        column,
        order: sorting.order === "asc" ? "desc" : "asc"
      }));
    } else {
      // If clicking a new column, set it as sort column with ascending order
      dispatch(setEmissionDataSorting({
        column,
        order: "asc"
      }));
    }
  };

  // Update pagination
  const handlePageChange = (newPage) => {
    dispatch(setEmissionDataPagination({
      currentPage: newPage,
      itemsPerPage: pagination.itemsPerPage || 10
    }));
  };

  const handleItemsPerPageChange = (newValue) => {
    dispatch(setEmissionDataPagination({
      currentPage: 1, // Reset to first page when changing items per page
      itemsPerPage: parseInt(newValue)
    }));
  };

  // Filter selection handlers
  const handleScopeSelection = (scope) => {
    const newScopes = [...(filters.scopes || [])];
    if (newScopes.includes(scope)) {
      // Remove scope if already selected
      const index = newScopes.indexOf(scope);
      newScopes.splice(index, 1);
    } else {
      // Add scope if not already selected
      newScopes.push(scope);
    }
    
    dispatch(setEmissionDataFilter({
      filterType: 'scopes',
      value: newScopes
    }));
  };

  const handleCategorySelection = (category) => {
    const newCategories = [...(filters.categories || [])];
    if (newCategories.includes(category)) {
      // Remove category if already selected
      const index = newCategories.indexOf(category);
      newCategories.splice(index, 1);
    } else {
      // Add category if not already selected
      newCategories.push(category);
    }
    
    dispatch(setEmissionDataFilter({
      filterType: 'categories',
      value: newCategories
    }));
  };

  const handleSubCategorySelection = (subCategory) => {
    const newSubCategories = [...(filters.subCategories || [])];
    if (newSubCategories.includes(subCategory)) {
      // Remove subCategory if already selected
      const index = newSubCategories.indexOf(subCategory);
      newSubCategories.splice(index, 1);
    } else {
      // Add subCategory if not already selected
      newSubCategories.push(subCategory);
    }
    
    dispatch(setEmissionDataFilter({
      filterType: 'subCategories',
      value: newSubCategories
    }));
  };

  const handleRegionSelection = (region) => {
    const newRegions = [...(filters.regions || [])];
    if (newRegions.includes(region)) {
      // Remove region if already selected
      const index = newRegions.indexOf(region);
      newRegions.splice(index, 1);
    } else {
      // Add region if not already selected
      newRegions.push(region);
    }
    
    dispatch(setEmissionDataFilter({
      filterType: 'regions',
      value: newRegions
    }));
  };

  // Clear specific filter or all filters
  const handleClearFilter = (filterType, value) => {
    switch (filterType) {
      case "scope":
        if (value) {
          // Clear specific scope
          const newScopes = (filters.scopes || []).filter(scope => scope !== value);
          dispatch(setEmissionDataFilter({
            filterType: 'scopes',
            value: newScopes
          }));
        } else {
          // Clear all scopes
          dispatch(setEmissionDataFilter({
            filterType: 'scopes',
            value: []
          }));
        }
        break;
      case "category":
        if (value) {
          // Clear specific category
          const newCategories = (filters.categories || []).filter(category => category !== value);
          dispatch(setEmissionDataFilter({
            filterType: 'categories',
            value: newCategories
          }));
        } else {
          // Clear all categories
          dispatch(setEmissionDataFilter({
            filterType: 'categories',
            value: []
          }));
        }
        break;
      case "subCategory":
        if (value) {
          // Clear specific subCategory
          const newSubCategories = (filters.subCategories || []).filter(subCategory => subCategory !== value);
          dispatch(setEmissionDataFilter({
            filterType: 'subCategories',
            value: newSubCategories
          }));
        } else {
          // Clear all subCategories
          dispatch(setEmissionDataFilter({
            filterType: 'subCategories',
            value: []
          }));
        }
        break;
      case "region":
        if (value) {
          // Clear specific region
          const newRegions = (filters.regions || []).filter(region => region !== value);
          dispatch(setEmissionDataFilter({
            filterType: 'regions',
            value: newRegions
          }));
        } else {
          // Clear all regions
          dispatch(setEmissionDataFilter({
            filterType: 'regions',
            value: []
          }));
        }
        break;
      case "all":
        // Clear all filters
        dispatch(clearEmissionDataFilters());
        setSearchInput(""); // Clear search input
        break;
      default:
        break;
    }
  };

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

  // Fetch activities when filters, sorting, or pagination changes
  useEffect(() => {
    if (scenarioId) {
      // Prepare API filter parameters
      const apiFilters = {
        search: filters.search,
        page: pagination.currentPage || 1,
        page_size: pagination.itemsPerPage || 10,
      };
  
      // Add array filters
      if (filters.scopes && filters.scopes.length > 0) {
        apiFilters.scope = filters.scopes;
      }
      if (filters.categories && filters.categories.length > 0) {
        apiFilters.category = filters.categories;
      }
      if (filters.subCategories && filters.subCategories.length > 0) {
        apiFilters.sub_category = filters.subCategories;
      }
      if (filters.regions && filters.regions.length > 0) {
        apiFilters.region = filters.regions;
      }
  
      // Add sorting if column is selected
      if (sorting.column) {
        // Convert camelCase to snake_case for API parameters
        const apiSortColumn = sorting.column.replace(/([A-Z])/g, '_$1').toLowerCase();
        apiFilters.ordering = sorting.order === "asc" ? apiSortColumn : `-${apiSortColumn}`;
      }
  
      // Dispatch the action to fetch emission data with scenarioId and filters
      dispatch(fetchEmissionData({
        scenarioId,
        filters: apiFilters
      }));
    }
  }, [
    dispatch,
    scenarioId,
    filters.scopes,
    filters.categories,
    filters.subCategories,
    filters.regions,
    filters.search,
    pagination.currentPage,
    pagination.itemsPerPage,
    sorting.column,
    sorting.order,
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(count / (pagination.itemsPerPage || 10));

  // Check if any filters are active
  const hasActiveFilters =
    (filters.scopes && filters.scopes.length > 0) ||
    (filters.categories && filters.categories.length > 0) ||
    (filters.subCategories && filters.subCategories.length > 0) ||
    (filters.regions && filters.regions.length > 0) ||
    filters.search;

  // Filter Modal component
  const FilterModal = ({
    title,
    items,
    selectedItems = [],
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

  // Sample options for filters - these could be filled from the API
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

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header with search and total counts */}
      <div className="relative w-full p-4">
        <FiSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Scope, Category, Sub category or Activity"
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
          value={searchInput}
        />
      </div>
      <div className="flex justify-start items-center p-4">
        <div className="flex space-x-4 w-[18%] gap-6">
          <div className="flex items-center">
            <span className="text-gray-500 text-sm">
              <div>Total</div> activities
            </span>
            <div className="text-xl font-semibold ml-3">{count}</div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm">
              <div>Selected</div> activities
            </span>
            <div className="text-xl font-semibold text-green-500 ml-3">
              {selectedActivities.length}
            </div>
          </div>
        </div>
        {/* Active filters */}
        <div className="flex flex-wrap items-center gap-2 text-sky-700 font-semibold w-[82%]">
          {(filters.scopes || []).map(scope => (
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
          
          {(filters.categories || []).map(category => (
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
          
          {(filters.subCategories || []).map(subCategory => (
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
          
          {(filters.regions || []).map(region => (
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
                  (filters.scopes && filters.scopes.length > 0) ? "text-blue-500" : "text-gray-400"
                } hover:text-blue-500`}
              />
            </button>
          </div>

          {isScopeFilterOpen && (
            <FilterModal
              title="Filter by Scope"
              items={scopeOptions}
              selectedItems={filters.scopes || []}
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
                  (filters.categories && filters.categories.length > 0) ? "text-blue-500" : "text-gray-400"
                } hover:text-blue-500`}
              />
            </button>
          </div>

          {isCategoryFilterOpen && (
            <FilterModal
              title="Filter by Category"
              items={categoryOptions}
              selectedItems={filters.categories || []}
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
                  (filters.subCategories && filters.subCategories.length > 0) ? "text-blue-500" : "text-gray-400"
                } hover:text-blue-500`}
              />
            </button>
          </div>

          {isSubCategoryFilterOpen && (
            <FilterModal
              title="Filter by Sub Category"
              items={subCategoryOptions}
              selectedItems={filters.subCategories || []}
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
            {sorting.column === "activity" ? (
              sorting.order === "asc" ? (
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
              {sorting.column === "region" ? (
                sorting.order === "asc" ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                )
              ) : (
                <LuChevronsUpDown className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <button
              onClick={() => setIsRegionFilterOpen(!isRegionFilterOpen)}
              className="hover:bg-gray-100 p-1 rounded ml-1"
            >
              <MdFilterList
                className={`w-4 h-4 ${
                  (filters.regions && filters.regions.length > 0) ? "text-blue-500" : "text-gray-400"
                } hover:text-blue-500`}
              />
            </button>
          </div>

          {isRegionFilterOpen && (
            <FilterModal
              title="Filter by Region"
              items={regionOptions}
              selectedItems={filters.regions || []}
              handleSelection={handleRegionSelection}
              onClose={() => setIsRegionFilterOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Table body */}
      <div className="max-h-[410px] overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-500">
              <p>Error loading activities: {error}</p>
              <button 
                onClick={() => dispatch(fetchEmissionData({ 
                  scenarioId,
                  filters: {
                    page: 1,
                    page_size: 10
                  }
                }))}
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
                key={activity.id}
                className={`grid grid-cols-11 gap-4 px-6 py-4 hover:bg-gray-50 ${
                  isSelected(activity.id) ? "bg-blue-50" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                {/* Include column - 1 unit */}
                <div className="col-span-1 flex items-center">
                  <div className="flex items-center justify-center h-5">
                    <input
                      type="checkbox"
                      checked={isSelected(activity.id)}
                      onChange={() => toggleActivitySelection(activity)} 
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
                <div className="col-span-2">{activity.sub_category || activity.subCategory}</div>

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
            onClick={() => handlePageChange(Math.max(1, (pagination.currentPage || 1) - 1))}
            disabled={(pagination.currentPage || 1) === 1}
            className="p-2 rounded-md border border-gray-200 disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>

          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            let pageNumber;

            if (totalPages <= 7) {
              pageNumber = i + 1;
            } else if ((pagination.currentPage || 1) <= 4) {
              pageNumber = i + 1;
            } else if ((pagination.currentPage || 1) >= totalPages - 3) {
              pageNumber = totalPages - 6 + i;
            } else {
              pageNumber = (pagination.currentPage || 1) - 3 + i;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`w-8 h-8 rounded-md ${
                  (pagination.currentPage || 1) === pageNumber
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, (pagination.currentPage || 1) + 1))}
            disabled={(pagination.currentPage || 1) === totalPages || totalPages === 0}
            className="p-2 rounded-md border border-gray-200 disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="flex items-center ml-4">
          <select
            value={pagination.itemsPerPage || 10}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-1 text-sm"
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>

          <div className="text-sm text-gray-500 ml-4">
            Showing{" "}
            {activities.length > 0
              ? ((pagination.currentPage || 1) - 1) * (pagination.itemsPerPage || 10) + 1
              : 0}{" "}
            to {Math.min((pagination.currentPage || 1) * (pagination.itemsPerPage || 10), count)} of {count}{" "}
            activities
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySelectTable;