"use client";
import React, { useState, useEffect } from "react";
import AnalyseHeader6 from "../../../AnalyseHeader6";
import Screen2 from "./section2"
const Section2 = () => {
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
        <Screen2
          location={location}
          dateRange={dateRange}
      
        />
      </>
    );
  };

export default Section2;
