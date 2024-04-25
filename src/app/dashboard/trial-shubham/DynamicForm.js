'use client'
import React from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8'; // Rename the import to make it clear

const schema = {
    type: "object",
    required: ["EnergyType", "Source", "Purpose", "Renewable", "Quantity", "Unit" , "Document"],
    properties: {
      EnergyType: {
        type: "string",
        title: "Energy Type",
        enum: ['Electricity', 'Heating', 'Cooling','Steam'],

      },
      Source: {
        type: "string",
        title: "Source",
        enum: ['Coal', 'Solar', 'LPG','Diesel','Wind','Hydro'],

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
        enum: ['Joules', 'KJ', 'Wh','KWh','GJ','MMBtu'],

      },
      Document: {
        type: "string",
        title: "Upload Document",
        format: "data-url",  // This format helps to handle file data as a base64 encoded string
      }
    }
};

const uiSchema = {
  EnergyType: {
    "ui:widget": "myCustomSelectWidget",

  },
  Source: {
    "ui:widget": "myCustomSelectWidget",

  },
  Purpose: {
    "ui:widget": "myCustomWidget",
    "ui:placeholder": "Type here...",

  },
  Renewable: {
    "ui:widget": "myCustomSelectWidget",

  },
  Quantity: {
    "ui:widget": "myCustomWidget",
    "ui:placeholder": "Type here...",

  },
  Unit: {
    "ui:widget": "myCustomSelectWidget",

  },
  Document: {
    "ui:widget": "myFileWidget",  // Reference to custom file widget
  }
};

// Instantiate the validator class with an empty configuration object
const MyCustomWidget = (props) => {
  return (
    <div className="flex flex-col mb-4">
    <input
      className="block w-full py-2 mb-4 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
      placeholder={props.placeholder}
      type="text"
      width={props.width}
      />
      </div>
  );
};
const MyCustomSelectWidget = ({ id, options, value, onChange, onBlur, onFocus }) => (
  <div className="flex flex-col mb-4">
  <select
    id={id}
    className="block w-full py-2 mb-4 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    onBlur={onBlur}
    onFocus={onFocus}
  >
    {options.enumOptions.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
  </div>
);
const MyFileWidget = ({ id, onChange }) => (
  <div className="flex flex-col mb-4">
  <input
    id={id}
    type="file"
    className="block w-full text-sm py-2 mb-4 leading-6 focus:outline-none focus:shadow-outline focus:border-blue-300 sm:text-sm sm:leading-5"
    onChange={(event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          onChange(loadEvent.target.result);
        };
        reader.readAsDataURL(file);
      }
    }}
  />
  </div>
);

const widgets = {
  myCustomWidget: MyCustomWidget,
  myCustomSelectWidget:MyCustomSelectWidget,
  myFileWidget:MyFileWidget,

};
const DynamicForm = () => {
    return (
      <div className='flex mt-10 '>
  <div>
        <Form schema={schema} uiSchema={uiSchema} widgets={widgets} validator={validator}  className='fieldset-custom'   />
      </div>
      <div>
        <h2>form</h2>
      </div>
      </div>

    );
};

export default DynamicForm;
