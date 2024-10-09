"use client";
import React, { useState, useEffect } from "react";
import TableSidebar from "./TableSidebar";
import DynamicTable2 from "./customTable2";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { columns1 } from "./data";
import { yearInfo } from "@/app/shared/data/yearInfo";
import { Oval } from "react-loader-spinner";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdInfoOutline } from "react-icons/md";
const AnalyseAnnualtotalcompensationratio = ({ isBoxOpen }) => {
  const [customerhealth, setCustomerhealth] = useState([]);

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
    selectedOrg: "",
    selectedCorp: "",
    selectedYear: "",
  });

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };


  const validateForm = () => {
    const newErrors = {};

    // Validate selectedOrg
    if (!selectedOrg) {
      newErrors.selectedOrg = "Please select Organisation";
    }

    // Validate selectedYear
    if (!selectedYear) {
      newErrors.selectedYear = "Please select year";
    }

    // Validate selectedCorp only if the report type is "Corporate"
    if (reportType === "Corporate" && !selectedCorp) {
      newErrors.selectedCorp = "Please select Corporate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchData = async (params) => {
    if (!validateForm()) return;

    LoaderOpen();
    setCustomerhealth([]);




    try {
      const response = await axiosInstance.get(
        `/sustainapp/get_governance_analysis/`,
        { params: params }
      );

      const data = response.data;

      const { compensation_ratio_annual_total_and_increase } = data;
      const formatcustomerhealth = (data) => {
        return data.map((data, index) => {

          return {
            "Ratio of annual total compensation": data.ratio_of_annual_total_compensation.toFixed(2),
            "Ratio of percentage increase in annual total compensation":
              data.ratio_of_percentage_increase_in_annual_total_compensation.toFixed(2),
          };
        });
      };
      setCustomerhealth(formatcustomerhealth(compensation_ratio_annual_total_and_increase));
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
    setErrors({
      selectedOrg: "",
      selectedCorp: "",
      selectedYear: "",
    });
    validateForm();
  };

  const handleOrganizationChange = (e) => {
    const newOrg = e.target.value;
    setSelectedOrg(newOrg);
    setSelectedCorp("");
    setSelectedYear("");
    setCustomerhealth([]);
    setErrors((prevErrors) => ({ ...prevErrors, selectedOrg: "" }));

    setDatasetparams({
      organisation: newOrg,
      corporate: "",
      start: "",
      end: "",
    });
    validateForm();
  };

  const handleOrgChange = (e) => {
    const newCorp = e.target.value;
    setSelectedCorp(newCorp);
    setErrors((prevErrors) => ({ ...prevErrors, selectedCorp: "" }));

    setDatasetparams((prevParams) => ({
      ...prevParams,
      corporate: newCorp,
      start: prevParams.start,
      end: prevParams.end,
    }));
    validateForm();
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
    setErrors((prevErrors) => ({ ...prevErrors, selectedYear: "" }));

    setDatasetparams((prevParams) => ({
      ...prevParams,
      start: `${newYear}-01-01`,
      end: `${newYear}-12-31`,
    }));
    validateForm();
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
                <div className="rounded-lg shadow justify-start items-start flex">
                  <div
                    className={`w-[111px] px-4 py-2.5 border  rounded-l-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Organization"
                        ? "bg-[#d2dfeb]"
                        : "bg-white"
                    }`}
                    onClick={() => handleReportTypeChange("Organization")}
                  >
                    <div className="text-slate-800 text-[12px] font-medium font-['Manrope'] leading-tight">
                      Organization
                    </div>
                  </div>
                  <div
                    className={`w-[111px] px-4 py-2.5 border-r border-y rounded-r-lg border-gray-300 justify-center items-center gap-2 flex cursor-pointer ${
                      reportType === "Corporate" ? "bg-[#d2dfeb]" : "bg-white"
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
                      <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                        {errors.selectedOrg}
                      </p>
                    )}
                  </div>
                </div>
                {reportType === "Corporate" && (
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
                      {errors.selectedCorp && (
                        <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                          {errors.selectedCorp}
                        </p>
                      )}
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
                      <p className="text-[#007EEF] text-[12px] pl-2 mt-2">
                        {errors.selectedYear}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className={`ps-4  w-full me-4`}>
            <div className="mb-6">
              <div
                id="ReductionOfEnergy"
                className="text-neutral-700 text-[15px] font-bold font-['Manrope'] leading-tight mb-3 flex justify-between items-center"
              >
                <h2 className="flex mx-2 text-[15px] text-neutral-700  font-bold mb-2">
                  Ratio of annual total compensation & ratio of percentage
                  increase in annual total compensation
                  <MdInfoOutline
                    data-tooltip-id={`tooltip-$e1`}
                    data-tooltip-content="This section documents data corresponding to the
total number and rate of new employee hires during
the reporting period, categorized by age group,
gender, and region.
Note: When compiling the information specified
in Disclosure 401-1, the reporting organization
should use data from Disclosure 2-7 in
GRI 2: General Disclosures 2021 to identify the
total number of employees"
                    className="mt-1.5 ml-2 text-[15px]"
                  />
                  <ReactTooltip
                    id={`tooltip-$e1`}
                    place="top"
                    effect="solid"
                    style={{
                      width: "290px",
                      backgroundColor: "#000",
                      color: "white",
                      fontSize: "12px",
                      boxShadow: 3,
                      borderRadius: "8px",
                      textAlign: "left",
                    }}
                  ></ReactTooltip>
                </h2>
                <div className="flex justify-between gap-2">
                  <div className="w-[70px] h-[26px] p-2  bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 2-21a
                    </div>
                  </div>
                  <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                    <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                      GRI 2-21b
                    </div>
                  </div>
                </div>
              </div>
              <DynamicTable2 columns={columns1} data={customerhealth} />
            </div>
          </div>
          {/* <div
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
          </div> */}
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

export default AnalyseAnnualtotalcompensationratio;
