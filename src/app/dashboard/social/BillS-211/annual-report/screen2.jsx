"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../Context/page';
import { Oval } from "react-loader-spinner";

const Screentwo = ({ nextStep, prevStep,selectedCorp, selectedOrg, year,reportType }) => {

  const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdescription, setReportingdescription] = useState("");
  const [loopen, setLoOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedone, setIsCheckedone] = useState(false);
  const [isCheckedoneone, setIsCheckedoneone] = useState(false);
  const [isCheckeotherone, setIsCheckeotherone] = useState(false);
  const [isCheckedothertwo, setIsCheckedothertwo] = useState(false);

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

 
  const fetchBillStwo = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
      const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/annual-report/?screen=2&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );

      if (response.status === 200) {
        setReportingdescription(response.data.additional_information_entity_5);
        setReportnradio(response.data.structure_3);

        if (response.data.categorization_4 == null) {
          setCheckboxStates({});
        } else {
          setCheckboxStates(response.data.categorization_4);
          setIsChecked(response.data.categorization_4.Producing_goods);
          setIsCheckedone(response.data.categorization_4.Selling_goods);
          setIsCheckedoneone(response.data.categorization_4.Distributing_goods);
          setIsCheckeotherone(
            response.data.categorization_4.Importing_into_Canada_goods_produced_outside_Canada
          );
          setIsCheckedothertwo(
            response.data.categorization_4.Controlling_an_entity_engaged_in_producing
          );
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
        fetchBillStwo();
      }
    }
    else{
      if(selectedOrg&&year&&selectedCorp){
        fetchBillStwo();
      }
    }
    setReportingdescription("");
        setReportnradio("");
        setIsChecked("");
          setIsCheckedone("");
          setIsCheckedoneone("");
          setIsCheckeotherone("");
          setIsCheckedothertwo("");
        setCheckboxStates({
          ProducinggoodsInCanada: false,
          ProducinggoodsOutsideCanada: false,
          SellinggoodsInCanada: false,
          SellinggoodsOutsideCanada: false,
          DistributinggoodsInCanada: false,
          DistributinggoodsOutsideCanada: false,
        })

    
  }, [selectedCorp,selectedOrg,year]);

  const handleCheckotherone = (name) => (event) => {
    if (name === "isCheckeotherone") {
      setIsCheckeotherone(event.target.checked);
    }
  };
  const handleCheckothertwo = (name) => (event) => {
    if (name === "isCheckedothertwo") {
      setIsCheckedothertwo(event.target.checked);
    }
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
  const [checkboxStates, setCheckboxStates] = useState({
    ProducinggoodsInCanada: false,
    ProducinggoodsOutsideCanada: false,
    SellinggoodsInCanada: false,
    SellinggoodsOutsideCanada: false,
    DistributinggoodsInCanada: false,
    DistributinggoodsOutsideCanada: false,
  });

  const handleCheckboxChange = (name) => (event) => {
    const { checked } = event.target;
    if (name === "isChecked") {
      setIsChecked(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          ProducinggoodsInCanada: false,
          ProducinggoodsOutsideCanada: false,
        }));
      }
    } else if (name === "isCheckedone") {
      setIsCheckedone(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          SellinggoodsInCanada: false,
          SellinggoodsOutsideCanada: false,
        }));
      }
    } else if (name === "isCheckedoneone") {
      setIsCheckedoneone(event.target.checked);
      if (!checked) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          DistributinggoodsInCanada: false,
          DistributinggoodsOutsideCanada: false,
        }));
      }
    } else {
      setCheckboxStates({ ...checkboxStates, [name]: event.target.checked });
      const businessPresenceSelected = [
        "ProducinggoodsInCanada",
        "ProducinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!businessPresenceSelected) {
        setError((prev) => ({ ...prev, businessPresence: "" }));
      }
      const sizeThresholdsSelected = [
        "SellinggoodsInCanada",
        "SellinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!sizeThresholdsSelected) {
        setError((prev) => ({ ...prev, sizeThresholds: "" }));
      }
      const distributingGoods = [
        "DistributinggoodsInCanada",
        "DistributinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!distributingGoods) {
        setError((prev) => ({ ...prev, distributinggoods: "" }));
      }
    }
  };

  const renderContent = () => {
    const options = [
      { key: "ProducinggoodsInCanada", label: "in Canada" },
      { key: "ProducinggoodsOutsideCanada", label: "outside Canada" },
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
                disabled={!isChecked}
                className="mr-3 pt-1 scale-90 rounded-xl"
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
        key: "SellinggoodsInCanada",
        label: "in Canada",
      },
      {
        key: "SellinggoodsOutsideCanada",
        label: "outside Canada",
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
                disabled={!isCheckedone}
                className="mr-3 pt-1 scale-90 rounded-xl"
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };
  const renderContenttwo = () => {
    const options = [
      {
        key: "DistributinggoodsInCanada",
        label: "in Canada",
      },
      {
        key: "DistributinggoodsOutsideCanada",
        label: "outside Canada",
      },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isCheckedoneone ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}
                disabled={!isCheckedoneone}
                className="mr-3 pt-1 scale-90 rounded-xl"
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
      { key: "ProducinggoodsInCanada", label: "in Canada" },
      { key: "ProducinggoodsOutsideCanada", label: "outside Canada" },
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

                className="mr-3 pt-1 scale-90 rounded-xl"
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
        key: "SellinggoodsInCanada",
        label: "in Canada",
      },
      {
        key: "SellinggoodsOutsideCanada",
        label: "outside Canada",
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

                className="mr-3 pt-1 scale-90 rounded-xl"
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };
  const renderContenttwoview = () => {
    const options = [
      {
        key: "DistributinggoodsInCanada",
        label: "in Canada",
      },
      {
        key: "DistributinggoodsOutsideCanada",
        label: "outside Canada",
      },
    ];
    return (
      <>
        {options.map((option) => (
          <div className="ml-6 mt-2" key={option.key}>
            <label
              className={`ml-2 text-[15px] ${
                isCheckedoneone ? "text-gray-600" : "text-gray-400"
              }`}
            >
              <input
                type="checkbox"
                name={option.key}
                checked={checkboxStates[option.key]}
                onChange={handleCheckboxChange(option.key)}

                className="mr-3 pt-1 scale-90 rounded-xl"
              />
              {option.label}
            </label>
          </div>
        ))}
      </>
    );
  };
 
  const submitForm = async () => {

    try{
      LoaderOpen();

      const sendData = {
        categorization_4: {
          ...checkboxStates,
          Producing_goods: isChecked,
          Selling_goods: isCheckedone,
          Distributing_goods: isCheckedoneone,
          Importing_into_Canada_goods_produced_outside_Canada: isCheckeotherone,
          Controlling_an_entity_engaged_in_producing: isCheckedothertwo,
        },
        structure_3: reportradio,
        additional_information_entity_5: reportingdescription?reportingdescription:null,
        organization_id: selectedOrg,
        corporate_id: selectedCorp?selectedCorp:null,
        year: year
      };
      const response= await axiosInstance
    .post(
      `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=2`,
      sendData,
      axiosConfig
    )
    if (response.status == "200") {
      console.log(response.status);
      toast.success("added successfully", {
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
      toast.error("Error", {
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
    // Validation for "Canadian business presence"
    if (isChecked) {
      const businessPresenceSelected = [
        "ProducinggoodsInCanada",
        "ProducinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!businessPresenceSelected) {
        newErrors.businessPresence =
          "Please select at least one option under 'Producing goods (including manufacturing, extracting, growing and processing)'.";
      }
    }

    // Validation for "Meets size-related thresholds"
    if (isCheckedone) {
      const sizeThresholdsSelected = [
        "SellinggoodsInCanada",
        "SellinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!sizeThresholdsSelected) {
        newErrors.sizeThresholds =
          "Please select at least one option under 'Selling goods'.";
      }
    }
    if (isCheckedoneone) {
      const distributingGoods = [
        "DistributinggoodsInCanada",
        "DistributinggoodsOutsideCanada",
      ].some((key) => checkboxStates[key]);
      if (!distributingGoods) {
        newErrors.distributinggoods =
          "Please select at least one option under 'Distributing goods'.";
      }
    }

    // Ensure that at least one of the main categories is checked
    if (!isChecked && !isCheckedone && !isCheckedoneone) {
      newErrors.general =
        "Please select at least one category and fill in the details.";
    }

    if (!reportradio) {
      newErrors.reportradio = "This field is required. Please fill it out.";
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
                      3. Which of the following accurately describes the entity’s
                      structure?*
                    </label>
                    <div className="relative mb-1">
                      <div className="mb-2">
                         {" "}
                        <input
                          type="radio"
                          id="Corporation"
                          name="radio"
                          value="Corporation"
                          checked={reportradio === "Corporation"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Corporation"
                          className="text-[14px] text-gray-700"
                        >
                          Corporation
                        </label>
                        <br />
                      </div>
                      <div className="mb-2">
                         {" "}
                        <input
                          type="radio"
                          id="Trust"
                          name="radio"
                          value="Trust"
                          checked={reportradio === "Trust"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Trust"
                          className="text-[14px] text-gray-700 "
                        >
                          Trust
                        </label>
                        <br />
                      </div>
                      <div className="mb-2">
                         {" "}
                        <input
                          type="radio"
                          id="Partnership"
                          name="radio"
                          value="Partnership"
                          checked={reportradio === "Partnership"}
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Partnership"
                          className="text-[14px] text-gray-700 "
                        >
                          Partnership
                        </label>
                        <br />
                      </div>
                      <div className="mb-4">
                         {" "}
                        <input
                          type="radio"
                          id="Other unincorporated organization"
                          name="radio"
                          value="Other unincorporated organization"
                          checked={
                            reportradio === "Other unincorporated organization"
                          }
                          onChange={handleReportnradio}
                        />
                         {" "}
                        <label
                          htmlFor="Other unincorporated organization"
                          className="text-[14px] text-gray-700 "
                        >
                          Other unincorporated organization
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500 ml-1 text-[12px] mt-1">{error.reportradio}</p>
                    )}
                  </div>

                  <div className="mb-5">
                    <div className="mt-5">
                      <div className="">
                        <label
                          className="block text-gray-700 text-[14px] font-[500] mb-2 ml-2"
                          htmlFor="username"
                        >
                          4. Which of the following accurately describes the entity’s activities? Select all that apply*
                        </label>
                      </div>

                      <div className="ml-4">
                        <div>
                          <label className="ml-2 text-[14px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange("isChecked")}
                              className="mr-3 pt-1"
                            />
                            Producing goods (including manufacturing,
                            extracting, growing and processing)
                          </label>
                          {renderContent()}
                        </div>
                        <div>
                          <label className="ml-2 text-[14px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedone}
                              onChange={handleCheckboxChange("isCheckedone")}
                              className="mr-3 pt-1"
                            />
                            Selling goods
                          </label>
                          {renderContentone()}
                        </div>
                        <div>
                          <label className="ml-2 text-[14px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedoneone}
                              onChange={handleCheckboxChange("isCheckedoneone")}
                              className="mr-3 pt-1"
                            />
                            Distributing goods
                          </label>
                          {renderContenttwo()}
                        </div>
                        <div>
                          <label className="ml-2 text-[14px] text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckeotherone}
                              onChange={handleCheckotherone("isCheckeotherone")}
                              className="mr-3 pt-1"
                            />
                            Importing into Canada goods produced outside Canada
                          </label>
                        </div>
                        <div className="w-[80%] relative">
                          <label className="ml-2 text-[14px]  text-gray-600">
                            <input
                              type="checkbox"
                              checked={isCheckedothertwo}
                              onChange={handleCheckothertwo(
                                "isCheckedothertwo"
                              )}
                              className="mr-3 pt-1"
                            />
                            Controlling an entity engaged in producing, selling
                            or distributing goods in Canada or outside Canada,
                            or importing into Canada goods produced outside
                            Canada
                          </label>
                        </div>
                        {/* Display validation errors */}
                        <div className="mt-5 ml-1 mb-5">
                          {error.businessPresence && (
                            <div className="text-red-500 text-[12px] mt-1">
                              {error.businessPresence}
                            </div>
                          )}
                          {error.sizeThresholds && (
                            <div className="text-red-500 text-[12px] mt-1">
                              {error.sizeThresholds}
                            </div>
                          )}
                            {error.distributinggoods && (
                            <div className="text-red-500 text-[12px] mt-1">
                              {error.distributinggoods}
                            </div>
                          )}
                          {error.general && (
                            <div className="text-red-500 text-[12px] mt-1">{error.general}</div>
                          )}
                        </div>
                        <div className="mb-5 mt-3">
                          <label
                            className="block text-gray-700 text-[14px] font-[500] mb-2"
                            html
                            htmlFor="industryCheckbox"
                          >
                            5. Please provide additional information on the
                            entity’s structure, activities and supply chains.
    
                          </label>
                          <textarea
                            id="countriesOfOperation"
                            name="countriesOfOperation"
                            placeholder="Enter a description..."
                            className={`${
                              open ? "w-full" : "w-full"
                            }  border appearance-none text-xs border-gray-400 text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer `}
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
                      </div>
                    </div>
                    {error.reportingdate && (
                      <p className="text-red-500 text-[12px] mt-1">{error.reportingdate}</p>
                    )}
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

export default Screentwo;