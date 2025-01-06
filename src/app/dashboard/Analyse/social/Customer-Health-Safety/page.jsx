"use client";
import React, { useState, useEffect } from "react";
import AnalyseHeader5 from "../../AnalyseHeader5";
import Section from "./section"
const AnalyseCustomerHealthSafety = () => {
    const [activeMonth, setActiveMonth] = useState(1);
    const [dateRange, setDateRange] = useState({
      start: null,
      end: null,
    });
    const [selectedOrg, setSelectedOrg] = useState("");
    const [selectedCorp, setSelectedCorp] = useState("");
  
  
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
      
        />
      </>
    );
  };

export default AnalyseCustomerHealthSafety;
