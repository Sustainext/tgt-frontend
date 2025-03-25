import React, { useState } from "react";
import ScenarioTable from "./ScenarioTable";
// import ScenarioAnalysis from "./ScenarioAnalysis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScenarioDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <>
      <ToastContainer style={{fontSize: '12px'}} />
      <div className="p-4">
        {/* Header */}
        <div className="h-20 py-4 bg-white shadow-sm border-b border-gray-200 flex items-center mb-4">
          <h1 className="text-2xl font-medium gradient-text">
            Scenario Analysis
          </h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("home")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "home"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "analysis"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Analyse Scenario
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === "home" ? <ScenarioTable /> : ""}
      </div>
    </>
  );
};

export default ScenarioDashboard;
