
"use client";
import React, { useState, useEffect } from "react";
import AnalyseHeader7 from "../../AnalyseHeader7";
import Section from "./section";

const AnalyseDiversityInclusion = ({ isBoxOpen }) => {
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <>
      <AnalyseHeader7
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        selectedCorp={selectedCorp}
        setSelectedCorp={setSelectedCorp}
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <Section
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        dateRange={dateRange}
        selectedLocation={selectedLocation}
        isBoxOpen={isBoxOpen}
      />
    </>
  );
};

export default AnalyseDiversityInclusion;
