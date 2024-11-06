"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import axiosInstance from "@/app/utils/axiosMiddleware";
import DateRangePicker from "../../utils/DatePickerComponent";

const AnalyseHeader6 = ({ location, setLocation, dateRange, setDateRange }) => {
  const [formState, setFormState] = useState({
    location: location,
    dateRange: dateRange,
  });

  const [errors, setErrors] = useState({
    location: "Please select location",
    dateRange: "Please select a valid date range",
  });
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get("/sustainapp/get_location");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "location") {
      setLocation(Number(value));
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: value ? "" : "Please select location",
      }));
    }
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
    if (newRange.start && newRange.end) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateRange: "", // Clear error if both start and end dates are selected
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dateRange: "Please select a valid date range", // Show error if dates are missing
      }));
    }
  };

  useEffect(() => {
    setFormState({
      location: location,
      dateRange: dateRange,
    });
  }, [location, dateRange]);

  return (
    <>
      <div className="ml-2 mb-5 w-full mt-4">
        <div className="flex mb-5 gap-4">
          {/* Location Selector */}
          <div className="w-[20%] relative">
            <label
              htmlFor="location"
              className="block text-neutral-800 text-[12px] font-normal mb-1"
            >
              Select Location
            </label>
            <select
              name="location"
              className="border w-full text-[12px] text-neutral-500 appearance-none pr-8 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={formState.location}
              onChange={handleChange}
            >
              <option value="">Select location</option>
              {locations.map((location, index) => (
                <option key={index} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <div
              className="absolute inset-y-0 right-2 flex items-center pointer-events-none"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <MdKeyboardArrowDown
                className="text-neutral-500"
                style={{ fontSize: "16px" }}
              />
            </div>
            {errors.location && (
              <p className="text-[#007EEF] text-[12px] mt-1">
                {errors.location}
              </p>
            )}
          </div>

          {/* Date Range Picker */}
          <div className="w-[20%]">
            <label
              htmlFor="dateRange"
              className="block text-neutral-800 text-[12px] font-normal mb-1"
            >
              Select Date Range
            </label>
            <div className="mt-1">
              <DateRangePicker
                startDate={dateRange.start}
                endDate={dateRange.end}
                onDateChange={handleDateChange}
              />
              {errors.dateRange && (
                <p className="text-[#007EEF] text-[12px] mt-1">
                  {errors.dateRange}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyseHeader6;
