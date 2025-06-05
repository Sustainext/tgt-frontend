import React, { useState, useEffect, useRef, useMemo, memo, useCallback } from "react";
import {
  FiX,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
} from "react-icons/fi";
import Moment from "react-moment";
import { Oval } from "react-loader-spinner";
import axiosInstance, { patch } from "../../utils/axiosMiddleware";
import TaskDetailsModal from "./TaskDetailsModal";
import { MdFilePresent } from "react-icons/md";
import { debounce } from "lodash";
import { FaCalendarAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { LuChevronsUpDown } from "react-icons/lu";
import { fetchUsers } from "@/lib/redux/features/emissionSlice";
import { MdFilterList } from "react-icons/md";
import { useSelector } from "react-redux";
import DateRangePicker from "@/app/shared/components/DateRangeWithType";
import ReviewTasksModal from "./ReviewTasksModal";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";

// Move StatusFilterModal outside and memoize it
const StatusFilterModal = memo(({ 
  selectedStatuses, 
  setSelectedStatuses, 
  setIsStatusFilterOpen 
}) => {
  const handleStatusToggle = useCallback((statusId) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(statusId)) {
        return prev.filter((id) => id !== statusId);
      }
      return [...prev, statusId];
    });
  }, [setSelectedStatuses]);

  const handleClearFilters = useCallback(() => {
    setSelectedStatuses([]);
  }, [setSelectedStatuses]);

  const handleClose = useCallback(() => {
    setIsStatusFilterOpen(false);
  }, [setIsStatusFilterOpen]);

  const statusOptions = useMemo(() => [
    { id: "not_started", label: "Not Started" },
    { id: "in_progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "approved", label: "Approved" },
    { id: "reject", label: "Rejected" },
  ], []);

  return (
    <div className="absolute z-50 top-full mt-2 right-0 bg-white rounded-lg shadow-lg w-72 border border-gray-200">
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-900">
            Filter by Status
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
            type="button"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {statusOptions.map((status) => (
            <div
              key={status.id}
              className="flex items-center gap-3 py-2 px-1 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => handleStatusToggle(status.id)}
            >
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status.id)}
                onChange={() => handleStatusToggle(status.id)}
                onClick={(e) => e.stopPropagation()}
                className="w-4 h-4 green-checkbox rounded border-gray-300"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {status.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
            type="button"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
});

StatusFilterModal.displayName = 'StatusFilterModal';

// Move AssigneeFilterModal outside and memoize it
const AssigneeFilterModal = memo(({ 
  users,
  selectedAssignees, 
  setSelectedAssignees, 
  assigneeSearchQuery,
  setAssigneeSearchQuery,
  setIsAssigneeFilterOpen 
}) => {
  const handleAssigneeToggle = useCallback((userId) => {
    setSelectedAssignees((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      return [...prev, userId];
    });
  }, [setSelectedAssignees]);

  const handleClearFilters = useCallback(() => {
    setSelectedAssignees([]);
    setAssigneeSearchQuery("");
  }, [setSelectedAssignees, setAssigneeSearchQuery]);

  const handleSearchChange = useCallback((e) => {
    setAssigneeSearchQuery(e.target.value);
  }, [setAssigneeSearchQuery]);

  const handleClose = useCallback(() => {
    setIsAssigneeFilterOpen(false);
  }, [setIsAssigneeFilterOpen]);

  // Memoize the filtered users to prevent unnecessary recalculations
  const filteredUsers = useMemo(() => {
    if (!users || !Array.isArray(users)) return [];
    
    return users.filter((user) => {
      const searchQuery = assigneeSearchQuery.toLowerCase();
      const username = user.username?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      const name = user.name?.toLowerCase() || '';
      
      return username.includes(searchQuery) || 
             email.includes(searchQuery) || 
             name.includes(searchQuery);
    });
  }, [users, assigneeSearchQuery]);

  return (
    <div className="absolute z-50 top-full mt-2 right-0 bg-white rounded-lg shadow-lg w-72 border border-gray-200">
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-900">
            Filter by Assignee
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
            type="button"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Search assignees..."
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={assigneeSearchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Assignee list */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 py-2 px-1 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => handleAssigneeToggle(user.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedAssignees.includes(user.id)}
                  onChange={() => handleAssigneeToggle(user.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 green-checkbox rounded border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user.name || user.username}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 text-center py-4">
              {assigneeSearchQuery ? 'No users found' : 'No users available'}
            </div>
          )}
        </div>
        
        <div className="flex justify-center items-center mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            type="button"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
});

AssigneeFilterModal.displayName = 'AssigneeFilterModal';

const TasksPage = () => {
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  
  //Assignee filter
  const [users, setUsers] = useState(
    useSelector((state) => state.emissions.users.data)
  );
  const [isAssigneeFilterOpen, setIsAssigneeFilterOpen] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [assigneeSearchQuery, setAssigneeSearchQuery] = useState("");
  const assigneeFilterRef = useRef(null);
  
  //Status filter
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const statusFilterRef = useRef(null);
  
  //Date range filter
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);
  const dateRangeRef = useRef(null);
  
  const getDefaultDateRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);

    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    };
  };

  // Replace your state initialization
  const [selectedDateRange, setSelectedDateRange] = useState(
    getDefaultDateRange()
  );
  const [dateFilterType, setDateFilterType] = useState("assigned");
  
  // Review Tasks
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  const openReviewModal = () => {
    if (selectedTasks.length === 0) {
      toast.error("Please select tasks to review", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setIsReviewModalOpen(true);
  };

  // Sorting state
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";

      // Sort the tasks array based on the selected column and order
      const sortedTasks = [...tasks].sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        // Convert date strings to Date objects for proper sorting
        if (column === "created_at" || column === "deadline") {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        } else if (column === "task_name") {
          // Alphabetical sorting (case insensitive)
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) return newOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return newOrder === "asc" ? 1 : -1;
        return 0;
      });

      setTasks(sortedTasks);
      return newOrder;
    });
  };

