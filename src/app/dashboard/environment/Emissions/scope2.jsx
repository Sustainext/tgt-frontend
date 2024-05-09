'use client'
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { MdOutlineFileUpload, MdAdd, MdOutlineDeleteOutline, MdFilePresent, MdArrowDropDown,MdClose  } from "react-icons/md";
import { GlobalState } from '../../../../Context/page';
const schema = {
  type: 'object',
  properties: {
    Emissions: {
      type: 'object',
      properties: {
        Category: {
          type: "string",
          title: "Category",
          enum: ['Category', 'Heating', 'Cooling', 'Steam'],
        },
        Subcategory: {
          type: "string",
          title: "Subcategory",
          enum: ['Coal', 'Solar', 'LPG', 'Diesel', 'Wind', 'Hydro'],
        },
        Activity: {
          type: "string",
          title: "Activity",
          enum: ['Renewable', 'Non-renewable'],
        },
        Quantity:{
            type: "string",
          title: "Activity",
        },
        Unit: {
          title: "Unit",
          enum: ['Joules', 'KJ', 'Wh', 'KWh', 'GJ', 'MMBtu'],
        },
        Document: {
          title: "Upload Document",
          format: "data-url",  // This format helps to handle file data as a base64 encoded string
        }
      },
    },
  },
};

const uiSchema = {
  'ui:order': ['Emissions'],
  Emissions: {
    'ui:field': 'custom-ui',
  },
};

//   return (
//     <Tooltip title={tooltiptext} arrow placement="top" componentsProps={{
//       tooltip: {
//           sx: {
//               backgroundColor: '#000',
//               color: 'white',
//               fontSize: '12px',
//               boxShadow: 3,
//               borderRadius:"8px"
//           },
//       },
//       arrow: {
//           sx: {
//               color: '#000',
//           },
//       },
//   }}>
//   <MdInfoOutline/>
// </Tooltip>
//   );
// };
const Scope2 = ({ handleScope2Change}) => {
  const [formData, setFormData] = useState({});

  const handleFormDataChange = (data) => {
    handleScope2Change(data.formData);
    setFormData(data.formData);
  };

  return (
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


    </Form>

  );
};




