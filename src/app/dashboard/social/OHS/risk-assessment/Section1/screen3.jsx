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
import GeneralWorkersEmployees from "../../../../../shared/widgets/Table/generalWorkersEmployees";
// Simple Custom Table Widget
const widgets = {
  TableWidget: GeneralWorkersEmployees,
};

const view_path = "gri-social-ohs-403-2b-hazard_reporting-new";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Reportingchannels: {
        type: "string",
        title: "Reporting channels",
        enum: [
          "Supervisor",
          "Safety committee",
          "Safety representative",
          "Anonymous reporting system",
          "Online platform",
          "Others (please specify)",
        ],
      },
     
      ReportingProcesses: {
        type: "string",
        title: "How can workers report hazards? (Select all that apply)",
        enum: [
          "Directly contact",
          "Submit a form",
          "Online reporting portal",
          "Others (please specify)",
        ],
      },
      Reportingencouragement: {
        type: "string",
        title: "How do you encourage workers to report hazards without fear of reprisal? (Select all that apply)",
        enum: [
          "Regular training",
          "Safety incentives",
          "Open communication culture",
          "Positive feedback for reporting",
          "Anonymous reporting options",
          "Others (please specify)",
        ],
      },
   
      ReprisalProtection: {
        type: "string",
        title: "Reprisal Protection Measures",
        texttype: "text",
      },
      FeedbackCommunication: {
        type: "string",
        title: "Feedback and Communication",
        enum: [
          "Safety meetings",
          "Internal communication channels",
          "Direct feedback to reporter",
          "Posted hazard updates",
          "Anonymous feedback survey",
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
        key: "Reportingchannels",
        title: "Reporting channels",
        tooltip:
          "Who can workers report work-related hazards and hazardous situations to? (Select all that apply)",
      },
      {
        key: "ReportingProcesses",
        title: "Reporting Processes",
        tooltip:
          "How can workers report hazards? (Select all that apply)",
      },
      {
        key: "Reportingencouragement",
        title: "Reporting encouragement",
        tooltip:
          "How do you encourage workers to report hazards without fear of reprisal? (Select all that apply)",
      },
      {
        key: "ReprisalProtection",
        title: "Reprisal Protection Measures",
        tooltip:
          "Please provide a brief description on how are workers protected from reprisals for reporting hazards.",
      },
      {
        key: "FeedbackCommunication",
        title: "Feedback and Communication",
        tooltip:
          "How are workers informed about reported hazards and implemented actions, and how can they provide feedback? (Select all that apply)",
      },

    ],
  },
};
const Screen3 = ({location, year}) => {
  const initialFormData = [
    {
      Reportingchannels: "",
      ReportingProcesses: "",
      Reportingencouragement: "",
      ReprisalProtection: "",
      FeedbackCommunication: "",
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
    console.log("loadFormData screen 2");
    LoaderOpen();
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
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
    if (location && year) {
      loadFormData();
      toastShown.current = false; 
    } else {
      if (!toastShown.current) {
        toastShown.current = true; 
      }
    }
  }, [location, year]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };

  return (
    <>
   <div className="mx-2 pb-11 pt-3 px-3 mb-6 rounded-md " style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}>
        <div className="mb-4 flex">
          <div className="w-[80%] relative">
           <h2 className="flex mx-2 text-[15px] text-neutral-950 font-[500]">
           Hazard Reporting and Worker Protection
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e86`}
                data-tooltip-content="This section documents data corresponding to the organization's processes for workers to report work-related hazards and hazardous situations, along with the measures in place to protect workers from reprisals for reporting."
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
              ></ReactTooltip>
            </h2>
          </div>

          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 403-2b
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

export default Screen3;
