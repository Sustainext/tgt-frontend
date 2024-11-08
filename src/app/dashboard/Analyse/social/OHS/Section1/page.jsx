"use client";
import React, { useState, useEffect } from "react";
import AnalyseHeader3 from "../../../AnalyseHeader3";
import Screen1 from "./section1";
const Section1 = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedYear2, setSelectedYear2] = useState("");

  return (
    <>
      <AnalyseHeader3
        year={selectedYear2}
        setYear={setSelectedYear2}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <Screen1 location={selectedLocation} year={selectedYear2} />
    </>
  );
};

export default Section1;
