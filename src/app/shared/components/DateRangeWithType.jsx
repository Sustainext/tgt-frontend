import React, { useState, useRef, useEffect } from "react";
import { FiFilter } from "react-icons/fi";

const DateRangePicker = ({ startDate, endDate, onDateChange, dateFilterType }) => {
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });
  const [hoveredDate, setHoveredDate] = useState(null);
  const [filterType, setFilterType] = useState(dateFilterType);
  const [range, setRange] = useState({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
  });

  const datePickerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Date utility functions
  const formatDate = (date, formatType = "yyyy-MM-dd") => {
    if (!date) return "";
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    switch (formatType) {
      case "yyyy-MM-dd":
        return `${year}-${month}-${day}`;
      case "dd MMM yyyy":
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${day} ${monthNames[date.getMonth()]} ${year}`;
      case "MMMM yyyy":
        const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${fullMonthNames[date.getMonth()]} ${year}`;
      case "EEE":
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return dayNames[date.getDay()];
      default:
        return date.toString();
    }
  };

  const addMonths = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  };

  const subMonths = (date, months) => {
    return addMonths(date, -months);
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isSameMonth = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isWithinInterval = (date, { start, end }) => {
    if (!start || !end) return false;
    return date >= start && date <= end;
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        onDateChange({
          type: filterType,
          start: range.start ? formatDate(range.start) : null,
          end: range.end ? formatDate(range.end) : null,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterType, range, onDateChange]);

  const stripTime = (date) => {
    const strippedDate = new Date(date);
    strippedDate.setHours(0, 0, 0, 0);
    return strippedDate;
  };

  const handleDateClick = (day) => {
    const strippedDate = stripTime(day);

    if (!range.start || (range.start && range.end)) {
      setRange({ start: strippedDate, end: null });
    } else {
      setRange((prevRange) => {
        const newRange = { ...prevRange, end: strippedDate };
        onDateChange({
          type: filterType,
          start: formatDate(stripTime(prevRange.start)),
          end: formatDate(strippedDate),
        });
        return newRange;
      });
    }
  };

  // Fixed filter type change handler
  const handleFilterTypeChange = (type, event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Filter type changing from', filterType, 'to', type);
    setFilterType(type);
  };

  const renderHeader = (month, setMonth) => (
    <div className="flex justify-between items-center mb-2">
      <button
        onClick={() => setMonth(subMonths(month, 1))}
        className="px-2 py-1 hover:bg-gray-100 rounded"
      >
        &lt;
      </button>
      <span className="font-semibold text-sm">
        {formatDate(month, "MMMM yyyy")}
      </span>
      <button
        onClick={() => setMonth(addMonths(month, 1))}
        className="px-2 py-1 hover:bg-gray-100 rounded"
      >
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day, i) => (
          <div key={i} className="text-sm font-medium text-center">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = (month) => {
    const year = month.getFullYear();
    const monthNum = month.getMonth();
    const firstDay = new Date(year, monthNum, 1);
    const lastDay = new Date(year, monthNum + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const rows = [];
    let days = [];
    let day = new Date(startDate);

    for (let week = 0; week < 6; week++) {
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const cloneDay = new Date(day);
        const isInRange = range.start && range.end && isWithinInterval(day, { start: range.start, end: range.end });
        const isStartOrEnd = isSameDay(day, range.start) || isSameDay(day, range.end);

        days.push(
          <div
            key={day.getTime()}
            onClick={() => handleDateClick(cloneDay)}
            className={`p-2 text-sm text-center rounded-md cursor-pointer ${
              !isSameMonth(day, month)
                ? "text-gray-400"
                : isStartOrEnd
                ? "bg-blue-500 text-white"
                : isInRange
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >
            {day.getDate()}
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div key={week} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  // Custom Radio Button Component
  const CustomRadioButton = ({ value, checked, onChange, label, className = "" }) => (
    <div 
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      onClick={(e) => onChange(value, e)}
    >
      <div className="relative">
        <div className={`w-4 h-4 rounded-full border-2 transition-all ${
          checked 
            ? "border-blue-500 bg-blue-500" 
            : "border-gray-300 bg-white hover:border-blue-300"
        }`}>
          {checked && (
            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          )}
        </div>
      </div>
      <span className={`select-none ${checked ? "font-medium text-blue-700" : "text-gray-700"}`}>
        {label}
      </span>
    </div>
  );

  return (
    <>
      {/* Desktop Version */}
      <div className="relative w-[40vw] hidden xl:block" ref={datePickerRef}>
        <div className="absolute z-10 mt-2 p-4 bg-white border shadow-md rounded-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-1">
              <FiFilter className="text-blue-500" />
              <span className="font-semibold text-md">Filter by Date</span>
            </div>
          </div>

          {/* Filter Type Selection */}
          <div className="flex justify-between items-center text-sm mb-8 mt-2">
            <CustomRadioButton
              value="assigned"
              checked={filterType === "assigned"}
              onChange={handleFilterTypeChange}
              label="Filter tasks by Assigned Date"
            />
            
            <CustomRadioButton
              value="due"
              checked={filterType === "due"}
              onChange={handleFilterTypeChange}
              label="Filter tasks by Due Date"
              className="mr-12"
            />
          </div>

          {/* Calendar Grids */}
          <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
            <div>
              {renderHeader(startMonth, setStartMonth)}
              {renderDays()}
              {renderCells(startMonth)}
            </div>
            <div className="border-l border-gray-300 pl-4">
              {renderHeader(endMonth, setEndMonth)}
              {renderDays()}
              {renderCells(endMonth)}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <div>
              {range.start && range.end ? (
                <span className="text-sm text-gray-600">
                  <span className="bg-white border border-gray-200 rounded-md p-2">
                    {formatDate(range.start, "dd MMM yyyy")}
                  </span>{" "}
                  -{" "}
                  <span className="bg-white border border-gray-200 rounded-md p-2">
                    {formatDate(range.end, "dd MMM yyyy")}
                  </span>
                </span>
              ) : (
                "No date selected"
              )}
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-sm text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setRange({ start: null, end: null })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600"
                onClick={() =>
                  onDateChange({
                    type: filterType,
                    start: range.start ? formatDate(range.start) : null,
                    end: range.end ? formatDate(range.end) : null,
                  })
                }
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="xl:hidden md:hidden lg:hidden block">
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="relative w-[95vw] max-w-md" ref={datePickerRef}>
            <div className="z-10 mt-8 p-4 bg-white border shadow-md rounded-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-1">
                  <FiFilter className="text-blue-500" />
                  <span className="font-semibold text-md">Filter by Date</span>
                </div>
              </div>

              {/* Filter Type Selection - Mobile */}
              <div className="flex flex-col gap-3 text-sm mb-6 mt-2">
                <CustomRadioButton
                  value="assigned"
                  checked={filterType === "assigned"}
                  onChange={handleFilterTypeChange}
                  label="Filter tasks by Assigned Date"
                />
                
                <CustomRadioButton
                  value="due"
                  checked={filterType === "due"}
                  onChange={handleFilterTypeChange}
                  label="Filter tasks by Due Date"
                />
              </div>

              {/* Calendar Grids - Mobile */}
              <div className="space-y-4 border-b border-gray-200 pb-4">
                <div>
                  {renderHeader(startMonth, setStartMonth)}
                  {renderDays()}
                  {renderCells(startMonth)}
                </div>
                <div className="border-t border-gray-300 pt-4">
                  {renderHeader(endMonth, setEndMonth)}
                  {renderDays()}
                  {renderCells(endMonth)}
                </div>
              </div>

              {/* Buttons - Mobile */}
              <div className="flex flex-col gap-3 mt-4">
                <div className="text-center">
                  {range.start && range.end ? (
                    <span className="text-sm text-gray-600">
                      <span className="bg-white border border-gray-200 rounded-md p-2">
                        {formatDate(range.start, "dd MMM yyyy")}
                      </span>{" "}
                      -{" "}
                      <span className="bg-white border border-gray-200 rounded-md p-2">
                        {formatDate(range.end, "dd MMM yyyy")}
                      </span>
                    </span>
                  ) : (
                    "No date selected"
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    className="flex-1 px-4 py-2 bg-gray-200 text-sm text-gray-800 rounded-md hover:bg-gray-300"
                    onClick={() => setRange({ start: null, end: null })}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600"
                    onClick={() => {
                      onDateChange({
                        type: filterType,
                        start: range.start ? formatDate(range.start) : null,
                        end: range.end ? formatDate(range.end) : null,
                      });
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateRangePicker;