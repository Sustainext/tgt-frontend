'use client'
import React, { useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import AnalyseEmission from "./Emission/page";
import AnalyseEnergy from "./Energy/page";
import AnalyseWaste from "./Waste/page";
import AnalyseMaterials from "./Materials/page";
import AnalyseWaterEffluents from "./Water-Effluents/page";
import SupplierEnvironmentalImpact from  "./supplier-enironmental-assessment/page"
const environment = () => {
  const [activeTab, setActiveTab] = useState("Emissions");
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative flex justify-start">
      <div className="relative left-10 w-[199px] min-h-[90vh] py-[11px] flex-col items-end inline-flex">
        <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      <div className="w-full ms-8">
        <div className="sticky top-14 bg-white z-[100]">
          <Header activeTab={activeTab} setIsBoxOpen={setIsBoxOpen} />
        </div>
        {activeTab === "Emissions" && <AnalyseEmission />}
        {activeTab === "Energy" && <AnalyseEnergy isBoxOpen={isBoxOpen} />}
        {activeTab === "Waste" && <AnalyseWaste isBoxOpen={isBoxOpen} />}
        {activeTab === "Materials" && <AnalyseMaterials isBoxOpen={isBoxOpen} />}
        {activeTab === "Water and effluents" && <AnalyseWaterEffluents isBoxOpen={isBoxOpen} />}
        {activeTab === "Supplier Environmental Assessment" && <SupplierEnvironmentalImpact isBoxOpen={isBoxOpen} />}

      </div>
    </div>
  );
};

export default environment;
