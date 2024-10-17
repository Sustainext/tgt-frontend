import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignEmissionTasks,
  fetchUsers,
} from "@/lib/redux/features/emissionSlice";
import { toast } from "react-toastify";
import { getMonthName } from "../../utils/dateUtils";

const AssignEmissionModal = ({ isOpen, onClose, taskData, onChange }) => {
  const {
    data: users,
    status: usersStatus,
    error: usersError,
  } = useSelector((state) => state.emissions.users);
  const [selectedUser, setSelectedUser] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();
  const assignTaskStatus = useSelector(
    (state) => state.emissions.assignTaskStatus
  );

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  const handleAssign = () => {
    if (!selectedUser || !dueDate) {
      alert("Please select a user and due date");
      return;
    }

    dispatch(
      assignEmissionTasks({
        tasks: [taskData],
        commonData: {
          location: taskData.location,
          year: taskData.year,
          month: taskData.month,
          scope: taskData.scope,
          category: taskData.category,
          subcategory: taskData.subcategory,
          activity: taskData.activity,
          deadline: dueDate,
          assignedTo: parseInt(selectedUser),
          countryCode: taskData.countryCode,
        },
      })
    );
    onChange({
      type: "assignTo",
      value: selectedUser,
    });
    
  };

  useEffect(() => {
    if (assignTaskStatus === "succeeded") {
      onClose();
    }
  }, [assignTaskStatus, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold">Assign user</h2>
        <p className="text-sm text-gray-600 mb-4">
          Assign a user and select a due date.
        </p>

        <div className="mx-2">
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <p className="text-sm font-semibold">Location</p>
              <p className="text-sm text-gray-600">{taskData.location}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold">Year</p>
              <p className="text-sm text-gray-600">{taskData.year}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="mb-4">
              <p className="text-sm font-semibold">Month</p>
              <p className="text-sm text-gray-600">{taskData.month}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold">Scope</p>
              <p className="text-sm text-gray-600">{taskData.scope}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold">Subcategory</p>
            <p className="text-sm text-gray-600">{taskData.subcategory}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold">Activity</p>
            <p className="text-sm text-gray-600">
              {taskData.activity || "N/A"}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-normal mb-2">Assign User</label>
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

        <div className="mb-8">
          <label className="block text-sm font-normal mb-2">Due date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            className="px-4 py-1.5 bg-white text-gray-800 rounded-lg mr-2 w-full border border-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1.5 bg-blue-500 text-white rounded-lg w-full"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignEmissionModal;
