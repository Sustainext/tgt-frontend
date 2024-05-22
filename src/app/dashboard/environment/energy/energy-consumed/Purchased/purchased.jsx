'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import dateWidget from '../../../../../shared/widgets/dateWidget';
import selectWidget from '../../../../../shared/widgets/selectWidget';
import inputWidget from '../../../../../shared/widgets/inputWidget';
import { GlobalState } from '../../../../../../Context/page';
import CustomFileUploadWidget from '../../../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../../../shared/widgets/assignToWidget';
import CustomSelectInputWidget from '../../../../../shared/widgets/CustomSelectInputWidget';
import RemoveWidget from '../../../../../shared/widgets/RemoveWidget';
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

      EnergyType: {
        type: "string",
        title: "Energy Type",
        tooltiptext: "Indicate type of energy from the drop down",
        enum: ['Electricity', 'Heating', 'Cooling', 'Steam'],
        tooltiptext: "Indicate the type of energy purchased from the drop down"

      },
      Source: {
        type: "string",
        title: "Source",
        enum: ['Coal', 'Solar', 'LPG', 'Diesel', 'Wind', 'Hydro', 'Natural', 'Electricity', 'Cooling', 'Steam', 'Heating', 'Wood Biomas', 'Biogas', 'Other'],
        tooltiptext: "Indicate where the energy comes from"
      },
      Purpose: {
        type: "string",
        title: "Purpose",
        tooltiptext: "Indicate where the energy comes fromIndicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion"
      },
      Renewable: {
        type: "string",
        title: "Renewable/ Non-renewable",
        enum: ['Renewable', 'Non-renewable'],
        tooltiptext: "Select from the dropdown to indicate whether it's Renewable or Non-Renewable Energy"
      },

      Quantity: {
        type: "string",
        title: "Quantity",
        tooltiptext: "Indicate the purchased quantity"
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
        tooltiptext: "Select the correct unit corresponding to the quantity purchased."
      },
      AssignTo: {
        type: "string",

      },
      FileUpload: {
        type: "string",
        format: "data-url",
      },

      Remove: {
        type: "string",

      },
      // Define other properties as needed
    }
  }
};

const uiSchema = {
 // Add flex-wrap to wrap fields to the next line
  items: {

    'ui:order': [
      'EnergyType', 'Source', 'Purpose', 'Renewable', 'Quantity', 'Unit', 'AssignTo', 'FileUpload', 'Remove'
    ],
    EnergyType: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false,
        // Include tooltiptext in uiSchema
      },


    },
    Source: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },

    },
    Purpose: {
      'ui:widget': 'inputWidget', // Use your custom widget for QuantityUnit
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    Renewable: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },

    },
    Quantity: {
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
    classNames: 'fieldset',
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
      <label className="text-[13px] leading-5 text-gray-700 flex">{title}</label>
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
          textAlign: 'left',
        }}
      />
    </div>
  );
};

const Purchased = () => {
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
  };
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
                  scopes="ec1"
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

export default Purchased;

