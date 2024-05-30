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
            Q3: {
                type: "string",
                format: 'textarea',
            },
            Q4: {
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
            "ui:hadding": "Interactions with Water as shared resource",
            "ui:title": "Describe how the organization interacts with water.",
            "ui:tooltipstitle": "In the description, include how, and where water is withdrawn, consumed, and discharged, as well as water-related impacts the organization has caused or contributed to, or those that are directly related to its operations, products, and services. An overview of water use across the organization’s value chain.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-1a",
            'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q2: {
            "ui:hadding": "Water Related Impact",
            "ui:title": "Describe the approach used to identify water-related impacts ",
            "ui:tooltipstitle": "Include scope of assessments, their timeframe, and any tools or methodologies used.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-1b",
            'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q3: {
            "ui:hadding": "Water Related Impact",
            "ui:title": "Describe how water-related impacts are addressed",
            "ui:tooltipstitle": "Include how the organization works with stakeholders to steward water as a shared resource, and how it engages with suppliers or customers with significant water-related impacts",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-1c",
            'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q4: {
            "ui:hadding": "Water-related goals and targets",
            "ui:title": "Describe the process for setting any water-related goals and targets that are part of the Organization's approach to managing water-related impacts.",
            "ui:tooltipstitle": "Include water-related goals and targets that are part of the organization’s approach to managing water and effluents, and how they relate to public policy and the local context of each area with water stress",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-1d",
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
const Watersharedresourceimpact = () => {
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

export default Watersharedresourceimpact;
