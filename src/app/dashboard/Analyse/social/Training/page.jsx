"use client";
import React, { useState, useEffect } from "react";
import Section from './section'
import AnalyseHeader5 from "../../AnalyseHeader5";

const AnalyseTraining = ({ isBoxOpen }) => {
  
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
 
  

 
 
  

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default AnalyseTraining;
