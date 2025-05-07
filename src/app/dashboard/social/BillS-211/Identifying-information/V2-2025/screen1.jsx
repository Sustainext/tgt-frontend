"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";
// import { yearInfo, months } from "@/app/shared/data/yearInfo";
const Screenone = ({ nextStep, selectedCorp, selectedOrg, year,reportType }) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [reportname, setReportname] = useState("Select Entity");
  const [reportingentity, setReportingentit] = useState("");
  const [reportingdateform, setReportingdateform] = useState("");
  const [reportingdateto, setReportingdateto] = useState("");
  const [loopen, setLoOpen] = useState(false);
const yearInfo =[
  "May 31, 2024",
  "May 31, 2025"
]

  const fetchBillSone = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/identifying-information/?screen=1&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`
      );

      if (response.status === 200) {
        setReportname(response.data.report_purpose_1);
        setReportingentit(response.data.reporting_legal_name_2);
        setReportingdateform(response.data.financial_reporting_year_from_3);
        setReportingdateto(response.data.financial_reporting_year_to_3);
        LoaderClose();
      }
      else if(response.status==404){
        setReportname("Select Entity");
        setReportingentit("");
        setReportingdateform("");
        setReportingdateto("");
        LoaderClose();
      }
      else{
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }  catch (error) {
      LoaderClose();
      console.error("API call failed:", error);
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    // if (isMounted.current) {
    
    //   isMounted.current = false;
    // }
    // return () => {
    //   isMounted.current = false;
    // };
    if(reportType=="Organization"){
      if(selectedOrg&&year){
        fetchBillSone();
      }
    }
    else{
      if(selectedOrg&&year&&selectedCorp){
        fetchBillSone();
      }
    }
    
    setReportname("Select Entity")
    setReportingentit("")
    setReportingdateform("")
    setReportingdateto("")
    
  }, [selectedCorp,selectedOrg,year]);

 
  const handleReportname = (event) => {
    const value = event.target.value;
    setReportname(value);
    if (value !== "Select Entity") {
      setError((prev) => ({ ...prev, reportname: "" }));
    }
  };

  const handleReportingentity = (event) => {
    const value = event.target.value;
    setReportingentit(value);
    if (value.trim() !== "") {
      setError((prev) => ({ ...prev, reportingentity: "" }));
    }
  };

  // const handleReportndate = (event) => {
  //   const value = event.target.value;
  //   setReportingdateform(value);
  //   if (value !== "") {
  //     setError((prev) => ({ ...prev, reportingdateform: "" }));
  //   }
  // };

  // const handleReportndateto = (event) => {
  //   const value = event.target.value;
  //   setReportingdateto(value);
  //   if (value !== "") {
  //     setError((prev) => ({ ...prev, reportingdateto: "" }));
  //   }
  // };

  const handleReportndate = (event) => {
    const value = event.target.value;
    setReportingdateform(value);
    if (value !== "") {
      setError((prev) => ({ ...prev, reportingdateform: "" }));
    }

    // Ensure to date is not less than from date
    if (reportingdateto && value > reportingdateto) {
      setError((prev) => ({
        ...prev,
        reportingdateto: "To date cannot be earlier than from date.",
      }));
    } else {
      setError((prev) => ({ ...prev, reportingdateto: "" }));
    }
  };

  const handleReportndateto = (event) => {
    const value = event.target.value;
    setReportingdateto(value);
    if (value !== "") {
      setError((prev) => ({ ...prev, reportingdateto: "" }));
    }

    // Ensure to date is not less than from date
    if (reportingdateform && value < reportingdateform) {
      setError((prev) => ({
        ...prev,
        reportingdateto: "To date cannot be earlier than from date.",
      }));
    } else {
      setError((prev) => ({ ...prev, reportingdateto: "" }));
    }
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const submitForm = async () => {

    try{
      LoaderOpen();

      const sendData = {
        report_purpose_1: reportname,
        reporting_legal_name_2: reportingentity,
        financial_reporting_year_from_3: reportingdateform,
        financial_reporting_year_to_3: reportingdateto,
        organization_id: selectedOrg,
        corporate_id: selectedCorp?selectedCorp:null,
        year: year
      };
      const response= await axiosInstance
        .post(
          `${process.env.BACKEND_API_URL}/canadabills211/identifying-information/?screen=1`,
          sendData
        )
        if (response.status == "200") {
          toast.success("Data added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          LoaderClose();
          nextStep();
        } else {
          toast.error("Oops, something went wrong", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          LoaderClose();
        }
    }catch (error) {
      LoaderClose();
      console.error("API call failed:", error);
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    
  };
  const continueToNextStep = () => {
    let newErrors = {};

    if (reportname === "" || reportname === "Select Entity") {
      newErrors.reportname = "Please select an entity.";
    }

    if (!reportingentity) {
      newErrors.reportingentity = "Name is required.";
    }
    if (!reportingdateform) {
      newErrors.reportingdateform = "Please select a date";
    }
    if (!reportingdateto) {
      newErrors.reportingdateto = "Please select a date";
    }
    if(reportingdateto<reportingdateform){
      newErrors.reportingdateto = "To date cannot be earlier than from date.";
    }
    if (Object.keys(newErrors).length === 0) {
      setError({});
      submitForm();
    } else {
      setError(newErrors);
    }
  };

  return (
    <>
      <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-0 mt-2">
        <form className="w-full text-left">
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500]  mb-2 ml-1"
              htmlFor="username"
            >
              1. This report is for which of the following?*
            </label>
            <div className="relative mb-1">
              <select
                className={`xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-full rounded-md  text-[12px] py-3 px-2 text-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border-gray-400 border `}
                value={reportname}
                onChange={handleReportname}
              >
                <option className="text-sm" value="Select Entity">
                  Select Entity
                </option>
                <option className="text-sm" value="An entity">
                An entity
                </option>
                <option className="text-sm" value="A government institution">
                A government institution
                </option>
                {/* Add more options here as needed */}
              </select>
            </div>
            {error.reportname && (
              <p className="text-red-500 ml-1 text-[12px]">
                {error.reportname}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
              htmlFor="username"
            >
              2. State the legal name of the reporting entity or government institution *
            </label>
            <div className="relative mb-1">
              <input
                type="text"
                placeholder="Entity Name"
                className={`xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[99%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                value={reportingentity}
                onChange={handleReportingentity}
              ></input>
            </div>
            {error.reportingentity && (
              <p className="text-red-500 ml-1 text-[12px]">
                {error.reportingentity}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
              htmlFor="username"
            >
              3. Reporting year*
            </label>
            <div className="xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[99%]">
              
                <div className="relative mb-1">
                <select
                      name="year"
                      className="block w-full rounded-md  pl-4 text-neutral-600 text-[12px] font-normal leading-tight ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 py-3 border-gray-400 border "
                      // value={formState.year}
                      // onChange={handleChange}
                    >
                      <option disabled value="">
                        Select year
                      </option>
                      {yearInfo.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                </div>
                {error.reportingdateform && (
                  <p className="text-red-500 ml-1 text-[12px]">
                    {error.reportingdateform}
                  </p>
                )}
             
         
            </div>
          </div>
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
              htmlFor="username"
            >
              4. Financial reporting year*
            </label>
            <div className="flex">
              <div className="xl:w-[37%]  lg:w-[37%]  2xl:w-[37%]  md:w-[37%]  2k:w-[37%]  4k:w-[37%] w-[50%] ">
                <div className="relative mb-1">
                  <input
                    type="date"
                    value={reportingdateform}
                    onChange={handleReportndate}
                    className="w-full border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer"
                  />
                </div>
                {error.reportingdateform && (
                  <p className="text-red-500 ml-1 text-[12px]">
                    {error.reportingdateform}
                  </p>
                )}
              </div>
              <div className="xl:w-[40%]  lg:w-[40%]  2xl:w-[40%]  md:w-[40%]  2k:w-[40%]  4k:w-[40%] w-[47%]  ml-2">
                <div className="relative mb-1">
                  <input
                    type="date"
                    value={reportingdateto}
                    onChange={handleReportndateto}
                    className="w-full border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer"
                  />
                </div>
                {error.reportingdateto && (
                  <p className="text-red-500 ml-1 text-[12px]">
                    {error.reportingdateto}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="xl:w-[78%]  lg:w-[78%]   2xl:w-[78%]   md:w-[78%]   2k:w-[78%]   4k:w-[78%]  w-full mb-5">
            <div className="float-right">
              <button
                type="button"
                onClick={continueToNextStep}
                disabled={!(selectedOrg && year)}
                className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${
                 reportType=="Organization"? !(selectedOrg && year) ? "opacity-30 cursor-not-allowed" : "" : !(selectedOrg && year && selectedCorp) ? "opacity-30 cursor-not-allowed" : ""
                }`}
              >
                {" "}
                Next &gt;
              </button>
            </div>
          </div>
        </form>
      </div>

      {loopen && (
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

export default Screenone;
