import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { MdOutlineDeleteOutline, MdAdd, MdOutlineFileUpload, MdFilePresent, MdClose, MdDelete, MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Select from "react-select";
import { components } from "react-select";

const CustomOptionnew = ({ children, ...props }) => {
  const { isSelected, isFocused, innerProps } = props;

  return (
    <div
      {...innerProps}
      style={{
        backgroundColor: isSelected ? "white" : isFocused ? "#f0f0f0" : "white",
        padding: "8px",
        display: "flex",
        alignItems: "left",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        className="green-checkbox"
        checked={isSelected}
        readOnly
        style={{ flexShrink: 0, marginRight: "8px" }}
      />
      {children}
    </div>
  );
};

const CustomMultiValueContainer = ({ children, ...props }) => {
  const { data, selectProps } = props;
  const { value } = selectProps;

  // Find the index of this value in the selected values array
  const valueIndex = value.findIndex((val) => val.value === data.value);

  // Always show the first two values
  if (valueIndex < 2) {
    return (
      <components.MultiValueContainer {...props}>
        {children}
      </components.MultiValueContainer>
    );
  }

  // For "+X more" if values exceed 2
  if (value.length > 2 && valueIndex === 2) {
    return (
      <components.MultiValueContainer {...props}>
        <div
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: "0.375rem",
            padding: "2px 5px",
            color: "#1e40af",
            fontWeight: "600",
          }}
        >
          +{value.length - 2} more
        </div>
      </components.MultiValueContainer>
    );
  }

  // Hide any additional values
  return null;
};

const AllInputWidget = ({ id, options, value, required, onChange, schema, formContext }) => {
 const dropdownRefs = useRef([]);
  const [localValue, setLocalValue] = useState(value || []);
  const [othersInputs, setOthersInputs] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState([]); // e.g. [true, false, ...] per row
  const [locationQuery, setLocationQuery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [modalFileObj, setModalFileObj] = useState({
    file: null,
    rowIndex: null,
    key: null,
  });
  // Azure upload (as before)
  const uploadFileToAzure = async (file, newFileName) => {
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT;
    const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER;
    const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = newFileName || file.name;
    const blobClient = containerClient.getBlockBlobClient(blobName);

    try {
      const uploadOptions = { blobHTTPHeaders: { blobContentType: file.type } };
      await blobClient.uploadData(blob, uploadOptions);
      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
      return url;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      return null;
    }
  };

  // File upload handler
  const handleFilleChange = async (event, rowIndex, key) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    const newFileName = selectedFile.name;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      const base64String = reader.result;
      const url = await uploadFileToAzure(selectedFile, newFileName);
      const fileData = {
        name: newFileName,
        url,
        type: selectedFile.type,
        size: selectedFile.size,
        uploadDateTime: new Date().toLocaleString(),
        previewData: base64String, // only needed for instant preview (optional)
      };
      setLocalValue((current) => {
        const updated = [...current];
        if (!updated[rowIndex]) updated[rowIndex] = {};
        updated[rowIndex][key] = fileData;
        return updated;
      });
    };
  };

  // File delete
  const handleFileDelete = (rowIndex, key) => {
    setLocalValue((current) => {
      const updated = [...current];
      if (updated[rowIndex]) {
        updated[rowIndex][key] = null;
      }
      return updated;
    });
    setShowModal(false);
  };

  // Preview launcher
  const handleFilePreview = (rowIndex, key, fileObj) => {
    setModalFileObj({ file: fileObj, rowIndex, key });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleLocationQueryChange = (rowIndex, query, key) => {
    const updatedQueries = [...locationQuery];
    updatedQueries[rowIndex] = query;
    setLocationQuery(updatedQueries);

    setLocationDropdownOpen((openArr) => {
      const arr = [...openArr];
      arr[rowIndex] = true;
      return arr;
    });

    // If the search input is cleared, reset everything for this cell/row
    if (query === "") {
      const updatedValues = [...localValue];
      if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};

      // Remove others, name, and id for the location
      delete updatedValues[rowIndex][`${key}_others`];
      delete updatedValues[rowIndex][`${key}_name`];
      updatedValues[rowIndex][key] = ""; // or delete? Set empty string is safest

      setLocalValue(updatedValues);
    }
  };
  const handleLocationSelect = (rowIndex, location, key) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) updatedValues[rowIndex] = {};
    updatedValues[rowIndex][key] = location.location_id; // Store ID
    updatedValues[rowIndex][`${key}_name`] = location.location_name; // Store name for display
    delete updatedValues[rowIndex][`${key}_others`];
    setLocalValue(updatedValues);
    setLocationDropdownOpen((openArr) => {
      const arr = [...openArr];
      arr[rowIndex] = false;
      return arr;
    });
    setLocationQuery((qArr) => {
      const arr = [...qArr];
      arr[rowIndex] = location.location_name;
      return arr;
    });
  };
  const handleLocationBlur = (rowIndex) => {
    // This closes the dropdown if clicking outside
    setTimeout(() => {
      setLocationDropdownOpen((openArr) => {
        const arr = [...openArr];
        arr[rowIndex] = false;
        return arr;
      });
    }, 100); // Small delay to allow click events
  };
   const updatedMultiSelectStyle = {
  control: (base) => ({
    ...base,
    border: "1px solid  #9CA3AF", // Optional: Add a border (Tailwind gray-300)
    padding: "4px 10px", // Equivalent to py-3
    minHeight: "38px", // Ensure height matches your other elements
    borderRadius: "0.375rem", // Add border radius (Tailwind's rounded-md style)
    boxShadow: "none", // Remove any additional shadow
    ":hover": {
      borderColor: "#0369a1", // Optional: Add hover effect for border color (blue-600 Tailwind equivalent)
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0", // Reset inner padding to fit the custom height
  }),
  menu: (provided) => ({
    ...provided,
    position: "relative",
    bottom: "100%",
    top: 0,
    zIndex: 1000,
    borderRadius: "0.375rem", // Add border radius to the dropdown menu as well
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.12)", // Optional: Add a subtle shadow
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "200px",
    borderRadius: "0.375rem", // Add border radius to the dropdown list items
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#dbeafe", // Light blue background (Tailwind's blue-100)
    borderRadius: "0.375rem", // Rounded corners (border radius)
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#1e40af", // Blue text (Tailwind's blue-800)
    fontWeight: "600",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#6A6E70",
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)", // Optional: Add a hover effect for remove button
      color: "black", // Change the 'x' icon color on hover
    },
  }),
};

useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      setLocalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const initializeOthersInputs = () => {
      const newOthersInputs = localValue.map((row) => {
        const rowOthers = {};
        Object.keys(row || {}).forEach((key) => {
          if (
            Array.isArray(row[key]) &&
            (row[key].includes("Others (please specify)") ||
              row[`${key}_others`])
          ) {
            rowOthers[key] = true;
          } else if (
            row[key] === "Others (please specify)" ||
            row[`${key}_others`]
          ) {
            rowOthers[key] = true;
          }
        });
        return rowOthers;
      });
      setOthersInputs(newOthersInputs);
    };
    initializeOthersInputs();
  }, [localValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown !== null) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // const handleCheckboxChange = (rowIndex, key, values) => {
  //   const updatedValues = [...localValue];
  //   if (!updatedValues[rowIndex]) {
  //     updatedValues[rowIndex] = {};
  //   }

  //   updatedValues[rowIndex][key] = values;

  //   const updatedOthersInputs = [...othersInputs];
  //   if (!updatedOthersInputs[rowIndex]) {
  //     updatedOthersInputs[rowIndex] = {};
  //   }

  //   updatedOthersInputs[rowIndex][key] = values?.includes(
  //     "Others (please specify)"
  //   );

  //   setOthersInputs(updatedOthersInputs);
  //   setLocalValue(updatedValues);
  // };

  const handleCheckboxChange = (rowIndex, key, values) => {
  const updatedValues = [...localValue];
  if (!updatedValues[rowIndex]) {
    updatedValues[rowIndex] = {};
  }

  updatedValues[rowIndex][key] = values;

  const updatedOthersInputs = [...othersInputs];
  if (!updatedOthersInputs[rowIndex]) {
    updatedOthersInputs[rowIndex] = {};
  }

  if (values?.includes("Others (please specify)")) {
    updatedOthersInputs[rowIndex][key] = true;
  } else {
    updatedOthersInputs[rowIndex][key] = false;
    // Remove the _others field if Others is not selected
    delete updatedValues[rowIndex][`${key}_others`];
  }

  setOthersInputs(updatedOthersInputs);
  setLocalValue(updatedValues);
};
  const handleOtherInputChange = (rowIndex, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][`${key}_others`] = newValue;
    setLocalValue(updatedValues);
  };
  const getColumnsToDisableOnChange = (changedKey, newValue) => {
    return options.titles
      .filter(
        (field) =>
          field.keytack === changedKey && // depends on this column
          field.disable &&
          field.disable === field.key
      )
      .map((f) => ({
        field: f.key,
        disableIfNot: f.disableIfNotValue || "yes",
      }));
  };
  const handleSelectChange = (rowIndex, key, selectedValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][key] = selectedValue;

    // Clear/disable dependent columns dynamically
    getColumnsToDisableOnChange(key, selectedValue).forEach(
      ({ field, disableIfNot }) => {
        if ((selectedValue || "").toLowerCase() !== (disableIfNot || "yes")) {
          updatedValues[rowIndex][field] = Array.isArray(
            updatedValues[rowIndex][field]
          )
            ? []
            : "";
        }
      }
    );

    const updatedOthersInputs = [...othersInputs];
    if (!updatedOthersInputs[rowIndex]) {
      updatedOthersInputs[rowIndex] = {};
    }
    updatedOthersInputs[rowIndex][key] =
      selectedValue === "Others (please specify)";
    setOthersInputs(updatedOthersInputs);

    setLocalValue(updatedValues);
  };
  const isFieldDisabled = (field, row) => {
    if (field.keytack && field.disable) {
      let sourceValue = row[field.keytack] || "";
      let enableVal = field.disableIfNotValue || "Yes";
      return sourceValue !== enableVal;
    }
    return false;
  };

  // {for disabling autopopulate}
  //   const isFieldDisabled = (field, row, key) => {
  //   if (formContext?.readOnlyFields?.includes(key)) return true;

  //   if (field.keytack && field.disable) {
  //     let sourceValue = row[field.keytack] || "";
  //     let enableVal = field.disableIfNotValue || "Yes";
  //     return sourceValue !== enableVal;
  //   }

  //   return false;
  // };

  const handleAddRow = () => {
    const newRow = {};
    Object.keys(schema.items.properties).forEach((key) => {
      // Initialize default values based on the schema type
      if (Array.isArray(schema.items.properties[key].enum)) {
        newRow[key] = []; // Multiselect default
      } else {
        newRow[key] = ""; // Input or select default
      }
    });
    setLocalValue([...localValue, newRow]);
    setOthersInputs([...othersInputs, {}]);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedValues = [...localValue];
    updatedValues.splice(rowIndex, 1);
    setLocalValue(updatedValues);

    const updatedOthersInputs = [...othersInputs];
    updatedOthersInputs.splice(rowIndex, 1);
    setOthersInputs(updatedOthersInputs);
  };

  const debouncedUpdate = useCallback(debounce(onChange, 200), [onChange]);

  useEffect(() => {
    debouncedUpdate(localValue);
  }, [localValue, debouncedUpdate]);

  const handleInputChange = (rowIndex, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][key] = newValue; // Directly update the value for the input field
    setLocalValue(updatedValues);
  };
  const handletextareaChange = (rowIndex, key, newValue) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][key] = newValue; // Directly update the value for the input field
    setLocalValue(updatedValues);
  };
  const handleDateRangeChange = (rowIndex, key, newRange) => {
    const updatedValues = [...localValue];
    if (!updatedValues[rowIndex]) {
      updatedValues[rowIndex] = {};
    }
    updatedValues[rowIndex][key] = newRange;
    setLocalValue(updatedValues);
  };

  

  return (
    <>
      <div
        style={{
          position: "relative",
          // display: "flex",
          // flexDirection: "column",
          // gap: "1rem",
        }}
      >
        {localValue.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="w-full"
          >
            {Object.keys(schema.items.properties).map((key, cellIndex) => {
              const propertySchema = schema.items.properties[key];
              const uiSchemaField = options.titles.find(
                (title) => title.key === key
              );
              const layoutType = uiSchemaField?.layouttype || "input";

              return (
                <div key={cellIndex} className="mb-4">
                  {/* Render Field Title */}
                  <label className="text-[14px] font-regular mb-3 flex">
                    {uiSchemaField?.title}
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${uiSchemaField?.title?.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-html={uiSchemaField?.tooltip}
                      style={{ display: uiSchemaField?.tooltipdispaly }}
                      className="cursor-pointer ml-2  float-end mt-1 w-10"
                    />
                  </label>
                  
                    <ReactTooltip
                      id={`tooltip-${uiSchemaField?.title?.replace(/\s+/g, "-")}`}
                      place="top"
                      effect="solid"
                      style={{
                        width: "auto",
                        height: "auto",

                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "11px",
                        borderRadius: "8px",
                        zIndex: 1000,
                      }}
                    />

                  {/* Render Input Field */}
                  {layoutType === "input" && (
                    <input
                      type="text"
                      required={required}
                      value={localValue[rowIndex][key] || ""}
                      onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
                      className="border appearance-none text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                      placeholder={`Enter data`}
                    />
                  )}

                   {layoutType === "multilinetextbox" && (
                   <textarea
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={(e) => handleInputChange(rowIndex, key, e.target.value)}
                           className="border appearance-none text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                          rows={5}
                          placeholder="Enter data"
                        />
                  )}


                  {/* {layoutType === "multiselect" && propertySchema.enum && (
                    <div>
                    <Select
                      isMulti
                      placeholder="Select"
                      options={propertySchema.enum.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      value={(row[key] || []).map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      onChange={(selectedOptions) =>
                        handleInputChange(
                          rowIndex,
                          key,
                          selectedOptions.map((opt) => opt.value)
                        )
                      }
                       closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                      components={{
                        Option: CustomOptionnew,
                        MultiValueContainer: CustomMultiValueContainer,
                      }}
                       styles={updatedMultiSelectStyle}
                       className="block w-1/2 text-[12px]   focus:outline-none"
                    />
                    
                    {othersInputs[rowIndex]?.[key] && (
                            <input
                              type="text"
                              required={required}
                              value={
                                localValue[rowIndex][`${key}_others`] || ""
                              }
                              onChange={(e) =>
                                handleOtherInputChange(
                                  rowIndex,
                                  key,
                                  e.target.value
                                )
                              }
                              className="mt-4 border appearance-none text-[12px] border-gray-400 text-neutral-600 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-[50%]"
                              placeholder="Others Please specify"
                            />
                          )}
                          </div>
                  )} */}
                  {layoutType === "multiselect" && propertySchema.enum && (
  <div>
    <Select
      isMulti
      placeholder="Select"
      options={propertySchema.enum.map((option) => ({
        value: option,
        label: option,
      }))}
      value={(row[key] || []).map((option) => ({
        value: option,
        label: option,
      }))}
      onChange={(selectedOptions) => {
        const values = (selectedOptions || []).map((opt) => opt.value);
        handleCheckboxChange(rowIndex, key, values); // call your handler that manages 'othersInputs'
      }}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option: CustomOptionnew,
        MultiValueContainer: CustomMultiValueContainer,
      }}
      styles={updatedMultiSelectStyle}
      className="block w-1/2 text-[12px] focus:outline-none"
    />

    {/* Show the input if "Others (please specify)" is selected */}
    {othersInputs[rowIndex]?.[key] && (
      <input
        type="text"
        required={required}
        value={localValue[rowIndex][`${key}_others`] || ""}
        onChange={(e) =>
          handleOtherInputChange(rowIndex, key, e.target.value)
        }
        className="mt-4 border appearance-none text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-[50%]"
        placeholder="Enter data"
      />
    )}
  </div>
)}

                  {layoutType === "select" && propertySchema.enum && (
                        <>
                          <select
                            value={
                              typeof localValue[rowIndex][key] === "string" &&
                              localValue[rowIndex][key].startsWith("Others")
                                ? "Others (please specify)"
                                : localValue[rowIndex][key] || ""
                            }
                            onChange={(e) =>
                              handleSelectChange(rowIndex, key, e.target.value)
                            }
                           
                            className="border text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-2.5 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-1/2"
                          >
                            <option value="">Select an option</option>
                            {propertySchema.enum.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {othersInputs[rowIndex]?.[key] && (
                            <input
                              type="text"
                              required={required}
                              value={
                                localValue[rowIndex][`${key}_others`] || ""
                              }
                              onChange={(e) =>
                                handleOtherInputChange(
                                  rowIndex,
                                  key,
                                  e.target.value
                                )
                              }
                             className="border appearance-none text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-1/2"
                              placeholder="Others Please specify"
                            />
                          )}
                        </>
                      )}
                  

                  {/* Numeric Field - Limit characters to 21 */}
                  {layoutType === "inputonlynumber" && (
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required={required}
                      value={localValue[rowIndex][key] || ""}
                      onChange={(e) => {
                        // Allow only numbers and enforce 21-character length
                        const input = e.target.value.replace(/[^0-9]/g, "");
                        handleInputChange(rowIndex, key, input);
                      }}
                      className="border appearance-none text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                      placeholder={`Enter data`}
                    />
                  )}

                  {/* Alphanumeric Field - Limit characters to 21 */}
                  {layoutType === "alphaNum" && (
                    <input
                      type="text"
                      inputMode="text"
                      pattern="[A-Za-z0-9]*"
                      required={required}
                      value={localValue[rowIndex][key] || ""}
                      onChange={(e) => {
                        // Enforce alphanumeric and 21-digit length
                        const input = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                        if (input.length > 21) return;
                        handleInputChange(rowIndex, key, input);
                      }}
                      className="border appearance-none text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                      placeholder={`Enter data`}
                    />
                  )}

                   {layoutType === "alphaNumCapital" && (
                    <input
                      type="text"
                      inputMode="text"
                      pattern="[A-Z0-9]*"
                      maxLength="21" // Optional max length at an HTML level
                      required={required}
                      value={localValue[rowIndex][key] || ""}
                      onChange={(e) => {
                        // Enforce alphanumeric and 21-digit length
                        const input = e.target.value.replace(/[^A-Z0-9]/g, "");
                        if (input.length > 21) return;
                        handleInputChange(rowIndex, key, input);
                      }}
                      className="border appearance-none text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
                      placeholder={`Enter data`}
                    />
                  )}

                  {/* Decimal Field*/}
                 {layoutType === "inputDecimal" && (
  <input
    type="text"
    inputMode="decimal"
    pattern="^\d*(\.\d{0,2})?$"
    required={required}
    value={localValue[rowIndex][key] || ""}
    onChange={e => {
      let input = e.target.value
        .replace(/[^0-9.]/g, '')           // Remove invalid chars
        .replace(/(\..*)\./g, '$1');       // Allow only one dot

      // Allow only two decimal places
      if (
        input === "" ||                          // allow blank
        /^\d*(\.\d{0,2})?$/.test(input)          // valid int or up to 2 decimals
      ) {
        handleInputChange(rowIndex, key, input);
      }
    }}

    className="border appearance-none text-[12px] border-gray-400 text-neutral-700 pl-2 rounded-md py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full"
    placeholder="Enter data"
  />
)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default AllInputWidget;