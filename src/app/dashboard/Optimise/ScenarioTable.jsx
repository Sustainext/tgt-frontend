import React, { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
  FiEye,
  FiEdit,
  FiTrash2,
  FiFilter,
} from "react-icons/fi";
import Moment from "react-moment";
import { debounce } from "lodash";
import { MdFilterList } from "react-icons/md";
import { LuChevronsUpDown } from "react-icons/lu";
import empty from "../../../../public/empty-illustration.svg";
import Image from "next/image";
import DeleteScenarioModal from "./DeleteScenarioModal";
import ScenarioViewModal from "./ScenarioViewModal";
import CreateScenarioModal from "./CreateScenarioModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import scenarioService from "./service/scenarioService";

const ScenarioTable = () => {
  // Main states
  const [scenarios, setScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [selectedOrganizationNames, setSelectedOrganizationNames] = useState(
    []
  );

  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [isOrgFilterOpen, setIsOrgFilterOpen] = useState(false);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: null,
    end: null,
  });
  const [dateFilterType, setDateFilterType] = useState("created");

  // Added states for new filter types
  const [selectedBaseYears, setSelectedBaseYears] = useState([]);
  const [selectedTargetYears, setSelectedTargetYears] = useState([]);
  const [selectedCorporates, setSelectedCorporates] = useState([]);
  const [selectedCorporateNames, setSelectedCorporateNames] = useState([]);

  const [isBaseYearFilterOpen, setIsBaseYearFilterOpen] = useState(false);
  const [isTargetYearFilterOpen, setIsTargetYearFilterOpen] = useState(false);
  const [isCorporateFilterOpen, setIsCorporateFilterOpen] = useState(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scenarioToDelete, setScenarioToDelete] = useState(null);

  // View modal state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [scenarioToView, setScenarioToView] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Refs for filters
  const orgFilterRef = useRef(null);
  const statusFilterRef = useRef(null);
  const baseYearFilterRef = useRef(null);
  const targetYearFilterRef = useRef(null);
  const corpFilterRef = useRef(null);

  // Sorting states
  const [sortColumn, setSortColumn] = useState('created_at');
  const [sortOrder, setSortOrder] = useState("des");

  // Available options for filtering
  const [organizations, setOrganizations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [baseYears, setBaseYears] = useState([]);
  const [targetYears, setTargetYears] = useState([]);

  // Status options
  const statusOptions = [
    { id: "draft", label: "Draft" },
    { id: "in_progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];

  const router = useRouter();

  // When any filter changes, trigger fetch
  useEffect(() => {
    fetchScenariosFromAPI();
  }, [
    currentPage,
    itemsPerPage,
    sortColumn,
    sortOrder,
    selectedOrganizations,
    selectedCorporates,
    selectedBaseYears,
    selectedTargetYears,
    selectedStatuses,
  ]);

  // Debounced search
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchScenariosFromAPI();
    }, 400);

    if (searchQuery !== null) {
      debouncedFetch();
    }

    return () => debouncedFetch.cancel();
  }, [searchQuery]);

  // The key function to fetch scenarios with filters