const DateRangeModal = () => {
  const handleDateRangeApply = (data) => {
    // Validate date range
    if (!data.start || !data.end) {
      toast.error("Please select both start and end dates", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const startDate = new Date(data.start);
    const endDate = new Date(data.end);
    
    if (startDate > endDate) {
      toast.error("Start date cannot be after end date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    console.log("DateRangePicker data:", data);
    const newDateRange = { start: data.start, end: data.end };
    setSelectedDateRange(newDateRange);
    setDateFilterType(data.type || dateFilterType);
    setIsDateRangePickerOpen(false);
  };

  const handleClose = () => {
    setIsDateRangePickerOpen(false);
  };

  // Handle date filter type change
  const handleDateFilterTypeChange = (newType) => {
    setDateFilterType(newType);
  };

  // Prevent all event bubbling from this modal
  const handleModalClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <div 
      className="absolute top-full mt-2 z-50 bg-white border border-gray-200 shadow-md rounded-lg"
      onClick={handleModalClick}
      onMouseDown={handleModalClick}
      onMouseUp={handleModalClick}
    >
      <div 
        onClick={handleModalClick}
        onMouseDown={handleModalClick}
        onMouseUp={handleModalClick}
      >
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">
            Select Date Range
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
        <div 
          onClick={handleModalClick}
          onMouseDown={handleModalClick}
          onMouseUp={handleModalClick}
        >
          <DateRangePicker
            startDate={selectedDateRange.start}
            endDate={selectedDateRange.end}
            onDateChange={handleDateRangeApply}
            dateFilterType={dateFilterType}
            onDateFilterTypeChange={handleDateFilterTypeChange}
          />
        </div>
      </div>
    </div>
  );
};

  useEffect(() => {
    fetchUsers();

    // Add click outside handler only for date range picker
    const handleDateRangeClickOutside = (event) => {
      if (
        dateRangeRef.current &&
        !dateRangeRef.current.contains(event.target) &&
        isDateRangePickerOpen
      ) {
        setIsDateRangePickerOpen(false);
      }
    };

    if (isDateRangePickerOpen) {
      document.addEventListener("mousedown", handleDateRangeClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleDateRangeClickOutside);
    };
  }, [isDateRangePickerOpen]);

  // Handle assignee selection (for backward compatibility)
  const handleAssigneeSelection = (userId, event) => {
    if (event) {
      event.stopPropagation();
    }
    setSelectedAssignees((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      return [...prev, userId];
    });
  };

  // Add handler for row selection
  const handleRowSelection = (taskId) => {
    setSelectedTasks((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      }
      return [...prev, taskId];
    });
  };

  // Add handler for selecting all visible tasks
  const handleSelectAllVisible = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map((task) => task.id));
    }
  };

  // Add date range validation
  const validateDateRange = () => {
    if (!selectedDateRange.start || !selectedDateRange.end) {
      toast.warning("No date range selected. Using default last 30 days.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    return true;
  };

  const fetchTasks = async (
    searchQuery = "",
    tab = "for_review",
    page = 1,
    dateFilterType = "assigned",
    dateFilterValue = selectedDateRange
  ) => {
    setIsLoading(true);
    try {
      const assigneeFilter =
        selectedAssignees.length > 0 ? selectedAssignees.join(",") : "";
      const statusFilter =
        selectedStatuses.length > 0 ? selectedStatuses.join(",") : "";

      // Date filters - use the passed dateFilterValue or current selectedDateRange
      const dateRange = dateFilterValue || selectedDateRange;
      let dateFilters = "";
      if (dateRange?.start && dateRange?.end) {
        console.log("Using dateRange:", dateRange);

        if (dateFilterType === "due") {
          dateFilters = `&deadline_start=${dateRange.start}&deadline_end=${dateRange.end}`;
        } else if (dateFilterType === "assigned") {
          dateFilters = `&start_date=${dateRange.start}&end_date=${dateRange.end}`;
        }
      } else {
        // Use default date range if none selected
        const defaultRange = getDefaultDateRange();
        dateFilters = `&start_date=${defaultRange.start}&end_date=${defaultRange.end}`;
      }

      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/sustainapp/user_all_task/?search=${searchQuery}&activetab=${tab}&page=${page}&page_size=${itemsPerPage}&assigned_to=${assigneeFilter}&status=${statusFilter}${dateFilters}`
      );

      setCount(response.data.count);
      setTasks(response.data.results || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(
      searchQuery,
      activeTab,
      currentPage,
      dateFilterType,
      selectedDateRange
    );
  }, [
    activeTab,
    currentPage,
    itemsPerPage,
    selectedAssignees,
    selectedStatuses,
    selectedDateRange,
    dateFilterType,
  ]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      setIsLoading(true);
      try {
        const assigneeFilter =
          selectedAssignees.length > 0 ? selectedAssignees.join(",") : "";
        const statusFilter =
          selectedStatuses.length > 0 ? selectedStatuses.join(",") : "";

        // Date filters
        let dateFilters = "";
        if (selectedDateRange?.start && selectedDateRange?.end) {
          if (dateFilterType === "due") {
            dateFilters = `&deadline_start=${selectedDateRange.start}&deadline_end=${selectedDateRange.end}`;
          } else if (dateFilterType === "assigned") {
            dateFilters = `&start_date=${selectedDateRange.start}&end_date=${selectedDateRange.end}`;
          }
        } else {
          // Use default date range if none selected
          const defaultRange = getDefaultDateRange();
          dateFilters = `&start_date=${defaultRange.start}&end_date=${defaultRange.end}`;
        }

        const response = await axiosInstance.get(
          `${process.env.BACKEND_API_URL}/sustainapp/user_all_task/?search=${searchQuery}&activetab=${activeTab}&page=${currentPage}&page_size=${itemsPerPage}&assigned_to=${assigneeFilter}&status=${statusFilter}${dateFilters}`
        );

        setCount(response.data.count);
        setTasks(response.data.results || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    if (searchQuery) {
      debouncedFetch();
    } else {
      // Fetch immediately for filters, pagination, and other changes
      debouncedFetch.flush();
      fetchTasks("", activeTab, currentPage, dateFilterType, selectedDateRange);
    }

    return () => debouncedFetch.cancel();
  }, [
    searchQuery,
    activeTab,
    currentPage,
    itemsPerPage,
    selectedAssignees,
    selectedStatuses,
    selectedDateRange,
    dateFilterType,
  ]);

  const handleTaskClick = (task) => {
    console.log("Task clicked:", task);
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const totalPages = Math.ceil(count / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "in_progress":
        return "bg-[#FDB022]";
      case "approved":
        return "bg-[#12B76A]";
      case "under_review":
        return "bg-orange-400";
      case "completed":
        return "bg-[#12B76A]";
      case "reject":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "not_started":
        return "Not Started";
      case "in_progress":
        return "In Progress";
      case "under_review":
        return "Under Review";
      case "completed":
        return "Completed";
      case "approved":
        return "Approved";
      case "reject":
        return "Rejected";
      default:
        return status;
    }
  };

  const handleTaskAction = async (taskId, action, payload) => {
    try {
      let url = `${process.env.BACKEND_API_URL}/organization_task_dashboard/bulk-update/`;

      const response = await patch(url, payload);

      if (response.status === 200 || response.status === 204) {
        setSelectedTasks([]);
        return response.data;
      } else {
        throw new Error("Failed to perform the task action");
      }
    } catch (error) {
      console.error("Error in handleTaskAction:", error);
      throw error; // Let the calling function handle the error
    }
  };

  const formatDateRangeDisplay = (startDate, endDate, filterType) => {
    if (!startDate || !endDate) return "No date range selected";

    const today = new Date().toISOString().split("T")[0];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if end date is today
    if (endDate === today) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Last ${diffDays} days (${filterType})`;
    }

    // Otherwise show the full date range
    return `${startDate} - ${endDate} (${filterType})`;
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />

      <div className="xl:p-4 p-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
            <p className="text-gray-500">List of tasks</p>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 min-w-[25vw] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-3 md:space-y-0">
          {/* Tab Buttons */}
          <div className="bg-white rounded-md shadow-sm border border-gray-300 overflow-x-auto flex md:inline-flex w-full md:w-auto">
            {[
              { id: "upcoming", label: "Upcoming" },
              { id: "overdue", label: "Overdue" },
              { id: "completed", label: "Completed" },
              { id: "for_review", label: "For Review" },
            ].map((tab, index, array) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                  index !== array.length - 1 ? "border-r" : ""
                } border-gray-300 ${
                  activeTab === tab.id
                    ? "bg-[#f8f9fb] text-gray-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Review Button */}
          {activeTab === "for_review" && (
            <div className="md:ml-8 md:self-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-70 w-full md:w-auto"
                disabled={selectedTasks.length === 0}
                onClick={openReviewModal}
              >
                Review Tasks ({selectedTasks.length})
              </button>
            </div>
          )}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {/* Date Range Picker */}
            <div className="relative" ref={dateRangeRef}>
              <button
                className="inline-flex items-center gap-2 text-gray-600 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDateRangePickerOpen(!isDateRangePickerOpen);
                }}
              >
                <FaCalendarAlt className="w-4 h-4" />
                <span>Set Date Range</span>
                <FiChevronDown className="w-4 h-4" />
              </button>

              {/* DateRangePicker */}
              {isDateRangePickerOpen && <DateRangeModal />}
            </div>

            {/* Selected Date Range */}
            {selectedDateRange.start && selectedDateRange.end && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-blue-500 font-semibold">
                <span>
                  {formatDateRangeDisplay(
                    selectedDateRange.start,
                    selectedDateRange.end,
                    dateFilterType
                  )}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    const defaultRange = getDefaultDateRange();
                    setSelectedDateRange(defaultRange);
                    setDateFilterType("assigned");
                    toast.info("Reset to default date range (last 30 days)", {
                      position: "top-right",
                      autoClose: 2000,
                    });
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {selectedAssignees.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
                <span className="text-gray-600">Assignee:</span>
                <span className="text-blue-500 font-semibold">
                  {selectedAssignees.length} Selected
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedAssignees([])}
                >
                  ×
                </button>
              </div>
            )}

            {selectedStatuses.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
                <span className="text-gray-600">Status:</span>
                <span className="text-blue-500 font-semibold">
                  {selectedStatuses
                    .map((status) => getStatusLabel(status))
                    .join(", ")}
                </span>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedStatuses([])}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modified Table Header */}
        {/* desktop version */}
        <div className=" xl:block hidden">
          <div className="bg-white rounded-lg flex flex-col h-[calc(100vh-280px)]">
            <div className="grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-medium text-gray-500">
              <div className="col-span-3 flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedTasks.length === tasks.length && tasks.length > 0}
                  onChange={handleSelectAllVisible}
                  className={`w-4 h-4 green-checkbox rounded border-gray-300 ${
                    activeTab === "for_review" ? "" : "opacity-0"
                  }`}
                  disabled={activeTab !== "for_review"}
                />
                <div
                  className="col-span-3 flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("task_name")}
                >
                  Tasks
                  {sortColumn === "task_name" &&
                    (sortOrder === "asc" ? (
                      <FiChevronUp />
                    ) : sortOrder === "desc" ? (
                      <FiChevronDown />
                    ) : (
                      <LuChevronsUpDown />
                    ))}
                </div>
              </div>
              <div className="col-span-1 relative" ref={statusFilterRef}>
                <div className="flex items-center gap-2">
                  Status
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsStatusFilterOpen(!isStatusFilterOpen);
                    }}
                    className="hover:bg-gray-100 p-1 rounded"
                  >
                    <MdFilterList className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Filter Popover */}
                {isStatusFilterOpen && (
                  <StatusFilterModal 
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                    setIsStatusFilterOpen={setIsStatusFilterOpen}
                  />
                )}
              </div>
              <div className="col-span-2 relative" ref={assigneeFilterRef}>
                <div className="flex items-center gap-2">
                  Assignee
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsAssigneeFilterOpen(!isAssigneeFilterOpen);
                    }}
                    className="hover:bg-gray-100 p-1 rounded"
                  >
                    <MdFilterList className="w-4 h-4" />
                  </button>
                </div>

                {/* Assignee Filter Popover */}
                {isAssigneeFilterOpen && (
                  <AssigneeFilterModal 
                    users={users}
                    selectedAssignees={selectedAssignees}
                    setSelectedAssignees={setSelectedAssignees}
                    assigneeSearchQuery={assigneeSearchQuery}
                    setAssigneeSearchQuery={setAssigneeSearchQuery}
                    setIsAssigneeFilterOpen={setIsAssigneeFilterOpen}
                  />
                )}
              </div>
              {/* Assigned On Sorting */}
              <div
                className="col-span-1 flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("created_at")}
              >
                Assigned on
                {sortColumn === "created_at" &&
                  (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
              </div>

              {/* Due Date Sorting */}
              <div
                className="col-span-1 flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("deadline")}
              >
                Due Date
                {sortColumn === "deadline" &&
                  (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
              </div>
              <div className="col-span-1">Attachment</div>
            </div>

            {/* Modified Table Body */}
            <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Oval height={40} width={40} color="#0000FF" secondaryColor="#ddd" />
                </div>
              ) : tasks.length === 0 ? (
                <div className="flex justify-center items-center py-8 text-gray-500">
                  No tasks found
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-9 gap-4 px-6 py-4 hover:bg-gray-50"
                  >
                    <div className="col-span-3 flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedTasks.includes(task.id)}
                        onChange={() => handleRowSelection(task.id)}
                        className={`w-4 h-4 green-checkbox rounded border-gray-300 ${
                          activeTab === "for_review" ? "" : "opacity-0"
                        }`}
                        disabled={activeTab !== "for_review"}
                      />
                      <span
                        className="text-blue-600 truncate cursor-pointer w-[30vw]"
                        onClick={() => handleTaskClick(task)}
                      >
                        {task.task_name}
                      </span>
                    </div>
                    <div className="col-span-1 flex items-center space-x-2">
                      <span
                        className={`h-2 w-2 rounded-full ${getStatusBadgeClasses(
                          task.task_status
                        )}`}
                      />
                      <span className="text-gray-900 font-semibold">
                        {getStatusLabel(task.task_status)}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-900 font-semibold">
                        {task.assign_to_user_name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {task.assign_to_email}
                      </div>
                    </div>
                    <div className="col-span-1 text-gray-500">
                      <Moment format="DD/MM/YYYY">{task.assigned_date}</Moment>
                    </div>
                    <div className="col-span-1 text-gray-500">
                      <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
                    </div>
                    <div
                      className={`col-span-1 ${
                        task.file_data?.name ? "text-blue-500" : "text-gray-400"
                      } flex items-start justify-start gap-1`}
                    >
                      <span>
                        {task.file_data?.name && (
                          <MdFilePresent className="text-2xl text-green-500" />
                        )}
                      </span>{" "}
                      <span>{task.file_data?.name || "No attachment"}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile Table */}
        <div className="overflow-x-auto xl:hidden">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="text-sm font-medium text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="w-1/4 px-4 py-3 text-left">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTasks.length === tasks.length && tasks.length > 0}
                      onChange={handleSelectAllVisible}
                      className={`w-4 h-4 green-checkbox border-gray-300 rounded ${
                        activeTab === "for_review" ? "" : "opacity-0"
                      }`}
                      disabled={activeTab !== "for_review"}
                    />
                    <span
                      onClick={() => handleSort("task_name")}
                      className="cursor-pointer flex items-center gap-1"
                    >
                      Tasks
                      {sortColumn === "task_name" &&
                        (sortOrder === "asc" ? (
                          <FiChevronUp />
                        ) : sortOrder === "desc" ? (
                          <FiChevronDown />
                        ) : (
                          <LuChevronsUpDown />
                        ))}
                    </span>
                  </div>
                </th>

                <th className="w-1/6 px-4 py-3 text-left">
                  <div className="relative" ref={statusFilterRef}>
                    <div className="flex items-center gap-2">
                      Status
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsStatusFilterOpen(!isStatusFilterOpen);
                        }}
                        className="hover:bg-gray-100 p-1 rounded"
                      >
                        <MdFilterList className="w-4 h-4" />
                      </button>
                    </div>
                    {isStatusFilterOpen && (
                      <StatusFilterModal 
                        selectedStatuses={selectedStatuses}
                        setSelectedStatuses={setSelectedStatuses}
                        setIsStatusFilterOpen={setIsStatusFilterOpen}
                      />
                    )}
                  </div>
                </th>

                <th
                  className="w-1/4 px-4 py-3 text-left"
                  ref={assigneeFilterRef}
                >
                  <div className="flex items-center gap-2">
                    Assignee
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsAssigneeFilterOpen(!isAssigneeFilterOpen);
                      }}
                      className="hover:bg-gray-100 p-1 rounded"
                    >
                      <MdFilterList className="w-4 h-4" />
                    </button>
                  </div>
                  {isAssigneeFilterOpen && (
                    <AssigneeFilterModal 
                      users={users}
                      selectedAssignees={selectedAssignees}
                      setSelectedAssignees={setSelectedAssignees}
                      assigneeSearchQuery={assigneeSearchQuery}
                      setAssigneeSearchQuery={setAssigneeSearchQuery}
                      setIsAssigneeFilterOpen={setIsAssigneeFilterOpen}
                    />
                  )}
                </th>

                <th
                  className="w-1/6 px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("created_at")}
                >
                  Assigned on
                  {sortColumn === "created_at" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </th>

                <th
                  className="w-1/6 px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort("deadline")}
                >
                  Due Date
                  {sortColumn === "deadline" &&
                    (sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />)}
                </th>

                <th className="w-1/6 px-4 py-3 text-left">Attachment</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    <Oval height={40} width={40} color="#0000FF" secondaryColor="#ddd" />
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.id)}
                          onChange={() => handleRowSelection(task.id)}
                          className={`w-4 h-4 green-checkbox border-gray-300 rounded ${
                            activeTab === "for_review" ? "" : "opacity-0"
                          }`}
                          disabled={activeTab !== "for_review"}
                        />
                        <span
                          className="text-blue-600 truncate cursor-pointer text-[12px]"
                          onClick={() => handleTaskClick(task)}
                        >
                          {task.task_name}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`h-2 w-2 rounded-full ${getStatusBadgeClasses(
                            task.task_status
                          )}`}
                        />
                        <span className="text-gray-900 font-semibold text-[12px]">
                          {getStatusLabel(task.task_status)}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="text-gray-900 font-semibold text-[12px]">
                        {task.assign_to_user_name}
                      </div>
                      <div className="text-gray-500 text-[12px]">
                        {task.assign_to_email}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-gray-500 text-[12px]">
                      <Moment format="DD/MM/YYYY">{task.assigned_date}</Moment>
                    </td>

                    <td className="px-4 py-4 text-gray-500 text-[12px]">
                      <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
                    </td>

                    <td className="px-4 py-4 flex items-center gap-2 text-[12px]">
                      {task.file_data?.name ? (
                        <>
                          <MdFilePresent className="text-2xl text-green-500" />
                          <span className="text-blue-500 truncate">
                            {task.file_data.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400">No attachment</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-200 disabled:opacity-50"
            >
              <FiChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-200 disabled:opacity-50"
            >
              <FiChevronRight />
            </button>
          </div>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-200 rounded-md py-1 px-2"
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="30">30 per page</option>
          </select>
        </div>

        {/* Task Details Modal */}
        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          task={selectedTask}
          setShowFilePreview={setShowFilePreview}
        />

        {isReviewModalOpen && (
          <ReviewTasksModal
            tasks={tasks.filter((task) => selectedTasks.includes(task.id))}
            onClose={() => setIsReviewModalOpen(false)}
            fetchTasks={fetchTasks}
            handleTaskAction={handleTaskAction}
            setSelectedTasks={setSelectedTasks}
            users={users}
          />
        )}

        {/* File Preview Modal */}
        {showFilePreview && selectedTask?.file_data && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[1000]">
            <div className="bg-white w-[60vw] h-[105vh] rounded-lg shadow-lg flex flex-col">
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {selectedTask.file_data.name}
                </h3>
                <button
                  onClick={() => setShowFilePreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* File Preview Content */}
              <div className="flex-1 p-4 bg-gray-50 flex items-center justify-center">
                {selectedTask.file_data.type?.startsWith("image/") ||
                selectedTask.file_data.type === "application/pdf" ? (
                  <iframe
                    src={selectedTask.file_data.url}
                    title="File Preview"
                    className="w-full h-full rounded border border-gray-200"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-600 mb-4">
                      Preview not available for this file type
                    </p>
                    <a
                      href={selectedTask.file_data.url}
                      download
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Download File
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TasksPage;