"use client";
import React, { useState } from "react";
import Socialheader3 from "../../../socialheader3";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Section1 = () => {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="ml-3 flex">
        <h6 className="text-[17px] mb-4 font-semibold flex">
        Hazard identification, risk assessment, and incident investigation 
     
        </h6>
      </div>
      <Socialheader3
        location={location}
        setLocation={setLocation}
        year={year}
        setYear={setYear}
      />
      <Screen1 location={location} year={year} />
      <Screen2 location={location} year={year} />

    </>
  );
};

export default Section1;
