"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose,MdDeleteOutline   } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';

const Screenfive = ({ nextStep, prevStep }) => {
  const [loopen, setLoOpen] = useState(false);
  const { open } = GlobalState();
  const [isClicked, setIsClicked] = useState(false);
  const isMounted = useRef(true);
  // const data = 1;
  const [data, setData] = useState();
  const coNextStep = () => {
    nextStep();
  };
//   const fetchBillsfive = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/identifying-information/?screen=5&user_id=${localStorage.getItem(
//           "user_id"
//         )}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2115");
//         // You might want to setData or handle the error differently here
//         setData(response.data.categorizations_8);
//         // setReportnradio(response.data.subject_to_supply_chain_legislation_7);
//         // setReportingentit(response.data.other_laws_description_7_1);

//         if (response.data.categorizations_8 == null) {
//           setCheckboxStates({});
//         } else {
//           setCheckboxStates(response.data.categorizations_8);
//           setIsChecked(response.data.categorizations_8.isChecked);
//           setIsCheckedone(response.data.categorizations_8.isCheckedone);
//           setIsCheckednew(response.data.categorizations_8.isCheckednew);
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
//      //fetchBillsfive();

//       isMounted.current = false;
//     }
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
  const handleeditClick = () => {
    setIsClicked(!isClicked);
   //fetchBillsfive();
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedone, setIsCheckedone] = useState(false);
  const [isCheckednew, setIsCheckednew] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    businessInCanada: false,
    doesBusinessInCanada: false,
    hasAssetsInCanada: false,
    largeAssetSize: false,
    largeRevenue: false,
    largeEmployees: false,
  });

  const [error, setError] = useState({});
  const handleCheckboxChangenew = (name) => (event) => {
    if (name === "isCheckednew") {
      setIsCheckednew(event.target.checked);
    }

    // console.log(event.target.value, "name");
  };
  const handleCheckboxChange = (name) => (event) => {
    const { checked } = event.target;
    if (name === "isChecked") {
      setIsChecked(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          businessInCanada: false,
          doesBusinessInCanada: false,
          hasAssetsInCanada: false,
        }));
      }
    } else if (name === "isCheckedone") {
      setIsCheckedone(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          largeAssetSize: false,
          largeRevenue: false,
          largeEmployees: false,
        }));
      }
    } else {
      setCheckboxStates({ ...checkboxStates, [name]: event.target.checked });
    }
  };

  const continueToNextStep = () => {
    let newErrors = {};

    // Validation for "Canadian business presence"
    if (isChecked) {
      const businessPresenceSelected = [
        "businessInCanada",
        "doesBusinessInCanada",
        "hasAssetsInCanada",
      ].some((key) => checkboxStates[key]);
      if (!businessPresenceSelected) {
        newErrors.businessPresence =
          "Please select at least one option under 'Canadian business presence'.";
      }
    }

    // Validation for "Meets size-related thresholds"
    if (isCheckedone) {
      const sizeThresholdsSelected = [
        "largeAssetSize",
        "largeRevenue",
        "largeEmployees",
      ].some((key) => checkboxStates[key]);
      if (!sizeThresholdsSelected) {
        newErrors.sizeThresholds =
          "Please select at least one option under 'Meets size-related thresholds'.";
      }
    }

    // Ensure that at least one of the main categories is checked
    if (!isChecked && !isCheckedone) {
      newErrors.general =
        "Please select at least one category and fill in the details.";
    }

    if (Object.keys(newErrors).length === 0) {
      setError({}); // Clear errors if validation passes
      submitForm(); // Assuming nextStep is a function prop for navigating to the next step
    } else {
      setError(newErrors); // Set errors from validation
    }
  };
  const submitForm = async () => {
    LoaderOpen();

    const sandData = {
      categorizations_8: {
        ...checkboxStates,
        isChecked: isChecked,
        isCheckedone: isCheckedone,
        isCheckednew: isCheckednew,
      },
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=5`,
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
  const handleupdateform = async (e) => {
    e.preventDefault();
    LoaderOpen();

    const sandData = {
      categorizations_8: {
        ...checkboxStates,
        isChecked: isChecked,
        isCheckedone: isCheckedone,
        isCheckednew: isCheckednew,
      },
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=5`,
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
         //fetchBillsfive();
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
  const renderContent = () => {
    const options = [
      {
        key: "businessInCanada",
        label: "Has a place of business in Canada",
        value: "1",
      },
      {
        key: "doesBusinessInCanada",
        label: "Does business in Canada",
        value: "2",
      },
      { key: "hasAssetsInCanada", label: "Has assets in Canada", value: "3" },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isChecked ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}
                disabled={!isChecked}
                className="mr-3 pt-1 scale-90 rounded-xl"
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };

  const renderContentone = () => {
    const options = [
      {
        key: "largeAssetSize",
        label:
          "Has at least $20 million in assets for at least one of its two most recent financial years",
      },
      {
        key: "largeRevenue",
        label:
          "Has generated at least $40 million in revenue for at least one of its two most recent financial years",
      },
      {
        key: "largeEmployees",
        label:
          "Employs an average of at least 250 employees for at least one of its two most recent financial years",
      },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isCheckedone ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}
                disabled={!isCheckedone}
                className="mr-3 pt-1 scale-90 rounded-xl"
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };
  const renderContentview = () => {
    const options = [
      {
        key: "businessInCanada",
        label: "Has a place of business in Canada",
        value: "1",
      },
      {
        key: "doesBusinessInCanada",
        label: "Does business in Canada",
        value: "2",
      },
      { key: "hasAssetsInCanada", label: "Has assets in Canada", value: "3" },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isChecked ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}

                className="mr-3 pt-1 scale-90 rounded-xl"
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };

  const renderContentoneview = () => {
    const options = [
      {
        key: "largeAssetSize",
        label:
          "Has at least $20 million in assets for at least one of its two most recent financial years",
      },
      {
        key: "largeRevenue",
        label:
          "Has generated at least $40 million in revenue for at least one of its two most recent financial years",
      },
      {
        key: "largeEmployees",
        label:
          "Employs an average of at least 250 employees for at least one of its two most recent financial years",
      },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isCheckedone ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}

                className="mr-3 pt-1 scale-90 rounded-xl"
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
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
              <div className="w-[70%]">
                <p className="font-bold  text-md mx-4 ">
                  {" "}
                  Identifying information
                </p>
              </div>
              <div className="text-md flex">
                <div> 5/7 </div>
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
          <div className="mt-5">
            <div className="ml-4">
              <label
                className="block text-gray-700 text-[15px] mb-2 ml-2"
                htmlFor="username"
              >
                8. Which of the following categorizations applies to the entity?
                Select all that apply
              </label>
            </div>
            <div className="ml-4">
              <label className="ml-2 text-[15px] text-gray-600">
                <input
                  type="checkbox"
                  name="isCheckednew"
                  checked={isCheckednew}
                  onChange={handleCheckboxChangenew("isCheckednew")}
                  className="mr-3 pt-1"
                />
                Listed on a stock exchange in Canada
              </label>
            </div>
            <div className="ml-4">
              <div>
                <label className="ml-2 text-[15px] text-gray-600">
                  <input
                    type="checkbox"
                    name="isChecked"
                    checked={isChecked}
                    onChange={handleCheckboxChange("isChecked")}
                    className="mr-3 pt-1"
                  />
                  Canadian business presence (select all that apply)
                </label>
                {renderContent()}
              </div>
              <div>
                <label className="ml-2 text-[15px] text-gray-600">
                  <input
                    type="checkbox"
                    name="isCheckedone"
                    checked={isCheckedone}
                    onChange={handleCheckboxChange("isCheckedone")}
                    className="mr-3 pt-1"
                  />
                  Meets size-related thresholds (select all that apply):
                </label>
                {renderContentone()}
              </div>
              {/* Display validation errors */}
              <div className="mt-5 ml-3 mb-5">
                {error.businessPresence && (
                  <div className="text-red-500">{error.businessPresence}</div>
                )}
                {error.sizeThresholds && (
                  <div className="text-red-500">{error.sizeThresholds}</div>
                )}
                {error.general && (
                  <div className="text-red-500">{error.general}</div>
                )}
              </div>
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
              <div className="w-[75%]">
                <p className="font-bold  text-md mx-4 ">
                  {" "}
                  Identifying information
                </p>
              </div>
              <div className="text-md flex">
                <div> 5/7 </div>
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
              <div className="mt-5">
                <div className="ml-4">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-2"
                    htmlFor="username"
                  >
                    8. Which of the following categorizations applies to the
                    entity? Select all that apply
                  </label>
                </div>
                <div className="ml-4">
                  <label className="ml-2 text-[15px] text-gray-600">
                    <input
                      type="checkbox"
                      name="isCheckednew"
                      checked={isCheckednew}
                      onChange={handleCheckboxChangenew("isCheckednew")}
                      className="mr-3 pt-1"

                    />
                    Listed on a stock exchange in Canada
                  </label>
                </div>
                <div className="ml-4">
                  <div>
                    <label className="ml-2 text-[15px] text-gray-600">
                      <input
                        type="checkbox"
                        name="isChecked"
                        checked={isChecked}
                        onChange={handleCheckboxChange("isChecked")}
                        className="mr-3 pt-1"

                      />
                      Canadian business presence (select all that apply)
                    </label>
                    {renderContentview()}
                  </div>
                  <div>
                    <label className="ml-2 text-[15px] text-gray-600">
                      <input
                        type="checkbox"
                        name="isCheckedone"
                        checked={isCheckedone}
                        onChange={handleCheckboxChange("isCheckedone")}
                        className="mr-3 pt-1"

                      />
                      Meets size-related thresholds (select all that apply):
                    </label>
                    {renderContentoneview()}
                  </div>
                  {/* Display validation errors */}
                </div>
              </div>
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
            <>
              <div className="mt-5">
                <div className="ml-4">
                  <label
                    className="block text-gray-700 text-[15px] mb-2 ml-2"
                    htmlFor="username"
                  >
                    8. Which of the following categorizations applies to the
                    entity? Select all that apply
                  </label>
                </div>
                <div className="ml-4">
                  <label className="ml-2 text-[15px] text-gray-600">
                    <input
                      type="checkbox"
                      name="isCheckednew"
                      checked={isCheckednew}
                      onChange={handleCheckboxChangenew("isCheckednew")}
                      className="mr-3 pt-1"
                    />
                    Listed on a stock exchange in Canada
                  </label>
                </div>
                <div className="ml-4">
                  <div>
                    <label className="ml-2 text-[15px] text-gray-600">
                      <input
                        type="checkbox"
                        name="isChecked"
                        checked={isChecked}
                        onChange={handleCheckboxChange("isChecked")}
                        className="mr-3 pt-1"
                      />
                      Canadian business presence (select all that apply)
                    </label>
                    {renderContent()}
                  </div>
                  <div>
                    <label className="ml-2 text-[15px] text-gray-600">
                      <input
                        type="checkbox"
                        name="isCheckedone"
                        checked={isCheckedone}
                        onChange={handleCheckboxChange("isCheckedone")}
                        className="mr-3 pt-1"
                      />
                      Meets size-related thresholds (select all that apply):
                    </label>
                    {renderContentone()}
                  </div>
                  {/* Display validation errors */}
                  <div className="mt-5 ml-3 mb-5">
                    {error.businessPresence && (
                      <div className="text-red-500">
                        {error.businessPresence}
                      </div>
                    )}
                    {error.sizeThresholds && (
                      <div className="text-red-500">{error.sizeThresholds}</div>
                    )}
                    {error.general && (
                      <div className="text-red-500">{error.general}</div>
                    )}
                  </div>
                </div>
              </div>
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
            </>
          )}
        </>
      )}

    </>
  );
};

export default Screenfive;