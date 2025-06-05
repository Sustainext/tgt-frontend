"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAdd } from "react-icons/md";
import TableWithPagination from "./Data-table/TablePagination";
import { Oval } from "react-loader-spinner";
import axiosInstance, { post } from "../../utils/axiosMiddleware";
import {
  setHeadertext1,
  setHeadertext2,
  setHeaderdisplay,
} from "../../../lib/redux/features/topheaderSlice";
import { FaExclamationTriangle } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { IoIosWarning } from "react-icons/io";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Import Redux actions and selectors
import {
  setReportName,
  setReportType,
  setReportBy,
  setSelectedOrganization,
  setSelectedCorporate,
  setStartDate,
  setEndDate,
  setIncludeMaterialTopics,
  setIncludeContentIndex,
  setInvestmentCorporates,
  toggleInvestmentCorporate,
  setOwnershipRatio,
  setSelectedAssessmentId,
  setOrganizations,
  setCorporates,
  setErrors,
  setLoading,
  setReportExists,
  resetForm,
  selectReportName,
  selectReportType,
  selectReportBy,
  selectSelectedOrganization,
  selectSelectedCorporate,
  selectStartDate,
  selectEndDate,
  selectIncludeMaterialTopics,
  selectIncludeContentIndex,
  selectInvestmentCorporates,
  selectSelectedAssessmentId,
  selectOrganizations,
  selectCorporates,
  selectErrors,
  selectIsLoading,
  selectReportExists,
  selectSelectedOrgName,
  selectSelectedCorpName,
  selectIsFormValid,
  selectFormData,
} from "../../../lib/redux/features/reportCreationSlice"; // Adjust import path

