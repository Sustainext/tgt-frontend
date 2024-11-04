"use client";
import React, { useState } from "react";
import Socialheader from "../../../socialheader";
import Screen1 from "./screen1"
const Section4 = () => {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  const [activeMonth, setActiveMonth] = useState(1);
  return (
    <>
      <div className="ml-3 flex">
        <h6 className="text-[17px] mb-4 font-semibold flex">
          Hazard identification, risk assessment, and incident investigation
          (4/4)
        </h6>
      </div>
      <Socialheader
        location={location}
        setLocation={setLocation}
        year={year}
        setYear={setYear}
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
      />
        <Screen1 location={location} year={year} month={activeMonth}/>
    </>
  );
};

export default Section4;
