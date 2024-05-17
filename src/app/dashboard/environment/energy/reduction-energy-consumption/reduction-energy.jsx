'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { GlobalState } from '../../../../../Context/page';
import dateWidget from '../../../../shared/widgets/dateWidget';
import selectWidget from '../../../../shared/widgets/selectWidget';
import inputWidget from '../../../../shared/widgets/inputWidget';
import CustomFileUploadWidget from '../../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../../shared/widgets/assignToWidget';
import CustomSelectInputWidget from '../../../../shared/widgets/CustomSelectInputWidget';
import RemoveWidget from '../../../../shared/widgets/RemoveWidget';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
};

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
        Typeofintervention: {
        type: "string",
        title: "Type of intervention",
        enum: ['Switching to LEDs', 'Changing fuels', 'Process changes', 'Energy Efficiency measure', 'Renewable Energy Adoption','others'],
        tooltiptext: "From the dropdown, please Indicate the type of intervention  that resulted in a reduction in Energy Consumption.",
      },
      Quantitysavedduetointervention: {
        type: "string",
        title: "Quantity saved due to intervention",
        tooltiptext: "Indicate the quantity of energy savings due to the intervention"
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
        tooltiptext: "Select the correct unit corresponding to the quantity"
      },
      Energytypereduced: {
        type: "string",
        title: "Energy type reduced",
        enum: ['Fuel', 'heating', 'electricity', 'cooling', 'steam', 'Others'],
        tooltiptext: "Select the correct unit corresponding to the quantity"
      },
      Baseyear: {
        type: "string",
        title: "Base year",
        tooltiptext: "Indicate the base year used for comparing energy saved before the intervention"
      },
      Energyreductionis: {
        type: "string",
        title: "Energy reduction is",
        enum: ['estimated', 'modeled', 'sourced from direct measurement', 'others'],
        tooltiptext: "Indicate whether the Energy reduction measurement is Estimated, Modeled or directly measured"
      },
      Methodologyused: {
        type: "string",
        title: "Methodology used",
        tooltiptext: "Indicate the methodology used for calculating energy reduction."
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
      'Typeofintervention', 'Quantitysavedduetointervention', 'Unit', 'Energytypereduced','Baseyear','Energyreductionis','Methodologyused','AssignTo', 'FileUpload', 'Remove'
    ],
    Typeofintervention: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false,
      },
    },
    Quantitysavedduetointervention: {
      'ui:widget': 'inputWidget',
      'ui:options': {
        label: false
      },
    },
    Unit: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    Energytypereduced: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    Baseyear: {
      'ui:widget': 'inputWidget',
      'ui:options': {
        label: false
      },
    },
    Energyreductionis: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    Methodologyused: {
        'ui:widget': 'inputWidget',
        'ui:options': {
          label: false
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

const generateTooltip = (field, title, tooltipText) => {
  if (field === "FileUpload" || field === "AssignTo" || field === "Remove") {
    return null; // Return null to skip rendering tooltip for these fields
  }

  return (
    <div className='mx-2 flex w-[230px]'>
      <label className="text-sm leading-5 text-gray-700 flex">{title}</label>
      <MdInfoOutline
        data-tooltip-id={field}
        data-tooltip-content={tooltipText}
        className="mt-1 ml-2 text-[12px]"
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
          textAlign: 'center',
        }}
      />
    </div>
  );
};

const Reductionenergy = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);

  const handleChange = (e) => {
    setFormData(e.formData);

  };

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);

  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form data:', formData);

  };
  const updateFormData = (updatedData) => {
    setFormData(updatedData);

  };
  const handleRemove = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  }
  const renderFields = () => {
    const fields = Object.keys(schema.items.properties);
    return fields.map((field, index) => (
      <div key={index}>
        {generateTooltip(field, schema.items.properties[field].title, schema.items.properties[field].tooltiptext)}
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
            schema={schema}
            uiSchema={uiSchema}
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
                  scopes="ps1"
                  setFormData={updateFormData}
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
      <button type="button"  className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
      </div>

    </>
  );
};

export default Reductionenergy;
