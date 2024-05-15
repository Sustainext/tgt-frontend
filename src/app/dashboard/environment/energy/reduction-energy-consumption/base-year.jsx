'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget from '../../../../shared/widgets/TextareaWidget';
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
        title: 'What is the basis for calculating reductions in energy consumptions such as base year ',
        format: 'textarea',
      },

    }
  }
};
const uiSchema = {
  items: {
    textareaQ1: {
      "ui:title": "What is the basis for calculating reductions in energy consumptions such as base year",
      "ui:Gri": "GRI 302-4c",
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

const Baseyearenergy = () => {

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


export default Baseyearenergy;
