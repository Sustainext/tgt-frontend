"use client";
import React, { useState } from "react";
import Socialheader3 from "../../../socialheader3";
import Screen3 from "./screen3";
import Screen4 from "./screen4";
const Section2 = () => {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  return (
    <>
      <div className="ml-3 flex">
        <h6 className="text-[17px] mb-4 font-semibold flex">
        Hazard Reporting
        </h6>
      </div>
      <Socialheader3
        location={location}
        setLocation={setLocation}
        year={year}
        setYear={setYear}
      />

      <Screen3 location={location} year={year} />
      <Screen4 location={location} year={year} />
    </>
  );
};

export default Section2;
