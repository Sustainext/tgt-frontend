"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineClear, MdInfoOutline, MdChevronRight } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Socialdata } from "../../../social/data/socialgriinfo";
import GeneralHeader2 from "../../GeneralHeader2";
import Totalnumberemployees from "./Total-number-employees/page";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen4 from "./screen4";
import BRSRScreen1 from './BRSRScreens/screen1'
import BRSRScreen2 from './BRSRScreens/screen2'
import BRSRScreen3 from './BRSRScreens/screen3'

import GeneralTopBar from "../../generalTopBar";
const WorkforceEmployees = ({ setMobileopen,brsrFrameworkId }) => {
  const [activeMonth, setActiveMonth] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  const [data, setData] = useState();
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [togglestatus, setToggleStatus] = useState("Organization");
  const toggleDrawerclose = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawer = (selected) => {
    setIsOpen(!isOpen);
    setCategory(selected);
  };
  useEffect(() => {
    var newData = [];
    Socialdata.map((program) => {
      program.category.map((tag) => {
        if (tag === category) {
          newData.push(program);
        }
      });
    });
    // //console.log(newData);
    setData(newData);
  }, [category]);
  const griData = [
    {
      tagName: "GRI 2 - 7",
      toggle: "98",
      textColor: "#007EEF",
      bgColor: "bg-slate-200",
    },
  ];

  const brsr = [
    {
      tagName: "BRSR-A-IV-20-a",
      id: "tooltip-$brsr1",
      content: "BRSR-Section-A-IV-20-a",
    },
    {
      tagName: "BRSR-A-IV-20-b",
      id: "tooltip-$brsr2",
      content: "BRSR-Section-A-IV-20-b",
    },
    {
      tagName: "BRSR-A-IV-22",
      id: "tooltip-$brsr3",
      content: "BRSR-Section-A-IV-22",
    },
  ];
  const sdgData = [
    {
      tagName: "SDG 8",
      toggle: "3",
      textColor: "#fff",
      bgColor: "bg-red-900",
    },
    {
      tagName: "SDG 10",
      toggle: "4",
      textColor: "#fff",
      bgColor: "bg-pink-500",
    },
  ];
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="flex flex-col justify-start overflow-x-hidden ">
        <GeneralTopBar
          toggleDrawer={toggleDrawer}
          brsr={brsr}
          griData={griData}
          sdgData={sdgData}
          title={"Workforce-Employees"}
          setMobileopen={setMobileopen}
        />
        {/* <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-full">
            <div className="text-left mb-2 ml-3 pt-5">
              <p className="text-sm">General</p>
              <div className="flex">
                <div className="h-[29px]">
                  <p className="gradient-text text-[22px] h-[52px] font-bold pt-1">
                    Workforce-Employees
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full float-end ">
            <div className="flex float-end border-l">
              <div>
                <button
                  className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                  onClick={() => toggleDrawer("98")}
                >
                  GRI 2 - 7
                </button>
              </div>

              <div className=" relative">
                <button
                  data-tooltip-id={`tooltip-$brsr1`}
                  data-tooltip-content="BRSR-Section A-IV-20a"
                  className="text-[#18736B] bg-slate-200 rounded-full text-[11px] w-[90px] h-[22px] ml-2 text-center pt-0.5"
                  // onClick={() => toggleDrawer("92")}
                >
                  BRSR A-IV-20a
                </button>
                <ReactTooltip
                  id={`tooltip-$brsr1`}
                  place="bottom"
                  effect="solid"
                  style={{
                    width: "170px",
                    backgroundColor: "#000",
                    color: "white",
                    fontSize: "12px",
                    boxShadow: 3,
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                ></ReactTooltip>
              </div>
              <div>
                <button
                  className="text-[#fff] bg-red-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                  onClick={() => toggleDrawer("3")}
                >
                  SDG 8
                </button>
              </div>
              <div>
                <button
                  className="text-[#fff] bg-pink-500 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                  onClick={() => toggleDrawer("4")}
                >
                  SDG 10
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="ml-3 flex relative">
          <h6 className="text-[17px] mb-4 font-semibold flex">
            Employees
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e10`}
              data-tooltip-content="This section documents the data corresponding
to the total number of
employee by gender, type and region."
              className="mt-1.5 ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-$e10`}
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
              }}
            ></ReactTooltip>
          </h6>
        </div>
        <div
          className={`${
            isOpen
              ? "translate-x-[15%] block top-16"
              : "translate-x-[120%] hidden top-16"
          }
fixed right-[51px]  w-[360px] h-[92%] bg-white  rounded-md
transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}
        >
          {data &&
            data.map((program, index) => (
              <div key={index}>
                {/* Header */}
                <div className="flex justify-between p-2 pt-5 pb-4 border-b-2 ">
                  <div className="ml-2 h-[38px]">{program.header}</div>
                  <div className="ml-2 float-right ">
                    <h5
                      className="text-[#727272] text-[17px] font-bold cursor-pointer"
                      onClick={toggleDrawerclose}
                    >
                      <MdOutlineClear />
                    </h5>
                  </div>
                </div>

                <div className="hidden xl:block lg:block md:block 2xl:block 4k:block 2k:block 3xl:block">
                  <div className="h-[calc(100vh-30px)] overflow-y-auto custom-scrollbar p-2">
                    {program.data}
                  </div>
                </div>
                <div className="block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hidden 2k:hidden 3xl:hidden">
                  <div className="h-[calc(90vh-30px)] overflow-y-auto custom-scrollbar p-2">
                    {program.data}
                  </div>
                </div>

                {/* Footer (Learn more link) */}
                <div className="pt-2 pb-4 ml-4">
                  <a
                    className="text-[14px] text-[#2196F3] pt-1 inline-flex"
                    href={program.link}
                    target="_blank"
                  >
                    Learn more <MdChevronRight className="text-lg pt-1" />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <GeneralHeader2
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        selectedCorp={selectedCorp}
        setSelectedCorp={setSelectedCorp}
        year={year}
        setYear={setYear}
        setToggleStatus={setToggleStatus}
      />
      <Totalnumberemployees
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        location={location}
        year={year}
        activeMonth={activeMonth}
        togglestatus={togglestatus}
      />
      <Screen1
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        location={location}
        year={year}
        month={activeMonth}
        togglestatus={togglestatus}
      />
      <Screen2
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        location={location}
        year={year}
        month={activeMonth}
        togglestatus={togglestatus}
      />
      <Screen3
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        location={location}
        year={year}
        month={activeMonth}
        togglestatus={togglestatus}
      />
      <Screen4
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        location={location}
        year={year}
        month={activeMonth}
        togglestatus={togglestatus}
      />
      {
        brsrFrameworkId == 4 && (
          <div>
             <BRSRScreen1
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        location={location}
        year={year}
        month={activeMonth}
        togglestatus={togglestatus}
      />
      <BRSRScreen2
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        location={location}
        year={year}
        month={activeMonth}
        togglestatus={togglestatus}
      />
      <BRSRScreen3
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        location={location}
        year={year}
        month={activeMonth}
        togglestatus={togglestatus}
      />
          </div>
        )
      }
     
    </>
  );
};
export default WorkforceEmployees;
