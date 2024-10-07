import React from "react";

import { MdWarningAmber } from "react-icons/md";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message, 
  confirmText = "Confirm", 
  confirmColor = "bg-red-600", 
  confirmHoverColor = "bg-red-700", 
  cancelText = "Cancel", 
  title = "Are you sure?", 
  userName 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg min-w-[444px] mx-auto">
        <div className="flex items-center space-x-2 mb-4">
          <MdWarningAmber className="text-yellow-500" fontSize="large" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="text-gray-600 mb-6 text-md">
          {message} {userName && <strong>"{userName}"</strong>}?
        </p>
        <div className="flex justify-end items-center space-x-4 mt-8">
          <button
            className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-1 rounded-lg border border-gray-300 w-full"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className={`${confirmColor} hover:${confirmHoverColor} text-white px-4 py-1 rounded-lg w-full`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
