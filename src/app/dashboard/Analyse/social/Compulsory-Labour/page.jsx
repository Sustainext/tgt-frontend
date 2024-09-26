"use client";
import { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import DateRangePicker from "../../../../utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2 } from "./data";
import { Oval } from 'react-loader-spinner';
const AnalyseCompulsorylabour = ({ isBoxOpen }) => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [compulsaryLabour1, setCompulsaryLabour1] = useState([]);
  const [compulsaryLabour2, setCompulsaryLabour2] = useState([]);
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
    setCompulsaryLabour1([]);
    setCompulsaryLabour2([]);
    try {
      const response = await axiosInstance.get(
        `sustainapp/get_forced_labor_analysis`,
        {
          params: params,
        }
      );

      const data = response.data;
      console.log(data, "testing");

      function formatArray1(operations) {
        return operations.map((operation, index) => ({
          "Operations considered to have significant risk for incidents of forced or compulsory labor": operation.childlabor,
          "Type of Operation": operation.TypeofOperation,
          "Countries or Geographic Areas": operation.geographicareas,
        }));
      }

      function formatArray2(operations) {
        return operations.map((operation, index) => ({
          "Suppliers considered to have significant risk for incidents of forced or compulsory labor": operation.compulsorylabor,
          "Type of Supplier": operation.TypeofOperation,
          "Countries or Geographic Areas": operation.geographicareas,
        }));
      }

      const {
        operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor,
        suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor,
      } = data;

      const operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor_formatted =
        formatArray1(
          operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor
        );
      setCompulsaryLabour1(
        operations_considered_to_have_significant_risk_for_incidents_of_forced_or_compulsary_labor_formatted
      );

      const suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor_formatted = formatArray2(
        suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor
      );
      setCompulsaryLabour2(
        suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor_formatted
      );

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
    setCompulsaryLabour1([]);
    setCompulsaryLabour2([]);

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
              <div className="text-zinc-600 text-[12px] font-semibold font-['Manrope']">
                View By:
              </div>
              <div className="rounded-lg shadow border border-gray-300 justify-start items-start flex">
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    reportType === "Organization" ? "bg-sky-100" : "bg-white"
                  }`}
                  onClick={() => handleReportTypeChange("Organization")}
                >
                  <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Organization
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                  }`}
                  onClick={() => handleReportTypeChange("Corporate")}
                >
                  <div className="text-slate-700 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Corporate
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    reportType === "Location" ? "bg-sky-100" : "bg-white"
                  }`}
                  onClick={() => handleReportTypeChange("Location")}
                >
                  <div className="text-slate-700 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Location
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4 ${
                reportType !== "" ? "visible" : "hidden"
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
                </div>
              </div>
              {(reportType === "Corporate" || reportType === "Location") && (
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal"
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
                  </div>
                </div>
              )}
              {reportType === "Location" && (
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[12px] font-normal"
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
                    <div className="text-red-600 text-[12px] mt-2">
                      Please select a valid date range.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
      <div className={`ps-4 w-[100%] me-4`}>
          <div className="mb-6">
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <p>
                  Operations considered to have significant risk for incidents
                  of forced or compulsary labor
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 409-1a
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <DynamicTable2 columns={columns1} data={compulsaryLabour1} />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div
              id="ep2"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
            >
              <div className="flex justify-between items-center mb-2">
                <p>
                  Suppliers at significant risk for incidents of forced or
                  compulsory labor
                </p>

                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 409-1a
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <DynamicTable2 columns={columns2} data={compulsaryLabour2} />
            </div>
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
          className=" mb-8 me-2"
        >
          <TableSidebar />
        </div>
      </div>
      {loopen && (
          <div className=" fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
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
    </div>
  );
};

export default AnalyseCompulsorylabour;
