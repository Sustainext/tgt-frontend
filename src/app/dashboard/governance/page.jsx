"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import BoardInfo from "./Board-info/Structure/page";
import ManagementImpact from "./Board-Involvement-Sustainability/Management-Impact/page";
import DelegationResponsibility from "./Board-Involvement-Sustainability/Delegation-Responsibility/page";
import SustainabilityReporting from "./Board-Involvement-Sustainability/Sustainability-Reporting/page";
import ConflictInterest from "./Governances/Conflict-Interest/page";
import NominationAndSelection from "./Board-info/Nomination-and-selection/page";
import ChairOfBoard from "./Board-info/Chair-of-board/page";
import Criticalconcerns from "./Governances/Critical-Concerns/page";
import SustainabilityKnowledge from "./Performance-renumerations/Sustainability-Knowledge/page";
import SustainabilityStrategyPage from "./Sustainability-strategy/page";
import ManagingConcerns from "./Managing-concerns/page";
import PerformanceEvaluations from "./Performance-renumerations/Performance-evaluations/page";
import Remuneration from "./Performance-renumerations/Remuneration/page";
import Remediation from "./Remediation/page"
import CompensationRatio from './Performance-renumerations/compensation-ratio/page'
import DetermineRemuneration from "./Performance-renumerations/Determine-remuneration/page";
import PolicyCommitments from "./Policy/Policy-Commitments/page"
import ImplementingCommitments from "./Policy/Implementing-commitments/page";
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
const Governance = () => {
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
                  <AccordionItem title="Board Info">
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
                              Structure
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
                            Structure
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
                              Nomination and Selection
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
                            Nomination and Selection
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
                              Chair of Board
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
                            Chair of Board
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Board Involvement in Sustainability">
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
                              Management of Impact
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
                            Management of Impact
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
                            activeStep === 5
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
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
                              Delegation of Responsibility
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
                            Delegation of Responsibility
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(6)}
                    >
                      {isStepCompleted(6) ? (
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
                              Sustainability Reporting
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
                            Sustainability Reporting
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Governance">
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
                              Conflict of Interest
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
                            Conflict of Interest
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
                              Critical Concerns
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
                            Critical Concerns
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Performance and Renumerations">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(9)}
                    >
                      {isStepCompleted(9) ? (
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
                          className={`${activeStep === 9
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 9
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
                              Conflict of Interest
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 7
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Sustainability Knowledge
                          </p>
                        )}
                      </div>
                    </li>
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
                            className={`${activeStep === 10
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
                              Performance Evaluations
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 10
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Performance Evaluations
                          </p>
                        )}
                      </div>
                    </li>
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
                            className={`${activeStep === 11
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
                              Critical Concerns
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 11
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Remuneration
                          </p>
                        )}
                      </div>
                    </li><li
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
                            className={`${activeStep === 12
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
                              Determine Remuneration
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 12
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Determine Remuneration
                          </p>
                        )}
                      </div>
                    </li><li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(13)}
                    >
                      {isStepCompleted(13) ? (
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
                            className={`${activeStep === 13
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
                        {isStepCompleted(13) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Compensation Ratio
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 13
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Compensation Ratio
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Sustainability Strategy">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(14)}
                    >
                      {isStepCompleted(14) ? (
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
                              activeStep === 13
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
                        {isStepCompleted(14) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Sustainability Strategy
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 14
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Sustainability Strategy
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>

                  <AccordionItem title="Policy">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(15)}
                    >
                      {isStepCompleted(15) ? (
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
                            activeStep === 15
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 15
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
                        {isStepCompleted(15) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                            Policy Commitments
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 15
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                         Policy Commitments
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(16)}
                    >
                      {isStepCompleted(16) ? (
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
                        {isStepCompleted(16) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Implementing Commitments
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 13
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Implementing Commitments
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Remediation">
                  <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(17)}
                    >
                      {isStepCompleted(17) ? (
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
                              activeStep === 17
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
                        {isStepCompleted(17) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                            Process
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 17
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                      Process
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Managing Concerns">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(18)}
                    >
                      {isStepCompleted(18) ? (
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
                              activeStep === 13
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
                        {isStepCompleted(18) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Advice & Concerns
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 18
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Advice & Concerns
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
                    <BoardInfo />{" "}
                  </div>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <div>
                    <NominationAndSelection />{" "}
                  </div>
                </>
              )}
              {activeStep === 3 && (
                <>
                  <div>
                    <ChairOfBoard />{" "}
                  </div>
                </>
              )}
              {activeStep === 4 && (
                <>
                  <div>
                    <ManagementImpact />{" "}
                  </div>
                </>
              )}
              {activeStep === 5 && (
                <>
                  <div>
                    <DelegationResponsibility />{" "}
                  </div>
                </>
              )}
              {activeStep === 6 && (
                <>
                  <div>
                    <SustainabilityReporting />{" "}
                  </div>
                </>
              )}
              {activeStep === 7 && (
                <>
                  <div>
                    <ConflictInterest />{" "}
                  </div>
                </>
              )}
              {activeStep === 8 && (
                <>
                  <div>
                    <Criticalconcerns />{" "}
                  </div>
                </>
              )}
              {activeStep === 9 && (
                <>
                  <div>
                    <SustainabilityKnowledge />{" "}
                  </div>
                </>
              )}
              {activeStep === 10 && (
                <>
                  <div>
                    <PerformanceEvaluations />{" "}
                  </div>
                </>
              )}
              {activeStep === 11 && (
                <>
                  <div>
                    <Remuneration />{" "}
                  </div>
                </>
              )}
              {activeStep === 12 && (
                <>
                  <div><DetermineRemuneration/> </div>
                </>
              )}
              {activeStep === 13 && (
                <>
                  <div><CompensationRatio/> </div>
                </>
              )}
              {activeStep === 14 && (
                <>
                  <div>
                    <SustainabilityStrategyPage />{" "}
                  </div>
                </>
              )}
                 {activeStep === 15 && (
                <>
                  <div>
                    <PolicyCommitments />{" "}
                  </div>
                </>
              )}
              {activeStep === 16 && (
                <>
                  <div>
                    <ImplementingCommitments />{" "}
                  </div>
                </>
              )}
                 {activeStep === 17 && (
                <>
                  <div>
                    <Remediation />{" "}
                  </div>
                </>
              )}
              {activeStep === 18 && (
                <>
                  <div>
                    <ManagingConcerns />{" "}
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

export default Governance;
