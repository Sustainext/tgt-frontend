"use client";
import React, { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import DateRangePicker from "../../../../utils/DatePickerComponent";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1, columns2, columns3, columns4 } from "./data";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from "react-loader-spinner";
const AnalyseTraining = ({ isBoxOpen }) => {
  const [table1, setTable1] = useState([]);
  const [table2, setTable2] = useState([]);
  const [table3, setTable3] = useState([]);
  const [table4, setTable4] = useState([]);
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
    setTable1([]);
    setTable2([]);
    setTable3([]);
    setTable4([]);
    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_training_social_analysis`,
        {
          params: params,
        }
      );

      const data = response.data;

      const {
        average_hours_of_training_provided_to_employees,
        average_training_hours_per_employee_category,
        percentage_of_employees_receiving_regular_performance_and_career_development_reviews,
        percentage_of_employees_receiving_regular_performance_and_career_development_reviews_by_gender,
      } = data;

      const formatTable1 = (data) => {
        return data.map((data, index) => {
          const average_training_hours_per_employee = parseFloat(
            data.average_training_hours_per_employee
          ).toFixed(2);
          const formattedPercentage1 =
            average_training_hours_per_employee.endsWith(".00")
              ? average_training_hours_per_employee.slice(0, -3)
              : average_training_hours_per_employee;
          const formattedPercentageWithIcon1 = formattedPercentage1 + "%";
          const average_training_hours_per_female_employee = parseFloat(
            data.average_training_hours_per_female_employee
          ).toFixed(2);
          const formattedPercentage2 =
            average_training_hours_per_female_employee.endsWith(".00")
              ? average_training_hours_per_female_employee.slice(0, -3)
              : average_training_hours_per_employee;
          const average_training_hours_per_male_employee = parseFloat(
            data.average_training_hours_per_male_employee
          ).toFixed(2);
          const formattedPercentage3 =
            average_training_hours_per_male_employee.endsWith(".00")
              ? average_training_hours_per_male_employee.slice(0, -3)
              : average_training_hours_per_male_employee;
          return {
            "Average training hours per employee": formattedPercentageWithIcon1,
            "Average training hours per Female employee": formattedPercentage2,
            "Average training hours per Male employee": formattedPercentage3,
          };
        });
      };
      const formatTable2 = (data) => {
        return data.map((data, index) => {
          const average_training_hours_per_employee = parseFloat(
            data.average_training_hours_per_employee
          ).toFixed(2);
          const formattedPercentage1 =
            average_training_hours_per_employee.endsWith(".00")
              ? average_training_hours_per_employee.slice(0, -3)
              : average_training_hours_per_employee;
          const average_training_hours_per_female_employee = parseFloat(
            data.average_training_hours_per_female_employee
          ).toFixed(2);
          const formattedPercentage2 =
            average_training_hours_per_female_employee.endsWith(".00")
              ? average_training_hours_per_female_employee.slice(0, -3)
              : average_training_hours_per_female_employee;
          const average_training_hours_per_male_employee = parseFloat(
            data.average_training_hours_per_male_employee
          ).toFixed(2);
          const formattedPercentage3 =
            average_training_hours_per_male_employee.endsWith(".00")
              ? average_training_hours_per_male_employee.slice(0, -3)
              : average_training_hours_per_male_employee;
          const average_training_hours_per_non_binary_employee = parseFloat(
            data.average_training_hours_per_male_employee
          ).toFixed(2);
          const formattedPercentage4 =
            average_training_hours_per_non_binary_employee.endsWith(".00")
              ? average_training_hours_per_non_binary_employee.slice(0, -3)
              : average_training_hours_per_non_binary_employee;
          return {
            Categories: data.category,
            "Average training hours per employee category":
              formattedPercentage1,
            "Average training hours of male employee in category":
              formattedPercentage2,
            "Average training hours of female employee in category":
              formattedPercentage3,
            "Average training hours of non-binary employee in category":
              formattedPercentage4,
          };
        });
      };
      const formatTable3 = (data) => {
        return data.map((data, index) => {
          const percentage_of_employees_who_received_regular_performance_reviews =
            parseFloat(
              data.percentage_of_employees_who_received_regular_performance_reviews
            ).toFixed(2);
          const formattedPercentage1 =
            percentage_of_employees_who_received_regular_performance_reviews.endsWith(
              ".00"
            )
              ? percentage_of_employees_who_received_regular_performance_reviews.slice(
                  0,
                  -3
                )
              : percentage_of_employees_who_received_regular_performance_reviews;
          const percentage_of_employees_who_received_regular_career_development_reviews =
            parseFloat(
              data.percentage_of_employees_who_received_regular_career_development_reviews
            ).toFixed(2);
          const formattedPercentage2 =
            percentage_of_employees_who_received_regular_career_development_reviews.endsWith(
              ".00"
            )
              ? percentage_of_employees_who_received_regular_career_development_reviews.slice(
                  0,
                  -3
                )
              : percentage_of_employees_who_received_regular_career_development_reviews;

          return {
            "Employee Category": data.Category,
            "Percentage of employees who received regular performance review":
              formattedPercentage1,
            "Percentage of employees who received regular career development review":
              formattedPercentage2,
          };
        });
      };
      const formatTable4 = (data) => {
        return data.map((data, index) => {
          const percentage_of_employees_who_received_regular_performance_reviews =
            parseFloat(
              data.percentage_of_employees_who_received_regular_performance_reviews
            ).toFixed(2);
          const formattedPercentage1 =
            percentage_of_employees_who_received_regular_performance_reviews.endsWith(
              ".00"
            )
              ? percentage_of_employees_who_received_regular_performance_reviews.slice(
                  0,
                  -3
                )
              : percentage_of_employees_who_received_regular_performance_reviews;
          const percentage_of_employees_who_received_regular_career_development_reviews =
            parseFloat(
              data.percentage_of_employees_who_received_regular_career_development_reviews
            ).toFixed(2);
          const formattedPercentage2 =
            percentage_of_employees_who_received_regular_career_development_reviews.endsWith(
              ".00"
            )
              ? percentage_of_employees_who_received_regular_career_development_reviews.slice(
                  0,
                  -3
                )
              : percentage_of_employees_who_received_regular_career_development_reviews;

          return {
            Gender: data.Gender,
            "Percentage of employees who received regular performance review":
              formattedPercentage1,
            "Percentage of employees who received regular career development review":
              formattedPercentage2,
          };
        });
      };
      setTable1(formatTable1(average_hours_of_training_provided_to_employees));
      setTable2(formatTable2(average_training_hours_per_employee_category));
      setTable3(
        formatTable3(
          percentage_of_employees_receiving_regular_performance_and_career_development_reviews
        )
      );
      setTable4(
        formatTable4(
          percentage_of_employees_receiving_regular_performance_and_career_development_reviews_by_gender
        )
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
    setTable1([]);
    setTable2([]);
    setTable3([]);
    setTable4([]);

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
        <div className="mb-2 flex-col items-center pt-4 gap-6">
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
                    className="text-neutral-800 text-[12px] font-normal ml-1"
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
                      className="text-neutral-800 text-[12px] font-normal ml-1"
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
                    className="text-neutral-800 text-[12px] font-normal ml-1"
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
        </div>
        <div className="flex">
          <div className={`ps-4 w-[100%] me-4`}>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
                <div>
                  <p className="text-[15px] font-bold">
                    Average hours of training provided to employees
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-[13px]">
                    Average hours of training provided to employees
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns1} data={table1} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep1"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
                <div>
                  <p className="text-[15px] font-bold">
                    Average hours of training provided to employees
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-[13px]">
                    Average hours of training provided to employees
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-1a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns2} data={table2} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep2"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
                <div>
                  <p className="text-[15px] font-bold">
                    Percentage of employees receiving regular performance and
                    career development reviews
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500">
                    Percentage of employees receiving regular performance and
                    career development reviews by employee category
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-3a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns3} data={table3} />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div
                id="ep3"
                className="text-neutral-700 text-[15px] font-normal font-['Manrope'] leading-tight mb-3 "
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[15px] font-bold">
                    Percentage of employees receiving regular performance and
                    career development reviews by gender
                  </p>

                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 404-3a
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <DynamicTable2 columns={columns4} data={table4} />
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
    </div>
  );
};

export default AnalyseTraining;
