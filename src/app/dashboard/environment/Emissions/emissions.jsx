"use client";
import React, { useState, useEffect } from "react";
import EmissionsHeader from "./emissionsheader";
import Emissionsnbody from "./emissions-body";
import { EmissionsProvider } from "./EmissionsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setYear,
  setMonth,
} from "@/lib/redux/features/emissionSlice";
import { Energydata } from "../../../shared/data/Energydata";
import { MdOutlineClear,MdChevronRight  } from "react-icons/md";

const Emissions = ({ open }) => {
  const dispatch = useDispatch();
  const { location, year, month } = useSelector((state) => state.emissions);
  const countryCode = useSelector((state) => state.emissions.countryCode);
  const [locationname, setLocationname] = useState("");
  const [locationError, setLocationError] = useState("");
  const [yearError, setYearError] = useState("");
  // GRI content
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
      <EmissionsProvider>
        <>
          <div className="flex flex-col justify-start overflow-x-hidden ">
            <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
              <div className="w-full">
                <div className="text-left mb-4 ml-3 pt-5">
                  <p className="text-[11px]">Environment</p>
                  <div className="flex h-[28px]">
                    <div className="h-[28px]">
                      <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                        Emission
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
                    onClick={() => toggleDrawer("43")}
                  >
                    GRI 305 - 1
                  </button>
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("44")}
                  >
                    GRI 305 - 2
                  </button>
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("45")}
                  >
                    GRI 305 - 3
                  </button>
                </div>

                <div className="flex">
                  <button
                    className="text-[#fff] bg-[#4C9F38] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
                    onClick={() => toggleDrawer("sd5")}
                  >
                    SDG 3
                  </button>
               
                  <button
                    className="text-[#fff] bg-[#BF8B2E] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
                    onClick={() => toggleDrawer("sd3")}
                  >
                    SDG 12
                  </button>
                  <button
                    className="text-[#fff] bg-lime-900 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("sd4")}
                  >
                    SDG 13
                  </button>
                  <button
                    className="text-[#fff] bg-[#007DBC] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("sd24")}
                  >
                    SDG 14
                  </button>
                  <button
                    className="text-[#fff] bg-[#40AE49] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("sd8")}
                  >
                    SDG 15
                  </button>
                  </div>
                </div>
              </div>
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

                {/* Data Content */}
                <div className="h-[calc(100vh-30px)] overflow-y-auto custom-scrollbar p-2">
                  {program.data}
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
          <EmissionsHeader
            activeMonth={month}
            setActiveMonth={(newMonth) => dispatch(setMonth(newMonth))}
            location={location}
            setLocation={(newLocation) => dispatch(setLocation(newLocation))}
            year={year}
            setYear={(newYear) => dispatch(setYear(newYear))}
            locationError={locationError}
            setLocationError={setLocationError}
            yearError={yearError}
            setYearError={setYearError}
            setLocationname={setLocationname}
          />
          <Emissionsnbody
            open={open}
            location={location}
            year={year}
            month={month}
            countryCode={countryCode}
            setLocationError={setLocationError}
            setYearError={setYearError}
            locationname={locationname}
          />
        </>
      </EmissionsProvider>
    </>
  );
};

export default Emissions;
