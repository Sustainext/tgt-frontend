"use client";
import React, { useState } from "react";
import { FiArrowLeft, FiInfo, FiCheck } from "react-icons/fi";
import NivoYearlyGrowth from "@/app/shared/components/NivoYearlyGrowth";

const ScenarioEditor = ({ scenario, onSave, onCancel }) => {
  // Current step in the wizard (1-4)
  const [currentStep, setCurrentStep] = useState(1);

  // Selected metrics with toggle state
  const [selectedMetrics, setSelectedMetrics] = useState({
    fte: false,
    area: false,
    productionVolume: false,
    revenue: false,
  });

  // Business metric data (expanded when selected)
  const businessMetrics = [
    {
      id: "fte",
      name: "FTE",
      description:
        "The total number of full-time hours worked by both full-time and part-time employees",
    },
    {
      id: "area",
      name: "Area",
      description:
        "Area refers to the physical area occupied or operated by the organization — office space, factory, or land area.",
    },
    {
      id: "productionVolume",
      name: "Production Volume",
      description:
        "The total number of units produced within a specific timeframe",
    },
    {
      id: "revenue",
      name: "Revenue",
      description:
        "Total earnings of a business from selling its products or services within a specified timeframe",
    },
  ];

  // Handle toggle selection of a metric
  const toggleMetric = (metricId) => {
    setSelectedMetrics((prev) => ({
      ...prev,
      [metricId]: !prev[metricId],
    }));
  };

  // Go to next step
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save the completed scenario
      onSave(scenario);
    }
  };

  // Go back to dashboard
  const handleBackToDashboard = () => {
    onCancel();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-medium gradient-text">
                {scenario?.name || "Scenario 1"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mx-8 my-8 flex justify-between items-center gap-[5rem]">
        <div className="w-3/5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Select Business Metric
          </h2>
          <p className="text-gray-600 mb-6">
            Select the key metrics which will be required for planning the
            emission reduction initiative for this scenario?. Include current
            year absolute value for the selected business metric and apply any
            changes in the consumption pattern that you foresee. Use the graph
            to increase or decrease the percentage consumptions for the
            available years within the time period of the scenario?.
          </p>

          {/* Progress Steps */}
          <div className="mb-8 max-w-lg">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center ${
                  currentStep >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 1
                      ? "border-blue-500 text-blue-600"
                      : "bg-blue-500 opacity-40"
                  }`}
                >
                  {currentStep > 1 ? <FiCheck className="h-5 w-5" /> : 1}
                </div>
              </div>
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  currentStep >= 2 ? "" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 2
                      ? "border-blue-500 text-blue-600"
                      : "bg-blue-500 opacity-40"
                  }`}
                >
                  {currentStep > 2 ? <FiCheck className="h-5 w-5" /> : 2}
                </div>
              </div>
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  currentStep >= 3 ? "text-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 3 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 3
                      ? "border-blue-500 text-blue-600"
                      : "bg-blue-500 opacity-40"
                  }`}
                >
                  {currentStep > 3 ? <FiCheck className="h-5 w-5" /> : 3}
                </div>
              </div>
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  currentStep >= 4 ? "text-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 4 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= 4
                      ? "border-blue-500 text-blue-600"
                      : "bg-blue-500 opacity-40"
                  }`}
                >
                  {currentStep > 4 ? <FiCheck className="h-5 w-5" /> : 4}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 px-4 sm:px-6 lg:px-8 py-8">
          {/* Scenario Details */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500">Organization</p>
              <p className="font-medium">{scenario?.organization || "Org A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Corporate</p>
              <p className="font-medium">{scenario?.corporate || "Corp A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Base Year</p>
              <p className="font-medium">{scenario?.baseYear || "2024"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Target Year</p>
              <p className="font-medium">{scenario?.targetYear || "2030"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Select Business Metric */}
      {currentStep === 1 && (
        <>
          <div className="space-y-4 px-8">
            {businessMetrics.map((metric) => (
              <div
                key={metric.id}
                className={`bg-white border rounded-lg shadow-sm overflow-hidden ${
                  selectedMetrics[metric.id]
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={selectedMetrics[metric.id]}
                        onChange={() => toggleMetric(metric.id)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <span className="ml-3 font-medium">{metric.name}</span>
                    <FiInfo className="ml-2 text-gray-400" />
                  </div>
                  <div className="text-gray-600 items-start">{metric.description}</div>
                  <div></div>
                </div>

                {/* Expanded content when metric is selected */}
                {selectedMetrics[metric.id] && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Yearly Growth Projection
                    </h3>
                    <div className="h-96">
                      {/* <NivoYearlyGrowth /> */}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Footer with navigation buttons */}
      <div className="mt-8 flex justify-end px-8">
        <button
          onClick={handleNext}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {currentStep < 4 ? "Next" : "Save"} →
        </button>
      </div>
    </div>
  );
};

export default ScenarioEditor;
