'use client'
import React, { useState, useEffect } from 'react';
import { MdOutlineFileUpload, MdAdd, MdOutlineDeleteOutline, MdFilePresent, MdInfoOutline,MdClose } from "react-icons/md";
import { GlobalState } from '../../../Context/page';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
const CustomAddressField = ({ formData = {}, onChange, schema }) => {
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
        updatedRows[index] = {
          ...updatedRows[index], Document: reader.result, fileType: file.type, fileName: file.name,
          fileSize: file.size,
          uploadDate: new Date().toLocaleDateString()
        };
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
    const updatedFormData = { Energy: [] };
    updatedRows.forEach((row, index) => {
      const energyData = {};
      Object.keys(row).forEach((key) => {
        energyData[key] = row[key];
      });
      updatedFormData.Energy.push(energyData);
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
              <button className="px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white" onClick={handleDeleteFile}><MdOutlineDeleteOutline className="text-xl mr-2" />Delete File</button>
              <button className="px-4 py-2 text-xl rounded " onClick={handleCloseModal}><MdClose /></button>
            </div>

          </div>
          <div className='flex justify-between'>
            <div className="relative w-[540px] h-[450px]">{content}</div>
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
        <div key={index} >
          <div className='flex'>
            <div className={`${open ? 'sm:w-[720px] md:w-[7720px] lg:w-[750px] xl:w-[585px] 2xl:w-[600px] 3xl:w-[600px]' : 'sm:w-[420px] md:w-[520px] lg:w-[850px] xl:w-[730px] 2xl:w-[840px] 3xl:w-[860px]'}`}>
              <div className={`overflow-x-scroll custom-scrollbar`}>
                <div className="flex mb-3 mt-3">
                  {Object.keys(properties).map((key) => {
                    const property = properties[key];
                    let inputType = 'text';

                    if (property.type === 'date') {
                      inputType = 'date';
                    } else if (property.format === 'email') {
                      inputType = 'email';
                    }

                    if (property.format !== 'data-url') {
                      return (
                        <div className="w-full max-w-xs mb-3 px-2" key={key}>
                          <div className='flex'>
                            <label className="text-sm leading-5 text-gray-700 flex">{property.title}</label>   <MdInfoOutline
                              data-tooltip-id={`tooltip-${property.tooltiptext.replace(/\s+/g, '-')}`} data-tooltip-content={property.tooltiptext} className="mt-1 ml-2 text-[12px]" />

                            <ReactTooltip id={`tooltip-${property.tooltiptext.replace(/\s+/g, '-')}`} place="top" effect="solid" style={{
                              width: "290px", backgroundColor: "#000",
                              color: "white",
                              fontSize: "12px",
                              boxShadow: 3,
                              borderRadius: "8px",
                              textAlign: 'center',
                            }}>

                            </ReactTooltip>
                          </div>
                          {property.enum ? (
                            <select
                              className="block py-2 w-[270px] text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
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
                            <input
                              className={`block w-[270px]  py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300`}
                              type={inputType}
                              placeholder={property.placeholder || `Enter ${property.title}`}
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
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className={`flex pt-4 bg-white h-[73px] w-full float-end`}>
                <div className="flex ml-3 h-[10px]">
                  <div className="w-[85px] h-[30px] px-2.5 py-1 bg-[#007EEF] rounded-l flex-col justify-center items-center inline-flex">
                    <div className="justify-center items-center gap-2 inline-flex">
                      <div className="relative text-white text-[13px] font-medium leading-snug tracking-wide">
                        Assign to
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex  h-[10px] ml-5 relative">
                  {fileNames[index] ? (
                    <label htmlFor={`file-upload-${index}`} className="text-[#007EEF] text-[14px] flex cursor-pointer">
                      <div
                        className="flex items-center mt-3"
                        onClick={() => handleOpenModal(index)}
                      >
                        <MdFilePresent
                          className="w-6 h-6 mr-1 text-gray-400"
                          style={{ color: "green" }}
                        />
                        <div className="w-[56px] truncate text-sky-600 text-sm">
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
                      <label htmlFor={`file-upload-${index}`} className="text-[#007EEF] text-[14px] flex cursor-pointer w-[68px] h-[50px] truncate">
                        <MdOutlineFileUpload className='text-[18px]' style={{ marginTop: '1px' }} />{" "}
                        <span  >Upload</span>
                      </label>
                    </>
                  )}
                </div>


                <button className="text-[#007EEF] text-[14px] flex cursor-pointer ml-3" onClick={() => handleRemoveRow(index)}>
                  <MdOutlineDeleteOutline className="text-red-600 cursor-pointer text-2xl" />
                </button>

              </div>
            </div>
          </div>
          {index === rows.length - 1 && (
            <button className="text-[#007EEF] text-[14px] flex cursor-pointer mt-5 mb-5" onClick={handleAddRow}>
              <MdAdd className='text-lg mt-0.5' /> Add Row
            </button>
          )}
        </div>
      ))}
      <PreviewModal />
    </fieldset>
  );
};

export default CustomAddressField;
