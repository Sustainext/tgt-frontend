'use client'
import React, { useState} from 'react';
import Screen3 from "./screen3";
import Screen4 from "./screen4";
import Screen5 from "./screen5";
import Screen6 from "./screen6";
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
      <Screen3 location={location} year={year} month={activeMonth} />
      <Screen4 location={location} year={year} month={activeMonth} />
      <Screen5 location={location} year={year} month={activeMonth} />
      <Screen6 location={location} year={year} month={activeMonth} />
    </>
  );
};

export default Section2;
