"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "@/Context/page";
import axiosInstance from "@/app/utils/axiosMiddleware";
import MaterialtopicWidget from "../../../../shared/widgets/Textarea/MaterialtopicWidget";

const widgets = {
    MaterialtopicWidgets: MaterialtopicWidget,
};



const view_path = "gri_collect_human_rights_management_material_topic";
const client_id = 1;
const user_id = 1;

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
        GRI33cd: {
        type: "string",
        title:
          "Describe organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.",
      },
      GRI33e: {
        type: "string",
        title:
          "Mention the process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process. Also, specify lessons learned and how these have been incoporated to organisation's operational policies and procedures.",
      },
    },
  },
};
const uiSchema = {
  items: {
    "ui:order": ["GRI33cd","GRI33e"],
    GRI33cd: {
    "ui:title":
        "Describe organisation's policies or commitments for the material topic, along with actions taken to address, prevent or mitigate potential negative impacts and mention the actions taken by the organisation to manage actual and potential positive impacts.",
      "ui:tooltip":
        "<p>1) Mention the policies or commitments the organization has developed specifically for the selected material topics.</p> <br> <p> 2)Examples of actions taken to prevent or mitigate potential negative impacts (e.g., adaptation/modification measures, facility upgrading, training, red-flag systems).</p> <br> <p>Mitigation: Action(s) taken to reduce the extent of a negative impact.</p><br><p>3)Mention actions to address actual negative impacts, including actions to provide for or cooperate in their remediation. Remediation: Means to counteract or make good a negative impact or provision of remedy.</p>",
        "ui:widget": "MaterialtopicWidgets",
        "ui:titiledisplay":"none",
        "ui:toltipdisplay":"none",
        "ui:gridisplay":"none",
        "ui:gri":["GRI 3-3-c","GRI 3-3-d"],
        "ui:horizontal": true,
        "ui:options": {
          label: false,
        },
      },
      GRI33e: {
        "ui:title":
            "Mention the process used to track the effectiveness of the actions and mention goals, targets, and indicators used to evaluate the process. Also, specify lessons learned and how these have been incoporated to organisation's operational policies and procedures.",
          "ui:tooltip":
            "<p>1) Process used to track the effectiveness of the actions can include internal or external auditing or verification, impact assessments, measurement systems, stakeholder feedback, grievance mechanisms, external performance ratings, and benchmarking.</p> <br> <p>  2)Specify the goals, targets and indicators used to evaluate the progress. Also, describe the effectiveness of the actions taken, including progress toward the goals and targets.</p> <br> <p> 3)The organization can briefly describe lessons learned that have led to changes in its policies or practices (e.g., training for workers, giving additional attention to the performance of suppliers), or that have led to plans for changes that will manage impacts more successfully in the future.</p>",
            "ui:widget": "MaterialtopicWidgets",
            "ui:titiledisplay":"block",
            "ui:toltipdisplay":"block",
            "ui:gridisplay":"block",
            "ui:gri":["GRI 3-3-e"],
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
  return data.map((row) => {
    const rowErrors = {};
    if (!row.GRI33cd) {
      rowErrors.GRI33cd = "This field is required";
    }
    if (!row.GRI33e) {
      rowErrors.GRI33e = "This field is required";
    }
  
    return rowErrors;
  });
};

const Screen1 = ({ selectedOrg, year, selectedCorp,togglestatus }) => {
  const [formData, setFormData] = useState([{}]);
  const [validationErrors, setValidationErrors] = useState([]);
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
    const errors = validateRows(formData);
    setValidationErrors(errors);

    const hasErrors = errors.some(
      (rowErrors) => Object.keys(rowErrors).length > 0
    );
    if (!hasErrors) {
      updateFormData();
    } else {
      // toast.error("Please fill in all required fields", {
      //   position: "top-right",
      //   autoClose: 3000,
      // });
      console.log("errror");
    }
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
        <div className="xl:mb-4 md:mb-4 2xl:mb-4 lg:mb-4 4k:mb-4 2k:mb-4 mb-6 block xl:flex lg:flex md:flex 2xl:flex 4k:flex 2k:flex">
          <div className="w-[95%] xl:w-[80%] lg:w-[80%] md:w-[80%] 2xl:w-[80%] 4k:w-[80%] 2k:w-[80%] relative mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
            <h2 className="flex mx-2 px-1 text-[15px] text-gray-700 font-[400]">
              Describe organisation's policies or commitments for the material
              topic, along with actions taken to address, prevent or mitigate
              potential negative impacts and mention the actions taken by the
              organisation to manage actual and potential positive impacts.
              <MdInfoOutline
                data-tooltip-id={`tooltip-$e14556`}
                data-tooltip-html="<p>1) Mention the policies or commitments the organization has developed specifically for the selected material topics.</p> <br> <p> 2)Examples of actions taken to prevent or mitigate potential negative impacts (e.g., adaptation/modification measures, facility upgrading, training, red-flag systems).</p> <br> <p>Mitigation: Action(s) taken to reduce the extent of a negative impact.</p><br><p>3)Mention actions to address actual negative impacts, including actions to provide for or cooperate in their remediation. Remediation: Means to counteract or make good a negative impact or provision of remedy.</p>"
                className="mt-0.5 ml-1 text-[22px] w-[20%] xl:w-0 lg:w-0 2xl:w-0 4k:w-0 2k:w-0 md:w-0"
              />
              <ReactTooltip
                id={`tooltip-$e14556`}
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
          <div className="w-[100%] xl:w-[20%]  lg:w-[20%]  md:w-[20%]  2xl:w-[20%]  4k:w-[20%]  2k:w-[20%] mb-2 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0  ">
            <div className="flex xl:float-end lg:float-end md:float-end 2xl:float-end 4k:float-end 2k:float-end float-start gap-2 mb-1 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex mb-1 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 3-3-c
                </div>
              </div>
              <div className="w-[70px] h-[26px] p-2 bg-sky-700 bg-opacity-5 rounded-lg justify-center items-center gap-2 inline-flex mb-1 xl:mb-0 lg:mb-0 md:mb-0 2xl:mb-0 4k:mb-0 2k:mb-0">
                <div className="text-sky-700 text-[10px] font-semibold font-['Manrope'] leading-[10px] tracking-tight">
                  GRI 3-3-d
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
