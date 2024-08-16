"use client";
import React, { useState, useEffect } from "react";
import AccordancePopup from "../modals/accordancePopup";
import Aside from "./sidePannel";
import SelectMaterialityTopic from "./selectMaterialityTopic/page";
import MaterialAssessmentProcess from "./materialAssessmentProcess/page"
import ManagementApproach from "./managementApproach/page";

const Accordance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("selectMaterialityTopic");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  
  return (
    <>
      <div className="flex w-full">
        {/* side bar */}
        <div>
          <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
        </div>

        {/* main content */}
        <div className="w-full">
          {activeTab === "selectMaterialityTopic" && <SelectMaterialityTopic />}
          {activeTab === "materialAssessmentProcess" && (
            <MaterialAssessmentProcess />
          )}
          {activeTab === "managementApproach" && (
            <ManagementApproach />
          )}
        </div>
      </div>

      <AccordancePopup
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
export default Accordance;
