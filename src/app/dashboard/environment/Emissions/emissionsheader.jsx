"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { yearInfo, months } from "@/app/shared/data/yearInfo";
import {
  fetchPreviousMonthData,
  fetchEmissionsData,
  fetchAssignedTasks,
  fetchApprovedTasks,
  setLocation,
  setYear,
  setMonth,
  setCountryCode,
  clearSelectedRows,
  fetchLocations,
} from "@/lib/redux/features/emissionSlice";

const monthMapping = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const getMonthString = (monthNumber) => {
  return Object.keys(monthMapping).find(
    (key) => monthMapping[key] === monthNumber
  );
};

const EmissionsHeader = ({
  locationError,
  setLocationError,
  yearError,
  setYearError,
  setLocationname,
}) => {
  const dispatch = useDispatch();
  const { location, year, month, climatiqData } = useSelector(
    (state) => state.emissions
  );

  const {
    data: locations,
    status: locationsStatus,
    error: locationsError,
  } = useSelector((state) => state.emissions.locations);

  useEffect(() => {
    if (locationsStatus === "idle") {
      dispatch(fetchLocations());
    }
  }, [locationsStatus, dispatch]);

  useEffect(() => {
    if (location && year) {
      dispatch(fetchEmissionsData({ location, year, month }));
      dispatch(fetchPreviousMonthData({ location, year, month }));
      dispatch(fetchAssignedTasks({ location, year, month }));
      dispatch(fetchApprovedTasks({ location, year, month }));
      dispatch(fetchLocations());
      dispatch(clearSelectedRows());
    }
  }, [location, year, month, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLocationError("");
    setYearError("");

    if (name === "month") {
      const monthNumber = monthMapping[value];
      dispatch(setMonth(monthNumber));
    } else if (name === "location") {
      const selectedLocation = locations.find(
        (loc) => loc.id === Number(value)
      );
      if (selectedLocation) {
        dispatch(setCountryCode(selectedLocation.country));
        setLocationname(selectedLocation.name);
      }
      dispatch(setLocation(Number(value)));
    } else if (name === "year") {
      dispatch(setYear(value));
    }
  };

  const getLocationSelectorMessage = (status, error = null) => {
    switch (status) {
      case "loading":
        return "Loading locations...";
      case "failed":
        return error?.message || "Failed to load locations";
      case "succeeded":
        return "Select location";
      case "idle":
      default:
        return "Select location";
    }
  };

  return (
    <>
      <div className="ml-2 mb-5">
        <div className="flex gap-4 mb-8">
          <div className="relative">
            <select
              name="location"
              className="border m-0.5 text-[12px] text-neutral-500 appearance-none pr-24 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={location}
              onChange={handleChange}
            >
              <option value="">
                {getLocationSelectorMessage(locationsStatus, locationsError)}
              </option>
              {locations?.map((loc, index) => (
                <option key={index} value={loc.id}>
                  {loc.name}
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
            {locationError && (
              <p className="text-red-500 text-[12px] absolute top-9 left-0 pl-3">
                {locationError}
              </p>
            )}
          </div>
          <div className="ml-3 relative">
            <select
              name="year"
              className="border m-0.5 text-[12px] text-neutral-500 appearance-none pr-32 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={year}
              onChange={handleChange}
            >
              <option value="">Select year</option>
              {yearInfo.map((item) => (
                <option value={item.slice(0, 4)} key={item}>
                  {item.slice(0, 4)}
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
            {yearError && (
              <p className="text-red-500 text-[12px] absolute top-9 left-0 pl-3">
                {yearError}
              </p>
            )}
          </div>

          <div className="w-full flex items-center justify-end me-4">
            <div className="float-end">
              <p className="text-[14px] text-[#0057A5]">
                GHG Emissions for the month ={" "}
                <span className="text-[#146152] text-[14px]">
                  {climatiqData.totalScore} tCO2e{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex bg-[#f7f7f7] py-1 rounded-lg">
            {months.map((monthName, index) => (
              <button
                key={index}
                className={`text-[12px] border-r mx-1 ${
                  month === monthMapping[monthName]
                    ? "bg-white shadow-md rounded-lg"
                    : ""
                }`}
                onClick={() =>
                  handleChange({ target: { name: "month", value: monthName } })
                }
              >
                <p
                  className={`text-center ${
                    month === monthMapping[monthName]
                      ? "custom-gradient-text"
                      : "text-[#A1A1A1]"
                  } hover:bg-[#f7f7f7] py-1 w-[55px] ${
                    index === 0 ? "rounded-l" : ""
                  } ${index === months.length - 1 ? "rounded-r" : ""}`}
                >
                  {monthName}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmissionsHeader;
