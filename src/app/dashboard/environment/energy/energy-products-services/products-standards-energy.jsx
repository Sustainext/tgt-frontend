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
        title: 'Please mention the standards used while compiling the information for 302-5 ?',
        format: 'textarea',
      },
      textareaQ2: {
        type: 'string',
        title: 'Please mention the methodologies used while compiling the information for 302-5 ?',
        format: 'textarea',
      },
      textareaQ3: {
        type: 'string',
        title: 'Please mention the assumptions used while compiling the information for 302-5 ?',
        format: 'textarea',
      },
      textareaQ4: {
        type: 'string',
        title: 'Please mention the calculation tools used while compiling the information for 302-5 ?',
        format: 'textarea',
      },
    }
  }
};
const uiSchema = {
  items: {
    textareaQ1: {
      "ui:title": "Please mention the standards used while compiling the information for 302-5 ?",
      "ui:Gri": "GRI 302-5c",
      'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
      'ui:options': {
        label: false // This disables the label for this field
      },
    },
    textareaQ2: {
        "ui:title": "Please mention the methodologies used while compiling the information for 302-5 ?",
        "ui:Gri": "GRI 302-5c",
        'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
        'ui:options': {
          label: false // This disables the label for this field
        },
      },
      textareaQ3: {
        "ui:title": "Please mention the assumptions used while compiling the information for 302-5 ?",
        "ui:Gri": "GRI 302-5c",
        'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
        'ui:options': {
          label: false // This disables the label for this field
        },
      },
      textareaQ4: {
        "ui:title": "Please mention the calculation tools used while compiling the information for 302-5 ?",
        "ui:Gri": "GRI 302-5c",
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

const ProductsStandardsenergy = () => {

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


export default ProductsStandardsenergy;
