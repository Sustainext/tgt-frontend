'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget2 from "../../../../shared/widgets/Textarea/TextareaWidget2";const widgets = {
    TextareaWidgetnew: TextareaWidget2,
};

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            Q1: {
                type: "string",
                format: 'textarea',
            },
            Q2: {
                type: "string",
                format: 'textarea',
            },

            // Define other properties as needed
        }
    }
};


const uiSchema = { // Add flex-wrap to wrap fields to the next line
    items: {
        Q1: {
            "ui:hadding": "Impact Analysis: Inputs, Activities, Outputs",
            "ui:title": "Describe the inputs, activities, and outputs that lead or could lead to these impacts",
            "ui:tooltipshadding": "Please specify the inputs, activities, and outputs that lead or could lead to actual and potential waste related impacts.Include: The types of inputs and outputs can include raw materials, process and manufacturing materials, leaks and losses, waste, by-products, products, or packaging.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "block",
            "ui:titletooltipdisplay": "none",
            "ui:Gri": "GRI 306-1a",
            'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q2: {
            "ui:hadding": "Activities resulting into waste",
            "ui:title": "Describe whether these impacts relate to waste generated in the organization’s own activities or to waste generated upstream or downstream in its value chain.",
            "ui:tooltipshadding": "Please provide the description of the impacts relate to waste generated in the organization’s own activities or to waste generated upstream or downstream in its value chain. Impacts: effect the organization has or could have on the economy,environment, and people, including on their human rights, which in turn can indicate its contribution (negative or positive) to sustainable development.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "block",
            "ui:titletooltipdisplay": "none",
            "ui:Gri": "GRI 306-1b",
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
const Significantwasteimpact = () => {
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

export default Significantwasteimpact;
