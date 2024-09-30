"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineClear, MdInfoOutline } from "react-icons/md";
import { Socialdata } from "../../../../social/data/socialgriinfo.js";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EconomicHeader2 from "../../../EconomicHeader2";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
const Section2 = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  const [data, setData] = useState();
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
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

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="flex flex-col justify-start overflow-x-hidden ">
        <div className="flex items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-[60%]">
           <div className="text-left mb-2 ml-3 pt-5">
              <p className="text-sm">Economic </p>
              <div className="flex">
                <div>
                 <p className="gradient-text text-[22px] font-bold py-2">
                    Economic Performance
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40%] float-end ">
            <div className="flex float-end border-l">
              <button
                className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("118")}
              >
                GRI 201 - 2
              </button>
              <button
                className="text-[#fff] bg-[#48773C] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("119")}
              >
                SDG 13
              </button>
            </div>
          </div>
        </div>

        <div className="ml-3 flex">
          <h6 className="text-[17px] mb-4 font-semibold flex">
            Financial implications and other risks and opportunities due to
            climate change (2/2)
            <MdInfoOutline
              data-tooltip-id={`tooltip-$e10`}
              data-tooltip-content="This section documents the data corresponding to the financial
implications and other risks and opportunities due to climate change."
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
      <EconomicHeader2
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        selectedCorp={selectedCorp}
        setSelectedCorp={setSelectedCorp}
        year={year}
        setYear={setYear}
      />
      <Screen1
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
      />
      <Screen2
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
      />
      <Screen3
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
      />
    </>
  );
};
export default Section2;
