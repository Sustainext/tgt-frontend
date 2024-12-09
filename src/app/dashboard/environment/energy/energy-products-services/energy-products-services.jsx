"use client";
import React, { useState, useEffect, useRef } from "react";
import EnvironmentHeader from "../../environmentheader";
import { MdOutlineClear, MdInfoOutline, MdChevronRight } from "react-icons/md";
import { Energydata } from "../../data/griinfo";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Reductionenergyconsumptionbody from "./energy-products-services-body";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Energyproductsservices = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  const [data, setData] = useState();
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [yearMessage, setYearMessage] = useState("");
  const drawerRef = useRef(null);
  const toggleDrawerclose = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawer = (selected) => {
    setIsOpen(!isOpen);
    setCategory(selected);
  };
  useEffect(() => {
    var newData = [];
    Energydata.map((program) => {
      program.category.map((tag) => {
        if (tag === category) {
          newData.push(program);
        }
      });
    });
    // //console.log(newData);
    setData(newData);
  }, [category]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false); // Close drawer when clicking outside
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="flex flex-col justify-start overflow-x-hidden ">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-full">
            <div className="text-left mb-2 ml-3 pt-5">
              <p className="text-[11px]">Environment</p>
              <div className="flex h-[28px]">
                <div className="h-[28px]">
                  <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                    Energy
                  </p>
                </div>
                <div className="bg-gray-100 h-[22px] w-[100px]  mx-2 mt-2 rounded-md">
                  <p className="text-gray-500 text-[12px] pt-0.5 px-2">
                    Material Topic
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full float-end pt-5 me-1">
            <div className="flex float-end border-l">
              <button
                className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("18")}
              >
                GRI 302-5
              </button>
              <button
                className="text-[#fff] bg-amber-400 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
                onClick={() => toggleDrawer("2")}
              >
                SDG 7
              </button>
              <button
                className="text-[#fff] bg-red-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("3")}
              >
                SDG 8
              </button>
              <button
                className="text-[#fff] bg-yellow-600 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
                onClick={() => toggleDrawer("4")}
              >
                SDG 12
              </button>
              <button
                className="text-[#fff] bg-lime-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("5")}
              >
                SDG 13
              </button>
            </div>
          </div>
        </div>

        <div className="ml-3 flex relative">
          <h6 className="text-[17px] mb-4 font-semibold flex">
            Reductions in energy requirements of products and services
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e15`}
              data-tooltip-content="This section documents data related to the reduction in energy
                            requirements of a product or service. Please mention the
                            approach for choosing the standards utilized for calculation."
              className="mt-1.5 ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-$e15`}
              place="bottom"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: "left",
                zIndex: 100,
              }}
            ></ReactTooltip>
          </h6>
        </div>
        <div
           ref={drawerRef} 
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

                {/* Data Content */}
                <div className="h-[calc(100vh-30px)] overflow-y-auto custom-scrollbar p-2">
                  {program.data}
                </div>

                {/* Footer (Learn more link) */}
                <div className="pt-2 pb-4 ml-4" onClick={toggleDrawerclose}>
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
      <EnvironmentHeader
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        location={location}
        setLocation={setLocation}
        year={year}
        setYear={setYear}
        locationMessage={locationMessage}
        setLocationMessage={setLocationMessage}
        yearMessage={yearMessage}
        setYearMessage={setYearMessage}
      />
      <Reductionenergyconsumptionbody
        location={location}
        year={year}
        month={activeMonth}
        setLocationMessage={setLocationMessage}
        setYearMessage={setYearMessage}
      />
    </>
  );
};
export default Energyproductsservices;
