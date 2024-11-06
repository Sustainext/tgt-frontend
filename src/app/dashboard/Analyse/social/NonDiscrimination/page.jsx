"use client";
import React, { useState, useEffect } from "react";
import AnalyseHeader6 from "../../AnalyseHeader6";
import Section from "./section"
const AnalyseNonDiscrimination = () => {
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });


  
  
    return (
      <>
   
        <AnalyseHeader6
          location={location}
          setLocation={setLocation}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <Section
          location={location}
          dateRange={dateRange}
      
        />
      </>
    );
  };

export default AnalyseNonDiscrimination;
