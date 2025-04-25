"use client";

import { FaArrowLeft } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import industryList from "../../../../shared/data/sectors";
import { Country, State, City } from "country-state-city";
// import moment from 'moment-timezone';
import { timeZones } from "../../../../shared/data/timezones";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { useRouter } from "next/navigation";
import { Currency } from "../../../../shared/data/currency";
import SearchableCityDropdown from "../SearchableCityDropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const dateFormatOptions = [
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
  { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
];

const reportFramework = ["GRI"];

const initialState = {
  generalDetails: {
    name: "",
    email: "",
    phone: "",
    website: "",
    type: "",
    ownership: "",
    location: "",
    Empcount: "",
    revenue: "",
    mobile: "",
    fax: "",
    sector: "",
    subIndustry: "",
    organisation: "",
    dateFormat: "",
    currency: "",
    timeZone: "",
    language: "",
  },

  addressInformation: {
    country: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
  },

  reportingPeriodInformation: {
    fromDate: "",
    toDate: "",
    reportingFramework: "",
  },
};

const GeneralInfo = ({ handleGeneralDetailsSubmit, heading, editData }) => {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (editData) {
      const selectedCountryCode = editData.filteredData[0]?.country || "";
      const selectedStateCode = editData.filteredData[0]?.state || "";

      const statesOfSelectedCountry =
        State.getStatesOfCountry(selectedCountryCode) || [];
      const citiesOfSelectedState =
        City.getCitiesOfState(selectedCountryCode, selectedStateCode) || [];

      const selectedIndustryValue = editData.filteredData[0]?.sector || "";

      const selectedIndustryData =
        industryList.find(
          (industry) => industry.industry === selectedIndustryValue
        ) || {};
      const subIndustriesForSelectedIndustry =
        selectedIndustryData?.subIndustries || [];

      setSelectedTimeZone(editData.filteredData[0]?.timezone || "");

      const frameworkNumbers = editData.filteredData[0]?.framework || [];
      // const selectedFrameworks = Array.isArray(frameworkNumbers)
      //   ? frameworkNumbers.map(num => frameworkMapping[num])
      //   : [frameworkMapping[frameworkNumbers]];

      if (
        editData.type === "Corporate Entity" ||
        editData.type === "organization"
      ) {
        setFormData({
          generalDetails: {
            name: editData.filteredData[0]?.name || "",
            email: editData.filteredData[0]?.email || "",
            phone:
              editData.filteredData[0]?.phone == "9999999999"
                ? ""
                : editData.filteredData[0]?.phone || "",
            website:
              editData.filteredData[0]?.website == "Not Provided"
                ? ""
                : editData.filteredData[0]?.website || "",
            type:
              editData.filteredData[0]?.type_corporate_entity == "Not Specified"
                ? ""
                : editData.filteredData[0]?.type_corporate_entity ||
                  editData.filteredData[0]?.corporatetype == "Not Specified"
                ? ""
                : editData.filteredData[0]?.corporatetype || "",
            ownership: editData.filteredData[0]?.owner || "",
            location:
              editData.filteredData[0]?.location_of_headquarters ==
              "Not Specified"
                ? ""
                : editData.filteredData[0]?.location_of_headquarters || "",
            Empcount: editData.filteredData[0]?.employeecount || "",
            revenue: editData.filteredData[0]?.revenue || "",
            mobile: editData.filteredData[0]?.mobile || "",
            fax: editData.filteredData[0]?.fax || "",
            sector:
              editData.filteredData[0]?.sector == "General"
                ? ""
                : editData.filteredData[0]?.sector || "",
            subIndustry:
              editData.filteredData[0]?.subindustry == "General"
                ? ""
                : editData.filteredData[0]?.subindustry || "",
            organisation: editData.filteredData[0]?.organisation || "",
            dateFormat: editData.filteredData[0]?.date_format || "",
            currency: editData.filteredData[0]?.currency || "",
            timeZone: editData.filteredData[0]?.timezone || "",
          },
          addressInformation: {
            country:
              editData.filteredData[0]?.country == "N/A"
                ? ""
                : editData.filteredData[0]?.country || "",
            state:
              editData.filteredData[0]?.state == "N/A"
                ? ""
                : editData.filteredData[0]?.state || "",
            city:
              editData.filteredData[0]?.city == "N/A"
                ? ""
                : editData.filteredData[0]?.city || "",
            street:
              editData.filteredData[0]?.street == "Not Provided"
                ? ""
                : editData.filteredData[0]?.street || "",
            zipCode: editData.filteredData[0]?.zipCode || "",
          },
          reportingPeriodInformation: {
            fromDate: editData.filteredData[0]?.from_date || "",
            toDate: editData.filteredData[0]?.to_date || "",
            reportingFramework: editData.filteredData[0]?.framework || "",
          },
        });
      } else if (editData.type === "Location") {
        setFormData({
          generalDetails: {
            name: editData.filteredData[0]?.name || "",
            email: editData.filteredData[0]?.email || "",
            phone: editData.filteredData[0]?.phone || "",
            website: editData.filteredData[0]?.website || "",
            type: editData.filteredData[0]?.corporatetype || "",
            ownership: editData.filteredData[0]?.ownership || "",
            location: editData.filteredData[0]?.location_headquarters || "",
            Empcount: editData.filteredData[0]?.employeecount || "",
            revenue: editData.filteredData[0]?.revenue || "",
            mobile: editData.filteredData[0]?.mobile || "",
            fax: editData.filteredData[0]?.fax || "",
            sector: editData.filteredData[0]?.sector || "",
            subIndustry: editData.filteredData[0]?.subindustry || "",
            organisation: editData.filteredData[0]?.organisation || "",
            dateFormat: editData.filteredData[0]?.date_format || "",
            currency: editData.filteredData[0]?.currency || "",
            timeZone: editData.filteredData[0]?.timezone || "",
          },
          addressInformation: {
            country: editData.filteredData[0]?.country || "",
            state: editData.filteredData[0]?.state || "",
            city: editData.filteredData[0]?.city || "",
            street: editData.filteredData[0]?.address || "",
            zipCode: editData.filteredData[0]?.zipCode || "",
          },
          reportingPeriodInformation: {
            fromDate: editData.filteredData[0]?.from_date || "",
            toDate: editData.filteredData[0]?.to_date || "",
            reportingFramework: editData.filteredData[0]?.framework || "",
          },
        });
      }

      setStates(statesOfSelectedCountry);
      setCities(citiesOfSelectedState);
      setSelectedCountry(selectedCountryCode);
      setSelectedState(selectedStateCode);
      setSelectedCity(editData.filteredData[0]?.city || "");

      setSelectedIndustry(selectedIndustryValue);
      setSubIndustries(subIndustriesForSelectedIndustry);

      // setSelectedFrameworks(selectedFrameworks);
    }
  }, [editData]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [subIndustries, setSubIndustries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(``);
  const [selectedState, setSelectedState] = useState(``);
  const [selectedCity, setSelectedCity] = useState("");
  const [newselectedCountry, setnewSelectedCountry] = useState(``);
  const [newselectedState, setnewSelectedState] = useState(``);

  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  // console.log(formData,'formData');
  // console.log(selectedCity,"selectedCountry test");
  const loadFormData = async () => {
    const url = `${process.env.BACKEND_API_URL}/geo_data/countries/`;
    try {
      const response = await axiosInstance.get(url);
      setCountries(response.data);
      console.log("API call data", response.data);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
    }
  };
  useEffect(() => {
    // const allCountries = Country.getAllCountries();
    // setCountries(allCountries);
    loadFormData();
  }, []);

  const validateForm = () => {
    const errors = {};

    // General Details validation
    if (!formData.generalDetails.name) errors.name = "Legal Name is required";
    if (!formData.generalDetails.type)
      errors.type = "Type of Incorporation is required";
    if (!formData.generalDetails.location)
      errors.location = "Location of Headquarters is required";
    if (!formData.generalDetails.phone) errors.phone = "Phone is required";
    if (!formData.generalDetails.website)
      errors.website = "Website is required";
    if (!formData.generalDetails.Empcount)
      errors.Empcount = "Employee Count is required";
    if (!formData.generalDetails.revenue)
      errors.revenue = "Revenue is required";
    if (!formData.generalDetails.sector) errors.sector = "Sector is required";
    if (!formData.generalDetails.subIndustry)
      errors.subIndustry = "Sub Industry is required";
    if (!formData.generalDetails.currency)
      errors.currency = "Currency is required";
    if (heading === "Corporate Entity Details") {
      if (!formData.generalDetails.organisation && !editData)
        errors.organisation = "Organisation is required";
    }

    // Address Information validation
    if (!formData.addressInformation.street)
      errors.street = "Street Address is required";
    if (!formData.addressInformation.country)
      errors.country = "Country is required";
    if (!formData.addressInformation.state) errors.state = "State is required";
    if (!formData.addressInformation.city) errors.city = "City is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSectorChange = (event) => {
    const selectedSector = event.target.value;
    setSelectedIndustry(selectedSector);
    const selectedIndustryObj = industryList.find(
      (industry) => industry.industry === selectedSector
    );
    const subIndustriesForSector = selectedIndustryObj?.subIndustries || [];
    setSubIndustries(subIndustriesForSector);
    setValidationErrors((prev) => ({
      ...prev,
      sector: "",
      subIndustry: "",
    }));
    handleGeneralDetailsChange(event);
    console.log("Sub Industries Found:", subIndustriesForSector);
  };

  const handleGeneralDetailsChange = (event) => {
    const { name, value } = event.target;
    if (name === "name" && value.includes("&")) {
      alert("The name field should not contain &");
      return;
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      generalDetails: {
        ...prevFormData.generalDetails,
        [name]: value,
      },
    }));
  };

  const handleAddressInformationChange = (event) => {
    const { name, value } = event.target;

    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormData((prevState) => ({
      ...prevState,
      addressInformation: {
        ...prevState.addressInformation,
        [name]: value,
      },
    }));
    if (name === "country") {
      handleCountryChange({ target: { value } });
    }
    if (name === "state") {
      handleStateChange({ target: { value } });
    }
    if (name === "city") {
      setSelectedCity(value);
    }
  };

  const handleReportingPeriodChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      reportingPeriodInformation: {
        ...prevState.reportingPeriodInformation,
        [name]: value,
      },
    }));
  };

  const handleCountryChange = async (event) => {
    const [countryId, countryShortname] = event.target.value.split(":"); // Split the value by ":"
    setSelectedCountry(countryId); // Store the country ID
    const newsortname = countryShortname;
    setnewSelectedCountry(event.target.value);

    try {
      // Fetch states based on the selected country ID
      const response = await axiosInstance.get(
        `/geo_data/states/?country_id=${countryId}`
      );
      setStates(response.data || []); // Set the fetched states into the state variable
      console.log("Fetched states:", response.data);
    } catch (error) {
      console.error("Failed to fetch states:", error);
      setStates([]); // Reset states in case of an error
    }

    // Update form data to reflect the selected country, and reset state and city selections
    setFormData((prevState) => ({
      ...prevState,
      addressInformation: {
        ...prevState.addressInformation,
        country: newsortname, // Set the selected country ID in the form data
        state: "", // Clear state selection
        city: "", // Clear city selection
      },
    }));

    setCities([]); // Reset cities
    setSelectedState(""); // Reset selected state
    setSelectedCity(""); // Reset selected city
  };

  const handleStateChange = async (event) => {
    const [stateId, statename] = event.target.value.split(":"); // Split the value by ":"
    setSelectedState(stateId); // Store the country ID
    const newstatename = statename;
    setnewSelectedState(event.target.value);
    // const stateId = event.target.value;
    // setSelectedState(stateId);

    try {
      const response = await axiosInstance.get(
        `/geo_data/cities/?state_id=${stateId}`
      );
      setCities(response.data || []);
      console.log("api to fetch cities:", response.data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      setCities([]);
    }

    setFormData((prevState) => ({
      ...prevState,
      addressInformation: {
        ...prevState.addressInformation,
        state: newstatename,
        city: "",
      },
    }));

    setSelectedCity("");
  };

  const handleTimezoneChange = (event) => {
    const value = event.target.value;
    setSelectedTimeZone(value);
    setValidationErrors((prev) => ({
      ...prev,
      timeZone: "",
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      generalDetails: {
        ...prevFormData.generalDetails,
        timeZone: value,
      },
    }));
  };

  const [organisations, setOrganisations] = useState([]);
  const isMounted = useRef(true);

  const fetchData = async () => {
    if (heading === "Corporate Entity Details") {
      try {
        const response = await axiosInstance.get("/orggetonly");
        setOrganisations(response.data);
      } catch (e) {
        console.log("failed fetching organization", e);
      }
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchData();
      isMounted.current = false;
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleAddCity = async (cityName) => {
    try {
      // API request to create a new city
      const response = await axiosInstance.post("geo_data/cities/create/", {
        city_name: cityName,
        state: selectedState,
      });

      // Assuming the response contains the newly created city object
      const newCity = response.data;

      // Add the newly created city to the state
      setCities((prevCities) => [...prevCities, newCity]);

      // Show a success toast message
      toast.success("City added successfully!");

      // Return the newly added city (optional)
      return newCity;
    } catch (error) {
      console.error("Error adding city:", error);
      // Show an error toast message
      toast.error("Failed to add city. Please try again.");
      // Handle error accordingly
      throw new Error("Failed to add city");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center drop-shadow-lg border-b-2 py-6 w-full">
        <h2 className="self-stretch text-black text-opacity-90 text-[22px] font-normal leading-relaxed flex space-x-8 items-center">
          <button onClick={() => router.back()}>
            <FaArrowLeft />
          </button>
          <span>{heading}</span>
        </h2>

        <div className="w-[73px] h-[31px] px-[22px] py-2 bg-sky-600 rounded shadow flex-col justify-center items-center inline-flex me-8">
          <button
            className="text-white text-xs font-bold leading-[15px] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) {
                editData
                  ? handleGeneralDetailsSubmit(
                      e,
                      formData,
                      editData.filteredData[0].id
                    )
                  : handleGeneralDetailsSubmit(e, formData);
              }
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="space-y-4 bg-white py-4 mx-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="hidden xl:block"></div>
          <div className="hidden xl:block"></div>
          <div>
            {heading === "Corporate Entity Details" && (
              <div className="space-y-3">
                <label
                  htmlFor="organisation"
                  className="text-neutral-800 text-[13px] font-normal"
                >
                  Organisation <span className="text-red-500">*</span>
                </label>
                <select
                  name="organisation"
                  value={formData.generalDetails.organisation}
                  onChange={handleGeneralDetailsChange}
                  className={`border ${
                    validationErrors.organisation
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
                >
                  <option value="">Select Organisation</option>
                  {organisations?.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
                {validationErrors.organisation && (
                  <p className="text-red-500 text-xs">
                    {validationErrors.organisation}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
          General Information
        </h3>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 4k:grid-cols-3 2k:grid-cols-3 2xl:grid-cols-3 gap-5 mb-4">
          {/* Legal Name */}
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="text-neutral-800 text-[13px] font-normal"
            >
              Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Legal Name"
              value={formData.generalDetails.name}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.name ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            />
            {validationErrors.name && (
              <p className="text-red-500 text-xs">{validationErrors.name}</p>
            )}
          </div>

          <div className="hidden xl:block"></div>
          <div className="hidden xl:block w-full"> </div>

          {/* Type of Incorporation */}
          <div className="space-y-3">
            <label
              htmlFor="type"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Type of Incorporation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="type"
              placeholder="Enter type of Incorporation"
              value={formData.generalDetails.type}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.type ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            />
            {validationErrors.type && (
              <p className="text-red-500 text-xs">{validationErrors.type}</p>
            )}
          </div>

          {/* Ownership */}
          <div className="space-y-3">
            <label
              htmlFor="ownership"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Ownership
            </label>
            <input
              type="text"
              name="ownership"
              value={formData.generalDetails.ownership}
              onChange={handleGeneralDetailsChange}
              className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
            />
          </div>

          {/* Location of Headquarters */}
          <div className="space-y-3">
            <label
              htmlFor="location"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Location Of HeadQuarters <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter Location Of HeadQuarters"
              value={formData.generalDetails.location}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.location ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            />
            {validationErrors.location && (
              <p className="text-red-500 text-xs">
                {validationErrors.location}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <label
              htmlFor="phone"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.generalDetails.phone}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            />
            {validationErrors.phone && (
              <p className="text-red-500 text-xs">{validationErrors.phone}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="space-y-3">
            <label
              htmlFor="mobile"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Mobile
            </label>
            <input
              type="number"
              name="mobile"
              value={formData.generalDetails.mobile}
              onChange={handleGeneralDetailsChange}
              className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
            />
          </div>

          {/* Website */}
          <div className="space-y-3">
            <label
              htmlFor="website"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Website <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="website"
              placeholder="Enter Website URL"
              value={formData.generalDetails.website}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.website ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            />
            {validationErrors.website && (
              <p className="text-red-500 text-xs">{validationErrors.website}</p>
            )}
          </div>

          {/* Fax */}
          <div className="space-y-3">
            <label
              htmlFor="fax"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Fax
            </label>
            <input
              type="text"
              name="fax"
              value={formData.generalDetails.fax}
              onChange={handleGeneralDetailsChange}
              className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
            />
          </div>

          {/* Employee Count */}
          <div className="space-y-3">
            <label
              htmlFor="Empcount"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Employee Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="Empcount"
              placeholder="Enter Employee Count"
              value={formData.generalDetails.Empcount}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.Empcount ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            />
            {validationErrors.Empcount && (
              <p className="text-red-500 text-xs">
                {validationErrors.Empcount}
              </p>
            )}
          </div>

          {/* Revenue */}
          <div className="space-y-3">
            <label
              htmlFor="revenue"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Revenue <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="revenue"
              placeholder="Enter Revenue"
              value={formData.generalDetails.revenue}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.revenue ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            />
            {validationErrors.revenue && (
              <p className="text-red-500 text-xs">{validationErrors.revenue}</p>
            )}
          </div>

          {/* Sector */}
          <div className="space-y-3">
            <label
              htmlFor="sector"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Sector <span className="text-red-500">*</span>
            </label>
            <select
              name="sector"
              value={formData.generalDetails.sector}
              onChange={handleSectorChange}
              className={`border ${
                validationErrors.sector ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            >
              <option value="">Select Sector</option>
              {industryList.map((industry) => (
                <option key={industry.id} value={industry.value}>
                  {industry.industry}
                </option>
              ))}
            </select>
            {validationErrors.sector && (
              <p className="text-red-500 text-xs">{validationErrors.sector}</p>
            )}
          </div>

          {/* Sub Industry */}
          <div className="space-y-3">
            <label
              htmlFor="subIndustry"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Sub Industry <span className="text-red-500">*</span>
            </label>
            <select
              name="subIndustry"
              value={formData.generalDetails.subIndustry}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.subIndustry
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            >
              <option value="">Select Sub Industry</option>
              {subIndustries.map((subIndustry) => (
                <option key={subIndustry.id} value={subIndustry.value}>
                  {subIndustry.subIndustry}
                </option>
              ))}
            </select>
            {validationErrors.subIndustry && (
              <p className="text-red-500 text-xs">
                {validationErrors.subIndustry}
              </p>
            )}
          </div>
        </div>

        <div className="h-[0px] border border-gray-200  w-full !my-8 "></div>

        <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
          ADDRESS INFORMATION
        </h3>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 4k:grid-cols-3 2k:grid-cols-3 2xl:grid-cols-3 gap-5">
          {/* Street Address */}
          <div className="space-y-3">
            <label
              htmlFor="street"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="street"
              placeholder="Enter Street Address"
              value={formData.addressInformation.street}
              onChange={handleAddressInformationChange}
              className={`border ${
                validationErrors.street ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            />
            {validationErrors.street && (
              <p className="text-red-500 text-xs">{validationErrors.street}</p>
            )}
          </div>

          <div className="hidden xl:block"></div>
          <div className="hidden xl:block w-full"> </div>

          {/* Country */}
          <div className="space-y-3">
            <label
              htmlFor="country"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={newselectedCountry}
              onChange={handleAddressInformationChange}
              className={`border ${
                validationErrors.country ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option
                  key={country.id}
                  value={`${country.id}:${country.sortname}`}
                >
                  {country.country_name}
                </option>
              ))}
            </select>
            {validationErrors.country && (
              <p className="text-red-500 text-xs">{validationErrors.country}</p>
            )}
          </div>

          {/* State */}
          <div className="space-y-3">
            <label
              htmlFor="state"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={newselectedState}
              onChange={handleAddressInformationChange}
              className={`border ${
                validationErrors.state ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option
                  key={state.id}
                  value={`${state.id}:${state.state_name}`}
                >
                  {state.state_name}
                </option>
              ))}
            </select>
            {validationErrors.state && (
              <p className="text-red-500 text-xs">{validationErrors.state}</p>
            )}
          </div>

          {/* City */}
          <div className="space-y-3">
            <SearchableCityDropdown
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={(cityName) => {
                setSelectedCity(cityName);
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  addressInformation: {
                    ...prevFormData.addressInformation,
                    city: cityName,
                  },
                }));
                setValidationErrors((prev) => ({
                  ...prev,
                  city: "",
                }));
              }}
              onAddCity={handleAddCity} // ✅ from parent
              error={validationErrors.city}
            />
          </div>
        </div>

        <div className="h-[0px] border border-gray-200 !my-8 w-full"></div>

        <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
          LOCALE INFORMATION
        </h3>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 4k:grid-cols-3 2k:grid-cols-3 2xl:grid-cols-3 gap-5">
          {/* Date Format */}
          <div className="space-y-3">
            <label
              htmlFor="dateFormat"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Date Format
            </label>
            <select
              name="dateFormat"
              value={formData.generalDetails.dateFormat}
              onChange={handleGeneralDetailsChange}
              className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
            >
              <option value="">Select Date Format</option>
              {dateFormatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div className="space-y-3">
            <label
              htmlFor="currency"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Currency <span className="text-red-500">*</span>
            </label>
            <select
              name="currency"
              value={formData.generalDetails.currency}
              onChange={handleGeneralDetailsChange}
              className={`border ${
                validationErrors.currency ? "border-red-500" : "border-gray-300"
              } rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight`}
            >
              <option value="">Select Currency</option>
              {Currency.map((option) => (
                <option key={option.currency} value={option.currency}>
                  {option.currency}
                </option>
              ))}
            </select>
            {validationErrors.currency && (
              <p className="text-red-500 text-xs">
                {validationErrors.currency}
              </p>
            )}
          </div>
          <div className="hidden xl:block"></div>

          {/* Timezone */}
          <div className="space-y-3">
            <label
              htmlFor="timeZone"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              Timezone
            </label>
            <select
              name="timeZone"
              value={formData.generalDetails.timeZone || selectedTimeZone}
              onChange={handleTimezoneChange}
              className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
            >
              <option value="">Select Timezone</option>
              {timeZones.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-[0px] border border-gray-200 !my-8 w-full"></div>
        <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
          REPORTING PERIOD
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 4k:grid-cols-3 2k:grid-cols-3 2xl:grid-cols-3 gap-5">
          <div className="space-y-3">
            <label
              htmlFor="fromDate"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              value={formData.reportingPeriodInformation.fromDate}
              onChange={handleReportingPeriodChange}
              className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
            />
          </div>
          <div className="space-y-3">
            <label
              htmlFor="toDate"
              className="block text-neutral-800 text-[13px] font-normal"
            >
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              id="toDate"
              value={formData.reportingPeriodInformation.toDate}
              onChange={handleReportingPeriodChange}
              className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
            />
          </div>
          <div className="hidden xl:block"></div>
        </div>
        {/* <div className="space-y-3 mt-4">
            <label
              htmlFor="reportingFramework"
              className="block text-neutral-800 text-[13px] font-normal mb-3"
            >
              Reporting Framework
            </label>
            {reportFramework.map((framework) => (
              <label
                key={framework}
                className="text-md font-semibold text-gray-700 me-4"
              >
                <input
                  type="checkbox"
                  value={framework}
                  checked={true}
                  // onChange={handleFrameworkChange}
                  className="p-1 me-2 text-black text-opacity-90 text-xs font-normal leading-[18px] tracking-tight"
                />
                {framework}
              </label>
            ))}
          </div> */}
        <div className="w-full h-[0px] border border-gray-200 !my-8"></div>
      </div>
    </>
  );
};

export default GeneralInfo;
