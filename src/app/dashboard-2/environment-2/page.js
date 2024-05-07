'use client'
import React, { useState } from 'react';
import  Form  from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdOutlineFileUpload, MdAdd, MdOutlineDeleteOutline, MdFilePresent, MdArrowDropDown } from "react-icons/md";
import dateWidget from '../../shared/widgets/dateWidget';
import selectWidget from '../../shared/widgets/selectWidget';
import inputWidget from '../../shared/widgets/inputWidget';

const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget
};

const schema = {
  title: 'Emissions',
  type: 'object',
  properties: {
    Category: {
      type: "string",
      title: "Category",
      enum: ['Category', 'Heating', 'Cooling', 'Steam'],
    },
    // Define other properties as needed
  },
};

const uiSchema = {
  Category: {
    classNames: 'px-4 mb-4 inline-block w-[100px]',
    'ui:widget': 'selectWidget',
    'ui:horizontal': true,
    enum: [
      { value: 'Heating', label: 'Heating' },
      { value: 'Cooling', label: 'Cooling' },
      { value: 'Steam', label: 'Steam' },
    ],
  },
  // Define UI schema for other properties
};

const environment2 = () => {
  const [formData, setFormData] = useState({});
  const [formCount, setFormCount] = useState(1); // Initial form count

  const handleFormDataChange = (data) => {
    setFormData(data.formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form data:', formData);
  };

  const handleAddForm = () => {
    setFormCount(formCount + 1);
  };

  const renderForms = () => {
    const forms = [];
    for (let i = 0; i < formCount; i++) {
      forms.push(
        <Form
          key={i}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={handleFormDataChange}
          validator={validator}
          widgets={widgets}
        />
      );
    }
    return forms;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render each form field */}
      <div className="px-4 mb-4 flex flex-wrap text-xs">
        {renderForms()}
      </div>
      {/* Custom submit button */}
      <div className="flex justify-start mt-4 right-1">
        <button
          type="submit"
          className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <AddButton onClick={handleAddForm} />
      </div>
    </form>
  );
};

const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-center py-1 text-sm w-[100px] bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline ml-4"
    >
      Add Form
    </button>
  );
};

export default environment2;
