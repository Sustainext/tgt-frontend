'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { GlobalState } from '../../../../../../Context/page';
import TextareaWidget from '../../../../../shared/widgets/TextareaWidget';
const widgets = {
TextareaWidgetnew:TextareaWidget,
};

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      Q1: {
        type: "string",
        title: "Please mention the standards used while compiling the information for 302-1 ?",
        format: 'textarea',
      },

      // Define other properties as needed
    }
  }
};


const uiSchema = { // Add flex-wrap to wrap fields to the next line
  items: {
Q1: {
  "ui:title": "Please mention the standards used while compiling the information for 302-1 ?",
  "ui:Gri":"GRI 302-1f",
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
const Source = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);



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
          onChange={(e) => setFormData(e.formData)}
          validator={validator}
          widgets={widgets}
        />
        </div>
      </div>



      <button type="button" onClick={handleSubmit}>Submit</button> {/* Add a submit button */}
    </>
  );
};

export default Source;
