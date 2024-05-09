'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdOutlineFileUpload, MdAdd, MdOutlineDeleteOutline, MdFilePresent } from "react-icons/md";
import CustomAddressField from '../../../wid';
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
          tooltiptext:"Indicate the type of energy generated from the drop down"
        },
        Source: {
          type: "string",
          title: "Source",
          enum: ['Coal', 'Solar', 'LPG', 'Diesel', 'Wind', 'Hydro'],
          tooltiptext:"Indicate where the energy comes from"
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
          tooltiptext:"Indicate the quantity that is self-generated but not consumed"
        },
        Unit: {
          type: "string",
          title: "Unit",
          enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
          tooltiptext:"Select the correct unit corresponding to the quantity of self-generated but not consumed."
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

const Selfgenerated = ({ }) => {
  const [formData, setFormData] = useState({});

  const handleFormDataChange = (data) => {
    setFormData(data.formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form data:', formData);

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
    >
      {/* Custom submit button */}
      <div className="flex justify-end mt-4 right-1">
        <button
          type="submit"
          className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Form>
  );
};



export default Selfgenerated;
