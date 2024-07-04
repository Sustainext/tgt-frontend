'use client'
import React, { useEffect, useState } from "react";
import ScopeTable from "./ScopeTable";
import SourceTable from "./SourceTable";
import LocationTable from "./LocationTable";
import DateRangePicker from "@/app/utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { Oval } from 'react-loader-spinner';

const AnalyseEmission = () => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [scopeData, setScopeData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null
  });

  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    location: "",
    start: null,
    end: null
  });
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const fetchData = async (params) => {
    if (!params.start || !params.end) {
      setIsDateRangeValid(false);
      console.error("Invalid date range selected");
      return;
  } else {
      const startDate = new Date(params.start);
      const endDate = new Date(params.end);
  
      if (endDate < startDate) {
          setIsDateRangeValid(false);
          setDateRange({
            start: null,
            end: null
          });
          console.error("End date cannot be before start date");
          return;
      } else {
          setIsDateRangeValid(true);
      }
  }
  
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_emission_analysis`,
        {
          params: params
        }
      );

      const data = response.data.data;
      console.log(data, "testing");

      const { top_emission_by_source, top_emission_by_scope, top_emission_by_location } = data;
      const formattedLocation = top_emission_by_location.map((loc, index) => ({
        sno: String(index + 1),
        location: loc.location,
        ageContribution: `${loc.contribution}%`,
        totalemissions: String(loc.total),
        units: "tCO₂e"
      }));
      const formattedScope = top_emission_by_scope.map((s, index) => ({
        sno: String(index + 1),
        scope: s.scope,
        ageContribution: `${s.contribution}%`,
        totalemissions: String(s.total),
        units: "tCO₂e"
      }));
      const formattedSource = top_emission_by_source.map((src, index) => ({
        sno: String(index + 1),
        source: src.source,
        ageContribution: `${src.contribution}%`,
        totalemissions: String(src.total),
        units: "tCO₂e"
      }));
      setScopeData(formattedScope);
      setSourceData(formattedSource);
      setLocationData(formattedLocation);

      const resultArray = Object.keys(data).map((key) => ({
        key: key,
        value: data[key],
      }));

      setAnalyseData(resultArray);
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    fetchData(datasetparams);
  }, [datasetparams]);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axiosInstance.get(`/orggetonly`);
        setOrganisations(response.data);
        // setSelectedOrg(response.data[0].id);
        setDatasetparams((prevParams) => ({
          ...prevParams,
          organisation: response.data[0].id
        }));
      } catch (e) {
        console.error("Failed fetching organization:", e);
      }
    };

    fetchOrg();
  }, []);

  useEffect(() => {
    const fetchCorporates = async () => {
      if (selectedOrg) {
        try {
          const response = await axiosInstance.get(
            `/corporate/`,
            {
              params: { organization_id: selectedOrg },
            }
          );
          setCorporates(response.data);
        } catch (e) {
          console.error("Failed fetching corporates:", e);
        }
      }
    };

    fetchCorporates();
  }, [selectedOrg]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (selectedCorp) {
        try {
          const response = await axiosInstance.get(
            `/sustainapp/get_location_as_per_corporate/`,
            {
              params: { corporate: selectedCorp },
            }
          );
          setSelectedLocation(response.data || []);
          console.log(response.data, "location test");
        } catch (e) {
          console.error("Failed fetching locations:", e);
          setSelectedLocation([]); // Set as an empty array on error
        }
      }
    };

    fetchLocation();
  }, [selectedCorp]);

  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setSelectedSetLocation("");
    setScopeData([]);
    setSourceData([]);
    setLocationData([]);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      organisation: newOrg,
      corporate: "",
      location: ""
    }));
  };

  const handleOrgChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setSelectedSetLocation("");

    setDatasetparams((prevParams) => ({
      ...prevParams,
      corporate: newCorp,
      location: ""
    }));
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedSetLocation(newLocation);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      location: newLocation
    }));
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      start: newRange.start,
      end: newRange.end
    }));
  };

  return (
    <>
      <div className="mt-4 pb-3 mx-5 text-left">
        <div className="mb-2 flex-col items-center py-4 px-3 gap-6">
          <div className="justify-start items-center gap-4 inline-flex my-6">
            <div className="text-zinc-600 text-[13px] font-semibold font-['Manrope']">
            View By:
            </div>
            <div className="rounded-lg shadow border border-gray-300 justify-start items-start flex">
              <div
                className={`w-[111px] px-4 py-2.5 border-r rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                  reportType === "Organization" ? "bg-sky-100" : "bg-white"
                }`}
                onClick={() => handleReportTypeChange("Organization")}
              >
                <div className="text-slate-800 text-[13px] font-medium font-['Manrope'] leading-tight">
                  Organization
                </div>
              </div>
              <div
                className={`w-[111px] px-4 py-2.5 border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                  reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                }`}
                onClick={() => handleReportTypeChange("Corporate")}
              >
                <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
                  Corporate
                </div>
              </div>
              <div
                className={`w-[111px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                  reportType === "Location" ? "bg-sky-100" : "bg-white"
                }`}
                onClick={() => handleReportTypeChange("Location")}
              >
                <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
                  Location
                </div>
              </div>
            </div>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-4 p-4 ${
              reportType !== "" ? "visible" : "hidden"
            }`}
          >
            <div className="mr-2">
              <label
                htmlFor="cname"
                className="text-neutral-800 text-[13px] font-normal"
              >
                Select Organization*
              </label>
              <div className="mt-2">
                <select
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={selectedOrg}
                  onChange={handleOrganizationChange}
                >
                  <option value="">--Select Organization--- </option>
                  {organisations && organisations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {(reportType === "Corporate" || reportType === "Location") && (
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[13px] font-normal"
                >
                  Select Corporate
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={selectedCorp}
                    onChange={handleOrgChange}
                  >
                    <option value="">--Select Corporate--- </option>
                    {corporates && corporates.map((corp) => (
                      <option key={corp.id} value={corp.id}>
                        {corp.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {reportType === "Location" && (
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[13px] font-normal"
                >
                  Select Location
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={selectedsetLocation}
                    onChange={handleLocationChange}
                  >
                    <option value="">--Select Location--- </option>
                    {selectedLocation && selectedLocation.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="mr-2">
              <label
                htmlFor="cname"
                className="text-neutral-800 text-[13px] font-normal"
              >
                Select Date
              </label>
              <div className="mt-2">
                <DateRangePicker
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  onDateChange={handleDateChange}
                />
                {!isDateRangeValid && (
                  <div className="text-red-600 text-xs mt-2">
                    Please select a valid date range.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mx-4">
          <h2 className="font-bold text-[15px]">Top Emissions by Source</h2>
        </div>
        <SourceTable data={sourceData} />
      </div>

      <div className="mt-8">
        <div className="mx-4">
          <h2 className="font-bold text-[15px]">Top Emissions by Location</h2>
        </div>
        <LocationTable data={locationData} />
      </div>
      <div className="mt-8">
        <div className="mx-4">
          <h2 className="font-bold text-[15px]">Top Emissions by Scope</h2>
        </div>
        <ScopeTable data={scopeData} />
      </div>
      {loopen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 z-[100]">
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

export default AnalyseEmission;
