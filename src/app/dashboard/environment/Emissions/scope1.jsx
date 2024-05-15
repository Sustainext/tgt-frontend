'use client'
import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import CustomFileUploadWidget from '../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../shared/widgets/assignToWidget';
import CombinedWidget from '../../../shared/widgets/emissioncombinedWidget';
import { GlobalState } from '../../../../Context/page';
import RemoveWidget from '../../../shared/widgets/RemoveWidget';
const widgets = {
  EmissonCombinedWidget: CombinedWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  RemoveWidget: RemoveWidget, // Update widgets to include CombinedWidget
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
      Remove: {
        type: "string",

      },
    }
  }
};

const uiSchema = {
  className: 'flex flex-wrap',
  items: {
    classNames: 'flex flex-col md:flex-row w-full md:w-auto',
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
      'ui:horizontal': true,
      'ui:options': {
        label: false
      },
    },
    Remove: {
      "ui:widget": "RemoveWidget",
      'ui:horizontal': true,
      'ui:options': {
        label: false // This disables the label for this field
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



  return (
    <>
      <div className={`overflow-auto custom-scrollbar flex ${open ? "xl:w-[680px] 2xl:w-[1100px]" : "xl:w-[940px] 2xl:w-[1348px]"}`}>
        <div>
          <Form
            className='flex'
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={(e) => handleChange(e.formData)}
            validator={validator}
            widgets={{
              ...widgets,
              RemoveWidget: () => <RemoveWidget formData={formData} setFormData={setFormData} />
            }}
          />
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