const CustomAddressField = ({ formData = {}, onChange, schema, }) => {
  const { open } = GlobalState();
  const [rows, setRows] = useState([{}]);
  const [formDataObject, setFormDataObject] = useState(formData);
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileNames, setFileNames] = useState({});
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const properties = schema.properties;

  useEffect(() => {
    if (JSON.stringify(formDataObject) !== JSON.stringify(formData)) {
      setFormDataObject(formData);
    }
  }, [formData, formDataObject]);


  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedRows = [...rows];
        updatedRows[index] = { ...updatedRows[index], Document: reader.result, fileType: file.type,fileName: file.name,
          fileSize: file.size,
          uploadDate: new Date().toLocaleDateString()};
        setRows(updatedRows);
        updateFormData(updatedRows);
        setPreviewData(reader.result);
        setFileType(file.type);
        setFileNames({ ...fileNames, [index]: file.name });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleOpenModal = (index) => {
    setCurrentRowIndex(index);
    setShowModal(true);
    setPreviewData(rows[index].Document);
    setFileType(rows[index].fileType);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteFile = () => {
    if (currentRowIndex !== null && rows[currentRowIndex]) {
      const updatedRows = [...rows];
      updatedRows[currentRowIndex].Document = ''; // Set the Document field to an empty string
      setRows(updatedRows); // Update the rows state
      setFileNames({ ...fileNames, [currentRowIndex]: '' }); // Clear the file name associated with the current row
      // No need to close the modal here
      setShowModal(false);
    }
  };

  const updateFormData = (updatedRows) => {
    const updatedFormData = { Emissions: [] };
    updatedRows.forEach((row, index) => {
      const energyData = {};
      Object.keys(row).forEach((key) => {
        energyData[key] = row[key];
      });
      updatedFormData.Emissions.push(energyData);
    });
    setFormDataObject(updatedFormData);
    onChange(updatedFormData);
  };

  const handleAddRow = () => {
    const newRow = {
      Document: '', // Initialize Document as empty string for the new row
    };
    setRows([...rows, newRow]);
    setFileNames({ ...fileNames, [rows.length]: '' }); // Add an empty string for the new row's file name
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
    // Remove the file name from the fileNames state when removing a row
    const updatedFileNames = { ...fileNames };
    delete updatedFileNames[index];
    setFileNames(updatedFileNames);
    updateFormData(updatedRows);
  };

  const PreviewModal = () => {
    if (!showModal || previewData === null) return null;
    let content;

    if (fileType.startsWith('image')) {
      content = <img src={previewData} alt="Preview" className="max-w-md max-h-md" />;
    } else if (fileType === 'application/pdf') {
      content = <iframe src={previewData} title="PDF Preview" className="w-full h-full" />;
    } else {
      content = <p>File preview not available.</p>;
    }



    return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-1 rounded-lg w-[60%] h-[90%] mt-6">
          <div className="flex justify-between  mt-4 mb-4">
            <div>
            <h5 className="mb-4 ml-2 font-semibold">{fileNames[currentRowIndex]}</h5>

            </div>
            <div className='flex'>
              <button className="px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white" onClick={handleDeleteFile}><MdOutlineDeleteOutline className="text-xl" />Delete File</button>
              <button className="px-4 py-2 text-xl rounded " onClick={handleCloseModal}><MdClose/></button>
            </div>

          </div>
<div className='flex justify-between'>
<div className="relative w-[550px] h-[450px]">{content}</div>
<div className='w-[211px]'>
  <div className='mb-4 mt-2'>
  <h2 className='text-neutral-500 text-[15px] font-semibold  leading-relaxed tracking-wide'>File information</h2>
  </div>
  <div className='mb-4'>
    <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>FILE NAME</h2>
    <h2 className='text-[14px]  leading-relaxed tracking-wide'>{fileNames[currentRowIndex]}</h2>
  </div>
  <div className='mb-4'>
  <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>FILE TYPE</h2>
  <h2 className='text-[14px]  leading-relaxed tracking-wide'>{fileType}</h2>
  </div>
  <div className='mb-4'>
  <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>FILE SIZE</h2>
  <h2 className='text-[14px]  leading-relaxed tracking-wide'>{rows[currentRowIndex]?.fileSize / 1024} KB</h2>
  </div>
  <div className='mb-4'>
  <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>LAST MODIFIED</h2>
  <h2 className='text-[14px]  leading-relaxed tracking-wide'>{rows[currentRowIndex]?.uploadDate}</h2>
  </div>
  <div className='mb-4'>
  <h2 className='text-neutral-500 text-[12px] font-semibold  leading-relaxed tracking-wide'>UPLOADED BY</h2>
  <h2 className='text-[14px]  leading-relaxed tracking-wide'>shubham kanungo</h2>
  </div>
</div>
</div>


        </div>
      </div>
    );
  };
  return (

    <fieldset>
      {rows.map((row, index) => (
        <div key={index} className="w-full mb-2">
          <div className={`flex items-center overflow-auto custom-scrollbar ${open ? "w-[790px]" : "w-[950px]"}`}>

            <div className="flex  items-center justify-center  h-full">
              {Object.keys(properties).map((key) => {
                const property = properties[key];
                let inputType = 'text';

                if (property.type === 'number') {
                  inputType = 'number';
                } else if (property.format === 'email') {
                  inputType = 'email';
                }

                if (property.format !== 'data-url') {
                  return (
                    <div className="w-full max-w-xs  px-2" key={key}>
                      {property.enum && (key === 'Category' || key === 'Subcategory' || key === 'Activity') ? (
                        <select
                          className={`block  py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 ${open ? "w-[152px]" : "w-[162px]"}`}
                          value={row[key] || ''}
                          onChange={(e) => {
                            const updatedRows = [...rows];
                            updatedRows[index][key] = e.target.value;
                            setRows(updatedRows);
                            updateFormData(updatedRows);
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
                        <>
                          <div>
                            {key === 'Quantity' && (
                              <input
                                className="border m-0.5 text-sm text-neutral-500 appearance-none rounded-md py-2 pl-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type={inputType}

                                value={row[key] || ''}
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index][key] = e.target.value;
                                  setRows(updatedRows);
                                  updateFormData(updatedRows);
                                }}
                              />

                            )}
                          </div>
                          {key === 'Unit' && (
                            <div className='-ml-[85px] flex'>
                              <select
                                className="cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none ms-1 font-bold text-xs bg-[#007EEF] text-white w-[61px]"
                                value={row[key] || ''}
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index][key] = e.target.value;
                                  setRows(updatedRows);
                                  updateFormData(updatedRows);
                                }}
                              >
                                <option value="">{property.placeholder || `${property.title}`}</option>
                                {property.enum.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>

                            </div>
                          )}

                        </>

                      )}

                    </div>
                  );
                } else {
                  return null;
                }
              })}

            </div>


            <div className="flex  relative items-center">
              {fileNames[index] ? (
                <label htmlFor={`file-upload-${index}`} className="text-[#007EEF] text-[12px] flex cursor-pointer">
                  <div
                    className="flex items-center"
                    onClick={() => handleOpenModal(index)}
                  >
                    <MdFilePresent
                      className="w-6 h-6 mr-1 text-gray-400"
                      style={{ color: "green" }}
                    />
                    <div className="w-[39px] truncate text-sky-600 text-sm">
                      {fileNames[index]}
                    </div>
                  </div>

                </label>

              ) : (
                <>
                  <input
                    type="file"
                    id={`file-upload-${index}`}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileUpload(e, index)}
                  />
                  <label htmlFor={`file-upload-${index}`} className="text-[#007EEF] text-[12px] flex cursor-pointer w-[68px] h-[50px] truncate items-center justify-center">
                    <MdOutlineFileUpload className='text-[18px]' style={{ marginTop: '1px' }} />{" "}
                    <span >Upload</span>
                  </label>
                </>
              )}
            </div>
            <div className="flex ml-3 ">
              <div className="w-[85px] h-[30px] px-2.5 py-1 bg-[#007EEF] rounded-l flex-col justify-center items-center inline-flex">
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="relative text-white text-[13px] font-medium leading-snug tracking-wide">
                    Assign to
                  </div>
                </div>
              </div>
            </div>
            <button className="text-[#007EEF] text-[12px] flex justify-center cursor-pointer ml-3" onClick={() => handleRemoveRow(index)}>
              <MdOutlineDeleteOutline className="text-red-600 cursor-pointer text-2xl" />
            </button>
            <div>

            </div>
          </div>
          {index === rows.length - 1 && (
            <button className="text-[#007EEF] text-[12px] flex cursor-pointer mt-5 mb-5" onClick={handleAddRow}>
              <MdAdd className='text-lg' /> Add Row
            </button>
          )}
        </div>
      ))}
      <PreviewModal />
    </fieldset>
  );
};

export default Scope2;
