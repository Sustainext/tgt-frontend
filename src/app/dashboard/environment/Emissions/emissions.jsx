"use client";
import React, { useState } from "react";
import EmissionsHeader from "./emissionsheader";
import Emissionsnbody from "./emissions-body";
import { EmissionsProvider } from "./EmissionsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setYear, setMonth } from '@/lib/redux/features/emissionSlice';

const Emissions = ({ open }) => {
  const dispatch = useDispatch();
  const { location, year, month } = useSelector(state => state.emissions);
  const [countryCode, setCountryCode] = useState("");
  const [locationname, setLocationname] = useState("");
  const [locationError, setLocationError] = useState("");
  const [yearError, setYearError] = useState("");

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
          activeMonth={month}
          setActiveMonth={(newMonth) => dispatch(setMonth(newMonth))}
          location={location}
          setLocation={(newLocation) => dispatch(setLocation(newLocation))}
          year={year}
          setYear={(newYear) => dispatch(setYear(newYear))}
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