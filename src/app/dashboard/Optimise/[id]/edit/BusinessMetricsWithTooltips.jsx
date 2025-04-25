import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiInfo, FiSave } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useDispatch, useSelector } from "react-redux";
import { debounce, throttle } from "lodash";
import {
  updateScenarioMetrics,
  updateMetricData,
  toggleMetric as toggleMetricAction,
} from "../../../../../lib/redux/features/optimiseSlice";

const BusinessMetricsWithTooltips = ({
  businessMetrics,
  scenario,
  MetricsGraph,
  open,
  scenarioId,
  loading: externalLoading,
  error: externalError,
}) => {
  const dispatch = useDispatch();

  // Get state from Redux with safety check
  const optimiseState = useSelector((state) => state.optimise) || {};
  const metricsData = optimiseState.metricsData || {};

  // Local state to track pending changes
  const [pendingChanges, setPendingChanges] = useState({});
  const [localSaving, setLocalSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: null, text: null });

  // Ref to keep track of the latest metricsData
  const metricsDataRef = useRef(metricsData);

  // Update the ref when metricsData changes
  useEffect(() => {
    metricsDataRef.current = metricsData;
  }, [metricsData]);

  // Timer to automatically clear save message
  const saveMessageTimer = useRef(null);

  // Tooltip contents
  const tooltipContent = {
    fte: "FTE represents the total number of full-time hours worked by both full-time and part-time employees, allowing for a standardized comparison of workforce size. For example, if a company considers 40 hours full-time, and there are two employees working 20 hours per week, those two employees would be 1.0 FTE.",
    area: "Area refers to the physical area occupied or operated by the organization — office space, factory, or land area.",
    production_volume:
      "Production volume refers to the quantity of goods or services a company produces within a given period (e.g., daily, weekly, monthly, or annually). It's typically calculated by multiplying the number of units produced by their unit cost or simply by counting the total number of units.",
    revenue:
      "Total earnings of a business from selling its products or services within a specified timeframe. The formula for determining revenue is: Revenue = Price x Quantity",
  };

  // Function to show a save message and automatically clear it after a delay
  const showSaveMessage = (type, text) => {
    setSaveMessage({ type, text });

    // Clear any existing timer
    if (saveMessageTimer.current) {
      clearTimeout(saveMessageTimer.current);
    }

    // Set a new timer to clear the message after 5 seconds
    saveMessageTimer.current = setTimeout(() => {
      setSaveMessage({ type: null, text: null });
    }, 5000);
  };

  // Create debounced function for updating the Redux state locally
  // NOTE: This is now updated to handle the new complete data structure
  const debouncedLocalUpdate = useCallback(
    debounce((metricId, updatedData) => {
      // Update local Redux state with the complete data structure
      dispatch(updateMetricData({ metricId, data: updatedData }));

      // Track that we have pending changes for this metric
      setPendingChanges((prev) => ({
        ...prev,
        [metricId]: true,
      }));
    }, 300), 
    [dispatch]
  );

  // Throttled version for rapid changes (like dragging points on graph)
  // NOTE: This is now updated to handle the new complete data structure
  const throttledLocalUpdate = useCallback(
    throttle((metricId, updatedData) => {
      // Update Redux with the complete data structure
      dispatch(updateMetricData({ metricId, data: updatedData }));

      // Track that we have pending changes for this metric
      setPendingChanges((prev) => ({
        ...prev,
        [metricId]: true,
      }));
    }, 200), // 200ms throttle for smooth UI during drag operations
    [dispatch]
  );

  // Save changes to the server - can be called manually or automatically
  const saveChangesToServer = useCallback(async () => {
    if (!scenarioId || Object.keys(pendingChanges).length === 0) return;

    try {
      setLocalSaving(true);

      // Build payload with all pending changes
      const payload = {};

      // Add all changed metrics data
      Object.keys(pendingChanges).forEach((metricId) => {
        if (pendingChanges[metricId]) {
          payload[`${metricId}_data`] =
            metricsDataRef.current[`${metricId}_data`] || {};
          payload[`${metricId}_weightage`] =
            metricsDataRef.current[`${metricId}_weightage`] || 0;
        }
      });

      await dispatch(
        updateMetricData({
          scenarioId,
          payload,
        })
      ).unwrap();

      // Dispatch the API update with the complete payload
      await dispatch(
        updateScenarioMetrics({
          scenarioId,
          payload,
        })
      ).unwrap(); // .unwrap() to handle the promise result

      // Clear pending changes after successful save
      setPendingChanges({});
      showSaveMessage("success", "✅ Saved");
    } catch (error) {
      console.error("Error saving changes:", error);
      showSaveMessage("error", "Failed to save changes");
    } finally {
      setLocalSaving(false);
    }
  }, [dispatch, scenarioId, pendingChanges]);

  // Auto-save changes after a longer delay if there are pending changes
  useEffect(() => {
    // Only set up auto-save if there are pending changes
    if (Object.keys(pendingChanges).length > 0) {
      const autoSaveTimer = setTimeout(() => {
        saveChangesToServer();
      }, 5000); // 5 second delay for auto-save

      return () => clearTimeout(autoSaveTimer);
    }
  }, [pendingChanges, saveChangesToServer]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (saveMessageTimer.current) {
        clearTimeout(saveMessageTimer.current);
      }
    };
  }, []);

  // Handle metric toggle
  const handleToggleMetric = (metricId) => {
    // Dispatch Redux action
    dispatch(toggleMetricAction(metricId));

    // If we have a scenarioId, update the API immediately (no debounce needed for toggles)
    if (scenarioId) {
      try {
        setLocalSaving(true);

        // Get the updated metric value (toggle the current value)
        const newMetricValue = !metricsDataRef.current[metricId];

        // Create payload with the toggled value
        const payload = {
          [metricId]: newMetricValue,
        };

        // First, identify which metrics will be active after this toggle
        const validMetricIds = ["fte", "area", "production_volume", "revenue"];
        const activeMetricIds = validMetricIds.filter((id) =>
          id === metricId ? newMetricValue : Boolean(metricsDataRef.current[id])
        );

        // Calculate equal weightage
        const count = activeMetricIds.length;
        let equalWeight = count > 0 ? parseFloat((1 / count).toFixed(2)) : 0;

        // Adjust weightage for the first metric if there are 3 metrics
        if (count === 3) {
          // First metric gets a slightly higher weight (0.34)
          equalWeight = 0.33; // Set equal weight for the other two
          const firstActiveMetric = activeMetricIds[0];
          const remainingWeight = parseFloat(
            (1 - equalWeight * (count - 1)).toFixed(2)
          );
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
          payload[`${firstActiveMetric}_weightage`] = parseFloat(
            (1 - equalWeight * (count - 1)).toFixed(2)
          );
        }

        // Dispatch the API update
        dispatch(updateScenarioMetrics({ scenarioId, payload }));
      } catch (error) {
        console.error("Error toggling metric:", error);
        showSaveMessage("error", "Failed to update metric status");
      } finally {
        setLocalSaving(false);
      }
    }
  };

  // Updated to handle complete data structure from MetricsGraph
  const handleMetricDataChange = (metricId, updatedData, isRapidChange = false) => {
    // Use either throttled or debounced update based on the type of change
    if (isRapidChange) {
      throttledLocalUpdate(metricId, updatedData);
    } else {
      debouncedLocalUpdate(metricId, updatedData);
    }
  };

  // Check if a metric is selected
  const isMetricSelected = (metricId) => {
    return Boolean(metricsData[metricId]);
  };

  // Get the metric data for a specific metric
  const getMetricData = (metricId) => {
    return metricsData[`${metricId}_data`] || {};
  };

  // Check if we have pending changes that need saving
  const hasPendingChanges = Object.values(pendingChanges).some(
    (value) => value
  );

  return (
    <div
      className={`space-y-4 px-8 mr-2 ${
        open ? "max-w-[108vw]" : "max-w-[120vw]"
      }`}
    >
      {/* Save button and status message if there are pending changes */}
      {scenarioId && (
        <div className="flex items-center justify-end">
          <div>
            {saveMessage.type && (
              <div
                className={`py-2 px-4 rounded text-sm 
                  ${
                    saveMessage.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
              >
                {saveMessage.text}
              </div>
            )}
          </div>

          {hasPendingChanges && (
            <button
              onClick={saveChangesToServer}
              disabled={localSaving}
              className={`flex items-center gap-2 px-4 py-2 rounded bg-green-500 text-white 
                ${
                  localSaving
                    ? "opacity-50 cursor-not-allowed animate-pulse"
                    : "hover:bg-green-600"
                }`}
            >
              <>
                <FiSave size={16} />
              </>
            </button>
          )}
        </div>
      )}

      {externalError ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {typeof externalError === "string"
            ? externalError
            : "Failed to load metrics data"}
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
                    disabled={localSaving || externalLoading}
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

                {/* Show indicator if this metric has pending changes */}
                {pendingChanges[metric.id] && (
                  <span className="ml-2 text-xs text-blue-600 animate-pulse">
                    {externalLoading ? "Saving..." : "(Unsaved changes)"}
                  </span>
                )}
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
                    metricData={getMetricData(metric.id)}
                    onPercentageChange={(updatedData) =>
                      handleMetricDataChange(metric.id, updatedData, false)
                    }
                    onBaseValueChange={(updatedData) =>
                      handleMetricDataChange(metric.id, updatedData, false)
                    }
                    disabled={localSaving || externalLoading}
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