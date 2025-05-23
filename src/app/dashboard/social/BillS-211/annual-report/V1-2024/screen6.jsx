"use client";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineModeEditOutline,MdClose  } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { GlobalState } from '../../../../../../Context/page';
import { Oval } from "react-loader-spinner";

const Screensix = ({ nextStep, prevStep,selectedCorp, selectedOrg, year,reportType }) => {
    const { open } = GlobalState();
  const [error, setError] = useState({});
  const [reportradio, setReportnradio] = useState("");
  const [reportingdescription, setReportingdescription] = useState("");
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

  const fetchBillSsix = async () => {
    LoaderOpen(); // Assume this is to show some loading UI

    try {
     const response = await axiosInstance.get(
        `${
          process.env.BACKEND_API_URL
        }/canadabills211/annual-report/?screen=6&corp_id=${selectedCorp}&org_id=${selectedOrg}&year=${year}`,
        axiosConfig
      );

      // If the request is successful but you specifically want to handle 404 inside here
      if (response.status === 200) {
        setReportnradio(response.data.measures_taken_loss_income_13);
        setReportingdescription(response.data.additional_info_loss_income_14);
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
        fetchBillSsix();
      }
    }
    else{
      if(selectedOrg&&year&&selectedCorp){
        fetchBillSsix();
      }
    }
    setReportnradio("");
    setReportingdescription("");
    
  }, [selectedCorp,selectedOrg,year]);
 
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

    try{
      LoaderOpen();

      const sendData = {
        measures_taken_loss_income_13: reportradio,
        additional_info_loss_income_14: reportingdescription?reportingdescription:null,
        organization_id: selectedOrg,
        corporate_id: selectedCorp?selectedCorp:null,
        year: year
      };
      const response= await axiosInstance
      .post(
        `${process.env.BACKEND_API_URL}/canadabills211/annual-report/?screen=6`,
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
                      13. Has the entity taken any measures to remediate the
                      loss of income to the most vulnerable families that
                      results from any measure taken to eliminate the use of
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
                          Yes, we have taken substantial remediation measures
                          and will continue to identify and address any gaps in
                          our response.
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
                          Not applicable, we have not identified any loss of
                          income to vulnerable families resulting from measures
                          taken to eliminate the use of forced labour or child
                          labour in our activities and supply chains.
                        </label>
                        <br />
                      </div>
                    </div>
                    {error.reportradio && (
                      <p className="text-red-500  ml-1 text-[12px] mt-1">{error.reportradio}</p>
                    )}
                  </div>

                  <div className="mb-5 mt-3">
                    <label
                      className="block text-gray-700 text-[14px] font-[500] mb-2"
                      html
                      htmlFor="industryCheckbox"
                    >
                      14. Please provide additional information on any measures
                      the entity has taken to remediate the loss of income to
                      the most vulnerable families that results from any measure
                      taken to eliminate the use of forced labour or child
                      labour in its activities and supply chains (if applicable).
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

export default Screensix;