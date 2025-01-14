import React from "react";
import { FiCircle, FiTrash2 } from "react-icons/fi";
import Moment from "react-moment";

const GoalsTable = ({
  tasks,
  activeTab,
  setActiveTab,
  handleCompleted,
  handleDelete,
  handleReviewTask,
  getStatusBadgeClasses,
  getStatusLabel,
}) => {
  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "overdue", label: "Overdue" },
    { id: "completed", label: "Completed" },
    { id: "forreview", label: "For Review" },
  ];

  return (
    <>
      <div className="mb-4">
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
      </div>

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
                      <>
                        <div
                          className="flex justify-between border-b border-[#ebeced] pb-2"
                          key={task.id}
                        >
                          <div className="flex cursor-pointer">
                            <div
                              className={`w-72 truncate whitespace-nowrap text-[#007eef] text-[13px] font-normal leading-none ml-3`}
                            >
                              {task.roles === 1 || task.roles === 2 ? (
                                <p
                                  className="py-1 cursor-pointer"
                                  onClick={() => handleReviewTask(task)}
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
                                  <span
                                    className={`
                                      inline-flex items-center px-2.5 py-0.5 rounded-md text-sm
                    \                    `}
                                  >
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
                            <div className="w-[18px] cursor-pointer ">
                              {task.roles === 3 && (
                                <FiTrash2
                                  onClick={() => handleDelete(task.id)}
                                />
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

        {/* Other tabs */}
        {/* ... */}
      </div>
    </>
  );
};

export default GoalsTable;
