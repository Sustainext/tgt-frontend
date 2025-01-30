"use client";
import { useState } from "react";
import Section2 from "./Section2/page";

const AnalyseOHS = () => {
  // State to track the current active screen
  const [activeScreen, setActiveScreen] = useState(1);


  return (
    <div className="analyse-container">
      {activeScreen === 1 && <Section2 />}

  
    </div>
  );
};

export default AnalyseOHS;
