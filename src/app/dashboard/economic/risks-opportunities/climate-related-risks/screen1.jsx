"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
import Economictable from "../../../../shared/widgets/Economic/economictable";
// Simple Custom Table Widget
const widgets = {
  TableWidget: Economictable,
};

const view_path = "gri-economic-climate_related_risks-202-2a-physical_risk";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      TypeofRisk: {
        type: "string",
        title: "Type of Risk",
        enum: [
          "Extreme weather events",
          "Temperature changes",
          "Sea level rise",
          "Water scarcity",
          "Changes in precipitation patterns",
          "Natural disasters",
          "Air Quality Degradation",
          "Heatwaves",
          "Others (please specify)",
        ],
      },
      SeverityofRisk: {
        type: "string",
        title: "Severity of Risk",
        enum: ["Acute", "chronic"],
      },
      PotentialImpact: {
        type: "string",
        title: "Potential Impact",
        enum: [
          "Increased or decreased capital costs",
          "Increased or decreased operational costs",
          "Increased or decreased demand for products and services",
          "Increased or decreased capital availability and investment opportunities",
          "Increased or decreased investment opportunities",
          "Others (please specify)",
        ],
      },
      Likelihoodofimpact: {
        type: "string",
        title: "Likelihood of impact",
        enum: ["Low", "Moderate", "High", "Not Sure"],
      },
      
      MagnitudeofImpact: {
        type: "string",
        title: "Magnitude of Impact",
        enum: ["Low", "Moderate", "High", "Not Sure"],
      },
      FinancialEffect: {
        type: "string",
        title: "Financial Effect",
        enum: ["Very High", "High", "Moderate", "Low", "Very Low"],
      },

      FinancialImplications: {
        type: "string",
        title: "Financial Implications",
        enum: [
          "Increased maintenance costs",
          "Potential fines and revenue loss",
          "Higher premiums",
          "Reduced energy costs",
          "Decreased sales revenue",
          "Others (please specify)",
        ],
      },
      ProcessDescription: {
        type: "string",
        title: "Process Description",
      },
      ManagementMethods: {
        type: "string",
        title: "Management Methods",
        enum: [],
      },
      TimeFrame: {
        type: "string",
        title: "Time Frame",
        enum: [
          "Immediate-term (0-1 year)",
          "Short-term (1-3 years)",
          "Medium-term (3-5 years)",
          "Long-term (5+ years)",
        ],
      },
      DirectImpacts: {
        type: "string",
        title: "Direct or Indirect Impacts",
        enum: ["Indirect", "Direct", "Not Sure"],
      },
      ImplementedMitigationStrategies: {
        type: "string",
        title: "Implemented Mitigation Strategies",
        enum: ["Yes", "No"],
      },
      MitigationStrategies: {
        type: "string",
        title: "Mitigation Strategies",
        enum: [],
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        key: "TypeofRisk",
        title: "Type of Risk",
        tooltip:
          "Please choose the specific type of risk within the selected category",
        tooltipdisplay: "block",
      },
      {
        key: "SeverityofRisk",
        title: "Severity of Risk",
        tooltip: "Indicate the severity of the selected risk.",
        tooltipdisplay: "block",
      },
      {
        key: "PotentialImpact",
        title: "Potential Impact",
        tooltip:
          "Please identify all potential impacts associated with the selected risk.",
        tooltipdisplay: "block",
      },
      {
        key: "Likelihoodofimpact",
        title: "Likelihood of impact",
        tooltip:
          "Please specify the probability of the impact of the risk on the organization.",
        tooltipdisplay: "block",
      },
      {
        key: "MagnitudeofImpact",
        title: "Magnitude of Impact",
        tooltip:
          "Indicate the estimated magnitude of the impact of the chosen risk.",
        tooltipdisplay: "block",
      },
      {
        key: "FinancialEffect",
        title: "Financial Effect",
        tooltip:
          "Indicate the estimated magnitude of the financial impact of the chosen risk",
        tooltipdisplay: "block",
      },

      {
        key: "FinancialImplications",
        title: "Financial Implications",
        tooltip:
          "Please describe the specific financial consequences that may result from the chosen risk.",
        tooltipdisplay: "block",
      },
      {
        key: "ProcessDescription",
        title: "Process Description",
        tooltip:
          "Provide a description of the process(es) used to determine financial impact on the organization based on the mentioned risk.",
        tooltipdisplay: "block",
      },
      {
        key: "ManagementMethods",
        title: "Management Methods",
        tooltip:
          "Select the strategies and actions the organization will implement to manage and mitigate the chosen risk.",
        tooltipdisplay: "block",
      },
      {
        key: "TimeFrame",
        title: "Time Frame",
        tooltip:
          "Please indicate the expected period for the selected risk to materialize.",
        tooltipdisplay: "block",
      },
      {
        key: "DirectImpacts",
        title: "Direct or Indirect Impacts",
        tooltip:
          "Please specify whether the impacts of the selected risk on the organization are direct,indirect, or uncertain.",
        tooltipdisplay: "block",
      },
      {
        key: "ImplementedMitigationStrategies",
        title: "Implemented Mitigation Strategies",
        textdriction: "start",
        tooltip:
          "Indicate whether any mitigation strategies have already been implemented for the chosen risk (Yes/No).",
        tooltipdisplay: "block",
      },
      {
        key: "MitigationStrategies",
        title: "Mitigation Strategies",
        tooltip:
          "If yes, Please select the actions taken by the organization to mitigate or reduce the selected risk.",
        tooltipdisplay: "block",
      },
    ],
  },
};

