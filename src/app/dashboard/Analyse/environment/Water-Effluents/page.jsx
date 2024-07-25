"use client";
import { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
import DateRangePicker from "@/app/utils/DatePickerComponent";
import axiosInstance from "@/app/utils/axiosMiddleware";
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
  const [changeInWaterStorage, setChangeInWaterStorage] = useState([]);

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
        `/sustainapp/get_water_analysis`,
        {
          params: params,
        }
      );

      const data = response.data;
      console.log(data, "testing");

      const {
        total_water_consumption,
        total_water_consumption_in_water_stress_areas,
        total_water_consumption_by_business_operation,
        total_water_consumption_by_location,
        total_water_consumption_by_source,
        total_fresh_water_withdrawal_by_business_operation,
        total_fresh_water_withdrawal_by_source_from_water_stress_area,
        total_fresh_water_withdrawal_by_location_country,
        total_water_withdrawal_by_water_type,
        water_withdrawal_from_third_parties,
        total_water_discharge_by_location,
        total_water_discharge_by_source_and_type_of_water,
        total_water_discharge_from_water_stress_area_by_business_operation,
        total_water_discharge_by_business_operation,
        total_water_discharge_by_water_type_from_water_stress_area,
        third_party_water_discharge_sent_to_use_for_other_organizations,
        change_in_water_storage,
      } = data;

      setWaterConsumption(total_water_consumption);
      setWaterConsumptionInWaterStress(
        total_water_consumption_in_water_stress_areas
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
        total_fresh_water_withdrawal_by_source_from_water_stress_area
      );
      setFreshWaterWithdrawalByLocation(
        total_fresh_water_withdrawal_by_location_country
      );
      setWaterWithdrawalByWaterType(total_water_withdrawal_by_water_type);
      setWaterWithdrawalFromThirdParties(water_withdrawal_from_third_parties);
      setWaterDischargeByLocation(total_water_discharge_by_location);
      setWaterDischargeBySourceAndType(
        total_water_discharge_by_source_and_type_of_water
      );
      setWaterDischargeFromWaterStressByBusinessOperation(
        total_water_discharge_from_water_stress_area_by_business_operation
      );
      setWaterDischargeByBusinessOperation(
        total_water_discharge_by_business_operation
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
          setSelectedLocation([]);
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

    setDatasetparams((prevParams) => ({
      ...prevParams,
      organisation: newOrg,
      corporate: "",
      location: "",
    }));
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
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
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
    <div>
     <div className="mb-2 flex-col items-center pt-4  gap-6">
        <div className="mt-4 pb-3 mx-5 text-left">
          <div className="mb-2 flex-col items-center pt-2  gap-6">
            <div className="justify-start items-center gap-4 inline-flex">
              <div className="text-zinc-600 text-[15px] font-semibold font-['Manrope']">
                View By:
              </div>
              <div className="rounded-lg shadow border border-gray-300 justify-start items-start flex">
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Organization" ? "bg-sky-100" : "bg-white"
                    }`}
                  onClick={() => handleReportTypeChange("Organization")}
                >
                  <div className="text-slate-800 text-[13px] font-medium font-['Manrope'] leading-tight">
                    Organization
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                    }`}
                  onClick={() => handleReportTypeChange("Corporate")}
                >
                  <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
                    Corporate
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Location" ? "bg-sky-100" : "bg-white"
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
              className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4 ${reportType !== "" ? "visible" : "hidden"
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
                    <option value="01">--Select Organization--- </option>
                    {organisations &&
                      organisations.map((org) => (
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
                      {corporates &&
                        corporates.map((corp) => (
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
                      {selectedLocation &&
                        selectedLocation.map((location) => (
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

      </div>
      <div className="flex justify-between">
        <div className={`ps-4 ${collapsed ? "w-[81%]" : "w-[78%]"} me-4`}>
          <div className="mb-6">
            <div
              id="watereffluents1"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Consumption</p>
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Consumption in water stress areas</p>
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p> Total Water Consumption by business operation</p>
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Consumption by Location</p>
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Consumption by source</p>
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Fresh Water withdrawal by business operation</p>

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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Total Fresh Water withdrawal by source (from water stress area)
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Fresh Water withdrawal by Location/Country</p>

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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water withdrawal by Water type</p>
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Water withdrawal from third-parties</p>

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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Discharge by Location</p>

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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Discharge by source and type of water</p>

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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Discharge by Business Operation</p>

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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Third-party Water discharge sent to use for other organizations
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
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p> Change in water storage</p>

              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 303-5c
                </div>
              </div>
            </div>
            <DynamicTable columns={columns17} data={changeInWaterStorage} />
          </div>
        </div>
        <div className=" relative ">
          <div
            style={{
              position: `${isBoxOpen ? "unset" : "sticky"}`,
              top: "10rem",
              height: "fit-content",
              backgroundColor: "white",
            }}
            className="me-8  -right-2"
          >
            <TableSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyseWaterEffluents;