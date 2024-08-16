'use client'
import React, { useState } from 'react';
import { GiPublicSpeaker } from "react-icons/gi";

const EnvironmentTrack = ({ contentSize }) => {
  const [activeTab, setActiveTab] = useState('zohoEmissions');

  const { width, height } = contentSize || { width: 800, height: 600 };

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
        return process.env.NEXT_APP_TRACK_URL;
      case 'powerbiEmissions':
        return process.env.NEXT_APP_POWERBI_URL;
      default:
        return null;
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
      <div className='w-full flex-grow flex justify-center items-center'>
        {getIframeUrl(activeTab) ? (
          <iframe
            frameBorder='0'
            width={width}
            height={height - 50}
            src={getIframeUrl(activeTab)}
          ></iframe>
        ) : (
          <div className="coming-soon-container">
            <div className='flex justify-center'>
              <GiPublicSpeaker style={{fontSize:'100px'}} />
            </div>
            <div className="text-xl font-bold my-4">
              <span className="">Coming </span>
              <span className="">Soon !</span>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .coming-soon-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: url('/download.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }
        .coming-soon-container::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.8);  /* This creates the 30% opacity effect */
        }
        .coming-soon-container > div {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default EnvironmentTrack;