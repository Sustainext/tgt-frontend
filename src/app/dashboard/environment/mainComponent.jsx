"use client";
import { useState, useEffect } from "react";
import Aside from "./sidepanel";
import Energyconsumed from "./energy/energy-consumed/energy-consumed";
import Energyconsumption from "./energy/energy-consumption/energy-consumption";
import Emission from "./Emissions/emissions";
import Energyintensity from "./energy/energy-Intensity/energy-Intensity";
import Reductionenergyconsumption from "./energy/reduction-energy-consumption/reduction-energy-consumption";
import Energyproductsservices from "./energy/energy-products-services/energy-products-services";
import Significantwaste from "./Waste/significant-waste/significant-waste";
import Managementwaste from "./Waste/management-waste/management-waste";
import Wastegenerated from "./Waste/waste-generated/waste-generated";
import Wastediverted from "./Waste/waste-diverted/waste-diverted";
import Wastedirected from "./Waste/waste-directed/waste-directed";
import Datacollectionmethodology from "./Waste/Data-collection-methodology/Data-collection-methodology";
import Weightvolume from "./Materials/weight-volume/weight-volume";
import Recycled from "./Materials/recycled/recycled";
import Reclaimedproducts from "./PackageingMaterial/reclaimed-products/reclaimed-products";
import Watersharedresource from "./Water-effluents/water-shared-resource/water-shared-resource";
import Dischargefromareas from "./Water-effluents/discharge-from-all-areas/discharge-from-all-areas";
import Waterstres from "./Water-effluents/water-stres/water-stres";
import Substancesconcern from "./Water-effluents/substances-concern/substances-concern";
import Waterstorage from "./Water-effluents/water-storage/water-storage";
import NewSupplier from "./supplier-environmental-assessment/new-supplier/page";
import NegativeEnvironmentImpact from "./supplier-environmental-assessment/negative-environmental-impact/page";
import Materialtopic from "../Management-Material-topic/page";
import SignificantSpills from "./Waste/significant-spills/page";
import ConsolidationApproach from "./Emissions/consolidationApproach/page";
import Standards from "./Emissions/standards/page";
import EmissionIntensity from "./Emissions/emission-Intensity/page";
import Emissionreductioninitiativesnew from "./Emissions/emission-reduction-initiatives/page";
import BioDiversityPolicies from "./BioDiversity/BioDiversityPolicies/page";
import OperationalSites from "./BioDiversity/OperationalSites/page";
import Significantimpacts from "./BioDiversity/Significantimpacts/page";
import Habitatprotected from "./BioDiversity/Habitatprotected/page";
import IUCNnational from "./BioDiversity/IUCNnational/page"
import IdentificationOfBioDiversityImpact from './BioDiversity/IdentificationOfBioDiversityImpact/page'
import LocationWithSignificantImpact from './BioDiversity/LocationWithSignificantImpact/page'
import EcosystemServices from  './BioDiversity/EcosystemServices/page'
import ChangesInEcosystemUse from './BioDiversity/ChangesInEcosystemUse/page'
import StandardMethodologies from './BioDiversity/StandardMethodologies/page'
import ProductServicesImpact from './BioDiversity/ProductServicesImpact/page'
import { GlobalState } from "@/Context/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import Standardsmethodology from "./energy/standards-methodology/standards-methodology";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialityData } from "../../../lib/redux/features/materialitySlice";
import { f_setSectionName } from "../../../lib/redux/features/FileInfoSlice";
import BaseYear from "./Emissions/baseYear/page";
import NitrogenOxide from "./AirQuality/NitrogenOxide/page";
import StandardMethodology from "./AirQuality/StandardMethodology/page";
import ODSImportExport from "./AirQuality/ODS-Import-Export/page";
import EmissionsODS from "./AirQuality/Emissions-ODS/page";
import AccessProfitSharing from "./BioDiversity/AccessandProfitSharing/page";
import {
  fetchLocations,
  fetchUsers,
} from "../../../lib/redux/features/emissionSlice";
import StakeholderEngagement from "./BioDiversity/StakeholderEngagement/page";
import ManagementOfBiodiversityImpact from "./BioDiversity/ManagementOfBioDiversityImpact/page";
import { setActivesection } from "../../../lib/redux/features/TCFD/TcfdSlice";
import Cookies from "js-cookie";
const environment = () => {
  const { open } = GlobalState();
  const [mobileopen, setMobileopen] = useState(false);

  const activestap = useSelector((state) => state.Tcfd.activesection);
  const [activeTab, setActiveTab] = useState("");

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

  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    dispatch(f_setSectionName(tab));
    setMobileopen(false);
      dispatch(setActivesection(""));
  };

  useEffect(() => {
    loadMaterialityDashboard();
    dispatch(fetchLocations());
    dispatch(fetchUsers());
  }, [dispatch]);
