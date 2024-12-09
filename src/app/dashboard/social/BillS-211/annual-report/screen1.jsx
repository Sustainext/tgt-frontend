"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';

const Screenone = ({ nextStep, prevStep }) => {
  // State to track selected options
  const { open } = GlobalState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [reportingdescription, setReportingdescription] = useState();
  const isMounted = useRef(true);
  const [error, setError] = useState("");
  const [reportingentity, setReportingentit] = useState("");
  const [loopen, setLoOpen] = useState(false);
  // const data = 1;
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
//         }/annual_report/?screen=1&user_id=${localStorage.getItem("user_id")}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2114");
//         // You might want to setData or handle the error differently here
//         setData(response.data.steps_taken_1);
//         setReportingdescription(response.data.additional_information_2);
//         setReportingentit(response.data.steps_taken_description_1);
//         if (response.data.steps_taken_1 == null) {
//           setSelectedOptions([]);
//         } else {
//           setSelectedOptions(response.data.steps_taken_1);
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
//      // fetchBillsreport();
//       isMounted.current = false;
//     }
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
  // State to track and display any errors

  // Destructure from useProSidebar hook
  const handleReportingdescription = (event) => {
    setReportingdescription(event.target.value);
  };
  const handleReportingentity = (event) => {
    setReportingentit(event.target.value);
    // console.log(event.target.value, "name");
  };
  // Define your options for the checkboxes
  const optionsTwo = [
    {
      label: "Mapping activities",
      value: "1",
    },
    {
      label: "Mapping supply chains",
      value: "2",
    },
    {
      label:
        "Conducting an internal assessment of risks of forced labour and/or child labour in the organization’s activities and supply chains",
      value: "3",
    },
    {
      label:
        "Contracting an external assessment of risks of forced labour and/or child labour in the organization’s activities and supply chains",
      value: "4",
    },
    {
      label:
        "Developing and implementing an action plan for addressing forced labour and/or child labour",
      value: "5",
    },
    {
      label:
        "Gathering information on worker recruitment and maintaining internal controls to ensure that all workers are recruited voluntarily",
      value: "6",
    },
    {
      label:
        "Addressing practices in the organization’s activities and supply chains that increase the risk of forced labour and/or child labour",
      value: "7",
    },
    {
      label:
        "Developing and implementing due diligence policies and processes for identifying, addressing and prohibiting the use of forced labour and/or child labour in the organization’s activities and supply chains",
      value: "8",
    },
    {
      label:
        "Carrying out a prioritization exercise to focus due diligence efforts on the most severe risks of forced and child labour",
      value: "9",
    },
    {
      label:
        "Requiring suppliers to have in place policies and procedures for identifying and prohibiting the use of forced labour and/or child labour in their activities and supply chains",
      value: "10",
    },
    {
      label:
        "Developing and implementing child protection policies and processes",
      value: "11",
    },
    {
      label:
        "Developing and implementing anti-forced labour and/or -child labour contractual clauses",
      value: "12",
    },
    {
      label:
        "Developing and implementing anti-forced labour and/or -child labour standards, codes of conduct and/or compliance checklists",
      value: "13",
    },

    { label: "Auditing suppliers", value: "14" },
    {
      label: "Monitoring suppliers",
      value: "15",
    },
    {
      label:
        "Enacting measures to provide for, or cooperate in, remediation of forced labour and/or child labour",
      value: "16",
    },
    {
      label: "Developing and implementing grievance mechanisms",
      value: "17",
    },
    {
      label:
        "Developing and implementing training and awareness materials on forced labour and/or child labour",
      value: "18",
    },
    {
      label:
        "Developing and implementing procedures to track performance in addressing forced labour and/or child labour",
      value: "19",
    },
    {
      label:
        "Engaging with supply chain partners on the issue of addressing forced labour and/or child labour",
      value: "20",
    },
    {
      label:
        "Engaging with civil society groups, experts and other stakeholders on the issue of addressing forced labour and/or child labour",
      value: "21",
    },
    {
      label:
        "Engaging directly with workers and families potentially affected by forced labour and/or child labour to assess and address risks",
      value: "22",
    },
    {
      label: "Information not available for this reporting period",
      value: "23",
    },
    { label: "Other, please specify:", value: "other" },
    // Add the rest of your options here
  ];

  const handleeditClick = () => {
    setIsClicked(!isClicked);
   // fetchBillsreport();
  };
  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, value]); // Add to selected options
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value)); // Remove from selected options
    }
  };

  // Function to proceed to the next step, includes validation

  const submitForm = async () => {
    let unewentities;
    if (selectedOptions.includes("other")) {
      // If it's an array and "other" is one of the options
      // Check if reportingentity is not filled out
      unewentities = reportingentity;
    } else {
      unewentities = null;
    }
    LoaderOpen();

    const sandData = {
      steps_taken_description_1: unewentities,
      additional_information_2: reportingdescription,
      steps_taken_1: selectedOptions,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=1`,
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
      steps_taken_description_1: newentities,
      additional_information_2: reportingdescription,
      steps_taken_1: selectedOptions,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=1`,
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
         // fetchBillsreport();
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
  const continueToNextStep = () => {
    let newErrors = {};

    if (selectedOptions.length === 0) {
      newErrors.selectedOptions =
        "Please select at least one sector or industry.";
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
      newErrors.selectedOptions =
        "Please select at least one sector or industry.";
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
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
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
                <div> 1/8 </div>
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
          <div className="container ml-3 w-[78%]">
            <div className="mb-5 mt-5 ml-2">
              <label
                className="block text-gray-700 text-[15px] mb-2"
                htmlFor="industryCheckbox"
              >
                1. What steps has the entity taken in the previous financial
                year to prevent and reduce the risk that forced labour or child
                labour is used at any step of the production of goods in Canada
                or elsewhere by the entity or of goods imported into Canada by
                the entity? Select all that apply. *
              </label>
            </div>
            <div className="mb-2">
              <div className="gap-2">
                {optionsTwo.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <label className="ml-2 text-[15px] text-gray-600">
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
              <div className="my-1">
                {error.selectedOptions && (
                  <p className="text-red-500">{error.selectedOptions}</p>
                )}
              </div>
            </div>
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
            <div className="mb-5 mt-3">
              <label
                className="block text-gray-700 text-[15px] mb-2"
                htmlFor="industryCheckbox"
              >
                2. Please provide additional information describing the steps
                taken (if applicable) (1,500 character limit).
              </label>
              <textarea
                id="countriesOfOperation"
                name="countriesOfOperation"
                placeholder="Enter a description..."
                maxLength="1500"
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
          </div>
          <div className="w-[80%] mb-5">
            <div className="float-right">
              <button
                type="button"
                disabled
                className="px-3 py-1.5 font-semibold rounded  w-[80px] text-[12px] bg-blue-400 text-white cursor-not-allowed"
              >
                {" "}
                Next &gt;
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto mt-5 ">
            <div className="flex">
            <div className="w-[72%]">
                <p className="font-semibold text-[17px] mb-4 mx-4">
                  {" "}
                 Annual Report
                </p>
              </div>
              <div className="text-md flex">
                <div> 1/8 </div>
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
              <div className="ml-3 container w-[78%]">
                <div className="mb-5 mt-5 ml-2">
                  <label
                    className="block text-gray-700 text-[15px] mb-2"
                    htmlFor="industryCheckbox"
                  >
                    1. What steps has the entity taken in the previous financial
                    year to prevent and reduce the risk that forced labour or
                    child labour is used at any step of the production of goods
                    in Canada or elsewhere by the entity or of goods imported
                    into Canada by the entity? Select all that apply. *
                  </label>
                </div>
                <div className="mb-2">
                  <div className="gap-2">
                    {optionsTwo.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <label className="ml-2 text-[15px] text-gray-600">
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
                </div>
                {selectedOptions.includes("other") && (
                  <div className="mb-5 mt-3">
                    <input
                      type="text"
                      placeholder="Enter a description..."
                      className={`${
                        open ? "w-[90%]" : "w-[90%]"
                      } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                      value={reportingentity}

                    ></input>
                  </div>
                )}
                <div className="mb-5 mt-3">
                  <label
                    className="block text-gray-700 text-[15px] mb-2"
                    htmlFor="industryCheckbox"
                  >
                    2. Please provide additional information describing the
                    steps taken (if applicable) (1,500 character limit).
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
                    // Specify the number of rows to determine the initial height
                  />
                </div>
              </div>

              <div className="w-[80%] mb-5">
                <div className="float-right mr-3">
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
              <form className="w-[78%] container ml-3 text-left">
                <div className="mb-5 mt-5 ml-2">
                  <label
                    className="block text-gray-700 text-[15px] mb-2"
                    htmlFor="industryCheckbox"
                  >
                    1. What steps has the entity taken in the previous financial
                    year to prevent and reduce the risk that forced labour or
                    child labour is used at any step of the production of goods
                    in Canada or elsewhere by the entity or of goods imported
                    into Canada by the entity? Select all that apply. *
                  </label>
                </div>
                <div className="mb-2">
                  <div className="gap-2">
                    {optionsTwo.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <label className="ml-2 text-[15px] text-gray-600">
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
                  <div className="my-1">
                    {error.selectedOptions && (
                      <p className="text-red-500">{error.selectedOptions}</p>
                    )}
                  </div>
                </div>
                {selectedOptions.includes("other") && (
                  <div className="mb-5 mt-3">
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
                <div className="mb-5 mt-3">
                  <label
                    className="block text-gray-700 text-[15px] mb-2"
                    htmlFor="industryCheckbox"
                  >
                    2. Please provide additional information describing the
                    steps taken (if applicable) (1,500 character limit).
                  </label>
                  <textarea
                    id="countriesOfOperation"
                    name="countriesOfOperation"
                    placeholder="Enter a description..."
                    className={`${
                      open ? "w-full" : "w-full"
                    }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
                    value={reportingdescription}
                    maxLength="1500"
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
                <div className="float-right mr-3">
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

export default Screenone;