"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose,MdDeleteOutline   } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';
const Screenthree = ({ nextStep, prevStep }) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [reportradiojoint, setReportnradiojoint] = useState("");
  const [reportingbusinessnumber, setReportingbusinessnumber] = useState();
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  // const data = 1;

  const [data, setData] = useState("");
  const isMounted = useRef(true);
//   const fetchBillsthree = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/identifying-information/?screen=3&user_id=${localStorage.getItem(
//           "user_id"
//         )}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2110");
//         // You might want to setData or handle the error differently here
//         setData(response.data.is_joint_report_6);
//         setReportingbusinessnumber(response.data.business_number_5);
//         setReportnradiojoint(response.data.is_joint_report_6);
//         if (response.data.legal_name_and_business_numbers_6_1_2 == null) {
//           setEntities([{ legalName: "", businessNumber: "" }]);
//         } else {
//           setEntities(response.data.legal_name_and_business_numbers_6_1_2);
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
//        //fetchBillsthree();
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
     //fetchBillsthree();
  };
  const handleReportnradio = (event) => {
    setReportnradiojoint(event.target.value);
    console.log(event.target.value, "setReportnradio");
  };
  const handleReportnbusinessnumber = (event) => {
    setReportingbusinessnumber(event.target.value);
    console.log(event.target.value, "setReportingdate");
  };

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const [entities, setEntities] = useState([
    { legalName: "", businessNumber: "" },
  ]);

  const handleInputChange = (index, type, value) => {
    const newEntities = [...entities];
    newEntities[index][type] = value;
    // Also reset the corresponding error
    setError((prevErrors) => ({ ...prevErrors, [`${type}${index}`]: "" }));

    setEntities(newEntities);
  };

  const handleAddEntity = () => {
    setEntities([...entities, { legalName: "", businessNumber: "" }]);
  };

  const handleRemoveEntity = (index) => {
    const newEntities = [...entities];
    newEntities.splice(index, 1);
    setEntities(newEntities);
    // Remove errors related to the entity
    setError((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`legalName${index}`];
      delete newErrors[`businessNumber${index}`];
      return newErrors;
    });
  };
  const handleupdateform = async () => {
    LoaderOpen();
    let newentities;
    let numbersbusiness;
    if (reportradiojoint === "No") {
      newentities = [{ legalName: "", businessNumber: "" }];
    } else {
      newentities = entities;
    }
    if (reportingbusinessnumber === "") {
      numbersbusiness = null;
    } else {
      numbersbusiness = reportingbusinessnumber;
    }
    const sandData = {
      legal_name_and_business_numbers_6_1_2: newentities,

      is_joint_report_6: reportradiojoint,
      business_number_5: numbersbusiness,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=3`,
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
           //fetchBillsthree();
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
      legal_name_and_business_numbers_6_1_2: entities,
      is_joint_report_6: reportradiojoint,
      business_number_5: reportingbusinessnumber,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=3`,
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

    if (!reportradiojoint) {
      newErrors.reportradiojoint = "This field is required. Please fill it out.";
    }

    if (reportradiojoint === "Yes") {
      entities.forEach((entity, index) => {
        if (!entity.legalName.trim()) {
          newErrors[`legalName${index}`] = "Legal name is required";
        }

      });
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
    if (reportradiojoint === "Yes") {
      entities.forEach((entity, index) => {
        if (!entity.legalName.trim()) {
          newErrors[`legalName${index}`] = "Legal name is required";
        }

      });
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
  const handleKeyDown = (event) => {
    // Prevent 'e', '+', '-', and '.' from being entered
    if (["e", "E", "+", "-", "."].includes(event.key)) {
      event.preventDefault();
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
                <div> 3/7 </div>
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
                  htmlFor="username"
                >
                  5.Business number(s) (if applicable):
                </label>
                <div className="relative mb-1 flex">
                  <input
                    type="number"
                    placeholder="Enter number"
                    className={`${
                      open ? "w-[78%]" : "w-[78%]"
                    } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                    value={reportingbusinessnumber}
                    onChange={handleReportnbusinessnumber}
                    onKeyDown={handleKeyDown}
                  ></input>
                </div>
              </div>
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px] mb-2 ml-1"
                  htmlFor="username"
                >
                  6.Is this a joint report?*
                </label>
                <div className="relative mb-1 flex">
                  <div>
                     {" "}
                    <input
                      type="radio"
                      id="Yes"
                      name="radio"
                      value="Yes"
                      checked={reportradiojoint === "Yes"}
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label htmlFor="Yes" className="text-[15px] text-gray-700">
                      Yes
                    </label>
                    <br />
                  </div>
                  <div className="ml-5">
                     {" "}
                    <input
                      type="radio"
                      id="No"
                      name="radio"
                      value="No"
                      checked={reportradiojoint === "No"}
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label htmlFor="No" className="text-[15px] text-gray-700 ">
                      No
                    </label>
                    <br />
                  </div>
                </div>
                {error.reportradiojoint && (
                  <p className="text-red-500 ml-1">{error.reportradiojoint}</p>
                )}
              </div>
              {reportradiojoint === "Yes" && (
                <div>
                  <div>
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      6.1 & 6.2. If yes, identify the legal name and business
                      number(s) of each entity covered by this report.*
                    </label>
                  </div>
                  {entities.map((entity, index) => (
                    <div key={index} className="flex">
                      <div className="w-[37%]">
                        <input
                          type="text"
                          placeholder="Enter entity name"
                          value={entity.legalName}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "legalName",
                              e.target.value
                            )
                          }
                          className={`${
                            open ? "w-[100%]" : "w-[100%]"
                          } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                        />
                        {error[`legalName${index}`] && (
                          <p className="text-red-500 ml-1">
                            {error[`legalName${index}`]}
                          </p>
                        )}
                      </div>
                      <div className="ml-2 w-[37%]">
                        <input
                          type="number"
                          placeholder="Enter Business numbers"
                          value={entity.businessNumber}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "businessNumber",
                              e.target.value
                            )
                          }
                          onKeyDown={handleKeyDown}
                          className={`${
                            open ? "w-[100%]" : "w-[100%]"
                          } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                        />
                        {/* {error[`businessNumber${index}`] && (
                          <p className="text-red-500 ml-1">
                            {error[`businessNumber${index}`]}
                          </p>
                        )} */}
                      </div>
                      {index !== 0 && (
                        <div className="ml-2 mt-1">
                          <MdDeleteOutline
                            onClick={() => handleRemoveEntity(index)}
                            className="text-red-500 text-[30px] mt-1 cursor-pointer"
                          />
                        </div>
                      )}
                      {/* <div className="ml-2 mt-1">
                        {" "}
                        <MdDeleteOutline
                          onClick={() => handleRemoveEntity(index)}
                          className="text-red-500 text-sm "
                        />
                      </div> */}
                    </div>
                  ))}
                  <div className="mt-2">
                    <button
                      type="button"
                      className="text-[12px] text-sky-500 ml-1"
                      onClick={handleAddEntity}
                    >
                      + Add new entity
                    </button>
                  </div>
                </div>
              )}

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
                <div> 3/7 </div>
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
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    htmlFor="username"
                  >
                    5.Business number(s) (if applicable):
                  </label>
                  <div className="relative mb-1 flex">
                    <input
                      type="number"
                      placeholder="Enter number"
                      className={`${
                        open ? "w-[78%]" : "w-[78%]"
                      } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                      defaultValue={reportingbusinessnumber}

                    ></input>
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    htmlFor="username"
                  >
                    6.Is this a joint report?*
                  </label>
                  <div className="relative mb-1 flex">
                    <div>
                       {" "}
                      <input
                        type="radio"
                        id="Yes"
                        name="radio"
                        value="Yes"
                        checked={reportradiojoint === "Yes"}
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
                    <div className="ml-5">
                       {" "}
                      <input
                        type="radio"
                        id="No"
                        name="radio"
                        value="No"
                        checked={reportradiojoint === "No"}
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
                  {/* {error.reportradiojoint && (
                    <p className="text-red-500 ml-1">
                      {error.reportradiojoint}
                    </p>
                  )} */}
                </div>
                {reportradiojoint === "Yes" && (
                  <div>
                    <div>
                      <label
                        className="block text-gray-700 text-[15px] mb-2 ml-1"
                        htmlFor="username"
                      >
                        6.1 & 6.2. If yes, identify the legal name and business
                        number(s) of each entity covered by this report.*
                      </label>
                    </div>
                    {entities.map((entity, index) => (
                      <div key={index} className="flex">
                        <div className="w-[37%]">
                          <input
                            type="text"
                            placeholder="Enter entity name"
                            defaultValue={entity.legalName}

                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "legalName",
                                e.target.value
                              )
                            }
                            className={`${
                              open ? "w-[100%]" : "w-[100%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                          />
                          {/* {error[`legalName${index}`] && (
                            <p className="text-red-500 ml-1">
                              {error[`legalName${index}`]}
                            </p>
                          )} */}
                        </div>
                        <div className="ml-2 w-[37%]">
                          <input
                            type="number"
                            placeholder="Enter Business numbers"
                            defaultValue={entity.businessNumber}

                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "businessNumber",
                                e.target.value
                              )
                            }
                            className={`${
                              open ? "w-[100%]" : "w-[100%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                          />
                          {/* {error[`businessNumber${index}`] && (
                            <p className="text-red-500 ml-1">
                              {error[`businessNumber${index}`]}
                            </p>
                          )} */}
                        </div>
                        {index !== 0 && (
                          <div className="ml-2 mt-1">
                            <MdDeleteOutline
                              onClick={() => handleRemoveEntity(index)}
                              className="text-red-500 text-[30px] mt-1 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="mt-2">
                      <button
                        type="button"
                        className="text-[12px] text-sky-500 ml-1"
                        onClick={handleAddEntity}

                      >
                        + Add new entity
                      </button>
                    </div>
                  </div>
                )}
                <div className="w-[80%] mb-5 mt-5">
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
              <form className="w-full text-left">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    htmlFor="username"
                  >
                    5.Business number(s) (if applicable):
                  </label>
                  <div className="relative mb-1 flex">
                    <input
                      type="number"
                      placeholder="Enter number"
                      className={`${
                        open ? "w-[78%]" : "w-[78%]"
                      } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                      value={reportingbusinessnumber}
                      onChange={handleReportnbusinessnumber}
                      onKeyDown={handleKeyDown}
                    ></input>
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-1"
                    htmlFor="username"
                  >
                    6.Is this a joint report?*
                  </label>
                  <div className="relative mb-1 flex">
                    <div>
                       {" "}
                      <input
                        type="radio"
                        id="Yes"
                        name="radio"
                        value="Yes"
                        checked={reportradiojoint === "Yes"}
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
                    <div className="ml-5">
                       {" "}
                      <input
                        type="radio"
                        id="No"
                        name="radio"
                        value="No"
                        checked={reportradiojoint === "No"}
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
                  {error.reportradiojoint && (
                    <p className="text-red-500 ml-1">
                      {error.reportradiojoint}
                    </p>
                  )}
                </div>
                {reportradiojoint === "Yes" && (
                  <div>
                    <div>
                      <label
                        className="block text-gray-700 text-[15px] mb-2 ml-1"
                        htmlFor="username"
                      >
                        6.1 & 6.2. If yes, identify the legal name and business
                        number(s) of each entity covered by this report.*
                      </label>
                    </div>
                    {entities.map((entity, index) => (
                      <div key={index} className="flex">
                        <div className="w-[37%]">
                          <input
                            type="text"
                            placeholder="Enter entity name"
                            value={entity.legalName}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "legalName",
                                e.target.value
                              )
                            }
                            onKeyDown={handleKeyDown}
                            className={`${
                              open ? "w-[100%]" : "w-[100%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                          />
                          {error[`legalName${index}`] && (
                            <p className="text-red-500 ml-1">
                              {error[`legalName${index}`]}
                            </p>
                          )}
                        </div>
                        <div className="ml-2 w-[37%]">
                          <input
                            type="number"
                            placeholder="Enter Business numbers"
                            value={entity.businessNumber}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "businessNumber",
                                e.target.value
                              )
                            }
                            className={`${
                              open ? "w-[100%]" : "w-[100%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                          />
                          {/* {error[`businessNumber${index}`] && (
                            <p className="text-red-500 ml-1">
                              {error[`businessNumber${index}`]}
                            </p>
                          )} */}
                        </div>
                        {index !== 0 && (
                          <div className="ml-2 mt-1">
                            <MdDeleteOutline
                              onClick={() => handleRemoveEntity(index)}
                              className="text-red-500 text-[30px] mt-1 cursor-pointer"
                            />
                          </div>
                        )}
                        {/* <div className="ml-2 mt-1">
                          {" "}
                          <MdDeleteOutline
                            onClick={() => handleRemoveEntity(index)}
                            className="text-red-500 text-sm "
                          />
                        </div> */}
                      </div>
                    ))}
                    <div className="mt-2">
                      <button
                        type="button"
                        className="text-[12px] text-sky-500 ml-1"
                        onClick={handleAddEntity}
                      >
                        + Add new entity
                      </button>
                    </div>
                  </div>
                )}

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

export default Screenthree;