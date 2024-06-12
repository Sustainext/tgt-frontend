'use client'
import React, { useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import AnalyseEmployment from "./Employment/page";

const social = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
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
        {activeTab === "Tab1" && <AnalyseEmployment />}


      </div>
    </div>
  );
};

export default social;
