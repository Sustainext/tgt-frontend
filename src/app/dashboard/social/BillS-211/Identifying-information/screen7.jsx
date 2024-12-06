"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose,MdDeleteOutline   } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';
import { countryname } from "../../data/countryname"
const Screenseven = ({ prevStep, activeSteps }) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [entitylocated, setEntitylocated] = useState();
  const [territorylocated, setTerritorylocated] = useState();
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
//   const isMounted = useRef(true);
  // const data = 1;
  const [data, setData] = useState(null);
//   const goToSomeStep = () => {

//     activeSteps(102);
//   };
  const canadian = [
    { code: "spoo", name: "Select province" },
    { code: "AB", name: "Alberta" },
    { code: "BC", name: "British Columbia" },
    { code: "MB", name: "Manitoba" },
    { code: "NB", name: "New Brunswick" },
    { code: "NL", name: "Newfoundland and Labrador" },
    { code: "NS", name: "Nova Scotia" },
    { code: "NT", name: "Northwest Territories" },
    { code: "NU", name: "Nunavut" },
    { code: "ON", name: "Ontario" },
    { code: "PE", name: "Prince Edward Island" },
    { code: "QC", name: "Québec" },
    { code: "SK", name: "Saskatchewan" },
    { code: "YT", name: "Yukon" },
  ];
