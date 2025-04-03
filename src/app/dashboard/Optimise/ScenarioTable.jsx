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

const ScenarioTable = () => {
  // Main states
  const [scenarios, setScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
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
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Sample data
  const organizations = [
    { id: 1, name: "Org Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    { id: 2, name: "Org B" },
    { id: 3, name: "Org C" },
    { id: 4, name: "Org D" },
  ];

  const corporates = [
    { id: 1, name: "Corp A" },
    { id: 2, name: "Corp B" },
    { id: 3, name: "Corp C" },
    { id: 4, name: "Corp D" },
  ];

  // Status options
  const statusOptions = [
    { id: "draft", label: "Draft" },
    { id: "in_progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];

  // Sample data for scenarios
  const sampleScenarios = [
    {
      id: 1,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 2,
      name: "Scenario A",
      status: "In Progress",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 3,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 4,
      name: "Scenario B",
      status: "Completed",
      baseYear: 2023,
      targetYear: 2035,
      organization: "Org B",
      corporate: "Corp B",
      created: "2023-02-15T00:00:00",
      edited: "2025-03-10T14:30:22",
      createdBy: "Lisa Simpson",
      editedBy: "Lisa Simpson",
    },
    {
      id: 5,
      name: "Scenario C",
      status: "In Progress",
      baseYear: 2025,
      targetYear: 2040,
      organization: "Org C",
      corporate: "Corp C",
      created: "2023-05-05T00:00:00",
      edited: "2025-02-20T09:22:11",
      createdBy: "Bart Simpson",
      editedBy: "Bart Simpson",
    },
    {
      id: 1,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 2,
      name: "Scenario A",
      status: "In Progress",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 3,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 4,
      name: "Scenario B",
      status: "Completed",
      baseYear: 2023,
      targetYear: 2035,
      organization: "Org B",
      corporate: "Corp B",
      created: "2023-02-15T00:00:00",
      edited: "2025-03-10T14:30:22",
      createdBy: "Lisa Simpson",
      editedBy: "Lisa Simpson",
    },
    {
      id: 5,
      name: "Scenario C",
      status: "In Progress",
      baseYear: 2025,
      targetYear: 2040,
      organization: "Org C",
      corporate: "Corp C",
      created: "2023-05-05T00:00:00",
      edited: "2025-02-20T09:22:11",
      createdBy: "Bart Simpson",
      editedBy: "Bart Simpson",
    },
    {
      id: 1,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 2,
      name: "Scenario A",
      status: "In Progress",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 3,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 4,
      name: "Scenario B",
      status: "Completed",
      baseYear: 2023,
      targetYear: 2035,
      organization: "Org B",
      corporate: "Corp B",
      created: "2023-02-15T00:00:00",
      edited: "2025-03-10T14:30:22",
      createdBy: "Lisa Simpson",
      editedBy: "Lisa Simpson",
    },
    {
      id: 5,
      name: "Scenario C",
      status: "In Progress",
      baseYear: 2025,
      targetYear: 2040,
      organization: "Org C",
      corporate: "Corp C",
      created: "2023-05-05T00:00:00",
      edited: "2025-02-20T09:22:11",
      createdBy: "Bart Simpson",
      editedBy: "Bart Simpson",
    },
    {
      id: 1,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 2,
      name: "Scenario A",
      status: "In Progress",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 3,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 4,
      name: "Scenario B",
      status: "Completed",
      baseYear: 2023,
      targetYear: 2035,
      organization: "Org B",
      corporate: "Corp B",
      created: "2023-02-15T00:00:00",
      edited: "2025-03-10T14:30:22",
      createdBy: "Lisa Simpson",
      editedBy: "Lisa Simpson",
    },
    {
      id: 5,
      name: "Scenario C",
      status: "In Progress",
      baseYear: 2025,
      targetYear: 2040,
      organization: "Org C",
      corporate: "Corp C",
      created: "2023-05-05T00:00:00",
      edited: "2025-02-20T09:22:11",
      createdBy: "Bart Simpson",
      editedBy: "Bart Simpson",
    },
    {
      id: 1,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 2,
      name: "Scenario A",
      status: "In Progress",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 3,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 4,
      name: "Scenario B",
      status: "Completed",
      baseYear: 2023,
      targetYear: 2035,
      organization: "Org B",
      corporate: "Corp B",
      created: "2023-02-15T00:00:00",
      edited: "2025-03-10T14:30:22",
      createdBy: "Lisa Simpson",
      editedBy: "Lisa Simpson",
    },
    {
      id: 5,
      name: "Scenario C",
      status: "In Progress",
      baseYear: 2025,
      targetYear: 2040,
      organization: "Org C",
      corporate: "Corp C",
      created: "2023-05-05T00:00:00",
      edited: "2025-02-20T09:22:11",
      createdBy: "Bart Simpson",
      editedBy: "Bart Simpson",
    },
    {
      id: 1,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 2,
      name: "Scenario A",
      status: "In Progress",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 3,
      name: "Scenario A",
      status: "Draft",
      baseYear: 2024,
      targetYear: 2030,
      organization: "Org A",
      corporate: "Corp A",
      created: "2023-01-27T00:00:00",
      edited: "2025-03-18T10:14:53",
      createdBy: "Homer Simpson",
      editedBy: "Homer Simpson",
    },
    {
      id: 4,
      name: "Scenario B",
      status: "Completed",
      baseYear: 2023,
      targetYear: 2035,
      organization: "Org B",
      corporate: "Corp B",
      created: "2023-02-15T00:00:00",
      edited: "2025-03-10T14:30:22",
      createdBy: "Lisa Simpson",
      editedBy: "Lisa Simpson",
    },
    {
      id: 5,
      name: "Scenario C",
      status: "In Progress",
      baseYear: 2025,
      targetYear: 2040,
      organization: "Org C",
      corporate: "Corp C",
      created: "2023-05-05T00:00:00",
      edited: "2025-02-20T09:22:11",
      createdBy: "Bart Simpson",
      editedBy: "Bart Simpson",
    },
  ];

  // Get unique base and target years
  const baseYears = [...new Set(sampleScenarios.map((s) => s.baseYear))];
  const targetYears = [...new Set(sampleScenarios.map((s) => s.targetYear))];

  // Fetch scenarios (simulation)
  const fetchScenarios = async (
    searchQuery = "",
    page = 1,
    dateFilterType = "created",
    dateFilterValue = {}
  ) => {
    setIsLoading(true);
    try {
      // This would normally be an API call
      // For now, let's filter the sample data
      let filteredScenarios = [...sampleScenarios];

      // Apply search filter
      if (searchQuery) {
        filteredScenarios = filteredScenarios.filter((scenario) =>
          scenario.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply organization filter
      if (selectedOrganizations.length > 0) {
        filteredScenarios = filteredScenarios.filter((scenario) =>
          selectedOrganizations.includes(scenario.organization)
        );
      }

      // Apply corporate filter
      if (selectedCorporates.length > 0) {
        filteredScenarios = filteredScenarios.filter((scenario) =>
          selectedCorporates.includes(scenario.corporate)
        );
      }

      // Apply base year filter
      if (selectedBaseYears.length > 0) {
        filteredScenarios = filteredScenarios.filter((scenario) =>
          selectedBaseYears.includes(scenario.baseYear)
        );
      }

      // Apply target year filter
      if (selectedTargetYears.length > 0) {
        filteredScenarios = filteredScenarios.filter((scenario) =>
          selectedTargetYears.includes(scenario.targetYear)
        );
      }

      // Apply status filter
      if (selectedStatuses.length > 0) {
        filteredScenarios = filteredScenarios.filter((scenario) =>
          selectedStatuses.includes(scenario.status)
        );
      }

      // Apply date range filter if applicable
      if (selectedDateRange?.start && selectedDateRange?.end) {
        const startDate = new Date(selectedDateRange.start).getTime();
        const endDate = new Date(selectedDateRange.end).getTime();

        filteredScenarios = filteredScenarios.filter((scenario) => {
          const dateToCheck =
            dateFilterType === "created"
              ? new Date(scenario.created).getTime()
              : new Date(scenario.edited).getTime();
          return dateToCheck >= startDate && dateToCheck <= endDate;
        });
      }

      // Apply sorting if needed
      if (sortColumn) {
        filteredScenarios.sort((a, b) => {
          let valueA = a[sortColumn];
          let valueB = b[sortColumn];

          if (sortColumn === "created" || sortColumn === "edited") {
            valueA = new Date(valueA);
            valueB = new Date(valueB);
          } else if (typeof valueA === "string") {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
          }

          if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
          if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      }

      setCount(filteredScenarios.length);

      // Simulate pagination
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedScenarios = filteredScenarios.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      setScenarios(paginatedScenarios);
    } catch (error) {
      console.error("Error fetching scenarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (scenario) => {
    setScenarioToDelete(scenario);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Here you would implement the actual delete functionality
    // For example:
    deleteScenario(scenarioToDelete.id);

    // For now, we'll just remove it from the local state
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
  };

  // View scenario handler
  const handleViewScenario = (scenario) => {
    setScenarioToView(scenario);
    setIsViewModalOpen(true);
  };

  // Initial fetch and refetch on filter/search/pagination changes
  useEffect(() => {
    fetchScenarios(searchQuery, currentPage, dateFilterType, selectedDateRange);
  }, [
    selectedOrganizations,
    selectedCorporates,
    selectedBaseYears,
    selectedTargetYears,
    selectedStatuses,
    currentPage,
    itemsPerPage,
    sortColumn,
    sortOrder,
  ]);

  // Debounced search
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchScenarios(
        searchQuery,
        currentPage,
        dateFilterType,
        selectedDateRange
      );
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Selection handlers for different filter types
  const handleOrgSelection = (org) => {
    setSelectedOrganizations((prev) => {
      if (prev.includes(org)) {
        return prev.filter((item) => item !== org);
      }
      return [...prev, org];
    });
  };

  const handleStatusSelection = (status) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(status)) {
        return prev.filter((item) => item !== status);
      }
      return [...prev, status];
    });
  };

  const handleBaseYearSelection = (year) => {
    setSelectedBaseYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((item) => item !== year);
      }
      return [...prev, year];
    });
  };

  const handleTargetYearSelection = (year) => {
    setSelectedTargetYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((item) => item !== year);
      }
      return [...prev, year];
    });
  };

  const handleCorporateSelection = (corp) => {
    setSelectedCorporates((prev) => {
      if (prev.includes(corp)) {
        return prev.filter((item) => item !== corp);
      }
      return [...prev, corp];
    });
  };

  const router = useRouter();

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
                  className="w-4 h-4 green-checkbox rounded border-gray-300"
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
            Create new scenarios, view existing ones, and make adjustments to your plans. Track your progress, compare different strategies, and visualize your path to achieving net-zero goals. Start by creating a new scenario or explore your saved plans to refine and optimize your sustainability journey.
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
                  onClick={() =>
                    setSelectedDateRange({ start: null, end: null })
                  }
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
                  onClick={() => setSelectedBaseYears([])}
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
                  onClick={() => setSelectedTargetYears([])}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {selectedOrganizations.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-600">
                <span className="text-gray-600">Organization:</span>
                <span className="font-medium">
                  {selectedOrganizations.join(", ")}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedOrganizations([])}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {selectedCorporates.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-600">
                <span className="text-gray-600">Corporate:</span>
                <span className="font-medium">
                  {selectedCorporates.join(", ")}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedCorporates([])}
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
                  onClick={() => setSelectedStatuses([])}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
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
          </div>
        </div>

        {/* Conditional rendering - show empty state or table */}
        {count === 0 && !isLoading ? (
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
                      onClick={() => handleSort("baseYear")}
                    >
                      Base Year
                      {sortColumn === "baseYear" ? (
                        sortOrder === "asc" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )
                      ) : (
                        <LuChevronsUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setIsBaseYearFilterOpen(!isBaseYearFilterOpen)
                      }
                      className="hover:bg-gray-100 p-1 rounded"
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
                      onClick={() => handleSort("targetYear")}
                    >
                      Target Year
                      {sortColumn === "targetYear" ? (
                        sortOrder === "asc" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )
                      ) : (
                        <LuChevronsUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setIsTargetYearFilterOpen(!isTargetYearFilterOpen)
                      }
                      className="hover:bg-gray-100 p-1 rounded"
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
                      className="hover:bg-gray-100 p-1 rounded"
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
                      className="hover:bg-gray-100 p-1 rounded"
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
                  onClick={() => handleSort("created")}
                >
                  Created
                  {sortColumn === "created" ? (
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
                  onClick={() => handleSort("edited")}
                >
                  Edited
                  {sortColumn === "edited" ? (
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
              <div className="max-h-[410px] overflow-y-auto">
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

                        <div className="col-span-1">{scenario.baseYear}</div>
                        <div className="col-span-1">{scenario.targetYear}</div>
                        <div className="col-span-1">
                          {scenario.organization}
                        </div>
                        <div className="col-span-1">{scenario.corporate}</div>

                        <div className="col-span-1 text-gray-500">
                          <div>{scenario.createdBy}</div>
                          <div className="text-xs">
                            <Moment format="DD/MM/YYYY">
                              {scenario.created}
                            </Moment>
                          </div>
                        </div>

                        <div className="col-span-1 text-gray-500">
                          <div>{scenario.editedBy}</div>
                          <div className="text-xs">
                            <Moment format="DD/MM/YYYY">
                              {scenario.edited}
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

                {/* <div className="text-sm text-gray-500 ml-4">
                Showing {scenarios.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
                {Math.min(currentPage * itemsPerPage, count)} of {count} scenarios
              </div> */}
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
        scenarioData={scenarioToView}
      />
    </>
  );
};

export default ScenarioTable;
