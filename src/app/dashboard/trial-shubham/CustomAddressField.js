'use client'
import React, { useState,useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdOutlineFileUpload,MdAdd ,MdOutlineDeleteOutline } from "react-icons/md";

export default function CustomAddressField({ formData = {}, onChange, schema }) {
    const [rows, setRows] = useState([{}]); // Initialize with one empty row
    const [formDataObject, setFormDataObject] = useState(formData); // Separate state for formData object
  
    const properties = schema.properties;
  
    useEffect(() => {
      // Update formDataObject whenever formData changes from parent
      setFormDataObject(formData);
    }, [formData]);
  
    const handleFileUpload = (e, index) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const updatedRows = [...rows]; // Copy the rows array
          updatedRows[index] = { ...updatedRows[index], Document: reader.result }; // Update the Document field for the corresponding row
          setRows(updatedRows); // Update the state
          updateFormData(updatedRows); // Update the formDataObject
        };
        reader.readAsDataURL(file);
      }
    };
  
    const updateFormData = (updatedRows) => {
      const updatedFormData = { Energy: [] }; // Initialize formDataObject with Energy array
      updatedRows.forEach((row, index) => {
        const energyData = {}; // Create a new object for each row
        Object.keys(row).forEach((key) => {
          energyData[key] = row[key]; // Set the key-value pairs for the current row
        });
        updatedFormData.Energy.push(energyData); // Push the row object into the Energy array
      });
      setFormDataObject(updatedFormData); // Update the formDataObject state
      onChange(updatedFormData); // Call onChange with the updated formData
    };
  
    const handleAddRow = () => {
      setRows([...rows, {}]); // Add a new empty row
    };
  
    const handleRemoveRow = (index) => {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1); // Remove row at index
      setRows(updatedRows);
      updateFormData(updatedRows); // Update the formDataObject
    };
  
    return (
      <fieldset>
        {rows.map((row, index) => (
          <div key={index}>
            <div className="flex">
              <div className={`overflow-x-scroll custom-scrollbar w-[820px] `}>
                <div className="flex mb-3 mt-3">
                  {Object.keys(properties).map((key) => {
                    const property = properties[key];
                    let inputType = 'text';
  
                    if (property.type === 'date') {
                      inputType = 'date';
                    } else if (property.format === 'email') {
                      inputType = 'email';
                    }
  
                    // Render file input only if property type is not 'file'
                    if (property.format !== 'data-url') {
                      return (
                        <div className="w-full max-w-xs mb-3 px-2" key={key}>
                          <label className="text-sm leading-5 text-gray-700 flex">{property.title}</label>
                          {property.enum ? (
                            <select
                              className="block w-[270px] py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                              value={row[key] || ''}
                              onChange={(e) => {
                                const updatedRows = [...rows]; // Copy the rows array
                                updatedRows[index][key] = e.target.value; // Update the corresponding field for the current row
                                setRows(updatedRows); // Update the state
                                updateFormData(updatedRows); // Update the formDataObject
                              }}
                            >
                              <option value="">{property.placeholder || `Select ${property.title}`}</option>
                              {property.enum.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              className={`block w-[270px] py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300`}
                              type={inputType}
                              placeholder={property.placeholder || `Enter ${property.title}`}
                              value={row[key] || ''}
                              onChange={(e) => {
                                const updatedRows = [...rows]; // Copy the rows array
                                updatedRows[index][key] = e.target.value; // Update the corresponding field for the current row
                                setRows(updatedRows); // Update the state
                                updateFormData(updatedRows); // Update the formDataObject
                              }}
                            />
                          )}
                        </div>
                      );
                    } else {
                      return null; // Skip rendering file input
                    }
                  })}
                </div>
              </div>
              <div className={`flex pt-4 bg-white h-[73px] float-end ml-5`}>
                <div className="flex ml-3 h-[10px]">
                  <div className="w-[85px] h-[30px] px-2.5 py-1 bg-[#007EEF] rounded-l flex-col justify-center items-center inline-flex">
                    <div className="justify-center items-center gap-2 inline-flex">
                      <div className="relative text-white text-[13px] font-medium leading-snug tracking-wide">Assign to</div>
                    </div>
                  </div>
                </div>
                <div className="flex ml-4 h-[10px]">
                  <input
                    type="file"
                    id={`file-upload-${index}`} // Add an id for association with the label
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(e, index)}
                  />
                  <label htmlFor={`file-upload-${index}`} className="text-[#007EEF] text-[14px] flex cursor-pointer">
                    <MdOutlineFileUpload className="text-[18px]" style={{ marginTop: '1px' }} /> Upload
                  </label>
                </div>
                {index > 0 && (
                  <button className="text-[#007EEF] text-[14px] flex cursor-pointer ml-3" onClick={() => handleRemoveRow(index)}>
                    <MdOutlineDeleteOutline className="text-red-600 cursor-pointer text-2xl" />
                  </button>
                )}
              </div>
            </div>
            {index === rows.length - 1 && (
              <button className="text-[#007EEF] text-[14px] flex cursor-pointer mt-5 mb-5" onClick={handleAddRow}>
                <MdAdd className="text-lg" /> Add Row
              </button>
            )}
          </div>
        ))}
      </fieldset>
    );
  }
  