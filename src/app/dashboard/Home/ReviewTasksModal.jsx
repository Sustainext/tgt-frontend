import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";

const ReviewTasksModal = ({
  tasks,
  onClose,
  fetchTasks,
  handleTaskAction,
  setSelectedTasks,
  users,
}) => {
  const [selectedAction, setSelectedAction] = useState("approve");
  const [bulkData, setBulkData] = useState({
    assigned_to: "",
    deadline: "",
    comments: "",
  });

  const handleBulkAction = async () => {
    console.log("Selected Action:", selectedAction);

    if (selectedAction === "reassign") {
      if (!bulkData.assigned_to || !bulkData.deadline) {
        toast.error("Please fill in all fields for reassignment", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    }

    if (selectedAction === "reject") {
      if (!bulkData.deadline || !bulkData.comments) {
        toast.error("Please fill in all fields for rejection", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    }

    try {
      let payload;

      if (selectedAction === "approve") {
        payload = tasks.map((task) => ({
          id: task.id,
          task_status: "approved",
        }));
      } else if (selectedAction === "reassign") {
        payload = tasks.map((task) => ({
          id: task.id,
          task_status: "in_progress",
          assigned_to: bulkData.assigned_to,
          deadline: bulkData.deadline,
          value1: "",
          value2: "",
          unit1: "",
          unit2: "",
          file_data: {},
          user_client: 1,
        }));
      } else if (selectedAction === "reject") {
        payload = tasks.map((task) => ({
          id: task.id,
          task_status: "reject",
          deadline: bulkData.deadline,
          comments: bulkData.comments,
          file_data: {},
          value1: "",
          value2: "",
          unit1: "",
          unit2: "",
        }));
      }

      console.log("Payload:", payload);

      await handleTaskAction(null, "bulk_update", payload);
      toast.success(`Tasks have been ${selectedAction}ed successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      onClose();
      fetchTasks();
    } catch (error) {
      console.error(`Error performing bulk ${selectedAction}:`, error);
      toast.error(`Failed to ${selectedAction} tasks`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleRemoveTask = (taskId) => {
    setSelectedTasks((prevTasks) => prevTasks.filter((id) => id !== taskId));
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-12 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-4 xl:w-[45vw] md:w-[45vw] w-[101vw] min-h-[70vh] relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Review Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ×
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-500">
          Review all the selected tasks
        </p>

        {/* Tasks Table */}
        <div className="overflow-x-auto mb-4 h-[35vh] overflow-y-scroll table-scrollbar">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-4 py-2" colSpan={3}>
                  Task Name
                </th>
                <th className="px-4 py-2" colSpan={2}>
                  Assignee
                </th>
                <th className="px-4 py-2" colSpan={2}>
                  Due Date
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t text-gray-500">
                  <td className="px-4 py-2" colSpan={3}>
                    {task.task_name}
                  </td>
                  <td
                    className="px-4 py-2"
                    colSpan={2}
                  >{`${task.assign_to_user_name} (${task.assign_to_email})`}</td>
                  <td className="px-4 py-2" colSpan={2}>
                    {task.deadline}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveTask(task.id)}
                      className="text-gray-500 hover:text-red-500"
                      title="Remove task"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 border border-gray-300 rounded-lg">
          {/* Action Buttons */}
          <div className="flex gap-4 mb-4 justify-between w-full">
            <button
              className={`px-4 py-2 rounded-md w-full ${
                selectedAction === "approve"
                  ? "bg-green-500 text-white"
                  : "bg-white text-green-500 border border-green-500"
              }`}
              onClick={() => setSelectedAction("approve")}
            >
              Approve
            </button>
            <button
              className={`px-4 py-2 rounded-md w-full ${
                selectedAction === "reassign"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-yellow-500 border border-yellow-500"
              }`}
              onClick={() => setSelectedAction("reassign")}
            >
              Reassign
            </button>
            <button
              className={`px-4 py-2 rounded-md w-full ${
                selectedAction === "reject"
                  ? "bg-red-500 text-white"
                  : "bg-white text-red-500 border border-red-500"
              }`}
              onClick={() => setSelectedAction("reject")}
            >
              Reject
            </button>
          </div>

          {/* Action Forms */}
          {selectedAction === "reassign" && (
            <div className="grid grid-cols-1 gap-4 mb-4">
              <h5 className="text-left text-sm mb-1">Assign new user</h5>
              <select
                className="block w-full rounded-md border-0 py-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                value={bulkData.assigned_to}
                onChange={(e) =>
                  setBulkData({ ...bulkData, assigned_to: e.target.value })
                }
              >
                <option value="">Select new user</option>
                {users?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.username}
                  </option>
                ))}
              </select>
              <input
                type="date"
                placeholder="Deadline"
                className="border px-4 py-2 rounded-md"
                value={bulkData.deadline}
                onChange={(e) =>
                  setBulkData({ ...bulkData, deadline: e.target.value })
                }
              />
            </div>
          )}
          {selectedAction === "reject" && (
            <div className="grid grid-cols-1 gap-4">
              <input
                type="date"
                placeholder="Deadline"
                className="border px-4 py-2 rounded-md"
                value={bulkData.deadline}
                onChange={(e) =>
                  setBulkData({ ...bulkData, deadline: e.target.value })
                }
              />
              <textarea
                placeholder="Comments"
                className="border px-4 py-2 rounded-md"
                value={bulkData.comments}
                onChange={(e) =>
                  setBulkData({ ...bulkData, comments: e.target.value })
                }
              />
            </div>
          )}

          <div className="flex justify-center items-center mb-2 text-gray-600">
            {selectedAction === "approve" &&
              "Click on submit to bulk approve all the tasks"}
          </div>
          <div className="flex justify-center items-center mb-2 text-gray-600">
            {selectedAction === "reassign" &&
              "Click on Submit to reassign all the above tasks to the selected user."}
          </div>
          <div className="flex justify-center items-center mb-2 text-gray-600">
            {selectedAction === "reject" &&
              "Click on Submit to ask the respective users to redo the task with new due date"}
          </div>

          {/* Submit Button */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
            onClick={handleBulkAction}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewTasksModal;