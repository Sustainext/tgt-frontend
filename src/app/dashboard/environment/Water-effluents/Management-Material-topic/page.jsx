"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Energydata } from "../../../../shared/data/Energydata";
import { MdOutlineClear } from "react-icons/md";
import EnvironmentHeade2 from "../../environmentheader2";
import Screen1 from "./Screen1";
const WaterMaterialtopic = () => {
  const [year, setYear] = useState();
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [data, setData] = useState();

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
              <div className="flex h-[28px]">
                <div className="h-[28px]">
                  <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                  Water and effluents
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
          <div className="w-full float-end me-2">
            <div className="float-end border-l">
              <div className="flex mb-2">
                <button
                  className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                  onClick={() => toggleDrawer("51")}
                >
                  GRI 3-3
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-3 flex relative">
          <h6 className="text-[17px] mb-4 font-semibold flex">
            Management of Material Topic
          </h6>
        </div>
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
      </div>

      <EnvironmentHeade2
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
    </>
  );
};

export default WaterMaterialtopic;
