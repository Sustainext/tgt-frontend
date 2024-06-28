'use client'
import { useState, useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import TableSidebar from "./TableSidebar";
import DynamicTable from "./customTable";
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
  columns14,
  data14,
  columns15,
  data15,
  columns16,
  data16,
  columns17,
  data17,
} from "./data";

const AnalyseWaterEffluents = ({ isBoxOpen }) => {
  const [organisations, setOrganisations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [collapsed, setCollapsed] = useState(false);
  const [reportType, setReportType] = useState("Organization");

  const [waterConsumption, setWaterConsumption] = useState([]);
  const [waterConsumptionInWaterStress, setWaterConsumptionInWaterStress] = useState([]);
  const [waterConsumptionByBusinessOperation, setWaterConsumptionByBusinessOperation] = useState([]);
  const [waterConsumptionByLocation, setWaterConsumptionByLocation] = useState([]);
  const [waterConsumptionBySource, setWaterConsumptionBySource] = useState([]);
  const [freshWaterWithdrawalByBusinessOperation, setFreshWaterWithdrawalByBusinessOperation] = useState([]);
  const [freshWaterWithdrawalBySourceInWaterStress, setFreshWaterWithdrawalBySourceInWaterStress] = useState([]);
  const [freshWaterWithdrawalByLocation, setFreshWaterWithdrawalByLocation] = useState([]);
  const [waterWithdrawalByWaterType, setWaterWithdrawalByWaterType] = useState([]);
  const [waterWithdrawalFromThirdParties, setWaterWithdrawalFromThirdParties] = useState([]);
  const [waterDischargeByLocation, setWaterDischargeByLocation] = useState([]);
  const [waterDischargeBySourceAndType, setWaterDischargeBySourceAndType] = useState([]);
  const [waterDischargeFromWaterStressByBusinessOperation, setWaterDischargeFromWaterStressByBusinessOperation] = useState([]);
  const [waterDischargeByBusinessOperation, setWaterDischargeByBusinessOperation] = useState([]);
  const [waterDischargeByWaterTypeFromWaterStress, setWaterDischargeByWaterTypeFromWaterStress] = useState([]);
  const [thirdPartyWaterDischargeForOtherOrganizations, setThirdPartyWaterDischargeForOtherOrganizations] = useState([]);
  const [changeInWaterStorage, setChangeInWaterStorage] = useState([]);

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
        `/sustainapp/get_water_analysis`,
        {
          params: params,
        }
      );
  
      const data = response.data;
      console.log(data, "testing");
  
      const {
        water_consumption_by_location,
        water_consumption_by_source,
        fresh_water_withdrawal_by_business_operation,
        fresh_water_withdrawal_by_source_in_water_stress,
        fresh_water_withdrawal_by_location,
        water_withdrawal_by_water_type,
        water_withdrawal_from_third_parties,
        water_discharge_by_location,
        water_discharge_by_source_and_type,
        water_discharge_from_water_stress_by_business_operation,
        water_discharge_by_business_operation,
        water_discharge_by_water_type_from_water_stress,
        third_party_water_discharge_for_other_organizations,
        change_in_water_storage,
      } = data;
  
      const removeAndStoreLastObject = (array) => {
        if (array.length > 0) {
          return array.pop();
        } else {
          return null;
        }
      };
  
      // Handle water consumption by location
      const water_consumption_by_location_total = removeAndStoreLastObject(
        water_consumption_by_location
      );
      water_consumption_by_location.push({
        Location: "Total",
        Quantity: water_consumption_by_location_total.Total,
        Unit: water_consumption_by_location_total.Unit,
      });
      setWaterConsumptionByLocation(water_consumption_by_location);
  
      // Handle water consumption by source
      const water_consumption_by_source_total = removeAndStoreLastObject(
        water_consumption_by_source
      );
      water_consumption_by_source.push({
        Source: "Total",
        Quantity: water_consumption_by_source_total.Total,
        Unit: water_consumption_by_source_total.Unit,
      });
      setWaterConsumptionBySource(water_consumption_by_source);
  
      // Handle fresh water withdrawal by business operation
      const fresh_water_withdrawal_by_business_operation_total =
        removeAndStoreLastObject(fresh_water_withdrawal_by_business_operation);
      fresh_water_withdrawal_by_business_operation.push({
        Business_Operation: "Total",
        Quantity: fresh_water_withdrawal_by_business_operation_total.Total,
        Unit: fresh_water_withdrawal_by_business_operation_total.Unit,
      });
      setFreshWaterWithdrawalByBusinessOperation(fresh_water_withdrawal_by_business_operation);
  
      // Handle fresh water withdrawal by source in water-stressed areas
      const fresh_water_withdrawal_by_source_in_water_stress_total =
        removeAndStoreLastObject(fresh_water_withdrawal_by_source_in_water_stress);
      fresh_water_withdrawal_by_source_in_water_stress.push({
        Source: "Total",
        Quantity: fresh_water_withdrawal_by_source_in_water_stress_total.Total,
        Unit: fresh_water_withdrawal_by_source_in_water_stress_total.Unit,
      });
      setFreshWaterWithdrawalBySourceInWaterStress(fresh_water_withdrawal_by_source_in_water_stress);
  
      // Handle fresh water withdrawal by location
      const fresh_water_withdrawal_by_location_total =
        removeAndStoreLastObject(fresh_water_withdrawal_by_location);
      fresh_water_withdrawal_by_location.push({
        Location: "Total",
        Quantity: fresh_water_withdrawal_by_location_total.Total,
        Unit: fresh_water_withdrawal_by_location_total.Unit,
      });
      setFreshWaterWithdrawalByLocation(fresh_water_withdrawal_by_location);
  
      // Handle water withdrawal by water type
      const water_withdrawal_by_water_type_total = removeAndStoreLastObject(
        water_withdrawal_by_water_type
      );
      water_withdrawal_by_water_type.push({
        Water_Type: "Total",
        Quantity: water_withdrawal_by_water_type_total.Total,
        Unit: water_withdrawal_by_water_type_total.Unit,
      });
      setWaterWithdrawalByWaterType(water_withdrawal_by_water_type);
  
      // Handle water withdrawal from third parties
      const water_withdrawal_from_third_parties_total = removeAndStoreLastObject(
        water_withdrawal_from_third_parties
      );
      water_withdrawal_from_third_parties.push({
        Source: "Total",
        Quantity: water_withdrawal_from_third_parties_total.Total,
        Unit: water_withdrawal_from_third_parties_total.Unit,
      });
      setWaterWithdrawalFromThirdParties(water_withdrawal_from_third_parties);
  
      // Handle water discharge by location
      const water_discharge_by_location_total = removeAndStoreLastObject(
        water_discharge_by_location
      );
      water_discharge_by_location.push({
        Location: "Total",
        Quantity: water_discharge_by_location_total.Total,
        Unit: water_discharge_by_location_total.Unit,
      });
      setWaterDischargeByLocation(water_discharge_by_location);
  
      // Handle water discharge by source and type of water
      const water_discharge_by_source_and_type_total = removeAndStoreLastObject(
        water_discharge_by_source_and_type
      );
      water_discharge_by_source_and_type.push({
        Source: "Total",
        Type: "Total",
        Quantity: water_discharge_by_source_and_type_total.Total,
        Unit: water_discharge_by_source_and_type_total.Unit,
      });
      setWaterDischargeBySourceAndType(water_discharge_by_source_and_type);
  
      // Handle water discharge from water-stressed areas by business operation
      const water_discharge_from_water_stress_by_business_operation_total =
        removeAndStoreLastObject(
          water_discharge_from_water_stress_by_business_operation
        );
      water_discharge_from_water_stress_by_business_operation.push({
        Business_Operation: "Total",
        Quantity: water_discharge_from_water_stress_by_business_operation_total.Total,
        Unit: water_discharge_from_water_stress_by_business_operation_total.Unit,
      });
      setWaterDischargeFromWaterStressByBusinessOperation(
        water_discharge_from_water_stress_by_business_operation
      );
  
      // Handle water discharge by business operation
      const water_discharge_by_business_operation_total = removeAndStoreLastObject(
        water_discharge_by_business_operation
      );
      water_discharge_by_business_operation.push({
        Business_Operation: "Total",
        Quantity: water_discharge_by_business_operation_total.Total,
        Unit: water_discharge_by_business_operation_total.Unit,
      });
      setWaterDischargeByBusinessOperation(water_discharge_by_business_operation);
  
      // Handle water discharge by water type from water-stressed areas
      const water_discharge_by_water_type_from_water_stress_total =
        removeAndStoreLastObject(water_discharge_by_water_type_from_water_stress);
      water_discharge_by_water_type_from_water_stress.push({
        Water_Type: "Total",
        Quantity: water_discharge_by_water_type_from_water_stress_total.Total,
        Unit: water_discharge_by_water_type_from_water_stress_total.Unit,
      });
      setWaterDischargeByWaterTypeFromWaterStress(water_discharge_by_water_type_from_water_stress);
  
      // Handle third-party water discharge for other organizations
      const third_party_water_discharge_for_other_organizations_total =
        removeAndStoreLastObject(third_party_water_discharge_for_other_organizations);
      third_party_water_discharge_for_other_organizations.push({
        Organization: "Total",
        Quantity: third_party_water_discharge_for_other_organizations_total.Total,
        Unit: third_party_water_discharge_for_other_organizations_total.Unit,
      });
      setThirdPartyWaterDischargeForOtherOrganizations(
        third_party_water_discharge_for_other_organizations
      );
  
      // Handle change in water storage
      const change_in_water_storage_total = removeAndStoreLastObject(
        change_in_water_storage
      );
      change_in_water_storage.push({
        Change_Type: "Total",
        Quantity: change_in_water_storage_total.Total,
        Unit: change_in_water_storage_total.Unit,
      });
      setChangeInWaterStorage(change_in_water_storage);
  
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
    }
  };
  


  // Fetching organisations and corporates
  useEffect(() => {
    const fetchOrganisations = async () => {
      const response = await fetch("/api/organisations");
      const data = await response.json();
      setOrganisations(data);
    };

    const fetchCorporates = async () => {
      const response = await fetch("/api/corporates");
      const data = await response.json();
      setCorporates(data);
    };

    fetchOrganisations();
    fetchCorporates();
  }, []);

  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  return (
    <div>
      <div className="mb-2 flex-col items-center py-4 px-3 gap-6">
        <div className="justify-start items-center gap-4 inline-flex my-6">
          <div className="text-zinc-600 text-[13px] font-semibold font-['Manrope']">
            Report By:
          </div>
          <div className="w-[292px] rounded-lg shadow border border-gray-300 justify-start items-start flex">
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
              className={`w-[95px] px-4 py-2.5 border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                }`}
              onClick={() => handleReportTypeChange("Corporate")}
            >
              <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
                Corporate
              </div>
            </div>
            <div
              className={`w-[86px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${reportType === "Location" ? "bg-sky-100" : "bg-white"
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
          className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-4 p-4 ${reportType !== "" ? "visible" : "hidden"
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
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <option value="">--Select Organization--- </option>
                {organisations?.map((org) => (
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
                  onChange={(e) => setSelectedCorp(e.target.value)}
                >
                  <option value="">--Select Corporate--- </option>
                  {corporates?.map((corp) => (
                    <option key={corp.id} value={corp.name}>
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
                <select className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="">--Select Location--- </option>
                  {/* Add locations dropdown options here */}
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
              <div className="border border-neutral-300 w-[208.52px] h-8 px-1.5 bg-white rounded justify-start items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 h-[32px] justify-start items-center flex">
                  <div className="grow shrink basis-0 h-7 px-0.5 pt-[4px] pb-[5px] justify-start items-start flex">
                    <div className="text-neutral-500 text-[14px] font-normal font-['Manrope']">
                      30/05/2023 - 05/06/2023
                    </div>
                  </div>
                </div>
                <div className="w-3.5 h-3.5">
                  <AiOutlineCalendar style={{ zIndex: "-10px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between" >
        <div className={`ps-4 ${collapsed ? "w-[81%]" : "w-[78%]"} me-4`}>
          <div className="mb-6">
            <div
              id="watereffluents1"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Total Water Consumption
              </p>
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
            <DynamicTable columns={columns1} data={data1} />
          </div>
          <div className="mb-6">
            <div
              id="watereffluents2"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Total Water Consumption in water stress areas
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 303-5b
                </div>
              </div>
            </div>
            <DynamicTable columns={columns2} data={data2} />
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
            <DynamicTable columns={columns3} data={data3} />
          </div>
          <div className="mb-6">
            <div
              id="watereffluents4"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Total Water Consumption by Location
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 303-5
                </div>
              </div>
            </div>
            <DynamicTable columns={columns4} data={data4} />
          </div>
          <div className="mb-6">
            <div
              id="watereffluents5"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Total Water Consumption by source
              </p>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 303-5a
                </div>
              </div>
            </div>
            <DynamicTable columns={columns5} data={data5} />
          </div>
          <div className="mb-6">
            <div
              id="watereffluents6"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>
                Total Fresh Water withdrawal by business operation
              </p>


              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 303-1a
                </div>
              </div>


            </div>
            <DynamicTable columns={columns6} data={data6} />
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
            <DynamicTable columns={columns7} data={data7} />
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
            <DynamicTable columns={columns8} data={data8} />
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
            <DynamicTable columns={columns9} data={data9} />
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
            <DynamicTable columns={columns10} data={data10} />
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
            <DynamicTable columns={columns11} data={data11} />
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
            <DynamicTable columns={columns12} data={data12} />
          </div>
          <div className="mb-6">
            <div
              id="watereffluents13"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Discharge (from water stress area) by Business Operation</p>


              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 303-1a
                </div>
              </div>




            </div>
            <DynamicTable columns={columns13} data={data13} />
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
            <DynamicTable columns={columns14} data={data14} />
          </div>
          <div className="mb-6">
            <div
              id="watereffluents15"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Total Water Discharge by Water type (from water stress area)</p>


              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 303-4c
                </div>
              </div>




            </div>
            <DynamicTable columns={columns15} data={data15} />
          </div>
          <div className="mb-6">
            <div
              id="watereffluents16"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
            >
              <p>Third-party Water discharge sent to use for other organizations</p>


              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 303-4a
                </div>
              </div>




            </div>
            <DynamicTable columns={columns16} data={data16} />
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
            <DynamicTable columns={columns17} data={data17} />
          </div>
        </div>
<div className=" relative " >
<div
         style={{
          position: `${isBoxOpen ? "unset" : "sticky"}`,
          top: '10rem',
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
