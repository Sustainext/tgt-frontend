"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { yearInfo, months } from "@/app/shared/data/yearInfo";
import axiosInstance from "@/app/utils/axiosMiddleware";

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

const EnvironmentHeader3 = ({
  activeMonth,
  setActiveMonth,
  location,
  setLocation,
  year,
  setYear,
  locationMessage,
  setLocationMessage,
  yearMessage,
  setYearMessage,
}) => {
  const [formState, setFormState] = useState({
    location: location,
    year: year,
    month: activeMonth,
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
    setLocationMessage();
    setYearMessage();
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "month") {
      setActiveMonth(monthMapping[value]);
    } else if (name === "location") {
      setLocation(Number(value));
    } else if (name === "year") {
      setYear(value);
    }
  };

  useEffect(() => {
    setFormState({
      location: location,
      year: year,
      month: activeMonth,
    });
  }, [location, year, activeMonth]);

  return (
    <>
      <div className="ml-2 mb-5">
      <div className="block mb-5 xl:flex md:flex lg:flex 2xl:flex 4k:flex">
          <div>
            <div className="relative mb-2 md:mb-0 xl:mb-0 lg:mb-0 2xl:mb-0 4k:mb-0">
              <select
                name="location"
                className="border m-0.5 text-[12px] pr-7 text-neutral-500 appearance-none xl:w-[240px] lg:w-[240px] md:w-[240px] 2xl:w-[240px] 4k:w-[240px] w-[98%] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={formState.location}
                onChange={handleChange}
              >
                <option value="">Select location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location.id} name={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                <MdKeyboardArrowDown
                  className="text-neutral-500"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
            <div>
              {locationMessage && (
                <p className="text-[#007EEF] text-[12px] top=16  left-0 pl-2 mt-1">
                  {locationMessage}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="xl:ml-3 md:ml-3 lg:ml-3 2xl:ml-3 4k:ml-3 ml-0 relative mb-2 md:mb-0 xl:mb-0 lg:mb-0 2xl:mb-0 4k:mb-0">
              <select
                name="year"
                className="border m-0.5 text-[12px] text-neutral-500 appearance-none xl:w-[240px] lg:w-[240px] md:w-[240px] 2xl:w-[240px] 4k:w-[240px] w-[98%] rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={formState.year}
                onChange={handleChange}
              >
                <option value="">Select year</option>
                {yearInfo.map((item) => (
                  <option value={item.slice(0, 4)} key={item}>
                    {item.slice(0, 4)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                <MdKeyboardArrowDown
                  className="text-neutral-500"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
            <div>
              {yearMessage && (
                <p className="text-[#007EEF] text-[12px] top=16  left-0 pl-2 mt-1 ml-3">
                  {yearMessage}
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default EnvironmentHeader3;
