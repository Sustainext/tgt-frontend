'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import CustomFileUploadWidget from '../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../shared/widgets/assignToWidget';
import CombinedWidget from '../../../shared/widgets/emissioncombinedWidget';
import { GlobalState } from '../../../../Context/page';

const widgets = {
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  EmissonCombinedWidget: CombinedWidget, // Update widgets to include CombinedWidget
};

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      Emission: {
        type: "string",
        title: "Emission",
      },
      FileUpload: {
        type: "string",
        format: "data-url",
      },
      AssignTo: {
        type: "string",
        title: "Assign To",
      },
    }
  }
};

const uiSchema = {
  items: {
    Emission: {
      'ui:widget': 'EmissonCombinedWidget', // Use CombinedWidget for Emission field
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    FileUpload: {
      'ui:widget': 'FileUploadWidget',
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    AssignTo: {
      "ui:widget": "AssignTobutton",
      'ui:options': {
        label: false
      },
    },
    'ui:options': {
      orderable: false,
      addable: false,
      removable: false,
      label: false,
      layout: 'horizontal',
    }
  }
};

const Scope1 = () => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);

  const handleChange = (formData) => setFormData(formData);

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const handleRemove = (indexToRemove) => {
    const updatedFormData = formData.filter((_, index) => index !== indexToRemove);
    setFormData(updatedFormData);
  };

  return (
    <>
     <div className={`overflow-auto custom-scrollbar flex   ${open ? "xl:w-[680px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px] 3xl:w-full"}`}>
        <div>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={(e) => handleChange(e.formData)}
            validator={validator}
            widgets={widgets}
          />
        </div>

        <div className="mt-2">
          {formData.map((_, index) => (
            <button
              key={index}
              className="text-[#007EEF] text-[12px] flex justify-center items-center cursor-pointer ml-3"
              onClick={() => handleRemove(index)}
            >
              <MdOutlineDeleteOutline className="text-red-600 cursor-pointer text-2xl" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>

      <button type="button" onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Scope1;
