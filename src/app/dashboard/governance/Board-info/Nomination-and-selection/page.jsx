"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import "react-tooltip/dist/react-tooltip.css";
import GovernanceHeader2 from "../../GovernanceHeader2";
import { Socialdata } from "../../../social/data/socialgriinfo";
import Process from "./Process/page";
import Criteria from "./Criteria/page";
import Describewhether from "./Describe-whether/page"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NominationAndSelection = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");

  const toggleDrawerclose = () => {
    setIsOpen(false);
  };

  const toggleDrawer = (selected) => {
    setIsOpen(true);
    setCategory(selected);
  };

  useEffect(() => {
    const newData = [];
    Socialdata.forEach((program) => {
      program.category.forEach((tag) => {
        if (tag === category) {
          newData.push(program);
        }
      });
    });
    setData(newData);
  }, [category]);

  return (
    <>
    <ToastContainer style={{ fontSize: "12px" }} />
      <div className="flex flex-col justify-start overflow-x-hidden">
        <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
          <div className="w-full">
            <div className="text-left mb-4 ml-3 pt-5">
              <p className="text-sm">Governance</p>
              <div className="flex">
                <div>
                  <p className="gradient-text text-[22px] font-bold pt-1">
                    Nomination and Selection
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full float-end">
            <div className="flex float-end border-l">
              <button
                className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("1")}
              >
                GRI 2 - 10
              </button>
              <button
                className="text-[#fff] bg-orange-600 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("2")}
              >
                SDG 5
              </button>
              <button
                className="text-[#fff] bg-pink-500 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                onClick={() => toggleDrawer("4")}
              >
                SDG 16
              </button>
            </div>
          </div>
        </div>

        <div className="ml-3 flex">
          <h6 className="text-[17px] mb-4 font-semibold flex">
            Governance Structure and Composition
          </h6>
        </div>
        <div
          className={`${
            isOpen ? "translate-x-[15%] block" : "translate-x-[120%] hidden"
          } fixed right-[51px] w-[340px] h-full bg-white rounded-md transition-transform duration-300 ease-in-out z-[100] shadow-2xl px-2`}
        >
          {data &&
            data.map((program, index) => (
              <div key={index}>
                <div className="flex justify-between p-2 pt-5 pb-4 border-b-2">
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
                <div>{program.data}</div>
              </div>
            ))}
        </div>
      </div>
      <GovernanceHeader2
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        selectedCorp={selectedCorp}
        setSelectedCorp={setSelectedCorp}
        year={year}
        setYear={setYear}
      />
      <Process
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
        month={activeMonth}
      />
      <Criteria
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
        month={activeMonth}
      />
      <Describewhether
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={year}
        month={activeMonth}
      />
    </>
  );
};

export default NominationAndSelection;
