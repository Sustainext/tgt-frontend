"use client";
import { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table";
import DateRangePicker from "../../../../utils/DatePickerComponent"; // Ensure the correct path
import { columns1, columns2 } from "./data"; // Assuming these are correct
import { Oval } from "react-loader-spinner";
const AnalyseCollectiveBargaining = ({ isBoxOpen }) => {
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSetLocation, setSelectedSetLocation] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [organisations, setOrganisations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    location: "",
    start: null,
    end: null,
  });
  const [errors, setErrors] = useState({});
  const [operationBargainingData, setOperationBargainingData] = useState([]);
  const [supplierBargainingData, setSupplierBargainingData] = useState([]);

  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const validateForm = () => {
    const newErrors = {};

    if (
      !selectedOrg &&
      (reportType === "Organization" || reportType === "Corporate")
    ) {
      newErrors.selectedOrg = "Organization is required";
    }
    if (!selectedCorp && reportType === "Corporate") {
      newErrors.selectedCorp = "Corporate is required";
    }
    if (!selectedSetLocation && reportType === "Location") {
      newErrors.selectedLocation = "Location is required";
    }
    if (!dateRange.start || !dateRange.end) {
      newErrors.dateRange = "Please select a valid date range";
    } else if (new Date(dateRange.start) >= new Date(dateRange.end)) {
      newErrors.dateRange = "Start date must be before the end date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchData = async () => {
    if (!validateForm()) return;
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `sustainapp/get_collective_bargaining_analysis`,
        {
          params: datasetparams,
        }
      );
      const { operation_bargaining, supplier_bargaining } = response.data;
      setOperationBargainingData(operation_bargaining);
      setSupplierBargainingData(supplier_bargaining);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (validateForm()) {
      fetchData();
    }
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

    if (organisations.length === 0) {
      fetchOrg();
    }
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      const fetchCorporates = async () => {
        try {
          const response = await axiosInstance.get(`/corporate/`, {
            params: { organization_id: selectedOrg },
          });
          setCorporates(response.data);
        } catch (e) {
          console.error("Failed fetching corporates:", e);
        }
      };

      fetchCorporates();
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedCorp) {
      const fetchLocation = async () => {
        try {
          const response = await axiosInstance.get(`/sustainapp/get_location/`);
          setSelectedLocation(response.data || []);
        } catch (e) {
          console.error("Failed fetching locations:", e);
          setSelectedLocation([]);
        }
      };

      fetchLocation();
    }
  }, [selectedCorp]);

  const handleReportTypeChange = (type) => {
    setReportType(type);
    setDatasetparams({
      organisation: selectedOrg,
      corporate: "",
      location: "",
      start: null,
      end: null,
    });
    if (type === "Organization") {
      setSelectedCorp("");
      setSelectedSetLocation("");
    }
  };

  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setSelectedSetLocation("");
    setDatasetparams({
      ...datasetparams,
      organisation: newOrg,
      corporate: "",
      location: "",
    });
    validateForm();
  };

  const handleCorpChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setSelectedSetLocation("");
    setDatasetparams((prev) => ({
      ...prev,
      corporate: newCorp,
      start: dateRange.start,
      end: dateRange.end,
    }));
    validateForm();
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
    setDatasetparams((prev) => ({
      ...prev,
      start: newRange.start,
      end: newRange.end,
    }));
    validateForm(); // Validate after updating the dates
  };

  return (
    <div>
      <div className="mb-2 flex-col items-center gap-6">
        <div className="mt-4 pb-3 mx-5 text-left">
          <div className="mb-2 flex-col items-center gap-6">
            <div className="justify-start items-center gap-4 inline-flex mt-4">
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
                  <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Organization
                  </div>
                </div>
                <div
                  className={`w-[111px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                  }`}
                  onClick={() => handleReportTypeChange("Corporate")}
                >
                  <div className="text-slate-700 text-[12px] font-medium font-['Manrope'] leading-tight">
                    Corporate
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
                    <option value="">--Select Organization--- </option>
                    {organisations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                  {errors.selectedOrg && (
                    <div className="text-red-600 text-[12px]">
                      {errors.selectedOrg}
                    </div>
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
                      onChange={handleCorpChange}
                    >
                      <option value="">--Select Corporate--- </option>
                      {corporates.map((corp) => (
                        <option key={corp.id} value={corp.id}>
                          {corp.name}
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
                  Select Date Range
                </label>
                <div className="mt-2">
                  <DateRangePicker
                    startDate={dateRange.start}
                    endDate={dateRange.end}
                    onDateChange={handleDateChange}
                  />
                  {errors.dateRange && (
                    <div className="text-red-600 text-[12px]">
                      {errors.dateRange}
                    </div>
                  )}
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
                    Operations where workers' freedom of association or
                    collective bargaining is at risk
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 407-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table1 columns={columns1} data={operationBargainingData} />
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
                    Suppliers in which the right to freedom of association or
                    collective bargaining may be at risk
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 407-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table1 columns={columns2} data={supplierBargainingData} />
                </div>
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

export default AnalyseCollectiveBargaining;
