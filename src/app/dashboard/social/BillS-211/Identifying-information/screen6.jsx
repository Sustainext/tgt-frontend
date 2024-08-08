"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose,MdDeleteOutline   } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';

const Screensix = ({ nextStep, prevStep }) => {
  // State to track selected options
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [reportingentity, setReportingentit] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState("");
  const { open } = GlobalState();
  const [loopen, setLoOpen] = useState(false);
  const isMounted = useRef(true);
  // const data = 1;
  const [data, setData] = useState();
  const coNextStep = () => {
    nextStep();
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
//   const fetchBillssix = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/identifying-information/?screen=6&user_id=${localStorage.getItem(
//           "user_id"
//         )}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2116");
//         // You might want to setData or handle the error differently here
//         setData(response.data.sectors_or_industries_9);
//         // setReportnradio(response.data.subject_to_supply_chain_legislation_7);
//         setReportingentit(response.data.sectors_or_industries_description_9);
//         if (response.data.sectors_or_industries_9 == null) {
//           setSelectedOptions([]);
//         } else {
//           setSelectedOptions(response.data.sectors_or_industries_9);
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
//       //fetchBillssix();
//       isMounted.current = false;
//     }
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
  const handleReportingentity = (event) => {
    setReportingentit(event.target.value);
    // console.log(event.target.value, "name");
  };
  const optionsTwo = [
    {
      label: "Agriculture, forestry, fishing and hunting",
      value: "1",
    },
    {
      label:
        "Administrative and support, waste management and remediation services",
      value: "2",
    },
    {
      label: "Mining, quarrying, and oil and gas extraction",
      value: "3",
    },
    {
      label: "Utilities",
      value: "4",
    },
    { label: "Construction", value: "5" },
    { label: "Wholesale trade", value: "6" },
    { label: "Retail trade", value: "7" },
    {
      label: "Transportation and warehousing",
      value: "8",
    },
    {
      label: "Information and cultural industries",
      value: "9",
    },
    { label: "Finance and insurance", value: "10" },
    {
      label: "Real estate and rental and leasing",
      value: "11",
    },
    {
      label: "Professional, scientific and technical services",
      value: "12",
    },
    {
      label: "Management of companies and enterprises",
      value: "13",
    },

    { label: "Educational services", value: "14" },
    {
      label: "Health care and social assistance",
      value: "15",
    },
    {
      label: "Arts, entertainment and recreation",
      value: "16",
    },
    {
      label: "Accommodation and food services",
      value: "17",
    },
    {
      label: "Other services (except public administration)",
      value: "18",
    },
    { label: "Public administration", value: "19" },
    { label: "Other, please specify:", value: "other" },
    // Add the rest of your options here
  ];

  const handleeditClick = () => {
    setIsClicked(!isClicked);
    //fetchBillssix();
  };
  // Handle checkbox changes
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

  // Function to proceed to the next step, includes validation
  const continueToNextStep = () => {
    let newErrors = {};

    if (selectedOptions.length === 0) {
      newErrors.checkboxes = "Please select at least one option.";
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
    if (selectedOptions.length === 0) {
      newErrors.checkboxes = "Please select at least one option.";
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

  const handleupdateform = async () => {
    let newentities;
    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      // Check if reportingentity is not filled out
      newentities = reportingentity;
    } else {
      newentities = null;
    }

    LoaderOpen();

    const sandData = {
      sectors_or_industries_9: selectedOptions,
      sectors_or_industries_description_9: newentities,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=6`,
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
          //fetchBillssix();
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
    let snewentities;
    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      // Check if reportingentity is not filled out
      snewentities = reportingentity;
    } else {
      snewentities = null;
    }
    LoaderOpen();

    const sandData = {
      sectors_or_industries_9: selectedOptions,
      sectors_or_industries_description_9: snewentities,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=6`,
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
              <div className="w-[73%]">
                <p className="font-bold  text-md mx-4 ">
                  {" "}
                  Identifying information
                </p>
              </div>
              <div className="text-md flex">
                <div> 6/7 </div>
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
          <div className="ml-3">
            <div className="mb-5 mt-5 ml-2">
              <label
                className="block text-gray-700 text-[15px] mb-2"
                htmlFor="industryCheckbox"
              >
                9. Which of the following sectors or industries does the entity
                operate in? Select all that apply *
              </label>
            </div>
            <div className="mb-2">
              <div className="grid grid-cols-2 gap-2">
                {optionsTwo.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <label className="ml-2 text-[13px] text-gray-600">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={selectedOptions.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="mr-3 pt-1"
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {error.checkboxes && (
                <div className="text-red-500 ml-1">{error.checkboxes}</div>
              )}
            </div>
            <div className="mb-5">
              {selectedOptions.includes("other") && (
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Enter a description..."
                    className={`${
                      open ? "w-[80%]" : "w-[80%]"
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
          </div>
          <div className="w-[80%] mb-5">
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
        </>
      ) : (
        <>
          <div className="container mx-auto mt-5">
            <div className="flex">
              <div className="w-[79%]">
                <p className="font-bold  text-md mx-4 ">
                  {" "}
                  Identifying information
                </p>
              </div>
              <div className="text-md flex">
                <div> 6/7 </div>
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
          {data !== null ? (
            <>
              <div className="ml-3">
                <div className="mb-5 mt-5 ml-2">
                  <label
                    className="block text-gray-700 text-[15px] mb-2"
                    htmlFor="industryCheckbox"
                  >
                    9. Which of the following sectors or industries does the
                    entity operate in? Select all that apply *
                  </label>
                </div>
                <div className="mb-2">
                  <div className="grid grid-cols-2 gap-2">
                    {optionsTwo.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <label className="ml-2 text-[13px] text-gray-600">
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={selectedOptions.includes(option.value)}
                            onChange={handleCheckboxChange}
                            className="mr-3 pt-1"
                            disabled={true}
                          />
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-5">
                  {selectedOptions.includes("other") && (
                    <div className="mb-5">
                      <input
                        type="text"
                        placeholder="Enter a description..."
                        className={`${
                          open ? "w-[80%]" : "w-[80%]"
                        } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                        value={reportingentity}
                        disabled={true}
                      ></input>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[85%] mb-5">
                <div className="float-right mr-3">
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
              <div className="ml-3">
                <div className="mb-5 mt-5 ml-2">
                  <label
                    className="block text-gray-700 text-[15px] mb-2"
                    htmlFor="industryCheckbox"
                  >
                    9. Which of the following sectors or industries does the
                    entity operate in? Select all that apply *
                  </label>
                </div>
                <div className="mb-2">
                  <div className="grid grid-cols-2 gap-2">
                    {optionsTwo.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <label className="ml-2 text-[13px] text-gray-600">
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={selectedOptions.includes(option.value)}
                            onChange={handleCheckboxChange}
                            className="mr-3 pt-1"
                          />
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {error.checkboxes && (
                    <div className="text-red-500 ml-1">{error.checkboxes}</div>
                  )}
                </div>
                <div className="mb-5">
                  {selectedOptions.includes("other") && (
                    <div className="mb-5">
                      <input
                        type="text"
                        placeholder="Enter a description..."
                        className={`${
                          open ? "w-[80%]" : "w-[80%]"
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
              </div>
              <div className="w-[85%] mb-5">
                <div className="float-right mr-3">
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
        </>
      )}


    </>
  );
};

export default Screensix;