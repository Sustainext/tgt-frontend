'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget from '../../../../shared/widgets/Textarea/TextareaWidget';
const widgets = {
  TextareaWidgetnew: TextareaWidget,
};
const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      textareaQ1: {
        type: 'string',
        title: 'Please mention the standards used while compiling the information for 302-4 ?',
        format: 'textarea',
      },
      textareaQ2: {
        type: 'string',
        title: 'Please mention the methodologies used while compiling the information for 302-4 ?',
        format: 'textarea',
      },
      textareaQ3: {
        type: 'string',
        title: 'Please mention the assumptions used while compiling the information for 302-4 ?',
        format: 'textarea',
      },
      textareaQ4: {
        type: 'string',
        title: 'Please mention the calculation tools used while compiling the information for 302-4 ?',
        format: 'textarea',
      },
    }
  }
};
const uiSchema = {
  items: {
    textareaQ1: {
      "ui:title": "Please mention the standards used while compiling the information for 302-4 ?",
      "ui:Gri": "GRI 302-4d",
      'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    textareaQ2: {
        "ui:title": "Please mention the methodologies used while compiling the information for 302-4 ?",
        "ui:Gri": "GRI 302-4d",
        'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
        'ui:options': {
          label: false // This disables the label for this field
        },
      },
      textareaQ3: {
        "ui:title": "Please mention the assumptions used while compiling the information for 302-4 ?",
        "ui:Gri": "GRI 302-4d",
        'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
        'ui:options': {
          label: false // This disables the label for this field
        },
      },
      textareaQ4: {
        "ui:title": "Please mention the calculation tools used while compiling the information for 302-4 ?",
        "ui:Gri": "GRI 302-4d",
        'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
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

const Standardsenergy = () => {
  const [formData, setFormData] = useState([{}]);
  const handleChange = (e) => {
    setFormData(e.formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };


  return (
    <>
      <div >
        <div>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={handleChange}
          validator={validator}
          widgets={widgets}
        />
        </div>
      </div>
      <div className='mb-4'>
      <button type="button"  className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};


export default Standardsenergy;
