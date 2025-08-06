"use client";
import React, { useState, useEffect } from "react";
import Aside from "./sidepanel";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Infrastructureinvestmentsservices from "./indirect-economic-impacts/infrastructure-investments-services/page";
import ProcurementPractices from "./procurement-practices/page";
import Significantindirecteconomic from "./indirect-economic-impacts/significant-indirect-economic/page";
import PortionOfSeniorManagement from "./economic-governance/Proportion-of-senior-management-hired-from-the-local-community/page";
import Directeconomic from "./economic-performance/direct-economic/page";
import Financialimplications from "./risks-opportunities/financial-implications/page";
import Definedbenefit from "./economic-performance/defined-benefit/page";
import Financialassistance from "./economic-performance/financial-assistance/page";
import Publiclegal from "./anti-corruption/public-legal/page";
import Anticompetitivebehavior from "./anti-corruption/Anti-competitive-behavior/page";
import Approachtotax from "./tax/approach-to-tax/page";
import Taxgovernance from "./tax/tax-governance/page";
import Stakeholderengagement from "./tax/stakeholder-engagement/page";
import Countrybycountryreporting from "./tax/country-by-country-reporting/page";
import Operationsassessed from "./anti-corruption/operations-assessed/page";
import Confirmedincidents from "./anti-corruption/confirmed-incidents/page";
// import Ratiosstandard from "./market-presence/ratios-standard/page";
import Communicationtraining from "./anti-corruption/communication-training/page";
import Climaterelated from "./risks-opportunities/climate-related/page";
import Climaterelatedrisks from "./risks-opportunities/climate-related-risks/page";
import PoliticalInvolvement from "./Lobbying-Political-Influence/Political-Involvement/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/Context/page";
import {
  fetchMaterialityData,
  setCorpID,
  setOrgID,
  setOrgName,
  setCorpName,
  setYear,
  setStartDate,
  setEndDate,
} from "../../../lib/redux/features/materialitySlice";
import Materialtopic from "../Management-Material-topic/page";
import Resiliencestrategy from "./risks-opportunities/resilience-strategy/page";
import Climatebusiness from "./risks-opportunities/climate-business/page";
import Climaterelatedtargets from "./risks-opportunities/climate-related-targets/page";
import Climaterelatedmetrics from "./risks-opportunities/climate-related-metrics/page";
import Cookies from "js-cookie";
import { setActivesection } from "../../../lib/redux/features/TCFD/TcfdSlice";
const Economic = () => {
  const { open } = GlobalState();
  const activestap = useSelector((state) => state.Tcfd.activesection);
  const [activeTab, setActiveTab] = useState(
    ""
  );



  const [mobileopen, setMobileopen] = useState(false);
  const frameworkId = Cookies.get("selected_framework_id");
  const disclosures = Cookies.get("selected_disclosures");
  const parsedDisclosures = disclosures ? JSON.parse(disclosures) : [];
  const dispatch = useDispatch();
  const {
    corporate_id,
    organization_id,
    start_date,
    end_date,
    data,
    materiality_year,
    loading,
    error,
  } = useSelector((state) => state.materialitySlice);

  const loadMaterialityDashboard = () => {
    dispatch(
      fetchMaterialityData({
        corporate: corporate_id,
        organization: organization_id,
        start_date: materiality_year ? `${materiality_year}-01-01` : "",
        end_date: materiality_year ? `${materiality_year}-12-31` : "",
      })
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
      dispatch(setActivesection(""));
  };

  useEffect(() => {
    loadMaterialityDashboard();
  }, [dispatch]);

 const materialnewTabs = [
      "Management of Material topic Economic Performance",
      "Management of Material topic risks",
      "Management of Material topic Market",
      "Management of Material topic Anti",
      "Management of Material topic Tax",
      "Management of Material topic Political Influence",
      "Management of Material topic Indirect Economic",
    ];
    const emissionTabs = [
      "Direct economic value generated & distributed",
      // "Defined benefit plan obligations and other retirement plans",
      "Financial assistance received from government",
    ];
    const energyTabs = [
      "Financial Implications due to climate change",
      "Climate related Risks",
      "Climate Related Opportunities",
      "Tcfd-cs1",
      "Tcfd-cs2",
      "Tcfd-cs3",
      "Tcfd-cs4",
    ];

    // List of tabs related to Waste
    const wasteTabs = [
      "Proportion of senior management hired from the local community",
    ];

    // List of tabs related to Materials
    const materialTabs = [
      "Infrastructure investments and services supported",
      "Significant indirect economic impacts",
    ];

    // List of tabs related to Water
    // const waterTabs = ["Proportion of spending on local suppliers"];

    // List of tabs related to Supplier
    const supplierTabs = [
      "Operations assessed for risks related to corruption",
      "Communication and training about anti-corruption policies and procedures",
      "Confirmed incidents of corruption and actions taken",
      "Public legal cases regarding corruption",
      "Anti Competitive Behavior",
    ];

    const TaxTabs = [
      "Approach to tax",
      "Tax governance, control, and risk management",
      "Stakeholder engagement and management of concerns related to tax",
      "Country-by-country reporting",
    ];
    const PoliticalTabs = ["Political Contribution"];


  useEffect(() => {
    if (emissionTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Economic Performance"));
    } else if (energyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Climate Risks and Opportunities"));
    } else if (wasteTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Market Presence"));
    } else if (materialTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Economic Impacts"));
    } else if (supplierTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Anti Corruption"));
    } else if (materialnewTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Management of Material Topic"));
    } else if (TaxTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Tax Transparency"));
    } else if (PoliticalTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Lobbying and Political Influence"));
    } else {
      dispatch(setHeadertext2(`${activeTab}`));
    }
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("Economic"));
  }, [activeTab, dispatch]);

useEffect(() => {
  const allTabs = [
    ...materialnewTabs,
    ...emissionTabs,
    ...energyTabs,
    ...wasteTabs,
    ...materialTabs,
    ...supplierTabs,
    ...TaxTabs,
    ...PoliticalTabs,
  ];

  if (activestap && allTabs.includes(activestap)) {
    setActiveTab(activestap);
    return;
  }

  // Don't override if user already picked a tab!
  if (!activeTab && data && data.governance) {
    if (data.governance.GovEconomicPerformance?.is_material_topic) {
      setActiveTab("Management of Material topic Economic Performance");
    } else {
      setActiveTab("Direct economic value generated & distributed");
    }
  }
}, [activestap, data]); // <--- Do NOT add activeTab to deps or it will run again on every click

  return (
    <>
      <div className="w-full h-full">
        <div className="flex h-full overflow-hidden">
          <div className="flex-shrink-0 hidden xl:block lg:block md:hidden 2xl:block 4k:block">
            <Aside
              activeTab={activeTab}
               setActiveTab={setActiveTab}
              handleTabClick={handleTabClick}
              apiData={data}
              setMobileopen={setMobileopen}
              frameworkId={frameworkId}
              disclosures={parsedDisclosures}
            />
          </div>
          {mobileopen ? (
            <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
              <div>
                <Aside
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  handleTabClick={handleTabClick}
                  apiData={data}
                  setMobileopen={setMobileopen}
                  frameworkId={frameworkId}
                  disclosures={parsedDisclosures}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-6 min-w-0">
                <div className="w-full max-w-full">
              {/* Emissions start */}
              {activeTab ===
                "Management of Material topic Economic Performance" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_economic_performance_management_material_topic"
                  }
                  headingname={"Economic Performance"}
                  Envdata={"GovEconomicPerformance"}
                  topheading={"Economic"}
                />
              )}
              {activeTab ===
                "Direct economic value generated & distributed" && (
                <Directeconomic apiData={data} setMobileopen={setMobileopen} />
              )}
              {/* {activeTab ===
              "Defined benefit plan obligations and other retirement plans" && (
              <Definedbenefit />
            )} */}
              {activeTab ===
                "Financial assistance received from government" && (
                <Financialassistance
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {/* Energy start */}
              {activeTab === "Management of Material topic risks" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_risks_and_opportunities_management_material_topic"
                  }
                  headingname={"Climate Risks and Opportunities"}
                  Envdata={"ClimateRisksAndOpportunities"}
                  topheading={"Economic"}
                />
              )}
              {activeTab === "Financial Implications due to climate change" && (
                <Financialimplications
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Climate related Risks" && (
                <Climaterelatedrisks
                  apiData={data}
                  setMobileopen={setMobileopen}
                  frameworkId={frameworkId}
                  disclosures={parsedDisclosures}
                />
              )}
              {activeTab === "Climate Related Opportunities" && (
                <Climaterelated
                  apiData={data}
                  setMobileopen={setMobileopen}
                  frameworkId={frameworkId}
                  disclosures={parsedDisclosures}
                />
              )}

              {/* waste start */}
              {activeTab === "Management of Material topic Market" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_economic_governance_management_material_topic"
                  }
                  headingname={"Economic Governance"}
                  Envdata={"GovGovernance"}
                  topheading={"Economic"}
                />
              )}
              {/* {activeTab ===
              "Ratios of Standard Entry level wage by gender compared to local minimum wage" && (
              <Ratiosstandard />
            )} */}
              {activeTab ===
                "Proportion of senior management hired from the local community" && (
                <PortionOfSeniorManagement
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {/* Materials  start */}
              {activeTab ===
                "Management of Material topic Indirect Economic" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_indirect_economic_impacts_management_material_topic"
                  }
                  headingname={"Economic Impacts"}
                  Envdata={"GovEconomicImpact"}
                  topheading={"Economic"}
                />
              )}
              {activeTab ===
                "Infrastructure investments and services supported" && (
                <Infrastructureinvestmentsservices
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Significant indirect economic impacts" && (
                <Significantindirecteconomic
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {/* Water start */}
              {/* 
            {activeTab === "Proportion of spending on local suppliers" && (
              <ProcurementPractices />
            )} */}

              {/* Supplier start */}
              {activeTab === "Management of Material topic Anti" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_anti_corruption_management_material_topic"
                  }
                  headingname={"Anti Corruption"}
                  Envdata={"GovCorruption"}
                  topheading={"Economic"}
                />
              )}
              {activeTab ===
                "Operations assessed for risks related to corruption" && (
                <Operationsassessed
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Communication and training about anti-corruption policies and procedures" && (
                <Communicationtraining
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Confirmed incidents of corruption and actions taken" && (
                <Confirmedincidents
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {activeTab === "Public legal cases regarding corruption" && (
                <Publiclegal apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Anti Competitive Behavior" && (
                <Anticompetitivebehavior
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {activeTab === "Management of Material topic Tax" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={"gri_collect_tax_management_material_topic"}
                  headingname={"Tax Transparency"}
                  Envdata={"GovTaxTransparency"}
                  topheading={"Economic"}
                />
              )}
              {activeTab === "Approach to tax" && (
                <Approachtotax apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Tax governance, control, and risk management" && (
                <Taxgovernance apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab ===
                "Stakeholder engagement and management of concerns related to tax" && (
                <Stakeholderengagement
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Country-by-country reporting" && (
                <Countrybycountryreporting
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {activeTab ===
                "Management of Material topic Political Influence" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_lobbying_political_influence_management_material_topic"
                  }
                  headingname={"Lobbying and Political Influence"}
                  Envdata={"GovPolicy"}
                  topheading={"Economic"}
                />
              )}
              {activeTab === "Political Contribution" && (
                <PoliticalInvolvement
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Tcfd-cs1" && (
                <Climatebusiness
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === "Tcfd-cs2" && (
                <Resiliencestrategy
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Tcfd-cs3" && (
                <Climaterelatedmetrics
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === "Tcfd-cs4" && (
                <Climaterelatedtargets
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
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

export default Economic;
