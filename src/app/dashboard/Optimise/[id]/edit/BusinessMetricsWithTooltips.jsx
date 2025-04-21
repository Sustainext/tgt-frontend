// Get weightages directly from metricsData
const getMetricWeightage = (metricId) => {
  return metricsData[`${metricId}_weightage`] || 0;
};
import React, { useState, useEffect, useCallback } from "react";
import { FiInfo } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  updateScenarioMetrics,
  updateMetricData,
  toggleMetric as toggleMetricAction,
} from "../../../../../lib/redux/features/optimiseSlice";
import { Oval } from "react-loader-spinner";

const BusinessMetricsWithTooltips = ({
  businessMetrics,
  scenario,
  MetricsGraph,
  open,
  scenarioId,
  loading,
  error,
}) => {
  const dispatch = useDispatch();

  // Get state from Redux with safety check
  const optimiseState = useSelector((state) => state.optimise) || {};
  const metricsData = optimiseState.metricsData || {};

  // Tooltip contents
  const tooltipContent = {
    fte: "FTE represents the total number of full-time hours worked by both full-time and part-time employees, allowing for a standardized comparison of workforce size. For example, if a company considers 40 hours full-time, and there are two employees working 20 hours per week, those two employees would be 1.0 FTE.",
    area: "Area refers to the physical area occupied or operated by the organization — office space, factory, or land area.",
    production_volume:
      "Production volume refers to the quantity of goods or services a company produces within a given period (e.g., daily, weekly, monthly, or annually). It's typically calculated by multiplying the number of units produced by their unit cost or simply by counting the total number of units.",
    revenue:
      "Total earnings of a business from selling its products or services within a specified timeframe. The formula for determining revenue is: Revenue = Price x Quantity",
  };

  // Create debounced function for updating graph data
  const debouncedUpdateMetrics = useCallback(
    debounce(async (metricId, data) => {
      try {
        // Update local Redux state
        dispatch(updateMetricData({ metricId, data }));

        // Only call API if we have a scenarioId
        if (scenarioId) {
          const payload = {
            [`${metricId}_data`]: data,
            [`${metricId}_weightage`]: metricsData[`${metricId}_weightage`],
          };

          console.log("Payload:", payload);
          dispatch(updateScenarioMetrics({ scenarioId, payload }));
        }
      } catch (err) {
        console.error(`Error updating ${metricId} data:`, err);
      }
    }, 0), // Debounce for 1 second
    [dispatch, scenarioId]
  );

  // Handle metric toggle
  const handleToggleMetric = (metricId) => {
    // Dispatch Redux action
    dispatch(toggleMetricAction(metricId));
  
    // If we have a scenarioId, update the API
    if (scenarioId) {
      // Get the updated metric value (toggle the current value)
      const newMetricValue = !metricsData[metricId];
  
      // Create payload with the toggled value and updated weightages
      const payload = {
        [metricId]: newMetricValue,
      };
  
      // First, identify which metrics will be active after this toggle
      const validMetricIds = ["fte", "area", "production_volume", "revenue"];
      const activeMetricIds = validMetricIds.filter((id) =>
        id === metricId ? newMetricValue : Boolean(metricsData[id])
      );
  
      // Calculate equal weightage
      const count = activeMetricIds.length;
      let equalWeight = count > 0 ? parseFloat((1 / count).toFixed(2)) : 0;
  
      // Adjust weightage for the first metric if there are 3 metrics
      if (count === 3) {
        // First metric gets a slightly higher weight (0.34)
        equalWeight = 0.33;  // Set equal weight for the other two
        const firstActiveMetric = activeMetricIds[0];
        const remainingWeight = parseFloat((1 - equalWeight * (count - 1)).toFixed(2));
        payload[`${firstActiveMetric}_weightage`] = remainingWeight;
      }
  
      // Add updated weightages for all active metrics except the first one
      activeMetricIds.forEach((id, index) => {
        if (index !== 0 || count !== 3) {
          payload[`${id}_weightage`] = equalWeight;
        }
      });
  
      // If we have 3 metrics, ensure the first metric weightage is 0.34
      if (count === 3) {
        const firstActiveMetric = activeMetricIds[0];
        payload[`${firstActiveMetric}_weightage`] = parseFloat((1 - equalWeight * (count - 1)).toFixed(2));
      }
  
      // Dispatch the API update
      dispatch(updateScenarioMetrics({ scenarioId, payload }));
    }
  };
  

  // Handler for when graph data changes
  const handleMetricDataChange = (metricId, data) => {
    // Get the current complete data
    const currentData = metricsData[`${metricId}_data`] || {};

    // Create updated data with both properties preserved
    const updatedData = {
      // Preserve existing abs_value or use empty default
      abs_value:
        currentData.abs_value !== undefined ? currentData.abs_value : "",
      // Preserve existing percentage_change or use empty default
      percentage_change: currentData.percentage_change || {},
      // Apply the updates (either to abs_value or percentage_change)
      ...data,
    };

    // Dispatch to Redux with the complete object
    debouncedUpdateMetrics(metricId, updatedData);
  };

  // Adapter functions for the MetricsGraph component
  const handleGraphPercentageChange = (metricId, data) => {
    // Data already contains complete object with both abs_value and percentage_change
    handleMetricDataChange(metricId, data);
  };

  const handleGraphAbsValueChange = (metricId, data) => {
    // Data already contains complete object with both abs_value and percentage_change
    handleMetricDataChange(metricId, data);
  };

  // Check if a metric is selected
  const isMetricSelected = (metricId) => {
    return Boolean(metricsData[metricId]);
  };

  return (
    <div
      className={`space-y-4 px-8 mr-2 ${
        open ? "max-w-[108vw]" : "max-w-[120vw]"
      }`}
    >
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {typeof error === "string" ? error : "Failed to load metrics data"}
        </div>
      ) : (
        businessMetrics.map((metric) => (
          <div
            key={metric.id}
            className={`bg-white border rounded-lg shadow-sm overflow-visible ${
              isMetricSelected(metric.id)
                ? "border-green-500"
                : "border-gray-200"
            }`}
          >
            <div className="p-4 grid grid-cols-[1fr,3fr] gap-4 items-center">
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={isMetricSelected(metric.id)}
                    onChange={() => handleToggleMetric(metric.id)}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                <span className="ml-3 font-medium">{metric.name}</span>
                <div className="relative inline-block">
                  <FiInfo
                    id={`info-icon-${metric.id}`}
                    className="ml-2 text-gray-400 cursor-help"
                  />
                  <Tooltip
                    anchorId={`info-icon-${metric.id}`}
                    place="right"
                    className="bg-gray-800 text-white p-2 rounded text-sm z-50"
                    content={tooltipContent[metric.id]}
                    delayShow={100}
                    float
                    style={{
                      maxWidth: "450px",
                      whiteSpace: "normal",
                      lineHeight: "1.5",
                      height: "auto",
                      maxHeight: "none",
                      overflow: "visible",
                    }}
                  />
                </div>
              </div>
              <div className="text-gray-600">{metric.description}</div>
            </div>

            {/* Expanded content when metric is selected */}
            {isMetricSelected(metric.id) && (
              <div className="border-t border-gray-200 p-4">
                <div className="h-[530px] mr-4">
                  <MetricsGraph
                    metricName={metric.id}
                    initialMaxRange={100}
                    allowNegative={true}
                    baseYear={scenario?.base_year || scenario?.baseYear || 2025}
                    targetYear={
                      scenario?.target_year || scenario?.targetYear || 2030
                    }
                    // Redux data and callbacks - complete data is passed both ways
                    metricData={metricsData[`${metric.id}_data`] || {}}
                    onPercentageChange={(data) =>
                      handleGraphPercentageChange(metric.id, data)
                    }
                    onBaseValueChange={(data) =>
                      handleGraphAbsValueChange(metric.id, data)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        ))
      )}
      {/* {loading && (
        <div className=" fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )} */}
    </div>
  );
};

export default BusinessMetricsWithTooltips;
