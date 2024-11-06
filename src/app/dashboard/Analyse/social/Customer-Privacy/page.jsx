"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosMiddleware";
import AnalyseHeader5 from "../../AnalyseHeader5";
import Section from "./section";

const AnalyseCustomerprivacy = ({ isBoxOpen }) => {

  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });



  return (
    <>
   
        <AnalyseHeader5
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
          selectedCorp={selectedCorp}
          setSelectedCorp={setSelectedCorp}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <Section
          selectedOrg={selectedOrg}
          selectedCorp={selectedCorp}
          dateRange={dateRange}
          isBoxOpen={isBoxOpen}
        />
      </>
  );
};

export default AnalyseCustomerprivacy;