const Report = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Local state for non-form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [massgeshow, setMassgeshow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [materialityAssessmentLen, setMaterialityAssessmentLen] = useState([]);
  const isMounted = useRef(true);

  // Redux state
  const reportName = useSelector(selectReportName);
  const reportType = useSelector(selectReportType);
  const reportBy = useSelector(selectReportBy);
  const selectedOrganization = useSelector(selectSelectedOrganization);
  const selectedCorporate = useSelector(selectSelectedCorporate);
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);
  const includeMaterialTopics = useSelector(selectIncludeMaterialTopics);
  const includeContentIndex = useSelector(selectIncludeContentIndex);
  const investmentCorporates = useSelector(selectInvestmentCorporates);
  const selectedAssessmentId = useSelector(selectSelectedAssessmentId);
  const organizations = useSelector(selectOrganizations);
  const corporates = useSelector(selectCorporates);
  const errors = useSelector(selectErrors);
  const isLoading = useSelector(selectIsLoading);
  const reportExists = useSelector(selectReportExists);
  const selectedOrgName = useSelector(selectSelectedOrgName);
  const selectedCorpName = useSelector(selectSelectedCorpName);
  const isFormValid = useSelector(selectIsFormValid);
  const formData = useSelector(selectFormData);

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };

  const token = getAuthToken();
  const axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  // API calls
  const getMaterialityAssessment = async () => {
    if (reportBy && startDate && endDate && selectedOrganization) {
      try {
        const response = await axiosInstance.get(
          `${
            process.env.BACKEND_API_URL
          }/materiality_dashboard/get_materiality_assessment_for_report/?start_date=${startDate}&end_date=${endDate}&organization_id=${selectedOrganization}&report_by=${reportBy}&corporate_id=${
            selectedCorporate || null
          }`,
          axiosConfig
        );
        if (response.status === 200) {
          setMaterialityAssessmentLen(response.data);
          if (response.data.length === 1) {
            dispatch(setSelectedAssessmentId(response.data[0].id));
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getReportExist = async () => {
    if (
      reportBy &&
      startDate &&
      endDate &&
      selectedOrganization &&
      reportType
    ) {
      try {
        const response = await axiosInstance.get(
          `${
            process.env.BACKEND_API_URL
          }/sustainapp/report_exists/?start_date=${startDate}&end_date=${endDate}&report_type=${reportType}&report_by=${reportBy}&organization=${selectedOrganization}&corporate=${
            selectedCorporate || ""
          }`,
          axiosConfig
        );
        if (response.status === 200) {
          if (response.data.message === "Report Found") {
            dispatch(
              setReportExists({
                exists: true,
                orgName: response.data.organization,
                corpName: response.data.corporate,
              })
            );
          } else {
            dispatch(setReportExists({ exists: false }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchInvestmentCorporate = async () => {
    try {
      const response = await axiosInstance.get(
        `/sustainapp/all_corporate_list/`,
        {
          params: {
            organisation: selectedOrganization,
            corporate: selectedCorporate,
            start: startDate,
            end: endDate,
            reportBy: reportBy,
          },
        }
      );
      dispatch(setInvestmentCorporates(response.data));
    } catch (e) {
      console.log("failed fetching investment corporates", e);
    }
  };

  const fetchOrg = async () => {
    try {
      const response = await axiosInstance.get(`/orggetonly`);
      dispatch(setOrganizations(response.data));
    } catch (e) {
      console.log("failed fetching organizations", e);
    }
  };

  const fetchCorporates = async (organizationId) => {
    try {
      const response = await axiosInstance.get(`/corporate/`, {
        params: { organization_id: organizationId },
      });
      dispatch(setCorporates(response.data));
    } catch (e) {
      console.log("failed fetching corporates", e);
    }
  };

  const fetchReports = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/sustainapp/report_details/`);
      setData(response.data);
    } catch (error) {
      setData([]);
      console.error("Failed to fetch reports:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Effects
  useEffect(() => {
    dispatch(setHeadertext1(""));
    dispatch(setHeaderdisplay("none"));
    dispatch(setHeadertext2("Report"));
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      fetchOrg();
      fetchReports();
      isMounted.current = false;
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Clear localStorage on mount
    localStorage.removeItem("reportid");
    localStorage.removeItem("reportorgname");
    localStorage.removeItem("reportstartdate");
    localStorage.removeItem("reportenddate");
    localStorage.removeItem("organizationcountry");
    localStorage.removeItem("reportname");
    localStorage.removeItem("selectedImage");
  }, []);

  useEffect(() => {
    getMaterialityAssessment();
    getReportExist();
    setMassgeshow(false);
  }, [
    reportBy,
    startDate,
    endDate,
    selectedOrganization,
    selectedCorporate,
    reportType,
  ]);

  useEffect(() => {
    if (selectedOrganization && startDate && endDate) {
      fetchInvestmentCorporate();
    }
  }, [selectedOrganization, startDate, endDate, selectedCorporate]);

  useEffect(() => {
    if (selectedOrganization) {
      fetchCorporates(selectedOrganization);
    }
  }, [selectedOrganization]);

  // Event handlers
  const handleOwnershipRatioChange = (index, input) => {
    const sanitized = input.replace("%", "");

    if (sanitized === "") {
      dispatch(setOwnershipRatio({ index, value: "" }));
      return;
    }

    if (!/^\d{0,3}(\.\d{0,2})?$/.test(sanitized)) return;

    const numericValue = Number(sanitized);
    if (numericValue === 0 || numericValue > 100) return;

    dispatch(setOwnershipRatio({ index, value: sanitized }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!reportName) {
      newErrors.reportname = "Name is required.";
    }
    if (!reportType) {
      newErrors.reporttype = "Please select Type Of Report.";
    }
    if (!reportBy) {
      newErrors.firstSelection = "Please select Report by";
    }
    if (reportBy === "Organization" && !selectedOrganization) {
      newErrors.selectedOrgrs = "Please select Organisation.";
    }
    if (reportBy === "Corporate") {
      if (!selectedOrganization) {
        newErrors.selectedOrgs = "Please select Organisation";
      }
      if (!selectedCorporate) {
        newErrors.selectedCorp = "Please select Corporate.";
      }
    }
    if (!startDate) {
      newErrors.startdate = "Please select a start date";
    }
    if (!endDate) {
      newErrors.enddate = "Please select an end date";
    }

    if (
      reportType === "GHG Report - Investments" &&
      investmentCorporates?.length > 0
    ) {
      const validCheckedEntities = investmentCorporates.filter(
        (entity) =>
          entity.emission_data &&
          entity.checked &&
          entity.ownershipRatio !== "" &&
          !isNaN(entity.ownershipRatio) &&
          Number(entity.ownershipRatio) > 0 &&
          Number(entity.ownershipRatio) <= 100
      );

      if (validCheckedEntities.length === 0) {
        newErrors.investmentEntities =
          "Please check and enter ownership ratio (1–100%) for at least one investment corporate with data.";
      }
    }

    return newErrors;
  };

  const submitForm = async () => {
    dispatch(setLoading(true));

    // const selectedEntities = investmentCorporates
    //   .filter((entity) => entity.checked)
    //   .map((entity) => ({
    //     corporate_id: entity.id,
    //     ownership_ratio: parseInt(entity.ownershipRatio),
    //   }));

    const submitData = {
      name: reportName,
      report_type: reportType,
      report_by: reportBy,
      start_date: startDate,
      end_date: endDate,
      organization: selectedOrganization,
      corporate: selectedCorporate,
      // investment_corporates: selectedEntities,
      // assessment_id: selectedAssessmentId || null,
      include_material_topics: includeMaterialTopics,
      include_content_index: includeContentIndex,
    };

    try {
      const response = await post(`/sustainapp/report_create/`, submitData);
      console.log('response for creating report',response)

      if (response.status === "200") {
        toast.success("Report has been added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        handleCloseModal();
        fetchReports();

        // Store report data in localStorage
        localStorage.setItem("reportid", response.data.id);
        localStorage.setItem("reportorgname", response.data.organization_name);
        localStorage.setItem("reportstartdate", response.data.start_date);
        localStorage.setItem("reportenddate", response.data.end_date);
        localStorage.setItem("reportCreatedOn", response.data.created_at);
        localStorage.setItem(
          "organizationcountry",
          response.data.organization_country
        );
        localStorage.setItem("reportType", reportType);
        localStorage.setItem("reportname", reportName);

        // Navigate based on report type
        if (
          reportType === "GRI Report: In accordance With" ||
          reportType === "GRI Report: With Reference to" ||
          reportType === "Custom ESG Report"
        ) {
          router.push("/dashboard/Report/ESG");
        } else if (reportType == "canada_bill_s211_v2") {
          router.push("/dashboard/Report/Bills211");
        } else {
          router.push("/dashboard/Report/GHG/Ghgtemplates");
        }
      } else if (response.status === "204") {
        toast.error("No data available for the given corporate IDs", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleCloseModal();
      }
    } catch (error) {
      if (error.status === 400) {
        setMassgeshow(true);
      } else {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleCloseModal();
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      dispatch(setErrors({}));
      await submitForm();
    } else {
      dispatch(setErrors(formErrors));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setMassgeshow(false);
    setIsMenuOpen(false);
    dispatch(resetForm());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMassgeshow(false);
    setMaterialityAssessmentLen([]);
    dispatch(resetForm());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="my-10 pb-5 xl:mx-8 md:mx-8 text-left border border-gray-300 rounded-md">
        <div className="px-3 xl:flex py-4 justify-between">
          <div>
            <h1 className="text-[#101828] mb-1 text-[1.375rem] font-bold">
              Report
            </h1>
            <p className="text-[14px] text-[#667085]">
              All the reports generated for the organization can be accessed
              here
            </p>
          </div>
          <div
            className="flex items-center space-x-2 text-[#007EEF] text-xs font-bold leading-[15px] cursor-pointer xl:ml-2 xl:float-end xl:mt-0 mt-2"
            onClick={handleOpenModal}
          >
            <div className="text-[#007EEF] text-[14px] font-bold leading-[15px]">
              Add Report
            </div>
            <MdAdd className="text-[14px]" />
          </div>
        </div>

        <div className="mt-3">
          <TableWithPagination
            data={data}
            setData={setData}
            defaultItemsPerPage={10}
            fetchReoprts={fetchReports}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
          />
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative top-5 border xl:w-[50%] w-[95%] shadow-lg rounded-md bg-white xl:ml-40 max-h-[110vh] overflow-y-auto">
            <div className="mt-2">
              {/* Header */}
              <div className="flex justify-between items-center drop-shadow-lg pt-2 w-full mb-3">
                <h2 className="text-black text-opacity-90 text-[22px] font-normal leading-relaxed flex space-x-8 items-center ms-6">
                  <span>New Report</span>
                </h2>
                <button
                  className="absolute top-2 right-2 mt-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-left px-7">
                <p className="text-gray-600 text-sm mb-6">
                  Enter name and select type of report, organization /
                  corporate, and time period
                </p>

                {/* Validation Messages */}
                {massgeshow && (
                  <div className="mb-5">
                    <div className="flex items-start p-4 border-t-2 border-[#F98845] rounded shadow-md">
                      <FaExclamationTriangle className="text-[#F98845] w-6 h-6 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="font-bold text-left text-[#0D024D]">
                          Mandatory GRI: General Disclosures missing
                        </p>
                        <p className="text-[12px] text-[#0D024D] mt-1">
                          Please fill the missing disclosures of GRI Reporting
                          Info under
                          <strong> Collect &gt; General</strong> section to
                          proceed.
                        </p>
                        <div className="mt-2 text-left flex">
                          <p className="text-[#0D024D] text-[12px]">
                            Proceed to Collect &gt;
                          </p>
                          <Link
                            href="/dashboard/general"
                            className="text-blue-500 text-sm font-semibold flex"
                          >
                            General &gt; GRI Reporting Info{" "}
                            <GoArrowRight className="font-bold mt-1 ml-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {reportExists && (
                  <div className="mb-5">
                    <div className="flex items-start p-4 border-t-2 border-[#F98845] rounded shadow-md">
                      <FaExclamationTriangle className="text-[#F98845] w-5 h-5 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-left text-[#0D024D] text-[15px]">
                          A report already exists for {selectedOrgName}{" "}
                          {selectedCorpName && `and ${selectedCorpName}`} for
                          the selected period. Do you want to create another
                          report?
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Report Name */}
                  <div>
                    <label className="block text-neutral-800 text-[14px] font-medium mb-2">
                      Report Name
                    </label>
                    <input
                      type="text"
                      value={reportName}
                      onChange={(e) => dispatch(setReportName(e.target.value))}
                      placeholder="Name"
                      className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm"
                    />
                    {errors.reportname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.reportname}
                      </p>
                    )}
                  </div>

                  {/* Report Type */}
                  <div>
                    <label className="block text-neutral-800 text-[14px] font-medium mb-2">
                      Select Type of Report
                    </label>
                    <div className="relative">
                      <select
                        value={reportType}
                        onChange={(e) =>
                          dispatch(setReportType(e.target.value))
                        }
                        className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm appearance-none bg-white"
                      >
                        <option value="" disabled>
                          Select Report Type
                        </option>
                        <option value="Custom ESG Report">
                          Custom ESG Report
                        </option>
                        <option value="GHG Accounting Report">
                          GHG Accounting Report
                        </option>
                        <option value="GHG Report - Investments">
                          GHG Report - Investments
                        </option>
                        <option value="GRI Report: In accordance With">
                          GRI Report: In accordance With
                        </option>
                        <option value="GRI Report: With Reference to">
                          GRI Report: With Reference to
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.reporttype && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.reporttype}
                      </p>
                    )}
                  </div>

                  {/* Report By */}
                  <div>
                    <label className="block text-neutral-800 text-[14px] font-medium mb-2">
                      Report by
                    </label>
                    <div className="relative">
                      <select
                        value={reportBy}
                        onChange={(e) => dispatch(setReportBy(e.target.value))}
                        className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm appearance-none bg-white"
                      >
                        <option value="" disabled>
                          Select option
                        </option>
                        <option value="Organization">Organization</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.firstSelection && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstSelection}
                      </p>
                    )}
                  </div>

                  {/* Organization/Corporate Selection */}
                  {
                    <div
                      className={`grid ${
                        reportBy === "Corporate"
                          ? "grid-cols-1 md:grid-cols-2"
                          : "grid-cols-1"
                      } gap-4`}
                    >
                      <div>
                        <label className="block text-neutral-800 text-[14px] font-medium mb-2">
                          Select Organization
                        </label>
                        <div className="relative">
                          <select
                            value={selectedOrganization || ""}
                            onChange={(e) =>
                              dispatch(setSelectedOrganization(e.target.value))
                            }
                            className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm appearance-none bg-white"
                          >
                            <option value="" disabled>
                              --Select Organization--
                            </option>
                            {organizations?.map((org) => (
                              <option key={org.id} value={org.id}>
                                {org.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        {(errors.selectedOrgrs || errors.selectedOrgs) && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.selectedOrgrs || errors.selectedOrgs}
                          </p>
                        )}
                      </div>

                      {reportBy === "Corporate" && (
                        <div>
                          <label className="block text-neutral-800 text-[14px] font-medium mb-2">
                            Select Corporate
                          </label>
                          <div className="relative">
                            <select
                              value={selectedCorporate || ""}
                              onChange={(e) =>
                                dispatch(setSelectedCorporate(e.target.value))
                              }
                              className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm appearance-none bg-white"
                              disabled={!selectedOrganization}
                            >
                              <option value="" disabled>
                                --Select Corporate--
                              </option>
                              {corporates?.map((corp) => (
                                <option key={corp.id} value={corp.id}>
                                  {corp.name}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                          {errors.selectedCorp && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.selectedCorp}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  }

                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-800 text-[14px] font-medium mb-2">
                        Reporting Period (From)
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) =>
                            dispatch(setStartDate(e.target.value))
                          }
                          className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      {errors.startdate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.startdate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-neutral-800 text-[14px] font-medium mb-2">
                        Reporting Period (To)
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => dispatch(setEndDate(e.target.value))}
                          className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      {errors.enddate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.enddate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Potential Future Requirement */}

                  {/* Investment Corporate Selection - Only for GHG Investment Reports */}
                  {/* {reportType === "GHG Report - Investments" && investmentCorporates?.length > 0 && (
                    <div>
                      <label className="block text-neutral-800 text-[13px] font-normal mb-2">
                        Select Investment Corporate
                      </label>
                      <div className="border border-gray-300 rounded-md h-[200px] overflow-y-auto">
                        <div className="p-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-gray-400 font-semibold text-[13px]">
                              Investment Corporate
                            </div>
                            <div className="text-gray-400 font-semibold text-[13px]">
                              Ownership Ratio %
                            </div>

                            {investmentCorporates.map((entity, index) => (
                              <React.Fragment key={index}>
                                <div className={`flex relative items-center space-x-2 ${!entity.emission_data ? 'opacity-30' : ''}`}>
                                  <input
                                    id={entity.id}
                                    type="checkbox"
                                    disabled={!entity.emission_data}
                                    checked={entity.checked || false}
                                    onChange={() => dispatch(toggleInvestmentCorporate({ index }))}
                                    className="form-checkbox h-4 w-4 accent-green-600"
                                  />
                                  <label
                                    htmlFor={entity.id}
                                    className="text-gray-800 text-[13px] cursor-pointer"
                                    data-tooltip-id={`tooltip-${entity.id}`}
                                    data-tooltip-html={`${!entity.emission_data ? '<p>No data available for the selected Reporting period</p>' : ''}`}
                                  >
                                    {entity.name}
                                  </label>
                                </div>
                                <ReactTooltip
                                  id={`tooltip-${entity.id}`}
                                  place="top"
                                  effect="solid"
                                  style={{
                                    width: "290px",
                                    backgroundColor: "#FFF",
                                    color: "#000",
                                    fontSize: "12px",
                                    borderRadius: "8px",
                                    textAlign: "left",
                                    zIndex: 100,
                                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                    opacity: 1,
                                  }}
                                />
                                <div className="relative w-full">
                                  <input
                                    type="text"
                                    placeholder="Enter Ownership Ratio"
                                    className={`border-b p-2 rounded w-full text-[13px] pr-6 ${!entity.checked ? 'opacity-35' : ''}`}
                                    disabled={!entity.checked}
                                    value={entity.ownershipRatio || ''}
                                    onChange={(e) => handleOwnershipRatioChange(index, e.target.value)}
                                  />
                                  <span className="absolute right-2 top-2 text-[13px] text-gray-500 pointer-events-none">%</span>
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                      {errors.investmentEntities && (
                        <p className="text-red-500 text-sm mt-1">{errors.investmentEntities}</p>
                      )}
                    </div>
                  )} */}

                  {/* Materiality Assessment Selection */}
                  {/* {materialityAssessmentLen && materialityAssessmentLen.length > 1 && (
                    <div>
                      <div className="flex gap-2 mb-2">
                        <IoIosWarning className="text-[#F98845] w-5 h-5" />
                        <p className="text-[14px] text-[#F98845] font-[500]">
                          More than one materiality assessment is present in the selected date range
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-800 text-[13px] font-normal mb-2">
                          Select Materiality Assessment *
                        </p>
                        <select
                          className="block w-1/3 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-2"
                          value={selectedAssessmentId || ''}
                          onChange={(e) => dispatch(setSelectedAssessmentId(e.target.value))}
                        >
                          <option value="" disabled>
                            Select Assessment
                          </option>
                          {materialityAssessmentLen.map((val) => (
                            <option key={val.id} value={val.id} className="text-black text-sm hover:bg-blue-100">
                              {`${formatDate(val.start_date)} - ${formatDate(val.end_date)}`}
                            </option>
                          ))}
                        </select>
                        <p className="text-[#ACACAC] text-[12px] font-normal">
                          Select one of the materiality assessment found in the date range
                        </p>
                      </div>
                    </div>
                  )} */}

                  {/* New Toggle Options */}
                  <div className="border border-gray-300 p-4 rounded-lg space-y-4 flex justify-between items-center">
                    {/* Include Management of Material Topics */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeMaterialTopics}
                            onChange={(e) =>
                              dispatch(
                                setIncludeMaterialTopics(e.target.checked)
                              )
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                              includeMaterialTopics
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                                includeMaterialTopics
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              } mt-0.5 ml-0.5`}
                            ></div>
                          </div>
                        </label>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-900">
                          Include Management of Material Topics
                        </label>
                        <p className="text-sm text-gray-600">
                          Checking this option will include the disclosures on
                          management of material topics for all selected
                          sections.
                        </p>
                      </div>
                    </div>

                    {/* Include Content Index */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeContentIndex}
                            onChange={(e) =>
                              dispatch(setIncludeContentIndex(e.target.checked))
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                              includeContentIndex
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                                includeContentIndex
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              } mt-0.5 ml-0.5`}
                            ></div>
                          </div>
                        </label>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-900">
                          Include Content Index
                        </label>
                        <p className="text-sm text-gray-600">
                          Checking this option will add a GRI content index at
                          the end of the report
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pb-4">
                    <button
                      type="submit"
                      disabled={!isFormValid || isLoading}
                      className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        isFormValid && !isLoading
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Report
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
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
    </>
  );
};

export default Report;
