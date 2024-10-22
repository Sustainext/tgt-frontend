"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Moment from "react-moment";
import {
  FiPlus,
  FiCircle,
  FiTrash2,
  FiUser,  
  FiCheckCircle,
  FiLoader,
  FiX,
  FiChevronDown,
  FiFile,
} from "react-icons/fi";

import ImageUpload from "../../shared/components/ImageUpload";
import { unitTypes } from "../../shared/data/units";
import axiosInstance, { post, del, patch } from "../../utils/axiosMiddleware";

const TASK_STATUS = {
  IN_PROGRESS: 0,
  APPROVED: 1,
  UNDER_REVIEW: 2,
  COMPLETED: 3,
  REJECTED: 4
};

const TASK_TABS = {
  UPCOMING: 'upcoming',
  OVERDUE: 'overdue',
  COMPLETED: 'completed',
  FOR_REVIEW: 'for_review'
};

const TaskManagement = () => {
  // State Management
  const [activeTab, setActiveTab] = useState(TASK_TABS.UPCOMING);
  const [tasks, setTasks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  // Task Creation Modal
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    task_name: "",
    deadline: ""
  });

  // Task Review Modal 
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isApproveMode, setIsApproveMode] = useState(false);
  const [isReassignMode, setIsReassignMode] = useState(false);
  const [isRejectMode, setIsRejectMode] = useState(false);
  
  // Task Details Modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({
    id: "",
    task_name: "",
    assign_to_user_name: "",
    category: "",
    deadline: "",
    factor_id: "",
    location: "",
    month: "",
    scope: "",
    subcategory: "",
    year: "",
    activity: "",
    value1: "",
    value2: "",
    unit1: "",
    unit2: "",
    file: null,
    filename: "",
    filesize: "",
    modifiedAt: "",
  });

  // Review Actions State
  const [reviewData, setReviewData] = useState({
    assignedUserId: "",
    newDeadline: "",
    comments: ""
  });

  // Activity Data
  const [activitiesList, setActivitiesList] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [isActivityPreselected, setIsActivityPreselected] = useState(false);

  // Utility Functions
  const getTodayDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  };

  const isDateBeforeToday = (date) => {
    const givenDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);
    return givenDate < today;
  };

  // API Calls
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/organization_task_dashboard/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    }
    setIsLoading(false);
  };

  const fetchUsersList = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/sustainapp/user_client/');
      setUsersList(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users list');
    }
    setIsLoading(false);
  };

  async function fetchActivities(category, page = 1, region, year) {
    // ... existing fetchActivities implementation ...
  }

  // Event Handlers
  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const taskData = {
      ...newTaskData,
      assigned_to: parseInt(localStorage.getItem("user_id")),
      assigned_by: parseInt(localStorage.getItem("user_id")),
      user_client: 1,
      roles: 3
    };

    try {
      const response = await post('/organization_task_dashboard/', taskData);
      if (response.status === 201) {
        toast.success('Task created successfully');
        setIsCreateTaskModalOpen(false);
        fetchTasks();
      }
    } catch (error) {
      toast.error('Failed to create task');
    }
    setIsLoading(false);
  };

  const handleCompleteTask = async (taskId, roles) => {
    setIsLoading(true);
    const status = roles === 1 ? TASK_STATUS.UNDER_REVIEW : TASK_STATUS.COMPLETED;
    
    try {
      await patch(`/organization_task_dashboard/${taskId}/`, { task_status: status });
      toast.success('Task completed successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to complete task');
    }
    setIsLoading(false);
  };

  const handleApproveTask = async (taskId) => {
    setIsLoading(true);
    try {
      await patch(`/organization_task_dashboard/${taskId}/`, { 
        task_status: TASK_STATUS.APPROVED 
      });
      toast.success('Task approved successfully');
      setIsReviewModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to approve task');
    }
    setIsLoading(false);
  };

  const handleReassignTask = async (taskId) => {
    setIsLoading(true);
    if (isDateBeforeToday(reviewData.newDeadline)) {
      toast.error("Deadline can't be in the past");
      setIsLoading(false);
      return;
    }

    try {
      await patch(`/organization_task_dashboard/${taskId}/`, {
        task_status: TASK_STATUS.IN_PROGRESS,
        value1: "",
        value2: "",
        unit1: "",
        unit2: "",
        file: null,
        assigned_to: parseInt(reviewData.assignedUserId),
        deadline: reviewData.newDeadline,
        comments: reviewData.comments,
        user_client: 1
      });
      toast.success('Task reassigned successfully');
      setIsReviewModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to reassign task');
    }
    setIsLoading(false);
  };

  const handleRejectTask = async (taskId) => {
    setIsLoading(true);
    try {
      await patch(`/organization_task_dashboard/${taskId}/`, {
        task_status: TASK_STATUS.REJECTED,
        deadline: reviewData.newDeadline,
        comments: reviewData.comments,
        file: null,
        filename: "",
        filesize: null
      });
      toast.success('Task rejected successfully');
      setIsReviewModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to reject task');
    }
    setIsLoading(false);
  };

  const handleDeleteTask = async (taskId) => {
    setIsLoading(true);
    try {
      await del(`/organization_task_dashboard/${taskId}/`);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
    setIsLoading(false);
  };

  // File Handling
  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedTask(prev => ({
        ...prev,
        file,
        filename: file.name,
        filesize: file.size,
        modifiedAt: new Date().toLocaleString()
      }));
    };
    reader.readAsDataURL(file);
  };

  // Component Lifecycle
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (isReassignMode) {
      fetchUsersList();
    }
  }, [isReassignMode]);

  // Render Helpers
  const renderTaskStatus = (status) => {
    const statusMap = {
      [TASK_STATUS.IN_PROGRESS]: "In Progress",
      [TASK_STATUS.APPROVED]: "Approved",
      [TASK_STATUS.UNDER_REVIEW]: "Under Review",
      [TASK_STATUS.COMPLETED]: "Completed",
      [TASK_STATUS.REJECTED]: "Rejected"
    };
    return statusMap[status] || "";
  };

  const getStatusClassName = (status) => {
    const classMap = {
      [TASK_STATUS.IN_PROGRESS]: "bg-yellow-200",
      [TASK_STATUS.APPROVED]: "bg-green-200",
      [TASK_STATUS.UNDER_REVIEW]: "bg-orange-200",
      [TASK_STATUS.REJECTED]: "bg-red-200",
      [TASK_STATUS.COMPLETED]: "bg-emerald-200"
    };
    return `rounded-md px-2 py-1 text-center ${classMap[status] || ""}`;
  };

  // Main Render
  return (
    <div className="rounded-lg shadow border border-gray-200 p-4 h-[320px] overflow-x-auto">
      {/* Header with Add Task Button */}
      <div className="flex justify-between mb-4">
        <h2 className="text-neutral-800 text-[15px] font-bold leading-tight">Task Management</h2>
        <button
          className="text-sky-600 text-[10px] cursor-pointer font-normal leading-[13px] flex items-center me-2 space-x-2"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          <FiPlus size={18} />
          <span>Add task</span>
        </button>
      </div>
  
      {/* Task Navigation Tabs */}
      <div className="flex my-6 border-b text-sm text-start">
        {Object.entries(TASK_TABS).map(([key, value]) => (
          <button
            key={key}
            className={`px-4 py-1 rounded-b-none text-xs font-bold leading-[15px] 
              ${activeTab === value 
                ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                : "border-transparent text-neutral-500"}`}
            onClick={() => setActiveTab(value)}
          >
            {key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' ')}
          </button>
        ))}
      </div>
  
      {/* Task List Area */}
      <div className="p-1 h-[188px]">
        {tasks[activeTab]?.length === 0 ? (
          <EmptyTasksView onAddTask={() => setIsCreateTaskModalOpen(true)} />
        ) : (
          <TasksList
            tasks={tasks[activeTab]}
            onComplete={handleCompleteTask}
            onReview={taskData => {
              setSelectedTask(taskData);
              setIsReviewModalOpen(true);
            }}
            onDelete={handleDeleteTask}
            onDetails={taskData => {
              setSelectedTask(taskData);
              setIsDetailsModalOpen(true);
            }}
          />
        )}
      </div>
  
      {/* Create Task Modal */}
      {isCreateTaskModalOpen && (
        <CreateTaskModal
          taskData={newTaskData}
          onSubmit={handleCreateTask}
          onChange={setNewTaskData}
          onClose={() => setIsCreateTaskModalOpen(false)}
        />
      )}
  
      {/* Task Details Modal */}
      {isDetailsModalOpen && (
        <TaskDetailsModal
          task={selectedTask}
          activities={activitiesList}
          onActivitySelect={setSelectedActivityId}
          onFileUpload={handleFileUpload}
          onSubmit={handleCompleteTask}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
  
      {/* Review Task Modal */}
      {isReviewModalOpen && (
        <ReviewTaskModal
          task={selectedTask}
          usersList={usersList}
          isApproveMode={isApproveMode}
          isReassignMode={isReassignMode}
          isRejectMode={isRejectMode}
          reviewData={reviewData}
          onReviewDataChange={setReviewData}
          onApprove={() => handleApproveTask(selectedTask.id)}
          onReassign={() => handleReassignTask(selectedTask.id)}
          onReject={() => handleRejectTask(selectedTask.id)}
          onClose={() => {
            setIsReviewModalOpen(false);
            setIsApproveMode(false);
            setIsReassignMode(false);
            setIsRejectMode(false);
          }}
        />
      )}
  
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <FiLoader className="animate-spin text-gray-500" size={48} />
        </div>
      )}
    </div>
  );
  
  // Helper Components
  const EmptyTasksView = ({ onAddTask }) => (
    <div className="flex flex-col items-center justify-center">
      <FiCheckCircle className="text-[#ACACAC] text-4xl mb-5" />
      <h3 className="text-[14px] text-[#101828] font-bold mb-2">Start by creating a task</h3>
      <p className="text-[12px] text-[#667085] mb-4">All tasks created or assigned to you will be here</p>
      <button
        onClick={onAddTask}
        className="bg-[#007EEF] text-white w-[150px] p-1 rounded-md shadow-md"
      >
        Add a task
      </button>
    </div>
  );
  
  const TasksList = ({ tasks, onComplete, onReview, onDelete, onDetails }) => (
    <div className="space-y-3 mb-6 mt-2">
      {tasks.map(task => (
        <TaskRow
          key={task.id}
          task={task}
          onComplete={onComplete}
          onReview={onReview}
          onDelete={onDelete}
          onDetails={onDetails}
        />
      ))}
    </div>
  );
  
  const TaskRow = ({ task, onComplete, onReview, onDelete, onDetails }) => (
    <div className="flex justify-between">
      <div className="flex cursor-pointer">
        <div>
          {task.task_status === TASK_STATUS.COMPLETED ? (
            <FiCheckCircle className="text-[#3DCA7C] text-xl" />
          ) : (
            <FiCircle 
              className={task.roles !== 1 ? "text-xl cursor-pointer" : "text-xl text-gray-400"}
              onClick={() => task.roles !== 1 && onComplete(task.id, task.roles)}
            />
          )}
        </div>
        <div 
          className="w-72 truncate text-wrap text-neutral-800 text-[13px] font-normal leading-none ml-3"
          onClick={() => task.roles === 1 && onDetails(task)}
        >
          {task.task_name}
        </div>
      </div>
      
      <div className={getStatusClassName(task.task_status)}>
        {renderTaskStatus(task.task_status)}
      </div>
  
      <div className="flex">
        <div className="w-[68px] text-neutral-500 text-xs font-normal leading-[15px]">
          <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
        </div>
        {task.roles === 2 && (
          <FiTrash2
            className="text-[#0000008F] text-lg cursor-pointer"
            onClick={() => onDelete(task.id)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskManagement;