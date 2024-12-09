"use client";
import React, { useState, useEffect } from "react";
import AnalyseHeader2 from "../../AnalyseHeader2";
import Section from "./section"
const AnalyseCollectiveBargaining = () => {
    const [activeMonth, setActiveMonth] = useState(1);
    const [year, setYear] = useState();
    const [selectedOrg, setSelectedOrg] = useState("");
    const [selectedCorp, setSelectedCorp] = useState("");
  
  
    return (
      <>
   
        <AnalyseHeader2
          activeMonth={activeMonth}
          setActiveMonth={setActiveMonth}
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
          selectedCorp={selectedCorp}
          setSelectedCorp={setSelectedCorp}
          year={year}
          setYear={setYear}
        />
        <Section
          selectedOrg={selectedOrg}
          selectedCorp={selectedCorp}
          year={year}
          month={activeMonth}
        />
      </>
    );
  };

export default AnalyseCollectiveBargaining;
