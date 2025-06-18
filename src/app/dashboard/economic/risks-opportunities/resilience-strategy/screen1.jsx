"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";

const widgets = {
  inputWidget: inputWidget2,
  RadioWidget2: RadioWidget2,
};

const view_path = "economic-climate-risks-and-opportunities-resilience-of-the-organisations-strategy";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        title:
          "Has your organization conducted a climate-related scenario analysis to assess the resilience of its strategy?",
        enum: ["Yes", "No"],
      },

      Q3: {
        type: "string",
        title:
          "Describe how your organization’s strategy is resilient to climate-related risks and opportunities,including in a 2°C or lower scenario.",
      },

      Q4: {
        type: "string",
        title:
          "Where might your organisation's strategy be affected by climate-related risks or opportunities?",
      },
      Q5: {
        type: "string",
        title:
          "How is your organization’s strategy expected to evolve in response to identified climate-related risks and opportunities?",
      },
      Q6: {
        type: "string",
        title:
          "How resilient is your organisation's strategy to climate-related issues considering potential impacts on financial planning under different climate scenarios?",
      },
    },
    dependencies: {
      Q1: {
        oneOf: [
          {
            properties: {
              Q1: {
                enum: ["Yes"],
              },
              Q2: {
                type: "string",
                title:
                  "If yes, please describe climate related scenario(s) and associated time horizon(s) considered.",
              },
            },
          },
        ],
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
 Q1: {
      "ui:title":
        "Does the Board and/or Board Committees consider climate-related issues when reviewing and guiding key strategic and governance decisions?",
      "ui:tooltip":
        "If climate-related issues are considered in the following areas: Reviewing and guiding strategy, major plans of action, risk management policies, annual budgets, and business plans as well as setting the organization’s performance objectives, monitoring implementation and performance, and overseeing major capital expenditures, acquisitions, and divestitures, etc.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "RadioWidget2",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q2: {
      "ui:title":
        "If yes, please describe climate related scenario(s) and associated time horizon(s) considered.",
      "ui:tooltip":
        "Provide details about the climate scenarios used and specify the time frames (short-, medium-, or long-term) over which these scenarios were assessed.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q3: {
      "ui:title":
        "Describe how your organization’s strategy is resilient to climate-related risks and opportunities, including in a 2°C or lower scenario.",
      "ui:tooltip":
        "Describe how resilient organisation's strategies are to climate-related risks and opportunities, taking into consideration a transition to a low-carbon economy consistent with a 2°C or lower scenario.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q4: {
      "ui:title":
        "Where might your organisation's strategy be affected by climate-related risks or opportunities?",
      "ui:tooltip":
        "Mention the specific parts of your organization’s strategy such as operations, supply chain, markets, or product offerings that could be influenced by climate-related risks (like extreme weather) or opportunities (such as demand for low-carbon products). ",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q5: {
      "ui:title":
        "How is your organization’s strategy expected to evolve in response to identified climate-related risks and opportunities?",
      "ui:tooltip":
        "Describe planned changes or adjustments to your strategy in response to identified climate-related risks and opportunities. Include potential shifts in operations, products, or business models.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q6: {
      "ui:title":
        "How resilient is your organisation's strategy to climate-related issues considering potential impacts on financial planning under different climate scenarios?",
      "ui:tooltip":
        "<p>Describe how your organization’s strategy is designed to maintain or strengthen financial performance (e.g., revenues, costs) and financial position (e.g., assets, liabilities) when tested against future climate scenarios, such as a 2°C or lower pathway.</p> <p>Note: Include insights from any scenario analysis conducted.</p>",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },

    "ui:options": {
      orderable: false,
      addable: false,
      removable: false,
      layout: "horizontal",
    },
  },
};

const Screen1 = ({ selectedOrg, year, selectedCorp, togglestatus }) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleChange = (e) => {
    let newFormData = { ...e.formData[0] };
    if (newFormData.Q1 === "No") {
      newFormData.Q2 = "";
    }
    setFormData([newFormData]);
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
        if (togglestatus === "Corporate" && selectedCorp) {
          loadFormData();
        }  else {
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
    e.preventDefault();
    updateFormData();
    console.log("test form data", formData);
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
              Strategy Resilience to Climate-Related Risks and Opportunities
              <MdInfoOutline
                data-tooltip-id={`tooltip-employees`}
                data-tooltip-content="This section documents data corresponding to how the organization’s strategy addresses climate-related risks and opportunities. It also explores how resilient your strategy is under different climate scenarios, including transition and physical risks."
                className="mt-1.5 ml-2 text-[15px] w-[10%] xl:w-[5%] md:w-[5%] lg:w-[5%] 2xl:w-[5%] 3xl:w-[5%] 4k:w-[5%] 2k:w-[5%]"
              />
              <ReactTooltip
                id={`tooltip-employees`}
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
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[80px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight text-center">
                  TCFD-STG-C
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
