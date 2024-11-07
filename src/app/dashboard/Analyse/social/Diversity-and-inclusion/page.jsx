'use client'
import { useState, useEffect } from "react";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from 'react-loader-spinner';
import Section from "./section";
const AnalyseDiversityInclusion = ({ isBoxOpen }) => {
  
  
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [activeMonth, setActiveMonth] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");
 
  return (
    <div>
      
      <Section
          selectedOrg={selectedOrg}
          selectedCorp={selectedCorp}
          year={selectedYear}
          activeMonth={activeMonth}
          setSelectedOrg={setSelectedOrg}
          setSelectedCorp={setSelectedCorp}
          setSelectedYear={setSelectedYear}
          setActiveMonth={setActiveMonth}
          isBoxOpen={isBoxOpen}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
         
    </div>
  );
};

export default AnalyseDiversityInclusion;
