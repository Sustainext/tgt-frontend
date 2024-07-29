'use client'
import { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { columns, data } from "./data";

const AnalyseNonDiscrimination = ({ isBoxOpen }) => {
  const [incidentsOfDiscrimination, setIncidentsOfDiscrimination] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSetLocation, setSelectedSetLocation] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    location: "",
    start: "",
    end: "",
  });
  const [activeScreen, setActiveScreen] = useState(1);
  const [errors, setErrors] = useState({
    selectedLocation: "Location is required",
    selectedYear: "Year is required",
  });

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedSetLocation) {
      newErrors.selectedLocation = "Location is required";
    }
    if (!selectedYear) {
      newErrors.selectedYear = "Year is required";
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
        `/sustainapp/get_diversity_inclusion_analysis/`,
        { params: params }
      );
      const data = response.data;

      const { incidents_of_discrimination } = data;

      const formatDiscriminationData = (data) => {
        return data.map((item) => ({
          "Type of Incident": item.type_of_incident,
          "Total number of Incidents of discrimination": item.total_number_of_incidents,
        }));
      };

      setIncidentsOfDiscrimination(formatDiscriminationData(incidents_of_discrimination));
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
  }, [datasetparams, activeScreen]);

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
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      start: `${newYear}-01-01`,
      end: `${newYear}-12-31`,
    }));
  };

  return (
    <div>
      <div className="mb-2 flex-col items-center pt-4 gap-6">
        <div className="mt-4 pb-3 mx-5 text-left">
          <div className="mb-2 flex-col items-center pt-2 gap-6">
            <div className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4`}>
              <div className="mr-2">
                <label htmlFor="cname" className="text-neutral-800 text-[13px] font-normal">
                  Select Location
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={selectedSetLocation}
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
                  {errors.selectedLocation && (
                    <div className="text-red-600 text-sm">
                      {errors.selectedLocation}
                    </div>
                  )}
                </div>
              </div>
              <div className="mr-2">
                <label htmlFor="cname" className="text-neutral-800 text-[13px] font-normal">
                  Select Year
                </label>
                <div className="mt-2">
                  <select
                    name="year"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-xs font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={selectedYear}
                    onChange={handleYearChange}
                  >
                    <option value="">Select year</option>
                    {yearInfo.map((item) => (
                      <option value={item.slice(0, 4)} key={item}>
                        {item.slice(0, 4)}
                      </option>
                    ))}
                  </select>
                  {errors.selectedYear && (
                    <div className="text-red-600 text-sm">
                      {errors.selectedYear}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className={`ps-4 w-[78%] me-4`}>
          <div className="mb-6">
            <div
              id="ep1"
              className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3"
            >
              <div className="flex justify-between items-center mb-2">
                <p>Incidents of discrimination and corrective actions taken</p>
                <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                    GRI 406-1a
                  </div>
                </div>
              </div>
              <div className="text-[#344053]/80 text-[15px] font-medium font-['Manrope'] leading-tight">
                Incidents of discrimination
              </div>
            </div>
            <div className="mb-4">
              <Table1 data={data} columns={columns} />
            </div>
          </div>
        </div>
        <div
          style={{
            position: `${isBoxOpen ? "unset" : "sticky"}`,
            top: "10rem",
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

export default AnalyseNonDiscrimination;
