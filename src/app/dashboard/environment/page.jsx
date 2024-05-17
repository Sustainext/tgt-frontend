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
import Managementwaste from "./Waste/management-waste/management-waste"
const environment = ({ open }) => {
    const [activeTab, setActiveTab] = useState('Emissions');
    const handleTabClick = (tab) => {
        setActiveTab(tab);

    };

    return (
        <>
            <div className="flex w-full">
                <div>
                    <Aside activeTab={activeTab} handleTabClick={handleTabClick} />
                </div>

                <div
                    className="w-full"
                >
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

                </div>
            </div>
        </>
    );


};
export default environment;