"use client";
import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const ReadOnlyTable = ({ data }) => {
  return (
    <table
      className="w-full table-fixed border-separate"
      style={{ borderSpacing: "0 3px" }}
    >
      <thead>
        <tr className="bg-gray-50">
          <th className="pl-3 pr-2 py-2 text-left text-xs font-semibold text-gray-600 w-2/9">
            Category
          </th>
          <th className="pl-3 pr-2 py-2 text-left text-xs font-semibold text-gray-600 w-2/9">
            Sub-Category
          </th>
          <th className="pl-3 pr-2 py-2 text-left text-xs font-semibold text-gray-600 w-2/9">
            Activity
          </th>
          <th className="pl-3 pr-2 py-2 text-left text-xs font-semibold text-gray-600 w-2/9">
            Quantity
          </th>
          <th className="pl-3 pr-2 py-2 text-left text-xs font-semibold text-gray-600 w-1/9">
            Assignee
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="border-b border-[#f8f9fb] mt-2 text-[#727272]"
          >
            <td className="px-1 py-1.5 text-sm">
              <div className="pl-2 bg-white pr-3 py-1 truncate rounded-md">
                {row.category}
              </div>
            </td>
            <td className="px-1 py-1.5 text-sm">
              <div className="pl-2 bg-white pr-3 py-1 truncate rounded-md">
                {row.subCategory}
              </div>
            </td>
            <td className="px-1 py-1.5 text-sm">
              <div className="pl-2 bg-white pr-3 py-1 truncate rounded-md">
                {row.selectedActivity ? row.selectedActivity : "Not Selected"}
              </div>
            </td>
            <td className="px-1 py-1.5 text-sm">
              <div className="pl-2 bg-white pr-3 py-1 flex justify-between items-center rounded-md">
                <span>{row.quantity || "Not filled"}</span>
                <span className="px-3 shadow-lg rounded-lg border text-[#007eef]">
                  {row.unit || "Unit"}
                </span>
              </div>
            </td>
            <td className="px-1 py-1.5 text-sm">
              <div className="pl-2 bg-white text-[#007eef] pr-3 py-1 truncate shadow-lg rounded-lg">
                {row.assignTo}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CalculateConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  scopeData,
}) => {
  if (!isOpen) return null;

  const users = useSelector((state) => state.emissions.users.data);

  // Format assigned tasks data for the ReadOnlyTable
  const formatTasksForTable = (tasks) => {
    return tasks.map((task) => {
      // Find the user object that matches the assigned_to ID
      const assignedUser = users.find(
        (user) => user.id === parseInt(task.Emission.assigned_to)
      );

      return {
        category: task.Emission.Category,
        subCategory: task.Emission.Subcategory,
        selectedActivity: task.Emission.Activity,
        assignTo: assignedUser ? assignedUser.username : "Unknown",
        quantity: task.Emission.Quantity,
        unit: task.Emission.Unit,
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1001] flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-[75vw] min-h-[70vh] max-h-[85vh] overflow-hidden relative">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <IoWarningOutline className="text-[#f98845] text-xl" />
              <h2 className="text-[15px] font-bold text-[#344054]">
                The following rows will not be calculated. Confirm to skip these
                rows.
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <MdClose className="text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(70vh-180px)]">
            {Object.entries(scopeData).map(
              ([scope, data]) =>
                data.length > 0 && (
                  <div key={scope} className="bg-[#f2f8fe] p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 text-[#344053] text-[14px]">
                      {scope}
                    </h3>
                    <ReadOnlyTable data={formatTasksForTable(data)} />
                  </div>
                )
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 mt-6 border-t pt-4">
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-[14px]"
            >
              Go back
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-1.5 bg-[#007eef] text-white rounded-lg hover:bg-blue-600 text-[14px]"
            >
              Confirm & Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateConfirmationModal;
