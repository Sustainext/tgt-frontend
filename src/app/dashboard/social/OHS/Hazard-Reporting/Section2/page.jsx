"use client";
import React, { useState } from "react";
import Socialheader3 from "../../../socialheader3";
import Screen3 from "./screen3";
import Screen4 from "./screen4";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Section2 = () => {
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  return (
    <>
        <ToastContainer style={{ fontSize: "12px" }} />
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
