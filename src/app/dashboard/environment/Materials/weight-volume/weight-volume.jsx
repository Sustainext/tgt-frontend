"use client";
import React, { useState, useEffect } from "react";
import EnvironmentHeader from "../../environmentheader";
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import { Energydata } from "../../data/griinfo";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Weightvolumebody from "./weight-volume-body";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Weightvolume = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  const [data, setData] = useState();
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [yearMessage, setYearMessage] = useState("");

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

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="flex flex-col justify-start overflow-x-hidden ">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-full">
            <div className="text-left mb-4 ml-3 pt-5">
            <p className="text-[11px]">Environment</p>
              <div className="flex">
                <div>
                  <p className="gradient-text text-[22px] font-bold pt-1">
                    Materials
                  </p>
                </div>
                {/* <div className="bg-gray-100 h-[22px] w-[100px]  mx-2 mt-2 rounded-md" >
                                    <p className="text-gray-500 text-[12px] pt-0.5 px-2">Material Topic</p>
                                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full float-end me-2">
            <div className="flex float-end border-l">
              <button
                className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("51")}
              >
                GRI 301-1
              </button>
              <button
                className="text-[#fff] bg-red-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("35")}
              >
                SDG 8
              </button>
              <button
                className="text-[#fff] bg-yellow-600 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
                onClick={() => toggleDrawer("36")}
              >
                SDG 12
              </button>
            </div>
          </div>
        </div>

        <div className="ml-3 flex">
          <h6 className="text-[17px] mb-4 font-semibold flex">
            Disclosure 301-1 Materials used by weight or volume
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e1`}
              data-tooltip-content="This section documents data corresponding to the renewable
                            and/or non-renewable materials used in the production of
                            goods/services during the reporting period."
              className="mt-1.5 ml-2 text-[15px]"
            />
            <ReactTooltip
              id={`tooltip-$e1`}
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
            isOpen ? "translate-x-[15%] block" : "translate-x-[120%] hidden"
          }
fixed right-[51px]  w-[340px] h-full bg-white  rounded-md
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
      <Weightvolumebody
        location={location}
        year={year}
        month={activeMonth}
        setLocationMessage={setLocationMessage}
        setYearMessage={setYearMessage}
      />
    </>
  );
};
export default Weightvolume;
