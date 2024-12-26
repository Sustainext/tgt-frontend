"use client";
import React, { useState, useEffect } from "react";
import Aside from "./sidepanel";
import Parentalleave from "./Employment/Parental-Leave/page";
import Benefits from "./Employment/Benefits/page";
import EmployeeHiresTurnover from "./Employment/Employee-Hires-Turnover/page";
import Definedbenefit from "./Employment/defined-benefit/page"
import EmploymentMaterialtopic from "./Employment/Management-Material-topic/page";
import LaborManagementMaterialtopic from "./Labor-Management/Management-Material-topic/page";
import Noticeperiod from "./Labor-Management/Notice-Period/page";
import CollectiveBargaining from "./Labor-Management/Collective-Bargaining/page";
import OHSMaterialtopic from "./OHS/Management-Material-topic/page";
import Ohsmanagment from "./OHS/ohs-management/page";
import Riskassessment from "./OHS/risk-assessment/page";
import WorkersRight from "./OHS/Workers-Right/page"
import HazardReporting from "./OHS/Hazard-Reporting/page"
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
import IllhealthHazard from "./OHS/Illhealth-Hazard/page"
import TrainingMaterialtopic from "./Training/Management-Material-topic/page";
import Traininghours from "./Training/Training-hours/page";
import Skillupgrade from "./Training/skill-upgrade/page";
import Performancedevelopment from "./Training/Performance-development/page";
import DiversityInclusionMaterialtopic from "./Diversity-Inclusion/Management-Material-topic/page";
import DiversityBoard from "./Diversity-Inclusion/Diversity-Board/Section1/page";
import Diversityemploy from "./Diversity-Inclusion/Diversity-Board/Section2/page";
import Salaryratio from "./Diversity-Inclusion/Salary-ratio/page";
import NonDiscriminationMaterialtopic from "./Non-Discrimination/Management-Material-topic/page";
import IncidentsofDiscrimination from "./Non-Discrimination/Incidents-of-Discrimination/page";
import HumanRightsMaterialtopic from "./Human-Rights/Management-Material-topic/page";
import CommunityEngagement from "./Human-Rights/Community-Engagement/page";
import ImpactonCommunity from "./Human-Rights/Impact-on-Community/page"
import IndigenousPeople from "./Human-Rights/Indigenous-People/page"
import Securitypersonnel from "./Human-Rights/security-personnel/Section1/page"
import Securitypersonnel2 from "./Human-Rights/security-personnel/Section2/page"
import ChildForcedLabourMaterialtopic from "./Child-Forced-Labour/Management-Material-topic/page"
import Childlabour from "./Child-Forced-Labour/child-labour/page"
import Forcedorcompulsorylabour from "./Child-Forced-Labour/forced-or-compulsory-labour/page"
import SupplierMaterialtopic from "./Supplier-social-assessment/Management-Material-topic/page"
import Suppliersscreened from "./Supplier-social-assessment/Impacts-actions-taken/page"
import Impactsactionstaken from "./Supplier-social-assessment/Suppliers-screened/page"
import SoicalProcurementPractices from "./Supplier-social-assessment/procurement-practices/page"
import HealthSafetyMaterialtopic from "./Customer-Health-Safety/Management-Material-topic/page"
import ProductServiceSafety from "./Customer-Health-Safety/Product-Service-Safety/page"
import Compliance from "./Customer-Health-Safety/Compliance/Section1/page"
import ProductsService from "./Customer-Health-Safety/Products-Service/Section2/page"
import MarketingLabelingMaterialtopic from "./Marketing-Labeling/Management-Material-topic/page"
import ProductServicelabelling from "./Marketing-Labeling/Product-Service-labelling/Section1/page"
import ProductServicelabelling2 from "./Marketing-Labeling/Product-Service-labelling/Section2/page"
import NoncomplianceincidentsLabelling from "./Marketing-Labeling/Non-compliance-incidents-Labelling/page"
import StatementnoncomplianceLabeling  from "./Marketing-Labeling/Statement-non-compliance-Labeling/page"
import NoncomplianceincidentsMarketing from "./Marketing-Labeling/Non-compliance-incidents-Marketing/page"
import StatementnoncomplianceMarketing from "./Marketing-Labeling/Statement-non-compliance-Marketing/page"
import CustomerPrivacyMaterialtopic from "./Customer-Privacy/Management-Material-topic/page"
import CustomerPrivacy from "./Customer-Privacy/Section1/page"
import CustomerPrivacy2 from "./Customer-Privacy/Section2/page"
import Ratiosstandard from "./Diversity-Inclusion/ratios-standard/page"
import IdentifingInformation from './BillS-211/Identifying-information/page'
import AnnualReport from './BillS-211/annual-report/page'

