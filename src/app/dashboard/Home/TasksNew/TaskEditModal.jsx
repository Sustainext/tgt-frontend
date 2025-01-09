import React, { useState, useEffect } from "react";
import { getTodayDate } from "./TaskUtils";

const TaskEditModal = ({ isOpen, onClose, task, onSubmit, users }) => {
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);
  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    deadline: "",
    assigned_to: "",
    status: "not_started",
  });

  const isEditMode = Boolean(task?.id);
  const isFormValid =
    formData.task_name && formData.deadline && formData.assigned_to;

  useEffect(() => {
    if (task) {
      setFormData({
        task_name: task.task_name || "",
        description: task.description || "",
        deadline: task.deadline || "",
        assigned_to: task.assigned_to?.toString() || "",
        status: task.status || "not_started",
        id: task.id,
      });
    }
  }, [task]);

  if (!isOpen) return null;

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (status) => {
    setFormData({ ...formData, status });
    setIsStatusDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
    setShowConfirmUpdate(false);
  };

  const handleUpdateClick = () => {
    setShowConfirmDelete(false);
    setShowConfirmUpdate(true);
  };

  const handleDelete = (id) => {
    onSubmit({ id }, true);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    if (!isFormValid) {
      console.log("Form is not valid");
      return;
    }

    const submissionData = {
      ...formData,
      task_name: formData.task_name.trim(),
      assigned_to: parseInt(formData.assigned_to),
      deadline: formData.deadline,
      description: formData.description?.trim(),
      status: formData.status,
    };

    try {
      await onSubmit(submissionData, isEditMode);
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmDelete(false);
    setShowConfirmUpdate(false);
    onClose();
  };

  return (
    <div className="modal-overlay z-50">
      <div className="modal-center">
        <div className="modal-content bg-white rounded-lg shadow-xl p-6 min-w-[450px] max-w-[450px] relative">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {isEditMode ? "Edit Task" : "Add Task"}
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            {isEditMode
              ? "Update task details and deadline"
              : "Add tasks with descriptions and deadlines to keep your goals on track."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center w-full rounded-md py-2 text-left text-sm text-gray-700 bg-white focus:outline-none"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <div className="flex items-center gap-2">
                    {formData.status === "not_started" && (
                      <span className="w-4 h-4 rounded-full border-[1.5px] border-gray-300"></span>
                    )}
                    {formData.status === "in_progress" && (
                      <span className="w-4 h-4 rounded-full bg-[#FDB022]"></span>
                    )}
                    {formData.status === "completed" && (
                      <span className="w-4 h-4 rounded-full bg-[#12B76A]"></span>
                    )}
                    <span>
                      {formData.status === "not_started" && "Not Started"}
                      {formData.status === "in_progress" && "In Progress"}
                      {formData.status === "completed" && "Completed"}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isStatusDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg py-1">
                    {[
                      {
                        id: "not_started",
                        label: "Not Started",
                        icon: (
                          <span className="w-4 h-4 rounded-full border-[1.5px] border-gray-300"></span>
                        ),
                      },
                      {
                        id: "in_progress",
                        label: "In Progress",
                        icon: (
                          <span className="w-4 h-4 rounded-full bg-[#FDB022]"></span>
                        ),
                      },
                      {
                        id: "completed",
                        label: "Completed",
                        icon: (
                          <span className="w-4 h-4 rounded-full bg-[#12B76A]"></span>
                        ),
                      },
                    ].map((status) => (
                      <button
                        key={status.id}
                        type="button"
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => handleStatusChange(status.id)}
                      >
                        <div className="flex items-center gap-2">
                          {status.icon}
                          <span>{status.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Select 'completed' status to move the task to completed section
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
                    {user.username} - {user.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            {isEditMode ? (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="flex-1 px-4 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                  >
                    Delete Task
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateClick}
                    className="flex-1 px-4 py-2.5 text-[#007eef] border border-[#007eef] hover:bg-blue-50 rounded-md transition-colors"
                  >
                    Update
                  </button>
                </div>

                {showConfirmDelete && (
                  <div className="space-y-2">
                    <p className="text-center text-sm text-gray-600">
                      Click on delete to proceed
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(formData.id)}
                      className="w-full px-4 py-2.5 text-white bg-[#007eef] rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {showConfirmUpdate && (
                  <div className="space-y-2">
                    <p className="text-center text-sm text-gray-600">
                      Click on update to proceed
                    </p>
                    <button
                      type="submit"
                      className="w-full px-4 py-2.5 text-white bg-[#007eef] rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
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
            )}
          </form>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            onClick={handleCloseModal}
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

export default TaskEditModal;
