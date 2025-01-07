import React from "react";
import { FiX, FiFileText } from "react-icons/fi";

const TaskDetailsModal = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>

        {/* Task Name */}
        <h2 className="text-2xl font-medium text-gray-900 mb-6">
          {task.task_name}
        </h2>

        {/* Basic Info */}
        <div className="space-y-4 mb-8">
          <div className="flex">
            <span className="w-32 text-gray-600">Status</span>
            <span className="text-green-600 font-medium">{task.status}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-gray-600">Assigned on</span>
            <span className="text-gray-700">{task.assigned_date}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-gray-600">Due Date</span>
            <span className="text-gray-700">{task.deadline}</span>
          </div>

          <div className="flex flex-col">
            <span className="w-32 text-gray-600">Assigned by</span>
            <div className="ml-32 -mt-5">
              <p className="text-gray-700">{task.assigned_by_name}</p>
              <p className="text-gray-500 text-sm">{task.assigned_by_email}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200 my-6"></div>

        {/* Task Details */}
        <div className="space-y-4 mb-8">
          <div className="flex">
            <span className="w-32 text-gray-600">Location</span>
            <span className="text-gray-700">{task.location}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-gray-600">Year</span>
            <span className="text-gray-700">{task.year}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-gray-600">Month</span>
            <span className="text-gray-700">{task.month}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-gray-600">Scope</span>
            <span className="text-gray-700">{task.scope}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-gray-600">Category</span>
            <span className="text-gray-700">{task.category}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-gray-600">Sub-Category</span>
            <span className="text-gray-700">{task.subcategory}</span>
          </div>
        </div>

        {/* Data Review Section */}
        <div>
          <h3 className="text-gray-900 font-medium mb-4">Data reviewed:</h3>
          <div className="space-y-4">
            <div className="flex">
              <span className="w-32 text-gray-600">Activity</span>
              <span className="text-gray-700">{task.activity}</span>
            </div>

            <div className="flex">
              <span className="w-32 text-gray-600">Quantity</span>
              <span className="text-gray-700">{task.quantity}</span>
            </div>

            <div className="flex">
              <span className="w-32 text-gray-600">Unit</span>
              <span className="text-gray-700">{task.unit}</span>
            </div>

            <div className="flex">
              <span className="w-32 text-gray-600">Attachment</span>
              <div className="flex items-center space-x-2">
                <FiFileText className="text-green-600" size={20} />
                <div>
                  <a
                    href={task.attachment_url}
                    className="text-blue-600 hover:underline"
                  >
                    {task.attachment_name}
                  </a>
                  <p className="text-gray-500 text-sm">
                    {task.attachment_date} • {task.attachment_size}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
