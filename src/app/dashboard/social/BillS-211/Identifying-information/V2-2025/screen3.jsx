"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose, MdDelete } from "react-icons/md";
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
  status
}) => {
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [reportradiojoint, setReportnradiojoint] = useState("");
  const [reportingbusinessnumber, setReportingbusinessnumber] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [entities, setEntities] = useState([
    { legalName: "", businessNumber: "" },
  ]);
  const screenId = 3;
  const fetchBillSthree = async () => {
    LoaderOpen();

    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/submission-information/${screenId}/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );
      if (response.status === 200) {
        setReportnradiojoint(response.data.data.screen3_q1);
        if (!response.data.data.screen3_q2) {
          setEntities([{ legalName: "", businessNumber: "" }]);
        } else {
          setEntities(response.data.data.screen3_q2);
        }

        LoaderClose();
      } else if (response.status == 404) {
        setReportnradiojoint("");
        setEntities([{ legalName: "", businessNumber: "" }]);
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

    setReportnradiojoint("");
    setEntities([{ legalName: "", businessNumber: "" }]);
  }, [selectedCorp, selectedOrg, year]);

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

  const handleReportnradio = (event) => {
    setReportnradiojoint(event.target.value);
    setError((prev) => ({ ...prev, reportradiojoint: "" }));
  };

  const stepsubmitForm = async () => {
    const stepscreenId = 4;
       const stepdata = status[3].status
      const newStatus = stepdata === "completed" ? "completed" : "in_progress";
    try {
      const sendData = {
        organization: selectedOrg,
        corporate: selectedCorp,
        year: year,
        status: newStatus,
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
    try {
      LoaderOpen();

      const sendData = {
        data: {
          screen3_q1: reportradiojoint,
          screen3_q2: entities,
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

    if (!reportradiojoint) {
      newErrors.reportradiojoint =
        "This field is required. Please fill it out.";
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
  const handleKeyDown = (event) => {
    if (["+", "-", "."].includes(event.key)) {
      event.preventDefault();
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
                7. For entities only: Is this a joint report?*
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
                    checked={reportradiojoint === "No"}
                    onChange={handleReportnradio}
                  />
                   {" "}
                  <label htmlFor="No" className="text-[15px] text-gray-700 ">
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
                    7.1 & 7.2. If yes, identify the legal name and business
                    number(s) of each entity covered by this report.*
                  </label>
                </div>
                {entities.map((entity, index) => (
                  <div key={index} className="flex">
                    <div className="xl:w-[37%]  lg:w-[37%]  2xl:w-[37%]  md:w-[37%]  2k:w-[37%]  4k:w-[37%] w-[45%]">
                      <input
                        type="text"
                        placeholder="Enter entity name"
                        value={entity.legalName}
                        onChange={(e) =>
                          handleInputChange(index, "legalName", e.target.value)
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
                    <div className="ml-2 xl:w-[37%]  lg:w-[37%]  2xl:w-[37%]  md:w-[37%]  2k:w-[37%]  4k:w-[37%] w-[45%]">
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
                      <div className="ml-2 mt-1 xl:w-0  lg:w-0  2xl:w-0  md:w-0  2k:w-0  4k:w-0 w-[5%]">
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

export default Screenthree;
