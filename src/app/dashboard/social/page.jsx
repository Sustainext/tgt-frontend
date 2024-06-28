'use client'
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import Ohsmanagment from "./OHS/ohs-management/page"
import Riskassessment from "./OHS/risk-assessment/page";
import Ohsservices from "./OHS/ohs-services/page";
import Workinvolvement from "./OHS/work-involvement/page";
import Ohstraining from "./OHS/ohs-training/page";
import Promotionhealth from "./OHS/promotion-health/page"
import Preventionohsimpact from "./OHS/prevention-ohs-Impact/page"
import Ohsmanagementsystemcoverage from "./OHS/ohs-management-system-coverage/page"
import Injuries from "./OHS/Injuries/page"
import Illhealth from "./OHS/ill-health/page"
import Childlabour from "./Human-Rights/child-labour/page";
import Forcedorcompulsorylabour from "./Human-Rights/forced-or-compulsory-labour/page";
import Securitypersonnel from "./Human-Rights/security-personnel/page";
import Parentalleave from "./Employment/Parental-Leave/page";
import Benefits from "./Employment/Benefits/page";
import EmployeeHiresTurnover from "./Employment/Employee-Hires-Turnover/page";
// import Noticeperiod from "./Notice-Period/page";
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
            <MdKeyboardArrowDown className={`text-2xl ${isOpen ? "rotate-180" : ""}`} />
          </span>
        </div>
      </button>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};
const Social = () => {
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

                  <AccordionItem title="Employment">
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
                          className={`${activeStep === 1
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 1
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
                              Employee Hires & Turnover
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 1
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Employee Hires & Turnover
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
                          className={`${activeStep === 2
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 2
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
                              Benefits
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 2
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Benefits
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
                            className={`${activeStep === 3
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
                              Parental Leave
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 3
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Parental Leave
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>

                  {/* <AccordionItem title="Labor Relations">
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
                          className={`${activeStep === 4
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 4
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
                            Notice Period
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 4
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                          Notice Period
                          </p>
                        )}
                      </div>
                    </li>

                  </AccordionItem> */}
                  <AccordionItem title="Occupational health and safety">
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
                          className={`${activeStep === 5
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 5
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
                              OHS Management
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 5
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            OHS Management
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
                          className={`${activeStep === 6
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 6
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
                              Risk Assessment
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 6
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Risk Assessment
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
                          className={`${activeStep === 7
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 7
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
                              OHS Sevices
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 7
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            OHS Sevices
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
                          className={`${activeStep === 8
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 8
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
                              Worker Involvement in OHS
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 8
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Worker Involvement in OHS
                          </p>
                        )}
                      </div>
                    </li>
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
                              OHS Training
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 9
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            OHS Training
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
                          className={`${activeStep === 10
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
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
                              Promotion of Health
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 10
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Promotion of Health
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
                          className={`${activeStep === 11
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
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
                              Prevention of OHS Impact
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 11
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Prevention of OHS Impact
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(12)}
                    >
                      {isStepCompleted(12) ? (
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
                          className={`${activeStep === 12
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
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
                              OHS Management System Coverage
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 12
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            OHS Management System Coverage
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(13)}
                    >
                      {isStepCompleted(13) ? (
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
                          className={`${activeStep === 13
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
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
                              Injuries
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 13
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Injuries
                          </p>
                        )}
                      </div>
                    </li>
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
                            className={`${activeStep === 14
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
                              Ill-health
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 14
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Ill-health
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>


                  <AccordionItem title="Human Rights">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(22)}
                    >
                      {isStepCompleted(22) ? (
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
                          className={`${activeStep === 22
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 22
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
                        {isStepCompleted(22) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Child Labour
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 22
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Child Labour
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(23)}
                    >
                      {isStepCompleted(23) ? (
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
                          className={`${activeStep === 23
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 23
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
                        {isStepCompleted(23) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Forced or Compulsory Labour
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 23
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Forced or Compulsory Labour
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(24)}
                    >
                      {isStepCompleted(24) ? (
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
                            className={`${activeStep === 24
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
                        {isStepCompleted(24) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Security Personnel
                            </p>
                            <img
                              src={doubleicon}
                              className="ml-[0.15rem] h-[17px]"
                              alt="Completed"
                            />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 24
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Security Personnel
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


          {activeStep === 1 && (
              <>
                <div>
                  <EmployeeHiresTurnover />
                </div>
              </>
            )}
          {activeStep === 2 && (
              <>
                <div>
                  <Benefits />
                </div>
              </>
            )}

          {activeStep === 3 && (
              <>
                <div>
                  <Parentalleave />
                </div>
              </>
            )}
                {/* {activeStep === 4 && (
              <>
                <div>
                  <Noticeperiod />
                </div>
              </>
            )} */}
            {activeStep === 5 && (
              <>
                <div>
                  <Ohsmanagment />
                </div>
              </>
            )}
            {activeStep === 6 && (
              <>
                <div>
                  <Riskassessment />
                </div>
              </>
            )}
            {activeStep === 7 && (
              <>
                <div>
                  <Ohsservices />
                </div>
              </>
            )}
            {activeStep === 8 && (
              <>
                <div>
                  <Workinvolvement />
                </div>
              </>
            )}
            {activeStep === 9 && (
              <>
                <div>
                  <Ohstraining />
                </div>
              </>
            )}
            {activeStep === 10 && (
              <>
                <div>
                  <Promotionhealth />
                </div>
              </>
            )}
            {activeStep === 11 && (
              <>
                <div>
                  <Preventionohsimpact />
                </div>
              </>
            )}
            {activeStep === 12 && (
              <>
                <div>
                  <Ohsmanagementsystemcoverage />
                </div>
              </>
            )}
            {activeStep === 13 && (
              <>
                <div>
                  <Injuries />
                </div>
              </>
            )}
            {activeStep === 14 && (
              <>
                <div>
                  <Illhealth />
                </div>
              </>
            )}
            {activeStep === 22 && (
              <>
                <div>
                  <Childlabour />
                </div>
              </>
            )}
            {activeStep === 23 && (
              <>
                <div>
                  <Forcedorcompulsorylabour />
                </div>
              </>
            )}
                 {activeStep === 24 && (
              <>
                <div>
                  <Securitypersonnel />
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
