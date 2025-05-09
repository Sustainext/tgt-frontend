"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screenfive = ({ nextStep, prevStep, selectedCorp, selectedOrg, year, reportType }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [reportingentity, setReportingentit] = useState("");
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [loopen, setLoOpen] = useState(false);
  const screenId = 5;
  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const fetchBillSsix = async () => {
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/submission-information/${screenId}/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );

      if (response.status === 200) {
        const selectedData = response.data.data.screen5_q1 || {};
        setSelectedOptions(selectedData);
      } else {
        toast.error("Oops, something went wrong");
      }
    } catch (error) {
      LoaderClose();
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if ((reportType === "Organization" && selectedOrg && year) || (selectedOrg && year && selectedCorp)) {
      fetchBillSsix();
    }
    setReportingentit("");
    setSelectedOptions({});
  }, [selectedCorp, selectedOrg, year]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    setSelectedOptions((prev) => {
      const updated = { ...prev };
      if (isChecked) {
        updated[value] = [];
      } else {
        delete updated[value];
      }
      return updated;
    });

    if (error.checkboxes && isChecked) {
      const newErrors = { ...error };
      delete newErrors.checkboxes;
      setError(newErrors);
    }
  };

  const handleSubcategoryChange = (category, subcat, isChecked) => {
    setSelectedOptions((prev) => {
      const updated = { ...prev };
      const subs = new Set(updated[category] || []);
      isChecked ? subs.add(subcat) : subs.delete(subcat);
      updated[category] = Array.from(subs);
      return updated;
    });
  };



  const continueToNextStep = () => {
    const errors = {};

    if (Object.keys(selectedOptions).length === 0) {
      errors.checkboxes = "Please select at least one option.";
    }



    if (Object.keys(errors).length === 0) {
      setError({});
      submitForm();
    } else {
      setError(errors);
    }
  };

  const submitForm = async () => {
    try {
      LoaderOpen();

      const sendData = {
        data:{
          screen5_q1: selectedOptions,
       
        },
   
        organization: selectedOrg,
        corporate: selectedCorp,
        year: year
      };

      const response= await axiosInstance.put(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/submission-information/${screenId}/`,
        sendData
      )
      if (response.status === 200) {
        toast.success("Data added successfully");
        nextStep();
      } else {
        toast.error("Oops, something went wrong");
      }
    } catch (error) {
      toast.error("Oops, something went wrong");
    } finally {
      LoaderClose();
    }
  };

  const optionsTwo = [
    {
      label: "Listed on a stock exchange in Canada",
      value: "Listed on a stock exchange in Canada"
    },
    {
      label: "Canadian business presence (select all that apply)",
      value: "Canadian business presence (select all that apply)",
      subcategories: [
        "Has a place of business in Canada",
        "Does business in Canada",
        "Has assets in Canada",
  
      ]
    },
    {
      label: "Meets size-related thresholds (select all that apply):",
      value: "Meets size-related thresholds (select all that apply)",
      subcategories: [
        "Has at least $20 million in assets for at least one of its two most recent financial years",
        "Has generated at least $40 million in revenue for at least one of its two most recent financial years",
        "Employs an average of at least 250 employees for at least one of its two most recent financial years"
      ]
    },

   
  ];
  

  return (
    <>
      <div className="mt-2">
        <div className="mx-2 xl:mx-4">
          <label className="block text-gray-700 text-[14px] font-[500] mb-2">
            9. For entities only: Which of the following categories apply to the entity? Select all that apply *
          </label>
  
          {optionsTwo.map((option, index) => (
            <div key={index} className="mb-2 ">
              <div className="flex items-center ">
              <label className="text-[14px] text-gray-700">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.hasOwnProperty(option.value)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {option.label}
                </label>
              </div>

              {option.subcategories && (
                <div
                  className={`ml-6 mt-1 gap-2 mb-2 ${
                    selectedOptions.hasOwnProperty(option.value) ? "" : "opacity-50 pointer-events-none"
                  }`}
                >
                  {option.subcategories.map((sub, idx) => (
                    <label key={idx} className="flex items-center text-[13px] text-gray-600 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedOptions[option.value]?.includes(sub) || false}
                        onChange={(e) =>
                          handleSubcategoryChange(option.value, sub, e.target.checked)
                        }
                        disabled={!selectedOptions.hasOwnProperty(option.value)}
                        className="mr-2"
                      />
                      {sub}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          {error.checkboxes && (
            <div className="text-red-500 text-[12px] ml-1">{error.checkboxes}</div>
          )}

       

          <div className="flex justify-end mt-5">
            <button
              className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
              onClick={prevStep}
            >
              &lt; Previous
            </button>

            <button
              type="button"
              onClick={continueToNextStep}
              disabled={!(selectedOrg && year && (reportType === "Organization" || selectedCorp))}
              className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${
                !(selectedOrg && year && (reportType === "Organization" || selectedCorp)) ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval height={50} width={50} color="#00BFFF" secondaryColor="#f3f3f3" strokeWidth={2} />
        </div>
      )}
    </>
  );
};


export default Screenfive;

