"use client";
import React, { useState,useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Infrastructureinvestmentsservices from "./indirect-economic-impacts/infrastructure-investments-services/page";
import ProcurementPractices from "./procurement-practices/page";
import Significantindirecteconomic from "./indirect-economic-impacts/significant-indirect-economic/page";
import PortionOfSeniorManagement from "./market-presence/Proportion-of-senior-management-hired-from-the-local-community/page";
import Directeconomic from "./economic-performance/direct-economic/page";
import Financialimplications from "./risks-opportunities/financial-implications/page"
import Definedbenefit from "./economic-performance/defined-benefit/page";
import Financialassistance from "./economic-performance/financial-assistance/page";
import Publiclegal from "./legal-actions/public-legal/page";
import Anticompetitivebehavior from "./legal-actions/Anti-competitive-behavior/page";
import Approachtotax from "./tax/approach-to-tax/page";
import Taxgovernance from "./tax/tax-governance/page";
import Stakeholderengagement from "./tax/stakeholder-engagement/page";
import Countrybycountryreporting from "./tax/country-by-country-reporting/page";
import Operationsassessed from "./anti-corruption/operations-assessed/page";
import Confirmedincidents from "./anti-corruption/confirmed-incidents/page";
import Ratiosstandard from "./market-presence/ratios-standard/page";
import Communicationtraining from "./anti-corruption/communication-training/page"
import Climaterelated from "./risks-opportunities/climate-related/page"
import Climaterelatedrisks from "./risks-opportunities/climate-related-risks/page"
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch} from "react-redux";
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
  const dispatch = useDispatch();
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
  useEffect(() => {
   
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2('Economic'));
}, [activeStep, dispatch]);
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
                              Defined benefit plan obligations and other
                              retirement plans
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 2
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
                      onClick={() => activeSteps(3)}
                    >
                      {isStepCompleted(3) ? (
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
                              Financial assistance received from government
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 3
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
                  <AccordionItem title="Risks & Opportunities">
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
                            Financial Implications due to climate change
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 4
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                            Financial Implications due to climate change
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
                            Climate related Risks
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 5
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                         Climate related Risks
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
                            Climate Related Opportunities
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 6
                                ? "text-[12px] text-sky-800  font-bold"
                                : " text-[12px]  text-gray-600"
                            } `}
                          >
                          Climate Related Opportunities
                          </p>
                        )}
                      </div>
                    </li>
                  </AccordionItem>
                  <AccordionItem title="Market Presence">
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
                              Ratios of Standard Entry level wage by gender
                              compared to local minimum wage
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 7
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
                              Proportion of senior management hired from the
                              local community
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 8
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
                          className={`${
                            activeStep === 9
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep ===9
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
                              Infrastructure investments and services supported
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 9
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
                              Significant indirect economic impacts
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 10
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
                              Proportion of spending on local suppliers
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 11
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
                          className={`${
                            activeStep === 12
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
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
                              Operations assessed for risks related to
                              corruption
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 12
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
                              Communication and training about anti-corruption
                              policies and procedures
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 13
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
                              Confirmed incidents of corruption and actions
                              taken
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 14
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
                              Public legal cases regarding corruption
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 15
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
                              Anti Competitive Behavior
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 16
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
                              Approach to tax
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 17
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
                          className={`${
                            activeStep === 18
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
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
                              Tax governance, control, and risk management
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 18
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
                      onClick={() => activeSteps(19)}
                    >
                      {isStepCompleted(19) ? (
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
                            activeStep === 19
                              ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800  font-bold"
                              : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                          } `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            className={`${
                              activeStep === 19
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
                              Stakeholder engagement and management of concerns
                              related to tax
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 19
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
                            className={`${
                              activeStep === 20
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
                              Country-by-country reporting
                            </p>
                           
                          </>
                        ) : (
                          <p
                            className={`${
                              activeStep === 20
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
          <div className="w-full ms-3">
            <div>
              {activeStep === 1 && (
                <>
                  <div>
                    <Directeconomic />
                  </div>
                </>
              )}
           
              {activeStep === 2 && (
                <>
                  <div>
                    <Definedbenefit />
                  </div>
                </>
              )}
              {activeStep === 3 && (
                <>
                  <div>
                    <Financialassistance />
                  </div>
                </>
              )}
                 {activeStep === 4 && (
                <>
                  <div>
                    <Financialimplications />
                  </div>
                </>
              )} 
               {activeStep === 5 && (
                <>
                  <div>
                    <Climaterelatedrisks />
                  </div>
                </>
              )}
                     {activeStep === 6 && (
                <>
                  <div>
                    <Climaterelated />
                  </div>
                </>
              )}
              
              {activeStep === 7 && (
                <>
                  <div>
                    <Ratiosstandard />
                  </div>
                </>
              )}
              {activeStep === 8 && (
                <>
                  <div>
                    <PortionOfSeniorManagement />
                  </div>
                </>
              )}
              {activeStep === 9 && (
                <>
                  <div>
                    <Infrastructureinvestmentsservices />
                  </div>
                </>
              )}
              {activeStep === 10 && (
                <>
                  <div>
                    <Significantindirecteconomic />
                  </div>
                </>
              )}
              {activeStep === 11 && (
                <>
                  <div>
                    <ProcurementPractices />
                  </div>
                </>
              )}
              {activeStep === 12 && (
                <>
                  <div>
                    <Operationsassessed />
                  </div>
                </>
              )}
              {activeStep === 13 && (
                <>
                  <div>
                    <Communicationtraining />
                  </div>
                </>
              )}
                 {activeStep === 14 && (
                <>
                  <div>
                    <Confirmedincidents />
                  </div>
                </>
              )}
              {activeStep === 15 && (
                <>
                  <div>
                    <Publiclegal />
                  </div>
                </>
              )}
              {activeStep === 16 && (
                <>
                  <div>
                    <Anticompetitivebehavior />
                  </div>
                </>
              )}
              {activeStep === 17 && (
                <>
                  <div>
                    <Approachtotax />
                  </div>
                </>
              )}
              {activeStep === 18 && (
                <>
                  <div>
                    <Taxgovernance />
                  </div>
                </>
              )}
              {activeStep === 19 && (
                <>
                  <div>
                    <Stakeholderengagement />
                  </div>
                </>
              )}
              {activeStep === 20 && (
                <>
                  <div>
                    <Countrybycountryreporting />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Economic;
