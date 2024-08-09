"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';
const Screenone = ({ nextStep }) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();

  const [reportname, setReportname] = useState("");
  const [reportingentity, setReportingentit] = useState("");
  const [reportingyear, setReportingyear] = useState("");
  const [reportingdateform, setReportingdateform] = useState("");
  const [reportingdateto, setReportingdateto] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isMounted = useRef(true);
  // const data = 1;
  const [data, setData] = useState();
  // const fetchBillsone = async () => {
  //   LoaderOpen(); // Assume this is to show some loading UI

  //   try {
  //     const response = await axios.get(
  //       `${
  //         process.env.REACT_APP_BACKEND_URL
  //       }/identifying-information/?screen=1&user_id=${localStorage.getItem(
  //         "user_id"
  //       )}`
  //     );

  //     // If the request is successful but you specifically want to handle 404 inside here
  //     if (response.status === 200) {
  //       // Assuming you want to do something with the data for successful requests
  //       // setData(response.data); // Uncomment or modify as needed
  //       console.log(response.data, "bills 211");
  //       // You might want to setData or handle the error differently here
  //       setData(response.data.report_purpose_1);
  //       setReportname(response.data.report_purpose_1);
  //       setReportingentit(response.data.reporting_legal_name_2);
  //       setReportingdateform(response.data.financial_reporting_year_from_3);
  //       setReportingdateto(response.data.financial_reporting_year_to_3);
  //       LoaderClose();
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       // Here you can check if error.response exists and then further check the status code
  //       if (error.response && error.response.status === 404) {
  //         // Handle 404 specifically
  //         console.log(error.response.data, "bills 211");
  //         // You might want to setData or handle the error differently here
  //         setData(error.response.data.detail); // Adjust according to your needs
  //       } else {
  //         // Handle other errors
  //         console.error("An error occurred:", error.message);
  //       }
  //     } else {
  //       // Handle non-Axios errors
  //       console.error("An unexpected error occurred:", error);
  //     }
  //     LoaderClose();
  //   }
  // };
  // useEffect(() => {
  //   if (isMounted.current) {
  //   // fetchBillsone();
  //     isMounted.current = false;
  //   }
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);
  const handleeditClick = () => {
    setIsClicked(!isClicked);
  // fetchBillsone();
  };

  const handleReportname = (event) => {
    setReportname(event.target.value);

  };
  const handleReportingentity = (event) => {
    setReportingentit(event.target.value);

  };
  const handleReportndate = (event) => {
    setReportingdateform(event.target.value);

  };
  const handleReportndateto = (event) => {
    setReportingdateto(event.target.value);

  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleupdateform = async () => {
    LoaderOpen();

    const sandData = {
      report_purpose_1: reportname,
      reporting_legal_name_2: reportingentity,
      financial_reporting_year_from_3: reportingdateform,
      financial_reporting_year_to_3: reportingdateto,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=1`,
        sandData
      )
      .then((response) => {
        if (response.status == "200") {
          console.log(response.status);
          toast.success("Details updated successfully", {
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
          setIsClicked(false);
        // fetchBillsone();
        } else {
          toast.error("Error", {
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
      })
      .catch((error) => {
        const errorMessage = "All form question fields are required.";
        toast.error(errorMessage, {
          // Corrected 'error.message'
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      });
  };
  const submitForm = async () => {
    LoaderOpen();

    const sandData = {
      report_purpose_1: reportname,
      reporting_legal_name_2: reportingentity,
      financial_reporting_year_from_3: reportingdateform,
      financial_reporting_year_to_3: reportingdateto,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=1`,
        sandData
      )
      .then((response) => {
        if (response.status == "200") {
          // console.log(response.status);
          toast.success("added successfully", {
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
          toast.error("Error", {
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
      });
    //console.log(sandData);
  };
  const coNextStep = () => {
    nextStep();
  };
  const continueToNextStep = () => {
    let newErrors = {};

    if (reportname === "" || reportname === "default") {
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
  const validateForm = () => {
    let newErrors = {};
    if (!reportingentity) {
      newErrors.reportingentity = "Name is required.";
    }

    return newErrors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setError({}); // Clear any existing errors
      await handleupdateform(); // Proceed with the form submission
    } else {
      setError(formErrors); // Update the state with the validation errors
    }
  };
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className="flex justify-between items-center shadow-sm border-gray-100">
        <div
          className={`${
            open ? "w-[95%] " : "w-[95%]"
          } flex justify-between items-center`}
        >
          <div className="text-left mb-5 ml-6 mt-4">
            <p className="text-sm">Social</p>
           <p className="gradient-text text-[22px] h-[24px]">
              Bill S-211 - Fighting Bill Forced Labour and Child Labour in
              Supply Chains Act
            </p>
          </div>
        </div>
      </div>
      {isClicked ? (
        <>
          <div className="container mx-auto mt-5">
            <div className="flex">
              <div className="w-[72%]">
                <p className="font-bold  text-md mx-4 ">
                  {" "}
                  Identifying information
                </p>
              </div>
              <div className="text-md flex">
                <div> 1/7 </div>
                <div className="flex">
                  <MdClose
                     className="text-[17.5px] ml-2 mt-1 cursor-pointer"

                    onClick={handleeditClick}
                  />
                  <IoSaveOutline
                     className="text-[17.5px] ml-2 mt-1 cursor-pointer"

                    // onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4 mt-8">
            <form className="w-full text-left">
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px]  mb-2 ml-1"
                  htmlFor="username"
                >
                  1.This report is for which of the following?*
                </label>
                <div className="relative mb-1">
                  <select
                    className={`${
                      open ? "w-[78%]" : "w-[78%]"
                    } rounded-md border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    value={reportname}
                    onChange={handleReportname}
                  >
                    <option value="default">Select Entity</option>
                    <option value="Entity">Entity</option>
                    <option value="GovernmentInsititution">
                      Government Insititution
                    </option>
                    {/* Add more options here as needed */}
                  </select>

                </div>
                {error.reportname && (
                  <p className="text-red-500 ml-1">
                    {error.reportname}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px] mb-2 ml-1"
                  htmlFor="username"
                >
                  2.Legal name of reporting entity *
                </label>
                <div className="relative mb-1">
                  <input
                    type="text"
                    placeholder="Entity Name"
                    className={`${
                      open ? "w-[78%]" : "w-[78%]"
                    } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                    value={reportingentity}
                    onChange={handleReportingentity}
                  ></input>
                </div>
                {error.reportingentity && (
                  <p className="text-red-500 ml-1">
                    {error.reportingentity}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px] mb-2 ml-1"
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
                        className="w-[100%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer"
                      />
                    </div>
                    {error.reportingdateform && (
                      <p className="text-red-500 ml-1">
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
                        className="w-[100%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer"
                      />
                    </div>
                    {error.reportingdateto && (
                      <p className="text-red-500 ml-1">
                        {error.reportingdateto}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[80%] mb-5">
                <div className="float-right">
                  <button
                    type="button"
                    disabled
                    className="px-3 py-1.5 font-semibold rounded  w-[80px] text-[12px] bg-blue-400 text-white"
                  >
                    {" "}
                    Next &gt;
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto mt-5">
            <div className="flex">
              <div className="w-[75%]">
                <p className="font-bold  text-md mx-4 ">
                  {" "}
                  Identifying information
                </p>
              </div>
              <div className="text-md flex">
                <div> 1/7 </div>
                <div>
                  {data !== null ? (
                    <MdOutlineModeEditOutline
                    className="text-[15.5px] ml-2 mt-1 cursor-pointer"

                      onClick={handleeditClick}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4 mt-8">
            {data !== null ? (
              <>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px]  mb-2 ml-1"
                    htmlFor="username"
                  >
                    1.This report is for which of the following?*
                  </label>
                  <div className="relative mb-1">
                    <select
                      className={`${
                        open ? "w-[78%]" : "w-[78%]"
                      } rounded-md border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      value={reportname}

                    >
                      <option value="default" >
                        Select Entity
                      </option>
                      <option value="Entity" >
                        Entity
                      </option>
                      <option value="GovernmentInsititution">
                        Government Insititution
                      </option>
                      {/* Add more options here as needed */}
                    </select>

                  </div>
                </div>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    htmlFor="username"
                  >
                    2.Legal name of reporting entity *
                  </label>
                  <div className="relative mb-1">
                    <input
                      type="text"
                      placeholder="Entity Name"
                      className={`${
                        open ? "w-[78%]" : "w-[78%]"
                      } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                      defaultValue={reportingentity}

                    ></input>
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    htmlFor="username"
                  >
                    3.Financial reporting year*
                  </label>
                  <div className="flex">
                    <div className="w-[37%]">
                      <div className="relative mb-1">
                        <input
                          type="date"
                          defaultValue={reportingdateform}

                          className="w-[100%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="w-[40%] ml-2">
                      <div className="relative mb-1">
                        <input
                          type="date"
                          defaultValue={reportingdateto}

                          className="w-[100%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[80%] mb-5">
                  <div className="float-right">
                    <button
                      type="button"
                      onClick={coNextStep}
                      className="px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white"
                    >
                      {" "}
                      Next &gt;
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <form className="w-full text-left">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px]  mb-2 ml-1"
                    htmlFor="username"
                  >
                    1.This report is for which of the following?*
                  </label>
                  <div className="relative mb-1">
                    <select
                     className={`${
                      open ? "w-[78%]" : "w-[78%]"
                    } rounded-md border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      value={reportname}
                      onChange={handleReportname}
                    >
                      <option value="default">Select Entity</option>
                      <option value="Entity">Entity</option>
                      <option value="GovernmentInsititution">
                        Government Insititution
                      </option>
                      {/* Add more options here as needed */}
                    </select>

                  </div>
                  {error.reportname && (
                    <p className="text-red-500 ml-1">
                      {error.reportname}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    htmlFor="username"
                  >
                    2.Legal name of reporting entity *
                  </label>
                  <div className="relative mb-1">
                    <input
                      type="text"
                      placeholder="Entity Name"
                      className={`${
                        open ? "w-[78%]" : "w-[78%]"
                      } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                      value={reportingentity}
                      onChange={handleReportingentity}
                    ></input>
                  </div>
                  {error.reportingentity && (
                    <p className="text-red-500 ml-1">
                      {error.reportingentity}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
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
                          className="w-[100%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer"
                        />
                      </div>
                      {error.reportingdateform && (
                        <p className="text-red-500 ml-1">
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
                          className="w-[100%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer"
                        />
                      </div>
                      {error.reportingdateto && (
                        <p className="text-red-500 ml-1">
                          {error.reportingdateto}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-[80%] mb-5">
                  <div className="float-right">
                    <button
                      type="button"
                      onClick={continueToNextStep}
                      className="px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white"
                    >
                      {" "}
                      Next &gt;
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </>
      )}


    </>
  );
};

export default Screenone;