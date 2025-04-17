'use client';
import React, { useState } from 'react';
import Select from 'react-select';
import { MdOutlineDeleteOutline, MdAdd, MdInfoOutline } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
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

        alignItems: "center",

        textAlign: "left",
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        style={{ marginRight: "8px", accentColor: "#16a34a" }}
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

const CustomTableWidget8 = ({
  id,
  options,
  value = [],
  required,
  onChange,
  locationdata,
}) => {
  const [localData, setLocalData] = useState(value);

  const locationOptions = locationdata.map((loc) => ({
    value: loc.location_name,
    label: loc.location_name,

  }));
  console.log(locationdata,"test value");
  const updateField = (index, key, newValue) => {
    const updatedRows = localData.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [key]: newValue } : row
    );
    setLocalData(updatedRows);
    console.log(index, key, newValue,"test data");
  };

  const syncWithParent = () => {
    onChange(localData);
  };

  const handleAddRow = () => {
    const newRow = {
      category: '',
      male: 0,
      female: 0,
      nonBinary: 0,
      locationandoperation: [],
    };
    setLocalData([...localData, newRow]);
    syncWithParent(); // Update parent
  };

  const handleRemoveRow = (index) => {
    const updatedRows = localData.filter((_, rowIndex) => rowIndex !== index);
    setLocalData(updatedRows);
    syncWithParent(); // Update parent
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      padding: 0,
      margin: 0,
      minHeight: 'auto',
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: 'left',
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    menu: (provided) => ({
      ...provided,
      position: 'relative',
      zIndex: 1000,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
    }),
  };

  const updatedMultiSelectStyle = {
    control: (base) => ({
      ...base,
      padding: '4px 10px', // Equivalent to py-3
      minHeight: '48px', // Ensure height matches your other elements
      borderColor: '#d1d5db', // Matches Tailwind's gray-300 border
      borderRadius: '0.375rem', // Matches Tailwind's rounded-md
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0', // Reset inner padding to fit the custom height
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
        backgroundColor: '#dbeafe', // Light blue background (Tailwind's blue-100)
        borderRadius: '0.375rem', // Rounded corners
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: '#1e40af', // Blue text (Tailwind's blue-800)
        fontWeight: '600',
      }),
      multiValueRemove: (base) => ({
        ...base,
        color: '#6A6E70'
      }),
  };

  const CustomOption = (props) => {
    const { data, isSelected, innerRef, innerProps } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isSelected ? '#e0e0e0' : 'white',
          padding: '8px',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          style={{ marginRight: '8px' }}
        />
        {data.label}
      </div>
    );
  };

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px' }} className='custom-scrollbar'>
      <table
        id={id}
        className="rounded-md w-full border border-gray-300"
        style={{ borderCollapse: 'separate', borderSpacing: 0 }}
      >
         <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => {
              const uniqueId = Math.floor(Math.random() * 1000000);
              return (
                <th
                  key={`header-${idx}`}
                  className={`text-[12px] px-2 py-2 ${
                    idx === 0
                      ? 'text-center w-[25%]'
                      : idx === 1
                      ? 'text-center border-l border-gray-300 w-[50%]'
                      : 'text-center border-l border-gray-300 w-[25%]'
                  }`}
                  colSpan={item.colSpan}
                >
                  <div className="relative  w-[250px] xl:w-auto lg:w-auto  md:w-auto  2xl:w-auto  4k:w-auto  2k:w-auto">
                    <p className={`flex justify-center`}>
                      {item.title}
                      {(idx === 0 || idx === 2 || idx === 1) && (
                        <>
                          <MdInfoOutline
                            data-tooltip-id={`tooltip-${uniqueId}`}
                            data-tooltip-content={item.tooltip}
                            className="cursor-pointer ml-2 mt-1"
                          />
                          <ReactTooltip
                            id={`tooltip-${uniqueId}`}
                            place="top"
                            effect="solid"
                            style={{
                              width: '400px',
                              backgroundColor: '#000',
                              color: 'white',
                              fontSize: '12px',
                              boxShadow: 3,
                              borderRadius: '8px',
                              zIndex: '1000',
                            }}
                          />
                        </>
                      )}
                    </p>
                  </div>
                </th>
              );
            })}
            <th className='w-[2%]'></th>
          </tr>
          <tr>
            {options.subTitles.map((item, idx) => (
              <th
                key={`sub-header-${idx}`}
                style={{ textAlign: 'center' }}
                className={`text-[12px] px-2 py-2 ${
                  idx === 0 ? '' : idx === 4 ? 'border-l ' : 'border-l border-t'
                } border-gray-300`}
                colSpan={item.colSpan}
              >
                <div>
                  <p>{item.title}</p>
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {localData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`p-3 ${
                    cellIndex ===4 ? 'border-t' : 'border-r border-t'
                  } border-gray-300`}
                >
                  {key === 'locationandoperation' ? (
                    <Select
                      isMulti
                      value={row[key]?.map((val) => ({
                        value: val,
                        label: val,
                      })) || []}
                      onChange={(selectedOptions) => {
                        const updatedValues = selectedOptions.map((opt) => opt.value);
                        updateField(rowIndex, key, updatedValues);
                      }}
                      onBlur={syncWithParent} // Sync with parent on blur
                      options={locationOptions}
                      className="text-[12px] w-full border-b"
                      styles={updatedMultiSelectStyle}
                      placeholder="Select options"
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                     components={{
                          Option: CustomOptionnew,
                          MultiValueContainer:CustomMultiValueContainer
                                                                                 }}
                    />
                  ) : (
                    <input
                      type={
                        key === 'male' || key === 'female' || key === 'nonBinary'
                          ? 'number'
                          : 'text'
                      }
                      required={required}
                      value={row[key] || ''}
                      onChange={(e) => updateField(rowIndex, key, e.target.value)}
                      onBlur={syncWithParent} // Sync with parent on blur
                      className="text-[12px] pl-2 py-2  border border-gray-300 rounded-md w-full"
                      placeholder="Enter data"
                    />
                  )}
                </td>
              ))}
              <td className="p-3 border-t border-gray-300">
                <button onClick={() => handleRemoveRow(rowIndex)}>
                  <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mx-2">
        <button
          type="button"
          className="text-[#007EEF] text-[13px] flex items-center mt-5 mb-5"
          onClick={handleAddRow}
        >
          Add category <MdAdd className="text-lg ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CustomTableWidget8;
