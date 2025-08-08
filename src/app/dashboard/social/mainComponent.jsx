"use client";
import React, { useState, useEffect } from "react";
import Aside from "./sidepanel";
import Parentalleave from "./Employment/Parental-Leave/page";
import Benefits from "./Employment/Benefits/page";
import EmployeeHiresTurnover from "./Employment/Employee-Hires-Turnover/page";
import Definedbenefit from "./Employment/defined-benefit/page";
import Noticeperiod from "./Labor-Management/Notice-Period/page";
import CollectiveBargaining from "./Labor-Management/Collective-Bargaining/page";
import Ohsmanagment from "./OHS/ohs-management/page";
import Riskassessment from "./OHS/risk-assessment/page";
import WorkersRight from "./OHS/Workers-Right/page";
import HazardReporting from "./OHS/Hazard-Reporting/page";
import Ohsservices from "./OHS/ohs-services/page";
import Workinvolvement from "./OHS/work-involvement/page";
import Ohstraining from "./OHS/ohs-training/page";
import Promotionhealth from "./OHS/promotion-health/page";
import HealthRiskAddressed from "./OHS/Health-Risk-Addressed/page";
import Preventionohsimpact from "./OHS/prevention-ohs-Impact/page";
import Ohsmanagementsystemcoverage from "./OHS/ohs-management-system-coverage/page";
import Injuries from "./OHS/Injuries/page";
import Illhealth from "./OHS/ill-health/page";
import InjuriesHazards from "./OHS/Injuries-Hazards/page";
import IllhealthHazard from "./OHS/Illhealth-Hazard/page";
import Traininghours from "./Training/Training-hours/page";
import Skillupgrade from "./Training/skill-upgrade/page";
import Performancedevelopment from "./Training/Performance-development/page";
import DiversityBoard from "./Diversity-Inclusion/Diversity-Board/Section1/page";
import Diversityemploy from "./Diversity-Inclusion/Diversity-Board/Section2/page";
import Salaryratio from "./Diversity-Inclusion/Salary-ratio/page";
import IncidentsofDiscrimination from "./Non-Discrimination/Incidents-of-Discrimination/page";
import CommunityEngagement from "./Human-Rights/Community-Engagement/page";
import ImpactonCommunity from "./Human-Rights/Impact-on-Community/page";
import IndigenousPeople from "./Human-Rights/Indigenous-People/page";
import Securitypersonnel from "./Human-Rights/security-personnel/Section1/page";
import Securitypersonnel2 from "./Human-Rights/security-personnel/Section2/page";
import Childlabour from "./Child-Forced-Labour/child-labour/page";
import Forcedorcompulsorylabour from "./Child-Forced-Labour/forced-or-compulsory-labour/page";
import Suppliersscreened from "./Supplier-social-assessment/Impacts-actions-taken/page";
import Impactsactionstaken from "./Supplier-social-assessment/Suppliers-screened/page";
import SoicalProcurementPractices from "./Supplier-social-assessment/procurement-practices/page";
import ProductServiceSafety from "./Customer-Health-Safety/Product-Service-Safety/page";
import Compliance from "./Customer-Health-Safety/Compliance/Section1/page";
import ProductsService from "./Customer-Health-Safety/Products-Service/Section2/page";
import ProductServicelabelling from "./Marketing-Labeling/Product-Service-labelling/Section1/page";
import ProductServicelabelling2 from "./Marketing-Labeling/Product-Service-labelling/Section2/page";
import NoncomplianceincidentsLabelling from "./Marketing-Labeling/Non-compliance-incidents-Labelling/page";
import StatementnoncomplianceLabeling from "./Marketing-Labeling/Statement-non-compliance-Labeling/page";
import NoncomplianceincidentsMarketing from "./Marketing-Labeling/Non-compliance-incidents-Marketing/page";
import StatementnoncomplianceMarketing from "./Marketing-Labeling/Statement-non-compliance-Marketing/page";
import CustomerPrivacy from "./Customer-Privacy/Section1/page";
import CustomerPrivacy2 from "./Customer-Privacy/Section2/page";
import Ratiosstandard from "./Diversity-Inclusion/ratios-standard/page";
import BILLs201 from "./BillS-211/page";
import Materialtopic from "../Management-Material-topic/page";
import BRSRScreens from './BRSRScreens/page'
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { GlobalState } from "@/Context/page";
import { useDispatch, useSelector } from "react-redux";
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
import Cookies from "js-cookie";