const Screen1 = ({
  selectedOrg,
  selectedCorp,
  selectedLocation,
  year,
  tcfdtag = [],
  frameworkId,
  togglestatus,
}) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  console.log(frameworkId, "frameworkId test");
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    setFormData(e.formData);
  };

  const updateFormData = async () => {
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      corporate: selectedCorp,
      organisation: selectedOrg,
      year,
      location: selectedLocation,
    };
    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status === 200) {
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
        loadFormData();
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
    // console.log('Response:', response.data);
    // } catch (error) {
    // console.error('Error:', error);
    // }
  };

  const loadFormData = async () => {
    console.log("loadFormData screen 2");
    LoaderOpen();
    setFormData([{}]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}&location=${selectedLocation}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
    } catch (error) {
      setFormData([{}]);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with:", {
      selectedOrg,
      year,
      togglestatus,
      selectedLocation,
      selectedCorp,
    });

    if (selectedOrg && year && togglestatus) {
      if (togglestatus === "Corporate") {
        if (selectedCorp) {
          console.log("Calling loadFormData for Corporate");
          loadFormData();
        } else {
          console.log("Clearing form data for Corporate");
          setFormData([{}]);
          setRemoteSchema({});
          setRemoteUiSchema({});
        }
      } else if (togglestatus === "Location") {
        if (selectedLocation) {
          console.log("Calling loadFormData for Location");
          loadFormData();
        } else {
          console.log("Clearing form data for Location");
          setFormData([{}]);
          setRemoteSchema({});
          setRemoteUiSchema({});
        }
      } else {
        console.log("Calling loadFormData for Other");
        loadFormData();
      }

      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        console.log("Toast should be shown");
        toastShown.current = true;
      }
    }
  }, [selectedOrg, year, selectedCorp, togglestatus, selectedLocation]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };

  return (
    <>
      <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md mt-8 xl:mt-0 lg:mt-0 md:mt-0 2xl:mt-0 4k:mt-0 2k:mt-0 "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[100%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Report the risks posed by climate change that have the potential
              to generate substantive changes in operations, revenue, or
              expenditure of the organisation including:
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e86`}
                data-tooltip-content="Mention risks posed by climate change that have the potential to generate substantive changes in operations, revenue, or expenditure of the organisation."
                className="mt-1.5 text-[15px] ml-[2px] w-[20%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id={`tooltip-$e86`}
                place="top"
                effect="solid"
                style={{
                  width: "290px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  textAlign: "left",
                }}
              ></ReactTooltip>
            </h2>
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Physical Risks
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e866`}
                data-tooltip-html="
             <p>Physical risks can include:</p>
              <ul>
                  <li>
                      • The impact of more frequent and intense storms;
                  </li>
                  <li>
                      • Changes in sea level, ambient temperature, and water availability;
                  </li>
                  <li>• Impacts on workers – such as health effects, including heat-related illness or disease, and the need to relocate operations.</li>
              </ul>

                "
                className="mt-1 ml-2 text-[14px]"
              />
              <ReactTooltip
                id={`tooltip-$e866`}
                place="top"
                effect="solid"
                style={{
                  width: "290px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                  textAlign: "left",
                }}
              ></ReactTooltip>
            </h2>
          </div>
          <div className="w-full xl:w-[20%] lg:w-[20%] md:w-[20%] 2xl:w-[20%] 4k:w-[20%] 2k:w-[20%] mb-4">
            <div
              className={`flex flex-wrap gap-2 items-center ${
                tcfdtag.length === 0 ? "justify-end" : "justify-end"
              }`}
            >
              {/* Static GRI tag */}
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg flex justify-center items-center">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight text-center">
                  GRI 201-2a
                </div>
              </div>

              {/* Dynamic TCFD tags */}
              {tcfdtag.map((item, index) => (
                <div
                  key={index}
                  className="w-[110px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg flex justify-center items-center"
                >
                  <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight text-center">
                    {item.tagName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-2 ">
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
            formContext={{
              colhadding: "Risk Category",
              colname: "Physical Risk",
              frameworkId,
              view: 1,
            }}
          />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              (!selectedCorp && togglestatus === "Corporate") ||
              (!selectedLocation && togglestatus === "Location") ||
              !selectedOrg ||
              !year
                ? "cursor-not-allowed opacity-90"
                : ""
            }`}
            onClick={handleSubmit}
            disabled={
              (togglestatus === "Corporate" && !selectedCorp) ||
              (togglestatus === "Location" && !selectedLocation) ||
              !selectedOrg ||
              !year
            }
          >
            Submit
          </button>
        </div>

        {/* <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !selectedOrg || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!selectedOrg || !year}
          >
            Submit
          </button>
        </div> */}
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

export default Screen1;
