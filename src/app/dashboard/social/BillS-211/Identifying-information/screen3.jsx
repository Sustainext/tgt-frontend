"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose,MdDelete   } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';
import { Oval } from "react-loader-spinner";


const Screenthree = ({ nextStep, prevStep,selectedCorp,selectedOrg,year }) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [reportradiojoint, setReportnradiojoint] = useState("");
  const [reportingbusinessnumber, setReportingbusinessnumber] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [entities, setEntities] = useState([
    { legalName: "", businessNumber: "" },
  ]);


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
    LoaderOpen(); 

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/identifying-information/?screen=3&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );
      if (response.status === 200) {
        setReportingbusinessnumber(response.data.business_number_5);
        setReportnradiojoint(response.data.is_joint_report_6);
        if (!response.data.legal_name_and_business_numbers_6_1_2) {
          setEntities([{ legalName: "", businessNumber: "" }]);
        } else {
          setEntities(response.data.legal_name_and_business_numbers_6_1_2);
        }

        LoaderClose();
      }
      else if(response.status==404){
        setReportingbusinessnumber("");
        setReportnradiojoint("");
        setEntities([{ legalName: "", businessNumber: "" }]);
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
    if(selectedOrg&&year){
      fetchBillSthree();
    }
    setReportingbusinessnumber("");
    setReportnradiojoint("");
    setEntities([{ legalName: "", businessNumber: "" }]);
    
  }, [selectedCorp,selectedOrg,year]);

 
  // const handleReportnradio = (event) => {
  //   setReportnradiojoint(event.target.value);
    
  // };
  // const handleReportnbusinessnumber = (event) => {
  //   setReportingbusinessnumber(event.target.value);
   
  // };

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  

  // const handleInputChange = (index, type, value) => {
  //   const newEntities = [...entities];
  //   newEntities[index][type] = value;
  //   // Also reset the corresponding error
  //   setError((prevErrors) => ({ ...prevErrors, [`${type}${index}`]: "" }));

  //   setEntities(newEntities);
  // };

  // const handleAddEntity = () => {
  //   setEntities([...entities, { legalName: "", businessNumber: "" }]);
  // };

  // const handleRemoveEntity = (index) => {
  //   const newEntities = [...entities];
  //   newEntities.splice(index, 1);
  //   setEntities(newEntities);
  //   // Remove errors related to the entity
  //   setError((prevErrors) => {
  //     const newErrors = { ...prevErrors };
  //     delete newErrors[`legalName${index}`];
  //     delete newErrors[`businessNumber${index}`];
  //     return newErrors;
  //   });
  // };
 
 
  const handleInputChange = (index, type, value) => {
    const newEntities = [...entities];
    newEntities[index][type] = value;
    setEntities(newEntities);
    setError((prevErrors) => ({ ...prevErrors, [`${type}${index}`]: "" }));
  };

  const handleAddEntity = () => {
    setEntities([...entities, { legalName: "", businessNumber: "" }]);
  };

  const handleRemoveEntity = (index) => {
    const newEntities = entities.filter((_, i) => i !== index);
    setEntities(newEntities);
  };

  const handleReportnradio = (event) =>{ setReportnradiojoint(event.target.value);
    setError((prev) => ({ ...prev, reportradiojoint: "" }));
  }

  const handleReportnbusinessnumber = (event) =>
    setReportingbusinessnumber(event.target.value);

  const handleKeyDown = (event) => {
    if (["+", "-", "."].includes(event.key)) {
      event.preventDefault();
    }
  };

  const submitForm = async () => {

    try{
      LoaderOpen();

      const sendData = {
        legal_name_and_business_numbers_6_1_2: entities,
        is_joint_report_6: reportradiojoint,
        business_number_5: reportingbusinessnumber,
        organization_id: selectedOrg,
        corporate_id: selectedCorp?selectedCorp:null,
        year: year
      };
     const response= await axiosInstance
        .post(
          `${process.env.BACKEND_API_URL}/canadabills211/identifying-information/?screen=3`,
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

    if (!reportradiojoint) {
      newErrors.reportradiojoint = "This field is required. Please fill it out.";
    }

    if (reportradiojoint === "Yes") {
      entities.forEach((entity, index) => {
        if (!entity.legalName.trim()) {
          newErrors[`legalName${index}`] = "Legal name is required";
        }

      });
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
      <form className="w-full text-left">
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                    htmlFor="username"
                  >
                    5.Business number(s) (if applicable):
                  </label>
                  <div className="relative mb-1 flex">
                    <input
                      type="number"
                      placeholder="Enter number"
                      className={`${
                        open ? "w-[78%]" : "w-[78%]"
                      } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                      value={reportingbusinessnumber}
                      onChange={handleReportnbusinessnumber}
                      onKeyDown={handleKeyDown}
                    ></input>
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                    htmlFor="username"
                  >
                    6.Is this a joint report?*
                  </label>
                  <div className="relative mb-1 flex">
                    <div>
                       {" "}
                      <input
                        type="radio"
                        id="Yes"
                        name="radio"
                        value="Yes"
                        checked={reportradiojoint === "Yes"}
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
                        checked={reportradiojoint === "No"}
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
                  {error.reportradiojoint && (
                    <p className="text-red-500 ml-1 text-[12px]">
                      {error.reportradiojoint}
                    </p>
                  )}
                </div>
                {reportradiojoint === "Yes" && (
                  <div>
                    <div>
                      <label
                        className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                        htmlFor="username"
                      >
                        6.1 & 6.2. If yes, identify the legal name and business
                        number(s) of each entity covered by this report.*
                      </label>
                    </div>
                    {entities.map((entity, index) => (
                      <div key={index} className="flex">
                        <div className="w-[37%]">
                          <input
                            type="text"
                            placeholder="Enter entity name"
                            value={entity.legalName}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "legalName",
                                e.target.value
                              )
                            }
                            onKeyDown={handleKeyDown}
                            className={`${
                              open ? "w-[100%]" : "w-[100%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                          />
                          {error[`legalName${index}`] && (
                            <p className="text-red-500 ml-1 text-[12px]">
                              {error[`legalName${index}`]}
                            </p>
                          )}
                        </div>
                        <div className="ml-2 w-[37%]">
                          <input
                            type="number"
                            placeholder="Enter Business numbers"
                            value={entity.businessNumber}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "businessNumber",
                                e.target.value
                              )
                            }
                            className={`${
                              open ? "w-[100%]" : "w-[100%]"
                            } border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 px-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  `}
                          />
                          {/* {error[`businessNumber${index}`] && (
                            <p className="text-red-500 ml-1">
                              {error[`businessNumber${index}`]}
                            </p>
                          )} */}
                        </div>
                        {index !== 0 && (
                          <div className="ml-2 mt-1">
                            <MdDelete
                              onClick={() => handleRemoveEntity(index)}
                              className="text-red-500 text-[23px] mt-1 cursor-pointer"
                            />
                          </div>
                        )}
                        {/* <div className="ml-2 mt-1">
                          {" "}
                          <MdDelete
                            onClick={() => handleRemoveEntity(index)}
                            className="text-red-500 text-sm "
                          />
                        </div> */}
                      </div>
                    ))}
                    <div className="mt-2">
                      <button
                        type="button"
                        className="text-[12px] text-sky-500 ml-1"
                        onClick={handleAddEntity}
                      >
                        + Add new entity
                      </button>
                    </div>
                  </div>
                )}

                <div className="w-[78%] mb-5">
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
                      className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${!(selectedOrg&&year)?'opacity-30 cursor-not-allowed':''}`}
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

export default Screenthree;