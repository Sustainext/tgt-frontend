"use client";
import { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
import DateRangePicker from "@/app/utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import {
  columns1,
  data1,
  columns2,
  data2,
  columns3,
  data3,
  columns4,
  data4,
  columns5,
  data5,
  columns6,
  data6,
  columns7,
  data7,
  columns8,
  data8,
  columns9,
  data9,
  columns10,
  data10,
  columns11,
  data11,
  columns12,
  data12,
  columns13,
  data13,
} from "./data";

const AnalyseEnergy = ({ isBoxOpen }) => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    location: "",
    start: null,
    end: null,
  });

  // States for each table's data
  const [fuelConsumptionRenewable, setFuelConsumptionRenewable] = useState([]);
  const [fuelConsumptionNonRenewable, setFuelConsumptionNonRenewable] =
    useState([]);
  const [energyWithinOrganization, setEnergyWithinOrganization] = useState([]);
  const [directFromRenewable, setDirectFromRenewable] = useState([]);
  const [directFromNonRenewable, setDirectFromNonRenewable] = useState([]);
  const [selfGenFromRenewable, setSelfGenFromRenewable] = useState([]);
  const [selfGenFromNonRenewable, setSelfGenFromNonRenewable] = useState([]);
  const [energySoldRenewable, setEnergySoldRenewable] = useState([]);
  const [energySoldNonRenewable, setEnergySoldNonRenewable] = useState([]);
  const [energyOutsideOrganization, setEnergyOutsideOrganization] = useState(
    []
  );
  const [energyIntensity, setEnergyIntensity] = useState([]);
  const [reductionOfEnergy, setReductionOfEnergy] = useState([]);
  const [reductionInEnergyOfPS, setReductionInEnergyOfPS] = useState([]);

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
      setIsDateRangeValid(true);
    }
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_energy_analysis`,
        {
          params: params,
        }
      );

      const data = response.data;
      console.log(data, "testing");

      const {
        fuel_consumption_from_renewable,
        fuel_consumption_from_non_renewable,
        energy_consumption_within_the_org,
        direct_purchased_from_renewable,
        direct_purchased_from_non_renewable,
        self_generated_from_renewable,
        self_generated_from_non_renewable,
        energy_sold_from_renewable,
        energy_sold_from_non_renewable,
        energy_consumption_outside_the_org,
        energy_intensity,
        reduction_of_ene_consump,
        reduction_of_ene_prod_and_services
      } = data;

      const removeAndStoreLastObject = (array) => {
        if (array.length > 0) {
          return array.pop();
        } else {
          return null;
        }
      };

      const fuel_consumption_from_renewable_total = removeAndStoreLastObject(
        fuel_consumption_from_renewable
      );
      fuel_consumption_from_renewable.push({
        "Energy_type": "Total Renewable Energy consumption",
        "Source": "",
        "Quantity": fuel_consumption_from_renewable_total.Total,
        "Unit": fuel_consumption_from_renewable_total.Unit
      });
      setFuelConsumptionRenewable(fuel_consumption_from_renewable);
      

      const fuel_consumption_from_non_renewable_total =
        removeAndStoreLastObject(fuel_consumption_from_non_renewable);
      const energy_consumption_within_the_org_total = removeAndStoreLastObject(
        energy_consumption_within_the_org
      );
      const direct_purchased_from_renewable_total = removeAndStoreLastObject(
        direct_purchased_from_renewable
      );
      const direct_purchased_from_non_renewable_total =
        removeAndStoreLastObject(direct_purchased_from_non_renewable);
      const self_generated_from_renewable_total = removeAndStoreLastObject(
        self_generated_from_renewable
      );
      const self_generated_from_non_renewable_total = removeAndStoreLastObject(
        self_generated_from_non_renewable
      );
      const energy_sold_from_renewable_total = removeAndStoreLastObject(
        energy_sold_from_renewable
      );
      const energy_sold_from_non_renewable_total = removeAndStoreLastObject(
        energy_sold_from_non_renewable
      );
      const energy_consumption_outside_the_org_total = removeAndStoreLastObject(
        energy_consumption_outside_the_org
      );
      const energy_intensity_total = removeAndStoreLastObject(energy_intensity);
      const reduction_of_ene_consump_total = removeAndStoreLastObject(reduction_of_ene_consump);
      const reduction_of_ene_prod_and_services_total = removeAndStoreLastObject(reduction_of_ene_prod_and_services);

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
        setSelectedOrg(response.data[0].id);
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
    // setScopeData([]);
    // setSourceData([]);
    // setLocationData([]);

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
      <div className="mt-4 pb-3 mx-5 text-left">
        <div className="mb-2 flex-col items-center py-4 px-3 gap-6">
          <div className="justify-start items-center gap-4 inline-flex my-6">
            <div className="text-zinc-600 text-[13px] font-semibold font-['Manrope']">
              View By:
            </div>
            <div className="w-[292px] rounded-lg shadow border border-gray-300 justify-start items-start flex">
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
                className={`w-[95px] px-4 py-2.5 border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                  reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                }`}
                onClick={() => handleReportTypeChange("Corporate")}
              >
                <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
                  Corporate
                </div>
              </div>
              <div
                className={`w-[86px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
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
      <div className="flex justify-between">
        <div className={`ps-4 w-[78%] me-4`}>
          <div className="mb-6">
            <div
              id="fuelFromRenewable"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Fuel Consumption within the organisation from Renewable sources
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1a
                </div>
              </div>
            </div>
            <DynamicTable columns={columns1} data={fuelConsumptionRenewable} />
          </div>
          <div className="mb-6">
            <div
              id="fuelFromNonRenewable"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Fuel Consumption within the organisation from Non-renewable
                sources
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1b
                </div>
              </div>
            </div>
            <DynamicTable columns={columns2} data={data2} />
          </div>
          <div className="mb-6">
            <div
              id="EnergyWithinOrganization"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Energy Consumption Within the organisation</p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1e
                </div>
              </div>
            </div>
            <DynamicTable columns={columns3} data={data3} />
          </div>
          <div className="mb-6">
            <div
              id="DirectFromRenewable"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Direct Purchased Heating, Cooling, Electricity and Steam from
                renewable sources
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1
                </div>
              </div>
            </div>
            <DynamicTable columns={columns4} data={data4} />
          </div>
          <div className="mb-6">
            <div
              id="DirectFromNonRenewable"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Direct Purchased Heating, Cooling, Electricity and Steam from
                non-renewable sources
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1
                </div>
              </div>
            </div>
            <DynamicTable columns={columns5} data={data5} />
          </div>
          <div className="mb-6">
            <div
              id="SelfGenFromRenewable"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Self Generated Energy - not consumed or sold (Renewable Energy)
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1
                </div>
              </div>
            </div>
            <DynamicTable columns={columns6} data={data6} />
          </div>
          <div className="mb-6">
            <div
              id="SelfGenFromNonRenewable"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Self Generated Energy - not consumed or sold (non-renewable
                Energy)
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1
                </div>
              </div>
            </div>
            <DynamicTable columns={columns7} data={data7} />
          </div>
          <div className="mb-6">
            <div
              id="EnergySoldRenewable"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Energy Sold (Renewable energy)</p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1d
                </div>
              </div>
            </div>
            <DynamicTable columns={columns8} data={data8} />
          </div>
          <div className="mb-6">
            <div
              id="EnergySoldNonRenewable"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Energy Sold (non-renewable energy)</p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-1d
                </div>
              </div>
            </div>
            <DynamicTable columns={columns9} data={data9} />
          </div>
          <div className="mb-6">
            <div
              id="EnergyOutsideOrganization"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Energy Consumption outside of the organization</p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-2a
                </div>
              </div>
            </div>
            <DynamicTable columns={columns10} data={data10} />
          </div>
          <div className="mb-6">
            <div
              id="EnergyIntensity"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Energy Intensity</p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 302-3a
                </div>
              </div>
            </div>
            <DynamicTable columns={columns13} data={data13} />
          </div>
          <div className="mb-6">
            <div
              id="ReductionOfEnergy"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Reduction of energy consumption</p>
              <div className="">
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 302-5a
                  </div>
                </div>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 302-5b
                  </div>
                </div>
              </div>
            </div>
            <DynamicTable columns={columns11} data={data11} />
          </div>
          <div className="mb-6">
            <div
              id="ReductionInEnergyOfPS"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Reductions in energy requirements of products and services</p>
              <div className="">
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 302-4a
                  </div>
                </div>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 302-4b
                  </div>
                </div>
              </div>
            </div>
            <DynamicTable columns={columns12} data={data12} />
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
          className="me-8 mb-8 -right-2"
        >
          <TableSidebar />
        </div>
      </div>
    </div>
  );
};

export default AnalyseEnergy;
