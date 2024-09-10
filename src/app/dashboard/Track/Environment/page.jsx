"use client";
import React, { useEffect, useState } from "react";
import { GiPublicSpeaker } from "react-icons/gi";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from 'axios'

const EnvironmentTrack = ({ contentSize }) => {
  const [activeTab, setActiveTab] = useState("zohoEmissions");

  const supersetUrl = "https://superset-dev.sustainext.ai";
  const supersetApiUrl = supersetUrl + "/api/v1/security";
  const dashboardId = "239841c1-c7ee-4bfe-938c-0da7724b0d06";

  const { width, height } = contentSize || { width: 800, height: 600 };

  const tabs = [
    { id: "zohoEmissions", label: "Emissions (Zoho)" },
    { id: "powerbiEmissions", label: "Emissions (PowerBI)" },
    { id: "superSetEmissions", label: "Emissions (Superset)" },
    { id: "powerbiEnergy", label: "Energy (PowerBI)" },
    { id: "powerbiWaste", label: "Waste (PowerBI)" },
    { id: "superSetWaste", label: "Waste (Superset)" },
  ];

  const getIframeUrl = (tabId) => {
    switch (tabId) {
      case "zohoEmissions":
        return process.env.NEXT_APP_ZOHO_URL_EMISSIONS;
      case "powerbiEmissions":
        return process.env.NEXT_APP_POWERBI_URL_ENV_EMISSIONS;
      case "superSetEmissions":
        return process.env.NEXT_APP_SUPERSET_URL_ENV_EMISSIONS;
      case "powerbiEnergy":
        return process.env.NEXT_APP_POWERBI_URL_ENV_ENERGY;
      case "powerbiWaste":
        return process.env.NEXT_APP_POWERBI_URL_ENV_WASTE;
      case "superSetWaste":
        return process.env.NEXT_APP_SUPERSET_URL_ENV_WASTE;
      default:
        return null;
    }
  };

  async function getToken() {
    // This uses admin creds to fetch the token
    const login_body = {
      password: "sustainext@1234",
      provider: "db",
      refresh: true,
      username: "admin@sustainext.ai",
    };
    const csrfToken = 'IjY5NzZhY2M3Y2ZjZmJlODIxMjIzNmVmMzA2MzVkYWVhOWU4NTQ5MDIi.Zt_kIQ.2grXIEJjtGg5S8Xpf1ASaqmbh3Q'
    const login_headers = {
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrfToken, 
      },
    };

    const { data } = await axios.post(
      supersetApiUrl + "/login",
      login_body,
      login_headers
    );
    const access_token = data["access_token"];
    console.log(access_token);

    // Calling guest token
    const guest_token_body = JSON.stringify({
      resources: [
        {
          type: "dashboard",
          id: dashboardId,
        },
      ],
      rls: [],
      user: {
        username: "",
        first_name: "",
        last_name: "",
      },
    });

    const guest_token_headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    };

    // Calling guest token endpoint to get the guest_token
    await axios
      .post(
        supersetApiUrl + "/guest_token/",
        guest_token_body,
        guest_token_headers
      )
      .then((dt) => {
        console.log(dt.data["token"]);
        embedDashboard({
          id: dashboardId, // Use the id obtained from enabling embedding dashboard option
          supersetDomain: supersetUrl,
          mountPoint: document.getElementById("superset-container"), // html element in which iframe will be mounted to show the dashboard
          fetchGuestToken: () => dt.data["token"],
          dashboardUiConfig: {
            // hideTitle: true,
            // hideTab:true
            filters: {
              expanded: true,
            },
            urlParams: {
              standalone: 3, // here you can add the url_params and there values
            },
          },
        });
      });
  }

  // useEffect(()=>{
  //   getToken();
  // },[])

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
        {getIframeUrl(activeTab) ? (
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


