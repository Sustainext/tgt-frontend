import React from "react";
import Moment from "react-moment";
import { TaskStatusBadge } from "./components";

const TaskRow = ({ task, onTaskClick, onEditClick }) => {
  const handleClick = () => {
    if (task.roles === 1 || task.roles === 2 || task.roles === 4) {
      onTaskClick(task);
    } else if (task.roles === 3) {
      onEditClick(task);
    }
  };

  return (
    <div className="flex justify-between border-b border-[#ebeced] pb-2">
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
          <p className="py-1">
            <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
          </p>
        </div>
      </div>

      <Tooltip
        id={`task-tooltip-${task.id}`}
        place="top"
        effect="solid"
        className="z-[9999] !opacity-100 drop-shadow-md"
        style={{
          backgroundColor: "white",
          color: "#1f2937",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "14px",
          maxWidth: "300px",
          wordBreak: "break-word",
        }}
        offset={-50}
        delayShow={200}
        float={true}
      />
    </div>
  );
};

export default TaskRow;
