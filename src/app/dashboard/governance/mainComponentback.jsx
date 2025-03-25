"use client";
import React, { useState, useEffect } from "react";
import Aside from "./sidepanel";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import BoardInfo from "./Board-info/Structure/page";
import ManagementImpact from "./Board-Involvement-Sustainability/Management-Impact/page";
import DelegationResponsibility from "./Board-Involvement-Sustainability/Delegation-Responsibility/page";
import SustainabilityReporting from "./Board-Involvement-Sustainability/Sustainability-Reporting/page";
import ConflictInterest from "./Governances/Conflict-Interest/page";
import NominationAndSelection from "./Board-info/Nomination-and-selection/page";
import ChairOfBoard from "./Board-info/Chair-of-board/page";
import Criticalconcerns from "./Governances/Critical-Concerns/page";
import SustainabilityKnowledge from "./Performance-renumerations/Sustainability-Knowledge/page";
import SustainabilityStrategyPage from "./Sustainability-strategy/page";
import ManagingConcerns from "./Managing-concerns/page";
import PerformanceEvaluations from "./Performance-renumerations/Performance-evaluations/page";
import Remuneration from "./Performance-renumerations/Remuneration/page";
import Remediation from "./Remediation/page";
import CompensationRatio from "./Performance-renumerations/compensation-ratio/page";
import DetermineRemuneration from "./Performance-renumerations/Determine-remuneration/page";
import PolicyCommitments from "./Policy/Policy-Commitments/page";
import ImplementingCommitments from "./Policy/Implementing-commitments/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/Context/page";

const Governance = () => {
  const { open } = GlobalState();
  const [activeTab, setActiveTab] = useState("Structure");
  const [mobileopen, setMobileopen] = useState(false);

  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
  };

  useEffect(() => {
    const emissionTabs = [
      "Structure",
      "Nomination and Selection",
      "Chair of Board",
    ];
    const energyTabs = [
      "Management of Impact",
      "Delegation of Responsibility",
      "Sustainability Reporting",
    ];

    const wasteTabs = ["Conflict of Interest", "Critical Concerns"];

    const materialTabs = [
      "Sustainability Knowledge",
      "Performance Evaluations",
      "Remuneration",
      "Determine Remuneration",
      "Compensation Ratio",
    ];

    const supplierTabs = ["Sustainability Strategy"];

    const TaxTabs = ["Process"];
    const PoliticalTabs = ["Advice & Concerns"];
    const PolicyTabs = ["Policy Commitments", "Implementing Commitments"];
    // Set the header based on the active tab category
    if (emissionTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Board Info"));
    } else if (energyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Board Involvement in Sustainability"));
    } else if (wasteTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Governance"));
    } else if (materialTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Performance and Renumerationss"));
    } else if (supplierTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Sustainability Strategy"));
    } else if (TaxTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Process"));
    } else if (PoliticalTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Advice & Concerns"));
    } else if (PolicyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Policy"));
    } else {
      dispatch(setHeadertext2(`${activeTab}`));
    }
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("Governance"));
  }, [activeTab, dispatch]);

  return (
    <>
      <div className="w-full">
        <div className="block xl:flex lg:flex md:flex 2xl:flex 4k:flex">
          <div className=" hidden xl:block lg:block md:block 2xl:block 4k:block">
            <Aside
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              setMobileopen={setMobileopen}
            />
          </div>
          {mobileopen ? (
            <div className="block xl:hidden lg:hidden md:hidden 2xl:hidden 4k:hidden">
              <div>
                <Aside
                  activeTab={activeTab}
                  handleTabClick={handleTabClick}
                  setMobileopen={setMobileopen}
                />
              </div>
            </div>
          ) : (
            <div
              className={`${
                open
                  ? "sm:w-[87vw] md:w-[87vw] lg:w-[87vw] xl:w-[87vw]  2xl:w-[93vw] 3xl:w-[102vw]"
                  : " sm:w-[87vw] md:w-[100vw] lg:w-[100vw] xl:w-[100vw]  2xl:w-[104vw] 3xl:w-[108vw]"
              }`}
            >
              {/* Emissions start */}
              {activeTab === "Structure" && (
                <BoardInfo setMobileopen={setMobileopen} />
              )}
              {activeTab === "Nomination and Selection" && (
                <NominationAndSelection setMobileopen={setMobileopen} />
              )}

              {activeTab === "Chair of Board" && (
                <ChairOfBoard setMobileopen={setMobileopen} />
              )}
              {/* Energy start */}
              {activeTab === "Management of Impact" && (
                <ManagementImpact setMobileopen={setMobileopen} />
              )}
              {activeTab === "Delegation of Responsibility" && (
                <DelegationResponsibility setMobileopen={setMobileopen} />
              )}
              {activeTab === "Sustainability Reporting" && (
                <SustainabilityReporting setMobileopen={setMobileopen} />
              )}
              {activeTab === "Conflict of Interest" && (
                <ConflictInterest setMobileopen={setMobileopen} />
              )}

              {/* waste start */}
              {activeTab === "Critical Concerns" && (
                <Criticalconcerns setMobileopen={setMobileopen} />
              )}

              {activeTab === "Sustainability Knowledge" && (
                <SustainabilityKnowledge setMobileopen={setMobileopen} />
              )}

              {/* Materials  start */}
              {activeTab === "Performance Evaluations" && (
                <PerformanceEvaluations setMobileopen={setMobileopen} />
              )}
              {activeTab === "Remuneration" && (
                <Remuneration setMobileopen={setMobileopen} />
              )}
              {activeTab === "Determine Remuneration" && (
                <DetermineRemuneration setMobileopen={setMobileopen} />
              )}

              {/* Supplier start */}
              {activeTab === "Compensation Ratio" && (
                <CompensationRatio setMobileopen={setMobileopen} />
              )}
              {activeTab === "Sustainability Strategy" && (
                <SustainabilityStrategyPage setMobileopen={setMobileopen} />
              )}
              {activeTab === "Policy Commitments" && (
                <PolicyCommitments setMobileopen={setMobileopen} />
              )}
              {activeTab === "Implementing Commitments" && (
                <ImplementingCommitments setMobileopen={setMobileopen} />
              )}

              {activeTab === "Process" && (
                <Remediation setMobileopen={setMobileopen} />
              )}
              {activeTab === "Advice & Concerns" && (
                <ManagingConcerns setMobileopen={setMobileopen} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Governance;
