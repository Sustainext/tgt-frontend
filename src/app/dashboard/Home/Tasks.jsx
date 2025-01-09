import React, { useState, useEffect } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Moment from "react-moment";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../utils/axiosMiddleware";
import TaskDetailsModal from "./TaskDetailsModal";

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [activeTab]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/organization_task_dashboard/`
      );
      setTasks(response.data[activeTab] || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskClick = (task) => {
    console.log("Task clicked:", task);
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.task_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assign_by_email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

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
    <div className="p-6 border rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
          <p className="text-gray-500">List of tasks</p>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: "upcoming", label: "Upcoming" },
            { id: "overdue", label: "Overdue" },
            { id: "completed", label: "Completed" },
            { id: "for_review", label: "For Review" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`pb-4 px-1 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-500 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg flex flex-col h-[calc(100vh-280px)]">
        {/* Table Header */}
        <div className="grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-200 gradient-background text-sm font-medium text-gray-500">
          <div className="col-span-4">Tasks</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Assigned by</div>
          <div className="col-span-1">Assigned on</div>
          <div className="col-span-1">Due Date</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200 overflow-y-auto flex-1 relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <Oval
                height={40}
                width={40}
                color="#0000FF"
                secondaryColor="#ddd"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            </div>
          ) : currentTasks.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No tasks found
            </div>
          ) : (
            currentTasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-9 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <div className="col-span-4 text-blue-600 truncate">
                  {task.task_name}
                </div>
                <div className="col-span-1 flex items-center space-x-2">
                  <span
                    className={`h-2 w-2 rounded-full ${getStatusBadgeClasses(
                      task.task_status
                    )}`}
                  />
                  <span className="text-gray-900">
                    {getStatusLabel(task.task_status)}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-900">{task.assigned_by_name}</div>
                  <div className="text-gray-500 text-sm">
                    {task.assign_by_email}
                  </div>
                </div>
                <div className="col-span-1 text-gray-500">
                  <Moment format="DD/MM/YYYY">{task.assigned_date}</Moment>
                </div>
                <div className="col-span-1 text-gray-500">
                  <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <Oval
            height={80}
            width={80}
            color="#0000FF"
            secondaryColor="#ddd"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        </div>
      )} */}

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
          <option value="8">08 per page</option>
          <option value="16">16 per page</option>
          <option value="24">24 per page</option>
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
