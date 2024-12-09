"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Country, State, City } from "country-state-city";
import { FiArrowLeft } from "react-icons/fi";
import industryList from "../../../../shared/data/sectors";
import { timeZones } from "../../../../shared/data/timezones";
import axiosInstance, { post, put } from "../../../../utils/axiosMiddleware";
import { Currency } from "../../../../shared/data/currency";

const dateFormatOptions = [
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
  { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
];

//

const reportFramework = ["GRI"];

const initialState = {
  generalDetails: {
    name: "",
    email: "",
    phone: "",
    website: "",
    typelocation: "",
    location: "",
    Empcount: "",
    revenue: "",
    mobile: "",
    fax: "",
    sector: "",
    subIndustry: "",
    corporateEntity: "",
    timeZone: "",
    language: "",
    dateFormat: "",
  },
  addressInformation: {
    country: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
    latitude: "",
    longitude: "",
  },
  reportingPeriodInformation: {
    fromDate: "",
    toDate: "",
    reportingFramework: "",
  },
  errors: {
    latitude: "",
    longitude: "",
  },
};

const Location = ({ heading }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryData = searchParams.get("data");

  const [formData, setFormData] = useState(initialState);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [subIndustries, setSubIndustries] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [isSameAsCorporate, setIsSameAsCorporate] = useState(false);
  const [selectedCorporateEntityDetails, setSelectedCorporateEntityDetails] =
    useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (queryData) {
      try {
        const decodedData = decodeURIComponent(queryData);
        const parsedData = JSON.parse(decodedData);
        setEditData(parsedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Failed to parse query data:", error);
      }
    }
  }, [queryData]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/corporategetonly`);
        console.log("Corporates:", response.data);
        setCorporates(response.data);
      } catch (e) {
        console.log(
          "failed fetching organization",
          process.env.BACKEND_API_URL
        );
      }
    };

    fetchData();
  }, [heading]);

  const handleSectorChange = (event) => {
    const selectedSector = event.target.value;
    setSelectedIndustry(selectedSector);

    // Find the selected industry object
    const selectedIndustryObj = industryList.find(
      (industry) => industry.industry === selectedSector
    );

    // Get sub-industries and set them
    const subIndustriesForSector = selectedIndustryObj?.subIndustries || [];
    setSubIndustries(subIndustriesForSector);

    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      generalDetails: {
        ...prevFormData.generalDetails,
        sector: selectedSector,
        // Reset subIndustry when sector changes
        subIndustry: "",
      },
    }));
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

    const latLongRegex = /^-?\d+\.\d{0,6}$/;

    if (
      (name === "latitude" || name === "longitude") &&
      !latLongRegex.test(value)
    ) {
      setFormData((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: `${name} must be in the decimal format eg. 77.001012`,
        },
        addressInformation: {
          ...prevState.addressInformation,
          [name]: value,
        },
      }));
      return;
    } else {
      setFormData((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: "",
        },
        addressInformation: {
          ...prevState.addressInformation,
          [name]: value,
        },
      }));
    }

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

  const handleTimezoneChange = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      generalDetails: {
        ...prevFormData.generalDetails,
        timeZone: value,
      },
    }));
  };

  const handleFrameworkChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFrameworks((prevFrameworks) =>
      checked
        ? [...prevFrameworks, value]
        : prevFrameworks.filter((framework) => framework !== value)
    );
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

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
  };

  const handleAddLocation = async (event, data) => {
    event.preventDefault();

    const url = `/locationonlyview`;

    const payload = {
      corporateentity: data.generalDetails.corporateEntity || null,
      name: data.generalDetails.name || "Location 1",
      typelocation: data.generalDetails.typelocation || "Headquarter Location",
      currency: data.generalDetails.currency || "US Dollars",
      dateformat: data.generalDetails.dateFormat || "mm/dd/yy",
      phone: data.generalDetails.phone || 9876543210,
      mobile: data.generalDetails.mobile || 9876543210,
      website: data.generalDetails.website || "https://www.sustainext.ai",
      fax: data.generalDetails.fax || 234567,
      sector: data.generalDetails.sector || "",
      sub_industry: data.generalDetails.subIndustry || "",
      location_type: data.generalDetails.typelocation || "Default",
      timezone: data.generalDetails.timeZone || "+0:00",
      latitude: data.addressInformation.latitude || null,
      longitude: data.addressInformation.longitude || null,
      employeecount: data.generalDetails.Empcount || 100,
      language: data.generalDetails.language || "English",
      revenue: data.generalDetails.revenue || 100000,
      currency: data.generalDetails.currency || "US dollars",
      streetaddress: data.addressInformation.street || "1st btm",
      area: 56775,
      type_of_services: "sfsdfsd",
      type_of_product: "adsf",
      type_of_business_activities: "jhghf",
      zipcode: data.addressInformation.zipCode || null,
      state: data.addressInformation.state || "Karnataka",
      city: data.addressInformation.city || "Bengaluru",
      country: data.addressInformation.country || "IN",
      from_date: data.reportingPeriodInformation.fromDate || null,
      to_date: data.reportingPeriodInformation.toDate || null,
    };

    try {
      const response = await post(url, payload);
      router.push("/dashboard/OrgStructure");
      console.log("POST request successful:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(payload, "payload");
  };

  const handleEditLocation = async (event, data, id) => {
    event.preventDefault();

    const url = `/location/${id}/`;

    const payload = {
      name: data.generalDetails.name || "",
      typelocation: data.generalDetails.typelocation || "",
      currency: data.generalDetails.currency || "",
      dateformat: data.generalDetails.dateFormat || "",
      phone: data.generalDetails.phone || null,
      mobile: data.generalDetails.mobile || null,
      website: data.generalDetails.website || "",
      fax: data.generalDetails.fax || 234567,
      sector: data.generalDetails.sector || "",
      sub_industry: data.generalDetails.subIndustry || "",
      location_type: data.generalDetails.typelocation || "",
      timezone: data.generalDetails.timeZone || "",
      employeecount: data.generalDetails.Empcount || null,
      language: data.generalDetails.language || "",
      revenue: data.generalDetails.revenue || null,
      currency: data.generalDetails.currency || "",
      streetaddress: data.addressInformation.street || "",
      area: null,
      type_of_services: "sfsdfsd",
      type_of_product: "adsf",
      type_of_business_activities: "jhghf",
      zipcode: data.addressInformation.zipCode || null,
      state: data.addressInformation.state || "",
      city: data.addressInformation.city || "",
      country: data.addressInformation.country || "",
      latitude: data.addressInformation.latitude || null,
      longitude: data.addressInformation.longitude || null,
      from_date: data.reportingPeriodInformation.fromDate || null,
      to_date: data.reportingPeriodInformation.toDate || null,
      framework: data.reportingPeriodInformation.reportingFramework || "GRI",
    };

    try {
      const response = await put(url, payload);
      router.push("/dashboard/OrgStructure");
      alert("Location updated successfully");
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(payload, "payload");
  };

  const handleCorporateEntityChange = (event) => {
    const selectedCorporateEntityName = event.target.value;
    handleGeneralDetailsChange(event);

    const corporateEntityDetails = corporates.find(
      (corp) => corp.name === selectedCorporateEntityName
    );
    setSelectedCorporateEntityDetails(corporateEntityDetails || null);
  };

  const handleSameAsCorporateChange = (e) => {
    setIsSameAsCorporate(e.target.checked);
    if (e.target.checked && !formData.generalDetails.corporateEntity) {
      setIsSameAsCorporate(false);
      alert("Please select Corporate entity first.");
      return;
    }
    if (e.target.checked && selectedCorporateEntityDetails) {
      const selectedCountryCode = selectedCorporateEntityDetails.Country;
      const selectedStateCode = selectedCorporateEntityDetails.state;

      const statesOfSelectedCountry =
        State.getStatesOfCountry(selectedCountryCode);
      const citiesOfSelectedState = City.getCitiesOfState(
        selectedCountryCode,
        selectedStateCode
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        addressInformation: {
          ...prevFormData.addressInformation,
          street: selectedCorporateEntityDetails.address,
          country: selectedCorporateEntityDetails.Country,
          state: selectedCorporateEntityDetails.state,
          city: selectedCorporateEntityDetails.city,
          zipCode: selectedCorporateEntityDetails.zipcode,
          latitude: selectedCorporateEntityDetails.latitude,
          longitude: selectedCorporateEntityDetails.longitude,
        },
      }));

      setStates(statesOfSelectedCountry);
      setCities(citiesOfSelectedState);

      setSelectedCountry(selectedCountryCode);
      setSelectedState(selectedStateCode);
      setSelectedCity(selectedCorporateEntityDetails.city);
    } else if (!e.target.checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        addressInformation: {
          ...prevFormData.addressInformation,
          street: "",
          country: "",
          state: "",
          city: "",
          zipCode: "",
          latitude: "",
          longitude: "",
        },
      }));

      setStates([]);
      setCities([]);

      setSelectedCountry("");
      setSelectedState("");
      setSelectedCity("");
    }
  };

  useEffect(() => {
    if (editData) {
      const selectedCountryCode = editData.filteredData[0].country;
      const selectedStateCode = editData.filteredData[0].state;

      const statesOfSelectedCountry =
        State.getStatesOfCountry(selectedCountryCode);
      const citiesOfSelectedState = City.getCitiesOfState(
        selectedCountryCode,
        selectedStateCode
      );

      const selectedIndustryValue = editData.filteredData[0].sector;

      // Find the corresponding industry object
      const selectedIndustryData = industryList.find(
        (industry) => industry.industry === selectedIndustryValue
      );

      // Get the sub-industries for the selected industry
      const subIndustriesForSelectedIndustry =
        selectedIndustryData?.subIndustries || [];

      const frameworkNumbers = editData.filteredData[0].framework;

      // Map the numeric values to framework names
      // const selectedFrameworks = Array.isArray(frameworkNumbers)
      //   ? frameworkNumbers.map((num) => frameworkMapping[num])
      //   : [frameworkMapping[frameworkNumbers]];
      // console.log('data in lcoation', editData.filteredData[0]);

      setFormData({
        generalDetails: {
          name: editData.filteredData[0].name,
          email: editData.filteredData[0].email,
          phone: editData.filteredData[0].phone,
          website: editData.filteredData[0].website,
          typelocation: editData.filteredData[0].location_type,
          ownership: editData.filteredData[0].owner,
          location: editData.filteredData[0].location_of_headquarters,
          Empcount: editData.filteredData[0].employeecount,
          revenue: editData.filteredData[0].revenue,
          mobile: editData.filteredData[0].mobile,
          fax: editData.filteredData[0].fax,
          sector: editData.filteredData[0].sector,
          subIndustry: editData.filteredData[0].sub_industry,
          organisation: editData.filteredData[0].organisation,
          dateFormat: editData.filteredData[0].date_format,
          currency: editData.filteredData[0].currency,
          timeZone: editData.filteredData[0].timezone,
          language: editData.filteredData[0].language,
        },

        addressInformation: {
          country: editData.filteredData[0].country,
          state: editData.filteredData[0].state,
          city: editData.filteredData[0].city,
          street: editData.filteredData[0].streetaddress,
          zipCode: editData.filteredData[0].zipCode,
          latitude: editData.filteredData[0].latitude,
          longitude: editData.filteredData[0].longitude,
        },

        reportingPeriodInformation: {
          fromDate: editData.filteredData[0].from_date,
          toDate: editData.filteredData[0].to_date,
          reportingFramework: editData.filteredData[0].framework,
        },
        errors: {
          latitude: "",
          longitude: "",
        },
      });

      setStates(statesOfSelectedCountry);
      setCities(citiesOfSelectedState);
      setSelectedCountry(selectedCountryCode);
      setSelectedState(selectedStateCode);
      setSelectedCity(editData.filteredData[0].city);

      setSelectedIndustry(selectedIndustryValue);
      setSubIndustries(subIndustriesForSelectedIndustry);

      setSelectedFrameworks(selectedFrameworks);
    }
  }, [editData]);

  return (
    <div className="px-4 mt-4">
      <div className="flex justify-between items-center drop-shadow-lg border-b-2 py-6 w-full">
        <h2 className="self-stretch text-black text-opacity-90 text-[22px] font-normal leading-relaxed flex space-x-8 items-center">
          <button onClick={() => router.back()} className="flex items-center">
            <FiArrowLeft />
          </button>
          <span>{editData ? "Edit Location" : "Location of Operation"}</span>
        </h2>
        <button
          className="w-[73px] h-[31px] px-[22px] py-2 bg-sky-600 rounded shadow flex-col justify-center items-center inline-flex me-8 cursor-pointer"
          onClick={
            editData
              ? (e) =>
                  handleEditLocation(e, formData, editData.filteredData[0].id)
              : (e) => handleAddLocation(e, formData)
          }
        >
          <div className="text-white text-xs font-bold leading-[15px]">
            Save
          </div>
        </button>
      </div>
      <div className="space-y-4 bg-white py-4">
        <div className="grid grid-cols-3 gap-5">
          <div></div>
          <div></div>
          {editData ? (
            ""
          ) : (
            <div>
              <label
                htmlFor="name"
                className="text-neutral-800 text-[13px] font-normal"
              >
                Corporate Entity
              </label>
              <select
                name="corporateEntity"
                value={formData.generalDetails.corporateEntity}
                onChange={handleCorporateEntityChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                <option value="">Select Corporate Entity</option>
                {corporates?.map((corp) => (
                  <option key={corp.id} value={corp.name}>
                    {corp.name}
                  </option>
                ))}{" "}
              </select>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-neutral-400 text-xs font-semibold uppercase leading-relaxed tracking-wide my-8 mb-4">
            General Information
          </h3>
          <div className="grid grid-cols-3 gap-5">
            <div className="space-y-3">
              <label
                htmlFor="name"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.generalDetails?.name}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>
            <div></div>
            <div></div>
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
                value={formData.generalDetails?.phone}
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
                value={formData.generalDetails?.mobile}
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
                value={formData.generalDetails?.website}
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
                value={formData.generalDetails?.fax}
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
                value={formData.generalDetails?.Empcount}
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
                value={formData.generalDetails?.revenue}
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
                value={formData.generalDetails?.sector}
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
                value={formData.generalDetails?.subIndustry}
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
            <div></div>
            <div className="space-y-3">
              <label
                htmlFor="typeOfLocation"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Type of Location
              </label>
              <input
                type="text"
                name="typelocation"
                value={formData.generalDetails?.typelocation}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-6 mt-[4rem] text-gray-700">
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
                value={formData.addressInformation?.street}
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
                value={formData.addressInformation?.country}
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
                value={formData.addressInformation?.state}
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
                value={formData.addressInformation?.city}
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

            <div className="space-y-3">
              <label
                htmlFor="zipCode"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.addressInformation?.zipCode}
                onChange={handleAddressInformationChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="latitude"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Latitude
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.addressInformation?.latitude}
                onChange={handleAddressInformationChange}
                className={`border rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight ${
                  formData.errors?.latitude
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formData.errors?.latitude && (
                <p className="text-red-500 text-xs mt-1">
                  {formData.errors?.latitude}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label
                htmlFor="longitude"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.addressInformation?.longitude}
                onChange={handleAddressInformationChange}
                className={`border rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight ${
                  formData.errors?.longitude
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formData.errors?.longitude && (
                <p className="text-red-500 text-xs mt-1">
                  {formData.errors?.longitude}
                </p>
              )}
            </div>
            <div className="space-y-3 col-span-3">
              <label
                htmlFor="sameAsCorporate"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                <input
                  type="checkbox"
                  name="sameAsCorporate"
                  checked={isSameAsCorporate}
                  onChange={handleSameAsCorporateChange}
                  className="me-2"
                />
                Same as Corporate Entity
              </label>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-6 mt-[4rem] text-gray-700">
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
                value={formData.generalDetails?.dateFormat}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
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
                value={formData.generalDetails?.currency}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                {Currency.map((option) => (
                  <option key={option.currency} value={option.currency}>
                    {option.currency}
                  </option>
                ))}
              </select>
            </div>
            <div></div>
            <div className="space-y-3">
              <label
                htmlFor="timeZone"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Timezone
              </label>
              <select
                name="timeZone"
                value={formData.generalDetails?.timeZone}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                {timeZones.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="language"
                className="block text-neutral-800 text-[13px] font-normal"
              >
                Language
              </label>
              <select
                name="language"
                value={formData.generalDetails?.language}
                onChange={handleGeneralDetailsChange}
                className="border border-gray-300 rounded-md w-full p-2 text-neutral-500 text-xs font-normal leading-tight"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Mandarin Chinese">Mandarin Chinese</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Korean">Korean</option>
                <option value="Turkish">Turkish</option>
                <option value="Japanese">Japanese</option>
                <option value="Spanish">Spanish</option>
                <option value="Russian">Russian</option>
                <option value="Italian">Italian</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Persian">Persian</option>
                <option value="Hindi">Hindi</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Thai">Thai</option>
                <option value="Farsi">Farsi</option>
                <option value="Polish">Polish</option>
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
                value={formData.reportingPeriodInformation?.fromDate}
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
                value={formData.reportingPeriodInformation?.toDate}
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
                  checked={selectedFrameworks.includes(framework)}
                  onChange={handleFrameworkChange}
                  className="p-1 me-2 text-black text-opacity-90 text-xs font-normal leading-[18px] tracking-tight"
                />
                {framework}
              </label>
            ))}
          </div>
          <div className="w-full h-[0px] border border-gray-200 my-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Location;
