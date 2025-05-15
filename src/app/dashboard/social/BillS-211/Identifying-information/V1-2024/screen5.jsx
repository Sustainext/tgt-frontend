"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose,MdDeleteOutline   } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screenfive = ({ nextStep, prevStep,selectedCorp,selectedOrg,year,reportType }) => {
  const [loopen, setLoOpen] = useState(false);
  const { open } = GlobalState();

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
    LoaderOpen(); 

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/identifying-information/?screen=5&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );

      
      if (response.status === 200) {

        if (!response.data.categorizations_8) {
          setCheckboxStates({});
        } else {
          setCheckboxStates(response.data.categorizations_8);
          setIsChecked(response.data.categorizations_8.isChecked);
          setIsCheckedone(response.data.categorizations_8.isCheckedone);
          setIsCheckednew(response.data.categorizations_8.isCheckednew);
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
        fetchBillSfive();
      }
    }
    else{
      if(selectedOrg&&year&&selectedCorp){
        fetchBillSfive();
      }
    }
    setCheckboxStates({
      businessInCanada: false,
      doesBusinessInCanada: false,
      hasAssetsInCanada: false,
      largeAssetSize: false,
      largeRevenue: false,
      largeEmployees: false,
    });
          setIsChecked(false);
          setIsCheckedone(false);
          setIsCheckednew(false);
    
  }, [selectedCorp,selectedOrg,year]);
 
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedone, setIsCheckedone] = useState(false);
  const [isCheckednew, setIsCheckednew] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    businessInCanada: false,
    doesBusinessInCanada: false,
    hasAssetsInCanada: false,
    largeAssetSize: false,
    largeRevenue: false,
    largeEmployees: false,
  });

  const [error, setError] = useState({});
  const handleCheckboxChangenew = (name) => (event) => {
    if (name === "isCheckednew") {
      setIsCheckednew(event.target.checked);
      setError((prev) => ({ ...prev, general: "" }));
    }

    // console.log(event.target.value, "name");
  };
  const handleCheckboxChange = (name) => (event) => {
    const { checked } = event.target;
    if (name === "isChecked") {
      setIsChecked(event.target.checked);

      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          businessInCanada: false,
          doesBusinessInCanada: false,
          hasAssetsInCanada: false,
        }));
      }
      
    } else if (name === "isCheckedone") {
      setIsCheckedone(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          largeAssetSize: false,
          largeRevenue: false,
          largeEmployees: false,
        }));
      }
    } else {
      setCheckboxStates({ ...checkboxStates, [name]: event.target.checked });
      const businessPresenceSelected = [
        "businessInCanada",
        "doesBusinessInCanada",
        "hasAssetsInCanada",
      ].some((key) => checkboxStates[key]);
      if (!businessPresenceSelected) {
        setError((prev) => ({ ...prev, businessPresence: "" }));
      }
      const sizeThresholdsSelected = [
        "largeAssetSize",
        "largeRevenue",
        "largeEmployees",
      ].some((key) => checkboxStates[key]);
      if (!sizeThresholdsSelected) {
        setError((prev) => ({ ...prev, sizeThresholds: "" }));
      }
    }
  };

  const continueToNextStep = () => {
    let newErrors = {};

    // Validation for "Canadian business presence"
    if (isChecked) {
      const businessPresenceSelected = [
        "businessInCanada",
        "doesBusinessInCanada",
        "hasAssetsInCanada",
      ].some((key) => checkboxStates[key]);
      if (!businessPresenceSelected) {
        newErrors.businessPresence =
          "Please select at least one option under 'Canadian business presence'.";
      }
    }

    // Validation for "Meets size-related thresholds"
    if (isCheckedone) {
      const sizeThresholdsSelected = [
        "largeAssetSize",
        "largeRevenue",
        "largeEmployees",
      ].some((key) => checkboxStates[key]);
      if (!sizeThresholdsSelected) {
        newErrors.sizeThresholds =
          "Please select at least one option under 'Meets size-related thresholds'.";
      }
    }

    // Ensure that at least one of the main categories is checked
    if (!isChecked && !isCheckedone) {
      newErrors.general =
        "Please select at least one category and fill in the details.";
    }

    if (Object.keys(newErrors).length === 0) {
      setError({}); // Clear errors if validation passes
      submitForm(); // Assuming nextStep is a function prop for navigating to the next step
    } else {
      setError(newErrors); // Set errors from validation
    }
  };
  const submitForm = async () => {
    try{
      LoaderOpen();

    const sendData = {
      categorizations_8: {
        ...checkboxStates,
        isChecked: isChecked,
        isCheckedone: isCheckedone,
        isCheckednew: isCheckednew,
      },
      organization_id: selectedOrg,
      corporate_id: selectedCorp?selectedCorp:null,
      year: year
    };
   const response= await axiosInstance
      .post(
       `${process.env.BACKEND_API_URL}/canadabills211/identifying-information/?screen=5`,
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
 
  const renderContent = () => {
    const options = [
      {
        key: "businessInCanada",
        label: "Has a place of business in Canada",
        value: "1",
      },
      {
        key: "doesBusinessInCanada",
        label: "Does business in Canada",
        value: "2",
      },
      { key: "hasAssetsInCanada", label: "Has assets in Canada", value: "3" },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[14px] ${
                isChecked ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}
                disabled={!isChecked}
                className={`mr-3 pt-1 scale-90 rounded-xl ${isChecked?'cursor-pointer':''}`}
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };

  const renderContentone = () => {
    const options = [
      {
        key: "largeAssetSize",
        label:
          "Has at least $20 million in assets for at least one of its two most recent financial years",
      },
      {
        key: "largeRevenue",
        label:
          "Has generated at least $40 million in revenue for at least one of its two most recent financial years",
      },
      {
        key: "largeEmployees",
        label:
          "Employs an average of at least 250 employees for at least one of its two most recent financial years",
      },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[14px] ${
                isCheckedone ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}
                disabled={!isCheckedone}
                className={`mr-3 pt-1 scale-90 rounded-xl ${isCheckedone?'cursor-pointer':''}`}
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };
  const renderContentview = () => {
    const options = [
      {
        key: "businessInCanada",
        label: "Has a place of business in Canada",
        value: "1",
      },
      {
        key: "doesBusinessInCanada",
        label: "Does business in Canada",
        value: "2",
      },
      { key: "hasAssetsInCanada", label: "Has assets in Canada", value: "3" },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isChecked ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}

                className={`mr-3 pt-1 scale-90 rounded-xl ${isChecked?'cursor-pointer':''}`}
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };

  const renderContentoneview = () => {
    const options = [
      {
        key: "largeAssetSize",
        label:
          "Has at least $20 million in assets for at least one of its two most recent financial years",
      },
      {
        key: "largeRevenue",
        label:
          "Has generated at least $40 million in revenue for at least one of its two most recent financial years",
      },
      {
        key: "largeEmployees",
        label:
          "Employs an average of at least 250 employees for at least one of its two most recent financial years",
      },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isCheckedone ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}

                className={`mr-3 pt-1 scale-90 rounded-xl ${isCheckedone?'cursor-pointer':''}`}
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      
      <div>
      <div className="mt-2">
                <div className="ml-4">
                  <label
                    className="block text-gray-700 text-[14px] font-[500] mb-2 ml-2"
                    htmlFor="username"
                  >
                    8. For entities only: Which of the following categorizations applies to the
                    entity? Select all that apply*
                  </label>
                </div>
                <div className="ml-4">
                  <label className="ml-2 text-[14px] text-gray-600">
                    <input
                      type="checkbox"
                      name="isCheckednew"
                      checked={isCheckednew}
                      onChange={handleCheckboxChangenew("isCheckednew")}
                      className="mr-3 pt-1 cursor-pointer"
                    />
                    Listed on a stock exchange in Canada
                  </label>
                </div>
                <div className="ml-4">
                  <div>
                    <label className="ml-2 text-[14px] text-gray-600">
                      <input
                        type="checkbox"
                        name="isChecked"
                        checked={isChecked}
                        onChange={handleCheckboxChange("isChecked")}
                        className="mr-3 pt-1 cursor-pointer"
                      />
                      Canadian business presence (select all that apply)
                    </label>
                    {renderContent()}
                  </div>
                  <div>
                    <label className="ml-2 text-[14px] text-gray-600">
                      <input
                        type="checkbox"
                        name="isCheckedone"
                        checked={isCheckedone}
                        onChange={handleCheckboxChange("isCheckedone")}
                        className="mr-3 pt-1 cursor-pointer"
                      />
                      Meets size-related thresholds (select all that apply):
                    </label>
                    {renderContentone()}
                  </div>
                  {/* Display validation errors */}
                  <div className="mt-5 ml-3 mb-5">
                    {error.businessPresence && (
                      <div className="text-red-500 text-[12px]">
                        {error.businessPresence}
                      </div>
                    )}
                    {error.sizeThresholds && (
                      <div className="text-red-500 text-[12px]">{error.sizeThresholds}</div>
                    )}
                    {error.general && (
                      <div className="text-red-500 text-[12px]">{error.general}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="xl:w-[77%] lg:w-[77%] 2xl:w-[77%] md:w-[77%] 2k:w-[77%] 4k:w-[77%]  w-full mb-5">
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