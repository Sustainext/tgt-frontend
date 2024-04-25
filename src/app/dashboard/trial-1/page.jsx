'use client'
import React from 'react';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { render } from 'react-dom';

const FormPage = () => {

  const MyCustomWidget = (props) => {
    return (
      <input
        className="block w-[100px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
        placeholder={props.placeholder}
        type="text"
        width={props.width}
        />
    );
  };

  const dateWidget = (props) =>{
    return(
      <div className="w-full max-w-xs mx-2 mb-3">
                    <label className="text-sm  leading-5 text-gray-700 flex">
                        {props.label}
                        <div className="ml-2">
                            {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                    </label>

                    <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter Date"
                        type="date"
                    />
                </div>
    )
  }

  const widgets = {
    myCustomWidget: MyCustomWidget,
    dateWidget: dateWidget
  };

  const schema = {
    title: 'Sample Test Form',
    type: 'object', // Set type to 'object' for form fields
    properties: {
      name: { type: 'string' },
      age: { type: 'number' },
      address: { type: 'string' },
      street: { type: 'string' },
      country: { type: 'string' },
      age4: { type: 'number' },
      date: {type: 'string'}
    },
    required: ['name', 'age', 'name4'],
  };

  const uiSchema = {
    name: {
      'ui:widget': 'myCustomWidget',
      placeholder: 'Name'
    },
    age: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600',
    },
    address: {
      'ui:widget': 'myCustomWidget',
      placeholder: 'Name',
      width: '170px'
    },
    age3: {
      classNames: 'block w-[80px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600',
    },
    street: {
      'ui:widget': 'myCustomWidget',
      placeholder: 'Name'
    },
    country: {
      'ui:widget': 'myCustomWidget',
    },
    age4: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600',
    },
    date:{
      'ui:widget': 'dateWidget'
    },
    "ui:submitButtonOptions": {
      "props": {
        "disabled": false,
        "className": "btn btn-info"
      },
      "norender": true,
      "submitText": "Input"
    }
  };

  return(
    <div className="flex justify-center items-center mx-4 mb-5 mt-5">
    <div className="flex-grow max-w-md mx-2">
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          widgets={widgets}
        />
      </div>
    </div>  )
};

export default FormPage;