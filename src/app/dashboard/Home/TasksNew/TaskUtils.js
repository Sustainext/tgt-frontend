// TaskUtils.js
import { toast } from "react-toastify";

// Date Utilities
export const getTodayDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();
  return [year, month, day].join("-");
};

export const isBeforeToday = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();

  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return date < today;
};

export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Input Validation
export const validateDecimalPlaces = (value) => {
  if (!value) return value;
  const regex = /^\d*\.?\d{0,2}$/;
  if (!regex.test(value)) {
    return Number(value).toFixed(2);
  }
  return value;
};

// Constants
export const TABS = [
  { id: "upcoming", label: "Upcoming" },
  { id: "overdue", label: "Overdue" },
  { id: "completed", label: "Completed" },
  { id: "for_review", label: "For Review" },
];

export const TABLE_HEADERS = [
  { label: "Tasks", className: "col-span-6 text-left" },
  { label: "Status", className: "col-span-3 text-left" },
  { label: "Due date", className: "col-span-3 text-right mr-5" },
];

export const INITIAL_MODAL_STATES = {
  isModalOpen: false,
  isFillModalOpen: false,
  isModalOpenReject: false,
  isModalOpenReassign: false,
  isModalOpenDelete: false,
  isReviewtask: false,
  isApprove: false,
  isPdfViewerOpen: false,
  isMyTaskDetailModalOpen: false,
  isMyTaskReviewModalOpen: false,
  isMyTaskEditModalOpen: false,
};

export const INITIAL_TASK_DATA = {
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
  assigned_to: "",
  description: "",
  status: "not_started",
  comments: "",
};

export const STATUS_CLASSES = {
  not_started: "border-gray-300 text-gray-700",
  in_progress: "bg-[#FDB022] text-white",
  completed: "bg-[#12B76A] text-white",
  approved: "bg-[#12B76A] text-white",
  under_review: "bg-orange-400 text-white",
  reject: "bg-red-500 text-white",
};

export const STATUS_LABELS = {
  not_started: "Not Started",
  in_progress: "In Progress",
  completed: "Completed",
  approved: "Approved",
  under_review: "Under Review",
  reject: "Rejected",
};

// Error Handling
export const handleApiError = (error, actionType) => {
  const defaultMessage = `Failed to ${actionType}. Please try again.`;
  const errorMessage =
    error.response?.data?.message || error.message || defaultMessage;

  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  console.error(`Error ${actionType}:`, error);
  return errorMessage;
};

// File Utilities
export const formatFileSize = (bytes) => {
  if (!bytes) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Validation Utilities
export const validateTaskData = (data) => {
  const errors = {};

  if (!data.task_name?.trim()) {
    errors.task_name = "Task name is required";
  }

  if (!data.deadline) {
    errors.deadline = "Deadline is required";
  } else if (isBeforeToday(data.deadline)) {
    errors.deadline = "Deadline cannot be in the past";
  }

  if (!data.assigned_to) {
    errors.assigned_to = "Please assign the task to someone";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Helper Functions
export const getStatusColor = (status) => {
  const colors = {
    in_progress: "#FDB022",
    completed: "#12B76A",
    approved: "#12B76A",
    under_review: "#F97316",
    reject: "#EF4444",
    not_started: "#9CA3AF",
  };
  return colors[status] || colors.not_started;
};

export const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[parseInt(monthNumber) - 1] || "";
};

// Toast Configuration
export const TOAST_CONFIG = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

// Modal Configuration
export const MODAL_TRANSITIONS = {
  enter: "transition-opacity duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "transition-opacity duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

// File Upload Configuration
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validateFile = (file) => {
  if (!file) return { isValid: false, error: "No file selected" };

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { isValid: false, error: "File type not supported" };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: "File size exceeds 5MB limit" };
  }

  return { isValid: true, error: null };
};

// Export all utilities as a group
export const TaskUtils = {
  dates: {
    getTodayDate,
    isBeforeToday,
    formatDate,
  },
  validation: {
    validateDecimalPlaces,
    validateTaskData,
    validateFile,
  },
  formatting: {
    formatFileSize,
    getMonthName,
    getStatusColor,
  },
  constants: {
    TABS,
    TABLE_HEADERS,
    INITIAL_MODAL_STATES,
    INITIAL_TASK_DATA,
    STATUS_CLASSES,
    STATUS_LABELS,
    ALLOWED_FILE_TYPES,
    MAX_FILE_SIZE,
    TOAST_CONFIG,
    MODAL_TRANSITIONS,
  },
  errors: {
    handleApiError,
  },
};
