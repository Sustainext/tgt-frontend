import { useState } from "react";

const TaskReviewModal = ({
  isOpen,
  onClose,
  task,
  onReview,
  onFileUpload,
  onActivitySelect,
  activitiesList,
  isSearching,
  users,
}) => {
  const [reviewType, setReviewType] = useState(null);
  const [comments, setComments] = useState("");
  const [newDate, setNewDate] = useState("");
  const [reassignTo, setReassignTo] = useState("");
  const [showFilePreview, setShowFilePreview] = useState(false);

  if (!isOpen || !task) return null;

  const handleSubmit = async () => {
    let reviewData = {};

    switch (reviewType) {
      case "approve":
        reviewData = { task_status: "approved" };
        break;
      case "reject":
        if (!newDate || !comments) {
          toast.error("Please fill in all fields");
          return;
        }
        reviewData = {
          task_status: "reject",
          deadline: newDate,
          comments,
          file_data: {},
          value1: "",
          value2: "",
          unit1: "",
          unit2: "",
        };
        break;
      case "reassign":
        if (!newDate || !reassignTo) {
          toast.error("Please fill in all fields");
          return;
        }
        reviewData = {
          task_status: "in_progress",
          assigned_to: parseInt(reassignTo),
          deadline: newDate,
          comments,
          file_data: {},
          value1: "",
          value2: "",
          unit1: "",
          unit2: "",
        };
        break;
      default:
        return;
    }

    await onReview(task.id, reviewType, reviewData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[395px] h-[650px] overflow-y-auto scrollable-content">
        <div className="flex justify-between items-center mb-5">
          <h5 className="text-lg font-bold">Review Task</h5>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Task Details Section */}
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <div>
              <h6 className="text-gray-500 text-sm">Assigned to</h6>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                <div>
                  <p className="text-sm">{task.assign_to_user_name}</p>
                  <p className="text-gray-500 text-xs">
                    {task.assign_to_email}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-gray-500 text-sm">Due date</h6>
              <p>
                <Moment format="DD/MM/YYYY">{task.deadline}</Moment>
              </p>
            </div>
          </div>

          {/* File Section */}
          {task.file_data?.url && (
            <div className="border rounded p-3 mb-4">
              <h6 className="text-sm mb-2">Attachment</h6>
              <div className="flex items-center">
                <FiFile className="text-green-600 mr-2" />
                <div>
                  <button
                    onClick={() => setShowFilePreview(true)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {task.file_data.name}
                  </button>
                  <p className="text-gray-500 text-xs">
                    {(task.file_data.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => setReviewType("approve")}
              className={`p-2 rounded-md text-sm ${
                reviewType === "approve"
                  ? "bg-[#54B054] text-white"
                  : "border border-[#54B054] text-[#54B054] hover:bg-green-50"
              }`}
            >
              Approve
            </button>
            <button
              onClick={() => setReviewType("reassign")}
              className={`p-2 rounded-md text-sm ${
                reviewType === "reassign"
                  ? "bg-[#BF9500] text-white"
                  : "border border-[#BF9500] text-[#BF9500] hover:bg-yellow-50"
              }`}
            >
              Reassign
            </button>
            <button
              onClick={() => setReviewType("reject")}
              className={`p-2 rounded-md text-sm ${
                reviewType === "reject"
                  ? "bg-[#D91F11] text-white"
                  : "border border-[#D91F11] text-[#D91F11] hover:bg-red-50"
              }`}
            >
              Reject
            </button>
          </div>

          {/* Review Form */}
          {reviewType && (
            <div className="space-y-4">
              {reviewType === "approve" && (
                <p className="text-center text-sm text-gray-600">
                  Click on submit to approve the task
                </p>
              )}

              {(reviewType === "reject" || reviewType === "reassign") && (
                <>
                  <div>
                    <label className="block text-sm mb-1">New Deadline</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  {reviewType === "reassign" && (
                    <div>
                      <label className="block text-sm mb-1">Assign to</label>
                      <select
                        value={reassignTo}
                        onChange={(e) => setReassignTo(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="">Select user</option>
                        {users?.data?.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm mb-1">Comments</label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md resize-none"
                      placeholder="Add comments..."
                    />
                  </div>
                </>
              )}

              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-[#007EEF] text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* File Preview Modal */}
      {showFilePreview && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[800px] h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">{task.file_data.name}</h3>
              <button
                onClick={() => setShowFilePreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="flex-1 p-4">
              {task.file_data.type?.startsWith("image/") ||
              task.file_data.type === "application/pdf" ? (
                <iframe
                  src={task.file_data.url}
                  className="w-full h-full rounded border"
                  title="File Preview"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskReviewModal;
