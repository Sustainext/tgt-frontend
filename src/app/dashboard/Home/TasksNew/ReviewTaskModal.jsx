import React, { useState } from "react";
import { FiX, FiUser, FiFile } from "react-icons/fi";
import Moment from "react-moment";
import { toast } from "react-toastify";

const ReviewTaskModal = ({
  isOpen,
  onClose,
  taskassigndata,
  onApprove,
  onReassign,
  onReject,
  clintlist,
  selectedLocation,
}) => {
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [isApprove, setIsApprove] = useState(true);
  const [isModalOpenReassign, setIsModalOpenReassign] = useState(false);
  const [isModalOpenReject, setIsModalOpenReject] = useState(false);
  const [comments, setComments] = useState("");
  const [date, setDate] = useState("");
  const [usernameasssin, setUsernameassin] = useState("");

  if (!isOpen || !taskassigndata) return null;

  const handleApprove = () => {
    setIsApprove(true);
    setIsModalOpenReassign(false);
    setIsModalOpenReject(false);
  };

  const handleOpenModalReassign = () => {
    setIsModalOpenReassign(true);
    setIsApprove(false);
    setIsModalOpenReject(false);
    setDate(taskassigndata.deadline);
  };

  const handleOpenModalReject = () => {
    setIsModalOpenReject(true);
    setIsModalOpenReassign(false);
    setIsApprove(false);
    setDate(taskassigndata.deadline);
    setComments("");
  };

  const handleClosePreviewModal = () => {
    setIsPdfViewerOpen(false);
  };

  const handleSubmit = async () => {
    if (isApprove) {
      await onApprove(taskassigndata.id);
    } else if (isModalOpenReassign) {
      if (!date || !usernameasssin) {
        toast.error("Please fill in all fields");
        return;
      }
      await onReassign(taskassigndata.id, {
        assigned_to: parseInt(usernameasssin),
        deadline: date,
      });
    } else if (isModalOpenReject) {
      if (!date || !comments) {
        toast.error("Please fill in all fields");
        return;
      }
      await onReject(taskassigndata.id, {
        deadline: date,
        comments,
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10 ${
        isPdfViewerOpen
          ? "flex items-center justify-center"
          : "grid place-items-center"
      } bg-black bg-opacity-50`}
    >
      <div className="z-10 flex items-center justify-center bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg w-[395px] h-[650px] overflow-y-auto scrollable-content table-scrollbar">
          {/* Header */}
          <div className="mb-5">
            <div className="flex">
              <div className="w-[90%]">
                <h5 className="text-left text-lg text-black font-bold mb-4">
                  Review Task
                </h5>
              </div>
              <div className="w-[10%]">
                <FiX className="cursor-pointer" onClick={onClose} />
              </div>
            </div>
            <p className="text-left text-[15px] text-black font-bold w-86">
              Collect &gt; Environment &gt; Emissions
            </p>
          </div>

          {/* User Info */}
          <div className="flex mb-4">
            <div className="w-[80%] relative">
              <h5 className="text-left text-sm text-gray-500 mb-1">
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
              <h5 className="text-left text-gray-500 text-sm mb-1">Due date</h5>
              <p className="text-left text-sm text-black">
                <Moment format="DD/MM/YYYY">{taskassigndata.deadline}</Moment>
              </p>
            </div>
          </div>

          <div className="border-b-2 border-gray-200 mb-4" />

          {/* Task Details */}
          <div className="px-5 mb-4">
            <div className="flex mb-4">
              <div className="w-[80%] relative">
                <h5 className="text-left text-black text-sm mb-1">Location</h5>
                <p className="text-left text-sm text-gray-500">
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
              <p className="text-left text-sm text-gray-500">
                {taskassigndata.month}
              </p>
            </div>

            <div className="w-[80%] mb-4">
              <h5 className="text-left text-black text-sm mb-1">Scope</h5>
              <p className="text-left text-sm text-gray-500">
                {taskassigndata.scope}
              </p>
            </div>

            <div className="w-[80%] mb-4">
              <h5 className="text-left text-black text-sm mb-1">Category</h5>
              <p className="text-left text-sm text-gray-500">
                {taskassigndata.category}
              </p>
            </div>

            <div className="w-[80%] relative">
              <h5 className="text-left text-black text-sm mb-1">
                Sub-Category
              </h5>
              <p className="text-left text-sm text-gray-500">
                {taskassigndata.subcategory}
              </p>
            </div>
          </div>

          <div className="border-b-2 border-gray-100 mb-4" />

          {/* Data Review Section */}
          <div className="mb-4 bg-[#007eef0d] p-4 rounded-md">
            <h5 className="text-left text-black text-sm mb-3">
              Data to be reviewed:
            </h5>

            {/* Activity */}
            <div className="mb-3">
              <h5 className="text-left text-black text-sm mb-1">Activity</h5>
              <input
                type="text"
                className="border m-0.5 text-sm w-full text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={taskassigndata.activity}
                readOnly
              />
            </div>

            {/* Quantities */}
            <div className="mb-3">
              {taskassigndata.activity?.split('-')[2].includes("Over") ? (
                <>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <h5 className="text-left text-black text-sm mb-1">
                        Quantity 1
                      </h5>
                      <input
                        type="number"
                        className="border m-0.5 w-full text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={taskassigndata.value1}
                        readOnly
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-left text-black text-sm mb-1">
                        Unit 1
                      </h5>
                      <input
                        type="text"
                        className="border m-0.5 w-full text-sm text-blue-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={taskassigndata.unit1}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <h5 className="text-left text-black text-sm mb-1">
                        Quantity 2
                      </h5>
                      <input
                        type="number"
                        className="border m-0.5 w-full text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={taskassigndata.value2}
                        readOnly
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-left text-black text-sm mb-1">
                        Unit 2
                      </h5>
                      <input
                        type="text"
                        className="border m-0.5 w-full text-sm text-blue-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={taskassigndata.unit2}
                        readOnly
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h5 className="text-left text-black text-sm mb-1">
                      Quantity
                    </h5>
                    <input
                      type="number"
                      className="border m-0.5 w-full text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={taskassigndata.value1}
                      readOnly
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-left text-black text-sm mb-1">Unit</h5>
                    <input
                      type="text"
                      className="border m-0.5 w-full text-sm text-blue-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={taskassigndata.unit1}
                      readOnly
                    />
                  </div>
                </div>
              )}
            </div>

            {/* File Attachment */}
            <div>
              <h5 className="text-left text-black text-sm mb-1">Attachments</h5>
              <div className="relative px-8 py-2 text-black rounded-md border flex items-center">
                <div className="flex">
                  <div>
                    <FiFile className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-2">
                    <button
                      onClick={() => setIsPdfViewerOpen(true)}
                      className="text-blue-600 hover:text-blue-800 transition duration-300 text-sm"
                    >
                      {taskassigndata.file_data?.name || "No file available"}
                    </button>
                    <p className="text-xs text-gray-400">
                      {taskassigndata.file_data?.size
                        ? `${(
                            taskassigndata.file_data.size /
                            (1024 * 1024)
                          ).toFixed(2)} MB`
                        : "0 MB"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="rounded-md border p-2">
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

        {/* File Preview */}
        {isPdfViewerOpen && (
          <div className="bg-white rounded-lg w-[800px] min-h-[89vh] h-[650px] relative flex flex-col shadow-lg ms-3">
            {/* Header Section */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {taskassigndata.file_data?.name || "File Preview"}
              </h3>
              <button
                onClick={handleClosePreviewModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close File Viewer"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 flex items-center justify-center bg-gray-50">
              {taskassigndata.file_data?.url ? (
                <>
                  {taskassigndata.file_data.type?.startsWith("image/") ||
                  taskassigndata.file_data.type === "application/pdf" ? (
                    <iframe
                      src={taskassigndata.file_data.url}
                      title="File Viewer"
                      className="w-full min-h-full rounded border border-gray-200"
                      style={{ backgroundColor: "white", height: "540px" }}
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        Preview not available for this file type
                      </p>
                      <a
                        href={taskassigndata.file_data.url}
                        download
                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Download File
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-600">File not available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewTaskModal;
