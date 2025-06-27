'use client'
import React, { useState, useEffect, useRef } from 'react';
import { GlobalState } from '../../../../../Context/page';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget2 from "../../../../shared/widgets/Textarea/TextareaWidget2";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
const widgets = {
    TextareaWidgetnew: TextareaWidget2,
};

const view_path = 'gri-environment-water-303-1b-1c-1d-interaction_with_water'
const client_id = 1
const user_id = 1

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Q1: {
                type: "string",
                format: 'textarea',
            },
            Q2: {
                type: "string",
                format: 'textarea',
            },
            Q3: {
                type: "string",
                format: 'textarea',
            },
            Q4: {
                type: "string",
                format: 'textarea',
            },
            // Define other properties as needed
        }
    }
};


const uiSchema = {
    items: {
        Q1: {
            "ui:hadding": "Interactions with Water as shared resource",
            "ui:title": "Describe how the organization interacts with water.",
            "ui:tooltipstitle": "In the description, include how, and where water is withdrawn, consumed, and discharged, as well as water-related impacts the organization has caused or contributed to, or those that are directly related to its operations, products, and services. An overview of water use across the organization’s value chain.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-1a",
            'ui:widget': 'TextareaWidgetnew', 
            'ui:options': {
                label: false
            },
        },
        Q2: {
            "ui:hadding": "Water Related Impact",
            "ui:title": "Describe the approach used to identify water-related impacts ",
            "ui:tooltipstitle": "Include scope of assessments, their timeframe, and any tools or methodologies used.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-1b",
            'ui:widget': 'TextareaWidgetnew', 
            'ui:options': {
                label: false
            },
        },
        Q3: {
            "ui:hadding": "Water Related Impact",
            "ui:title": "Describe how water-related impacts are addressed",
            "ui:tooltipstitle": "Include how the organization works with stakeholders to steward water as a shared resource, and how it engages with suppliers or customers with significant water-related impacts",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-1c",
            'ui:widget': 'TextareaWidgetnew', 
            'ui:options': {
                label: false
            },
        },
        Q4: {
            "ui:hadding": "Water-related goals and targets",
            "ui:title": "Describe the process for setting any water-related goals and targets that are part of the Organization's approach to managing water-related impacts.",
            "ui:tooltipstitle": "Include water-related goals and targets that are part of the organization’s approach to managing water and effluents, and how they relate to public policy and the local context of each area with water stress",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-1d",
            'ui:widget': 'TextareaWidgetnew', 
            'ui:options': {
                label: false
            },
        },
          'ui:options': {
            orderable: false, 
            addable: false, 
            removable: false, 
            layout: 'horizontal', 
        }
    }
};
const validateRows = (data) => {
  return data.map((row) => {
    const rowErrors = {};
    if (!row.Q1 || row.Q1.trim() === "") {
      rowErrors.Q1 = "This field is required";
    }
    if (!row.Q2 || row.Q2.trim() === "") {
      rowErrors.Q2 = "This field is required";
    }
    if (!row.Q3 || row.Q3.trim() === "") {
      rowErrors.Q3 = "This field is required";
    }
    if (!row.Q4 || row.Q4.trim() === "") {
      rowErrors.Q4 = "This field is required";
    }
    return rowErrors;
  });
};
const Watersharedresourceimpact = ({ selectedOrg, year, selectedCorp,togglestatus }) => {
    const { open } = GlobalState();
    const [formData, setFormData] = useState([{}]);
    const [r_schema, setRemoteSchema] = useState({})
    const [r_ui_schema, setRemoteUiSchema] = useState({})
    const [validationErrors, setValidationErrors] = useState([]);
    const [loopen, setLoOpen] = useState(false);
    const toastShown = useRef(false);
    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token')?.replace(/"/g, "");
        }
        return '';
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

  // The below code on updateFormData
  let axiosConfig = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const updateFormData = async () => {
    LoaderOpen();
    const data = {
      client_id : client_id,
      user_id : user_id,
      path: view_path,
      form_data: formData,
      corporate: selectedCorp,
      organisation: selectedOrg,
      year,
    }

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
    try{
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

      }else {
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
      setFormData([{}])
      const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&corporate=${selectedCorp}&organisation=${selectedOrg}&year=${year}`;
      try {
          const response = await axios.get(url, axiosConfig);
          console.log('API called successfully:', response.data);
          setRemoteSchema(response.data.form[0].schema);
          setRemoteUiSchema(response.data.form[0].ui_schema);
          const form_parent = response.data.form_data;
          setFormData(form_parent[0].data);
      } catch (error) {
          console.error('API call failed:', error);
      } finally {
          LoaderClose();
      }
  };
  //Reloading the forms -- White Beard
  useEffect(() => {
    //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  },[r_schema, r_ui_schema])

  // console log the form data change
  useEffect(() => {
    console.log('Form data is changed -', formData)
  },[formData])

useEffect(() => {
  if (selectedOrg && year && togglestatus) {
    if (togglestatus === "Corporate") {
      if (selectedCorp) {
        loadFormData();           // <-- Only load if a corporate is picked
      } else {
        setFormData([{}]); 
        setRemoteSchema({});
        setRemoteUiSchema({});       // <-- Clear the form if no corporate is picked
      }
    } else {
      loadFormData();             // Organization tab: always try to load
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
    console.log("Submit button clicked"); // Debugging log
    const errors = validateRows(formData);
    setValidationErrors(errors);
    console.log("Validation Errors:", errors); // Debugging log
  
    const hasErrors = errors.some(rowErrors => Object.keys(rowErrors).length > 0);
    if (!hasErrors) {
      console.log("No validation errors, proceeding to update data"); // Debugging log
      updateFormData();
    } else {
      console.log("Validation errors found, submission aborted"); // Debugging log
    }
  };


  return (
    <>

      <div >
        <div>
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
      <div className="mb-4">
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
        </>
    );
};

export default Watersharedresourceimpact;
