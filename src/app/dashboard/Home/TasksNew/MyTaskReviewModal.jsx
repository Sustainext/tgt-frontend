import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import {MdFilePresent} from "react-icons/md";

const MyTaskReviewModal = ({
  isOpen,
  task,
  onClose,
  onApprove,
  onReject,
  onReassign,
  userlist = [],
}) => {
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [comments, setComments] = useState("");
  const [isApprove, setIsApprove] = useState(true);
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
    if (isModalOpenReject) {
      onReject(task.id, {
        deadline: date,
        comments: comments,
      });
      setIsModalOpenReject(false);
      setDate("");
      setComments("");
    } else if (isModalOpenReassign) {
      onReassign(task.id, {
        assigned_to: usernameasssin,
        deadline: date,
        comments: comments,
      });
      setIsModalOpenReassign(false);
      setDate("");
      setComments("");

    } else if (isApprove) {
      onApprove(task.id);
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

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex gap-3 max-w-[1250px] h-[90vh]">
        {/* Review Modal */}
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
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Task Name */}
              <div className="text-gray-600 text-md font-semibold">
                {task.task_name}
              </div>
            </div>

            <hr className="my-6" />

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
                  {task?.description || "-"}                
                </div>
              </div>

              <hr className="my-6" />

              <div className="grid grid-cols-3 gap-y-6">
                {/* Comments */}
                <div className="text-gray-600 text-sm">Comments</div>
                <div className="col-span-2 text-sm whitespace-pre-wrap">
                  {task?.comments_assignee}
                </div>

                {/* Attachment */}
                <div className="text-gray-600 text-sm">Attachment</div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MdFilePresent className="w-7 h-7 text-green-600" />
                    <div>
                      <button
                        onClick={() => setShowFilePreview(true)}
                        className="text-blue-600 hover:underline"
                      >
                        {task.file_data.name}
                      </button>
                      <p className="text-xs text-gray-500">
                        {new Date(
                          task.file_data.uploadDateTime
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}{" "}
                        • {task.file_data.size / 1000} kB
                      </p>
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
                      <h5 className="text-left text-sm mb-1">
                        Assign new user
                      </h5>
                      <select
                        className="block w-full rounded-md border-0 py-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        value={usernameasssin}
                        onChange={(e) => setUsernameassin(e.target.value)}
                      >
                        <option value="">Select new user</option>
                        {userlist?.map((item, index) => (
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

                    <button
                      className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
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

                    <button
                      className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-sm"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* File Preview Panel */}
        {showFilePreview && task.file_data && (
          <div className="bg-white rounded-lg w-[800px] h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {task.file_data.name}
              </h3>
              <button
                onClick={() => setShowFilePreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-1 p-4 bg-gray-50">
              {task.file_data?.url ? (
                <>
                  {task.file_data.type?.startsWith("image/") ||
                  task.file_data.type === "application/pdf" ? (
                    <iframe
                      src={task.file_data.url}
                      title="File Preview"
                      className="w-full h-full rounded border border-gray-200"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-gray-600 mb-4">
                        Preview not available for this file type
                      </p>
                      <a
                        href={task.file_data.url}
                        download
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Download File
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-600">File not available</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTaskReviewModal;
