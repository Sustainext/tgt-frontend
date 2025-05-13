"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const Screentwo = ({
  nextStep,
  prevStep,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
}) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [reportradio, setReportnradio] = useState("");
  const [reportingdate, setReportingdate] = useState("");
  const [reportingdescription, setReportingdescription] = useState("");
  const [reportingbusinessnumber, setReportingbusinessnumber] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const screenId = 2;
  const config = {
    enter: "BR", // Or customize behavior on Enter key
    cleanHTML: true,
    enablePasteHTMLFilter: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color: "#667085",
    },
    allowResizeY: false,
    defaultActionOnPaste: "insert_clear_html",
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "align",
      "outdent",
      "indent",
      "ul",
      "ol",
      "paragraph",
      "link",
      "table",
      "undo",
      "redo",
      "hr",
      "fontsize",
      "selectall",
    ],
    // Remove buttons from the extra buttons list
    removeButtons: [
      "fullsize",
      "preview",
      "source",
      "print",
      "about",
      "find",
      "changeMode",
      "paintFormat",
      "image",
      "brush",
      "font",
    ],
  };

  const fetchBillStwo = async () => {
    LoaderOpen();

    try {
      // or use a dynamic value
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/submission-information/${screenId}/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );

      if (response.status === 200) {
        setReportnradio(response.data.data.screen2_q1);
        setReportingdate(response.data.data.screen2_q2);
        setReportingdescription(response.data.data.screen2_q3);
        setReportingbusinessnumber(response.data.data.screen2_q4);
        LoaderClose();
      } else if (response.status == 404) {
        setReportnradio("");
        setReportingdate("");
        setReportingdescription("");
        setReportingbusinessnumber("");
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
        fetchBillStwo();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillStwo();
      }
    }
    setReportnradio("");
    setReportingdate("");
    setReportingdescription("");
  }, [selectedCorp, selectedOrg, year]);

  const handleReportnradio = (event) => {
    const value = event.target.value;
    setReportnradio(value);
    setError((prev) => ({
      ...prev,
      reportradio: value ? "" : prev.reportradio,
    }));
  };

  const handleReportndate = (event) => {
    const value = event.target.value;
    setReportingdate(value);
    setError((prev) => ({
      ...prev,
      reportingdate: value ? "" : prev.reportingdate,
    }));
  };

  const handleReportingdescription = (value) => {
    // const value = event.target.value;
    setReportingdescription(value);
    setError((prev) => ({
      ...prev,
      reportingdescription: value ? "" : prev.reportingdescription,
    }));
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleReportnbusinessnumber = (event) => {
    setReportingbusinessnumber(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (["+", "-", "."].includes(event.key)) {
      event.preventDefault();
    }
  };

  const stepsubmitForm = async () => {
    const stepscreenId = 3;
    try {
      const sendData = {
        data: {},

        organization: selectedOrg,
        corporate: selectedCorp,
        year: year,
        status: "in_progress",
      };
      const response = await axiosInstance.put(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/submission-information/${stepscreenId}/`,
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
    let newentities;
    let oherinpute;
    if (reportradio === "No") {
      newentities = null;
      oherinpute = null;
    } else {
      newentities = reportingdate;
      oherinpute = reportingdescription;
    }
    try {
      LoaderOpen();

      const sendData = {
        data: {
          screen2_q1: reportradio,
          screen2_q2: newentities,
          screen2_q3: oherinpute,
          screen2_q4: reportingbusinessnumber,
        },

        organization: selectedOrg,
        corporate: selectedCorp,
        year: year,
        status: "completed",
      };
      const response = await axiosInstance.put(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/submission-information/${screenId}/`,
        sendData
      );
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

  return (
    <>
      <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-0 mt-2">
        <form className="w-full text-left">
          <div className="h-[32rem] overflow-y-auto scrollable-content">
            <div className="mb-5">
              <label
                className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                htmlFor="username"
              >
                5. Is this a revised version of a report already submitted this
                reporting year?*
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
                    checked={reportradio === "No"}
                    onChange={handleReportnradio}
                  />
                   {" "}
                  <label htmlFor="No" className="text-[15px] text-gray-700 ">
                    No
                  </label>
                  <br />
                </div>
              </div>
              {error.reportradio && (
                <p className="text-red-500 ml-1 text-[12px]">
                  {error.reportradio}
                </p>
              )}
            </div>
            {reportradio === "Yes" && (
              <>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                    htmlFor="username"
                  >
                    5.1 If yes, on what date was the original report submitted?*
                  </label>
                  <div className="relative mb-1">
                    <input
                      type="date"
                      value={reportingdate}
                      onChange={handleReportndate}
                      className="xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[99%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer "
                    />
                  </div>
                  {error.reportingdate && (
                    <p className="text-red-500 ml-1 text-[12px]">
                      {error.reportingdate}
                    </p>
                  )}
                </div>
                <div className="mb-5 w-[78%]">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1 w-[78%]"
                    htmlFor="username"
                  >
                    5.2 Describe the changes made to the original submission,
                    including the sections of the original report that were
                    revised or any changes made to questionnaire responses *
                  </label>
                  <div className="relative">
                    <JoditEditor
                      // ref={editor}
                      value={reportingdescription}
                      config={config}
                      tabIndex={1}
                      onBlur={handleReportingdescription}
                    />
                    {/* <textarea
                          id="countriesOfOperation"
                          name="countriesOfOperation"
                          placeholder="Enter a description..."
                          className="xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[99%] border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer "
                          value={reportingdescription}
                          maxlength={3000}
                          // value={formData.countriesOfOperation}
                          // onChange={handleInputChange}
                          rows={5}
                          onChange={handleReportingdescription} // Specify the number of rows to determine the initial height
                        /> */}
                  </div>
                  {error.reportingdescription && (
                    <p className="text-red-500 ml-1 text-[12px]">
                      {error.reportingdescription}
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="mb-5">
              <label
                className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                htmlFor="username"
              >
                6. For entities only: Business number(s) (if applicable):
              </label>
              <div className="relative mb-1 flex">
                <input
                  type="number"
                  placeholder="Enter number"
                  className={`${
                    open
                      ? "xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[99%]"
                      : "xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[99%]"
                  } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                  value={reportingbusinessnumber}
                  onChange={handleReportnbusinessnumber}
                  onKeyDown={handleKeyDown}
                ></input>
              </div>
            </div>
          </div>
          <div className="xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%]  w-full mb-5">
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
        </form>
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

export default Screentwo;
