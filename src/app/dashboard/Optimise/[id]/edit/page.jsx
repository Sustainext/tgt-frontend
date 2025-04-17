"use client";
import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiInfo, FiCheck } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
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
import { useDispatch } from "react-redux";
import BusinessMetricsWithTooltips from "./BusinessMetricsWithTooltips";
import {useRouter} from 'next/navigation'

const ScenarioEditor = ({ scenario, onSave, onCancel }) => {
  // Current step in the wizard (1-4)
  const [currentStep, setCurrentStep] = useState(1);
  const [isWeightageModalOpen, setIsWeightageModalOpen] = useState(false);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { open, setOpen } = GlobalState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeadertext1("Optimise"));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2(scenario?.name || "Scenario 1"));
  }, [dispatch, scenario]);

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
    // setOpen(false);
    setSelectedMetrics((prev) => ({
      ...prev,
      [metricId]: !prev[metricId],
    }));
  };

  // Go to prev step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Go to next step
  const handleNext = () => {
    if (currentStep === 1) {
      setIsWeightageModalOpen(true);
      return;
    }
    if (currentStep === 2) {
      setIsConfirmModalOpen(true);
      return;
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // onSave(scenario);
    }
  };

  // Handle proceed from confirmation modal
  const handleConfirmProceed = () => {
    setIsConfirmModalOpen(false);
    setCurrentStep(3); // Move to step 3
  };

  // Process weightage values and move to next step
  const handleWeightageProceed = (weightages) => {
    // Save weightages to your state/data structure
    console.log("Weightages:", weightages);

    // Close modal and move to next step
    setIsWeightageModalOpen(false);
    setCurrentStep(2);
  };

  // Go back to dashboard
  const router = useRouter();

  const handleBackToDashboard = () => {
    // Navigate to the Optimise dashboard using Next.js router
    router.push("/dashboard/Optimise");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
      <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <h1 className="text-xl font-medium gradient-text">
              {scenario?.name || "Scenario 1"}
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
                  {scenario?.organization || "Org A"}
                </p>
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
          <BusinessMetricsWithTooltips
            businessMetrics={businessMetrics}
            selectedMetrics={selectedMetrics}
            toggleMetric={toggleMetric}
            scenario={scenario}
            MetricsGraph={MetricsGraph}
            open={open}
          />
        )}

        {currentStep === 2 && (
          <div className="px-6">
            <ActivitySelectTable
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="px-6">
            <ActivitySummarySection activities={selectedActivities} />
          </div>
        )}

        {currentStep === 4 && (
          <div className="px-6">
            <EmissionProjectionView />
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
        setCurrentStep={setCurrentStep}
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