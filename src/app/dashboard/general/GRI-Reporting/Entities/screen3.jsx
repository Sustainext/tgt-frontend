"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import TextareaWidget3 from "../../../../shared/widgets/Textarea/TextareaWidget3";
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
  TextareaWidget3: TextareaWidget3,
  RadioWidget2: RadioWidget2,
};

const view_path = "gri-social-product_labeling-417-1a-required";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Q1: {
        type: "string",
        title: "Does the organization consist of multiple entities?",
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
                  "If yes, then explain the approach used for consolidating information.",
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
    "ui:order": ["Q1", "Q2"],
    Q1: {
      "ui:title": "Does the organization consist of multiple entities?",
      "ui:tooltip":
        "Please select 'Yes' if  the organization have audited, consolidated financial statements or financial information filed on public record or select 'No' if not. ",
      "ui:tooltipdisplay": "none",
      "ui:widget": "RadioWidget2",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q2: {
      "ui:hading": "Approach used to consolidate information",
      "ui:hadingtooltip": "Approach used to consolidate information",
      "ui:hadingtooltipdisplay": "none",
      "ui:title":
        "If yes, then explain the approach used for consolidating information.",
      "ui:tooltip":
        "Include :i. whether the approach involves adjustments to information for minority interestsii. how the approach takes into account mergers, acquisitions and disposal of entities or parts of entities iii. whether and how the approach differs across the disclosures within GRI Standards and across material topics",
      "ui:tooltipdisplay": "block",
      "ui:widget": "TextareaWidget3",
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

const Screen3 = ({ selectedOrg, year, selectedCorp }) => {
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
      location,
      year,
      month,
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
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
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
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
            <h2 className="flex mx-2 text-[17px] text-gray-500 font-semibold">
            Multiple entities
              {/* <MdInfoOutline data-tooltip-id={`tooltip-employees`}
                data-tooltip-content="This section documents the data corresponding to the r product and
service information and labeling.
Include:
i.The sourcing of components of the product or service;
ii. Content, particularly with regard to substances that might produce an
environmental or social impact;
iii. Safe use of the product or service;
iv. Disposal of the product and environmental or social impacts.
 " className="mt-1.5 ml-2 text-[14px]" />
              <ReactTooltip id={`tooltip-employees`} place="top" effect="solid" style={{
                width: "290px", backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: 'left',
              }}>
              </ReactTooltip> */}
            </h2>
          </div>

          <div className={`${open ? "w-[20%]" : "w-[20%]"}`}>
            <div className={`flex float-end`}>
              <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 ">
                <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                  GRI 2-2-b
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
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

export default Screen3;
