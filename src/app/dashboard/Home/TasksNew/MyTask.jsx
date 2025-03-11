import React, { useState, useEffect } from "react";
import {
  FiArrowRight,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { BlobServiceClient } from "@azure/storage-blob";
import { unitTypes } from "@/app/shared/data/units";
import axiosInstance from "@/app/utils/axiosMiddleware";


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
import AddTaskModal from "./AddTaskModal";
// import TaskReviewModal from "./TaskReviewModal";
import TaskDeleteModal from "./TaskDeleteModal";
import FillModal from "./FillModal";
import ReviewTaskModal from "./ReviewTaskModal";
import TaskFillModal from "./TaskFillModal";

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

import { fetchUsers } from "../../../../lib/redux/features/emissionSlice";
import ViewMyTaskDetailsModal from "./ViewMyTaskDetailsModal";
import MyTaskReviewModal from "./MyTaskReviewModal";
import EditTaskModal from "./EditTaskModal";

const MyTask = ({HomeActiveTab}) => {
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
  const [isFillModalOpen, setIsFillModalOpen] = useState(false);
  const [taskassigndata, setTaskAssigndata] = useState({
    id: "",
    task_name: "",
    assign_to_user_name: "",
    category: "",
    deadline: "",
    factor_id: "",
    location: "",
    month: "",
    scope: "",
    subcategory: "",
    year: "",
    activity: "",
    value1: "",
    value2: "",
    unit1: "",
    unit2: "",
    file: null,
    filename: "",
    filesize: "",
    modifiedAt: "",
    assign_to_email: "",
    file_data: null,
  });
  const [selectedActivityName, setSelectedActivityName] = useState("");
  const [selectedActivity, setSelectedActivity] = useState({});
  const [isActivityReceived, setIsActivityReceived] = useState(false);
  const [isActivityFetched, setIsActivityFetched] = useState(false);

  const [clintlist, setClintlist] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  // Add this state near other modal states
  const [isSelfTaskFillModalOpen, setSelfTaskFillModalOpen] = useState(false);

  // Add this useEffect to fetch client list if needed
  useEffect(() => {
    const fetchClintList = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.BACKEND_API_URL}/sustainapp/user_client/`
        );
        setClintlist(response.data);
      } catch (error) {
        console.error("Error fetching client list:", error);
        setClintlist([]);
      }
    };

    fetchClintList();
  }, []);

  // Add this useEffect to set selected location
  useEffect(() => {
    if (taskassigndata.task_name) {
      setSelectedLocation(taskassigndata.task_name.split("-")[0]);
    }
  }, [taskassigndata.task_name]);

  // Fetch initial data
  useEffect(() => {
    fetchTasks();
    if (users.status === "idle") {
      dispatch(fetchUsers());
    }
  }, []);

  // Handle unit options when activity changes
  useEffect(() => {
    if (selectedActivityName && activitiesList.length > 0) {
      const activity = activitiesList.find(
        (act) =>
          `${act.name} - (${act.source}) - ${act.unit_type}` ===
          selectedActivityName
      );

      if (activity) {
        const type = activity.unit_type;
        // Find matching unit types from the unitTypes array
        const matchingUnitType = unitTypes.find((ut) => ut.unit_type === type);

        if (matchingUnitType) {
          setSelectedActivity({
            ...activity,
            unit_type: type,
            units: matchingUnitType.units,
          });
        }
      }
    }
  }, [selectedActivityName, activitiesList]);

  // Handle modal close
  const handleModalClose = () => {
    setIsFillModalOpen(false);
    setTaskAssigndata(INITIAL_TASK_DATA);
    setSelectedActivityName("");
    setSelectedActivity({});
    setIsActivityReceived(false);
    setIsActivityFetched(false);
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


  const handleOpenModalAddData = async (task) => {
    try {
      setIsSearching(true);

      if (task.activity === null || task.activity === "") {
        setIsActivityReceived(false);
      } else {
        setIsActivityReceived(true);
      }

      setIsFillModalOpen(true);
      setSelectedActivityName(task.activity);

      setTaskAssigndata({
        id: task.id,
        task_name: task.task_name,
        assign_to_user_name: task.assign_to_user_name,
        assign_by_user_name: task.assign_by_user_name,
        assign_by_email: task.assign_by_email,
        category: task.category,
        deadline: task.deadline,
        factor_id: task.factor_id,
        location: task.location,
        month: task.month,
        scope: task.scope,
        subcategory: task.subcategory,
        year: task.year,
        activity: task.activity,
        value1: task.value1,
        value2: task.value2,
        unit1: task.unit1,
        unit2: task.unit2,
        file: task.file,
        filename: task.filename,
        status: task.task_status,
        assign_to_email: task.assign_to_email,
        file_data: task.file_data,
      });

      if (task.activity) {
        const unitTypeExtractedArray = task.activity.split("-");
        const extractedUnitType =
          unitTypeExtractedArray[unitTypeExtractedArray.length - 1]?.trim();
        setSelectedActivity({
          ...selectedActivity,
          unit_type: extractedUnitType,
        });
      }

      // Only fetch activities if activity is not received and required parameters are present
      if (!task.activity && task.subcategory && task.year) {
        const initialResponse = await fetchActivities(
          task.subcategory,
          1,
          false,
          task.region,
          task.year
        );

        setActivitiesList(initialResponse.activitiesData);

        if (initialResponse.pages > 1) {
          for (let i = 2; i <= initialResponse.pages; i++) {
            const isCustomFetch =
              initialResponse.pagesCustom > 1 &&
              i <= initialResponse.pagesCustom
                ? false
                : true;
            const additionalResponse = await fetchActivities(
              task.subcategory,
              i,
              isCustomFetch,
              task.region,
              task.year
            );
            setActivitiesList((prev) => [
              ...prev,
              ...additionalResponse.activitiesData,
            ]);
          }
        }
      }
    } catch (error) {
      console.error("Error in handleOpenModalAddData:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Add these functions in your MyTask component
  const submitApprove = async (taskId) => {
    try {
      const response = await handleTaskAction(taskId, "update", {
        task_status: "approved",
      });

      if (response) {
        toast.success("Task has been approved", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        toggleModal("isReviewtask", false);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error approving task:", error);
      toast.error("Failed to approve task", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const submitReAssign = async (taskId, data) => {
    try {
      if (!data.assigned_to || !data.deadline) {
        toast.error("Please fill in all fields", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const response = await handleTaskAction(taskId, "update", {
        task_status: "in_progress",
        assigned_to: data.assigned_to,
        deadline: data.deadline,
        value1: "",
        value2: "",
        unit1: "",
        unit2: "",
        file_data: {},
        user_client: 1,
      });

      if (response) {
        toast.success("Task has been reassigned successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        toggleModal("isReviewtask", false);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error reassigning task:", error);
      toast.error("Failed to reassign task", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const submitReject = async (taskId, data) => {
    try {
      if (!data.deadline || !data.comments) {
        toast.error("Please fill in all fields", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const response = await handleTaskAction(taskId, "update", {
        task_status: "reject",
        deadline: data.deadline,
        comments: data.comments,
        file_data: {},
        value1: "",
        value2: "",
        unit1: "",
        unit2: "",
      });

      if (response) {
        toast.success("Task has been rejected", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        toggleModal("isReviewtask", false);
        fetchTasks();
      }
    } catch (error) {
      console.error("Error rejecting task:", error);
      toast.error("Failed to reject task", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);

      const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT;
      const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER;
      const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;

      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`
      );

      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blobName = file.name;
      const blobClient = containerClient.getBlockBlobClient(blobName);

      await blobClient.uploadData(blob, {
        blobHTTPHeaders: { blobContentType: file.type },
      });

      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

      setTaskAssigndata((prev) => ({
        ...prev,
        file_data: {
          name: file.name,
          url: url,
          type: file.type,
          size: file.size,
          uploadDateTime: new Date().toLocaleString(),
          uploadedBy: prev.assign_to_email,
        },
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  
  const handleFileDelete = async () => {
    if (!taskassigndata.file_data || !taskassigndata.file_data.url) {
      toast.error("No file found to delete.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  
    try {
      const fileUrl = taskassigndata.file_data.url;
      const blobName = fileUrl.split("/").pop();
  
      const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT;
      const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER;
      const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;
  
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`
      );
  
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlockBlobClient(blobName);
  
      await blobClient.delete(); 
  
      setTaskAssigndata((prev) => ({
        ...prev,
        file_data: {}, 
      }));
  
      toast.success("File deleted successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  

  const handleTaskClick = (task) => {
    console.log("Task clicked:", task, activeTab);

    if (activeTab === "upcoming" || activeTab === "overdue") {
      if (task.roles === 1 || task.roles === 2) {
        handleOpenModalAddData(task);
      } else if (task.roles === 3) {
        //Open My TaskFillModal when assignee != assigner
        if (task.assigned_to === null) {
          setSelectedTask(task);
          toggleModal("isMyTaskEditModalOpen", true);
        }
        //Add condition to open Edit My Task Modal when assignee == assigner
        else {
          setSelectedTask(task);
          setSelfTaskFillModalOpen(true);
        }
      }
    } else if (activeTab === "completed") {
      if (task.roles === 3) {
        setSelectedTask(task);
        toggleModal("isMyTaskDetailModalOpen", true);
      } else if (task.roles === 1 || task.roles === 2 || task.roles === 4) {
        setSelectedTask(task);
        toggleModal("isDetailsModalOpen", true);
      }
    } else if (activeTab === "for_review") {
      if (task.roles === 1 || task.roles === 2 || task.roles === 4) {
        // Handle review task
        setTaskAssigndata({
          id: task.id,
          task_name: task.task_name,
          assign_to_user_name: task.assign_to_user_name,
          category: task.category,
          deadline: task.deadline,
          factor_id: task.factor_id,
          location: task.location,
          month: task.month,
          scope: task.scope,
          subcategory: task.subcategory,
          year: task.year,
          activity: task.activity,
          value1: task.value1,
          value2: task.value2,
          unit1: task.unit1,
          unit2: task.unit2,
          file: task.file,
          filename: task.filename,
          status: task.task_status,
          assign_to_email: task.assign_to_email,
          file_data: task.file_data,
        });
        toggleModal("isReviewtask", true);
      } else {
        setSelectedTask(task);
        toggleModal("isMyTaskReviewModalOpen", true);
      }
    } else {
      console.log("Invalid activeTab:", activeTab);
    }
  };

  const SubmitFilledData = async (e) => {
    e.preventDefault();

    const { value1, unit1 } = taskassigndata;

    if (!value1 || !unit1) {
      toast.error("Data cannot be empty", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await handleTaskAction(
        taskassigndata.id,
        "update",
        taskassigndata
      );

      if (response) {
        await handleTaskAction(taskassigndata.id, "review", {
          task_status: "under_review",
        });
        handleModalClose();
        toast.success("Data has been added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error in SubmitFilledData:", error);
      toast.error("Failed to submit data. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
    <ToastContainer style={{ fontSize: "12px" }} />
      <div className="rounded-lg shadow border border-gray-200 p-4 px-6 h-[450px] xl:h-[470px] lg:h-[470px] md:h-[470px] 4k:h-[470px] overflow-x-auto relative table-scrollbar">
        <TaskHeader onAddTask={() => toggleModal("isModalOpen", true)} />
        <TaskTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={TABS}
        />

        <TaskTable headers={TABLE_HEADERS}>
          {tasks[activeTab]?.length ? (
            tasks[activeTab].map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                activeTab={activeTab}
                onTaskClick={handleTaskClick}
              />
            ))
          ) : (
            <EmptyState
              onAddTask={() => toggleModal("isModalOpen", true)}
            />
          )}
        </TaskTable>

        <div className="mt-3 flex justify-end px-4 absolute bottom-4 right-4">
          <button
            onClick={()=>HomeActiveTab('tab3')}
            className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            <span className="text-sm font-medium">View All</span>
            <FiArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Fill Modal */}
      <FillModal
        isOpen={isFillModalOpen}
        onClose={handleModalClose}
        taskassigndata={taskassigndata}
        selectedActivityName={selectedActivityName}
        selectedActivity={selectedActivity}
        isActivityReceived={isActivityReceived}
        isActivityFetched={isActivityFetched}
        activitiesList={activitiesList}
        unitTypes={unitTypes}
        onActivityChange={(e) => {
          setSelectedActivityName(e.target.value);
          setTaskAssigndata({
            ...taskassigndata,
            activity: e.target.value,
          });
        }}
        onTaskDataChange={(changes) => {
          setTaskAssigndata((prev) => ({
            ...prev,
            ...changes,
          }));
        }}
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
        onSubmit={SubmitFilledData}
        isBeforeToday={isBeforeToday}
        validateDecimalPlaces={validateDecimalPlaces}
      />

      {/* Other Modals */}
      <TaskDetailsModal
        isOpen={modalStates.isDetailsModalOpen}
        onClose={() => {
          toggleModal("isDetailsModalOpen", false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />

      <AddTaskModal
        isOpen={modalStates.isModalOpen}
        onClose={() => toggleModal("isModalOpen", false)}
        onSubmit={async (id, action, data) => {
          console.log("onSubmit called with:", { id, action, data });
          return await handleTaskAction(id, action, data);
        }}
        users={users}
      />

      {/* Review Task Modal */}
      <ReviewTaskModal
        isOpen={modalStates.isReviewtask}
        onClose={() => {
          toggleModal("isReviewtask", false);
          setTaskAssigndata(INITIAL_TASK_DATA);
        }}
        taskassigndata={taskassigndata}
        onApprove={submitApprove}
        onReassign={submitReAssign}
        onReject={submitReject}
        clintlist={clintlist}
        selectedLocation={selectedLocation}
      />

      <TaskDeleteModal
        isOpen={modalStates.isModalOpenDelete}
        onClose={() => toggleModal("isModalOpenDelete", false)}
        onConfirm={() => deleteTask(selectedTask?.id)}
        taskName={selectedTask?.name}
      />

      {/* Self Task Fill Modal */}
      <TaskFillModal
        isOpen={isSelfTaskFillModalOpen}
        onClose={() => {
          setSelfTaskFillModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        fileData={taskassigndata.file_data}
        onSubmit={async (updatedTask) => {
          try {
            const response = await handleTaskAction(updatedTask.id, "update", {
              ...updatedTask,
              task_status: "under_review",
            });

            if (response) {
              toast.success("Task has been submitted for review", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
              setSelfTaskFillModalOpen(false);
              setSelectedTask(null);
              await fetchTasks();
            }
          } catch (error) {
            console.error("Error submitting task:", error);
            toast.error("Failed to submit task", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
          }
        }}
        onFileUpload={handleFileUpload}
      />

      {/* View Detailed My Task Modal */}
      <ViewMyTaskDetailsModal
        isOpen={modalStates.isMyTaskDetailModalOpen}
        onClose={() => {
          toggleModal("isMyTaskDetailModalOpen", false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />

      <MyTaskReviewModal
        isOpen={modalStates.isMyTaskReviewModalOpen}
        onClose={() => {
          toggleModal("isMyTaskReviewModalOpen", false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onApprove={submitApprove}
        onReassign={submitReAssign}
        onReject={submitReject}
        userlist={clintlist}
      />

      <EditTaskModal
        isOpen={modalStates.isMyTaskEditModalOpen}
        onClose={() => {
          toggleModal("isMyTaskEditModalOpen", false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSubmit={async (data) => {
          console.log("Edit Task Modal Submit:", data);
          try {
            if (data.action === "delete") {
              // Handle delete
              const success = await deleteTask(selectedTask?.id);
              if (success) {
                toggleModal("isMyTaskEditModalOpen", false);
                setSelectedTask(null);
                await fetchTasks();
              }
            } else {
              // Handle update
              const updatedData = {
                task_name: data.taskName.trim(),
                deadline: data.dueDate,
                description: data.description?.trim(),
                task_status: data.status,
                file_data: data.file,
                comments_assignee: data.comments,
              };

              const success = await handleTaskAction(
                selectedTask?.id,
                "update",
                updatedData
              );
              console.log("Edit Task Modal Response:", success);
              if (success) {
                toggleModal("isMyTaskEditModalOpen", false);
                setSelectedTask(null);
                await fetchTasks();
              }
            }
          } catch (error) {
            handleApiError(
              error,
              data.action === "delete" ? "deleting" : "updating"
            );
          }
        }}
      />

      {/* Loading Spinner */}
      {(isLoading || isSearching) && <LoadingSpinner />}
    </>
  );
};

export default MyTask;