const materialnewTabs = [
      "Management of Material topic emission",
      "Management of Material topic Supplier",
      "Management of Material topic Water",
      "Management of Material topic Materials",
      "Management of Material topic waste",
      "Management of Material topic energy",
      "Management of Material topic Bio diversity",
      // "Management of Material topic effluent",
      "Management of Material topic air quality",
      "Management of Material topic Packaging Materials",
    ];
    const emissionTabs = [
      "GHG Emissions",
      "Base Year",
      "Consolidation Approach",
      "Standards",
      "EmissionIntensity",
      "EmissionReductionInitiatives",
    ];
    const energyTabs = [
      "Energy consumed inside the organization",
      "Energy consumption outside of the organization",
      "Energy Intensity",
      "Reduction of energy consumption",
      "Reductions in energy requirements of products and services",
      "Standards, methodologies, assumptions and calculation tools used",
    ];

    // List of tabs related to Waste
    const wasteTabs = [
      "Significant waste related impact",
      "Management of significant waste related impacts",
      "Waste generated",
      "Waste Diverted from disposal",
      "Waste diverted to disposal",
      "Data Collection Methodology",
    ];

    // List of tabs related to Materials
    const materialTabs = [
      "Materials used by weight or volume",
      "Recycled input materials used",
    ];

    // List of tabs related to Water
    const waterTabs = [
      "Interaction with water as shared resource",
      "Water Withdrawal and Water Discharge from All Areas",
      "Water withdrawal/Discharge from areas with water stress",
      "Substances of concern",
      "Change in water storage",
    ];

    // List of tabs related to Supplier
    const supplierTabs = [
      "New suppliers that were screened using environmental criteria",
      "Negative environmental impacts in the supply chain and actions taken",
    ];
    const packagingMaterialTabs = [
      "Reclaimed products and their packaging materials",
    ];

    const airQualityTab = [
      "Nitrogen Oxides",
      "Standard Methodology",
      "ODS Import Export",
      "Emissions ODS",
    ];

    const bioDiversityTab = [
      "Biodiversity Policies",
      "Management of biodiversity impacts",
      "Synergies, Trade-offs & Stakeholder Engagement",
      "Access and benefit-sharing",
      "Operational Sites",
    ];
  useEffect(() => {
 
    if (emissionTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Emissions"));
    } else if (energyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Energy"));
    } else if (wasteTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Waste"));
    } else if (materialTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Material Use and Efficiency"));
    } else if (packagingMaterialTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Packaging Material"));
    } else if (waterTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Water and effluents"));
    } else if (supplierTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Supplier Environmental Assessment"));
    } else if (bioDiversityTab.includes(activeTab)) {
      dispatch(setHeadertext2("Biodiversity"));
    } else if (airQualityTab.includes(activeTab)) {
      dispatch(setHeadertext2("Air Quality"));
    } else if (materialnewTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Management of Material Topic"));
    } else {
      dispatch(setHeadertext2(`${activeTab}`));
    }
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("Environment"));
  }, [activeTab, dispatch]);

