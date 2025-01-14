import React from "react";
import { FiPlus, FiCheckCircle } from "react-icons/fi";
import { Oval } from "react-loader-spinner";
import Moment from "react-moment";

const TaskHeader = ({ onAddTask }) => (
  <div className="flex justify-between mb-4">
    <div className="text-[#0f1728] text-lg font-medium font-['Manrope'] leading-7">
      Upcoming Tasks
    </div>
    <div
      className="text-sky-600 text-[10px] cursor-pointer font-normal leading-[13px] flex items-center me-2 space-x-2"
      onClick={onAddTask}
    >
      <FiPlus style={{ fontSize: "18px" }} />
      <span>Add task</span>
    </div>
  </div>
);

const TaskTabs = ({ activeTab, onTabChange, tabs }) => (
  <div className="border-b border-gray-200 mb-6">
    <nav className="flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`pb-4 px-1 ${
            activeTab === tab.id
              ? "border-b-2 border-blue-500 text-blue-500 font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  </div>
);

const TaskTable = ({ children, headers }) => (
  <div className="bg-white rounded-lg flex flex-col h-[calc(100vh-280px)]">
    <div className="grid grid-cols-12 gap-4 py-3 text-sm text-gray-500 px-4 border-y border-gray-200">
      {headers.map((header, index) => (
        <div key={index} className={header.className}>
          {header.label}
        </div>
      ))}
    </div>
    <div className="p-1 h-[288px] table-scrollbar overflow-y-auto">
      {children}
    </div>
  </div>
);

const EmptyState = ({ onAction }) => (
  <div className="justify-center items-center">
    <div className="flex justify-center items-center pb-5 pt-[4rem]">
      <FiCheckCircle style={{ color: "#ACACAC", fontSize: "36px" }} />
    </div>
    <div>
      <p className="text-[14px] text-[#101828] font-bold text-center">
        Start by creating a task
      </p>
    </div>
    <div className="mb-2">
      <p className="text-[12px] text-[#667085] text-center">
        All task created or assigned to you will be here
      </p>
    </div>
    <div className="flex justify-center items-center">
      <button
        className="bg-[#007EEF] text-white w-[150px] p-1 rounded-md shadow-md"
        onClick={onAction}
      >
        Add a task
      </button>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <Oval
      height={40}
      width={40}
      color="#0000FF"
      secondaryColor="#ddd"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  </div>
);

const TaskStatusBadge = ({ status }) => {
  const getStatusBadgeClasses = (status) => {
    const baseClasses = "text-[8px] px-[6px] rounded-full";
    const statusMap = {
      in_progress: "bg-[#FDB022]",
      approved: "bg-[#12B76A]",
      under_review: "bg-orange-400",
      completed: "bg-[#12B76A]",
      reject: "bg-red-500",
    };
    return `${baseClasses} ${statusMap[status] || "bg-gray-400"}`;
  };

  const getStatusLabel = (status) => {
    const labels = {
      in_progress: "In Progress",
      under_review: "Under Review",
      completed: "Completed",
      approved: "Approved",
      reject: "Rejected",
    };
    return labels[status] || status;
  };

  return (
    <div>
      <span className={getStatusBadgeClasses(status)}></span>
      <span className="text-sm ml-2">{getStatusLabel(status)}</span>
    </div>
  );
};

const TaskRow = ({ task, onTaskClick, onEditClick, activeTab }) => {
  const handleClick = () => {
    if (activeTab === "forreview") {
      onTaskClick(task);
      return;
    }

    // For completed tab
    if (activeTab === "completed" && (task.roles === 1 || task.roles === 2 || task.roles === 4)) {
      onTaskClick(task);
      return;
    }

    // For other tabs, use role-based logic
    if (activeTab !== "forreview" && activeTab !== "completed") {
      if (task.roles === 3) {
        onEditClick(task);
      } else if (task.roles === 1 || task.roles === 2) {
        onTaskClick(task);
      }
    }
  };

  return (
    <div className="flex justify-between border-b border-[#ebeced] py-2">
      <div className="flex cursor-pointer">
        <div className="w-72 truncate text-[#007eef] text-[13px] font-normal leading-none ml-3">
          <p
            className="py-1 cursor-pointer"
            data-tooltip-id={`task-tooltip-${task.id}`}
            data-tooltip-content={task.task_name}
            onClick={handleClick}
          >
            {task.task_name}
          </p>
        </div>
      </div>
      <div className="col-span-3">
        {(task.roles === 1 || task.roles === 2 || task.roles === 4) && (
          <TaskStatusBadge status={task.task_status} />
        )}
      </div>
      <div className="flex mr-4">
        <div className="w-[68px] text-neutral-500 text-xs font-normal leading-[15px]">
          <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
        </div>
      </div>
    </div>
  );
};
// Export everything
export {
  TaskHeader,
  TaskTabs,
  TaskTable,
  EmptyState,
  LoadingSpinner,
  TaskStatusBadge,
  TaskRow,
};
