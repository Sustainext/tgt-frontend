'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import TextareaWidget2 from "../../../../shared/widgets/TextareaWidget2";
const widgets = {
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
            "ui:hadding": "Discharge Standards Used",
            "ui:title": "Describe any minimum standards set for the quality of effluent discharge.",
            "ui:tooltipstitle": "Include a description of standards used to set the quality of effluent discharge.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-2a",
            'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q2: {
            "ui:hadding": "Discharge Standards",
            "ui:title": "Describe the process of determining discharge standards for facilities with no local discharge requirements",
            "ui:tooltipstitle": "ndicate how the company determine discharge standards for facilities without local discharge requirements.(Please specify the identification method use to determine standards (if any)",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-2a",
            'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q3: {
            "ui:hadding": "Internal Water Quality Standards",
            "ui:title": "Describe internally developed water quality standards or guidelines used (if any)",
            "ui:tooltipstitle": "Include how the organization works with stakeholders to steward water as a shared resource, and how it engages with suppliers or customers with significant water-related impactsDescribe how the internally developed water quality standards or guidelines were determined.",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-2a",
            'ui:widget': 'TextareaWidgetnew', // Use your custom widget for QuantityUnit
            'ui:options': {
                label: false // This disables the label for this field
            },
        },
        Q4: {
            "ui:hadding": "Sector-specific Standards",
            "ui:title": "Describe the sector-specific standards or guidelines used (if any)",
            "ui:tooltipstitle": " Provide a description of how the sector-specific standards were considered",
            "ui:haddingdisplay": "block",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 303-2a",
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
const Sharedresource = () => {
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

export default Sharedresource;
