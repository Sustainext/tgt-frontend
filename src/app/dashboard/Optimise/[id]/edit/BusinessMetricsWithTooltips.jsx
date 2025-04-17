import React, { useState, useEffect, useCallback } from "react";
import { FiInfo } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { useDispatch, useSelector } from "react-redux";
import { debounce } from 'lodash';
import { 
  updateScenarioMetrics, 
  updateMetricData, 
  toggleMetric as toggleMetricAction,
  fetchScenarioMetrics
} from "../../../../../lib/redux/features/optimiseSlice";

const BusinessMetricsWithTooltips = ({ 
  businessMetrics, 
  scenario,
  MetricsGraph,
  open,
  scenarioId,
  loading,
  error
}) => {
  const dispatch = useDispatch();
  
  // Get metrics state directly from Redux store - using the actual structure
  const optimiseState = useSelector(state => state.optimise || {});
  
  // Tooltip contents
  const tooltipContent = {
    fte: "FTE represents the total number of full-time hours worked by both full-time and part-time employees, allowing for a standardized comparison of workforce size. For example, if a company considers 40 hours full-time, and there are two employees working 20 hours per week, those two employees would be 1.0 FTE.",
    area: "Area refers to the physical area occupied or operated by the organization — office space, factory, or land area.",
    productionVolume: "Production volume refers to the quantity of goods or services a company produces within a given period (e.g., daily, weekly, monthly, or annually). It's typically calculated by multiplying the number of units produced by their unit cost or simply by counting the total number of units.",
    revenue: "Total earnings of a business from selling its products or services within a specified timeframe. The formula for determining revenue is: Revenue = Price x Quantity"
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
            [`${metricId}_data`]: data
          };
          dispatch(updateScenarioMetrics({ scenarioId, payload }));
        }
      } catch (err) {
        console.error(`Error updating ${metricId} data:`, err);
      }
    }, 1000), // Debounce for 1 second
    [dispatch, scenarioId]
  );

  // Handle metric toggle - dispatch both Redux action and call parent handler
  const handleToggleMetric = (metricId) => {
    // Dispatch Redux action
    dispatch(toggleMetricAction(metricId));
  
  };

  // Handler for when graph data changes
  const handleMetricDataChange = (metricId, data) => {
    debouncedUpdateMetrics(metricId, data);
  };

  // Handle absolute value change
  const handleAbsValueChange = (metricId, value) => {
    const updatedData = {
      ...(optimiseState[`${metricId}_data`] || {}),
      abs_value: value
    };
    debouncedUpdateMetrics(metricId, updatedData);
  };

  // Check if a metric is selected based on the actual redux structure
  const isMetricSelected = (metricId) => {
    return Boolean(optimiseState[metricId]);
  };

  // Get metric data for a specific metric
  const getMetricData = (metricId) => {
    return optimiseState[`${metricId}_data`] || {};
  };

  // Get the base value for a specific metric
  const getBaseValue = (metricId) => {
    const metricData = getMetricData(metricId);
    return metricData.abs_value;
  };

  // Get percentage changes for a specific metric
  const getPercentageChanges = (metricId) => {
    const metricData = getMetricData(metricId);
    return metricData.percentage_change;
  };

  // Get weightage for a specific metric
  const getWeightage = (metricId) => {
    return optimiseState[`${metricId}_weightage`] || 0;
  };

  return (
    <div className={`space-y-4 px-8 mr-2 ${open ? "max-w-[108vw]" : "max-w-[120vw]"}`}>
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <span className="ml-2 text-gray-700">Loading business metrics data...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {typeof error === 'string' ? error : 'Failed to load metrics data'}
          <button 
            className="ml-4 underline" 
            onClick={() => scenarioId && dispatch(fetchScenarioMetrics(scenarioId))}
          >
            Try again
          </button>
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
                    style={{ maxWidth: "450px", 
                      whiteSpace: "normal", 
                      lineHeight: "1.5",
                      height: "auto",
                      maxHeight: "none",
                      overflow: "visible" }}
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
                    rangeSteps={
                      metric.id === "fte" || metric.id === "area"
                        ? [100, 200, 300, 400, 500]
                        : metric.id === "productionVolume" ||
                          metric.id === "revenue"
                        ? [100, 200, 500, 1000]
                        : [100, 200, 500, 1000, 2000]
                    }
                    minNegativeValue={
                      // Only specify for FTE which has a fixed negative limit
                      metric.id === "fte" ? -100 : null
                    }
                    baseYear={scenario?.base_year || scenario?.baseYear || 2025}
                    targetYear={scenario?.target_year || scenario?.targetYear || 2030}
                    onPercentageChange={(data) => handleMetricDataChange(metric.id, { 
                      ...getMetricData(metric.id),
                      percentage_change: data
                    })}
                    onBaseValueChange={(value) => handleAbsValueChange(metric.id, value)}
                    weightage={getWeightage(metric.id)}
                    initialData={getPercentageChanges(metric.id)}
                    initialBaseValue={getBaseValue(metric.id)}
                  />
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BusinessMetricsWithTooltips;