const fetchScenariosFromAPI = async () => {
  setIsLoading(true);
  setError(null);

  try {
    // Build filter object with smallcase and underscores for API
    const filters = {
      page: currentPage,
      page_size: itemsPerPage,
    };

    // Add search query if not empty
    if (searchQuery) {
      filters.search = searchQuery;
    }

    // Add sorting if column is selected
    if (sortColumn) {
      // Convert camelCase to snake_case for API parameters
      const apiSortColumn = sortColumn.replace(/([A-Z])/g, '_$1').toLowerCase();
      filters.ordering = sortOrder === "asc" ? apiSortColumn : `-${apiSortColumn}`;
    }

    // Add array filters using IDs where applicable
    if (selectedOrganizations.length > 0) {
      // For organization, pass the IDs
      filters.organization = selectedOrganizations;
    }
    
    if (selectedCorporates.length > 0) {
      // For corporate, pass the IDs
      filters.corporate = selectedCorporates;
    }
    
    if (selectedBaseYears.length > 0) {
      filters.base_year = selectedBaseYears;
    }
    
    if (selectedTargetYears.length > 0) {
      filters.target_year = selectedTargetYears;
    }
    
    if (selectedStatuses.length > 0) {
      filters.status = selectedStatuses.map(status => status.toLowerCase().replace(/ /g, '_'));
    }
    
    // Date range filters
    if (selectedDateRange.start && selectedDateRange.end) {
      if (dateFilterType === "created") {
        filters.created_after = selectedDateRange.start;
        filters.created_before = selectedDateRange.end;
      } else {
        filters.updated_after = selectedDateRange.start;
        filters.updated_before = selectedDateRange.end;
      }
    }

    // Call API service with filters
    const response = await scenarioService.fetchScenarios(filters);
    
    // Update local state with response
    setScenarios(response.results || []);
    setCount(response.count || 0);
    
    // Extract unique values for filters from response
    if (response.results && response.results.length > 0) {
      // Use Map to ensure uniqueness of organizations and corporates
      const orgMap = new Map();
      const corpMap = new Map();
      
      response.results.forEach(s => {
        // Add organizations to map (id -> name)
        if (s.organization && s.organization_name) {
          orgMap.set(s.organization, s.organization_name);
        }
        
        // Add corporates to map (id -> name)
        if (s.corporate && s.corporate_name) {
          corpMap.set(s.corporate, s.corporate_name);
        }
      });
      
      // Convert maps to arrays of {id, name} objects
      const orgs = Array.from(orgMap.entries()).map(([id, name]) => ({ id, name }));
      const corps = Array.from(corpMap.entries()).map(([id, name]) => ({ id, name }));
      
      // Extract unique base years and target years
      const baseYrs = [...new Set(response.results.map(s => s.base_year).filter(Boolean))];
      const targetYrs = [...new Set(response.results.map(s => s.target_year).filter(Boolean))];
      
      // Update state
      setOrganizations(orgs);
      setCorporates(corps);
      setBaseYears(baseYrs);
      setTargetYears(targetYrs);
    }
  } catch (error) {
    console.error("Error fetching scenarios:", error);
    setError("Failed to load scenarios. Please try again later.");
    toast.error("Failed to load scenarios. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

  const handleDeleteClick = (scenario) => {
    setScenarioToDelete(scenario);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!scenarioToDelete || !scenarioToDelete.id) return;

    setIsLoading(true);
    try {
      const response = await scenarioService.deleteScenario(scenarioToDelete.id);

      // Update local state
      setScenarios(scenarios.filter((s) => s.id !== scenarioToDelete.id));
      setCount(count - 1);

      toast.success(
        `Scenario "${scenarioToDelete.name}" has been deleted successfully`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Close the modal
      setIsDeleteModalOpen(false);
      setScenarioToDelete(null);
    } catch (error) {
      console.error("Error deleting scenario:", error);
      toast.error("Failed to delete scenario. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // View scenario handler
  const handleViewScenario = (scenario) => {
    setScenarioToView(scenario);
    setIsViewModalOpen(true);
  };

  // Handle create scenario
  const handleCreateScenario = async (newScenarioData) => {
    setIsLoading(true);
    try {
      const response = await scenarioService.createScenario(
        newScenarioData
      );
      const createdScenario = response.data;
      // Refresh scenarios list after creation
      fetchScenariosFromAPI();

      toast.success(
        response.message,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      if(createdScenario.id)
      router.push(`Optimise/${createdScenario.id}/edit`)
      return createdScenario;
    } catch (error) {
      console.error("Error creating scenario:", error);
      toast.error("Failed to create scenario. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

// Organization selection handler
const handleOrgSelection = (orgId, orgName, isClearAll = false) => {
  if (isClearAll) {
    // Clear all organizations
    setSelectedOrganizations([]);
    setSelectedOrganizationNames([]);
    return;
  }
  
  // If we only receive an ID (for backward compatibility)
  if (orgName === undefined) {
    // Try to find the name in the organizations array
    const org = organizations.find(o => o.id === orgId);
    orgName = org ? org.name : orgId; // Fallback to using ID as name
  }
  
  // Check if organization is already selected
  const isAlreadySelected = selectedOrganizations.includes(orgId);
  
  if (isAlreadySelected) {
    // Remove organization ID
    const indexToRemove = selectedOrganizations.indexOf(orgId);
    const newSelectedOrgs = selectedOrganizations.filter(id => id !== orgId);
    
    // Also remove the name
    const newSelectedOrgNames = [...selectedOrganizationNames];
    if (indexToRemove !== -1) {
      newSelectedOrgNames.splice(indexToRemove, 1);
    }
    
    // Set both states separately
    setSelectedOrganizations(newSelectedOrgs);
    setSelectedOrganizationNames(newSelectedOrgNames);
  } else {
    // Add organization ID and name
    const newSelectedOrgs = [...selectedOrganizations, orgId];
    const newSelectedOrgNames = [...selectedOrganizationNames, orgName];
    
    // Set both states separately
    setSelectedOrganizations(newSelectedOrgs);
    setSelectedOrganizationNames(newSelectedOrgNames);
  }
};

// Corporate selection handler
const handleCorporateSelection = (corpId, corpName, isClearAll = false) => {
  if (isClearAll) {
    // Clear all corporates
    setSelectedCorporates([]);
    setSelectedCorporateNames([]);
    return;
  }
  
  // If we only receive an ID (for backward compatibility)
  if (corpName === undefined) {
    // Try to find the name in the corporates array
    const corp = corporates.find(c => c.id === corpId);
    corpName = corp ? corp.name : corpId; // Fallback to using ID as name
  }
  
  // Check if corporate is already selected
  const isAlreadySelected = selectedCorporates.includes(corpId);
  
  if (isAlreadySelected) {
    // Remove corporate ID
    const indexToRemove = selectedCorporates.indexOf(corpId);
    const newSelectedCorps = selectedCorporates.filter(id => id !== corpId);
    
    // Also remove the name
    const newSelectedCorpNames = [...selectedCorporateNames];
    if (indexToRemove !== -1) {
      newSelectedCorpNames.splice(indexToRemove, 1);
    }
    
    // Set both states separately
    setSelectedCorporates(newSelectedCorps);
    setSelectedCorporateNames(newSelectedCorpNames);
  } else {
    // Add corporate ID and name
    const newSelectedCorps = [...selectedCorporates, corpId];
    const newSelectedCorpNames = [...selectedCorporateNames, corpName];
    
    // Set both states separately
    setSelectedCorporates(newSelectedCorps);
    setSelectedCorporateNames(newSelectedCorpNames);
  }
};

// Modified FilterModal component
const FilterModal = ({
  title,
  items,
  selectedItems,
  handleSelection,
  onClose,
  useIdForValue = false,
}) => {
  return (
    <div className="absolute z-10 top-full mt-2 left-0 bg-white rounded-lg shadow-lg w-72 border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1">
          <FiFilter className="w-4 h-4" />
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3></div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {items.map((item) => {
            // Check if item is an object with id and name
            const isObjectWithIdName = typeof item === "object" && item !== null && 'id' in item && 'name' in item;
            
            // Get ID and name from item
            const id = isObjectWithIdName ? item.id : item;
            const name = isObjectWithIdName ? item.name : (typeof item === "object" ? item.label || item.name : item);
            
            // Check if item is selected by ID
            const isSelected = selectedItems.includes(id);
            
            return (
              <label
                key={id}
                className="flex items-center gap-3 py-2 px-1 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelection(id, name)}
                  className="w-4 h-4 green-checkbox rounded border-gray-300"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {name}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
        {selectedItems.length > 0 && (
          <div className="pt-2 mt-2 border-t border-gray-200">
            <button
              onClick={() => {
                // Clear all selections for this filter
                const filterType = title.toLowerCase().includes('organization') ? 'organization' :
                                  title.toLowerCase().includes('corporate') ? 'corporate' :
                                  title.toLowerCase().includes('base year') ? 'baseYear' :
                                  title.toLowerCase().includes('target year') ? 'targetYear' : 'status';
                handleSelection(null, null, true); // Pass true to indicate clearing all
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

  const handleBaseYearSelection = (year) => {
    setSelectedBaseYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((item) => item !== year);
      }
      return [...prev, year];
    });
    // Trigger fetch with updated filters
  };

  const handleTargetYearSelection = (year) => {
    setSelectedTargetYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((item) => item !== year);
      }
      return [...prev, year];
    });
    // Trigger fetch with updated filters
  };

  const handleClearOrgFilter = (orgId) => {
    // Find the index of the ID in the selectedOrganizations array
    const index = selectedOrganizations.indexOf(orgId);

    if (index !== -1) {
      // Remove both the ID and the corresponding name
      setSelectedOrganizations((prev) => prev.filter((id) => id !== orgId));
      setSelectedOrganizationNames((prev) => {
        const newNames = [...prev];
        newNames.splice(index, 1);
        return newNames;
      });
    } else if (!orgId) {
      // Clear all organizations
      setSelectedOrganizations([]);
      setSelectedOrganizationNames([]);
    }
  };

  // Clear a specific corporate filter value
  const handleClearCorpFilter = (corpId) => {
    // Find the index of the ID in the selectedCorporates array
    const index = selectedCorporates.indexOf(corpId);

    if (index !== -1) {
      // Remove both the ID and the corresponding name
      setSelectedCorporates((prev) => prev.filter((id) => id !== corpId));
      setSelectedCorporateNames((prev) => {
        const newNames = [...prev];
        newNames.splice(index, 1);
        return newNames;
      });
    } else if (!corpId) {
      // Clear all corporates
      setSelectedCorporates([]);
      setSelectedCorporateNames([]);
    }
  };

  // Modified clear filter function to handle ID-based filters
  const handleClearFilter = (filterType, value) => {
    switch (filterType) {
      case "organization":
        handleClearOrgFilter(value);
        break;
      case "corporate":
        handleClearCorpFilter(value);
        break;
      case "baseYear":
        if (value) {
          // Clear specific base year
          setSelectedBaseYears((prev) => prev.filter((item) => item !== value));
        } else {
          // Clear all base years
          setSelectedBaseYears([]);
        }
        break;
      case "targetYear":
        if (value) {
          // Clear specific target year
          setSelectedTargetYears((prev) =>
            prev.filter((item) => item !== value)
          );
        } else {
          // Clear all target years
          setSelectedTargetYears([]);
        }
        break;
      case "status":
        if (value) {
          // Clear specific status
          setSelectedStatuses((prev) => prev.filter((item) => item !== value));
        } else {
          // Clear all statuses
          setSelectedStatuses([]);
        }
        break;
      case "date":
        // Clear date range
        setSelectedDateRange({ start: null, end: null });
        break;
      case "all":
        // Clear all filters
        setSelectedOrganizations([]);
        setSelectedOrganizationNames([]);
        setSelectedCorporates([]);
        setSelectedCorporateNames([]);
        setSelectedBaseYears([]);
        setSelectedTargetYears([]);
        setSelectedStatuses([]);
        setSelectedDateRange({ start: null, end: null });
        setSearchQuery("");
        break;
      default:
        break;
    }
  };

  // Add click outside handler for filters
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        orgFilterRef.current &&
        !orgFilterRef.current.contains(event.target)
      ) {
        setIsOrgFilterOpen(false);
      }
      if (
        statusFilterRef.current &&
        !statusFilterRef.current.contains(event.target)
      ) {
        setIsStatusFilterOpen(false);
      }
      if (
        baseYearFilterRef.current &&
        !baseYearFilterRef.current.contains(event.target)
      ) {
        setIsBaseYearFilterOpen(false);
      }
      if (
        targetYearFilterRef.current &&
        !targetYearFilterRef.current.contains(event.target)
      ) {
        setIsTargetYearFilterOpen(false);
      }
      if (
        corpFilterRef.current &&
        !corpFilterRef.current.contains(event.target)
      ) {
        setIsCorporateFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages = Math.ceil(count / itemsPerPage);

  // Check if any filters are active
  const hasActiveFilters =
    selectedOrganizations.length > 0 ||
    selectedCorporates.length > 0 ||
    selectedBaseYears.length > 0 ||
    selectedTargetYears.length > 0 ||
    selectedStatuses.length > 0 ||
    (selectedDateRange.start && selectedDateRange.end) ||
    searchQuery;

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 my-8">
      <div className="mb-8">
        <Image src={empty} alt="No scenarios" className="w-64" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        No Scenarios Present
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-lg">
        Define your goals, set metrics, and visualize your path to achieving
        net-zero emissions. Click the button below to get started.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-blue-600 transition-colors"
        onClick={() => setIsCreateModalOpen(true)}
      >
        Create a New Scenario
        <span className="text-lg font-bold">+</span>
      </button>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 my-8">
      <div className="mb-8 text-red-500">
        <FiX className="w-16 h-16" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Error Loading Scenarios
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-lg">
        {error || "Something went wrong. Please try again later."}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-blue-600 transition-colors"
        onClick={() => fetchScenariosFromAPI()}
      >
        Try Again
      </button>
    </div>
  );

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Scenario Creation Dashboard
            </h1>
            <p className="text-gray-500 mt-1 w-[80%]">
              Create new scenarios, view existing ones, and make adjustments to
              your plans. Track your progress, compare different strategies, and
              visualize your path to achieving net-zero goals. Start by creating
              a new scenario or explore your saved plans to refine and optimize
              your sustainability journey.
            </p>
          </div>

          <div className="w-[20%] flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 w-[210px]"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <span>Create New Scenario</span>
              <span className="font-bold ml-2">+</span>
            </button>
          </div>
        </div>

        {/* Search and Active Filters */}
        <div className="flex justify-between items-center mb-6 mt-2 px-8">
          {/* Active filters - Left side */}
          <div className="flex flex-wrap gap-2">
            {selectedDateRange.start && selectedDateRange.end && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-600">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {`${selectedDateRange.start} - ${selectedDateRange.end} (${dateFilterType})`}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleClearFilter("date")}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {selectedBaseYears.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-600">
                <span className="text-gray-600">Base Year:</span>
                <span className="font-medium">
                  {selectedBaseYears.join(", ")}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleClearFilter("baseYear")}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {selectedTargetYears.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-600">
                <span className="text-gray-600">Target Year:</span>
                <span className="font-medium">
                  {selectedTargetYears.join(", ")}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleClearFilter("targetYear")}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {selectedOrganizationNames.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-600">
                <span className="text-gray-600">Organization:</span>
                <span className="font-medium">
                  {selectedOrganizationNames.join(", ")}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleClearFilter("organization")}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {selectedCorporateNames.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-600">
                <span className="text-gray-600">Corporate:</span>
                <span className="font-medium">
                  {selectedCorporateNames.join(", ")}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleClearFilter("corporate")}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {selectedStatuses.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-600">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium">
                  {selectedStatuses.join(", ")}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleClearFilter("status")}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Clear all filters button - only show when filters are active */}
            {hasActiveFilters && (
              <button
                onClick={() => handleClearFilter("all")}
                className="inline-flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-200"
              >
                <span>Clear all filters</span>
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search - Right side */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search scenarios..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Conditional rendering - show empty state, error state, or table */}
        {error ? (
          <ErrorState />
        ) : count === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <>
            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden px-4">
              {/* Fixed Table header */}
              <div className="sticky top-0 z-10 grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                {/* Scenario Name - Sortable with filter */}
                <div className="col-span-2 relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Scenario name
                    {sortColumn === "name" ? (
                      sortOrder === "asc" ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )
                    ) : (
                      <LuChevronsUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </div>

                {/* Base Year - Sortable with filter */}
                <div className="col-span-1 relative" ref={baseYearFilterRef}>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      // onClick={() => handleSort("base_year")}
                    >
                      Base Year
                    </div>
                    <button
                      onClick={() =>
                        setIsBaseYearFilterOpen(!isBaseYearFilterOpen)
                      }
                      className="hover:bg-gray-100 py-1 px-auto rounded"
                    >
                      <MdFilterList
                        className={`w-4 h-4 ${
                          selectedBaseYears.length > 0
                            ? "text-blue-500"
                            : "text-gray-400"
                        } hover:text-blue-500`}
                      />
                    </button>
                  </div>

                  {isBaseYearFilterOpen && (
                    <FilterModal
                      title="Filter by Base Year"
                      items={baseYears}
                      selectedItems={selectedBaseYears}
                      handleSelection={handleBaseYearSelection}
                      onClose={() => setIsBaseYearFilterOpen(false)}
                    />
                  )}
                </div>

                {/* Target Year - Sortable with filter */}
                <div className="col-span-1 relative" ref={targetYearFilterRef}>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      // onClick={() => handleSort("target_year")}
                    >
                      Target Year
                      {/* {sortColumn === "target_year" ? (
                        sortOrder === "asc" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )
                      ) : (
                        <LuChevronsUpDown className="ml-1 h-4 w-4" />
                      )} */}
                    </div>
                    <button
                      onClick={() =>
                        setIsTargetYearFilterOpen(!isTargetYearFilterOpen)
                      }
                      className="hover:bg-gray-100 py-1 px-auto rounded"
                    >
                      <MdFilterList
                        className={`w-4 h-4 ${
                          selectedTargetYears.length > 0
                            ? "text-blue-500"
                            : "text-gray-400"
                        } hover:text-blue-500`}
                      />
                    </button>
                  </div>

                  {isTargetYearFilterOpen && (
                    <FilterModal
                      title="Filter by Target Year"
                      items={targetYears}
                      selectedItems={selectedTargetYears}
                      handleSelection={handleTargetYearSelection}
                      onClose={() => setIsTargetYearFilterOpen(false)}
                    />
                  )}
                </div>

                {/* Organization - With filter */}
                <div className="col-span-1 relative" ref={orgFilterRef}>
                  <div className="flex items-center gap-2">
                    <span>Organization</span>
                    <button
                      onClick={() => setIsOrgFilterOpen(!isOrgFilterOpen)}
                      className="hover:bg-gray-100 py-1 px-auto rounded"
                    >
                      <MdFilterList
                        className={`w-4 h-4 ${
                          selectedOrganizations.length > 0
                            ? "text-blue-500"
                            : "text-gray-400"
                        } hover:text-blue-500`}
                      />
                    </button>
                  </div>

                  {isOrgFilterOpen && (
                    <FilterModal
                      title="Filter by Organization"
                      items={organizations}
                      selectedItems={selectedOrganizations}
                      handleSelection={handleOrgSelection}
                      onClose={() => setIsOrgFilterOpen(false)}
                    />
                  )}
                </div>

                {/* Corporate - With filter */}
                <div className="col-span-1 relative" ref={corpFilterRef}>
                  <div className="flex items-center gap-2">
                    <span>Corporate</span>
                    <button
                      onClick={() =>
                        setIsCorporateFilterOpen(!isCorporateFilterOpen)
                      }
                      className="hover:bg-gray-100 py-1 px-auto rounded"
                    >
                      <MdFilterList
                        className={`w-4 h-4 ${
                          selectedCorporates.length > 0
                            ? "text-blue-500"
                            : "text-gray-400"
                        } hover:text-blue-500`}
                      />
                    </button>
                  </div>

                  {isCorporateFilterOpen && (
                    <FilterModal
                      title="Filter by Corporate"
                      items={corporates}
                      selectedItems={selectedCorporates}
                      handleSelection={handleCorporateSelection}
                      onClose={() => setIsCorporateFilterOpen(false)}
                    />
                  )}
                </div>

                {/* Created - Sortable */}
                <div
                  className="col-span-1 flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("created_at")}
                >
                  Created
                  {sortColumn === "created_at" ? (
                    sortOrder === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )
                  ) : (
                    <LuChevronsUpDown className="ml-1 h-4 w-4" />
                  )}
                </div>

                {/* Edited - Sortable */}
                <div
                  className="col-span-1 flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("created_at")}
                >
                  Edited
                  {sortColumn === "created_at" ? (
                    sortOrder === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )
                  ) : (
                    <LuChevronsUpDown className="ml-1 h-4 w-4" />
                  )}
                </div>

                <div className="col-span-1 text-right">Action</div>
              </div>

              {/* Scrollable Table body */}
              <div className="min-h-[410px] max-h-[410px] overflow-y-auto">
                <div className="divide-y divide-gray-200">
                  {isLoading ? (
                    <div className="py-12 flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    scenarios.map((scenario) => (
                      <div
                        key={scenario.id}
                        className="grid grid-cols-9 gap-4 px-6 py-4 hover:bg-gray-50"
                      >
                        <div className="col-span-2 font-medium text-blue-600">
                          {scenario.name}
                          {scenario.status === "Draft" && (
                            <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              Draft
                            </span>
                          )}
                        </div>

                        <div className="col-span-1 text-slate-600">
                          {scenario.base_year}
                        </div>
                        <div className="col-span-1 text-slate-600">
                          {scenario.target_year}
                        </div>
                        <div className="col-span-1 text-slate-600">
                          {scenario.organization_name}
                        </div>
                        <div className="col-span-1 text-slate-600">
                          {scenario.corporate_name || (
                            <span className="text-slate-400 text-sm font-semibold">
                              Not Applicable
                            </span>
                          )}
                        </div>

                        <div className="col-span-1 text-slate-600">
                          <div>{scenario.created_by_name}</div>
                          <div className="text-xs">
                            <Moment format="DD/MM/YYYY">
                              {scenario.created_at}
                            </Moment>
                          </div>
                        </div>

                        <div className="col-span-1 text-slate-600">
                          <div>{scenario.updated_by_name}</div>
                          <div className="text-xs">
                            <Moment format="DD/MM/YYYY">
                              {scenario.updated_at}
                            </Moment>
                          </div>
                        </div>

                        <div className="col-span-1 flex justify-end gap-3">
                          <button
                            className="text-gray-500 hover:text-blue-600"
                            title="View"
                            onClick={() => handleViewScenario(scenario)}
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            className="text-gray-500 hover:text-indigo-600"
                            title="Edit"
                            onClick={() =>
                              router.push(`Optimise/${scenario.id}/edit`)
                            }
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            className="text-gray-500 hover:text-red-600"
                            title="Delete"
                            onClick={() => handleDeleteClick(scenario)}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Pagination - Centered as per design */}
            <div className="flex items-center justify-center mt-4 mb-4 gap-4">
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
                          ? "bg-white text-blue-500 border border-gray-200 font-semibold"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-gray-200 disabled:opacity-50"
                >
                  <FiChevronRight />
                </button>
              </div>

              <div className="flex items-center">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-200 rounded-md px-3 py-1"
                >
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
                  <option value="50">50 per page</option>
                </select>

                <div className="text-sm text-gray-500 ml-4">
                  Showing{" "}
                  {scenarios.length > 0
                    ? (currentPage - 1) * itemsPerPage + 1
                    : 0}{" "}
                  to {Math.min(currentPage * itemsPerPage, count)} of {count}{" "}
                  scenarios
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Delete confirmation modal */}
      <DeleteScenarioModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        scenarioData={scenarioToDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* View scenario modal */}
      <ScenarioViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        scenarioData={scenarioToView}
      />

      {/* Create scenario modal */}
      <CreateScenarioModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateScenario={handleCreateScenario}
      />
    </>
  );
};

export default ScenarioTable;
