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

const view_path = "gri-social-ohs-403-2d-work_related_incident-new";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      Descriptionincident: {
        type: "string",
        title: "Description of Incident",
        texttype: "text",
      },
     
      Incidentreporting: {
        type: "string",
        title: "Incident Reporting Personnel",
        enum: [
          "Supervisor",
          "Safety committee",
          "Safety representative",
          "Anonymous reporting system",
          "Online platform",
          "Others (please specify)",
        ],
      },
      Investigationteam: {
        type: "string",
        title: "Investigation team",
        enum: [
          "Safety Manager",
          "Supervisor",
          "Trained Team",
          "External Consultants",
          "Others (please specify)",
        ],
      },
      InvestigationMethods: {
        type: "string",
        title: "Investigation Methods",
        enum: [
          "Interviews",
          "Witness Statements",
          "Site Inspection",
          "Equipment Review",
          "Document Analysis",
          "Others (please specify)",
        ],
      },
      HazardIdentification : {
        type: "string",
        title: "Hazard Identification & Risk Assessment",
        texttype: "text",
      },
   
      CorrectiveActions: {
        type: "string",
        title: "Corrective Actions",
        enum: [
          "Elimination of hazard",
          "Engineering control",
          "Administrative control",
          "PPE",
          "Others (please specify)",
        ],
      },
      SystemImprovement: {
        type: "string",
        title: "System Improvement",
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
        key: "Descriptionincident",
        title: "Description of Incident",
        tooltip:
          "<p>Please describe the processes used to investigate work-related incidents.</p> <br> <p>Example: Incidents might be due to, for example, electrical problems, explosion, fire; overflow, overturning, leakage, flow; breakage, bursting, splitting; loss of control, slipping, stumbling and falling; body movement without stress; body movement under/with stress; shock, fright; workplace violence or harassment.</p>",
      },
      {
        key: "Incidentreporting",
        title: "Incident Reporting Personnel",
        tooltip:
          "Who can workers report work-related hazards and hazardous situations to? (Select all that apply)",
      },
      {
        key: "Investigationteam",
        title: "Investigation team",
        tooltip:
          "Who typically conducts incident investigations? (Select all that apply) ",
      },
      {
        key: "InvestigationMethods",
        title: "Investigation Methods",
        tooltip:
          "What methods are used to investigate incidents? (Select all that apply)",
      },
      {
        key: "HazardIdentification",
        title: "Hazard Identification & Risk Assessment",
        tooltip:
          "What actions did the organization take to address hazards and risks identified in incident investigations, following the hierarchy of controls? (Select all that apply)",
      },
      {
        key: "CorrectiveActions",
        title: "Corrective Actions",
        tooltip:
          "What actions did the organization take to address hazards and risks identified in incident investigations, following the hierarchy of controls? (Select all that apply)",
      },
      {
        key: "SystemImprovement",
        title: "System Improvement",
        tooltip:
          "What changes did the organization make to policies, training, equipment, or communication after investigating incidents? (e.g., revised safety procedures, improved equipment, additional hazard training)",
      },
    
    ],
  },
};
const Screen1 = ({location, year,month}) => {
  const initialFormData = [
    {
      Descriptionincident: "",
      Incidentreporting: "",
      Investigationteam: "",
      InvestigationMethods: "",
      HazardIdentification: "",
      CorrectiveActions: "",
      SystemImprovement: "",
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
           Work-Related Incident Investigation
              <MdInfoOutline
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
              ></ReactTooltip>
            </h2>
          </div>

          <div className="w-[20%]">
            <div className="float-end">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                GRI 403-2d
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

export default Screen1;
