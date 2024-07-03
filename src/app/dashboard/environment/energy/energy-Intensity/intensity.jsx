'use client'
import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import { GlobalState } from '../../../../../Context/page';
import dateWidget from '../../../../shared/widgets/Input/dateWidget';
import selectWidget from '../../../../shared/widgets/Select/selectWidget';
import inputWidget from '../../../../shared/widgets/Input/inputWidget';
import CustomFileUploadWidget from '../../../../shared/widgets/CustomFileUploadWidget';
import AssignToWidget from '../../../../shared/widgets/assignToWidget';
import CustomSelectInputWidget from '../../../../shared/widgets/CustomSelectInputWidget';
import RemoveWidget from '../../../../shared/widgets/RemoveWidget';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
const widgets = {
  inputWidget: inputWidget,
  dateWidget: dateWidget,
  selectWidget: selectWidget,
  FileUploadWidget: CustomFileUploadWidget,
  AssignTobutton: AssignToWidget,
  CustomSelectInputWidget: CustomSelectInputWidget,
  RemoveWidget: RemoveWidget,
};

const view_path = 'gri-environment-energy-302-3a-3b-3c-3d-energy_intensity'
const client_id = 1
const user_id = 1

// const schema = {
//   type: 'array',
//   items: {
//     type: 'object',
//     properties: {
//       EnergyType: {
//         type: "string",
//         title: "Energy Type",
//         enum: ['heating', 'cooling', 'steam', 'electricity', 'Fuel', 'Energy inside the organization (302-1)', 'Energy outside the organization (302-2)', 'Total Energy (302-1+302-2)', 'others'],
//         tooltiptext: "Indicate the type of energy for which energy intensity should be calculated",
//       },
//       EnergyQuantity: {
//         type: "string",
//         title: "Energy Quantity",
//         tooltiptext: "Indicate the quantity of Energy Type"
//       },
//       Unit: {
//         type: "string",
//         title: "Unit",
//         enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
//         tooltiptext: "Select the correct unit corresponding to the quantity"
//       },
//       Organizationmetric: {
//         type: "string",
//         title: "Organization Metric",
//         enum: ['Production volume', 'size', 'number of full time employees', 'monetary units (such as revenue or sales)', 'Production units', 'MMBtu'],
//         tooltiptext: "Select the organization metric for the corresponding Energy Intensity metric "
//       },
//       Metricquantity: {
//         type: "string",
//         title: "Metric Quantity",
//         tooltiptext: "Indicate the quantity for Organization metric"
//       },
//       Metricunit: {
//         type: "string",
//         title: "Metric Unit",
//         enum: ['Tonne', 'meter square', 'sales unit', 'liters', 'MWh', 'Revenue','FTE','Others'],
//         tooltiptext: "Select the correct unit corresponding to the metric quantity."
//       },
//       AssignTo: {
//         type: "string",
//         title: "Assign To",
//       },
//       FileUpload: {
//         type: "string",
//         format: "data-url",
//         title: "File Upload",
//       },
//       Remove: {
//         type: "string",
//         title: "Remove",
//       },
//       // Define other properties as needed
//     }
//   }
// };

// const uiSchema = {
//  // Add flex-wrap to wrap fields to the next line
//   items: {
//     classNames: 'fieldset',
//     'ui:order': [
//       'EnergyType', 'EnergyQuantity', 'Unit', 'Organizationmetric', 'Metricquantity', 'Metricunit', 'AssignTo', 'FileUpload', 'Remove'
//     ],
//     EnergyType: {
//       'ui:widget': 'selectWidget',
//       'ui:horizontal': true,
//       'ui:options': {
//         label: false,
//       },
//     },
//     EnergyQuantity: {
//       'ui:widget': 'inputWidget', // Use your custom widget for QuantityUnit
//       'ui:options': {
//         label: false // This disables the label for this field
//       },
//     },
//     Unit: {
//       'ui:widget': 'selectWidget',
//       'ui:horizontal': true,
//       'ui:options': {
//         label: false // This disables the label for this field
//       },
//     },
//     Organizationmetric: {
//       'ui:widget': 'selectWidget',
//       'ui:horizontal': true,
//       'ui:options': {
//         label: false // This disables the label for this field
//       },
//     },
//     Metricquantity: {
//       'ui:widget': 'inputWidget', // Use your custom widget for QuantityUnit
//       'ui:options': {
//         label: false // This disables the label for this field
//       },
//     },
//     Metricunit: {
//       'ui:widget': 'selectWidget',
//       'ui:horizontal': true,
//       'ui:options': {
//         label: false // This disables the label for this field
//       },
//     },
//     AssignTo: {
//       "ui:widget": "AssignTobutton",
//       'ui:horizontal': true,
//       'ui:options': {
//         label: false // This disables the label for this field
//       },
//     },
//     FileUpload: {
//       'ui:widget': 'FileUploadWidget',
//       'ui:horizontal': true,
//       'ui:options': {
//         label: false // This disables the label for this field
//       },
//     },
//     Remove: {
//       "ui:widget": "RemoveWidget",
//       'ui:options': {
//         label: false // This disables the label for this field
//       },
//     },
//     'ui:options': {
//       orderable: false, // Prevent reordering of items
//       addable: false, // Prevent adding items from UI
//       removable: false, // Prevent removing items from UI
//       layout: 'horizontal', // Set layout to horizontal
//     }
//   }
// };

