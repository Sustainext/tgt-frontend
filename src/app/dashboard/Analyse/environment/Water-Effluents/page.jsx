"use client";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
import DateRangePicker from "@/app/utils/DatePickerComponent";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  columns7,
  columns8,
  columns9,
  columns10,
  columns11,
  columns12,
  columns13,
  columns14,
  columns15,
  columns16,
  columns17,
} from "./data";

const AnalyseWaterEffluents = ({ isBoxOpen }) => {
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ end: "", start: "" });
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    location: "",
    start: null,
    end: null,
  });
  const [collapsed, setCollapsed] = useState(false);

  const [waterConsumption, setWaterConsumption] = useState([]);
  const [waterConsumptionInWaterStress, setWaterConsumptionInWaterStress] =
    useState([]);
  const [
    waterConsumptionByBusinessOperation,
    setWaterConsumptionByBusinessOperation,
  ] = useState([]);
  const [waterConsumptionByLocation, setWaterConsumptionByLocation] = useState(
    []
  );
  const [waterConsumptionBySource, setWaterConsumptionBySource] = useState([]);
  const [
    freshWaterWithdrawalByBusinessOperation,
    setFreshWaterWithdrawalByBusinessOperation,
  ] = useState([]);
  const [
    freshWaterWithdrawalBySourceInWaterStress,
    setFreshWaterWithdrawalBySourceInWaterStress,
  ] = useState([]);
  const [freshWaterWithdrawalByLocation, setFreshWaterWithdrawalByLocation] =
    useState([]);
  const [waterWithdrawalByWaterType, setWaterWithdrawalByWaterType] = useState(
    []
  );
  const [waterWithdrawalFromThirdParties, setWaterWithdrawalFromThirdParties] =
    useState([]);
  const [waterDischargeByLocation, setWaterDischargeByLocation] = useState([]);
  const [waterDischargeBySourceAndType, setWaterDischargeBySourceAndType] =
    useState([]);
  const [
    waterDischargeFromWaterStressByBusinessOperation,
    setWaterDischargeFromWaterStressByBusinessOperation,
  ] = useState([]);
  const [
    waterDischargeByBusinessOperation,
    setWaterDischargeByBusinessOperation,
  ] = useState([]);
  const [
    waterDischargeByWaterTypeFromWaterStress,
    setWaterDischargeByWaterTypeFromWaterStress,
  ] = useState([]);
  const [
    thirdPartyWaterDischargeForOtherOrganizations,
    setThirdPartyWaterDischargeForOtherOrganizations,
  ] = useState([]);

  const handleReportTypeChange = (type) => {
    setReportType(type);

    if (type === "Organization") {
      setSelectedCorp("");
      setSelectedLocation("");
    }
    if (type === "Corporate") {
      setWaterConsumption([]);
      setWaterConsumptionInWaterStress([]);
      setWaterConsumptionByBusinessOperation([]);
      setWaterConsumptionByLocation([]);
      setWaterConsumptionBySource([]);
      setFreshWaterWithdrawalByBusinessOperation([]);
      setFreshWaterWithdrawalBySourceInWaterStress([]);
      setFreshWaterWithdrawalByLocation([]);
      setWaterWithdrawalByWaterType([]);
      setWaterWithdrawalFromThirdParties([]);
      setWaterDischargeByLocation([]);
      setWaterDischargeBySourceAndType([]);
      setWaterDischargeFromWaterStressByBusinessOperation([]);
      setWaterDischargeByBusinessOperation([]);
      setWaterDischargeByWaterTypeFromWaterStress([]);
      setThirdPartyWaterDischargeForOtherOrganizations([]);
      setChangeInWaterStorage([]);
      setDateRange({
        start: null,
        end: null,
      });
      setIsDateRangeValid(false);
    }
    if (type === "Location") {
      setWaterConsumption([]);
      setWaterConsumptionInWaterStress([]);
      setWaterConsumptionByBusinessOperation([]);
      setWaterConsumptionByLocation([]);
      setWaterConsumptionBySource([]);
      setFreshWaterWithdrawalByBusinessOperation([]);
      setFreshWaterWithdrawalBySourceInWaterStress([]);
      setFreshWaterWithdrawalByLocation([]);
      setWaterWithdrawalByWaterType([]);
      setWaterWithdrawalFromThirdParties([]);
      setWaterDischargeByLocation([]);
      setWaterDischargeBySourceAndType([]);
      setWaterDischargeFromWaterStressByBusinessOperation([]);
      setWaterDischargeByBusinessOperation([]);
      setWaterDischargeByWaterTypeFromWaterStress([]);
      setThirdPartyWaterDischargeForOtherOrganizations([]);
      setChangeInWaterStorage([]);
      setDateRange({
        start: null,
        end: null,
      });
      setIsDateRangeValid(false);
    }
  };
  const [changeInWaterStorage, setChangeInWaterStorage] = useState([]);
  const [errors, setErrors] = useState({
    organization: "Please select Organisation",
    corporate: "Please select Corporate",
    location: "Please select Location",
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
          end: null,
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
        `/sustainapp/get_water_analysis_api/`,
        {
          params: params,
        }
      );

      const data = response.data;
      console.log(data, "testing");

      const {
        total_water_consumption,
        total_water_consumption_in_water_stress_areas_by_area,
        total_water_consumption_by_business_operation,
        total_water_consumption_by_location,
        total_water_consumption_by_source,
        total_fresh_water_withdrawal_by_business_operation,
        total_fresh_water_withdrawal_by_source,
        get_total_fresh_water_withdrawal_by_location_country,
        total_water_withdrawal_by_water_type,
        water_withdrawal_from_third_parties,
        get_total_fresh_water_discharge_by_location_country,
        total_water_discharge_by_water_type,
        total_water_discharge_from_water_stress_area_by_business_operation,
        total_fresh_water_discharge_by_business_operation,
        total_water_discharge_by_water_type_from_water_stress_area,
        third_party_water_discharge_sent_to_use_for_other_organizations,
        change_in_water_storage,
      } = data;

      setWaterConsumption(total_water_consumption);
      setWaterConsumptionInWaterStress(
        total_water_consumption_in_water_stress_areas_by_area
      );
      setWaterConsumptionByBusinessOperation(
        total_water_consumption_by_business_operation
      );
      setWaterConsumptionByLocation(total_water_consumption_by_location);
      setWaterConsumptionBySource(total_water_consumption_by_source);
      setFreshWaterWithdrawalByBusinessOperation(
        total_fresh_water_withdrawal_by_business_operation
      );
      setFreshWaterWithdrawalBySourceInWaterStress(
        total_fresh_water_withdrawal_by_source
      );
      setFreshWaterWithdrawalByLocation(
        get_total_fresh_water_withdrawal_by_location_country
      );
      setWaterWithdrawalByWaterType(total_water_withdrawal_by_water_type);
      setWaterWithdrawalFromThirdParties(water_withdrawal_from_third_parties);
      setWaterDischargeByLocation(
        get_total_fresh_water_discharge_by_location_country
      );
      setWaterDischargeBySourceAndType(total_water_discharge_by_water_type);
      setWaterDischargeFromWaterStressByBusinessOperation(
        total_water_discharge_from_water_stress_area_by_business_operation
      );
      setWaterDischargeByBusinessOperation(
        total_fresh_water_discharge_by_business_operation
      );
      setWaterDischargeByWaterTypeFromWaterStress(
        total_water_discharge_by_water_type_from_water_stress_area
      );
      setThirdPartyWaterDischargeForOtherOrganizations(
        third_party_water_discharge_sent_to_use_for_other_organizations
      );
      setChangeInWaterStorage(change_in_water_storage);

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
          organisation: response.data[0].id,
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
          const response = await axiosInstance.get(`/corporate/`, {
            params: { organization_id: selectedOrg },
          });
          setCorporates(response.data);
        } catch (e) {
          if (e.status === 404) {
            setCorporates([]);
          } else {
            console.error("Failed fetching corporates:", e);
          }
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
          setSelectedLocation([]);
        }
      }
    };

    fetchLocation();
  }, [selectedCorp]);

  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setSelectedSetLocation("");

    setDatasetparams((prevParams) => ({
      ...prevParams,
      organisation: newOrg,
      corporate: "",
      location: "",
    }));
    if (!newOrg) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: "Please select Organisation",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        organization: "",
      }));
    }
  };

  const handleOrgChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setSelectedSetLocation("");

    setDatasetparams((prevParams) => ({
      ...prevParams,
      corporate: newCorp,
      location: "",
    }));
    if (!newCorp) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: "Please select Corporate",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        corporate: "",
      }));
    }
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedSetLocation(newLocation);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      location: newLocation,
    }));
    if (!newLocation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Please select Location",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "",
      }));
    }
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
      <div>
        <div className="mb-2 flex-col items-center xl:pt-4  gap-6">
          <div className="mt-4 pb-3 xl:mx-5 lg:mx-5 md:mx-5 2xl:mx-5 4k:mx-5 2k:mx-5 mx-2  text-left">
            <div className="mb-2 flex-col items-center pt-2  gap-6">
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="text-zinc-600 text-[12px]  font-semibold font-['Manrope']">
                  View By:
                </div>
                <div className="rounded-lg shadow  justify-start items-start flex">
                  <div
                    className={`w-[111px] px-4 py-2.5 border rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Organization"
                        ? "bg-[#d2dfeb]"
                        : "bg-white"
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
                className={`grid grid-cols-1 md:grid-cols-4 xl:w-[80%] lg:w-[80%] 2xl:w-[80%] md:w-[100%] 4k:w-[80%] 2k:w-[80%] w-[100%] mb-2 pt-4 ${
                  reportType !== "" ? "visible" : "hidden"
                }`}
              >
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal ml-1"
                  >
                    Select Organization*
                  </label>
                  <div className="mt-2 relative">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none"
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
                    <div className='absolute right-2 top-2 pointer-events-none'>
                      <MdKeyboardArrowDown className='text-neutral-500' style={{ fontSize: '16px' }} />
                    </div>
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
                    <div className="mt-2 relative">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none"
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
                      <div className='absolute right-2 top-2 pointer-events-none'>
                        <MdKeyboardArrowDown className='text-neutral-500' style={{ fontSize: '16px' }} />
                      </div>
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
                    <div className="mt-2 relative">
                      <select
                        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-8 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 appearance-none"
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
                      <div className='absolute right-2 top-2 pointer-events-none'>
                        <MdKeyboardArrowDown className='text-neutral-500' style={{ fontSize: '16px' }} />
                      </div>
                      {errors.location && (
                        <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                          {errors.location}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal ml-1"
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
        <div className="xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block">
          <div className="flex-1 ps-4 me-4 max-w-full overflow-hidden">
            <div className="mb-6">
              <div
                id="watereffluents1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1"> Total Water Consumption</p>
                <div className="flex gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 303-5a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 303-5b
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns1} data={waterConsumption} />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents2"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Total Water Consumption in water stress areas
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-5b
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns2}
                data={waterConsumptionInWaterStress}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Total Water Consumption by business operation
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-1a
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns3}
                data={waterConsumptionByBusinessOperation}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents4"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Total Water Consumption by Location
                </p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-5
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns4}
                data={waterConsumptionByLocation}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents5"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">Total Water Consumption by source</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-5a
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns5}
                data={waterConsumptionBySource}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents6"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Total Fresh Water withdrawal by business operation
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-1a
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns6}
                data={freshWaterWithdrawalByBusinessOperation}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents7"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  Total Fresh Water withdrawal by source (from water stress
                  area)
                </p>
                <div className="flex gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 303-3b
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 303-5b
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns7}
                data={freshWaterWithdrawalBySourceInWaterStress}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents8"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Total Fresh Water withdrawal by Location/Country
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-3
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns8}
                data={freshWaterWithdrawalByLocation}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents9"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Total Water withdrawal by Water type
                </p>
                <div className="flex gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 303-3a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 303-3c
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns9}
                data={waterWithdrawalByWaterType}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents10"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Water withdrawal from third-parties
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-3b
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns10}
                data={waterWithdrawalFromThirdParties}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents11"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">Total Water Discharge by Location</p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-4
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns11}
                data={waterDischargeByLocation}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents12"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Total Water Discharge by source and type of water
                </p>

                <div className="flex gap-2">
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 303-4a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 303-4b
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns12}
                data={waterDischargeBySourceAndType}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents13"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  Total Water Discharge (from water stress area) by Business
                  Operation
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-1a
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns13}
                data={waterDischargeFromWaterStressByBusinessOperation}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents14"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  {" "}
                  Total Water Discharge by Business Operation
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-1a
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns14}
                data={waterDischargeByBusinessOperation}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents15"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  Total Water Discharge by Water type (from water stress area)
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-4c
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns15}
                data={waterDischargeByWaterTypeFromWaterStress}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents16"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1">
                  Third-party Water discharge sent to use for other
                  organizations
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-4a
                  </div>
                </div>
              </div>
              <DynamicTable
                columns={columns16}
                data={thirdPartyWaterDischargeForOtherOrganizations}
              />
            </div>
            <div className="mb-6">
              <div
                id="watereffluents17"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 xl:flex md:flex lg:flex 2xl:flex 4k:flex 2k:flex block justify-between items-center"
              >
                <p className="mb-2 ml-1"> Change in water storage</p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 303-5c
                  </div>
                </div>
              </div>
              <DynamicTable columns={columns17} data={changeInWaterStorage} />
            </div>
          </div>
          <div
            style={{
              position: `${isBoxOpen ? "unset" : "sticky"}`,
              top: "10rem",
              // zIndex: "0",
              height: "fit-content",
              backgroundColor: "white",
              paddingBottom: "1rem",
            }}
            className="mb-8 me-2 hidden xl:block lg:block md:hidden 2xl:block 4k:block 2k:block"
          >
            <TableSidebar />
          </div>
        </div>
      </div>
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-[100]">
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

export default AnalyseWaterEffluents;
