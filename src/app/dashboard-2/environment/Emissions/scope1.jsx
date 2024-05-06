'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdOutlineFileUpload, MdAdd, MdOutlineDeleteOutline, MdFilePresent,MdArrowDropDown  } from "react-icons/md";
import dateWidget from '../../../shared/widgets/dateWidget'
import selectWidget from '../../../shared/widgets/selectWidget'
import inputWidget from '../../../shared/widgets/inputWidget'

const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget
};

const schema = {
    title: 'Emissions',
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
      Document: {
        type: "string",
        title: "Upload Document",
        format: "data-url",  // This format helps to handle file data as a base64 encoded string
      }
    },

};

const uiSchema = {

    Category:{
      classNames: 'px-4 mb-6',
      'ui:widget': 'selectWidget',
      'ui:horizontal': false,
      enum: [
          { value: 'Heating', label: 'Heating' },
          { value: 'Cooling', label: 'Cooling' },
          { value: 'Steam', label: 'Steam' },
      ],
    },
    Subcategory:{
      classNames: 'px-4 mb-4',
      'ui:widget': 'selectWidget',
      'ui:horizontal': false,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
    Activity:{
      classNames: 'px-4 mb-4',
      'ui:widget': 'selectWidget',
      'ui:horizontal': false,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
       ],
    },
    Quantity:{
      classNames: 'px-4 mb-4',
      'ui:widget': 'inputWidget',
      'ui:horizontal': false,
    
    },
    Unit:{
      classNames: 'px-4 mb-4',
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
      },
    Test:{
      classNames: 'px-4 mb-4',
      'ui:widget': 'selectWidget',
      'ui:horizontal': true,
      enum: [
        { value: 'Heating', label: 'Heating' },
        { value: 'Cooling', label: 'Cooling' },
        { value: 'Steam', label: 'Steam' },
      ],
    },
};

const Scope1 = ({ }) => {
  const [formData, setFormData] = useState({});

  const handleFormDataChange = (data) => {
    setFormData(data.formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form data:', formData);

  };
  return (
    <form onSubmit={handleSubmit}>
    {/* Render each form field */}
    <div className="px-4 mb-4 flex flex-wrap">

    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={handleFormDataChange}
      validator={validator}
      widgets={widgets}
    >
      {/* Custom submit button */}
      <div className="flex justify-start mt-4 right-1">
        <button
          type="submit"
          className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Form>
    </div>
    </form>

  );
};


export default Scope1;
