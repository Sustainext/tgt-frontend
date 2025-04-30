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
import EconomicperformanceMaterialtopic from "./economic-performance/Management-Material-topic/page";
import RiskMaterialtopic from "./risks-opportunities/Management-Material-topic/page";
import MarketpresenceMaterialtopic from "./economic-governance/Management-Material-topic/page";
import IndirecteconomicimpactsMaterialtopic from "./indirect-economic-impacts/Management-Material-topic/page";
import AnticorruptionMaterialtopic from "./anti-corruption/Management-Material-topic/page";
import TaxMaterialtopic from "./tax/Management-Material-topic/page";
import PoliticalInfluenceMaterialtopic from "./Lobbying-Political-Influence/Management-Material-topic/page";
import PoliticalInvolvement from "./Lobbying-Political-Influence/Political-Involvement/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch,useSelector } from "react-redux";
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


const Economic = () => {
  const { open } = GlobalState();
  const [activeTab, setActiveTab] = useState(
    "Management of Material topic Economic Performance"
  );
  const [mobileopen, setMobileopen] = useState(false);

  const dispatch = useDispatch();
  const { corporate_id, organization_id, start_date, end_date, data,materiality_year, loading, error } = useSelector(
    (state) => state.materialitySlice
  );
  

  const loadMaterialityDashboard=()=>{
   dispatch(
      fetchMaterialityData({
        corporate: corporate_id,
        organization: organization_id,
        start_date:materiality_year?`${materiality_year}-01-01`:'',
        end_date:materiality_year?`${materiality_year}-12-31`:'',
      })
    );
  }

  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileopen(false);
  };

  useEffect(() => {
    loadMaterialityDashboard()
  }, [dispatch]);

  useEffect(() => {
    // List of tabs related to Energy\
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
    // Set the header based on the active tab category
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
    }  else if (TaxTabs.includes(activeTab)) {
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

  return (
    <>
           <div className="w-full">
             <div className="block xl:flex lg:flex md:block 2xl:flex 4k:flex">
               <div className=" hidden xl:block lg:block md:hidden 2xl:block 4k:block">
                 <Aside
                   activeTab={activeTab}
                   handleTabClick={handleTabClick}
                   apiData={data} 
                   setMobileopen={setMobileopen}
                 />
               </div>
               {mobileopen ? (
                 <div className="block xl:hidden lg:hidden md:block 2xl:hidden 4k:hidden">
                   <div>
                     <Aside
                       activeTab={activeTab}
                       handleTabClick={handleTabClick}
                       apiData={data} 
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
            {/* Emissions start */}
            {activeTab ===
              "Management of Material topic Economic Performance" && (
              <EconomicperformanceMaterialtopic apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab === "Direct economic value generated & distributed" && (
              <Directeconomic apiData={data} setMobileopen={setMobileopen} />
            )}
            {/* {activeTab ===
              "Defined benefit plan obligations and other retirement plans" && (
              <Definedbenefit />
            )} */}
            {activeTab === "Financial assistance received from government" && (
              <Financialassistance apiData={data} setMobileopen={setMobileopen} />
            )}
            {/* Energy start */}
            {activeTab === "Management of Material topic risks" && (
              <RiskMaterialtopic apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab === "Financial Implications due to climate change" && (
              <Financialimplications apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab === "Climate related Risks" && <Climaterelatedrisks apiData={data} setMobileopen={setMobileopen} />}
            {activeTab === "Climate Related Opportunities" && (
              <Climaterelated apiData={data} setMobileopen={setMobileopen} />
            )}

            {/* waste start */}
            {activeTab === "Management of Material topic Market" && (
              <MarketpresenceMaterialtopic apiData={data} setMobileopen={setMobileopen} />
            )}
            {/* {activeTab ===
              "Ratios of Standard Entry level wage by gender compared to local minimum wage" && (
              <Ratiosstandard />
            )} */}
            {activeTab ===
              "Proportion of senior management hired from the local community" && (
              <PortionOfSeniorManagement apiData={data} setMobileopen={setMobileopen} />
            )}

            {/* Materials  start */}
            {activeTab === "Management of Material topic Indirect Economic" && (
              <IndirecteconomicimpactsMaterialtopic apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab ===
              "Infrastructure investments and services supported" && (
              <Infrastructureinvestmentsservices apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab === "Significant indirect economic impacts" && (
              <Significantindirecteconomic apiData={data} setMobileopen={setMobileopen} />
            )}

            {/* Water start */}
            {/* 
            {activeTab === "Proportion of spending on local suppliers" && (
              <ProcurementPractices />
            )} */}

            {/* Supplier start */}
            {activeTab === "Management of Material topic Anti" && (
              <AnticorruptionMaterialtopic apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab ===
              "Operations assessed for risks related to corruption" && (
              <Operationsassessed apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab ===
              "Communication and training about anti-corruption policies and procedures" && (
              <Communicationtraining apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab ===
              "Confirmed incidents of corruption and actions taken" && (
              <Confirmedincidents apiData={data} setMobileopen={setMobileopen} />
            )}

            {activeTab === "Public legal cases regarding corruption" && (
              <Publiclegal apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab === "Anti Competitive Behavior" && (
              <Anticompetitivebehavior apiData={data} setMobileopen={setMobileopen} />
            )}

            {activeTab === "Management of Material topic Tax" && (
              <TaxMaterialtopic apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab === "Approach to tax" && <Approachtotax apiData={data} setMobileopen={setMobileopen} />}
            {activeTab === "Tax governance, control, and risk management" && (
              <Taxgovernance apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab ===
              "Stakeholder engagement and management of concerns related to tax" && (
              <Stakeholderengagement apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab === "Country-by-country reporting" && (
              <Countrybycountryreporting apiData={data} setMobileopen={setMobileopen} />
            )}

            {activeTab ===
              "Management of Material topic Political Influence" && (
              <PoliticalInfluenceMaterialtopic apiData={data} setMobileopen={setMobileopen} />
            )}
            {activeTab === "Political Contribution" && <PoliticalInvolvement apiData={data} setMobileopen={setMobileopen} />}
          </div>
                )}
        </div>
      </div>
    </>
  );
};

export default Economic;
