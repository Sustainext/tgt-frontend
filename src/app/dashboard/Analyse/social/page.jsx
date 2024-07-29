'use client'
import React, { useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import AnalyseEmployment from "./Employment/page";
import AnalyseOHS from "./OHS/page";
import AnalyseChildlabour from "./Child-Labour/page";
import AnalyseCompulsorylabour from "./Compulsory-Labour/page";
import AnalyseDiversityInclusion from "./Diversity-and-inclusion/page";
import AnalyseSuppliersocialassessment from "./Supplier-social-assessment/page";
import AnalyseTraining from "./Training/page";
import AnalyseNonDiscrimination from "./NonDiscrimination/page";
import AnalyseCollectiveBargaining from "./Collective-Bargaining/page";
import AnalyseCommunityDevelopment from "./Community-Development/page";

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
        {activeTab === "Tab2" && <AnalyseOHS />}
        {activeTab === "Tab3" && <AnalyseChildlabour />}
        {activeTab === "Tab4" && <AnalyseCompulsorylabour />}
        {activeTab === "Tab5" && <AnalyseDiversityInclusion /> }
        {activeTab === "Tab6" && <AnalyseSuppliersocialassessment/>}
        {activeTab === "Tab7" && <AnalyseTraining /> }
        {activeTab === "Tab8" && <AnalyseNonDiscrimination /> }
        {activeTab === "Tab9" && <AnalyseCollectiveBargaining /> }
        {activeTab === "Tab10" && <AnalyseCommunityDevelopment /> }
      </div>
    </div>
  );
};

export default social;
