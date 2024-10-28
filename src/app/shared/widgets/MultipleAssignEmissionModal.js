import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignEmissionTasks,
  fetchUsers,
  fetchAssignedTasks,
  updateScopeDataLocal,
  setSelectedRows
} from "@/lib/redux/features/emissionSlice";
import { CiCircleMinus } from "react-icons/ci";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { getLocationName } from "../../utils/locationName";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const MultipleAssignEmissionModal = ({
  isOpen,
  onClose,
  onRemove,
  taskData,
  scope,
}) => {
  const { data: users, status: usersStatus } = useSelector(
    (state) => state.emissions.users
  );
  const selectedRows = useSelector(
    (state) => state.emissions.selectedRows[`${scope}`]
  );
  const { location, year, month } = useSelector((state) => state.emissions);

  const [selectedUser, setSelectedUser] = useState("");
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, []);

  const [loaderStatus, setLoaderStatus] = useState({
    show: false,
    message: "",
  });

  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchLocationName = async () => {
      if (taskData.location) {
        const name = await getLocationName(taskData.location);
        setSelectedLocation(name);
      }
    };

    fetchLocationName();
  }, [taskData.location]);

  // Utility function to extract scope number
const getScopeNumber = (scopeString) => {
  return parseInt(scopeString.replace('scope', ''));
};

  const formData = useSelector(state => 
    state.emissions[`${scope}Data`]?.data?.data && Array.isArray(state.emissions[`${scope}Data`].data.data)
      ? state.emissions[`${scope}Data`].data.data 
      : []
  );

  const handleRemoveMultipleRows = useCallback(
    (indices, scope) => {
      // Filter out rows whose indices are in the indices array
      const updatedData = formData.filter((_, index) => !indices.includes(index));
      console.log("Indices:", indices);
      console.log("Updated Data:", updatedData);
      
      
      // Update state with filtered data
      dispatch(
        updateScopeDataLocal({ 
          scope: getScopeNumber(scope), 
          data: { data: updatedData } 
        })
      );
    },
    [formData, dispatch]
  );

  // Modify handleAssign to show loader states
  const handleAssign = async () => {
    if (!selectedUser || !dueDate) {
      toast.error("Please select a user and due date");
      return;
    }

    try {
      setLoaderStatus({
        show: true,
        message: "Assigning tasks...",
      });

      await dispatch(
        assignEmissionTasks({
          tasks: selectedRows,
          commonData: {
            location: taskData.location,
            locationName: selectedLocation,
            year: taskData.year,
            month: taskData.month,
            scope: taskData.scope,
            deadline: dueDate,
            assignedTo: parseInt(selectedUser),
            countryCode: taskData.countryCode,
          },
        })
      ).unwrap();

      // Get indices of all selected rows
      const selectedRowIndices = selectedRows
      .map(row => parseInt(row.rowId.split("_")[1]))
      console.log('selected indexes',selectedRowIndices);
      
      setLoaderStatus({
        show: true,
        message: "Updating rows...",
      });

      handleRemoveMultipleRows(selectedRowIndices, scope);

      setLoaderStatus({
        show: true,
        message: "Fetching updated data...",
      });

      await dispatch(
        fetchAssignedTasks({
          location: taskData.location,
          year: taskData.year,
          month: taskData.month,
        })
      );

      setLoaderStatus({ show: false, message: "" });
      toast.success("Tasks assigned successfully");
      onClose();
    } catch (error) {
      console.error("Error assigning tasks:", error);
      setLoaderStatus({ show: false, message: "" });
      toast.error("Failed to assign tasks");
      onClose();
    }
  };

  const toggleShowAllTasks = (e) => {
    e.preventDefault();
    setShowAllTasks((prev) => !prev);
  };

  const handleRemoveRow = useCallback((rowData) => {
    if (!rowData || !rowData.rowId) {
      console.error("Invalid row data provided to handleRemoveRow");
      return;
    }

    // Dispatch action to remove the row from selected rows
    dispatch(
      setSelectedRows({
        scope: scope,
        rowId: rowData.rowId,
        isSelected: false,
        rowData: rowData
      })
    );

    // If no more rows are selected, close the modal
    if (selectedRows.length === 1) {
      setShowAllTasks(false);
      onClose();
    }

    toast.success("Row removed from selection");
  }, [dispatch, scope, selectedRows.length, onClose]);

  if (!isOpen) return null;
  if (!selectedRows?.length) return null;

  return (
    <>
      {loaderStatus.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
          <div className="bg-transparent p-8 rounded-lg flex flex-col items-center">
            <div className="mb-4">
              <Oval
                height={50}
                width={50}
                color="#00BFFF"
                secondaryColor="#f3f3f3"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
            <p className="text-white text-lg font-medium">
              {loaderStatus.message}
            </p>
          </div>
        </div>
      )}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center min-h-[556px] z-[1000] gap-4">
        <div
          className={`bg-white rounded-lg shadow-xl ${
            showAllTasks ? "" : ""
          } min-h-[476px] min-w-[374px] p-5`}
        >
          <h2 className="text-xl font-semibold">Assign Tasks</h2>
          <p className="text-sm text-gray-600 mb-4">
            Assign a user to all the selected tasks.
          </p>

          <div className="mx-2">
            <div className="flex justify-between items-center">
              <div className="mb-4">
                <p className="text-sm font-semibold">Location</p>
                <p className="text-sm text-gray-600">{location}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold">Year</p>
                <p className="text-sm text-gray-600">{year}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="mb-4">
                <p className="text-sm font-semibold">Month</p>
                <p className="text-sm text-gray-600">{month}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold">Scope</p>
                <p className="text-sm text-gray-600">{scope}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-sm font-semibold">Total number of tasks</p>
              </div>
              <div>
                {" "}
                <p className="text-sm text-gray-600">
                  {selectedRows?.length}{" "}
                  <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={toggleShowAllTasks}
                  >
                    {showAllTasks ? "Hide" : "View all"}
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-normal mb-2">
              Assign User
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-12">
            <label className="block text-sm font-normal mb-2">Due date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-1.5 bg-white text-gray-800 rounded-lg mr-2 w-full border border-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-1.5 bg-blue-500 text-white rounded-lg w-full"
              onClick={handleAssign}
            >
              Assign
            </button>
          </div>
        </div>
        {showAllTasks && (
          <div className="bg-white p-5 rounded-lg shadow-xl min-w-[810px] min-h-[516px] max-w-[810px] max-h-[516px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Selected Tasks</h2>
              <button
                type="button"
                onClick={toggleShowAllTasks}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="my-8">
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Subcategory</th>
                  <th className="text-left py-2">Activity</th>
                  <th className="text-left py-2"></th>
                </tr>
              </thead>
              <tbody>
                {selectedRows?.map((row, index) => (
                  <tr key={index} className="border-t my-8">
                    <td className="py-2">{row.Emission.Category}</td>
                    <td className="py-2">{row.Emission.Subcategory}</td>
                    <td className="py-2">{row.Emission.Activity || "N/A"}</td>
                    <td className="py-2">
                  <button
                  type="button"
                    onClick={() => handleRemoveRow(row)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    data-tooltip-id={`remove-row-${row.rowId}`}
                    data-tooltip-content="Remove row"
                    data-tooltip-variant="light"
                  >
                    <CiCircleMinus 
                      className="text-gray-500 hover:text-red-600 w-5 h-5" 
                    />
                  </button>
                  <Tooltip
                    id={`remove-row-${row.rowId}`}
                    place="top"
                    effect="solid"
                    style={{
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MultipleAssignEmissionModal;
