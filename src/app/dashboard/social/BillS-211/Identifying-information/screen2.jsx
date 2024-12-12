"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';
const Screentwo = ({ nextStep, prevStep }) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [reportradio, setReportnradio] = useState("");
  const [reportingdate, setReportingdate] = useState("");
  const [reportingdescription, setReportingdescription] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(null);
  const isMounted = useRef(true);
//   const fetchBillstwo = async () => {
//     LoaderOpen(); // Assume this is to show some loading UI

//     try {
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_BACKEND_URL
//         }/identifying-information/?screen=2&user_id=${localStorage.getItem(
//           "user_id"
//         )}`
//       );

//       // If the request is successful but you specifically want to handle 404 inside here
//       if (response.status === 200) {
//         // Assuming you want to do something with the data for successful requests
//         // setData(response.data); // Uncomment or modify as needed
//         console.log(response.data, "bills 2110");
//         // You might want to setData or handle the error differently here
//         setData(response.data.is_revised_version_4);
//         setReportnradio(response.data.is_revised_version_4);
//         setReportingdate(response.data.original_report_date_4_1);
//         setReportingdescription(response.data.changes_description_4_2);
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
//       // fetchBillsone();
//       isMounted.current = false;
//     }
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
  const handleeditClick = () => {
    setIsClicked(!isClicked);
    // fetchBillsone();
  };
  const handleReportnradio = (event) => {
    setReportnradio(event.target.value);

  };
  const handleReportndate = (event) => {
    setReportingdate(event.target.value);

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
  const coNextStep = () => {
    nextStep();
  };
  const handleupdateform = async () => {
    let unewentities;
    let uoherinpute;
    if (reportradio === "No") {
      unewentities = null;
      uoherinpute = null;
    } else {
      unewentities = reportingdate;
      uoherinpute = reportingdescription;
    }

    LoaderOpen();

    const sandData = {
      is_revised_version_4: reportradio,
      original_report_date_4_1: unewentities,
      changes_description_4_2: uoherinpute,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=2`,
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
          // fetchBillsone();
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
    let newentities;
    let oherinpute;
    if (reportradio === "No") {
      newentities = null;
      oherinpute = null;
    } else {
      newentities = reportingdate;
      oherinpute = reportingdescription;
    }
    LoaderOpen();

    const sandData = {
      is_revised_version_4: reportradio,
      original_report_date_4_1: newentities,
      changes_description_4_2: oherinpute,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/identifying-information/?screen=2`,
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
      if (!reportingdate || reportingdate === null) {
        newErrors.reportingdate = "Please select a date";
      }
      if (!reportingdescription || reportingdescription === null) {
        newErrors.reportingdescription = "Please enter description";
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
      if (!reportingdate || reportingdate === null) {
        newErrors.reportingdate = "Please select a date";
      }
      if (!reportingdescription || reportingdescription === null) {
        newErrors.reportingdescription = "Please enter description";
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
      <div className="mx-4 mt-2">
      <form className="w-full text-left">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                    htmlFor="username"
                  >
                    4.Is this a revised version of a report already submitted
                    this reporting year?*
                  </label>
                  <div className="relative mb-1 flex">
                    <div>
                       {" "}
                      <input
                        type="radio"
                        id="Yes"
                        name="radio"
                        value="Yes"
                        checked={reportradio === "Yes"}
                        onChange={handleReportnradio}
                        className="radio-label"
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
                    <p className="text-red-500 ml-1 text-[12px]">{error.reportradio}</p>
                  )}
                </div>
                {reportradio === "Yes" && (
                  <>
                    <div className="mb-5">
                      <label
                        className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                        htmlFor="username"
                      >
                        4.1 If yes, identify the date the original report was
                        submitted.*
                      </label>
                      <div className="relative mb-1">
                        <input
                          type="date"
                          value={reportingdate}
                          onChange={handleReportndate}
                          className="w-[78%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer "
                        />
                      </div>
                      {error.reportingdate && (
                        <p className="text-red-500 ml-1 text-[12px]">
                          {error.reportingdate}
                        </p>
                      )}
                    </div>
                    <div className="mb-5">
                      <label
                        className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1 w-[78%]"
                        htmlFor="username"
                      >
                        4.2 Describe the changes made to the original report,
                        including by listing the questions or sections that were
                        revised (1,500 character limit)*
                      </label>
                      <div className="relative">
                        <textarea
                          id="countriesOfOperation"
                          name="countriesOfOperation"
                          placeholder="Enter a description..."
                          className="w-[78%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer "
                          value={reportingdescription}
                          // value={formData.countriesOfOperation}
                          // onChange={handleInputChange}
                          rows={5}
                          onChange={handleReportingdescription} // Specify the number of rows to determine the initial height
                        />
                      </div>
                      {error.reportingdescription && (
                        <p className="text-red-500 ml-1 text-[12px]">
                          {error.reportingdescription}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="w-[78%] mb-5">
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
      </div>


    </>
  );
};

export default Screentwo;