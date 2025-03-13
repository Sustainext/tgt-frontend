// useTaskManagement.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance, { post,patch, del } from "../../../utils/axiosMiddleware";
import { fetchClimatiqActivities } from "../../../utils/climatiqApi";
import { BlobServiceClient } from "@azure/storage-blob";

// Task Management Hook
export const useTaskManagement = () => {
  const [tasks, setTasks] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/organization_task_dashboard/`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks", {
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
      setIsLoading(false);
    }
  };

  // In useTaskManagement.js
  const handleTaskAction = async (id, action, data = {}) => {
    setIsLoading(true);
    try {
      let response;

      if (action === "create") {
        response = await post(`/organization_task_dashboard/`, data);
        if (response.status === 201) {
          toast.success("Task created successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          await fetchTasks();
          return true;
        }
      } else {
        response = await patch(`/organization_task_dashboard/${id}/`, data);
        if (response.status === 200) {
          // toast.success(`Task ${action}d successfully`, {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
          await fetchTasks();
          return true;
        }
      }

      throw new Error(`Failed to ${action} task`);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setIsLoading(true);
    try {
      const response = await del(`/organization_task_dashboard/${id}/`);
      if (response.status === 204) {
        toast.success("Task deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        await fetchTasks();
        return true;
      }
      throw new Error("Failed to delete task");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    fetchTasks,
    handleTaskAction,
    deleteTask,
  };
};

// File Upload Hook
export const useFileUpload = () => {
  const uploadFile = async (file) => {
    if (!file) return null;

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

      return {
        name: file.name,
        url,
        type: file.type,
        size: file.size,
        uploadDateTime: new Date().toLocaleString(),
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file");
    }
  };

  return { uploadFile };
};

// Activity Selection Hook
export const useActivitySelection = () => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchActivities = async (
    subcategory,
    page,
    customFetchExecuted,
    region,
    year
  ) => {
    try {
      const response = await fetchClimatiqActivities({
        subcategory,
        page,
        customFetchExecuted,
        region,
        year: year === "2024" ? "2023" : year,
      });

      const activitiesData = response.results || [];
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
      throw new Error(`Failed to fetch activities: ${error.message}`);
    }
  };

  return {
    activitiesList,
    setActivitiesList,
    isSearching,
    setIsSearching,
    fetchActivities,
  };
};

// Modal State Hook
export const useModalState = (initialStates = {}) => {
  const [modalStates, setModalStates] = useState(initialStates);

  const toggleModal = (modalName, value = null) => {
    console.log("modalName", modalName);
    
    setModalStates((prev) => ({
      ...prev,
      [modalName]: value === null ? !prev[modalName] : value,
    }));
  };

  return [modalStates, toggleModal];
};
