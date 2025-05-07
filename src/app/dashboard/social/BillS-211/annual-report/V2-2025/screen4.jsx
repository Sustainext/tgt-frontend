"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screenfour = ({
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
  const [reportingdescription, setReportingdescription] = useState("");
  const [reportingentity, setReportingentity] = useState("");
  const [reportingentityone, setReportingentityone] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsone, setSelectedOptionsone] = useState([]);

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
        `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=4&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );
      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportnradio(response.data.risk_identified_8);
        setReportingdescription(response.data.additional_info_entity_10);
        setReportingentity(response.data.risk_aspects_description_8_1);
        setReportingentityone(response.data.risk_activaties_description_9);
        if (response.data.risk_aspects_8_1 == null) {
          setSelectedOptions([]);
        } else {
          setSelectedOptions(response.data.risk_aspects_8_1);
        }
        if (response.data.risk_activaties_9 == null) {
          setSelectedOptionsone([]);
        } else {
          setSelectedOptionsone(response.data.risk_activaties_9);
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
    if (reportType == "Organization") {
      if (selectedOrg && year) {
        fetchBillSfour();
      }
    } else {
      if (selectedOrg && year && selectedCorp) {
        fetchBillSfour();
      }
    }
    setReportnradio("");
    setReportingdescription("");
    setReportingentity("");
    setReportingentityone("");
    setSelectedOptionsone([]);
    setSelectedOptions([]);
  }, [selectedCorp, selectedOrg, year]);

  const options = [
    {
      label: "The sector or industry it operates in",
      value: "The sector or industry it operates in",
    },
    {
      label: "The types of products it produces or imports",
      value: "The types of products it produces or imports",
    },
    {
      label: "The locations of its activities, operations or factories",
      value: "The locations of its activities, operations or factories",
    },
    {
      label: "The types of products it sources",
      value: "The types of products it sources",
    },
    {
      label: "The raw materials or commodities used in its supply chains",
      value: "The raw materials or commodities used in its supply chains",
    },
    {
      label: "Tier one (direct) suppliers",
      value: "Tier one (direct) suppliers",
    },
    { label: "Tier two suppliers", value: "Tier two suppliers" },
    { label: "Tier three suppliers", value: "Tier three suppliers" },
    {
      label: "Suppliers further down the supply chain than tier three",
      value: "Suppliers further down the supply chain than tier three",
    },
    {
      label: "The use of outsourced, contracted or subcontracted labour",
      value: "The use of outsourced, contracted or subcontracted labour",
    },
    { label: "The use of migrant labour", value: "The use of migrant labour" },
    { label: "The use of forced labour", value: "The use of forced labour" },
    { label: "The use of child labour", value: "The use of child labour" },
    { label: "None of the above", value: "None of the above" },
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
    try {
      LoaderOpen();

      const sendData = {
        risk_identified_8: reportradio,
        risk_aspects_8_1: selectedOptions,
        organization_id: selectedOrg,
        corporate_id: selectedCorp ? selectedCorp : null,
        year: year,
      };
      const response = await axiosInstance.post(
        `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=4`,
        sendData,
        axiosConfig
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
      newErrors.reportradio = "This field is required.";
    }
    if (reportradio === "Yes" || reportradio === "Yesone") {
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
      <div className="xl:mx-4 lg:mx-4 md:mx-4 2xl:mx-4 4k:mx-4 2k:mx-4 mx-2 mt-2">
        <form className="xl:w-[80%] lg:w-[80%] 2xl:w-[80%] md:w-[80%] 2k:w-[80%] 4k:w-[80%] w-[99%] text-left">
          <div className="mb-5">
            <label
              className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
              htmlFor="username"
            >
              6. Has the entity identified parts of its activities and supply
              chains that carry a risk of forced labour or child labour being
              used?*
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
                <label htmlFor="Yes" className="text-[14px] text-gray-700">
                  Yes, we have identified parts of our activities and/or supply
                  chains that carry risks to the best of our knowledge and will
                  continue to identify emerging risks.
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
                <label htmlFor="Yesone" className="text-[14px] text-gray-700">
                  Yes, we have started the process of identifying parts of our
                  activities and/or supply chains that carry risks, but there
                  are still gaps in our assessments.
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
                <label htmlFor="No" className="text-[14px] text-gray-700 ">
                  No, we have not started the process of identifying parts of
                  our activities and/or supply chains that carry risks of forced
                  labour or child labour being used.
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
          {(reportradio === "Yes" || reportradio === "Yesone") && (
            <div className="mb-5">
              <label
                className="block text-gray-700 text-[14px] font-[500] mb-2 ml-1"
                htmlFor="username"
              >
                6.1 If yes, has the entity identified forced labour or child
                labour risks related to any of the following aspects of its
                activities and supply chains? Select all that apply *
              </label>
              <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 4k:grid-cols-2 2k:grid-cols-2  md:grid-cols-2">
                {options.map((option, index) => (
                  <div key={index} className="mb-1 ml-2">
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
              </div>
              {error.checkboxes && (
                <div className="text-red-500 ml-1 text-[12px] mt-1">
                  {error.checkboxes}
                </div>
              )}
            </div>
          )}
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

export default Screenfour;
