"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';
import { Oval } from "react-loader-spinner";

const Screenfive = ({ nextStep, prevStep,selectedCorp, selectedOrg, year,reportType }) => {

 const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdescription, setReportingdescription] = useState("");
  const [reportingentity, setReportingentit] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
  
  const fetchBillSfive = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/annual-report/?screen=5&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );

      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportnradio(response.data.measures_remediate_activaties_11);
        setReportingdescription(
          response.data.remediation_measures_12
        );
        setReportingentit(response.data.remediation_measures_taken_description_11_1);
        if (response.data.remediation_measures_taken_11_1 == null) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.remediation_measures_taken_11_1);
        }
        LoaderClose();
      }
      else{
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
    }catch (error) {
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
    if(reportType=="Organization"){
      if(selectedOrg&&year){
        fetchBillSfive();
      }
    }
    else{
      if(selectedOrg&&year&&selectedCorp){
        fetchBillSfive();
      }
    }
    setReportnradio("");
    setReportingdescription(
      ""
    );
    setReportingentit("");
    setSelectedOptions([])
    
  }, [selectedCorp,selectedOrg,year]);
  
  const options = [
    {
      label:
        "Actions to support victims of forced labour or child labour and/or their families, such as workforce reintegration and psychosocial support",
      value: "1",
    },
    {
      label:
        "Compensation for victims of forced labour or child labour and/or their families",
      value: "2",
    },
    {
      label:
        "Actions to prevent forced labour or child labour and associated harms from reoccurring",
      value: "3",
    },
    { label: "Grievance mechanisms", value: "4" },
    { label: "Formal apologies", value: "5" },
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
    if (selectedOptions.includes("Other, please specify:")) {
      unewentities = reportingentity;
    } else {
      unewentities = null;
    }

    try{
      LoaderOpen();

      const sendData = {
        measures_remediate_activaties_11: reportradio,
        remediation_measures_taken_11_1: selectedOptions,
        remediation_measures_taken_description_11_1: unewentities,
        remediation_measures_12: reportingdescription?reportingdescription:null,
        organization_id: selectedOrg,
        corporate_id: selectedCorp?selectedCorp:null,
        year: year
      };
      const response= await axiosInstance
      .post(
        `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=5`,
        sendData,
        axiosConfig
      )
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
    }catch (error) {
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
    if(reportradio === "Yes" || reportradio === "Yesone"){
      if (selectedOptions.length === 0) {
        newErrors.checkboxes = "Please select at least one option";
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
  
  
  return (
    <>
     
    <div className="mx-4 mt-2">
    <form className="w-[80%] text-left">
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                      htmlFor="username"
                    >
                      11. Has the entity taken any measures to remediate any
                      forced labour or child labour in its activities and supply
                      chains?*
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
                          htmlFor="Yes"
                          className="text-[14px] text-gray-700"
                        >
                          Yes, we have taken remediation measures and will
                          continue to identify and address any gaps in our
                          response.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Yesone"
                          name="radio"
                          value="Yesone"
                          checked={reportradio === "Yesone"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Yesone"
                          className="text-[14px] text-gray-700"
                        >
                          Yes, we have taken some remediation measures, but
                          there are gaps in our response that still need to be
                          addressed.
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
                          htmlFor="No"
                          className="text-[14px] text-gray-700 "
                        >
                          No, we have not taken any remediation measures.
                        </label>
                        <br />
                      </div>
                      <div className="mb-3">
                         {" "}
                        <input
                          type="radio"
                          id="Noone"
                          name="radio"
                          value="Noone"
                          checked={reportradio === "Noone"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Noone"
                          className="text-[14px] text-gray-700 "
                        >
                          Not applicable, we have not identified any forced
                          labour or child labour in our activities and supply
                          chains.
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500 ml-1 text-[12px] mt-1">{error.reportradio}</p>
                    )}
                  </div>
                  {(reportradio === "Yes" || reportradio === "Yesone") && (
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                      htmlFor="username"
                    >
                      11.1 If yes, which remediation measures has the entity
                      taken? Select all that apply.*
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
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
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
                      12. Please provide additional information on any measures
                      the entity has taken to remediate any forced labour or
                      child labour (if applicable) (1,500 character limit).
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
                      disabled={!(selectedOrg && year)}
                      className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${
                        reportType=="Organization"? !(selectedOrg && year) ? "opacity-30 cursor-not-allowed" : "" : !(selectedOrg && year && selectedCorp) ? "opacity-30 cursor-not-allowed" : ""
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

export default Screenfive;