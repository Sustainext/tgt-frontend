import React from "react";
import { FiPlus, FiCheckCircle } from "react-icons/fi";
import { Oval } from "react-loader-spinner";
import Moment from "react-moment";
import { Tooltip } from "react-tooltip";

const TaskHeader = ({ onAddTask }) => (
  <div className="flex justify-between mb-4">
    <div className="text-[#0f1728] text-lg font-medium font-['Manrope'] leading-7">
      Upcoming Tasks
    </div>
    <div
      className="text-sky-600 text-sm cursor-pointer font-normal leading-[13px] flex items-center me-2 space-x-2"
      onClick={onAddTask}
    >
      <FiPlus style={{ fontSize: "18px" }} />
      <span>Add task</span>
    </div>
  </div>
);

const TaskTabs = ({ activeTab, onTabChange, tabs }) => (
  <div className="border-b border-gray-200 mb-6">
    <nav className="flex xl:space-x-8 space-x-4 px-2 min-w-max">
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
  <div className="bg-white rounded-lg flex flex-col">
    <div className="grid grid-cols-12 gap-3 py-3 text-sm text-gray-500 px-4 border-y border-gray-200">
      {headers.map((header, index) => (
        <div key={index} className={header.className}>
          {header.label}
        </div>
      ))}
    </div>
    <div className="p-1 table-scrollbar overflow-y-auto">
      {children}
    </div>
  </div>
);

const EmptyState = ({ onAddTask }) => (
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
        className="bg-[#007EEF] text-white w-[150px] p-1 rounded-md shadow-md text-sm"
        onClick={onAddTask}
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
      not_started: "Not Started",
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

const TaskRow = ({ task, onTaskClick, headers }) => {
  const textRef = React.useRef(null);
  const [isTextTruncated, setIsTextTruncated] = React.useState(false);

  React.useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const isOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsTextTruncated(isOverflowing);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [task.task_name]);

  // Function to render content based on header configuration
  const renderCellContent = (header, index) => {
    switch (header.type || index) {
      case 'task_name':
      case 0:
        return (
          <div className="text-[#007eef] text-[13px] font-normal leading-none relative">
            <p
              ref={textRef}
              className="py-1 cursor-pointer truncate"
              data-tooltip-id={isTextTruncated ? `task-tooltip-${task.id}` : undefined}
              data-tooltip-content={isTextTruncated ? task.task_name : undefined}
              onClick={() => onTaskClick(task)}
            >
              {task.task_name}
            </p>
            {isTextTruncated && (
              <Tooltip
                id={`task-tooltip-${task.id}`}
                place="top"
                effect="solid"
                className="xl:z-[9999] z-[10] !opacity-100 drop-shadow-lg border border-gray-300"
                style={{
                  backgroundColor: "white",
                  color: "#667084",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "14px",
                  maxWidth: "300px",
                  wordBreak: "break-word",
                  position: "absolute"
                }}
                offset={0}
                delayShow={200}
                float={false}
              />
            )}
          </div>
        );
      
      case 'status':
      case 1:
        return (
          <div className="text-left">
            {(task.roles === 1 || task.roles === 2 || task.roles === 3 || task.roles === 4) && 
              <TaskStatusBadge status={task.task_status} />
            }
          </div>
        );
      
      case 'deadline':
      case 2:
        return (
          <div className="text-neutral-500 text-[13px] font-normal flex items-center">
            <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
          </div>
        );
      
      default:
        return null;
    }
  };

  // If headers are provided, use them to determine layout
  if (headers && headers.length > 0) {
    return (
      <div className="grid grid-cols-12 gap-3 py-2 px-4 border-b border-[#ebeced] items-center">
        {headers.map((header, index) => (
          <div key={index} className={header.className}>
            {renderCellContent(header, index)}
          </div>
        ))}
      </div>
    );
  }

  // Fallback layout if headers are not provided
  return (
    <div className="grid grid-cols-12 gap-3 py-2 px-4 border-b border-[#ebeced] items-center">
      {/* Task Name - spans 6 columns */}
      <div className="col-span-6">
        <div className="text-[#007eef] text-[13px] font-normal leading-none relative">
          <p
            ref={textRef}
            className="py-1 cursor-pointer truncate"
            data-tooltip-id={isTextTruncated ? `task-tooltip-${task.id}` : undefined}
            data-tooltip-content={isTextTruncated ? task.task_name : undefined}
            onClick={() => onTaskClick(task)}
          >
            {task.task_name}
          </p>
          {isTextTruncated && (
            <Tooltip
              id={`task-tooltip-${task.id}`}
              place="top"
              effect="solid"
              className="xl:z-[9999] z-[10] !opacity-100 drop-shadow-lg border border-gray-300"
              style={{
                backgroundColor: "white",
                color: "#667084",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "14px",
                maxWidth: "300px",
                wordBreak: "break-word",
                position: "absolute"
              }}
              offset={0}
              delayShow={200}
              float={false}
            />
          )}
        </div>
      </div>

      {/* Status - spans 4 columns */}
      <div className="col-span-4">
        <div className="text-left">
          {(task.roles === 1 || task.roles === 2 || task.roles === 3 || task.roles === 4) && 
            <TaskStatusBadge status={task.task_status} />
          }
        </div>
      </div>

      {/* Deadline - spans 2 columns */}
      <div className="col-span-2">
        <div className="text-neutral-500 text-[13px] font-normal flex items-center">
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