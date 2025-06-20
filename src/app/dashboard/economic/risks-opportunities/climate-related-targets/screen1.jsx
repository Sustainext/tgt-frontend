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
import MultiselectTableWidget from "../../../../shared/widgets/Table/MultiselectTableWidget";
const widgets = {
  TableWidget: MultiselectTableWidget,
};

const view_path = "economic-climate-risks-and-opportunities-climate-related-targets";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      RelatedTarget: {
        type: "string",
        title: "Key Metric for Climate Related Target",
        enum: [
          "Scope 1 Emissions",
          "Scope 2 Emissions",
          "Scope 3 Emissions",
          "Others (please specify)",
        ],
      },

      MetricCategory: {
        type: "string",
        title: "Target Metric Category",
        enum: [
          "GHG Emissions",
          "Transition Risks",
          "Physical Risks",
          "Reputational risks",
          "Climate Related Opportunities",
          "Capital Deployment",
          "Internal Carbon Prices",
          "Remuneration",
          "Others (please specify)",
        ],
      },
      TargetType: {
        type: "string",
        title: "Target Type",
        enum: ["Absolute", "Intensity based"],
      },
      MetricUnit: {
        type: "string",
        title: "Metric Unit",
        texttype: "text",
      },
      BaseYear: {
        type: "string",
        title: "Base Year",
        texttype: "text",
      },

      BaselineValue: {
        type: "string",
        title: "Baseline Value",
        texttype: "text",
      },
      TargetTimeFrame: {
        type: "string",
        title: "Target Time Frame",
        texttype: "text",
      },
      TargetValue: {
        type: "string",
        title: "Target Value",
        texttype: "text",
      },
      TargetGoals: {
        type: "string",
        title: "Target Goals",
        texttype: "text",
      },
      PerformanceIndicators: {
        type: "string",
        title: "Key Performance Indicators",
        texttype: "text",
      },
      MethodologyUsed: {
        type: "string",
        title: "Methodology Used",
        texttype: "text",
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        key: "RelatedTarget",
        title: "Key Metric for Climate Related Target",
        tooltip:
          "Specify the key metric used to set the target and track progress.",
        layouttype: "select",
      },
      {
        key: "MetricCategory",
        title: "Target Metric Category",
        tooltip: "Indicate the broad category the target falls under.",
        layouttype: "multiselect",
      },
      {
        key: "TargetType",
        title: "Target Type",
        tooltip:
          "Select whether the target is absolute (total change) or intensity based (change per unit of business activity)",
        layouttype: "select",
      },
      {
        key: "MetricUnit",
        title: "Metric Unit",
        tooltip: "Specify the unit of measurement for the key metric.",
        layouttype: "input",
      },
      {
        key: "BaseYear",
        title: "Base Year",
        tooltip: "Select the base year for the target.",

        layouttype: "baseyer",
      },
      {
        key: "BaselineValue",
        title: "Baseline Value ",
        tooltip: "Specify the metric value for the base year.",
        layouttype: "input",
      },
      {
        key: "TargetTimeFrame",
        title: "Target Year",
        tooltip: "Select the timeframe to achieve the specified target.",
 
        layouttype: "targetyear",
      },
      {
        key: "TargetValue",
        title: "Target Value",
        tooltip: "Specify the target metric value.",
        layouttype: "input",
      },
      {
        key: "TargetGoals",
        title: "Target Goals",
        tooltip:
          "Describe any regulatory requirements or market constraints or other goals (may include efficiency or financial goals, financial loss tolerances, avoided GHG emissions through the entire product life cycle, or net revenue goals for products and services designed for a low-carbon economy) linked to the specified target.",
        layouttype: "multilinetextbox",
      },
      {
        key: "PerformanceIndicators",
        title: "Key Performance Indicators",
        tooltip:
          "List the key performance indicators used to used to assess progress against the specified target.",
        layouttype: "multilinetextbox",
      },
      {
        key: "MethodologyUsed",
        title: "Methodology Used",
        tooltip:
          "Describe the methodologies used to set the sepcified climate related target.",
        layouttype: "multilinetextbox",
      },
    ],
  },
};
const Screen1 = ({ selectedOrg, year, selectedCorp, togglestatus }) => {
  const initialFormData = [
    {
      RelatedTarget: "",
      MetricCategory: [],
      TargetType: "",
      MetricUnit: "",
      BaseYear: "",
      BaselineValue: "",
      TargetTimeFrame: "",
      TargetValue: "",
      TargetGoals: "",
      PerformanceIndicators: "",
      MethodologyUsed: "",

    },
  ];
  const [formData, setFormData] = useState(initialFormData);
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
    LoaderOpen();
    setFormData([{}]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
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
  if (selectedOrg && year && togglestatus) {
    if (togglestatus === "Corporate") {
      if (selectedCorp) {
        loadFormData();           
      } else {
        setFormData([{}]); 
        setRemoteSchema({});
        setRemoteUiSchema({});       
      }
    } else {
      loadFormData();             
    }
    toastShown.current = false;
  } else {
    if (!toastShown.current) {
      toastShown.current = true;
    }
  }
}, [selectedOrg, year, selectedCorp, togglestatus]);

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
              Targets used to manage climate related risks and opportunities and
              performance against targets.
              {/* <MdInfoOutline
                data-tooltip-id={`tooltip-$e86`}
                data-tooltip-content="This section documents data corresponding to the organization's processes for investigating work-related incidents."
                className="mt-1.5 ml-2 text-[15px]"
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
              ></ReactTooltip> */}
            </h2>
          </div>

          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[90px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  TCFD-M&T-C
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
          />
        </div>

    <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              (!selectedCorp && togglestatus === "Corporate") ||
              !selectedOrg ||
              !year
                ? "cursor-not-allowed opacity-90"
                : ""
            }`}
            onClick={handleSubmit}
            disabled={
              (togglestatus === "Corporate" && !selectedCorp) ||
              (togglestatus !== "Corporate" && (!selectedOrg || !year))
            }
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

export default Screen1;
