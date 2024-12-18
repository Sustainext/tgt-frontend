"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';
import { Oval } from "react-loader-spinner";

const Screenthree = ({ nextStep, prevStep,selectedCorp, selectedOrg, year,reportType }) => {

  const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdescription, setReportingdescription] = useState("");
  const [loopen, setLoOpen] = useState(false);
  
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

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

 
  const fetchBillSthree = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/annual-report/?screen=3&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );

      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportnradio(response.data.policies_in_place_6);
        setReportingdescription(response.data.additional_info_policies_7);
        if (response.data.elements_implemented_6_1 == null) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.elements_implemented_6_1);
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
    if(reportType=="Organization"){
      if(selectedOrg&&year){
        fetchBillSthree();
      }
    }
    else{
      if(selectedOrg&&year&&selectedCorp){
        fetchBillSthree();
      }
    }
    setReportnradio("");
    setReportingdescription("");
    setSelectedOptions([])

    
  }, [selectedCorp,selectedOrg,year]);
  const options = [
    {
      label:
        "Embedding responsible business conduct into policies and management systems",
      value: "1",
    },
    {
      label:
        "Identifying and assessing adverse impacts in operations, supply chains and business relationships",
      value: "2",
    },
    {
      label: "Ceasing, preventing or mitigating adverse impacts",
      value: "3",
    },
    { label: "Tracking implementation and results", value: "4" },
    { label: "Communicating how impacts are addressed", value: "5" },
    {
      label: "Providing for or cooperating in remediation when appropriate",
      value: "6",
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

  const handleReportingdescription = (event) => {
    setReportingdescription(event.target.value);
   
  };

  
  const submitForm = async () => {
    let unewentities;
    if (reportradio === "No") {
      unewentities = [];
    } else {
      unewentities = selectedOptions;
    }
    try{
      LoaderOpen();

      const sendData = {
        policies_in_place_6: reportradio,
        elements_implemented_6_1: unewentities,
        additional_info_policies_7: reportingdescription?reportingdescription:null,
        organization_id: selectedOrg,
        corporate_id: selectedCorp?selectedCorp:null,
        year: year
      };
      const response= await axiosInstance
    .post(
      `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=3`,
      sendData,
      axiosConfig
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
    }
    catch (error) {
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
     
      <div className="mx-4 mt-2">
      <form className="w-[80%] text-left">
                  <div className="mb-5">
                    <label
                      className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                      htmlFor="username"
                    >
                      6.Does the entity currently have policies and due
                      diligence processes in place related to forced labour
                      and/or child labour?*
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
                        <label
                          htmlFor="Yes"
                          className="text-[14px] text-gray-700"
                        >
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
                        <label
                          htmlFor="No"
                          className="text-[14px] text-gray-700 "
                        >
                          No
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500 ml-1 text-[12px] mt-1">{error.reportradio}</p>
                    )}
                  </div>

                  {reportradio === "Yes" && (
                    <div className="mb-5">
                      <label
                        className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                        htmlFor="username"
                      >
                        6.1 If yes, which of the following elements of the due
                        diligence process has the entity implemented in relation
                        to forced labour and/or child labour? Select all that
                        apply.*
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
                  <div className="mb-5 mt-3">
                    <label
                      className="block text-gray-700 text-[14px] font-[500] mb-2"
                      html
                      htmlFor="industryCheckbox"
                    >
                      7. Please provide additional information on the entity’s
                      policies and due diligence processes in relation to forced
                      labour and child labour (if applicable) (1,500 character
                      limit).
                    </label>
                    <textarea
                      id="countriesOfOperation"
                      name="countriesOfOperation"
                      placeholder="Enter a description..."
                      className={`${
                        open ? "w-full" : "w-full"
                      }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
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

export default Screenthree;