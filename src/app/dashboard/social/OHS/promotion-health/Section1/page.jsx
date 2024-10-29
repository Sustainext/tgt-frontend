'use client'
import React, { useState} from 'react';
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Screen3 from "./screen3";
import Screen5 from "./screen5";
import Socialheader3 from "../../../socialheader3";
const Section1 = () => {
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
      <Screen1 location={location} year={year} month={activeMonth} />
      <Screen2 location={location} year={year} month={activeMonth} />
      <Screen3 location={location} year={year} month={activeMonth} />
      <Screen5 location={location} year={year} month={activeMonth} />
    </>
  );
};

export default Section1;
