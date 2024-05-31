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

const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
};

const view_path = 'gri-environment-materials-301-1a-renewable_materials'
const client_id = 1
const user_id = 1

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      Typeofmaterial: {
        type: "string",
        title: "Type of material",
        enum: ['Raw materials', 'Associated process materials','Semi-manufactured goods or parts','Materials for packaging purposes'],
        tooltiptext: "Select the waste category from the given dropdown.",
        display: "none",
      },
      Materialsused: {
        type: "string",
        title: "Materials used",
        enum: ['Cardboard', 'Glass','Hemp','Kenaf','Natural Rubber','Paper','Timber','Wool','Others'],
        tooltiptext: "What materials does the compa use to produce its goods or services?",
        display: "block",
      },
      Source: {
        type: "string",
        title: "Source",
        enum: ['Externally sourced', 'Internally sourced'],
        tooltiptext: "Where does the company get its materials from? Internally sourced materials: Materials that the company makes itself.Externally sourced materials: Materials that the company buys from other companies.",
        display: "block",
      },
      Totalweight: {
        type: "string",
        title: "Total weight/volume",
        tooltiptext: "How much material is used for the production of goods or services?(Please specify the total weight or volume.)",
        display: "block",

      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: ['Cubic centimeter cm3', 'Cubic decimeter dm3', 'Cubic meter m3', 'Gram', 'Kilogram Kg','Liter','Milligram','Milliliter','Fluid Ounce fl Oz','Gallon Gal','Pint Pt','Pound Lb','Quart Qt','Cubic foot ft3','Metric ton','US short ton (tn)'],
        tooltiptext: "Use 1000 kilograms as the measure for a metric ton.",
        display: "none",
      },
      Datasource: {
        type: "string",
        title: "Data source",
        enum: ['Estimated', 'Direct measurement'],
        tooltiptext: "What is the source of the data for the total weight or volume of materials used? Estimation: process of making an approximate calculation of something.Direct measurement: process of measuring something directly. For example, a company might directly measure the total weight or volume of materials used by weighing or measuring each batch of materials used.",
        display: "block",

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
      'Typeofmaterial', 'Materialsused', 'Source', 'Totalweight','Unit','Datasource','AssignTo', 'FileUpload', 'Remove'
    ],
    Typeofmaterial: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false,
      },
    },
    Materialsused: {
      'ui:widget': 'selectWidget', // Use your custom widget for QuantityUnit
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    Source: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    Totalweight: {
      'ui:widget': 'inputWidget',
      'ui:horizontal': true,
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
    Datasource: {
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
        style={{ display: display }}
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

const Renewable = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({})
  const [r_ui_schema, setRemoteUiSchema] = useState({})

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

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadFormData = async () => {
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
      // setting the setFormData(response.data.form[0].form_data)
    })
    .catch(error =>{
      //handling the error response
      console.log('Error:', error);
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
    updateFormData();

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

      </div>

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>
      <div className='mb-4'>
        <button type="button" className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
      </div>

    </>
  );
};

export default Renewable;
