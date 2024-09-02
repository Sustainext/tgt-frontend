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
import Economictable from "../../../../../shared/widgets/Economic/economictable";
// Simple Custom Table Widget
const widgets = {
  TableWidget: Economictable,
};

const view_path = "gri-general-workforce_other_workers-workers-2-8-a";
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
          "Regulatory changes",
          "Market shifts",
          "Technology changes",
          "Reputational risks",
          "Legal risks",
          "Energy transition",
          "Investor Pressure",
          "Consumer Preference Changes",
          "Supply chain disruptions",
          "Corporate governance changes",
        ],
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
      ManagementMethods: {
        type: "string",
        title: "Management Methods",
        enum: [
          "Business continuity planning",
          "Diversification of supply chain",
          "Infrastructure improvements",
          "Insurance coverage",
          "Emergency response planning",
          "Others (please specify)",
        ],
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
        enum: [
          "Installation of early warning systems",
          "Community engagement and education",
          "Investment in resilient infrastructure",
          "Enhanced weather monitoring",
          "Improved drainage systems",
          "Structural reinforcements",
          "Emergency preparedness programs",
          "Backup power systems",
          "Others (please specify)",
        ],
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
          key: "FinancialImplications ",
          title: "Financial Implications",
          tooltip:
            "Please describe the specific financial consequences that may result from the chosen risk.",
          tooltipdisplay: "block",
        },
        {
          key: "ManagementMethods ",
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
const Screen3 = ({ selectedOrg, selectedCorp, location, year, month }) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);

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
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
    try {
      const response = await axiosInstance.get(url);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      setFormData(response.data.form_data[0].data);
    } catch (error) {
      setFormData(initialFormData);
    } finally {
      LoaderClose();
    }
  };

  useEffect(() => {
    if (selectedOrg && year) {
      loadFormData();
      toastShown.current = false;
    } else {
      if (!toastShown.current) {
        toastShown.current = true;
      }
    }
  }, [selectedOrg, year, selectedCorp]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    // updateFormData();
  };

  return (
    <>
      <div
        className="mx-2 p-3 mb-6 pb-6 rounded-md "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[17px] text-gray-500 font-semibold mb-2">
            Report the opportunitites posed by climate change that have the potential to generate substantive changes in operations, revenue, or expenditure of the organisation including:
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e88`}
                data-tooltip-content="Mention risks posed by climate change that have the potential to generate
substantive changes in operations, revenue, or expenditure of the organisation. "
                className="mt-1.5 ml-2 text-[24px]"
              />
              <ReactTooltip
                id={`tooltip-$e88`}
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

          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 201-2a
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2 ">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}

          />
        </div>

        <div className="mb-6">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !selectedOrg || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            // disabled={!selectedOrg || !year}
          >
            Submit
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
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  );
};

export default Screen3;
