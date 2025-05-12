"use client";
import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiInfo, FiCheck } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import MetricsGraph from "./MetricsGraph";
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
  fetchScenarioActivities,
  setCurrentStep,
  setSelectedActivities,
  resetOptimiseState,
  updateScenarioMetrics,
  updateAllSelectedActivities,
} from "../../../../../lib/redux/features/optimiseSlice";

// Add this to your component that uses updateAllSelectedActivities
const LoadingIndicator = () => {
  const loading = useSelector(state => state.optimise?.loading);
  const isLoading = loading?.activities || loading?.climateCalculation;
  const isCalculatingClimate = !loading?.activities && loading?.climateCalculation;
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">
            {isCalculatingClimate 
              ? "Calculating Climate Impact..." 
              : "Updating Activities..."}
          </h3>
          <p className="text-gray-600 text-center">
            {isCalculatingClimate
              ? "Please wait while we calculate the climate impact of your changes."
              : "Saving your activity changes to the scenario."}
          </p>
        </div>
      </div>
    </div>
  );
};

const ScenarioEditor = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const scenarioId = params?.id;

  // Get state from Redux with safety checks
  const optimiseState = useSelector((state) => state.optimise) || {};
  const {
    currentStep = 1,
    selectedActivities = [],
    currentScenario: scenario = null,
    metricsData = {},
    loading = { scenario: false, metrics: false, activities: false },
    error = { scenario: null, metrics: null, activities: null },
  } = optimiseState;

  const [isWeightageModalOpen, setIsWeightageModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { open } = GlobalState();

  // Fetch scenario data on component mount
  useEffect(() => {
    if (scenarioId) {
      // Fetch the scenario details
      dispatch(fetchScenarioById(scenarioId));

      // Fetch the business metrics for this scenario
      dispatch(fetchScenarioMetrics(scenarioId));

      // Fetch the activities for this scenario
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
      id: "production_volume",
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
  const handleNext = async () => {
    if (currentStep === 1) {
      // Check if at least one metric is selected before opening weightage modal
      const metricsData = optimiseState.metricsData || {};
      const anyMetricSelected = businessMetrics.some((metric) =>
        Boolean(metricsData[metric.id])
      );

      if (anyMetricSelected) {
        setIsWeightageModalOpen(true);
      }
      return;
    }

    if (currentStep === 2) {
      if (selectedActivities.length > 0) {
        setIsConfirmModalOpen(true);
      }
      return;
    } else if (currentStep === 3) {
      // Save all activities before proceeding to step 4
      try {
        // Only make the API call if we have activities and a scenarioId
        if (selectedActivities.length > 0 && scenarioId) {
          // Dispatch the thunk to update all activities in one API call
          await dispatch(
            updateAllSelectedActivities({
              scenarioId,
              activities: selectedActivities,
            })
          ).unwrap();
        }

        // If successful, proceed to next step
        dispatch(setCurrentStep(currentStep + 1));
      } catch (error) {
        console.error("Failed to save activity changes:", error);
        // Could show an error message here
      }
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
  const handleWeightageProceed = async (updatedWeightages) => {
    console.log("handleWeightageProceed called with:", updatedWeightages);
    console.log("Current scenarioId:", scenarioId);

    try {
      // Show loading indicator if needed

      // Prepare API payload with weightages for selected metrics
      const payload = {};

      // Add weightage for each selected metric
      Object.keys(updatedWeightages).forEach((metric) => {
        payload[`${metric}_weightage`] = updatedWeightages[metric];
        payload[`${metric}_data`] = metricsData[`${metric}_data`];
        payload[`${metric}`] = metricsData[metric];
      });

      // Make the API call if scenarioId exists
      if (scenarioId) {
        console.log("Making API call to update scenario metrics");

        // Dispatch the API call and wait for it to complete
        try {
          const resultAction = await dispatch(
            updateScenarioMetrics({ scenarioId, payload })
          );

          // Check if the action was fulfilled or rejected
          if (updateScenarioMetrics.fulfilled.match(resultAction)) {
            dispatch(setCurrentStep(2));
          } else if (updateScenarioMetrics.rejected.match(resultAction)) {
            console.error("API call failed with error:", resultAction.error);
            throw new Error(resultAction.error?.message || "API call failed");
          }
        } catch (innerError) {
          console.error("Error during API dispatch:", innerError);
          throw innerError; // Re-throw for outer catch
        }
      } else {
        // If no scenarioId (unlikely in production), just move to next step
        console.log(
          "No scenarioId found, skipping API call and moving to next step"
        );
        dispatch(setCurrentStep(2));
      }
    } catch (error) {
      // Handle errors
      console.error("Failed to update weightages, detailed error:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      // If there's a response error, log it
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    }
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
          <p>
            {typeof error.scenario === "string"
              ? error.scenario
              : "Failed to load scenario data"}
          </p>
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
                  Select the key metrics which will be required for planning the
                  emission reduction initiative for this scenario. Include
                  current year absolute value for the selected business metric
                  and apply any changes in the consumption pattern that you
                  foresee. Use the graph to increase or decrease the percentage
                  consumptions for the available years within the time period of
                  the scenario.
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
                  {scenario?.organization_name || scenario?.organization || ""}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Corporate</p>
                <p className="font-medium">
                  {scenario?.corporate_name || scenario?.corporate || (
                    <span className="text-slate-700 text-sm">Not Selected</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Base Year</p>
                <p className="font-medium">
                  {scenario?.base_year || scenario?.baseYear || ""}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target Year</p>
                <p className="font-medium">
                  {scenario?.target_year || scenario?.targetYear || ""}
                </p>
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
            scenarioId={scenarioId}
            loading={loading.metrics}
            error={error.metrics}
          />
        )}

        {currentStep === 2 && (
          <div className="px-6">
            <ActivitySelectTable
              selectedActivities={selectedActivities}
              setSelectedActivities={(activities) =>
                dispatch(setSelectedActivities(activities))
              }
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
              (currentStep === 1 &&
                (!optimiseState.metricsData ||
                  Object.keys(optimiseState.metricsData).filter(
                    (k) => !k.includes("_") && optimiseState.metricsData[k]
                  ).length === 0)) ||
              (currentStep === 2 &&
                (!selectedActivities || selectedActivities.length === 0))
            }
          >
            {currentStep === 3
              ? "Calculate and Visualize"
              : currentStep < 4
              ? "Next"
              : "Save"}{" "}
            →
          </button>
        </div>
      </div>

      {/* Weightage Modal */}
      <WeightageInputModal
        isOpen={isWeightageModalOpen}
        onClose={() => setIsWeightageModalOpen(false)}
        selectedMetrics={optimiseState.metricsData}
        onProceed={handleWeightageProceed}
        setCurrentStep={(step) => dispatch(setCurrentStep(step))}
      />

      {/* Confirm Activities Modal */}
      <ConfirmActivitiesModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        selectedActivities={selectedActivities}
        onProceed={handleConfirmProceed}
        onGoBack={() => setIsConfirmModalOpen(false)}
        scenarioId={scenarioId}
      />

      <LoadingIndicator />
    </>
  );
};

export default ScenarioEditor;
