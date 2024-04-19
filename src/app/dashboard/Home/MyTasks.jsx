'use client'
import { useState } from "react";
import { MdAddTask, MdAdd } from "react-icons/md";
const MyTasks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("upcoming");
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>


            <div className="rounded-lg shadow border border-gray-200 p-4 h-[320px] ">
                <div className="flex justify-between mb-4">
                    <div className="text-neutral-800 text-[15px] font-bold leading-tight">
                        My Goals
                    </div>

                    <div
                        className="text-sky-600 text-[10px] cursor-pointer font-normal leading-[13px] flex items-center me-2 space-x-2"
                        onClick={handleOpenModal}
                    >
                        <MdAdd style={{ fontSize: "18px" }} />
                        <span>Add Tasks</span>
                    </div>
                </div>
                <div>
                    <div className={`flex my-6 border-b text-sm text-start`}>
                        <button
                            className={`pr-2 py-1 rounded-b-none text-xs font-bold leading-[15px] ${activeTab === "upcoming"
                                    ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                                    : "border-transparent text-neutral-500"
                                }`}
                            onClick={() => setActiveTab("upcoming")}
                        >
                            Upcoming
                        </button>
                        <button
                            className={`px-4 py-1 rounded-b-none text-xs font-bold leading-[15px] ${activeTab === "overdue"
                                    ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                                    : "border-transparent text-neutral-500"
                                }`}
                            onClick={() => setActiveTab("overdue")}
                        >
                            Overdue
                        </button>
                        <button
                            className={`px-4 py-1 rounded-b-none text-xs font-bold leading-[15px] ${activeTab === "completed"
                                    ? "border-b-2 border-[#1aaef4] text-[#1aaef4]"
                                    : "border-transparent text-neutral-500"
                                }`}
                            onClick={() => setActiveTab("completed")}
                        >
                            Completed
                        </button>
                    </div>

                    <div className="p-4 h-[188px]">
                        {activeTab === "upcoming" && (
                            <div>

                                <div className="justify-center items-center ">
                                    <div className="flex justify-center items-center pb-5">
                                        <MdAddTask className="text-[#ACACAC] text-[36px]"

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
                                            Add a Tasks
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )}

                        {activeTab === "overdue" && (
                            <div>

                                <div className="h-screen justify-center items-center ">
                                    <h4 className="text-center">No data found</h4>
                                </div>

                            </div>
                        )}
                        {activeTab === "completed" && (
                            <div>

                                <div className="h-screen justify-center items-center ">
                                    <h4 className="text-center">No data found</h4>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
                <div className="px-[5px] py-1 rounded flex-col justify-center items-center inline-flex">
                    <div className="justify-center items-center gap-2 inline-flex">
                        <div className="h-[18px] flex-col justify-center items-center inline-flex">
                            <div className="w-[18px] h-[18px] relative flex-col justify-start items-start flex" />
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay z-50">
                    <div className="modal-center">
                        <div className="modal-content">
                            <div className="flex justify-between items-center drop-shadow-lg border-b-2 py-6 w-full">
                                <h2 className="self-stretch text-black text-opacity-90 text-[22px] font-normal leading-relaxed flex space-x-8 items-center ms-6">
                                    <span>Add Tasks</span>
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
                                        <form className="w-full text-left">
                                            <div className="mr-2 mb-4 w-[101%]">
                                                <label
                                                    htmlFor="cname"
                                                    className="block text-neutral-800 text-[13px] font-normal"
                                                >
                                                    Tasks Title
                                                </label>

                                                <div className="mt-2 mr-2">
                                                    <input
                                                        id="title"
                                                        title="title"
                                                        type="text"
                                                        name="title"
                                                        autoComplete="off"
                                                        required
                                                        placeholder="Enter Goal Title"

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
                                                                title="deadline" // Use name instead of title
                                                                type="date"
                                                                name="deadline"
                                                                autoComplete="off"

                                                                required
                                                                className="block w-full px-1 rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-span-2 mb-4 flex-1">
                    <div className="mr-2">
                      <label
                        htmlFor="sdate"
                        className="block text-neutral-800 text-[13px] font-normal"
                      >
                        Assign To
                      </label>
                      <div className="mt-2 ">
                        <select
                          className="block w-full rounded-md border-0 py-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          name="Reporttype"
                          placeholder="Enter the Goals Deadline"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled selected>
                            Enter the Goals Deadline
                          </option>
                          <option>GHG Accounting Report</option>
                          <option>GRI</option>
                          <option>TCFD</option>
                          <option>SASB</option>
                          <option>BRSR</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                                            </div>
                                            <div className="flex justify-center mt-5">
                                                <input
                                                    type="submit"
                                                    value="Save"
                                                    className="w-[30%] h-[31px]  px-[22px] py-2 bg-blue-500 text-white rounded shadow flex-col justify-center items-center inline-flex cursor-pointer"
                                                // onClick={handleSave}
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

        </>
    );
}

export default MyTasks;
