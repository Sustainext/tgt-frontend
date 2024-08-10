'use client'
import React, { useState } from 'react';

const EnvironmentTrack = ({ contentSize }) => {
  const [activeTab, setActiveTab] = useState('zohoEmissions');

  const { width, height } = contentSize;

  const tabs = [
    { id: 'zohoEmissions', label: 'Emissions (Zoho)' },
    { id: 'powerbiEmissions', label: 'Emissions (PowerBI)' },
    { id: 'zohoEnergy', label: 'Energy (Zoho)' },
    { id: 'powerbiEnergy', label: 'Energy (PowerBI)' },
    { id: 'zohoWaste', label: 'Waste (Zoho)' },
    { id: 'powerbiWaste', label: 'Waste (PowerBI)' },
];


  const getIframeUrl = (tabId) => {
    switch (tabId) {
      case 'zohoEmissions':
      case 'zohoEnergy':
      case 'zohoWaste':
        return process.env.NEXT_APP_TRACK_URL;
      case 'powerbiEmissions':
      case 'powerbiEnergy':
      case 'powerbiWaste':
        return process.env.NEXT_APP_POWERBI_URL;
      default:
        return '';
    }
  };

  return (
    <div className='flex flex-col justify-start items-center' style={{ width, height }}>
      <div className='w-full mb-4 border-b border-gray-200'>
        <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500'>
          {tabs.map((tab) => (
            <li className='mr-2' key={tab.id}>
              <button
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'hover:text-gray-600 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full flex-grow flex justify-center'>
        <iframe
          frameBorder='0'
          width={width}
          height={height - 50} // Subtracting space for the tabs
          src={getIframeUrl(activeTab)}
        ></iframe>
      </div>
    </div>
  );
};

export default EnvironmentTrack;