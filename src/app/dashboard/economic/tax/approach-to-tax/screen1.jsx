"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CommoninputWidget from "../../../../shared/widgets/Input/commoninputWidget";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import RichtextWidget from "../../../../shared/widgets/Economic/RichtextWidget";
const widgets = {
  inputWidget: CommoninputWidget,
  inputWidget2: inputWidget2,
  RichtextWidget: RichtextWidget,
};

const view_path = "gri-economic-approach_to_tax-207-1a";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        title: "Does your organisation have a tax strategy?",
        enum: ["Yes", "No"],
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
                  "Explain the outcome of public legal cases regarding corruption brought against the organization or its employees during the reporting period.",
              },
              Q3: {
                type: "string",
                title:
                  "Mention the governance body or executive-level position within the organization that formally reviews and approves the tax strategy.",
              },
              Q4: {
                type: "string",
                title: "Mention the frequency the tax strategy review.",
              },
              Q5: {
                type: "string",
                title:
                  "Please provide a description of the approach your organisation takes for tax related  regulatory compliance",
              },
              Q6: {
                type: "string",
                title:
                  "Please provide a description of the approach your organisation takes for tax related  regulatory compliance",
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
      "ui:title": "Does your organisation have a tax strategy?",
      "ui:tooltip": "Indicate whether your organisation has a tax strategy. ",
      "ui:tooltipdisplay": "none",
      "ui:titledisplay": "none",
      "ui:widgetType": "radio",
      "ui:inputfildtype": "text",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q2: {
      "ui:title":
        "Provide a link to the tax strategy if it is publicly available. ",
      "ui:tooltip":
        "Provide a link to the tax strategy if it is publicly available and if the organization has a tax strategy but the strategy is not publicly available, the organization can provide an abstract or summary of the strategy.",
      "ui:tooltipdisplay": "block",
      "ui:titledisplay": "block",
      "ui:widgetType": "inputtext",
      "ui:inputfildtype": "text",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q3: {
      "ui:title":
        "Mention the governance body or executive-level position within the organization that formally reviews and approves the tax strategy.",
      "ui:tooltip":
        "Provide a link to the tax strategy if it is publicly available and if the organization has a tax strategy but the strategy is not publicly available, the organization can provide an abstract or summary of the strategy.",
      "ui:tooltipdisplay": "none",
      "ui:titledisplay": "block",
      "ui:widget": "RichtextWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q4: {
      "ui:title": "Mention the frequency the tax strategy review.",
      "ui:tooltip":
        "Provide a link to the tax strategy if it is publicly available and if the organization has a tax strategy but the strategy is not publicly available, the organization can provide an abstract or summary of the strategy.",
      "ui:tooltipdisplay": "none",
      "ui:titledisplay": "block",
      "ui:widgetType": "input",
      "ui:inputfildtype": "text",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q5: {
      "ui:title":
        "Please provide a description of the approach your organisation takes for tax related  regulatory compliance",
      "ui:tooltip":
        "Describe organisation's approach to regulatory compliance.",
      "ui:tooltipdisplay": "block",
      "ui:titledisplay": "block",
      "ui:widgetType": "textarea",
      "ui:inputfildtype": "text",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q6: {
      "ui:title":
        "How is the tax approach linked to the business and sustainable development strategies of the organization?",
      "ui:tooltip":
        "<p>When describing how its approach to tax is linked to its business strategy, the organization can explain how its tax planning is aligned with its commercial activities. When describing how its approach to tax is linked to its sustainable development strategy, the organization can explain the following:</p><ul><li>•Whether it considered the economic and social impacts of its approach to tax when developing its tax strategy.</li><li> • Any organizational commitments to sustainable development in the jurisdictions in which it operates and whether its approach to tax is aligned with these commitments.</li></ul>",
      "ui:tooltipdisplay": "block",
      "ui:titledisplay": "block",
      "ui:widget": "RichtextWidget",
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
      newFormData.Q3 = "";
      newFormData.Q4 = "";
      newFormData.Q5 = "";
      newFormData.Q6 = "";
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
      } else if (togglestatus === "Corporate" && !selectedCorp) {
        setFormData([{}]);
        setRemoteSchema({});
        setRemoteUiSchema({});
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
    e.preventDefault();
    updateFormData();
    console.log("test form data", formData);
  };

  return (
    <>
      <div
        className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md "
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
              Does your organisation have a tax strategy?
              <MdInfoOutline
                data-tooltip-id={`es30`}
                data-tooltip-html="Indicate whether your organisation has a tax strategy. "
                className="mt-1.5 ml-2 text-[15px]"
              />
              <ReactTooltip
                id={`es30`}
                place="top"
                effect="solid"
                style={{
                  width: "390px",
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
                  GRI 207-1a
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
