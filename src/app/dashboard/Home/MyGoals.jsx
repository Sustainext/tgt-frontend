import React, { useState, useEffect, useRef } from "react";
import {
  FiPlus,
  FiCheckCircle,
  FiTrash2,
  FiCircle,
  FiCalendar,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { useAuth } from "../../../Context/auth";
import axiosInstance, { del, patch, post } from "../../utils/axiosMiddleware";

const MyGoals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMounted = useRef(true);
  const [goals, setGoals] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [addgoals, setAddgoals] = useState({
    title: "",
    description: "",
    organization: "",
    status: "not_started",
    deadline: "",
  });

  const { userDetails, token } = useAuth();
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (userDetails) {
      setUserId(userDetails?.user_detail[0]?.id);
    }
    if (token) {
      setAccessToken(token?.replace(/"/g, ""));
    }
  }, [userDetails, token]);

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchMyGoalDetails = async () => {
    try {
      LoaderOpen();
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/mygoal/?assigned_to=${userId}`
      );
      setGoals(response.data);
      LoaderClose();
    } catch (error) {
      LoaderClose();
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId && accessToken) {
      fetchMyGoalDetails();
    }
  }, [userId, accessToken]);

  const handleStatusChange = async (id) => {
    LoaderOpen();
    const sandData = { completed: true };
    try {
      const response = await patch(`/mygoal/${id}/`, sandData);
      if (response.status === 200) {
        toast.success("Goal has been completed successfully");
        fetchMyGoalDetails();
      }
    } catch (error) {
      toast.error("Error updating goal status");
    }
    LoaderClose();
  };

  const handleDelete = async (id) => {
    LoaderOpen();
    try {
      const response = await del(`/mygoal/${id}/`);
      if (response.status === 200) {
        toast.success("Goal has been deleted successfully");
        fetchMyGoalDetails();
      }
    } catch (error) {
      toast.error("Error deleting goal");
    }
    LoaderClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    LoaderOpen();
    const sandData = {
      ...addgoals,
      assigned_to: userId,
      completed: false,
    };

    try {
      const response = await post(`/mygoal/`, sandData);
      if (response.status === 200) {
        toast.success("Goal has been added successfully");
        handleCloseModal();
        fetchMyGoalDetails();
        setAddgoals({
          title: "",
          description: "",
          organization: "",
          status: "not_started",
          deadline: "",
        });
      }
    } catch (error) {
      toast.error("Error adding goal");
    }
    LoaderClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Organization Goals
        </h1>
        <button
          onClick={handleOpenModal}
          className="flex items-center text-blue-500 hover:text-blue-600 gap-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Goals</span>
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {["upcoming", "overdue", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-gray-500 bg-gray-50 rounded-t-lg">
          <div className="col-span-6">Tasks</div>
          <div className="col-span-3 text-center">Status</div>
          <div className="col-span-3 text-right">Due date</div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {activeTab === "upcoming" && goals.upcoming?.length === 0 ? (
            <div className="text-center py-12">
              <FiCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                Start by creating a goal
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Add goals to track your progress
              </p>
              <button
                onClick={handleOpenModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add a goal
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {goals[activeTab]?.map((goal) => (
                <div
                  key={goal?.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 items-center border-b"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <button
                      onClick={() => handleStatusChange(goal.id)}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      {goal?.completed ? (
                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <FiCircle className="h-5 w-5" />
                      )}
                    </button>
                    <span className="text-sm text-gray-900">{goal?.title}</span>
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </div>
                  <div className="col-span-3 flex justify-end items-center gap-2">
                    <span className="text-sm text-gray-500">
                      <Moment format="DD/MM/YYYY">{goal?.deadline}</Moment>
                    </span>
                    {!goal?.completed && (
                      <button
                        onClick={() => handleDelete(goal?.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Organization Goals
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Add goals with descriptions and deadlines to keep your goals on
              track.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={addgoals.status}
                  onChange={(e) =>
                    setAddgoals({ ...addgoals, status: e.target.value })
                  }
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Goal Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter goal name"
                  value={addgoals.title}
                  onChange={(e) =>
                    setAddgoals({ ...addgoals, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={addgoals.organization}
                  onChange={(e) =>
                    setAddgoals({ ...addgoals, organization: e.target.value })
                  }
                >
                  <option value="">Select Organization</option>
                  <option value="org1">Organization 1</option>
                  <option value="org2">Organization 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Goal Description
                </label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows={3}
                  placeholder="Enter goal description"
                  value={addgoals.description}
                  onChange={(e) =>
                    setAddgoals({ ...addgoals, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="date"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={addgoals.deadline}
                    onChange={(e) =>
                      setAddgoals({ ...addgoals, deadline: e.target.value })
                    }
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loopen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-white">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGoals;
