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
import { countryname } from "../../../data/countryname";
import { Oval } from "react-loader-spinner";

const Screenseven = ({
  prevStep,
  activeSteps,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
}) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [entitylocated, setEntitylocated] = useState("");
  const [territorylocated, setTerritorylocated] = useState("");
  const [loopen, setLoOpen] = useState(false);

  const canadian = [
    { code: "spoo", name: "Select province" },
    { code: "AB", name: "Alberta" },
    { code: "BC", name: "British Columbia" },
    { code: "MB", name: "Manitoba" },
    { code: "NB", name: "New Brunswick" },
    { code: "NL", name: "Newfoundland and Labrador" },
    { code: "NS", name: "Nova Scotia" },
    { code: "NT", name: "Northwest Territories" },
    { code: "NU", name: "Nunavut" },
    { code: "ON", name: "Ontario" },
    { code: "PE", name: "Prince Edward Island" },
    { code: "QC", name: "Québec" },
    { code: "SK", name: "Saskatchewan" },
    { code: "YT", name: "Yukon" },
  ];
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

  const fetchBillSseven = async () => {
    LoaderOpen();

    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canadabills211/identifying-information/?screen=7&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );
      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setEntitylocated(response.data.country_10);
        setTerritorylocated(response.data.province_or_territory_10_1);
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
        fetchBillSseven();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillSseven();
      }
    }
    setEntitylocated("");
    setTerritorylocated("");
  }, [selectedCorp, selectedOrg, year]);

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleEntitylocated = (event) => {
    setEntitylocated(event.target.value);
    if (event.target.value !== "Select country") {
      setError((prev) => ({ ...prev, entitylocated: "" }));
    }
  };
  const handleTerritorylocated = (event) => {
    setTerritorylocated(event.target.value);
    if (event.target.value !== "Select province") {
      setError((prev) => ({ ...prev, territorylocated: "" }));
    }
  };
  const submitForm = async () => {
    try {
      LoaderOpen();

      const sendData = {
        country_10: entitylocated,
        province_or_territory_10_1: territorylocated,
        organization_id: selectedOrg,
        corporate_id: selectedCorp ? selectedCorp : null,
        year: year,
      };
      const response = await axiosInstance.post(
        `${process.env.BACKEND_API_URL}/canadabills211/identifying-information/?screen=7`,
        sendData,
        axiosConfig
      );
      if (response.status == "200") {
        toast.success("Data Added  successfully", {
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

  const validateForm = () => {
    let newErrors = {};

    if (
      entitylocated === "" ||
      entitylocated === "Select country" ||
      entitylocated === null
    ) {
      newErrors.entitylocated = "Please select a country.";
    }

    if (entitylocated === "Canada") {
      if (
        territorylocated === "" ||
        territorylocated === "Select province" ||
        territorylocated === null
      ) {
        newErrors.territorylocated = "Please select a province or territory.";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setError({}); // Clear any existing errors
      await submitForm(); // Proceed with the form submission
    } else {
      setError(formErrors); // Update the state with the validation errors
    }
  };
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-0 mt-2">
        <form className="w-full text-left" onSubmit={handleSubmit}>
          <div>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-[14px] font-[500]  mb-2 ml-1"
                for="username"
              >
                11. For entities only: In which country is the entity
                headquartered or principally located? *
              </label>
              <div className="relative mb-1">
                <select
                  className={`${
                    open
                      ? "xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[98%]"
                      : "xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[98%]"
                  } rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  value={entitylocated}
                  onChange={handleEntitylocated}
                >
                  {/* <option value="default">Select country</option> */}
                  {countryname.map((option) => (
                    <option value={option.name}>{option.name}</option>
                  ))}
                </select>
              </div>
              {error.entitylocated && (
                <p className="text-red-500 ml-1 text-[12px]">
                  {error.entitylocated}
                </p>
              )}
            </div>
            {entitylocated === "Canada" && (
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                  for="username"
                >
                  11.1 If in Canada: In which province or territory is the
                  entity headquartered or principally located?*
                </label>
                <div className="relative mb-1">
                  <select
                    className={`${
                      open
                        ? "xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[98%]"
                        : "xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[98%]"
                    } rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    value={territorylocated}
                    onChange={handleTerritorylocated}
                  >
                    {canadian.map((option) => (
                      <option value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
                {error.territorylocated && (
                  <p className="text-red-500 ml-1 text-[12px]">
                    {error.territorylocated}
                  </p>
                )}
              </div>
            )}

            <div className="xl:w-[79%] lg:w-[79%] 2xl:w-[79%] md:w-[79%] 2k:w-[79%] 4k:w-[79%]  w-full mb-5">
              <div className="float-right mr-3">
                <button
                  className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
                  onClick={prevStep}
                >
                  &lt; Previous
                </button>
                <button
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
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
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

export default Screenseven;
