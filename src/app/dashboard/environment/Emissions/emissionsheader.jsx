"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { yearInfo } from "@/app/shared/data/yearInfo";
import axiosInstance from "@/app/utils/axiosMiddleware";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const EmissionsHeader = ({ activeMonth, setActiveMonth }) => {
  const [locations, setLocations] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get('/sustainapp/get_location');
        setLocations(response);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <>
      <div className="ml-2 mb-5">
        <div className="flex mb-5 gap-4">
          <div className="">
            <select
              className={`border m-0.5 text-sm text-neutral-500 appearance-none pr-24 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 `}
            >
              {" "}
              <option value="location1">Select location</option>
            </select>
            {/* <div className='absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none'>
              <MdKeyboardArrowDown
                className='text-neutral-500'
                style={{ fontSize: '16px' }}
              />
            </div> */}
          </div>
          <div className="ml-3 ">
            <select
              className={`border m-0.5 text-sm text-neutral-500 appearance-none pr-32 rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 `}
            >
              {" "}
              <option value="location1">Select year</option>
              {yearInfo.map((item) => (
                <option value={item.slice(0, 4)}>{item.slice(0, 4)}</option>
              ))}
            </select>
            {/* <div className='absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none'>
              <MdKeyboardArrowDown
                className='text-neutral-500'
                style={{ fontSize: '16px' }}
              />
            </div> */}
          </div>
          <div className=" w-full flex items-center justify-end">
            <div className=" float-end">
              <p className="text-[12px]">
                GHG Emissions for the month ={" "}
                <span className="text-[#6adf23]">0 tCO2e</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex  bg-[#f7f7f7] py-1 rounded-lg">
            {months.map((month, index) => (
              <button
                key={index}
                className={`text-[12px] border-r mx-1 ${
                  activeMonth === month ? "bg-white shadow-md rounded-lg" : ""
                }`}
                onClick={() => setActiveMonth(month)}
              >
                <p
                  className={`text-center ${
                    activeMonth === month
                      ? "custom-gradient-text"
                      : "text-[#A1A1A1]"
                  } hover:bg-[#f7f7f7]  py-1 w-[55px] ${
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
