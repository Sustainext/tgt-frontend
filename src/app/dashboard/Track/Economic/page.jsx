'use client';
import React, { useState, useEffect } from 'react';
import { GiPublicSpeaker } from 'react-icons/gi';
import axiosInstance from '../../../utils/axiosMiddleware';
import dynamic from 'next/dynamic';
import { loadFromLocalStorage } from '@/app/utils/storage';

const PowerBIEmbed = dynamic(
  () => import('powerbi-client-react').then((mod) => mod.PowerBIEmbed),
  { ssr: false }
);

const EconomicTrack = ({ dashboardData }) => {
  const [activeTab, setActiveTab] = useState('powerbiEconomic');
  const [powerBIToken, setPowerBIToken] = useState(null);
  const [models, setModels] = useState(null);
  const [userID, setUserID] = useState(null);

  // Load user ID from local storage
  useEffect(() => {
    const userID = loadFromLocalStorage('user_id');
    if (userID) {
      setUserID(userID);
    }
  }, []);

  const filter = {
    $schema: 'http://powerbi.com/product/schema#basic',
    target: {
      table: 'Org_Info',
      column: 'Custom User ID',
    },
    operator: 'In',
    values: [userID],
  };

  const tabs = [{ id: 'powerbiEconomic', label: 'Economic (PowerBI)' }];

  useEffect(() => {
    const loadModels = async () => {
      const powerbiClient = await import('powerbi-client');
      setModels(powerbiClient.models);
    };

    loadModels();
  }, []);

  useEffect(() => {
    const fetchPowerBIToken = async () => {
      try {
        const response = await axiosInstance('api/auth/powerbi_token/');
        const data = response.data;
        setPowerBIToken(data.access_token);
      } catch (error) {
        console.error('Error fetching PowerBI token:', error);
      }
    };

    fetchPowerBIToken();
  }, []);

  const getIframeUrl = (tabId) => {
    switch (tabId) {
      default:
        return null;
    }
  };

  const getPowerBIConfig = (tabId) => {
    if (!dashboardData) return null;

    let reportConfig;
    switch (tabId) {
      case 'powerbiEconomic':
        reportConfig = dashboardData.find((item) => item.economic)?.economic;
        console.log('config for economic', reportConfig);

        break;
      default:
        return null;
    }

    if (!reportConfig) return null;

    return {
      type: 'report',
      id: reportConfig.report_id,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportConfig.report_id}&groupId=${reportConfig.group_id}&w=2`,
      accessToken: powerBIToken,
      tokenType: models.TokenType.Aad,
      filters: [filter],
      settings: {
        panes: {
          filters: {
            expanded: false,
            visible: false,
          },
        },
        background: models.BackgroundType.Default,
      },
    };
  };

  useEffect(() => {
    const refreshReport = async () => {
      if (window.report) {
        try {
          await window.report.refresh();
          console.log('Report refreshed');
        } catch (errors) {
          console.log(errors);
        }
      }
    };
    const intervalId = setInterval(() => {
      refreshReport();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  if (!models || !PowerBIEmbed || !dashboardData) return <p>Loading...</p>;
  if (dashboardData.length === 0) return <p>Data not available</p>;

  return (
    <div className='flex flex-col justify-start items-center w-full h-full max-w-full min-h-screen p-4 overflow-hidden'>
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
        {activeTab.startsWith('powerbi') && powerBIToken ? (
          <div className='w-full  h-[65vh] max-w-full overflow-hidden'>
            <PowerBIEmbed
              embedConfig={getPowerBIConfig(activeTab)}
              eventHandlers={
                new Map([
                  [
                    'loaded',
                    function () {
                      console.log('Report loaded');
                    },
                  ],
                  [
                    'rendered',
                    function () {
                      console.log('Report rendered');
                    },
                  ],
                  [
                    'error',
                    function (event) {
                      console.log(event.detail);
                    },
                  ],
                  ['visualClicked', () => console.log('visual clicked')],
                  ['pageChanged', (event) => console.log(event)],
                ])
              }
              cssClassName='w-full h-full'
              getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
              }}
            />
          </div>
        ) : getIframeUrl(activeTab) ? (
          <iframe
            frameBorder='0'
            className='w-full min-h-[600px] h-[70vh] max-w-full'
            src={getIframeUrl(activeTab)}
          ></iframe>
        ) : (
          <div className='coming-soon-container'>
            <div className='flex justify-center'>
              <GiPublicSpeaker style={{ fontSize: '100px' }} />
            </div>
            <div className='text-xl font-bold my-4'>
              <span className=''>Loading... </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EconomicTrack;