const generateTooltip = (field, title, tooltipText) => {
  if (field === "FileUpload" || field === "AssignTo" || field === "Remove") {
    return null; // Return null to skip rendering tooltip for these fields
  }

  return (
    <div className='mx-2 flex w-[20vw]'>
      <label className="text-[13px] leading-5 text-gray-700 flex">{title}</label>
      <MdInfoOutline
        data-tooltip-id={field}
        data-tooltip-content={tooltipText}
        className="mt-1 ml-2 text-[12px]"
      />
      <ReactTooltip
        id={field}
        place="top"
        effect="solid"
        style={{
          width: "290px",
          backgroundColor: "#000",
          color: "white",
          fontSize: "12px",
          boxShadow: 3,
          borderRadius: "8px",
          textAlign: 'left',
        }}
      />
    </div>
  );
};

const Intensity = ({location, year, month}) => {
  const { open } = GlobalState();
  const [formData, setFormData] = useState([{}]);
  const [r_schema, setRemoteSchema] = useState({})
  const [r_ui_schema, setRemoteUiSchema] = useState({})
  const [loopen, setLoOpen] = useState(false);
  const toastShown = useRef(false);
  const getAuthToken = () => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('token')?.replace(/"/g, "");
      }
      return '';
  };
  const token = getAuthToken();

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const handleChange = (e) => {
    setFormData(e.formData);

  };

  const handleAddNew = () => {
    const newData = [...formData, {}];
    setFormData(newData);

  };

  //The below code
  let axiosConfig = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const updateFormData = async () => {
    const data = {
      client_id : client_id,
      user_id : user_id,
      path: view_path,
      form_data: formData,
      location,
      year,
      month
    }

    const url = `${process.env.BACKEND_API_URL}/datametric/update-fieldgroup`
    try{
      const response = await axios.post(url, data, axiosConfig);

      if (response.status === 200) {
        toast.success("Data added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        loadFormData();

      }else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    } catch (error) {
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    }
  };

  const loadFormData = async () => {
      LoaderOpen();
      setFormData([{}])
      const url = `${process.env.BACKEND_API_URL}/datametric/get-fieldgroups?path_slug=${view_path}&client_id=${client_id}&user_id=${user_id}&location=${location}&year=${year}&month=${month}`;
      try {
          const response = await axios.get(url, axiosConfig);
          console.log('API called successfully:', response.data);
          setRemoteSchema(response.data.form[0].schema);
          setRemoteUiSchema(response.data.form[0].ui_schema);
          const form_parent = response.data.form_data;
          setFormData(form_parent[0].data);
      } catch (error) {
          console.error('API call failed:', error);
      } finally {
          LoaderClose();
      }
  };
  //Reloading the forms -- White Beard
  useEffect(() => {
    //console.long(r_schema, '- is the remote schema from django), r_ui_schema, '- is the remote ui schema from django')
  },[r_schema, r_ui_schema])

  // console log the form data change
  useEffect(() => {
    console.log('Form data is changed -', formData)
  },[formData])

  // fetch backend and replace initialized forms
  useEffect (()=> {
    if (location && year && month) {
        loadFormData();
        toastShown.current = false; // Reset the flag when valid data is present
    } else {
        // Only show the toast if it has not been shown already
        if (!toastShown.current) {
            toast.warn("Please select location, year, and month first", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            toastShown.current = true; // Set the flag to true after showing the toast
        }
    }
  },[location, year, month])

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form data:', formData);
    updateFormData()

  };
  const updateFormDatanew = (updatedData) => {
    setFormData(updatedData);

  };
  const handleRemove = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };
  const renderFields = () => {
    if (!r_schema || !r_schema.items || !r_schema.items.properties) {
      return null;
    }
    const fields = Object.keys(r_schema.items.properties);
    return fields.map((field, index) => (
      <div key={index}>
        {generateTooltip(field, r_schema.items.properties[field].title, r_schema.items.properties[field].tooltiptext)}
      </div>
    ));
  };  
  return (
    <>

<ToastContainer style={{ fontSize: "12px" }} />
        <div className={`overflow-auto custom-scrollbar flex`}>
        <div>
          <div>
            <div className='flex'>
              {renderFields()} {/* Render dynamic fields with tooltips */}
            </div>
          </div>

          <Form
          className='flex'
            schema={r_schema}
            uiSchema={r_ui_schema}
            formData={formData}
            onChange={handleChange}
            validator={validator}
            widgets={{
              ...widgets,
              RemoveWidget: (props) => (
                <RemoveWidget
                  {...props}
                  index={props.id.split('_')[1]} // Pass the index
                  onRemove={handleRemove}
                />
              ),
              FileUploadWidget: (props) => (
                <CustomFileUploadWidget
                  {...props}
                  scopes="in1"
                  setFormData={updateFormDatanew}
                />
              )

            }}

          />
        </div>
        {loopen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <Oval
              height={50}
              width={50}
              color="#00BFFF"
              secondaryColor="#f3f3f3"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
      </div>

      <div className="flex justify-start mt-4 right-1">
        <button type="button" className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddNew}>
          <MdAdd className='text-lg' /> Add Row
        </button>
      </div>
      <div className='mb-4'>
      <button type="button"  className=" text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline float-end" onClick={handleSubmit}>Submit</button>
      </div>

    </>
  );
};

export default Intensity;
