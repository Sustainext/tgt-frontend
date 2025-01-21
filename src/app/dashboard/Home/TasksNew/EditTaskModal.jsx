import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const EditTaskModal = ({ isOpen, onClose, onSubmit, initialTask = {} }) => {
  const [taskData, setTaskData] = useState({
    taskName: '',
    status: 'not_started',
    assignedOn: '',
    dueDate: '',
    description: '',
    comments: '',
    file: null
  });
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTaskData({
        taskName: initialTask.taskName || '',
        status: initialTask.status || 'not_started',
        assignedOn: initialTask.assignedOn || '',
        dueDate: initialTask.dueDate || '',
        description: initialTask.description || '',
        comments: initialTask.comments || '',
        file: initialTask.file || null
      });
    }
  }, [initialTask]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTaskData(prev => ({
        ...prev,
        file
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setTaskData(prev => ({
        ...prev,
        file
      }));
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
    setShowUpdateConfirm(false);
  };

  const handleUpdateClick = () => {
    setShowDeleteConfirm(false);
    setShowUpdateConfirm(true);
  };

  const handleSubmit = () => {
    onSubmit(taskData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-white w-[480px] p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Tasks</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
            <input
              type="text"
              name="taskName"
              value={taskData.taskName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned on</label>
              <input
                type="date"
                name="assignedOn"
                value={taskData.assignedOn}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
            <textarea
              name="comments"
              value={taskData.comments}
              onChange={handleInputChange}
              placeholder="Add details about the task..."
              rows={3}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div className="text-sm text-gray-600">
                  Drag & drop files or <label className="text-blue-500 cursor-pointer hover:text-blue-600">Browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*, application/pdf, .doc, .docx, .ppt, .pptx"
                    />
                  </label>
                </div>
                <div className="text-xs text-gray-500">
                  Supported formats: JPEG, PNG, PDF, Word, PPT
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={handleDeleteClick}
                className="flex-1 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete Task
              </button>
              <button
                onClick={handleUpdateClick}
                className="flex-1 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                Update
              </button>
            </div>

            {showDeleteConfirm && (
              <div className="space-y-2">
                <p className="text-center text-sm text-gray-600">Click on delete to proceed</p>
                <button
                  onClick={handleSubmit}
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}

            {showUpdateConfirm && (
              <div className="space-y-2">
                <p className="text-center text-sm text-gray-600">Click on update to proceed</p>
                <button
                  onClick={handleSubmit}
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditTaskModal;