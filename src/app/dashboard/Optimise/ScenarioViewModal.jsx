import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiX, FiDownload } from "react-icons/fi";
import NivoYearlyGrowth from "@/app/shared/components/NivoYearlyGrowth";

const ScenarioViewModal = ({ isOpen, onClose, scenarioData }) => {
  if (!scenarioData) return null;
  
  // States for the form selections
  const [selectedScenarios, setSelectedScenarios] = useState([
    { id: scenarioData.id, name: scenarioData.name }, 
    { id: "scenario-b", name: "Scenario B" }
  ]);
  const [scope, setScope] = useState("Aggregated Scope");
  const [category, setCategory] = useState("Aggregated Scope");
  const [subCategory, setSubCategory] = useState("Aggregated Scope");
  const [activity, setActivity] = useState("Aggregated Scope");
  const [businessMetrics, setBusinessMetrics] = useState([
    { id: "fte", name: "FTE" },
    { id: "prod-vol", name: "Production Volume" }
  ]);
  const [includeNetZero, setIncludeNetZero] = useState(true);
  const [targetYear, setTargetYear] = useState(scenarioData.targetYear || 2030);
  
  const handleRemoveScenario = (scenarioId) => {
    setSelectedScenarios(selectedScenarios.filter(s => s.id !== scenarioId));
  };
  
  const handleRemoveMetric = (metricId) => {
    setBusinessMetrics(businessMetrics.filter(m => m.id !== metricId));
  };
  
  const handleAnalyze = () => {
    // This would trigger the analysis process
    console.log("Analyzing scenarios:", selectedScenarios);
  };

  const handleDownloadResult = () => {
    // Logic to download analysis results
    console.log("Downloading results");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-10 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all my-8 max-h-[105vh] flex flex-col">
                {/* Header with close button - fixed at top */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    {scenarioData.name || "Scenario Name"}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto">
                  {/* Scenario details section */}
                  <div className="p-6 border-b border-gray-200 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Organization</p>
                      <p className="font-medium">{scenarioData.organization || "Org A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Corporate</p>
                      <p className="font-medium">{scenarioData.corporate || "Corp A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Base Year</p>
                      <p className="font-medium">{scenarioData.baseYear || "2023"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Target Year</p>
                      <p className="font-medium">{scenarioData.targetYear || "2030"}</p>
                    </div>
                  </div>

                  {/* Scenario visualization section */}
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Scenario Visualization</h3>
                    
                    {/* Scenario selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Scenarios
                      </label>
                      <div className="flex items-center space-x-2">
                        <div className="relative w-full">
                          <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 min-h-[42px]">
                            {selectedScenarios.map(scenario => (
                              <span key={scenario.id} className="bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm flex items-center">
                                {scenario.name}
                                <button 
                                  className="ml-1 text-blue-500 hover:text-blue-700"
                                  onClick={() => handleRemoveScenario(scenario.id)}
                                >
                                  <FiX className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button className="text-gray-400">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <button 
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                          onClick={handleAnalyze}
                        >
                          Analyse Scenario
                        </button>
                      </div>
                    </div>
                    
                    {/* Filters row */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Scope
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            value={scope}
                            onChange={e => setScope(e.target.value)}
                          >
                            <option>Aggregated Scope</option>
                            <option>Scope 1</option>
                            <option>Scope 2</option>
                            <option>Scope 3</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Category
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                          >
                            <option>Aggregated Scope</option>
                            <option>Category 1</option>
                            <option>Category 2</option>
                            <option>Category 3</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Sub Category
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            value={subCategory}
                            onChange={e => setSubCategory(e.target.value)}
                          >
                            <option>Aggregated Scope</option>
                            <option>Sub-Category 1</option>
                            <option>Sub-Category 2</option>
                            <option>Sub-Category 3</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Activity
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            value={activity}
                            onChange={e => setActivity(e.target.value)}
                          >
                            <option>Aggregated Scope</option>
                            <option>Activity 1</option>
                            <option>Activity 2</option>
                            <option>Activity 3</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Business metrics and Net Zero settings */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Metrics
                        </label>
                        <p className="text-sm text-gray-500 mb-2">Scenario A Business Metric</p>
                        <div className="relative w-full">
                          <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 min-h-[42px]">
                            {businessMetrics.map(metric => (
                              <span key={metric.id} className="bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm flex items-center">
                                {metric.name}
                                <button 
                                  className="ml-1 text-blue-500 hover:text-blue-700"
                                  onClick={() => handleRemoveMetric(metric.id)}
                                >
                                  <FiX className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button className="text-gray-400">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Net Zero Settings
                        </label>
                        <div className="flex items-center mb-4">
                          <input
                            id="include-net-zero"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={includeNetZero}
                            onChange={e => setIncludeNetZero(e.target.checked)}
                          />
                          <label htmlFor="include-net-zero" className="ml-2 block text-sm text-gray-900">
                            Include Net Zero
                          </label>
                        </div>
                        <div className="mt-2">
                          <label className="block text-sm text-gray-700">Target year</label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            value={targetYear}
                            onChange={e => setTargetYear(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart visualization */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-medium text-gray-900">
                          Predicted Trend of chosen Business Metrics over Years for (Aggregated Scopes)
                        </h3>
                        <button 
                          onClick={handleDownloadResult}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Download result
                          <FiDownload className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Insert the Nivo chart component */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <NivoYearlyGrowth />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScenarioViewModal;