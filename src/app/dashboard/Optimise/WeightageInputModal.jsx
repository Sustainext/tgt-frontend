import React, { useState, useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const WeightageInputModal = ({
  isOpen,
  onClose,
  selectedMetrics,
  onProceed,
  setCurrentStep,
}) => {
  // Initial weightages - equal distribution by default
  const initialWeightages = () => {
    const metricCount = Object.keys(selectedMetrics).filter(
      (key) => selectedMetrics[key]
    ).length;
    if (metricCount === 0) return {};

    const equalWeight = parseFloat((1 / metricCount).toFixed(2));
    const weightages = {};

    Object.keys(selectedMetrics).forEach((metric) => {
      if (selectedMetrics[metric]) {
        weightages[metric] = equalWeight;
      }
    });

    return weightages;
  };

  const [weightages, setWeightages] = useState(initialWeightages());
  const [total, setTotal] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef({});

  // Reset when metrics change
  useEffect(() => {
    setWeightages(initialWeightages());
    setTotal(1);
    setIsValid(true);
    setErrorMessage("");
  }, [selectedMetrics]);

  // Calculate total when weightages change
  useEffect(() => {
    const newTotal = Object.values(weightages).reduce(
      (sum, weight) => sum + weight,
      0
    );
    setTotal(parseFloat(newTotal.toFixed(2)));

    // Only show error when total is not 1
    if (Math.abs(newTotal - 1) > 0.001) {
      setIsValid(false);
      if (newTotal > 1) {
        setErrorMessage(`Reduce by: -${(newTotal - 1).toFixed(1)}`);
      } else {
        setErrorMessage(`Increase by: +${(1 - newTotal).toFixed(1)}`);
      }
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  }, [weightages]);

  // Update a specific metric's weightage
  const handleWeightageChange = (metric, value) => {
    // If there's only one metric, keep it at 1
    if (Object.keys(weightages).length === 1) {
      return;
    }

    // Ensure value is between 0 and 1
    const newValue = Math.max(0, Math.min(1, value));

    setWeightages((prev) => ({
      ...prev,
      [metric]: parseFloat(newValue.toFixed(2)),
    }));
  };

  // Handle slider change
  const handleSliderChange = (metric, e) => {
    // If there's only one metric, keep it at 1
    if (Object.keys(weightages).length === 1) {
      return;
    }

    // Convert slider value (0-100) to weightage (0-1)
    const value = parseFloat((parseInt(e.target.value) / 100).toFixed(2));
    handleWeightageChange(metric, value);
  };

  // Handle input focus to position cursor after last digit
  const handleInputFocus = (e) => {
    // Position cursor at the end
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  };

  // Handle text input change
  const handleInputChange = (metric, value) => {
    // Allow for partial input during typing (like "0." or ".5")
    if (value === "" || value === "." || value === "0.") {
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handleWeightageChange(metric, numValue);
    }
  };

  // Reset to equal distribution
  const handleReset = () => {
    setWeightages(initialWeightages());
  };

  // Handle proceed button click
  const handleProceed = () => {
    if (isValid) {
      onProceed(weightages);
      onClose();
      setCurrentStep(2); // Move to step 2
    }
  };

  // Get the active metrics as an array
  const activeMetrics = Object.keys(selectedMetrics).filter(
    (key) => selectedMetrics[key]
  );

  // Format metric name for display
  const formatMetricName = (name) => {
    switch (name) {
      case "fte":
        return "FTE";
      case "productionVolume":
        return "Production Volume";
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  // Determine if we should disable sliders (single metric case)
  const disableSliders = activeMetrics.length === 1;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Input Weightage
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          By default all the business metrics have equal weightage (total of 1).
          Change the weightage if needed or proceed with the default values.
        </p>

        {/* Column Headers */}
        <div className="flex justify-between mb-2">
          <div className="font-medium text-gray-700">Metric</div>
          <div className="font-medium text-gray-700">Weightage</div>
        </div>

        {/* Metrics List */}
        <div className="space-y-4 mb-6">
          {activeMetrics.map((metric) => (
            <div key={metric} className="flex items-center justify-between">
              <div className="text-gray-800">{formatMetricName(metric)}</div>
              <div className="flex items-center space-x-3 w-2/3">
                <div className="flex-1 relative">
                  {/* Custom styled slider track */}
                  <div className="w-full h-1 bg-gray-200 rounded-full absolute top-1/2 -translate-y-1/2">
                    {/* Green progress part */}
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${weightages[metric] * 100}%` }}
                    ></div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={weightages[metric] * 100}
                    onChange={(e) => handleSliderChange(metric, e)}
                    disabled={disableSliders}
                    className="appearance-none w-full h-1 bg-transparent relative z-10 cursor-pointer"
                    style={{
                      // Hide the default appearance
                      WebkitAppearance: "none",
                      opacity: 0.0001, // Almost invisible but still interactive
                    }}
                  />

                  {/* Custom thumb */}
                  {!disableSliders && (
                    <div
                      className="w-4 h-4 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-full shadow"
                      style={{ left: `${weightages[metric] * 100}%` }}
                    ></div>
                  )}
                </div>
                <input
                  ref={(el) => (inputRefs.current[metric] = el)}
                  type="text"
                  value={weightages[metric].toFixed(2)}
                  onChange={(e) => handleInputChange(metric, e.target.value)}
                  onFocus={handleInputFocus}
                  disabled={disableSliders}
                  className="w-16 p-2 border border-gray-300 rounded text-center"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="font-medium text-gray-700">Total</div>
          <div className="flex items-center">
            <span
              className={`text-lg font-semibold ${
                isValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {total.toFixed(1)}
            </span>
            {!isValid && (
              <span className="ml-4 text-sm text-red-500">{errorMessage}</span>
            )}
          </div>
        </div>
        {/* Validation message */}
        {isValid && (
          <p className="text-right mb-6 text-green-500 text-sm">
            Weightage distribution{" "}
            <span className="">✓</span>
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={handleProceed}
            disabled={!isValid}
            className={`px-4 py-2 rounded text-white ${
              isValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            } flex items-center`}
          >
            Proceed <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeightageInputModal;
