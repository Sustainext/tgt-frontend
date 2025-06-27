"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdOutlineModeEditOutline,
  MdClose,
  MdDeleteOutline,
} from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screensix = ({
  nextStep,
  prevStep,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
}) => {
  // State to track selected options
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [reportingentity, setReportingentit] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState("");
  const { open } = GlobalState();
  const [loopen, setLoOpen] = useState(false);
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();

  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetchBillSsix = async () => {
    LoaderOpen();

    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canadabills211/identifying-information/?screen=6&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );

      if (response.status === 200) {
        setReportingentit(response.data.sectors_or_industries_description_9);
        if (!response.data.sectors_or_industries_9) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.sectors_or_industries_9);
        }
        LoaderClose();
      } else {
        LoaderClose();
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      LoaderClose();
      console.error("API call failed:", error);
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      LoaderClose();
    }
  };
  useEffect(() => {
    // if (isMounted.current) {

    //   isMounted.current = false;
    // }
    // return () => {
    //   isMounted.current = false;
    // };
    if (reportType == "Organization") {
      if (selectedOrg && year) {
        fetchBillSsix();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillSsix();
      }
    }
    setReportingentit("");
    setSelectedOptions([]);
  }, [selectedCorp, selectedOrg, year]);

  const handleReportingentity = (event) => {
    setReportingentit(event.target.value);
    setError((prev) => ({ ...prev, reportingentity: "" }));
  };
  const optionsTwo = [
    {
      label: "Agriculture, forestry, fishing and hunting",
      value: "1",
    },
    {
      label:
        "Administrative and support, waste management and remediation services",
      value: "2",
    },
    {
      label: "Mining, quarrying, and oil and gas extraction",
      value: "3",
    },
    {
      label: "Utilities",
      value: "4",
    },
    { label: "Construction", value: "5" },
    { label: "Wholesale trade", value: "6" },
    { label: "Retail trade", value: "7" },
    {
      label: "Transportation and warehousing",
      value: "8",
    },
    {
      label: "Information and cultural industries",
      value: "9",
    },
    { label: "Finance and insurance", value: "10" },
    {
      label: "Real estate and rental and leasing",
      value: "11",
    },
    {
      label: "Professional, scientific and technical services",
      value: "12",
    },
    {
      label: "Management of companies and enterprises",
      value: "13",
    },

    { label: "Educational services", value: "14" },
    {
      label: "Health care and social assistance",
      value: "15",
    },
    {
      label: "Arts, entertainment and recreation",
      value: "16",
    },
    {
      label: "Accommodation and food services",
      value: "17",
    },
    {
      label: "Other services (except public administration)",
      value: "18",
    },
    { label: "Public administration", value: "19" },
    { label: "Other, please specify:", value: "other" },
    // Add the rest of your options here
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const newSelectedOptions = event.target.checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);

    setSelectedOptions(newSelectedOptions);

    // Optionally clear the error for checkboxes when at least one option is selected
    if (newSelectedOptions.length > 0 && error.checkboxes) {
      setError((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.checkboxes;
        return newErrors;
      });
    }
  };

  // Function to proceed to the next step, includes validation
  const continueToNextStep = () => {
    let newErrors = {};

    if (selectedOptions.length === 0) {
      newErrors.checkboxes = "Please select at least one option.";
    }
    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      if (!reportingentity) {
        // Check if reportingentity is not filled out
        newErrors.reportingentity = "Please enter a description";
      }
    }

    if (Object.keys(newErrors).length === 0) {
      setError({});
      submitForm();
    } else {
      setError(newErrors);
    }
  };

  const submitForm = async () => {
    let snewentities;
    if (selectedOptions.includes("other")) {
      snewentities = reportingentity;
    } else {
      snewentities = null;
    }

    try {
      LoaderOpen();

      const sendData = {
        sectors_or_industries_9: selectedOptions,
        sectors_or_industries_description_9: snewentities,
        organization_id: selectedOrg,
        corporate_id: selectedCorp ? selectedCorp : null,
        year: year,
      };
      const response = await axiosInstance.post(
        `${process.env.BACKEND_API_URL}/canadabills211/identifying-information/?screen=6`,
        sendData,
        axiosConfig
      );
      if (response.status == "200") {
        toast.success("Data added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        nextStep();
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    } catch (error) {
      LoaderClose();
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="mt-2">
        <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-2">
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2"
              htmlFor="industryCheckbox"
            >
              9. For entities only: Which of the following sectors or industries
              does the entity operate in? Select all that apply *
            </label>
          </div>
          <div className="mb-2">
            <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 4k:grid-cols-2 2k:grid-cols-2  md:grid-cols-2 gap-1">
              {optionsTwo.map((option, index) => (
                <div key={index} className="flex items-center">
                  <label className="ml-2 text-[14px] text-gray-600">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={handleCheckboxChange}
                      className="mr-3 pt-1 cursor-pointer green-checkbox-small"
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {error.checkboxes && (
              <div className="text-red-500 ml-1 text-[12px]">
                {error.checkboxes}
              </div>
            )}
          </div>
          <div className="mb-5">
            {selectedOptions.includes("other") && (
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter a description..."
                  className={`${
                    open ? "xl:w-[80%] lg:w-[80%] 2xl:w-[80%] md:w-[80%] 2k:w-[80%] 4k:w-[80%] w-[98%]" : "xl:w-[80%] lg:w-[80%] 2xl:w-[80%] md:w-[80%] 2k:w-[80%] 4k:w-[80%] w-[98%]"
                  } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                  value={reportingentity}
                  onChange={handleReportingentity}
                ></input>
                {error.reportingentity && (
                  <div className="text-red-500 ml-1 text-[12px]">
                    {error.reportingentity}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="xl:w-[83%] lg:w-[83%] 2xl:w-[83%] md:w-[83%] 2k:w-[83%] 4k:w-[83%]  w-full mb-5">
          <div className="float-right mr-3">
            <button
              className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
              onClick={prevStep}
            >
              &lt; Previous
            </button>

            <button
              type="button"
              onClick={continueToNextStep}
              disabled={!(selectedOrg && year)}
              className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${
                reportType == "Organization"
                  ? !(selectedOrg && year)
                    ? "opacity-30 cursor-not-allowed"
                    : ""
                  : !(selectedOrg && year && selectedCorp)
                  ? "opacity-30 cursor-not-allowed"
                  : ""
              }`}
            >
              {" "}
              Next &gt;
            </button>
          </div>
        </div>
      </div>
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  );
};

export default Screensix;
