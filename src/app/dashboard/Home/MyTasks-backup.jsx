"use client";
import { useState, useEffect } from "react";
import {
  FiPlus,
  FiCircle,
  FiTrash2,
  FiUser,
  FiChevronDown,
  FiCheckCircle,
  FiLoader,
  FiX,
  FiFile,
  FiArrowRight,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import ImageUpload from "../../shared/components/ImageUpload";
import { unitTypes } from "../../shared/data/units";
import axiosInstance, { post, del, patch } from "../../utils/axiosMiddleware";
import { BlobServiceClient } from "@azure/storage-blob";
import { fetchClimatiqActivities } from "../../utils/climatiqApi";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../lib/redux/features/emissionSlice";
import TaskDetailsModal from "./TaskDetailsModal";
import { Oval } from "react-loader-spinner";

const MyTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFillModalOpen, setIsFillModalOpen] = useState(false);
  const [isModalOpenReject, setIsModalOpenReject] = useState(false);
  const [isModalOpenReassign, setIsModalOpenReassign] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isReviewtask, setReviewtask] = useState(false);
  const [isApprove, setApprove] = useState(false);
  const [loopen, setLoOpen] = useState(false);
  const [tasks, setTasks] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
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
  });
  const [clintlist, setClintlist] = useState();
  const [openModals, setOpenModals] = useState({});
  const [usernameasssin, setUsernameassin] = useState();
  const [comments, setComments] = useState();
  const [date, setDate] = useState();
  const [addgoles, setaddgoles] = useState({
    task_name: "",
    deadline: "",
  });
  const [activitiesList, setActivitiesList] = useState([]);
  const [selectedActivityName, setSelectedActivityName] = useState("");
  const [selectedActivity, setSelectedActivity] = useState({});
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [isActivityReceived, setIsActivityReceived] = useState(false);
  const [isActivityFetched, setIsActivityFetched] = useState(false);
  // const [activityId, setActivityId] = useState('');

  const closePreviewModal = () => {
    setIsPdfViewerOpen(false);
  };

  const handleActivityChange = (e) => {
    setSelectedActivityName(e.target.value);
    setTaskAssigndata({
      ...taskassigndata,
      activity: e.target.value,
      activity_id: selectedActivity?.activity_id,
      unit_type: selectedActivity?.unit_type,
    });
  };

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const findActivity = async () => {
      if (!selectedActivityName || !activitiesList?.length) return;

      setIsSearching(true);
      try {
        // Simulate a slight delay to prevent loader flash
        await new Promise((resolve) => setTimeout(resolve, 300));

        const activity = activitiesList.find(
          (activity) =>
            `${activity.name} - (${activity.source}) - ${activity.unit_type}` ===
            selectedActivityName
        );

        setSelectedActivity(activity || {});
        setTaskAssigndata({
          ...taskassigndata,
          activity_id: activity?.activity_id,
          unit_type: activity?.unit_type,
        });
        console.log("activity found", activity);
      } catch (error) {
        console.error("Error finding activity:", error);
      } finally {
        setIsSearching(false);
      }
    };

    findActivity();
  }, [selectedActivityName, activitiesList]);

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

      const uploadOptions = {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      };

      await blobClient.uploadData(blob, uploadOptions);
      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

      const newTaskData = {
        ...taskassigndata,
        file_data: {
          name: file.name,
          url: url,
          type: file.type,
          size: file.size,
          uploadDateTime: new Date().toLocaleString(),
          uploadedBy: taskassigndata.assign_to_email,
        },
      };

      setTaskAssigndata(newTaskData);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    }
  };
  const handleUsername = (e) => {
    setUsernameassin(e.target.value);
  };
  const handleComment = (e) => {
    setComments(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const { task_name, deadline } = addgoles;

  const getTodayDate = () => {
    const today = new Date();
    let month = "" + (today.getMonth() + 1);
    let day = "" + today.getDate();
    const year = today.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const fetchClintlist = async () => {
    const stringWithQuotes = localStorage.getItem("token");
    const stringWithoutQuotes = stringWithQuotes.replace(/"/g, "");
    const options = {
      headers: {
        Authorization: `Token ${stringWithoutQuotes}`,
      },
    };
    LoaderOpen();
    const response = await axiosInstance
      .get(`${process.env.BACKEND_API_URL}/sustainapp/user_client/`, options)
      .then((response) => {
        setClintlist(response.data);
        LoaderClose();
      })
      .catch((error) => {
        setClintlist();
        LoaderClose();
      });
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleCloseModalReviewtask = () => {
    setReviewtask(false);
    setApprove(false);
    setIsModalOpenReassign(false);
    setIsModalOpenReject(false);
    setIsPdfViewerOpen(false);
    setUsernameassin();
  };
  const handleReviewtask = (
    id,
    task_name,
    assign_to_user_name,
    category,
    deadline,
    factor_id,
    location,
    month,
    scope,
    subcategory,
    year,
    activity,
    value1,
    value2,
    unit1,
    unit2,
    file,
    filename,
    assign_to_email,
    filesize,
    file_data
  ) => {
    setReviewtask(true);
    setTaskAssigndata({
      ...taskassigndata,
      id: id,
      task_name: task_name,
      assign_to_user_name: assign_to_user_name,
      category: category,
      deadline: deadline,
      factor_id: factor_id,
      location: location,
      month: month,
      scope: scope,
      subcategory: subcategory,
      year: year,
      activity,
      value1,
      value2,
      unit1,
      unit2,
      file,
      filename,
      assign_to_email,
      filesize,
      file_data,
    });
    let unitTypeExtractedArray = activity?.split("-");
    let ExtractedUnitType = unitTypeExtractedArray?.pop();
    setSelectedActivity({
      ...selectedActivity,
      unit_type: ExtractedUnitType,
    });
  };
  const handleApprove = () => {
    setApprove(true);
    setIsModalOpenReassign(false);
    setIsModalOpenReject(false);
  };

  const handleOpenModalAddData = async (
    id,
    task_name,
    assign_to_user_name,
    assign_by_user_name,
    assign_by_email,
    category,
    deadline,
    factor_id,
    location,
    month,
    scope,
    subcategory,
    year,
    activity,
    region,
    value1,
    value2,
    unit1,
    unit2,
    file,
    filename,
    status,
    assign_to_email,
    file_data
  ) => {
    try {
      // Set initial loading state
      setIsSearching(true);

      // Handle activity received state
      if (activity === null || activity === "") {
        setIsActivityReceived(false);
      } else {
        setIsActivityReceived(true);
      }

      // Open modal and update UI states
      setIsFillModalOpen(true);
      setIsOpen(false);
      setSelectedActivityName(activity);

      // Update task assignment data
      setTaskAssigndata({
        ...taskassigndata,
        id,
        task_name,
        assign_to_user_name,
        assign_by_user_name,
        assign_by_email,
        category,
        deadline,
        factor_id,
        location,
        month,
        scope,
        subcategory,
        year,
        activity,
        value1,
        value2,
        unit1,
        unit2,
        file,
        filename,
        status,
        assign_to_email,
        file_data,
      });

      // Extract and set unit type if activity exists
      if (activity) {
        const unitTypeExtractedArray = activity.split("-");
        const ExtractedUnitType =
          unitTypeExtractedArray[unitTypeExtractedArray.length - 1]?.trim();
        setSelectedActivity({
          ...selectedActivity,
          unit_type: ExtractedUnitType,
        });
      }

      // Only proceed with fetching if we have the required data
      if (!subcategory || !year) {
        console.warn("Missing required parameters for fetching activities:", {
          subcategory,
          year,
        });
        return;
      }

      // Initial fetch
      const initialResponse = await fetchActivities(
        subcategory,
        1, // first page
        false, // initial fetch is not custom
        region,
        year
      );

      const { activitiesData, pages, pagesCustom } = initialResponse;

      // Set initial activities
      setActivitiesList(activitiesData);

      // Fetch additional pages if they exist
      if (pages > 1) {
        for (let i = 2; i <= pages; i++) {
          const isCustomFetch =
            pagesCustom > 1 && i <= pagesCustom ? false : true;

          const additionalResponse = await fetchActivities(
            subcategory,
            i,
            isCustomFetch,
            region,
            year
          );

          // Merge with existing data
          const updatedActivitiesData = [
            ...activitiesData,
            ...additionalResponse.activitiesData,
          ];

          // Update activities list periodically or on final page
          if (i % 3 === 0 || i === pages) {
            setActivitiesList([...updatedActivitiesData]);
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

  // Helper function for fetching activities
  const fetchActivities = async (
    subcategory,
    page,
    customFetchExecuted,
    region,
    year
  ) => {
    try {
      let currentYear = year;
      if (year === "2024") {
        currentYear = "2023";
      }

      const response = await fetchClimatiqActivities({
        subcategory,
        page,
        customFetchExecuted,
        region,
        year: currentYear,
      });

      const activitiesData = response.results || [];

      // Sort activities
      activitiesData.sort((a, b) => {
        if (a.access_type === "private" && b.access_type !== "private")
          return -1;
        if (a.access_type !== "private" && b.access_type === "private")
          return 1;
        return a.name.localeCompare(b.name);
      });

      return {
        activitiesData,
        pages: response.totalPages || 0,
        pagesCustom: response.hasCustomData ? response.totalPages : 0,
      };
    } catch (error) {
      console.error("Error fetching activities:", error);
      throw new Error(`Failed to fetch activities: ${error.message}`);
    }
  };

  const handleCloseModalApprove = () => {
    setIsFillModalOpen(false);
  };
  const handleOpenModalReject = (taskId, taskName, userName) => {
    setIsModalOpenReject(true);
    setIsModalOpenReassign(false);
    setApprove(false);
    setDate(taskassigndata.deadline);
    setComments();
  };

  const handleCloseModalReject = () => {
    setIsModalOpenReject(false);
  };
  const handleOpenModalReassign = () => {
    setIsModalOpenReassign(true);
    fetchClintlist();
    setApprove(false);
    setIsModalOpenReject(false);
    setDate(taskassigndata.deadline);
  };

  const handleCloseModalReassign = () => {
    setIsModalOpenReassign(false);
  };
  const handleOpenModalDelete = (taskId, taskName) => {
    setIsModalOpenDelete(true);
    setIsOpen(false);
    setTaskAssigndata({ id: taskId, name: taskName });
  };

  const handleCloseModalDelete = () => {
    setIsModalOpenDelete(false);
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const fetchMytaskDetails = async () => {
    // const stringWithQuotes = localStorage.getItem("token");
    // const stringWithoutQuotes = stringWithQuotes.replace(/"/g, "");
    // const options = {
    //   headers: {
    //     Authorization: `Bearer ${stringWithoutQuotes}`,
    //   },
    // };
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/organization_task_dashboard/`
      );
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMytaskDetails();
  }, []);

  const datahandleChange = (e) => {
    setaddgoles({ ...addgoles, [e.target.name]: e.target.value });
  };
  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   LoaderOpen();

  //   const sandData = {
  //     ...addgoles,
  //     assigned_to: parseInt(localStorage.getItem("user_id")),
  //     assigned_by: parseInt(localStorage.getItem("user_id")),
  //     task_name: formData.task_name || "test",
  //     deadline: formData.deadline,
  //     status: formData.status,
  //     description: formData.description,
  //     user_client: 1,
  //     roles: 3,
  //   };
  //   await post(`/organization_task_dashboard/`, sandData)
  //     .then((response) => {
  //       if (response.status == "201") {
  //         toast.success("Task has been added successfully", {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         LoaderClose();
  //         handleCloseModal();
  //         fetchMytaskDetails();
  //         setaddgoles({});
  //       } else {
  //         toast.error("Error", {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //         LoaderClose();
  //       }
  //     })
  //     .catch((error) => {
  //       const errorMessage = "Oops, something went wrong";
  //       toast.error(errorMessage, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       LoaderClose();
  //       handleCloseModal();
  //       fetchMytaskDetails();
  //       setaddgoles({});
  //     });
  // };

  const handleCompleted = async (id, roles) => {
    try {
      LoaderOpen();

      const task_status = roles === 1 ? "under_review" : "completed";
      const sandData = { task_status };

      const response = await patch(
        `/organization_task_dashboard/${id}/`,
        sandData
      );

      if (response.status === 200) {
        toast.success("Task has been completed successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        await fetchMytaskDetails();
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error completing task:", error);

      toast.error(error.response?.data?.message || "Failed to complete task", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      LoaderClose();
    }
  };

  const handleForReview = async (id, status) => {
    LoaderOpen();
    const sandData = {
      task_status: status,
    };
    await patch(`/organization_task_dashboard/${id}/`, sandData).then(
      (response) => {
        if (response.status == "200") {
          LoaderClose();
          fetchMytaskDetails();
        } else {
          toast.error("Error", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          LoaderClose();
        }
      }
    );
  };

  const submitApprove = async (id) => {
    LoaderOpen();
    const sandData = {
      task_status: "approved",
    };
    await patch(
      `${process.env.BACKEND_API_URL}/organization_task_dashboard/${id}/`,
      sandData
    )
      .then((response) => {
        if (response.status == "200") {
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
          LoaderClose();
          fetchMytaskDetails();
          handleCloseModalApprove();
        } else {
          toast.error("Error", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          LoaderClose();
        }
      })
      .finally(() => {
        setReviewtask(false);
      });
  };
  const submitReject = async (id) => {
    LoaderOpen();
    const sandData = {
      task_status: "reject",
      deadline: date,
      comments: comments,
      file_data: {},
      value1: "",
      value2: "",
      unit1: "",
      unit2: "",
    };
    await patch(
      `${process.env.BACKEND_API_URL}/organization_task_dashboard/${id}/`,
      sandData
    )
      .then((response) => {
        if (response.status == "200") {
          toast.success("Task has been rejected and reassigned", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          LoaderClose();
          fetchMytaskDetails();
          handleCloseModalReject();
          handleCloseModalReviewtask();
        } else {
          toast.error("Error", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          LoaderClose();
        }
      })
      .catch((error) => {
        console.log("Date cannot be in the past", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message && error.message.deadline
            : "Date cannot be in the past";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        LoaderClose();
      });
  };

  function isBeforeToday(givenDateStr) {
    const givenDate = new Date(givenDateStr);

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    if (givenDate < today) {
      return true;
    } else {
      return false;
    }
  }

  const submitReAssign = async (id) => {
    LoaderOpen();
    const sandData = {
      task_status: "in_progress",
      value1: "",
      value2: "",
      unit1: "",
      unit2: "",
      file_data: {},
      assigned_to: parseInt(usernameasssin),
      deadline: date,
      comments: comments,
      user_client: 1,
    };

    if (isBeforeToday(date)) {
      toast.error("Deadline can't be in past", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
      return;
    }

    await patch(
      `${process.env.BACKEND_API_URL}/organization_task_dashboard/${id}/`,
      sandData
    ).then((response) => {
      if (response.status == "200") {
        toast.success("Task has been reassigned to another user successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        fetchMytaskDetails();
        handleCloseModalReassign();
        handleCloseModalReviewtask();
      } else {
        toast.error("Error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    });
  };
  const handelDelete = async (id) => {
    LoaderOpen();

    await del(
      `${process.env.BACKEND_API_URL}/organization_task_dashboard/${id}/`
    ).then((response) => {
      if (response.status == "204") {
        toast.success("Task has been deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        fetchMytaskDetails();
        handleCloseModalDelete();
      } else {
        toast.error("Error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    });
  };

  const SubmitFilledData = async (e, id) => {
    e.preventDefault();
    LoaderOpen();

    const sandData = {
      ...taskassigndata,
      id: taskassigndata.id,
      // activity_id: taskassigndata.factor_id,
      // unit_type
    };
    console.log("task data", taskassigndata);

    const { deadline, ...filteredSandData } = sandData;
    const { value1, unit1 } = sandData;

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
      LoaderClose();
      return;
    }

    await patch(
      `${process.env.BACKEND_API_URL}/organization_task_dashboard/${taskassigndata.id}/`,
      filteredSandData
    )
      .then((response) => {
        if (response.status == "200") {
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
          LoaderClose();
          handleCloseModal();
          fetchMytaskDetails();
          setaddgoles({});
          handleForReview(taskassigndata.id, "under_review");
          setIsFillModalOpen(false);
        } else {
          toast.error("Error", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          LoaderClose();
        }
      })
      .catch((error) => {
        const errorMessage = "Oops, something went wrong";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
        handleCloseModal();
        fetchMytaskDetails();
        setaddgoles({});
      });
  };

  const [selectedLocation, setSelectedLocation] = useState();
  useEffect(() => {
    setSelectedLocation(taskassigndata.task_name.split("-")[0]);
  }, [taskassigndata]);

  const validateDecimalPlaces = (value) => {
    if (!value) return value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (!regex.test(value)) {
      return Number(value).toFixed(2);
    }
    return value;
  };

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "overdue", label: "Overdue" },
    { id: "completed", label: "Completed" },
    { id: "forreview", label: "For Review" },
  ];

  const getStatusBadgeClasses = (status) => {
    const baseClasses = "text-[8px] px-[6px] rounded-full";
    switch (status) {
      case "in_progress":
        return `${baseClasses} bg-[#ffda00] text-[#ffda00]`;
      case "approved":
        return `${baseClasses} bg-[#2e7d32] text-[#2e7d32]`;
      case "under_review":
        return `${baseClasses} bg-orange-400 text-orange-800`;
      case "completed":
        return `${baseClasses} bg-[#2e7d32] text-[#2e7d32]`;
      case "reject":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      case "under_review":
        return "Under Review";
      case "completed":
        return "Completed";
      case "approved":
        return "Approved";
      case "reject":
        return "Rejected";
      default:
        return status;
    }
  };

  const router = useRouter();

  const handleViewAll = () => {
    router.push("/dashboard/tasks");
  };

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Add this handler for status change
  const handleStatusChange = (status) => {
    setFormData({
      ...formData,
      status: status,
    });
    setIsStatusDropdownOpen(false);
  };
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.emissions);

  // Add this useEffect to fetch users if not already loaded
  useEffect(() => {
    if (users.status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.status]);

  const [formData, setFormData] = useState({
    task_name: "",
    description: "",
    deadline: "",
    assigned_to: "",
    status: "not_started",
  });

  // Add isFormValid computed value
  const isFormValid =
    formData.task_name && formData.deadline && formData.assigned_to;

  // Update the handleChange function
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditTask = (task) => {
    setIsEditMode(true);
    setFormData({
      task_name: task.task_name,
      description: task.description || "",
      deadline: task.deadline,
      assigned_to: task.assigned_to?.toString() || "",
      status: task.status || "not_started",
      id: task.id,
    });
    setIsModalOpen(true);
  };

  // Modify submitForm to handle both create and edit
  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();

    const sandData = {
      ...formData,
      assigned_to: parseInt(formData.assigned_to),
      assigned_by: parseInt(localStorage.getItem("user_id")),
      user_client: 1,
      roles: 3,
    };

    try {
      if (isEditMode) {
        // Update existing task
        const response = await patch(
          `/organization_task_dashboard/${formData.id}/`,
          sandData
        );
        if (response.status === 200) {
          toast.success("Task has been updated successfully");
        } else {
          toast.error("Error updating task");
        }
      } else {
        // Create new task
        const response = await post(`/organization_task_dashboard/`, sandData);
        if (response.status === 201) {
          toast.success("Task has been added successfully");
        } else {
          toast.error("Error creating task");
        }
      }

      handleCloseModal();
      fetchMytaskDetails();
      resetForm();
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      LoaderClose();
    }
  };

  const resetForm = () => {
    setFormData({
      task_name: "",
      description: "",
      deadline: "",
      assigned_to: "",
      status: "not_started",
    });
    setIsEditMode(false);
  };

  const handleDelete = async (id) => {
    LoaderOpen();
    try {
      const response = await del(`/organization_task_dashboard/${id}/`);
      if (response.status === 204) {
        toast.success("Task has been deleted successfully");
        fetchMytaskDetails();
      } else {
        toast.error("Error deleting task");
      }
    } catch (error) {
      toast.error("Error deleting task");
    } finally {
      LoaderClose();
    }
  };

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
    setShowConfirmUpdate(false);
  };

  const handleUpdateClick = () => {
    setShowConfirmDelete(false);
    setShowConfirmUpdate(true);
  };

  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(true);

  // Open modal when clicking on a task (completed)
  const handleTaskClick = (task) => {
    console.log("Handle task triggered");

    console.log("Task clicked:", task);
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <div className="rounded-lg shadow border border-gray-200 p-4 px-6 h-[470px] overflow-x-auto">
        <div className="flex justify-between mb-4">
          <div className="text-[#0f1728] text-lg font-medium font-['Manrope'] leading-7">
            Upcoming Tasks
          </div>

          <div
            className="text-sky-600 text-[10px] cursor-pointer font-normal leading-[13px] flex items-center me-2 space-x-2"
            onClick={handleOpenModal}
          >
            <FiPlus style={{ fontSize: "18px" }} />
            <span>Add task</span>
          </div>
        </div>
        <div className="">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              className={`
            px-4 py-2 text-sm font-normal transition-colors
            ${index === 0 ? "pl-0 pr-2" : "px-4"}
            ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}

          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 py-3 text-sm text-gray-500 px-4 border-y border-gray-200">
            <div className="col-span-6 text-left">Tasks</div>
            <div className="col-span-3 text-center">Status</div>
            <div className="col-span-3 text-right mr-5">Due date</div>
          </div>
          <div className="p-1 h-[288px] table-scrollbar overflow-y-auto">
            {activeTab === "upcoming" && (
              <div>
                {tasks.upcoming == "" ? (
                  <div className="justify-center items-center">
                    <div className="flex justify-center items-center pb-5 pt-[4rem]">
                      <FiCheckCircle
                        style={{ color: "#ACACAC", fontSize: "36px" }}
                      />
                    </div>
                    <div>
                      <p className="text-[14px] text-[#101828] font-bold text-center">
                        Start by creating a task
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-[12px] text-[#667085] text-center">
                        All task created or assigned to you will be here
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        className="bg-[#007EEF] text-white w-[150px] p-1 rounded-md shadow-md"
                        onClick={handleOpenModal}
                      >
                        Add a task
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 mb-6 mt-2 ">
                      {tasks.upcoming &&
                        tasks.upcoming.map((task) => (
                          <div
                            key={task.id}
                            className="flex justify-between border-b border-[#ebeced] pb-2"
                          >
                            <div className="flex cursor-pointer">
                              <div className="w-72 truncate text-neutral-800 text-[13px] font-normal leading-none ml-3">
                                {task.roles === 1 || task.roles === 2 ? (
                                  <p
                                    className="py-1 cursor-pointer text-[#007eef]"
                                    data-tooltip-id={`task-tooltip-${task.id}`}
                                    data-tooltip-content={task.task_name}
                                    onClick={() => {
                                      handleOpenModalAddData(
                                        task.id,
                                        task.task_name,
                                        task.assign_to_user_name,
                                        task.assign_by_user_name,
                                        task.assign_by_email,
                                        task.category,
                                        task.deadline,
                                        task.factor_id,
                                        task.location,
                                        task.month,
                                        task.scope,
                                        task.subcategory,
                                        task.year,
                                        task.activity,
                                        task.region,
                                        task.value1,
                                        task.value2,
                                        task.unit1,
                                        task.unit2,
                                        task.file,
                                        task.filename,
                                        task.task_status,
                                        task.assign_to_email
                                      );
                                    }}
                                  >
                                    {task.task_name}
                                  </p>
                                ) : (
                                  // For self-created tasks
                                  <p
                                    className="py-1 text-[#007eef] cursor-pointer"
                                    onClick={() => {
                                      if (task.roles === 3) {
                                        // Check if it's a self-created task
                                        handleEditTask(task);
                                      }
                                    }}
                                  >
                                    {task.task_name}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="col-span-3">
                                {(task.roles === 1 || task.roles === 2) && (
                                  <div>
                                    <span
                                      className={`
                rounded-full h-3 w-4
                ${getStatusBadgeClasses(task.task_status)}
              `}
                                    ></span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm">
                                      {getStatusLabel(task.task_status)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex">
                              <div className="w-[68px] text-neutral-500 text-xs font-normal leading-[15px] mr-5">
                                <p className="py-1">
                                  <Moment format="DD/MM/YYYY">
                                    {task.deadline}
                                  </Moment>
                                </p>
                              </div>
                            </div>

                            <Tooltip
                              id={`task-tooltip-${task.id}`}
                              place="top"
                              effect="solid"
                              className="z-[9999] !opacity-100 drop-shadow-md"
                              style={{
                                backgroundColor: "white",
                                color: "#1f2937",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "14px",
                                maxWidth: "300px",
                                wordBreak: "break-word",
                              }}
                              offset={-50}
                              delayShow={200}
                              float={true}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "overdue" && (
              <div>
                {tasks.overdue == "" ? (
                  <div className="h-screen justify-center items-center">
                    <h4 className="text-center">No data found</h4>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 mb-6 mt-2">
                      {tasks.overdue &&
                        tasks.overdue.map((task) => (
                          <div
                            key={task.id}
                            className="flex justify-between border-b border-[#ebeced] pb-2"
                          >
                            <div className="flex cursor-pointer">
                              <div className="w-72 truncate text-[#007eef] text-[13px] font-normal leading-none ml-3">
                                {task.roles === 1 || task.roles === 2 ? (
                                  <p
                                    className="py-1 cursor-pointer"
                                    data-tooltip-id={`task-tooltip-${task.id}`}
                                    data-tooltip-content={task.task_name}
                                    onClick={() => {
                                      handleOpenModalAddData(
                                        task.id,
                                        task.task_name,
                                        task.assign_to_user_name,
                                        task.assign_by_user_name,
                                        task.assign_by_email,
                                        task.category,
                                        task.deadline,
                                        task.factor_id,
                                        task.location,
                                        task.month,
                                        task.scope,
                                        task.subcategory,
                                        task.year,
                                        task.activity,
                                        task.region,
                                        task.value1,
                                        task.value2,
                                        task.unit1,
                                        task.unit2,
                                        task.file,
                                        task.filename,
                                        task.assign_to_email,
                                        task.file_data
                                      );
                                    }}
                                  >
                                    {task.task_name}
                                  </p>
                                ) : (
                                  <p className="py-1">{task.task_name}</p>
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="col-span-3">
                                {(task.roles === 1 || task.roles === 2) && (
                                  <div>
                                    <span
                                      className={`
                        rounded-full h-3 w-4
                        ${getStatusBadgeClasses(task.task_status)}
                      `}
                                    ></span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm">
                                      {getStatusLabel(task.task_status)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex">
                              <div className="w-[68px] text-neutral-500 text-xs font-normal leading-[15px]">
                                <p className="py-1">
                                  <Moment format="DD/MM/YYYY">
                                    {task.deadline}
                                  </Moment>
                                </p>
                              </div>
                              <div className="w-[18px] cursor-pointer">
                                {task.roles === 3 && (
                                  <FiTrash2
                                    className="text-[#0000008F] text-lg"
                                    onClick={() => handelDelete(task.id)}
                                  />
                                )}
                              </div>
                            </div>

                            <Tooltip
                              id={`task-tooltip-${task.id}`}
                              place="top"
                              effect="solid"
                              className="z-[9999] !opacity-100 drop-shadow-md"
                              style={{
                                backgroundColor: "white",
                                color: "#1f2937",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "14px",
                                maxWidth: "300px",
                                wordBreak: "break-word",
                              }}
                              offset={-50}
                              delayShow={200}
                              float={true}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "completed" && (
              <div>
                {tasks.completed == "" ? (
                  <div className="h-screen justify-center items-center">
                    <h4 className="text-center">No data found</h4>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 mb-6 mt-2">
                      {tasks.completed &&
                        tasks.completed.map((task) => (
                          <div
                            key={task.id}
                            className="flex justify-between border-b border-[#ebeced] pb-2"
                          >
                            <div className="flex cursor-pointer">
                              <div className="w-[17rem] truncate text-[#007eef] text-[13px] font-normal leading-none ml-3">
                                {task.roles === 1 ||
                                task.roles === 2 ||
                                task.roles === 4 ? (
                                  <p
                                    className="py-1 cursor-pointer"
                                    data-tooltip-id={`task-tooltip-${task.id}`}
                                    data-tooltip-content={task.task_name}
                                    onClick={() => handleTaskClick(task)}
                                  >
                                    {task.task_name}
                                  </p>
                                ) : (
                                  <p
                                    className="py-1"
                                    data-tooltip-id={`task-tooltip-${task.id}`}
                                    data-tooltip-content={task.task_name}
                                  >
                                    {task.task_name}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="col-span-3">
                                {(task.roles === 1 ||
                                  task.roles === 2 ||
                                  task.roles === 4) && (
                                  <div>
                                    <span
                                      className={`
                            rounded-full h-3 w-4
                            ${getStatusBadgeClasses(task.task_status)}
                          `}
                                    ></span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm">
                                      {getStatusLabel(task.task_status)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex mr-4">
                              <div className="w-[68px] text-neutral-500 text-xs font-normal leading-[15px]">
                                <p className="py-1">
                                  <Moment format="DD/MM/YYYY">
                                    {task.deadline}
                                  </Moment>
                                </p>
                              </div>
                            </div>

                            <Tooltip
                              id={`task-tooltip-${task.id}`}
                              place="top"
                              effect="solid"
                              className="z-[9999] !opacity-100 drop-shadow-md"
                              style={{
                                backgroundColor: "white",
                                color: "#1f2937",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "14px",
                                maxWidth: "300px",
                                wordBreak: "break-word",
                              }}
                              offset={-50}
                              delayShow={200}
                              float={true}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "forreview" && (
              <div>
                {tasks.for_review == "" ? (
                  <div className="h-screen justify-center items-center">
                    <h4 className="text-center">No data found</h4>
                  </div>
                ) : (
                  <div>
                    {tasks.for_review &&
                      tasks.for_review.map((task) => (
                        <div
                          key={task.id}
                          className="relative flex justify-between border-b border-[#ebeced] pb-2"
                        >
                          <div className="grid grid-cols-12 gap-4 w-full items-center px-4">
                            {/* Task Name - 6 columns */}
                            <div className="col-span-6">
                              <div className="flex items-center">
                                <div className="truncate">
                                  {task.roles === 1 || task.roles === 2 ? (
                                    <p
                                      className="py-1 cursor-pointer text-[#007eef] text-[13px]"
                                      data-tooltip-id={`task-tooltip-${task.id}`}
                                      data-tooltip-content={task.task_name}
                                      onClick={() => {
                                        handleReviewtask(
                                          task.id,
                                          task.task_name,
                                          task.assign_to_user_name,
                                          task.category,
                                          task.deadline,
                                          task.factor_id,
                                          task.location,
                                          task.month,
                                          task.scope,
                                          task.subcategory,
                                          task.year,
                                          task.activity,
                                          task.value1,
                                          task.value2,
                                          task.unit1,
                                          task.unit2,
                                          task.file,
                                          task.filename,
                                          task.assign_to_email,
                                          task.filesize,
                                          task.file_data
                                        );
                                      }}
                                    >
                                      {task.task_name}
                                    </p>
                                  ) : (
                                    <p
                                      className="py-1 text-[13px]"
                                      data-tooltip-id={`task-tooltip-${task.id}`}
                                      data-tooltip-content={task.task_name}
                                    >
                                      {task.task_name}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Status - 3 columns */}
                            <div className="col-span-3 text-center">
                              <div>
                                <span
                                  className={`rounded-full h-3 w-4 ${getStatusBadgeClasses(
                                    task.task_status
                                  )}`}
                                ></span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm">
                                  {getStatusLabel(task.task_status)}
                                </span>
                              </div>
                            </div>

                            {/* Due Date - 3 columns */}
                            <div className="col-span-3 text-right mr-4">
                              <p className="text-neutral-500 text-xs">
                                <Moment format="DD/MM/YYYY">
                                  {task.deadline}
                                </Moment>
                              </p>
                            </div>
                          </div>

                          <Tooltip
                            id={`task-tooltip-${task.id}`}
                            place="top"
                            effect="solid"
                            className="z-[9999] !opacity-100 drop-shadow-md"
                            style={{
                              backgroundColor: "white",
                              color: "#1f2937",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "14px",
                              maxWidth: "300px",
                              wordBreak: "break-word",
                            }}
                            offset={50}
                            delayShow={200}
                            float={true}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
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

      {isModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="modal-content bg-white rounded-lg shadow-xl p-6 min-w-[450px] max-w-[450px] relative">
              {/* Header */}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {isEditMode ? "Edit Task" : "Add Task"}
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                {isEditMode
                  ? "Update task details and deadline"
                  : "Add tasks with descriptions and deadlines to keep your goals on track."}
              </p>

              <form onSubmit={submitForm} className="space-y-6">
                {/* Status Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center w-full rounded-md py-2 text-left text-sm text-gray-700 bg-white focus:outline-none"
                      onClick={() =>
                        setIsStatusDropdownOpen(!isStatusDropdownOpen)
                      }
                    >
                      <div className="flex items-center gap-2">
                        {formData.status === "not_started" && (
                          <span className="w-4 h-4 rounded-full border-[1.5px] border-gray-300"></span>
                        )}
                        {formData.status === "in_progress" && (
                          <span className="w-4 h-4 rounded-full bg-[#FDB022]"></span>
                        )}
                        {formData.status === "completed" && (
                          <span className="w-4 h-4 rounded-full bg-[#12B76A]"></span>
                        )}
                        <span>
                          {formData.status === "not_started" && "Not Started"}
                          {formData.status === "in_progress" && "In Progress"}
                          {formData.status === "completed" && "Completed"}
                        </span>
                        <svg
                          className="w-5 h-5 text-gray-400 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isStatusDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg py-1">
                        {[
                          {
                            id: "not_started",
                            label: "Not Started",
                            icon: (
                              <span className="w-4 h-4 rounded-full border-[1.5px] border-gray-300"></span>
                            ),
                          },
                          {
                            id: "in_progress",
                            label: "In Progress",
                            icon: (
                              <span className="w-4 h-4 rounded-full bg-[#FDB022]"></span>
                            ),
                          },
                          {
                            id: "completed",
                            label: "Completed",
                            icon: (
                              <span className="w-4 h-4 rounded-full bg-[#12B76A]"></span>
                            ),
                          },
                        ].map((status) => (
                          <button
                            key={status.id}
                            type="button"
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => handleStatusChange(status.id)}
                          >
                            <div className="flex items-center gap-2">
                              {status.icon}
                              <span>{status.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Select 'completed' status to move the task to completed
                    section
                  </p>
                </div>

                {/* Task Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="task_name"
                    placeholder="Enter task name"
                    required
                    className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs outline-none"
                    value={formData.task_name}
                    onChange={handleFormChange}
                  />
                </div>

                {/* Task Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Add details about the task..."
                    className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs outline-none"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    required
                    min={getTodayDate()}
                    className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs outline-none"
                    value={formData.deadline}
                    onChange={handleFormChange}
                  />
                </div>

                {/* Assign To Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <select
                    name="assigned_to"
                    value={formData.assigned_to}
                    onChange={handleFormChange}
                    required
                    className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs outline-none"
                  >
                    <option value="">Select User</option>
                    {users?.data?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username} - {user.email}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (isEditMode) {
                        // Show confirmation before delete
                        if (
                          window.confirm(
                            "Are you sure you want to delete this task?"
                          )
                        ) {
                          handleDelete(formData.id);
                          handleCloseModal();
                        }
                      } else {
                        handleCloseModal();
                      }
                    }}
                    className={`flex-1 px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007eef] focus:ring-offset-2 ${
                      isEditMode
                        ? "text-white bg-red-500 hover:bg-red-600 border-red-500"
                        : "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {isEditMode ? "Delete Task" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`flex-1 px-4 py-2.5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#007eef] focus:ring-offset-2 ${
                      !isFormValid
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-[#007eef] hover:bg-blue-600"
                    }`}
                  >
                    {isEditMode ? "Update Task" : "Add Task"}
                  </button>
                </div> */}
                {isEditMode ? (
                  <div className="space-y-4">
                    {/* Primary Buttons - Always Visible */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleDeleteClick}
                        className="flex-1 px-4 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                      >
                        Delete Task
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdateClick}
                        className="flex-1 px-4 py-2.5 text-[#007eef] border border-[#007eef] hover:bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007eef] focus:ring-offset-2 transition-colors"
                      >
                        Update
                      </button>
                    </div>

                    {/* Confirmation Sections */}
                    {showConfirmDelete && (
                      <div className="space-y-2">
                        <p className="text-center text-sm text-gray-600">
                          Click on delete to proceed
                        </p>
                        <button
                          type="button"
                          onClick={() => handleDelete(formData.id)}
                          className="w-full px-4 py-2.5 text-white bg-[#007eef] rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#007eef] focus:ring-offset-2"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {showConfirmUpdate && (
                      <div className="space-y-2">
                        <p className="text-center text-sm text-gray-600">
                          Click on update to proceed
                        </p>
                        <button
                          type="submit"
                          className="w-full px-4 py-2.5 text-white bg-[#007eef] rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#007eef] focus:ring-offset-2"
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007eef] focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`flex-1 px-4 py-2.5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#007eef] focus:ring-offset-2 ${
                        !isFormValid
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-[#007eef] hover:bg-blue-600"
                      }`}
                    >
                      Add Task
                    </button>
                  </div>
                )}
              </form>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {isReviewtask && (
        <div
          className={`fixed inset-0 z-10 ${
            isPdfViewerOpen
              ? "flex items-center justify-center"
              : "grid place-items-center"
          } bg-black bg-opacity-50`}
        >
          <div className="z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-[395px] h-[650px] overflow-y-auto scrollable-content">
              <div className="div">
                <div className="mb-5">
                  <div className="flex">
                    <div className="w-[90%]">
                      <h5 className="text-left text-lg text-black font-bold mb-4">
                        Review Task
                      </h5>
                    </div>
                    <div className="w-[10%]">
                      <FiX
                        sx={{ cursor: "pointer" }}
                        onClick={handleCloseModalReviewtask}
                      />
                    </div>
                  </div>

                  <p className="text-left text-[15px] text-black font-bold w-86">
                    Collect &gt; Environment &gt; Emissions
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-[80%] relative">
                  <h5 className="text-left  text-sm text-gray-500 mb-1">
                    Assigned to
                  </h5>
                  <div className="flex">
                    <FiUser />
                    <div className="ml-2">
                      <p className="text-left text-sm text-black">
                        {taskassigndata.assign_to_user_name}
                      </p>
                      <p className="text-left text-sm text-gray-500">
                        {taskassigndata.assign_to_email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[20%]">
                  <h5 className="text-left text-gray-500 text-sm mb-1">
                    Due date
                  </h5>
                  <p className="text-left text-sm text-black">
                    <Moment format="DD/MM/YYYY">
                      {taskassigndata.deadline}
                    </Moment>
                  </p>
                </div>
              </div>
              <div className=" border-b-2 border-gray-200 mb-4"></div>
              <div className="px-5 mb-4">
                <div className="flex mb-4">
                  <div className="w-[80%] relative">
                    <h5 className="text-left text-black text-sm mb-1">
                      Location
                    </h5>
                    <p className="text-left text-sm text-gray-500 ">
                      {selectedLocation}
                    </p>
                  </div>
                  <div className="w-[20%]">
                    <h5 className="text-left text-black text-sm mb-1">Year</h5>
                    <p className="text-left text-sm text-gray-500">
                      {taskassigndata.year}
                    </p>
                  </div>
                </div>
                <div className="w-[80%] mb-4">
                  <h5 className="text-left text-black text-sm mb-1">Month</h5>
                  <p className="text-left text-sm text-gray-500 ">
                    {taskassigndata.month}
                  </p>
                </div>
                <div className="w-[80%] mb-4">
                  <h5 className="text-left text-black text-sm mb-1">Scope</h5>
                  <p className="text-left text-sm text-gray-500 ">
                    {taskassigndata.scope}
                  </p>
                </div>
                <div className="w-[80%] mb-4">
                  <h5 className="text-left text-black text-sm mb-1">
                    Category
                  </h5>
                  <p className="text-left text-sm text-gray-500 ">
                    {taskassigndata.category}
                  </p>
                </div>
                <div className="w-[80%] relative">
                  <h5 className="text-left text-black text-sm mb-1">
                    Sub-Category
                  </h5>
                  <p className="text-left text-sm text-gray-500 ">
                    {taskassigndata.subcategory}
                  </p>
                </div>
              </div>
              <div className="border-b-2 border-gray-100 mb-4"></div>
              <div className="mb-4 bg-[#007eef0d] p-4 rounded-md">
                <h5 className="text-left text-black text-sm mb-3">
                  Data to be added:
                </h5>
                <div className="mb-3">
                  <h5 className="text-left text-black text-sm mb-1">
                    Activity
                  </h5>
                  <div>
                    <input
                      type="text"
                      className="border m-0.5 text-sm w-full text-neutral-500 appearance-none  rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Enter Value"
                      value={taskassigndata.activity}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-3">
                  {selectedActivity?.unit_type?.includes("Over") ? (
                    <>
                      <div className="flex">
                        <div>
                          <h5 className="text-left text-black text-sm mb-1">
                            Quantity 1
                          </h5>
                          <div>
                            <input
                              type="number"
                              className="border m-0.5 w-[100%] text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              placeholder="Enter Value"
                              value={taskassigndata.value1}
                              readOnly
                            />
                          </div>
                        </div>
                        <div>
                          <h5 className="text-left text-black text-sm mb-1">
                            Unit 1
                          </h5>
                          <div>
                            <input
                              type="text"
                              className="border m-0.5 w-[100%] text-sm text-blue-500 appearance-none  rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              placeholder="Enter Value"
                              value={taskassigndata.unit1}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          <h5 className="text-left text-black text-sm mb-1">
                            Quantity 2
                          </h5>
                          <div>
                            <input
                              type="number"
                              className="border m-0.5 w-[100%] text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              placeholder="Enter Value"
                              value={taskassigndata.value2}
                              readOnly
                            />
                          </div>
                        </div>
                        <div>
                          <h5 className="text-left text-black text-sm mb-1">
                            Unit 2
                          </h5>
                          <div>
                            <input
                              type="text"
                              className="border m-0.5 w-[100%] text-sm text-blue-500 appearance-none  rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              placeholder="Enter Value"
                              value={taskassigndata.unit2}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex">
                      <div>
                        <h5 className="text-left text-black text-sm mb-1">
                          Quantity
                        </h5>
                        <div>
                          <input
                            type="number"
                            className="border m-0.5 w-[100%] text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Enter Value"
                            value={taskassigndata.value1}
                            readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <h5 className="text-left text-black text-sm mb-1">
                          Unit
                        </h5>
                        <div>
                          <input
                            type="text"
                            className="border m-0.5 w-[100%] text-sm text-blue-500 appearance-none  rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Enter Value"
                            value={taskassigndata.unit1}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="text-left text-black text-sm mb-1">
                    Attachments
                  </h5>
                  <div className="">
                    <div className="relative px-8 py-2 text-black rounded-md  border flex items-center">
                      <div className="flex">
                        <div className="">
                          <span>
                            <FiFile
                              sx={{ color: "#28C1A2", fontSize: "22px" }}
                            />
                          </span>
                        </div>
                        <div className="ml-2">
                          <p className="text-[14px] truncate w-48 text-blue-500">
                            {" "}
                            <button
                              onClick={() => setIsPdfViewerOpen(true)}
                              className="text-blue-600 hover:text-blue-800 transition duration-300"
                            >
                              {taskassigndata.file_data?.name
                                ? taskassigndata.file_data?.name
                                : "No file available"}
                            </button>
                          </p>
                          <p className="text-[12px] text-gray-400">
                            {taskassigndata.file_data?.url
                              ? (
                                  taskassigndata.file_data?.size /
                                  (1024 * 1024)
                                ).toFixed(2)
                              : "0"}
                            MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-2">
                <div className="flex justify-between mb-5">
                  <div>
                    <button
                      className={`border border-[#54B054] p-2 rounded-md shadow-sm w-[103px] text-center text-sm   ${
                        isApprove == true
                          ? "bg-[#54B054] text-white hover:bg-[#54B054]"
                          : "text-[#54B054] hover:bg-green-50"
                      }`}
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                  </div>
                  <div>
                    <button
                      className={`border border-[#BF9500] p-2 rounded-md shadow-sm w-[103px] text-center text-sm   ${
                        isModalOpenReassign == true
                          ? "bg-[#BF9500] text-white hover:bg-[#BF9500]"
                          : "text-[#BF9500] hover:bg-yellow-50"
                      }`}
                      onClick={handleOpenModalReassign}
                    >
                      Reassign
                    </button>
                  </div>
                  <div>
                    <button
                      className={`border border-[#D91F11] p-2 rounded-md shadow-sm w-[103px] text-center text-sm   ${
                        isModalOpenReject == true
                          ? "bg-[#D91F11] text-white hover:bg-[#D91F11]"
                          : "text-[#D91F11] hover:bg-red-50"
                      }`}
                      onClick={handleOpenModalReject}
                    >
                      Reject
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  {isApprove && (
                    <>
                      <p className="text-center text-sm mb-5">
                        {" "}
                        Click on submit to approve the task
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <button
                            className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                            onClick={() => submitApprove(taskassigndata.id)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {isModalOpenReassign && (
                    <>
                      <div className="mb-5">
                        <h5 className="text-left  text-sm mb-1">
                          Assign new user
                        </h5>
                        <select
                          className="block w-full rounded-md border-0 py-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          name="Reporttype"
                          value={usernameasssin}
                          onChange={handleUsername}
                        >
                          <option value="">Select new user</option>
                          {clintlist &&
                            clintlist.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.username}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="mb-5">
                        <h5 className="text-left  text-sm mb-1">
                          Assign a new due date
                        </h5>
                        <input
                          id="edate"
                          name="enddate"
                          type="date"
                          value={date}
                          autoComplete="edate"
                          required
                          placeholder="End date"
                          className="block w-full px-1 rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleDate}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <button
                            className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                            onClick={() => submitReAssign(taskassigndata.id)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {isModalOpenReject && (
                    <>
                      <div className="mb-5">
                        <h5 className="text-left  text-sm mb-1">
                          Assign a new due date
                        </h5>
                        <input
                          name="ddate"
                          type="date"
                          value={date}
                          autoComplete="edate"
                          required
                          placeholder="End date"
                          className="block w-full px-1 rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleDate}
                        />
                      </div>
                      <div className="mb-5">
                        <h5 className="text-left  text-sm mb-1">Comments</h5>
                        <textarea
                          id="countriesOfOperation"
                          value={comments}
                          name="countriesOfOperation"
                          placeholder="Add a comment"
                          className="border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                          rows={5}
                          onChange={handleComment}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <button
                            className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                            onClick={() => submitReject(taskassigndata.id)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* {isPdfViewerOpen && (
            <div className="relative w-[780px] ms-4 bg-white rounded-lg shadow-lg h-[550px] overflow-y-auto">
              {taskassigndata.file_data.url ? (
                <>
                  <iframe
                    title="PDF Viewer"
                    src={taskassigndata.file_data.url}
                    width="100%"
                    height="100%"
                    style={{ border: "none", backgroundColor: "white" }}
                  />
                  <button
                    onClick={closePreviewModal}
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "10px",
                      background: "transparent",
                      border: "none",
                      color: taskassigndata.file_data.url ? "white" : "gray",
                      fontSize: "36px",
                      cursor: "pointer",
                      zIndex: "100",
                    }}
                    aria-label="Close PDF Viewer"
                  >
                    &times;
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-full relative">
                  <p>File not available</p>
                  <button
                    onClick={closePreviewModal}
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "10px",
                      background: "transparent",
                      border: "none",
                      color: taskassigndata.file ? "white" : "gray",
                      fontSize: "36px",
                      cursor: "pointer",
                      zIndex: "100",
                    }}
                    aria-label="Close PDF Viewer"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          )} */}
          {isPdfViewerOpen && (
            <div className="relative w-[780px] ms-4 bg-white rounded-lg shadow-lg h-[550px] overflow-y-auto">
              {taskassigndata.file_data?.url ? (
                <>
                  {taskassigndata.file_data.type?.startsWith("image/") ||
                  taskassigndata.file_data.type === "application/pdf" ? (
                    <>
                      <iframe
                        title="File Viewer"
                        src={taskassigndata.file_data.url}
                        width="100%"
                        height="100%"
                        style={{ border: "none", backgroundColor: "white" }}
                      />
                      <button
                        onClick={closePreviewModal}
                        className="absolute -top-2.5 right-2.5 bg-transparent border-none text-gray-700 text-4xl cursor-pointer z-[100] hover:text-gray-900"
                        aria-label="Close File Viewer"
                      >
                        &times;
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full relative">
                      <div className="flex flex-col items-center space-y-4">
                        {/* Show appropriate icon based on file type */}
                        <p className="text-gray-600">
                          Preview not available for this file type
                        </p>
                        <a
                          href={taskassigndata.file_data.url}
                          download
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Download File
                        </a>
                      </div>
                      <button
                        onClick={closePreviewModal}
                        className="absolute -top-2.5 right-2.5 bg-transparent border-none text-gray-700 text-4xl cursor-pointer z-[100] hover:text-gray-900"
                        aria-label="Close File Viewer"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full relative">
                  <p className="text-gray-600">File not available</p>
                  <button
                    onClick={closePreviewModal}
                    className="absolute -top-2.5 right-2.5 bg-transparent border-none text-gray-700 text-4xl cursor-pointer z-[100] hover:text-gray-900"
                    aria-label="Close File Viewer"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Filling Data for assigned task */}
      {isFillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[395px] h-[650px] overflow-y-auto scrollable-content">
            <div className="div">
              <div className="mb-5">
                <div className="flex">
                  <div className="w-[90%]">
                    <h5 className="text-left text-lg text-black font-bold mb-4">
                      My Task
                    </h5>
                  </div>
                  <div className="w-[10%]">
                    <FiX
                      sx={{ cursor: "pointer" }}
                      onClick={handleCloseModalApprove}
                    />
                  </div>
                </div>
                <p className="text-left text-[15px] text-black font-bold w-86">
                  Collect &gt; Environment &gt; Emissions
                </p>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-[80%] relative">
                <h5 className="text-left  text-sm text-gray-500 mb-1">
                  Assigned by
                </h5>
                <div className="flex">
                  <FiUser />
                  <div className="ml-2">
                    <p className="text-left text-sm text-black">
                      {taskassigndata.assign_by_user_name}
                    </p>
                    <p className="text-left text-sm text-gray-500">
                      {taskassigndata.assign_by_email}
                    </p>
                  </div>
                </div>
              </div>
              {/* Due date section */}
              <div className="w-[20%]">
                <h5 className="text-left text-gray-500 text-sm mb-1">
                  Due date
                </h5>
                <p
                  className={`text-left text-sm ${
                    new Date(taskassigndata.deadline) < new Date(getTodayDate())
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  <Moment format="DD/MM/YYYY">{taskassigndata.deadline}</Moment>
                </p>
              </div>
            </div>
            <div className=" border-b-2 border-gray-200 mb-4"></div>
            <div className="px-5 mb-4">
              <div className="flex mb-4">
                <div className="w-[80%] relative">
                  <h5 className="text-left text-black text-sm mb-1">
                    Location
                  </h5>
                  <p className="text-left text-sm text-gray-500 ">
                    {selectedLocation}
                  </p>
                </div>
                <div className="w-[20%]">
                  <h5 className="text-left text-black text-sm mb-1">Year</h5>
                  <p className="text-left text-sm text-gray-500">
                    {taskassigndata.year}
                  </p>
                </div>
              </div>
              <div className="w-[80%] mb-4">
                <h5 className="text-left text-black text-sm mb-1">Month</h5>
                <p className="text-left text-sm text-gray-500 ">
                  {taskassigndata.month}
                </p>
              </div>
              <div className="w-[80%] mb-4">
                <h5 className="text-left text-black text-sm mb-1">Scope</h5>
                <p className="text-left text-sm text-gray-500 ">
                  {taskassigndata.scope}
                </p>
              </div>
              <div className="w-[80%] mb-4">
                <h5 className="text-left text-black text-sm mb-1">Category</h5>
                <p className="text-left text-sm text-gray-500 ">
                  {taskassigndata.category}
                </p>
              </div>
              <div className="w-[80%] mb-4">
                <h5 className="text-left text-black text-sm mb-1">
                  Sub-Category
                </h5>
                <p className="text-left text-sm text-gray-500 ">
                  {taskassigndata.subcategory}
                </p>
              </div>
              {isActivityReceived && taskassigndata.status !== 4 ? (
                <div className="w-[80%] relative">
                  <h5 className="text-left text-black text-sm mb-1">
                    Activity
                  </h5>
                  <p className="text-left text-sm text-gray-500 ">
                    {taskassigndata.activity}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className=" border-b-2 border-gray-200 mb-4"></div>
            <div className="mb-4">
              <h5 className="text-left text-black text-sm mb-3">
                Data to be added:
              </h5>

              {!isActivityReceived || taskassigndata.status === 4 ? (
                <div className="mb-3">
                  <h5 className="text-left text-black text-sm mb-1">
                    Select Activity
                  </h5>
                  <div className="relative" style={{ width: "355px" }}>
                    <select
                      className="border m-0.5 text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:border-[#007eef] focus:bg-white"
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      value={selectedActivityName}
                      onChange={handleActivityChange}
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
                          title={`${activity.name} - (${activity.source}) - ${activity.unit_type} - ${activity.region} - ${activity.year}`} // Adding title for full text on hover
                        >
                          {activity.name} - ({activity.source}) -{" "}
                          {activity.unit_type} - {activity.region} -{" "}
                          {activity.year}
                          {activity.source_lca_activity !== "unknown" &&
                            ` - ${activity.source_lca_activity}`}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                      <FiChevronDown
                        className="text-neutral-500"
                        style={{ fontSize: "16px" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {selectedActivity?.unit_type?.includes("Over") ? (
                <>
                  <div>
                    <h5 className="text-left text-black text-sm mb-1">
                      Quantity 1
                    </h5>
                    <div className="relative ">
                      <input
                        type="number"
                        className="border m-0.5 text-sm text-neutral-500 appearance-none pr-[180px] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-[#007eef]"
                        placeholder="Enter Value"
                        value={taskassigndata.value1}
                        onChange={(e) => {
                          const validatedValue = validateDecimalPlaces(
                            e.target.value
                          );
                          setTaskAssigndata({
                            ...taskassigndata,
                            value1: validatedValue,
                          });
                          if (validatedValue !== e.target.value) {
                            toast.info("Maximum 2 decimal places allowed");
                          }
                        }}
                        onBlur={(e) => {
                          // Format number on blur to ensure consistent display
                          if (e.target.value) {
                            const formattedValue = Number(
                              e.target.value
                            ).toFixed(2);
                            setTaskAssigndata({
                              ...taskassigndata,
                              value1: formattedValue,
                            });
                          }
                        }}
                      />
                      <div className="absolute right-1 top-0.5">
                        <select
                          className={`cursor-pointer appearance-none  px-2 py-1  rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs bg-[#007EEF] text-white w-[60px]`}
                          value={taskassigndata.unit1}
                          onChange={(e) =>
                            setTaskAssigndata({
                              ...taskassigndata,
                              unit1: e.target.value,
                            })
                          }
                        >
                          <option className="text-xs">Unit</option>
                          {unitTypes
                            .filter(
                              (unit) =>
                                unit.unit_type === selectedActivity.unit_type
                            )
                            .map((unit) => {
                              const unitValues = Object.values(unit.units);
                              if (unitValues.length >= 2) {
                                const firstArray = unitValues[0];
                                return firstArray;
                              }
                              return [];
                            })
                            .flat()
                            .flat()
                            .map((unitName) => (
                              <option key={unitName} className="text-xs">
                                {unitName}
                              </option>
                            ))}
                        </select>
                        <span className="absolute right-2 top-4 ml-2 transform -translate-y-1/2 pointer-events-none text-white">
                          <FiChevronDown className={`text-xs`} />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-left text-black text-sm mb-1">
                      Quantity 2
                    </h5>
                    <div className="relative ">
                      <input
                        type="number"
                        className="border m-0.5 text-sm text-neutral-500 appearance-none pr-[180px] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-[#007eef]"
                        placeholder="Enter Value"
                        value={taskassigndata.value2}
                        onChange={(e) => {
                          const validatedValue = validateDecimalPlaces(
                            e.target.value
                          );
                          setTaskAssigndata({
                            ...taskassigndata,
                            value2: validatedValue,
                          });
                          if (validatedValue !== e.target.value) {
                            toast.info("Maximum 2 decimal places allowed");
                          }
                        }}
                        onBlur={(e) => {
                          // Format number on blur to ensure consistent display
                          if (e.target.value) {
                            const formattedValue = Number(
                              e.target.value
                            ).toFixed(2);
                            setTaskAssigndata({
                              ...taskassigndata,
                              value2: formattedValue,
                            });
                          }
                        }}
                      />
                      <div className="absolute right-1 top-0.5">
                        <select
                          className={`cursor-pointer appearance-none  px-2 py-1  rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs bg-[#007EEF] text-white w-[60px]`}
                          value={taskassigndata.unit2}
                          onChange={(e) =>
                            setTaskAssigndata({
                              ...taskassigndata,
                              unit2: e.target.value,
                            })
                          }
                        >
                          <option className="text-xs">Unit</option>
                          {unitTypes
                            .filter(
                              (unit) =>
                                unit.unit_type === selectedActivity.unit_type
                            )
                            .map((unit) => {
                              const unitValues = Object.values(unit.units);
                              if (unitValues.length >= 2) {
                                return unitValues[1];
                              }
                              return [];
                            })
                            .flat()
                            .map((unitName) => (
                              <option key={unitName} className="text-xs">
                                {unitName}
                              </option>
                            ))}
                        </select>
                        <span className="absolute right-2 top-4 ml-2 transform -translate-y-1/2 pointer-events-none text-white">
                          <FiChevronDown className={`text-xs`} />
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h5 className="text-left text-black text-sm mb-1">
                    Quantity
                  </h5>
                  <div className="relative ">
                    <input
                      type="number"
                      className="border m-0.5 text-sm text-neutral-500 appearance-none pr-[180px] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-[#007eef]"
                      placeholder="Enter Value"
                      value={taskassigndata.value1}
                      onChange={(e) => {
                        const validatedValue = validateDecimalPlaces(
                          e.target.value
                        );
                        setTaskAssigndata({
                          ...taskassigndata,
                          value1: validatedValue,
                        });
                        if (validatedValue !== e.target.value) {
                          toast.info("Maximum 2 decimal places allowed");
                        }
                      }}
                      onBlur={(e) => {
                        // Format number on blur to ensure consistent display
                        if (e.target.value) {
                          const formattedValue = Number(e.target.value).toFixed(
                            2
                          );
                          setTaskAssigndata({
                            ...taskassigndata,
                            value1: formattedValue,
                          });
                        }
                      }}
                    />
                    <div className="absolute right-1 top-0.5">
                      <select
                        className={`cursor-pointer appearance-none  px-2 py-1  rounded-md leading-tight outline-none ms-1 mt-1.5 font-bold text-xs bg-[#007EEF] text-white w-[60px]`}
                        value={taskassigndata.unit1}
                        onChange={(e) =>
                          setTaskAssigndata({
                            ...taskassigndata,
                            unit1: e.target.value,
                          })
                        }
                      >
                        <option className="text-xs">Unit</option>
                        {unitTypes
                          .filter(
                            (unit) =>
                              unit.unit_type === selectedActivity.unit_type
                          )
                          .reduce((combinedUnits, unit) => {
                            return combinedUnits.concat(
                              Object.values(unit.units)
                            );
                          }, [])
                          .flat()
                          .map((unitName) => (
                            <option key={unitName} className="text-xs">
                              {unitName}
                            </option>
                          ))}
                      </select>
                      <span className="absolute right-2 top-4 ml-2 transform -translate-y-1/2 pointer-events-none text-white">
                        <FiChevronDown className={`text-xs`} />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h5 className="text-left text-black text-sm mb-3">
                Upload supporting documentation:
              </h5>
              <ImageUpload onFileSelect={handleFileUpload} />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div>
                <button
                  className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                  onClick={SubmitFilledData}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpenDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="div">
              <div className="mb-5">
                <h5 className="text-left text-base mb-1">Delete Task</h5>
                <p className="text-left text-sm text-gray-500 w-72">
                  {taskassigndata.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <button
                  className="bg-white border border-gray-300 text-black py-1 rounded-md shadow-sm w-full text-center text-md"
                  onClick={handleCloseModalDelete}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="bg-red-500 border border-red-500 text-white py-1 rounded-md shadow-sm w-full text-center text-md"
                  onClick={() => handelDelete(taskassigndata.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        task={selectedTask}
      />
      {loopen ||
        (isSearching && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex items-center justify-center">
              {/* <FiLoader className="animate-spin text-gray-500" size={48} /> */}
              <Oval
                height={40}
                width={40}
                color="#0000FF"
                secondaryColor="#ddd"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default MyTask;
