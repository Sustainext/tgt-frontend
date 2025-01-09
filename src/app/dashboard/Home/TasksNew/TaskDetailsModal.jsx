import React, { useState } from "react";
import { FiX, FiFileText, FiDownload } from "react-icons/fi";
import Moment from "react-moment";

const TaskDetailsModal = ({ isOpen, onClose, task }) => {
  const [showFilePreview, setShowFilePreview] = useState(false);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex gap-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[95vh] relative overflow-auto">
          <h2 className="text-2xl font-medium text-gray-900 mb-6">
            {task.task_name}
          </h2>

          {/* Task Details */}
          <div className="space-y-4 mb-8">
            <div className="flex">
              <span className="w-32 text-gray-600">Status</span>
              <span className="text-green-600 font-medium">
                {task.task_status}
              </span>
            </div>

            <div className="flex">
              <span className="w-32 text-gray-600">Due Date</span>
              <span className="text-gray-700">
                <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="w-32 text-gray-600">Assigned by</span>
              <div className="ml-32 -mt-5">
                <p className="text-gray-700">{task.assign_by_name}</p>
                <p className="text-gray-500 text-sm">{task.assign_by_email}</p>
              </div>
            </div>
          </div>

          {/* File Preview */}
          {task.file_data?.url && (
            <div className="mt-4">
              <span className="text-gray-600">Attachment</span>
              <div className="flex items-center mt-2 space-x-2">
                <FiFileText className="text-green-600" size={20} />
                <button
                  onClick={() => setShowFilePreview(true)}
                  className="text-blue-600 hover:underline"
                >
                  {task.file_data.name}
                </button>
                <a
                  href={task.file_data.url}
                  download
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiDownload size={16} />
                </a>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* File Preview Panel */}
        {showFilePreview && (
          <div className="bg-white rounded-lg w-[800px] max-h-[95vh] relative flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                {task.file_data.name}
              </h3>
              <button
                onClick={() => setShowFilePreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="flex-1 p-4">
              {task.file_data.type?.startsWith("image/") ||
              task.file_data.type === "application/pdf" ? (
                <iframe
                  src={task.file_data.url}
                  className="w-full h-full rounded border border-gray-200"
                  title="File Preview"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-600 mb-4">
                    Preview not available for this file type
                  </p>
                  <a
                    href={task.file_data.url}
                    download
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModal;
