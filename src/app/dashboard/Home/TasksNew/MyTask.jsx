import React, { useState, useEffect } from "react";
import { FiPlus, FiX, FiUser, FiFile, FiChevronDown, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import { BlobServiceClient } from "@azure/storage-blob";

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
import ImageUpload from "../../../shared/components/ImageUpload";

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

const MyTask = () => {
  // Redux
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.emissions);

  // Router
  const router = useRouter();

  // Custom Hooks
  const { tasks, isLoading, fetchTasks, handleTaskAction, deleteTask } = useTaskManagement();
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
        act => `${act.name} - (${act.source}) - ${act.unit_type}` === selectedActivityName
      );
      
      if (activity) {
        const unitOpts = activity.units || [];
        
        // If activity has separate pairs of units (e.g., "Over" type)
        if (activity.unit_type?.includes('Over')) {
          setSelectedActivity(prev => ({
            ...prev,
            ...activity,
            unit_options: unitOpts[0] || [],
            unit_options_secondary: unitOpts[1] || []
          }));
        } else {
          // Single unit type
          setSelectedActivity(prev => ({
            ...prev,
            ...activity,
            unit_options: unitOpts
          }));
        }
      }
    }
  }, [selectedActivityName, activitiesList]);

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
        const extractedUnitType = unitTypeExtractedArray[unitTypeExtractedArray.length - 1]?.trim();
        setSelectedActivity({
          ...selectedActivity,
          unit_type: extractedUnitType,
        });
      }

      if (task.subcategory && task.year) {
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
            const isCustomFetch = initialResponse.pagesCustom > 1 && i <= initialResponse.pagesCustom ? false : true;
            const additionalResponse = await fetchActivities(
              task.subcategory,
              i,
              isCustomFetch,
              task.region,
              task.year
            );
            setActivitiesList(prev => [...prev, ...additionalResponse.activitiesData]);
          }
        }
      }
    } catch (error) {
      console.error("Error in handleOpenModalAddData:", error);
      toast.error("Failed to load activities. Please try again.");
    } finally {
      setIsSearching(false);
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

      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobName = file.name;
      const blobClient = containerClient.getBlockBlobClient(blobName);

      await blobClient.uploadData(blob, {
        blobHTTPHeaders: { blobContentType: file.type },
      });

      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

      setTaskAssigndata(prev => ({
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
      toast.error("Failed to upload file");
    }
  };

  const handleTaskClick = (task) => {
    if (activeTab === "completed") {
      if (task.roles === 1 || task.roles === 2 || task.roles === 4) {
        setSelectedTask(task);
        toggleModal("isDetailsModalOpen", true);
      }
    } else {
      if (task.roles === 1 || task.roles === 2) {
        handleOpenModalAddData(task);
      } else if (task.roles === 3) {
        setTaskFormData(task);
        toggleModal("isModalOpen", true);
      }
    }
  };

  const SubmitFilledData = async (e) => {
    e.preventDefault();

    const { value1, unit1 } = taskassigndata;

    if (!value1 || !unit1) {
      toast.error("Data cannot be empty");
      return;
    }

    try {
      const response = await handleTaskAction(taskassigndata.id, "update", taskassigndata);

      if (response) {
        await handleTaskAction(taskassigndata.id, "review", { task_status: "under_review" });
        setIsFillModalOpen(false);
        toast.success("Data has been added successfully");
      }
    } catch (error) {
      console.error("Error in SubmitFilledData:", error);
      toast.error("Failed to submit data. Please try again.");
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
          setActivitiesList((prev) => [...prev, ...additionalResponse.activitiesData]);
        }
      }
    } catch (error) {
      handleApiError(error, "fetching activities");
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewAll = () => {
    router.push("/dashboard/tasks");
  };

  return (
    <>
      <div className="rounded-lg shadow border border-gray-200 p-4 px-6 h-[470px] overflow-x-auto">
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
                onTaskClick={handleTaskClick}
                onEditClick={() => {
                  setTaskFormData(task);
                  toggleModal("isModalOpen", true);
                }}
              />
            ))
          ) : (
            <EmptyState onAction={() => toggleModal("isModalOpen", true)} />
          )}
        </TaskTable>

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

      {/* Fill Modal */}
      {isFillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[395px] h-[650px] overflow-y-auto">
            <div className="mb-5">
              <div className="flex justify-between">
                <h5 className="text-lg font-bold">My Task</h5>
                <FiX 
                  className="cursor-pointer"
                  onClick={() => setIsFillModalOpen(false)}
                />
              </div>
              <p className="text-[15px] font-bold">
                Collect &gt; Environment &gt; Emissions
              </p>
            </div>

            <div className="flex mb-4">
              <div className="w-4/5">
                <h5 className="text-sm text-gray-500 mb-1">Assigned by</h5>
                <div className="flex items-center">
                  <FiUser />
                  <div className="ml-2">
                    <p className="text-sm">{taskassigndata.assign_by_user_name}</p>
                    <p className="text-sm text-gray-500">{taskassigndata.assign_by_email}</p>
                  </div>
                </div>
              </div>
              <div className="w-1/5">
                <h5 className="text-sm text-gray-500 mb-1">Due date</h5>
                <p className={`text-sm ${isBeforeToday(taskassigndata.deadline) ? "text-red-500" : "text-black"}`}>
                  <Moment format="DD/MM/YYYY">{taskassigndata.deadline}</Moment>
                </p>
              </div>
            </div>

            <div className="border-b-2 border-gray-200 mb-4" />

            <div className="px-5 space-y-4 mb-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <h5 className="text-sm mb-1">Location</h5>
                  <p className="text-sm text-gray-500">{taskassigndata.location}</p>
                </div>
                <div>
                  <h5 className="text-sm mb-1">Year</h5>
                  <p className="text-sm text-gray-500">{taskassigndata.year}</p>
                </div>
              </div>

              {["month", "scope", "category", "subcategory"].map((field) => (
                <div key={field}>
                  <h5 className="text-sm mb-1 capitalize">{field}</h5>
                  <p className="text-sm text-gray-500">{taskassigndata[field]}</p>
                </div>
              ))}

              {isActivityReceived && taskassigndata.status !== 4 && (
                <div>
                  <h5 className="text-sm mb-1">Activity</h5>
                  <p className="text-sm text-gray-500">{taskassigndata.activity}</p>
                </div>
              )}
            </div>

            <div className="border-b-2 border-gray-200 mb-4" />

            <div className="mb-4">
              <h5 className="text-sm mb-3">Data to be added:</h5>

              {(!isActivityReceived || taskassigndata.status === 4) && (
                <div className="mb-3">
                  <h5 className="text-sm mb-1">Select Activity</h5>
                  <div className="relative">
                    <select
                      className="w-full border rounded-md py-2 pl-3 pr-10 text-sm"
                      value={selectedActivityName}
                      onChange={(e) => {
                        setSelectedActivityName(e.target.value);
                        setTaskAssigndata({
                          ...taskassigndata,
                          activity: e.target.value,
                        });
                      }}
                    >
                      <option value="">
                        {isActivityFetched
                          ? activitiesList.length === 0
                            ? "No relevant activities found"
                            : "Select Activity"
                          : "Select Activity"}
                      </option>
                      {activitiesList.map((activity) => (
                        <option
                          key={activity.id}
                          value={`${activity.name} - (${activity.source}) - ${activity.unit_type}`}
                        >
                          {`${activity.name} - (${activity.source}) - ${activity.unit_type}`}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-3 text-gray-500" />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {selectedActivity?.unit_type?.includes("Over") ? (
                  <>
                    <div>
                      <h5 className="text-sm mb-1">Quantity 1</h5>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full border rounded-md py-2 pl-3 pr-20 text-sm"
                          placeholder="Enter Value"
                          value={taskassigndata.value1}
                          onChange={(e) => {
                            const value = validateDecimalPlaces(e.target.value);
                            setTaskAssigndata({
                              ...taskassigndata,
                              value1: value,
                            });
                          }}
                        />
                        <div className="absolute right-1 top-1">
                          <select
                            className="bg-blue-500 text-white text-xs rounded-md py-1 px-2"
                            value={taskassigndata.unit1}
                            onChange={(e) =>
                              setTaskAssigndata({
                                ...taskassigndata,
                                unit1: e.target.value,
                              })
                            }
                          >
                            <option>Unit</option>
                            {selectedActivity?.unit_options?.map((unit) => (
                              <option key={unit} value={unit}>
                                {unit}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm mb-1">Quantity 2</h5>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full border rounded-md py-2 pl-3 pr-20 text-sm"
                          placeholder="Enter Value"
                          value={taskassigndata.value2}
                          onChange={(e) => {
                            const value = validateDecimalPlaces(e.target.value);
                            setTaskAssigndata({
                              ...taskassigndata,
                              value2: value,
                            });
                          }}
                        />
                        <div className="absolute right-1 top-1">
                          <select
                            className="bg-blue-500 text-white text-xs rounded-md py-1 px-2"
                            value={taskassigndata.unit2}
                            onChange={(e) =>
                              setTaskAssigndata({
                                ...taskassigndata,
                                unit2: e.target.value,
                              })
                            }
                          >
                            <option>Unit</option>
                            {selectedActivity?.unit_options_secondary?.map((unit) => (
                              <option key={unit} value={unit}>
                                {unit}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <h5 className="text-sm mb-1">Quantity</h5>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full border rounded-md py-2 pl-3 pr-20 text-sm"
                        placeholder="Enter Value"
                        value={taskassigndata.value1}
                        onChange={(e) => {
                          const value = validateDecimalPlaces(e.target.value);
                          setTaskAssigndata({
                            ...taskassigndata,
                            value1: value,
                          });
                        }}
                      />
                      <div className="absolute right-1 top-1">
                        <select
                          className="bg-blue-500 text-white text-xs rounded-md py-1 px-2"
                          value={taskassigndata.unit1}
                          onChange={(e) =>
                            setTaskAssigndata({
                              ...taskassigndata,
                              unit1: e.target.value,
                            })
                          }
                        >
                          <option>Unit</option>
                          {selectedActivity?.unit_options?.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h5 className="text-sm mb-3">Upload supporting documentation:</h5>
                <div className="relative text-black rounded-md flex items-center">
                  {taskassigndata.file_data ? (
                    <div className="flex items-center space-x-2">
                      <FiFile className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm text-blue-500 truncate w-48">
                          {taskassigndata.file_data.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(taskassigndata.file_data.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ImageUpload onFileSelect={handleFileUpload} />
                  )}
                </div>
              </div>
            </div>

            <button
              className="w-full bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600 transition-colors"
              onClick={SubmitFilledData}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Other Modals */}
      <TaskDetailsModal
        isOpen={modalStates.isDetailsModalOpen}
        onClose={() => toggleModal("isDetailsModalOpen", false)}
        task={selectedTask}
      />

      <TaskEditModal
        isOpen={modalStates.isModalOpen}
        onClose={() => toggleModal("isModalOpen", false)}
        task={taskFormData}
        onSubmit={handleTaskAction}
        users={users}
      />

      <TaskReviewModal
        isOpen={modalStates.isReviewtask}
        onClose={() => toggleModal("isReviewtask", false)}
        task={selectedTask}
        onReview={handleTaskAction}
        onFileUpload={handleFileUpload}
        onActivitySelect={handleActivitySelection}
        activitiesList={activitiesList}
        isSearching={isSearching}
        users={users}
      />

      <TaskDeleteModal
        isOpen={modalStates.isModalOpenDelete}
        onClose={() => toggleModal("isModalOpenDelete", false)}
        onConfirm={() => deleteTask(selectedTask?.id)}
        taskName={selectedTask?.name}
      />

      {/* Loading Spinner */}
      {(isLoading || isSearching) && <LoadingSpinner />}
    </>
  );
};

export default MyTask;