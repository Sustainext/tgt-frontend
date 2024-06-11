'use client';
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { yearInfo, months } from "@/app/shared/data/yearInfo";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { useEmissions } from './EmissionsContext';

const monthMapping = {
  "Jan": 1,
  "Feb": 2,
  "Mar": 3,
  "Apr": 4,
  "May": 5,
  "Jun": 6,
  "Jul": 7,
  "Aug": 8,
  "Sep": 9,
  "Oct": 10,
  "Nov": 11,
  "Dec": 12
};

const getMonthString = (monthNumber) => {
  return Object.keys(monthMapping).find(key => monthMapping[key] === monthNumber);
};

const EmissionsHeader = ({ activeMonth, setActiveMonth, location, setLocation, year, setYear }) => {
  const [formState, setFormState] = useState({
    location: location,
    year: year,
    month: activeMonth,
  });

  const { climatiqData } = useEmissions();


  const [locations, setLocations] = useState([]);
  const [localClimatiq, setlocalClimatiq] = useState(0)
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

  useEffect(()=>{

    console.log('Got the climatiqData in header --- ')
    if (climatiqData?.result?.[0]) {
      let sum = 0
      for (const item of climatiqData.result) {
        // Access a particular property of each item and do something with it
        sum = sum + item.co2e 
        // Add your logic here
      }
      setlocalClimatiq(sum)

    }
    
  },[climatiqData])

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "month") {
      setActiveMonth(monthMapping[value]);
    } else if (name === "location") {
      setLocation(value);
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
        <div className="flex mb-5 gap-4">
          <div className="relative">
            <select
              name="location"
              className="border m-0.5 text-sm text-neutral-500 appearance-none pr-24 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={formState.location}
              onChange={handleChange}
            >
              <option value="">Select location</option>
              {locations.map((location, index) => (
                <option key={index} value={location.name}>
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
          <div className="ml-3 relative">
            <select
              name="year"
              className="border m-0.5 text-sm text-neutral-500 appearance-none pr-32 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          <div className="w-full flex items-center justify-end">
            <div className="float-end">
              <p className="text-[12px]">
                GHG Emissions for the month ={" "}
                <span className="text-[#6adf23]">{localClimatiq} - kg - tCO2e </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex bg-[#f7f7f7] py-1 rounded-lg">
            {months.map((month, index) => (
              <button
                key={index}
                className={`text-[12px] border-r mx-1 ${
                  formState.month === monthMapping[month] ? "bg-white shadow-md rounded-lg" : ""
                }`}
                onClick={() => handleChange({ target: { name: "month", value: month } })}
              >
                <p
                  className={`text-center ${
                    formState.month === monthMapping[month]
                      ? "custom-gradient-text"
                      : "text-[#A1A1A1]"
                  } hover:bg-[#f7f7f7] py-1 w-[55px] ${
                    index === 0 ? "rounded-l" : ""
                  } ${index === months.length - 1 ? "rounded-r" : ""}`}
                >
                  {month}
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
