import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { post } from "../../../utils/axiosMiddleware";

// Import custom hooks
import {
  useTaskManagement,
  useFileUpload,
  useActivitySelection,
  useModalState,
} from "./useTaskManagement";

// Import components
import {
  TaskHeader,
  TaskTabs,
  TaskTable,
  EmptyState,
  LoadingSpinner,
  TaskRow,
  TaskStatusBadge,
} from "./TaskComponents";
import TaskDetailsModal from "./TaskDetailsModal";
import TaskEditModal from "./TaskEditModal";
import TaskReviewModal from "./TaskReviewModal";
import TaskDeleteModal from "./TaskDeleteModal";

// Import utilities
import {
  getTodayDate,
  isBeforeToday,
  validateDecimalPlaces,
  TABS,
  TABLE_HEADERS,
  INITIAL_MODAL_STATES,
  INITIAL_TASK_DATA,
  handleApiError,
} from "./TaskUtils";

// Import actions
import { fetchUsers } from "../../../../lib/redux/features/emissionSlice";

const MyTask = () => {
  // Redux
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.emissions);

  // Router
  const router = useRouter();

  // Custom Hooks
  const { tasks, isLoading, fetchTasks, handleTaskAction, deleteTask } =
    useTaskManagement();

  const { uploadFile } = useFileUpload();
  const {
    activitiesList,
    setActivitiesList,
    isSearching,
    setIsSearching,
    fetchActivities,
  } = useActivitySelection();

  const [modalStates, toggleModal] = useModalState(INITIAL_MODAL_STATES);

  // Local State
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskFormData, setTaskFormData] = useState(INITIAL_TASK_DATA);
  const [selectedActivityName, setSelectedActivityName] = useState("");
  const [selectedActivity, setSelectedActivity] = useState({});

  // Fetch initial data
  useEffect(() => {
    fetchTasks();
    if (users.status === "idle") {
      dispatch(fetchUsers());
    }
  }, []);

  // Handlers
  const handleTaskClick = async (task) => {
    setSelectedTask(task);
    toggleModal("isDetailsModalOpen", true);
  };

  const handleAddEditTask = async (taskData, isEdit = false) => {
    console.log("handleAddEditTask called", { taskData, isEdit });

    try {
      if (isEdit) {
        await handleTaskAction(taskData.id, "update", taskData);
      } else {
        // For adding new task
        const newTaskData = {
          ...taskData,
          assigned_by: parseInt(localStorage.getItem("user_id")),
          user_client: 1,
          roles: 3,
        };

        console.log("Submitting new task:", newTaskData);

        const response = await post(
          `/organization_task_dashboard/`,
          newTaskData
        );

        if (response.status === 201) {
          toast.success("Task has been added successfully");
          await fetchTasks();
        } else {
          throw new Error("Failed to create task");
        }
      }

      toggleModal("isModalOpen", false);
      setTaskFormData(INITIAL_TASK_DATA);
    } catch (error) {
      console.error("Error in handleAddEditTask:", error);
      handleApiError(error, isEdit ? "updating" : "creating");
      // Don't close modal on error
      return false;
    }
  };

  const handleFileUploadAndUpdate = async (file, taskId) => {
    try {
      const fileData = await uploadFile(file);
      if (fileData) {
        await handleTaskAction(taskId, "update", {
          file_data: fileData,
        });
      }
    } catch (error) {
      handleApiError(error, "uploading file");
    }
  };

  const handleActivitySelection = async (subcategory, region, year) => {
    setIsSearching(true);
    try {
      const initialResponse = await fetchActivities(
        subcategory,
        1,
        false,
        region,
        year
      );
      setActivitiesList(initialResponse.activitiesData);

      if (initialResponse.pages > 1) {
        for (let i = 2; i <= initialResponse.pages; i++) {
          const isCustomFetch =
            initialResponse.pagesCustom > 1 && i <= initialResponse.pagesCustom
              ? false
              : true;
          const additionalResponse = await fetchActivities(
            subcategory,
            i,
            isCustomFetch,
            region,
            year
          );
          setActivitiesList((prev) => [
            ...prev,
            ...additionalResponse.activitiesData,
          ]);
        }
      }
    } catch (error) {
      handleApiError(error, "fetching activities");
    } finally {
      setIsSearching(false);
    }
  };

  const handleTaskReview = async (taskId, action, data) => {
    try {
      await handleTaskAction(taskId, action, data);
      toggleModal("isReviewtask", false);
    } catch (error) {
      handleApiError(error, `${action} task`);
    }
  };

  const handleViewAll = () => {
    router.push("/dashboard/tasks");
  };

  // Render functions
  const renderTaskList = () => {
    const currentTasks = tasks[activeTab];
    if (!currentTasks?.length) {
      return activeTab === "upcoming" ? (
        <EmptyState onAction={() => toggleModal("isModalOpen", true)} />
      ) : (
        <div className="text-center text-gray-500 py-8">No data found</div>
      );
    }

    return currentTasks.map((task) => (
      <TaskRow
        key={task.id}
        task={task}
        onTaskClick={handleTaskClick}
        onEditClick={() => {
          setTaskFormData(task);
          toggleModal("isModalOpen", true);
        }}
      />
    ));
  };

  // Main render
  return (
    <>
      <div className="rounded-lg shadow border border-gray-200 p-4 px-6 h-[470px] overflow-x-auto">
        <TaskHeader onAddTask={() => toggleModal("isModalOpen", true)} />
        <TaskTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={TABS}
        />

        <TaskTable headers={TABLE_HEADERS}>{renderTaskList()}</TaskTable>

        <div className="mt-3 flex justify-end px-4">
          <button
            onClick={handleViewAll}
            className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            <span className="text-sm font-medium">View All</span>
            <FiArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <TaskEditModal
        isOpen={modalStates.isModalOpen}
        onClose={() => toggleModal("isModalOpen", false)}
        task={taskFormData}
        onSubmit={handleAddEditTask}
        users={users}
      />

      <TaskDetailsModal
        isOpen={modalStates.isDetailsModalOpen}
        onClose={() => toggleModal("isDetailsModalOpen", false)}
        task={selectedTask}
      />

      <TaskReviewModal
        isOpen={modalStates.isReviewtask}
        onClose={() => toggleModal("isReviewtask", false)}
        task={selectedTask}
        onReview={handleTaskReview}
        onFileUpload={handleFileUploadAndUpdate}
        onActivitySelect={handleActivitySelection}
        activitiesList={activitiesList}
        isSearching={isSearching}
      />

      <TaskDeleteModal
        isOpen={modalStates.isModalOpenDelete}
        onClose={() => toggleModal("isModalOpenDelete", false)}
        onConfirm={() => deleteTask(selectedTask?.id)}
        taskName={selectedTask?.name}
      />

      {/* Loading State */}
      {(isLoading || isSearching) && <LoadingSpinner />}
    </>
  );
};

export default MyTask;
