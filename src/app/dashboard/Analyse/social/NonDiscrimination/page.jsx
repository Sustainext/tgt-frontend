"use client";
import { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table";
import DateRangePicker from "../../../../utils/DatePickerComponent";
import { columns, data } from "./data";
import { Oval } from "react-loader-spinner";
const AnalyseNonDiscrimination = ({ isBoxOpen }) => {
  const [incidentsOfDiscrimination, setIncidentsOfDiscrimination] = useState(
    []
  );
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSetLocation, setSelectedSetLocation] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [isDateRangeValid, setIsDateRangeValid] = useState(true);
  const [loopen, setLoOpen] = useState(false);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    location: "",
    start: null,
    end: null,
  });
  const [errors, setErrors] = useState({});

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!selectedSetLocation) {
      newErrors.selectedLocation = "Location is required";
    }

    if (!dateRange.start || !dateRange.end) {
      newErrors.dateRange = "Please  select a valid date range";
      setIsDateRangeValid(false);
    } else if (new Date(dateRange.start) >= new Date(dateRange.end)) {
      newErrors.dateRange = "Start date must be before the end date";
      setIsDateRangeValid(false);
    } else {
      setIsDateRangeValid(true);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchData = async (params) => {
    if (!validateForm()) return;

    LoaderOpen();
    setIncidentsOfDiscrimination([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_non_discrimination_analysis/`,
        { params: params }
      );
      const data = response.data;
      const { incidents_of_discrimination } = data;

      setIncidentsOfDiscrimination(incidents_of_discrimination);
      LoaderClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    if (validateForm()) {
      fetchData(datasetparams);
    }
  }, [datasetparams]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axiosInstance.get(`/sustainapp/get_location/`);
        setSelectedLocation(response.data || []);
      } catch (e) {
        console.error("Failed fetching locations:", e);
        setSelectedLocation([]);
      }
    };
    if (selectedLocation.length === 0) {
      fetchLocation();
    }
  }, []);

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedSetLocation(newLocation);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      location: newLocation,
      organisation: "",
      corporate: "",
      start: prevParams.start,
      end: prevParams.end,
    }));
    validateForm(); // Validate form after updating the location
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      start: newRange.start,
      end: newRange.end,
    }));
    validateForm(); // Validate form after updating the date range
  };

  return (
    <div>
      <div className="mb-2 flex-col items-center gap-6">
        <div className="pb-3 mx-5 text-left">
          <div className="mb-2 flex-col items-center gap-6">
            <div
              className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4`}
            >
              <div className="mr-2">
                <label
                  htmlFor="cname"
                  className="text-neutral-800 text-[12px] font-normal"
                >
                  Select Location
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    value={selectedSetLocation}
                    onChange={handleLocationChange}
                  >
                    <option value="">--Select Location--- </option>
                    {selectedLocation.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  {errors.selectedLocation && (
                    <div className="text-red-600 text-[12px]">
                      {errors.selectedLocation}
                    </div>
                  )}
                </div>
              </div>
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
      </div>
      <div className="flex">
        <div className={`ps-4 w-[100%] me-4`}>
          <div className="mb-6">
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3"
            >
              <div className="flex justify-between items-center mb-2">
                <p>Incidents of discrimination and corrective actions taken</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 406-1a
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <Table1 data={incidentsOfDiscrimination} columns={columns} />
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

export default AnalyseNonDiscrimination;
