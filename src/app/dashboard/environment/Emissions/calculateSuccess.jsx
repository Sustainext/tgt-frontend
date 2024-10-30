"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Tick from "@/app/shared/assets/tick.svg";
import Error from "@/app/shared/assets/error.svg";
import { Oval } from "react-loader-spinner";
import { getLocationName } from "@/app/utils/locationName";

const CalculateSuccess = ({ onClose, data }) => {
  const [showErrorUi, setShowErrorUi] = useState(false);
  const [locationName, setLocationName] = useState("");
  const climatiqData = useSelector((state) => state.emissions.climatiqData);
  const updateScopeStatus = useSelector(
    (state) => state.emissions.updateScopeStatus
  );

  useEffect(() => {
    const fetchLocationName = async () => {
      if (data?.location) {
        try {
          const name = await getLocationName(data.location);
          setLocationName(name);
        } catch (error) {
          console.error("Error fetching location name:", error);
          setLocationName(data.location);
        }
      }
    };

    fetchLocationName();
  }, [data?.locationname]);

  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (climatiqData.status === "failed" || updateScopeStatus === "failed") {
        setShowErrorUi(true);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [climatiqData.status]);

  if (climatiqData.status === "loading") {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Oval
          height={50}
          width={50}
          color="#00BFFF"
          secondaryColor="#f3f3f3"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (
    updateScopeStatus === "failed" &&
    showErrorUi &&
    data.message !== "Emission has been created"
  ) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="w-[502px] h-[280px] pl-[65px] pr-[43px] py-[30px] bg-white rounded-lg shadow justify-end items-center inline-flex">
          <div className="w-[394px] h-[220px] relative">
            <div className="w-[394px] h-[146px] left-0 top-0 absolute">
              <Image
                src={Error}
                alt="Error"
                className="w-20 h-20 left-[147px] top-0 absolute"
                width={80}
                height={80}
              />
              <div className="w-[394px] h-[50px] left-0 top-[80px] absolute">
                <div className="left-[30px] top-0 absolute text-neutral-500 text-[22px] font-bold font-['Manrope'] leading-relaxed">
                  Oops, something went wrong
                </div>
                <div className="left-0 top-[34px] absolute text-neutral-400 text-[13px] font-normal font-['Manrope'] leading-none">
                  We are unable to calculate results at the moment. Please try
                  again
                </div>
              </div>
            </div>
            <div className="w-[114px] h-[42px] px-[11px] py-2 left-[129px] top-[178px] absolute rounded flex-col justify-center items-center inline-flex">
              <button
                onClick={onClose}
                className="text-sky-500 text-[15px] font-medium font-['Roboto'] uppercase leading-relaxed tracking-wide cursor-pointer"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (
    updateScopeStatus === "succeeded" &&
    climatiqData.totalScore !== undefined &&
    data.message === "Emission has been created"
  ) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="w-[502px] h-[387.50px] relative bg-white rounded-lg shadow">
          <div className="h-[31px] left-[158px] top-[27px] absolute justify-center items-center gap-2 inline-flex">
            <div className="gradient-text-green text-opacity-20 text-[22px] font-bold font-['Manrope'] leading-relaxed w-full">
              Calculated Result
            </div>
          </div>
          <div className="success">
            <Image
              src={Tick}
              alt="Success"
              className="h-14 absolute top-20 left-[45%]"
              width={56}
              height={56}
            />
            <div className="w-[415px] h-[158px] pl-4 pr-[37.10px] py-4 left-[46px] top-[174px] absolute bg-gray-100 rounded-lg shadow flex-col justify-center items-center gap-3 inline-flex">
              <div className="w-[359px]">
                <span className="text-sky-700 text-[15px] font-normal font-['Manrope'] leading-normal">
                  Location={" "}
                </span>
                <span className="text-sky-500 text-[15px] font-bold font-['Manrope'] leading-normal">
                  {locationName}
                </span>
              </div>
              <div className="w-[359px]">
                <span className="text-sky-700 text-[15px] font-normal font-['Manrope'] leading-normal">
                  Month ={" "}
                </span>
                <span className="text-sky-500 text-[15px] font-bold font-['Manrope'] leading-normal">
                  {getMonthName(data.month)}
                </span>
              </div>
              <div className="w-[359px]">
                <span className="text-sky-700 text-[15px] font-normal font-['Manrope'] leading-normal">
                  GHG Emissions for the month =
                </span>
                <span className="text-sky-500 text-[15px] font-normal font-['Manrope'] leading-normal">
                  {" "}
                </span>
                <span className="text-green-400 text-[15px] font-bold font-['Manrope'] leading-normal">
                  {climatiqData.totalScore} tCO<sub>2</sub>e
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2" onClick={onClose}>
              x
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CalculateSuccess;
