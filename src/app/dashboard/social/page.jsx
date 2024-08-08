'use client'
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
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
import EmployeeHiresTurnover from "./Employment/Employee-Hires-Turnover/page"
import Noticeperiod from "./Notice-Period/page";
import Skillupgrade from "./Training/skill-upgrade/page";
import Suppliersscreened from "./Supplier-social-assessment/Suppliers-screened/page"
import Impactsactionstaken from "./Supplier-social-assessment/Impacts-actions-taken/page"
import DiversityBoard from "./Diversity-Inclusion/Diversity-Board/page"
import Salaryratio from "./Diversity-Inclusion/Salary-ratio/page"
import Traininghours from "./Training/Training-hours/page"
import Performancedevelopment from "./Training/Performance-development/page"
import IncidentsofDiscrimination from "./Non-Discrimination/Incidents-of-Discrimination/page"
import CollectiveBargaining from "./Collective-Bargaining/page"
import IndigenousPeople from "./Indigenous-People/page"
import CommunityEngagement from "./Community-Development/Community-Engagement/page"
import ImpactonCommunity from "./Community-Development/Impact-on-Community/page"
import PoliticalInvolvement from "./Political-Involvement/page"
import ProductServiceSafety from "./Customer-Health-Safety/Product-Service-Safety/page"
import Compliance from "./Customer-Health-Safety/Compliance/page"
import CustomerPrivacy from "./Customer-Privacy/page"
import ProductServicelabelling from "./Marketing-Labeling/Product-Service-labelling/page"
import NoncomplianceincidentsLabelling from "./Marketing-Labeling/Non-compliance-incidents-Labelling/page"
import StatementnoncomplianceLabeling from "./Marketing-Labeling/Statement-non-compliance-Labeling/page"
import NoncomplianceincidentsMarketing from "./Marketing-Labeling/Non-compliance-incidents-Marketing/page"
import StatementnoncomplianceMarketing from "./Marketing-Labeling/Statement-non-compliance-Marketing/page"
import Identifyinginformation from "./BillS-211/Identifying-information/page"
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
                <AccordionItem title="Bill S-211">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(39)}
                    >
                      {isStepCompleted(39) ? (
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
                          className={`${activeStep === 39
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 39
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
                        {isStepCompleted(39) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                            Identifying Information
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 39
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                        Identifying Information
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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

                  <AccordionItem title="Labor Relations">
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 4
                              ? "text-[12px] text-sky-800  font-bold w-[166px]"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Notice Period
                          </p>
                        )}
                      </div>
                    </li>


                  </AccordionItem>
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                  <AccordionItem title="Training">

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
                          className={`${activeStep === 15
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 15
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
                              Training hours
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 15
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Training hours
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
                          className={`${activeStep === 16
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 16
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
                              Skill Upgrade
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 16
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Skill Upgrade
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
                            className={`${activeStep === 17
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
                              Performance & Career
                              Development
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 17
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Performance & Career
                            Development
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Diversity & Inclusion ">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(18)}
                    >
                      {isStepCompleted(18) ? (
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
                          className={`${activeStep === 18
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 18
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
                              Diversity of the Board
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 18
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Diversity of the Board
                          </p>
                        )}
                      </div>
                    </li>

                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(19)}
                    >
                      {isStepCompleted(19) ? (
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
                            className={`${activeStep === 19
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
                        {isStepCompleted(19) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Salary Ratio
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 19
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Salary Ratio
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Non - Discrimination">

                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(20)}
                    >
                      {isStepCompleted(20) ? (
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
                            className={`${activeStep === 20
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
                        {isStepCompleted(20) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Incidents of Discrimination
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 20
                              ? "text-[12px] text-sky-800  font-bold w-[166px]"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Incidents of Discrimination
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Collective Bargaining">

                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(21)}
                    >
                      {isStepCompleted(21) ? (
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
                            className={`${activeStep === 21
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
                        {isStepCompleted(21) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Collective Bargaining
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 21
                              ? "text-[12px] text-sky-800  font-bold w-[166px]"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Collective Bargaining
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
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
                  <AccordionItem title="Indigenous People">

                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(25)}
                    >
                      {isStepCompleted(25) ? (
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
                            className={`${activeStep === 25
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
                        {isStepCompleted(25) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Indigenous People
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 25
                              ? "text-[12px] text-sky-800  font-bold w-[166px]"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Indigenous People
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Community Development">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(26)}
                    >
                      {isStepCompleted(26) ? (
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
                          className={`${activeStep === 26
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 26
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
                        {isStepCompleted(26) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Community Engagement
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 26
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Community Engagement
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(27)}
                    >
                      {isStepCompleted(27) ? (
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
                            className={`${activeStep === 27
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
                        {isStepCompleted(27) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Impact on Community
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 27
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Impact on Community
                          </p>
                        )}
                      </div>
                    </li>


                  </AccordionItem>
                  <AccordionItem title="Supplier Social Assessment">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(28)}
                    >
                      {isStepCompleted(28) ? (
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
                          className={`${activeStep === 28
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 28
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
                        {isStepCompleted(28) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Suppliers Screened
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 28
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Suppliers Screened
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(29)}
                    >
                      {isStepCompleted(29) ? (
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
                            className={`${activeStep === 29
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
                        {isStepCompleted(29) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Impacts & Actions Taken
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 29
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Impacts & Actions Taken
                          </p>
                        )}
                      </div>
                    </li>


                  </AccordionItem>
                  <AccordionItem title="Political Involvement">

                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(30)}
                    >
                      {isStepCompleted(30) ? (
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
                            className={`${activeStep === 30
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
                        {isStepCompleted(30) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Political Involvement
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 30
                              ? "text-[12px] text-sky-800  font-bold w-[166px]"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Political Involvement
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Customer Health and Safety">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(31)}
                    >
                      {isStepCompleted(31) ? (
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
                          className={`${activeStep === 31
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 31
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
                        {isStepCompleted(31) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Product/Service Safety
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 31
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Product/Service Safety
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(32)}
                    >
                      {isStepCompleted(32) ? (
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
                            className={`${activeStep === 32
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
                        {isStepCompleted(32) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Compliance
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 32
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Compliance
                          </p>
                        )}
                      </div>
                    </li>


                  </AccordionItem>
                  <AccordionItem title="Marketing and Labeling">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(33)}
                    >
                      {isStepCompleted(33) ? (
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
                          className={`${activeStep === 33
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 33
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
                        {isStepCompleted(33) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Product/Service labelling
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 33
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Product/Service labelling
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(34)}
                    >
                      {isStepCompleted(34) ? (
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
                          className={`${activeStep === 34
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 34
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
                        {isStepCompleted(34) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Non compliance incidents- Labelling
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 34
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Non compliance incidents- Labelling
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(35)}
                    >
                      {isStepCompleted(35) ? (
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
                          className={`${activeStep === 35
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 35
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
                        {isStepCompleted(35) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                            Statement of non compliance - Labeling
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 35
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                              Statement of non compliance - Labeling
                          </p>
                        )}
                      </div>
                    </li>
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(36)}
                    >
                      {isStepCompleted(36) ? (
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
                          className={`${activeStep === 36
                            ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                            : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                            } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${activeStep === 36
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
                        {isStepCompleted(36) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                            Non compliance incidents  - Marketing
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 36
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                              Non compliance incidents  - Marketing
                          </p>
                        )}
                      </div>
                    </li>

                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(37)}
                    >
                      {isStepCompleted(37) ? (
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
                            className={`${activeStep === 37
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
                        {isStepCompleted(37) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Statement of non compliance - Marketing
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 37
                              ? "text-[12px] text-sky-800  font-bold"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Statement of non compliance - Marketing
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Customer Privacy">
                    <li
                      className="relative flex items-baseline cursor-pointer gap-2 pb-5"
                      onClick={() => activeSteps(38)}
                    >
                      {isStepCompleted(38) ? (
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
                            className={`${activeStep === 38
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
                        {isStepCompleted(38) ? (
                          <>
                            <p className="text-[12px] text-sky-800  font-bold">
                              Customer Privacy
                            </p>
                            <IoCheckmarkDoneSharp className="ml-[0.15rem] h-[17px] text-green-600" />
                          </>
                        ) : (
                          <p
                            className={`${activeStep === 38
                              ? "text-[12px] text-sky-800  font-bold w-[166px]"
                              : " text-[12px]  text-gray-600"
                              } `}
                          >
                            Customer Privacy
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
            {activeStep === 4 && (
              <>
                <div>
                  <Noticeperiod />
                </div>
              </>
            )}
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
            )}  {activeStep === 15 && (
              <>
                <div>
                  <Traininghours />
                </div>
              </>
            )}
            {activeStep === 16 && (
              <>
                <div>
                  < Skillupgrade />
                </div>
              </>
            )}
            {activeStep === 17 && (
              <>
                <div>
                  <Performancedevelopment />
                </div>
              </>
            )}

            {activeStep === 18 && (
              <>
                <div>
                  <DiversityBoard />
                </div>
              </>
            )}   {activeStep === 19 && (
              <>
                <div>
                  <Salaryratio />
                </div>
              </>
            )}
            {activeStep === 20 && (
              <>
                <div>
                  <IncidentsofDiscrimination />
                </div>
              </>
            )}
            {activeStep === 21 && (
              <>
                <div>
                  <CollectiveBargaining />
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
            {activeStep === 25 && (
              <>
                <div>
                  <IndigenousPeople />
                </div>
              </>
            )}
            {activeStep === 26 && (
              <>
                <div>
                  <CommunityEngagement />
                </div>
              </>
            )}
            {activeStep === 27 && (
              <>
                <div>
                  <ImpactonCommunity />
                </div>
              </>
            )}
            {activeStep === 28 && (
              <>
                <div>
                  <Suppliersscreened />
                </div>
              </>
            )}
            {activeStep === 29 && (
              <>
                <div>
                  <Impactsactionstaken />
                </div>
              </>
            )}
            {activeStep === 30 && (
              <>
                <div>
                  <PoliticalInvolvement />
                </div>
              </>
            )}
            {activeStep === 31 && (
              <>
                <div>
                  <ProductServiceSafety />
                </div>
              </>
            )}
            {activeStep === 32 && (
              <>
                <div>
                  <Compliance />
                </div>
              </>
            )}
            {activeStep === 33 && (
              <>
                <div>
                  <ProductServicelabelling />
                </div>
              </>
            )}
            {activeStep === 34 && (
              <>
                <div>
                  <NoncomplianceincidentsLabelling />
                </div>
              </>
            )}
            {activeStep === 35 && (
              <>
                <div>
                  <StatementnoncomplianceLabeling />
                </div>
              </>
            )}
            {activeStep === 36 && (
              <>
                <div>
                  <NoncomplianceincidentsMarketing />
                </div>
              </>
            )}
            {activeStep === 37 && (
              <>
                <div>
                  <StatementnoncomplianceMarketing />
                </div>
              </>
            )}
            {activeStep === 38 && (
              <>
                <div>
                  <CustomerPrivacy />
                </div>
              </>
            )}
              {activeStep === 39 && (
              <>
                <div>
                  <Identifyinginformation />
                </div>
              </>
            )}

             </div>
            <div>
              <div className="w-full mb-5">
                <div className="absolute right-5">
                  <div className="flex  me-2  mb-5">
                    <button
                      className={`${activeStep === 1 ? "text-gray-500" : "text-blue-500"
                        } px-3 py-1.5 rounded font-bold `}
                      onClick={handlePrevious}
                      disabled={activeStep === 1}
                    >
                      &lt; Previous
                    </button>

                    {activeStep < 38 && (
                      <button
                        className={`${activeStep === 38
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
