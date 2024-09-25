"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';


const Screentwo = ({ nextStep, prevStep }) => {

  const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdescription, setReportingdescription] = useState();
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedone, setIsCheckedone] = useState(false);
  const [isCheckedoneone, setIsCheckedoneone] = useState(false);
  const [isCheckeotherone, setIsCheckeotherone] = useState(false);
  const [isCheckedothertwo, setIsCheckedothertwo] = useState(false);
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
//         }/annual_report/?screen=2&user_id=${localStorage.getItem("user_id")}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2115");
//         // You might want to setData or handle the error differently here
//         setData(response.data.structure_3);
//         setReportingdescription(response.data.additional_information_entity_5);
//         setReportnradio(response.data.structure_3);
//         // setReportnradio(response.data.subject_to_supply_chain_legislation_7);
//         // setReportingentit(response.data.other_laws_description_7_1);

//         if (response.data.categorization_4 == null) {
//           setCheckboxStates({});
//         } else {
//           setCheckboxStates(response.data.categorization_4);
//           setIsChecked(response.data.categorization_4.Producing_goods);
//           setIsCheckedone(response.data.categorization_4.Selling_goods);
//           setIsCheckedoneone(response.data.categorization_4.Distributing_goods);
//           setIsCheckeotherone(
//             response.data.categorization_4
//               .Importing_into_Canada_goods_produced_outside_Canada
//           );
//           setIsCheckedothertwo(
//             response.data.categorization_4
//               .Controlling_an_entity_engaged_in_producing
//           );
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
//       fetchBillsfive();
//       isMounted.current = false;
//     }
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
  const handleCheckotherone = (name) => (event) => {
    if (name === "isCheckeotherone") {
      setIsCheckeotherone(event.target.checked);
    }
  };
  const handleCheckothertwo = (name) => (event) => {
    if (name === "isCheckedothertwo") {
      setIsCheckedothertwo(event.target.checked);
    }
  };
  const handleeditClick = () => {
    setIsClicked(!isClicked);
    // fetchBillsfive();
  };
  const handleReportnradio = (event) => {
    setReportnradio(event.target.value);

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
  const [checkboxStates, setCheckboxStates] = useState({
    ProducinggoodsInCanada: false,
    ProducinggoodsOutsideCanada: false,
    SellinggoodsInCanada: false,
    SellinggoodsOutsideCanada: false,
    DistributinggoodsInCanada: false,
    DistributinggoodsOutsideCanada: false,
  });

  const handleCheckboxChange = (name) => (event) => {
    const { checked } = event.target;
    if (name === "isChecked") {
      setIsChecked(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          ProducinggoodsInCanada: false,
          ProducinggoodsOutsideCanada: false,
        }));
      }
    } else if (name === "isCheckedone") {
      setIsCheckedone(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          SellinggoodsInCanada: false,
          SellinggoodsOutsideCanada: false,
        }));
      }
    } else if (name === "isCheckedoneone") {
      setIsCheckedoneone(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          DistributinggoodsInCanada: false,
          DistributinggoodsOutsideCanada: false,
        }));
      }
    } else {
      setCheckboxStates({ ...checkboxStates, [name]: event.target.checked });
    }
  };

  const renderContent = () => {
    const options = [
      { key: "ProducinggoodsInCanada", label: "in Canada" },
      { key: "ProducinggoodsOutsideCanada", label: "outside Canada" },
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
        key: "SellinggoodsInCanada",
        label: "in Canada",
      },
      {
        key: "SellinggoodsOutsideCanada",
        label: "outside Canada",
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
  const renderContenttwo = () => {
    const options = [
      {
        key: "DistributinggoodsInCanada",
        label: "in Canada",
      },
      {
        key: "DistributinggoodsOutsideCanada",
        label: "outside Canada",
      },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isCheckedoneone ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}
                disabled={!isCheckedoneone}
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
      { key: "ProducinggoodsInCanada", label: "in Canada" },
      { key: "ProducinggoodsOutsideCanada", label: "outside Canada" },
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
        key: "SellinggoodsInCanada",
        label: "in Canada",
      },
      {
        key: "SellinggoodsOutsideCanada",
        label: "outside Canada",
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
  const renderContenttwoview = () => {
    const options = [
      {
        key: "DistributinggoodsInCanada",
        label: "in Canada",
      },
      {
        key: "DistributinggoodsOutsideCanada",
        label: "outside Canada",
      },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isCheckedoneone ? "text-gray-600" : "text-gray-400"
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
  const handleupdateform = async () => {
    LoaderOpen();

    const sandData = {
      categorization_4: {
        ...checkboxStates,
        Producing_goods: isChecked,
        Selling_goods: isCheckedone,
        Distributing_goods: isCheckedoneone,
        Importing_into_Canada_goods_produced_outside_Canada: isCheckeotherone,
        Controlling_an_entity_engaged_in_producing: isCheckedothertwo,
      },
      structure_3: reportradio,
      additional_information_entity_5: reportingdescription,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=2`,
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
        //   fetchBillsfive();
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
      categorization_4: {
        ...checkboxStates,
        Producing_goods: isChecked,
        Selling_goods: isCheckedone,
        Distributing_goods: isCheckedoneone,
        Importing_into_Canada_goods_produced_outside_Canada: isCheckeotherone,
        Controlling_an_entity_engaged_in_producing: isCheckedothertwo,
      },
      structure_3: reportradio,
      additional_information_entity_5: reportingdescription,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/annual_report/?screen=2`,
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
    // Validation for "Canadian business presence"
    if (isChecked) {
      const businessPresenceSelected = [
        "ProducinggoodsInCanada",
        "ProducinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!businessPresenceSelected) {
        newErrors.businessPresence =
          "Please select at least one option under 'Producing goods (including manufacturing, extracting, growing and processing)'.";
      }
    }

    // Validation for "Meets size-related thresholds"
    if (isCheckedone) {
      const sizeThresholdsSelected = [
        "SellinggoodsInCanada",
        "SellinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!sizeThresholdsSelected) {
        newErrors.sizeThresholds =
          "Please select at least one option under 'Selling goods'.";
      }
    }
    if (isCheckedoneone) {
      const distributingGoods = [
        "DistributinggoodsInCanada",
        "DistributinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!distributingGoods) {
        newErrors.distributinggoods =
          "Please select at least one option under 'Distributing goods'.";
      }
    }

    // Ensure that at least one of the main categories is checked
    if (!isChecked && !isCheckedone && !isCheckedoneone) {
      newErrors.general =
        "Please select at least one category and fill in the details.";
    }

    if (!reportradio) {
      newErrors.reportradio = "This field is required. Please fill it out.";
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
    // Validation for "Canadian business presence"
    if (isChecked) {
      const businessPresenceSelected = [
        "ProducinggoodsInCanada",
        "ProducinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!businessPresenceSelected) {
        newErrors.businessPresence =
          "Please select at least one option under 'Producing goods (including manufacturing, extracting, growing and processing)'.";
      }
    }

    // Validation for "Meets size-related thresholds"
    if (isCheckedone) {
      const sizeThresholdsSelected = [
        "SellinggoodsInCanada",
        "SellinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!sizeThresholdsSelected) {
        newErrors.sizeThresholds =
          "Please select at least one option under 'Selling goods'.";
      }
    }
    if (isCheckedoneone) {
      const distributingGoods = [
        "DistributinggoodsInCanada",
        "DistributinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!distributingGoods) {
        newErrors.distributinggoods =
          "Please select at least one option under 'Distributing goods'.";
      }
    }

    // Ensure that at least one of the main categories is checked
    if (!isChecked && !isCheckedone && !isCheckedoneone) {
      newErrors.general =
        "Please select at least one category and fill in the details.";
    }

    if (!reportradio) {
      newErrors.reportradio = "This field is required. Please fill it out.";
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
              <div className="w-[80%] relative">
                <p className="font-bold  text-md mx-4 "> Annual Report</p>
              </div>
              <div className="text-md flex">
                <div> 2/8</div>
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
                  3.Which of the following accurately describes the entity’s
                  structure?*
                </label>
                <div className="relative mb-1">
                  <div className="mb-4">
                     {" "}
                    <input
                      type="radio"
                      id="Corporation"
                      name="radio"
                      value="Corporation"
                      checked={reportradio === "Corporation"}
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label
                      htmlFor="Corporation"
                      className="text-[15px] text-gray-700"
                    >
                      Corporation
                    </label>
                    <br />
                  </div>
                  <div className="mb-4">
                     {" "}
                    <input
                      type="radio"
                      id="Trust"
                      name="radio"
                      value="Trust"
                      checked={reportradio === "Trust"}
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label
                      htmlFor="Trust"
                      className="text-[15px] text-gray-700 "
                    >
                      Trust
                    </label>
                    <br />
                  </div>
                  <div className="mb-4">
                     {" "}
                    <input
                      type="radio"
                      id="Partnership"
                      name="radio"
                      value="Partnership"
                      checked={reportradio === "Partnership"}
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label
                      htmlFor="Partnership"
                      className="text-[15px] text-gray-700 "
                    >
                      Partnership
                    </label>
                    <br />
                  </div>
                  <div className="mb-4">
                     {" "}
                    <input
                      type="radio"
                      id="Other unincorporated organization"
                      name="radio"
                      value="Other unincorporated organization"
                      checked={
                        reportradio === "Other unincorporated organization"
                      }
                      onChange={handleReportnradio}
                    />
                     {" "}
                    <label
                      htmlFor="Other unincorporated organization"
                      className="text-[15px] text-gray-700 "
                    >
                      Other unincorporated organization
                    </label>
                    <br />
                  </div>
                </div>
                {error.reportradio && (
                  <p className="text-red-500 ml-1">{error.reportradio}</p>
                )}
              </div>

              <div className="mb-5">
                <div className="mt-5">
                  <div className="">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-2"
                      htmlFor="username"
                    >
                      4. Which of the following categorizations applies to the
                      entity? Select all that apply
                    </label>
                  </div>

                  <div className="ml-4">
                    <div>
                      <label className="ml-2 text-[15px] text-gray-600">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange("isChecked")}
                          className="mr-3 pt-1"
                        />
                        Producing goods (including manufacturing, extracting,
                        growing and processing)
                      </label>
                      {renderContent()}
                    </div>
                    <div>
                      <label className="ml-2 text-[15px] text-gray-600">
                        <input
                          type="checkbox"
                          checked={isCheckedone}
                          onChange={handleCheckboxChange("isCheckedone")}
                          className="mr-3 pt-1"
                        />
                        Selling goods
                      </label>
                      {renderContentone()}
                    </div>
                    <div>
                      <label className="ml-2 text-[15px] text-gray-600">
                        <input
                          type="checkbox"
                          checked={isCheckedoneone}
                          onChange={handleCheckboxChange("isCheckedoneone")}
                          className="mr-3 pt-1"
                        />
                        Distributing goods
                      </label>
                      {renderContenttwo()}
                    </div>
                    <div>
                      <label className="ml-2 text-[15px] text-gray-600">
                        <input
                          type="checkbox"
                          checked={isCheckeotherone}
                          onChange={handleCheckotherone("isCheckeotherone")}
                          className="mr-3 pt-1"
                        />
                        Importing into Canada goods produced outside Canada
                      </label>
                    </div>
                    <div className="w-[80%] relative">
                      <label className="ml-2 text-[15px]  text-gray-600">
                        <input
                          type="checkbox"
                          checked={isCheckedothertwo}
                          onChange={handleCheckothertwo("isCheckedothertwo")}
                          className="mr-3 pt-1"
                        />
                        Controlling an entity engaged in producing, selling or
                        distributing goods in Canada or outside Canada, or
                        importing into Canada goods produced outside Canada
                      </label>
                    </div>
                    {/* Display validation errors */}
                    <div className="mt-5 ml-3 mb-5">
                      {error.businessPresence && (
                        <div className="text-red-500">
                          {error.businessPresence}
                        </div>
                      )}
                      {error.sizeThresholds && (
                        <div className="text-red-500">
                          {error.sizeThresholds}
                        </div>
                      )}
                          {error.distributinggoods && (
                            <div className="text-red-500">
                              {error.distributinggoods}
                            </div>
                          )}
                      {error.general && (
                        <div className="text-red-500">{error.general}</div>
                      )}
                    </div>
                    <div className="mb-5 mt-3">
                      <label
                        className="block text-gray-700 text-[15px] mb-2"
                        html
                        htmlFor="industryCheckbox"
                      >
                        5. Please provide additional information on the entity’s
                        structure, activities and supply chains (1,500 character
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
                  </div>
                </div>
                {error.reportingdate && (
                  <p className="text-red-500 ml-1">{error.reportingdate}</p>
                )}
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
              <div className="w-[80%] relative">
                <p className="font-bold  text-md mx-4 "> Annual Report</p>
              </div>
              <div className="text-md flex">
                <div> 2/8</div>
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
                      3.Which of the following accurately describes the entity’s
                      structure?*
                    </label>
                    <div className="relative mb-1">
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Corporation"
                          name="radio"
                          value="Corporation"
                          checked={reportradio === "Corporation"}
                          onChange={handleReportnradio}

                        />
                         {" "}
                        <label
                          htmlFor="Corporation"
                          className="text-[15px] text-gray-700"
                        >
                          Corporation
                        </label>
                        <br />
                      </div>
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Trust"
                          name="radio"
                          value="Trust"
                          checked={reportradio === "Trust"}
                          onChange={handleReportnradio}

                        />
                         {" "}
                        <label
                          htmlFor="Trust"
                          className="text-[15px] text-gray-700 "
                        >
                          Trust
                        </label>
                        <br />
                      </div>
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Partnership"
                          name="radio"
                          value="Partnership"
                          checked={reportradio === "Partnership"}
                          onChange={handleReportnradio}

                        />
                         {" "}
                        <label
                          htmlFor="Partnership"
                          className="text-[15px] text-gray-700 "
                        >
                          Partnership
                        </label>
                        <br />
                      </div>
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Other unincorporated organization"
                          name="radio"
                          value="Other unincorporated organization"
                          checked={
                            reportradio === "Other unincorporated organization"
                          }
                          onChange={handleReportnradio}

                        />
                         {" "}
                        <label
                          htmlFor="Other unincorporated organization"
                          className="text-[15px] text-gray-700 "
                        >
                          Other unincorporated organization
                        </label>
                        <br />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="mt-5">
                      <div className="">
                        <label
                          className="block text-gray-700 text-[15px] mb-2 ml-2"
                          htmlFor="username"
                        >
                          4. Which of the following categorizations applies to
                          the entity? Select all that apply
                        </label>
                      </div>

                      <div className="ml-4">
                        <div>
                          <label className="ml-2 text-[15px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange("isChecked")}

                              className="mr-3 pt-1"
                            />
                            Producing goods (including manufacturing,
                            extracting, growing and processing)
                          </label>
                          {renderContentview()}
                        </div>
                        <div>
                          <label className="ml-2 text-[15px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedone}
                              onChange={handleCheckboxChange("isCheckedone")}

                              className="mr-3 pt-1"
                            />
                            Selling goods
                          </label>
                          {renderContentoneview()}
                        </div>
                        <div>
                          <label className="ml-2 text-[15px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedoneone}
                              onChange={handleCheckboxChange("isCheckedoneone")}

                              className="mr-3 pt-1"
                            />
                            Distributing goods
                          </label>
                          {renderContenttwoview()}
                        </div>
                        <div>
                          <label className="ml-2 text-[15px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckeotherone}
                              onChange={handleCheckotherone("isCheckeotherone")}

                              className="mr-3 pt-1"
                            />
                            Importing into Canada goods produced outside Canada
                          </label>
                        </div>
                        <div className="w-[80%] relative">
                          <label className="ml-2 text-[15px]  text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedothertwo}
                              onChange={handleCheckothertwo(
                                "isCheckedothertwo"
                              )}

                              className="mr-3 pt-1"
                            />
                            Controlling an entity engaged in producing, selling
                            or distributing goods in Canada or outside Canada,
                            or importing into Canada goods produced outside
                            Canada
                          </label>
                        </div>
                        {/* Display validation errors */}

                        <div className="mb-5 mt-3">
                          <label
                            className="block text-gray-700 text-[15px] mb-2"
                            html
                            htmlFor="industryCheckbox"
                          >
                            5. Please provide additional information on the
                            entity’s structure, activities and supply chains
                            (1,500 character limit).
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
                            // Specify the number of rows to determine the initial height
                          />
                        </div>
                      </div>
                    </div>
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
                <form className="w-full text-left">
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[15px] mb-2 ml-1"
                      htmlFor="username"
                    >
                      3.Which of the following accurately describes the entity’s
                      structure?*
                    </label>
                    <div className="relative mb-1">
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Corporation"
                          name="radio"
                          value="Corporation"
                          checked={reportradio === "Corporation"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Corporation"
                          className="text-[15px] text-gray-700"
                        >
                          Corporation
                        </label>
                        <br />
                      </div>
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Trust"
                          name="radio"
                          value="Trust"
                          checked={reportradio === "Trust"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Trust"
                          className="text-[15px] text-gray-700 "
                        >
                          Trust
                        </label>
                        <br />
                      </div>
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Partnership"
                          name="radio"
                          value="Partnership"
                          checked={reportradio === "Partnership"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Partnership"
                          className="text-[15px] text-gray-700 "
                        >
                          Partnership
                        </label>
                        <br />
                      </div>
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Other unincorporated organization"
                          name="radio"
                          value="Other unincorporated organization"
                          checked={
                            reportradio === "Other unincorporated organization"
                          }
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Other unincorporated organization"
                          className="text-[15px] text-gray-700 "
                        >
                          Other unincorporated organization
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500 ml-1">{error.reportradio}</p>
                    )}
                  </div>

                  <div className="mb-5">
                    <div className="mt-5">
                      <div className="">
                        <label
                          className="block text-gray-700 text-[15px] mb-2 ml-2"
                          htmlFor="username"
                        >
                          4. Which of the following categorizations applies to
                          the entity? Select all that apply
                        </label>
                      </div>

                      <div className="ml-4">
                        <div>
                          <label className="ml-2 text-[15px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange("isChecked")}
                              className="mr-3 pt-1"
                            />
                            Producing goods (including manufacturing,
                            extracting, growing and processing)
                          </label>
                          {renderContent()}
                        </div>
                        <div>
                          <label className="ml-2 text-[15px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedone}
                              onChange={handleCheckboxChange("isCheckedone")}
                              className="mr-3 pt-1"
                            />
                            Selling goods
                          </label>
                          {renderContentone()}
                        </div>
                        <div>
                          <label className="ml-2 text-[15px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedoneone}
                              onChange={handleCheckboxChange("isCheckedoneone")}
                              className="mr-3 pt-1"
                            />
                            Distributing goods
                          </label>
                          {renderContenttwo()}
                        </div>
                        <div>
                          <label className="ml-2 text-[15px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckeotherone}
                              onChange={handleCheckotherone("isCheckeotherone")}
                              className="mr-3 pt-1"
                            />
                            Importing into Canada goods produced outside Canada
                          </label>
                        </div>
                        <div className="w-[80%] relative">
                          <label className="ml-2 text-[15px]  text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedothertwo}
                              onChange={handleCheckothertwo(
                                "isCheckedothertwo"
                              )}
                              className="mr-3 pt-1"
                            />
                            Controlling an entity engaged in producing, selling
                            or distributing goods in Canada or outside Canada,
                            or importing into Canada goods produced outside
                            Canada
                          </label>
                        </div>
                        {/* Display validation errors */}
                        <div className="mt-5 ml-3 mb-5">
                          {error.businessPresence && (
                            <div className="text-red-500">
                              {error.businessPresence}
                            </div>
                          )}
                          {error.sizeThresholds && (
                            <div className="text-red-500">
                              {error.sizeThresholds}
                            </div>
                          )}
                            {error.distributinggoods && (
                            <div className="text-red-500">
                              {error.distributinggoods}
                            </div>
                          )}
                          {error.general && (
                            <div className="text-red-500">{error.general}</div>
                          )}
                        </div>
                        <div className="mb-5 mt-3">
                          <label
                            className="block text-gray-700 text-[15px] mb-2"
                            html
                            htmlFor="industryCheckbox"
                          >
                            5. Please provide additional information on the
                            entity’s structure, activities and supply chains
                            (1,500 character limit).
                          </label>
                          <textarea
                            id="countriesOfOperation"
                            name="countriesOfOperation"
                            placeholder="Enter a description..."
                            className={`${
                              open ? "w-[90%]" : "w-[90%]"
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
                      </div>
                    </div>
                    {error.reportingdate && (
                      <p className="text-red-500 ml-1">{error.reportingdate}</p>
                    )}
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

export default Screentwo;