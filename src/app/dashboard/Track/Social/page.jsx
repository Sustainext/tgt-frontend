'use client'
import React, { useState } from 'react';
import { GiPublicSpeaker } from "react-icons/gi";

const SocialTrack = ({ contentSize }) => {
  const [activeTab, setActiveTab] = useState('powerbiSocialEmployment');

  const { width, height } = contentSize || { width: 800, height: 600 }; // Fallback values

  const tabs = [
    { id: 'powerbiSocialEmployment', label: 'Employment (PowerBI)' },
    { id: 'powerbiSocialOHS', label: 'OHS (PowerBI)' },
    { id: 'powerbiSocialDiversityInclusion', label: 'Diversity & Inclusion (PowerBI)' },
    { id: 'powerbiSocialCommunityDevelopment', label: 'Community Development (PowerBI)' },
  ];
  
  const getIframeUrl = (tabId) => {
    switch (tabId) {
      case 'powerbiSocialEmployment':
        return process.env.NEXT_APP_POWERBI_URL_SOCIAL_EMPLOYMENT;
      case 'powerbiSocialOHS':
        return process.env.NEXT_APP_POWERBI_URL_SOCIAL_OHS;
        case 'powerbiSocialDiversityInclusion':
        return process.env.NEXT_APP_POWERBI_URL_SOCIAL_DIVERSITYINCLUSION;
      case 'powerbiSocialCommunityDevelopment':
        return process.env.NEXT_APP_POWERBI_URL_SOCIAL_COMMUNITYDEVELOPMENT;
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
    </div>
  );
};

export default SocialTrack;