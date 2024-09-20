'use client'
import { useState } from "react";
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
import Weightvolume from "./Materials/weight-volume/weight-volume";
import Recycled from "./Materials/recycled/recycled";
import Reclaimedproducts from "./Materials/reclaimed-products/reclaimed-products";
import Watersharedresource from "./Water-effluents/water-shared-resource/water-shared-resource";
import Dischargefromareas from "./Water-effluents/discharge-from-all-areas/discharge-from-all-areas";
import Waterstres from "./Water-effluents/water-stres/water-stres";
import Substancesconcern from "./Water-effluents/substances-concern/substances-concern";
import Waterstorage from "./Water-effluents/water-storage/water-storage"
import NewSupplier from "./supplier-environmental-assessment/new-supplier/page"
import NegativeEnvironmentImpact from "./supplier-environmental-assessment/negative-environmental-impact/page"
import { GlobalState } from "@/Context/page";
const environment = ({  }) => {
    const { open } = GlobalState();
    const [activeTab, setActiveTab] = useState('Emissions');

    const handleTabClick = (tab) => {
        setActiveTab(tab);

    };

    return (
        <>
            <div className="w-full">
                <div className="flex">
                <div className="">
                    <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
                </div>
                <div   className={`${open ? "sm:w-[87vw] md:w-[87vw] lg:w-[87vw] xl:w-[87vw]  2xl:w-[100vw] " :" w-[100vw]" }`}>
                  {/* Emissions start  */}
                  {activeTab === 'Emissions' && <Emission />}
                  {/* Energy start  */}
                  {activeTab === 'Energy consumed inside the organization' && <Energyconsumed/>}
                  {activeTab === 'Energy consumption outside of the organization' && <Energyconsumption />}
                  {activeTab === 'Energy Intensity' && <Energyintensity />}
                  {activeTab === 'Reduction of energy consumption' && <Reductionenergyconsumption />}
                  {activeTab === 'Reductions in energy requirements of products and services' && <Energyproductsservices />}
                  {activeTab === 'Significant waste related impact' && <Significantwaste />}
                  {activeTab === 'Management of significant waste related impacts' && <Managementwaste />}
                  {activeTab === 'Waste generated' && <Wastegenerated />}
                  {activeTab === 'Waste Diverted from disposal' && <Wastediverted />}
                  {activeTab === 'Waste diverted to disposal' && <Wastedirected />}
                  {activeTab === 'Materials used by weight or volume' && <Weightvolume />}
                  {activeTab === 'Recycled input materials used' && <Recycled />}
                  {activeTab === 'Reclaimed products and their packaging materials' && <Reclaimedproducts />}
                  {activeTab === 'Interaction with water as shared resource' && <Watersharedresource />}
                  {activeTab === 'Water Withdrawal and Water Discharge from All Areas' && <Dischargefromareas />}
                  {activeTab === 'Water withdrawal/Discharge from areas with water stress' && <Waterstres />}
                  {activeTab === 'Substances of concern' && <Substancesconcern />}
                  {activeTab === 'Change in water storage' && <Waterstorage />}
                  {activeTab === 'New suppliers that were screened using environmental criteria' && <NewSupplier />}
                  {activeTab === 'Negative environmental impacts in the supply chain and actions taken' && <NegativeEnvironmentImpact />}
              </div>
                </div>
             

           
            </div>
        </>
    );


};
export default environment;