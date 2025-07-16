"use client";
import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { GlobalState } from "../../../../../../Context/page";
import TextareaWidget from "../../../../../shared/widgets//Textarea/TextareaWidget";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import TextareaWidgetnew from '../../../../../shared/widgets/Textarea/TextAreaWidget5';
import MultiselectWidget from "../../../../../shared/widgets/Select/multiselectWidget";
const widgets = {
  TextareaWidgetnew: TextareaWidgetnew,
  MultiselectWidget:MultiselectWidget
};

const view_path = "environment_biodiversity_ecosystem_services_and_beneficiaries";
const client_id = 1;
const user_id = 1;


const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        Q1: {
          type: "string",
          title: "Which ecosystem services have been affected or potentially affected by the organisation's activities?",
          enum: [
            "Provisioning services",
            "Regulating services",
            "Cultural services",
            "Others (please specify)"
          ]
        },
        Q2: {
          type: "string",
          title: "Who are the beneficiaries affected by the change in ecosystem services by the organisation's activities?",
          format: "textarea"
        },
        Q3: {
          type: "string",
          title: "How do the organization's activities impact ecosystem services and their beneficiaries?",
          format: "textarea"
        }
      }
    }
  };

  const uiSchema = {
    items: {
      Q1: {
        "ui:heading":"Ecosystem Services",
        "ui:headingTooltip":"This section documents data corresponding to the ecosystem services.",
        "ui:widget": "MultiselectWidget",
        "ui:title": "Which ecosystem services have been affected or potentially affected by the organisation's activities?",
        "ui:tooltipstitle":"<p>Provide a list ecosystem services affected or potentially affected by the organization’s activities.<br/>Ecosystem services occur through an ecosystem's normal functioning and can fall into one or more of the following categories:<br/> Provisioning services: Benefits people obtain from ecosystems through material outputs like food, water, timber, and other resources.<br/> Regulating and maintenance services: Contributions of ecosystems to regulating climate, water, air, and biological processes that sustain environmental stability.<br/> Cultural services: Non-material benefits people gain from ecosystems through recreation, spiritual enrichment, knowledge, and cultural identity.<br/></p>",
        "ui:headingTooltipDisplay":"block",
        "ui:options": {
          label: false,
          placeholder: "Select"
        }
      },
      Q2: {
        "ui:heading":"Beneficiaries",
        "ui:headingTooltip":"This section documents data corresponding to the ecosystem beneficiaries.",
        "ui:title": "Who are the beneficiaries affected by the change in ecosystem services by the organisation's activities?",
        "ui:tooltipstitle":"Provide a list of ecosystem beneficiaries affected or potentially affected by the organization’s activities. The reporting organization can also be one of the beneficiaries. The organization can report the number of beneficiaries when disclosing information. Beneficiaries can include Indigenous Peoples, local communities, and other organizations.",
        "ui:widget": "TextareaWidgetnew",
        "ui:headingTooltipDisplay":"block",
        "ui:options": {
          label: false
        }
      },
      Q3: {
        "ui:title":"How do the organization's activities impact ecosystem services and their beneficiaries?",
        "ui:tooltipstitle":"Explain how organization’s activities may lead to an increase or decrease in the quality and quantity of ecosystem services. For example, the organization can explain that cutting trees in the forest has decreased food provisioning services, which has a negative impact on the local community that needs to find an alternative food source.",
        "ui:widget": "TextareaWidgetnew",
        "ui:options": {
          label: false
        }
      },
      "ui:options": {
        orderable: false,
        addable: false,
        removable: false,
        layout: "horizontal"
      }
    }
  };
  
  
const Screen1Comp = ({ handleQ6Change, location, year }) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({});
  const [r_ui_schema, setRemoteUiSchema] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleChange = (e) => {
    setFormData(e.formData);
  };

  // The below code
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id: client_id,
      user_id: user_id,
      path: view_path,
      form_data: formData,
      location,
      year
    };

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`;
    try {
      const response = await axios.post(url, data, axiosConfig);
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
    const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}`;
    try {
      const response = await axios.get(url, axiosConfig);
      console.log("API called successfully:", response.data);
      setRemoteSchema(response.data.form[0].schema);
      setRemoteUiSchema(response.data.form[0].ui_schema);
      const form_parent = response.data.form_data;
      setFormData(form_parent[0].data);
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      LoaderClose();
    }
  };
  //Reloading the forms -- White Beard
  useEffect(() => {
    //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  }, [r_schema, r_ui_schema]);

  // console log the form data change
 

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
    // console.log('From loaded , ready for trigger')
    // loadFormData()
  }, [location, year]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log("Form data:", formData);
    updateFormData();
  };

  return (
    <>
      <div>
        <div>
          <Form
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={widgets}
          />
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
      </div>

      <div className="mb-4 mt-2 pb-2">
        <button
          type="button"
          className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {/* Add a submit button */}
    </>
  );
};

export default Screen1Comp;
