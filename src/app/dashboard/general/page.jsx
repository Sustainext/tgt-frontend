"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import OrgDetails from "./GRI-Reporting/Org-Details/page";
import Entities from "./GRI-Reporting/Entities/page";
import ReportDetails from "./GRI-Reporting/Report-Details/page";
import Restatement from "./GRI-Reporting/Restatement/page";
import Assurance from "./GRI-Reporting/Assurance/page"
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cursor-pointe w-full">
      <button
        className="w-full text-left flex mt-4 mb-4 justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h5 className="text-[13px] font-bold text-gray-500 pt-1">{title}</h5>
        </div>

        <div className="mt-1">
          {" "}
          <span>
            <MdKeyboardArrowDown
              className={`text-2xl ${isOpen ? "rotate-180" : ""}`}
            />
          </span>
        </div>
      </button>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};
const General = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const activeSteps = (id) => {
    setActiveStep(id);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    setCompletedSteps([...completedSteps, activeStep]);
  };

  // Function to handle "Previous" button click
  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
    // Remove the previous step from completedSteps
    setCompletedSteps((prevCompletedSteps) =>
      prevCompletedSteps.filter((step) => step !== activeStep - 1)
    );
  };

  // Function to check if a step is completed
  const isStepCompleted = (stepNumber) => {
    return completedSteps.includes(stepNumber);
  };

  return (
    <>
      <div>
        <div className="flex">
          <div className="bg-white my-div mt-2 items-start px-3  w-[200px] min-h-[85vh] ml-3 socialscreen-scroll shadow-md">
            <section className="flex  justify-center ">
              <div className="w-80">
                <ul>
                  <AccordionItem title="GRI Reporting info">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(1)}
                    >
                      {isStepCompleted(1) ? (
                        <>
                          <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`${
                            activeStep === 1
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 1
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(1) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Org Details
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 1
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Org Details
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(2)}
                    >
                      {isStepCompleted(2) ? (
                        <>
                          <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`${
                            activeStep === 2
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 2
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(2) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Entities
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 2
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Entities
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(3)}
                    >
                      {isStepCompleted(3) ? (
                        <>
                          <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`${
                            activeStep === 3
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 3
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(3) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Report Details
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 3
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Report Details
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(4)}
                    >
                      {isStepCompleted(4) ? (
                        <>
                          <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`${
                            activeStep === 4
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 4
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(4) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Restatement
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 4
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Restatement
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(5)}
                    >
                      {isStepCompleted(5) ? (
                        <>
                          <div className=" before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 5
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(5) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Assurance
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 5
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Assurance
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Organization Details">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(6)}
                    >
                      {isStepCompleted(6) ? (
                        <>
                          <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`${
                            activeStep === 6
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 6
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(6) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Business Details
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 6
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Business Details
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(7)}
                    >
                      {isStepCompleted(7) ? (
                        <>
                          <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`${
                            activeStep === 7
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 7
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(7) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Workforce-Employees
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 7
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Workforce-Employees
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(8)}
                    >
                      {isStepCompleted(8) ? (
                        <>
                          <div className="before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 8
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(8) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Workforce-Other Workers
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 8
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Workforce-Other Workers
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Compliance">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(9)}
                    >
                      {isStepCompleted(9) ? (
                        <>
                          <div className="before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 9
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(9) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Laws and Regulation
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 9
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Laws and Regulation
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>

                  <AccordionItem title="Membership & Association">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(10)}
                    >
                      {isStepCompleted(10) ? (
                        <>
                          <div className="before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 10
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(10) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Membership & Association
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 10
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Membership & Association
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>

                  <AccordionItem title="Stakeholder Engagement">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(11)}
                    >
                      {isStepCompleted(11) ? (
                        <>
                          <div className="before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 11
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(11) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Stakeholder Engagement
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 11
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Stakeholder Engagement
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Collective Bargaining Agreements">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(12)}
                    >
                      {isStepCompleted(12) ? (
                        <>
                          <div className="before:bg-sky-800  font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              className="bi bi-circle-fill fill-sky-800  font-bold "
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 12
                                ? "bi bi-circle-fill fill-sky-800  font-bold "
                                : " bi bi-circle-fill fill-gray-400"
                            } `}
                            viewBox="0 0 16 16"
                          >
                            <circle cx="8" cy="8" r="8" />
                          </svg>
                        </div>
                      )}

                      <div className="flex items-center">
                        {isStepCompleted(12) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Collective Bargaining Agreements
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 12
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Collective Bargaining Agreements
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                </ul>
              </div>
            </section>
          </div>
          <div className="w-full ms-3">
            <div>
              {activeStep === 1 && (
                <>
                  <div>
                    <OrgDetails />
                  </div>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <div>
                    <Entities />
                  </div>
                </>
              )}
              {activeStep === 3 && (
                <>
                  <div>
                    <ReportDetails />
                  </div>
                </>
              )}{" "}
              {activeStep === 4 && (
                <>
                  <div>
                    <Restatement />
                  </div>
                </>
              )}
               {activeStep === 5 && (
                <>
                  <div>
                    <Assurance />
                  </div>
                </>
              )}
            </div>
            {/* <div>
              <div className="w-full mb-5">
                <div className="absolute right-5">
                  <div className="flex  me-2  mb-5">
                    <button
                      className={`${
                        activeStep === 1 ? "text-gray-500" : "text-blue-500"
                      } px-3 py-1.5 rounded font-bold `}
                      onClick={handlePrevious}
                      disabled={activeStep === 1}
                    >
                      &lt; Previous
                    </button>

                    {activeStep < 38 && (
                      <button
                        className={`${
                          activeStep === 38
                            ? "bg-gray-300"
                            : "bg-blue-500 text-white"
                        } px-3 py-1.5 rounded ml-2 font-bold w-[100px]`}
                        onClick={handleNext}
                        disabled={activeStep === 38}
                      >
                        Next &gt;
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default General;
