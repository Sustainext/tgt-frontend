'use client';
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import AnalyseEmission from "./Emission/page";
import AnalyseEnergy from "./Energy/page";
import AnalyseWaste from "./Waste/page";
import AnalyseMaterials from "./Materials/page";
import AnalyseWaterEffluents from "./Water-Effluents/page";
import SupplierEnvironmentalImpact from  "./supplier-enironmental-assessment/page";
// import AnalyseEffluents from "./Effluents/page"
import AnalysePackagingMaterials from './PackagingMaterials/page'
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,setMiddlename
} from "../../../../lib/redux/features/topheaderSlice";
import AirQuality from './AirQuality/page'
import { useDispatch } from "react-redux";

const environment = () => {
  const [activeTab, setActiveTab] = useState("Emissions");
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    dispatch(setHeadertext1("Analyse"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("Environment"));
    // Dynamically set header text 2 based on the active tab
    switch (activeTab) {
      case "Emissions":
        dispatch(setHeadertext2("Emissions"));
        break;
      case "Energy":
        dispatch(setHeadertext2("Energy"));
        break;
      case "Waste Management":
        dispatch(setHeadertext2("Waste Management"));
        break;
        // case "Effluents":
        //   dispatch(setHeadertext2("Effluents"));
        //   break;
      case "Material Use and Efficiency":
        dispatch(setHeadertext2("Material Use and Efficiency"));
        break;
      case "Packaging Materials": 
        dispatch(setHeadertext2("Packaging Materials"));
        break; 
      case "Water and effluents":
        dispatch(setHeadertext2("Water & Effluents"));
        break;
      case "Supplier Environmental Assessment":
        dispatch(setHeadertext2("Supplier Environmental Assessment"));
        break;
      case "Air Quality & other emissions":
        dispatch(setHeadertext2("Air Quality & other emissions"));
        break;  
      default:
        dispatch(setHeadertext2(""));
    }
  }, [activeTab, dispatch]);

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
        {activeTab === "Waste Management" && <AnalyseWaste isBoxOpen={isBoxOpen} />}
        {/* {activeTab === "Effluents" && <AnalyseEffluents isBoxOpen={isBoxOpen} />} */}
        {activeTab === "Material Use and Efficiency" && <AnalyseMaterials isBoxOpen={isBoxOpen} />}
        {activeTab === "Packaging Materials" && <AnalysePackagingMaterials isBoxOpen={isBoxOpen} />}
        {activeTab === "Water and effluents" && <AnalyseWaterEffluents isBoxOpen={isBoxOpen} />}
        {activeTab === "Supplier Environmental Assessment" && <SupplierEnvironmentalImpact isBoxOpen={isBoxOpen} />}
        {activeTab === "Air Quality & other emissions" && <AirQuality isBoxOpen={isBoxOpen} />}
      </div>
    </div>
  );
};

export default environment;
