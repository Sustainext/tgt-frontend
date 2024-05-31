'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { GlobalState } from '../../../../../Context/page';
import dateWidget from '../../../../shared/widgets/Input/dateWidget';
import selectWidget from '../../../../shared/widgets/Select/selectWidget';
import inputWidget from '../../../../shared/widgets/Input/inputWidget';
import CustomFileUploadWidget from '../../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../../shared/widgets/assignToWidget';
import CustomSelectInputWidget from '../../../../shared/widgets/CustomSelectInputWidget';
import RemoveWidget from '../../../../shared/widgets/RemoveWidget';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
};

const view_path = 'gri-environment-waste-306-4b-4c-4d-waste_diverted_from_disposal'
const client_id = 1
const user_id = 1

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
        Wastecategory: {
        type: "string",
        title: "Waste category",
        enum: ['Hazardous', 'Non Hazardous'],
        tooltiptext: "Select the waste category from the given dropdown.",
        display:"block",
      },
      WasteType: {
        type: "string",
        title: "Waste Type",
        tooltiptext: "Please specify the type of waste. e.g. Paper waste, E-waste, chemical waste etc. ",
        display:"block",
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: ['g', 'Kgs', 't (metric tons)', 'ton (US short ton)', 'lbs'],
        tooltiptext: "Use 1000 kilograms as the measure for a metric ton.",
        display:"block",
      },
      Wastediverted: {
        type: "string",
        title: "Waste diverted",
        display:"none",

      },
      RecoveryOperations: {
        type: "string",
        title: "Recovery Operations",
        enum: ['Preparation for reuse', 'Recycing', 'other'],
        tooltiptext: "Recovery: Operation wherein products, components of products,or materials that have become waste are prepared to fulfill a purpose in place of new products, components, or materials that would otherwise have been used for that purpose.Recovery Methods: Preparation for reuse: Checking, cleaning, or repairing operations, by which products or components of products that have become waste are prepared to be put to use for the same purpose for which they were conceived.Recycling: Reprocessing of products or components of products that have become waste, to make new materials",
        display:"block",
      },
      Site: {
        type: "string",
        title: "Site",
        enum: ['Onsite', 'Offsite'],
        tooltiptext: "On-site: ‘Onsite’ means within the physical boundary  or administrative control of the reporting organization Off-site: ‘Offsite’ means outside the physical boundary \ or administrative control of the reporting organization",
        display:"block",
      },
      AssignTo: {
        type: "string",
        title: "Assign To",
      },
      FileUpload: {
        type: "string",
        format: "data-url",
        title: "File Upload",
      },
      Remove: {
        type: "string",
        title: "Remove",
      },
      // Define other properties as needed
    }
  }
};

const uiSchema = {
 // Add flex-wrap to wrap fields to the next line
  items: {
    classNames: 'fieldset',
    'ui:order': [
      'Wastecategory', 'WasteType', 'Unit', 'Wastediverted','RecoveryOperations','Site','AssignTo', 'FileUpload', 'Remove'
    ],
    Wastecategory: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false,
      },
    },
    WasteType: {
      'ui:widget': 'inputWidget', // Use your custom widget for QuantityUnit
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    Unit: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    Wastediverted: {
      'ui:widget': 'inputWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },

    RecoveryOperations: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    Site: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    AssignTo: {
      "ui:widget": "AssignTobutton",
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    FileUpload: {
      'ui:widget': 'FileUploadWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    Remove: {
      "ui:widget": "RemoveWidget",
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    'ui:options': {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: 'horizontal', // Set layout to horizontal
    }
  }
};

const generateTooltip = (field, title, tooltipText, display) => {
  if (field === "FileUpload" || field === "AssignTo" || field === "Remove") {
    return null; // Return null to skip rendering tooltip for these fields
  }

  return (
    <div className='mx-2 flex w-[230px]'>
      <label className="text-[13px] leading-5 text-gray-700 flex">{title}</label>
      <MdInfoOutline
        data-tooltip-id={field}
        data-tooltip-content={tooltipText}
        className="mt-1 ml-2 text-[12px]"
        style={{display:display}}
      />
      <ReactTooltip
        id={field}
        place="top"
        effect="solid"
        style={{
          width: "290px",
          backgroundColor: "#000",
          color: "white",
          fontSize: "12px",
          boxShadow: 3,
          borderRadius: "8px",
          textAlign: 'left',
        }}
      />
    </div>
  );
};

const Wastedivertedimpact = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({})
  const [r_ui_schema, setRemoteUiSchema] = useState({})
  const [loopen, setLoOpen] = useState(false);
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleChange = (e) => {
    setFormData(e.formData);

  };

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);

  };

  // The below code on updateFormData
  const updateFormData = async () => {
    const data = {
      client_id : client_id,
      user_id : user_id,
      path: view_path,
      form_data: formData
    }

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
    try{
      const response = await axios.post(url,
        {
          ...data
        }
      );

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
    }
  };

  const loadFormData = async () => {
    LoaderOpen();
    const base_url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path=`;
    const url = `${base_url}${view_path}&&client_id=${client_id}&&user_id=${user_id}`
    console.log(url, 'is the url to be fired')

    //making the GET request
    axios.get(url)
    .then(response => {
      //handling the successful response
      console.log(response.data, 'is the response data')
      setRemoteSchema(response.data.form[0].schema)
      setRemoteUiSchema(response.data.form[0].ui_schema)
      const form_parent = response.data.form_data
      const f_data = form_parent[0].data
      setFormData(f_data)
      LoaderClose();
      // setting the setFormData(response.data.form[0].form_data)
    })
    .catch(error => {

      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Oops, something went wrong";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    });
  }
  //Reloading the forms -- White Beard
  useEffect(() => {
    //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  },[r_schema, r_ui_schema])

  // console log the form data change
  useEffect(() => {
    console.log('Form data is changed -', formData)
  },[formData])

  // fetch backend and replace initialized forms
  useEffect (()=> {
    console.log('From loaded , ready for trigger')
    loadFormData()
  },[])

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form data:', formData);
    updateFormData()

  };
  const updateFormDatanew = (updatedData) => {
    setFormData(updatedData);

  };
  const handleRemove = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };
  const renderFields = () => {
    const fields = Object.keys(schema.items.properties);
    return fields.map((field, index) => (
      <div key={index}>
        {generateTooltip(field, schema.items.properties[field].title, schema.items.properties[field].tooltiptext, schema.items.properties[field].display)}
      </div>
    ));
  };
  return (
    <>

<div className={`overflow-auto custom-scrollbar flex justify-around  ${open ? "xl:w-[768px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px]"}`}>
        <div>
          <div>
            <div className='flex'>
              {renderFields()} {/* Render dynamic fields with tooltips */}
            </div>
          </div>

          <Form
          className='flex'
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={{
              ...widgets,
              RemoveWidget: (props) => (
                <RemoveWidget
                  {...props}
                  index={props.id.split('_')[1]} // Pass the index
                  onRemove={handleRemove}
                />
              ),
              FileUploadWidget: (props) => (
                <CustomFileUploadWidget
                  {...props}
                  scopes="in1"
                  setFormData={updateFormDatanew}
                />
              )

            }}

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

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>
      <div className='mb-4'>
      <button type="button"  className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
      </div>

    </>
  );
};

export default Wastedivertedimpact;

