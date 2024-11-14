"use client";
import React, { useState, useEffect } from "react";
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
import AnalyseCustomerHealthSafety from "./Customer-Health-Safety/page";
import AnalyseMarketingLabeling from "./Marketing-Labeling/page";
import AnalyseCommunityDevelopment from "./Community-Development/page";
import AnalyseCustomerprivacy from "./Customer-Privacy/page";
import AnalyseSecurityPersonnelt from "./Security-Personnel/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
const social = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    const headerTextMapping = {
      Tab1: "Employment",
      Tab2: "Occupational health and safety",
      Tab3: "Child Labour",
      Tab4: "Forced or Compulsory Labour",
      Tab5: "Diversity & Inclusion",
      Tab6: "Supplier Social assessment",
      Tab7: "Training",
      Tab8: "Non-Discrimination",
      Tab9: "Collective Bargaining",
      Tab10: "Community Development",
      Tab12: "Customer Health and Safety",
      Tab13: "Marketing and Labeling",
      Tab14: "Customer Privacy",
      Tab15: "Security Personnel",
    };
    dispatch(setHeadertext1("Analyse"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setHeadertext2(headerTextMapping[activeTab] || "Social"));
    dispatch(setMiddlename("Social"));
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
        {activeTab === "Tab1" && <AnalyseEmployment />}
        {activeTab === "Tab2" && <AnalyseOHS />}
        {activeTab === "Tab3" && <AnalyseChildlabour />}
        {activeTab === "Tab4" && <AnalyseCompulsorylabour />}
        {activeTab === "Tab5" && <AnalyseDiversityInclusion />}
        {activeTab === "Tab6" && <AnalyseSuppliersocialassessment />}
        {activeTab === "Tab7" && <AnalyseTraining />}
        {activeTab === "Tab8" && <AnalyseNonDiscrimination />}
        {activeTab === "Tab9" && <AnalyseCollectiveBargaining />}
        {activeTab === "Tab10" && <AnalyseCommunityDevelopment />}
        {activeTab === "Tab12" && <AnalyseCustomerHealthSafety />}
        {activeTab === "Tab13" && <AnalyseMarketingLabeling />}
        {activeTab === "Tab14" && <AnalyseCustomerprivacy />}
        {activeTab === "Tab15" && <AnalyseSecurityPersonnelt />}
      </div>
    </div>
  );
};

export default social;
