import { useState, useEffect } from "react";
import TableSidebar1 from "./TableSidebar1";
import TableSidebar2 from "./TableSidebar2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Table3 from "./Table3";
import { column1, data1, data2, data3 } from "./data";
import NavigationButtons from "./NavigationButtons";
import { yearInfo } from "@/app/shared/data/yearInfo";

const AnalyseDiversityInclusion = ({ isBoxOpen }) => {
  const [analyseData, setAnalyseData] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedsetLocation, setSelectedSetLocation] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // State for selected year
  const [compulsaryLabour1, setCompulsaryLabour1] = useState([]);
  const [compulsaryLabour2, setCompulsaryLabour2] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    location: "",
    year: "",
  });
  const [activeScreen, setActiveScreen] = useState(1);

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const fetchData = async (params) => {
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
          "Operations considered to have significant risk for incidents of forced or compulsory labor":
            operation.childlabor,
          "Type of Operation": operation.TypeofOperation,
          "Countries or Geographic Areas": operation.geographicareas,
        }));
      }

      function formatArray2(operations) {
        return operations.map((operation, index) => ({
          "Suppliers considered to have significant risk for incidents of forced or compulsory labor":
            operation.compulsorylabor,
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

      const suppliers_at_significant_risk_for_incidents_of_forced_or_compulsory_labor_formatted =
        formatArray2(
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
    setSelectedYear("");
    setCompulsaryLabour1([]);
    setCompulsaryLabour2([]);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      organisation: newOrg,
      corporate: "",
      location: "",
      year: "",
    }));
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
      year: "",
    }));
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedSetLocation(newLocation);
    setSelectedYear("");

    setDatasetparams((prevParams) => ({
      ...prevParams,
      location: newLocation,
      year: "",
    }));
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);

    setDatasetparams((prevParams) => ({
      ...prevParams,
      year: newYear,
    }));
  };

  const handleNextScreen = () => {
    setActiveScreen(2);
  };

  const handlePreviousScreen = () => {
    setActiveScreen(1);
  };

  return (
    <div>
      {activeScreen === 1 && (
        <div>
          <div className="mb-2 flex-col items-center pt-4 gap-6">
            <div className="mt-4 pb-3 mx-5 text-left">
              <div className="mb-2 flex-col items-center pt-2 gap-6">
                <div>Diversity and Inclusion (1/2)</div>
                <div className="justify-start items-center gap-4 inline-flex mt-4">
                  <div className="text-zinc-600 text-[15px] font-semibold font-['Manrope']">
                    View By:
                  </div>
                  <div className="rounded-lg shadow border border-gray-300 justify-start items-start flex">
                    <div
                      className={`w-[111px] px-4 py-2.5 border-r rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                        reportType === "Organization"
                          ? "bg-sky-100"
                          : "bg-white"
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
                    </div>
                  </div>
                  {(reportType === "Corporate" ||
                    reportType === "Location") && (
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
                      Percentage of individuals within the organization’s
                      governance bodies{" "}
                    </p>

                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-1a
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Table1 columns={column1} data={data1} />
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
              <TableSidebar1 />
            </div>
          </div>
        </div>
      )}
      {activeScreen === 2 && (
        <div>
          <div className="mb-2 flex-col items-center pt-4  gap-6">
            <div className="mt-4 pb-3 mx-5 text-left">
              <div className="mb-2 flex-col items-center pt-2 gap-6">
                <div>Diversity and Inclusion (2/2)</div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-4 w-[80%] mb-2 pt-4`}
                >
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
                  id="ep2"
                  className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <p>
                      Percentage of individuals within the organization’s
                      governance bodies
                    </p>

                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-1b
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Table2 data={data2} />
                </div>
              </div>
              <div className="mb-6">
                <div
                  id="ep1"
                  className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <p>Ratio of basic salary of women to men </p>

                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-2a
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Table3 data={data3} />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div
                  id="ep2"
                  className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
                >
                  <div className="flex justify-between items-center mb-2">
                    <p>Ratio of remuneration of women to men</p>

                    <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                      <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                        GRI 405-2a
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                <Table3 data={data3} />
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
              <TableSidebar2 />
            </div>
          </div>
        </div>
      )}
      <NavigationButtons
        activeScreen={activeScreen}
        handleNextScreen={handleNextScreen}
        handlePreviousScreen={handlePreviousScreen}
      />
    </div>
  );
};

export default AnalyseDiversityInclusion;
