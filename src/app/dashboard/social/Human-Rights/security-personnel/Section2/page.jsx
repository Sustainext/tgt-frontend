'use client'
import React, { useState} from 'react';
import Screen2 from "./screen2";

import Socialheader3 from "../../../socialheader3";
const Section2 = () => {
  const [activeMonth, setActiveMonth] = useState(1);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState();
  return (
    <>
      <Socialheader3
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        location={location}
        setLocation={setLocation}
        year={year}
        setYear={setYear}
      />
      <Screen2 location={location} year={year} month={activeMonth} />
    </>
  );
};

export default Section2;
