"use client";
import React, { useState, useEffect } from "react";
import { GiPublicSpeaker } from "react-icons/gi";
// import { PowerBIEmbed } from "powerbi-client-react";
// import { models } from "powerbi-client";
import axiosInstance from '../../../utils/axiosMiddleware';
import dynamic from 'next/dynamic'

const PowerBIEmbed = dynamic(
  () => import("powerbi-client-react").then(mod => mod.PowerBIEmbed),
  { ssr: false }
);

const EnvironmentTrack = ({ contentSize, dashboardData }) => {
  const [activeTab, setActiveTab] = useState("zohoEmissions");
  const [powerBIToken, setPowerBIToken] = useState(null);
  const [models, setModels] = useState(null);
  const { width, height } = contentSize || { width: 800, height: 600 };

  const tabs = [
    { id: "zohoEmissions", label: "Emissions (Zoho)" },
    { id: "powerbiEmissions", label: "Emissions (PowerBI)" },
    { id: "superSetEmissions", label: "Emissions (Superset)" },
    { id: "powerbiEnergy", label: "Energy (PowerBI)" },
    { id: "powerbiWaste", label: "Waste (PowerBI)" },
    { id: "superSetWaste", label: "Waste (Superset)" },
  ];

  useEffect(() => {
    const loadModels = async () => {
      const powerbiClient = await import("powerbi-client");
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
        console.error("Error fetching PowerBI token:", error);
      }
    };
  
    fetchPowerBIToken();
  }, []);
  
  const getIframeUrl = (tabId) => {
    switch (tabId) {
      case "zohoEmissions":
        return process.env.NEXT_APP_ZOHO_URL_EMISSIONS;
      case "superSetEmissions":
        return process.env.NEXT_APP_SUPERSET_URL_ENV_EMISSIONS;
      case "superSetWaste":
        return process.env.NEXT_APP_SUPERSET_URL_ENV_WASTE;
      default:
        return null;
    }
  };

  const getPowerBIConfig = (tabId) => {
    if (!dashboardData) return null;

    let reportConfig;
    switch (tabId) {
      case "powerbiEmissions":
        reportConfig = dashboardData.find(item => item.emission)?.emission;
        break;
      case "powerbiEnergy":
        reportConfig = dashboardData.find(item => item.energy)?.energy;
        break;
      case "powerbiWaste":
        reportConfig = dashboardData.find(item => item.waste)?.waste;
        break;
      default:
        return null;
    }

    if (!reportConfig) return null;

    return {
      type: "report",
      id: reportConfig.report_id,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportConfig.report_id}&groupId=${reportConfig.group_id}&w=2`,
      accessToken: powerBIToken,
      tokenType: models.TokenType.Aad,
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
          console.log("Report refreshed");
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

  const embedContainerStyle = {
    width: `${width}px`,
    height: `${height - 50}px`,
  };

  if (!models || !PowerBIEmbed) return <p>Loading...</p>;

  return (
    <div
      className="flex flex-col justify-start items-center"
      style={{ width, height }}
    >
      <div className="w-full mb-4 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          {tabs.map((tab) => (
            <li className="mr-2" key={tab.id}>
              <button
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-gray-600 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex-grow flex justify-center items-center">
        {activeTab.startsWith("powerbi") && powerBIToken ? (
          <div style={embedContainerStyle}>
            <PowerBIEmbed
              embedConfig={getPowerBIConfig(activeTab)}
              eventHandlers={
                new Map([
                  [
                    "loaded",
                    function () {
                      console.log("Report loaded");
                    },
                  ],
                  [
                    "rendered",
                    function () {
                      console.log("Report rendered");
                    },
                  ],
                  [
                    "error",
                    function (event) {
                      console.log(event.detail);
                    },
                  ],
                  ["visualClicked", () => console.log("visual clicked")],
                  ["pageChanged", (event) => console.log(event)],
                ])
              }
              cssClassName="w-full h-full"
              getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
              }}
            />
          </div>
        ) : getIframeUrl(activeTab) ? (
          <iframe
            frameBorder="0"
            width={width}
            height={height - 50}
            src={getIframeUrl(activeTab)}
          ></iframe>
        ) : (
          <div className="coming-soon-container">
            <div className="flex justify-center">
              <GiPublicSpeaker style={{ fontSize: "100px" }} />
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

export default EnvironmentTrack;