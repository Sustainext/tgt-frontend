import React, { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { FiFilter } from "react-icons/fi";

const DateRangePicker = ({
  startDate,
  endDate,
  onDateChange,
  dateFilterType,
  onDateFilterTypeChange,
}) => {
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(addMonths(new Date(), 1));
  const [hoveredDate, setHoveredDate] = useState(null);
  const [filterType, setFilterType] = useState(dateFilterType || "assigned");
  const [range, setRange] = useState({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
  });

  const datePickerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setRange({
      start: startDate ? new Date(startDate) : null,
      end: endDate ? new Date(endDate) : null,
    });
  }, [startDate, endDate]);

  useEffect(() => {
    if (dateFilterType && dateFilterType !== filterType) {
      setFilterType(dateFilterType);
    }
  }, [dateFilterType]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        if (range.start && range.end) {
          onDateChange({
            type: filterType,
            start: format(range.start, "yyyy-MM-dd"),
            end: format(range.end, "yyyy-MM-dd"),
          });
        }
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
      const newStart = range.start;
      const newEnd = strippedDate;
      const finalStart = newStart <= newEnd ? newStart : newEnd;
      const finalEnd = newStart <= newEnd ? newEnd : newStart;

      setRange({ start: finalStart, end: finalEnd });

      onDateChange({
        type: filterType,
        start: format(finalStart, "yyyy-MM-dd"),
        end: format(finalEnd, "yyyy-MM-dd"),
      });
    }
  };

  const handleFilterTypeChange = (e) => {
    const selectedType = e.target.value;
    console.log("Selected filter type:", selectedType);
    setFilterType(selectedType);

    if (onDateFilterTypeChange) {
      onDateFilterTypeChange(selectedType);
    }

    if (range.start && range.end) {
      onDateChange({
        type: selectedType,
        start: format(range.start, "yyyy-MM-dd"),
        end: format(range.end, "yyyy-MM-dd"),
      });
    }
  };

  const handleClear = () => {
    setRange({ start: null, end: null });
    onDateChange({
      type: filterType,
      start: null,
      end: null,
    });
  };

  const renderHeader = (month, setMonth) => (
    <div className="flex justify-between items-center mb-2">
      <button
        onClick={() => setMonth(subMonths(month, 1))}
        className="px-2 py-1 hover:bg-gray-100 rounded"
        type="button"
      >
        &lt;
      </button>
      <span className="font-semibold text-sm">{format(month, "MMMM yyyy")}</span>
      <button
        onClick={() => setMonth(addMonths(month, 1))}
        className="px-2 py-1 hover:bg-gray-100 rounded"
        type="button"
      >
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    let startDate = startOfWeek(new Date());
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-sm font-medium text-center">
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-2 mb-2">{days}</div>;
  };

  const renderCells = (month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isInRange =
          range.start &&
          range.end &&
          isWithinInterval(day, { start: range.start, end: range.end });
        const isStartOrEnd =
          (range.start && isSameDay(day, range.start)) ||
          (range.end && isSameDay(day, range.end));

        days.push(
          <div
            key={day.toString()}
            onClick={() => handleDateClick(cloneDay)}
            className={`p-2 text-sm text-center rounded-md cursor-pointer transition-colors ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isStartOrEnd
                ? "bg-blue-500 text-white"
                : isInRange
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <>
      <div className="relative w-[40vw] hidden xl:block" ref={datePickerRef}>
        <div className="absolute z-10 mt-2 p-4 bg-white border shadow-md rounded-md w-full">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-1">
              <FiFilter className="text-blue-500" />
              <span className="font-semibold text-md">Filter by Date</span>
            </div>
          </div>

          {/* ✅ Fixed radio buttons */}
          <div className="flex justify-between items-center text-sm mb-8 mt-2 text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="filterType"
                value="assigned"
                checked={filterType === "assigned"}
                onChange={handleFilterTypeChange}
              />
              <span>Filter tasks by Assigned Date</span>
            </label>
            <label className="flex items-center gap-2 mr-12 cursor-pointer">
              <input
                type="radio"
                name="filterType"
                value="due"
                checked={filterType === "due"}
                onChange={handleFilterTypeChange}
              />
              <span>Filter tasks by Due Date</span>
            </label>
          </div>

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

          <div className="flex justify-between items-center mt-4">
            <div>
              {range.start && range.end ? (
                <span className="text-sm text-gray-600">
                  <span className="bg-white border border-gray-200 rounded-md p-2">
                    {format(range.start, "dd MMM yyyy")}
                  </span>{" "}
                  -{" "}
                  <span className="bg-white border border-gray-200 rounded-md p-2">
                    {format(range.end, "dd MMM yyyy")}
                  </span>
                </span>
              ) : (
                <span className="text-sm text-gray-500">No date selected</span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-sm text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version (also fixed) */}
      <div className="xl:hidden md:hidden lg:hidden block">
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="relative w-[95vw] max-w-md" ref={datePickerRef}>
            <div className="z-10 mt-8 p-4 bg-white border shadow-md rounded-md w-full">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-1">
                  <FiFilter className="text-blue-500" />
                  <span className="font-semibold text-md">Filter by Date</span>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-6 mt-2 text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="filterType"
                    value="assigned"
                    checked={filterType === "assigned"}
                    onChange={handleFilterTypeChange}
                  />
                  <span>Filter tasks by Assigned Date</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="filterType"
                    value="due"
                    checked={filterType === "due"}
                    onChange={handleFilterTypeChange}
                  />
                  <span>Filter tasks by Due Date</span>
                </label>
              </div>

              <div className="space-y-4 border-b border-gray-200 pb-4">
                <div>
                  {renderHeader(startMonth, setStartMonth)}
                  {renderDays()}
                  {renderCells(startMonth)}
                </div>
                <div>
                  {renderHeader(endMonth, setEndMonth)}
                  {renderDays()}
                  {renderCells(endMonth)}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <div className="text-center">
                  {range.start && range.end ? (
                    <span className="text-sm text-gray-600">
                      <span className="bg-white border border-gray-200 rounded-md p-2">
                        {format(range.start, "dd MMM yyyy")}
                      </span>{" "}
                      -{" "}
                      <span className="bg-white border border-gray-200 rounded-md p-2">
                        {format(range.end, "dd MMM yyyy")}
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">No date selected</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-gray-200 text-sm text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={handleClear}
                  >
                    Clear
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
