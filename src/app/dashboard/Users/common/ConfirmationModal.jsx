import React from "react";

import { MdWarningAmber } from "react-icons/md";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message, 
  confirmText,
  confirmColor,
  confirmHoverColor, 
  cancelText = "Cancel", 
  userName,
  buttoncolor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg min-w-[444px] mx-auto">
        <div className="flex mb-4 gap-4">
          <MdWarningAmber className={`${confirmColor} text-[25px] mt-1 w-[7%]`}  />
          <p className="text-gray-600 mb-6 text-[18px]">
          {message} {userName && <strong>"{userName}"</strong>}?
        </p>
          {/* <h2 className="text-lg font-semibold">{title}</h2> */}
        </div>
     
        <div className="flex justify-end items-center space-x-4 mt-8">
          <button
            className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-1 rounded-lg border border-gray-300 w-full"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className={`${buttoncolor} hover:${buttoncolor} text-white px-4 py-1 rounded-lg w-full `}
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
