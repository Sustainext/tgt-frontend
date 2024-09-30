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
import GeneralWorkersEmployees from "../../../../shared/widgets/Table/generalWorkersEmployees.js";
// Simple Custom Table Widget
const widgets = {
  TableWidget: GeneralWorkersEmployees,
};

const view_path = "gri-general-workforce_other_workers-workers-2-8-a";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      TypeofWorker: {
        type: "string",
        title: "Type of Worker",
        enum: [
          "Agency worker",
          "Apprentice",
          "Contractor",
          "Home worker",
          "Intern",
          "Self-employed person",
          "Sub-contractor",
          "Volunteer",
          "Others (please specify)",
        ],
      },
      TotalnumberofWorkers: {
        type: "string",
        title: "Total number of Workers",
        texttype: "number",
      },
      Contractualrelationship: {
        type: "string",
        title: "Contractual relationship",
        enum: [
          "Full-time employee",
          "Independent contractor",
          "Paid intern",
          "Part-time employee",
          "Subcontractor",
          "Temporary agency worker",
          "Unpaid intern",
          "Others (please specify)",
        ],
      },
      Workperformed: {
        type: "string",
        title: "Work performed",
        enum: [
          "Administration",
          "Coding",
          "Consulting",
          "Data Analysis",
          "Design",
          "Development",
          "Delivery",
          "Finance",
          "Installation",
          "Maintenance",
          "Marketing",
          "Operations",
          "Research",
          "Sales",
          "Training",
          "Writing",
          "Others (please specify)",
        ],
      },
      Engagementapproach: {
        type: "string",
        title: "Engagement approach",
        enum: ["Directly", "Indirectly (through third-party)"],
      },
      Thirdparty: {
        type: "string",
        title: "Third party (if applicable)",
        enum: ["Contractor", "mployment agency", "Others (please specify)"],
      },
    },
  },
};

const uiSchema = {
  "ui:widget": "TableWidget",
  "ui:options": {
    titles: [
      {
        key: "TypeofWorker",
        title: "Type of Worker",
        tooltip:
          "Please select the types of workers employed or engaged by your organization during the reporting period.",
      },
      {
        key: "TotalnumberofWorkers",
        title: "Total number of Workers",
        tooltip:
          "For the type of worker selected, enter the total number of individuals engaged during the reporting period.",
      },
      {
        key: "Contractualrelationship",
        title: "Contractual relationship",
        tooltip:
          "Please specify the primary contractual relationship for the worker. ",
      },
      {
        key: "Workperformed",
        title: "Work performed",
        tooltip:
          "Choose the primary category of work performed by the reported workers.",
      },
      {
        key: "Engagementapproach",
        title: "Engagement approach",
        tooltip:
          "Indicate whether the workers are directly employed by your organization or engaged through a third party.",
      },
      {
        key: "Thirdparty",
        title: "Third party (if applicable",
        tooltip:
          "If workers are engaged indirectly, specify the type of third party involved (e.g., agency, subcontractor).",
      },
    ],
  },
};
const Screen1 = ({ selectedOrg, selectedCorp, location, year, month }) => {
  const initialFormData = [
    {
      TypeofWorker: "",
      TotalnumberofWorkers: "",
      Contractualrelationship: "",
      Workperformed: "",
      Engagementapproach: "",
      Thirdparty: "",
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
    console.log("loadFormData screen 2");
    LoaderOpen();
    setFormData(initialFormData);
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
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
              Workers who are not Employees
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e86`}
                data-tooltip-content="This section documents data corresponding to the number of
workers who are not employees but whose work is controlled by your organization.
It also describes the most common types of these workers,
their contractual relationships with your organization, and the types of work they perform."
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
                  GRI 2-8-a
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

export default Screen1;
