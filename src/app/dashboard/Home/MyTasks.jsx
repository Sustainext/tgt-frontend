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
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import ImageUpload from "../../shared/components/ImageUpload";
import { unitTypes } from "../../shared/data/units";
import axiosInstance, { post, del, patch } from "../../utils/axiosMiddleware";
import { BlobServiceClient } from "@azure/storage-blob";
import { getLocationName } from "../../utils/locationName";

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

  useEffect(() => {
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

  let wildcard = false;

  async function fetchActivities(
    category,
    page,
    customFetchExecuted,
    region,
    year
  ) {
    const baseURL = "https://api.climatiq.io";
    const resultsPerPage = 500;
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_CLIMATIQ_KEY}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    let currentYear = year;
    if (year == "2024") currentYear = "2023";
    let wildcardResultZero = false;

    let activitiesData = [];
    let totalResults = 0;
    let totalPrivateResults = 0;
    let totalPages;
    let totalPagesCustom = 0;
    let wildcardActivitiesData = [];
    let yearlyResponseData = [];
    let newActivitiesData = [];
    let customFetchData = [];
    let multipleSourceData = [];
    let finalActivitiesData = [];

    try {
      if (!wildcard) {
        const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=${region}*&category=${category}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;

        const response = await axios.get(url, axiosConfig);
        activitiesData = response.data.results;
        totalResults = response.data.results.length;
        totalPages = response.data.last_page;
        totalPrivateResults = activitiesData.reduce((count, activity) => {
          if (activity.access_type === "private") {
            count += 1;
          }
          return count;
        }, 0);
      }

      const effectiveCount = totalResults - totalPrivateResults;
      if (effectiveCount <= 5) {
        wildcard = true; // Set wildcard state to true immediately
      }
      if (wildcard) {
        const wildcardResponse = await axios.get(
          `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${currentYear}&region=*&category=${category}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`,
          axiosConfig
        );
        wildcardActivitiesData = wildcardResponse.data.results;
        totalPages = wildcardResponse.data.last_page;

        if (totalPages === 0) wildcardResultZero = true;
      }

      if (wildcardResultZero) {
        for (let i = currentYear - 1; i >= 2019; i--) {
          const yearlyResponse = await axios.get(
            `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&year=${i}&region=${region}*&category=${category}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`,
            axiosConfig
          );
          const yearlyActivitiesData = yearlyResponse.data.results;
          totalPages = yearlyResponse.data.last_page;
          yearlyResponseData = [...yearlyResponseData, ...yearlyActivitiesData];
          if (yearlyActivitiesData.length !== 0) break;
        }
      }

      newActivitiesData = wildcardActivitiesData.filter(
        (activity) => activity.access_type !== "private"
      );

      const CombinedActivitiesData = [
        ...activitiesData,
        ...newActivitiesData,
        ...yearlyResponseData,
      ];

      const categoriesToAppend = [
        "Vehicles",
        "Clothing and Footwear",
        "DIY and Gardening Equipment",
        "Domestic Services",
        "Education",
        "Electrical Equipment",
        "Equipment Rental",
        "Food and Beverage Services",
        "Furnishings and Household",
        "General Retail",
        "Government Activities",
        "Health and Social Care",
        "Information and Communication Services",
        "Office Equipment",
        "Paper Products",
        "Plastics and Rubber Products",
        "Professional Services and Activities",
        "Waste Management",
        "Water Treatment",
        "Electrical Equipment",
        "Furnishings and Household",
        "Office Equipment",
        "Restaurants and Accommodation",
        "Vehicles",
      ];

      const categoryMappings = {
        Vehicles: [{ source: "EXIOBASE", year: "2019" }],
        "Clothing and Footwear": [{ source: "EXIOBASE", year: "2019" }],
        "DIY and Gardening Equipment": [{ source: "EPA", year: "2019" }],
        "Domestic Services": [{ source: "EXIOBASE", year: "2019" }],
        Education: [{ source: "EXIOBASE", year: "2019" }],
        "Electrical Equipment": [{ source: "EXIOBASE", year: "2019" }],
        "Equipment Rental": [{ source: "EXIOBASE", year: "2019" }],
        "Food and Beverage Services": [
          { source: "EPA", year: "2019" },
          { source: "BEIS", year: "2019" },
        ],
        "Furnishings and Household": [{ source: "EXIOBASE", year: "2019" }],
        "General Retail": [{ source: "EXIOBASE", year: "2019" }],
        "Government Activities": [{ source: "EXIOBASE", year: "2019" }],
        "Health and Social Care": [{ source: "EXIOBASE", year: "2019" }],
        "Information and Communication Services": [
          { source: "EXIOBASE", year: "2019" },
        ],
        "Post and Telecommunication": [{ source: "EXIPOBASE", year: "2019" }],
        "Office Equipment": [
          { source: "EXIOBASE", year: "2019" },
          { source: "EPA", year: "2018" },
          { source: "EPA", year: "2019" },
        ],
        "Paper Products": [{ source: "EXIOBASE", year: "2019" }],
        "Plastics and Rubber Products": [{ source: "EXIOBASE", year: "2019" }],
        "Professional Services and Activities": [
          { source: "EXIOBASE", year: "2019" },
        ],
        "Waste Management": [{ source: "EXIOBASE", year: "2019" }],
        "Water Treatment": [{ source: "EXIOBASE", year: "2019" }],
        "Restaurants and Accommodation": [{ source: "EXIOBASE", year: "2019" }],
      };

      if (
        categoriesToAppend.includes(category) &&
        categoryMappings[category] &&
        !customFetchExecuted
      ) {
        for (const entry of categoryMappings[category]) {
          const source = entry.source;
          const year = entry.year;

          const url = `${baseURL}/data/v1/search?results_per_page=${resultsPerPage}&source=${source}&year=${year}&region=*&category=${category}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;
          const response = await axios.get(url, axiosConfig);
          customFetchData = customFetchData.concat(response.data.results);
          finalActivitiesData = [
            ...customFetchData,
            ...activitiesData,
            ...newActivitiesData,
            ...yearlyResponseData,
          ];
          totalPagesCustom = response.data.last_page;
        }
      }

      setIsActivityFetched(true);
      if (!customFetchExecuted) {
        return {
          activitiesData: [...CombinedActivitiesData, ...customFetchData],
          pages: totalPages,
          pagesCustom: totalPagesCustom,
        };
      } else {
        return {
          activitiesData: CombinedActivitiesData,
          pages: totalPages,
        };
      }
    } catch (error) {
      console.error("Error fetching data from different regions: ", error);
      throw error;
    }
  }
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    if (activity === null || activity === "") {
      setIsActivityReceived(false);
    } else {
      setIsActivityReceived(true);
    }
    setIsFillModalOpen(true);
    setIsOpen(false);
    setSelectedActivityName(activity);

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

    let page = 1;
    let customFetchExecuted = false;

    console.log(
      "task assign data on click",
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
      status
    );
    try {
      if (activity !== "") {
        let unitTypeExtractedArray = activity?.split("-");
        let ExtractedUnitType = unitTypeExtractedArray?.pop();
        setSelectedActivity({
          ...selectedActivity,
          unit_type: ExtractedUnitType,
        });
      }
      const response = await fetchActivities(
        subcategory,
        page,
        customFetchExecuted,
        region,
        year
      );
      let { activitiesData, pages, pagesCustom } = response;

      activitiesData.sort((a, b) => {
        return a.access_type === "private" && b.access_type !== "private"
          ? -1
          : a.access_type !== "private" && b.access_type === "private"
          ? 1
          : 0;
      });

      setActivitiesList(activitiesData);

      if (pages > 1) {
        for (let i = 2; i <= pages; i++) {
          customFetchExecuted =
            pagesCustom > 1 && i <= pagesCustom ? false : true;
          const additionalResponse = await fetchActivities(
            subcategory,
            i,
            customFetchExecuted,
            region,
            year
          );
          const additionalActivities = additionalResponse.activitiesData;

          activitiesData = [...activitiesData, ...additionalActivities];
          activitiesData.sort((a, b) => {
            return a.access_type === "private" && b.access_type !== "private"
              ? -1
              : a.access_type !== "private" && b.access_type === "private"
              ? 1
              : a.name.localeCompare(b.name);
          });

          if (i % 3 === 0 || i === pages) {
            setActivitiesList([...activitiesData]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching activities data:", error);
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
    const stringWithQuotes = localStorage.getItem("token");
    const stringWithoutQuotes = stringWithQuotes.replace(/"/g, "");
    const options = {
      headers: {
        Authorization: `Bearer ${stringWithoutQuotes}`,
      },
    };
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/organization_task_dashboard/`,
        options
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
  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();

    const sandData = {
      ...addgoles,
      assigned_to: parseInt(localStorage.getItem("user_id")),
      assigned_by: parseInt(localStorage.getItem("user_id")),
      user_client: 1,
      roles: 3,
    };
    await post(`/organization_task_dashboard/`, sandData)
      .then((response) => {
        if (response.status == "201") {
          toast.success("Task has been added successfully", {
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

  const handleCompleted = async (id, roles) => {
    LoaderOpen();
    let task_status;
    if (roles === 1) {
      task_status = 2;
    } else {
      task_status = 3;
    }
    const sandData = {
      task_status,
    };
    await patch(`/organization_task_dashboard/${id}/`, sandData).then(
      (response) => {
        if (response.status == "200") {
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
  useEffect(()=>{
    setSelectedLocation(getLocationName(taskassigndata.location))
  },[taskassigndata])


  return (
    <>
      <div className="rounded-lg shadow border border-gray-200 p-4 h-[320px] overflow-x-auto">
        <div className="flex justify-between mb-4">
          <div className="text-neutral-800 text-[15px] font-bold leading-tight">
            My Task
          </div>

          <div
            className="text-sky-600 text-[10px] cursor-pointer font-normal leading-[13px] flex items-center me-2 space-x-2"
            onClick={handleOpenModal}
          >
            <FiPlus style={{ fontSize: "18px" }} />
            <span>Add task</span>
          </div>
        </div>
        <div>
          <div className={`flex my-6 border-b text-sm text-start`}>
            <button
              className={`pr-2 py-1 rounded-b-none text-xs font-bold leading-[15px] ${
                activeTab === "upcoming"
                  ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                  : "border-transparent text-neutral-500"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-1 rounded-b-none text-xs font-bold leading-[15px] ${
                activeTab === "overdue"
                  ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                  : "border-transparent text-neutral-500"
              }`}
              onClick={() => setActiveTab("overdue")}
            >
              Overdue
            </button>
            <button
              className={`px-4 py-1 rounded-b-none text-xs font-bold leading-[15px] ${
                activeTab === "completed"
                  ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                  : "border-transparent text-neutral-500"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
            <button
              className={`px-4 py-1 rounded-b-none text-xs font-bold leading-[15px] ${
                activeTab === "forreview"
                  ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                  : "border-transparent text-neutral-500"
              }`}
              onClick={() => setActiveTab("forreview")}
            >
              For Review
            </button>
          </div>

          <div className="p-1 h-[188px]">
            {activeTab === "upcoming" && (
              <div>
                {tasks.upcoming == "" ? (
                  <div className="justify-center items-center ">
                    <div className="flex justify-center items-center pb-5">
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
                          <>
                            <div className="flex justify-between" key={task.id}>
                              <div className="flex cursor-pointer">
                                <div>
                                  {task.roles === 2 || task.roles === 3 ? (
                                    <FiCircle
                                      sx={{ fontSize: "20px", mt: -0.4 }}
                                      onClick={() => handleCompleted(task.id)}
                                    />
                                  ) : (
                                    <FiCircle
                                      sx={{
                                        fontSize: "20px",
                                        mt: -0.4,
                                        color: "#e0e0e0",
                                      }}
                                    />
                                  )}
                                </div>
                                <div className="w-72 truncate text-wrap text-neutral-800 text-[13px] font-normal leading-none ml-3 ">
                                  {task.roles === 1 ? (
                                    <p
                                      className="py-1 cursor-pointer"
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
                                    <p className="py-1">{task.task_name}</p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <div
                                  className={
                                    task.roles === 1
                                      ? `w-24 text-neutral-800 text-[13px] font-normal leading-none ml-3 ${
                                          task.task_status === 4
                                            ? "bg-[#FE5F54] text-white"
                                            : "bg-[#ffd633]"
                                        } h-[20px] rounded-md`
                                      : "w-24 text-neutral-800 text-[13px] font-normal leading-none ml-3 h-[20px]"
                                  }
                                >
                                  {task.roles === 1 ? (
                                    <p className="px-2 py-1 text-center text-[12px]">
                                      {task.task_status === "in_progress"
                                        ? "InProgress"
                                        : task.task_status === "approved"
                                        ? "Approved"
                                        : task.task_status === "under_review"
                                        ? "Under review"
                                        : task.task_status === "completed"
                                        ? "Completed"
                                        : task.task_status === "reject"
                                        ? "Rejected"
                                        : ""}
                                    </p>
                                  ) : (
                                    <></>
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
                                <div className="w-[18px] cursor-pointer ">
                                  {task.roles === 2 ? (
                                    <FiTrash2
                                      sx={{
                                        color: "#0000008F",
                                        fontSize: "18px",
                                      }}
                                      onClick={() => handelDelete(task.id)}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "overdue" && (
              <div>
                {tasks.overdue == "" ? (
                  <div className="h-screen justify-center items-center ">
                    <h4 className="text-center">No data found</h4>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 mb-6 nt-2">
                      {tasks.overdue &&
                        tasks.overdue.map((task) => (
                          <>
                            <div className="flex justify-between">
                              <div className="flex cursor-pointer">
                                <div>
                                  <FiCircle
                                    sx={{
                                      fontSize: "21px",
                                      mt: -0.4,
                                      color: "gray",
                                    }}
                                  />
                                </div>
                                <div
                                  className={`w-72 truncate whitespace-nowrap text-neutral-800 text-[13px] font-normal leading-none ml-3`}
                                >
                                  {task.roles === 1 ? (
                                    <p
                                      className="py-1 cursor-pointer"
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
                                <div
                                  className={
                                    task.roles === 1
                                      ? "w-24  text-neutral-800 text-[13px] font-normal leading-none ml-3 bg-gray-200  h-[20px]"
                                      : "w-24  text-neutral-800 text-[13px] font-normal leading-none ml-3 h-[20px]"
                                  }
                                >
                                  {task.roles === 1 ? (
                                    <p className="px-2 py-1 text-center text-[12px]">
                                      {task.task_status === "in_progress"
                                        ? "InProgress"
                                        : task.task_status === "approved"
                                        ? "Approved"
                                        : task.task_status === "under_review"
                                        ? "Under review"
                                        : ""}{" "}
                                    </p>
                                  ) : (
                                    <></>
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
                                <div
                                  className="w-[18px] cursor-pointer "
                                  // onClick={handelDeleteGoal}
                                >
                                  {task.roles === 2 ? (
                                    <FiTrash2
                                      sx={{
                                        color: "#0000008F",
                                        fontSize: "18px",
                                        mt: -1,
                                      }}
                                      onClick={() => handelDelete(task.id)}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "completed" && (
              <div>
                {tasks.completed == "" ? (
                  <div className="h-screen justify-center items-center ">
                    <h4 className="text-center">No data found</h4>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 mb-6 mt-2">
                      {tasks.completed &&
                        tasks.completed.map((task) => (
                          <>
                            <div className="flex justify-between">
                              <div className="flex cursor-pointer">
                                <div>
                                  {task.task_status === 1 ? (
                                    <FiCircle
                                      sx={{ fontSize: "21px", mt: -0.4 }}
                                      onClick={() => handleCompleted(task.id)}
                                    />
                                  ) : (
                                    <FiCheckCircle
                                      sx={{
                                        fontSize: "20px",
                                        color: "#3DCA7C",
                                        mt: -0.4,
                                      }}
                                    />
                                  )}
                                </div>
                                <div
                                  className={`w-[17rem] truncate whitespace-nowrap text-neutral-800 text-[13px] font-normal leading-none ml-3`}
                                >
                                  {task.roles === 1 ? (
                                    <p className="py-1 cursor-pointer">
                                      {task.task_name}
                                    </p>
                                  ) : (
                                    <p className="py-1">{task.task_name}</p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <div
                                  className={
                                    task.roles === 1
                                      ? "w-24  text-neutral-800 text-[13px] font-normal leading-none ml-3 bg-emerald-300 h-[20px] rounded-md"
                                      : "w-24  text-neutral-800 text-[13px] font-normal leading-none ml-3 h-[20px]"
                                  }
                                >
                                  {task.roles === 1 ? (
                                    <p className="px-2 py-1 text-center text-[12px]">
                                      {task.task_status === "in_progress"
                                        ? "InProgress"
                                        : task.task_status === "approved"
                                        ? "Approved"
                                        : task.task_status === "under_review"
                                        ? "Under review"
                                        : task.task_status === "completed"
                                        ? "Completed"
                                        : ""}{" "}
                                    </p>
                                  ) : (
                                    <></>
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
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "forreview" && (
              <>
                {tasks.for_review == "" ? (
                  <div className="h-screen justify-center items-center ">
                    <h4 className="text-center">No data found</h4>
                  </div>
                ) : (
                  <div>
                    {tasks.for_review &&
                      tasks.for_review.map((task) => (
                        <div className="mb-3 relative ">
                          <div className="flex justify-between">
                            <div className="flex">
                              <div>
                                <FiCircle sx={{ fontSize: "20px", mt: -0.4 }} />
                              </div>

                              <div
                                className={`w-[20rem] truncate whitespace-nowrap text-neutral-800 text-[13px] font-normal leading-none ml-3`}
                              >
                                {task.roles === 1 ? (
                                  <p
                                    className="py-1 cursor-pointer"
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
                                  <p className="py-1">{task.task_name}</p>
                                )}
                              </div>

                              <div>
                                <div
                                  className={
                                    task.roles === 1
                                      ? "w-24  text-neutral-800 text-[13px] font-normal leading-none ml-3 bg-orange-300 h-[20px] rounded-md"
                                      : "w-24  text-neutral-800 text-[13px] font-normal leading-none ml-3 h-[20px]"
                                  }
                                >
                                  {task.roles === 1 ? (
                                    <p className="px-2 py-1 text-center text-[12px] ">
                                      {task.task_status === "in_progress"
                                        ? "InProgress"
                                        : task.task_status === "approved"
                                        ? "Approved"
                                        : task.task_status === "under_review"
                                        ? "Under review"
                                        : ""}{" "}
                                    </p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>

                              <div className="w-[68px] text-neutral-500 text-xs font-normal leading-[15px] ml-3">
                                <p className="py-1">
                                  <Moment format="DD/MM/YYYY">
                                    {task.deadline}
                                  </Moment>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Not emission task */}
      {isModalOpen && (
        <div className="modal-overlay z-50">
          <div className="modal-center">
            <div className="modal-content">
              <div className="flex justify-between items-center drop-shadow-lg border-b-2 py-6 w-full">
                <h2 className="self-stretch text-black text-opacity-90 text-[22px] font-normal leading-relaxed flex space-x-8 items-center ms-6">
                  <span>Add task</span>
                </h2>
                <button
                  className="absolute top-2 right-2 mt-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-6 h-6"
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
              <div className="my-6 mx-8 ">
                <div className="mb-2 py-4 px-3">
                  <div>
                    <form className="w-full text-left" onSubmit={submitForm}>
                      <div className="mr-2 mb-4 w-[101%]">
                        <label
                          htmlFor="cname"
                          className="block text-neutral-800 text-[13px] font-normal"
                        >
                          Task name
                        </label>

                        <div className="mt-2 mr-2">
                          <input
                            id="title"
                            title="title"
                            type="text"
                            name="task_name"
                            autoComplete="off"
                            required
                            placeholder="Enter Task Title"
                            onChange={datahandleChange}
                            value={task_name}
                            className="block  w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="flex ">
                        <div className="col-span-2 mb-4 flex-1">
                          <div>
                            <label
                              htmlFor="dateField"
                              className="block text-neutral-800 text-[13px] font-normal"
                            >
                              Deadline
                            </label>
                            <div className="mt-2 ">
                              <input
                                id="deadline"
                                title="deadline"
                                type="date"
                                name="deadline"
                                autoComplete="off"
                                onChange={datahandleChange}
                                value={deadline}
                                min={getTodayDate()}
                                required
                                className="block w-full px-1 rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center mt-5">
                        <input
                          type="submit"
                          value="Save"
                          className="w-[30%] h-[31px]  px-[22px] py-2 bg-blue-500 text-white rounded shadow flex-col justify-center items-center inline-flex cursor-pointer"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
            <div className="bg-white p-5 rounded-lg shadow-lg w-[395px] h-[550px] overflow-y-auto scrollable-content">
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

          {isPdfViewerOpen && (
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
          )}
        </div>
      )}

      {/* Filling Data for assigned task */}
      {isFillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[395px] h-[550px] overflow-y-auto scrollable-content">
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
              <div className="w-[20%]">
                <h5 className="text-left text-gray-500 text-sm mb-1">
                  Due date
                </h5>
                <p className="text-left text-sm text-black">
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
                      className="border m-0.5 text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                        className="border m-0.5 text-sm text-neutral-500 appearance-none pr-[180px] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Enter Value"
                        value={taskassigndata.value1}
                        onChange={(e) =>
                          setTaskAssigndata({
                            ...taskassigndata,
                            value1: e.target.value,
                          })
                        }
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
                        className="border m-0.5 text-sm text-neutral-500 appearance-none pr-[180px] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Enter Value"
                        value={taskassigndata.value2}
                        onChange={(e) =>
                          setTaskAssigndata({
                            ...taskassigndata,
                            value2: e.target.value,
                          })
                        }
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
                      className="border m-0.5 text-sm text-neutral-500 appearance-none pr-[180px] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Enter Value"
                      value={taskassigndata.value1}
                      onChange={(e) =>
                        setTaskAssigndata({
                          ...taskassigndata,
                          value1: e.target.value,
                        })
                      }
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
      {loopen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex items-center justify-center">
            <FiLoader className="animate-spin text-gray-500" size={48} />
          </div>
        </div>
      )}
    </>
  );
};

export default MyTask;
