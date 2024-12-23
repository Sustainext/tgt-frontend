'use client'
import React, { useState} from 'react';
import Screen4 from "./screen4";
import Socialheader from "../../../socialheader";
const Section2 = () => {
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
      <Screen4 location={location} year={year} month={activeMonth} />
    </>
  );
};

export default Section2;
