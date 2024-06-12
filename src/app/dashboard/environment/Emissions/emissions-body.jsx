'use client';
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance, { post } from "@/app/utils/axiosMiddleware";
import { useEmissions } from './EmissionsContext';

import Scope1 from "./scope1";
import Scope2 from "./scope2";
import Scope3 from "./scope3";

const AccordionItem = ({
  title,
  children,
  scops,
  icons,
  tooltiptext,
  sdg,
  visible,
  open,
  onAccordionClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    const canExpand = onAccordionClick();
    if (canExpand) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`shadow-md py-1  mb-4 rounded-[8px] cursor-pointer border border-b-3 border-neutral-200 ${
        open ? "w-[100%]" : "w-[100%]"
      }`}
    >
      <button
        className="py-3  w-[100%]  text-left flex"
        onClick={handleAccordionClick}
      >
        <div className="flex items-center px-3 w-[30%] ">
          <h5 className="text-[18px]">{icons}</h5>{" "}
          <h5 className="text-[12px]  text-[#344054] pt-1 px-3 font-semibold">
            {scops}
          </h5>
        </div>
        <div className="w-[40%]">
          <h5 className="text-[12px]  text-[#344054] pt-1 px-3 font-semibold text-center">
            {title}
          </h5>
        </div>

        <div className="w-[30%] ">
          <div className="float-end">
            <span>
              <MdKeyboardArrowDown
                className={`text-2xl ${isOpen && "rotate-i80"}`}
              />
            </span>
          </div>
        </div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

const Emissionsnbody = ({ location, year, month, countryCode, locationError, setLocationError }) => {

  const { setClimatiqData } = useEmissions();

  const getLatestComputedData = () => {
    console.log('Climatiq is success !!!! -----------****************')
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-climatiq-score?`;
    const url = `${base_url}location=${location}&&year=${year}&&month=${month}`;
    console.log(url, "is the url to be fired from getLatestComputedData");

    // Make the GET request
    axiosInstance
      .get(url)
      .then((response) => {
        // Handle successful response
        console.log(response.data, " is the response data");
        console.log(' This is the climatiq computed result')
        setClimatiqData(response.data)
        if (response.status === 200) {
          toast.success("Computed Emissions Total Score!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Combined computation failed for Emissions!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }

        // setFormData(response.data.form[0].form_data)
      })
      .catch((error) => {

        console.log(error, ' -got error')
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Oops, something went wrong";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }

  const handleAccordionClick = () => {
    if (!location) {
      setLocationError("Please select a location");
      return false;
    }
    setLocationError("");
    return true;
  };

  return (
    <>
      <div className="mx-3">
        <AccordionItem
          title="Direct emission from operations"
          scops="Scope 1"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
        >
          <Scope1 location={location} year={year} month={month} countryCode={countryCode} successCallback={getLatestComputedData} />
        </AccordionItem>

        <AccordionItem
          title="InDirect emission from operations"
          scops="Scope 2"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
        >
          <Scope2 location={location} year={year} month={month} countryCode={countryCode} successCallback={getLatestComputedData}/>
        </AccordionItem>

        <AccordionItem
          title="All other emissions (associated)"
          scops="Scope 3"
          icons={<IoHomeOutline />}
          onAccordionClick={handleAccordionClick}
        >
          <Scope3 location={location} year={year} month={month} countryCode={countryCode} successCallback={getLatestComputedData}/>
        </AccordionItem>
      </div>
      {/* <div className="flex justify-end items-center mt-[24] me-5">
        <button
          // onClick={handleCalculate}
          className="w-[172px] h-8 px-[22px] py-2 bg-sky-600 rounded shadow flex-col justify-center items-center inline-flex text-white text-xs font-bold leading-[15px]"
        >
          <div className="cursor-pointer">
            Calculate
          </div>
        </button>
      </div> */}
    </>
  );
};

export default Emissionsnbody;
