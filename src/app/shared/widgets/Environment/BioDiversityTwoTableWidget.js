import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import { MdOutlineDeleteOutline, MdAdd,  MdOutlineFileUpload,
  MdFilePresent,
  MdClose,
  MdDelete,MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Select from "react-select";
import { components } from "react-select";
import DateRangePickerEmission from "@/app/utils/DatePickerComponentemission";
import { BlobServiceClient } from "@azure/storage-blob";
import { FaExclamationTriangle } from "react-icons/fa";
import 'react-tooltip/dist/react-tooltip.css'
import { IoMdOpen } from "react-icons/io";
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
  // console.log(valueIndex,"See")
  // Always show the first two values
  if (valueIndex < 2) {
    return (
      <components.MultiValueContainer {...props}>
        {children}
      </components.MultiValueContainer>
    );
  }

  // For the third position, show "+X more" if there are more than 2 values
  if (value.length > 2 && valueIndex == 2) {
    return (
      <components.MultiValueContainer {...props}>
        <div
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: "0.375rem",
            padding: "2px 5px",
            color: "#1e40af",
            fontWeight: "600",
            // fontSize: '0.875rem'
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

const BioDiversityTwoTableWidget = ({
  id,
  options,
  value,
  required,
  onChange,
  schema,
  formContext

}) => {
 
  const dropdownRefs = useRef([]);
  const [localValue, setLocalValue] = useState(value || []);
  const [othersInputs, setOthersInputs] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState([]); // e.g. [true, false, ...] per row
  const [locationQuery, setLocationQuery] = useState([]);
    const [fileName, setFileName] = useState(value?.name || null);
  const [logfileName, setLogFileName] = useState(value?.name || null);
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(value?.url || null);
  const [fileType, setFileType] = useState(value?.type || "");
  const [fileSize, setFileSize] = useState(value?.size || "");
    const [uploadDateTime, setUploadDateTime] = useState(
      value?.uploadDateTime || ""
    );


const isReadOnly = formContext?.readonlyData && formContext?.topicSelected;
const isDisabledBySelection = !formContext?.readonlyData && formContext?.topicSelected;
const isEditable = !formContext?.topicSelected;

const disableAll = isReadOnly || isDisabledBySelection;

// ⚠️ Apply disabling style only in Condition 2
const disabledStyle = isDisabledBySelection
  ? "opacity-70 cursor-not-allowed pointer-events-none"
  : "";

 const uploadFileToAzure = async (file, newFileName) => {
    // Read file content as ArrayBuffer
    console.log(file, " is the file object");
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer]);

    // Azure Storage configuration
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
      // Upload the blob to Azure Blob Storage
      const uploadOptions = {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      };

      await blobClient.uploadData(blob, uploadOptions);

      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

      return url;
    } catch (error) {

      console.error("Error uploading file:", error.message);
      return null;
    }
  };
    useEffect(() => {

    if (value?.url && value?.name) {
      setFileName(value.name);
      setPreviewData(value.url);
      setFileType(value.type || "");
      setFileSize(value.size || "");
      setUploadDateTime(value.uploadDateTime || "");
    }
  }, [value]);
    const handleFilleChange = async (event) => {
    console.log("handle change called");
    const selectedFile = event.target.files[0];

    const newFileName = selectedFile ? selectedFile.name : null;
    console.log(selectedFile, " is the selectedFile");
    setFileName(newFileName);
    setLogFileName(newFileName);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(reader, " is the reader object");

        const uploadAndSetState = async () => {
          const url = await uploadFileToAzure(selectedFile, newFileName);

          onChange({
            name: newFileName,
            url: url,
            type: selectedFile.type,
            size: selectedFile.size,
            uploadDateTime: new Date().toLocaleString(),
          });

          setPreviewData(base64String);
          setFileType(selectedFile.type);
          setFileSize(selectedFile.size);
          setUploadDateTime(new Date().toLocaleString());
        };

        uploadAndSetState();
     
      };
    }
  };

  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    try {
      const resetValue = {
        name: "",
        url: "",
        type: "",
        size: "",
        uploadDateTime: "",
      };

      setFileName(null);
      setPreviewData(null);
      onChange(resetValue);
      setShowModal(false);

  
    } catch (error) {
      console.error("Error deleting file:", error.message);
    
    }
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
      border: "none",
      padding: "4px 10px", // Equivalent to py-3
      minHeight: "48px", // Ensure height matches your other elements
      // borderColor: '#d1d5db', // Matches Tailwind's gray-300 border
      // borderRadius: '0.375rem', // Matches Tailwind's rounded-md
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
    }),

    menuList: (provided) => ({ ...provided, maxHeight: "200px" }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#dbeafe", // Light blue background (Tailwind's blue-100)
      borderRadius: "0.375rem", // Rounded corners
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#1e40af", // Blue text (Tailwind's blue-800)
      fontWeight: "600",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#6A6E70",
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

    updatedOthersInputs[rowIndex][key] = values?.includes(
      "Others (please specify)"
    );

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
//   const getColumnsToDisableOnChange = (changedKey, newValue) => {
//     return options.titles
//       .filter(
//         (field) =>
//           field.keytack === changedKey && // depends on this column
//           field.disable &&
//           field.disable === field.key
//       )
//       .map((f) => ({
//         field: f.key,
//         disableIfNot: f.disableIfNotValue || "yes",
//       }));
//   };
const getColumnsToDisableOnChange = (changedKey, newValue) => {
  return options.titles
    .filter(
      (field) =>
        field.keytack === changedKey &&
        field.disable &&
        field.disable === field.key
    )
    .map((f) => ({
      field: f.key,
      disableIfNot: f.disableIfNotValue || "Yes",
      isValid: Array.isArray(f.disableIfNotValue)
        ? f.disableIfNotValue.includes(newValue)
        : newValue === f.disableIfNotValue,
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
//   const isFieldDisabled = (field, row) => {
//     if (field.keytack && field.disable) {
//       let sourceValue = row[field.keytack] || "";
//       let enableVal = field.disableIfNotValue || "Yes";
//       return sourceValue !== enableVal;
//     }
//     return false;
//   };
const isFieldDisabled = (field, row) => {
  if (field.keytack && field.disable) {
    const sourceValue = row[field.keytack] || "";
    const enableVal = field.disableIfNotValue || "Yes";

    // Handle array of valid values
    if (Array.isArray(enableVal)) {
      return !enableVal.includes(sourceValue);
    }

    // Fallback to string match
    return sourceValue !== enableVal;
  }

  return false;
};

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
    {isDisabledBySelection && (
        <div className="bg-orange-50 border-l-2 flex items-start gap-4 border-orange-500 p-4 mb-4 text-sm rounded max-w-[800px]">
             <div className="flex-shrink-0">
                          <FaExclamationTriangle className="text-[#F98845] w-4 h-4 mt-1" />
                        </div>
         <div>
             <strong className="text-[#0D024D] text-[14px]">Data Missing in Water and Effluents Section</strong><br />
          <p className="mb-2">To complete this section, please enter the required data in ‘Water Withdrawal and Discharge from All Areas’ &  'Water Withdrawal and Discharge from Areas with Water Stress'.</p>
          <strong className="text-[#0D024D] text-[14px]">Proceed to:</strong>
          <ul className="mt-1">
            <li>
              <a onClick={()=>{formContext.handleTabClick("Water Withdrawal and Water Discharge from All Areas")}} className="text-[#007EEF] underline">
                Water Withdrawal and Discharge from All Areas
              </a>
            </li>
            <li>
              <a onClick={()=>{formContext.handleTabClick("Water withdrawal/Discharge from areas with water stress")}} className="text-[#007EEF] underline">
                Water Withdrawal and Discharge from Areas with Water Stress
              </a>
            </li>
          </ul>
         </div>
        </div>
      )}
      <div style={{position:'relative'}}>
      <div
        style={{
          display: "block",
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "80vw",
        }}
        className={`mb-2 pb-2 table-scrollbar ${disabledStyle}`}
      >
        <table
          className="table-fixed border border-gray-200  w-full rounded-md"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead className="gradient-background h-[60px]">
            <tr>
              {options.titles.map((item, idx) => (
                <th
                  key={idx}
                  style={{ textAlign: "left" }}
                  className={`${
                      item.key === "AssignTo" || item.key === "FileUpload"  ? "text-[13px]  text-neutral-950 font-[400] border-none text-center  px-2 py-2 w-[45vw] xl:w-[10vw] lg:w-[10vw] md:w-[10vw] 2xl:w-[10vw] 4k:w-[10vw] 2k:w-[10vw]" : "text-[13px]  text-neutral-950 font-[400] border-none text-center  px-2 py-2 relative w-[45vw] xl:w-[28vw] lg:w-[25vw] md:w-[25vw] 2xl:w-[25vw] 4k:w-[25vw] 2k:w-[25vw] "
                  } `}
                >
                  <div className="relative">
                    <p className="pl-1 flex">{item.title}
                       <MdInfoOutline
                      data-tooltip-id={`tooltip-${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-html={item.tooltip}
                      style={{ display: item.tooltipdispaly }}
                      className="cursor-pointer ml-2  float-end mt-1 w-10"
                    />
                    {
                      item.title==='Ecosystem type & source' && (
                        <IoMdOpen className="mt-[3.5px] w-3.5 h-3.5 text-[#007EEF]"
                         onClick={() => window.open("https://global-ecosystems.org/", "_blank")}
                         data-tooltip-id={`tooltip-link`}
                      data-tooltip-html={'View the ecosystem type & source'}
                        />
                      )
                    }
                    <ReactTooltip
                      id={`tooltip-link`}
                      place="top"
                      effect="solid"
                      style={{
                        width: "250px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "11px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        zIndex: 999999,
                      }}
                    />
                    </p>
                   

                  </div>
                </th>
              ))}
              <th className="text-[12px]  text-center  px-2 py-2 w-[25vw] xl:w-[3vw] lg:w-[3vw] md:w-[10vw] 2xl:w-[3vw] 4k:w-[3vw] 2k:w-[3vw]"></th>
            </tr>
          </thead>
          <tbody className="m-0 p-0">
            {localValue.map((row, rowIndex) => (
              <tr key={rowIndex} className="h-[70px]">
                {Object.keys(schema.items.properties).map((key, cellIndex) => {
                  const propertySchema = schema.items.properties[key];
                  const uiSchemaField = options.titles.find(
                    (title) => title.key === key
                  );
                  const layoutType = uiSchemaField?.layouttype || "select";
                //    const disabled = disableAll || isFieldDisabled(uiSchemaField, row);
           
                  return (
                    <td
                      key={cellIndex}
                      className={`${
                        cellIndex === 0 ? "" : " "
                      } border-none  text-center  px-2`}
                    >
                      {layoutType === "multiselect" && propertySchema.enum ? (
                        <div className="relative ">
                          <Select
                            isMulti
                            options={propertySchema?.enum?.map((option) => ({
                              value: option,
                              label: option,
                            }))}
                            // Ensure `item.intensityratio` is an array before calling `.map()`
                            value={(localValue[rowIndex][key] || []).map(
                              (option) => ({
                                value: option,
                                label: option,
                              })
                            )}
                            onChange={(selectedOptions) =>
                              handleCheckboxChange(
                                rowIndex,
                                key,
                                selectedOptions.map((opt) => opt.value)
                              )
                            }
                            isDisabled={isFieldDisabled(uiSchemaField, row)}
                            // disabled={disabled}
                            styles={updatedMultiSelectStyle}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                              Option: CustomOptionnew,
                              MultiValueContainer: CustomMultiValueContainer,
                            }}
                            className="block xl:w-[22vw] md:w-[22vw] lg:w-[22vw] 2xl:w-[22vw] 2k:w-[22vw]  4k:w-[10vw] text-[12px] border-b  focus:outline-none"
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
                              className="text-[12px]   py-2 pl-1 w-full mt-2"
                              placeholder="Please specify"
                            />
                          )}
                        </div>
                      ) : 
                      layoutType === "select" && propertySchema.enum ? (
                        <>
                          {/* <select
                            value={
                              typeof localValue[rowIndex][key] === "string" &&
                              localValue[rowIndex][key].startsWith("Others")
                                ? "Others (please specify)"
                                : localValue[rowIndex][key] || ""
                            }
                            onChange={(e) =>
                              handleSelectChange(rowIndex, key, e.target.value)
                            }
                            // disabled={isFieldDisabled(uiSchemaField, row)}
                             disabled={(isReadOnly || isDisabledBySelection) || isFieldDisabled(uiSchemaField, row)}
  className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
    isDisabledBySelection || isFieldDisabled(uiSchemaField, row) ? "opacity-70 cursor-not-allowed" : ""
  }`}
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
                              className="text-[12px]   py-2 pl-1 w-full mt-2"
                              placeholder="Please specify"
                            />
                          )} */}
                          {(() => {
      let enumOptions = propertySchema.enum || [];

      if (
        uiSchemaField?.dynamicEnumSourceKey &&
        uiSchemaField?.dynamicEnumMapping
      ) {
        const sourceKey = uiSchemaField.dynamicEnumSourceKey;
        const sourceValue = row[sourceKey];
        enumOptions = uiSchemaField.dynamicEnumMapping[sourceValue] || [];
      }

      return (
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
            disabled={
              (isReadOnly || isDisabledBySelection) ||
              isFieldDisabled(uiSchemaField, row)
            }
            className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
              isDisabledBySelection || isFieldDisabled(uiSchemaField, row)
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
          >
            <option value="">Select an option</option>
            {enumOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {othersInputs[rowIndex]?.[key] && (
            <input
              type="text"
              required={required}
              value={localValue[rowIndex][`${key}_others`] || ""}
              onChange={(e) =>
                handleOtherInputChange(rowIndex, key, e.target.value)
              }
              className="text-[12px] py-2 pl-1 w-full mt-2"
              placeholder="Please specify"
            />
          )}
        </>
      );
    })()}
                        </>
                      ) 
                      : layoutType === "input" ? (
                        <input
                          type="text"
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={
                            (e) =>
                              handleInputChange(rowIndex, key, e.target.value) // Use the new handler here
                          }
                         disabled={(isReadOnly || isDisabledBySelection) || isFieldDisabled(uiSchemaField, row)}
  className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
    isDisabledBySelection ? "opacity-70 cursor-not-allowed" : ""
  }`}
                          placeholder="Enter"
                        />
                      ): layoutType === "inputDate" ? (
                        <input
                          type="date"
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={
                            (e) =>
                              handleInputChange(rowIndex, key, e.target.value) // Use the new handler here
                          }
                         disabled={(isReadOnly || isDisabledBySelection) || isFieldDisabled(uiSchemaField, row)}
  className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
    isDisabledBySelection ? "opacity-70 cursor-not-allowed" : ""
  }`}
                          placeholder="Enter"
                        />
                      )
                      
                      : layoutType === "multilinetextbox" ? (
                        <textarea
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={
                            (e) =>
                              handletextareaChange(
                                rowIndex,
                                key,
                                e.target.value
                              ) // Use the new handler here
                          }
                         disabled={isReadOnly || isDisabledBySelection}
  className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
    isDisabledBySelection ? "opacity-70 cursor-not-allowed" : ""
  }`}
                          placeholder="Enter data"
                          rows={2}
                        />
                      ) : layoutType === "locationsearch" ? (
                        <div className="relative w-72">
                          <input
                            className="w-full px-3 py-2 border-b text-[12px] border-gray-300 rounded focus:outline-none"
                            type="text"
                            value={
                              localValue[rowIndex][`${key}_others`] !==
                              undefined
                                ? "Others (please specify)"
                                : locationQuery[rowIndex] !== undefined
                                ? locationQuery[rowIndex]
                                : localValue[rowIndex][`${key}_name`] || ""
                            }
                            onChange={(e) =>
                              handleLocationQueryChange(
                                rowIndex,
                                e.target.value,
                                key
                              )
                            }
                            onFocus={() => {
                              setLocationDropdownOpen((openArr) => {
                                const arr = [...openArr];
                                arr[rowIndex] = true;
                                return arr;
                              });
                            }}
                            onBlur={() => handleLocationBlur(rowIndex)}
                            placeholder="Select location..."
                            autoComplete="off"
                           
                          />
                          {locationDropdownOpen[rowIndex] &&
                            localValue[rowIndex][`${key}_others`] ===
                              undefined && (
                              <ul className="relative z-[1000] mt-1 w-full bg-white rounded shadow-lg max-h-[95px] overflow-auto mb-2 pb-2">
                                {(formContext.locationdata ?? [])
                                  .filter(
                                    (loc) =>
                                      (locationQuery[rowIndex] || "") === "" ||
                                      loc.location_name
                                        .toLowerCase()
                                        .includes(
                                          (
                                            locationQuery[rowIndex] || ""
                                          ).toLowerCase()
                                        )
                                  )
                                  .map((loc) => (
                                    <li
                                      key={loc.location_id}
                                      className="px-4 py-2 hover:bg-blue-100 text-left cursor-pointer text-[12px]"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() =>
                                        handleLocationSelect(rowIndex, loc, key)
                                      }
                                    >
                                      {loc.location_name}
                                    </li>
                                  ))}

                                {/* ---- CONDITIONAL: Show Others only if allowed in schema UI ---- */}
                                {uiSchemaField.otheroption && (
                                  <li
                                    className="px-4 py-2 hover:bg-blue-100 text-left cursor-pointer text-[12px] text-blue-800"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                      const updatedValues = [...localValue];
                                      if (!updatedValues[rowIndex])
                                        updatedValues[rowIndex] = {};
                                      updatedValues[rowIndex][`${key}_others`] =
                                        "";
                                      updatedValues[rowIndex][key] = "";
                                      setLocalValue(updatedValues);

                                      setLocationDropdownOpen((openArr) => {
                                        const arr = [...openArr];
                                        arr[rowIndex] = false;
                                        return arr;
                                      });
                                    }}
                                  >
                                    Others (please specify)
                                  </li>
                                )}
                              </ul>
                            )}
                          {/* Show custom box if _others active */}
                          {localValue[rowIndex][`${key}_others`] !==
                            undefined && (
                            <input
                              type="text"
                              required={required}
                              value={
                                localValue[rowIndex][`${key}_others`] || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  rowIndex,
                                  `${key}_others`,
                                  e.target.value
                                )
                              }
                              className="text-[12px] py-2 pl-1 w-full mt-2 border-b"
                              placeholder="Please specify other location"
                            />
                          )}
                        </div>
                      ) : 
                      layoutType === "inputonlytext" ? (
                        <input
                          type="text"
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={(e) =>
                            // Accept only letters, no spaces/numbers
                            handleInputChange(
                              rowIndex,
                              key,
                              e.target.value.replace(/[^a-zA-Z]/g, "")
                            )
                          }
                          className="text-[12px]   py-2 pl-1 w-full border-b rounded-md"
                          placeholder="Enter"
                        />
                      ) : 
                      layoutType === "alphaNum" ?(
                        <input
  type="text"
  inputMode="text"
  pattern="[A-Za-z0-9]*"
  required={required}
  value={localValue[rowIndex][key] || ""}
  onChange={(e) => {
    const input = e.target.value;
    const cleaned = input.replace(/[^a-zA-Z0-9]/g, ""); // only letters and digits
    handleInputChange(rowIndex, key, cleaned);
  }}
  disabled={isReadOnly || isDisabledBySelection}
  className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
    isDisabledBySelection ? "opacity-70 cursor-not-allowed" : ""
  }`}
  placeholder="Enter"
/>

                      ):
                      layoutType === "inputonlynumber" ? (
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              rowIndex,
                              key,
                              e.target.value.replace(/[^0-9]/g, "")
                            )
                          }
                         disabled={isReadOnly || isDisabledBySelection}
  className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
    isDisabledBySelection ? "opacity-70 cursor-not-allowed" : ""
  }`}
                          placeholder="Enter"
                        />
                      ):
                      layoutType === "inputDecimal" ? (
  <input
    type="text"
    inputMode="decimal"
    pattern="^[0-9]*[.]?[0-9]*$"
    required={required}
    value={localValue[rowIndex][key] || ""}
    onChange={(e) => {
      const input = e.target.value;

      // Allow only numbers and one decimal point
      const cleaned = input
        .replace(/[^0-9.]/g, "")              // Remove non-numeric/non-dot
        .replace(/(\..*)\./g, "$1");          // Allow only one dot

      handleInputChange(rowIndex, key, cleaned);
    }}
    disabled={isReadOnly || isDisabledBySelection}
    className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
      isDisabledBySelection ? "opacity-70 cursor-not-allowed" : ""
    }`}
    placeholder="Enter"
  />
)
                      : layoutType === "AssignTo" ? (
                       <div className="flex justify-center items-center mt-2 ">
        <button
          className="bg-blue-200 text-white text-[12px] 4k:text-[14px] w-[112px]   py-1 rounded-md shadow hover:bg-blue-200"
          type="button"
          // onClick={openModal}
        >
          Assign To
        </button>
      </div>
                      ) : layoutType === "FileUpload" ? (
                       <div className="flex justify-center items-center ml-2  w-[80px]">
                              <input
                                type="file"
                                id={rowIndex + formContext.scopes}
                                onChange={handleFilleChange}
                                style={{ display: "none" }}
                              />
                      
                              {fileName ? (
                                <label className="flex cursor-pointer ml-1">
                                  <div className="flex items-center px-2" onClick={handlePreview}>
                                    <MdFilePresent className="w-5 h-5 mr-1 text-green-500" />
                                    <div className="w-[60px] truncate text-sky-600 text-[12px]">
                                      {fileName}
                                    </div>
                                  </div>
                                </label>
                              ) : (
                                <label htmlFor={rowIndex + formContext.scopes} className="flex cursor-pointer ml-1">
                                  <div className="flex items-center  ">
                                    <MdOutlineFileUpload className="w-5 h-5 mr-1 text-[#007EEF]" />
                                    <div className="w-[60px] truncate text-[#007EEF] text-[12px] 4k:text-[14px] ml-1">
                                      Upload
                                    </div>
                                  </div>
                                </label>
                              )}
                      
                              {/* Preview Modal */}
                              {showModal && previewData && (
                                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
                                  <div className="bg-white p-1 rounded-lg w-[96%] h-[94%] mt-6 xl:w-[60%] lg:w-[60%] md:w-[60%] 2xl:w-[60%] 4k:w-[60%] 2k:w-[60%]">
                                    <div className="flex justify-between mt-4 mb-4">
                                      <div>
                                        <h5 className="mb-4 ml-2 font-semibold truncate w-[200px] overflow-hidden whitespace-nowrap">
                                          {fileName}
                                        </h5>
                                      </div>
                                      <div className="flex">
                                        <div className="mb-4">
                                          <button
                                            className="px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white"
                                            onClick={() => handleDelete(rowIndex, formContext.scopes)}
                                          >
                                            <MdDelete className="text-xl" /> Delete File
                                          </button>
                                        </div>
                                        <div>
                                          <button
                                            className="px-4 py-2 text-xl rounded"
                                            onClick={handleCloseModal}
                                          >
                                            <MdClose />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="block justify-between xl:flex lg:flex d:flex  2xl:flex  4k:flex  2k:flex ">
                                      <div className="relative w-[112vw] xl:w-[744px] lg:w-[744px] 2xl:w-[744px] 4k:w-[744px] 2k:w-[744px] h-[136vw] xl:h-[545px] lg:h-[545px] 2xl:h-[545px] 4k:h-[545px] 2k:h-[545px]">
                                        {fileType.startsWith("image") ? (
                                          <img
                                            src={previewData}
                                            alt="Preview"
                                            className="max-w-full max-h-full object-contain"
                                          />
                                        ) : fileType === "application/pdf" ? (
                                          <iframe
                                            src={previewData}
                                            title="PDF Preview"
                                            className="w-full h-full object-contain"
                                          />
                                        ) : (
                                          <div className="flex flex-col items-center justify-center h-full">
                                            <p>
                                              File preview not available.Please download and verify
                                            </p>
                                            <a
                                              href={previewData}
                                              download={fileName}
                                              className="mt-12 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                              Download File
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                      <div className="w-[211px]">
                                        <div className="mb-4 mt-2">
                                          <h2 className="text-neutral-500 text-[15px] font-semibold leading-relaxed tracking-wide">
                                            File information
                                          </h2>
                                        </div>
                                        <div className="mb-4">
                                          <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                                            FILE NAME
                                          </h2>
                                          <h2 className="text-[14px] leading-relaxed tracking-wide break-words">
                                            {fileName}
                                          </h2>
                                        </div>
                                        <div className="mb-4">
                                          <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                                            FILE SIZE
                                          </h2>
                                          <h2 className="text-[14px] leading-relaxed tracking-wide">
                                            {(fileSize / 1024).toFixed(2)} KB
                                          </h2>
                                        </div>
                                        <div className="mb-4">
                                          <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                                            FILE TYPE
                                          </h2>
                                          <h2 className="text-[14px] leading-relaxed tracking-wide break-words">
                                            {fileType}
                                          </h2>
                                        </div>
                                        <div className="mb-4">
                                          <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                                            UPLOAD DATE & TIME
                                          </h2>
                                          <h2 className="text-[14px] leading-relaxed tracking-wide">
                                            {uploadDateTime}
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                      ) :null}
                    </td>
                  );
                })}
                {/* <td className=" p-3 text-center ">
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(rowIndex)}
                    title="Remove row"
                    className="text-center mx-auto"
                  >
                    <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {options.titles.map((item) => (
    <ReactTooltip
      key={item.title}
      id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
      place="top"
      effect="solid"
      // positionStrategy="fixed"
      style={{
        width: "300px",
        backgroundColor: "#000",
        color: "white",
        fontSize: "11px",
        boxShadow: "0 0 8px rgba(0,0,0,0.3)",
        borderRadius: "8px",
        zIndex: 99999, // Ensure it appears above everything
      }}
    />
  ))}
      </div>
     
       
      {/* <div>
        {" "}
        <button
          type="button"
          className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5 ml-3"
          onClick={handleAddRow}
        >
          Add Row <MdAdd className="text-lg" />
        </button>
      </div> */}
    </>
  );
};

export default BioDiversityTwoTableWidget;
