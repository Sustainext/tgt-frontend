'use client'
import React, { useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import AnalyseEmission from "./Emission/page";
// import AnalyseEnergy from "./Energy";

const Analyse = () => {
  const [activeTab, setActiveTab] = useState("Emissions");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex justify-start">
      <div className="relative left-10 w-[199px] min-h-[90vh] py-[11px] flex-col items-end inline-flex">
        <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      <div className="w-full ms-8">
        <div className="sticky top-14 bg-white">
          <Header activeTab={activeTab} />
        </div>
        {activeTab === "Emissions" && <AnalyseEmission />}
        {/* {activeTab === "Energy" && <AnalyseEnergy />} */}
      </div>
    </div>
  );
};

export default Analyse;
