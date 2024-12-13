"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screenone = ({ nextStep, selectedCorp, selectedOrg, year }) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [reportname, setReportname] = useState("Select Entity");
  const [reportingentity, setReportingentit] = useState("");
  const [reportingdateform, setReportingdateform] = useState("");
  const [reportingdateto, setReportingdateto] = useState("");
  const [loopen, setLoOpen] = useState(false);

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();

  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetchBillSone = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/identifying-information/?screen=1&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
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
    if(selectedOrg&&year){
      fetchBillSone();
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

  const handleReportndate = (event) => {
    const value = event.target.value;
    setReportingdateform(value);
    if (value !== "") {
      setError((prev) => ({ ...prev, reportingdateform: "" }));
    }
  };

  const handleReportndateto = (event) => {
    const value = event.target.value;
    setReportingdateto(value);
    if (value !== "") {
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
          sendData,
          axiosConfig
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
    if (Object.keys(newErrors).length === 0) {
      setError({});
      submitForm();
    } else {
      setError(newErrors);
    }
  };

  return (
    <>
      <div className="mx-4 mt-2">
        <form className="w-full text-left">
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500]  mb-2 ml-1"
              htmlFor="username"
            >
              1.This report is for which of the following?*
            </label>
            <div className="relative mb-1">
              <select
                className={`w-[78%] rounded-md border-0 text-[12px] py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                value={reportname}
                onChange={handleReportname}
              >
                <option disabled className="text-sm" value="Select Entity">
                  Select Entity
                </option>
                <option className="text-sm" value="Entity">
                  Entity
                </option>
                <option className="text-sm" value="GovernmentInsititution">
                  Government Insititution
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
              2.Legal name of reporting entity *
            </label>
            <div className="relative mb-1">
              <input
                type="text"
                placeholder="Entity Name"
                className={`w-[78%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
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
              3.Financial reporting year*
            </label>
            <div className="flex">
              <div className="w-[37%]">
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
              <div className="w-[40%] ml-2">
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
          <div className="w-[78%] mb-5">
            <div className="float-right">
              <button
                type="button"
                onClick={continueToNextStep}
                disabled={!(selectedOrg && year)}
                className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${
                  !(selectedOrg && year) ? "opacity-30 cursor-not-allowed" : ""
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
