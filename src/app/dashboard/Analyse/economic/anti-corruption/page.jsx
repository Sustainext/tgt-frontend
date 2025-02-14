"use client";
import React, { useState, useEffect } from "react";
import AnalyseHeader2 from "../../AnalyseHeader2";
import Section from "./section"
const Anticorruptions = () => {
    const [activeMonth, setActiveMonth] = useState(1);
    const [year, setYear] = useState();
    const [data, setData] = useState([]);
    const [category, setCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState("");
    const [selectedCorp, setSelectedCorp] = useState("");
    const [togglestatus,setToggleStatus] = useState("Organization");
  
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
          setToggleStatus={setToggleStatus}
        />
        <Section
          selectedOrg={selectedOrg}
          selectedCorp={selectedCorp}
          year={year}
          month={activeMonth}
          togglestatus={togglestatus}
        />
      </>
    );
  };

export default Anticorruptions;