//   const fetchBillsone = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/identifying-information/?screen=7&user_id=${localStorage.getItem(
//           "user_id"
//         )}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2115");
//         // You might want to setData or handle the error differently here
//         setData(response.data.country_10);
//         setEntitylocated(response.data.country_10);
//         setTerritorylocated(response.data.province_or_territory_10_1);
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
//       //fetchBillsone();
//       isMounted.current = false;
//     }
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleeditClick = () => {
    setIsClicked(!isClicked);
    //fetchBillsone();
  };
  const handleEntitylocated = (event) => {
    setEntitylocated(event.target.value);

  };
  const handleTerritorylocated = (event) => {
    setTerritorylocated(event.target.value);

  };
  const submitForm = async () => {
    LoaderOpen();

    const sandData = {
      country_10: entitylocated,
      province_or_territory_10_1: territorylocated,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=7`,
        sandData
      )
      .then((response) => {
        if (response.status == "200") {
          // console.log(response.status);
          toast.success("Added  successfully", {
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
          //fetchBillsone();
        //   goToSomeStep();
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
  const handleupdateform = async (e) => {
    e.preventDefault();
    LoaderOpen();

    const sandData = {
      country_10: entitylocated,
      province_or_territory_10_1: territorylocated,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=7`,
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
          //fetchBillsone();
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

  const validateForm = () => {
    let newErrors = {};

    if (
      entitylocated === "" ||
      entitylocated === "Select country" ||
      entitylocated === null
    ) {
      newErrors.entitylocated = "Please select a country.";
    }

    if (entitylocated === "Canada") {
      if (
        territorylocated === "" ||
        territorylocated === "Select province" ||
        territorylocated === null
      ) {
        newErrors.territorylocated = "Please select a province or territory.";
      }
    }

    return newErrors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setError({}); // Clear any existing errors
      await submitForm(); // Proceed with the form submission
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
              <div className="w-[70%]">
              <p className="font-semibold text-[17px] mb-4 mx-4">
                  {" "}
                  Identifying information
                </p>
              </div>
              <div className="text-md flex">
                <div> 7/7</div>
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
            <div className="mb-5">
              <label
                className="block text-gray-700 text-[15px]  mb-2 ml-1"
                for="username"
              >
                10.In which country is the entity headquartered or principally
                located? *
              </label>
              <div className="relative mb-1">
                <select
                  className={`${
                    open ? "w-[78%]" : "w-[78%]"
                  } rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  value={entitylocated}
                  onChange={handleEntitylocated}
                >
                  {/* <option value="default">Select country</option> */}
                  {/* <option value="default">Select country</option> */}
                  {countryname.map((option) => (
                    <option value={option.name}>{option.name}</option>
                  ))}
                </select>
              </div>
              {error.entitylocated && (
                <p className="text-red-500 ml-1 text-[12px]">{error.entitylocated}</p>
              )}
            </div>
            {entitylocated === "Canada" && (
              <div className="mb-5">
                <label
                  className="block text-gray-700 text-[15px] mb-2 ml-1"
                  for="username"
                >
                  10.1 If in Canada: In which province or territory is the
                  entity headquartered or principally located?*
                </label>
                <div className="relative mb-1">
                  <select
                    className={`${
                      open ? "w-[78%]" : "w-[78%]"
                    } rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    value={territorylocated}
                    onChange={handleTerritorylocated}
                  >
                    {canadian.map((option) => (
                      <option value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
                {error.territorylocated && (
                  <p className="text-red-500 ml-1 text-[12px]">{error.territorylocated}</p>
                )}
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto mt-5">
            <div className="flex">
              <div className="w-[75%]">
              <p className="font-semibold text-[17px] mb-4 mx-4">
                  {" "}
                  Identifying information
                </p>
              </div>
              <div className="text-md flex">
                <div> 7/7</div>
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
              <div className="mx-4 mt-8">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px]  mb-2 ml-1"
                    for="username"
                  >
                    10.In which country is the entity headquartered or
                    principally located? *
                  </label>
                  <div className="relative mb-1">
                    <select
                      className={`${
                        open ? "w-[78%]" : "w-[78%]"
                      } rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      value={entitylocated}
                      onChange={handleEntitylocated}
                    >
                      {/* <option value="default">Select country</option> */}
                      {countryname.map((option) => (
                        <option value={option.name}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {entitylocated === "Canada" && (
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      for="username"
                    >
                      10.1 If in Canada: In which province or territory is the
                      entity headquartered or principally located?*
                    </label>
                    <div className="relative mb-1">
                      <select
                        className={`${
                          open ? "w-[78%]" : "w-[78%]"
                        } rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        value={territorylocated}
                        onChange={handleTerritorylocated}

                      >
                        {canadian.map((option) => (
                          <option value={option.name}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="w-[79%] mb-5">
                  <div className="float-right mr-3">
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
                  </div>
                </div>
              </div>
            </>
          ) : (
            <form className="w-full text-left" onSubmit={handleSubmit}>
              <div className="mx-4 mt-8">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[15px]  mb-2 ml-1"
                    for="username"
                  >
                    10.In which country is the entity headquartered or
                    principally located? *
                  </label>
                  <div className="relative mb-1">
                    <select
                      className={`${
                        open ? "w-[78%]" : "w-[78%]"
                      } rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      value={entitylocated}
                      onChange={handleEntitylocated}
                    >
                      {/* <option value="default">Select country</option> */}
                      {countryname.map((option) => (
                        <option value={option.name}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                  {error.entitylocated && (
                    <p className="text-red-500 ml-1 text-[12px]">{error.entitylocated}</p>
                  )}
                </div>
                {entitylocated === "Canada" && (
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      for="username"
                    >
                      10.1 If in Canada: In which province or territory is the
                      entity headquartered or principally located?*
                    </label>
                    <div className="relative mb-1">
                      <select
                        className={`${
                          open ? "w-[78%]" : "w-[78%]"
                        } rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        value={territorylocated}
                        onChange={handleTerritorylocated}
                      >
                        {canadian.map((option) => (
                          <option value={option.name}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                    {error.territorylocated && (
                      <p className="text-red-500 ml-1 text-[12px]">
                        {error.territorylocated}
                      </p>
                    )}
                  </div>
                )}

                <div className="w-[79%] mb-5">
                  <div className="float-right mr-3">
                    <button
                      className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
                      onClick={prevStep}
                    >
                      &lt; Previous
                    </button>
                    <button
                      className="px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default Screenseven;