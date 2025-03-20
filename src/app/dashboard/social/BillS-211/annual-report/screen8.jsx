"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screenend = ({
  prevStep,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
}) => {
  const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdate, setReportingdate] = useState("");
  const [reportingdescription, setReportingdescription] = useState("");
  const [reportingentity, setReportingentit] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted,setIsSubmitted]= useState(false)

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();

  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetchBillSeight = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=8&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );

      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportnradio(response.data.policies_procedures_assess_17);
        setReportingdescription(response.data.additional_info_assessment_18);
        setReportingentit(response.data.assessment_method_description_17_1);
        if (response.data.assessment_method_17_1 == null) {
          setIsSubmitted(false)
          setSelectedOptions([]);
        } else {
          setIsSubmitted(true)
          setSelectedOptions(response.data.assessment_method_17_1);
        }
        LoaderClose();
      } else {
        LoaderClose();
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      LoaderClose();
      console.error("API call failed:", error);
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      LoaderClose();
    }
  };

  
  useEffect(() => {
    // if (isMounted.current) {

    //   isMounted.current = false;
    // }
    // return () => {
    //   isMounted.current = false;
    // };
    if (reportType == "Organization") {
      if (selectedOrg && year) {
        fetchBillSeight();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillSeight();
      }
    }
    setReportnradio("");
    setReportingdescription("");
    setReportingentit("");
    setSelectedOptions([]);
  }, [selectedCorp, selectedOrg, year]);

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
    setError((prev) => ({ ...prev, reportingentity: "" }));
  };

  const handleReportnradio = (event) => {
    setReportnradio(event.target.value);
    setError((prev) => ({ ...prev, reportradio: "" }));
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

    try {
      LoaderOpen();

      const sendData = {
        policies_procedures_assess_17: reportradio,
        assessment_method_17_1: unewentities,
        additional_info_assessment_18: reportingdescription
          ? reportingdescription
          : null,
        assessment_method_description_17_1: uotherfiles,
        organization_id: selectedOrg,
        corporate_id: selectedCorp ? selectedCorp : null,
        year: year,
      };
      const response = await axiosInstance.post(
        `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=8`,
        sendData,
        axiosConfig
      );
      if (response.status == "200") {
        setIsSubmitted(true)
        toast.success("Data added successfully", {
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
      } else {
        toast.error("Oops, something went wrong", {
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
    } catch (error) {
      LoaderClose();
      console.error("API call failed:", error);
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
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

    if (selectedOptions.includes("Other, please specify:")) {
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
    LoaderOpen();
    try {
      const response = await fetch(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/generate_cbill_excel/?organization=${selectedOrg}&corporate=${selectedCorp}&year=${year}`,
        axiosConfig
      );
      if (!response.ok) {
        const errorResponse = await response.json(); 
        throw new Error(errorResponse.error || "Unknown error occurred");
      }
      LoaderClose();
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `Canada_Bill_S211.xlsx`); // Choose the file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      LoaderClose();
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
      LoaderClose();
    }
  };

  return (
    <>
      <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-2 mt-2">
        <form className="xl:w-[80%] lg:w-[80%] 2xl:w-[80%] md:w-[80%] 2k:w-[80%] 4k:w-[80%] w-[99%] text-left">
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
              htmlFor="username"
            >
              17. Does the entity currently have policies and procedures in
              place to assess its effectiveness in ensuring that forced labour
              and child labour are not being used in its activities and supply
              chains? *
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
                <label htmlFor="Yes" className="text-[14px] text-gray-700">
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
                <label htmlFor="No" className="text-[14px] text-gray-700 ">
                  No
                </label>
                <br />
              </div>
            </div>
            {error.reportradio && (
              <p className="text-red-500 ml-1 text-[12px] mt-1">
                {error.reportradio}
              </p>
            )}
          </div>
          {reportradio === "Yes" && (
            <div className="mb-5">
              <label
                className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                htmlFor="username"
              >
                17.1 If yes, what method does the entity use to assess its
                effectiveness? Select all that apply.*
              </label>
              <div>
                {options.map((option, index) => (
                  <div key={index} className="mb-2 ml-2">
                    <label className="text-[14px] text-gray-600">
                      <input
                        type="checkbox"
                        value={option.label}
                        checked={selectedOptions.includes(option.label)}
                        onChange={handleCheckboxChange}
                        className="mr-3"
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
                {selectedOptions.includes("Other, please specify:") && (
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
                      <div className="text-red-500 ml-1 text-[12px] mt-1">
                        {error.reportingentity}
                      </div>
                    )}
                  </div>
                )}
                {error.checkboxes && (
                  <div className="text-red-500 ml-1 text-[12px] mt-1">
                    {error.checkboxes}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="mb-5 mt-3">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2"
              html
              htmlFor="industryCheckbox"
            >
              18. Please provide additional information on how the entity
              assesses its effectiveness in ensuring that forced labour and
              child labour are not being used in its activities and supply
              chains (if applicable).
            </label>
            <textarea
              id="countriesOfOperation"
              name="countriesOfOperation"
              placeholder="Enter a description..."
              className={`${
                open ? "w-full" : "w-full"
              }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
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
        {
          isSubmitted?(
            <div className="xl:w-[80%]  lg:w-[80%]   2xl:w-[80%]   md:w-[80%]   2k:w-[80%]   4k:w-[80%]  w-full] mb-5">
                <div className="float-right">
               <button
            type="button"
            onClick={handleDownload}
            className={`px-3 py-2 font-semibold rounded ml-2 w-[130px] text-[12px] bg-blue-500 text-white`}
          >
            {" "}
            Download Report
          </button>
            </div>
            </div>
            
           
          ):(
            <div className="xl:w-[80%]  lg:w-[80%]   2xl:w-[80%]   md:w-[80%]   2k:w-[80%]   4k:w-[80%]  w-full] mb-5">
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
                disabled={!(selectedOrg && year)}
                className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${
                  reportType == "Organization"
                    ? !(selectedOrg && year)
                      ? "opacity-30 cursor-not-allowed"
                      : ""
                    : !(selectedOrg && year && selectedCorp)
                    ? "opacity-30 cursor-not-allowed"
                    : ""
                }`}
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
          )
        }
       
      </div>
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  );
};

export default Screenend;
