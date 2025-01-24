import React, { useState, useEffect } from "react";
import { FiPlus, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { useAuth } from "../../../Context/auth";
import axiosInstance, { del, patch, post } from "../../utils/axiosMiddleware";
import GoalsModal from "./GoalsModal";

const MyGoals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [goals, setGoals] = useState({});
  const [loopen, setLoOpen] = useState(false);

  const { userDetails, token } = useAuth();
  const [userId, setUserId] = useState(null);

  const [activeTab, setActiveTab] = useState("upcoming");
  const [formData, setFormData] = useState({
    status: "not_started",
    title: "",
    organization: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    if (userDetails) {
      setUserId(userDetails?.user_detail[0]?.id);
    }
  }, [userDetails]);

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const fetchGoals = async () => {
    try {
      LoaderOpen();
      const response = await axiosInstance.get(
        `/mygoal/?assigned_to=${userId}`
      );
      setGoals(response.data);
    } catch (error) {
      toast.error("Error fetching goals");
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (userId) {
      fetchGoals();
    }
  }, [userId]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setFormData({
      status: "not_started",
      title: "",
      organization: "",
      description: "",
      deadline: "",
    });
  };

  const handleEditModal = (goal) => {
    if (!goal) {
      toast.error("Invalid goal selected");
      return;
    }
    setIsModalOpen(true);
    setIsEditing(true);
    setCurrentGoal(goal);
    setFormData({
      status: goal.status || "not_started",
      title: goal.title || "",
      organization: goal.organization || "",
      description: goal.description || "",
      deadline: goal.deadline || "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentGoal(null);
    setFormData({
      status: "not_started",
      title: "",
      organization: "",
      description: "",
      deadline: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, status }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    LoaderOpen();

    try {
      if (isEditing) {
        // Update goal
        const response = await patch(`/mygoal/${currentGoal.id}/`, formData);
        if (response.status === 200) {
          toast.success("Goal updated successfully!");
        }
      } else {
        // Add new goal
        const response = await post(`/mygoal/`, {
          ...formData,
          assigned_to: userId,
          completed: false,
        });
        if (response.status === 200) {
          toast.success("Goal added successfully!");
        }
      }
      fetchGoals();
      handleCloseModal();
    } catch (error) {
      toast.error("Error saving goal");
    } finally {
      LoaderClose();
    }
  };

  const handleDelete = async () => {
    if (!currentGoal) {
      toast.error("Invalid goal selected");
      return;
    }
    LoaderOpen();
    try {
      const response = await del(`/mygoal/${currentGoal.id}/`);
      if (response.status === 200) {
        toast.success("Goal deleted successfully!");
      }
      fetchGoals();
      handleCloseModal();
    } catch (error) {
      toast.error("Error deleting goal");
    } finally {
      LoaderClose();
    }
  };

  const renderGoalsList = (goalsList) => {
    if (!goalsList || goalsList.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-full mt-8">
          <div className="flex justify-center items-center pb-5">
            <FiCheckCircle style={{ color: "#ACACAC", fontSize: "36px" }} />
          </div>
          <p className="text-[14px] text-[#101828] font-bold text-center">
            Start by creating a goal
          </p>
          <button
            className="bg-[#007EEF] text-white w-[150px] p-2 rounded-md shadow-md mt-4"
            onClick={handleOpenModal}
          >
            Add a goal
          </button>
        </div>
      );
    }

    return goalsList.map((goal) => {
      // Check if the goal object is valid
      if (!goal || typeof goal !== "object") {
        return (
          <div className="flex flex-col justify-center items-center h-full mt-8">
            <div className="flex justify-center items-center pb-5">
              <FiCheckCircle style={{ color: "#ACACAC", fontSize: "36px" }} />
            </div>
            <p className="text-[14px] text-[#101828] font-bold text-center">
              Start by creating a goal
            </p>
            <button
              className="bg-[#007EEF] text-white w-[150px] px-2 py-1 rounded-md shadow-md mt-4 text-sm"
              onClick={handleOpenModal}
            >
              Add a goal
            </button>
          </div>
        );
      }

      return (
        <div
          key={goal.id}
          className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-gray-50 cursor-pointer border-b border-gray-200 text-sm"
          onClick={() => handleEditModal(goal)}
        >
          <div className="col-span-5 flex items-center gap-3">
            <span className="text-blue-500 hover:underline">
              {goal.title || "Untitled Goal"}
            </span>
          </div>
          <div className="col-span-4">
            <div className="flex items-center gap-2"><div
              className={`w-2 h-2 rounded-full ${
                goal.status === "completed"
                  ? "bg-green-500"
                  : goal.status === "in_progress"
                  ? "bg-yellow-400"
                  : "bg-gray-300"
              }`}
            ></div>
            <div>{goal.status || "Not Started"}</div></div>
          </div>
          <div className="col-span-3 flex justify-between">
            <Moment format="DD/MM/YYYY">{goal.deadline}</Moment>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[#0f1728] text-lg font-medium font-['Manrope'] leading-7">
          Organization Goals
        </h1>
        <button
          onClick={handleOpenModal}
          className="text-sky-600 text-sm cursor-pointer font-normal leading-[13px] flex items-center me-2 space-x-2"
        >
          <FiPlus className="w-5 h-5" />
          Add Goal
        </button>
      </div>

      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {["Upcoming", "Overdue", "Completed"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab.toLowerCase()
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
        <div className="col-span-5">Tasks</div>
        <div className="col-span-4">Status</div>
        <div className="col-span-3">Due Date</div>
      </div>

      <div className="space-y-2">
        {goals && goals[activeTab]
          ? renderGoalsList(goals[activeTab])
          : renderGoalsList([])}
      </div>

      {isModalOpen && (
        <GoalsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isEditing={isEditing}
          formData={formData}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default MyGoals;
