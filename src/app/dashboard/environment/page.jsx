'use client'
import { useState } from "react";
import Aside from "./sidepanel";
import Energyconsumption from "./energy/energy-consumed/energy-consumed";
import Emission from "./Emissions/emissions"
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
                    {activeTab === 'Energy consumed inside the organization' && <Energyconsumption />}
                </div>
            </div>
        </>
    );


};
export default environment;