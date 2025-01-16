import React from 'react';
import { FiX } from 'react-icons/fi';
import Moment from 'react-moment';

const ViewReviewTaskModal = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Review Task</h2>
            <button onClick={onClose}>
              <FiX className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Task Name */}
            <input
              type="text"
              value={task?.task_name || ''}
              disabled
              className="w-full text-gray-900 bg-transparent border-b border-gray-200 pb-2 font-medium"
            />

            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className="text-yellow-500">Under Review</span>
            </div>

            {/* Assigned on */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Assigned on</span>
              <span>{task?.assigned_date || '24/10/2025'}</span>
            </div>

            {/* Due Date */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Due Date</span>
              <span>{task?.deadline || '24/10/2025'}</span>
            </div>

            {/* Assigned By */}
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Assigned by</span>
              <div className="text-right">
                <p>{task?.assign_by_user_name || 'George Washington Bunny'}</p>
                <p className="text-sm text-gray-500">{task?.assign_by_email || 'Bugs@acmecorp.com'}</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Description</span>
              <p className="w-3/5 text-right">
                {task?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Comments */}
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Comments</span>
              <p className="w-3/5 text-right whitespace-pre-wrap">
                {task?.comments || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'}
              </p>
            </div>

            {/* Attachment */}
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Attachment</span>
              <div className="flex items-center gap-2">
                <img src="/pdf-icon.svg" alt="PDF" className="w-4 h-4" />
                <div>
                  <a href={task?.file_data?.url} className="text-blue-600 hover:underline">
                    Document1.PDF
                  </a>
                  <p className="text-xs text-gray-500">Mar 27 • 1.3 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReviewTaskModal;