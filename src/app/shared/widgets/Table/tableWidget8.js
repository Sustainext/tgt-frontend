'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdOutlineDeleteOutline, MdAdd, MdInfoOutline } from 'react-icons/md';
import Select from 'react-select';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const CustomTableWidget8 = ({
  id,
  options,
  value = [],
  required,
  onChange,
  locationdata,
}) => {
  // Memoize location options for Select
  const locationOptions = useMemo(
    () =>
      locationdata.map((loc) => ({
        value: loc.location_name,
        label: loc.location_name,
      })),
    [locationdata]
  );

  // Update a specific field in a row
  const updateField = useCallback(
    (index, key, newValue) => {
      const updatedRows = value.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: newValue } : row
      );
      onChange(updatedRows); // Update the parent state immediately
    },
    [value, onChange]
  );

  // Add a new row
  const handleAddRow = () => {
    const newRow = {
      category: '',
      male: 0,
      female: 0,
      nonBinary: 0,
      locationandoperation: [],
    };
    onChange([...value, newRow]);
  };

  // Remove a row
  const handleRemoveRow = (index) => {
    const updatedRows = value.filter((_, rowIndex) => rowIndex !== index);
    onChange(updatedRows);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 1000,
    }),
  };

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
      <table
        id={id}
        className="rounded-md w-full border border-gray-300"
        style={{ borderCollapse: 'separate', borderSpacing: 0 }}
      >
        <thead className="gradient-background">
          <tr>
            {options.titles.map((item, idx) => (
              <th
                key={idx}
                className={`text-[12px] px-2 py-2 ${
                  idx === 0 ? 'text-center' : 'text-center border-l border-gray-300'
                }`}
                colSpan={item.colSpan}
              >
                <div className="relative">
                  <p className={`flex justify-center`}>
                    {item.title}
                    {item.tooltip && (
                      <>
                        <MdInfoOutline
                          data-tooltip-id={`tooltip-${idx}`}
                          data-tooltip-content={item.tooltip}
                          className="cursor-pointer ml-2 mt-1"
                        />
                        <ReactTooltip
                          id={`tooltip-${idx}`}
                          place="top"
                          effect="solid"
                          style={{
                            width: '400px',
                            backgroundColor: '#000',
                            color: 'white',
                            fontSize: '12px',
                            borderRadius: '8px',
                            zIndex: 1000,
                          }}
                        />
                      </>
                    )}
                  </p>
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {value.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`p-3 ${
                    cellIndex === 4 ? 'border-t' : 'border-r border-t'
                  } border-gray-300`}
                >
                  {key === 'locationandoperation' ? (
                    <Select
                      isMulti
                      value={row[key]?.map((val) => ({
                        value: val,
                        label: val,
                      }))}
                      onChange={(selectedOptions) => {
                        const updatedValues = selectedOptions.map((opt) => opt.value);
                        updateField(rowIndex, key, updatedValues);
                      }}
                      options={locationOptions}
                      className="text-[12px] w-full"
                      styles={customStyles}
                      placeholder="Select options"
                    />
                  ) : (
                    <input
                      type={
                        key === 'male' || key === 'female' || key === 'nonBinary'
                          ? 'number'
                          : 'text'
                      }
                      required={required}
                      value={row[key]}
                      onChange={(e) =>
                        updateField(rowIndex, key, e.target.value)
                      }
                      className="text-sm pl-2 py-2 text-center border border-gray-300 rounded-md w-full"
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
