import React from "react";
import { FiInfo } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

const BusinessMetricsWithTooltips = ({ 
  businessMetrics, 
  selectedMetrics, 
  toggleMetric,
  scenario,
  MetricsGraph,
  open
}) => {
  // Tooltip contents
  const tooltipContent = {
    fte: "FTE represents the total number of full-time hours worked by both full-time and part-time employees, allowing for a standardized comparison of workforce size. For example, if a company considers 40 hours full-time, and there are two employees working 20 hours per week, those two employees would be 1.0 FTE.",
    area: "Area refers to the physical area occupied or operated by the organization — office space, factory, or land area.",
    productionVolume: "Production volume refers to the quantity of goods or services a company produces within a given period (e.g., daily, weekly, monthly, or annually). It's typically calculated by multiplying the number of units produced by their unit cost or simply by counting the total number of units.",
    revenue: "Total earnings of a business from selling its products or services within a specified timeframe. The formula for determining revenue is: Revenue = Price x Quantity"
  };

  return (
    <div className={`space-y-4 px-8 mr-2 ${open ? "max-w-[108vw]" : "max-w-[120vw]"}`}>
      {businessMetrics.map((metric) => (
        <div
          key={metric.id}
          className={`bg-white border rounded-lg shadow-sm overflow-visible ${
            selectedMetrics[metric.id]
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
                  checked={selectedMetrics[metric.id]}
                  onChange={() => toggleMetric(metric.id)}
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
          {selectedMetrics[metric.id] && (
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
                  baseYear={scenario?.baseYear || 2025}
                  targetYear={scenario?.targetYear || 2030}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BusinessMetricsWithTooltips;