import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import {
  MdOutlineDeleteOutline,
  MdAdd,
  MdOutlineFileUpload,
  MdFilePresent,
  MdClose,
  MdDelete,
  MdInfoOutline,
} from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Select from "react-select";
import { components } from "react-select";
import DateRangePickerEmission from "@/app/utils/DatePickerComponentemission";
import { BlobServiceClient } from "@azure/storage-blob";
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

const AllTableWidget = ({
  id,
  options,
  value,
  required,
  onChange,
  schema,
  formContext,
}) => {

  const dropdownRefs = useRef([]);
  const [localValue, setLocalValue] = useState(value || []);
  const [othersInputs, setOthersInputs] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState([]); // e.g. [true, false, ...] per row
  const [locationQuery, setLocationQuery] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
       if (Array.isArray(enableVal)) {
      return !enableVal.includes(sourceValue);
    }

    // Fallback to string match
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
    onChange(updatedValues)
    //   if (formContext?.validationErrors?.[rowIndex]?.[key]) {
    //   const num = parseFloat(newValue);
    //   if (newValue === "" || (!isNaN(num) && num <= 100)) {
    //     formContext.clearFieldError(rowIndex, key);
    //   }
    // }
    if (formContext?.validationErrors?.[rowIndex]?.[key]) {
    formContext.clearFieldError(rowIndex, key);
  }
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
    <div style={{position:'relative'}}>
       <div
        style={{
          display: "block",
          overflowX: "auto",
          maxWidth: "100%",
          minWidth: "100%",
          width: "80vw",
        }}
        className="mb-2 pb-2 table-scrollbar"
      >
        <table
          className="table-fixed   w-full rounded-md"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead className="gradient-background h-[60px]">
            <tr>
              {options.titles.map((item, idx) => (
                <th
                  key={idx}
                  style={{ textAlign: "left" }}
                  className={`${
                    item.key === "AssignTo" || item.key === "FileUpload"
                      ? "text-[13px]  text-neutral-950 font-[400] border-none text-center  px-2 py-2 relative w-[45vw] xl:w-[10vw] lg:w-[10vw] md:w-[10vw] 2xl:w-[10vw] 4k:w-[10vw] 2k:w-[10vw]"
                      : "text-[13px]  text-neutral-950 font-[400] border-none text-center  px-2 py-2 relative w-[45vw] xl:w-[28vw] lg:w-[25vw] md:w-[25vw] 2xl:w-[25vw] 4k:w-[25vw] 2k:w-[25vw] "
                  } `}
                >
                  <div className="flex h-fit relative ">
                    <p className="pl-1">{item.title}</p>
                    <MdInfoOutline
                      data-tooltip-id={`tooltip-${item.title.replace(
                        /\s+/g,
                        "-"
                      )}`}
                      data-tooltip-html={item.tooltip}
                      style={{ display: item.tooltipdispaly }}
                      className="cursor-pointer ml-2  float-end mt-1 w-10"
                    />
                    {/* <ReactTooltip
                      id={`tooltip-${item.title.replace(/\s+/g, "-")}`}
                      place="top"
                      effect="solid"
                      style={{
                        width: "500px",
                        height: "auto",

                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "11px",
                        boxShadow: "0px 0px 5px #000",
                        borderRadius: "8px",
                        zIndex: 1000,
                      }}
                    /> */}
                  </div>
                </th>
              ))}
              <th className="text-[12px]  text-center  px-2 py-2 w-[25vw] xl:w-[3vw] lg:w-[3vw] md:w-[10vw] 2xl:w-[3vw] 4k:w-[3vw] 2k:w-[3vw]"></th>
            </tr>
          </thead>
          <tbody className="m-0 p-0 h-[80px]">
            {localValue.map((row, rowIndex) => (
              <tr key={rowIndex} className="h-[50px]">
                {Object.keys(schema.items.properties).map((key, cellIndex) => {
                  const propertySchema = schema.items.properties[key];
                  const uiSchemaField = options.titles.find(
                    (title) => title.key === key
                  );
                  const layoutType = uiSchemaField?.layouttype || "select";
                  const inputLimit = uiSchemaField?.inputLimit || "";
                   const errorMsg = formContext?.validationErrors?.[rowIndex]?.[key];
                    const hasError = !!errorMsg;
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
                            isDisabled={isFieldDisabled(
                              uiSchemaField,
                              row,
                              key
                            )}
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
                      ) : layoutType === "select" && propertySchema.enum ? (
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
                            disabled={isFieldDisabled(uiSchemaField, row, key)}
                            className={`text-[12px]   py-2 pl-1 w-full border-b ${
                              isFieldDisabled(uiSchemaField, row, key)
                                ? "bg-[#fafafa] rounded-sm"
                                : ""
                            } `}
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
                          )}
                        </>
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
  disabled={isFieldDisabled(uiSchemaField, row,key)}
  className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
    isFieldDisabled(uiSchemaField, row,key) ? "opacity-70 cursor-not-allowed" : ""
  }`}
  placeholder="Enter"
/>

                      ):
//                        layoutType === "inputDecimal" ? (
//   <input
//     type="text"
//     inputMode="decimal"
//     pattern="^[0-9]*[.]?[0-9]*$"
//     required={required}
//     value={localValue[rowIndex][key] || ""}
//     onChange={(e) => {
//       const input = e.target.value;

//       // Allow only numbers and one decimal point
//       const cleaned = input
//         .replace(/[^0-9.]/g, "")              // Remove non-numeric/non-dot
//         .replace(/(\..*)\./g, "$1");          // Allow only one dot

//       handleInputChange(rowIndex, key, cleaned);
//     }}
//     disabled={isFieldDisabled(uiSchemaField, row,key)}
//     className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
//       isFieldDisabled(uiSchemaField, row,key) ? "opacity-70 cursor-not-allowed" : ""
//     }`}
//     placeholder="Enter"
//   />
// ):
layoutType === "inputDecimal" ? (
 <div>
   <input
    type="text"
    inputMode="decimal"
    pattern="^[0-9]*[.]?[0-9]{0,2}$"
    required={required}
    value={localValue[rowIndex][key] || ""}
    onChange={(e) => {
      let input = e.target.value;

      // Allow only numbers and one decimal point
      input = input
        .replace(/[^0-9.]/g, "")              // Remove non-numeric/non-dot
        .replace(/(\..*)\./g, "$1");          // Allow only one dot

      // If there's a decimal, limit to two decimals
      if (input.indexOf('.') >= 0) {
        const [intPart, decPart] = input.split('.');
        input = intPart + '.' + (decPart ? decPart.slice(0, 2) : '');
      }

      handleInputChange(rowIndex, key, input);
    }}
    disabled={isFieldDisabled(uiSchemaField, row, key)}
    className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${formContext?.validationErrors?.[rowIndex]?.[key]?'border-red-500':''} ${
      isFieldDisabled(uiSchemaField, row, key) ? "opacity-70 cursor-not-allowed" : ""
    }`}
    placeholder="Enter"
  />
   {formContext?.validationErrors?.[rowIndex]?.[key] && (
      <div className="absolute text-red-500 text-xs mt-1">
        {formContext.validationErrors[rowIndex][key]}
      </div>
    )}
 </div>
):
 layoutType === "inputPercentage" ? (
  <input
    type="text"
    inputMode="decimal"
    pattern="^[0-9]*[.]?[0-9]{0,2}$"
    required={required}
    value={localValue[rowIndex][key] || ""}
    onChange={(e) => {
      let input = e.target.value;

      // Allow only numbers and one decimal point
      input = input
        .replace(/[^0-9.]/g, "")              // Remove non-numeric/non-dot
        .replace(/(\..*)\./g, "$1");          // Allow only one dot

      // If there's a decimal, limit to two decimals
      if (input.indexOf('.') >= 0) {
        const [intPart, decPart] = input.split('.');
        input = intPart + '.' + (decPart ? decPart.slice(0, 2) : '');
      }

      handleInputChange(rowIndex, key, input);
    }}
    disabled={isFieldDisabled(uiSchemaField, row, key)}
    className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${
      isFieldDisabled(uiSchemaField, row, key) ? "opacity-70 cursor-not-allowed" : ""
    }`}
    placeholder="Enter data"
  />
):
                      layoutType === "input" ? (
                        <input
                          type="text"
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={
                            (e) =>
                              handleInputChange(rowIndex, key, e.target.value) // Use the new handler here
                          }
                          disabled={isFieldDisabled(uiSchemaField, row, key)}
                          className="text-[12px]   py-2 pl-1 w-full border-b rounded-md"
                          placeholder="Enter"
                        />
                      ) : layoutType === "multilinetextbox" ? (
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
                          disabled={isFieldDisabled(uiSchemaField, row, key)}
                          className="text-[12px] py-1 pl-1 w-full border-b rounded-md"
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
                      ) : layoutType === "inputonlytext" ? (
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
                      layoutType === "inputWebsite" ? (
  <div>
    <input
    type="url"
    required={required}
    value={localValue[rowIndex][key] || ""}
  onChange={e => {
      const val = e.target.value;
      // Only update if empty OR matches URL prefix
       handleInputChange(rowIndex, key, val);
    }}
    disabled={isFieldDisabled(uiSchemaField, row, key)}
    className={`text-[12px] py-2 pl-1 w-full border-b rounded-md ${formContext?.validationErrors?.[rowIndex]?.[key]?'border-red-500':''}`}
    placeholder="Enter website link"
    pattern="https?://.*" // optional: only allow URLs starting with http:// or https://
  />
   {formContext?.validationErrors?.[rowIndex]?.[key] && (
      <div className="absolute text-red-500 text-xs mt-1">
        {formContext.validationErrors[rowIndex][key]}
      </div>
    )}
  </div>
)
                      : layoutType === "inputonlynumber" ? (
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          {...(inputLimit ? { maxLength: inputLimit } : {})}
                          required={required}
                          value={localValue[rowIndex][key] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              rowIndex,
                              key,
                              e.target.value.replace(/[^0-9]/g, "")
                            )
                          }
                          className="text-[12px]   py-2 pl-1 w-full border-b rounded-md"
                          placeholder="Enter"
                        />
                      ) : layoutType === "AssignTo" ? (
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
                        <div className="flex justify-center items-center ml-2 w-[80px]">
                          <input
                            type="file"
                            id={rowIndex + formContext.scopes + key}
                            onChange={(e) =>
                              handleFilleChange(e, rowIndex, key)
                            }
                            style={{ display: "none" }}
                          />
                          {row[key] && row[key].name ? (
                            // Show file present (with preview modal launcher)
                            <label className="flex cursor-pointer ml-1">
                              <div
                                className="flex items-center px-2"
                                onClick={() =>
                                  handleFilePreview(rowIndex, key, row[key])
                                }
                              >
                                <MdFilePresent className="w-5 h-5 mr-1 text-green-500" />
                                <div className="w-[60px] truncate text-sky-600 text-[12px]">
                                  {row[key].name}
                                </div>
                              </div>
                            </label>
                          ) : (
                            // Show upload button
                            <label
                              htmlFor={rowIndex + formContext.scopes + key}
                              className="flex cursor-pointer ml-1"
                            >
                              <div className="flex items-center  ">
                                <MdOutlineFileUpload className="w-5 h-5 mr-1 text-[#007EEF]" />
                                <div className="w-[60px] truncate text-[#007EEF] text-[12px] 4k:text-[14px] ml-1">
                                  Upload
                                </div>
                              </div>
                            </label>
                          )}
                        </div>
                      ) : null}
                    </td>
                  );
                })}
                <td className=" p-3 text-center ">
                  <button
                    type="button"
                    onClick={() => handleDeleteRow(rowIndex)}
                    title="Remove row"
                    className="text-center mx-auto"
                  >
                    <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                  </button>
                </td>
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
      <div>
        {" "}
        <button
          type="button"
          className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5 ml-3"
          onClick={handleAddRow}
        >
          Add Row <MdAdd className="text-lg" />
        </button>
      </div>
      {showModal && modalFileObj.file && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-1 rounded-lg w-[96%] h-[94%] mt-6 xl:w-[60%]">
            <div className="flex justify-between mt-4 mb-4">
              <h5 className="mb-4 ml-2 font-semibold">
                {modalFileObj.file.name}
              </h5>
              <div className="flex">
                <button
                  className="px-2 py-1 mr-2 w-[150px] flex items-center justify-center border border-red-500 text-red-600 text-[13px] rounded hover:bg-red-600 hover:text-white"
                  onClick={() =>
                    handleFileDelete(modalFileObj.rowIndex, modalFileObj.key)
                  }
                >
                  <MdDelete className="text-xl" /> Delete File
                </button>
                <button
                  className="px-4 py-2 text-xl rounded"
                  onClick={handleCloseModal}
                >
                  <MdClose />
                </button>
              </div>
            </div>
            <div className="block justify-between xl:flex">
              <div className="relative w-[744px] h-[545px]">
                {modalFileObj.file.type?.startsWith("image") ? (
                  <img
                    src={modalFileObj.file.previewData || modalFileObj.file.url}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : modalFileObj.file.type === "application/pdf" ? (
                  <iframe
                    src={modalFileObj.file.url}
                    title="PDF Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p>
                      File preview not available. Please download and verify.
                    </p>
                    <a
                      href={modalFileObj.file.url}
                      download={modalFileObj.file.name}
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
                    {modalFileObj.file.name}
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    FILE SIZE
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
                    {(modalFileObj.file.size / 1024).toFixed(2)} KB
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    FILE TYPE
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide break-words">
                    {modalFileObj.file.type}
                  </h2>
                </div>
                <div className="mb-4">
                  <h2 className="text-neutral-500 text-[12px] font-semibold leading-relaxed tracking-wide">
                    UPLOAD DATE & TIME
                  </h2>
                  <h2 className="text-[14px] leading-relaxed tracking-wide">
                    {modalFileObj.file.uploadDateTime}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllTableWidget;
