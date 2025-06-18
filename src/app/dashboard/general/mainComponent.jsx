"use client";
import React, { useState, useEffect } from "react";
import Aside from "./sidepanel";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import OrgDetails from "./GRI-Reporting/Org-Details/page";
import Entities from "./GRI-Reporting/Entities/page";
import ReportDetails from "./GRI-Reporting/Report-Details/page";
import Restatement from "./GRI-Reporting/Restatement/page";
import Assurance from "./GRI-Reporting/Assurance/page";
import WorkforceEmployees from "./Organization-Details/Workforce-Employees/page";
import WorkforceOtherWorkers from "./Organization-Details/Workforce-Other-Workers/page";
import LawAndRegulations from "./Compliance/Laws-Regulation/page";
import BusinessDetails from "./Organization-Details/Business-Details/page";
import CollectiveBargainingAgreements from "./Collective-Barganing-Agreements/page";
import MembershipAndAssociation from "./Membership-Association/page";
import StakeholderEngagement from "./Stakeholder-Engagement/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/Context/page";
import TCFD from "./TCFD-Disclosure/page";
import Cookies from "js-cookie";
const General = () => {
  const { open } = GlobalState();
  const frameworkId = Cookies.get("selected_framework_id");
  const initialTab =
    frameworkId === "6" ? "TCFD Disclosure Selection" : "Org Details";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileopen, setMobileopen] = useState(false);

  const dispatch = useDispatch();
  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
  };

  useEffect(() => {
    const emissionTabs = [
      "Org Details",
      "Entities",
      "Report Details",
      "Restatement",
      "Assurance",
    ];
    const energyTabs = [
      "Business Details",
      "Workforce-Employees",
      "Workforce-Other Workers",
    ];

    const wasteTabs = ["Laws and Regulation"];

    const materialTabs = ["Membership & Association"];

    const supplierTabs = ["Stakeholder Engagement"];

    const TaxTabs = ["Collective Bargaining Agreements"];
    if (emissionTabs.includes(activeTab)) {
      dispatch(setHeadertext2("GRI Reporting info"));
    } else if (energyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Organization Details"));
    } else if (wasteTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Compliance"));
    } else if (materialTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Membership & Association"));
    } else if (supplierTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Stakeholder Engagement"));
    } else if (TaxTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Collective Bargaining Agreements"));
    } else {
      dispatch(setHeadertext2(`${activeTab}`));
    }
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("General"));
  }, [activeTab, dispatch]);

  return (
    <>
      <div className="w-full">
        <div className="block xl:flex lg:flex md:block 2xl:flex 4k:flex">
          <div className=" hidden xl:block lg:block md:hidden 2xl:block 4k:block">
            <Aside
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              setMobileopen={setMobileopen}
            />
          </div>
          {mobileopen ? (
            <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
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
                  ? "sm:w-[87vw]  md:w-[120vw] lg:w-[87vw] xl:w-[87vw]  2xl:w-[93vw] 3xl:w-[102vw] 4k:w-[37vw]"
                  : " sm:w-[87vw] md:w-[120vw] lg:w-[100vw] xl:w-[100vw]  2xl:w-[104vw] 3xl:w-[108vw] 4k:w-[41vw]"
              }`}
            >
              {activeTab === "TCFD Disclosure Selection" && <TCFD setMobileopen={setMobileopen}/>}

              {activeTab === "Org Details" && (
                <OrgDetails setMobileopen={setMobileopen} />
              )}
              {activeTab === "Entities" && (
                <Entities setMobileopen={setMobileopen} />
              )}

              {activeTab === "Report Details" && (
                <ReportDetails setMobileopen={setMobileopen} />
              )}

              {activeTab === "Restatement" && (
                <Restatement setMobileopen={setMobileopen} />
              )}
              {activeTab === "Assurance" && (
                <Assurance setMobileopen={setMobileopen} />
              )}
              {activeTab === "Business Details" && (
                <BusinessDetails setMobileopen={setMobileopen} />
              )}
              {activeTab === "Workforce-Employees" && (
                <WorkforceEmployees setMobileopen={setMobileopen} />
              )}

              {activeTab === "Workforce-Other Workers" && (
                <WorkforceOtherWorkers setMobileopen={setMobileopen} />
              )}

              {activeTab === "Laws and Regulation" && (
                <LawAndRegulations setMobileopen={setMobileopen} />
              )}

              {activeTab === "Membership & Association" && (
                <MembershipAndAssociation setMobileopen={setMobileopen} />
              )}
              {activeTab === "Stakeholder Engagement" && (
                <StakeholderEngagement setMobileopen={setMobileopen} />
              )}
              {activeTab === "Collective Bargaining Agreements" && (
                <CollectiveBargainingAgreements setMobileopen={setMobileopen} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default General;
