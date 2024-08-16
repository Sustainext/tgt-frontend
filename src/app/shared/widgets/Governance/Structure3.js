'use client'
import React, { useState, useEffect } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const GovernanceRowWidget = ({ value, onChange, options }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; 
  }

  const handleChange = (index, field, newValue) => {
    const updatedValue = [...value];
    updatedValue[index] = { ...updatedValue[index], [field]: newValue };
    onChange(updatedValue);
  };

  return (
    <div className="flex max-w-[90vw] overflow-x-auto pb-3 mb-4 custom-scrollbar">
      {value.map((item, index) => (
        <div key={index} className="flex">
          <InputField
            label="Name"
            value={item.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            options={options}
          />
          <SelectField2
            label="Executive Power"
            value={item.executivePower}
            onChange={(e) => handleChange(index, 'executivePower', e.target.value)}
            options={options}
            otherValue={item.otherExecutivePower}
            handleChange={(newField, newValue) => handleChange(index, newField, newValue)}
          />
          <SelectField
            label="Independence"
            value={item.independence}
            onChange={(e) => handleChange(index, 'independence', e.target.value)}
            options={options}
          />
          <InputField
            label="Tenure On The Governance Body"
            value={item.tenure}
            onChange={(e) => handleChange(index, 'tenure', e.target.value)}
            options={options}
          />
          <InputField
            label="Number Of Significant Positions"
            value={item.significantPositions}
            onChange={(e) => handleChange(index, 'significantPositions', e.target.value)}
            options={options}
          />
          <InputField
            label="Commitments Held By Member"
            value={item.commitmentsHeld}
            onChange={(e) => handleChange(index, 'commitmentsHeld', e.target.value)}
            options={options}
          />
          <InputField
            label="The Nature Of Commitments"
            value={item.natureOfCommitments}
            onChange={(e) => handleChange(index, 'natureOfCommitments', e.target.value)}
            options={options}
          />
          <SelectField
            label="Gender"
            value={item.gender}
            onChange={(e) => handleChange(index, 'gender', e.target.value)}
            options={options}
          />
          <InputField
            label="Under-Represented Social Groups"
            value={item.underRepresentedGroups}
            onChange={(e) => handleChange(index, 'underRepresentedGroups', e.target.value)}
            options={options}
          />
          <InputField
            label="Competencies Relevant To The Impacts Of The Organization"
            value={item.competencies}
            onChange={(e) => handleChange(index, 'competencies', e.target.value)}
            options={options}
          />
          <InputField
            label="Stakeholder Representation"
            value={item.stakeholderRepresentation}
            onChange={(e) => handleChange(index, 'stakeholderRepresentation', e.target.value)}
            options={options}
          />
        </div>
      ))}
    </div>
  );
};

const InputField = ({ label, value, onChange, options }) => {
  const tooltipContent = options.titles.find(item => item.title === label)?.tooltip || '';

  return (
    <div className="w-[175px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
      <label className="block text-black/60 text-sm font-bold mb-2 flex items-center h-14">
        {label}
        <InfoTooltip id={label} content={tooltipContent} />
      </label>
      <input
        className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={value || ''}
        onChange={onChange}
      />
    </div>
  );
};

const SelectField = ({ label, value, onChange, options }) => {
  const tooltipContent = options.titles.find(item => item.title === label)?.tooltip || '';
  const selectOptions = options[label.toLowerCase()]?.options || [];
  
  return (
    <div className="w-[175px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
      <label className="text-black/60 text-sm font-bold mb-2 flex items-center h-14">
        {label}
        <InfoTooltip id={label} content={tooltipContent} />
      </label>
      <select
        className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value || ''}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const SelectField2 = ({ label, value, onChange, options, handleChange, otherValue }) => {
  const tooltipContent = options.titles.find(item => item.title === label)?.tooltip || '';
  
  return (
    <div className="w-[175px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
      <label className="text-black/60 text-sm font-bold mb-2 flex items-center justify-center h-14">
        {label}
        <InfoTooltip id={label} content={tooltipContent} />
      </label>
      <select
        className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value || ''}
        onChange={(e) => {
          onChange(e);
          if (handleChange) handleChange('executivePower', e.target.value);
        }}
      >
        <option value="">Select {label}</option>
        {options.executivePower.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value === 'Others (Please specify)' && (
        <input
          className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={otherValue}
          onChange={(e) => handleChange('otherExecutivePower', e.target.value)}
          options={options}
        />
      )}
    </div>
  );
};

const InfoTooltip = ({ id, content }) => {
  if (!content) return null;  // Don't render anything if there's no content

  return (
    <>
      <MdInfoOutline
        data-tooltip-id={`tooltip-${id}`}
        data-tooltip-content={content}
        className="ml-1 text-gray-500"
      />
      <ReactTooltip
        id={`tooltip-${id}`}
        place="top"
        effect="solid"
        className="max-w-xs bg-black text-white text-xs rounded shadow-lg"
      />
    </>
  );
};

export default GovernanceRowWidget;