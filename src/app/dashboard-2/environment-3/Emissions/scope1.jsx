'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd } from "react-icons/md";
import dateWidget from '../../../shared/widgets/dateWidget';
import selectWidget from '../../../shared/widgets/selectWidget';
import inputWidget from '../../../shared/widgets/inputWidget';
import { GlobalState } from '../../../../Context/page';
import CustomFileUploadWidget from '../../../../app/shared/widgets/CustomFileUploadWidget'
import AssignToWidget from '../../../shared/widgets/assignToWidget';
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton:AssignToWidget
};

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      Category: {
        type: "string",
        title: "Category",
        enum: ['Category', 'Heating', 'Cooling', 'Steam'],
      },
      Subcategory: {
        type: "string",
        title: "Subcategory",
        enum: ['Coal', 'Solar', 'LPG', 'Diesel', 'Wind', 'Hydro'],
      },
      Activity: {
        type: "string",
        title: "Activity",
        enum: ['Renewable', 'Non-renewable'],
      },
      Quantity: {
        type: "string",
        title: "Quantity"
      },
      Quantity2: {
        type: "string",
        title: "Quantity2"
      },
      Quantity3: {
        type: "string",
        title: "Quantity3"
      },
      Quantity4: {
        type: "string",
        title: "Quantity4"
      },
      Unit: {
        type: "string",
        title: "Unit",
        enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
      },
      Test: {
        type: "string",
        title: "Test",
        enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
      },
      FileUpload: {
        type: "string",
        format: "data-url",
      },
      AssignTo: {
        type: "string",
        title: "Assign To",

      }
      // Define other properties as needed
    }
  }
};

const uiSchema = {
  classNames: 'px-4 mb-4 flex flex-wrap text-xs', // Add flex-wrap to wrap fields to the next line
  items: {
    "classNames": "flex",
    Category: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    Subcategory: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    Activity: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    Quantity: {
      'ui:widget': 'inputWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },

    },
    Quantity2: {
      'ui:widget': 'inputWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },

    },
    Quantity3: {
      'ui:widget': 'inputWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },

    },
    Quantity4: {
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
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    Test: {
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
      },
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    FileUpload: {
      'ui:widget': 'FileUploadWidget',
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
    'ui:options': {
      orderable: false, // Prevent reordering of items
      addable: false, // Prevent adding items from UI
      removable: false,
      label: false, // Prevent removing items from UI
      layout: 'horizontal', // Set layout to horizontal
    }
  }
};

const Scope1 = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);


  const handleChange = (formData) => setFormData(formData);

  const handleAddNew = () => {
    const newData = [...formData, {}];  // Add a new empty object for a new row
    setFormData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form data:', formData);
  };


  return (

      <>
      <div className={`overflow-auto custom-scrollbar ${open ? "xl:w-[680px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px]"}`}>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}// Render only the first row
          onChange={(e) => handleChange(e.formData)}
          validator={validator}
          widgets={widgets}
        />
      </div>

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>
</>

  );
};

export default Scope1;
