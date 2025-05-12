"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const Screentwo = ({
  nextStep,
  prevStep,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
}) => {
  // State to track selected options
  const { open } = GlobalState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [reportingdescription, setReportingdescription] = useState("");
  const [error, setError] = useState("");
  const [reportingentity, setReportingentit] = useState("");
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
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const fetchBillSone = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      // or use a dynamic value
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/reporting-for-entities/${screenId}/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );

      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportingdescription(response.data.data.screen2_q2);
        if (response.data.data.screen2_q1 == null) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.data.screen2_q1);
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
        fetchBillSone();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillSone();
      }
    }
    setReportingdescription("");

    setSelectedOptions([]);
  }, [selectedCorp, selectedOrg, year]);

  const handleReportingdescription = (value) => {
    setReportingdescription(value);
  };

  const optionsTwo = [
    { label: "Mapping activities", value: "Mapping activities" },
    { label: "Mapping supply chains", value: "Mapping supply chains" },
    {
      label:
        "Conducting an internal assessment of risks of forced labour and/or child labour in the organization's activities and supply chains",
      value:
        "Conducting an internal assessment of risks of forced labour and/or child labour in the organization's activities and supply chains",
    },
    {
      label:
        "Contracting an external assessment of risks of forced labour and/or child labour in the organization's activities and supply chains",
      value:
        "Contracting an external assessment of risks of forced labour and/or child labour in the organization's activities and supply chains",
    },
    {
      label:
        "Developing and implementing an action plan for addressing forced labour and/or child labour",
      value:
        "Developing and implementing an action plan for addressing forced labour and/or child labour",
    },
    {
      label:
        "Gathering information on worker recruitment and maintaining internal controls to ensure that all workers are recruited voluntarily",
      value:
        "Gathering information on worker recruitment and maintaining internal controls to ensure that all workers are recruited voluntarily",
    },
    {
      label:
        "Addressing practices in the organization's activities and supply chains that may cause or contribute to the risk of forced labour and/or child labour",
      value:
        "Addressing practices in the organization's activities and supply chains that may cause or contribute to the risk of forced labour and/or child labour",
    },
    {
      label:
        "Developing and implementing due diligence policies and processes for identifying, addressing and prohibiting the use of forced labour and/or child labour in the organization's activities and supply chains",
      value:
        "Developing and implementing due diligence policies and processes for identifying, addressing and prohibiting the use of forced labour and/or child labour in the organization's activities and supply chains",
    },
    {
      label:
        "Carrying out a prioritization exercise to focus due diligence efforts on the most severe risks of forced and child labour",
      value:
        "Carrying out a prioritization exercise to focus due diligence efforts on the most severe risks of forced and child labour",
    },
    {
      label:
        "Requiring suppliers to have policies and procedures for identifying and prohibiting the use of forced labour and/or child labour in their activities and supply chains",
      value:
        "Requiring suppliers to have policies and procedures for identifying and prohibiting the use of forced labour and/or child labour in their activities and supply chains",
    },
    {
      label:
        "Developing and implementing child protection policies and processes",
      value:
        "Developing and implementing child protection policies and processes",
    },
    {
      label:
        "Developing and implementing anti-forced labour and/or -child labour contractual clauses",
      value:
        "Developing and implementing anti-forced labour and/or -child labour contractual clauses",
    },
    {
      label:
        "Developing and implementing anti-forced labour and/or -child labour standards, codes of conduct and/or compliance checklists",
      value:
        "Developing and implementing anti-forced labour and/or -child labour standards, codes of conduct and/or compliance checklists",
    },
    { label: "Auditing suppliers", value: "Auditing suppliers" },
    { label: "Monitoring suppliers", value: "Monitoring suppliers" },
    {
      label:
        "Enacting measures to provide for, or cooperate in, remediation of forced labour and/or child labour",
      value:
        "Enacting measures to provide for, or cooperate in, remediation of forced labour and/or child labour",
    },
    {
      label:
        "Developing and implementing grievance mechanisms to address complaints in the workplace",
      value:
        "Developing and implementing grievance mechanisms to address complaints in the workplace",
    },
    {
      label:
        "Developing and implementing training and awareness materials on forced labour and/or child labour",
      value:
        "Developing and implementing training and awareness materials on forced labour and/or child labour",
    },
    {
      label:
        "Developing and implementing procedures to track effectiveness in addressing forced labour and/or child labour",
      value:
        "Developing and implementing procedures to track effectiveness in addressing forced labour and/or child labour",
    },
    {
      label:
        "Engaging with supply chain partners on the issue of addressing forced labour and/or child labour",
      value:
        "Engaging with supply chain partners on the issue of addressing forced labour and/or child labour",
    },
    {
      label:
        "Engaging with civil society groups, experts and other stakeholders on the issue of addressing forced labour and/or child labour",
      value:
        "Engaging with civil society groups, experts and other stakeholders on the issue of addressing forced labour and/or child labour",
    },
    {
      label:
        "Engaging directly with workers and families potentially affected by forced labour and/or child labour to assess and address risks",
      value:
        "Engaging directly with workers and families potentially affected by forced labour and/or child labour to assess and address risks",
    },
    {
      label: "Information not available for this reporting period",
      value: "Information not available for this reporting period",
    },
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedOptions([...selectedOptions, value]); // Add to selected options
      setError((prev) => ({ ...prev, selectedOptions: "" }));
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value)); // Remove from selected options
    }
  };

  // Function to proceed to the next step, includes validation

  const submitForm = async () => {
    try {
      LoaderOpen();

      const sendData = {
        data: {
          screen2_q2: reportingdescription ? reportingdescription : null,
          screen2_q1: selectedOptions,
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
    }
  };

  const continueToNextStep = () => {
    let newErrors = {};

    if (selectedOptions.length === 0) {
      newErrors.selectedOptions =
        "Please select at least one sector or industry.";
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
        <form className="xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[99%] container text-left">
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2"
              htmlFor="industryCheckbox"
            >
              3. What steps has the entity taken in the previous financial year
              to prevent and reduce the risk that forced labour or child labour
              is used at any step of the production of goods in Canada or
              elsewhere by the entity or of goods imported into Canada by the
              entity? Select all that apply..*
            </label>
          </div>
          <div className="mb-2">
            <div className="gap-2">
              {optionsTwo.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <label className="ml-2 text-[14px] text-gray-600">
                    <input
                      type="checkbox"
                      value={option.label}
                      checked={selectedOptions.includes(option.label)}
                      onChange={handleCheckboxChange}
                      className="mr-3 pt-1"
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <div className="my-1">
              {error.selectedOptions && (
                <p className="text-red-500 text-[12px] mt-1">
                  {error.selectedOptions}
                </p>
              )}
            </div>
          </div>

          <div className="mb-5 mt-3">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2"
              htmlFor="industryCheckbox"
            >
              4. Please provide additional information describing the steps
              taken (if applicable)
            </label>
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
              className={`${
                open ? "w-full" : "w-full"
              }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
              value={reportingdescription}
              maxLength="1500"
              // value={formData.countriesOfOperation}
              // onChange={handleInputChange}
              rows={5}
              onChange={handleReportingdescription} 
            /> */}
            {/* <div className="my-1">
                    {error.reportingdescription && (
                      <p className="text-red-500">
                        {error.reportingdescription}
                      </p>
                    )}
                  </div> */}
          </div>
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

export default Screentwo;
