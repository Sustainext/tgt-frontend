import React, { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isWithinInterval, addYears, subYears } from 'date-fns';
import { AiOutlineCalendar } from 'react-icons/ai';

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const [startMonth, setStartMonth] = useState(new Date());
  const [endMonth, setEndMonth] = useState(addMonths(new Date(), 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dateInputRef = useRef(null);
  const [range, setRange] = useState({ start: startDate ? new Date(startDate) : null, end: endDate ? new Date(endDate) : null });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateInputRef.current && !dateInputRef.current.contains(event.target)) {
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
          start: format(stripTime(prevRange.start), 'yyyy-MM-dd'),
          end: format(strippedDate, 'yyyy-MM-dd')
        });
        return newRange;
      });
      setShowDatePicker(false);
    }
  };

  const handleMonthChange = (setMonth, newMonth) => {
    setMonth(newMonth);
    setShowMonthDropdown(false);
    setActiveDropdown(null);
  };

  const handleYearChange = (month, setMonth, newYear) => {
    const newDate = new Date(month);
    newDate.setFullYear(newYear);
    setMonth(newDate);
    setShowYearDropdown(false);
    setActiveDropdown(null);
  };

  const toggleMonthDropdown = (dropdownType) => {
    setShowMonthDropdown(!showMonthDropdown);
    setShowYearDropdown(false);
    setActiveDropdown(dropdownType);
  };

  const toggleYearDropdown = (dropdownType) => {
    setShowYearDropdown(!showYearDropdown);
    setShowMonthDropdown(false);
    setActiveDropdown(dropdownType);
  };

  const renderHeader = (month, setMonth, dropdownType) => (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center space-x-2">
        <button onClick={() => setMonth(subMonths(month, 1))} className="px-2 py-1">&lt;</button>
      </div>
      <div className="relative flex items-center space-x-1">
        <span
          className="text-sm font-semibold cursor-pointer"
          onClick={() => toggleMonthDropdown(dropdownType)}
        >
          {format(month, 'MMMM')}
        </span>
        {showMonthDropdown && activeDropdown === dropdownType && (
          <div className="absolute top-8 left-0 bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-48 overflow-y-scroll">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleMonthChange(setMonth, new Date(month.setMonth(i)))}
              >
                {format(new Date(month.setMonth(i)), 'MMMM')}
              </div>
            ))}
          </div>
        )}
        <span
          className="text-sm font-semibold cursor-pointer"
          onClick={() => toggleYearDropdown(dropdownType)}
        >
          {format(month, 'yyyy')}
        </span>
        {showYearDropdown && activeDropdown === dropdownType && (
          <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-48 overflow-y-scroll">
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={i}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleYearChange(month, setMonth, new Date().getFullYear() - 50 + i)}
              >
                {new Date().getFullYear() - 50 + i}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => setMonth(addMonths(month, 1))} className="px-2 py-1">&gt;</button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = [];
    let startDate = startOfWeek(startMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center text-sm font-medium" key={i}>
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2 gap-2">{days}</div>;
  };

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
        const isInRange = range.start && range.end && isWithinInterval(day, { start: range.start, end: range.end });
        const isStartOrEnd = isSameDay(day, range.start) || isSameDay(day, range.end);
        const isHoveredInRange = range.start && !range.end && hoveredDate && isWithinInterval(day, { start: range.start, end: hoveredDate });

        days.push(
          <div
            className={`p-1 w-[35px] text-center cursor-pointer rounded-md ${!isSameMonth(day, monthStart) ? "text-gray-400" :
              isStartOrEnd ? "bg-blue-500 text-white rounded-full" :
              isInRange ? "bg-blue-300" : isHoveredInRange ? "bg-blue-100" : "bg-white"}`}
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

  return (
    <div className="relative" ref={dateInputRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          readOnly
          value={startDate && endDate ? `${format(startDate, 'dd/MMM/yyyy')} ~ ${format(endDate, 'dd/MMM/yyyy')}` : ""}
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="py-1.5 border border-gray-300 rounded-md w-full text-sm pl-2"
        />
        <AiOutlineCalendar className="absolute right-2 cursor-pointer" onClick={() => setShowDatePicker(!showDatePicker)} />
      </div>
      {showDatePicker && (
        <div className="absolute z-10 mt-2 p-4 bg-white border border-gray-300 rounded-md -ml-60 w-[53vw]">
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
            <button className="px-4 py-2 bg-gray-200 rounded-md text-sm" onClick={() => setShowDatePicker(false)}>Cancel</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm" onClick={() => setShowDatePicker(false)}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
