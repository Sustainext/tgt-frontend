"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';

const Screenend = ({ prevStep }) => {
    const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdate, setReportingdate] = useState("");
  const [reportingdescription, setReportingdescription] = useState();
  const [reportingentity, setReportingentit] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const isMounted = useRef(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
// const fetchBillsreport = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/annual_report/?screen=8&user_id=${localStorage.getItem("user_id")}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2114");
//         // You might want to setData or handle the error differently here
//         setData(response.data.policies_procedures_assess_17);
//         setReportnradio(response.data.policies_procedures_assess_17);
//         setReportingdescription(response.data.additional_info_assessment_18);
//         setReportingentit(response.data.assessment_method_description_17_1);
//         if (response.data.assessment_method_17_1 == null) {
//           setSelectedOptions([]);
//         } else {
//           setSelectedOptions(response.data.assessment_method_17_1);
//         }
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

  const options = [
    {
      label:
        "Setting up a regular review or audit of the organization’s policies and procedures related to forced labour and child labour",
      value: "1",
    },
    {
      label:
        "Tracking relevant performance indicators, such as levels of employee awareness, numbers of cases reported and solved through grievance mechanisms and numbers of contracts with anti-forced labour and -child labour clauses",
      value: "2",
    },
    {
      label:
        "Partnering with an external organization to conduct an independent review or audit of the organization’s actions",
      value: "3",
    },
    {
      label:
        "Working with suppliers to measure the effectiveness of their actions to address forced labour and child labour, including by tracking relevant performance indicators",
      value: "4",
    },
    {
      label: "Other, please specify:",
      value: "other",
    },
  ];

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const newSelectedOptions = event.target.checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);

    setSelectedOptions(newSelectedOptions);

    // Optionally clear the error for checkboxes when at least one option is selected
    if (newSelectedOptions.length > 0 && error.checkboxes) {
      setError((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.checkboxes;
        return newErrors;
      });
    }
  };
  const handleReportingentity = (event) => {
    setReportingentit(event.target.value);
    console.log(event.target.value, "name");
  };
  const handleeditClick = () => {
    setIsClicked(!isClicked);
    // fetchBillsreport();
  };
  const handleReportnradio = (event) => {
    setReportnradio(event.target.value);
    console.log(event.target.value, "setReportnradio");
  };

  const handleReportingdescription = (event) => {
    setReportingdescription(event.target.value);
    console.log(event.target.value, "setReportingdescription");
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleupdateform = async () => {
    let newentities;
    let otherfiles;
    if (reportradio === "No") {
      newentities = [];
      otherfiles = null;
    } else {
      newentities = selectedOptions;
      otherfiles = reportingentity;
    }

    LoaderOpen();

    const sandData = {
      policies_procedures_assess_17: reportradio,
      assessment_method_17_1: newentities,
      additional_info_assessment_18: reportingdescription,
      assessment_method_description_17_1: otherfiles,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=8`,
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
    let uotherfiles;
    if (reportradio === "No") {
      unewentities = [];
      uotherfiles = null;
    } else {
      unewentities = selectedOptions;
      uotherfiles = reportingentity;
    }
    LoaderOpen();

    const sandData = {
      policies_procedures_assess_17: reportradio,
      assessment_method_17_1: unewentities,
      additional_info_assessment_18: reportingdescription,
      assessment_method_description_17_1: uotherfiles,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=8`,
        sandData
      )
      .then((response) => {
        if (response.status == "200") {
          console.log(response.status);
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
        //   fetchBillsreport();
          // nextStep();
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
      if (selectedOptions.length === 0) {
        newErrors.checkboxes = "Please select at least one option.";
      }
    }

    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      if (!reportingentity) {
        // Check if reportingentity is not filled out
        newErrors.reportingentity = "Please enter a description";
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
      if (selectedOptions.length === 0) {
        newErrors.checkboxes = "Please select at least one option.";
      }
    }
    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      if (!reportingentity) {
        // Check if reportingentity is not filled out
        newErrors.reportingentity = "Please enter a description";
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
  // const handleDownload = async () => {
  //   setLoading(true);
  //   const response = await fetch(`${
  //     process.env.REACT_APP_BACKEND_URL
  //   }/canadabills211/generate-csv/${localStorage.getItem("user_id")}
  //   `);
  //   const blob = await response.blob();
  //   const downloadUrl = window.URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = downloadUrl;
  //   link.setAttribute("download", `Bill-S211.csv`); // Choose the file name
  //   document.body.appendChild(link);
  //   link.click();
  //   link.parentNode.removeChild(link);

  //   setLoading(false);

  //   // Gets the last part after the last dot, which should be the extension
  // };
  const handleDownload = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/canadabills211/generate-csv/${localStorage.getItem("user_id")}`);

      if (!response.ok) {
        // Parse the error message from the JSON response
        const errorResponse = await response.json(); // Assuming the server responds with a JSON object on error
        // Throw a new error with the message from the server's response
        throw new Error(errorResponse.error || 'Unknown error occurred'); // Fallback to a generic error message if none provided
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `Bill-S211.csv`); // Choose the file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      // Handle any errors that occurred during the fetch or download process
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } finally {
      setLoading(false);
    }
  };





  return (
    <>
      <ToastContainer style={{ fontSize: "13px" }} />
      <div className="flex justify-between items-center border-b border-gray-200 mb-5 w-full">
      <div className="w-full">
            <div className="text-left mb-2 ml-3 pt-5">
              <p className="text-[11px]">Social</p>
              <div className="flex">
                <div className="h-[29px]">
                  <p className="gradient-text text-[22px] h-[52px] font-bold pt-1">
                  Bill S-211 - Fighting Bill Forced Labour and Child Labour in Supply Chains Act
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
      {isClicked ? (
        <>
          <div className="container mx-auto mt-5">
            <div className="flex">
            <div className="w-[72%]">
                <p className="font-semibold text-[17px] mb-4 mx-4">
                  {" "}
                  Annual Report
                </p>
              </div>
              <div className="text-md flex">
                <div> 8/8</div>
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
            <form className="w-[80%] text-left">
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px] mb-2 ml-1"
                  htmlFor="username"
                >
                  17. Does the entity currently have policies and procedures in
                  place to assess its effectiveness in ensuring that forced
                  labour and child labour are not being used in its activities
                  and supply chains? *
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
                    <label htmlFor="Yes" className="text-[15px] text-gray-700">
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
                    <label htmlFor="No" className="text-[15px] text-gray-700 ">
                      No
                    </label>
                    <br />
                  </div>
                </div>
                {error.reportradio && (
                  <p className="text-red-500 ml-1">{error.reportradio}</p>
                )}
              </div>
              {reportradio === "Yes" && (
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    htmlFor="username"
                  >
                    17.1 If yes, what method does the entity use to assess its
                    effectiveness? Select all that apply.*
                  </label>
                  <div>
                    {options.map((option, index) => (
                      <div key={index} className="mb-3 ml-2">
                        <label className="text-[14px] text-gray-600">
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={selectedOptions.includes(option.value)}
                            onChange={handleCheckboxChange}
                            className="mr-3"
                          />
                          {option.label}
                        </label>
                      </div>
                    ))}
                    {selectedOptions.includes("other") && (
                      <div className="mb-5">
                        <input
                          type="text"
                          placeholder="Enter a description..."
                          className={`${
                            open ? "w-[90%]" : "w-[90%]"
                          } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                          value={reportingentity}
                          onChange={handleReportingentity}
                        ></input>
                        {error.reportingentity && (
                          <div className="text-red-500 ml-1">
                            {error.reportingentity}
                          </div>
                        )}
                      </div>
                    )}
                    {error.checkboxes && (
                      <div className="text-red-500 ml-1">
                        {error.checkboxes}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="mb-5 mt-3">
                <label
                  className="block text-gray-700 text-[15px] mb-2"
                  html
                  htmlFor="industryCheckbox"
                >
                  18. Please provide additional information on how the entity
                  assesses its effectiveness in ensuring that forced labour and
                  child labour are not being used in its activities and supply
                  chains (if applicable). (1,500 character limit)
                </label>
                <textarea
                  id="countriesOfOperation"
                  name="countriesOfOperation"
                  placeholder="Enter a description..."
                  className={`${
                    open ? "w-full" : "w-full"
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
            </form>
            <div className="w-[82%]">
            <div className=" float-right">
              <button
                className="px-3 py-1.5 rounded font-semibold w-[120px] text-gray-600 text-[14px] cursor-not-allowed"
                onClick={prevStep}
                disabled
              >
                &lt; Previous
              </button>

            </div>
            </div>


          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto mt-5">
            <div className="flex">
            <div className="w-[72%]">
                <p className="font-semibold text-[17px] mb-4 mx-4">
                  {" "}
                  Annual Report
                </p>
              </div>
              <div className="text-md flex">
                <div> 8/8</div>
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
                <form className="w-[80%] text-left">
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      17. Does the entity currently have policies and procedures
                      in place to assess its effectiveness in ensuring that
                      forced labour and child labour are not being used in its
                      activities and supply chains? *
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
                          htmlFor="No"
                          className="text-[15px] text-gray-700 "
                        >
                          No
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500 ml-1">{error.reportradio}</p>
                    )}
                  </div>
                  {reportradio === "Yes" && (
                    <div className="mb-5">
                      <label
                        className="block text-gray-700 text-[15px] mb-2 ml-1"
                        htmlFor="username"
                      >
                        17.1 If yes, what method does the entity use to assess
                        its effectiveness? Select all that apply.*
                      </label>
                      <div>
                        {options.map((option, index) => (
                          <div key={index} className="mb-3 ml-2">
                            <label className="text-[14px] text-gray-600">
                              <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedOptions.includes(option.value)}
                                onChange={handleCheckboxChange}

                                className="mr-3"
                              />
                              {option.label}
                            </label>
                          </div>
                        ))}
                        {selectedOptions.includes("other") && (
                          <div className="mb-5">
                            <input
                              type="text"
                              placeholder="Enter a description..."
                              className={`${
                                open ? "w-[90%]" : "w-[90%]"
                              } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                              value={reportingentity}
                              onChange={handleReportingentity}

                            ></input>
                          </div>
                        )}
                        {error.checkboxes && (
                          <div className="text-red-500 ml-1">
                            {error.checkboxes}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mb-5 mt-3">
                    <label
                      className="block text-gray-700 text-[15px] mb-2"
                      html
                      htmlFor="industryCheckbox"
                    >
                      18. Please provide additional information on how the
                      entity assesses its effectiveness in ensuring that forced
                      labour and child labour are not being used in its
                      activities and supply chains (if applicable). (1,500
                      character limit)
                    </label>
                    <textarea
                      id="countriesOfOperation"
                      name="countriesOfOperation"
                      placeholder="Enter a description..."
                      className={`${
                        open ? "w-full" : "w-full"
                      }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                      value={reportingdescription}
                      // value={formData.countriesOfOperation}
                      // onChange={handleInputChange}
                      rows={5}
                      onChange={handleReportingdescription}
                      // Specify the number of rows to determine the initial height
                    />
                    <div className="my-1">
                      {error.reportingdescription && (
                        <p className="text-red-500">
                          {error.reportingdescription}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
                <div className="w-[80%] mb-5">
                  <div className="float-right">
                    <button
                      className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
                      onClick={prevStep}
                    >
                      &lt; Previous
                    </button>
                    <button
                      className="px-3 py-1.5 font-semibold rounded ml-2 w-[120px] text-[12px] bg-blue-500 text-white"

                    >
                       Submit
                    </button>
                    {/* {loading ? (
                      <button
                        type="button"
                        className="px-1 py-1.5 font-semibold rounded ml-2 w-[130px] text-[12px] bg-blue-500 text-white"
                      >
                        {" "}
                        <CircularProgress
                          color="inherit"
                          style={{ width: "15px", height: "15px", mt: 1 }}
                        />{" "}
                        Download CSV
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="px-3 py-1.5 font-semibold rounded ml-2 w-[120px] text-[12px] bg-blue-500 text-white"
                        onClick={handleDownload}
                      >
                        {" "}
                        Download CSV
                      </button>
                    )} */}
                  </div>
                </div>
              </>
            ) : (
              <>
                <form className="w-[80%] text-left">
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      17. Does the entity currently have policies and procedures
                      in place to assess its effectiveness in ensuring that
                      forced labour and child labour are not being used in its
                      activities and supply chains? *
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
                          htmlFor="No"
                          className="text-[15px] text-gray-700 "
                        >
                          No
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500 ml-1">{error.reportradio}</p>
                    )}
                  </div>
                  {reportradio === "Yes" && (
                    <div className="mb-5">
                      <label
                        className="block text-gray-700 text-[15px] mb-2 ml-1"
                        htmlFor="username"
                      >
                        17.1 If yes, what method does the entity use to assess
                        its effectiveness? Select all that apply.*
                      </label>
                      <div>
                        {options.map((option, index) => (
                          <div key={index} className="mb-3 ml-2">
                            <label className="text-[14px] text-gray-600">
                              <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedOptions.includes(option.value)}
                                onChange={handleCheckboxChange}
                                className="mr-3"
                              />
                              {option.label}
                            </label>
                          </div>
                        ))}
                        {selectedOptions.includes("other") && (
                          <div className="mb-5">
                            <input
                              type="text"
                              placeholder="Enter a description..."
                              className={`${
                                open ? "w-[90%]" : "w-[90%]"
                              } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                              value={reportingentity}
                              onChange={handleReportingentity}
                            ></input>
                            {error.reportingentity && (
                              <div className="text-red-500 ml-1">
                                {error.reportingentity}
                              </div>
                            )}
                          </div>
                        )}
                        {error.checkboxes && (
                          <div className="text-red-500 ml-1">
                            {error.checkboxes}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mb-5 mt-3">
                    <label
                      className="block text-gray-700 text-[15px] mb-2"
                      html
                      htmlFor="industryCheckbox"
                    >
                      18. Please provide additional information on how the
                      entity assesses its effectiveness in ensuring that forced
                      labour and child labour are not being used in its
                      activities and supply chains (if applicable). (1,500
                      character limit)
                    </label>
                    <textarea
                      id="countriesOfOperation"
                      name="countriesOfOperation"
                      placeholder="Enter a description..."
                      className={`${
                        open ? "w-full" : "w-full"
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
                <div className="w-[80%] mb-5">
                  <div className="float-right">
                    <button
                      className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
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
                      Submit
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

export default Screenend;