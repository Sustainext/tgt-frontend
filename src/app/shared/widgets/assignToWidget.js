import axiosInstance, { post } from "@/app/utils/axiosMiddleware";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useEmissions } from "@/app/dashboard/environment/Emissions/EmissionsContext";

const monthMapping = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const AssignToWidget = ({ id, scope, location, year, month, data, countryCode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [monthStr, setMonthStr] = useState(monthMapping[month - 1]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchUserList = async () => {
    try {
      const response = await axiosInstance.get('/sustainapp/user_client/');
      setUsersList(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
      setUsersList([]);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const memoizedUsersList = useMemo(() => usersList, [usersList]);

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSubmit = async () => {
    const sandData = {
      location: location,
      year: year,
      subcategory: rowData?.Subcategory,
      activity: rowData?.Activity,
      task_name: rowData?.Activity
        ? `${location}-${monthStr}-${rowData?.Activity}`
        : `${location}-${monthStr}-${rowData?.Subcategory}`,
      scope: scope,
      month: monthStr,
      roles: 1,
      deadline: dueDate,
      assigned_by: parseInt(localStorage.getItem("user_id")),
      assigned_to: parseInt(selectedUser),
      user_client: 1,
      category: rowData?.Category,
      factor_id: rowData?.activity_id,
      region: countryCode,
    };

    try {
      const response = await post(
        `/organization_task_dashboard/`,
        sandData
      );
      if (response.status === 201) {
        toast.success("Task assigned successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        closeModal();
        setSelectedUser('');
        setDueDate('');
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      closeModal();
      setSelectedUser('');
      setDueDate('');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-2">
        <button
          className="text-center py-1 text-sm w-[100px] bg-sky-600 text-white rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={openModal}
        >
          Assign To
        </button>
      </div>
    </>
  );
};

export default AssignToWidget;
