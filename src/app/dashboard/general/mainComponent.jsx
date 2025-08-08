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
import TransparancyDisclosure from './Compliance/BRSRScreens/page'

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
import {setActivesection} from '../../../lib/redux/features/TCFD/TcfdSlice'

const General = () => {
  const { open } = GlobalState();
  const frameworkId = Cookies.get("selected_framework_id");
  let brsrFrameworkId = Cookies.get('selected_brsr_framework_id') || 0
  const activestap = useSelector((state) => state.Tcfd.activesection);
  const initialTab =
  activestap?activestap:frameworkId === "6" ? "TCFD Disclosure Selection" : "Org Details";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mobileopen, setMobileopen] = useState(false);

  const dispatch = useDispatch();
  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
    dispatch(setActivesection(""))
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

    const wasteTabs = ["Laws and Regulation","Transparency and Disclosures Compliances"];

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
      <div className="w-full h-full">
        <div className="flex h-full overflow-hidden">
          <div className="flex-shrink-0 hidden xl:block lg:block md:hidden 2xl:block 4k:block">
            <Aside
            brsrFrameworkId={brsrFrameworkId}
              activeTab={activeTab}
              handleTabClick={handleTabClick}
              setMobileopen={setMobileopen}
            />
          </div>
          {mobileopen ? (
            <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
              <div>
                <Aside
                brsrFrameworkId={brsrFrameworkId}
                  activeTab={activeTab}
                  handleTabClick={handleTabClick}
                  setMobileopen={setMobileopen}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-6 min-w-0">
                <div className="w-full max-w-full">
              {activeTab === "TCFD Disclosure Selection" && <TCFD setMobileopen={setMobileopen}/>}

              {activeTab === "Org Details" && (
                <OrgDetails setMobileopen={setMobileopen} brsrFrameworkId={brsrFrameworkId} />
              )}
              {activeTab === "Entities" && (
                <Entities setMobileopen={setMobileopen} brsrFrameworkId={brsrFrameworkId} />
              )}

              {activeTab === "Report Details" && (
                <ReportDetails setMobileopen={setMobileopen} />
              )}

              {activeTab === "Restatement" && (
                <Restatement setMobileopen={setMobileopen} />
              )}
              {activeTab === "Assurance" && (
                <Assurance setMobileopen={setMobileopen} brsrFrameworkId={brsrFrameworkId} />
              )}
              {activeTab === "Business Details" && (
                <BusinessDetails setMobileopen={setMobileopen} brsrFrameworkId={brsrFrameworkId} />
              )}
              {activeTab === "Workforce-Employees" && (
                <WorkforceEmployees setMobileopen={setMobileopen} brsrFrameworkId={brsrFrameworkId} />
              )}

              {activeTab === "Workforce-Other Workers" && (
                <WorkforceOtherWorkers setMobileopen={setMobileopen} brsrFrameworkId={brsrFrameworkId} />
              )}

              {activeTab === "Laws and Regulation" && (
                <LawAndRegulations setMobileopen={setMobileopen} />
              )}
              {
                brsrFrameworkId ==4 && (
                  <>
                  {activeTab === "Transparency and Disclosures Compliances" && (
                <TransparancyDisclosure setMobileopen={setMobileopen} />
              )}
                  </>
                )
              }
              

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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default General;
