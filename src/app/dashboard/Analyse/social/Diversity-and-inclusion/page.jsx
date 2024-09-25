'use client'
import { useState, useEffect } from "react";
import TableSidebar1 from "./TableSidebar1";
import TableSidebar2 from "./TableSidebar2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Table3 from "./Table3";
import { column1 } from "./data";
import NavigationButtons from "./NavigationButtons";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from 'react-loader-spinner';
const AnalyseDiversityInclusion = ({ isBoxOpen }) => {
  const [
    percentageOfEmployeesWithinGovernmentBodies,
    setPercentageOfEmployeesWithinGovernmentBodies,
  ] = useState([]);
  const [
    numberOfEmployeesPerEmployeeCategory,
    setNumberOfEmployeesPerEmployeeCategory,
  ] = useState([]);
  const [ratioOfBasicSalaryOfWomenToMen, setRatioOfBasicSalaryOfWomenToMen] =
    useState([]);
  const [ratioOfRemunerationOfWomenToMen, setRatioOfRemunerationOfWomenToMen] =
    useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSetLocation, setSelectedSetLocation] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
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
    setPercentageOfEmployeesWithinGovernmentBodies([]);
    setNumberOfEmployeesPerEmployeeCategory([]);
    setRatioOfBasicSalaryOfWomenToMen([]);
    setRatioOfRemunerationOfWomenToMen([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_diversity_inclusion_analysis/`,
        { params: params }
      );
      const data = response.data;

      const {
        percentage_of_employees_within_government_bodies,
        number_of_employee_per_employee_category,
        ratio_of_basic_salary_of_women_to_men,
        ratio_of_remuneration_of_women_to_men,
      } = data;

      const formatGovernanceBodiesData = (data) => {
        return data.map((item) => ({
          "Percentage of female within organisation's governance bodies":
            item.percentage_of_female_with_org_governance,
          "Percentage of male within organisation's governance bodies":
            item.percentage_of_male_with_org_governance,
          "Percentage of Non-binary within organisation's governance bodies":
            item.percentage_of_non_binary_with_org_governance,
          "Percentage of employee within age group of (under 30 years old) organisation's governance bodies":
            item.percentage_of_employees_within_30_age_group,
          "Percentage of employee within age group of (30-50 years old) organisation's governance bodies":
            item.percentage_of_employees_within_30_to_50_age_group,
          "Percentage of employee within age group of (over 50 years old) organisation's governance bodies":
            item.percentage_of_employees_more_than_50_age_group,
          "Percentage of minority group of organisation's governance bodies":
            item.percentage_of_employees_in_minority_group,
        }));
      };

      const formatEmployeeCategoryData = (data) => {
        return data.map((item) => ({
          Category: item.Category,
          Male: item.percentage_of_male_with_org_governance,
          Female: item.percentage_of_female_with_org_governance,
          "Non-Binary": item.percentage_of_non_binary_with_org_governance,
          "<30 years": item.percentage_of_employees_within_30_age_group,
          "30-50 years": item.percentage_of_employees_within_30_to_50_age_group,
          ">50 years": item.percentage_of_employees_more_than_50_age_group,
          "Minority group": item.percentage_of_employees_in_minority_group,
        }));
      };

        setPercentageOfEmployeesWithinGovernmentBodies(
          formatGovernanceBodiesData(
            percentage_of_employees_within_government_bodies
          )
        );
        setNumberOfEmployeesPerEmployeeCategory(
          formatEmployeeCategoryData(number_of_employee_per_employee_category)
        );
        setRatioOfBasicSalaryOfWomenToMen(
          ratio_of_basic_salary_of_women_to_men
        );
        setRatioOfRemunerationOfWomenToMen(
          ratio_of_remuneration_of_women_to_men
        );


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
    setPercentageOfEmployeesWithinGovernmentBodies([]);
    setNumberOfEmployeesPerEmployeeCategory([]);
    setRatioOfBasicSalaryOfWomenToMen([]);
    setRatioOfRemunerationOfWomenToMen([]);

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
    // setSelectedYear("");

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

  const handleNextScreen = () => {
    if(selectedSetLocation === ""){
      setNumberOfEmployeesPerEmployeeCategory([]);
      setRatioOfBasicSalaryOfWomenToMen([]);
      setRatioOfRemunerationOfWomenToMen([]);    }

    setActiveScreen(2);
  };

  const handlePreviousScreen = () => {
    setDatasetparams({
      ...datasetparams,
      organisation: selectedOrg,
      corporate: selectedCorp,
      location: "",
    });
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
                      {errors.selectedOrg && (
                        <div className="text-red-600 text-sm">
                          {errors.selectedOrg}
                        </div>
                      )}
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
                    <Table1
                      columns={column1}
                      data={percentageOfEmployeesWithinGovernmentBodies}
                    />
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
                  <Table2 data={numberOfEmployeesPerEmployeeCategory} />
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
                    <Table3 data={ratioOfBasicSalaryOfWomenToMen} />
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
                  <Table3 data={ratioOfRemunerationOfWomenToMen} />
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

export default AnalyseDiversityInclusion;
