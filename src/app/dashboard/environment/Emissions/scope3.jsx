'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd,MdOutlineDeleteOutline } from "react-icons/md";
import dateWidget from '../../../shared/widgets/dateWidget';
import selectWidget from '../../../shared/widgets/selectWidget';
import inputWidget from '../../../shared/widgets/inputWidget';
import { GlobalState } from '../../../../Context/page';
import CustomFileUploadWidget from '../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../shared/widgets/assignToWidget';
import CustomSelectInputWidget from '../../../shared/widgets/CustomSelectInputWidget';
import RemoveWidget from '../../../shared/widgets/RemoveWidget'
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget:CustomSelectInputWidget,
  RemoveWidgetnew:RemoveWidget
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
      QuantityUnit: {
        type: "string",
        title: "Quantity & Unit",
        unitOptions: [
          { value: 'Joules', label: 'Joules' },
          { value: 'KJ', label: 'KJ' },
          { value: 'Wh', label: 'Wh' },
        ]
      },


      FileUpload: {
        type: "string",
        format: "data-url",
      },
      AssignTo: {
        type: "string",
        title: "Assign To",

      },

      // Define other properties as needed
    }
  }
};

const uiSchema = { // Add flex-wrap to wrap fields to the next line
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
    QuantityUnit: {
      'ui:widget': 'CustomSelectInputWidget', // Use your custom widget for QuantityUnit
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

const Scope3 = () => {
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

export default Scope3;

