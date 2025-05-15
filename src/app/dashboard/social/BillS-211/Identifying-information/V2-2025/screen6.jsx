"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalState } from "../../../../../../Context/page";
import { Oval } from "react-loader-spinner";

const Screensix = ({
  nextStep,
  prevStep,
  selectedCorp,
  selectedOrg,
  year,
  reportType,
  status
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [reportingentity, setReportingentit] = useState("");
  const [error, setError] = useState({});
  const { open } = GlobalState();
  const [loopen, setLoOpen] = useState(false);
  const screenId = 6;
  const LoaderOpen = () => setLoOpen(true);
  const LoaderClose = () => setLoOpen(false);

  const fetchBillSsix = async () => {
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `${process.env.BACKEND_API_URL}/canada_bill_s211/v2/submission-information/${screenId}/?corporate=${selectedCorp}&organization=${selectedOrg}&year=${year}`
      );

      if (response.status === 200) {
        setReportingentit(response.data.data.screen6_q2);
        const selectedData = response.data.data.screen6_q1 || {};
        setSelectedOptions(selectedData);
      } else {
        toast.error("Oops, something went wrong");
      }
    } catch (error) {
      // console.error("API call failed:", error);
      // toast.error("Oops, something went wrong");
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (
      (reportType === "Organization" && selectedOrg && year) ||
      (selectedOrg && year && selectedCorp)
    ) {
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

  const handleReportingentity = (event) => {
    setReportingentit(event.target.value);
    setError((prev) => ({ ...prev, reportingentity: "" }));
  };

  const continueToNextStep = () => {
    const errors = {};

    if (Object.keys(selectedOptions).length === 0) {
      errors.checkboxes = "Please select at least one option.";
    }

    if (selectedOptions["other"] && !reportingentity) {
      errors.reportingentity = "Please enter a description";
    }

    if (Object.keys(errors).length === 0) {
      setError({});
      submitForm();
    } else {
      setError(errors);
    }
  };
  const stepsubmitForm = async () => {
    const stepscreenId = 7;
    const stepdata = status[6].status
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
          screen6_q1: selectedOptions,
          screen6_q2: selectedOptions["other"] ? reportingentity : null,
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
      if (response.status === 200) {
        toast.success("Data added successfully");
        stepsubmitForm();
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
      label: "Agriculture, forestry, fishing and hunting",
      value: "Agriculture, forestry, fishing and hunting",
      subcategories: [
        "Crop production",
        "Animal production and aquaculture",
        "Forestry and logging",
        "Fishing, hunting and trapping",
        "Support activities for agriculture and forestry",
      ],
    },
    {
      label: "Mining, quarrying, and oil and gas extraction",
      value: "Mining, quarrying, and oil and gas extraction",
      subcategories: [
        "Oil and gas extraction",
        "Mining and quarrying (except oil and gas)",
        "Support activities for mining, and oil and gas extraction",
      ],
    },
    {
      label: "Utilities",
      value: "Utilities",
    },
    {
      label: "Construction",
      value: "Construction",
      subcategories: [
        "Construction of buildings",
        "Heavy and civil engineering construction",
        "Specialty trade contractors",
      ],
    },
    {
      label: "Manufacturing",
      value: "Manufacturing",
      subcategories: [
        "Food manufacturing",
        "Beverage and tobacco product manufacturing",
        "Textile mills",
        "Textile product mills",
        "Apparel manufacturing",
        "Leather and allied product manufacturing",
        "Wood product manufacturing",
        "Paper manufacturing",
        "Printing and related support activities",
        "Petroleum and coal product manufacturing",
        "Chemical manufacturing",
        "Plastics and rubber products manufacturing",
        "Non-metallic mineral product manufacturing",
        "Primary metal manufacturing",
        "Fabricated metal product manufacturing",
        "Machinery manufacturing",
        "Computer and electronic product manufacturing",
        "Electrical equipment, appliance and component manufacturing",
        "Transportation equipment manufacturing",
        "Furniture and related product manufacturing",
        "Other manufacturing",
      ],
    },
    {
      label: "Wholesale trade",
      value: "Wholesale trade",
      subcategories: [
        "Farm product merchant wholesalers",
        "Petroleum, petroleum products, and other hydrocarbons merchant wholesalers",
        "Food, beverage and tobacco merchant wholesalers",
        "Personal and household goods merchant wholesalers",
        "Motor vehicle and motor vehicle parts and accessories merchant wholesalers",
        "Building material and suppliers merchant wholesalers",
        "Machinery, equipment and supplies merchant wholesalers",
        "Business-to-business electronic markets, and agents and brokers",
        "Other merchant wholesalers",
      ],
    },
    {
      label: "Retail trade",
      value: "Retail trade",
      subcategories: [
        "Motor vehicle and parts dealers",
        "Building material and garden equipment and supplies dealers",
        "Food and beverage retailers",
        "Furniture, home furnishings, electronics and appliances retailers",
        "General merchandise retailers",
        "Health and personal care retailers",
        "Gasoline stations and fuel vendors",
        "Clothing, clothing accessories, shoes, jewelry, luggage and leather goods retailers",
        "Sporting goods, hobby, musical instrument, book, and other retailers",
      ],
    },
    {
      label: "Transportation and warehousing",
      value: "Transportation and warehousing",
      subcategories: [
        "Air transportation",
        "Rail transportation",
        "Water transportation",
        "Truck transportation",
        "Transit and ground passenger transportation",
        "Pipeline transportation",
        "Scenic and sightseeing transportation",
        "Support activities for transportation",
        "Postal service",
        "Couriers and messengers",
        "Warehousing and storage",
      ],
    },
    {
      label: "Information and cultural industries",
      value: "Information and cultural industries",
      subcategories: [
        "Motion picture and sound recording industries",
        "Publishing industries",
        "Broadcasting and content providers",
        "Telecommunications",
        "Computing infrastructure providers, data processing, web hosting, and related services",
        "Web search portals, libraries, archives, and all other information services",
      ],
    },
    {
      label: "Finance and insurance",
      value: "Finance and insurance",
      subcategories: [
        "Monetary authorities - central bank",
        "Credit intermediation and related activities",
        "Securities, commodity contracts, and other financial investment and related activities",
        "Insurance carriers and related activities",
        "Funds and other financial vehicles",
      ],
    },
    {
      label: "Real estate and rental and leasing",
      value: "Real estate and rental and leasing",
      subcategories: [
        "Real estate",
        "Rental and leasing services",
        "Lessors of non-financial intangible assets (except copyrighted works)",
      ],
    },
    {
      label: "Professional, scientific and technical services",
      value: "Professional, scientific and technical services",
    },
    {
      label: "Management of companies and enterprises",
      value: "Management of companies and enterprises",
    },
    {
      label:
        "Administrative and support, waste management and remediation services",
      value:
        "Administrative and support, waste management and remediation services",
      subcategories: [
        "Administrative and support services",
        "Waste management and remediation services",
      ],
    },
    {
      label: "Educational services",
      value: "Educational services",
    },
    {
      label: "Health care and social assistance",
      value: "Health care and social assistance",
      subcategories: [
        "Ambulatory health care services",
        "Hospitals",
        "Nursing and residential care facilities",
        "Social assistance",
      ],
    },
    {
      label: "Arts, entertainment and recreation",
      value: "Arts, entertainment and recreation",
      subcategories: [
        "Performing arts, spectator sports and related industries",
        "Heritage institutions",
        "Amusement, gambling and recreation industries",
      ],
    },
    {
      label: "Accommodation and food services",
      value: "Accommodation and food services",
      subcategories: [
        "Accommodation services",
        "Food services and drinking places",
      ],
    },
    {
      label: "Other services (except public administration)",
      value: "Other services (except public administration)",
      subcategories: [
        "Repair and maintenance",
        "Personal and laundry services",
        "Religious, grant-making, civic, and professional and similar organizations",
        "Private households",
      ],
    },
    {
      label: "Public administration",
      value: "Public administration",
      subcategories: [
        "Federal government public administration",
        "Provincial and territorial public administration",
        "Local, municipal and regional public administration",
        "Indigenous public administration",
        "International and other extra-territorial public administration",
      ],
    },
    {
      label: "Other, please specify:",
      value: "other",
    },
  ];

  return (
    <>
      <div className="mt-2">
        <div className="mx-2 xl:mx-4 h-[32rem] overflow-y-auto scrollable-content">
          <label className="block text-gray-700 text-[14px] font-[500] mb-2">
            10. For entities only: In which of the following sectors or
            industries does the entity operate? Select all that apply. *
          </label>

          {optionsTwo.map((option, index) => (
            <div key={index} className="mb-2">
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
                    selectedOptions.hasOwnProperty(option.value)
                      ? ""
                      : "opacity-50 pointer-events-none"
                  }`}
                >
                  {option.subcategories.map((sub, idx) => (
                    <label
                      key={idx}
                      className="flex items-center text-[13px] text-gray-600 mb-2"
                    >
                      <input
                        type="checkbox"
                        checked={
                          selectedOptions[option.value]?.includes(sub) || false
                        }
                        onChange={(e) =>
                          handleSubcategoryChange(
                            option.value,
                            sub,
                            e.target.checked
                          )
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
            <div className="text-red-500 text-[12px] ml-1">
              {error.checkboxes}
            </div>
          )}

          {selectedOptions["other"] && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Enter a description..."
                className="w-[73%] border border-gray-400 text-xs text-neutral-600 pl-2 py-3 rounded-md focus:outline-none"
                value={reportingentity}
                onChange={handleReportingentity}
              />
              {error.reportingentity && (
                <div className="text-red-500 text-[12px] ml-1">
                  {error.reportingentity}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-5 mx-4">
          <button
            className="px-3 py-1.5 rounded ml-2 font-semibold w-[120px] text-gray-600 text-[14px]"
            onClick={prevStep}
          >
            &lt; Previous
          </button>

          <button
            type="button"
            onClick={continueToNextStep}
            disabled={
              !(
                selectedOrg &&
                year &&
                (reportType === "Organization" || selectedCorp)
              )
            }
            className={`px-3 py-1.5 font-semibold rounded ml-2 w-[80px] text-[12px] bg-blue-500 text-white ${
              !(
                selectedOrg &&
                year &&
                (reportType === "Organization" || selectedCorp)
              )
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            Next &gt;
          </button>
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
          />
        </div>
      )}
    </>
  );
};

export default Screensix;
