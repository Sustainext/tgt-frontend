"use client";
import React, { useState } from "react";
import Socialheader3 from "../../../socialheader3";
import Screen1 from "./screen1";
const Section3 = () => {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  return (
    <>
      <div className="ml-3 flex">
        <h6 className="text-[17px] mb-4 font-semibold flex">
          Hazard identification, risk assessment, and incident investigation
          (3/4)
        </h6>
      </div>
      <Socialheader3
        location={location}
        setLocation={setLocation}
        year={year}
        setYear={setYear}
      />

      <Screen1 location={location} year={year} />
    </>
  );
};

export default Section3;