const Social = () => {
  const { open } = GlobalState();
  const [activeTab, setActiveTab] = useState(
    "Management of Material topic OHS"
  );
 let brsrFrameworkId = Cookies.get('selected_brsr_framework_id') || 0
  const [mobileopen, setMobileopen] = useState(false);
  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
   useEffect(() => {
    // Only initialize when materiality data is loaded AND nothing is active
    if (!activeTab && data && data.environment) {
      if (data.environment.EnvGhgEmission?.is_material_topic) {
        setActiveTab("Management of Material topic emission");
      } else {
        setActiveTab("GHG Emissions");
      }
    }
  }, [activeTab, data]);
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

  useEffect(() => {
    loadMaterialityDashboard();
  }, [dispatch]);

  useEffect(() => {
    // List of tabs related to Energy\
    const materialnewTabs = [
      "Management of Material topic Employment",
      "Management of Material topic Labor Management",
      "Management of Material topic OHS",
      "Management of Material topic Training and Development",
      "Management of Material topic Diversity & Equal Opportunity",
      "Management of Material topic Non Discrimination",
      "Management of Material topic Human Rights",
      "Management of Material topic Labour",
      "Management of Material topic Supply",
      "Management of Material topic Safety",
      "Management of Material topic Marketing",
      "Management of Material topic Privacy",
    ];
    const emissionTabs = [
      "Employee Hires & Turnover",
      "Benefits",
      "Parental Leave",
      "Retirement Benefits",
      ,
      "Diversity of Employees",
    ];
    const BillS211Tabs = ["Data collection"];
    const energyTabs = ["Notice Period", "Collective Bargaining"];

    // List of tabs related to Waste
    const wasteTabs = [
      "OHS Management",
      "Risk Assessment",
      "OHS Sevices",
      "Worker Involvement in OHS",
      "OHS Training",
      "Promotion of Health",
      "Prevention of OHS Impact",
      "Health Risk Addressed",
      "OHS Management System Coverage",
      "Injuries",
      "Ill-health",
      "Hazard Reporting",
      "Workers Right",
      "Hazards - Ill-health",
      "Hazard Injuries",
    ];

    // List of tabs related to Materials
    const materialTabs = [
      "Training hours",
      "Skill Upgrade",
      "Performance & Career Development",
    ];

    // List of tabs related to Water
    const waterTabs = [
      "Diversity of the Board",
      "Salary Ratio",
      "Entry Level Wage",
    ];

    // List of tabs related to Supplier
    const supplierTabs = ["Incidents of Discrimination"];
    const LegalTabs = [
      "Community Engagement",
      "Impact on Community",
      "Indigenous People",
      "Security Personnel",
      "Security Personnel2",
    ];
    const TaxTabs = ["Child Labour", "Forced or Compulsory Labour"];
    const SupplyTabs = [
      "Suppliers Screened",
      "Impacts & Actions Taken",
      "Procurement Practices",
    ];
    const SafetyTabs = [
      "Product/Service Safety",
      "Compliance",
      "Products & Service",
    ];
    const MarketingTabs = [
      "Product/Service labelling",
      "Product/Service Categories Assessed for Compliance",
      "Non compliance incidents- Labelling",
      "Statement of non compliance - Labeling",
      "Non compliance incidents - Marketing",
      "Statement of non compliance - Marketing",
    ];
    const PrivacyTabs = ["Customer Privacy", "Statement of Fact"];
    // Set the header based on the active tab category
    if (emissionTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Employment"));
    } else if (energyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Labor Management"));
    } else if (wasteTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Occupational health and safety"));
    } else if (materialTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Training and Development"));
    } else if (waterTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Diversity & Equal Opportunity"));
    } else if (supplierTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Non - Discrimination"));
    } else if (materialnewTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Management of Material Topic"));
    } else if (LegalTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Human Rights and Community Impact"));
    } else if (TaxTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Child and Forced Labour"));
    } else if (SupplyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Supply Chain Labor Standards"));
    } else if (SafetyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Product Safety & Quality"));
    } else if (MarketingTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Marketing and Labeling"));
    } else if (PrivacyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Customer Privacy & Data Security"));
    } else if (BillS211Tabs.includes(activeTab)) {
      dispatch(setHeadertext2("Bill S-211"));
    } else {
      dispatch(setHeadertext2(`${activeTab}`));
    }
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("Social"));
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
              apiData={data}
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
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-6 min-w-0">
                <div className="w-full max-w-full">
              {/* Emissions start */}
              {activeTab === "Management of Material topic Employment" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={"gri_collect_employment_management_material_topic"}
                  headingname={"Employment"}
                  Envdata={"SocEmployment"}
                  topheading={"Social"}
                />
           
              )}
              {activeTab === "Data collection" && (
                <BILLs201
                  handleTabClick={handleTabClick}
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                />
              )}
              {/* {activeTab === "Identifying Information" && (
                <Identifyinginformation
                  handleTabClick={handleTabClick}
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                
        
                />
              )} */}
              {/* {activeTab === "Annual report" && (
                <AnnualReport apiData={data} setMobileopen={setMobileopen} />
              )} */}
              {activeTab === "Employee Hires & Turnover" && (
                <EmployeeHiresTurnover
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Benefits" && (
                <Benefits apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Parental Leave" && (
                <Parentalleave apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Retirement Benefits" && (
                <Definedbenefit apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Diversity of Employees" && (
                <Diversityemploy apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab ===
                "Management of Material topic Labor Management" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={"gri_collect_labor_management_material_topic"}
                  headingname={"Labor Management"}
                  Envdata={"SocLabourManagement"}
                  topheading={"Social"}
                />
           
              )}
              {activeTab === "Notice Period" && (
                <Noticeperiod apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Collective Bargaining" && (
                <CollectiveBargaining
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {activeTab === "Management of Material topic OHS" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={"gri_collect_ohs_management_material_topic"}
                  headingname={"Occupational Health and Safety"}
                  Envdata={"SocHealthSafety"}
                  topheading={"Social"}
                />
            
              )}
              {activeTab === "OHS Management" && (
                <Ohsmanagment apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Risk Assessment" && (
                <Riskassessment apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Hazard Reporting" && (
                <HazardReporting apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Workers Right" && (
                <WorkersRight apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "OHS Sevices" && (
                <Ohsservices apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Worker Involvement in OHS" && (
                <Workinvolvement apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "OHS Training" && (
                <Ohstraining apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Promotion of Health" && (
                <Promotionhealth apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Health Risk Addressed" && (
                <HealthRiskAddressed
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Prevention of OHS Impact" && (
                <Preventionohsimpact
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "OHS Management System Coverage" && (
                <Ohsmanagementsystemcoverage
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Injuries" && (
                <Injuries apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Hazard Injuries" && (
                <InjuriesHazards apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Ill-health" && (
                <Illhealth apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Hazards - Ill-health" && (
                <IllhealthHazard apiData={data} setMobileopen={setMobileopen} />
              )}

              {activeTab ===
                "Management of Material topic Training and Development" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_training_and_development_management_material_topic"
                  }
                  headingname={"Training and Development"}
                  Envdata={"SocHumanCapitalDevelopment"}
                  topheading={"Social"}
                />
          
              )}
              {activeTab === "Training hours" && (
                <Traininghours apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Skill Upgrade" && (
                <Skillupgrade apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Performance & Career Development" && (
                <Performancedevelopment
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {activeTab ===
                "Management of Material topic Diversity & Equal Opportunity" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_diversity_equal_opportunity_management_material_topic"
                  }
                  headingname={"Diversity & Equal Opportunity"}
                  Envdata={"SocDiversityEqualOpp"}
                  topheading={"Social"}
                />
       
              )}
              {activeTab === "Diversity of the Board" && (
                <DiversityBoard apiData={data} setMobileopen={setMobileopen} />
              )}

              {activeTab === "Salary Ratio" && (
                <Salaryratio apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Entry Level Wage" && (
                <Ratiosstandard apiData={data} setMobileopen={setMobileopen} />
              )}

              {activeTab ===
                "Management of Material topic Non Discrimination" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_non_discrimination_management_material_topic"
                  }
                  headingname={"Non-discrimination"}
                  Envdata={"SocNonDiscrimination"}
                  topheading={"Social"}
                />
        
              )}
              {activeTab === "Incidents of Discrimination" && (
                <IncidentsofDiscrimination
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Management of Material topic Human Rights" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_human_rights_management_material_topic"
                  }
                  headingname={"Human Rights and Community Impact"}
                  Envdata={"SocCommunityRelation"}
                  topheading={"Social"}
                />
          
              )}
              {activeTab === "Community Engagement" && (
                <CommunityEngagement
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Impact on Community" && (
                <ImpactonCommunity
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Indigenous People" && (
                <IndigenousPeople
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Security Personnel" && (
                <Securitypersonnel
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Security Personnel2" && (
                <Securitypersonnel2
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {activeTab === "Management of Material topic Labour" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_child_labor_management_material_topic"
                  }
                  headingname={"Child and Forced Labour"}
                  Envdata={"SocChildLabour"}
                  topheading={"Social"}
                />
           
              )}
              {activeTab === "Child Labour" && (
                <Childlabour apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Forced or Compulsory Labour" && (
                <Forcedorcompulsorylabour
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {activeTab === "Management of Material topic Supply" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_supply_chain_management_material_topic"
                  }
                  headingname={"Supply Chain Labor Standards"}
                  Envdata={"SocSupplyChainLabour"}
                  topheading={"Social"}
                />
           
              )}
              {activeTab === "Suppliers Screened" && (
                <Impactsactionstaken
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Impacts & Actions Taken" && (
                <Suppliersscreened
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Procurement Practices" && (
                <SoicalProcurementPractices
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Management of Material topic Safety" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_product_safety_management_material_topic"
                  }
                  headingname={"Product Safety & Quality"}
                  Envdata={"SocProductSafetyQuality"}
                  topheading={"Social"}
                />
         
              )}
              {activeTab === "Product/Service Safety" && (
                <ProductServiceSafety
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Compliance" && (
                <Compliance apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Products & Service" && (
                <ProductsService apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Management of Material topic Marketing" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_marketing_and_labeling_management_material_topic"
                  }
                  headingname={"Marketing and labeling"}
                  Envdata={"SocMarketingLabeling"}
                  topheading={"Social"}
                />
           
              )}
              {activeTab === "Product/Service labelling" && (
                <ProductServicelabelling
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Product/Service Categories Assessed for Compliance" && (
                <ProductServicelabelling2
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Non compliance incidents- Labelling" && (
                <NoncomplianceincidentsLabelling
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Statement of non compliance - Labeling" && (
                <StatementnoncomplianceLabeling
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Non compliance incidents - Marketing" && (
                <NoncomplianceincidentsMarketing
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Statement of non compliance - Marketing" && (
                <StatementnoncomplianceMarketing
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Management of Material topic Privacy" && (
                <Materialtopic
                  apiData={data}
                  setMobileopen={setMobileopen}
                  setActiveTab={setActiveTab}
                  view_path={
                    "gri_collect_customer_privacy_management_material_topic"
                  }
                  headingname={"Customer Privacy & Data Security"}
                  Envdata={"SocPrivacyDataSecurity"}
                  topheading={"Social"}
                />
         
              )}
              {activeTab === "Customer Privacy" && (
                <CustomerPrivacy apiData={data} setMobileopen={setMobileopen} />
              )}

              {activeTab === "Statement of Fact" && (
                <CustomerPrivacy2
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {
                brsrFrameworkId == 4 &&
                activeTab === "CSR" && (
                  <BRSRScreens
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
                )
              }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Social;
