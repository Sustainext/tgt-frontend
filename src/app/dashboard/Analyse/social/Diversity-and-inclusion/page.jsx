'use client'
import { useState, useEffect } from "react";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from 'react-loader-spinner';
import Section1 from "./section1";
import NavigationButtons from "./NavigationButtons";
import Section2 from "./section2";
const AnalyseDiversityInclusion = ({ isBoxOpen }) => {
  
  
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedYear2, setSelectedYear2] = useState("");
  const [activeMonth, setActiveMonth] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [activeScreen, setActiveScreen] = useState(1);
 

  const [selectedSetLocation, setSelectedSetLocation] = useState("");



  const handleNextScreen = () => {

    setActiveScreen(2);
  };

  const handlePreviousScreen = () => {
    // setDatasetparams({
    //   ...datasetparams,
    //   organisation: selectedOrg,
    //   corporate: selectedCorp,
    //   location: "",
    // });
    // setSelectedOrg(selectedOrg)
    // setSelectedCorp(selectedCorp)
    // setSelectedYear(year)
    setActiveScreen(1);
  };


  return (
    <div>
      {activeScreen === 1 &&(
        <Section1
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={selectedYear}
        activeMonth={activeMonth}
        setSelectedOrg={setSelectedOrg}
        setSelectedCorp={setSelectedCorp}
        setSelectedYear={setSelectedYear}
        setActiveMonth={setActiveMonth}
        isBoxOpen={isBoxOpen}
      />
      )}

{activeScreen === 2 &&(
        <Section2
        selectedOrg={selectedOrg}
        selectedCorp={selectedCorp}
        year={selectedYear2}
        setSelectedOrg={setSelectedOrg}
        setSelectedCorp={setSelectedCorp}
        setSelectedYear={setSelectedYear2}
        isBoxOpen={isBoxOpen}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      )}
      

<NavigationButtons
        activeScreen={activeScreen}
        handleNextScreen={handleNextScreen}
        handlePreviousScreen={handlePreviousScreen}
      />
         
    </div>
  );
};

export default AnalyseDiversityInclusion;
