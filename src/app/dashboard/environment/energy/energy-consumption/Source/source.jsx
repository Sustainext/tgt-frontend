'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { GlobalState } from '../../../../../../Context/page';

const schema = {
  type: 'object',
  properties: {
    Energy: {
      type: 'object',
      properties: {
        Descriptionone: {
          type: 'string',
          title: 'Please mention the source of conversion factors used while compiling the information for 302-1?',
          format: 'textarea',
        }

      },
    },
  },
};

const uiSchema = {
  'ui:order': ['Energy'],
  Energy: {
    'ui:field': 'custom-ui',
  },
};

const Source = () => {
  const [formData, setFormData] = useState({});

  const handleFormDataChange = (data) => {
    setFormData(data.formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={handleFormDataChange}
        validator={validator}
        fields={{
          'custom-ui': CustomAddressField,
        }}
      >
        {/* Custom submit button */}
        <div className="flex justify-end mt-4 right-1">
          <button
            type="submit"
            className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

const CustomAddressField = ({ formData = {}, onChange, schema }) => {
    const { open } = GlobalState();
    const [showTextArea, setShowTextArea] = useState(false);

    // Define properties from schema
    const properties = schema.properties;

    const handleInputChange = (event, key) => {
      const { value } = event.target;
      onChange({ ...formData, [key]: value });
    };

    return (
      <fieldset>
        {Object.keys(properties).map((key, index) => (
          <div key={index} className='mt-3 mb-4'>
            <div className='flex justify-between'>
              <div>
                <h6 className='text-sm text-[#727272]'>{properties[key].title}</h6>
              </div>
              <div className={`${open ? 'w-[20%]' : 'w-[20%]'}`}>
                <div className="bg-sky-100 h-[25px] w-[70px] rounded-md mx-2">
                  <p className="text-[#0057A5] text-[10px] inline-block align-middle px-2 font-semibold">GRI 302-1f</p>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <textarea
                id={key}
                name={key}
                placeholder={`Enter a description...`}
                className={`backdrop:before:w-[48rem] border appearance-none text-xs border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer ${open ? 'sm:w-[48rem] md:w-[89%] lg:w-[87%] xl:w-[89.5%] 2xl:w-[85%] ' : 'sm:w-[85%] md:w-[92%] lg:w-[88%] xl:w-[87.5%] 2xl:sm:w-[86%]'}`}
                value={formData[key] || ''}
                onChange={(event) => handleInputChange(event, key)} // Pass key to handleInputChange
                rows={7}
              />
            </div>
          </div>
        ))}
      </fieldset>
    );
  };



export default Source;
