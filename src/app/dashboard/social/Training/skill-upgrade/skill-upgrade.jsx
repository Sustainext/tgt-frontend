"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from '@/app/utils/axiosMiddleware'

const widgets = {
  inputWidget: inputWidget2,
  RadioWidget2: RadioWidget2,
};

const view_path = "gri-social-skill_upgrade-403-9c-9d-programs";
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
          "Does the organization ensure the quality of these services and facilitate workers access",
        enum: ["Yes", "No"],
      },
      Q2: {
        type: "string",
        title: "Describe type of program and its scope",
      },

      Q3: {
        type: "string",
        title:
          "Describe the programs provided to facilitate continued employability",
      },
      Q4: {
        type: "string",
        title:
          "Describe assistance programs to manage career endings resulting from retirement or termination",
      },
    },
  },
};

const Screen1 = ({ selectedOrg, selectedCorp, year, month }) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const { open } = GlobalState();
  const uiSchema = {
    items: {
      "ui:order": ["Q1", "Q2", "Q3", "Q4"],
      Q1: {
        "ui:title": "Are there programs provided to upgrade employee skills?",
        "ui:tooltip":
          "Select 'Yes' if there are any programs provided to upgrade employee skills and select 'No' if not. ",
        "ui:tooltipdisplay": "block",
        "ui:widget": "RadioWidget2",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      Q2: {
        "ui:title": "Describe type of program and its scope",
        "ui:tooltip":
          "Provide a description of type of program provided and its scope. ",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
          classNames: formData[0]?.Q1 === "Yes" ? "" : "hidden",
        },
      },
      Q3: {
        "ui:title":
          "Describe the programs provided to facilitate continued employability",
        "ui:tooltip":
          "Describe the programs provided to facilitate continued employability",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
          classNames: formData[0]?.Q1 === "Yes" ? "" : "hidden",
        },
      },
      Q4: {
        "ui:title":
          "Describe assistance programs to manage career endings resulting from retirement or termination",
        "ui:tooltip":
          "Please provide a description of assistance programs to manage career endings resulting from retirement or termination.",
        "ui:tooltipdisplay": "block",
        "ui:widget": "inputWidget",
        "ui:horizontal": true,
        "ui:options": {
          label: false,
          classNames: formData[0]?.Q1 === "Yes" ? "" : "hidden",
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
    // console.log('Response:', response.data);
    // } catch (error) {
    // console.error('Error:', error);
    // }
  };

  const loadFormData = async () => {
    LoaderOpen();
    setFormData([{}]);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}&month=${month}`;
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

  // fetch backend and replace initialized forms
  useEffect(() => {
    if (selectedOrg && year && month) {
      loadFormData();
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
      }
    }
  }, [selectedOrg, year, month,selectedCorp]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
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
              Programs for upgrading employee skills
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents the data corresponding to the
type and scope of programs implemented and assistance
provided to upgrade employee skills."
                className="mt-1.5 ml-2 text-[14px]"
              />
              <ReactTooltip
                id={`tooltip-$e1`}
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

          <div className={`${open ? "w-[20%]" : "w-[20%]"}`}>
            <div className={`flex float-end`}>
              <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2 ">
                <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                  GRI 403-9c
                </p>
              </div>
              <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
                <p className="text-[#395f81] text-[10px] inline-block align-middle px-2 font-semibold">
                  GRI 403-9d
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <Form
            schema={r_schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
          />
        </div>
        <div className="mb-6">
        <button type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${!selectedOrg || !year || !month ? "cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={!selectedOrg || !year || !month}
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
