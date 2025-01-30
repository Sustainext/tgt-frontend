import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../../Context/auth";
import { toast } from "react-toastify";
import Moment from "react-moment";
import axiosInstance, {
  del,
  patch,
  post,
} from "../../../utils/axiosMiddleware";
import { FiPlus, FiCheckCircle, FiTrash2, FiCircle } from "react-icons/fi";

const MyGoals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMounted = useRef(true);
  const [goals, setGoals] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [addGoals, setAddGoals] = useState({
    title: "",
    deadline: "",
  });

  const { title, deadline } = addGoals;
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

  const getTodayDate = () => {
    const today = new Date();
    let month = "" + (today.getMonth() + 1);
    let day = "" + today.getDate();
    const year = today.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const handleCompleted = async (id) => {
    LoaderOpen();
    try {
      const response = await patch(`/mygoal/${id}/`, { completed: true });
      if (response.status === 200) {
        toast.success("Goal has been completed successfully");
        fetchMygoleDetails();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error completing goal");
    } finally {
      LoaderClose();
    }
  };

  const handleDelete = async (id) => {
    LoaderOpen();
    try {
      const response = await del(`/mygoal/${id}/`);
      if (response.status === 200) {
        toast.success("Goal has been deleted successfully");
        fetchMygoleDetails();
      } else {
        toast.error("Error");
      }
    } finally {
      LoaderClose();
    }
  };

  const datahandleChange = (e) => {
    setAddGoals({ ...addGoals, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();
    try {
      const response = await post("/mygoal/", {
        ...addGoals,
        assigned_to: userId,
        completed: false,
      });

      if (response.status === 200) {
        toast.success("Goal has been added successfully");
        handleCloseModal();
        fetchMygoleDetails();
        setAddGoals({ title: "", deadline: "" });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error adding goal");
    } finally {
      LoaderClose();
    }
  };

  const fetchMygoleDetails = async () => {
    if (userId && accessToken) {
      try {
        LoaderOpen();
        const response = await axiosInstance.get(
          `/mygoal/?assigned_to=${userId}`
        );
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        LoaderClose();
      }
    }
  };

  useEffect(() => {
    if (userId && accessToken) {
      fetchMygoleDetails();
    }
  }, [userId, accessToken]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const renderGoalsList = (goalsList = []) => {
    if (goalsList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <FiCheckCircle className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Start by creating a goal
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            All goals created or assigned to you will be here
          </p>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add a goal
          </button>
        </div>
      );
    }

    return goalsList.map((goal) => (
      <div
        key={goal.id}
        className="flex items-center justify-between py-3 border-b border-gray-100"
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleCompleted(goal.id)}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <FiCheckCircle className="w-5 h-5" />
          </button>
          <span className="text-gray-900">{goal.title}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            <Moment format="DD/MM/YYYY">{goal.deadline}</Moment>
          </span>
          <button
            onClick={() => handleDelete(goal.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    ));
  };

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "overdue", label: "Overdue" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Organization Goals
        </h2>
        <button
          onClick={handleOpenModal}
          className="flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          <FiPlus className="w-4 h-4 mr-1" />
          Add Goals
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="overflow-y-auto max-h-[400px]">
        {activeTab === "upcoming" && renderGoalsList(goals.upcoming)}
        {activeTab === "overdue" && renderGoalsList(goals.overdue)}
        {activeTab === "completed" && renderGoalsList(goals.completed)}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Add Organization Goals
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="w-6 h-6"
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

            <form onSubmit={submitForm} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Goal Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={datahandleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter goal name"
                />
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={deadline}
                  onChange={datahandleChange}
                  min={getTodayDate()}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loopen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-white">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGoals;