import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import { GlobalState } from "@/Context/page";
const Social = () => {
  const { open } = GlobalState();
  const [activeTab, setActiveTab] = useState(
    "Management of Material topic OHS"
  );
  const dispatch = useDispatch();

  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // List of tabs related to Energy\
    const materialnewTabs = [
      "Management of Material topic Employment",
      "Management of Material topic Labor Management",
      "Management of Material topic OHS",
      "Management of Material topic Training and Development",
      "Management of Material topic Diversity & Equal Oppportunity",
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
      ,"Diversity of Employees",
    ];
    const BillS211Tabs = [
      "Identifying Information",
      "Annual report"
    ];
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
    const waterTabs = ["Diversity of the Board", "Salary Ratio","Entry Level Wage"];

    // List of tabs related to Supplier
    const supplierTabs = ["Incidents of Discrimination"];
    const LegalTabs = [
      "Community Engagement",
      "Impact on Community",
      "Indigenous People",
      "Security Personnel",
      "Security Personnel2",
    ];
    const TaxTabs = [
      "Child Labour",
      "Forced or Compulsory Labour",
  
    ];
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
    const PrivacyTabs = [
      "Customer Privacy",
      "Statement of Fact"
   

    ];
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
      dispatch(setHeadertext2("Diversity & Equal Oppportunity"));
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
    } 
    else if (SafetyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Product Safety & Quality"));
    }
    else if (MarketingTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Marketing and Labeling"));
    } 
    else if (PrivacyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Customer Privacy & Data Security"));
    }else if (BillS211Tabs.includes(activeTab)) {
      dispatch(setHeadertext2("Bill S-211"));
    }
     else {
      dispatch(setHeadertext2(`${activeTab}`));
    }
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("Social"));
  }, [activeTab, dispatch]);

  return (
    <>
      <div className="w-full">
        <div className="flex">
          <div className="">
            <Aside activeTab={activeTab} handleTabClick={handleTabClick} setActiveTab={setActiveTab} />
          </div>
          <div
            className={`${
              open
                ? "sm:w-[87vw] md:w-[87vw] lg:w-[87vw] xl:w-[87vw]  2xl:w-[93vw] 3xl:w-[102vw]"
                : " sm:w-[87vw] md:w-[100vw] lg:w-[100vw] xl:w-[100vw]  2xl:w-[104vw] 3xl:w-[108vw]"
            }`}
          >
            {/* Emissions start */}
            {activeTab === "Management of Material topic Employment" && (
              <EmploymentMaterialtopic />
            )}
             {activeTab === "Identifying Information" && (
              <IdentifingInformation />
            )}
            {activeTab === "Annual report" && (
              <AnnualReport />
            )}
            {activeTab === "Employee Hires & Turnover" && (
              <EmployeeHiresTurnover />
            )}
            {activeTab === "Benefits" && <Benefits />}
            {activeTab === "Parental Leave" && <Parentalleave />}
            {activeTab === "Retirement Benefits" && <Definedbenefit />}
            {activeTab === "Diversity of Employees" && <Diversityemploy />}
            {activeTab === "Management of Material topic Labor Management" && (
              <LaborManagementMaterialtopic />
            )}
            {activeTab === "Notice Period" && <Noticeperiod />}
            {activeTab === "Collective Bargaining" && <CollectiveBargaining />}

            {activeTab === "Management of Material topic OHS" && (
              <OHSMaterialtopic />
            )}
            {activeTab === "OHS Management" && <Ohsmanagment />}
            {activeTab === "Risk Assessment" && <Riskassessment />}
            {activeTab === "Hazard Reporting" && <HazardReporting />} 
            {activeTab === "Workers Right" && <WorkersRight />}
            {activeTab === "OHS Sevices" && <Ohsservices />}
            {activeTab === "Worker Involvement in OHS" && <Workinvolvement />}
            {activeTab === "OHS Training" && <Ohstraining />}
            {activeTab === "Promotion of Health" && <Promotionhealth />}
            {activeTab === "Health Risk Addressed" && <HealthRiskAddressed />}
            {activeTab === "Prevention of OHS Impact" && (
              <Preventionohsimpact />
            )}
            {activeTab === "OHS Management System Coverage" && (
              <Ohsmanagementsystemcoverage />
            )}
            {activeTab === "Injuries" && <Injuries />}
            {activeTab === "Hazard Injuries" && <InjuriesHazards />}
            {activeTab === "Ill-health" && <Illhealth />}
            {activeTab === "Hazards - Ill-health" && <IllhealthHazard />}

            {activeTab ===
              "Management of Material topic Training and Development" && (
              <TrainingMaterialtopic />
            )}
            {activeTab === "Training hours" && <Traininghours />}
            {activeTab === "Skill Upgrade" && <Skillupgrade />}
            {activeTab === "Performance & Career Development" && (
              <Performancedevelopment />
            )}

            {activeTab ===
              "Management of Material topic Diversity & Equal Oppportunity" && (
              <DiversityInclusionMaterialtopic />
            )}
            {activeTab === "Diversity of the Board" && <DiversityBoard />}
           
            {activeTab === "Salary Ratio" && <Salaryratio />}
            {activeTab === "Entry Level Wage" && <Ratiosstandard />}

            {activeTab ===
              "Management of Material topic Non Discrimination" && (
              <NonDiscriminationMaterialtopic />
            )}
            {activeTab === "Incidents of Discrimination" && (
              <IncidentsofDiscrimination />
            )}
            {activeTab === "Management of Material topic Human Rights" && (
              <HumanRightsMaterialtopic />
            )}
            {activeTab === "Community Engagement" && <CommunityEngagement />}
            {activeTab === "Impact on Community" && <ImpactonCommunity />}
            {activeTab === "Indigenous People" && <IndigenousPeople />}
            {activeTab === "Security Personnel" && <Securitypersonnel />}
            {activeTab === "Security Personnel2" && <Securitypersonnel2 />} 

            {activeTab === "Management of Material topic Labour" && (
              <ChildForcedLabourMaterialtopic />
            )}
            {activeTab === "Child Labour" && <Childlabour />}
            {activeTab === "Forced or Compulsory Labour" && <Forcedorcompulsorylabour />}

            {activeTab === "Management of Material topic Supply" && (
              <SupplierMaterialtopic />
            )}
            {activeTab === "Suppliers Screened" && <Impactsactionstaken />}
            {activeTab === "Impacts & Actions Taken" && <Suppliersscreened />}
            {activeTab === "Procurement Practices" && <SoicalProcurementPractices />}
            {activeTab === "Management of Material topic Safety" && (
              <HealthSafetyMaterialtopic />
            )}
            {activeTab === "Product/Service Safety" && <ProductServiceSafety />}
            {activeTab === "Compliance" && <Compliance />}
            {activeTab === "Products & Service" && <ProductsService />}   
            {activeTab === "Management of Material topic Marketing" && (
              <MarketingLabelingMaterialtopic />
            )}
            {activeTab === "Product/Service labelling" && <ProductServicelabelling />}
            {activeTab === "Product/Service Categories Assessed for Compliance" && <ProductServicelabelling2 />}
            {activeTab === "Non compliance incidents- Labelling" && <NoncomplianceincidentsLabelling />}
            {activeTab === "Statement of non compliance - Labeling" && <StatementnoncomplianceLabeling />}
            {activeTab === "Non compliance incidents - Marketing" && <NoncomplianceincidentsMarketing />}
            {activeTab === "Statement of non compliance - Marketing" && <StatementnoncomplianceMarketing />}
            {activeTab === "Management of Material topic Privacy" && (
              <CustomerPrivacyMaterialtopic />
            )}
            {activeTab === "Customer Privacy" && <CustomerPrivacy />}  
        
            {activeTab === "Statement of Fact" && <CustomerPrivacy2 />} 
   
          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
