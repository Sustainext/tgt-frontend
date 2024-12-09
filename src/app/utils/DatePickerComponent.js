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
  addYears,
  subYears,
} from "date-fns";
import { AiOutlineCalendar } from "react-icons/ai";

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(addMonths(new Date(), 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [position, setPosition] = useState("bottom"); // Add a state for position
  const dateInputRef = useRef(null);
  const [range, setRange] = useState({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
  });

  // Handle click outside the date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
        setShowMonthDropdown(false);
        setShowYearDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Strip time from date
  const stripTime = (date) => {
    const strippedDate = new Date(date);
    strippedDate.setHours(0, 0, 0, 0);
    return strippedDate;
  };

  // Handle date click
  const handleDateClick = (day) => {
    const strippedDate = stripTime(day);

    if (!range.start || (range.start && range.end)) {
      setRange({ start: strippedDate, end: null });
    } else {
      setRange((prevRange) => {
        const newRange = { ...prevRange, end: strippedDate };
        onDateChange({
          start: format(stripTime(prevRange.start), "yyyy-MM-dd"),
          end: format(strippedDate, "yyyy-MM-dd"),
        });
        return newRange;
      });
      setShowDatePicker(false);
    }
  };

  // Handle month change
  const handleMonthChange = (setMonth, newMonth) => {
    setMonth(newMonth);
    setShowMonthDropdown(false);
    setActiveDropdown(null);
  };

  // Handle year change
  const handleYearChange = (month, setMonth, newYear) => {
    const newDate = new Date(month);
    newDate.setFullYear(newYear);
    setMonth(newDate);
    setShowYearDropdown(false);
    setActiveDropdown(null);
  };

  // Toggle month dropdown
  const toggleMonthDropdown = (dropdownType) => {
    setShowMonthDropdown(!showMonthDropdown);
    setShowYearDropdown(false);
    setActiveDropdown(dropdownType);
  };

  // Toggle year dropdown
  const toggleYearDropdown = (dropdownType) => {
    setShowYearDropdown(!showYearDropdown);
    setShowMonthDropdown(false);
    setActiveDropdown(dropdownType);
  };

  // Render header for the date picker
  const renderHeader = (month, setMonth, dropdownType) => (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setMonth(subMonths(month, 1))}
          className="px-2 py-1"
        >
          &lt;
        </button>
      </div>
      <div className="relative flex items-center space-x-1">
        <span
          className="text-[12px] font-semibold cursor-pointer"
          onClick={() => toggleMonthDropdown(dropdownType)}
        >
          {format(month, "MMMM")}
        </span>
        {showMonthDropdown && activeDropdown === dropdownType && (
          <div className="absolute top-8 left-0 text-[12px] bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-48 overflow-y-scroll">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  handleMonthChange(setMonth, new Date(month.setMonth(i)))
                }
              >
                {format(new Date(month.setMonth(i)), "MMMM")}
              </div>
            ))}
          </div>
        )}
<span
  className="text-[12px] font-semibold cursor-pointer"
  onClick={() => toggleYearDropdown(dropdownType)}
>
  {format(month, "yyyy")}
</span>
{showYearDropdown && activeDropdown === dropdownType && (
  <div className="absolute top-8 right-0 text-[12px] bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-48 overflow-y-scroll">
    {(() => {
      const startYear = 2015; // Start year for the dropdown
      const currentYear = new Date().getFullYear();
      const endYear = currentYear + 1; // Current year + 1
      const years = [];
      for (let year = endYear; year >= startYear; year--) {
        years.push(year.toString()); // Pushing years as strings
      }
      return years; // Returning the array of years
    })().map((year) => (
      <div
        key={year}
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        onClick={() => handleYearChange(month, setMonth, parseInt(year))}
      >
        {year}
      </div>
    ))}
  </div>
)}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setMonth(addMonths(month, 1))}
          className="px-2 py-1"
        >
          &gt;
        </button>
      </div>
    </div>
  );

  // Render days of the week
  const renderDays = () => {
    const days = [];
    let startDate = startOfWeek(startMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-[12px] font-medium text-center" key={i}>
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2 gap-2">{days}</div>;
  };

  // Render cells for the days in the calendar
  const renderCells = (month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
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
        const isHoveredInRange =
          range.start &&
          !range.end &&
          hoveredDate &&
          isWithinInterval(day, { start: range.start, end: hoveredDate });

        days.push(
          <div
            className={`p-1 w-[35px] text-[12px] text-center cursor-pointer rounded-md ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isStartOrEnd
                ? "bg-blue-500 text-white rounded-full"
                : isInRange
                ? "bg-blue-300"
                : isHoveredInRange
                ? "bg-blue-100"
                : "bg-white"
            }`}
            key={day}
            onClick={() => handleDateClick(cloneDay)}
            onMouseEnter={() => setHoveredDate(day)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <span>{format(day, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-2">{rows}</div>;
  };

  // Dynamic positioning of the date picker based on available space
  const calculatePosition = () => {
    const rect = dateInputRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Check available space at the bottom
    if (rect.bottom + 300 > windowHeight && rect.top > 300) {
      setPosition("top"); // Open above if not enough space at the bottom
    } else if (rect.left + 500 > windowWidth && rect.right > 500) {
      setPosition("left"); // Open to the left if not enough space on the right
    } else if (rect.right + 500 > windowWidth) {
      setPosition("right"); // Open to the right
    } else {
      setPosition("bottom"); // Default is to open below the input
    }
  };

  // Toggle the date picker and calculate position
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    if (!showDatePicker) {
      calculatePosition();
    }
  };

  return (
    <div className="relative" ref={dateInputRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          readOnly
          value={
            startDate && endDate
              ? `${format(startDate, "dd/MMM/yyyy")} ~ ${format(
                  endDate,
                  "dd/MMM/yyyy"
                )}`
              : ""
          }
          onClick={toggleDatePicker}
          className="py-[0.375rem] border border-gray-300 rounded-md w-full text-[12px] pl-2 text-neutral-500"
        />
        <AiOutlineCalendar
          className="absolute right-2 cursor-pointer"
          onClick={toggleDatePicker}
        />
      </div>
      {showDatePicker && (
        <div
          className={`absolute z-10 mt-2 p-4 bg-white border border-gray-300 rounded-md w-[38vw] ${
            position === "top"
              ? "bottom-full mb-2"
              : position === "left"
              ? "right-full mr-2"
              : position === "right"
              ? "ml-2"
              : "top-full mt-2"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              {renderHeader(startMonth, setStartMonth, "start")}
              {renderDays()}
              {renderCells(startMonth)}
            </div>
            <div className="relative border-l border-gray-300 pl-4">
              {renderHeader(endMonth, setEndMonth, "end")}
              {renderDays()}
              {renderCells(endMonth)}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-1 bg-gray-200 rounded-md text-[12px]"
              onClick={() => setShowDatePicker(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded-md text-[12px]"
              onClick={() => setShowDatePicker(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
