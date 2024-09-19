"use client";
import React, { useState } from "react";
import EmissionsHeader from "./emissionsheader";
import Emissionsnbody from "./emissions-body";
import { EmissionsProvider } from "./EmissionsContext";

const Emissions = ({ open }) => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [location, setLocation] = useState("");
  const [locationname, setLocationname] = useState("");
  const [year, setYear] = useState();
  const [countryCode, setCountryCode] = useState("");
  const [locationError, setLocationError] = useState("");
  const [yearError, setYearError] = useState("");

  return (
    <EmissionsProvider>
      <>
        <div className="flex flex-col justify-start overflow-x-hidden ">
          <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
            <div className="w-full">
              <div className="text-left mb-4 ml-3 pt-5">
                <p className="text-sm">Environment</p>
                <div className="flex h-[28px]">
                  <div className="h-[28px]">
                    <p className="gradient-text text-[22px] font-bold h-[28px] pt-1">
                      Emission
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full float-end ">
              <div className="float-end border-l">
                <div className="flex mb-2">
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("1")}
                  >
                    GRI 305 - 1
                  </button>
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("1")}
                  >
                    GRI 305 - 2
                  </button>
                  <button
                    className="text-[#007EEF] bg-slate-200 rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("1")}
                  >
                    GRI 305 - 3
                  </button>
                </div>

                <div className="flex">
                  <button
                    className="text-[#fff] bg-[#4C9F38] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
                    onClick={() => toggleDrawer("2")}
                  >
                    SDG 3
                  </button>
               
                  <button
                    className="text-[#fff] bg-[#BF8B2E] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5 "
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
                  <button
                    className="text-[#fff] bg-[#007DBC] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("5")}
                  >
                    SDG 14
                  </button>
                  <button
                    className="text-[#fff] bg-[#40AE49] rounded-full text-[11px] w-[72px] h-[22px] ml-2 text-center pt-0.5"
                    onClick={() => toggleDrawer("5")}
                  >
                    SDG 15
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EmissionsHeader
          activeMonth={activeMonth}
          setActiveMonth={setActiveMonth}
          location={location}
          setLocation={setLocation}
          year={year}
          setYear={setYear}
          setCountryCode={setCountryCode}
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
          month={activeMonth}
          countryCode={countryCode}
          setLocationError={setLocationError}
          setYearError={setYearError}
          locationname={locationname}
        />
      </>
    </EmissionsProvider>
  );
};

export default Emissions;
