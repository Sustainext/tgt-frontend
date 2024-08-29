"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
// import OrgDetails from "./GRI-Reporting/Org-Details/page";
// import Entities from "./GRI-Reporting/Entities/page";
// import ReportDetails from "./GRI-Reporting/Report-Details/page";
// import Restatement from "./GRI-Reporting/Restatement/page";
// import Assurance from "./GRI-Reporting/Assurance/page";
// import WorkforceEmployees from "./Organization-Details/Workforce-Employees/page"
// import WorkforceOtherWorkers from "./Organization-Details/Workforce-Other-Workers/page"
// import LawAndRegulations from './Compliance/Laws-Regulation/page'
// import BusinessDetails from "./Organization-Details/Business-Details/page"
// import CollectiveBargainingAgreements from "./Collective-Barganing-Agreements/page"
// import MembershipAndAssociation from "./Membership-Association/page"
// import StakeholderEngagement from "./Stakeholder-Engagement/page"

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
const Economic = () => {
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
                  <AccordionItem title="Economic Performance">
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
                              Direct economic value generated & distributed
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
                            Direct economic value generated & distributed
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
                              Financial implications and other risks and
                              opportunities due to climate change
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
                            Financial implications and other risks and
                            opportunities due to climate change
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
                              Defined benefit plan obligations and other
                              retirement plans
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
                            Defined benefit plan obligations and other
                            retirement plans
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
                              Financial assistance received from government
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
                            Financial assistance received from government
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Market Presence">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(5)}
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
                              Ratios of Standard Entry level wage by gender
                              compared to local minimum wage
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
                            Ratios of Standard Entry level wage by gender
                            compared to local minimum wage
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
                              Proportion of senior management hired from the
                              local community
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
                            Proportion of senior management hired from the local
                            community
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Indirect Economic Impacts">
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
                              Infrastructure investments and services supported
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
                            Infrastructure investments and services supported
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
                              Significant indirect economic impacts
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
                            Significant indirect economic impacts
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>

                  <AccordionItem title="Procurement Practices">
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
                              Proportion of spending on local suppliers
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
                            Proportion of spending on local suppliers
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>

                  <AccordionItem title="Anti Corruption">
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
                          className={`${
                            activeStep === 10
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
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
                              Operations assessed for risks related to
                              corruption
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
                            Operations assessed for risks related to corruption
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
                          className={`${
                            activeStep === 11
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
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
                              Communication and training about anti-corruption
                              policies and procedures
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
                            Communication and training about anti-corruption
                            policies and procedures
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
                              Confirmed incidents of corruption and actions
                              taken
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
                            Confirmed incidents of corruption and actions taken
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Legal Actions">
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
                          className={`${
                            activeStep === 13
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
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
                        {isStepCompleted(13) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Public legal cases regarding corruption
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
                            Public legal cases regarding corruption
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
                            className={`${
                              activeStep === 14
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
                              Anti Competitive Behavior
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
                            Anti Competitive Behavior
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Tax">
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
                              Approach to tax
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
                            Approach to tax
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
                            activeStep === 16
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 16
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
                              Tax governance, control, and risk management
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 16
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Tax governance, control, and risk management
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(17)}
                    >
                      {isStepCompleted(17) ? (
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
                            activeStep === 17
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
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
                              Stakeholder engagement and management of concerns
                              related to tax
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
                            Stakeholder engagement and management of concerns
                            related to tax
                          </p>
                        )}
                      </div>
                    </li>
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
                              activeStep === 18
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
                              Country-by-country reporting
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
                            Country-by-country reporting
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                </ul>
              </div>
            </section>
          </div>
          {/* <div className="w-full ms-3">
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
                {activeStep === 6 && (
                <>
                  <div>
                    <BusinessDetails />
                  </div>
                </>
              )}
                 {activeStep === 7 && (
                <>
                  <div>
                    <WorkforceEmployees />
                  </div>
                </>
              )}
                  {activeStep === 8 && (
                <>
                  <div>
                    <WorkforceOtherWorkers />
                  </div>
                </>
              )}
               {activeStep === 9 && (
                <>
                  <div>
                    <LawAndRegulations />
                  </div>
                </>
              )}
              {activeStep === 10 && (
                <>
                  <div>
                    <MembershipAndAssociation />
                  </div>
                </>
              )}
                {activeStep === 11 && (
                <>
                  <div>
                    <StakeholderEngagement />
                  </div>
                </>
              )}
               {activeStep === 12 && (
                <>
                  <div>
                    <CollectiveBargainingAgreements />
                  </div>
                </>
              )}
            </div>
           
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Economic;
