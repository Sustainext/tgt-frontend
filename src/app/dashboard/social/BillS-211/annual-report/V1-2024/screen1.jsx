"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../../Context/page';
import { Oval } from "react-loader-spinner";

const Screenone = ({ nextStep, prevStep,selectedCorp, selectedOrg, year,reportType }) => {
  // State to track selected options
  const { open } = GlobalState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [reportingdescription, setReportingdescription] = useState("");
  const [error, setError] = useState("");
  const [reportingentity, setReportingentit] = useState("");
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

 
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  
  const fetchBillSone = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/annual-report/?screen=1&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );


      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportingdescription(response.data.additional_information_2);
        setReportingentit(response.data.steps_taken_description_1);
        if (response.data.steps_taken_1 == null) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.steps_taken_1);
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
        fetchBillSone();
      }
    }
    else{
      if(selectedOrg&&year&&selectedCorp){
        fetchBillSone();
      }
    }
    setReportingdescription("");
    setReportingentit("");
    setSelectedOptions([])
    
  }, [selectedCorp,selectedOrg,year]);
  
  const handleReportingdescription = (event) => {
    setReportingdescription(event.target.value);
  };
  const handleReportingentity = (event) => {
    setReportingentit(event.target.value);
    setError((prev) => ({ ...prev, reportingentity: "" }));
  };
  // Define your options for the checkboxes
  const optionsTwo = [
    {
      label: "Mapping activities",
      value: "1",
    },
    {
      label: "Mapping supply chains",
      value: "2",
    },
    {
      label:
        "Conducting an internal assessment of risks of forced labour and/or child labour in the organization’s activities and supply chains",
      value: "3",
    },
    {
      label:
        "Contracting an external assessment of risks of forced labour and/or child labour in the organization’s activities and supply chains",
      value: "4",
    },
    {
      label:
        "Developing and implementing an action plan for addressing forced labour and/or child labour",
      value: "5",
    },
    {
      label:
        "Gathering information on worker recruitment and maintaining internal controls to ensure that all workers are recruited voluntarily",
      value: "6",
    },
    {
      label:
        "Addressing practices in the organization’s activities and supply chains that increase the risk of forced labour and/or child labour",
      value: "7",
    },
    {
      label:
        "Developing and implementing due diligence policies and processes for identifying, addressing and prohibiting the use of forced labour and/or child labour in the organization’s activities and supply chains",
      value: "8",
    },
    {
      label:
        "Carrying out a prioritization exercise to focus due diligence efforts on the most severe risks of forced and child labour",
      value: "9",
    },
    {
      label:
        "Requiring suppliers to have in place policies and procedures for identifying and prohibiting the use of forced labour and/or child labour in their activities and supply chains",
      value: "10",
    },
    {
      label:
        "Developing and implementing child protection policies and processes",
      value: "11",
    },
    {
      label:
        "Developing and implementing anti-forced labour and/or -child labour contractual clauses",
      value: "12",
    },
    {
      label:
        "Developing and implementing anti-forced labour and/or -child labour standards, codes of conduct and/or compliance checklists",
      value: "13",
    },

    { label: "Auditing suppliers", value: "14" },
    {
      label: "Monitoring suppliers",
      value: "15",
    },
    {
      label:
        "Enacting measures to provide for, or cooperate in, remediation of forced labour and/or child labour",
      value: "16",
    },
    {
      label: "Developing and implementing grievance mechanisms",
      value: "17",
    },
    {
      label:
        "Developing and implementing training and awareness materials on forced labour and/or child labour",
      value: "18",
    },
    {
      label:
        "Developing and implementing procedures to track performance in addressing forced labour and/or child labour",
      value: "19",
    },
    {
      label:
        "Engaging with supply chain partners on the issue of addressing forced labour and/or child labour",
      value: "20",
    },
    {
      label:
        "Engaging with civil society groups, experts and other stakeholders on the issue of addressing forced labour and/or child labour",
      value: "21",
    },
    {
      label:
        "Engaging directly with workers and families potentially affected by forced labour and/or child labour to assess and address risks",
      value: "22",
    },
    {
      label: "Information not available for this reporting period",
      value: "23",
    },
    { label: "Other, please specify:", value: "other" },
    // Add the rest of your options here
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
    let unewentities;
    if (selectedOptions.includes("Other, please specify:")) {
      unewentities = reportingentity;
    } else {
      unewentities = null;
    }

    try{
      LoaderOpen();

    const sendData = {
      steps_taken_description_1: unewentities,
      additional_information_2: reportingdescription?reportingdescription:null,
      steps_taken_1: selectedOptions,
      organization_id: selectedOrg,
        corporate_id: selectedCorp?selectedCorp:null,
        year: year
    };
    const response= await axiosInstance
    .post(
      `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=1`,
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

    if (selectedOptions.length === 0) {
      newErrors.selectedOptions =
        "Please select at least one sector or industry.";
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
     <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-2 mt-2">
     <form className="xl:w-[78%] lg:w-[78%] 2xl:w-[78%] md:w-[78%] 2k:w-[78%] 4k:w-[78%] w-[99%] container text-left">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2"
                    htmlFor="industryCheckbox"
                  >
                    1. What steps has the entity taken in the previous financial
                    year to prevent and reduce the risk that forced labour or
                    child labour is used at any step of the production of goods
                    in Canada or elsewhere by the entity or of goods imported
                    into Canada by the entity? Select all that apply.*
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
                      <p className="text-red-500 text-[12px] mt-1">{error.selectedOptions}</p>
                    )}
                  </div>
                </div>
                {selectedOptions.includes("Other, please specify:") && (
                  <div className="mb-5 mt-3">
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
                <div className="mb-5 mt-3">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2"
                    htmlFor="industryCheckbox"
                  >
                    2. Please provide additional information describing the
                    steps taken (if applicable).
                  </label>
                  <textarea
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
              <div className="xl:w-[78%]  lg:w-[78%]   2xl:w-[78%]   md:w-[78%]   2k:w-[78%]   4k:w-[78%]  w-full mb-5">
                <div className="float-right mr-3">
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

export default Screenone;