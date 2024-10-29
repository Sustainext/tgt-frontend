'use client'
import React, { useState} from 'react';
import Screen1 from "./screen1";
import Socialheader from "../../../socialheader";
const Section1 = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  return (
    <>
      <Socialheader
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        location={location}
        setLocation={setLocation}
        year={year}
        setYear={setYear}
      />
      <Screen1 location={location} year={year} month={activeMonth} />

  
    </>
  );
};

export default Section1;
