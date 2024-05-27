'use client'
import React, { useState} from 'react';
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


            // Define other properties as needed
        }
    }
};


const uiSchema = { // Add flex-wrap to wrap fields to the next line
    items: {
        Q1: {
            "ui:hadding": "Impact Analysis: Inputs, Activities, Outputs",
            "ui:title": "Provide contextual information necessary to understand the data and how the data has been compiled.",
            "ui:tooltipshadding": "Please provide contextual information necessary to understand the data and how the data has been compiled. e.g. any standards, methodologies etc. used for data compilation. ",
            "ui:tooltipstitle": "Please provide contextual information necessary to understand the data and how the data has been compiled. e.g. any standards, methodologies etc. used for data compilation.",
            "ui:haddingdisplay": "none",
            "ui:titlediplay": "block",
            "ui:haddingtooltipdisplay": "none",
            "ui:titletooltipdisplay": "block",
            "ui:Gri": "GRI 306-3b",
             "ui:gridisplay" :"none",
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
const Wastecontextualinformation = () => {
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

export default Wastecontextualinformation;
