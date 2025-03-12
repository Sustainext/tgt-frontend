"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import inputWidget2 from "../../../../shared/widgets/Input/inputWidget2";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import RadioWidget from "../../../../shared/widgets/Input/radioWidget";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/app/utils/axiosMiddleware";
import CheckboxWidget3 from "../../../../shared/widgets/Input/checkboxWidget3";
import RadioWidget2 from "../../../../shared/widgets/Input/radioWidget2";
const widgets = {
  inputWidget: inputWidget2,
  RadioWidget: CheckboxWidget3,
  RadioWidget2: RadioWidget2,
};

const view_path = "gri-social-ohs-403-1a-ohs_management_system";
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
          "Has an Occupational Health & Safety Management System been implemented?",
        format: "textarea",
      },
      Q2: {
        type: "string",
        title: "Reason for implementation",
        enum: [
          "Compliance with legal requirements",
          "Adherence to industry standards",
          "Risk management and accident prevention",
          "Improvement of worker safety and well-being",
          "Enhancing corporate social responsibility",
        ],
      },
      Q3: {
        type: "string",
        title: "List of legal requirements (if applicable)",
        format: "textarea",
      },
      Q4: {
        type: "string",
        title: "Standards/Guidelines",
        enum: ["Yes", "No"],
      },
    },
    dependencies: {
      Q4: {
        oneOf: [
          {
            properties: {
              Q4: {
                enum: ["Yes"],
              },
              Q5: {
                type: "string",
                title: "List of Standards/Guidelines (if applicable)",
                format: "textarea",
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
    "ui:order": ["Q1", "Q2", "Q3", "Q4", "Q5"],
    Q1: {
      "ui:title":
        "Has an Occupational Health & Safety Management System been implemented?",
      "ui:tooltip":
        "Please indicate whether you have a formal Occupational Health & Safety Management System implemented.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q2: {
      "ui:title": "Reason for implementation",
      "ui:tooltip":
        "Please explain the primary reason for implementing the system. For example: Compliance with legal requirements, adherence to industry standards, risk management and accident prevention, improvement of worker safety and well-being, enhancing corporate social responsibility, etc.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "RadioWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q3: {
      "ui:title": "List of legal requirements (if applicable)",
      "ui:tooltip":
        "List any specific legal regulations or laws that influenced the decision to implement the Occupational Health and Safety Management system. Include applicable national, regional, or industry-specific laws related to occupational health and safety.",
      "ui:tooltipdisplay": "block",
      "ui:widget": "inputWidget",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q4: {
      "ui:title": "Standards/Guidelines",
      "ui:tooltip":
        "Indicate whether any recognized risk management or management system standards/guidelines were adopted in developing the system. Example: ISO 45001 (Occupational Health and Safety Management Systems)OHSAS 18001 (Occupational Health and Safety Assessment Series) National or industry-specific standards",
      "ui:tooltipdisplay": "block",
      "ui:widget": "RadioWidget2",
      "ui:horizontal": true,
      "ui:options": {
        label: false,
      },
    },
    Q5: {
      "ui:title": "List of Standards/Guidelines (if applicable)",
      "ui:tooltip":
        "Provide a detailed list of the specific standards/guidelines that are used.Example: ISO 45001: Occupational Health and Safety Management Systems OHSAS 18001: Occupational Health and Safety Assessment Series Canada Labour Code: Part II - Occupational Health and Safety EU Directives on Occupational Safety and Health: Framework Directive (89/391/EEC) ASEAN-OSHNET Guidelines: Good Practices Guidance on various OSH topics",
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
const validateRows = (data) => {
  const errors = {};
  data.forEach((row) => {
    if (!row.Q1) {
      errors.Q1 = "This field is required";
    }
    if (!row.Q2 || row.Q2.length === 0) {
      errors.Q2 = "This field is required";
    }

    if (
      row.Q2?.selected.includes("Compliance with legal requirements") &&
      !row.Q3
    ) {
      errors.Q3 = "This field is required";
    }

    if (row.Q2?.selected.includes("Risk management and accident prevention")) {
      if (!row.Q4) {
        errors.Q4 = "This field is required";
      }
      if (!row.Q5) {
        errors.Q5 = "This field is required";
      }
    }
  });
  return errors;
};

const Screen1 = ({ location, year }) => {
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);

  console.log(formData, "test error fromdata");
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleChange = (e) => {
    let newFormData = { ...e.formData[0] };
    if (newFormData.Q4 === "No") {
      newFormData.Q5 = "";
    }
    setFormData([newFormData]);
  };
  // const handleChange = (e) => {
  //   setFormData(e.formData);
  // };

  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      location,
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
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
    if (location && year) {
      loadFormData();
      toastShown.current = false; // Reset the flag when valid data is present
    } else {
      // Only show the toast if it has not been shown already
      if (!toastShown.current) {
        toastShown.current = true; // Set the flag to true after showing the toast
      }
    }
  }, [location, year]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateRows(formData);
    setValidationErrors(errors);

    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) {
      updateFormData();
    } else {
      console.log("validation error");
    }
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
              Occupational Health and Safety Management System
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e1`}
                data-tooltip-content="This section documents data corresponding to the implementation of the
                            organization's formal system for managing occupational
                            health and safety risks. This includes information on whether
                            a system exists, the reasons for its implementation, and any
                            legal requirements or recognized standards/guidelines that
                            influenced its development."
                className="mt-1.5 ml-2 text-[15px]"
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

          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] h-[26px] mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-4 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 403-1a
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
            formContext={{ validationErrors }}
          />
        </div>
        <div className="mt-4">
          <button
            type="button"
            className={`text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end ${
              !location || !year ? "cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!location || !year}
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
