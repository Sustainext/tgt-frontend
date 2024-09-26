"use client";
import React, { useState, useEffect } from "react";
import DynamicTable2 from "./customTable";
import DynamicTable from "./customTable2";
import DateRangePicker from "../../../../utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4, columns5 } from "./data";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from "react-loader-spinner";
const Anticorruptions = () => {
  const [strategypolicy, setStrategypolicy] = useState([]);
  const [strategypolicy2, setStrategypolicy2] = useState([]);
  const [strategypolicy3, setStrategypolicy3] = useState([]);
  const [strategypolicy4, setStrategypolicy4] = useState([]);
  const [strategypolicy5, setStrategypolicy5] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [corporate, setCorporates] = useState([]);
  const [reportType, setReportType] = useState("Organization");
  const [loopen, setLoOpen] = useState(false);
  const [datasetparams, setDatasetparams] = useState({
    organisation: "",
    corporate: "",
    start: "",
    end: "",
  });
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

    if (!selectedOrg) {
      newErrors.selectedOrg = "Organization is required";
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
    setStrategypolicy([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_economic_communication_and_training`,
        {
          params: params,
        }
      );

      const data = response.data;
      const {
        analyze_205_2a,
        analyze_205_2b,
        analyze_205_2c,
        analyze_205_2d,
        analyze_205_2e,
      } = data;

      const formatcollectivebargaining = (data) => {
        return data.map((data, index) => {
          const percentage = parseFloat(data.percentage).toFixed(2);
          const formattedPercentage = percentage.endsWith(".00")
            ? percentage.slice(0, -3)
            : percentage;
          return {
            Location: data.loc,
            "Total number of governance body members that the organization's anti-corruption policies and procedures have been communicated to":
              data.total_communicated,
            "Total number of governance body members in that region":
              data.total_region,
            "Percentage of governance body members that the organization's anti-corruption policies and procedures have been communicated to":
              formattedPercentage,
          };
        });
      };
      const formatcollectivebargaining2 = (data) => {
        const formattedData = {};

        // Iterate over each location
        Object.keys(data).forEach((location) => {
          // For each location, iterate over the array of employee data
          data[location].forEach((employeeData) => {
            const percentage = parseFloat(employeeData.percentage).toFixed(2);
            const formattedPercentage = percentage.endsWith(".00")
              ? percentage.slice(0, -3)
              : percentage;

            // If the location is not already in the formattedData, initialize it
            if (!formattedData[location]) {
              formattedData[location] = [];
            }

            // Push the formatted data into the location array
            formattedData[location].push({
              "Employee Category": employeeData.EmployeeCategory,
              "Total number of employees that the organization's anti-corruption policies and procedures have been communicated to":
                employeeData.Totalnumberemployees,
              "Total number of employee in this region":
                employeeData.Totalemployeeinthisregion,
              "Percentage of employees that the organization's anti-corruption policies and procedures have been communicated to":
                formattedPercentage,
            });
          });
        });

        return formattedData;
      };
      const formatcollectivebargaining3 = (data) => {
        const formattedData = {};

        // Iterate over each location
        Object.keys(data).forEach((location) => {
          // For each location, iterate over the array of employee data
          data[location].forEach((employeeData) => {
            const percentage = parseFloat(employeeData.percentage).toFixed(2);
            const formattedPercentage = percentage.endsWith(".00")
              ? percentage.slice(0, -3)
              : percentage;

            // If the location is not already in the formattedData, initialize it
            if (!formattedData[location]) {
              formattedData[location] = [];
            }

            // Push the formatted data into the location array
            formattedData[location].push({
              "Type of business partner": employeeData.Typeofbusinesspartner,
              "Total number of business partners that the organization's anti-corruption policies and procedures have been communicated to":
                employeeData.Totalnumberemployees,
              "Total number of business partners in this region":
                employeeData.Totalemployeeinthisregion,
              "Percentage of business partners that the organization's anti-corruption policies and procedures have been communicated to":
                formattedPercentage,
            });
          });
        });

        return formattedData;
      };
      const formatcollectivebargaining4 = (data) => {
        return data.map((data, index) => {
          const percentage = parseFloat(data.percentage).toFixed(2);
          const formattedPercentage = percentage.endsWith(".00")
            ? percentage.slice(0, -3)
            : percentage;
          return {
            Location: data.loc,
            "Total number of governance body members that have received training on anti-corruption":
              data.total_communicated,
            "Total number of governance body members": data.total_region,
            "Percentage of governance body members that have received training on anti-corruption":
              formattedPercentage,
          };
        });
      };
      const formatcollectivebargaining5 = (data) => {
        const formattedData = {};

        // Iterate over each location
        Object.keys(data).forEach((location) => {
          // For each location, iterate over the array of employee data
          data[location].forEach((employeeData) => {
            const percentage = parseFloat(employeeData.percentage).toFixed(2);
            const formattedPercentage = percentage.endsWith(".00")
              ? percentage.slice(0, -3)
              : percentage;

            // If the location is not already in the formattedData, initialize it
            if (!formattedData[location]) {
              formattedData[location] = [];
            }

            // Push the formatted data into the location array
            formattedData[location].push({
              "Employee Category": employeeData.EmployeeCategory,
              "Total number of employees  that have received training on anti-corruption":
                employeeData.Totalnumberemployees,
              "Total number of employee":
                employeeData.Totalemployeeinthisregion,
              "Percentage of employees that have received training on anti-corruption":
                formattedPercentage,
            });
          });
        });

        return formattedData;
      };
      setStrategypolicy(formatcollectivebargaining(analyze_205_2a));
      setStrategypolicy2(formatcollectivebargaining2(analyze_205_2b));
      setStrategypolicy3(formatcollectivebargaining3(analyze_205_2c));
      setStrategypolicy4(formatcollectivebargaining4(analyze_205_2d));
      setStrategypolicy5(formatcollectivebargaining5(analyze_205_2e));
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

  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setSelectedYear("");
    setStrategypolicy([]);

    setDatasetparams({
      organisation: newOrg,
      corporate: "",
      start: "",
      end: "",
    });
  };

  const handleOrgChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);

    setSelectedYear("");

    setDatasetparams((prevParams) => ({
      ...prevParams,
      corporate: newCorp,
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
        <h2 className="text-[17px] text-[#343A40] mx-5 mt-4 font-semibold">
          Communication and training about anti-corruption policies and
          procedures
        </h2>
        <div className="mt-4 pb-3 mx-5 text-left">
          <div className="mb-2 flex-col items-center pt-2 gap-6">
            <div className="justify-start items-center gap-4 inline-flex mt-4">
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
                  className={`w-[111px] px-4 py-2.5 border-r rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                    reportType === "Corporate" ? "bg-sky-100" : "bg-white"
                  }`}
                  onClick={() => handleReportTypeChange("Corporate")}
                >
                  <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
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
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
                    <div className="text-red-600 text-[12px] ml-2">
                      {errors.selectedOrg}
                    </div>
                  )}
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
                      className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      value={selectedCorp}
                      onChange={handleOrgChange}
                    >
                      <option value="">--Select Corporate--- </option>
                      {corporate &&
                        corporate.map((corp) => (
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
                  Select Year
                </label>
                <div className="mt-2">
                  <select
                    name="year"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 text-neutral-500 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
                    <div className="text-red-600 text-[12px] ml-2">
                      {errors.selectedYear}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className={`ps-4  w-full me-4`}>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    Total number of governance body members that the
                    organization’s anti-corruption policies and procedures have
                    been communicated to, broken down by region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={strategypolicy} />
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
                    Total number and percentage of employees that the
                    organization’s anti-corruption policies and procedures have
                    been communicated to, broken down by employee category and
                    region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2b
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable columns={columns2} data={strategypolicy2} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    Total number and percentage of business partners that the
                    organization’s anti-corruption policies and procedures have
                    been communicated to, broken down by type of business
                    partner and region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2c
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable columns={columns3} data={strategypolicy3} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    Total number and percentage of governance body members that
                    have received training on anti-corruption, broken down by
                    region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2d
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns4} data={strategypolicy4} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep3"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    Total number and percentage of employees that have received
                    training on anti-corruption, broken down by region.
                  </p>

                  <div className="w-[95px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 205-2e
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable columns={columns5} data={strategypolicy5} />
                </div>
              </div>
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
    </div>
  );
};

export default Anticorruptions;
