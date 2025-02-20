"use client";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { IoIosWarning } from "react-icons/io";
import { MdAdd,MdOutlineAssignment } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuMoveLeft } from "react-icons/lu";

const CreateAssessmentModal = ({ isModalOpen, setIsModalOpen,setActiveTab }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentName, setAssessmentName] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const [stakeholderGroups, setStakeholderGroups] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [validationError, setValidationError] = useState(false);

  const forms = [
    // "Form A",
    // "Form B"
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = [
    // "Stakeholder Groups",
    // "Stakeholder Groups 2",
    // "Stakeholder Groups 3",
    // "Stakeholder Groups 4",
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    if (stakeholderGroups.includes(option)) {
      setStakeholderGroups(stakeholderGroups.filter((item) => item !== option));
    } else {
      setStakeholderGroups([...stakeholderGroups, option]);
    }
  };

  const handleRemoveOption = (option) => {
    setStakeholderGroups(stakeholderGroups.filter((item) => item !== option));
  };

  useEffect(() => {
    if (forms.length == 0) {
      setValidationError(true);
    }
  }, [forms]);

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedForm || stakeholderGroups.length === 0) {
        setValidationError(true);
        return;
      }
      setValidationError(false);
      setCurrentStep(2);
    }
    // else if (currentStep === 2) {
    //   setCurrentStep(3);
    // }
  };

  const handleSend = () => {
    setCurrentStep(3); // Final step: Assessment Sent
  };

  const resetModal = () => {
    setAssessmentName("");
    setSelectedForm("");
    setStakeholderGroups([]);
    setDueDate("");
    setValidationError(false);
    setCurrentStep(1);
    setIsModalOpen(false);
  };

  //    useEffect(() => {
  //           const handleClickOutside = (event) => {
  //             if (!event.target.closest(".multiSelect")) {
  //                 setDropdownOpen(false);
  //             }
  //           };
  //           document.addEventListener("mousedown", handleClickOutside);
  //           return () => document.removeEventListener("mousedown", handleClickOutside);
  //         }, []);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-50 mt-12">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[30%] max-w-3xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className={`flex ${currentStep == 2 || 3 ? "gap-4" : ""}`}>
                {currentStep === 2 ? (
                  // Step 2: Show left icon
                  <LuMoveLeft
                    onClick={() => {
                      setCurrentStep(1);
                    }}
                    className="w-5 cursor-pointer h-5 mt-1 text-[#101828]"
                  />
                ) : currentStep === 3 ? (
                  // Step 3: Show SVG
                  <div className="mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M10 0.364746C15.5228 0.364746 20 4.8419 20 10.3647C20 15.8876 15.5228 20.3647 10 20.3647C4.47715 20.3647 0 15.8876 0 10.3647C0 4.8419 4.47715 0.364746 10 0.364746ZM14.198 7.4228C13.9811 7.20585 13.6443 7.18174 13.4007 7.35048L13.3141 7.4228L8.75 11.9872L6.69194 9.92889L6.60538 9.85657C6.3618 9.68783 6.02502 9.71193 5.80806 9.92889C5.5911 10.1458 5.56699 10.4826 5.73574 10.7262L5.80806 10.8128L8.30806 13.3128L8.39462 13.3851C8.60775 13.5327 8.89225 13.5327 9.10538 13.3851L9.19194 13.3128L14.198 8.30669L14.2703 8.22013C14.4391 7.97654 14.415 7.63976 14.198 7.4228Z"
                        fill="#54B054"
                      />
                    </svg>
                  </div>
                ) : null}

                <h2 className="text-black text-[18px] font-bold">
                  {currentStep === 1 && "Create New Assessment"}
                  {currentStep === 2 && "Confirm Sending Assessment"}
                  {currentStep === 3 && "Assessment Sent"}
                </h2>
              </div>

              <button
                className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                onClick={resetModal}
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

            {/* Step 1: Create Assessment */}
            {currentStep === 1 && (
              <>
                {validationError && (
                  <div className="bg-[#f988450d] p-3 rounded-md mb-4 flex gap-4">
                    <IoIosWarning className="w-5 h-5 text-[#F98845]" />
                    <div>
                      <p className="text-[#0D024D] text-[14px] font-semibold">
                        Cannot Send Assessment
                      </p>
                      <p className="text-[#051833] text-[13px]">
                        To send assessments we need to have the following:
                        <ul className="mt-1">
                          <li>1. One Form</li>
                          <li>
                            2. One Stakeholder Group with at least one
                            Stakeholder in it.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                )}
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="assessmentName"
                      className="block text-[14px] font-medium text-[#344054]"
                    >
                      Assessment Name
                    </label>
                    <input
                      type="text"
                      id="assessmentName"
                      value={assessmentName}
                      onChange={(e) => setAssessmentName(e.target.value)}
                      placeholder="Enter name"
                      className="mt-1 block px-3 py-3 w-full rounded-md border border-gray-300 text-sm"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="selectForm"
                      className="block text-[14px] font-medium text-[#344054]"
                    >
                      Select Form
                    </label>
                    <select
                      id="selectForm"
                      value={selectedForm}
                      onChange={(e) => setSelectedForm(e.target.value)}
                      className={`mt-1 block px-3 py-3 w-full rounded-md  text-sm ${
                        forms.length > 0
                          ? "border border-gray-300"
                          : "border border-red-500"
                      }`}
                      required
                    >
                      {forms.length > 0 ? (
                        <option value="" disabled>
                          Select a form
                        </option>
                      ) : (
                        <option value="" disabled>
                          -- No Forms Available --
                        </option>
                      )}

                      {forms.map((form, index) => (
                        <option key={index} value={form}>
                          {form}
                        </option>
                      ))}
                    </select>
                    {forms.length > 0 ? (
                      <div></div>
                    ) : (
                      <div className="mt-2 flex gap-1 cursor-pointer ml-1" onClick={()=>{setIsModalOpen(false);setActiveTab('tab2')}}>
                        <MdAdd className="text-[#007EEF]" />
                        <p className="text-[12px] text-[#007EEF]">
                          {" "}
                          Create New Form
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="relative w-full  mb-4">
                    {/* Input Field */}
                    <label
                      htmlFor="selectForm"
                      className="block text-[14px] font-medium text-[#344054] mb-1"
                    >
                      Select Stakeholder Groups
                    </label>
                    <div
                      className={`flex items-center justify-between px-3 py-3 w-full ${
                        options.length > 0
                          ? "border border-gray-300"
                          : "border border-red-500"
                      } rounded-md cursor-pointer`}
                      onClick={toggleDropdown}
                    >
                      <div className="flex flex-wrap gap-2">
                        {stakeholderGroups.slice(0, 2).map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center font-semibold bg-[#007eef0d] px-2 py-1 rounded-md text-sm text-[#0057A5]"
                          >
                            {option}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveOption(option);
                              }}
                              className="ml-2 text-gray-600 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        {stakeholderGroups.length > 2 && (
                          <div className="text-sm text-[#0057A5]">
                            +{stakeholderGroups.length - 2} more
                          </div>
                        )}
                      </div>
                      <svg
                        className={`w-4 h-4 transform ${
                          dropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {options.length > 0 ? (
                      <div></div>
                    ) : (
                      <div className="mt-2 flex gap-1 cursor-pointer ml-1" onClick={()=>{setIsModalOpen(false);setActiveTab('tab3')}}>
                        <MdAdd className="text-[#007EEF]" />
                        <p className="text-[12px] text-[#007EEF]">
                          {" "}
                          Create New Stakeholder Group
                        </p>
                      </div>
                    )}

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute multiSelect z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {options.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                              stakeholderGroups.includes(option)
                                ? "bg-gray-100"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={stakeholderGroups.includes(option)}
                              onChange={() => handleOptionClick(option)}
                              className="h-4 w-4 accent-blue-500 mr-2"
                            />
                            <span className="text-sm text-gray-700">
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="dueDate"
                      className="block text-[14px] font-medium text-[#344054]"
                    >
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="mt-1 block px-3 py-3 w-full rounded-md border border-gray-300 text-sm"
                      required
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-600"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Step 2: Confirmation */}
            {currentStep === 2 && (
              <div>
                <div className="p-3 bg bg-[#F1F7FF] flex gap-2 rounded-md">
                  <IoIosInformationCircleOutline className="w-10 h-10 text-[#197AFF] my-2 -mt-2" />
                  <p className="text-[13px] text-[#051833]">
                    This Assessment will be sent by mail to all the Stakeholders
                    under the selected stakeholder groups. Confirm if the
                    details are correct and click send to proceed.
                  </p>
                </div>

                <div className="p-3 w-full">
                  <div className="border-t border-gray-300 mb-4 mt-2"></div>
                  <p className="flex gap-2 mb-1">
                    <span className="text-[#344054] text-[14px] font-semibold">
                      Assessment Name:
                    </span>{" "}
                    <p className="text-[#667085] text-[14px]">
                      {assessmentName}
                    </p>
                  </p>
                  <p className="flex gap-2 mb-1">
                    <span className="text-[#344054] text-[14px] font-semibold">
                      Form Name:
                    </span>{" "}
                    <p className="text-[#667085] text-[14px]">{selectedForm}</p>
                  </p>
                  <p className="flex gap-2 mb-1">
                    <span className="text-[#344054] text-[14px] font-semibold w-[156px]">
                      Stakeholders Selected:
                    </span>{" "}
                    <div className="flex flex-wrap gap-1">
                    {stakeholderGroups.map((val)=>(
                        <p className="text-[13px] mb-2.5 w-fit font-semibold bg-blue-50 text-[#0057A5] p-1 px-2 rounded-md -mt-1">
                      {val}
                        </p>
                    ))}
                    </div>

                    
                    
                  </p>
                  <p className="flex gap-2 mb-1">
                    <span className="text-[#344054] text-[14px] font-semibold">
                      Due Date:
                    </span>{" "}
                    <p className="text-[#667085] text-[14px]">{dueDate}</p>
                  </p>
                  <div className="border-b border-gray-300 mb-2 mt-4"></div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    onClick={handleSend}
                    className="bg-blue-500 flex gap-2 text-white px-5 py-2 rounded-md hover:bg-blue-600"
                  >
                    <MdOutlineAssignment className="text-white w-5 h-5 mt-0.5"/>
                    Send Assessment to the Stakeholders {">"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {currentStep === 3 && (
              <div>
                <p className="text-[14px] text-[#667085] ml-9 mb-2">
                  Assessment has been sent to all the Stakeholders under the
                  selected stakeholder groups.
                </p>
                <div className="border-b border-gray-300 my-3"></div>
                <div className="p-3 w-full">
                  <p className="flex gap-2 mb-1">
                    <span className="text-[#344054] text-[14px] font-semibold">
                      Assessment Name:
                    </span>{" "}
                    <p className="text-[#667085] text-[14px]">
                      {assessmentName}
                    </p>
                  </p>
                  <p className="flex gap-2 mb-1">
                    <span className="text-[#344054] text-[14px] font-semibold">
                      Form Name:
                    </span>{" "}
                    <p className="text-[#667085] text-[14px]">{selectedForm}</p>
                  </p>
                  <p className="flex gap-2 mb-1">
                    <span className="text-[#344054] text-[14px] font-semibold w-[156px]">
                      Stakeholders Selected:
                    </span>{" "}
                    <div className="flex flex-wrap gap-1">
                    {stakeholderGroups.map((val)=>(
                        <p className="text-[13px] mb-2 w-fit font-semibold bg-blue-50 text-[#0057A5] p-1 px-2 rounded-md -mt-1">
                      {val}
                        </p>
                    ))}
                    </div>
                  </p>
                  <p className="flex gap-2 mb-1">
                    <span className="text-[#344054] text-[14px] font-semibold">
                      Due Date:
                    </span>{" "}
                    <p className="text-[#667085] text-[14px]">{dueDate}</p>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAssessmentModal;
