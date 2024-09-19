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
  const [countryCode, setCountryCode] = useState('');
  const [locationError, setLocationError] = useState('');
  const [yearError,setYearError] = useState('');

  return (
    <EmissionsProvider>
      <>
        <div className="flex flex-col justify-start overflow-x-hidden ">
          <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
            <div className="w-full">
              <div className="text-left mb-4 ml-3 pt-5">
                <div className="flex">
                  <div>
                    <p className="gradient-text text-[22px] font-bold pt-1 mb-2">
                      Emissions
                    </p>
                    <p className="text-[10px]">
                      The data that falls under emission category are uploaded
                      here.
                    </p>
                  </div>
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
