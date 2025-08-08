import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { getLocationName } from "@/app/utils/locationName";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import { MdClose } from "react-icons/md";

const EnergyAssignToWidget = ({ isOpen, onClose, users, rowData, locationname, year, monthname, onAssign }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [dueDate, setDueDate] = useState("");

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
      <div className="bg-white p-5 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assign User</h2>
          <button onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Location:</span> {locationname}
            </div>
            <div>
              <span className="font-semibold">Year:</span> {year}
            </div>
            <div>
              <span className="font-semibold">Month:</span> {monthname}
            </div>
            <div>
              <span className="font-semibold">Energy Type:</span> {rowData.EnergyType || "Not selected"}
            </div>
            <div>
              <span className="font-semibold">Source:</span> {rowData.Source || "Not selected"}
            </div>
            <div>
              <span className="font-semibold">Purpose:</span> {rowData.Purpose || "To be filled"}
            </div>
          </div>

          <div>
            <span className="font-semibold">Renewable:</span> {rowData.Renewable || "Not selected"}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Quantity:</span> {rowData.Quantity || "To be filled"}
            </div>
            <div>
              <span className="font-semibold">Unit:</span> {rowData.Unit || "To be filled"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Assign User</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Due Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={getTodayDate()}
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnergyAssignToWidget;