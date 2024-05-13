'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd,MdOutlineDeleteOutline } from "react-icons/md";
import dateWidget from '../../../../../shared/widgets/dateWidget';
import selectWidget from '../../../../../shared/widgets/selectWidget';
import inputWidget from '../../../../../shared/widgets/inputWidget';
import { GlobalState } from '../../../../../../Context/page';
import CustomFileUploadWidget from '../../../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../../../shared/widgets/assignToWidget';
import CustomSelectInputWidget from '../../../../../shared/widgets/CustomSelectInputWidget';

const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget:CustomSelectInputWidget,
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

      },
      Source: {
        type: "string",
        title: "Source",
        enum: ['Coal', 'Solar', 'LPG', 'Diesel', 'Wind', 'Hydro'],
        tooltiptext:"Indicate where the energy comes from"
      },
      Purpose: {
        type: "string",
        title: "Purpose",
        tooltiptext:"Indicate where the energy comes fromIndicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion"
      },
      Renewable: {
        type: "string",
        title: "Renewable/ Non-renewable",
        enum: ['Renewable', 'Non-renewable'],
        tooltiptext:"Select from the dropdown to indicate whether it's Renewable or Non-Renewable Energy"
      },

      Quantity: {
        type: "string",
        title: "Quantity",
        tooltiptext:"Indicate the purchased quantity"
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
        tooltiptext:"Indicate the purchased consumed"
      },
      AssignTo: {
        type: "string",
        title: "Assign To",

      },
      FileUpload: {
        type: "string",
        format: "data-url",
      },


      // Define other properties as needed
    }
  }
};

const uiSchema = { // Add flex-wrap to wrap fields to the next line
  items: {
    "classNames": "flex",
    EnergyType: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false,
        tooltiptext: "Indicate type of energy from the drop down", // Include tooltiptext in uiSchema
      },


    },
    Source: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },

    },
    Purpose:{
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
    Quantity:{
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


    'ui:options': {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false, // Prevent removing items from UI
      layout: 'horizontal', // Set layout to horizontal
    }
  }
};

const Purchased = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);

  const handleAddNew = () => {
    setFormData([...formData, {}]);
  };

  const handleRemove = (indexToRemove) => {
    const updatedFormData = formData.filter((_, index) => index !== indexToRemove);
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };


  return (
    <>
      <div className={`overflow-auto custom-scrollbar flex justify-around  ${open ? "xl:w-[680px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px]"}`}>
        <div>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={(e) => setFormData(e.formData)}
          validator={validator}
          widgets={widgets}
        />
        </div>

 <div className="mt-2">
        {formData.map((_, index) => (
          <button
            key={index}
            className="text-[#007EEF] text-[12px] flex justify-center items-center cursor-pointer ml-3"
            onClick={() => handleRemove(index)}
          >
            <MdOutlineDeleteOutline className="text-red-600 cursor-pointer text-2xl" />
          </button>
        ))}
      </div>
      </div>

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>

      <button type="button" onClick={handleSubmit}>Submit</button> {/* Add a submit button */}
    </>
  );
};

export default Purchased;

