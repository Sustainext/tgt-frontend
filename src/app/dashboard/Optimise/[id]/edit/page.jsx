"use client";
import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiInfo, FiCheck } from "react-icons/fi";
import MetricsGraph from "../../MetricsGraph";
import WeightageInputModal from "./WeightageInputModal";
import ActivitySelectTable from "../../ActivitySelectTable";
import ConfirmActivitiesModal from "../../ConfirmActivitiesModal";
import ActivitySummarySection from "../../ActivitiesSummary";
import EmissionProjectionView from "../../EmissionProjectionView";
import { GlobalState } from "@/Context/page";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../../../lib/redux/features/topheaderSlice";
import { useDispatch, useSelector } from "react-redux";
import BusinessMetricsWithTooltips from "./BusinessMetricsWithTooltips";
import { useRouter, useParams } from "next/navigation";
import {
  fetchScenarioById,
  fetchScenarioMetrics,
  updateScenarioMetrics,
  fetchScenarioActivities,
  setCurrentStep,
  toggleMetric,
  setMetricWeightages,
  setSelectedActivities,
  resetOptimiseState
} from "../../../../../lib/redux/features/optimiseSlice";

const ScenarioEditor = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const scenarioId = params?.id;
  
  // Get state from Redux with safety checks
  const optimiseState = useSelector(state => state.optimise) || {};
  const {
    selectedActivities = [],
    currentStep = 1,
    loading = { scenario: false, metrics: false, activities: false },
    error = { scenario: null, metrics: null, activities: null },
    currentScenario: scenario = null
  } = optimiseState;
    
  // Local state for modal controls
  const [isWeightageModalOpen, setIsWeightageModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { open } = GlobalState();

  // Fetch scenario data on component mount
  useEffect(() => {
    if (scenarioId) {
      dispatch(fetchScenarioById(scenarioId));
      dispatch(fetchScenarioMetrics(scenarioId));
      dispatch(fetchScenarioActivities(scenarioId));
    }
    
    // Cleanup on unmount
    return () => {
      dispatch(resetOptimiseState());
    };
  }, [dispatch, scenarioId]);

  // Set header information when scenario data is available
  useEffect(() => {
    if (scenario) {
      dispatch(setHeadertext1("Optimise"));
      dispatch(setHeaderdisplay("none"));
      dispatch(setHeadertext2(scenario.name || "Scenario"));
    }
  }, [dispatch, scenario]);

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

  // Go to prev step
  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  // Go to next step
  const handleNext = () => {
    if (currentStep === 1) {
      // Check if at least one metric is selected
      if (Object.values(selectedMetrics).some(value => value)) {
        setIsWeightageModalOpen(true);
      }
      return;
    }
    if (currentStep === 2) {
      if (selectedActivities.length > 0) {
        setIsConfirmModalOpen(true);
      }
      return;
    } else if (currentStep < 4) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      // Handle save/complete scenario
      router.push("/dashboard/Optimise");
    }
  };

  // Handle proceed from confirmation modal
  const handleConfirmProceed = () => {
    setIsConfirmModalOpen(false);
    dispatch(setCurrentStep(3)); // Move to step 3
  };

  // Process weightage values and move to next step
  const handleWeightageProceed = (updatedWeightages) => {
    // Update Redux state
    dispatch(setMetricWeightages(updatedWeightages));
    
    // Update API if scenarioId exists
    if (scenarioId) {
      const payload = {};
      
      // Add weightage for each selected metric
      Object.keys(updatedWeightages).forEach(metric => {
        payload[`${metric}_weightage`] = updatedWeightages[metric];
      });
      
      // Dispatch the API call
      dispatch(updateScenarioMetrics({ scenarioId, payload }));
    }
    
    // Close modal and move to next step
    setIsWeightageModalOpen(false);
    dispatch(setCurrentStep(2));
  };

  // Handle activity selection
  const handleActivitiesChange = (activities) => {
    dispatch(setSelectedActivities(activities));
  };

  // Go back to dashboard
  const handleBackToDashboard = () => {
    router.push("/dashboard/Optimise");
  };

  // Handle loading state
  if (loading.scenario && !scenario) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Handle error state
  if (error.scenario && !scenario) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-50 p-4 rounded-lg text-red-700 max-w-md text-center">
          <h2 className="font-bold mb-2">Error Loading Scenario</h2>
          <p>{typeof error.scenario === 'string' ? error.scenario : 'Failed to load scenario data'}</p>
          <button 
            onClick={() => router.push("/dashboard/Optimise")}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <h1 className="text-xl font-medium gradient-text">
                  {scenario?.name || "Scenario"}
                </h1>
              </div>
              <button
                onClick={handleBackToDashboard}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mx-8 my-8 flex justify-between items-center gap-[5rem]">
          <div className="w-3/5">
            {currentStep === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Business Metric
                </h2>
                <p className="text-gray-600 mb-6">
                  Select the key metrics which will be required for planning the emission reduction initiative for this scenario. Include current year absolute value for the selected business metric and apply any changes in the consumption pattern that you foresee. Use the graph to increase or decrease the percentage consumptions for the available years within the time period of the scenario.
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Activities
                </h2>
                <p className="text-gray-600 mb-6">
                  Select the activities from the below table for which you
                  foresee changes in the consumption pattern for this scenario.
                  Select and confirm the activities here and use the graph to
                  increase or decrease the percentage consumptions for the
                  available years within the time period of the scenario in the
                  next screen.
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Changes in the Consumption Pattern
                </h2>
                <p className="text-gray-600 mb-6">
                  Select the consumption pattern changes for years projected
                  under each activities. Add if there will also be any activity
                  changes for the years under each activities.
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Scenario Visualization
                </h2>
                <p className="text-gray-600 mb-6">
                  Visualize your scenario for the chosen activities. Filter
                  results by scope, category, sub category and activity.
                  Visualize net zero scenario by checking the filter and adding
                  the target year.{" "}
                </p>
              </div>
            )}

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
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-blue-300 bg-white text-blue-300"
                    }`}
                  >
                    {currentStep > 1 ? <FiCheck className="h-5 w-5" /> : 1}
                  </div>
                </div>
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
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
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-blue-300 bg-white text-blue-300"
                    }`}
                  >
                    {currentStep > 2 ? <FiCheck className="h-5 w-5" /> : 2}
                  </div>
                </div>
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
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
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-blue-300 bg-white text-blue-300"
                    }`}
                  >
                    {currentStep > 3 ? <FiCheck className="h-5 w-5" /> : 3}
                  </div>
                </div>
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    currentStep >= 4 ? "bg-blue-500" : "bg-gray-300"
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
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-blue-300 bg-white text-blue-300"
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
                <p className="font-medium">
                  {scenario?.organization || ""}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Corporate</p>
                <p className="font-medium">{scenario?.corporate || ""}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Base Year</p>
                <p className="font-medium">{scenario?.base_year || scenario?.baseYear || ""}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target Year</p>
                <p className="font-medium">{scenario?.target_year || scenario?.targetYear || ""}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Select Business Metric */}
        {currentStep === 1 && (
          <BusinessMetricsWithTooltips
            businessMetrics={businessMetrics}
            scenario={scenario}
            MetricsGraph={MetricsGraph}
            open={open}
            weightages={weightages}
            scenarioId={scenarioId}
            loading={loading.metrics}
            error={error.metrics}
          />
        )}

        {currentStep === 2 && (
          <div className="px-6">
            <ActivitySelectTable
              selectedActivities={selectedActivities}
              setSelectedActivities={handleActivitiesChange}
              scenarioId={scenarioId}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="px-6">
            <ActivitySummarySection 
              activities={selectedActivities} 
              scenarioId={scenarioId}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="px-6">
            <EmissionProjectionView 
              scenario={scenario}
              onPrevious={handlePrevious}
            />
          </div>
        )}

        {/* Footer with navigation buttons */}
        <div className="mt-8 flex justify-end px-8 gap-4">
          {currentStep !== 1 && (
            <button
              onClick={handlePrevious}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Prev
            </button>
          )}
          <button
            onClick={handleNext}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={
              currentStep === 1 &&
              Object.values(selectedMetrics).every((value) => !value)
            }
          >
            {currentStep < 4 ? "Next" : "Save"} →
          </button>
        </div>
      </div>

      {/* Weightage Modal */}
      <WeightageInputModal
        isOpen={isWeightageModalOpen}
        onClose={() => setIsWeightageModalOpen(false)}
        selectedMetrics={selectedMetrics}
        onProceed={handleWeightageProceed}
        setCurrentStep={currentStep => dispatch(setCurrentStep(currentStep))}
        weightages={weightages}
      />

      {/* Confirm Activities Modal */}
      <ConfirmActivitiesModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        selectedActivities={selectedActivities}
        onProceed={handleConfirmProceed}
        onGoBack={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
};

export default ScenarioEditor;