useEffect(() => {
  const allTabNames = [
    ...materialnewTabs,
    ...emissionTabs,
    ...energyTabs,
    ...wasteTabs,
    ...materialTabs,
    ...waterTabs,
    ...supplierTabs,
    ...packagingMaterialTabs,
    ...airQualityTab,
    ...bioDiversityTab,
  ];
  
  if (activestap && allTabNames.includes(activestap)) {
    setActiveTab(activestap);
    return;
  }

  // Don't override if user already picked a tab!
  if (!activeTab && data && data.environment) {
    if (data.environment.EnvGhgEmission?.is_material_topic) {
     setActiveTab("Management of Material topic emission");
    } else {
      setActiveTab("GHG Emissions");
    }
  }
 
}, [activestap, data]);
  return (
    <>
      <div className="w-full">
        <div className="block xl:flex lg:flex md:block 2xl:flex 4k:flex">
          <div className="hidden xl:block lg:block md:hidden 2xl:block 4k:block">
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
                  ? "sm:w-[87vw]  md:w-[120vw] lg:w-[86vw] xl:w-[87vw]  2xl:w-[93vw] 3xl:w-[102vw] 4k:w-[37vw]"
                  : " sm:w-[87vw] md:w-[120vw] lg:w-[100vw] xl:w-[100vw]  2xl:w-[104vw] 3xl:w-[108vw] 4k:w-[41vw]"
              }`}
            >
              {/* Emissions start */}
              {activeTab === "Management of Material topic emission" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={"gri_collect_emission_management_material_topic"}
                  headingname={"Emission"}
                  Envdata={"EnvGhgEmission"}
                />
              )}
              {activeTab === "GHG Emissions" && (
                <Emission
                  apiData={data}
                  setMobileopen={setMobileopen}
                  frameworkId={frameworkId}
                  disclosures={parsedDisclosures}
                />
              )}
              {activeTab === "Base Year" && (
                <BaseYear apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Consolidation Approach" && (
                <ConsolidationApproach
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Standards" && (
                <Standards apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "EmissionIntensity" && (
                <EmissionIntensity
                  apiData={data}
                  setMobileopen={setMobileopen}
                  frameworkId={frameworkId}
                  disclosures={parsedDisclosures}
                />
              )}
              {activeTab === "EmissionReductionInitiatives" && (
                <Emissionreductioninitiativesnew
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {/* Energy start */}
              {activeTab === "Management of Material topic energy" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={"gri_collect_energy_management_material_topic"}
                  headingname={"Energy"}
                  Envdata={"EnvEnergy"}
                />
              )}
              {activeTab === "Energy consumed inside the organization" && (
                <Energyconsumed apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab ===
                "Energy consumption outside of the organization" && (
                <Energyconsumption
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Energy Intensity" && (
                <Energyintensity apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Reduction of energy consumption" && (
                <Reductionenergyconsumption
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Reductions in energy requirements of products and services" && (
                <Energyproductsservices
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Standards, methodologies, assumptions and calculation tools used" && (
                <Standardsmethodology
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {/* waste start */}
              {activeTab === "Management of Material topic waste" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={"gri_collect_waste_management_material_topic"}
                  headingname={"Waste"}
                  Envdata={"EnvWasteManagement"}
                />
              )}
              {activeTab === "Significant waste related impact" && (
                <Significantwaste
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Management of significant waste related impacts" && (
                <Managementwaste apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Waste generated" && (
                <Wastegenerated apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Waste Diverted from disposal" && (
                <Wastediverted apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Waste diverted to disposal" && (
                <Wastedirected apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Data Collection Methodology" && (
                <Datacollectionmethodology
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Significant Spills" && (
                <SignificantSpills
                  apiData={data}
                  setMobileopen={setMobileopen}
                  isSidepanelOpen={open}
                />
              )}

              {/* Materials  start */}
              {activeTab === "Management of Material topic Materials" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={"gri_collect_materials_management_material_topic"}
                  headingname={"Material Use and Efficiency"}
                  Envdata={"EnvRawMaterialSourcing"}
                />
              )}
              {activeTab === "Materials used by weight or volume" && (
                <Weightvolume apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Recycled input materials used" && (
                <Recycled apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab ===
                "Management of Material topic Packaging Materials" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={
                    "gri-environment-packaging-material-management-of-material-topic"
                  }
                  headingname={"Packaging Material"}
                  Envdata={"EnvPackagingMaterial"}
                />
              )}
              {activeTab ===
                "Reclaimed products and their packaging materials" && (
                <Reclaimedproducts
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}

              {/* Bio diversity */}
              {activeTab === "Management of Material topic Bio diversity" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={
                    "gri-environment-biodiversity-management-of-material-topic"
                  }
                  headingname={"Biodiversity"}
                  Envdata={"EnvBioDiversityLandUse"}
                />
              )}
              {activeTab === "Biodiversity Policies" && (
                <BioDiversityPolicies
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Access and benefit-sharing" && (
                <AccessProfitSharing
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Synergies, Trade-offs & Stakeholder Engagement" && (
                <StakeholderEngagement
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Management of biodiversity impacts" && (
                <ManagementOfBiodiversityImpact
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {/* Water start */}
              {activeTab === "Management of Material topic Water" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={
                    "gri_collect_water_and_effluents_management_material_topic"
                  }
                  headingname={"Water and effluents"}
                  Envdata={"EnvWaterEffluent"}
                />
              )}
              {activeTab === "Interaction with water as shared resource" && (
                <Watersharedresource
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Water Withdrawal and Water Discharge from All Areas" && (
                <Dischargefromareas
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab ===
                "Water withdrawal/Discharge from areas with water stress" && (
                <Waterstres apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Substances of concern" && (
                <Substancesconcern
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Change in water storage" && (
                <Waterstorage apiData={data} setMobileopen={setMobileopen} />
              )}
              {/* Supplier start */}
              {activeTab === "Management of Material topic Supplier" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={
                    "gri_collect_supplier_environmental_assessment_management_material_topic"
                  }
                  headingname={"Supplier Environmental Assessment"}
                  Envdata={"EnvSupplyChainSustainability"}
                />
              )}
              {activeTab ===
                "New suppliers that were screened using environmental criteria" && (
                <NewSupplier apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab ===
                "Negative environmental impacts in the supply chain and actions taken" && (
                <NegativeEnvironmentImpact
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "Management of Material topic air quality" && (
                <Materialtopic
                  apiData={data}
                  topheading={"Environment"}
                  setMobileopen={setMobileopen}
                  view_path={
                    "gri-environment-air-quality-management_of_material_topic"
                  }
                  headingname={"Air Quality & other emissions"}
                  Envdata={"EnvAirQuality"}
                />
              )}
              {activeTab === "Nitrogen Oxides" && (
                <NitrogenOxide apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Standard Methodology" && (
                <StandardMethodology
                  apiData={data}
                  setMobileopen={setMobileopen}
                />
              )}
              {activeTab === "ODS Import Export" && (
                <ODSImportExport apiData={data} setMobileopen={setMobileopen} />
              )}
              {activeTab === "Emissions ODS" && (
                <EmissionsODS apiData={data} setMobileopen={setMobileopen} />
              )}  
               {activeTab === "Operational Sites" && (
                <OperationalSites apiData={data} setMobileopen={setMobileopen} />
              )}
               {activeTab === "Significant impacts" && (
                <Significantimpacts apiData={data} setMobileopen={setMobileopen} />
              )} 
              {activeTab === "Habitat Protected" && (
                <Habitatprotected apiData={data} setMobileopen={setMobileopen} />
              )}  
                  {activeTab === "IUCN" && (
                <IUCNnational apiData={data} setMobileopen={setMobileopen} />
              )}  
              {activeTab==='Identification of biodiversity impacts' && (
                <IdentificationOfBioDiversityImpact apiData={data} setMobileopen={setMobileopen}/>
              )}
              {
                activeTab==='Location with Significant impacts on Biodiversity' && (
                  <LocationWithSignificantImpact apiData={data} setMobileopen={setMobileopen}/>
                )
              }
              {
                activeTab==='Ecosystem services and beneficiaries' && (
                  <EcosystemServices apiData={data} setMobileopen={setMobileopen}/>
                )
              }
              {
                activeTab==='Changes in Ecosystem Use and Biodiversity Condition' && (
                  <ChangesInEcosystemUse apiData={data} setMobileopen={setMobileopen}/>
                )
              }
              {
                activeTab ==='Standards, methodologies, and assumptions' && (
                  <StandardMethodologies apiData={data} setMobileopen={setMobileopen}/>
                )
              }
              {
                activeTab ==='Products/Services with impact on Biodiversity' && (
                  <ProductServicesImpact apiData={data} setMobileopen={setMobileopen}/>
                )
              }
              
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default environment;
