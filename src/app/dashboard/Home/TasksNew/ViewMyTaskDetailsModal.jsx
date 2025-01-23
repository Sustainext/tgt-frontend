import React from "react";
import { FiX } from "react-icons/fi";
import Moment from "react-moment";

const ViewMyTaskDetailsModal = ({ isOpen, onClose, task }) => {

  const statusMap = {
    in_progress: "text-yellow-500",
    approved: "text-green-600",
    under_review: "text-orange-400",
    completed: "text-green-600",
    reject: "text-red-500",
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[390px] max-h-[90vh] overflow-y-auto table-scrollbar">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">My Task</h2>
            <button onClick={onClose}>
              <FiX className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Task Name */}
            <input
              type="text"
              value={task?.task_name || ""}
              disabled
              className="w-full text-gray-900 bg-transparent border-b border-gray-200 pb-2 font-medium"
            />

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-y-6">
              {/* Status */}
              <div className="text-gray-600 text-sm">Status</div>
              <div
                className={`col-span-2 text-sm ${
                  statusMap[task.task_status] || "text-gray-500"
                }`}
              >
                {task.task_status.replace("_", " ")}{" "}
              </div>

              {/* Assigned on */}
              <div className="text-gray-600 text-sm">Assigned on</div>
              <div className="col-span-2 text-sm">
                {new Date(task.created_at).toISOString().split("T")[0] || ""}
              </div>

              {/* Due Date */}
              <div className="text-gray-600 text-sm">Due Date</div>
              <div className="col-span-2 text-sm">
                {task?.deadline}
              </div>

              {/* Assigned By */}
              <div className="text-gray-600 text-sm">Assigned by</div>
              <div className="col-span-2">
                <p className="text-sm">
                  {task?.assign_by_user_name}
                </p>
                <p className="text-sm text-gray-500">
                  {task?.assign_by_email}
                </p>
              </div>

              {/* Description */}
              <div className="text-gray-600 text-sm">Description</div>
              <div className="col-span-2 text-sm">
                {task?.description || "-"}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Comments */}
            <div className="grid grid-cols-3 gap-y-6">
              <div className="text-gray-600 text-sm">Comments</div>
              <div className="col-span-2 text-sm whitespace-pre-wrap">
                {task?.comments || "-"}
              </div>

              {/* Attachment */}
              <div className="text-gray-600 text-sm">Attachment</div>
              <div className="col-span-2">
                <div className="flex items-center gap-2 text-sm">
                  <img src="/pdf-icon.svg" alt="PDF" className="w-4 h-4" />
                  <div>
                    <a
                      href={task?.file_data?.url}
                      className="text-blue-600 hover:underline"
                    >
                      {task?.file_data.name}
                    </a>
                    <p className="text-xs text-gray-500">Mar 27 • 1.3 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyTaskDetailsModal;
