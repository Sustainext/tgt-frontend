"use client";
import React, { useState, useEffect } from "react";
import Aside from "./sidepanel";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Infrastructureinvestmentsservices from "./indirect-economic-impacts/infrastructure-investments-services/page";
import ProcurementPractices from "./procurement-practices/page";
import Significantindirecteconomic from "./indirect-economic-impacts/significant-indirect-economic/page";
import PortionOfSeniorManagement from "./market-presence/Proportion-of-senior-management-hired-from-the-local-community/page";
import Directeconomic from "./economic-performance/direct-economic/page";
import Financialimplications from "./risks-opportunities/financial-implications/page";
import Definedbenefit from "./economic-performance/defined-benefit/page";
import Financialassistance from "./economic-performance/financial-assistance/page";
import Publiclegal from "./legal-actions/public-legal/page";
import Anticompetitivebehavior from "./legal-actions/Anti-competitive-behavior/page";
import Approachtotax from "./tax/approach-to-tax/page";
import Taxgovernance from "./tax/tax-governance/page";
import Stakeholderengagement from "./tax/stakeholder-engagement/page";
import Countrybycountryreporting from "./tax/country-by-country-reporting/page";
import Operationsassessed from "./anti-corruption/operations-assessed/page";
import Confirmedincidents from "./anti-corruption/confirmed-incidents/page";
import Ratiosstandard from "./market-presence/ratios-standard/page";
import Communicationtraining from "./anti-corruption/communication-training/page";
import Climaterelated from "./risks-opportunities/climate-related/page";
import Climaterelatedrisks from "./risks-opportunities/climate-related-risks/page";
import EconomicperformanceMaterialtopic from "./economic-performance/Management-Material-topic/page";
import RiskMaterialtopic from "./risks-opportunities/Management-Material-topic/page";
import MarketpresenceMaterialtopic from "./market-presence/Management-Material-topic/page";
import IndirecteconomicimpactsMaterialtopic from "./indirect-economic-impacts/Management-Material-topic/page";
import AnticorruptionMaterialtopic from "./anti-corruption/Management-Material-topic/page";
import TaxMaterialtopic from "./tax/Management-Material-topic/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import { GlobalState } from "@/Context/page";
const Economic = () => {
  const { open } = GlobalState();
  const [activeTab, setActiveTab] = useState(
    "Management of Material topic Economic Performance"
  );
  const dispatch = useDispatch();

  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // List of tabs related to Energy\
    const materialnewTabs = [
      "Management of Material topic Economic Performance",
      "Management of Material topic risks",
      "Management of Material topic Market",
      "Management of Material topic Anti",
      "Management of Material topic Tax",
    ];
    const emissionTabs = [
      "Direct economic value generated & distributed",
      "Defined benefit plan obligations and other retirement plans",
      "Financial assistance received from government",
    ];
    const energyTabs = [
      "Financial Implications due to climate change",
      "Climate related Risks",
      "Climate Related Opportunities",
    ];

    // List of tabs related to Waste
    const wasteTabs = [
      "Ratios of Standard Entry level wage by gender compared to local minimum wage",
      "Proportion of senior management hired from the local community",
    ];

    // List of tabs related to Materials
    const materialTabs = [
      "Infrastructure investments and services supported",
      "Significant indirect economic impacts",
    ];

    // List of tabs related to Water
    const waterTabs = ["Proportion of spending on local suppliers"];

    // List of tabs related to Supplier
    const supplierTabs = [
      "Operations assessed for risks related to corruption",
      "Communication and training about anti-corruption policies and procedures",
      "Confirmed incidents of corruption and actions taken",
    ];
    const LegalTabs = [
      "Public legal cases regarding corruption",
      "Anti Competitive Behavior",
    ];
    const TaxTabs = [
      "Approach to tax",
      "Tax governance, control, and risk management",
      "Stakeholder engagement and management of concerns related to tax",
      "Country-by-country reporting",
    ];
    // Set the header based on the active tab category
    if (emissionTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Economic Performance"));
    } else if (energyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Risks & Opportunities"));
    } else if (wasteTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Market Presence"));
    } else if (materialTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Indirect Economic Impacts"));
    } else if (waterTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Procurement Practices"));
    } else if (supplierTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Anti Corruption"));
    } else if (materialnewTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Materials"));
    } else if (LegalTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Legal Actions"));
    } else if (TaxTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Tax"));
    } else {
      dispatch(setHeadertext2(`${activeTab}`));
    }
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("Economic"));
  }, [activeTab, dispatch]);

  return (
    <>
      <div className="w-full">
        <div className="flex">
          <div className="">
            <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
          </div>
          <div
            className={`${
              open
                ? "sm:w-[87vw] md:w-[87vw] lg:w-[87vw] xl:w-[87vw]  2xl:w-[93vw] 3xl:w-[102vw]"
                : " sm:w-[87vw] md:w-[100vw] lg:w-[100vw] xl:w-[100vw]  2xl:w-[104vw] 3xl:w-[108vw]"
            }`}
          >
            {/* Emissions start */}
            {activeTab ===
              "Management of Material topic Economic Performance" && (
              <EconomicperformanceMaterialtopic />
            )}
            {activeTab === "Direct economic value generated & distributed" && (
              <Directeconomic />
            )}
            {activeTab ===
              "Defined benefit plan obligations and other retirement plans" && (
              <Definedbenefit />
            )}
            {activeTab === "Financial assistance received from government" && (
              <Financialassistance />
            )}
            {/* Energy start */}
            {activeTab === "Management of Material topic risks" && (
              <RiskMaterialtopic />
            )}
            {activeTab === "Financial Implications due to climate change" && (
              <Financialimplications />
            )}
            {activeTab === "Climate related Risks" && <Climaterelatedrisks />}
            {activeTab === "Climate Related Opportunities" && (
              <Climaterelated />
            )}

            {/* waste start */}
            {activeTab === "Management of Material topic Market" && (
              <MarketpresenceMaterialtopic />
            )}
            {activeTab ===
              "Ratios of Standard Entry level wage by gender compared to local minimum wage" && (
              <Ratiosstandard />
            )}
            {activeTab ===
              "Proportion of senior management hired from the local community" && (
              <PortionOfSeniorManagement />
            )}

            {/* Materials  start */}
            {activeTab === "Management of Material topic Indirect Economic" && (
              <IndirecteconomicimpactsMaterialtopic />
            )}
            {activeTab ===
              "Infrastructure investments and services supported" && (
              <Infrastructureinvestmentsservices />
            )}
            {activeTab === "Significant indirect economic impacts" && (
              <Significantindirecteconomic />
            )}

            {/* Water start */}

            {activeTab === "Proportion of spending on local suppliers" && (
              <ProcurementPractices />
            )}

            {/* Supplier start */}
            {activeTab === "Management of Material topic Anti" && (
              <AnticorruptionMaterialtopic />
            )}
            {activeTab ===
              "Operations assessed for risks related to corruption" && (
              <Operationsassessed />
            )}
            {activeTab ===
              "Confirmed incidents of corruption and actions taken" && (
              <Communicationtraining />
            )}

            {activeTab === "Public legal cases regarding corruption" && (
              <Publiclegal />
            )}
            {activeTab === "Anti Competitive Behavior" && (
              <Anticompetitivebehavior />
            )}

            {activeTab === "Management of Material topic Tax" && (
              <TaxMaterialtopic />
            )}
            {activeTab === "Approach to tax" && <Approachtotax />}
            {activeTab === "Tax governance, control, and risk management" && (
              <Taxgovernance />
            )}
            {activeTab ===
              "Stakeholder engagement and management of concerns related to tax" && (
              <Stakeholderengagement />
            )}
            {activeTab === "Country-by-country reporting" && (
              <Countrybycountryreporting />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Economic;
