// MultipleAssignEnergyModal.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignEnergyTasks,
  fetchUsers,
  fetchAssignedTasks,
  clearSelectedRows,
} from "@/lib/redux/features/energySlice";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { getLocationName } from "@/app/utils/locationName";

const MultipleAssignEnergyModal = ({ isOpen, onClose, selectedRows, formData, users, onAssign, locationname, year, monthname }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    if (!selectedUser || !dueDate) {
      toast.error("Please select a user and due date");
      return;
    }
    onAssign(selectedUser, dueDate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assign Multiple Tasks</h2>
          <button onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          You are about to assign {selectedRows.length} selected energy tasks.
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Task Summary</h3>
            <button
              type="button"
              className="text-blue-500 text-sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide Details" : "Show Details"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium">Location:</span> {locationname}</div>
            <div><span className="font-medium">Year:</span> {year}</div>
            <div><span className="font-medium">Month:</span> {monthname}</div>
            <div><span className="font-medium">Total Tasks:</span> {selectedRows.length}</div>
          </div>

          {showDetails && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Selected Tasks:</h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {selectedRows.map((rowIndex, index) => {
                  const row = formData[rowIndex];
                  return (
                    <div key={index} className="text-xs p-2 bg-white rounded border">
                      <div className="grid grid-cols-2 gap-2">
                        <div><strong>Energy Type:</strong> {row.EnergyType || "Not specified"}</div>
                        <div><strong>Source:</strong> {row.Source || "Not specified"}</div>
                        <div><strong>Purpose:</strong> {row.Purpose || "To be filled"}</div>
                        <div><strong>Renewable:</strong> {row.Renewable || "Not specified"}</div>
                        <div><strong>Quantity:</strong> {row.Quantity || "To be filled"} {row.Unit || ""}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Assign to User <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border rounded-lg"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={getTodayDate()}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-4 border-t">
          <button
            className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Assign All Tasks ({selectedRows.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleAssignEnergyModal;