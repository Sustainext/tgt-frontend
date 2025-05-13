"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screenseven = ({
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
  const [reportradioone, setReportnradioone] = useState("");
  const [reportradiotwo, setReportnradiotwo] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const screenId = 7;

  const fetchBillSseven = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      // or use a dynamic value
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/reporting-for-entities/${screenId}/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );

      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportnradiotwo(response.data.data.screen7_q1);
        setReportnradio(response.data.data.screen7_q2);
        setReportnradioone(response.data.data.screen7_q3);

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
        fetchBillSseven();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillSseven();
      }
    }
    setReportnradiotwo("");
    setReportnradio("");
    setReportnradioone("");
  }, [selectedCorp, selectedOrg, year]);

  const handleReportnradio = (event) => {
    setReportnradio(event.target.value);
    setError((prev) => ({ ...prev, reportradio: "" }));
  };
  const handleReportnradioone = (event) => {
    setReportnradioone(event.target.value);
    setError((prev) => ({ ...prev, reportradioone: "" }));
  };

  const handleReportnradiotwo = (event) => {
    setReportnradiotwo(event.target.value);
    setError((prev) => ({ ...prev, reportradiotwo: "" }));
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const stepsubmitForm = async () => {
    const stepscreenId = 8;
    try {
      const sendData = {
        data: {},

        organization: selectedOrg,
        corporate: selectedCorp,
        year: year,
        status: "in_progress",
      };
      const response = await axiosInstance.put(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/reporting-for-entities/${stepscreenId}/`,
        sendData
      );
      if (response.status == "200") {
        console.log("API call susfully:");
        nextStep();
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const submitForm = async () => {
    let unewentities;
    if (reportradio === "No") {
      unewentities = null;
    } else {
      unewentities = reportradioone;
    }

    try {
      LoaderOpen();

      const sendData = {
        data: {
          screen7_q1: reportradiotwo,
          screen7_q2: reportradio,
          screen7_q3: unewentities,
        },
        organization: selectedOrg,
        corporate: selectedCorp,
        year: year,
        status: "completed",
      };
      const response = await axiosInstance.put(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/reporting-for-entities/${screenId}/`,
        sendData
      );
      if (response.status == "200") {
        console.log(response.status);
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
        stepsubmitForm();
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
    if (!reportradiotwo) {
      newErrors.reportradiotwo = "This field is required. Please fill it out.";
    }
    if (!reportradio) {
      newErrors.reportradio = "This field is required. Please fill it out.";
    }
    if (reportradio === "Yes") {
      if (!reportradioone) {
        newErrors.reportradioone =
          "This field is required. Please fill it out.";
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
        <div className="h-[36rem] overflow-y-auto scrollable-content">
          <form className="xl:w-[80%] lg:w-[80%] 2xl:w-[80%] md:w-[80%] 2k:w-[80%] 4k:w-[80%] w-[99%] text-left">
            <div className="mb-5">
              <label
                className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                html
                htmlFor="username"
              >
                10. Has the entity taken any measures to remediate the loss of
                income to the most vulnerable individuals and families that
                results from measures taken to eliminate the use of forced
                labour or child labour in its activities and supply chains? *
              </label>
              <div className="relative mb-1">
                <div className="mb-3">
                   {" "}
                  <input
                    type="radio"
                    id="Yes1"
                    name="radio2"
                    value="Yes"
                    checked={reportradiotwo === "Yes"}
                    onChange={handleReportnradiotwo}
                  />
                   {" "}
                  <label
                    html
                    htmlFor="Yes1"
                    className="text-[14px] text-gray-700"
                  >
                    Yes, we have taken measures
                  </label>
                  <br />
                </div>

                <div className="mb-3">
                   {" "}
                  <input
                    type="radio"
                    id="No1"
                    name="radio2"
                    value="No"
                    checked={reportradiotwo === "No"}
                    onChange={handleReportnradiotwo}
                  />
                   {" "}
                  <label
                    html
                    htmlFor="No1"
                    className="text-[14px] text-gray-700 "
                  >
                    No, we have not taken measures
                  </label>
                  <br />
                </div>
                <div className="mb-3">
                   {" "}
                  <input
                    type="radio"
                    id="Not applicable"
                    name="radio2"
                    value="Not applicable"
                    checked={reportradiotwo === "Not applicable"}
                    onChange={handleReportnradiotwo}
                  />
                   {" "}
                  <label
                    html
                    htmlFor="Not applicable"
                    className="text-[14px] text-gray-700 "
                  >
                    Not applicable, we have not identified any loss of income to
                    vulnerable families resulting from measures taken to
                    eliminate the use of forced labour or child labour in our
                    activities and supply chains.
                  </label>
                  <br />
                </div>
              </div>
              {error.reportradiotwo && (
                <p className="text-red-500 ml-1 text-[12px] mt-1">
                  {error.reportradiotwo}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                html
                htmlFor="username"
              >
                11. Does the entity currently provide training to employees on
                forced labour and/or child labour? *
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
                  <label
                    html
                    htmlFor="Yes"
                    className="text-[14px] text-gray-700"
                  >
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
                  <label
                    html
                    htmlFor="No"
                    className="text-[14px] text-gray-700 "
                  >
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
                  html
                  htmlFor="username"
                >
                  11.1 If yes, is the training mandatory? *
                </label>
                <div className="relative mb-1">
                  <div className="mb-3">
                     {" "}
                    <input
                      type="radio"
                      id="Yesne"
                      name="radioone"
                      value="Yes"
                      checked={reportradioone === "Yes"}
                      onChange={handleReportnradioone}
                    />
                     {" "}
                    <label
                      html
                      htmlFor="Yesne"
                      className="text-[14px] text-gray-700"
                    >
                      Yes, the training is mandatory for all employees.
                    </label>
                    <br />
                  </div>
                  <div className="mb-3">
                     {" "}
                    <input
                      type="radio"
                      id="Yesone"
                      name="radioone"
                      value="Yesone"
                      checked={reportradioone === "Yesone"}
                      onChange={handleReportnradioone}
                    />
                     {" "}
                    <label
                      html
                      htmlFor="Yesone"
                      className="text-[14px] text-gray-700"
                    >
                      Yes, the training is mandatory for employees making
                      contracting or purchasing decisions.
                    </label>
                    <br />
                  </div>
                  <div className="mb-3">
                     {" "}
                    <input
                      type="radio"
                      id="Yestwo"
                      name="radioone"
                      value="Yestwo"
                      checked={reportradioone === "Yestwo"}
                      onChange={handleReportnradioone}
                    />
                     {" "}
                    <label
                      html
                      htmlFor="Yestwo"
                      className="text-[14px] text-gray-700 "
                    >
                      Yes, the training is mandatory for some employees.
                    </label>
                    <br />
                  </div>
                  <div className="mb-3">
                     {" "}
                    <input
                      type="radio"
                      id="Noen"
                      name="radioone"
                      value="No"
                      checked={reportradioone === "No"}
                      onChange={handleReportnradioone}
                    />
                     {" "}
                    <label
                      html
                      htmlFor="Noen"
                      className="text-[14px] text-gray-700 "
                    >
                      No, the training is voluntary.
                    </label>
                    <br />
                  </div>
                </div>
                {error.reportradioone && (
                  <p className="text-red-500 ml-1 text-[12px] mt-1">
                    {error.reportradioone}
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
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

export default Screenseven;
