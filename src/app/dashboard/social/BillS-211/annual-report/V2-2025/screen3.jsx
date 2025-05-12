"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screenthree = ({
  nextStep,
  prevStep,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
}) => {
  const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdescription, setReportingdescription] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const screenId = 3;
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };



  const fetchBillSthree = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      // or use a dynamic value
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/reporting-for-entities/${screenId}/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );
      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportnradio(response.data.data.screen3_q1);
        if (response.data.data.screen3_q2 == null) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.data.screen3_q2);
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
        fetchBillSthree();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillSthree();
      }
    }
    setReportnradio("");
    setSelectedOptions([]);
  }, [selectedCorp, selectedOrg, year]);
  const options = [
    {
      label:
        "Embedding responsible business conduct into policies and management systems",
      value: "Embedding responsible business conduct into policies and management systems",
    },
    {
      label:
        "Identifying and assessing potential and actual adverse impacts in operations, supply chains and business relationships",
      value: "Identifying and assessing potential and actual adverse impacts in operations, supply chains and business relationships",
    },
    {
      label: "Ceasing, preventing or mitigating potential and actual adverse impacts",
      value: "Ceasing, preventing or mitigating potential and actual adverse impacts",
    },
    { label: "Tracking implementation and results", value: "Tracking implementation and results" },
    { label: "Communicating how impacts are addressed", value: "Communicating how impacts are addressed" },
    {
      label: "Providing for or cooperating in remediation when appropriate",
      value: "Providing for or cooperating in remediation when appropriate",
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

  const handleReportnradio = (event) => {
    setReportnradio(event.target.value);
    setError((prev) => ({ ...prev, reportradio: "" }));
  };

  const submitForm = async () => {
    let unewentities;
    if (reportradio === "No") {
      unewentities = [];
    } else {
      unewentities = selectedOptions;
    }
    try {
      LoaderOpen();

      const sendData = {
        data:{
          screen3_q1: reportradio,
          screen3_q2: unewentities,
        },
        organization: selectedOrg,
        corporate: selectedCorp,
        year: year,
        status:"completed",
      };
      const response= await axiosInstance.put(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/reporting-for-entities/${screenId}/`,
        sendData
      )
      if (response.status == "200") {
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
        nextStep();
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

    if (Object.keys(newErrors).length === 0) {
      setError({});
      submitForm();
    } else {
      setError(newErrors);
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
              5. Does the entity currently have policies and/or due diligence
              processes in place related to forced labour and/or child labour?*
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
                <label htmlFor="Yes" className="text-[14px] text-gray-700">
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
                5.1 If yes, which elements of the policies and/or due diligence
                process has the entity implemented in relation to forced labour
                and/or child labour? Select all that apply.*
              </label>
              <div>
                {options.map((option, index) => (
                  <div key={index} className="mb-2 ml-2">
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
                  <div className="text-red-500 ml-1 text-[12px] mt-1">
                    {error.checkboxes}
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
        <div className="xl:w-[80%]  lg:w-[80%]   2xl:w-[80%]   md:w-[80%]   2k:w-[80%]   4k:w-[80%]  w-full mb-5">
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
              Next &gt;
            </button>
          </div>
        </div>
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

export default Screenthree;
