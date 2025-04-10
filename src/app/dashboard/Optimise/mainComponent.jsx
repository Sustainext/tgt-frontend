import React, { useState, useEffect } from "react";
import ScenarioTable from "./ScenarioTable";
import CompareScenarios from "./CompareScenarios/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../lib/redux/features/topheaderSlice";
import { useDispatch } from "react-redux";

const ScenarioDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTab === "home") {
      dispatch(setHeadertext1("Optimise"));
      dispatch(setHeaderdisplay("none"));
      dispatch(setHeadertext2("Scenario Creation Dashboard"));
    }
    else {
      dispatch(setHeadertext1("Optimise"));
      dispatch(setHeaderdisplay("none"));
      dispatch(setHeadertext2("Compare Scenarios"));
    }
  }, [dispatch, activeTab]);

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="px-0 py-4">
        {/* Header */}
        <div className="h-20 px-8 py-4 bg-white shadow-sm border-b border-gray-200 flex items-center mb-4">
          <h1 className="text-2xl font-medium gradient-text">
            Scenario Analysis
          </h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 px-8">
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
              Compare Scenarios
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === "home" ? <ScenarioTable /> : ""}
        {/* {activeTab === "analysis" ? <CompareScenarios /> : ""} */}
      </div>
    </>
  );
};

export default ScenarioDashboard;
