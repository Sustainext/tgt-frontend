import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const GoalsModal = ({
  isOpen,
  onClose,
  isEditing,
  formData,
  onSubmit,
  onChange,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setShowUpdateConfirm(true);
    } else {
      onSubmit(e);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const handleConfirmUpdate = () => {
    onSubmit({ preventDefault: () => {} });
    setShowUpdateConfirm(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl text-gray-800">
            {isEditing ? "Edit Organization Goals" : "Add Organization Goals"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isEditing
              ? "Modify, delete or mark goals as completed here"
              : "Add goals with descriptions and deadlines to keep your goals on track."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Status */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <p className="text-gray-400 text-xs mt-1">
              Select "completed" status to move the goals to completed section
            </p>
          </div>

          {/* Goal Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Goal Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Name"
              className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Organization
            </label>
            <select
              name="organization"
              value={formData.organization}
              onChange={onChange}
              className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            >
              <option value="">Select Organization</option>
              <option value="org1">Organization 1</option>
              <option value="org2">Organization 2</option>
            </select>
          </div>

          {/* Goal Description */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Goal Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Details....."
              rows="4"
              className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={onChange}
              className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className="space-y-2">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="flex-1 py-2 text-red-500 bg-white border border-red-500 rounded-lg hover:bg-red-50 text-sm"
                >
                  Delete Goal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-sm"
                >
                  Update
                </button>
              </div>

              {showDeleteConfirm && (
                <div className="space-y-2">
                  <p className="text-center text-sm text-gray-600">
                    Click on delete to proceed
                  </p>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}

              {showUpdateConfirm && (
                <div className="space-y-2">
                  <p className="text-center text-sm text-gray-600">
                    Click on update to proceed
                  </p>
                  <button
                    type="button"
                    onClick={handleConfirmUpdate}
                    className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-sm"
              >
                Add Goal
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default GoalsModal;
