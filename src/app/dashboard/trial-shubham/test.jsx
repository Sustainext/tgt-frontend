'use client'
import React, { useState,useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdOutlineFileUpload,MdAdd ,MdOutlineDeleteOutline } from "react-icons/md";
import CustomAddressField from './CustomAddressField'
const schema = {
  type: 'object',
  properties: {
    Energy: {
      type: 'object',
      properties: {
        EnergyType: {
          type: "string",
          title: "Energy Type",
          enum: ['Electricity', 'Heating', 'Cooling', 'Steam'],
        },
        Source: {
          type: "string",
          title: "Source",
          enum: ['Coal', 'Solar', 'LPG', 'Diesel', 'Wind', 'Hydro'],
        },
        Purpose: {
          type: "string",
          title: "Purpose"
        },
        Renewable: {
          type: "string",
          title: "Renewable/ Non-renewable",
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
        TestField: {
          type: "string",
          title: "Unit",
          enum: ['Unit 1', 'Unit 2', 'Unit 3', 'KWh', 'GJ', 'MMBtu'],
        },
        Document: {
          type: "string",
          title: "Upload Document",
          format: "data-url",  // This format helps to handle file data as a base64 encoded string
        }
      },
    },
  },
};

const uiSchema = {
  'ui:order': ['Energy'],
  Energy: {
    'ui:field': 'custom-ui',
  },
};

const CustomForm = () => {
  const [formData, setFormData] = useState({});

  const handleFormDataChange = (data) => {
    setFormData(data.formData);
  };

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={handleFormDataChange}
      validator={validator}
      fields={{
        'custom-ui': CustomAddressField,
      }}
      onSubmit={({ formData }) => console.log('Form data:', formData)}
    />
  );
};


export default CustomForm;


