'use client';
import { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table"; // Ensure this is the correct import path
import { yearInfo } from "@/app/shared/data/yearInfo";

const AnalyseCollectiveBargaining = ({ isBoxOpen }) => {
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSetLocation, setSelectedSetLocation] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [organisations, setOrganisations] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
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
    selectedOrg: "Organization is required",
    selectedLocation: "Location is required",
    selectedYear: "Year is required",
  });

  const columns1 = [
    "Operations in which workers' rights to exercise freedom of association or collective bargaining may be violated or at significant risk",
    "Type of Operation",
    "Countries or Geographic Areas"
  ];

  const data1 = [
    {
      "Operations in which workers' rights to exercise freedom of association or collective bargaining may be violated or at significant risk": "Operation 1",
      "Type of Operation": "",
      "Countries or Geographic Areas": ""
    },
    {
      "Operations in which workers' rights to exercise freedom of association or collective bargaining may be violated or at significant risk": "Operation 2",
      "Type of Operation": "",
      "Countries or Geographic Areas": ""
    }
  ];

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedOrg && activeScreen === 1) {
      newErrors.selectedOrg = "Organization is required";
    }
    if (!selectedSetLocation && activeScreen === 2) {
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
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_training_social_analysis/`,
        { params: params }
      );
      const data = response.data;
      console.log('analyse data', data);

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
  }, [selectedCorp]);

  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setSelectedSetLocation("");
    setSelectedYear("");

    setDatasetparams({
      organisation: newOrg,
      corporate: "",
      location: "",
      start: "",
      end: "",
    });
  };

  const handleOrgChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setSelectedSetLocation("");
    setSelectedYear("");

    setDatasetparams((prevParams) => ({
      ...prevParams,
      corporate: newCorp,
      location: "",
      start: prevParams.start,
      end: prevParams.end,
    }));
  };

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
      <div>
        <div className="mb-2 flex-col items-center pt-4 gap-6">
          <div className="mt-4 pb-3 mx-5 text-left">
            <div className="mb-2 flex-col items-center pt-2 gap-6">
              <div className="justify-start items-center gap-4 inline-flex mt-4">
                <div className="text-zinc-600 text-[15px] font-semibold font-['Manrope']">
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
                    className={`w-[111px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                    }`}
                    onClick={() => handleReportTypeChange("Corporate")}
                  >
                    <div className="text-slate-700 text-[13px] font-medium font-['Manrope'] leading-tight">
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
                    {errors.selectedOrg && (
                      <div className="text-red-600 text-sm">
                        {errors.selectedOrg}
                      </div>
                    )}
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
                <div className="mr-2">
                  <label
                    htmlFor="cname"
                    className="text-neutral-800 text-[13px] font-normal"
                  >
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
          <div className={`ps-4  w-[78%] me-4`}>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    Average hours of training provided to employees
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table1 columns={columns1} data={data1} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep2"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    Percentage of employees receiving regular performance and career development reviews
                  </p>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-3a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table1 columns={columns1} data={data1} />
                </div>
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
    </div>
  );
};

export default AnalyseCollectiveBargaining;
