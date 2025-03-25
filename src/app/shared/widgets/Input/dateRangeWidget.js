import { React, useState } from 'react';
import { MdKeyboardArrowDown, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import DateRangePicker from '@/app/utils/DatePickerComponent';

const DateRangeWidget = (props) => {
  const { onChange, value = {}, uiSchema = {}, dateRangeValidation,formContext,name } = props;
  const { validationErrors } = formContext || {};
  const rowErrors = validationErrors || {};
  const hasError = !value && rowErrors && rowErrors[name]
  const [dateRange, setDateRange] = useState({
    start: value.startDate || null,
    end: value.endDate || null,
  });
  const [error, setError] = useState(""); // State to store validation error message

  // Handle changes for start and end dates
  const handleDateChange = (newRange) => {
    const { start, end } = newRange;

    // Reset error message
    setError("");

    // Validate date range if dateRangeValidation is enabled
    if (dateRangeValidation) {
      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffInYears = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365); // Difference in years

        if (diffInYears < 1) {
          setError("The difference between start date and end date must be at least 1 year.");
          return; // Stop further execution if validation fails
        }
      }
    }

    // Update state and call parent onChange
    setDateRange(newRange);
    onChange({ ...value, startDate: start, endDate: end });
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex mb-2 w-full">
          <div className="relative">
            <p className="text-[14px] 4k:text-[16px] text-gray-700 font-[500] flex">
              {uiSchema["ui:title"]}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                data-tooltip-html={uiSchema["ui:tooltipstitle"].replace(/\s+/g, "-")}
                className="mt-1 ml-3 text-[14px] 4k:text-[16px]"
                style={{ display: uiSchema["ui:tooltipdisplay"] }}
              />

              <ReactTooltip
                id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                }}
              />
            </p>
          </div>
        </div>
        <div>
          <DateRangePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onDateChange={handleDateChange}
          />
        </div>
        {/* Display error message if validation fails */}
        {error && (
          <p className="text-red-500 text-[12px] mt-2">{error}</p>
        )}
         {hasError && (
          <div className="text-red-500 text-[12px] mt-1">
           {hasError}
          </div>
        )}
      </div>
    </>
  );
};

export default DateRangeWidget;