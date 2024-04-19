'use client'
import { useState } from "react";
import Aside from "./sidepanel";
import Energyconsumption from "./energy/energy-consumption/energy-consumption";
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
                    {/* {activeTab === 'Emissions' && <Emissions />} */}
                    {/* Energy start  */}
                    {activeTab === 'Energy consumed inside the organization' && <Energyconsumption open={open} />}
                    {/* {activeTab === 'Energy consumption outside of the organization' && <Energyconsumptionoutside />}
        {activeTab === 'Energy Intensity' && <Energyintensity />}
        {activeTab === 'Reduction of energy consumption' && <Reductionenergyconsumption />}
        {activeTab === 'Reductions in energy requirements of products and services' && <Energyproductsservices />} */}
                    {/* waste start  */}
                    {/* {activeTab === 'Significant waste related impact' && <Significantwaste />}
        {activeTab === 'Management of significant waste related impacts' && <Managementwaste />}
        {activeTab === 'Waste generated' && <Wastegenerated />}
        {activeTab === 'Waste Diverted from disposal' && <Wastefromdisposal />}
        {activeTab === 'Waste diverted to disposal' && <Wastetodisposal />} */}
                    {/* Water start  */}
                    {/* {activeTab === 'Interaction with water as shared resource' && <Watersharedresource />}
        {activeTab === 'Water Withdrawal and Water Discharge from All Areas' && <Waterdischargefromallareas />}
        {activeTab === 'Water withdrawal/Discharge from areas with water stress' && <Waterstres />}
        {activeTab === 'Substances of concern' && <Substancesofconcern />}
        {activeTab === 'Change in water storage' && <Waterstorage />} */}
                    {/* Materials start  */}
                    {/* {activeTab === 'Materials used by weight or volume' && <Materials1 />}
        {activeTab === 'Recycled input materials used' && <Materials2 />}
        {activeTab === 'Reclaimed products and their packaging materials' && <Materials3 />} */}

                </div>
            </div>
        </>
    );


};
export default environment;