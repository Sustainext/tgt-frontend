import React, { useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import ImageUpload from "@/app/shared/components/ImageUpload";

const TaskFillModal = ({ isOpen, onClose, task, onSubmit, onFileUpload }) => {
  const [comments, setComments] = useState("");
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...task,
      comments,
    });
  };

    const getStatusBadgeClasses = (status) => {
      const baseClasses = "text-[8px] px-[6px] rounded-full";
      const statusMap = {

        in_progress: "bg-[#FDB022]",
        approved: "bg-[#12B76A]",
        under_review: "bg-orange-400",
        completed: "bg-[#12B76A]",
        reject: "bg-red-500",
      };
      return `${baseClasses} ${statusMap[status] || "bg-gray-100 text-gray-600"}`;
    }

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[395px] max-h-[90vh] overflow-y-auto table-scrollbar">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">My Tasks</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Name */}
            <div>
              <input
                type="text"
                value={task?.task_name || ""}
                disabled
                className="w-full pt-2 text-gray-600 bg-white font-semibold text-md"
              />
            </div>

            <hr className="bg-gray-300" />

            {/* Status */}
            <div className="flex items-start space-x-4">
              <label className="text-sm font-medium text-gray-600 w-24">
                Status
              </label>
              <span className={`px-3 py-1 text-sm rounded-md ${getStatusBadgeClasses(task.task_status)}`}>
                {getStatusLabel(task.task_status)}
              </span>
            </div>

            {/* Dates */}
            <div className="flex items-start space-x-4">
              <label className="text-sm font-medium text-gray-600 w-24">
                Assigned on
              </label>
              <input
                type="text"
                value={task?.assigned_date || "24/10/2025"}
                disabled
                className="flex-1 p-2 rounded-md text-gray-600 bg-gray-50"
              />
            </div>

            <div className="flex items-start space-x-4">
              <label className="text-sm font-medium text-gray-600 w-24">
                Due Date
              </label>
              <input
                type="text"
                value={task?.deadline || "24/10/2025"}
                disabled
                className="flex-1 p-2 rounded-md text-gray-600 bg-gray-50"
              />
            </div>

            {/* Assigned By */}
            <div className="flex items-start space-x-4">
              <label className="text-sm font-medium text-gray-600 w-24">
                Assigned by
              </label>
              <div>
                <p className="text-gray-800">{task?.assign_by_user_name}</p>
                <p className="text-sm text-gray-500">{task?.assign_by_email}</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start space-x-4">
              <label className="text-sm font-medium text-gray-600 w-24">
                Description
              </label>
              <p className="flex-1 text-sm text-gray-600">
                {task?.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>
            </div>

            <hr className="bg-gray-300 my-4" />

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Comments
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add details about the task..."
                rows={4}
                className="mt-1 w-full p-3 border border-gray-200 rounded-md text-gray-600 placeholder-gray-400 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* File Upload */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Upload Document
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 bg-blue-100 ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center">
                  <FiUpload className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag & drop files or{" "}
                    <label className="text-blue-500 cursor-pointer hover:text-blue-600">
                      Browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".jpeg,.jpg,.png,.pdf,.doc,.docx,.ppt,.pptx"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPEG, PNG, PDF, Word, PPT
                  </p>
                </div>
              </div>
            </div> */}
            <ImageUpload />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskFillModal;
