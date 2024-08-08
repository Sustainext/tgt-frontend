"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';

const Screenthree = ({ nextStep, prevStep }) => {

  const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdescription, setReportingdescription] = useState();
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isMounted = useRef(true);
  const [data, setData] = useState();
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const coNextStep = () => {
    nextStep();
  };
//   const fetchBillsreport = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/annual_report/?screen=3&user_id=${localStorage.getItem("user_id")}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2114");
//         // You might want to setData or handle the error differently here
//         setData(response.data.policies_in_place_6);
//         setReportnradio(response.data.policies_in_place_6);
//         setReportingdescription(response.data.additional_info_policies_7);
//         if (response.data.elements_implemented_6_1 == null) {
//           setSelectedOptions([]);
//         } else {
//           setSelectedOptions(response.data.elements_implemented_6_1);
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
        "Embedding responsible business conduct into policies and management systems",
      value: "1",
    },
    {
      label:
        "Identifying and assessing adverse impacts in operations, supply chains and business relationships",
      value: "2",
    },
    {
      label: "Ceasing, preventing or mitigating adverse impacts",
      value: "3",
    },
    { label: "Tracking implementation and results", value: "4" },
    { label: "Communicating how impacts are addressed", value: "5" },
    {
      label: "Providing for or cooperating in remediation when appropriate",
      value: "6",
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

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

  const handleupdateform = async () => {
    let newentities;
    if (reportradio === "No") {
      newentities = [];
    } else {
      newentities = selectedOptions;
    }
    LoaderOpen();

    const sandData = {
      policies_in_place_6: reportradio,
      elements_implemented_6_1: newentities,
      additional_info_policies_7: reportingdescription,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=3`,
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
      unewentities = [];
    } else {
      unewentities = selectedOptions;
    }
    LoaderOpen();

    const sandData = {
      policies_in_place_6: reportradio,
      elements_implemented_6_1: unewentities,
      additional_info_policies_7: reportingdescription,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=3`,
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
      if (selectedOptions.length === 0) {
        newErrors.checkboxes = "Please select at least one option.";
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
                <div> 3/8</div>
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
            <form className="w-[90%] text-left">
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px] mb-2 ml-1"
                  htmlFor="username"
                >
                  6.Does the entity currently have policies and due diligence
                  processes in place related to forced labour and/or child
                  labour?*
                </label>
                <div className="relative mb-1">
                  <div>
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
                  <div className="">
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
                    6.1 If yes, which of the following elements of the due
                    diligence process has the entity implemented in relation to
                    forced labour and/or child labour? Select all that apply.*
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
                  7. Please provide additional information on the entity’s
                  policies and due diligence processes in relation to forced
                  labour and child labour (if applicable) (1,500 character
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
            </form>
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
          </div>
        </>
      ) : (
        <>
          <div className="container mt-5">
            <div className="flex">
              <div className="w-[80%]">
                <p className="font-bold  text-md mx-4 "> Annual Report</p>
              </div>
              <div className="text-md flex">
                <div> 3/8</div>
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
                <form className="w-[90%]  text-left">
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      6.Does the entity currently have policies and due
                      diligence processes in place related to forced labour
                      and/or child labour?*
                    </label>
                    <div className="relative mb-1">
                      <div>
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
                          htmlFor="Yes"
                          className="text-[15px] text-gray-700"
                        >
                          Yes
                        </label>
                        <br />
                      </div>
                      <div className="">
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
                        6.1 If yes, which of the following elements of the due
                        diligence process has the entity implemented in relation
                        to forced labour and/or child labour? Select all that
                        apply.*
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
                                disabled={true}
                                className="mr-3"
                              />
                              {option.label}
                            </label>
                          </div>
                        ))}
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
                      7. Please provide additional information on the entity’s
                      policies and due diligence processes in relation to forced
                      labour and child labour (if applicable) (1,500 character
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
                      onChange={handleReportingdescription}
                      disabled={true} // Specify the number of rows to determine the initial height
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
                <div className="w-[90%] mb-5 mt-5">
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
                      htmlFor="username"
                    >
                      6.Does the entity currently have policies and due
                      diligence processes in place related to forced labour
                      and/or child labour?*
                    </label>
                    <div className="relative mb-1">
                      <div>
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
                      <div className="">
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
                        6.1 If yes, which of the following elements of the due
                        diligence process has the entity implemented in relation
                        to forced labour and/or child labour? Select all that
                        apply.*
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
                      7. Please provide additional information on the entity’s
                      policies and due diligence processes in relation to forced
                      labour and child labour (if applicable) (1,500 character
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

export default Screenthree;