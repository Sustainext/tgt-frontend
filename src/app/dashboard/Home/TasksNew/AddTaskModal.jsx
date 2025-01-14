import React, { useState } from "react";
import { getTodayDate } from "./TaskUtils";

const AddTaskModal = ({ isOpen, onClose, onSubmit, users }) => {
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    deadline: "",
    assigned_to: "",
    status: "not_started",
  });

  const isFormValid =
    formData.task_name && formData.deadline && formData.assigned_to;

  if (!isOpen) return null;

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const submissionData = {
      ...formData,
      task_name: formData.task_name.trim(),
      assigned_to: parseInt(formData.assigned_to),
      deadline: formData.deadline,
      description: formData.description?.trim(),
      status: formData.status,
    };

    try {
      await onSubmit(submissionData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="modal-overlay z-50">
      <div className="modal-center">
        <div className="modal-content bg-white rounded-lg shadow-xl p-6 min-w-[450px] max-w-[450px] relative">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Add Task
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Add tasks with descriptions and deadlines to keep your goals on track.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-[1.5px] border-gray-300"></span>
                  <span>Not Started</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Status is set to "Not Started" by default.
              </p>
            </div>

            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Name
              </label>
              <input
                type="text"
                name="task_name"
                placeholder="Enter task name"
                required
                className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs outline-none"
                value={formData.task_name}
                onChange={handleFormChange}
              />
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Add details about the task..."
                className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs outline-none"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="deadline"
                required
                min={getTodayDate()}
                className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs outline-none"
                value={formData.deadline}
                onChange={handleFormChange}
              />
            </div>

            {/* Assign To Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To
              </label>
              <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleFormChange}
                required
                className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs outline-none"
              >
                <option value="">Select User</option>
                {users?.data?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`flex-1 px-4 py-2.5 text-white rounded-md ${
                  !isFormValid
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-[#007eef] hover:bg-blue-600"
                }`}
              >
                Add Task
              </button>
            </div>
          </form>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
