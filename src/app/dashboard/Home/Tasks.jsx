import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Moment from "react-moment";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../utils/axiosMiddleware";
import TaskDetailsModal from "./TaskDetailsModal";
import {MdFilePresent} from "react-icons/md";
import { debounce } from "lodash";
import { FiChevronDown } from "react-icons/fi";
import {fetchUsers} from '@/lib/redux/features/emissionSlice'
import { FiFilter } from "react-icons/fi";
import { useSelector } from "react-redux";

const TasksPage = () => {
  const [count,setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [dateRange, setDateRange] = useState("April 2024 - Dec 2024");
  const [selectedStatus, setSelectedStatus] = useState(null);
  //Assignee filter
  const [users, setUsers] = useState(useSelector(state=>state.emissions.users.data));
  const [isAssigneeFilterOpen, setIsAssigneeFilterOpen] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [assigneeSearchQuery, setAssigneeSearchQuery] = useState('');
  const assigneeFilterRef = useRef(null);

  useEffect(() => {
    fetchUsers();

    // Add click outside handler
    const handleClickOutside = (event) => {
      if (assigneeFilterRef.current && !assigneeFilterRef.current.contains(event.target)) {
        setIsAssigneeFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

   // Filter users based on search query
   const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(assigneeSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(assigneeSearchQuery.toLowerCase())
  );

  // Handle assignee selection
  const handleAssigneeSelection = (userId) => {
    setSelectedAssignees(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      }
      return [...prev, userId];
    });
  };

  // Add handler for row selection
  const handleRowSelection = (taskId) => {
    setSelectedTasks(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      }
      return [...prev, taskId];
    });
  };

  // Add handler for selecting all visible tasks
  const handleSelectAllVisible = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  useEffect(() => {
    fetchTasks(searchQuery,activeTab,currentPage);
  }, [activeTab]);

  const fetchTasks = async (searchQuery="",tab="upcoming",page = 1) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/sustainapp/user_all_task/?search=${searchQuery}&activetab=${tab}&page=${page}&page_size=${itemsPerPage}`
      );
      setCount(response.data.count);
      setTasks(response.data.results || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value); 
    };
  
    useEffect(() => {
    const debouncedFetch = debounce(async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `${process.env.BACKEND_API_URL}/sustainapp/user_all_task/?search=${searchQuery}&activetab=${activeTab}&page=${currentPage}&page_size=${itemsPerPage}`
        );
        setCount(response.data.count);
        setTasks(response.data.results || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    // Only for search, use debounce
    if (searchQuery) {
      debouncedFetch();
    } else {
      // For non-search triggers (tab change, pagination), fetch immediately
      debouncedFetch.flush();
    }

    return () => debouncedFetch.cancel();
  }, [searchQuery, activeTab, currentPage, itemsPerPage]);

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

  return (
    <div className="p-4">
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

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-between w-full">
          <div className="bg-white rounded-md shadow-sm border border-r-0 border-gray-300">
            {[
              { id: "upcoming", label: "Upcoming" },
              { id: "overdue", label: "Overdue" },
              { id: "completed", label: "Completed" },
              { id: "for_review", label: "For Review" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 border-r border-gray-300 text-sm transition-colors ${
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
          <div className="ml-8">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
              Review Tasks ({selectedTasks.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 text-gray-600 border rounded-lg px-3 py-2">
            <span>Set Date Range</span>
            <FiChevronDown className="w-4 h-4" />
          </button>
          
          {dateRange && (
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <span>{dateRange}</span>
              <button className="text-gray-400 hover:text-gray-600">×</button>
            </div>
          )}
          
          {selectedAssignees && (
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <span>Assignee: {selectedAssignees}</span>
              <button className="text-gray-400 hover:text-gray-600">×</button>
            </div>
          )}
          
          {selectedStatus && (
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <span>Status: {selectedStatus}</span>
              <button className="text-gray-400 hover:text-gray-600">×</button>
            </div>
          )}
        </div>
      </div>

      {/* Modified Table Header */}
      <div className="bg-white rounded-lg flex flex-col h-[calc(100vh-280px)]">
        <div className="grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-medium text-gray-500">
          <div className="col-span-3 flex items-center gap-4">
            <input
              type="checkbox"
              checked={selectedTasks.length === tasks.length}
              onChange={handleSelectAllVisible}
              className="w-4 h-4 text-blue-600 rounded border-gray-300"
            />
            Tasks
          </div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 relative" ref={assigneeFilterRef}>
          <div className="flex items-center gap-2">
            Assignee
            <button 
              onClick={() => setIsAssigneeFilterOpen(!isAssigneeFilterOpen)}
              className="hover:bg-gray-100 p-1 rounded"
            >
              <FiFilter className="w-4 h-4" />
            </button>
          </div>

          {/* Assignee Filter Popover */}
          {isAssigneeFilterOpen && (
            <div className="absolute z-10 top-full mt-2 right-0 bg-white rounded-lg shadow-lg w-72 border border-gray-200">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Assignee</h3>
                
                {/* Search input */}
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Search assignees..."
                    className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md"
                    value={assigneeSearchQuery}
                    onChange={(e) => setAssigneeSearchQuery(e.target.value)}
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                
                {/* Assignee list */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {users
                    .filter(user => 
                      user.username.toLowerCase().includes(assigneeSearchQuery.toLowerCase()) ||
                      user.email.toLowerCase().includes(assigneeSearchQuery.toLowerCase())
                    )
                    .map(user => (
                      <label
                        key={user.id}
                        className="flex items-center gap-3 py-2 px-1 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAssignees.includes(user.id)}
                          onChange={() => handleAssigneeSelection(user.id)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {user.email}
                          </div>
                        </div>
                      </label>
                    ))
                  }
                </div>
              </div>
            </div>
          )}
        </div>
          <div className="col-span-1">Assigned on</div>
          <div className="col-span-1">Due Date</div>
          <div className="col-span-1">Attachment</div>
        </div>

        {/* Modified Table Body */}
        <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-9 gap-4 px-6 py-4 hover:bg-gray-50"
            >
              <div className="col-span-3 flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleRowSelection(task.id)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300"
                />
                <span className="text-blue-600 truncate cursor-pointer w-[30vw]" onClick={() => handleTaskClick(task)}>
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
                  <div className="text-gray-900 font-semibold">{task.assign_to_user_name}</div>
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
                <div className={`col-span-1 ${task.file_data?.name ? "text-blue-500":"text-gray-400"} flex items-start justify-start gap-1`}>
                <span>{task.file_data?.name && <MdFilePresent className="text-2xl text-green-500"/>}</span> <span>{task.file_data?.name || "No attachment"}</span>
                </div>
            </div>
          ))}
        </div>
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
      />
    </div>
  );
};

export default TasksPage;
