"use client";

import { FaArrowLeft } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import industryList from "../../../../shared/data/sectors";
import { Country, State, City } from "country-state-city";
// import moment from 'moment-timezone';
import { timeZones } from "../../../../shared/data/timezones";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { useRouter } from "next/navigation";

const dateFormatOptions = [
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
  { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
];

const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "CAD", value: "CAD" },
  { label: "AUD", value: "AUD" },
  { label: "INR", value: "INR" },
  { label: "SGD", value: "SGD" },
  { label: "KRW", value: "KRW" },
  { label: "JPY", value: "JPY" },
  { label: "TTD", value: "TTD" },
  { label: "ZAR", value: "ZAR" },
];

const reportFramework = ["GRI"];
const frameworkMapping = {
  1: "GRI",
  2: "CDP",
  3: "SASB",
  4: "TCFD",
  5: "BRSR",
  6: "UN PRI",
  // ... other mappings
};

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

      if (editData.type === "Corporate Entity") {
        setFormData({
          generalDetails: {
            name: editData.filteredData[0]?.name || "",
            email: editData.filteredData[0]?.email || "",
            phone: editData.filteredData[0]?.phone || "",
            website: editData.filteredData[0]?.website || "",
            type: editData.filteredData[0]?.type_corporate_entity || "",
            ownership: editData.filteredData[0]?.owner || "",
            location: editData.filteredData[0]?.location_of_headquarters || "",
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
            street: editData.filteredData[0]?.street || "",
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

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [subIndustries, setSubIndustries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const handleSectorChange = (event) => {
    const selectedSector = event.target.value;
    setSelectedIndustry(selectedSector);
    const selectedIndustryObj = industryList.find(
      (industry) => industry.industry === selectedSector
    );
    const subIndustriesForSector = selectedIndustryObj?.subIndustries || [];
    setSubIndustries(subIndustriesForSector);
    handleGeneralDetailsChange(event);
    console.log("Sub Industries Found:", subIndustriesForSector);
  };

  const handleGeneralDetailsChange = (event) => {
    const { name, value } = event.target;
    if (name === "name" && value.includes("&")) {
      alert("The name field should not contain &");
      return;
    }
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

  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    const statesOfSelectedCountry = State.getStatesOfCountry(countryId);
    setStates(statesOfSelectedCountry);
  };

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);
    const citiesOfSelectedState = City.getCitiesOfState(
      selectedCountry,
      stateId
    );
    setCities(citiesOfSelectedState);
    console.log(selectedCountry, event.target.value, citiesOfSelectedState);
  };

  const handleTimezoneChange = (event) => {
    const value = event.target.value;
    setSelectedTimeZone(value);
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
            className="text-white text-xs font-bold leading-[15px]"
            onClick={(e) =>
              editData
                ? handleGeneralDetailsSubmit(
                    e,
                    formData,
                    editData.filteredData[0].id
                  )
                : handleGeneralDetailsSubmit(e, formData)
            }
          >
            Save
          </button>
        </div>
      </div>

      <div className="space-y-4 bg-white py-4 mx-4">
        <div className="grid grid-cols-3 gap-5">
          <div></div>
          <div></div>
          <div>
            <div>
              {heading === "Corporate Entity Details" ? (
                <div>
                  <label
                    htmlFor="name"
                    className="text-neutral-800 text-[13px] font-normal"
                  >
                    Organisation
                  </label>

                  <select
                    name="organisation"
                    value={formData.generalDetails.organisation}
                    onChange={handleGeneralDetailsChange}
                    className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
                  >
                    <option value="">Select Organisation</option>
                    {organisations?.map((org) => (
                      <option key={org.id} value={org.name}>
                        {org.name}
                      </option>
                    ))}{" "}
                  </select>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
            General Information
          </h3>

          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-3">
              <label
                htmlFor="name"
                className="text-neutral-800 text-[13px] font-normal"
              >
                Legal Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.generalDetails.name}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
                // required
              />
            </div>

            <div></div>
            <div></div>

            <div className="space-y-3">
              <label
                htmlFor="type"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Type of Incorporation
              </label>

              <input
                type="text"
                name="type"
                value={formData.generalDetails.type}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>

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

            <div className="space-y-3">
              <label
                htmlFor="location"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Location Of HeadQuarters
              </label>

              <input
                type="text"
                name="location"
                value={formData.generalDetails.location}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="phone"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.generalDetails.phone}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="mobile"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Mobile
              </label>

              <input
                type="text"
                name="mobile"
                value={formData.generalDetails.mobile}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="website"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Website
              </label>

              <input
                type="text"
                name="website"
                value={formData.generalDetails.website}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>

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

            <div className="space-y-3">
              <label
                htmlFor="Empcount"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Employee Count
              </label>

              <input
                type="text"
                name="Empcount"
                value={formData.generalDetails.Empcount}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="revenue"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Revenue
              </label>

              <input
                type="text"
                name="revenue"
                value={formData.generalDetails.revenue}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="sector"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Sector
              </label>

              <select
                name="sector"
                value={formData.generalDetails.sector}
                onChange={handleSectorChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                <option value="">Select Sector</option>
                {industryList.map((industry) => (
                  <option key={industry.id} value={industry.value}>
                    {industry.industry}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="subIndustry"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Sub Industry
              </label>

              <select
                name="subIndustry"
                value={formData.generalDetails.subIndustry}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                <option value="">Select Sub Industry</option>
                {subIndustries.map((subIndustry) => (
                  <option key={subIndustry.id} value={subIndustry.value}>
                    {subIndustry.subIndustry}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[0px] border border-gray-200 my-8 w-full"></div>

          <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
            ADDRESS INFORMATION
          </h3>

          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-3">
              <label
                htmlFor="address"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Street Address
              </label>

              <input
                type="text"
                name="street"
                value={formData.addressInformation.street}
                onChange={handleAddressInformationChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>

            <div></div>

            <div></div>

            <div className="space-y-3">
              <label
                htmlFor="country"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Country
              </label>

              <select
                name="country"
                value={formData.addressInformation.country}
                onChange={handleAddressInformationChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="state"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                State
              </label>

              <select
                name="state"
                value={formData.addressInformation.state}
                onChange={handleAddressInformationChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="city"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                City
              </label>

              <select
                name="city"
                value={formData.addressInformation.city}
                onChange={handleAddressInformationChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-[0px] border border-gray-200 my-8 w-full"></div>

          <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
            LOCALE INFORMATION
          </h3>

          <div className="grid grid-cols-3 gap-5">
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

            <div className="space-y-3">
              <label
                htmlFor="currency"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Currency
              </label>

              <select
                name="currency"
                value={formData.generalDetails.currency}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                <option value="">Select Currency</option>
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div></div>
            <div className="space-y-3">
              <label
                htmlFor="timezone"
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
          <div className="h-[0px] border border-gray-200 my-8 w-full"></div>
          <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
            REPORTING PERIOD
          </h3>
          <div className="grid grid-cols-3 gap-5">
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
            <div></div>
          </div>
          <div className="space-y-3 mt-4">
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
          </div>
          <div className="w-full h-[0px] border border-gray-200 my-12"></div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
