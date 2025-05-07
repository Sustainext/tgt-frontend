"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose,MdDeleteOutline   } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";


const Screenfour = ({ nextStep, prevStep,selectedCorp,selectedOrg,year,reportType }) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [reportradio, setReportnradio] = useState("");
  const [reportingentity, setReportingentit] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loopen, setLoOpen] = useState(false);
  

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
 
  const fetchBillSfour = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/identifying-information/?screen=4&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );

      if (response.status === 200) {
        setReportnradio(response.data.subject_to_supply_chain_legislation_7);
        setReportingentit(response.data.other_laws_description_7_1);
        if (response.data.applicable_laws_7_1 == null) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.applicable_laws_7_1);
        }
        LoaderClose();
      }
      else if(response.status==404){
        setReportnradio("");
        setReportingentit("");
        setSelectedOptions([]);
        LoaderClose();
      }
      else{
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
    }
    finally {
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
        fetchBillSfour();
      }
    }
    else{
      if(selectedOrg&&year&&selectedCorp){
        fetchBillSfour();
      }
    }
    setReportnradio("");
    setReportingentit("");
    setSelectedOptions([]);
    
  }, [selectedCorp,selectedOrg,year]);
  const options = [
    {
      label: "The United Kingdom's Modern Slavery Act 2015",
      value: "The United Kingdom's Modern Slavery Act 2015",
    },
    {
      label: "Australia's Modern Slavery Act 2018",
      value: "Australia's Modern Slavery Act 2018",
    },
    {
      label: "California's Transparency in Supply Chains Act",
      value: "California's Transparency in Supply Chains Act",
    },
    {
      label: "Germany's Act on Corporate Due Diligence Obligations in Supply Chains",
      value: "Germany's Act on Corporate Due Diligence Obligations in Supply Chains",
    },
    {
      label: "France's Duty of Vigilance Act",
      value: "France's Duty of Vigilance Act",
    },
    {
      label: "Norway's Transparency Act",
      value: "Norway's Transparency Act",
    },
    { label: "Other, please specify:", value: "other" },
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

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
 
  const submitForm = async () => {
    let unewentities;
    let uoherinpute;
    if (reportradio === "No") {
      unewentities = [];
      uoherinpute = null;
    } else {
      unewentities = selectedOptions;
      uoherinpute = reportingentity;
    }

    if (selectedOptions.includes("other")) {
      uoherinpute = reportingentity;
    } else {
      uoherinpute = null;
    }

    try{
      LoaderOpen();

      const send = {
        subject_to_supply_chain_legislation_7: reportradio,
        other_laws_description_7_1: uoherinpute,
        applicable_laws_7_1: unewentities,
        organization_id: selectedOrg,
          corporate_id: selectedCorp?selectedCorp:null,
          year: year
      };
     const response= await axiosInstance
        .post(
          `${process.env.BACKEND_API_URL}/canadabills211/identifying-information/?screen=4`,
          send,
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
    }catch (error) {
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
      if (selectedOptions.length === 0) {
        newErrors.checkboxes = "Please select at least one option.";
      }
    }
    if (selectedOptions.includes("other")) {
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
      <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-0 mt-2">
      <form className="w-full text-left">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                    htmlFor="username"
                  >
                    8. For entities only: Is the entity also subject to reporting requirements under supply chain legislation in another jurisdiction? *
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
                  <div>
                    <div className="mb-5">
                      <label
                        className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                        htmlFor="username"
                      >
                        8.1 If yes, select the applicable law(s). Select all that apply*
                      </label>
                      <div>
                        {options.map((option, index) => (
                          <div key={index} className="mb-3 ml-2">
                            <label className="text-[14px] text-gray-600">
                              <input
                                type="checkbox"
                                value={option.value}
                                checked={selectedOptions.includes(option.value)}
                                onChange={handleCheckboxChange}
                                className="mr-3 custom-checkbox"
                              />
                              {option.label}
                            </label>
                          </div>
                        ))}
                        {error.checkboxes && (
                          <div className="text-red-500 ml-1 text-[12px]">
                            {error.checkboxes}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      {selectedOptions.includes("other") && (
                        <div className="mb-5">
                          <input
                            type="text"
                            placeholder="Enter a description..."
                            className={`${
                              open ? "xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[98%]" : "xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[98%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                            value={reportingentity}
                            onChange={handleReportingentity}
                          ></input>
                          {error.reportingentity && (
                            <div className="text-red-500 ml-1 text-[12px]">
                              {error.reportingentity}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

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
                      disabled={!(selectedOrg&&year)}
                      className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${
                        reportType=="Organization"? !(selectedOrg && year) ? "opacity-30 cursor-not-allowed" : "" : !(selectedOrg && year && selectedCorp) ? "opacity-30 cursor-not-allowed" : ""
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

export default Screenfour;