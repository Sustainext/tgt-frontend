'use client'
import React, { useEffect, useState } from "react";
import ScopeTable from "./ScopeTable";
import SourceTable from "./SourceTable";
import LocationTable from "./LocationTable";
import IntensityTable from './IntensityTable';
import ReductionTable from './ReductionTable'
import DateRangePicker from "@/app/utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { Oval } from 'react-loader-spinner';
import { set } from "date-fns";

const AnalyseEmission = () => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [scopeData, setScopeData] = useState([]);
  const [reductionData, setReductionData] = useState([]);
  const [intensityData, setIntensityData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [sourceDataAll, setSourceDataAll] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [locationDataAll, setLocationDataAll] = useState([]);
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
  const [organisationName, setOrganisationName] = useState("");
  const [corporateName, setCorporateName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [fromDate,setFromDate] = useState("");
  const [toDate,setToDate] = useState("");
  const [errors, setErrors] = useState({
    organization: 'Please select Organisation',
    corporate: 'Please select Corporate',
    location: 'Please select Location',
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

      const { top_5_emisson_by_source, disclosure_analyze_305_5,ghg_emission_intensity, all_emission_by_scope, top_5_emisson_by_location, all_emission_by_location, all_emission_by_source, selected_org, selected_corporate, selected_location, selected_start_date, selected_end_date
      } = data;

      const formattedLocation = top_5_emisson_by_location.map((loc, index) => ({
        sno: String(index + 1),
        location: loc.location,
        ageContribution: `${loc.contribution}%`,
        totalemissions: String((loc.total)),
        units: "tCO₂e"
      }));
      const formattedScope = all_emission_by_scope.map((s, index) => ({
        sno: String(index + 1),
        scope: s.scope,
        ageContribution: `${s.contribution}%`,
        totalemissions: String((s.total)),
        units: "tCO₂e"
      }));
      const formattedSource = top_5_emisson_by_source.map((src, index) => ({
        sno: String(index + 1),
        source: src.source,
        ageContribution: `${src.contribution}%`,
        totalemissions: String((src.total)),
        units: "tCO₂e"
      }));
      const formattedLocationAll = all_emission_by_location
      .map((loc, index) => ({
        sno: String(index + 1),
        location: loc.location,
        ageContribution: `${loc.contribution}%`,
        totalemissions: String((loc.total)),
        units: "tCO₂e"
      }));
      const formattedSourceAll = all_emission_by_source
      .map((loc, index) => ({
        sno: String(index + 1),
        source: loc.source,
        ageContribution: `${loc.contribution}%`,
        totalemissions: String((loc.total)),
        units: "tCO₂e"
      }));

      const formattedReduction = disclosure_analyze_305_5.map((s, index) => ({
        sno: String(index + 1),
        initiatve: s.initiative_taken,
        reductions:s.method,
        baseline:s.base_year_or_base_inline,
        year:s.year,
        rationale:s.rationale,
        emissionReduction:s.ghg_emission_reduced,
        scopeReduction:s.scopes?.length>0?s.scopes.join(", "):'',
        gases:s.gases_included?.length>0?s.gases_included.join(", "):'',
        tools:s.assumption_or_calculation
      }));

      const formattedIntensity=ghg_emission_intensity.map((s,index)=>(
        {
          "S.No": String(index + 1),
          "Organisation Metric": s.organization_metric,
          "Quantity":s.quantity,
          "Unit":s.unit,
          "Type of GHGs":s.type_of_ghg?.length>0?s.type_of_ghg.join(", "):'',
          "GHG Emission Intensity":s.ghg_emission_intensity,
          "Unit":s.ghg_intensity_unit,
         "CO2":s.ch4?"True":"False",
         "N2O":s.n2o?"True":"False",
         "CH4":s.co2?"True":"False",
         "HFCs":s.HFCs?"True":"False",
         "PFCs":s.PFCs?"True":"False",
         "SF6":s.SF6?"True":"False",
         "NF3":s.NF3?"True":"False"
        }
      ))



      
      setScopeData(formattedScope);
      setIntensityData(formattedIntensity)
      setReductionData(formattedReduction)
      setSourceData(formattedSource);
      setSourceDataAll(formattedSourceAll);
      setLocationData(formattedLocation);
      setLocationDataAll(formattedLocationAll);
      setOrganisationName(selected_org);
      setCorporateName(selected_corporate);
      setLocationName(selected_location);
      setFromDate(selected_start_date);
      setToDate(selected_end_date);

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
    
    if (type === "Organization") {
      setSelectedCorp(""); 
      setSelectedLocation(""); 
    }
    if(type === "Corporate"){
      setScopeData([]);
      setSourceData([]);
      setLocationData([]);
      setReductionData([])
      setIntensityData([])
      setDateRange({
        start: null,
        end: null
      });
      setIsDateRangeValid(false);
    }
    if(type === "Location"){
      setScopeData([]);
      setSourceData([]);
      setLocationData([]);
      setReductionData([])
      setIntensityData([])
      setDateRange({
        start: null,
        end: null
      });
      setIsDateRangeValid(false);
    }
  };


  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    if (!newOrg) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: 'Please select an organization',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: '',
      }));
    }
    setSelectedOrg(newOrg);
    setSelectedCorp('');
    setSelectedSetLocation('');
    setScopeData([]);
    setSourceData([]);
    setReductionData([])
    setIntensityData([])
    setLocationData([]);
    setDatasetparams((prevParams) => ({
      ...prevParams,
      organisation: newOrg,
      corporate: '',
      location: '',
    }));
  };

  const handleOrgChange = (e) => {
    const newCorp = e.target.value;
    if (!newCorp) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: 'Please select a corporate',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: '',
      }));
    }
    setSelectedCorp(newCorp);
    setSelectedSetLocation('');
    setDatasetparams((prevParams) => ({
      ...prevParams,
      corporate: newCorp,
      location: '',
    }));
  };
  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    if (!newLocation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: 'Please select a location',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: '',
      }));
    }
    setSelectedSetLocation(newLocation);
    setDatasetparams((prevParams) => ({
      ...prevParams,
      location: newLocation,
    }));
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
    setDatasetparams((prevParams) => ({
      ...prevParams,
      start: newRange.start,
      end: newRange.end,
    }));
  };

  return (
    <>
     <div className="mb-2 flex-col items-center pt-4  gap-6">
        <div className="mt-4 pb-3 mx-5 text-left">
          <div className="mb-2 flex-col items-center pt-2  gap-6">
          <div className="justify-start items-center gap-4 inline-flex">
                <div className="text-zinc-600 text-[12px]  font-semibold font-['Manrope']">
                  View By:
                </div>
                <div className="rounded-lg shadow  justify-start items-start flex">
                  <div
                    className={`w-[111px] px-4 py-2.5 border rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Organization" ? "bg-[#d2dfeb]" : "bg-white"
                    }`}
                    onClick={() => handleReportTypeChange("Organization")}
                  >
                    <div className="text-slate-800 text-[12px]  font-medium font-['Manrope'] leading-tight">
                      Organization
                    </div>
                  </div>
                  <div
                    className={`w-[111px] px-4 py-2.5 border-y border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Corporate" ? "bg-[#d2dfeb]" : "bg-white"
                    }`}
                    onClick={() => handleReportTypeChange("Corporate")}
                  >
                    <div className="text-slate-700 text-[12px]  font-medium font-['Manrope'] leading-tight">
                      Corporate
                    </div>
                  </div>
                  <div
                    className={`w-[111px] px-4 py-2.5 border-y border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Location" ? "bg-[#d2dfeb]" : "bg-white"
                    }`}
                    onClick={() => handleReportTypeChange("Location")}
                  >
                    <div className="text-slate-700 text-[12px]  font-medium font-['Manrope'] leading-tight">
                      Location
                    </div>
                  </div>
                </div>
              </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4 ${reportType !== "" ? "visible" : "hidden"
                }`}
            >
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[12px] font-normal"
                >
                  Select Organization*
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                    value={selectedOrg}
                    onChange={handleOrganizationChange}
                  >
                    <option value="01">--Select Organization--- </option>
                    {organisations &&
                      organisations.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                  </select>
                  {errors.organization && (
                    <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                      {errors.organization}
                    </p>
                  )}
                </div>
              </div>
              {(reportType === "Corporate" || reportType === "Location") && (
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal ml-1"
                  >
                    Select Corporate
                  </label>
                  <div className="mt-2">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                      value={selectedCorp}
                      onChange={handleOrgChange}
                    >
                      <option value="">--Select Corporate--- </option>
                      {corporates &&
                        corporates.map((corp) => (
                          <option key={corp.id} value={corp.id}>
                            {corp.name}
                          </option>
                        ))}
                    </select>
                    {errors.corporate && (
                      <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                        {errors.corporate}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {reportType === "Location" && (
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal ml-1"
                  >
                    Select Location
                  </label>
                  <div className="mt-2">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                      value={selectedsetLocation}
                      onChange={handleLocationChange}
                    >
                      <option value="">--Select Location--- </option>
                      {selectedLocation &&
                        selectedLocation.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))}
                    </select>
                    {errors.location && (
                      <p className="text-[#007EEF] text-[12px] pl-2 mt-2">{errors.location}</p>
                    )}
                  </div>
                </div>
              )}
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[12px] font-normal"
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
                     <p className="text-[#007EEF] text-[12px] top=16  left-0 pl-2 mt-2">
                     Please select a date range
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="mt-8 mr-10">
        <div className="mx-4">
          <h2 className="font-bold text-[15px]">Top Emissions by Scope</h2>
        </div>
        <ScopeTable data={scopeData} organisation={organisationName} corporate={corporateName} location={locationName} fromDate={fromDate} toDate={toDate} />
      </div>
      <div className="mt-4 mr-10">
        <div className="mx-4">
          <h2 className="font-bold text-[15px]">Top Emissions by Source</h2>
        </div>
        <SourceTable data={sourceData} fullData={sourceDataAll} organisation={organisationName} corporate={corporateName} location={locationName} fromDate={fromDate} toDate={toDate} />
      </div>

      <div className="mt-8 mr-10">
        <div className="mx-4">
          <h2 className="font-bold text-[15px]">Top Emissions by Location</h2>
        </div>
        <LocationTable data={locationData} fullData={locationDataAll} organisation={organisationName} corporate={corporateName} location={locationName} fromDate={fromDate} toDate={toDate} />
      </div>

      <div className="mt-8 mr-10">
        <div className="mx-4 flex justify-between items-center">
          <h2 className="font-bold text-[15px]">GHG Emission Intensity</h2>
         <div className="flex gap-2">
         <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-4a
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-4b
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-4c
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-4d
                </div>
              </div>
         </div>
        </div>
        <IntensityTable data={intensityData} organisation={organisationName} corporate={corporateName} location={locationName} fromDate={fromDate} toDate={toDate} />
      </div>
      <div className="mt-8 mr-10">
        <div className="mx-4 flex justify-between items-center">
          <h2 className="font-bold text-[15px]">GHG Emission Reduction Initiatives</h2>
          <div className="flex gap-2">
         <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-5a
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-5b
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 305-5d
                </div>
              </div>
         </div>
        </div>
        <ReductionTable data={reductionData} organisation={organisationName} corporate={corporateName} location={locationName} fromDate={fromDate} toDate={toDate} />
      </div>
      {loopen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
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
