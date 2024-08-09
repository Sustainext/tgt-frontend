"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';

const Screenfour = ({ nextStep, prevStep }) => {
    const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdescription, setReportingdescription] = useState();
  const [reportingentity, setReportingentity] = useState("");
  const [reportingentityone, setReportingentityone] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsone, setSelectedOptionsone] = useState([]);
  const isMounted = useRef(true);
  const [data, setData] = useState();
//   const fetchBillsreport = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/annual_report/?screen=4&user_id=${localStorage.getItem("user_id")}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2114");
//         // You might want to setData or handle the error differently here
//         setData(response.data.risk_identified_8);
//         setReportnradio(response.data.risk_identified_8);
//         setReportingdescription(response.data.additional_info_entity_10);
//         setReportingentity(response.data.risk_aspects_description_8_1);
//         setReportingentityone(response.data.risk_activaties_description_9);
//         if (response.data.risk_aspects_8_1 == null) {
//           setSelectedOptions([]);
//         } else {
//           setSelectedOptions(response.data.risk_aspects_8_1);
//         }
//         if (response.data.risk_activaties_9 == null) {
//           setSelectedOptionsone([]);
//         } else {
//           setSelectedOptionsone(response.data.risk_activaties_9);
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
  const coNextStep = () => {
    nextStep();
  };
  const options = [
    {
      label: "The sector or industry it operates in",
      value: "1",
    },
    {
      label: "Suppliers further down the supply chain than tier three",
      value: "2",
    },
    {
      label: "The types of products it produces, sells, distributes or imports",
      value: "3",
    },
    {
      label: "The use of outsourced, contracted or subcontracted labour",
      value: "4",
    },
    {
      label: "The locations of its activities, operations or factories",
      value: "5",
    },
    { label: "The use of migrant labour", value: "6" },
    { label: "The types of products it sources", value: "7" },
    { label: "The use of forced labour", value: "8" },
    {
      label: "The raw materials or commodities used in its supply chains",
      value: "9",
    },
    { label: "The use of child labour", value: "10" },
    { label: "Tier one (direct) suppliers", value: "11" },
    { label: "None of the above", value: "12" },
    { label: "Tier two suppliers", value: "13" },
    { label: "Other, please specify:", value: "other" },
    { label: "Tier three suppliers", value: "15" },
  ];
  const optionsone = [
    {
      label: "Agriculture, forestry, fishing and hunting",
      value: "1",
    },
    {
      label: "Management of companies and enterprises",
      value: "2",
    },
    {
      label: "Mining, quarrying, and oil and gas extraction",
      value: "3",
    },
    {
      label:
        "Administrative and support, waste management and remediation services",
      value: "4",
    },
    { label: "Utilities", value: "5" },
    { label: "Educational services", value: "6" },
    { label: "Construction", value: "7" },
    { label: "Health care and social assistance", value: "8" },
    { label: "Manufacturing", value: "9" },
    { label: "Arts, entertainment and recreation", value: "10" },
    { label: "Wholesale trade", value: "11" },
    { label: "Accommodation and food services", value: "12" },
    { label: "Retail trade", value: "13" },
    { label: "Other services (except public administration)", value: "14" },
    { label: "Transportation and warehousing", value: "15" },
    { label: "Public administration", value: "16" },
    { label: "Information and cultural industries", value: "17" },
    { label: "None of the above", value: "18" },
    { label: "Finance and insurance", value: "19" },
    { label: "Real estate and rental and leasing", value: "21" },
    { label: "Professional, scientific and technical services", value: "22" },
    { label: "Other, please specify:", value: "other" },
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
  const handleCheckboxChangeone = (event) => {
    const value = event.target.value;
    const newSelectedOptions = event.target.checked
      ? [...selectedOptionsone, value]
      : selectedOptionsone.filter((option) => option !== value);

    setSelectedOptionsone(newSelectedOptions);

    // Optionally clear the error for checkboxes when at least one option is selected
    if (newSelectedOptions.length > 0 && error.checkboxesone) {
      setError((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.checkboxesone;
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
  const handleReportingentityone = (event) => {
    setReportingentityone(event.target.value);
  };
  const handleReportingentity = (event) => {
    setReportingentity(event.target.value);
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleupdateform = async () => {
    let newentities;
    let newentitiestwo;

    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      // Check if reportingentity is not filled out
      newentities = reportingentity;
    } else {
      newentities = null;
    }
    if (selectedOptionsone.includes("other")) {
      // If it's an array and "other" is one of the options
      // Check if reportingentity is not filled out
      newentitiestwo = reportingentityone;
    } else {
      newentitiestwo = null;
    }
    LoaderOpen();

    const sandData = {
      risk_identified_8: reportradio,
      risk_aspects_8_1: selectedOptions,
      risk_activaties_9: selectedOptionsone,
      risk_aspects_description_8_1: newentities,
      risk_activaties_description_9: newentitiestwo,
      additional_info_entity_10: reportingdescription,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=4`,
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
    let unewentitiestwo;

    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      // Check if reportingentity is not filled out
      unewentities = reportingentity;
    } else {
      unewentities = null;
    }
    if (selectedOptionsone.includes("other")) {
      // If it's an array and "other" is one of the options
      // Check if reportingentity is not filled out
      unewentitiestwo = reportingentityone;
    } else {
      unewentitiestwo = null;
    }
    LoaderOpen();

    const sandData = {
      risk_identified_8: reportradio,
      risk_aspects_8_1: selectedOptions,
      risk_activaties_9: selectedOptionsone,
      risk_aspects_description_8_1: unewentities,
      risk_activaties_description_9: unewentitiestwo,
      additional_info_entity_10: reportingdescription,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=4`,
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
      newErrors.reportradio = "This field is required.";
    }
    if(reportradio === "Yes" || reportradio === "Yesone"){
    if (selectedOptions.length === 0) {
      newErrors.checkboxes = "Please select at least one option.";
    }
  }
    if (selectedOptionsone.length === 0) {
      newErrors.checkboxesone = "Please select at least one option.";
    }

    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      if (!reportingentity) {
        // Check if reportingentity is not filled out
        newErrors.reportingentity = "Please enter a description";
      }
    }
    if (selectedOptionsone.includes("other")) {
      // If it's an array and "other" is one of the options
      if (!reportingentityone) {
        // Check if reportingentity is not filled out
        newErrors.reportingentityone = "Please enter a description";
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

    if(reportradio === "Yes" || reportradio === "Yesone"){
      if (selectedOptions.length === 0) {
        newErrors.checkboxes = "Please select at least one option.";
      }
    }
    if (selectedOptionsone.length === 0) {
      newErrors.checkboxesone = "Please select at least one option.";
    }

    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      if (!reportingentity) {
        // Check if reportingentity is not filled out
        newErrors.reportingentity = "Please enter a description";
      }
    }
    if (selectedOptionsone.includes("other")) {
      // If it's an array and "other" is one of the options
      if (!reportingentityone) {
        // Check if reportingentity is not filled out
        newErrors.reportingentityone = "Please enter a description";
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
                <div> 4/8</div>
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
                  8.Has the entity identified parts of its activities and supply
                  chains that carry a risk of forced labour or child labour
                  being used?*
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
                      Yes, we have identified risks to the best of our knowledge
                      and will continue to strive to identify emerging risks.
                    </label>
                    <br />
                  </div>
                  <div className="mb-3">
                     {" "}
                    <input
                      type="radio"
                      id="Yesone"
                      name="radio"
                      value="Yesone"
                      checked={reportradio === "Yesone"}
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label
                      htmlFor="Yesone"
                      className="text-[15px] text-gray-700"
                    >
                      Yes, we have started the process of identifying risks, but
                      there are still gaps in our assessments.
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
                      No, we have not started the process of identifying risks.
                    </label>
                    <br />
                  </div>
                </div>
                {error.reportradio && (
                  <p className="text-red-500 ml-1">{error.reportradio}</p>
                )}
              </div>
              {(reportradio === "Yes" || reportradio === "Yesone") && (
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      8.1 If yes, has the entity identified forced labour or
                      child labour risks related to any of the following aspects
                      of its activities and supply chains? Select all that
                      apply. *
                    </label>
                    <div className="grid grid-cols-2">
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
                    </div>
                    {error.checkboxes && (
                      <div className="text-red-500 ml-1">
                        {error.checkboxes}
                      </div>
                    )}
                  </div>
  )}
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px] mb-2 ml-1"
                  htmlFor="username"
                >
                  9. Has the entity identified forced labour or child labour
                  risks in its activities and supply chains related to any of
                  the following sectors and industries? Select all that apply. *
                </label>
                <div className="grid grid-cols-2">
                  {optionsone.map((optionsone, index) => (
                    <div key={index} className="mb-3 ml-2">
                      <label className="text-[14px] text-gray-600">
                        <input
                          type="checkbox"
                          value={optionsone.value}
                          checked={selectedOptionsone.includes(
                            optionsone.value
                          )}
                          onChange={handleCheckboxChangeone}
                          className="mr-3"
                        />
                        {optionsone.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  {selectedOptionsone.includes("other") && (
                    <div className="mb-5">
                      <input
                        type="text"
                        placeholder="Enter a description..."
                        className={`${
                          open ? "w-[90%]" : "w-[90%]"
                        } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                        value={reportingentityone}
                        onChange={handleReportingentityone}
                      ></input>
                      {error.reportingentityone && (
                        <div className="text-red-500 ml-1">
                          {error.reportingentityone}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {error.checkboxesone && (
                  <div className="text-red-500 ml-1">{error.checkboxesone}</div>
                )}
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px] mb-2"
                  html
                  htmlFor="industryCheckbox"
                >
                  10. Please provide additional information on the parts of the
                  entity’s activities and supply chains that carry a risk of
                  forced labour or child labour being used, as well as the steps
                  that the entity has taken to assess and manage that risk (if
                  applicable) (1,500 character limit).
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
                  className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
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
          <div className="container mx-auto mt-5">
            <div className="flex">
              <div className="w-[85%]">
                <p className="font-bold  text-md mx-4 "> Annual Report</p>
              </div>
              <div className="text-md flex">
                <div> 4/8</div>
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
                      htmlFor="username"
                    >
                      8.Has the entity identified parts of its activities and
                      supply chains that carry a risk of forced labour or child
                      labour being used?*
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
                          Yes, we have identified risks to the best of our
                          knowledge and will continue to strive to identify
                          emerging risks.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yesone"
                          name="radio"
                          value="Yesone"
                          checked={reportradio === "Yesone"}
                          onChange={handleReportnradio}

                        />
                         {" "}
                        <label
                          htmlFor="Yesone"
                          className="text-[15px] text-gray-700"
                        >
                          Yes, we have started the process of identifying risks,
                          but there are still gaps in our assessments.
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
                          No, we have not started the process of identifying
                          risks.
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500 ml-1">{error.reportradio}</p>
                    )}
                  </div>
                  {(reportradio === "Yes" || reportradio === "Yesone") && (
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      8.1 If yes, has the entity identified forced labour or
                      child labour risks related to any of the following aspects
                      of its activities and supply chains? Select all that
                      apply. *
                    </label>
                    <div className="grid grid-cols-2">
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
                    </div>
                    {error.checkboxes && (
                      <div className="text-red-500 ml-1">
                        {error.checkboxes}
                      </div>
                    )}
                  </div>
  )}
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      9. Has the entity identified forced labour or child labour
                      risks in its activities and supply chains related to any
                      of the following sectors and industries? Select all that
                      apply. *
                    </label>
                    <div className="grid grid-cols-2">
                      {optionsone.map((optionsone, index) => (
                        <div key={index} className="mb-3 ml-2">
                          <label className="text-[14px] text-gray-600">
                            <input
                              type="checkbox"
                              value={optionsone.value}
                              checked={selectedOptionsone.includes(
                                optionsone.value
                              )}
                              onChange={handleCheckboxChangeone}

                              className="mr-3"
                            />
                            {optionsone.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div>
                      {selectedOptionsone.includes("other") && (
                        <div className="mb-5">
                          <input
                            type="text"
                            placeholder="Enter a description..."
                            className={`${
                              open ? "w-[90%]" : "w-[90%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                            value={reportingentityone}
                            onChange={handleReportingentityone}

                          ></input>
                        </div>
                      )}
                    </div>
                    {error.checkboxesone && (
                      <div className="text-red-500 ml-1">
                        {error.checkboxesone}
                      </div>
                    )}
                  </div>
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2"
                      html
                      htmlFor="industryCheckbox"
                    >
                      10. Please provide additional information on the parts of
                      the entity’s activities and supply chains that carry a
                      risk of forced labour or child labour being used, as well
                      as the steps that the entity has taken to assess and
                      manage that risk (if applicable) (1,500 character limit).
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
                      // Specify the number of rows to determine the initial height
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
                      className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
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
                      8.Has the entity identified parts of its activities and
                      supply chains that carry a risk of forced labour or child
                      labour being used?*
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
                          Yes, we have identified risks to the best of our
                          knowledge and will continue to strive to identify
                          emerging risks.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yesone"
                          name="radio"
                          value="Yesone"
                          checked={reportradio === "Yesone"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Yesone"
                          className="text-[15px] text-gray-700"
                        >
                          Yes, we have started the process of identifying risks,
                          but there are still gaps in our assessments.
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
                          No, we have not started the process of identifying
                          risks.
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500 ml-1">{error.reportradio}</p>
                    )}
                  </div>
                  {(reportradio === "Yes" || reportradio === "Yesone") && (
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      8.1 If yes, has the entity identified forced labour or
                      child labour risks related to any of the following aspects
                      of its activities and supply chains? Select all that
                      apply. *
                    </label>
                    <div className="grid grid-cols-2">
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
                    </div>
                    {error.checkboxes && (
                      <div className="text-red-500 ml-1">
                        {error.checkboxes}
                      </div>
                    )}
                  </div>
  )}
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      9. Has the entity identified forced labour or child labour
                      risks in its activities and supply chains related to any
                      of the following sectors and industries? Select all that
                      apply. *
                    </label>
                    <div className="grid grid-cols-2">
                      {optionsone.map((optionsone, index) => (
                        <div key={index} className="mb-3 ml-2">
                          <label className="text-[14px] text-gray-600">
                            <input
                              type="checkbox"
                              value={optionsone.value}
                              checked={selectedOptionsone.includes(
                                optionsone.value
                              )}
                              onChange={handleCheckboxChangeone}
                              className="mr-3"
                            />
                            {optionsone.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div>
                      {selectedOptionsone.includes("other") && (
                        <div className="mb-5">
                          <input
                            type="text"
                            placeholder="Enter a description..."
                            className={`${
                              open ? "w-[90%]" : "w-[90%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                            value={reportingentityone}
                            onChange={handleReportingentityone}
                          ></input>
                          {error.reportingentityone && (
                            <div className="text-red-500 ml-1">
                              {error.reportingentityone}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {error.checkboxesone && (
                      <div className="text-red-500 ml-1">
                        {error.checkboxesone}
                      </div>
                    )}
                  </div>
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2"
                      html
                      htmlFor="industryCheckbox"
                    >
                      10. Please provide additional information on the parts of
                      the entity’s activities and supply chains that carry a
                      risk of forced labour or child labour being used, as well
                      as the steps that the entity has taken to assess and
                      manage that risk (if applicable) (1,500 character limit).
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

export default Screenfour;