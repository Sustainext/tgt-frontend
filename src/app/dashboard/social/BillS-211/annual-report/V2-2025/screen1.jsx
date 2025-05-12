"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdOutlineModeEditOutline,
  MdClose,
  MdDeleteOutline,
} from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screenone = ({
  nextStep,
  prevStep,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
}) => {
  // State to track selected options
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [reportradio, setReportnradio] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState("");
  const { open } = GlobalState();
  const [loopen, setLoOpen] = useState(false);
  const screenId = 1;
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };



  const fetchBillSsix = async () => {
    LoaderOpen();
    try {
      // or use a dynamic value
        const response = await axiosInstance.get(
          `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/reporting-for-entities/${screenId}/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
        );

      if (response.status === 200) {
        setReportnradio(response.data.data.screen1_q1);
        if (!response.data.data.screen1_q2) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.data.screen1_q2);
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
        fetchBillSsix();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillSsix();
      }
    }

    setSelectedOptions([]);
  }, [selectedCorp, selectedOrg, year]);

  const optionsTwo = [
    {
      label:
        "Producing goods (includes manufacturing, extracting, growing and processing), in Canada",
      value:
        "Producing goods (includes manufacturing, extracting, growing and processing), in Canada",
    },
    {
      label:
        "Producing goods (includes manufacturing, extracting, growing and processing), outside Canada",
      value:
        "Producing goods (includes manufacturing, extracting, growing and processing), outside Canada",
    },

    {
      label: "Importing into Canada goods produced outside Canada",
      value: "Importing into Canada goods produced outside Canada",
    },
    {
      label: "Controlling an entity engaged in producing goods, in Canada",
      value: "Controlling an entity engaged in producing goods, in Canada",
    },
    {
      label: "Controlling an entity engaged in producing goods, outside Canada",
      value: "Controlling an entity engaged in producing goods, outside Canada",
    },
    {
      label:
        "Controlling an entity engaged in importing into Canada goods produced outside Canada",
      value:
        "Controlling an entity engaged in importing into Canada goods produced outside Canada",
    },
  ];

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

  const handleReportnradio = (event) => {
    setReportnradio(event.target.value);
    setError((prev) => ({ ...prev, reportradio: "" }));
  };
  const submitForm = async () => {
    try {
      LoaderOpen();

      const sendData = {
        data:{
          screen1_q1: reportradio,
          screen1_q2: selectedOptions,
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

  return (
    <>
      <div className="mt-2">
        <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-2">
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
              htmlFor="username"
            >
              3. Which of the following accurately describes the entity’s
              structure?*
            </label>
            <div className="relative mb-1">
              <div className="mb-2">
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
                  className="text-[14px] text-gray-700"
                >
                  Corporation
                </label>
                <br />
              </div>
              <div className="mb-2">
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
                <label htmlFor="Trust" className="text-[14px] text-gray-700 ">
                  Trust
                </label>
                <br />
              </div>
              <div className="mb-2">
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
                  className="text-[14px] text-gray-700 "
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
                  checked={reportradio === "Other unincorporated organization"}
                  onChange={handleReportnradio}
                />
                 {" "}
                <label
                  htmlFor="Other unincorporated organization"
                  className="text-[14px] text-gray-700 "
                >
                  Other unincorporated organization
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
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2"
              htmlFor="industryCheckbox"
            >
              2. For entities only: Which of the following sectors or industries
              does the entity operate in? Select all that apply *
            </label>
          </div>
          <div className="mb-2">
            <div className=" gap-1 mb-2">
              {optionsTwo.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <label className="ml-2 text-[14px] text-gray-600">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={handleCheckboxChange}
                      className="mr-3 pt-1 cursor-pointer"
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {error.checkboxes && (
              <div className="text-red-500 ml-1 text-[12px]">
                {error.checkboxes}
              </div>
            )}
          </div>
        </div>
        <div className="xl:w-[78%]  lg:w-[78%]   2xl:w-[78%]   md:w-[78%]   2k:w-[78%]   4k:w-[78%]  w-full mb-5">
          <div className="float-right mr-3">
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

export default Screenone;
