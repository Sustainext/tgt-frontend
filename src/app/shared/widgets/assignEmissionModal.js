// In assignEmissionModal.js, update the component like this:
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignEmissionTasks,
  fetchUsers,
  fetchAssignedTasks,
} from "@/lib/redux/features/emissionSlice";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { getLocationName } from "@/app/utils/locationName";

const AssignEmissionModal = ({
  isOpen,
  onClose,
  index,
  onRemove,
  taskData,
}) => {
  const { data: users, status: usersStatus } = useSelector(
    (state) => state.emissions.users
  );

  const [selectedUser, setSelectedUser] = useState("");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();
  const assignTaskStatus = useSelector(
    (state) => state.emissions.assignTaskStatus
  );

  const [loaderStatus, setLoaderStatus] = useState({
    show: false,
    message: "",
  });

  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchLocationName = async () => {
      if (taskData.location) {
        const name = await getLocationName(taskData.location);
        setSelectedLocation(name);
      }
    };

    fetchLocationName();
  }, [taskData.location]);

  useEffect(() => {
    if (usersStatus === "idle" && users.length === 0) {
      dispatch(fetchUsers());
    }
  }, []);

  const handleAssign = async () => {
    if (!selectedUser || !dueDate) {
      toast.error("Please select a user and due date");
      return;
    }

    try {
      setLoaderStatus({
        show: true,
        message: "Assigning task...",
      });

      // Prepare the task data
      const formattedTask = {
        Emission: {
          ...taskData,
          Category: taskData.category,
          Subcategory: taskData.subcategory,
          Activity: taskData.activity,
          activity_id: taskData.activity_id,
          unit_type: taskData.unit_type,
          assigned_to: parseInt(selectedUser),
          rowType: "assigned",
        },
      };

      await dispatch(
        assignEmissionTasks({
          tasks: [formattedTask],
          commonData: {
            location: taskData.location,
            locationName: selectedLocation,
            year: taskData.year,
            month: taskData.month,
            scope: taskData.scope,
            deadline: dueDate,
            assignedTo: parseInt(selectedUser),
            countryCode: taskData.countryCode,
          },
        })
      ).unwrap();

      setLoaderStatus({
        show: true,
        message: "Updating assigned tasks...",
      });

      // Remove the assigned row
      await onRemove(index);

      // Fetch updated assigned tasks
      await dispatch(
        fetchAssignedTasks({
          location: taskData.location,
          year: taskData.year,
          month: taskData.month,
        })
      );

      setLoaderStatus({ show: false, message: "" });
      toast.success("Task assigned successfully");
      onClose();
    } catch (error) {
      console.error("Error assigning task:", error);
      setLoaderStatus({ show: false, message: "" });
      toast.error("Failed to assign task");
      onClose();
    }
  };

  useEffect(() => {
    if (assignTaskStatus === "succeeded") {
      setSelectedUser("");
      setDueDate("");
    }
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    let month = "" + (today.getMonth() + 1);
    let day = "" + today.getDate();
    const year = today.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      {loaderStatus.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-transparent p-8 rounded-lg flex flex-col items-center">
            <div className="mb-4">
              <Oval
                height={50}
                width={50}
                color="#00BFFF"
                secondaryColor="#f3f3f3"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
            <p className="text-white text-lg font-medium">
              {loaderStatus.message}
            </p>
          </div>
        </div>
      )}
      <div className="fixed inset-0 bg-gray-400 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-xl w-96">
          <h2 className="text-xl font-semibold">Assign user</h2>
          <p className="text-sm text-gray-600 mb-4">
            Assign a user and select a due date.
          </p>

          <div className="mx-2">
            <div className="flex justify-between items-center">
              <div className="mb-4">
                <p className="text-sm font-semibold">Location</p>
                <p className="text-sm text-gray-600">{selectedLocation}</p>
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
                {taskData.activity || "Not Selected"}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-normal mb-2">
              Assign User
            </label>
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
              min={getTodayDate()}
              required
              onClick={(e) => {
                e.currentTarget.showPicker();
              }}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-1.5 bg-white text-gray-800 rounded-lg mr-2 w-full border border-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-1.5 bg-blue-500 text-white rounded-lg w-full"
              onClick={handleAssign}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignEmissionModal;
