import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignEmissionTasks,
  fetchUsers,
  fetchAssignedTasks
} from "@/lib/redux/features/emissionSlice";
import { CiCircleMinus } from "react-icons/ci";
import {toast} from "react-toastify";

const MultipleAssignEmissionModal = ({ isOpen, onClose, onRemove, taskData,scope }) => {
  const { data: users, status: usersStatus } = useSelector(
    (state) => state.emissions.users
  );
  const selectedRows = useSelector(
    (state) => state.emissions.selectedRows[`${scope}`]
  );
  const { location, year, month } = useSelector((state) => state.emissions);

  const [selectedUser, setSelectedUser] = useState("");
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, []);

  const handleAssign = () => {
    if (!selectedUser || !dueDate) {
      toast.error("Please select a user and due date");
      return;
    }
  
    dispatch(assignEmissionTasks({
      tasks: selectedRows,
      commonData: {
        location: taskData.location,
        year: taskData.year,
        month: taskData.month,
        scope: taskData.scope,
        deadline: dueDate,
        assignedTo: parseInt(selectedUser),
        countryCode: taskData.countryCode,
      },
    }))
    .then(() => {
      // Get indices of all selected rows
      const selectedRowIndices = selectedRows.map(row => 
        parseInt(row.rowId.split('_')[1]-1)
      );
      console.log('Selected row indices:', selectedRowIndices);
      
  
      // Remove each selected row
      selectedRowIndices.forEach(index => {
        onRemove(index);
      });
  
      // Fetch updated assigned tasks
      dispatch(fetchAssignedTasks({
        location: taskData.location,
        year: taskData.year,
        month: taskData.month
      }));
  
      toast.success("Tasks assigned successfully");
      onClose();
    })
    .catch((error) => {
      console.error('Error assigning tasks:', error);
      toast.error("Failed to assign tasks");
      onClose();
    });
  };

  const toggleShowAllTasks = (e) => {
    e.preventDefault();
    setShowAllTasks(prev => !prev);
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center min-h-[556px] z-[1000] gap-4">
      <div className={`bg-white rounded-lg shadow-xl ${showAllTasks ? '' : ''} min-h-[476px] min-w-[374px] p-5`}>
        <h2 className="text-xl font-semibold">Assign Tasks</h2>
        <p className="text-sm text-gray-600 mb-4">
          Assign a user to all the selected tasks.
        </p>

        <div className="mx-2">
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <p className="text-sm font-semibold">Location</p>
              <p className="text-sm text-gray-600">{location}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold">Year</p>
              <p className="text-sm text-gray-600">{year}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="mb-4">
              <p className="text-sm font-semibold">Month</p>
              <p className="text-sm text-gray-600">{month}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold">Scope</p>
              <p className="text-sm text-gray-600">{scope}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-sm font-semibold">Total number of tasks</p>
          </div>
          <div>
            {" "}
            <p className="text-sm text-gray-600">
              {selectedRows?.length}{" "}
              <button
                className="text-blue-500 underline"
                // onClick={toggleShowAllTasks}
              >
                {showAllTasks ? "Hide" : "View all"}
              </button>
            </p>
          </div>
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

        <div className="mb-12">
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
            // onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </div>
      {
        showAllTasks && <div className="bg-white p-5 rounded-lg shadow-xl min-w-[810px] min-h-[516px] max-w-[810px] max-h-[516px]">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Selected Tasks</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="my-8">
            <th className="text-left py-2">Category</th>
            <th className="text-left py-2">Subcategory</th>
            <th className="text-left py-2">Activity</th>
            <th className="text-left py-2"></th>
          </tr>
        </thead>
        <tbody>
          {selectedRows?.map((row, index) => (
            <tr key={index} className="border-t my-8">
              <td className="py-2">{row.Emission.Category}</td>
              <td className="py-2">{row.Emission.Subcategory}</td>
              <td className="py-2">{row.Emission.Activity || "N/A"}</td>
              <td className="py-2"><CiCircleMinus className="hover:text-red-700 hover:text-semibold" /> </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      }
    </div>
    </>
  );
};

export default MultipleAssignEmissionModal;
