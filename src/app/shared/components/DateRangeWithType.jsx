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

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const [startMonth, setStartMonth] = useState(new Date()); // Left calendar
  const [endMonth, setEndMonth] = useState(addMonths(new Date(), 1)); // Right calendar
  const [hoveredDate, setHoveredDate] = useState(null); // Highlight range on hover
  const [filterType, setFilterType] = useState("assigned"); // Assigned or Due Date
  const [range, setRange] = useState({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
  });

  const datePickerRef = useRef(null); // Reference for click outside handling
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        onDateChange({
          type: filterType,
          start: range.start ? format(range.start, "yyyy-MM-dd") : null,
          end: range.end ? format(range.end, "yyyy-MM-dd") : null,
        });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterType, range, onDateChange]);

  // Utility to strip time from a date
  const stripTime = (date) => {
    const strippedDate = new Date(date);
    strippedDate.setHours(0, 0, 0, 0);
    return strippedDate;
  };

  // Handle date selection
  const handleDateClick = (day) => {
    const strippedDate = stripTime(day);

    if (!range.start || (range.start && range.end)) {
      setRange({ start: strippedDate, end: null });
    } else {
      setRange((prevRange) => {
        const newRange = { ...prevRange, end: strippedDate };
        onDateChange({
          type: filterType,
          start: format(stripTime(prevRange.start), "yyyy-MM-dd"),
          end: format(strippedDate, "yyyy-MM-dd"),
        });
        return newRange;
      });
    }
  };

  // Render calendar header with month/year controls
  const renderHeader = (month, setMonth) => (
    <div className="flex justify-between items-center mb-2">
      <button
        onClick={() => setMonth(subMonths(month, 1))}
        className="px-2 py-1 hover:bg-gray-100 rounded"
      >
        &lt;
      </button>
      <span className="font-semibold text-sm">
        {format(month, "MMMM yyyy")}
      </span>
      <button
        onClick={() => setMonth(addMonths(month, 1))}
        className="px-2 py-1 hover:bg-gray-100 rounded"
      >
        &gt;
      </button>
    </div>
  );

  // Render days of the week (Mon, Tue, etc.)
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

  // Render calendar cells for a month
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
          isSameDay(day, range.start) || isSameDay(day, range.end);

        days.push(
          <div
            key={day}
            onClick={() => handleDateClick(cloneDay)}
            className={`p-2 text-sm text-center rounded-md cursor-pointer ${
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
        <div key={day} className="grid grid-cols-7 gap-2">
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
          {/* Header */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-1">
              <FiFilter className="text-blue-500" />
              <span className="font-semibold text-md">Filter by Date</span>
            </div>
          </div>

          {/* Filter Type Selection */}
          <div className="flex justify-between items-center text-sm mb-8 mt-2 text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="filterType"
                value="assigned"
                checked={filterType === "assigned"}
                onChange={() => setFilterType("assigned")}
              />
              Filter tasks by Assigned Date
            </label>
            <label className="flex items-center gap-2 mr-12">
              <input
                type="radio"
                name="filterType"
                value="due"
                checked={filterType === "due"}
                onChange={() => setFilterType("due")}
              />
              Filter tasks by Due Date
            </label>
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
                    {format(range.start, "dd MMM yyyy")}
                  </span>{" "}
                  -{" "}
                  <span className="bg-white border border-gray-200 rounded-md p-2">
                    {format(range.end, "dd MMM yyyy")}
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
                    start: range.start
                      ? format(range.start, "yyyy-MM-dd")
                      : null,
                    end: range.end ? format(range.end, "yyyy-MM-dd") : null,
                  })
                }
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile verison */}
      <div className="xl:hidden md:hidden lg:hidden block">
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center  ">
          <div className="relative w-[120vw]" ref={datePickerRef}>
            <div className=" z-10 mt-8 p-4 bg-white border shadow-md rounded-md w-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-1">
                  <FiFilter className="text-blue-500" />
                  <span className="font-semibold text-md">Filter by Date</span>
                </div>
              </div>

              {/* Filter Type Selection */}
              <div className="flex justify-between items-center text-sm mb-8 mt-2 text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="filterType"
                    value="assigned"
                    checked={filterType === "assigned"}
                    onChange={() => setFilterType("assigned")}
                  />
                  Filter tasks by Assigned Date
                </label>
                <label className="flex items-center gap-2 mr-12">
                  <input
                    type="radio"
                    name="filterType"
                    value="due"
                    checked={filterType === "due"}
                    onChange={() => setFilterType("due")}
                  />
                  Filter tasks by Due Date
                </label>
              </div>

              {/* Calendar Grids */}
              <div className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 border-b border-gray-200 pb-4">
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
                        {format(range.start, "dd MMM yyyy")}
                      </span>{" "}
                      -{" "}
                      <span className="bg-white border border-gray-200 rounded-md p-2">
                        {format(range.end, "dd MMM yyyy")}
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
                        start: range.start
                          ? format(range.start, "yyyy-MM-dd")
                          : null,
                        end: range.end ? format(range.end, "yyyy-MM-dd") : null,
                      })
                    }
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
