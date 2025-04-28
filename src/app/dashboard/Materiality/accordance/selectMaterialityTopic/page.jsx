"use client";
import React, { useState, useEffect } from "react";
import { GRIData } from "../../data/GRIinfo";
import {
  MdOutlineClear,
  MdInfoOutline,
  MdOutlineDone,
  MdKeyboardArrowDown,
} from "react-icons/md";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import { useRouter } from "next/navigation";
import TopicSelectedPopup from "../../modals/topicSelectedPopup";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const SelectMaterialityTopic = ({
  handleTabClick,
  cardData,
  esgSeleted,
  setMobileopen,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [category, setCategory] = useState("");

  const steps = [1, 2, 3];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleDrawerclose = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawer = (selected) => {
    setIsOpen(!isOpen);
    setCategory(selected);
  };

  useEffect(() => {
    const newData = GRIData.filter((program) =>
      program.category.includes(category)
    );
    setData(newData);
  }, [category]);

  const stepHeading = [
    {
      title: "ESG Topics",
      subHeading:
        "Select the topics that were chosen as the material topic by the organization.",
    },
    {
      title: "Select GRI Disclosures",
      subHeading: "Select the GRI disclosures for the selected material topics",
    },
    {
      title: "Report changes in the list of material topics",
      subHeading: "Enter changes to the list of material topics",
    },
  ];

  const convertDate = (dateStr) => {
    const date = new Date(dateStr);

    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };
  const toggleSidebar = () => {
    setMobileopen(true);
  };
  return (
    <>
      {/* side pannel for GRI 3-2 detail */}
      <div
        className={`${
          isOpen ? "translate-x-[15%] block" : "translate-x-[120%] hidden"
        }
      fixed right-[51px]  w-[340px] h-[93%] bg-white  rounded-md
      transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}
      >
        {data &&
          data.map((program) => (
            <>
              <div className="flex justify-between p-2 pt-5 pb-4 border-b-2 ">
                <div className="ml-2">{program.header}</div>

                <div className="ml-2 float-right">
                  <h5
                    className="text-[#727272] text-[17px] font-bold cursor-pointer"
                    onClick={toggleDrawerclose}
                  >
                    <MdOutlineClear />
                  </h5>
                </div>
              </div>
              <div> {program.data}</div>
            </>
          ))}
      </div>
      {/* select Materiality topic start */}
      <div className="w-full">
        <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block">
          <div className="flex flex-col justify-start overflow-x-hidden ">
            <div className="flex justify-between items-center border-b border-gray-200 w-full">
              <div className="w-full">
                <div className="text-left mb-2 ml-3 pt-5">
                  <div className="flex justify-between items-center">
                    <div className="w-[70%]">
                      <p className="gradient-text text-[22px] font-bold pt-4 pb-4 mx-2">
                        Select Materiality Topic
                      </p>
                    </div>
                    <div className="w-full float-end px-5 ">
                      <div className="flex float-end border-l">
                        <div>
                          <button
                            className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                            onClick={() => toggleDrawer("1")}
                          >
                            GRI 3-2
                          </button>
                        </div>

                        <div className=" relative">
                          <button
                            data-tooltip-id={`tooltip-$brsr1`}
                            data-tooltip-content="BRSR-Section A-VII-26"
                            className="text-[#18736B] bg-slate-200 rounded-full text-[11px] w-[90px] h-[22px] ml-2 text-center pt-0.5"
                            // onClick={() => toggleDrawer("92")}
                          >
                            BRSR A-VII-26
                          </button>
                          <ReactTooltip
                            id={`tooltip-$brsr1`}
                            place="bottom"
                            effect="solid"
                            style={{
                              width: "290px",
                              backgroundColor: "#000",
                              color: "white",
                              fontSize: "12px",
                              boxShadow: 3,
                              borderRadius: "8px",
                              textAlign: "center",
                            }}
                          ></ReactTooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block justify-between items-center border-b border-gray-200 mb-5 w-full xl:hidden lg:hidden md:block  2xl:hidden 4k:hidden">
          <div
            className="w-full  py-4  rounded-md  shadow-[0px_6px_12px_0px_rgba(0,0,0,0.08),0px_1px_3px_0px_rgba(0,0,0,0.10)]"
            onClick={toggleSidebar}
          >
            <div className="text-left mb-2 ml-3 pt-0 flex justify-between">
              <div className="">
                <div className="flex h-[28px]">
                  <div className="h-[28px]">
                    <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                      Select Materiality Topic
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center me-5">
                <MdKeyboardArrowDown className={`text-2xl float-end `} />
              </div>
            </div>
          </div>
          <div className="w-full me-2 my-4">
            <div className="">
              <div className="flex mb-2">
                <div>
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("1")}
                  >
                    GRI 3-2
                  </button>
                </div>
                <div className=" relative">
                  <button
                    data-tooltip-id={`tooltip-$brsr1`}
                    data-tooltip-content="BRSR-Section A-VII-26"
                    className="text-[#18736B] bg-slate-200 rounded-full text-[11px] w-[90px] h-[22px] ml-2 text-center pt-0.5"
                    // onClick={() => toggleDrawer("92")}
                  >
                    BRSR A-VII-26
                  </button>
                  <ReactTooltip
                    id={`tooltip-$brsr1`}
                    place="bottom"
                    effect="solid"
                    style={{
                      width: "290px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      boxShadow: 3,
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  ></ReactTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="xl:flex justify-between">
            <div>
              <p className="text-[#344054] text-[22px] font-bold pt-4 pb-2 ml-6">
                {stepHeading[currentStep].title}
              </p>
              <p className="text-[#2E0B34] text-[14px] font-[400] pb-4 ml-6">
                {stepHeading[currentStep].subHeading}
              </p>

              <div className="relative flex items-center justify-between mt-5 mx-6">
                {steps.map((step, index) => (
                  <React.Fragment key={step}>
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                                ${
                                  index < currentStep
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : index === currentStep
                                    ? "text-blue-500 border-blue-500"
                                    : "bg-[#007eef26] text-white border-white"
                                }
                                transition-colors duration-300`}
                    >
                      {index < currentStep ? <MdOutlineDone /> : step}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 w-[180px] ${
                          index < currentStep ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        style={{ height: "2px" }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="shadow-lg p-3 bg-white xl:w-[50%] mx-5 rounded-lg mt-10">
              <div className="flex  mb-4">
                <div className="w-[50%]">
                  <p className="text-[14px] text-black font-[400] px-2 pt-2">
                    Reporting Level
                  </p>
                  <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                    {cardData?.corporate_name ? "Corporate" : "Organization"}
                  </p>
                </div>
                <div>
                  <p className="text-[14px] text-black font-[400] px-2 pt-2">
                    Materiality Assessment approach
                  </p>
                  <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                    {cardData?.approach}
                  </p>
                </div>
              </div>
              <div className="flex  mb-2">
                <div className="w-[50%]">
                  <p className="text-[14px] text-black font-[400] px-2 pt-2">
                    Reporting Year
                  </p>
                  <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                    {`${convertDate(cardData?.start_date)} - ${convertDate(
                      cardData?.end_date
                    )}`}
                  </p>
                </div>
              </div>
              <div className="flex  mb-2">
                <div className="w-[50%]">
                  <p className="text-[14px] text-black font-[400] px-2 pt-2">
                    Organization Name
                  </p>
                  <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                    {cardData?.organisation_name}
                  </p>
                </div>
                {cardData?.corporate_name ? (
                  <div>
                    <p className="text-[14px] text-black font-[400] px-2 pt-2">
                      Corporate Entity Name
                    </p>
                    <p className="text-[13px] text-gray-500 font-[400] px-2 pt-2">
                      {cardData?.corporate_name}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* steps */}
        <div>
          {currentStep == 0 ? (
            <Step1 handleNext={handleNext} esgSeleted={esgSeleted} />
          ) : (
            <div>
              {currentStep == 1 ? (
                <Step2
                  setCurrentStep={setCurrentStep}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                />
              ) : (
                <Step3
                  handlePrevious={handlePrevious}
                  handleTabClick={handleTabClick}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectMaterialityTopic;
