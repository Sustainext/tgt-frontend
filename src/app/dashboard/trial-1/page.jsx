'use client'
import React from 'react';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { render } from 'react-dom';

const FormPage = () => {
  const schema = {
    title: 'Sample Test Form',
    type: 'object', // Set type to 'object' for form fields
    properties: {
      name: { type: 'string' },
      age: { type: 'number' },
      name2: { type: 'string' },
      age2: { type: 'number' },
      name3: { type: 'string' },
      age3: { type: 'number' },
      name4: { type: 'string' },
      age4: { type: 'number' },
    },
    required: ['name', 'age', 'name4'],
  };

  const uiSchema = {
    name: {
      classNames: 'ml-1 block w-[70px] py-2 text-xs leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600',
      placeholder: 'Name'
    },
    age: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600', 
    },
    name3: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600',
      placeholder: 'Name'
    },
    age3: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600', 
    },
    name2: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600',
      placeholder: 'Name'
    },
    age2: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600', 
    },
    name4: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600',
      placeholder: 'Name'
    },
    age4: {
      classNames: 'block w-[60px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-600', 
    },
  };

  return(
    <div className="flex mx-4 mb-5  mt-5">
      <div className="w-full max-w-xs mx-2 mb-3">
        <Form 
          schema={schema} 
          uiSchema={uiSchema} 
          validator={validator} 
        />
      </div>
    </div>  )
};

export default FormPage;
