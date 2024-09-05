"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CommoninputWidget from "../../../../shared/widgets/Input/commoninputWidget";
import inputWidget3 from "../../../../shared/widgets/Input/inputWidget3";
import WithhaddinginputWidget from "../../../../shared/widgets/Input/WithhaddinginputWidget";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";

const widgets = {
  inputWidget: CommoninputWidget,
  inputWidget3: inputWidget3,
  WithhaddinginputWidget: WithhaddinginputWidget,
};

const view_path = "gri-economic-anti_competitive_behavior-206-1a-behavior";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        title: "Is any government present in the shareholding structure?",
        enum: ["Yes", "No"],
      },
      Q4: {
        type: "string",
        title:
          "Number of violations of antitrust and monopoly legislation in which the organization has been identified as a participant.",
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
                title: "Legal action(s) pending ",
              },
              Q3: {
                type: "string",
                title: "Legal action(s) completed",
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
    "ui:order": ["Q1", "Q2", "Q3", "Q4"],
    Q1: {
      "ui:title":
        "Is there a system to calculate the financial implications or costs, or to make revenue projections?",
      "ui:tooltip":
        "What is the significance of the indirect economic impacts in the context of external benchmarks and stakeholder priorities, such as national and international standards, protocols, and policy agendas?",
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
      "ui:hading":
        "If yes, pleas specify the number of legal actions pending or completed during the reporting period regarding anti-competitive behavior.",
      "ui:hadingtooltip":
        "Specify the number of public legal cases regarding corruption brought against the organization or its employees during the reporting period ",
      "ui:hadingtooltipdisplay": "block",
      "ui:title": "Legal action(s) pending ",
      "ui:tooltip":
        " Please specify what has been assured and on what basis it has been assured.",
      "ui:tooltipdisplay": "none",
      "ui:widget": "WithhaddinginputWidget",
      "ui:inputfildtype": "number",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q3: {
      "ui:hading": "",
      "ui:hadingtooltip": "",
      "ui:hadingtooltipdisplay": "none",
      "ui:title": "Legal action(s) completed ",
      "ui:tooltip":
        " Please specify what has been assured and on what basis it has been assured.",
      "ui:tooltipdisplay": "none",
      "ui:widget": "WithhaddinginputWidget",
      "ui:inputfildtype": "number",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q4: {
      "ui:title":
        "Number of violations of antitrust and monopoly legislation in which the organization has been identified as a participant.",
      "ui:tooltip":
        "<ul><li>i) Anti-competitive behavior: action of the organization or employees that can result in collusion with potential competitors, with the purpose of limiting the effects of market competition.</li><li> ii) Anti-trust and monopoly practice: action of the organization that can result in collusion to erect barriers for entry to the sector, or another collusive action that prevents competition.</li></ul>",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget3",
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

const Screen1 = ({ selectedOrg, year, selectedCorp }) => {
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
    e.preventDefault();
    updateFormData();
    console.log("test form data", formData);
  };

  return (
    <>
      <div
        className="mx-2  p-3 mb-6 pb-6 rounded-md"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 text-[15px] text-gray-500 font-semibold">
              Are there any legal actions pending or completed in the
              organisation during the reporting period regarding
              anti-competitive behavior?
              <MdInfoOutline
                data-tooltip-id={`es88`}
                data-tooltip-html="
                              <ul>
                    <li>
                        Indicate if there are any legal actions pending or completed in the organisation during the reporting period regarding anti-competitive behavior.
                    </li>
                    <li>
                        i) Anti-competitive behavior: action of the organization or employees that can result in collusion with potential competitors, with the purpose of limiting the effects of market competition.
                    </li>
                    <li>
                        ii) Anti-trust and monopoly practice: action of the organization that can result in collusion to erect barriers for entry to the sector, or another collusive action that prevents competition.
                    </li>
                </ul>
                "
                className="mt-1.5 ml-2 text-[18px]"
              />
              <ReactTooltip
                id={`es88`}
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
                  zIndex:"100",
                }}
              ></ReactTooltip>
            </h2>
          </div>
          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 206-1a
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

export default Screen1;
