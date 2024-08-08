"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';

const Screenseven = ({ nextStep, prevStep }) => {
    const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportradioone, setReportnradioone] = useState("");
  const [reportingdescription, setReportingdescription] = useState();
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isMounted = useRef(true);
  const [data, setData] = useState();
//   const fetchBillsreport = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/annual_report/?screen=7&user_id=${localStorage.getItem("user_id")}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2114");
//         // You might want to setData or handle the error differently here
//         setData(response.data.training_provided_15);
//         setReportnradio(response.data.training_provided_15);
//         setReportnradioone(response.data.training_mandatory_15_1);
//         setReportingdescription(response.data.additional_info_training_16);
//         LoaderClose();
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         // Here you can check if error.response exists and then further check the status code
//         if (error.response && error.response.status === 404) {
//           // Handle 404 specifically
//           console.log(error.response.data, "bills 211");
//           // You might want to setData or handle the error differently here
//           setData(error.response.data.detail); // Adjust according to your needs
//         } else {
//           // Handle other errors
//           console.error("An error occurred:", error.message);
//         }
//       } else {
//         // Handle non-Axios errors
//         console.error("An unexpected error occurred:", error);
//       }
//       LoaderClose();
//     }
//   };
//   useEffect(() => {
//     if (isMounted.current) {
//       fetchBillsreport();
//       isMounted.current = false;
//     }
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
  const coNextStep = () => {
    nextStep();
  };

  const handleeditClick = () => {
    setIsClicked(!isClicked);
    // fetchBillsreport();
  };
  const handleReportnradio = (event) => {
    setReportnradio(event.target.value);
  };
  const handleReportnradioone = (event) => {
    setReportnradioone(event.target.value);
  };

  const handleReportingdescription = (event) => {
    setReportingdescription(event.target.value);
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleupdateform = async () => {
    let newentities;
    if (reportradio === "No") {
      newentities = null;
    } else {
      newentities = reportradioone;
    }
    LoaderOpen();

    const sandData = {
      training_provided_15: reportradio,
      additional_info_training_16: reportingdescription,
      training_mandatory_15_1: newentities,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=7`,
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
        //   fetchBillsreport();
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
    let unewentities;
    if (reportradio === "No") {
      unewentities = null;
    } else {
      unewentities = reportradioone;
    }
    LoaderOpen();

    const sandData = {
      training_provided_15: reportradio,
      additional_info_training_16: reportingdescription,
      training_mandatory_15_1: unewentities,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=7`,
        sandData
      )
      .then((response) => {
        if (response.status == "200") {
          console.log(response.status);
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
  const continueToNextStep = () => {
    let newErrors = {};

    if (!reportradio) {
      newErrors.reportradio = "This field is required. Please fill it out.";
    }
    if (reportradio === "Yes") {
      if (!reportradioone) {
        newErrors.reportradioone = "This field is required. Please fill it out.";
      }
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
    if (reportradio === "Yes") {
      if (!reportradioone) {
        newErrors.reportradioone = "This field is required. Please fill it out.";
      }
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
            <p className="gradient-text text-[22px]">
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
              <div className="w-[80%]">
                <p className="font-bold  text-md mx-4 "> Annual Report</p>
              </div>
              <div className="text-md flex">
                <div> 7/8</div>
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
                  className="block text-gray-700 text-[15px] mb-2 ml-1"
                  html
                  htmlFor="username"
                >
                  15. Does the entity currently provide training to employees on
                  forced labour and/or child labour? *
                </label>
                <div className="relative mb-1">
                  <div className="mb-3">
                     {" "}
                    <input
                      type="radio"
                      id="Yes"
                      name="radio"
                      value="Yes"
                      checked={reportradio === "Yes"}
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label
                      html
                      htmlFor="Yes"
                      className="text-[15px] text-gray-700"
                    >
                      Yes
                    </label>
                    <br />
                  </div>

                  <div className="mb-3">
                     {" "}
                    <input
                      type="radio"
                      id="No"
                      name="radio"
                      value="No"
                      checked={reportradio === "No"}
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label
                      html
                      htmlFor="No"
                      className="text-[15px] text-gray-700 "
                    >
                      No
                    </label>
                    <br />
                  </div>
                </div>
                {error.reportradio && (
                  <p className="text-red-500 ml-1">
                    {error.reportradio}
                  </p>
                )}
              </div>
              {reportradio === "Yes" && (
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    html
                    htmlFor="username"
                  >
                    15.1 If yes, is the training mandatory? *
                  </label>
                  <div className="relative mb-1">
                    <div className="mb-3">
                       {" "}
                      <input
                        type="radio"
                        id="Yesne"
                        name="radioone"
                        value="Yes"
                        checked={reportradioone === "Yes"}
                        onChange={handleReportnradioone}
                      />
                       {" "}
                      <label
                        html
                        htmlFor="Yesne"
                        className="text-[15px] text-gray-700"
                      >
                        Yes, the training is mandatory for all employees.
                      </label>
                      <br />
                    </div>
                    <div className="mb-3">
                       {" "}
                      <input
                        type="radio"
                        id="Yesone"
                        name="radioone"
                        value="Yesone"
                        checked={reportradioone === "Yesone"}
                        onChange={handleReportnradioone}
                      />
                       {" "}
                      <label
                        html
                        htmlFor="Yesone"
                        className="text-[15px] text-gray-700"
                      >
                        Yes, the training is mandatory for employees making
                        contracting or purchasing decisions.
                      </label>
                      <br />
                    </div>
                    <div className="mb-3">
                       {" "}
                      <input
                        type="radio"
                        id="Yestwo"
                        name="radioone"
                        value="Yestwo"
                        checked={reportradioone === "Yestwo"}
                        onChange={handleReportnradioone}
                      />
                       {" "}
                      <label
                        html
                        htmlFor="Yestwo"
                        className="text-[15px] text-gray-700 "
                      >
                        Yes, the training is mandatory for some employees.
                      </label>
                      <br />
                    </div>
                    <div className="mb-3">
                       {" "}
                      <input
                        type="radio"
                        id="Noen"
                        name="radioone"
                        value="No"
                        checked={reportradioone === "No"}
                        onChange={handleReportnradioone}
                      />
                       {" "}
                      <label
                        html
                        htmlFor="Noen"
                        className="text-[15px] text-gray-700 "
                      >
                        No, the training is voluntary.
                      </label>
                      <br />
                    </div>
                  </div>
                  {error.reportradioone && (
                    <p className="text-red-500 ml-1">
                      {error.reportradioone}
                    </p>
                  )}
                </div>
              )}
              <div className="mb-5 mt-3">
                <label
                  className="block text-gray-700 text-[15px] mb-2"
                  html
                  htmlFor="industryCheckbox"
                >
                  16. Please provide additional information on any measures the
                  entity has taken to remediate the loss of income to the most
                  vulnerable families that results from any measure taken to
                  eliminate the use of forced labour or child labour in its
                  activities and supply chains (if applicable) (1,500 character
                  limit).
                </label>
                <textarea
                  id="countriesOfOperation"
                  name="countriesOfOperation"
                  placeholder="Enter a description..."
                  className={`${
                    open ? "w-[90%]" : "w-[90%]"
                  }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                  value={reportingdescription}
                  // value={formData.countriesOfOperation}
                  // onChange={handleInputChange}
                  rows={5}
                  onChange={handleReportingdescription} // Specify the number of rows to determine the initial height
                />
                {/* <div className="my-1">
                  {error.reportingdescription && (
                    <p className="text-red-500">{error.reportingdescription}</p>
                  )}
                </div> */}
              </div>
              <div className="w-[90%] mb-5">
              <div className="float-right">
                <button
                  className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-400 text-[12px]"
                  disabled
                >
                  &lt; Previous
                </button>
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
              <div className="w-[80%]">
                <p className="font-bold  text-md mx-4 "> Annual Report</p>
              </div>
              <div className="text-md flex">
                <div> 7/8</div>
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
              <form className="w-[90%] text-left">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    html
                    htmlFor="username"
                  >
                    15. Does the entity currently provide training to employees
                    on forced labour and/or child labour? *
                  </label>
                  <div className="relative mb-1">
                    <div className="mb-3">
                       {" "}
                      <input
                        type="radio"
                        id="Yes"
                        name="radio"
                        value="Yes"
                        checked={reportradio === "Yes"}
                        onChange={handleReportnradio}
                        disabled={true}
                      />
                       {" "}
                      <label
                        html
                        htmlFor="Yes"
                        className="text-[15px] text-gray-700"
                      >
                        Yes
                      </label>
                      <br />
                    </div>

                    <div className="mb-3">
                       {" "}
                      <input
                        type="radio"
                        id="No"
                        name="radio"
                        value="No"
                        checked={reportradio === "No"}
                        onChange={handleReportnradio}
                        disabled={true}
                      />
                       {" "}
                      <label
                        html
                        htmlFor="No"
                        className="text-[15px] text-gray-700 "
                      >
                        No
                      </label>
                      <br />
                    </div>
                  </div>
                  {error.reportradio && (
                    <p className="text-red-500 ml-1">
                      {error.reportradio}
                    </p>
                  )}
                </div>
                {reportradio === "Yes" && (
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      html
                      htmlFor="username"
                    >
                      15.1 If yes, is the training mandatory? *
                    </label>
                    <div className="relative mb-1">
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yesne"
                          name="radioone"
                          value="Yes"
                          checked={reportradioone === "Yes"}
                          onChange={handleReportnradioone}
                          disabled={true}
                        />
                         {" "}
                        <label
                          html
                          htmlFor="Yesne"
                          className="text-[15px] text-gray-700"
                        >
                          Yes, the training is mandatory for all employees.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yesone"
                          name="radioone"
                          value="Yesone"
                          checked={reportradioone === "Yesone"}
                          onChange={handleReportnradioone}
                          disabled={true}
                        />
                         {" "}
                        <label
                          html
                          htmlFor="Yesone"
                          className="text-[15px] text-gray-700"
                        >
                          Yes, the training is mandatory for employees making
                          contracting or purchasing decisions.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yestwo"
                          name="radioone"
                          value="Yestwo"
                          checked={reportradioone === "Yestwo"}
                          onChange={handleReportnradioone}
                          disabled={true}
                        />
                         {" "}
                        <label
                          html
                          htmlFor="Yestwo"
                          className="text-[15px] text-gray-700 "
                        >
                          Yes, the training is mandatory for some employees.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Noen"
                          name="radioone"
                          value="No"
                          checked={reportradioone === "No"}
                          onChange={handleReportnradioone}
                          disabled={true}
                        />
                         {" "}
                        <label
                          html
                          htmlFor="Noen"
                          className="text-[15px] text-gray-700 "
                        >
                          No, the training is voluntary.
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradioone && (
                      <p className="text-red-500 ml-1">
                        {error.reportradioone}
                      </p>
                    )}
                  </div>
                )}
                <div className="mb-5 mt-3">
                  <label
                    className="block text-gray-700 text-[15px] mb-2"
                    html
                    htmlFor="industryCheckbox"
                  >
                    16. Please provide additional information on any measures
                    the entity has taken to remediate the loss of income to the
                    most vulnerable families that results from any measure taken
                    to eliminate the use of forced labour or child labour in its
                    activities and supply chains (if applicable) (1,500
                    character limit).
                  </label>
                  <textarea
                    id="countriesOfOperation"
                    name="countriesOfOperation"
                    placeholder="Enter a description..."
                    className={`${
                      open ? "w-[90%]" : "w-[90%]"
                    }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                    value={reportingdescription}
                    disabled={true}
                    // value={formData.countriesOfOperation}
                    // onChange={handleInputChange}
                    rows={5}
                    onChange={handleReportingdescription} // Specify the number of rows to determine the initial height
                  />
                  {/* <div className="my-1">
                    {error.reportingdescription && (
                      <p className="text-red-500">
                        {error.reportingdescription}
                      </p>
                    )}
                  </div> */}
                </div>

                
              </form>
              <div className="w-[90%] mb-5">
              <div className="float-right">
                <button
                  className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-400 text-[12px]"
                  onClick={prevStep}
                >
                  &lt; Previous
                </button>

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
              <>
              <form className="w-[90%] text-left">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    html
                    htmlFor="username"
                  >
                    15. Does the entity currently provide training to employees
                    on forced labour and/or child labour? *
                  </label>
                  <div className="relative mb-1">
                    <div className="mb-3">
                       {" "}
                      <input
                        type="radio"
                        id="Yes"
                        name="radio"
                        value="Yes"
                        checked={reportradio === "Yes"}
                        onChange={handleReportnradio}
                      />
                       {" "}
                      <label
                        html
                        htmlFor="Yes"
                        className="text-[15px] text-gray-700"
                      >
                        Yes
                      </label>
                      <br />
                    </div>

                    <div className="mb-3">
                       {" "}
                      <input
                        type="radio"
                        id="No"
                        name="radio"
                        value="No"
                        checked={reportradio === "No"}
                        onChange={handleReportnradio}
                      />
                       {" "}
                      <label
                        html
                        htmlFor="No"
                        className="text-[15px] text-gray-700 "
                      >
                        No
                      </label>
                      <br />
                    </div>
                  </div>
                  {error.reportradio && (
                    <p className="text-red-500 ml-1">
                      {error.reportradio}
                    </p>
                  )}
                </div>
                {reportradio === "Yes" && (
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      html
                      htmlFor="username"
                    >
                      15.1 If yes, is the training mandatory? *
                    </label>
                    <div className="relative mb-1">
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yesne"
                          name="radioone"
                          value="Yes"
                          checked={reportradioone === "Yes"}
                          onChange={handleReportnradioone}
                        />
                         {" "}
                        <label
                          html
                          htmlFor="Yesne"
                          className="text-[15px] text-gray-700"
                        >
                          Yes, the training is mandatory for all employees.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yesone"
                          name="radioone"
                          value="Yesone"
                          checked={reportradioone === "Yesone"}
                          onChange={handleReportnradioone}
                        />
                         {" "}
                        <label
                          html
                          htmlFor="Yesone"
                          className="text-[15px] text-gray-700"
                        >
                          Yes, the training is mandatory for employees making
                          contracting or purchasing decisions.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yestwo"
                          name="radioone"
                          value="Yestwo"
                          checked={reportradioone === "Yestwo"}
                          onChange={handleReportnradioone}
                        />
                         {" "}
                        <label
                          html
                          htmlFor="Yestwo"
                          className="text-[15px] text-gray-700 "
                        >
                          Yes, the training is mandatory for some employees.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Noen"
                          name="radioone"
                          value="No"
                          checked={reportradioone === "No"}
                          onChange={handleReportnradioone}
                        />
                         {" "}
                        <label
                          html
                          htmlFor="Noen"
                          className="text-[15px] text-gray-700 "
                        >
                          No, the training is voluntary.
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradioone && (
                      <p className="text-red-500 ml-1">
                        {error.reportradioone}
                      </p>
                    )}
                  </div>
                )}
                <div className="mb-5 mt-3">
                  <label
                    className="block text-gray-700 text-[15px] mb-2"
                    html
                    htmlFor="industryCheckbox"
                  >
                    16. Please provide additional information on any measures
                    the entity has taken to remediate the loss of income to the
                    most vulnerable families that results from any measure taken
                    to eliminate the use of forced labour or child labour in its
                    activities and supply chains (if applicable) (1,500
                    character limit).
                  </label>
                  <textarea
                    id="countriesOfOperation"
                    name="countriesOfOperation"
                    placeholder="Enter a description..."
                    className={`${
                      open ? "w-[90%]" : "w-[90%]"
                    }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                    value={reportingdescription}
                    // value={formData.countriesOfOperation}
                    // onChange={handleInputChange}
                    rows={5}
                    onChange={handleReportingdescription} // Specify the number of rows to determine the initial height
                  />
                  {/* <div className="my-1">
                    {error.reportingdescription && (
                      <p className="text-red-500">
                        {error.reportingdescription}
                      </p>
                    )}
                  </div> */}
                </div>

               
              </form>
              <div className="w-[90%] mb-5">
                  <div className="float-right">
                    <button
                      className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-400 text-[12px]"
                      onClick={prevStep}
                    >
                      &lt; Previous
                    </button>

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
              </>
            )}
          </div>
        </>
      )}

    </>
  );
};

export default Screenseven;