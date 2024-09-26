"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
const widgets = {
  inputWidget: inputWidget2,
};

const view_path = "gri-general-business_details-value-2-6b";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        title: "Activities",
      },
      Q2: {
        type: "string",
        title: "Products",
      },
      Q3: {
        type: "string",
        title: "Services",
      },
      Q4: {
        type: "string",
        title: "Markets Served",
      },
      Q5: {
        type: "string",
        title: "Supply chain",
      },
      Q6: {
        type: "string",
        title: "Entities downstream from the organization & their activities",
      },
    },
  },
};

const uiSchema = {
  items: {
    "ui:order": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
    Q1: {
      "ui:title": "Activities",
      "ui:tooltip":
        "Please specify the activities carried out by the organization. While describing activities , please mention the total number of operations and explain how the organization defines ‘operation’.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q2: {
      "ui:title": "Products",
      "ui:tooltip":
        "Please describe the quantity of products provided during the reporting period (e.g., the number of products provided, net sales of products provided). whether the organization sells products that are banned in certain markets or are the subject of stakeholder concerns or public debate, including the reason for the ban or concerns and how the organization has responded to these concerns.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q3: {
      "ui:title": "Services",
      "ui:tooltip":
        "Please describe the services that organization offers. While describing the services, please mention the quantity of  services provided during the reporting period (e.g., number of services provided, net sales of services provided). Whether the organization sells services that are banned in certain markets or are the subject of stakeholder concerns or public debate, including the reason for the ban or concerns and how the organization has responded to these concerns.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q4: {
      "ui:title": "Markets Served",
      "ui:tooltip":
        "Please describe the market served by the organization. This description could include the geographic locations where products and services are offered; the demographic or other characteristics of the markets; information on the size and relative importance of the markets (e.g., net sales, net revenues).",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q5: {
      "ui:title": "Supply chain",
      "ui:tooltip":
        "Please describe the following:<ul> <li>• The types of suppliers (e.g., brokers, contractors, wholesalers); the estimated number of suppliers throughout its supply chain and in each tier (e.g., first tier, second tier)</li><li>• The types of activities related to the organization’s products and services carried out by its suppliers (e.g., manufacturing, providing consulting services)</li><li>• The nature of its business relationships with its suppliers (e.g., long-term or short-term, contractual or non-contractual, project-based or event-based)</li><li>• The estimated monetary value of payments made to its suppliers</li><li>• The geographic location of its suppliers.</li></ul>",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },

    Q6: {
      "ui:title":
        "Entities downstream from the organization & their activities",
      "ui:tooltip":
        "Please describe the entities downstream from the organization & their activities. The description can include:<ul> <li>1) the types of downstream entities (e.g., customers, beneficiaries)</li><li> 2)the estimated number of downstream entities</li><li> 3) the types of activities related to the organization’s products and services carried out by the downstream entities (e.g., manufacturing, wholesale, retail)</li><li> 4) the nature of its business relationships with the downstream entities (e.g., long-term or short-term, contractual or non-contractual, project-based or event-based)</li><li> 5) the geographic location of the downstream entities.</li></ul>",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },

    "ui:options": {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: "horizontal", // Set layout to horizontal
    },
  },
};

const Screen2 = ({ selectedOrg, year, selectedCorp }) => {
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
        className="mx-2 p-3 mb-6 pb-6 rounded-md"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
      >
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
            <h2 className="flex mx-2 ext-[15px] text-[#344054] font-bold">
              Value Chain
              <MdInfoOutline
                data-tooltip-id={`tooltip-144`}
                data-tooltip-html="This section documents data corresponding
to the organization's value chain.

Include: Organization's activity,
product, services, markets served,
supply chain , entities downstream from the
organization & their activities  "
                className="mt-1.5 ml-2 text-[14px]"
              />
              <ReactTooltip
                id={`tooltip-144`}
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
            <p className="flex mx-2 text-[13px] text-gray-500 font-semibold mb-2">
              Please describe the organization's value chain -
              <MdInfoOutline
                data-tooltip-id={`tooltip-145`}
                data-tooltip-html="Provide a description of organization's value chain including organization's activity, product, services,
markets served, supply chain and entities downstream from the organization & their activities"
                className="mt-1 ml-2 text-[13px]"
              />
              <ReactTooltip
                id={`tooltip-145`}
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
            </p>
          </div>

          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 2-6b
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-2 mb-3">
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
            disabled={!selectedOrg || !year}
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

export default Screen2;
