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
import Datacollectionmethodology from "./Waste/Data-collection-methodology/Data-collection-methodology"
import Weightvolume from "./Materials/weight-volume/weight-volume";
import Recycled from "./Materials/recycled/recycled";
import Reclaimedproducts from "./Materials/reclaimed-products/reclaimed-products";
import Watersharedresource from "./Water-effluents/water-shared-resource/water-shared-resource";
import Dischargefromareas from "./Water-effluents/discharge-from-all-areas/discharge-from-all-areas";
import Waterstres from "./Water-effluents/water-stres/water-stres";
import Substancesconcern from "./Water-effluents/substances-concern/substances-concern";
import Waterstorage from "./Water-effluents/water-storage/water-storage";
import NewSupplier from "./supplier-environmental-assessment/new-supplier/page";
import NegativeEnvironmentImpact from "./supplier-environmental-assessment/negative-environmental-impact/page";
import Materialtopic from "./Emissions/Management-Material-topic/page";
import EnergyMaterialtopic from "./energy/Management-Material-topic/page";
import WasteMaterialtopic from "./Waste/Management-Material-topic/page";
import MaterialsMaterialtopic from "./Materials/Management-Material-topic/page";
import WaterMaterialtopic from "./Water-effluents/Management-Material-topic/page";
import SupplierMaterialtopic from "./supplier-environmental-assessment/Management-Material-topic/page";
import { GlobalState } from "@/Context/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
  setMiddlename,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";
import Standardsmethodology from "./energy/standards-methodology/standards-methodology"

const environment = () => {
  const { open } = GlobalState();
  const [activeTab, setActiveTab] = useState(
    "Management of Material topic emission"
  );

  const dispatch = useDispatch();

  // Handle tab click and update the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // List of tabs related to Energy\
    const materialnewTabs = [
      "Management of Material topic emission",
      "Management of Material topic Supplier",
      "Management of Material topic Water",
      "Management of Material topic Materials",
      "Management of Material topic waste",
      "Management of Material topic energy",
    ];
    const emissionTabs = ["GHG Emissions"];
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
      "Reclaimed products and their packaging materials",
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

    // Set the header based on the active tab category
    if (emissionTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Emission"));
    } else if (energyTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Energy"));
    } else if (wasteTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Waste"));
    } else if (materialTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Materials"));
    } else if (waterTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Water and effluents"));
    } else if (supplierTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Supplier Environmental Assessment"));
    } else if (materialnewTabs.includes(activeTab)) {
      dispatch(setHeadertext2("Management of Material Topic"));
    } else {
      dispatch(setHeadertext2(`${activeTab}`));
    }
    dispatch(setHeadertext1("Collect"));
    dispatch(setHeaderdisplay("block"));
    dispatch(setMiddlename("Environment"));
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
            {activeTab === "Management of Material topic emission" && (
              <Materialtopic />
            )}
            {activeTab === "GHG Emissions" && <Emission />}
            {/* Energy start */}
            {activeTab === "Management of Material topic energy" && (
              <EnergyMaterialtopic />
            )}
            {activeTab === "Energy consumed inside the organization" && (
              <Energyconsumed />
            )}
            {activeTab === "Energy consumption outside of the organization" && (
              <Energyconsumption />
            )}
            {activeTab === "Energy Intensity" && <Energyintensity />}
            {activeTab === "Reduction of energy consumption" && (
              <Reductionenergyconsumption />
            )}
            {activeTab ===
              "Reductions in energy requirements of products and services" && (
              <Energyproductsservices />
            )}
               {activeTab ===
              "Standards, methodologies, assumptions and calculation tools used" && (
              <Standardsmethodology />
            )}
            
            {/* waste start */}
            {activeTab === "Management of Material topic waste" && (
              <WasteMaterialtopic />
            )}
            {activeTab === "Significant waste related impact" && (
              <Significantwaste />
            )}
            {activeTab ===
              "Management of significant waste related impacts" && (
              <Managementwaste />
            )}
            {activeTab === "Waste generated" && <Wastegenerated />}
            {activeTab === "Waste Diverted from disposal" && <Wastediverted />}
            {activeTab === "Waste diverted to disposal" && <Wastedirected />}
            {activeTab === "Data Collection Methodology" && <Datacollectionmethodology />}    
            {/* Materials  start */}
            {activeTab === "Management of Material topic Materials" && (
              <MaterialsMaterialtopic />
            )}
            {activeTab === "Materials used by weight or volume" && (
              <Weightvolume />
            )}
            {activeTab === "Recycled input materials used" && <Recycled />}
            {activeTab ===
              "Reclaimed products and their packaging materials" && (
              <Reclaimedproducts />
            )}
            {/* Water start */}
            {activeTab === "Management of Material topic Water" && (
              <WaterMaterialtopic />
            )}
            {activeTab === "Interaction with water as shared resource" && (
              <Watersharedresource />
            )}
            {activeTab ===
              "Water Withdrawal and Water Discharge from All Areas" && (
              <Dischargefromareas />
            )}
            {activeTab ===
              "Water withdrawal/Discharge from areas with water stress" && (
              <Waterstres />
            )}
            {activeTab === "Substances of concern" && <Substancesconcern />}
            {activeTab === "Change in water storage" && <Waterstorage />}
            {/* Supplier start */}
            {activeTab === "Management of Material topic Supplier" && (
              <SupplierMaterialtopic />
            )}
            {activeTab ===
              "New suppliers that were screened using environmental criteria" && (
              <NewSupplier />
            )}
            {activeTab ===
              "Negative environmental impacts in the supply chain and actions taken" && (
              <NegativeEnvironmentImpact />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default environment;
