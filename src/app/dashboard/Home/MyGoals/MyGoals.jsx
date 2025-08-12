import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../../Context/auth";
import { toast } from "react-toastify";
import Moment from "react-moment";
import axiosInstance, {
  del,
  patch,
  post,
} from "../../../utils/axiosMiddleware";
import { FiPlus, FiCheckCircle, FiTrash2, FiCircle, FiX } from "react-icons/fi";

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
      // toast.error("Error completing goal");
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
      // toast.error("Error adding goal");
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
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <FiCheckCircle className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
            Start by creating a goal
          </h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
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
        className="flex items-center justify-between py-3 px-2 border-b border-gray-100 hover:bg-gray-50 rounded-md transition-colors"
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <button
            onClick={() => handleCompleted(goal.id)}
            className="text-gray-400 hover:text-blue-500 transition-colors flex-shrink-0"
            title="Mark as completed"
          >
            <FiCheckCircle className="w-5 h-5" />
          </button>
          <span className="text-gray-900 text-sm md:text-base truncate">{goal.title}</span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
          <span className="text-xs md:text-sm text-gray-500 min-w-fit px-2">
            <Moment format="DD/MM/YYYY">{goal.deadline}</Moment>
          </span>
          <button
            onClick={() => handleDelete(goal.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Delete goal"
          >
            <FiTrash2 className="w-4 h-4" />
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
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Organization Goals
        </h2>
        <button
          onClick={handleOpenModal}
          className="flex items-center justify-center sm:justify-start text-blue-500 hover:text-blue-600 text-sm font-medium px-4 py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-1" />
          Add Goals
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-4 md:space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 whitespace-nowrap text-sm md:text-base ${
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

      <div className="overflow-y-auto max-h-[400px] min-h-[200px]">
        {activeTab === "upcoming" && renderGoalsList(goals.upcoming)}
        {activeTab === "overdue" && renderGoalsList(goals.overdue)}
        {activeTab === "completed" && renderGoalsList(goals.completed)}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Add Organization Goals
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 p-1"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={submitForm} className="p-6 space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Goal Name *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={datahandleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter goal name"
                />
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date *
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={deadline}
                  onChange={datahandleChange}
                  min={getTodayDate()}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loopen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-700">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGoals;