import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiX, FiDownload, FiChevronDown } from "react-icons/fi";
import NivoYearlyGrowth from "@/app/shared/components/NivoYearlyGrowth";

const ScenarioViewModal = ({ isOpen, onClose, scenarioData }) => {
  if (!scenarioData) return null;
  
  // States for the form selections
  const [selectedScenarios, setSelectedScenarios] = useState([
    { id: scenarioData.id, name: scenarioData.name }
  ]);
  const [scope, setScope] = useState("Aggregated Scope");
  const [category, setCategory] = useState("Aggregated Scope");
  const [subCategory, setSubCategory] = useState("Aggregated Scope");
  const [activity, setActivity] = useState("Aggregated Scope");
  const [businessMetrics, setBusinessMetrics] = useState([
    { id: "fte", name: "FTE" },
    { id: "area", name: "Area" },
    { id: "production-volume", name: "Production Volume" }
  ]);
  const [includeNetZero, setIncludeNetZero] = useState(true);
  const [targetYear, setTargetYear] = useState(scenarioData.targetYear || 2030);
  
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
              <Dialog.Panel className="w-full max-w-[1200px] transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all my-8 max-h-[105vh] flex flex-col">
                {/* Header section with scenario details */}
                <div className="p-6 pb-4">
                  <Dialog.Title className="text-2xl font-medium text-gray-900 mb-3">
                    {scenarioData.name || "Scenario Name"}
                  </Dialog.Title>
                  
                  <div className="flex flex-wrap gap-x-8 text-sm">
                    <div className="mb-2">
                      <span className="text-gray-500">Organization:</span>{" "}
                      <span className="text-blue-600 font-semibold bg-blue-100 rounded-md px-2 py-0.5">{scenarioData.organization || "Umbrella Pharmaceuticals"}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-500">Corporate Entity:</span>{" "}
                      <span className="text-green-600 font-semibold bg-green-100 rounded-md px-2 py-0.5">{scenarioData.corporate || "Umbrella Corp."}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-500">Base Year:</span>{" "}
                      <span className="font-medium">{scenarioData.baseYear || "2024"}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-500">Target Year:</span>{" "}
                      <span className="font-medium">{scenarioData.targetYear || "2030"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200"></div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {/* Results section */}
                  <div className="mb-6">
                    <h2 className="text-md font-semibold text-gray-900 mb-4">Showing Result for:</h2>
                    
                    {/* Filters row */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="flex justify-start items-center">
                        <label className="block text-sm text-gray-500 mb-1">
                          Scope:
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full rounded-md border-none border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 appearance-none bg-white"
                            value={scope}
                            onChange={e => setScope(e.target.value)}
                          >
                            <option>Aggregated Scope</option>
                            <option>Scope 1</option>
                            <option>Scope 2</option>
                            <option>Scope 3</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FiChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-start items-center">
                        <label className="block text-sm text-gray-500 mb-1">
                          Category:
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full rounded-md border-none border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 appearance-none bg-white"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                          >
                            <option>Aggregated Scope</option>
                            <option>Category 1</option>
                            <option>Category 2</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FiChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-start items-center">
                        <label className="block text-sm text-gray-500 mb-1">
                          Sub Category:
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full rounded-md border-none border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 appearance-none bg-white"
                            value={subCategory}
                            onChange={e => setSubCategory(e.target.value)}
                          >
                            <option>Aggregated Scope</option>
                            <option>Sub-Category 1</option>
                            <option>Sub-Category 2</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FiChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-start items-center">
                        <label className="block text-sm text-gray-500 mb-1">
                          Activity:
                        </label>
                        <div className="relative">
                          <select
                            className="block w-full rounded-md border-none border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 appearance-none bg-white"
                            value={activity}
                            onChange={e => setActivity(e.target.value)}
                          >
                            <option>Aggregated Scope</option>
                            <option>Activity 1</option>
                            <option>Activity 2</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FiChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Business metrics and Net Zero settings */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                      <div className="flex items-center">
                        <label className="block text-sm text-gray-500 mr-2">
                          Business Metrics:
                        </label>
                        <div className="relative">
                          <div className="flex flex-wrap gap-2">
                            {businessMetrics.map(metric => (
                              <span key={metric.id} className="bg-blue-100 text-blue-800 rounded-md px-3 py-1 text-xs flex items-center">
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
                        </div>
                      </div>

                      <div className="flex items-center">
                      <div className="flex items-center ml-4">
                        <input
                          id="include-net-zero"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          checked={includeNetZero}
                          onChange={e => setIncludeNetZero(e.target.checked)}
                        />
                        <label htmlFor="include-net-zero" className="ml-2 block text-sm text-gray-700">
                          Include a net zero scenario
                        </label>
                      </div>
                      
                      <div className="flex items-center ml-4">
                        <label className="block text-sm text-gray-500 mr-2">Enter Target Year:</label>
                        <input
                          type="text"
                          className="w-20 rounded-md border-b border-gray-300 py-1 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                          value={targetYear}
                          onChange={e => setTargetYear(e.target.value)}
                        />
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart visualization */}
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[500px]">
                      <div className="text-gray-600 italic text-lg">Graph area</div>
                      {/* Replace with actual graph component */}
                      {/* <NivoYearlyGrowth /> */}
                    </div>
                  </div>
                </div>
                
                {/* Close button - fixed at top right corner */}
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                >
                  <FiX className="h-5 w-5" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ScenarioViewModal;