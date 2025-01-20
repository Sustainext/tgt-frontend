import React, { useState } from "react";
import { format } from "date-fns";

const MyTaskReviewModal = ({
  isOpen,
  task,
  onClose,
  onApprove,
  onReject,
  onReassign,
  clintlist=[],
}) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [comments, setComments] = useState("");
  const [isApprove, setIsApprove] = useState(false);
  const [isModalOpenReassign, setIsModalOpenReassign] = useState(false);
  const [isModalOpenReject, setIsModalOpenReject] = useState(false);
  const [usernameasssin, setUsernameassin] = useState("");
   const [date, setDate] = useState("");

  const handleApprove = () => {
    setIsApprove(true);
    setIsModalOpenReassign(false);
    setIsModalOpenReject(false);
  };

  const handleOpenModalReassign = () => {
    setIsModalOpenReassign(true);
    setIsApprove(false);
    setIsModalOpenReject(false);
    setDate(task.deadline);
  };

  const handleOpenModalReject = () => {
    setIsModalOpenReject(true);
    setIsModalOpenReassign(false);
    setIsApprove(false);
    setDate(task.deadline);
    setComments("");
  };

  const handleSubmit = () => {
    if (mode === "reject") {
      onReject(task.id, {
        deadline: newDueDate,
        comments: comments,
      });
    } else if (mode === "reassign") {
      onReassign(task.id, {
        assigned_to: selectedUser,
        deadline: newDueDate,
        comments: comments,
      });
    }
    onClose();
  };

  const statusMap = {
    in_progress: "text-yellow-500",
    approved: "text-green-600",
    under_review: "text-orange-400",
    completed: "text-green-600",
    reject: "text-red-500",
  };

  if (!isOpen) return null;
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] max-h-[90vh] overflow-y-auto table-scrollbar">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#111827]">
              Review Task
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Task Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-y-6">
              {/* Status */}
              <div className="text-gray-600 text-sm">Status</div>
              <div
                className={`col-span-2 text-sm ${
                  statusMap[task.task_status] || "text-gray-500"
                }`}
              >
                {task.task_status.replace("_", " ")}{" "}
              </div>

              {/* Assigned on */}
              <div className="text-gray-600 text-sm">Assigned on</div>
              <div className="col-span-2 text-sm">
                {task?.assigned_date || "24/10/2025"}
              </div>

              {/* Due Date */}
              <div className="text-gray-600 text-sm">Due Date</div>
              <div className="col-span-2 text-sm">
                {task?.deadline || "24/10/2025"}
              </div>

              {/* Assigned By */}
              <div className="text-gray-600 text-sm">Assigned by</div>
              <div className="col-span-2">
                <p className="text-sm">
                  {task?.assign_by_user_name || "George Washington Bunny"}
                </p>
                <p className="text-sm text-gray-500">
                  {task?.assign_by_email || "Bugs@acmecorp.com"}
                </p>
              </div>

              {/* Description */}
              <div className="text-gray-600 text-sm">Description</div>
              <div className="col-span-2 text-sm">
                {task?.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </div>
            </div>

            {task.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Description
                </h3>
                <p className="mt-1 text-gray-600">{task.description}</p>
              </div>
            )}

            {/* Comments */}
            <div className="grid grid-cols-3 gap-y-6">
              <div className="text-gray-600 text-sm">Comments</div>
              <div className="col-span-2 text-sm whitespace-pre-wrap">
                {task?.comments ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
              </div>

              {/* Attachment */}
              <div className="text-gray-600 text-sm">Attachment</div>
              <div className="col-span-2">
                <div className="flex items-center gap-2 text-sm">
                  <img src="/pdf-icon.svg" alt="PDF" className="w-4 h-4" />
                  <div>
                    <a
                      href={task?.file_data?.url}
                      className="text-blue-600 hover:underline"
                    >
                      Document1.PDF
                    </a>
                    <p className="text-xs text-gray-500">Mar 27 • 1.3 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="rounded-md border px-2 py-4 mt-6">
            <div className="flex justify-between mb-5">
              <button
                className={`border border-[#54B054] p-2 rounded-md shadow-sm w-[103px] text-center text-sm ${
                  isApprove
                    ? "bg-[#54B054] text-white"
                    : "text-[#54B054] hover:bg-green-50"
                }`}
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className={`border border-[#BF9500] p-2 rounded-md shadow-sm w-[103px] text-center text-sm ${
                  isModalOpenReassign
                    ? "bg-[#BF9500] text-white"
                    : "text-[#BF9500] hover:bg-yellow-50"
                }`}
                onClick={handleOpenModalReassign}
              >
                Reassign
              </button>
              <button
                className={`border border-[#D91F11] p-2 rounded-md shadow-sm w-[103px] text-center text-sm ${
                  isModalOpenReject
                    ? "bg-[#D91F11] text-white"
                    : "text-[#D91F11] hover:bg-red-50"
                }`}
                onClick={handleOpenModalReject}
              >
                Reject
              </button>
            </div>

            <div className="mb-2">
              {isApprove && (
                <>
                  <p className="text-center text-sm mb-5">
                    Click on submit to approve the task
                  </p>
                  <button
                    className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </>
              )}

              {isModalOpenReassign && (
                <>
                  <div className="mb-5">
                    <h5 className="text-left text-sm mb-1">Assign new user</h5>
                    <select
                      className="block w-full rounded-md border-0 py-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      value={usernameasssin}
                      onChange={(e) => setUsernameassin(e.target.value)}
                    >
                      <option value="">Select new user</option>
                      {clintlist?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.username}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <h5 className="text-left text-sm mb-1">
                      Assign a new due date
                    </h5>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}

              {isModalOpenReject && (
                <>
                  <div className="mb-5">
                    <h5 className="text-left text-sm mb-1">
                      Assign a new due date
                    </h5>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>

                  <div className="mb-5">
                    <h5 className="text-left text-sm mb-1">Comments</h5>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Add a comment"
                      className="border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                      rows={5}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTaskReviewModal;
